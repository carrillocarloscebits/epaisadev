import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class Headers extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={[styles.defaultHeader, {width:wp('10%')}]}>S No.</Text>
                <Text style={[styles.defaultHeader,{width:wp('41%'), paddingLeft:wp('1.75%')}]}>Description</Text>
                <Text style={[styles.defaultHeader,{width:wp('9%'), textAlign:'center'}]}>Qty</Text>
                <Text style={[styles.defaultHeader,{width:wp('23.5%'), textAlign:'right'}]}>Price</Text>
            </View>    
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection:'row', 
        height:hp('3.95%'), 
        paddingLeft:wp('2.1%'), 
        paddingRight:wp('4%'), 
        alignItems:'center', 
        borderBottomWidth:hp('0.15%'), 
        borderColor:'#D0D0D0'
    },
    defaultHeader:{
        fontFamily:'Montserrat-Bold', 
        fontSize:hp('1.8%'), 
        color:'#555555',
    }
});

//make this component available to the app
export default Headers;
