import React, {Component} from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { PopUp, TextMontserrat, ButtonGradient, OtpInputs, ButtonClose, FloatingTextInput } from 'components';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

class OtpForgotPassword extends Component {
    state = {
        counter:'01:00',
        seconds:60,
        colorGradient:['#BDC1CD','#BDC1CD']
    }

    componentWillMount() {
        this.countDown()
    }

    componentWillUnmount() {
        clearInterval(this.clockCall)
    }

    secondWithZero = (second) => {
        return second < 10 ? '0'+second:''+second
    }

    countDown = () => {
        this.clockCall = setInterval(() => {
            this.decrementClock();
        }, 1000);
    }

    decrementClock = () => {      
        this.setState(
            (prevstate) => ({ 
                seconds: prevstate.seconds-1,
                counter: '00:'+this.secondWithZero(prevstate.seconds-1)
            }));
        if(this.state.seconds == 0){
            clearInterval(this.clockCall);
            this.setState({ colorGradient: ['#174285','#0079AA'] })
        }
    };

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

        const numberText = {
            width:'100%', 
            textAlign:'center', 
            fontWeight:'700', 
            fontSize:hp('2.7%'), 
            color:'#174285'
        }

        const labelOtp = {
            width:'100%', 
            textAlign:'center', 
            fontWeight:'700', 
            fontSize:hp('2.1%'), 
            color:'#6B6B6B'
        }

        return (
            <PopUp style={otpContainer}>
                <View style={{height:'100%', width:'100%', alignItems:'center'}}>
                    <View style={{width:'100%', alignItems:'flex-end'}}>
                        <ButtonClose onPress={onPress}/>
                    </View>
                    {
                        message.map((element, i) => {
                        return <TextMontserrat key={i} style={textStyle}>{element}</TextMontserrat>
                        })
                    }
                    
                    <TextMontserrat style={numberText} >
                        +91 9876543210
                    </TextMontserrat>
                    <View style={{width:'100%', alignItems:'center'}}>
                        <TextMontserrat style={labelOtp} >
                            Insert OTP
                        </TextMontserrat>
                        <OtpInputs />
                        <TextMontserrat style={{fontWeight:'600', fontSize:hp('1.9%'), color:'#D0021B'}}>
                            Incorrect Code - Re-insert or resend
                        </TextMontserrat>
                    </View>
                    <TextMontserrat style={{width:'100%', fontFamily:'Montserrat-SemiBold', fontSize:hp('4.5%'), color:'#5D6770', textAlign:'center'}}>
                        {this.state.counter}
                    </TextMontserrat>
                    <ButtonGradient title={buttonTitle} onPress={this.state.seconds != 0 ? null :onPress} colorLinearGradient={this.state.colorGradient} />
                    <View style={{width:wp('69%')}}>
                        <FloatingTextInput
                            label={'Password'}
                            secureTextEntry={true}
                            editable={false}
                            />
                        <FloatingTextInput
                            label={'Re-type Password'}
                            secureTextEntry={true}
                            editable={false}
                            />
                        <ButtonGradient title={'RESET PASSWORD'} onPress={onPress} />
                    </View>
                </View>
            </PopUp>
        )
    }
}

export {OtpForgotPassword}