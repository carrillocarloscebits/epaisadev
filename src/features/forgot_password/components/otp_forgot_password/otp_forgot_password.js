import React, {Component} from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { PopUp, TextMontserrat, ButtonGradient, ButtonClose, FloatingTextInput, Timer } from 'components';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet'; 
import OtpInputs from './components/otp_inputs';

class OtpForgotPassword extends Component {
    state = {
        can_resend_otp: false
    }
    renderTopMessages = () => {
        const textStyle = {
            fontSize: hp('2.4%'),
            textAlign: 'center',
            fontWeight: '700',
            color:'#4e5965',
            width: '100%',
        }
        return this.props.message
            .map((element, i) => (<TextMontserrat key={i} style={textStyle}>{element}</TextMontserrat>))
    }

    timer = null;
    inputs = {};
    
    _password_validations = () => {
        return {
            title: 'Password must contain',
            validations: [
                {
                    name: '8 Characters',
                    validateInput: (val) => {
                        return val.length > 8;
                    }
                },
                {
                    name: '1 Number',
                    validateInput: (val) => {
                        return /\d/.test(val);
                    }
                },
                {
                    name: '1 Special Character',
                    validateInput: (val) => {
                        return /\W+/.test(val);
                    }
                }
            ]
        }
    }

    _password_match = () => {
        if(this.state.password !== this.state.password_confirm) {
            return ['Passwords do not match!'];
        }
        return [];
    }

    render() {
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
                <View style={{flex:1}}>
                    <ScrollView contentContainerStyle={null}>
                        <View style={closeContainer}>
                            <ButtonClose onPress={onClosePress}/>
                        </View>
                        <View style={containerTopMessages}>
                            {this.renderTopMessages()}
                        </View>
                        <View style={containerPhoneNumber}>
                            <TextMontserrat style={numberText}>{this.props.reset_password.mobile_number}</TextMontserrat>
                        </View>
                        

                        <View style={{flex: 1, flexGrow: 1, justifyContent: "space-between"}}>
                            <View style={containerOtpFields}>
                                <TextMontserrat style={labelOtp}> Insert OTP </TextMontserrat>
                                <OtpInputs
                                valid={this.props.reset_password.otp_valid}
                                invalid={this.props.reset_password.otp_invalid}
                                data={['first', 'second', 'third', 'fourth', 'fifth', 'sixth']}
                                onComplete={(otp) => {
                                    this.props.validate_otp(this.props.reset_password.mobile_number, otp);
                                }} />
                                {this.props.reset_password.otp_invalid && 
                                <TextMontserrat style={{fontWeight:'600', fontSize:hp('1.9%'), color:'#D0021B'}}>
                                    Incorrect Code - Re-insert or resend
                                </TextMontserrat>}
                            </View>
                            <View style={containerTimer}>
                                <Timer
                                    ref={(timer => this.timer = timer)}
                                    textStyle={timerText}
                                    onStart={() => this.setState({can_resend_otp: false})}
                                    onFinished={() => this.setState({can_resend_otp: true})}
                                />
                            </View>
                            <View style={resendContainer}>
                                <View style={{width: '70%'}}>
                                    <ButtonGradient 
                                        title={buttonTitle}
                                        disabled={!this.state.can_resend_otp}
                                        onPress={() => {
                                            this.timer.restart()
                                            this.props.resend_otp(this.props.reset_password.mobile_number)
                                        }}
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
                                validate={this._password_validations()}
                                onChangeText={(password) => this.setState({password})}
                                />
                            <FloatingTextInput
                                label={'Re-type Password'}
                                secureTextEntry={true}
                                editable={false}
                                errors={this._password_match()}
                                onChangeText={(password_confirm) => this.setState({password_confirm})}
                                />
                            <View style={{marginTop: 20}}>
                                <ButtonGradient disabled={(!this.props.reset_password.otp_valid && !this.props.reset_password.auth_key)} title={'RESET PASSWORD'} onPress={() => {
                                    if(this._password_match().length === 0) {
                                        const {mobile_number, otp_code, auth_key} = this.props.reset_password;
                                        const {password} = this.state
                                        this.props.reset_pass(mobile_number, otp_code, password, auth_key)
                                    }
                                }} />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </PopUp>
        )
    }
}

export default OtpForgotPassword