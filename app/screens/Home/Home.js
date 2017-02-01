'use strict'; /** * Login Screen: holds buttons for opening login modal */

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text,Image, View, TextInput, ScrollView, Navigator} from 'react-native'
import styles from './styles';
import HomeButton from '../../components/HomeButton';


export default class Home extends Component {
    // constructor() {
    //     super();
    // }
    toNewIncident = () => {
        this.props.navigator.push({
            id: 'NewIncident',
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

  render() {
    return (
      <View style = {styles.container }>
          <Image style = {styles.image } source = {require('../../images/iris_logo_homepage.png' ) }/>
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
      </View>
      );
    }
  }
AppRegistry.registerComponent('Home', () => Home );
