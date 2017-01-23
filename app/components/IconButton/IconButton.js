
import React, { Component } from 'react';
import { AppRegistry, View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './styles';

export default class IconButton extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.button} >
                <View>
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
