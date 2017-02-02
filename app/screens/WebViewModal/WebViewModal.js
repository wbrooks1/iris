'use strict'
/**
* LoginModal: Screen to enter credentials.
*/

import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View, StyleSheet, Navigator, WebView, Networking, Linking} from 'react-native';
import styles from './styles';

import SingleLineInput from '../../components/SingleLineInput'

export default class WebViewModal extends Component {
  toHome = () => {
      this.props.navigator.push({
         id: 'Home',
      });
      // this.verifyAccount()
      this.props.closeModal();
  }

  //   function verifyAccount (app, key) {}
  //     Linking.openURL([
  //         'http://ethan-rowell.ddns.net:8082/auth/google?lat=123&long=123',
  //     ‘?response_type=token’,
  //       ‘&client_id=’ + app_key,
  //   ‘&redirect_uri=oauth2example://foo’
  //       ].join(‘’))
  //   })
  // }


  render() {
    return (
      <Modal animationType={'slide'}
        visible={this.props.modalVisible}
        transparent={true}
        onRequestClose={() => {this.props.closeModal()}}>
            <WebView  source={{uri: 'http://ethan-rowell.ddns.net:8082/auth/google?lat=123&long=123'}} />
            <TouchableHighlight onPress={this.toHome}>
            <Text style={styles.signIn}>Sign In</Text>
          </TouchableHighlight>
      </Modal>
    );
  }
}
