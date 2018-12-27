import React, {Component} from 'react';
import {View, ScrollView, Platform, Dimensions, AsyncStorage} from 'react-native';
import {CREATE_ACCOUNT, FORGOT_PASSWORD} from 'navigation/screen_names';
import {Colors} from 'api';
import {FingerprintModal} from 'components';
import { ButtonGradient, ButtonOutline, Card, TouchableText, FloatingTextInput, DoubleBackground, Loading, Logo } from 'components-login';
import EStyleSheet from 'react-native-extended-stylesheet';
import Biometrics from 'react-native-biometrics';

class Login extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        email: '',//'am26@epaisa.com',
        password: '',//'Test@789',
        loading: false
    }

    wp = (dp) => {
        return (dp/100) * Dimensions.get("window").width;
    }

    hp = (dp) => {
        return (dp/100) * Dimensions.get("window").height;
    }

    navigateTo = (screen) => {
        return this.props.navigation.navigate(screen);
    }

    getHeight = () => {
        if(this.state.orientation) {
            return (Dimensions.get('window').height > 700 ? 700 : Dimensions.get('window').height) - (Platform.OS === 'ios' ? 0 : 48);
        } else {
            return (Dimensions.get('window').width > 700 ? 700 : Dimensions.get('window').width) - (Platform.OS === 'ios' ? 0 : 48);
        }
    }

    getEStyle = () => {
        return EStyleSheet.create({
            $scale: 1.5,
            container: {
                flex: 1,
            },
            scroll: {
            },
            logoContainer:{
                flexGrow:1,
                justifyContent: 'center',
            },
            cardContainer: {
                alignItems: 'center',
            },
            card: {
                paddingHorizontal: '3rem',
                paddingBottom: '2rem'
            },
            forgotContainer: {
            },
            forgotPasswordText: {
                fontWeight: '700',
                color: Colors.primary,
                textAlign: 'center',
                fontSize: '2rem',
                margin: '.8rem'
            },
            containerSignIn: {
                alignItems: 'center',
            },
            containerCreateAccount: {
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexGrow:1,
            },
            createAccountButton: {
                marginBottom: '1rem'
            },
            '@media (min-width: 500)': {
                $width: 320,
                card: {
                    width: '$width',
                    paddingHorizontal: '2.5rem',
                    paddingBottom: '1.5rem'
                },
                forgotPasswordText: {
                    fontSize: 14
                },
                signInButton: {
                    width: '$width'
                },
                containerCreateAccount: {
                    justifyContent: 'flex-start'
                },
                createAccountButton: {
                    marginTop: 20,
                    width: '$width'
                }
            },
            '@media (min-width: 320) and (max-width: 500)': {
                $scale: 1,
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

    handleLogin() {
        const {email, password} = this.state;
        this.setState({loading: true})
        this.props.login(email, password)
    }

    componentDidMount() {
        AsyncStorage.getItem('@UsersLogged:Fingerprint')
        .then(item => {
            if(JSON.parse(item)) {
                
                this.setState({
                    fingerprintLogin: true,
                    fingerprintStatus: 'normal'
                }, () => {
                    Biometrics.createSignature('Login with Fingerprint', 'keyToEncript')
                    .then((signature) => {
                        this.props.login(null, null, signature);
                    })
                })

                
            }
        })
    }

    render() {
        
        const {container, containerSignIn, logoContainer,createAccountButton, containerCreateAccount,signInButton, scroll, upperSide, card, cardContainer, forgotPasswordText, forgotContainer} = this.getEStyle();
        const {email, password} = this.state;
        return (
            <DoubleBackground>
                <ScrollView style={scroll} contentContainerStyle={{justifyContent: 'center', flex:1}} centerContent={true}>
                        <View style={logoContainer}>
                            <Logo/>
                        </View>
                        <View style={cardContainer}>
                            <Card style={this.getEStyle().card}>
                                <FloatingTextInput
                                    label={'E-mail'}
                                    onChangeText={(email) => this.setState({email})}
                                    value={email}
                                />
                                <FloatingTextInput
                                    label={'Password'}
                                    secureTextEntry={true}
                                    onChangeText={(password) => this.setState({password})}
                                    value={password}
                                />
                                {this.props.auth.loggingIn && <Loading/>}
                            </Card>
                        </View>
                        <View style={forgotContainer}>
                            <TouchableText
                                onPress={() => this.navigateTo(FORGOT_PASSWORD)}
                                style={forgotPasswordText}>
                                Forgot your Password?
                            </TouchableText>
                        </View>
                        <View style={containerSignIn}>
                            <View style={signInButton}>
                                <ButtonGradient title={'SIGN IN'}
                                    onPress={this.handleLogin.bind(this)}
                                />
                            </View>
                        </View>
                        <View style={containerCreateAccount}>
                            <View style={createAccountButton}>
                                <ButtonOutline title={'CREATE NEW ACCOUNT'} onPress={() => this.navigateTo(CREATE_ACCOUNT)}/>
                            </View>
                        </View>
                </ScrollView>
                {this.state.fingerprintLogin && <FingerprintModal
                    status={this.state.fingerprintStatus}
                    title="Fingerprint - Login"
                    description="Login with your fingerprint"
                    cancel={() => this.setState({fingerprintLogin: false})} 
                />}
            </DoubleBackground>
        )
    }
}

export default Login;