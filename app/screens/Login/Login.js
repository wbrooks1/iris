'use strict';
/**
 * Login Screen: holds buttons for opening login modal
 */

import React, { Component } from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, TextInput, ScrollView,} from 'react-native'
import styles from './styles';
import IconButton from '../../components/IconButton';

export default class Login extends Component {


    render() {
        return (
            <View style={styles.container}>
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
                />
                <IconButton
                  image={require('../../images/twitter_icon.png')}
                  text="Twitter"
                />
                </View>
                <View style={styles.row_container}>
                <IconButton
                  image={require('../../images/facebook_icon.png')}
                  text="Facebook"
                />
                <IconButton
                  image={require('../../images/microsoft_icon.png')}
                  text="Microsoft"
                />
                </View>
            </View>
        );
    }
}

AppRegistry.registerComponent('Login', () => Login);
