import React, {Component} from 'react';
import {View, TextInput, Text, DatePickerAndroid, TouchableHighlight} from 'react-native';
import styles from './styles';

export default class DateInput extends Component {
    constructor() {
        super();
        this.state = {
            date: null,
            id: null,
        }
    }

    componentWillMount() {
        if (this.props.date) {
            var date = new Date(this.props.date);
            this.setState({date: date})
        } else {
            this.state.date = new Date();
        }
        this.setState({id: this.props.id})
    }

    async openAndroidDatePicker() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                minDate: new Date()
            });
            if (action === DatePickerAndroid.dateSetAction ) {
                var date = new Date(year, month, day);
                this.setState({date: date});
                this.props.updateInput(this.state.date.toISOString().slice(0,10),
                    this.state.id, this.props.title, this.props.type);
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
                    autoCapitalize="none"
                    editable={false}
                    defaultValue={this.state.date.toISOString().slice(0,10)}
                    >
                </TextInput>
                </TouchableHighlight>
            </View>
        );
    }
}



