import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../styles/colors'
import EStyleSheet from 'react-native-extended-stylesheet';
import { isTablet } from '../../constants/isLandscape';
export default class Header extends Component{
  
  render() {
    const {label, cant, toggleSide, toggleRight, toggleOptions}=this.props
    const isLandscape= isTablet
    return (
      <View style={styles.container}>
        
        <TouchableOpacity style={styles.iconLeft} onPress={toggleSide}>
          <Image source={require('../../assets/img/sidelist.png')} style={{width:hp('2.6%'),height:hp('2.6%')}}/>
        </TouchableOpacity>
        <Text style={[styles.titleCentral]} >{label}</Text>
        
        { !isLandscape?
          <View style={styles.iconRight}>
              <View style={[styles.iconItem,{width:hp('4.5%'),height:hp('4.5%')}]}>
               <Image source={require('../../assets/img/Fill.png')} style={{width:hp('4.5%'),height:hp('4.5%')}} />
                <View style={[styles.stack,{width:hp('3.7%'),height:hp('3.7%'),left: 0,top:0}]}>
                   <Text style={[styles.stackText,{fontSize:hp('2.6%')}]}>5</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.iconItem,{width:hp('4.5%'),height:hp('4.5%')}]} onPress={toggleRight}>
                <Image source={require('../../assets/img/Cart.png')}/>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cant}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.iconItem,{width:hp('4.5%'),height:hp('4.5%')}]} onPress={toggleOptions}>
                <Image  source={require('../../assets/img/MoreDot.png')} />
              </TouchableOpacity>
          </View>
          :
            <View style={styles.iconRight}>
            <View style={[styles.iconItem,{width:hp('4.5%'),height:hp('4.5%'), marginRight:hp('3%')}]}>
               <Image source={require('../../assets/img/Fill.png')} style={{width:hp('4.5%'),height:hp('4.5%')}} />
                <View style={[styles.stack,{width:hp('3.7%'),height:hp('3.7%'),left: 0,top:0}]}>
                   <Text style={[styles.stackText,{fontSize:hp('2.6%')}]}>5</Text>
                </View>
           </View>
           </View>
          }
        
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    height:hp('10%'),
    alignItems:'center',
    backgroundColor: colors.darkBlue,
    paddingHorizontal: 22,
    elevation:0
  },
  iconLeft:{
    position: 'absolute',
    height: '100%',
    left:20,
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
    justifyContent: 'center'
  },
  badge:{
    position: 'absolute',
    right:-hp('0.6%'),
    top:-hp('0.6%'),
    backgroundColor: colors.gray,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 20,
    paddingHorizontal: hp('0.5'),
  },
  badgeText:{
    color: colors.white,
    fontSize:9,
    fontFamily: 'Montserrat-Bold'
  },
  stack:{
    position: 'absolute',
    left: '27%',
    top: '5%',
    alignItems:'center',
    justifyContent:'center',
  },
  stackText:{
    color: colors.white,
    fontSize:13,
    fontWeight:'bold',
    
  },
  iconRight:{
    flexDirection: 'row',
    position: 'absolute',
    height:'100%',
    right:0,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  iconItem:{
    height:'100%',
    justifyContent:'center',
    marginHorizontal: hp('0.6%'),
    alignItems:'center'
  },
  marginExtra:{
    marginLeft: 12,
  },
  iconContainer:{
    flexDirection: 'row',
    height:'100%',
    justifyContent:'space-between'
  },
  titleCentral:{
    color: colors.white,
    fontSize: hp('2.5%'),
    fontWeight: '700',
    letterSpacing: 2,
    textAlign:'center',
    fontFamily:'Montserrat-Regular'
  },
  '@media (min-width: 200) and (max-width: 400)': { // media queries
    badge:{
      
      right:-hp('1.3%'),
      top:-hp('1.3%'),
    },
  }

});
