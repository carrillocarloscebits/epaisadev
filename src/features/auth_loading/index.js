import React, {Component} from 'react';
import {View, Text, AsyncStorage, ActivityIndicator} from 'react-native';
export default class AuthLoading extends Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }
    
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = () => {
        // const userToken = await AsyncStorage.getItem('userToken');
    
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        setTimeout(() => {
            this.props.navigation.navigate(false ? 'App' : 'Auth');
        }, 100)
    };

    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: "center", flex: 1}}>
                <ActivityIndicator />
                <Text>Loading Auth...</Text>
            </View>
        )
    }
}