'use strict';

import React, {Component} from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './styles';
import {Select, Option} from "react-native-chooser";

/**
 * Drop Down input for choosing reporting frequency.
 */
export default class DropDownInput extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            id: null,
        }
    }

    componentWillMount() {
        this.setState({id: this.props.id});
        if (this.props.isEdit) {
            this.setState({text: this.props.data});
        }
    }

    renderFrequencySelect() {
        return (
            <Select
                onSelect = {(value) => this.props.updateInput(
                        value, this.props.id, this.props.title, this.props.type)}
                defaultText  = "Once Per Hour"
                style = {styles.select}
                textStyle = {styles.option_list_text}
                backdropStyle  = {styles.select}
                optionListStyle = {styles.option_list}
                transparent = {true}
                indicator={'down'}
                selected="P1H"
            >
                <Option styleText={styles.option_list_text} value = "P1H">Once Per Hour</Option>
                <Option styleText={styles.option_list_text} value = "P1D">Once Per Day</Option>
                <Option styleText={styles.option_list_text} value = "P7D">Once Per Week</Option>
                <Option styleText={styles.option_list_text} value = "P1M">Once Per Month</Option>
            </Select>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
                {this.renderFrequencySelect()}
            </View>
        );
    }
}

