'use strict'
import React, {Component} from 'react';
import {View, TextInput, Text, DatePickerAndroid, TouchableHighlight, } from 'react-native';
import styles from './styles';
import MapViewModal from '../../screens/MapViewModal/MapViewModal';

export default class LocationInput extends Component {
    constructor() {
        super();
        this.state = {
            location: {
                latitude: null,
                longitude: null,
            },
            id: null,
            modalVisible: false,
            mapDisabled: true,
        }
    }

    componentWillMount() {
        this.setState({id: this.props.id})
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({ location: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude},
                    mapDisabled: false
                });
            },
                (error) => alert(JSON.stringify(error)),
                { timeout: 20000, maximumAge: 1000});
    }

    updateLocation = (loc) => {
        this.setState({ location: {
            latitude: loc.latitude,
            longitude: loc.longitude,
        }});
        this.props.updateInput(loc.latitude + ", " + loc.longitude, this.state.id);
        this.closeModal();
    }

    closeModal = () => {
        this.setState({modalVisible: false});
    }

    openModal = () => {
        this.setState({modalVisible: true});
    }

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
                    autoCapitalize="none"
                    editable={false}
                    defaultValue={this.state.location.latitude + ", " + this.state.location.longitude}>
                </TextInput>
                </TouchableHighlight>
            </View>
        );
    }
}
