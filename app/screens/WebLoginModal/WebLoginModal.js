'use strict'
/**
 * WebLoginModal: Screen to enter credentials.
 */

import React, {Component} from 'react';
import {
    Alert, Modal, Text, TouchableHighlight, View, StyleSheet, Navigator, WebView, Networking, AsyncStorage,
} from 'react-native';

export default class WebLoginModal extends Component {
    constructor() {
        super();
    }

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

    async storeLoginStatus(token, decode) {
        console.log(token);
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

    verifyAccount = (webViewState) => {
        var jwtDecode = require('jwt-decode');
        var url = webViewState.url.toString();
        if (url === this.props.loginURLs.success + '#') {
            this.props.closeModal();
            fetch(this.props.loginURLs.success)
                .then((response) => response.json())
                .then((responseJson) => {
                    var decoded = jwtDecode(responseJson.access_token)
                    this.toHome(decoded.email, decoded.sub, responseJson.access_token);
                    this.storeLoginStatus(responseJson.access_token, decoded);
                }).catch((err) => {
                console.error('verify account', err);
            });
        } else if (url === this.props.loginURLs.failure + '#') {
            this.props.closeModal();
            Alert.alert('Login Error', 'You were not logged in, please try again');
        }
    }

    render() {
        console.log("Login url", this.props.loginURLs.login + this.props.location);
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
