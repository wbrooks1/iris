import React, {Component} from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './styles';

export default class SingleLineInput extends Component {
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

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="sentences"
                    autoCorrect={false}
                    placeholder={this.props.placeholder}
                    defaultValue={this.state.text}
                    onChangeText={(text) => this.setState({text})}
                    onEndEditing={(text) => this.props.updateInput(
                        this.state.text, this.state.id, this.props.title, this.props.type)}>
                </TextInput>
            </View>
        );
    }
}

SingleLineInput.propTypes = {
    borderTop: React.PropTypes.bool,
};


