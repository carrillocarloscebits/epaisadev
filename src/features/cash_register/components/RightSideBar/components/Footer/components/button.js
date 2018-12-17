import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { scale, moderateScale, verticalScale} from '../../../../../../../util/scaling';
class Button extends Component {
    render() {
        const {label, backgroundColor, width, color} = this.props

        return (
            <TouchableOpacity
                onPress={()=>{alert('Not implemented for this version.')}} >
                <View style={[{backgroundColor},{width},styles.container]}>
                    <Text style={[{color},styles.labelButton]}>{label}</Text>
                </View>
            </TouchableOpacity>
                    
        );
    }
}

const styles = StyleSheet.create({
    
    container:{
        height:hp('6.1%'), 
        borderRadius:hp('0.9%'), 
        justifyContent:'center', 
        alignItems:'center', 
        elevation: moderateScale(1.5)
    },
    labelButton:{
        fontFamily:'Montserrat-Bold', 
        fontSize:hp('2.6%')
    }
});

export default Button;
