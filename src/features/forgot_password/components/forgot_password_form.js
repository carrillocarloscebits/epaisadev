import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {TextMontserrat, FloatingTextInput,} from 'components';
import EStyleSheet from 'react-native-extended-stylesheet';

class ForgotPasswordForm extends Component {

    render() {
        return (
            <View style={styles.formContainer}>
                <TextMontserrat style={styles.instructions}>Enter your mobile number or e-mail</TextMontserrat>
                <TextMontserrat style={styles.instructions}>address to reset your password</TextMontserrat>
                <View>
                    <FloatingTextInput
                        label={'E-mail'}
                        keyboardType='email-address'
                    />
                </View>
                <TextMontserrat style={styles.or}>OR</TextMontserrat>
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