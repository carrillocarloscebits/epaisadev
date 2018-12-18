import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Swipeout from 'react-native-swipeout';

class ModuleDiscounts extends Component {
    render() {
        const {cgst,totalDiscount, subTotal,deliveryCharge, Total, subTotalContainer} = this.props
        
        return (
            <View style={styles.container}>
            {
                subTotal>0?
                <View style={{width:'100%'}}>
                {
                    totalDiscount > 0 ?
                    <Swipeout 
                        right={swipeBtns}
                        autoClose={true}
                        backgroundColor={'transparent'}
                        buttonWidth={wp('16%')}
                    >
                        <View style={subTotalContainer}>
                            <Text style={styles.subTextOrange}>Discount</Text>       
                            <Text style={[styles.subTextOrange,styles.textOrange]}>₹ {parseFloat(totalDiscount).toFixed(2)}</Text>
                        </View>
                    </Swipeout> : null
                }
                {
                      deliveryCharge > 0 ? 
                        <Swipeout 
                          right={swipeBtns}
                          autoClose={true}
                          backgroundColor={'transparent'}
                          buttonWidth={wp('16%')}
                        >
                          <View  style={subTotalContainer}>
                              <Text style={styles.subTextGray}>Delivery Charge</Text>       
                              <Text style={[styles.subTextGray,styles.subTextBlue]}>₹ {parseFloat(deliveryCharge).toFixed(2)}</Text>
                          </View> 
                        </Swipeout> : null
                    }
                <View style={[subTotalContainer, {paddingTop:hp('0%')}]}>
                    <Text style={styles.subTextGray}>CGST@9%</Text>       
                    <Text style={[styles.subTextGray,styles.subTextBlue]}>₹ {parseFloat(cgst).toFixed(2)}</Text>
                </View>
                </View>:null
            }
                <View  style={subTotalContainer}>
                    <Text style={styles.textDark2}>Total Amount</Text>       
                    <Text style={[styles.textDark2,styles.TextBlue2]}>₹ {parseFloat(Total>0?Total:0).toFixed(2)}</Text>
                </View>
            </View>
                    
        );
    }
}

const styles = StyleSheet.create({
    
    container:{
        width:'100%',
        marginBottom: hp('0.80'),
    },
    swipeBtns:{
        fontFamily:'Montserrat-SemiBold', 
        fontSize:hp('2.09%'), 
        color:'#D0021B', 
        width:wp('16%'), 
        height:'100%', 
        textAlign:'center', 
        textAlignVertical:'center'
    },
    subTextOrange:{
        fontSize:hp('2.2%'),
        color:'#FF6000',
        fontFamily: "Montserrat-SemiBold",
        paddingLeft: wp('2.65%')
    },
    textOrange:{
        paddingRight: wp('4%')
    },
    subTextGray:{
        fontSize:hp('2.2%'),
        color:'#47525D',
        fontFamily: "Montserrat-SemiBold",
        paddingLeft: wp('2.65%')
    },
    subTextBlue:{
        color:'#174285',
        paddingRight: wp('4%')
    },
    textDark2:{
        fontSize:hp('2.6%'),
        letterSpacing:wp('0.2%'),
        color:'#47525D',
        fontFamily: "Montserrat-Bold",
        paddingBottom: hp('1%'),
        paddingLeft: wp('2.65%')
      },
    TextBlue2:{
        color:'#174285',
        letterSpacing:wp('0.22%'),
        paddingRight: wp('4%')
      },
});
const swipeBtns = [
    {
      component: (
        <Text style={styles.swipeBtns}>Delete</Text>
      ),
      backgroundColor: '#FFACB6',
    },
  ];
export default ModuleDiscounts;
