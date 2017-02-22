'use strict';

import React, {Component} from 'react';
import {AppRegistry, TouchableHighlight, StyleSheet, Text, Image, View, TextInput, ScrollView, Navigator, BackAndroid} from 'react-native'
import styles from './styles';
import SingleLineInput from '../../components/SingleLineInput';



export default class SearchIncidents extends Component {
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

    searchIncidents = (input) => {
        console.log('Search input', input);
    }

    toNewReport = () => {
        this.props.navigator.push({
            id: 'NewReport',
        });
    }

    render() {
        return (
            <View style = {styles.container }>
                <Text style = {styles.title }>
                    Incident Response In Situ
                </Text >
                <Text style = {styles.title }>
                    Search Incidents
                </Text >
                <SingleLineInput title={'Search Incidents'}
                                 placeholder={'Enter search'}
                                 updateInput={(input) => this.searchIncidents(input)}
                />
                <TouchableHighlight onPress={() => this.toNewReport()}>
                    <Text style={styles.title}>
                        New Report
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
AppRegistry.registerComponent('SearchIncidents', () => SearchIncidents );
