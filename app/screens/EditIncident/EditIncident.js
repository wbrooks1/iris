'use strict';

import React, {Component} from 'react';
import {
    AppRegistry, StyleSheet, Text, Image, View, TextInput, ScrollView, Navigator, BackAndroid,
    ListView, TouchableHighlight
} from 'react-native'
import styles from './styles';
import SingleLineInput from '../../components/SingleLineInput';
import MultiLineInput from '../../components/MultiLineInput';
import DateInput from '../../components/DateInput';
import LocationInput from '../../components/LocationInput';

import {incident} from '../../config/EditIncidentTest'
import {incidentURLs} from '../../config/strings'


export default class EditIncident extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            formData: {},
            modalVisible: false,
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
        this.fetchData()
    }

    fetchData() {
        fetch(incidentURLs.incidents + '/' + this.props.id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.formatData(responseJson);
            }).catch((err) => {
            console.error(err);
        });
    }

    formatData(data) {
        var dataArr = [];
        for (var title in data) {
            if (data[title] && data[title].hasOwnProperty('id')) {
                dataArr.push(data[title]);
            }
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(dataArr),
            formData: data
        })
    }


    updateFormInput(data, id, title, type) {
        let newFormData = this.state.formData;
        newFormData[id] = {id, data, title, type};
        this.setState({formData: newFormData});
    }

    submitIncident() {
        //TODO: add submit incident logic.
        console.log("Return Object", this.state.formData);
    }

    _renderRow(rowData) {
        if (rowData.type === "text") {
            return (
                <SingleLineInput title={rowData.title}
                                 type={rowData.type}
                                 data={rowData.data}
                                 updateInput={(data, id, type) => this.updateFormInput(data, id, type)}
                                 id={rowData.id}
                                 isEdit={true}
                />
            );
        } else if (rowData.type === "multi_text") {
            return (
                <MultiLineInput title={rowData.title}
                                type={rowData.type}
                                data={rowData.data}
                                updateInput={(data, id, type) => this.updateFormInput(data, id, type)}
                                id={rowData.id}
                                isEdit={true}
                />
            );
        } else if (rowData.type === 'date') {
            return (
                <DateInput title={rowData.title}
                           type={rowData.type}
                           updateInput={(data, id, type) => this.updateFormInput(data, id, type)}
                           id={rowData.id}
                           date={rowData.data}
                />
            )
        } else if (rowData.type === 'location') {
            return (
                <LocationInput title={rowData.title}
                               type={rowData.type}
                               updateInput={(data, id, type) => this.updateFormInput(data, id, type)}
                               id={rowData.id}
                               navigator={this.props.navigator}
                               location={rowData.data}
                />
            )

        }
    }

    render() {
        return (
            <View style={styles.container }>
                <Text style={styles.title }>
                    Incident Response In Situ
                </Text >
                <Text style={styles.title }>
                    Edit Incident
                </Text >
                <ListView dataSource={this.state.dataSource} enableEmptySections={true}
                          renderRow={(data) => this._renderRow(data)}
                />
                <TouchableHighlight onPress={() => this.submitIncident()}>
                    <Text style={styles.signIn}>
                        Save Changes
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

AppRegistry.registerComponent('EditIncident', () => EditIncident);
