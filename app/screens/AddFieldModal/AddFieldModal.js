'use strict'
/**
* AddFieldModal: Screen to enter credentials.
*/

import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, StyleSheet, Navigator, Picker } from 'react-native';
import styles from './styles';

import SingleLineInput from '../../components/SingleLineInput'

export default class AddFieldModal extends Component {
    constructor() {
        super();
        this.state = {
            type: null,
            title: null,
        };
    }

    updateFieldInfo = (title, id) => {
      this.setState({title: title});
    }




  render() {
    return (
      <Modal animationType={'slide'}
        visible={this.props.modalVisible}
        transparent={true}
        onRequestClose={() => {this.props.closeModal()}}>
        <View style={styles.modal}>
          <Picker style={styles.picker}
                  mode="dropdown"
            selectedValue={'text'}
            onValueChange={(type) => this.setState({type: type})}>
              <Picker.Item label="Text" value="multi_text" />
              <Picker.Item label="Date" value="date" />
              <Picker.Item label="Location" value="location" />
          </Picker>
          <SingleLineInput
              id="temp"
            title="Title"
            placeholder="Enter title for field"
            updateInput={(title, id) => this.updateFieldInfo(title, id)}
          />
          <TouchableHighlight onPress={this.addField}>
            <Text style={styles.signIn}>ADD</Text>
          </TouchableHighlight>
        </View>
      </Modal>
    );
  }
}
