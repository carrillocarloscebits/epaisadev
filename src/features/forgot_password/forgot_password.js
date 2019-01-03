import React, { Component } from 'react';
import { View, Dimensions, ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { Colors } from 'api';
import {
  DoubleBackground,
  Card,
  Loading,
  Alert,
  BackHeader,
} from 'components';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import ForgotPasswordForm from './containers/form_container';
import OtpForgotPassword from './components/otp_forgot_password';
import { portraitStyles } from './styles/portrait';
import { landscapeStyles } from './styles/landscape';
import Logo from './components/utilities/logo/logo';
import {ButtonGradient} from './components/buttons';

const isPortrait = () => {
  const dim = Dimensions.get('window');
  if (dim.height >= dim.width) {
    return true;
  } else {
    return false;
  }
};

class ForgotPassword extends Component {
  state = {
    orientation: isPortrait(),
    loading: false,
    otp: false,
    canResetPassword: false,
    email: {
      valid: false,
      value: '',
    },
    mobile: {
      valid: true,
      value: '',
    },
  };

  static navigationOptions = {
    header: null,
  };

  getStyles = () => {
    return EStyleSheet.create({
      mainContainer: {
        flex: 1,
      },
      logoContainer: {
        justifyContent: 'center',
        marginVertical: '5rem',
      },
      cardContainer: {
        flex: 1,
        flexGrow: 1,
        alignItems: 'center',
      },
      card: {
        padding: '3rem',
      },
      termsText: {
        fontSize: Dimensions.get('screen').width <= 320 ? 12 : 14,
        fontWeight: '500',
        textAlign: 'center',
        color: '#666',
      },
      touchableText: {
        fontSize: Dimensions.get('screen').width <= 320 ? 12 : 14,
        fontWeight: '700',
        color: Colors.primary,
      },
      resetPasswordButton: {
        marginTop: '4rem',
      },
      '@media (min-width: 500)': {
        $scale: 1.5,
        $width: 320,
        card: {
          width: '$width',
          paddingHorizontal: '2.5rem',
          paddingBottom: '1.5rem',
        },
      },
      '@media (min-width: 320) and (max-width: 500)': {
        $width: '85%',
        card: {
          width: '$width',
        },
        forgotPasswordText: {
          fontSize: '1.6rem',
        },
        containerSignIn: {},
        signInButton: {
          width: '$width',
        },
        resetPasswordButton: {
          width: '$width',
        },
      },
    });
  };

  closeEmail = () => {
    this.setState({ email: false });
  };

  closeOtp = () => {
    this.setState({ otp: false });
  };

  handleChange = ({ email, mobile }) => {
    this.setState({ email, mobile });
    this.validateForm();
  };

  validateForm = () => {
    canReset = this.state.mobile.valid || this.state.email.valid ? true : false;
    this.setState({
      canResetPassword: canReset,
    });
  };

  checkField = key => {
    if (key === 'email') {
      this.props.check_email(this.state.email.value);
    }
  };

  render() {
    const styles = this.getStyles();

    const alertPortraitStyle = { height: hp('27.5%'), width: wp('85%'), justifyContent:'center' }
    const alertLandscapeStyle = { height: hp('33%'), width: wp('45%'), justifyContent:'center' }

    const alertMessage = [
      'Check your email for further',
      'instructions to reset your password.',
    ];
    const otpMessage = ['We have sent an OTP to'];

    return (
      <DoubleBackground>
        <View
          style={{height: hp('100%'), width: '100%'}}
        >
          <KeyboardAvoidingView behavior="position" enabled>
            {this.state.orientation &&
              <BackHeader {...this.props} style={portraitStyles.backHeaderPortraitStyle} size={hp('7%')}/>
            }
            <View style={this.state.orientation ? portraitStyles.logoContainer : landscapeStyles.logoContainer}>
              <Logo />
              {this.state.orientation ||
                <BackHeader {...this.props} style={landscapeStyles.backHeaderLandscapeStyle} size={hp('8.5%')}/>
              }
            </View>
            <View style={this.state.orientation ? portraitStyles.cardContainer : landscapeStyles.cardContainer}>
              <Card style={this.state.orientation ? portraitStyles.card : landscapeStyles.card}>
                <ForgotPasswordForm onChangeForm={this.handleChange} />
              </Card>
                {/* disabled={!this.state.canResetPassword} */}
            </View>
          </KeyboardAvoidingView>
          <View style={{width:'100%', alignItems:'center'}}>
            <ButtonGradient
              title={'RESET PASSWORD'}
              style={
                this.state.orientation
                  ? portraitStyles.buttonResetPassword
                  : landscapeStyles.buttonResetPassword
              }
              buttonTextStyle={
                  this.state.orientation
                    ? portraitStyles.textSignIn
                    : landscapeStyles.textSignIn
                }
              onPress={() => this.setState({ otp: true })}
            />
          </View>

        {this.props.reset_password.alert && (
          //true && (
          <Alert
            style={isPortrait() ? alertPortraitStyle : alertLandscapeStyle}
            message={this.props.reset_password.alert}
            //message={alertMessage}
            buttonTitle="OK"
            onPress={this.props.reset_password.dismissAlert}
          />
        )}

        {this.props.reset_password.loading && <Loading />}
        {this.props.reset_password.show_otp && (
          //true && (
          <OtpForgotPassword
            message={otpMessage}
            buttonTitle="RESEND OTP"
            onClosePress={this.closeOtp}
          />
        )}
        
        </View>
      </DoubleBackground>
    );
  }
}

export default ForgotPassword;
