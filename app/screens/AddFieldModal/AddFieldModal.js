'use strict'
/**
 * AddFieldModal: Screen to enter credentials.
 */

import React, {Component} from 'react';
import {Modal, Text, TextInput, TouchableHighlight, View, StyleSheet, Navigator, Picker} from 'react-native';
import styles from './styles';


export default class AddFieldModal extends Component {
    constructor() {
        super();
        this.state = {
            type: 'multi_text',
            title: null,
        };
    }

    updateFieldInfo = (title, id) => {
        this.setState({title: title});
        console.log("type, title:", this.state.type + ", " + this.state.title);
    }

    addField = () => {
        console.log("dataSource in AddFieldModal", this.props.dataSource.rowIdentities[0]);
        console.log(this.props.dataSource.rowIdentities[0].includes(this.state.title));
        if (this.props.dataSource.rowIdentities[0].includes(this.state.title) ) {
            alert("\"" + this.state.title + "\" already exists as a title. Please try different title.");
        } else if (this.state.title === null || this.state.title === "") {
            alert("Title can not be left blank. Please add a title.");

        } else {
            this.props.getInfo(this.state.title, this.state.type);
        }
    }


    render() {
        return (
            <Modal style={styles.container}
                   animationType={'slide'}
                   visible={this.props.modalVisible}
                   transparent={true}
                   onRequestClose={() => {this.props.closeModal()}}>
                <View style={styles.modal}>
                    <Text style={styles.title}>
                        Add New Field
                    </Text>
                    <Text style={styles.input}>
                        Select Field Type
                    </Text>
                    <Picker style={styles.picker}
                            selectedValue={this.state.type}
                            onValueChange={(type) => this.setState({type: type})}>
                        <Picker.Item label="Text" value="multi_text"/>
                        <Picker.Item label="Date" value="date"/>
                        <Picker.Item label="Location" value="location"/>
                    </Picker>
                    <Text style={styles.input}>
                        Field Title
                    </Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        placeholder="Enter field title"
                        defaultValue={this.state.title}
                        onChangeText={(text) => this.setState({title: text})}
                        />
                    <TouchableHighlight onPress={() => this.addField()}>
                        <Text style={styles.signIn}>ADD</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        );
    }
}
