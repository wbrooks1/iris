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
import YourIncidents from './screens/YourIncidents';
import SearchIncidents from './screens/SearchIncidents';
import ViewReports from './screens/ViewReports';
import EditIncident from './screens/EditIncident';
import NewReport from './screens/NewReport';



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
        if (routeId === 'YourIncidents') {
            return (
                <YourIncidents
                    navigator={navigator} />
            );
        }
        if (routeId === 'SearchIncidents') {
            return (
                <SearchIncidents
                    navigator={navigator} />
            );
        }
        if (routeId === 'ViewReports') {
            return (
                <ViewReports
                    navigator={navigator} />
            );
        }
        if (routeId === 'EditIncident') {
            return (
                <EditIncident
                    navigator={navigator}
                    {...route.passProps}/>
            );
        }
        if (routeId === 'NewReport') {
            return (
                <NewReport
                    navigator={navigator}
                    {...route.passProps}/>
            );
        }
    }
}

AppRegistry.registerComponent('IRIS', () => IRIS);
