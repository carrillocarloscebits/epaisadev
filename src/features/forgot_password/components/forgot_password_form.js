import React, {Component} from 'react';
import {View, Keyboard} from 'react-native';
import {TextMontserrat, FloatingTextInput,} from 'components';
import EStyleSheet from 'react-native-extended-stylesheet';

class ForgotPasswordForm extends Component {
    state = {
        mobile: '',
        email: ''
    }

    _textChange(key, value) {
        this.setState({[key]: value})

    }

    _checkField = (key) => {
        switch (key) {
            case 'email':
                this.props.check_email(this.state.email)
                break;
            case 'mobile':
                this.props.check_mobile(this.state.mobile)
                break;
        
            default:
                break;
        }
    }

    getErrors = (key) => {
        return this.props[key] ? this.props[key].error : [];
    }

    render() {
        
        return (
            <View style={styles.formContainer}>
                <TextMontserrat style={styles.instructions}>Enter your mobile number or e-mail</TextMontserrat>
                <TextMontserrat style={styles.instructions}>address to reset your password</TextMontserrat>
                <View>
                    <FloatingTextInput
                        label={'E-mail'}
                        keyboardType='email-address'
                        onChangeText={(val) => this._textChange('email', val)}
                        onBlur={this._changeForm}
                        returnKeyType={'done'}
                        onSubmitEditing={() => {Keyboard.dismiss; this._checkField('email')}}
                        errors={this.getErrors('email')}
                    />
                </View>
                <TextMontserrat style={styles.or}>OR</TextMontserrat>
                <View>
                    <FloatingTextInput
                        label={'Mobile Number'}
                        keyboardType='numeric'
                        onChangeText={(val) => this._textChange('mobile', val)}
                        onBlur={this._changeForm}
                        returnKeyType={'done'}
                        onSubmitEditing={()=> {Keyboard.dismiss; this._checkField('mobile')}}
                        errors={this.getErrors('mobile')}
                    />
                </View>
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    instructions: {
        fontWeight: '700',
        fontSize: '1.5rem',
        textAlign: 'center'
    },
    or: {
        fontSize: '2rem',
        textAlign: 'center',
        fontWeight: '700',
        marginVertical: '1.5rem'
    },
    nameInputs: {
        flexDirection: 'row',
    }
})

export default ForgotPasswordForm
