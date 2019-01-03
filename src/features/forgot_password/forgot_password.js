import React, { Component } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { Colors } from 'api';
import {
  DoubleBackground,
  Card,
  Loading,
  Alert,
  BackHeader,
  ButtonGradient,
  Logo,
} from 'components';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import ForgotPasswordForm from './containers/form_container';
import OtpForgotPassword from './components/otp_forgot_password';

class ForgotPassword extends Component {
  state = {
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

    const alertMessage = [
      'Check your email for further',
      'instructions to reset your password.',
    ];
    const otpMessage = ['We have sent an OTP to'];

    return (
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.mainContainer}>
      <DoubleBackground>
        <View style={{ width: 50, position: 'absolute', height: 50 }}>
          <BackHeader {...this.props} />
        </View>
        
          <View style={styles.logoContainer}>
            <Logo />
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <ForgotPasswordForm onChangeForm={this.handleChange} />
            </Card>
            <View style={styles.resetPasswordButton}>
              {/* disabled={!this.state.canResetPassword} */}
              <ButtonGradient
                title={'RESET PASSWORD'}
                onPress={() => this.setState({ otp: true })}
              />
            </View>
          </View>
        </DoubleBackground>

        {this.props.reset_password.alert && (
          <Alert
            style={{ height: hp('27.5%'), width: wp('85%') }}
            message={this.props.reset_password.alert}
            buttonTitle="OK"
            onPress={this.props.reset_password.dismissAlert}
          />
        )}
        {this.props.reset_password.loading && <Loading />}
        {this.props.reset_password.show_otp && (
          <OtpForgotPassword
            message={otpMessage}
            buttonTitle="RESEND OTP"
            onClosePress={this.closeOtp}
          />
        )}
      </ScrollView>
    );
  }
}

export default ForgotPassword;
