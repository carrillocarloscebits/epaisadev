import React, { Component } from 'react';
import { View, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Colors } from 'api';
import {
  DoubleBackground,
  Timer,
  ButtonClose,
  Card,
  TextMontserrat,
  BackHeader,
  Loading,
  TouchableText,
  PopUp,
  ButtonGradient
} from 'components';
import CreateAccountForm from './components/create_account_form';
import TermsModal from './components/terms_modal';
import ESignModal from './components/esign_modal';
import Checkmark from './components/checkmark';
import OtpInputs from './components/otp_inputs';
import AccountCreated from '../account_created/account_created';
import { LOGIN } from 'navigation/screen_names';
import { portraitStyles } from './styles/portrait';
import { landscapeStyles } from './styles/landscape';
import Logo from './components/utilities/logo/logo';
import {ButtonGradientCustom} from './components/buttons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const isPortrait = () => {
  const dim = Dimensions.get('window');
  if(dim.height >= dim.width){
    return true;
  }else {
    return false;
  }
};

class CreateAccount extends Component {
  static navigationOptions = {
    header: null,
  };

  timer = null;

  state = {
    modalTerms: false,
    modalESign: false,
    termsAccepted: false,
    can_resend_otp: false,

    orientation : isPortrait(),
  };

  _toggleModal = key => {
    this.setState({ [key]: !this.state[key] });
  };

  _toggleTerms = () => {
    this.setState({ termsAccepted: !this.state.termsAccepted });
  };

