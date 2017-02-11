'use strict';
/**
 * Login Screen: holds buttons for opening login modal
 */

import React, {Component} from 'react';
import {AsyncStorage, AppRegistry, StyleSheet, Text, Image, View, TextInput, ScrollView,} from 'react-native'
import styles from './styles';
import IconButton from '../../components/IconButton';
import WebLoginModal from '../WebLoginModal/WebLoginModal'
import {loginURLs} from '../../config/strings'

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false,
            loginUrl: null,
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
        } catch (error) {
            console.error(error);
        }
    }

    componentDidMount() {
        this.checkLoginStatus()
    }

    openModal = (route) => {
        this.setState({modalVisible: true});
        switch (route) {
            case 'google':
                this.setState({loginUrl: loginURLs.google});
                break;
            case 'twitter':
                this.setState({loginUrl: loginURLs.twitter});
                break;
            case 'facebook':
                this.setState({loginUrl: loginURLs.facebook});
                break;
            default:
                console.log(route);
        }
    }

    closeModal = () => {
        this.setState({modalVisible: false});
    }

    renderModal = () => {
        if (this.state.modalVisible) {
            return (
                <WebLoginModal modalVisible={this.state.modalVisible} closeModal={this.closeModal}
                               navigator={this.props.navigator} loginURLs={this.state.loginUrl}/>
            );
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderModal()}
                <Image style={styles.image}
                       source={require('../../images/iris_logo_loginpage_white.png')}/>
                <Text style={styles.title}>
                    Incident Response In Situ
                </Text>
                <Text style={styles.title}>
                    Login
                </Text>
                <View style={styles.row_container}>
                    <IconButton
                        image={require('../../images/google_icon.png')}
                        text="Google"
                        onPress={() => this.openModal('google')}
                    />
                    <IconButton
                        image={require('../../images/twitter_icon.png')}
                        text="Twitter"
                        onPress={() => this.openModal('twitter')}
                    />
                </View>
                <View style={styles.row_container}>
                    <IconButton
                        image={require('../../images/facebook_icon.png')}
                        text="Facebook"
                        onPress={() => this.openModal('facebook')}
                    />
                    <IconButton
                        image={require('../../images/microsoft_icon.png')}
                        text="Microsoft"
                        onPress={() => this.toHome()}
                    />
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('Login', () => Login);
