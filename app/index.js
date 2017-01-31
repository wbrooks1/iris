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
  Navigator,
} from 'react-native'
import Login  from './screens/Login';
import Home from './screens/Home';
import NewIncident from './screens/NewIncident';


export default class IRIS extends Component {
  render() {
    return (
      <Navigator
      initialRoute={{id: 'Login', name: 'index'}}
      renderScene={this.renderScene.bind(this)}
      configureScene={(route) => {
        if (route.sceneConfig) {
          return route.sceneConfig;
        }
        return Navigator.SceneConfigs.FloatFromRight;
      }} />
    );
  }
  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'Login') {
      return (
        <Login
        navigator={navigator} />
      );
    }
    if (routeId === 'Home') {
      return (
        <Home
        navigator={navigator} />
      );
    }
    if (routeId === 'NewIncident') {
      return (
          <NewIncident
        navigator={navigator} />
    );
    }
  }
}

AppRegistry.registerComponent('IRIS', () => IRIS);