  getStyles = () => {
    return EStyleSheet.create({
      mainContainer: {
        flex: 1,
      },
      scroll: {},
      logoContainer: {
        flexGrow: 1,
        justifyContent: 'center',
      },
      cardContainer: {
        alignItems: 'center',
        flexGrow: 1,
      },
      card: {
        paddingHorizontal: '3rem',
        paddingBottom: '2rem',
      },
      termsContainer: {
        marginVertical: '2rem',
        marginBottom: '.5rem',
        flexDirection: 'row',
        justifyContent: 'center',
      },
      termsMainContainer: {
        alignItems: 'center',
        //marginBottom: '1.5rem',
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

      createAccountContainer: {
        alignItems: 'center',
        marginBottom: 20,
      },
      opt_container: {
        width: '85%',
      },
      '@media (min-width: 500)': {
        $scale: 1.5,
        $width: 320,
        card: {
          width: '$width',
          paddingHorizontal: '2.5rem',
          paddingBottom: '1.5rem',
          borderRadius: 14,
        },
        createAccountButton: {
          width: '$width',
        },
        opt_container: {
          width: '$width',
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
        createAccountButton: {
          width: '$width',
        },
      },
    });
  };

  _setUserData = data => {
    this.setState({ userData: data });
  };

  _handleCreateAccount = () => {
    this.props.create_account(this.state.userData);
    // this.setState({show_otp: true})
  };

  render() {
    const otpStyles = EStyleSheet.create({
      textInstructions: {
        fontSize: '1.8rem',
        fontWeight: '600',
        color: '#444',
      },
      textPhoneNumber: {
        fontSize: '2rem',
        fontWeight: '700',
        color: Colors.primary,
      },
      timerContainer: {
        alignItems: 'center',
        marginVertical: '2rem',
      },
      timerText: {
        fontSize: '2.5rem',
        fontWeight: '700',
      },
      containerOtpFields: {
        alignItems: 'center',
      },
      labelOtp: {
        fontWeight: '600',
        fontSize: '1.6rem',
        marginVertical: '.4rem',
      },
      textError: {
        fontWeight: '600',
        fontSize: '1.4rem',
        color: '#D0021B',
        marginVertical: '.4rem',
      },
      resendContainer: {
        alignItems: 'center',
      },
      resendButton: {
        width: '70%',
        marginTop: '2.5rem',
        marginBottom: '1rem',
      },
    });
    const styles = this.getStyles();
    const { termsAccepted } = this.state;
    return (
        <DoubleBackground>
          <View
            style={{height: hp('100%'), width: '100%'}}
          > 
          <KeyboardAvoidingView 
            behavior="position" enabled
            keyboardVerticalOffset={this.state.orientation ? null : hp('5%')}
          >
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
                <CreateAccountForm
                    onChangeForm={this._setUserData.bind(this)}
                    isValid={formValid => this.setState({ formValid })}
                    containerStyle={{height:hp('53.75%'), width:'100%'}}
                  />
                {this.props.register.loading && <Loading />}
              </Card>
            </View>
            
          </KeyboardAvoidingView> 

            <View style={{width:'100%', flexDirection:'row', justifyContent:'center'}}>
                <Checkmark
                  onPress={this._toggleTerms.bind(this)}
                  checked={termsAccepted}
                />
                <TextMontserrat style={
                  { fontSize: wp('3.5%'), fontWeight: '600', textAlign: 'center', color: '#666',}
                  }
                >
                  {' '}
                  ePaisa's{' '}
                </TextMontserrat>
                <TouchableText
                  style={{ fontSize: wp('3.5%'), fontWeight: '700', color: Colors.primary, textAlign: 'center'}}
                  onPress={() => this._toggleModal('modalTerms')}
                >
                  Seller Agreement
                </TouchableText>
                <TextMontserrat style={
                  { fontSize: wp('3.5%'), fontWeight: '600', textAlign: 'center', color: '#666',}
                  }
                > 
                {' '}
                and{' '}
                </TextMontserrat>
                <TouchableText
                  style={{ fontSize: wp('3.5%'), fontWeight: '700', color: Colors.primary, textAlign: 'center'}}
                  onPress={() => this._toggleModal('modalESign')}
                >
                  e-Sign Consent
                </TouchableText>
            </View>

            <View style={{width:'100%', alignItems:'center', marginTop:hp('3.4%')}}>
              <ButtonGradientCustom
                title={'CREATE NEW ACCOUNT'}
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
                
                  onPress={this._handleCreateAccount}
                  disabled={!this.state.formValid}
              />
            </View> 
          </View>

        {/* ***************  MODALS *************** */}
        <TermsModal
          visible={this.state.modalTerms}
          closeModal={() => this._toggleModal('modalTerms')}
        />
        <ESignModal
          visible={this.state.modalESign}
          closeModal={() => this._toggleModal('modalESign')}
        />
        {this.props.register.show_otp && (
          <PopUp style={styles.opt_container}>
            <View style={{ alignItems: 'flex-end' }}>
              <ButtonClose onPress={() => this.setState({ show_otp: false })} />
            </View>
            <View style={{ alignItems: 'center' }}>
              <TextMontserrat style={otpStyles.textInstructions}>
                We have sent a
              </TextMontserrat>
              <TextMontserrat style={otpStyles.textInstructions}>
                confirmation code to
              </TextMontserrat>
              <TextMontserrat style={otpStyles.textPhoneNumber}>
                {'+51 900 999 999'}
              </TextMontserrat>
            </View>
            <View style={otpStyles.timerContainer}>
              <Timer
                ref={timer => (this.timer = timer)}
                textStyle={otpStyles.timerText}
                onStart={() => this.setState({ can_resend_otp: false })}
                onFinished={() => this.setState({ can_resend_otp: true })}
              />
            </View>
            <View style={otpStyles.containerOtpFields}>
              <TextMontserrat style={otpStyles.labelOtp}>
                {' '}
                Insert Confirmation Code{' '}
              </TextMontserrat>
              <OtpInputs
                valid={this.props.register.otp_valid}
                invalid={this.props.register.otp_invalid}
                data={['first', 'second', 'third', 'fourth']}
                onComplete={otp => {
                  this.props.verify_otp(this.props.register.auth_key, otp);
                }}
              />

              {this.props.register.otp_invalid && (
                <TextMontserrat style={otpStyles.textError}>
                  Incorrect OTP - Re-insert or resend
                </TextMontserrat>
              )}
            </View>
            <View style={otpStyles.resendContainer}>
              <View style={otpStyles.resendButton}>
                <ButtonGradient
                  title="RESEND OTP"
                  disabled={!this.state.can_resend_otp}
                  onPress={() => {
                    this.timer.restart();
                    this.props.resend_otp(this.props.register.auth_key);
                  }}
                />
              </View>
            </View>
          </PopUp>
        )}
        {this.props.register.showAccountCreatedModal && (
          <AccountCreated
            onButtonClick={() => this.props.navigation.replace(LOGIN)}
          />
        )}
          
      </DoubleBackground>
    );
  }
}

export default CreateAccount;
