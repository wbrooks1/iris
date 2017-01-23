'use strict';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    ScrollView,
} from 'react-native'
import styles from './styles';
import IconButton from '../../components/IconButton';

export default class Login extends Component {


    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return (
            <View style={styles.container}>
                <Image style={styles.image}
                       source={pic}/>
                <Text style={styles.title}>
                    I.R.I.S
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
