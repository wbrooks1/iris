'use strict';

import React, {Component} from 'react';
import {AppRegistry, StyleSheet, TouchableHighlight, Text, Image, View, TextInput, ScrollView, Navigator, BackAndroid} from 'react-native'
import styles from './styles';


export default class ViewReports extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 0) {
                this.props.navigator.pop();
                return true;
            }
            return false;
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image } source={require('../../images/iris_logo_homepage.png')}>
                    <TouchableHighlight onPress={() => this.props.navigator.pop()}>
                        <Image style={styles.back_arrow} source={require('../../images/back_icon.png')}/>
                    </TouchableHighlight>
                </Image>
                <Text style = {styles.title }>
                    View Reports
                </Text >
            </View>
        );
    }
}
AppRegistry.registerComponent('ViewReports', () => ViewReports );
