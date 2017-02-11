'use strict'
/**
 * LoginModal: Screen to enter credentials.
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

    submitLocation() {
        console.log("!!", this.state.location);
    }

    render() {
        return (
            <Modal animationType={'slide'}
                   visible={this.props.modalVisible}
                   transparent={true}
                   onRequestClose={() => {this.props.closeModal()}}>
                <MapView style={styles.map} initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,}}>
                    <MapView.Marker draggable coordinate={{latitude: 37.78825, longitude: -122.4324,}}
                                    onDragEnd={(loc) => this.setState({ location: loc.nativeEvent.coordinate })}
                    />
                </MapView>
                <TouchableHighlight onPress={() => this.props.updateLocation(this.state.location)}>
                    <Text style={styles.signIn}>
                        Submit Location
                    </Text>
                </TouchableHighlight>
            </Modal>
        );
    }
}

// this.setState({latitude: loc.coordinate.latitude, longitude: loc.coordinate.longitude})