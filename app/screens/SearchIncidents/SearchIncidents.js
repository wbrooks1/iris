'use strict';

import React, {Component} from 'react';
import {AppRegistry, ListView, TouchableHighlight, StyleSheet, Text, Image, View, TextInput, ScrollView, Navigator, BackAndroid} from 'react-native'
import styles from './styles';
import SingleLineInput from '../../components/SingleLineInput';
import {incidentURLs} from '../../config/strings'



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

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 0) {
                this.props.navigator.pop();
                return true;
            }
            return false;
        });
    }

    componentDidMount() {
        //TODO: add get user logic.
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

    searchIncidents = (input) => {
        console.log('Search input', input);
    }

    toNewReport = (id) => {
        console.log("toNewReport: id", id);
        this.props.navigator.push({
            id: 'NewReport',
            passProps: {
                id: id,
                userID: this.props.userID,
                token: this.props.token,
            }
        });
    };

    renderRow(rowData) {
        //TODO: Fix desc and title on saving and displaying.
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
    }

    renderHeader() {
        return (
            <View style={styles.container}>
                <Image style={styles.image } source={require('../../images/iris_logo_homepage.png')}>
                    <TouchableHighlight onPress={() => this.props.navigator.pop()}>
                        <Image style={styles.back_arrow} source={require('../../images/back_icon.png')}/>
                    </TouchableHighlight>
                </Image>
                <Text style = {styles.title }>
                    Search Incidents
                </Text >
                <View style={styles.search_box}>
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    onChangeText={(text) => console.log('searching for ', text)}
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
AppRegistry.registerComponent('SearchIncidents', () => SearchIncidents );
