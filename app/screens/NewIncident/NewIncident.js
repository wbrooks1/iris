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
import AddFieldModal from '../AddFieldModal/AddFieldModal';


import {components} from '../../config/mandatoryComponentList';
import {incidentURLs} from '../../config/strings'


export default class NewIncident extends Component {
    constructor() {
        super();
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
            location: {
                latitude: null,
                longitude: null,
            },
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
        var pos;
        navigator.geolocation.getCurrentPosition(
            (position) => {
                pos = position.coords.latitude + ", " + position.coords.longitude;
                console.log("Position:", pos);
                this.initalizeFormData(pos);
            },
            (error) => alert(JSON.stringify(error)),
            {timeout: 20000, maximumAge: 1000});

    }

    initalizeFormData(pos) {

        let newFormData = this.state.formData;
        let date = new Date();
        newFormData["user_id"] = 1;
        newFormData["title"] = {id: 'title', data: '', title: 'Title', type: 'text'};
        newFormData["desc"] = {id: 'desc', data: '', title: 'Description', type: 'multi_text'};
        newFormData["cat_id"] = 1;
        newFormData["location"] = {id: 'location', data: pos, title: 'Location', type: 'location'};
        newFormData["start_date"] = {id: 'start_date', data: date.toDateString(), title: 'Start Date', type: 'date'};
        date.setFullYear(date.getFullYear() + 3);
        newFormData["end_date"] = {id: 'end_date', data: date.toDateString(), title: 'End Date', type: 'date'};
        newFormData["freq"] = {id: 'freq', data: 'P1H', title: 'Reporting Frequency', type: 'text'};
        newFormData["keywords"] = {id: 'keywords', data: '', title: 'Keywords', type: 'text'};
    }

    updateFormInput(data, id, title, type) {
        let newFormData = this.state.formData;
        newFormData[id] = {id, data, title, type};

        this.setState({formData: newFormData});
    }


    submitIncident() {
        console.log("Return Object", this.state.formData);

        let data = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:
                JSON.stringify(
                this.state.formData
            )
        }
        fetch(incidentURLs.incidents, data)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Reponse to fetch", responseJson);
            }).catch((err) => {
            console.error(err);
        });
    }


    addField() {
        this.openModal()
    }

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

    _renderRow(rowData, sectionID, rowID) {
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
                           date={rowData[rowID].date}
                />
            )
        } else if (rowData[rowID].type === 'location') {
            return (
                <LocationInput title={rowData[rowID].title}
                               type={rowData[rowID].type}
                               updateInput={(data, id, title, type) => this.updateFormInput(data, id, title, type)}
                               id={rowID}
                               navigator={this.props.navigator}
                               location={this.state.location}
                />
            )

        }
    }

    render() {
        return (
            <View style={styles.container }>
                {this.renderModal()}
                <Text style={styles.title }>
                    Incident Response In Situ
                </Text >
                <Text style={styles.title }>
                    New Incident
                </Text >
                <ListView dataSource={this.state.dataSource}
                          renderRow={(data, sectionID, rowID) => this._renderRow(data, sectionID, rowID)}
                />
                <TouchableHighlight onPress={() => this.addField()}>
                    <Text style={styles.signIn}>
                        Add Field
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.submitIncident()}>
                    <Text style={styles.signIn}>
                        Submit Incident
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}
AppRegistry.registerComponent('NewIncident', () => NewIncident);
