'use strict'

import React, {Component} from 'react';
import { Modal, Text, TouchableHighlight, View, Navigator } from 'react-native';
import MapView from 'react-native-maps';
import styles from './styles';

/**
 * Full page map view modal. Uses react-native-maps, see https://github.com/airbnb/react-native-maps
 * @author Winfield Brooks
 * @props location: incoming location w/ latitude and longitude
 * @props modalVisible: boolean
 * @props updateLocation: LocationInput.updateLocation(location)
 * @props closeModal: LocationInput.closeModal()
 */
export default class MapViewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: this.props.location,
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
                <TouchableHighlight onPress={() => this.props.updateLocation(this.state.location)}
                                    style={styles.submit_button}>
                    <Text style={styles.submit}>
                        Submit Location
                    </Text>
                </TouchableHighlight>
            </Modal>
        );
    }
}

