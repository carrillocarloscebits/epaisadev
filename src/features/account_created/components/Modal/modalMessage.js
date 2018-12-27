//import liraries
import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image, Modal} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';
// create a component
class ModalMessage extends Component {
    render() {
        const {active, toggleModal} = this.props
        
        return (
            <Modal visible={active} animationType="fade" onRequestClose={toggleModal} transparent={true}>
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <View style={{height:"40%"}}>
                        </View>
                        <View style={{height:"60%", alignItems:'center'}}>
                            <Text style={styles.textLogin}>Horayy! Your account</Text>
                            <Text style={[styles.textLogin,{marginTop:hp('0.5%')}]}>has been created</Text>

                            <Text style={[styles.textDescription,{marginTop: hp('3%')}]}>Just one more step! To complete the</Text>
                            <Text style={styles.textDescription}>registration you need to validate you</Text>
                            <Text style={styles.textDescription}>email address</Text>

                            <TouchableOpacity style={styles.button}>
                                    <LinearGradient 
                                            colors={['#174285', '#0079AA']} 
                                            start={{ x: 0, y: 1 }}
                                            end={{ x: 1, y: 1 }}
                                            style={ {alignItems: 'center',justifyContent:'center', width:'100%',borderRadius: 35, elevation:5, paddingHorizontal:hp('6%'),paddingVertical:hp('2.5%')} }>           
                                            <View style= {{width: '100%', alignItems: 'center', justifyContent: 'center'}} >
                                                <Text style={{color:'#FFFFFF',fontSize: hp('1.8%'),fontFamily:'Montserrat-Bold', letterSpacing: 2, opacity: 0.8}}>LOGIN TO YOUR ACCOUNT</Text>
                                            </View>
                                    </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    
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
        justifyContent:'flex-end',
        alignItems:'center',
        backgroundColor:colors.opacityDin(0.6)
    },
    wrapper:{
        backgroundColor: colors.white,
        width:"90%",
        height:hp('66%'),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20,
        marginBottom: hp('2%'),
    },
    textContainer:{
        height:"70%",
        alignItems: 'center',
    },
    textLogin:{
        fontSize:hp('3%'),
        fontFamily:'Montserrat-SemiBold',
        color:'#52565F',
        marginTop:hp('1.8%'),
        textAlign:'center'
    },
    textDescription:{
        fontSize:hp('2%'),
        fontFamily:'Montserrat-SemiBold',
        color:'#808080',
        opacity: 0.6,
        textAlign:'center',
        letterSpacing: 0.3
    },
    button:{
        width:'100%',
        alignItems: 'center',
        justifyContent:'center',
        marginTop:hp('5%'),
    },
});

//make this component available to the app
export default ModalMessage;
