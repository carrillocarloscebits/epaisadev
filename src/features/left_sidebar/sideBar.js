import React, {Component} from 'react';
import {Keyboard, Platform, StyleSheet, Text, View, Image, Dimensions, Modal,TouchableOpacity} from 'react-native';
import colors from './styles/colors'
import EStyleSheet from 'react-native-extended-stylesheet';
import ListOptions from './components/ListOptions/listOptions';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { isTablet } from './constants/isLandscape';
let keyboard=false;
export default class SideBar extends Component{
    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
      }
    
      componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
      }
    _keyboardDidShow () {
        keyboard=true
    }
    
    _keyboardDidHide () {
        keyboard=false
    }
    render() {
        const {active,toggle, sideOption, handleOption, logoutAction}=this.props
        const isLandscape= isTablet
        const paddingLandscape = isLandscape? {paddingHorizontal: wp('3%')}:null
        return (
                <View style={[styles.container, keyboard?{height:hp('100%')}:{height:'100%',flexGrow:1,}]}>
                    <View style={[styles.barContainer, paddingLandscape]}>
                        <View style={styles.header}>
                            <Image source={require('./assets/img/coffeelogo.png')} style={{height: hp('7%'),width:hp('7%'), marginBottom: hp('1%')}}/>
                            <Text style={styles.headerTextTop}>Espresso Café</Text>
                            <Text style={styles.headerTextBottom}>Abheer Kaushik</Text>
                        </View>
                        <ListOptions sideOption={sideOption} handleOption={handleOption}/>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity>
                                <Image source={require('./assets/img/BT.png')} style={{height: hp('4%'),width:hp('4%')*0.52}}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require('./assets/img/Velo.png')} style={{height: hp('4%'),width:hp('4%')}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={logoutAction}>
                                <Image source={require('./assets/img/Exit.png')} style={{height: hp('4%'),width:hp('4%')*1.24}}/>
                            </TouchableOpacity>
                        </View>    
                    </View>
                </View>
        );
    }
}

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    height:'100%',
    flexGrow:1,
    backgroundColor: colors.opacityDin(0.5),
    alignItems: 'flex-end'
  },
  barContainer: {
    flex:1,
    width: '100%',
    backgroundColor: colors.lightBlack,
    paddingHorizontal: wp('8%'),
    elevation: 200
  },
  barOptions:{
    flex:1,
  },
  header:{
    width:'100%',
    marginTop: '18%',
    marginBottom: '16%'
  },
  headerTextTop:{
   color: colors.white,
   fontFamily:'Montserrat-Bold',
   fontSize:hp('2.6%'),
  },
  headerTextBottom:{
    color: colors.white,
    fontFamily:'Montserrat-SemiBold',
    fontSize:hp('2.3%'),
   },
  iconItem:{
    height:'100%',
    justifyContent:'center',
    marginHorizontal: 8,
  },
  iconContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginTop: hp('4%'),
    marginBottom: hp('3%'),
  },
  '@media (min-width: 200) and (max-width: 400)': { // media queries
    /*headerTextTop:{
        fontSize:14
    },
    headerTextBottom:{
        fontSize:13
    },*/
    barContainer:{
        paddingHorizontal: 22,
    }
  }
});
