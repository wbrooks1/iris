'use strict';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, Image, View, TextInput, ScrollView, Navigator, BackAndroid,
ListView} from 'react-native'
import styles from './styles';
import SingleLineInput from '../../components/SingleLineInput';
import {componentList} from '../../config/mandatoryComponentList'

export default class NewIncident extends Component {
    constructor() {
        super();
        this.state = {
            inputCompentents: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),

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
        this.setState({inputCompentents: componentList});
    }

    renderComponents(component) {
        if (component.type === "text") {
            return (
                <SingleLineInput title={component.title[1]}/>
            )
        }
    }

    render() {
        return (
            <View style = {styles.container }>
                <Text style = {styles.title }>
                    Incident Response In Situ
                </Text >
                <Text style = {styles.title }>
                    New Incident
                </Text >
                <ListView dataSource={this.state.inputCompentents}
                          renderRow={this.renderComponents(this)}/>
            </View>
        );
    }
}
AppRegistry.registerComponent('NewIncident', () => NewIncident );
