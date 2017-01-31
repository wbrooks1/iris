'use strict'; /** * Login Screen: holds buttons for opening login modal */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text,Image, View, TextInput, ScrollView, Navigator} from 'react-native'
import styles from './styles';
import IconButton from '../../components/IconButton';


export default class Home extends Component {
    // constructor() {
    //     super();
    // }
    toNewIncident = () => {
        this.props.navigator.push({
            id: 'NewIncident',
            });
    }

  render() {
    return (
      <View style = {styles.container }>
          <Image style = {styles.image } source = {require('../../images/login_image.jpg' ) }/>
          <Text style = {styles.title }>
            Incident Response In Situ
          </Text >
          <Text style = {styles.title }>
            Home
          </Text >
          <View style={styles.row_container}>
              <IconButton
                  image={require('../../images/google_icon.png')}
                  text="New Incident"
                  onPress={() => this.toNewIncident()}
              />
              <IconButton
                  image={require('../../images/twitter_icon.png')}
                  text="Your Incidents"
                  onPress={() => this.openModal()}
              />
          </View>
          <View style={styles.row_container}>
              <IconButton
                  image={require('../../images/facebook_icon.png')}
                  text="Search Incidents"
                  onPress={() => this.openModal()}
              />
              <IconButton
                  image={require('../../images/microsoft_icon.png')}
                  text="View Reports"
                  onPress={() => this.openModal()}
              />
          </View>
      </View>
      );
    }
  }
AppRegistry.registerComponent('Home', () => Home );
