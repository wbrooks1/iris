'use strict';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, TextInput, ScrollView, Navigator, BackAndroid} from 'react-native'
import styles from './styles';


export default class ViewReports extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 0) {
                this.props.navigator.pop();
                return true;
            }
            return false;
        });
    }

    render() {
        return (
            <View style = {styles.container }>
                <Text style = {styles.title }>
                    Incident Response In Situ
                </Text >
                <Text style = {styles.title }>
                    View Reports
                </Text >
            </View>
        );
    }
}
AppRegistry.registerComponent('ViewReports', () => ViewReports );
