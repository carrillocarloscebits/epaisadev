import React, {Component} from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { PopUp, TextMontserrat, ButtonGradient, ButtonClose, FloatingTextInput, Timer } from 'components';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet'; 
import OtpInputs from './components/otp_inputs';
class OtpForgotPassword extends Component {

    renderTopMessages = () => {
        const textStyle = {
            fontSize: hp('2.4%'),
            textAlign: 'center',
            fontWeight: '700',
            //color:'#47525D',
            color:'#4e5965',
            width: '100%',
        }
        return this.props.message
            .map((element, i) => (<TextMontserrat key={i} style={textStyle}>{element}</TextMontserrat>))
    }

    render() {
        console.log(this.props)
        const {style, buttonTitle, onClosePress} = this.props;

        const popupContainer = EStyleSheet.create({  
            ...style,
            height: (75 / 100) * Dimensions.get('screen').height,
            width: '85%',
            padding: '3rem',
            paddingTop: '2rem',
        })

        const numberText = {
            textAlign:'center', 
            fontWeight:'700', 
            fontSize:hp('2.7%'), 
            color:'#174285'
        }

        const labelOtp = {
            textAlign:'center', 
            fontWeight:'700',
            marginBottom: '0.5rem',
            fontSize: '1.5rem', 
            color:'#6B6B6B'
        }

        const mainContainer = {
            flex: 1, 
        }
        const closeContainer = {
            width:'100%',
            alignItems:'flex-end'
        }

        const containerTopMessages = {
        }

        const containerPhoneNumber = {
            marginBottom: 20
        }

        const containerOtpFields = {
            alignItems:'center'
        }

        const containerTimer = {
        }

        const timerText = EStyleSheet.create({
            fontSize: '3rem',
            fontWeight: 'bold',
            color:'#5D6770',
            textAlign:'center'
        })


        const resendContainer = {
            alignItems: 'center'
        }

        return (
            <PopUp style={popupContainer}>
                <ScrollView contentContainerStyle={mainContainer}>
                    <View style={closeContainer}>
                        <ButtonClose onPress={onClosePress}/>
                    </View>
                    <View style={containerTopMessages}>
                        {this.renderTopMessages()}
                    </View>
                    <View style={containerPhoneNumber}>
                        <TextMontserrat style={numberText}>+91 9876543210</TextMontserrat>
                    </View>
                    

                    <View style={{flex: 1, flexGrow: 1, justifyContent: "space-between"}}>
                        <View style={containerOtpFields}>
                            <TextMontserrat style={labelOtp}> Insert OTP </TextMontserrat>
                            <OtpInputs />
                            {/* <TextMontserrat style={{fontWeight:'600', fontSize:hp('1.9%'), color:'#D0021B'}}>
                                Incorrect Code - Re-insert or resend
                            </TextMontserrat> */}
                        </View>
                        <View style={containerTimer}>
                            <Timer textStyle={timerText}/>
                        </View>
                        <View style={resendContainer}>
                            <View style={{width: '70%'}}>
                                <ButtonGradient 
                                    title={buttonTitle}
                                    // onPress={this.state.seconds != 0 ? null :onPress}
                                />
                            </View>
                        </View>
                    </View>
                    <View>
                        <TextMontserrat style={{
                            fontSize: '1.8rem',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginTop: '1.5rem',
                        }}>Insert New Password</TextMontserrat>
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
                        <View style={{
                            marginTop: 20
                        }}>
                            <ButtonGradient title={'RESET PASSWORD'} onPress={() => alert('Reset')} />
                        </View>
                    </View>
                </ScrollView>
            </PopUp>
        )
    }
}

export default OtpForgotPassword