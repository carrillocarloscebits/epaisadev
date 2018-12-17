import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {TextMontserrat, FloatingTextInput,} from 'components';

class ForgotPasswordForm extends Component {
    render() {
        return (
            <View style={styles.formContainer}>
                <TextMontserrat>Enter your mobile number or e-mail</TextMontserrat>
                <TextMontserrat>address to reset your password</TextMontserrat>
                <View>
                    <FloatingTextInput
                        label={'E-mail'}
                        errors={['Enter a valid E-mail address']}
                        keyboardType='email-address'
                    />
                </View>
                <TextMontserrat>OR</TextMontserrat>
                <View>
                    <FloatingTextInput
                        label={'Mobile Number'}
                        keyboardType='numeric'
                    />
                </View>
            </View>
        )
    }
}

const styles = {
    nameInputs: {
        flexDirection: 'row',
    }
}

export default ForgotPasswordForm;