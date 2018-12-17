import React, {Component} from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { PopUp, TextMontserrat, ButtonGradient } from 'components';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { CLOSE } from 'assets';

class OtpForgotPassword extends Component {
    render() {

        const {style, message, buttonTitle, onPress} = this.props;

        const otpContainer = {  
            justifyContent: 'center', 
            alignItems: 'center',    
            ...style
        }

        const textStyle = {
            fontSize: hp('2.4%'),
            textAlign: 'center',
            fontWeight: '700',
            //color:'#47525D',
            color:'#4e5965',
            width: '100%',
        }

        return (
            <PopUp style={otpContainer}>
                <View style={{height:'100%', width:'100%'}}>
                    <TouchableOpacity onPressIn={ () => alert('cerrar') } style={{position:'absolute',right:0,top:0}}>
                        <View >
                            <Image source={CLOSE} />
                        </View>
                    </TouchableOpacity>
                    {
                        message.map((element, i) => {
                        return <TextMontserrat key={i} style={textStyle}>{element}</TextMontserrat>
                        })
                    }
                    <TextMontserrat >+91 9876543210</TextMontserrat>
                    
                    <ButtonGradient title={buttonTitle} onPress={onPress} style={{width:wp('50%'), height:hp('6.25%')}} />
                </View>
            </PopUp>
        )
    }
}

export {OtpForgotPassword}