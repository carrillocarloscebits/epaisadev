import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import colors from '../../../styles/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { isTablet } from '../../../constants/isLandscape';

export default class Item extends Component{
  render() {
    const{source,label, item, cant} = this.props
    return (
      
      <View style={[styles.container, cant<7&&isTablet?{marginRight: wp('4.3%')*0.66+(wp('18.8%')*0.66)*(7-cant)/(cant)}:null, cant<5&&!isTablet?{marginRight: wp('3.85%')+(wp('27%'))*(5-cant)/(cant)}:null]}>
        
        <Image source={item.icon} style={styles.icon} />
        
        <Text style={styles.title}>{item.label}</Text>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:'center',
    marginRight: isTablet?wp('4.3%')*0.66:wp('3.85%'),
  },
  icon:{
    width:isTablet?wp('10%')*0.66:wp('16%'),
    height:isTablet?wp('10%')*0.66:wp('16%'),
    justifyContent: 'center',
    alignItems:'center',
  },
  title:{
    color: colors.slateGray,
    fontSize: hp('1.5%'),
    fontFamily:'Montserrat-Bold'
  },
  
});
