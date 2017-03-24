'use strict';

import React, {Component} from 'react';
import {
    TouchableHighlight, StyleSheet, Text, Image, View, TextInput, ScrollView, Navigator, AsyncStorage
} from 'react-native'
import styles from './styles';
import HomeButton from '../../components/HomeButton';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

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
        this.state = {
            location: this.props.location,
            locationDate: this.props.locationDate,
        }
    }

    toNewIncident = () => {
        this.props.navigator.push({
            id: 'NewIncident',
            passProps: {
                location: this.state.location,
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
                location: this.state.location,
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

    async updateLocation() {
        let check = await LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: 'Location must be enabled?',
            ok: 'Okay',
            cancel: 'cancel'
        }).then(function (success) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        var location = position.coords.latitude + ', ' + position.coords.longitude;
                        var date = new Date().toISOString().slice(0, 10);
                        AsyncStorage.setItem('@AsyncStorage:location', location);
                        AsyncStorage.setItem('@AsyncStorage:locationDate', date);
                        this.setState({
                            location: location,
                            locationDate: date,
                        });

                    },
                    (error) => console.log(JSON.stringify(error)),
                    {timeout: 20000, maximumAge: 100000});
            }.bind(this)
        ).catch((error) => {
            console.log(error);
        });
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
                    <View style={styles.text_row}>
                        <TouchableHighlight onPress={() => this.updateLocation()}>
                            <Text style={styles.logout_text}> Update Location (Last update {this.state.locationDate}) </Text>
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
