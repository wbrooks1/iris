'use strict';

import React, {Component} from 'react';
import {ListView, TouchableHighlight, StyleSheet, Text, Image, View, TextInput, ScrollView, Navigator, BackAndroid} from 'react-native'
import styles from './styles';
import {incidentURLs} from '../../config/strings'

/**
 * Screen to search incidents to report on.
 * @author Winfield Brooks
 * @props userID: user id
 * @props location: user default location
 * @props token: security token
 */
export default class SearchIncidents extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
    }

    //Set up navigator for back arrow press on android
    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 0) {
                this.props.navigator.pop();
                return true;
            }
            return false;
        });
    }

    /**
     * Fetch and list all incidents upon opening.
     */
    componentDidMount() {
        fetch(incidentURLs.incidents)
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

    /**
     * Search incidents, search implemented in backend.
     * Fetches only incidents with keywords that match input.
     * @param input
     */
    searchIncidents = (input) => {
        fetch(incidentURLs.search + input)
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

    /**
     * To new report screen for selected incident.
     * @param id
     */
    toNewReport = (id) => {
        this.props.navigator.push({
            id: 'NewReport',
            passProps: {
                id: id,
                userID: this.props.userID,
                token: this.props.token,
                location: this.props.location,
            }
        });
    };

    renderRow(rowData) {
        if (rowData.title) {
            return (
                <TouchableHighlight onPress={() => this.toNewReport(rowData.incident_id)}>
                    <View style={styles.row_container}>
                        <Image style={styles.icon} source={require('../../images/globe_icon_red.png')}/>
                        <View style={styles.container}>
                            <Text style={styles.list_title}>{rowData.title.data}</Text>
                            <Text numberOfLines={1} style={styles.list_desc}> {rowData.start_date.data}</Text>
                            <Text numberOfLines={1} style={styles.list_desc}> {rowData.desc.data}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            );
        } else {
            return null;
        }
    }

    /**
     * Render header and search bar. Search is conducted as text changes in search bar.
     */
    renderHeader() {
        return (
            <View style={styles.container}>
                <Image style={styles.image } source={require('../../images/iris_logo_homepage.png')}>
                    <TouchableHighlight style={styles.back_arrow} onPress={() => this.props.navigator.pop()}>
                        <Image style={styles.back_arrow} source={require('../../images/back_icon.png')}/>
                    </TouchableHighlight>
                </Image>
                <Text style = {styles.title }>
                    Search Incidents
                </Text >
                <View style={styles.search_box}>
                <TextInput
                    style={styles.input}
                    placeholder="Search keywords..."
                    onChangeText={(text) => this.searchIncidents(text)}
                />
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style = {styles.container }>
                <TouchableHighlight onPress={() => this.toNewReport()}>
                    <ListView dataSource={this.state.dataSource}
                              renderHeader={() => this.renderHeader()}
                              renderRow={(data) => this.renderRow(data)}
                              renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    />
                </TouchableHighlight>
            </View>
        );
    }
}