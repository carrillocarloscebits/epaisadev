
import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Button from './components/button';
import ModuleDiscounts from './components/moduleDiscounts';

class Footer extends Component {
    render() {
        const {subtotal} = this.props
        return (
            <View style={styles.container}>
                <View  style={[styles.subTotalContainer,{paddingTop:hp('0.9%')}]}>
                    <Text style={styles.textDark1}>Sub Total</Text>    
                    <Text style={styles.TextBlue1}>₹ {subtotal}</Text>
                </View>
                <ModuleDiscounts totalDiscount={1} subTotalContainer={styles.subTotalContainer}/>
                <View style={styles.buttonsContainer}>
                    <Button label="HOLD" backgroundColor="#D8D8D8" width={wp('23.5%')} color="#47525D"/>
                    <Button label={`PAY ₹ ${subtotal}`} backgroundColor="#09BA83" width={wp('60%')} color="white"/>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    
    container:{
        borderTopWidth:hp('0.2%'),
        borderColor:'#D0D0D0',
        width:'100%',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-between',
      },
      subTotalContainer:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
      },
      textDark1:{
        fontSize:hp('2.7%'),
        color:'#47525D',
        fontFamily: "Montserrat-Bold",
        paddingLeft: wp('2.65%')
      },
      TextBlue1:{
        fontSize:hp('2.6%'),
        color:'#174285',
        fontFamily: "Montserrat-Bold",
        letterSpacing:wp('0.03%'),
        paddingRight: wp('4%')
      },
      buttonsContainer:{
          flexDirection:'row', 
          height:hp('6.75'), 
          width:'100%', 
          justifyContent:'space-between', 
          paddingLeft:wp('2.3%'), 
          paddingRight:wp('2.3%')
        }
});

export default Footer;
