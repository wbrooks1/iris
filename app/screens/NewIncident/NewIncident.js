'use strict';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, TextInput, ScrollView, Navigator, BackAndroid,
    ListView, TouchableHighlight, Alert,
} from 'react-native'
import styles from './styles';
import InputFormRow from '../../components/InputFormRow';
import AddFieldModal from '../AddFieldModal/AddFieldModal';
import {Select, Option} from 'react-native-chooser';
import Toast from 'react-native-simple-toast';
import {incidentURLs} from '../../config/strings'

/**
 * Form screen for creating a new incident.
 * @author Winfield Brooks
 * @props userID: user id
 * @props location: user default location
 * @props token: security token
 */
export default class NewIncident extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            formData: {},
            modalVisible: false,
        };
    }

    /**
     * Formats data into two main parts.
     * this.state.dataSource is formatted to create form input components in the ListView.
     * this.state.formData is formatted to be uploaded to database.
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
            formData: data,
        });
    }

    //Set up navigator for back arrow press on android and call initializeFormData()
    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 0) {
                this.props.navigator.pop();
                return true;
            }
            return false;
        });
        this.initalizeFormData();
    }

    /**
     * Create base for data, initializes all mandatory input fields fields.
     */
    initalizeFormData() {
        var newFormData = {};
        let date = new Date();
        newFormData['user_id'] = this.props.userID;
        newFormData['cat_id'] = 1;
        newFormData['title'] = {id: 'title', data: '', title: 'Title', type: 'text'};
        newFormData['desc'] = {id: 'desc', data: '', title: 'Description', type: 'multi_text'};
        newFormData['location'] = {id: 'location', data: this.props.location, title: 'Location', type: 'location'};
        newFormData['start_date'] = {id: 'start_date', data: date.toISOString().slice(0,10), title: 'Start Date', type: 'date'};
        date.setFullYear(date.getFullYear() + 1);
        newFormData['end_date'] = {id: 'end_date', data: date.toISOString().slice(0,10), title: 'End Date', type: 'date'};
        newFormData['keywords'] = {id: 'keywords', data: '', title: 'Keywords', type: 'text'};
        newFormData['freq'] = {id: 'freq', data: 'P1H', title: 'Reporting Frequency', type: 'drop'};
        newFormData['custom_fields'] = {id: 'custom_fields', data: {}, title: 'Custom', type: 'custom'};
        this.formatData(newFormData);
    }

    /**
     * Update the formData when changes are made to an input component.
     * @param data
     * @param id
     * @param title
     * @param type
     */
    updateFormInput(data, id, title, type) {
        let newFormData = this.state.formData;
        //custom input fields will have the same title and id and must be added to formData[custom_fields].data
        if (id == title) {
            newFormData['custom_fields'].data[id] = {id, data, title, type};
        } else {
            newFormData[id] = {id, data, title, type};
        }
        this.setState({formData: newFormData});
    }

    /**
     * Change category id.
     * @param id
     */
    updateCategoryID(id) {
        let newFormData = this.state.formData;
        newFormData['cat_id'] = id;
        this.setState({formData: newFormData});
    }

    /**
     * Verify that all fields have data and that end date is after start date before incident can be uploaded.
     */
    verifySubmission() {
        var formCompleted = true;
        var toBeFilled = [];
        for (var item in this.state.formData) {
            if (this.state.formData[item].id && this.state.formData[item].data == '') {
                formCompleted = false;
                toBeFilled.push(' ' + this.state.formData[item].title);
            }
        }
        console.log(this.state.formData['start_date'].data, this.state.formData['end_date'].data)
        if (this.state.formData['start_date'].data > this.state.formData['end_date'].data){
            Alert.alert('Submit Incident', 'End Date must be after Start Date',
                [{text: 'OK', onPress: () => console.log('form not complete')},])
        } else if (formCompleted) {
            Alert.alert('Submit Incident', 'Are you sure you want to submit incident?',
                [{text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
                    {text: 'OK', onPress: () => this.submitIncident()}]);
        } else {
            Alert.alert('Submit Incident', 'Form incomplete. Mandatory fields: '
                + toBeFilled + ', must not be left blank.',
                [{text: 'OK', onPress: () => console.log('form not complete')},])
        }
    }

    /**
     * POST request to upload formData to database.
     */
    submitIncident() {
        console.log('NewIncident formData string', JSON.stringify(this.state.formData));
        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.token,
            },
            body: JSON.stringify(
                this.state.formData
            )
        }
        fetch(incidentURLs.incidents, data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('Reponse to fetch', responseJson);
                if (responseJson.location) {
                    Toast.show('Incident was created.');
                    this.props.navigator.pop();
                } else {
                    Toast.show('Something went wrong' + responseJson.error);
                }
            }).catch((err) => {
            console.error('NewIncident updateIncident()', err);
        });
    }

    /**
     * Renders AddFieldModal.
     * @returns {XML}
     */
    renderModal = () => {
        if (this.state.modalVisible) {
            return (
                <AddFieldModal modalVisible={this.state.modalVisible} closeModal={this.closeModal}
                               getInfo={this.getNewFieldInfo} dataSource={this.state.dataSource}
                />
            );
        }
    }

    /**
     * Adds new custom_field component to ListView dataSource
     * @param title
     * @param type
     */
    getNewFieldInfo = (title, type) => {
        let newArray = this.state.dataSource._dataBlob.s1;
        newArray.push({
            id: title,
            data: '',
            title: title,
            type: type,
        });
        console.log('new array', newArray);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newArray),
        });
        this.closeModal();
    }

    closeModal = () => {
        this.setState({modalVisible: false});
    }

    openModal = () => {
        this.setState({modalVisible: true});
    }

    /**
     * Render appropriate input component based on rowData using InputFormRow.
     * @param rowData
     * @returns input component
     */
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

    //TODO: handle adding categories.
    /**
     * Render header and a react-native-chooser (Details-> https://github.com/gs-akhan/react-native-chooser) to select
     * the incident category.
     * @returns {XML}
     */
    renderHeader() {
        return (
            <View style={styles.container}>
                <Image style={styles.image } source={require('../../images/iris_logo_homepage.png')}>
                    <TouchableHighlight style={styles.back_arrow} onPress={() => this.props.navigator.pop()}>
                        <Image style={styles.back_arrow} source={require('../../images/back_icon.png')}/>
                    </TouchableHighlight>
                </Image>
                <Text style={styles.header_text}>
                    New Incident
                </Text >
                <Text style={styles.title}>
                    Incident Category
                </Text>
                <Select
                    onSelect = {(id) => this.updateCategoryID(id)}
                    defaultText  = 'Medical'
                    style = {styles.select}
                    textStyle = {styles.option_list_text}
                    backdropStyle  = {styles.select}
                    optionListStyle = {styles.option_list}
                    transparent = {true}
                    indicator={'down'}
                    selected={1}
                >
                    <Option styleText={styles.option_list_text} value = {1}>Medical</Option>
                    <Option styleText={styles.option_list_text} value = {2}>Natural Disaster</Option>
                    <Option styleText={styles.option_list_text} value = {3}>Military</Option>
                    <Option styleText={styles.option_list_text} value = {4}>Other</Option>
                </Select>
            </View>
        );
    }

    renderFooter() {
        return (
            <View style={styles.footer}>
                <TouchableHighlight onPress={() => this.openModal()}>
                    <Text style={styles.add_field_text}>
                        +Add Custom Input
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container }>
                {this.renderModal()}
                <ListView dataSource={this.state.dataSource}
                          renderRow={(data) => this.renderRow(data)}
                          renderHeader={() => this.renderHeader()}
                          renderFooter={() => this.renderFooter()}

                />
                <TouchableHighlight onPress={() => this.verifySubmission()} style={styles.submit_button}>
                    <Text style={styles.submit_text}>
                        Submit Incident
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
AppRegistry.registerComponent('NewIncident', () => NewIncident);
