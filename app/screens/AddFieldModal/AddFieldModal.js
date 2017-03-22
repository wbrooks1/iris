'use strict'

import React, {Component} from 'react';
import {Modal, Text, TextInput, TouchableHighlight, View, Navigator, Picker} from 'react-native';
import styles from './styles';

/**
 * Pop up modal to select custom field type and title.
 * @author Winfield Brooks
 * @props modalVisible: boolean
 * @props getInfo: NewIncident.getNewFieldInfo(title, type)
 * @props closeModal: NewIncident.closeModal()
 */
export default class AddFieldModal extends Component {
    constructor() {
        super();
        this.state = {
            type: 'multi_text',     //default type is text.
            title: null,
        };
    }

    /**
     * Verifies that a title is not a duplicate and has been entered
     * then calls props.getInfo
     */
    addField = () => {
        // console.log('row identiities', this.props.dataSource.rowIdentities[0]);
        if (this.props.dataSource.rowIdentities[0].includes(this.state.title)) {
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
                    <View style={styles.text_box}>

                    <Text style={styles.label}>
                        Select Field Type
                    </Text>
                    <Picker style={styles.picker}
                            selectedValue={this.state.type}
                            onValueChange={(type) => this.setState({type: type})}>
                        <Picker.Item label="Text" value="multi_text"/>
                        <Picker.Item label="Date" value="date"/>
                        <Picker.Item label="Location" value="location"/>
                    </Picker>
                    <Text style={styles.label}>
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
                    </View>
                    <TouchableHighlight style={styles.submit_button} onPress={() => this.addField()}>
                        <Text style={styles.title}>Add Field</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        );
    }
}
