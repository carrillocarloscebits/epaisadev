//import liraries
import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { isTablet } from '../../constants/isLandscape';
// create a component
class Footer extends Component {
    
    render() {
        const {openModal}= this.props
        const isLandscape = isTablet
        return (
            isLandscape?
            <View style={styles.containerLandscape}>
                <TouchableOpacity style={[styles.button, {backgroundColor: 'white',width:'43%',height: '60%',borderRadius: 35, elevation:5}]}>
                    <Text style={[styles.labelButtonWhite,{fontSize:hp('2.1%'),}]} >NOT NOW</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {width:'43%'}]} onPress={openModal}>
                <LinearGradient 
                                colors={['#174285', '#0079AA']} 
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={ {alignItems: 'center',justifyContent:'center', width:'100%',borderRadius: 35, elevation:5} }>           
                                <View style= {{width: '100%', height: '60%', alignItems: 'center', justifyContent: 'center'}} >
                                    <Text style={{color:'#FFFFFF',fontSize: hp('2.3%'),fontFamily:'Montserrat-SemiBold'}}>LINK YOUR</Text>
                                    <Text style={{color:'#FFFFFF',fontSize: hp('2.3%'),fontFamily:'Montserrat-SemiBold'}}>FINGERPRINT</Text>     
                                </View>
                            </LinearGradient>
                </TouchableOpacity>
            </View>:
            <View style={styles.container}>
                <TouchableOpacity style={[styles.button, {backgroundColor: 'white'}]}>
                    <Text style={styles.labelButtonWhite} >NOT NOW</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, {backgroundColor: 'red'}]} onPress={openModal}>
                <LinearGradient 
                                colors={['#174285', '#0079AA']} 
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={ {alignItems: 'center',justifyContent:'center', width:'100%'} }>           
                                <View style= {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} >
                                    <Text style={{color:'#FFFFFF',fontSize: hp('1.8%'),fontFamily:'Montserrat-SemiBold'}}>LINK YOUR</Text>
                                    <Text style={{color:'#FFFFFF',fontSize: hp('1.8%'),fontFamily:'Montserrat-SemiBold'}}>FINGERPRINT</Text>     
                                </View>
                            </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        width:'100%',
        flex:1,
        flexDirection: 'row',
        borderTopColor: '#174285',
        borderTopWidth: 1,
    },
    button:{
        width:'50%',
        alignItems: 'center',
        justifyContent:'center',
    },
    labelButtonWhite:{
        color:'#174285',
        fontSize: hp('1.8%'),
        fontFamily:'Montserrat-Bold',
    },
    containerLandscape:{
        width:'50%',
        flex:1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent:'space-between',
    },
    
});

//make this component available to the app
export default Footer;
