'use strict';

import React, {Component} from 'react';
import {
    AppRegistry, StyleSheet, Text, Image, View, TextInput, ScrollView, Navigator, BackAndroid,
    ListView, TouchableHighlight, Alert,
} from 'react-native'
import styles from './styles';
import InputFormRow from '../../components/InputFormRow';

import {incidentURLs} from '../../config/strings'

/**
 * Edit incident screen retrieves and updates selected incident data.
 * @author Winfield Brooks
 * @props id: incident id to edit
 */
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

    //Set up navigator for back arrow press on android.
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

    /**
     * Fetches incident data for selected incident id
     */
    fetchData() {
        fetch(incidentURLs.incidents + '/' + this.props.id)
            .then((response) => response.json())
            .then((responseJson) => {
                this.formatData(responseJson);
                console.log("fetchData()", JSON.stringify(responseJson));
            }).catch((err) => {
            console.error(err);
        });
    }

    /**
     * Extract ListView components and custom_fields from incident data.
     * Set formData equal to incident data.
     * @param data
     */
    formatData(data) {
        var dataArr = [];
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
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(dataArr),
            formData: data
        })
    }

    /**
     * Update formData to reflect field changes.
     * Custom fields data added to formData[custom_fields].data
     * @param data
     * @param id
     * @param title
     * @param type
     */
    updateFormInput(data, id, title, type) {
        let newFormData = this.state.formData;
        if (id == title) {
            newFormData['custom_fields'].data[id] = {id, data, title, type};
        }
        newFormData[id] = {id, data, title, type};
        this.setState({formData: newFormData});
    }

    /**
     * Submit formData as POST body.
     */
    submitIncident() {
        //TODO: add submit incident logic.
        console.log("Return Object", this.state.formData);
        this.props.navigator.pop();
    }

    /**
     * Verify that all mandatory data has been entered and that the end date is not before the start date
     * and call submitIncident if verified.
     */
    verifySubmission() {
        var formCompleted = true;
        var toBeFilled = [];
        for(var item in this.state.formData) {
            if(this.state.formData[item].id && this.state.formData[item].data == '') {
                formCompleted = false;
                toBeFilled.push(' ' + this.state.formData[item].title);
            }
        } if (this.state.formData['start_date'].data > this.state.formData['end_date'].data){
            Alert.alert('Submit Incident', 'End Date must be after Start Date',
                [{text: 'OK', onPress: () => console.log('form not complete')},])
        } else if (formCompleted) {
            Alert.alert('Edit Incident', 'Are you sure you want to save incident?' +
                'Overwritten information will be lost.',
                [{text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
                    {text: 'OK', onPress: () => this.submitIncident()}]);
        } else {
            Alert.alert('Edit Incident', 'Form incomplete. Mandatory fields: '
                + toBeFilled + ', must not be left blank.',
                [{text: 'OK', onPress: () => console.log('form not complete')},])
        }
    }

    renderRow(rowData) {
        console.log("Row data", rowData);
        var location;
        if(rowData.type === 'location') {
            location = rowData.data;
        }
        return (
            <InputFormRow rowData={rowData}
                          isEdit={true}
                          location={location}
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
                <Text style={styles.title }>
                    Edit Incident
                </Text >
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container }>
                <ListView style={styles.list_container}
                    dataSource={this.state.dataSource} enableEmptySections={true}
                          renderRow={(data) => this.renderRow(data)}
                          renderHeader={() => this.renderHeader()}
                />
                <TouchableHighlight style={styles.submit_button} onPress={() => this.verifySubmission()}>
                    <Text style={styles.save_text}>
                        Save Changes
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

AppRegistry.registerComponent('EditIncident', () => EditIncident);
