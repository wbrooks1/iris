'use strict';
import React, {Component} from 'react';
import {View, TextInput, Text, DatePickerIOS, TouchableHighlight} from 'react-native';
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

    onDateChange = (date) => {
        console.log(date);
        this.setState({date: date});
        this.props.updateInput(date.toISOString().slice(0,10),
            this.props.id, this.props.title, this.props.type);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
                <DatePickerIOS
                    date={this.state.date}
                    mode='date'
                    onDateChange={this.onDateChange}
                    minimumDate={new Date()}
                    style={styles.dateIOS}
                />
            </View>
        );
    }
}
