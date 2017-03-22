'use strict';

import React, {Component} from 'react';
import {TouchableHighlight, StyleSheet, Text, Image, View, TextInput, ScrollView, Navigator, AsyncStorage
} from 'react-native'
import styles from './styles';
import HomeButton from '../../components/HomeButton';

/**
 * Home screen for app, serves as navigation hub.
 * @author Winfield Brooks
 * @props userID: user id
 * @props location: user default location
 * @props token: security token
 */
export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    toNewIncident = () => {
        this.props.navigator.push({
            id: 'NewIncident',
            passProps: {
                location: this.props.location,
                userID: this.props.userID,
                token: this.props.token,
            }
        });
    }
    toYourIncidents = () => {
        this.props.navigator.push({
            id: 'YourIncidents',
            passProps: {
                userID: this.props.userID,
                token: this.props.token,
            }
        });
    }
    toSearchIncidents = () => {
        this.props.navigator.push({
            id: 'SearchIncidents',
            passProps: {
                userID: this.props.userID,
                token: this.props.token,
                location: this.props.location,
            }
        });
    }
    toViewReports = () => {
        this.props.navigator.push({
            id: 'ViewReports',
        });
    }

    /**
     * Logout user. Set async storage elements to defaults and navigate to login screen.
     * @returns {Promise.<void>}
     */
    async logout() {
        try {
            await AsyncStorage.setItem('@AsyncStorage:loginStatus', 'false');
            await AsyncStorage.setItem('@AsyncStorage:accessToken', '');
            this.props.navigator.resetTo({
                id: 'Login',
            });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <View style={styles.container }>
                <Image style={styles.background } source={require('../../images/map_background.png' ) }>
                    <Image style={styles.image } source={require('../../images/iris_logo_homepage.png' ) }/>
                    <View style={styles.text_row}>
                        <Text style={styles.user}> {this.props.userName} </Text>
                        <TouchableHighlight onPress={() => this.logout()}>
                            <Text style={styles.logout_text}> Logout </Text>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.row_container}>
                        <HomeButton
                            image={require('../../images/new_incident_icon.png')}
                            onPress={() => this.toNewIncident()}
                        />
                        <HomeButton
                            image={require('../../images/your_incidents_icon.png')}
                            onPress={() => this.toYourIncidents()}
                        />
                    </View>
                    <View style={styles.row_container}>
                        <HomeButton
                            image={require('../../images/search_incidents_icon.png')}
                            onPress={() => this.toSearchIncidents()}
                        />
                        <HomeButton
                            image={require('../../images/view_reports_icon.png')}
                            onPress={() => this.toViewReports()}
                        />
                    </View>
                </Image>
            </View>
        );
    }
}
