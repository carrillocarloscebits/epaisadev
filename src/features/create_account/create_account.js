import React, { Component } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Colors } from 'api';
import {
  DoubleBackground,
  Timer,
  ButtonClose,
  Card,
  TextMontserrat,
  BackHeader,
  ButtonGradient,
  Loading,
  TouchableText,
  Logo,
  PopUp,
} from 'components';
import CreateAccountForm from './components/create_account_form';
import TermsModal from './components/terms_modal';
import ESignModal from './components/esign_modal';
import Checkmark from './components/checkmark';
import OtpInputs from './components/otp_inputs';
import AccountCreated from '../account_created/account_created';
import { LOGIN } from 'navigation/screen_names';

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
        flexDirection: 'row',
        justifyContent: 'center',
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

<<<<<<< HEAD
    getStyles = () => {
        return EStyleSheet.create({
            mainContainer: {
                //flex: 1,
            },
            scroll: {
            },
            logoContainer: {
                flexGrow: 1,
                justifyContent: 'center',
            },
            cardContainer: {
                alignItems: 'center',
                flexGrow: 1
            },
            card: {
                paddingHorizontal: '3rem',
                paddingBottom: '2rem'
            },
            termsContainer: {
                marginVertical: "2rem",
                flexDirection: 'row',
                justifyContent: 'center'
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
        
            createAccountContainer: {
                alignItems: 'center',
                marginBottom: 20
            },
            opt_container: {
                width: '85%'
            },
            '@media (min-width: 500)': {
                $scale: 1.5,
                $width: 320,
                card: {
                    width: '$width',
                    paddingHorizontal: '2.5rem',
                    paddingBottom: '1.5rem',
                    borderRadius: 14
                },
                createAccountButton: {
                    width: '$width'
                }
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
                createAccountButton: {
                    width: '$width'
                }
            }
        });
    }
=======
  _setUserData = data => {
    this.setState({ userData: data });
  };
>>>>>>> 97d20edffe3c8d467a4a53775f4fd04295ab6c9d

  _handleCreateAccount = () => {
    this.props.create_account(this.state.userData);
    // this.setState({show_otp: true})
  };

  componentDidMount() {
    console.log(this.props);
  }

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
        <View style={{ width: 50, position: 'absolute', height: 50 }}>
          <BackHeader {...this.props} />
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
        >
          <View style={{ width: '100%', height: 50 }} />
          <View style={styles.logoContainer}>
            <Logo />
          </View>
          <View style={styles.cardContainer}>
            <Card style={styles.card}>
              <CreateAccountForm onChangeForm={this._setUserData.bind(this)} />
              {this.props.register.loading && <Loading />}
            </Card>
          </View>
          <View style={styles.termsContainer}>
            <Checkmark
              onPress={this._toggleTerms.bind(this)}
              checked={termsAccepted}
            />
            <TextMontserrat style={styles.termsText}> ePaisa's </TextMontserrat>
            <TouchableText
              style={styles.touchableText}
              onPress={() => this._toggleModal('modalTerms')}
            >
              Seller Agreement
            </TouchableText>
            <TextMontserrat style={styles.termsText}> and </TextMontserrat>
            <TouchableText
              style={styles.touchableText}
              onPress={() => this._toggleModal('modalESign')}
            >
              e-Sign Consent
            </TouchableText>
          </View>
          <View style={styles.createAccountContainer}>
            <View style={styles.createAccountButton}>
              <ButtonGradient
                title={'CREATE NEW ACCOUNT'}
                onPress={this._handleCreateAccount}
              />
            </View>
          </View>
        </ScrollView>

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
                +51 917 324 872
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
