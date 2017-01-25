'use strict'; /** * Login Screen: holds buttons for opening login modal */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text,Image, View, TextInput, ScrollView,} from 'react-native'
import styles from './styles';

export default class Home extends Component {

  render() {
    return (
      <View style = {styles.container }>
          <Image style = {styles.image } source = {require('../../images/login_image.jpg' ) }/>
          <Text style = {styles.title }>
            Incident Response In Situ
          </Text >
          <Text style = {styles.title }>
            Login
          </Text >
        </View>
      );
    }
  }
AppRegistry.registerComponent('Home', () => Home );
