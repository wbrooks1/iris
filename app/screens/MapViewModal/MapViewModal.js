'use strict'
/**
 * WebViewModal: Screen to enter credentials.
 */

import React, {Component} from 'react';
import {
    Modal, Text, TouchableHighlight, View, StyleSheet, Navigator,
} from 'react-native';
import MapView from 'react-native-maps';
import styles from './styles';


export default class WebLoginModal extends Component {
    constructor() {
        super();
        this.state = {
            location: null,
        }
    }

    render() {
        return (
            <Modal style={styles.container}
                   animationType={'slide'}
                   visible={this.props.modalVisible}
                   transparent={true}
                   onRequestClose={() => {this.props.closeModal()}}>
                <MapView style={styles.map} initialRegion={{
                    latitude: this.props.location.latitude,
                    longitude: this.props.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,}}>
                    <MapView.Marker draggable coordinate={{latitude: this.props.location.latitude, longitude: this.props.location.longitude,}}
                                    onDragEnd={(loc) => this.setState({ location: loc.nativeEvent.coordinate })}
                    />
                </MapView>
                <TouchableHighlight onPress={() => this.props.updateLocation(this.state.location)}>
                    <Text style={styles.submit}>
                        Submit Location
                    </Text>
                </TouchableHighlight>
            </Modal>
        );
    }
}

