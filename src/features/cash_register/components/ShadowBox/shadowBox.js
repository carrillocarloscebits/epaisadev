import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../styles/colors'
import EStyleSheet from 'react-native-extended-stylesheet';

export default class ShadowBox extends Component{
  
  render() {
    const {width, height, color,top,elevation}=this.props
    const container= {
        position: 'absolute',
        top: hp('0.5%')+top,
        left:0,
        width: width,
        height:height,
        backgroundColor: color,
        elevation:elevation,
    }
    return (
      <View style={container}>
        
      </View>
    );
  }
}
