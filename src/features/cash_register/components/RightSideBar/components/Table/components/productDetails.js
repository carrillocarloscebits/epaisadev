import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image,Keyboard} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class ProductDetail extends React.Component{

    componentDidMount () {
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
  
    componentWillUnmount () {
      this.keyboardDidHideListener.remove();
    }
  
    _keyboardDidHide = () => {
      this.removeFocus()
    }
    render() {
  
      const { id, name, quant, total,discount,type} = this.props.item
      return(
      <View>
        <TouchableOpacity>
          <View>
            <View style={styles.container}>
                <Text style={[styles.textProductDefault, styles.TextGrayProductIndex]}>{id}.</Text>     
                <Text style={[styles.textProductDefault, styles.TextGrayProduct]} numberOfLines={3}>{name}</Text>
                <Text style={[styles.textProductDefault, styles.TextGray]}>{quant}</Text>    
                <View style={styles.productAmount}>
                    <Text style={[styles.textProductDefault, styles.TextBlueProduct]} numberOfLines={1} textAlign={'right'}>
                        ₹ {total}
                    </Text>
                </View>  
            </View>
            { discount > 0 ?
                <View style={styles.productDetailDiscountContainer}>
                <Text style={styles.productDetailDiscountLabel}>— Discount {type=="%"? `@ ${parseFloat(discount).toFixed(2)}%`:null}</Text>
                <Text style={[styles.productDetailDiscountLabel,styles.productDetailDiscountValue]}>₹ {type=="%"? parseFloat(total*discount/100).toFixed(2):parseFloat(discount).toFixed(2)}</Text>
                </View> : null
            }
          </View>
        </TouchableOpacity>
      </View>
      )
    }
  }
  const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        paddingLeft:wp('2.1%'),
        paddingTop:hp('0.5%'),
    },
    textProductDefault:{
        color:'#555555',
        fontFamily: "Montserrat-Medium", 
        fontSize:hp('2.1%'),
    },
    TextGrayProductIndex:{
        textAlign:'center',
        width:wp('10%'),
    },
    TextGrayProduct:{
        width:wp('41%'),
        paddingLeft:wp('1.75%'),
        paddingRight:wp('0.8%')
    },
    TextGray:{
        width:wp('9%'),
        textAlign:'center',
    },
    productAmount: {
        width:wp('23.5%'),
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    TextBlueProduct:{
        color:'#174285',
        width:wp('23.5%'),
        textAlign:'right',
        fontFamily: "Montserrat-SemiBold",
    },
    productDetailDiscountContainer:{
        flexDirection:'row', 
        justifyContent:'flex-end', 
        width:'100%', 
        paddingRight:wp('4.4%')
      },
    productDetailDiscountLabel:{  
        color:'#FD853D', 
        fontFamily:'Montserrat-SemiBold', 
        fontSize:hp('1.72%'), 
        width:wp('53.1%')
    },
    productDetailDiscountValue:{
        textAlign:'right', 
        width:wp('20%')
      },
});
  export default ProductDetail;