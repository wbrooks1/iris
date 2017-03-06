'use strict'; /** * Login Screen: holds buttons for opening login modal */

import React, {Component} from 'react';
import {AppRegistry, TouchableHighlight, StyleSheet, Text,Image, View, TextInput, ScrollView, Navigator, AsyncStorage} from 'react-native'
import styles from './styles';
import HomeButton from '../../components/HomeButton';


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // location: this.props.location,
        }
    }
    toNewIncident = () => {
        this.props.navigator.push({
            id: 'NewIncident',
            passProps: {
                location: this.props.location,
            }
            });
    }
    toYourIncidents = () => {
        this.props.navigator.push({
            id: 'YourIncidents',
        });
    }
    toSearchIncidents = () => {
        this.props.navigator.push({
            id: 'SearchIncidents',
        });
    }
    toViewReports = () => {
        this.props.navigator.push({
            id: 'ViewReports',
        });
    }
    async logout() {
        try {
            await AsyncStorage.setItem('@AsyncStorage:loginStatus', 'false');
            await AsyncStorage.setItem('@AsyncStorage:accessToken', '');
            this.props.navigator.resetTo({
                id: 'Login',
            });
        } catch (error) {
            console.error(error);
        }
    }

  render() {
    return (
      <View style = {styles.container }>
          <Image style = {styles.background } source = {require('../../images/home_background.jpg' ) }>
          <Image style = {styles.image } source = {require('../../images/iris_logo_homepage_white.png' ) }/>
              <View style={styles.text_row}>
                  <Text style = {styles.user}> {this.props.userName} </Text>
                  <TouchableHighlight onPress={() => this.logout()}>
              <Text style = {styles.logout_text}> Logout </Text>
          </TouchableHighlight>
              </View>
          <View style={styles.row_container}>
              <HomeButton
                  image={require('../../images/new_incident_icon.png')}
                  onPress={() => this.toNewIncident()}
              />
              <HomeButton
                  image={require('../../images/your_incidents_icon.png')}
                  onPress={() => this.toYourIncidents()}
              />
          </View>
          <View style={styles.row_container}>
              <HomeButton
                  image={require('../../images/search_incidents_icon.png')}
                  onPress={() => this.toSearchIncidents()}
              />
              <HomeButton
                  image={require('../../images/view_reports_icon.png')}
                  onPress={() => this.toViewReports()}
              />
          </View>
          </Image>
      </View>
      );
    }
  }
AppRegistry.registerComponent('Home', () => Home );
