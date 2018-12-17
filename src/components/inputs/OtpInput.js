import React, { Component } from "react";
import { View, TextInput, Text, Animated, Platform } from "react-native";
import { Colors } from "api";
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextMontserrat} from "components";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import normalize from "../utilities/helpers/normalizeText";
import EStyleSheet from 'react-native-extended-stylesheet';

class OtpInput extends Component {
    render() {
        const { containerStyle, inputStyle } = this.props;

        const container = {
            ...containerStyle
        }

        const input = {
            ...inputStyle
        }

        return (
            <View style={container}>
                <TextInput 
                    style= {input}
                    keyboardType='numeric'
                    maxLength={1}
                    underlineColorAndroid='transparent'
                />
            </View>
        );    
    }
}

export default OtpInput;