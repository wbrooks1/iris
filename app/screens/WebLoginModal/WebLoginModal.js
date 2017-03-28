'use strict'

import React, {Component} from 'react';
import {Alert, Modal, Text, TouchableHighlight, View, StyleSheet, Navigator, WebView, Networking, AsyncStorage,
} from 'react-native';

/**
 * Screen to open a web view for login using OAuth
 * @author Winfield Brooks
 * @props location: user default location
 */
export default class WebLoginModal extends Component {
    constructor() {
        super();
    }

    /**
     * Navigate to home screen on login.
     * @param userName
     * @param userID
     * @param token
     */
    toHome = (userName, userID, token) => {
        this.props.navigator.resetTo({
            id: 'Home',
            passProps: {
                location: this.props.location,
                userName: userName,
                userID: userID,
                token: token,
            }
        });
    }

    /**
     * Use R.N. AsyncStorage to store login information and credentials.
     * @param token
     * @param decode
     * @returns {Promise.<void>}
     */
    async storeLoginStatus(token, decode) {
        try {
            await AsyncStorage.setItem('@AsyncStorage:loginStatus', 'true');
            await AsyncStorage.setItem('@AsyncStorage:accessToken', token);
            await AsyncStorage.setItem('@AsyncStorage:userName', decode.email);
            await AsyncStorage.setItem('@AsyncStorage:userID', '' + decode.sub);
            await AsyncStorage.setItem('@AsyncStorage:location', this.props.location);
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * If OAuth login is successful fetch access token and decode using
     * jwt-decode (Details -> https://github.com/auth0/jwt-decode).
     * @param webViewState
     */
    verifyAccount = (webViewState) => {
        var jwtDecode = require('jwt-decode');
        var url = webViewState.url.toString();
        console.log("login url", url);
        if (url === this.props.loginURLs.success) {
            this.props.closeModal();
            fetch(this.props.loginURLs.success)
                .then((response) => response.json())
                .then((responseJson) => {
                    var decoded = jwtDecode(responseJson.access_token)
                    this.toHome(decoded.email, decoded.sub, responseJson.access_token);
                    this.storeLoginStatus(responseJson.access_token, decoded);
                }).catch((err) => {
                console.error('WebLoginModal verifyAccount()', err);
                this.props.closeModal();
                Alert.alert('Login Error', 'Something went wrong, please try again');
            });
        } else if (url === this.props.loginURLs.failure + '#') {
            this.props.closeModal();
            Alert.alert('Login Error', 'You were not logged in, please try again');
        }
    }

    render() {
        console.log("WebLoginModal login url", this.props.loginURLs.login + this.props.location);
        return (
            <Modal animationType={'slide'}
                   visible={this.props.modalVisible}
                   transparent={true}
                   onRequestClose={() => {this.props.closeModal()}}>
                <WebView ref='webview' source={{uri: this.props.loginURLs.login + this.props.location}}
                         onNavigationStateChange={this.verifyAccount.bind(this)}/>
            </Modal>
        );
    }
}
