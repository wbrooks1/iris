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
            console.log("rowId:", rowId);

            rowIds.push(rowId);
            dataBlob[rowId] = comps[i];
        }
        console.log("DataBlob", dataBlob);
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
            (position) => { pos = position.coords.latitude + ", " + position.coords.longitude;
            console.log("Position:", pos);
            this.initalizeFormData(pos);
            },
            (error) => alert(JSON.stringify(error)),
            { timeout: 20000, maximumAge: 1000});

    }

    initalizeFormData(pos) {
        let newFormData = this.state.formData;
        let date = new Date();
        newFormData["user"] = "username";
        newFormData["category"] = "medical";
        newFormData["time_stamp"] = date.toDateString();
        newFormData["start_date"] = {id:'start_date', data: date.toDateString(), type: 'date'};
        date.setFullYear(date.getFullYear() + 3);
        newFormData["end_date"] = {id:'end_date', data: date.toDateString(), type: 'date'};
        newFormData["location"] = {id:'location', data: pos, type: 'location'};
    }

    updateFormInput(data, id, type) {
        console.log("text:", data);
        console.log("id:", id);
        let newFormData = this.state.formData;
        newFormData[id] = {id, data, type}
        console.log("formData:", newFormData);
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
            body: JSON.stringify({
            user_id: 1,
            name:'Name for Incident',
            desc:'this is a description',
            cat_id:1,
            lat:40,
            long:-22,
            start:'2017-03-01',
            end:'2017-03-20',
            freq:'P1D',
            keywords:['key', 'word']
            })
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
                                updateInput={(data, id, type) => this.updateFormInput(data, id, type)}
                                id={rowID}
                />            );
        } else if (rowData[rowID].type === "multi_text") {
            return (
                <MultiLineInput title={rowData[rowID].title}
                                type={rowData[rowID].type}
                                placeholder={rowData[rowID].placeholder}
                                updateInput={(data, id, type) => this.updateFormInput(data, id, type)}
                                id={rowID}
                />
            );
        } else if (rowData[rowID].type === 'date') {
            return (
                <DateInput title={rowData[rowID].title}
                           type={rowData[rowID].type}
                           updateInput={(data, id, type) => this.updateFormInput(data, id, type)}
                           id={rowID}
                           date={rowData[rowID].date}
                />
            )
        } else if (rowData[rowID].type === 'location') {
            return (
                <LocationInput title={rowData[rowID].title}
                               type={rowData[rowID].type}
                               updateInput={(data, id, type) => this.updateFormInput(data, id, type)}
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
                /><TouchableHighlight onPress={() => this.addField()}>
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
