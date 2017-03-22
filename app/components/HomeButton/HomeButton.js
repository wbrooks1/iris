'use strict';

import React, { Component } from 'react';
import { AppRegistry, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

/**
 * Simple image button.
 * @author Winfield Brooks
 * @props onPress: method to execute when button is pressed
 * @props image: image source file path
 */
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

