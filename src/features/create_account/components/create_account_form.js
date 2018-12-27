import React, {Component} from 'react';
import {View} from 'react-native';
import {TextMontserrat, FloatingTextInput,} from 'components';
import { PhoneInput } from 'components';

class CreateAccountForm extends Component {
    state = {
        //Username: 'rigelifoz@shayzam.net',
        //Password: 'abc123456$',
        //UserFirstName: 'Test 2',
        //UserLastName: 'Tester',
        //UserMobileNumber: '123456789',
        //CountryCode: 'AF',
        //registeredReferralCode: '',
        //otpType: 1,
        //BusinessName: 'TestCompany',

        Username: '',
        Password: '',
        UserFirstName: '',
        UserLastName: '',
        UserMobileNumber: '',
        CountryCode: 'AF',
        registeredReferralCode: '',
        otpType: 1,
        BusinessName: '',
    }

    _textChange(key, value) {
        this.setState({[key]: value})
        this._changeForm({
            ...this.state,
            ...{[key]: value}
        });
    }

    _changeForm = (payload) => {
        if(this.props.onChangeForm) {
            this.props.onChangeForm(payload)
        }
    }

    _changePhone = (value) => {
        this.setState({CountryCode: value.alpha2Code, UserMobileNumber: value.phone})
        this._changeForm({
            ...this.state,
            CountryCode: value.alpha2Code, 
            UserMobileNumber: value.phone,
        });
    }

    componentDidMount() {
        this.props.onChangeForm(this.state)
    }

    render() {
        const {
            Username,
            Password,
            UserFirstName,
            UserLastName,
            UserMobileNumber,
            registeredReferralCode,
            BusinessName,
        } = this.state;

        return (
            <View style={styles.formContainer}>
                <View style={styles.nameInputs}>
                    <View style={{flex: 1}}>
                        <FloatingTextInput
                            label={'First Name'}
                            value={UserFirstName}
                            onChangeText={(val) => this._textChange('UserFirstName', val)}
                        />
                    </View>
                    <View style={{flex: 1}}>
                        <FloatingTextInput
                            label={'Last Name'}
                            lineLeft={true}
                            value={UserLastName}
                            onChangeText={(val) => this._textChange('UserLastName', val)}
                        />
                    </View>
                </View>
                <View>
                    <FloatingTextInput
                        label={'E-mail'}
                        value={Username}
                        onChangeText={(val) => this._textChange('Username', val)}

                    />
                </View>
                <View>
                    <FloatingTextInput
                        label={'Password'}
                        secureTextEntry={true}
                        value={Password}
                        onChangeText={(val) => this._textChange('Password', val)}

                        validate={{
                            title: 'Password must contain',
                            validations: [
                                {
                                    name: '8 Characters',
                                    validateInput: (val) => {
                                        return val.length > 8;
                                    }
                                },
                                {
                                    name: '1 Number',
                                    validateInput: (val) => {
                                        return /\d/.test(val);
                                    }
                                },
                                {
                                    name: '1 Special Character',
                                    validateInput: (val) => {
                                        return /\W+/.test(val);
                                        }
                                }
                            ]
                        }}
                    />
                </View>
                <View>
                    <PhoneInput onChange={this._changePhone}/>
                </View>
                <View>
                    <FloatingTextInput
                        label={'Company Name'}
                        labelOptional={'(Optional)'}
                        value={BusinessName}
                        onChangeText={(val) => this._textChange('BusinessName', val)}

                    />
                </View>
                <View>
                    <FloatingTextInput
                        label={'Referral Code'}
                        labelOptional={'(Optional)'}
                        value={registeredReferralCode}
                        onChangeText={(val) => this._textChange('registeredReferralCode', val)}

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

export default CreateAccountForm;