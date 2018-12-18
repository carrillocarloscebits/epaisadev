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
        this._changeForm();
    }

    _changeForm = () => {
        if(this.props.onChangeForm) {
            const {email, mobile} = this.state;
            const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
            this.props.onChangeForm({
                email: {
                    valid: emailRegex.test(email),
                    value: email
                },
                mobile: {
                    valid: false,
                    value: mobile
                }
            })
        }
    }

    checkField(key){
        if(key === 'email') {

        }
    }

    render() {
        const {email, mobile} = this.state;
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
                        onSubmitEditing={()=>{Keyboard.dismiss; this.checkField('email')}}
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
                        onSubmitEditing={()=>{Keyboard.dismiss; this.checkField('mobile')}}
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

export default ForgotPasswordForm;