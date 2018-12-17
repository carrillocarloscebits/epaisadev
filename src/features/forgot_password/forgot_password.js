import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import {Colors} from 'api';
import { DoubleBackground, Card, Loading, Alert, OtpForgotPassword, TextMontserrat, BackHeader, ButtonGradient} from 'components';
import Logo from 'components/utilities/logo';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import ForgotPasswordForm from './components/forgot_password_form';

class ForgotPassword extends Component {
    state={
        email: false,
        modal: false,
        otp: false
    }

    static navigationOptions = {
        header: null
    }

    getStyles = () => {
        return EStyleSheet.create({
            mainContainer: {
                height:hp('100%'),
                width:wp('100%'),
                backgroundColor: 'green'
            },
            scroll: {
                backgroundColor: 'green',
            },
            logoContainer: {
                height:hp('15.8%'),
                width:wp('100%'),
                justifyContent: 'flex-start',  
                alignItems:'center',   
                backgroundColor:'#F7BE81'
            },
            cardContainer: {
                backgroundColor: 'red',                
                height:hp('42.2%'),
                alignItems: 'center',
            },
            card: {
                height:hp('42.2%'),
                paddingHorizontal: '3rem',
                paddingBottom: '2rem'
            },
            termsText: {
                fontSize: Dimensions.get('screen').width <= 320 ? 12 : 14,
                fontWeight: '500',
                textAlign: 'center',
                color: '#666'
            },
            touchableText: {
                fontSize: Dimensions.get('screen').width <= 320 ? 12 : 14,
                fontWeight: '700',
                color: Colors.primary,
            },        
            resetPasswordContainer: {     
                alignItems: 'center',
                paddingTop:hp('6.6%')
            },
            '@media (min-width: 500)': {
                $scale: 1.5,
                $width: 320,
                card: {
                    width: '$width',
                    paddingHorizontal: '2.5rem',
                    paddingBottom: '1.5rem'
                },
            },
            '@media (min-width: 320) and (max-width: 500)': {
                $width: '85%',
                card: {
                    width: '$width',
                },
                forgotPasswordText: {
                    fontSize: '1.6rem'
                },
                containerSignIn: {
                },
                signInButton: {
                    width: '$width'
                },
                resetPasswordButton: {
                    width: '$width'
                }
            }
        });
    }

    closeEmail = () => {
        this.setState({email:false})
    }

    closeOtp = () => {
        this.setState({otp:false})
    }

    render() {
        const styles = this.getStyles();

        const alertMessage = ['Check your email for further','instructions to reset your password.'];
        const otpMessage = ['We have sent an OTP to'];

        return (
            <DoubleBackground>
                <BackHeader {...this.props} />
                <View style={styles.logoContainer}>
                    <Logo/>
                </View>
                <View style={styles.cardContainer}>
                    <Card style={styles.card}>
                        <ForgotPasswordForm />
                    </Card>
                </View>
                <View style={styles.resetPasswordContainer}>
                    <View style={styles.resetPasswordButton}>
                        <ButtonGradient title={'RESET PASSWORD'} onPress={()=>this.setState({otp: true})}/>
                    </View>
                </View>
                { this.state.email && <Alert style={{height:hp('27.5%'), width:wp('85%')}} message={alertMessage} buttonTitle='OK' onPress={this.closeEmail}/> }
                { this.state.modal && <Loading /> }
                { this.state.otp && <OtpForgotPassword style={{height:hp('78%'), width:wp('85%')}} message={otpMessage} buttonTitle='RESEND OTP' onPress={this.closeOtp} /> }
            </DoubleBackground>
        )
    }
}

export default ForgotPassword;