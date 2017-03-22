'use strict';

import React, {Component} from 'react';
import {View, TextInput, Text, TouchableHighlight,} from 'react-native';
import styles from './styles';
import MapViewModal from '../../screens/MapViewModal/MapViewModal';

/**
 * Location input component for form input.
 * @author Winfield Brooks
 * @props location: incoming location
 * @props id: name of component
 * @props title: displayed title of component
 * @props type: type of component: 'location'
 */
export default class LocationInput extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.location);
        var latlon = this.props.location.split(', ');
        this.state = {
            location: {
                latitude: parseFloat(latlon[0]),
                longitude: parseFloat(latlon[1])
            },
            id: this.props.id,
            modalVisible: false,
            mapDisabled: false,
        }
    }

    /**
     * After location selection has been made updates component state and from input data.
     * @param loc new location
     */
    updateLocation = (loc) => {
        this.setState({
            location: {
                latitude: loc.latitude,
                longitude: loc.longitude,
            }
        });
        this.props.updateInput(loc.latitude + ', ' + loc.longitude, this.state.id, this.props.title, this.props.type);
        this.closeModal();
    }

    /**
     * Renders modal for map view. Details: /app/screens/MapViewModal/MapViewModal.js
     * @returns {XML}
     */
    renderModal = () => {
        if (this.state.modalVisible) {
            return (
                <MapViewModal modalVisible={this.state.modalVisible} closeModal={this.closeModal}
                              navigator={this.props.navigator} updateLocation={this.updateLocation}
                              location={this.state.location}
                />
            );
        }
    }

    closeModal = () => {
        this.setState({modalVisible: false});
    }

    openModal = () => {
        this.setState({modalVisible: true});
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderModal()}
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
                <TouchableHighlight onPress={() => this.openModal()} disabled={this.state.mapDisabled}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize='none'
                        editable={false}
                        defaultValue={this.state.location.latitude + ', ' + this.state.location.longitude}>
                    </TextInput>
                </TouchableHighlight>
            </View>
        );
    }
}
