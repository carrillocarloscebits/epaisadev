import React, { Component } from "react";
import { View, TouchableOpacity, Image, ImageBackground } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const CAMERA = require('../../../../assets/icons/photo_camera.png');

class ButtonCamera extends Component {
    render() {
        const { imageSource, containerStyle, imageSize, onPress } = this.props;

        const container = {
            width:hp('2.4%'), 
            height:hp('2.4%'),
            justifyContent:'center',
            alignItems:'center',
            ...containerStyle
        }

        const image = {
            width:hp(imageSize+'%'),
            height:hp(imageSize+'%'), 
            resizeMode:'contain',
        }

        return (
            <TouchableOpacity onPress={onPress} style={container}>
                <ImageBackground source={{uri: imageSource}} style={container} >
                    {!imageSource && <Image source={CAMERA} style={image} />}
                </ImageBackground>
            </TouchableOpacity>
        );    
    }
}

export default ButtonCamera;