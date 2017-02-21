'use strict';

import React, {Component} from 'react';
import {AppRegistry, TouchableHighlight, StyleSheet, Text, Image, View, TextInput, ScrollView, Navigator, BackAndroid} from 'react-native'
import styles from './styles';


export default class YourIncidents extends Component {
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

    toEditIncident = () => {
        this.props.navigator.push({
            id: 'EditIncident',
        });
    }

    render() {
        return (
            <View style={styles.container }>
                <Text style={styles.title }>
                    Incident Response In Situ
                </Text >
                <Text style={styles.title }>
                    Your Incidents
                </Text >
                <TouchableHighlight onPress={() => this.toEditIncident()}>
                    <Text style={styles.title}>
                        Edit Incident
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
AppRegistry.registerComponent('YourIncidents', () => YourIncidents);
