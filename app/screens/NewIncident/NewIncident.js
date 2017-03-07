'use strict';

import React, {Component} from 'react';
import {
    AppRegistry, StyleSheet, Text, Image, View, TextInput, ScrollView, Navigator, BackAndroid,
    ListView, TouchableHighlight, Alert,
} from 'react-native'
import styles from './styles';
import SingleLineInput from '../../components/SingleLineInput';
import MultiLineInput from '../../components/MultiLineInput';
import DateInput from '../../components/DateInput';
import LocationInput from '../../components/LocationInput';
import DropDownInput from '../../components/DropDownInput';
import AddFieldModal from '../AddFieldModal/AddFieldModal';
import Toast from 'react-native-simple-toast';


import {components} from '../../config/mandatoryComponentList';
import {incidentURLs} from '../../config/strings'


export default class NewIncident extends Component {
    constructor(props) {
        super(props);
        const getRowData = (dataBlob, rowId) => dataBlob[`${rowId}`];
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            getRowData,
        });
        const {dataBlob, rowIds} = this.formatData(components, "medical");
        this.state = {
            dataSource: ds.cloneWithRows(dataBlob, rowIds),
            db: dataBlob,
            formData: {},
            modalVisible: false,
        };
    }

    formatData(data, category) {
        const dataBlob = {};
        const rowIds = [];
        const comps = data.medical;
        for (let i = 0; i < comps.length; i++) {
            const rowId = comps[i].id;
            rowIds.push(rowId);
            dataBlob[rowId] = comps[i];
        }
        return {dataBlob, rowIds};
    }

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

    initalizeFormData() {
        let newFormData = this.state.formData;
        let date = new Date();
        newFormData["user_id"] = this.props.userID;
        newFormData["title"] = {id: 'title', data: '', title: 'Title', type: 'text'};
        newFormData["desc"] = {id: 'desc', data: '', title: 'Description', type: 'multi_text'};
        newFormData["cat_id"] = 1;
        newFormData["location"] = {id: 'location', data: this.state.location, title: 'Location', type: 'location'};
        newFormData["start_date"] = {id: 'start_date', data: date.toDateString(), title: 'Start Date', type: 'date'};
        date.setFullYear(date.getFullYear() + 3);
        newFormData["end_date"] = {id: 'end_date', data: date.toDateString(), title: 'End Date', type: 'date'};
        newFormData["freq"] = {id: 'freq', data: 'P1H', title: 'Reporting Frequency', type: 'drop'};
        newFormData["keywords"] = {id: 'keywords', data: '', title: 'Keywords', type: 'text'};
        newFormData["custom_fields"] = {id: 'custom_fields', data: {}, title: 'Custom', type: 'custom'};
        this.setState({
            formData: newFormData,
        });
    }

    updateFormInput(data, id, title, type) {
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
        for (var item in this.state.formData) {
            console.log("verifySubmission", this.state.formData);
            if (this.state.formData[item].id && this.state.formData[item].data == '') {
                console.log("verifySubmission formData", this.state.formData[item]);

                formCompleted = false;
                toBeFilled.push(' ' + this.state.formData[item].title);
            }
        }
        if (formCompleted) {
            Alert.alert('Submit Incident', 'Are you sure you want to submit incident?',
                [{text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
                    {text: 'OK', onPress: () => this.submitIncident()}]);
        } else {
            Alert.alert('Submit Incident', 'Form incomplete. Mandatory fields: '
                + toBeFilled + ', must not be left blank.',
                [{text: 'OK', onPress: () => console.log('form not complete')},])
        }
    }

    submitIncident() {
        console.log("Return Object", this.state.formData);
        console.log("Return object string", JSON.stringify(this.state.formData));
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
                console.log("Reponse to fetch", responseJson);
                this.props.navigator.pop();
                if (responseJson.location) {
                    Toast.show('Incident was created.');
                } //TODO: Handle error for creating report.
            }).catch((err) => {
            console.error("NewIncident submitIncident()", err);
        });
    }


    addField() {
        this.openModal()
    }

    /**
     * Adds new custom_field component to ListView dataSource
     * @param title
     * @param type
     */
    getNewFieldInfo = (title, type) => {
        let newArray = this.state.db;
        newArray[title] = {
            title: title,
            type: type,
        };
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newArray),
            db: newArray,
        });
        this.closeModal();
    }

    closeModal = () => {
        this.setState({modalVisible: false});
    }

    openModal = () => {
        this.setState({modalVisible: true});
    }

    renderModal = () => {
        if (this.state.modalVisible) {
            return (
                <AddFieldModal modalVisible={this.state.modalVisible} closeModal={this.closeModal}
                               getInfo={this.getNewFieldInfo} dataSource={this.state.dataSource}
                />
            );
        }
    }

    renderRow(rowData, sectionID, rowID) {
        if (rowData[rowID].type === "text") {
            return (
                <SingleLineInput title={rowData[rowID].title}
                                 type={rowData[rowID].type}
                                 placeholder={rowData[rowID].placeholder}
                                 updateInput={(data, id, title, type) => this.updateFormInput(data, id, title, type)}
                                 id={rowID}
                />            );
        } else if (rowData[rowID].type === "multi_text") {
            return (
                <MultiLineInput title={rowData[rowID].title}
                                type={rowData[rowID].type}
                                placeholder={rowData[rowID].placeholder}
                                updateInput={(data, id, title, type) => this.updateFormInput(data, id, title, type)}
                                id={rowID}
                />
            );
        } else if (rowData[rowID].type === 'date') {
            return (
                <DateInput title={rowData[rowID].title}
                           type={rowData[rowID].type}
                           updateInput={(data, id, title, type) => this.updateFormInput(data, id, title, type)}
                           id={rowID}
                           date={rowData[rowID].data}
                />
            )
        } else if (rowData[rowID].type === 'location') {
            return (
                <LocationInput title={rowData[rowID].title}
                               type={rowData[rowID].type}
                               updateInput={(data, id, title, type) => this.updateFormInput(data, id, title, type)}
                               id={rowID}
                               navigator={this.props.navigator}
                               location={this.props.location}
                />
            )
        }else if (rowData[rowID].type === 'drop') {
            return (
                <DropDownInput title={rowData[rowID].title}
                               type={rowData[rowID].type}
                               updateInput={(data, id, title, type) => this.updateFormInput(data, id, title, type)}
                               id={rowID}
                               navigator={this.props.navigator}
                />
            )
        }
    }

    renderHeader() {
        return (
            <View style={styles.container}>
                <Image style={styles.image } source={require('../../images/iris_logo_homepage.png')}>
                    <TouchableHighlight onPress={() => this.props.navigator.pop()}>
                        <Image style={styles.back_arrow} source={require('../../images/back_icon.png')}/>
                    </TouchableHighlight>
                </Image>
                <Text style={styles.header_text}>
                    New Incident
                </Text >
            </View>
        );
    }

    renderFooter() {
        return (
            <View style={styles.footer}>
                <TouchableHighlight onPress={() => this.addField()}>
                    <Text style={styles.add_field_text}>
                        +Add Field
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
                          renderRow={(data, sectionID, rowID) => this.renderRow(data, sectionID, rowID)}
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
