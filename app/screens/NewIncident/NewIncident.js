'use strict';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, TextInput, ScrollView, Navigator} from 'react-native'
import styles from './styles';


export default class NewIncident extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <View style = {styles.container }>
                <Text style = {styles.title }>
                    Incident Response In Situ
                </Text >
                <Text style = {styles.title }>
                    New Incident
                </Text >
            </View>
        );
    }
}
AppRegistry.registerComponent('NewIncident', () => NewIncident );
