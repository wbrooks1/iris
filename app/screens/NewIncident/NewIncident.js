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

import {components} from '../../config/mandatoryComponentList'

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
            formData: {},
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

    updateTextInput(text, id) {
        console.log("text:", text);
        console.log("id:", id);
        let newFormData = this.state.formData;
        newFormData[id] = text;
        console.log("formData:", newFormData);
        this.setState({formData: newFormData});
    }

    submitIncident() {
        console.log("Return Object", this.state.formData);
    }

    _renderRow(rowData, sectionID, rowID) {
        if (rowData[rowID].type === "text") {
            return (
                <SingleLineInput title={rowData[rowID].title}
                                 placeholder={rowData[rowID].placeholder}
                                 updateInput={(text, id) => this.updateTextInput(text, id)}
                                 id={rowID}/>
            );
        } else if (rowData[rowID].type === "multi_text") {
            return (
                <MultiLineInput title={rowData[rowID].title}
                                placeholder={rowData[rowID].placeholder}
                                updateInput={(text, id) => this.updateTextInput(text, id)}
                                id={rowID}/>
            );
        } else if (rowData[rowID].type === 'date') {
            return (
                <DateInput title={rowData[rowID].title}/>
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
                    New Incident
                </Text >
                <ListView dataSource={this.state.dataSource}
                          renderRow={(data, sectionID, rowID) => this._renderRow(data, sectionID, rowID)}
                />
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
