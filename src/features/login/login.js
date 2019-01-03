import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  AsyncStorage,
  Text,
} from 'react-native';
import { CREATE_ACCOUNT, FORGOT_PASSWORD } from 'navigation/screen_names';
import {
  ButtonGradient,
  ButtonOutline,
  Card,
  TouchableText,
  FloatingTextInput,
  DoubleBackground,
  Loading,
  Logo,
} from 'components';
import EStyleSheet from 'react-native-extended-stylesheet';
import Biometrics from 'react-native-biometrics';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { portraitStyles } from './styles/portrait';
import { landscapeStyles } from './styles/landscape';
import { FingerprintModal, Alert } from 'components';

const isPortrait = () => {
  const dim = Dimensions.get('window');
  if (dim.height >= dim.width) {
    return true;
  } else {
    return false;
  }
};

class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: 'am26@epaisa.com', //',
    password: 'Test@789', //',
    loading: false,

    orientation: isPortrait(),
  };

  async componentDidMount() {
    // Biometrics.isSensorAvailable().then(biometryType => {
    //   if (biometryType === Biometrics.TouchID) {
    //     AsyncStorage.getItem('@UsersLogged:Fingerprint').then(item => {
    //       if (JSON.parse(item)) {
    //         Biometrics.createSignature('Login with Fingerprint', 'keyToEncrypt')
    //           .then(signature => {
    //             this.props.login(null, null, signature);
    //           })
    //           .catch(err => {
    //             console.log(err);
    //             this.setState({
    //               fingerprintLogin: true,
    //               fingerprintStatus: 'error',
    //             });
    //           });
    //       }
    //     });
    //   }
    // });
    try {
      console.log(this.props.navigation.getParam('signedOut', false));
      if (!this.props.navigation.getParam('signedOut')) {
        const isSensor = await Biometrics.isSensorAvailable();
        if (isSensor === Biometrics.TouchID) {
          const signature = await Biometrics.createSignature(
            'Login with Fingerprint',
            'keyToEncrypt'
          );
          this.props.login(null, null, signature);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  passwordInput = {};

  getHeight = () => {
    if (this.state.orientation) {
      return (
        (Dimensions.get('window').height > 700
          ? 700
          : Dimensions.get('window').height) - (Platform.OS === 'ios' ? 0 : 48)
      );
    } else {
      return (
        (Dimensions.get('window').width > 700
          ? 700
          : Dimensions.get('window').width) - (Platform.OS === 'ios' ? 0 : 48)
      );
    }
  };

  getEStyle = () => {
    return EStyleSheet.create({
      container: {
        flex: 1,
      },
      scroll: {},
      logoContainer: {
        flexGrow: 1,
        justifyContent: 'center',
      },
      alert: {
        width: '85%',
        height: 170,
      },
      '@media (min-width: 500)': {
        $scale: 1.5,
        $width: 320,
        alert: {
          width: '$width',
        },
      },
      '@media (min-width: 320) and (max-width: 500)': {
        $width: '85%',
        alert: {
          width: '$width',
        },
      },
    });
  };

  handleLogin() {
    const { email, password } = this.state;
    this.setState({ loading: true });
    this.props.login(email, password);
  }

  handleHide() {
    this.props.failureHide();
  }

  render() {
    const { forgotContainer, alert } = this.getEStyle();
    const { email, password } = this.state;
    return (
      <DoubleBackground>
        <View
          style={{ alignItems: 'center', height: hp('100%'), width: '100%' }}
        >
          <KeyboardAvoidingView behavior="position" enabled>
            <View
              style={
                this.state.orientation
                  ? portraitStyles.logoContainer
                  : landscapeStyles.logoContainer
              }
            >
              <Logo />
            </View>
            <View
              style={
                this.state.orientation
                  ? portraitStyles.cardContainer
                  : landscapeStyles.cardContainer
              }
            >
              <Card
                style={
                  this.state.orientation
                    ? portraitStyles.card
                    : landscapeStyles.card
                }
              >
                <FloatingTextInput
                  label={'E-mail'}
                  autoCapitalize={'none'}
                  onChangeText={email => this.setState({ email })}
                  value={email}
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.passwordInput.focus()}
                />
                {this.state.orientation || (
                  <View style={{ height: hp('1.5%') }} />
                )}
                <FloatingTextInput
                  inputRef={input => {
                    this.passwordInput = input;
                  }}
                  label={'Password'}
                  autoCapitalize={'none'}
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                  value={password}
                  onSubmitEditing={this.handleLogin.bind(this)}
                />
                {this.props.auth.loggingIn && <Loading />}
                {this.props.auth.loginFailureMessage && (
                  <Alert
                    message={[this.props.auth.error || 'Invalid credentials']}
                    buttonTitle={'OK'}
                    onPress={this.handleHide.bind(this)}
                    style={alert}
                  />
                )}
              </Card>
            </View>
          </KeyboardAvoidingView>
          <View style={forgotContainer}>
            <TouchableText
              onPress={() => this.props.navigation.navigate(FORGOT_PASSWORD)}
              style={
                this.state.orientation
                  ? portraitStyles.forgotPasswordText
                  : landscapeStyles.forgotPasswordText
              }
            >
              Forgot your Password?
            </TouchableText>
          </View>
          <View
            style={
              this.state.orientation
                ? portraitStyles.buttonSignIn
                : landscapeStyles.buttonSignIn
            }
          >
            <ButtonGradient
              title={'SIGN IN'}
              onPress={this.handleLogin.bind(this)}
            />
          </View>
          <View
            style={
              this.state.orientation
                ? portraitStyles.buttonCreateAccount
                : landscapeStyles.buttonCreateAccount
            }
          >
            <ButtonOutline
              title={'CREATE NEW ACCOUNT'}
              onPress={() => this.props.navigation.navigate(CREATE_ACCOUNT)}
            />
          </View>
        </View>
        {this.state.fingerprintLogin && (
          <FingerprintModal
            status={this.state.fingerprintStatus}
            title="Fingerprint - Login"
            description="Login with your fingerprint"
            cancel={() => this.setState({ fingerprintLogin: false })}
            notNow={() => this.setState({ fingerprintLogin: false })}
          />
        )}
      </DoubleBackground>
    );
  }
}
export default Login;
