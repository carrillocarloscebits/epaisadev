//import liraries
import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image, Modal} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';
// create a component
class ModalFinger extends Component {
    render() {
        const {active, toggleModal, status, action} = this.props
        colorFinger = status=='normal'? '#52565F':status=='success'? '#09BA83' : '#D0021B'
        labelDescription = status=='normal'? 'Register your fingerprint':status=='success'? 'Fingerprint registered' : 'Fingerprint not found'
        return (
            <Modal visible={active} animationType="fade" onRequestClose={toggleModal} transparent={true}>
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <View style={[styles.finger,{backgroundColor:colorFinger}]}> 
                            <Image source={require('../../assets/img/finger.png')} style={{height:hp('5%'), width:hp('5%')*0.86}}/>
                        </View>
                        <Text style={styles.textLogin}>Fingerprint for log in</Text>
                        <Text style={[styles.textDescription, {color:colorFinger}]}>{labelDescription}</Text>
                        {
                            status=='warning'?
                            <View style={styles.buttonContainer}>
                                
                                <TouchableOpacity onPress={action} style= {{backgroundColor:colors.white, borderRadius:25,elevation:5,width: '45%', paddingVertical: hp('1.7%'), alignItems: 'center', justifyContent: 'center'}} >
                                    <Text style={{color:'#174285',fontSize: hp('1.7%'),fontFamily:'Montserrat-Bold', letterSpacing:1}}>NOT NOW</Text>  
                                </TouchableOpacity>
                                <TouchableOpacity onPress={action} style={styles.buttonRight}>
                                <LinearGradient 
                                    colors={['#174285', '#0079AA']} 
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={ {borderRadius:25,elevation:5, alignItems: 'center',justifyContent:'center', width:'100%'} }>           
                                    <View style= {{width: '100%', paddingVertical: hp('1.7%'), alignItems: 'center', justifyContent: 'center'}} >
                                        <Text style={{color:'#FFFFFF',fontSize: hp('1.7%'),fontFamily:'Montserrat-SemiBold', letterSpacing:2}}>SETTINGS</Text>  
                                    </View>
                                </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity style={styles.button} onPress={action}>
                                <LinearGradient 
                                    colors={['#174285', '#0079AA']} 
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={ {borderRadius:25,elevation:5, alignItems: 'center',justifyContent:'center', width:'100%'} }>           
                                    <View style= {{width: '100%', paddingVertical: hp('1.7%'), alignItems: 'center', justifyContent: 'center'}} >
                                        <Text style={{color:'#FFFFFF',fontSize: hp('1.7%'),fontFamily:'Montserrat-SemiBold', letterSpacing:2}}>CANCEL</Text>  
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </Modal>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        width:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.opacityDin(0.6)
    },
    wrapper:{
        backgroundColor: colors.white,
        width:hp('45%'),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20
    },
    finger:{
        borderRadius: hp('8%'),
        width: hp('10%'),
        height: hp('10%'),
        alignItems:'center',
        justifyContent:'center',
        marginTop:hp('7%')
    },
    button:{
        width:'55%',
        marginTop:hp('2.8%'),
        marginBottom: hp('3%'),
    },
    textLogin:{
        fontSize:hp('2.6%'),
        fontFamily:'Montserrat-SemiBold',
        color:'#52565F',
        marginTop:hp('2.8%')
    },
    textDescription:{
        fontSize:hp('1.88%'),
        fontFamily:'Montserrat-Bold',
        color:'#52565F',
        marginTop:hp('6%')
    },
    buttonContainer:{
        flexDirection:'row',
        width:'85%',
        justifyContent: 'space-between',
        marginTop:hp('2.8%'),
        marginBottom: hp('3%'),
    },
    buttonRight:{
        width:'48%',
    }
});

//make this component available to the app
export default ModalFinger;