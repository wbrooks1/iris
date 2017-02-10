import React, {Component} from 'react';
import {View, TextInput, Text, DatePickerAndroid, TouchableHighlight} from 'react-native';
import styles from './styles';

export default class DateInput extends Component {
    constructor() {
        super();
        this.state = {
            date: '1/1/01',
            id: null,
        }
    }

    componentWillMount() {
        this.setState({id: this.props.id})
    }

    async openAndroidDatePicker() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });
            console.log("Picked date", year, month, day);
        //  TODO: set the date state item and create the update input method in NewIncident.js

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
                    autoCapitalize="none"
                    editable={false}
                    defaultValue={this.state.date}
                    >
                </TextInput>
                </TouchableHighlight>

            </View>
        );
    }
}

DateInput.propTypes = {
    borderTop: React.PropTypes.bool,
};


