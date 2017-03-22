'use strict';

import React, {Component} from 'react';
import {
    AppRegistry, Alert, StyleSheet, Text, Image, View, TextInput, ScrollView, Navigator, BackAndroid,
    ListView, TouchableHighlight
} from 'react-native'
import styles from './styles';
import InputFormRow from '../../components/InputFormRow';
import Toast from 'react-native-simple-toast';
import {incidentURLs} from '../../config/strings'


export default class NewReport extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.location)
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            formData: {},
            modalVisible: false,
            incidentName: '',
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
        //TODO: get user_id for report creator and fix naming for title and description.
        var dataArr = [];
        this.setState({incidentName: data['title'].data});
        delete data['created'];
        delete data['title'];
        delete data['start_date'];
        delete data['end_date'];
        delete data['frequency'];
        delete data['keywords'];
        delete data['cat_id'];
        delete data['title'];

        for (var item in data) {
            if (data[item] && data[item].hasOwnProperty('id')) {
                if (item == 'custom_fields') {
                    for (var a in data['custom_fields'].data) {
                        dataArr.push(data['custom_fields'].data[a]);
                    }
                } else {
                    dataArr.push(data[item]);
                }
            }
        }
        data['user_id'] = this.props.userID;
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(dataArr),
            formData: data
        })
        console.log("formData after blanking", this.state.formData);
    }


    updateFormInput(data, id, title, type) {
        console.log('udateFromInput', data, id, title, type)
        let newFormData = this.state.formData;
        if (id == title) {
            newFormData['custom_fields'].data[id] = {id, data, title, type};
        } else {
            newFormData[id] = {id, data, title, type};
        }
        this.setState({formData: newFormData});
    }

    verifySubmission() {
        var formCompleted = true;
        var toBeFilled = [];
        for(var item in this.state.formData) {
            if(this.state.formData[item].id && this.state.formData[item].data == '') {
                formCompleted = false;
                toBeFilled.push(' ' + this.state.formData[item].title);
            }
        } if (formCompleted) {
            Alert.alert('New Report', 'Are you sure you want to save incident?',
                [{text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
                    {text: 'OK', onPress: () => this.submitReport()}]);
        } else {
            Alert.alert('New Report', 'Form incomplete. Mandatory fields: '
                + toBeFilled + ', must not be left blank.',
                [{text: 'OK', onPress: () => console.log('form not complete')},])
        }
    }

    submitReport() {
        console.log("Return Object", this.state.formData);
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.token,
            },
            body:
                JSON.stringify(
                    this.state.formData
                )
        }
        fetch(incidentURLs.reports + 'incidents/' + this.props.id + '/reports', data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Reponse to fetch", responseJson);
                this.props.navigator.pop();
                if (responseJson.location) {
                    Toast.show('Report was created.');
                } //TODO: Handle error for creating report.
            }).catch((err) => {
            console.error("NewReport submitReport()", err);
        });
    }


    renderRow(rowData) {
        return (
            <InputFormRow rowData={rowData}
                          isEdit={false}
                          location={this.props.location}
                          navigator={this.props.navigator}
                          updateInput={(data, id, title, type) => this.updateFormInput(data, id, title, type)}

            />
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
                <Text style={styles.title}>
                    New Report: {this.state.incidentName}
                </Text >
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container }>
                <ListView dataSource={this.state.dataSource} enableEmptySections={true}
                          renderRow={(data) => this.renderRow(data)}
                          renderHeader={() => this.renderHeader()}
                />
                <TouchableHighlight  style={styles.submit_button} onPress={() => this.verifySubmission()}>
                    <Text style={styles.save_text}>
                        Submit Report
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

AppRegistry.registerComponent('NewReport', () => NewReport);
