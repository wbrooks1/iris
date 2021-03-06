'use strict';

import React, {Component} from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './styles';

/**
 * Multi line text input component for form input.
 * @author Winfield Brooks
 * @props data: incoming text
 * @props id: name of component
 * @props title: displayed title of component
 * @props type: type of component: 'multi'
 */
export default class MultiLineInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        }
    }

    //If editing incident set state text to incoming text.
    componentWillMount() {
        if (this.props.isEdit) {
            this.setState({text: this.props.data});
        }
    }

    /**
     * Renders component and updates state and form input when text input is deselected.
     * @returns {XML}
     */
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    multiline={true}
                    autoCorrect={false}
                    placeholder={this.props.placeholder}
                    defaultValue={this.state.text}
                    returnKeyType={'next'}
                    onChangeText={(text) => this.setState({text: text})}
                    onEndEditing={(text) => this.props.updateInput(
                        this.state.text, this.props.id, this.props.title, this.props.type)}
                    underlineColorAndroid={'#A9A9A9'}
                >
                </TextInput>
            </View>
        );
    }
}



