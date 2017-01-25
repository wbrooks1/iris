'use strict';
/**
 * Login Screen: holds buttons for opening login modal
 */

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, TextInput, ScrollView,} from 'react-native'
import styles from './styles';
import IconButton from '../../components/IconButton';
import LoginModal from '../LoginModal/LoginModal'

export default class Login extends Component {
    constructor() {
        super();
        this.state = {modalVisible: false};
    }
    openModal = () => {
        this.setState({modalVisible: true});
    }
    closeModal = () => {
        this.setState({modalVisible: false});
    }

    render() {
        return (
            <View style={styles.container}>
                <LoginModal modalVisible = {this.state.modalVisible} openModal = {this.openModal}
                            closeModal = {this.closeModal} navigator = {this.props.navigator}/>
                <Image style={styles.image}
                       source={require('../../images/login_image.jpg')}/>
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
                  onPress={() => this.openModal()}
                />
                <IconButton
                  image={require('../../images/twitter_icon.png')}
                  text="Twitter"
                  onPress={() => this.openModal()}
                />
                </View>
                <View style={styles.row_container}>
                <IconButton
                  image={require('../../images/facebook_icon.png')}
                  text="Facebook"
                  onPress={() => this.openModal()}
                />
                <IconButton
                  image={require('../../images/microsoft_icon.png')}
                  text="Microsoft"
                  onPress={() => this.openModal()}
                />
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('Login', () => Login);
