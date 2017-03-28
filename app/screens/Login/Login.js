'use strict';

import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, AppRegistry, StyleSheet, Text, Image, View, BackAndroid,
Platform, } from 'react-native';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import styles from './styles';
import IconButton from '../../components/IconButton';
import WebLoginModal from '../WebLoginModal/WebLoginModal'
import {loginURLs} from '../../config/strings'

/**
 * Login screen
 * @author Winfield Brooks
 */
export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false,
            loginUrl: null,
            accessToken: null,
            loaded: false,
        };
        console.log("Login", "opened");
    }

    /**
     * When login is confirmed navigates to home page and passes props to Home.
     * @param location
     * @param userName
     * @param userID
     * @param token
     */
    toHome = (location, userName, userID, token, locationDate) => {
        this.props.navigator.resetTo({
            id: 'Home',
            passProps: {
                locationDate: locationDate,
                location: location,
                userName: userName,
                userID: userID,
                token: token,
            }
        });
    }

    /**
     * On opening app check if previously logged in using R.N. AsyncStorage.
     * If not logged in get current location and load login screen.
     * If logged call toHome.
     * @returns {Promise.<void>}
     */
     async checkLoginStatus() {
         try {
             let _loginStatus = await AsyncStorage.getItem('@AsyncStorage:loginStatus');
             if (_loginStatus === 'true') {
                 var location = await AsyncStorage.getItem('@AsyncStorage:location');
                 var locationDate = await AsyncStorage.getItem('@AsyncStorage:locationDate');
                 var userName = await AsyncStorage.getItem('@AsyncStorage:userName');
                 var userID = await AsyncStorage.getItem('@AsyncStorage:userID');
                 var token = await AsyncStorage.getItem('@AsyncStorage:accessToken');
                 this.toHome(location, userName, userID, token, locationDate);
             } else {
                 if (Platform.OS === 'ios') {
                     navigator.geolocation.getCurrentPosition(
                         (position) => {
                             var location = position.coords.latitude + ', ' + position.coords.longitude;
                             this.setState({
                                 location: location,
                                 loaded: true,
                             });
                         },
                         (error) => console.log(JSON.stringify(error)),
                         {timeout: 20000, maximumAge: 100000});
                     } else {
                         let check = await LocationServicesDialogBox.checkLocationServicesIsEnabled({
                             message: 'Location must be enabled?',
                             ok: 'Okay',
                             cancel: 'Close'
                         }).then(function (success) {
                             navigator.geolocation.getCurrentPosition(
                                 (position) => {
                                     var location = position.coords.latitude + ', ' + position.coords.longitude;
                                     console.log('Position:', location);
                                     this.setState({
                                         location: location,
                                         loaded: true,
                                     });
                                 },
                                 (error) => console.log(JSON.stringify(error)),
                                 {timeout: 20000, maximumAge: 100000});
                             }.bind(this)
                         ).catch((error) => {
                             console.log(error);
                             BackAndroid.exitApp();
                         });
                     }
                 }
             } catch (error) {
                 console.error(error);
             }
         }

    componentWillMount() {
        this.checkLoginStatus();
    }

    /**
     * Open MapViewModal with urls based on selection.
     * @param route
     */
    openModal = (route) => {
        this.setState({modalVisible: true});
        switch (route) {
            case 'google':
                this.setState({loginUrl: loginURLs.google});
                break;
            case 'twitter':
                this.setState({loginUrl: loginURLs.twitter});
                break;
            case 'facebook':
                this.setState({loginUrl: loginURLs.facebook});
                break;
            default:
                console.log(route);
        }
    }

    closeModal = () => {
        this.setState({modalVisible: false});
    }

    renderModal = () => {
        if (this.state.modalVisible) {
            return (
                <WebLoginModal modalVisible={this.state.modalVisible} closeModal={this.closeModal}
                               navigator={this.props.navigator} loginURLs={this.state.loginUrl}
                               location={this.state.location}/>
            );
        }
    }

    renderLoginButtons = () => {
        if (this.state.loaded) {
            return (
                <View style={styles.container}>

                    <View style={styles.row_container}>
                        <IconButton
                            image={require('../../images/google_icon.png')}
                            text='Google'
                            onPress={() => this.openModal('google')}
                        />
                        <IconButton
                            image={require('../../images/twitter_icon.png')}
                            text='Twitter'
                            onPress={() => this.openModal('twitter')}
                        />
                    </View>
                    <View style={styles.row_container}>
                        <IconButton
                            image={require('../../images/facebook_icon.png')}
                            text='Facebook'
                            onPress={() => this.openModal('facebook')}
                        />
                        <IconButton
                            image={require('../../images/microsoft_icon.png')}
                            text='Microsoft'
                            onPress={() => this.toHome()}/>
                    </View>
                </View>

            )
        } else {
            return (
                <ActivityIndicator animating={true}
                                   style={styles.activityIndicator} size='large'/>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderModal()}
                <Image style={styles.image}
                       source={require('../../images/map_transparent.png')} >
                       <Image style={styles.image}
                              source={require('../../images/iris_logo_homepage.png')} />
                </Image>
                <Text style={styles.title}>
                    Incident Response In Situ
                </Text>
                <Text style={styles.title}>
                    Login
                </Text>
                {this.renderLoginButtons()}
            </View>
        );
    }
}

AppRegistry.registerComponent('Login', () => Login);
