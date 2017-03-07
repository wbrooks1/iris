import React, {Component} from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './styles';
import {Select, Option} from "react-native-chooser";

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
                        value, this.state.id, this.props.title, this.props.type)}
                defaultText  = "Choose the frequency of reporting"
                style = {{borderWidth : 1, borderColor : "green"}}
                textStyle = {{}}
                backdropStyle  = {{backgroundColor : "#F5FCFF"}}
                optionListStyle = {{backgroundColor : "#F5FCFF"}}
            >
                <Option value = "P1H">One Per Hour</Option>
                <Option value = "P1D">One Per Day</Option>
                <Option value = "P7D">One Per Week</Option>
                <Option value = "P1M">One Per Month</Option>
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

