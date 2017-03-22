'use strict';

import React, { Component } from 'react';
import { AppRegistry, View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

/**
 * Simple image button with text under
 * @author Winfield Brooks
 * @props onPress: method to execute when button is pressed
 * @props image: image source file path
 * @props text: text under image
 */
export default class IconButton extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.button}
                onPress={this.props.onPress}>
                <View style={styles.container}>
                    <Image style={styles.buttonIcon}
                        source={this.props.image}
                    />
                    <Text style={styles.buttonText}>
                        {this.props.text}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };
}

AppRegistry.registerComponent('IconButton', () => IconButton);
