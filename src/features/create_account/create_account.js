import React, {Component} from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import {Colors} from 'api';
import { DoubleBackground, Card, TextMontserrat, BackHeader, ButtonGradient, Loading} from 'components';
import Logo from 'components/utilities/logo';
import TouchableText from '../../components/texts/TextTouchable';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CreateAccountForm from './components/create_account_form';
import EStyleSheet from 'react-native-extended-stylesheet';
import TermsModal from './components/terms_modal';
import ESignModal from './components/esign_modal';
import Checkmark from './components/checkmark';

class CreateAccount extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        modalTerms: false,
        modalESign: false,
        termsAccepted: false,
    }

    _toggleModal = (key) => {
        this.setState({[key]: !this.state[key]})
    }

    _toggleTerms = () => {
        this.setState({termsAccepted: !this.state.termsAccepted})
    }

    getStyles = () => {
        return EStyleSheet.create({
            mainContainer: {
                flex: 1,
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
                marginVertical: hp('2%'),
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

    _setUserData = (data) => {
        console.log(data)
        this.setState({userData: data})
    }

    _handleCreateAccount = () => {
        console.log(this.state.userData);
        this.props.create_account(this.state.userData)
    }

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        
        const styles = this.getStyles();
        const {termsAccepted} = this.state;
        return (
            <DoubleBackground>
                <View style={{width: 50, position: 'absolute', height: 50}}>
                    <BackHeader {...this.props} />
                </View>
                <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scroll}>
                <View style={{width: '100%', height: 50}}/>
                    <View style={styles.logoContainer}>
                        <Logo/>
                    </View>
                    <View style={styles.cardContainer}>
                        <Card style={styles.card}>
                            <CreateAccountForm onChangeForm={this._setUserData.bind(this)}/>
                            {this.props.register.registering && <Loading/>}                        
                        </Card>
                    </View>
                    <View style={styles.termsContainer}>
                        <Checkmark onPress={this._toggleTerms.bind(this)} checked={termsAccepted}/>
                        <TextMontserrat style={styles.termsText}> ePaisa's </TextMontserrat>
                        <TouchableText style={styles.touchableText} onPress={() => this._toggleModal('modalTerms')}>Seller Agreement</TouchableText>
                        <TextMontserrat style={styles.termsText}> and </TextMontserrat>                        
                        <TouchableText style={styles.touchableText} onPress={() => this._toggleModal('modalESign')}>e-Sign Consent</TouchableText>
                    </View>
                    <View style={styles.createAccountContainer}>
                        <View style={styles.createAccountButton}>
                            <ButtonGradient title={'CREATE NEW ACCOUNT'} onPress={this._handleCreateAccount}/>
                        </View>
                    </View>
                </ScrollView>

                <TermsModal visible={this.state.modalTerms} closeModal={() => this._toggleModal('modalTerms')}/>
                <ESignModal visible={this.state.modalESign} closeModal={() => this._toggleModal('modalESign')}/>
            </DoubleBackground>
        )
    }
}

export default CreateAccount;