import React, { Component } from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import { CREATE_ACCOUNT, FORGOT_PASSWORD } from 'navigation/screen_names';
import { Colors } from 'api';
import { FingerprintModal } from 'components';
import {
  ButtonGradient,
  ButtonOutline,
  Card,
  TouchableText,
  FloatingTextInput,
  DoubleBackground,
  Loading,
  Logo,
} from 'components-login';
import EStyleSheet from 'react-native-extended-stylesheet';
import Biometrics from 'react-native-biometrics';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { portraitStyles } from './styles/portrait';
import { landscapeStyles } from './styles/landscape';
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
    email: '', //'am26@epaisa.com',
    password: '', //'Test@789',
    loading: false,

    orientation: isPortrait(),
  };

  componentDidMount() {
    AsyncStorage.getItem('@UsersLogged:Fingerprint').then(item => {
      if (JSON.parse(item)) {
        this.setState(
          {
            fingerprintLogin: true,
            fingerprintStatus: 'normal',
          },
          () => {
            Biometrics.createSignature('Login with Fingerprint', 'keyToEncript')
              .then(signature => {
                this.props.login(null, null, signature);
              })
              .catch(err => {
                console.log(err);
                this.setState({
                  fingerprintLogin: true,
                  fingerprintStatus: 'error',
                });
              });
          }
        );
      }
    });
  }

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
      $scale: 1.5,
      container: {
        flex: 1,
      },
      scroll: {},
      logoContainer: {
        flexGrow: 1,
        justifyContent: 'center',
      },

      forgotContainer: {},
    });
  };

  handleLogin() {
    const { email, password } = this.state;
    this.setState({ loading: true });
    this.props.login(email, password);
  }

  render() {
    const {
      container,
      containerSignIn,
      logoContainer,
      createAccountButton,
      containerCreateAccount,
      signInButton,
      scroll,
      upperSide,
      card,
      cardContainer,
      forgotPasswordText,
      forgotContainer,
    } = this.getEStyle();
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
                  onChangeText={email => this.setState({ email })}
                  value={email}
                />
                <FloatingTextInput
                  label={'Password'}
                  secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                  value={password}
                />
                {this.props.auth.loggingIn && <Loading />}
              </Card>
            </View>
          </KeyboardAvoidingView>
          <View style={forgotContainer}>
            <TouchableText
              onPress={() => this.navigateTo(FORGOT_PASSWORD)}
              style={
                this.state.orientation
                  ? portraitStyles.forgotPasswordText
                  : landscapeStyles.forgotPasswordText
              }
            >
              Forgot your Password?
            </TouchableText>
          </View>
          <ButtonGradient
            title={'SIGN IN'}
            style={
              this.state.orientation
                ? portraitStyles.buttonSignIn
                : landscapeStyles.buttonSignIn
            }
            onPress={this.handleLogin.bind(this)}
          />
          <View
            style={
              this.state.orientation
                ? portraitStyles.containerCreateAccount
                : landscapeStyles.containerCreateAccount
            }
          >
            <ButtonOutline
              title={'CREATE NEW ACCOUNT'}
              onPress={() => this.navigateTo(CREATE_ACCOUNT)}
              style={
                this.state.orientation
                  ? portraitStyles.buttonCreateAccount
                  : landscapeStyles.buttonCreateAccount
              }
              buttonTextStyle={
                this.state.orientation
                  ? portraitStyles.textCreateAccount
                  : landscapeStyles.textCreateAccount
              }
            />
          </View>
        </View>
        {/* {this.state.fingerprintLogin && <FingerprintModal
                    status={this.state.fingerprintStatus}
                    title="Fingerprint - Login"
                    description="Login with your fingerprint"
                    cancel={() => this.setState({fingerprintLogin: false})}
                    notNow={() => this.setState({fingerprintLogin: false})}
                />} */}
      </DoubleBackground>
    );
  }
}

export default Login;
