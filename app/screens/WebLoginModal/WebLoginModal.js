'use strict'
/**
 * LoginModal: Screen to enter credentials.
 */

import React, {Component} from 'react';
import {
    Alert, Modal, Text, TouchableHighlight, View, StyleSheet, Navigator, WebView, Networking, AsyncStorage,
} from 'react-native';
import styles from './styles';


export default class WebLoginModal extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            accessToken: null,
        };
    }

    toHome = () => {
        this.props.navigator.resetTo({
            id: 'Home',
        });
    }

    async storeLoginStatus(token) {
        try {
            await AsyncStorage.setItem('@AsyncStorage:loginStatus', 'true');
            await AsyncStorage.setItem('@AsyncStorage:accessToken', token);
        } catch (error) {
            console.error(error);
        }
    }

    verifyAccount = (webViewState) => {
        var url = webViewState.url.toString();
        if (url === this.props.loginURLs.success + '#') {
            // this.refs.webview.stopLoading();
            this.props.closeModal();
            this.toHome();
            fetch(this.props.loginURLs.success)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.storeLoginStatus('' + responseJson.access_token)
                }).catch((err) => {
                console.error(err);
            });
        } else if (url === this.props.loginURLs.failure + '#') {
            this.props.closeModal();
            Alert.alert('Login Error', 'You were not logged in, please try again')
        }
    }

    render() {
        return (
            <Modal animationType={'slide'}
                   visible={this.props.modalVisible}
                   transparent={true}
                   onRequestClose={() => {this.props.closeModal()}}>
                <WebView ref='webview' source={{uri: this.props.loginURLs.login}}
                         onNavigationStateChange={this.verifyAccount.bind(this)}/>
            </Modal>
        );
    }
}
