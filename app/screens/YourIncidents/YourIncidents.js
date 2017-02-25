'use strict';

import React, {Component} from 'react';
import {AppRegistry, ListView, TouchableHighlight, StyleSheet, Text, Image, View, TextInput, ScrollView, Navigator, BackAndroid} from 'react-native'
import styles from './styles';
import {incidentURLs} from '../../config/strings'



export default class YourIncidents extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2, }),
            loaded: false, };
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 0) {
                this.props.navigator.pop();
                return true;
            }
            return false;
        });
    };

    componentDidMount() {
        //TODO: add get user logic.
        fetch(incidentURLs.users + '1/incidents')
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log("responseJson", responseJson.incidents[0].name);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseJson.incidents),
                    loaded: true,
                })
            }).catch((err) => {
            console.error(err);
        });
        // console.log("Datasource", this.state.dataSource);
    }



    toEditIncident = (id) => {
        console.log("toEditIncidents: id", id);
        this.props.navigator.push({
            id: 'EditIncident',
            passProps: {
                id: id
            }
        });
    };

    _renderRow(rowData, sectionID, rowID) {
         // console.log("rowdata", rowData);
        return (
            <View style={styles.row_container}>
                <TouchableHighlight onPress={() => this.toEditIncident(rowData.incident_id)}>
                    <Text style={styles.title}>{rowData.incident_id + ": " + rowData.name}</Text>
                </TouchableHighlight>
            </View>
        )
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
                <ListView dataSource={this.state.dataSource}
                          renderRow={(data, sectionID, rowID) => this._renderRow(data, sectionID, rowID)}                />
            </View>
        );
    }
}
AppRegistry.registerComponent('YourIncidents', () => YourIncidents);
