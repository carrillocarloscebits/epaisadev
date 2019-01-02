import React, { Component } from "react";
import { View, TouchableOpacity, Image, ImageBackground } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const CAMERA = require('../../../../assets/icons/photo_camera.png');

class ButtonCamera extends Component {
    render() {
        const { imageSource,imageAtributes, containerStyle, imageSize, onPress } = this.props;
        const calculateImage = imageAtributes.height/imageAtributes.width;
        const container = {
            width:hp('2.4%'), 
            height:hp('2.4%'),
            justifyContent:'center',
            alignItems:'center',
            ...containerStyle
        }

        const image = {
            width:imageSource?hp('2.4%'):hp(imageSize+'%'),
            height:imageSource?hp('2.4%')*calculateImage:hp(imageSize+'%'), 
            resizeMode:'contain',
        }

        return (
            <TouchableOpacity onPress={onPress} style={[container]}>
                {imageSource?<Image source={{uri: imageSource}} style={{width:"100%", height:"100%",borderRadius:5}} resizeMode="contain"/>:null}
                {/*<ImageBackground source={{uri: imageSource}} style={container} >*/}
                   {!imageSource && <Image source={CAMERA} style={image} />}
                {/*</ImageBackground>*/}
            </TouchableOpacity>
        );    
    }
}

export default ButtonCamera;