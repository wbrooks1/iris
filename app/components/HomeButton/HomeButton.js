
import React, { Component } from 'react';
import { AppRegistry, View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

export default class HomeButton extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.button}
                onPress={this.props.onPress}>
                <View style={styles.container}>
                    <Image style={styles.buttonIcon}
                        source={this.props.image}
                    />
                </View>
            </TouchableOpacity>
        );
    };
}
AppRegistry.registerComponent('HomeButton', () => HomeButton);
