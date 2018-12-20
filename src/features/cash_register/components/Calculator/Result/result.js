import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ImageBackground} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Result extends Component{
  render() {
    const {amount} = this.props
    return (
      <View style={styles.container}>
        <ImageBackground 
            source={require('../../../assets/img/rectangleLarge.png')}
            style={styles.imgb}
            resizeMode="stretch"
        >  
            <View style={styles.fieldResult}>
                <Text style={styles.textField}>Amount</Text>
                <Text style={styles.textField}>₹ {amount}</Text>
            </View>
                
        </ImageBackground>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    alignItems:'center',
  },
  imgb:{
    justifyContent: 'center',
    width: '99%',
    alignItems:'center',
  },
  fieldResult:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: hp('2.6%'),
    width: '100%',
    alignItems:'center',
  },
  textField:{
    fontSize: hp('2.6%'),
    fontWeight: '700',
  },
  '@media (min-width: 200) and (max-width: 400)': { // media queries
    fieldResult: { 
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    textField:{
      fontSize: 15,
      fontWeight: '500',
    },
  }
});
