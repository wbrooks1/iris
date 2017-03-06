'use strict';
/**
 * Login Screen: holds buttons for opening login modal
 */

import React, {Component} from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native'
import styles from './styles';
import IconButton from '../../components/IconButton';
import WebLoginModal from '../WebLoginModal/WebLoginModal'
import {loginURLs} from '../../config/strings'

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            modalVisible: false,
            loginUrl: null,
            accessToken: null,
            loaded: false,
        };
    }

    toHome = (location, userName, userID) => {
        this.props.navigator.resetTo({
            id: 'Home',
            passProps: {
                location: location,
                userName: userName,
                userID: userID,
            }
        });
    }

    async checkLoginStatus() {
        try {
            let _loginStatus = await AsyncStorage.getItem('@AsyncStorage:loginStatus');
            if (_loginStatus === 'true') {
                var location = await AsyncStorage.getItem('@AsyncStorage:location');
                var userName = await AsyncStorage.getItem('@AsyncStorage:userName');
                var userID = await AsyncStorage.getItem('@AsyncStorage:userID');
                this.toHome(location, userName, userID);
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        var location = position.coords.latitude + ", " + position.coords.longitude;
                        console.log("Position:", location);
                        this.setState({
                            location: location,
                            loaded: true,
                        });
                    },
                    (error) => alert(JSON.stringify(error) + " Please ensure location is" +
                        "turned on."),
                    {timeout: 2000, maximumAge: 100000});
            }
        } catch (error) {
            console.error(error);
        }
    }

    componentWillMount() {
        this.checkLoginStatus();
    }

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
                            text="Google"
                            onPress={() => this.openModal('google')}
                        />
                        <IconButton
                            image={require('../../images/twitter_icon.png')}
                            text="Twitter"
                            onPress={() => this.openModal('twitter')}
                        />
                    </View>
                    <View style={styles.row_container}>
                        <IconButton
                            image={require('../../images/facebook_icon.png')}
                            text="Facebook"
                            onPress={() => this.openModal('facebook')}
                        />
                        <IconButton
                            image={require('../../images/microsoft_icon.png')}
                            text="Microsoft"
                            onPress={() => this.toHome()}/>
                    </View>
                </View>

            )
        } else {
            return (
                <ActivityIndicator animating={true}
                                   style={styles.activityIndicator} size="large"/>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderModal()}
                <Image style={styles.image}
                       source={require('../../images/iris_logo_loginpage_white.png')}/>
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
