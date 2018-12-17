import React, {Component} from 'react';
import {View, Text} from 'react-native';
export default class Inside extends Component {
    render() {
        return (
            <View style={{justifyContent: 'center', alignItems: "center", flex: 1}}>
                <Text>Inside App (Logged In)</Text>
            </View>
        )
    }
}