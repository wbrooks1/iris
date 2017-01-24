'use strict'
/**
 * LoginModal: Screen to enter credentials.
 */

import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import styles from './styles';

import SingleLineInput from '../../components/SingleLineInput'

export default class LoginModal extends Component {
    render() {
        return (
                <Modal animationType={'slide'}
                       visible={this.props.modalVisible}
                       transparent={true}
                       onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={styles.modal}>
                        <SingleLineInput
                            title="Username or Email"
                        />
                        <SingleLineInput
                            title="Password"
                            secureTextEntry={true}
                        />
                        <TouchableHighlight onPress={this.props.closeModal}>
                            <Text style={styles.signIn}>Sign In</Text>
                        </TouchableHighlight>
                    </View>
                </Modal>
        );
    }

}
