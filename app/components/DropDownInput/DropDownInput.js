'use strict';

import React, {Component} from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './styles';
import {Select, Option} from 'react-native-chooser';

/**
 * Drop Down input for choosing reporting frequency.
 * @author Winfield Brooks
 * @author Winfield Brooks
 * @props data: incoming reporting frequency
 * @props id: name of component
 * @props title: displayed title of component
 * @props type: type of component: "drop"
 */
export default class DropDownInput extends Component {
    constructor() {
        super();
        this.state = {
            data: '',
        }
    }

    //If is edit set state data to incoming data.
    componentWillMount() {
        if (this.props.isEdit) {
            this.setState({data: this.props.data});
        }
    }

    /**
     * When drop down item is selected component state and form
     * input are updated.
     * @param data
     */
    updateData(data) {
        this.setState({data: data});
        this.props.updateInput(data, this.props.id, this.props.title, this.props.type);
    }

    /**
     * Renders react-native-chooser component. Details-> https://github.com/gs-akhan/react-native-chooser.
     * @returns {XML}
     */
    renderFrequencySelect() {
        return (
            <Select
                onSelect = {(data) => this.updateData(data)}
                defaultText  = 'Once Per Hour'
                style = {styles.select}
                textStyle = {styles.option_list_text}
                backdropStyle  = {styles.select}
                optionListStyle = {styles.option_list}
                transparent = {true}
                indicator={'down'}
                selected='P1H'
            >
                <Option styleText={styles.option_list_text} value = 'P1H'>Once Per Hour</Option>
                <Option styleText={styles.option_list_text} value = 'P1D'>Once Per Day</Option>
                <Option styleText={styles.option_list_text} value = 'P7D'>Once Per Week</Option>
                <Option styleText={styles.option_list_text} value = 'P1M'>Once Per Month</Option>
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

