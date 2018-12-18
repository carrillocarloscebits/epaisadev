import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Swipeout from 'react-native-swipeout';

class ModuleDiscounts extends Component {
    render() {
        const {totalDiscount, subTotalContainer} = this.props
        return (
            <View style={styles.container}>
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
                        <Text style={[styles.subTextOrange,styles.textOrange]}>₹ 100</Text>
                        </View>
                    </Swipeout> : null
                }
               
                <View style={[subTotalContainer, {paddingTop:hp('0%')}]}>
                    <Text style={styles.subTextGray}>CGST@9%</Text>       
                    <Text style={[styles.subTextGray,styles.subTextBlue]}>₹ 100</Text>
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
        fontSize:hp('2.6%'),
        color:'#FF6000',
        fontFamily: "Montserrat-SemiBold",
        paddingLeft: wp('2.65%')
    },
    textOrange:{
        paddingRight: wp('4%')
    },
    subTextGray:{
        fontSize:hp('2.6%'),
        color:'#47525D',
        fontFamily: "Montserrat-SemiBold",
        paddingLeft: wp('2.65%')
    },
    subTextBlue:{
        color:'#174285',
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
