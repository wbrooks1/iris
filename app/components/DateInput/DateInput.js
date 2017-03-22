'use strict';
import React, {Component} from 'react';
import {View, TextInput, Text, DatePickerAndroid, TouchableHighlight} from 'react-native';
import styles from './styles';

/**
 * Date Input component for form input
 * @author Winfield Brooks
 * @props date: incoming date
 * @props id: name of component
 * @props title: displayed title of component
 * @props type: type of component: "date"
 */
export default class DateInput extends Component {
    constructor() {
        super();
        this.state = {
            date: null,
        }
    }

    //if incoming date set state to incoming date, else set state to current date.
    componentWillMount() {
        if (this.props.date) {
            var date = new Date(this.props.date);
            this.setState({date: date});
        } else {
            this.state.date = new Date();
        }
    }

    //TODO: Implement iOS datePicker
    /**
     * Async method opens R.N. DatePickerAndroid and sets component state
     * and updates form input when date is selected.
     * @returns {Promise.<void>}
     */
    async openAndroidDatePicker() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                minDate: new Date()
            });
            if (action === DatePickerAndroid.dateSetAction ) {
                var date = new Date(year, month, day);
                this.setState({date: date});
                this.props.updateInput(this.state.date.toISOString().slice(0,10),
                    this.props.id, this.props.title, this.props.type);
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
                <TouchableHighlight onPress={() => this.openAndroidDatePicker()}>
                <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    editable={false}
                    defaultValue={this.state.date.toISOString().slice(0,10)}
                    >
                </TextInput>
                </TouchableHighlight>
            </View>
        );
    }
}



