'use strict'
import React, {Component} from 'react';
import {View, TextInput, Text, DatePickerAndroid, TouchableHighlight, } from 'react-native';
import styles from './styles';
import MapViewModal from '../../screens/MapViewModal/MapViewModal';

export default class LocationInput extends Component {
    constructor() {
        super();
        this.state = {
            location: null,
            id: null,
            modalVisible: false,
        }
    }

    componentWillMount() {
        this.setState({id: this.props.id})
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
                (error) => alert(JSON.stringify(error)),
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
        console.log("Location:", this.state.latitude);
    }

    updateLocation(location) {
        this.setState({location})
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
                <TouchableHighlight onPress={() => this.openModal()}>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    editable={false}
                    defaultValue={this.state.location}>
                </TextInput>
                </TouchableHighlight>
            </View>
        );
    }
}
