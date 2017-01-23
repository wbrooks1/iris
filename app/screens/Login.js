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
import IconButton from '../components/IconButton';
var googleIcon = require('../images/google_icon.png');

export default class Login extends Component {


    render() {
        let pic = {
            uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
        };
        return (
            <View style={styles.container}>
                <Image style={styles.image}
                       source={googleIcon}/>
                <Text style={styles.title}>
                    I.R.I.S
                </Text>
                <IconButton
                image={require('../images/google_icon.png')}
                text="Google"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e1e5ed',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 5,
        justifyContent: 'flex-start',
    },
    scrollView: {
        backgroundColor: '#6A85B1',
        height: 300,
    },
});

AppRegistry.registerComponent('Login', () => Login);
