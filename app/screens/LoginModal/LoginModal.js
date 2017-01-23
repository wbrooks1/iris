'use strict'
/**
 * LoginModal: Screen to enter credentials.
 */

import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

export default class LoginModal extends Component {

    state = {
        modalVisible: false,
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }


}