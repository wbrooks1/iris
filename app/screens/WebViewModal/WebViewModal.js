'use strict'
/**
 * LoginModal: Screen to enter credentials.
 */

import React, { Component } from 'react';
import { Alert, Modal, Text, TouchableHighlight, View, StyleSheet, Navigator, WebView, Networking, AsyncStorage,
} from 'react-native';
import styles from './styles';
import {loginURLs} from '../../config/strings'


export default class WebViewModal extends Component {
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

     async checkLoginStatus() {
        try {
            let _loginStatus = await AsyncStorage.getItem('@AsyncStorage:loginStatus');
            if (_loginStatus === 'true') {
                let token = await AsyncStorage.getItem('@AsyncStorage:accessToken');
                this.setState({accessToken: token});
                this.toHome();
            }
        }catch (error) {
            console.error(error);
        }
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
        if(webViewState.url.toString() === loginURLs.googleSuccess + '#') {
            this.refs.webview.stopLoading();
            this.props.closeModal();
            this.toHome();
            fetch(loginURLs.googleSuccess)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.storeLoginStatus(''+responseJson.access_token)
                }).catch((err) => {
                console.error(err);
            });
        } else if(webViewState.url.toString() === loginURLs.googleFailure + '#') {
            this.props.closeModal();
            Alert.alert('Login Error', 'You were not logged in, please try again')

        }
    }

    componentDidMount() {
        this.checkLoginStatus()
    }

    render() {
        return (
            <Modal animationType={'slide'}
                   visible={this.props.modalVisible}
                   transparent={true}
                   onRequestClose={() => {this.props.closeModal()}}>
                <WebView  ref='webview' source={{uri: 'http://ethan-rowell.ddns.net:8082/auth/google?lat=123&long=123'}}
                          onNavigationStateChange={this.verifyAccount.bind(this)}/>
                <TouchableHighlight onPress={this.toHome}>
                    <Text style={styles.signIn}>Sign In</Text>
                </TouchableHighlight>
            </Modal>
        );
    }
}
