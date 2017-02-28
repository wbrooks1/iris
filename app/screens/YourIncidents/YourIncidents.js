'use strict';

import React, {Component} from 'react';
import {AppRegistry, ListView, TouchableHighlight, StyleSheet, Text, Image, View, TextInput, Navigator, BackAndroid
} from 'react-native'
import styles from './styles';
import {incidentURLs} from '../../config/strings'


export default class YourIncidents extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
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
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseJson),
                    loaded: true,
                })
            }).catch((err) => {
            console.error(err);
        });
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

    renderRow(rowData) {
        //TODO: Fix desc and title on saving and displaying.
        return (
            <TouchableHighlight onPress={() => this.toEditIncident(rowData.incident_id)}>
                <View style={styles.row_container}>
                    <Image style={styles.icon} source={require('../../images/globe_icon_red.png')}/>
                    <View style={styles.text_view}>
                        <Text style={styles.list_title}>{rowData.desc.data}</Text>
                        <Text numberOfLines={1} style={styles.list_desc}> {rowData.start_date.data}</Text>
                        <Text numberOfLines={1} style={styles.list_desc}> {rowData.title.data}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    renderHeader() {
        return (
            <View style={styles.container}>
                <Image style={styles.image } source={require('../../images/iris_logo_homepage.png' ) }/>
                <Text style = {styles.title }>
                    Your Incidents
                </Text >
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container }>
                              <ListView dataSource={this.state.dataSource}
                          renderRow={(data) => this.renderRow(data)}
                          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                          renderHeader={() => this.renderHeader()}
                />
            </View>
        );
    }
}
AppRegistry.registerComponent('YourIncidents', () => YourIncidents);
