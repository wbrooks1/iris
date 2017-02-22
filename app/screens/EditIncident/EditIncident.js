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

export default class EditIncident extends Component {
    constructor() {
        super();
        const getRowData = (dataBlob, rowId) => dataBlob[`${rowId}`];
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            getRowData,
        });
        const {dataBlob, rowIds} = this.formatData(incident, "medical");
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
        const comps = data.incident;
        // this.setState({formData: comps});
        console.log("Edit incident data", data);
        console.log("Edit incident comps.length", comps.length);
        console.log("Edit incident data", data);

        for (let i = 3; i < comps.length; i++) {
            const rowId = comps[i].title;
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
    }

    submitIncident() {
        console.log("Return Object", this.state.formData);
    }

    _renderRow(rowData, sectionID, rowID) {
        if (rowData[rowID].type === "text") {
            return (
                <SingleLineInput title={rowData[rowID].title}
                                 type={rowData[rowID].type}
                                 data={rowData[rowID].data}
                                 updateInput={(data, id, type) => this.updateFormInput(data, id, type)}
                                 id={rowID}
                                 isEdit={true}
                />
            );
        } else if (rowData[rowID].type === "multi_text") {
            return (
                <MultiLineInput title={rowData[rowID].title}
                                type={rowData[rowID].type}
                                data={rowData[rowID].data}
                                updateInput={(data, id, type) => this.updateFormInput(data, id, type)}
                                id={rowID}
                                isEdit={true}
                />
            );
        } else if (rowData[rowID].type === 'date') {
            return (
                <DateInput title={rowData[rowID].title}
                           type={rowData[rowID].type}
                           updateInput={(data, id, type) => this.updateFormInput(data, id, type)}
                           id={rowID}
                           date={rowData[rowID].data}
                />
            )
        } else if (rowData[rowID].type === 'location') {
            return (
                <LocationInput title={rowData[rowID].title}
                               type={rowData[rowID].type}
                               updateInput={(data, id, type) => this.updateFormInput(data, id, type)}
                               id={rowID}
                               navigator={this.props.navigator}
                               location={rowData[rowID].data}
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
                          renderRow={(data, sectionID, rowID) => this._renderRow(data, sectionID, rowID)}
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
