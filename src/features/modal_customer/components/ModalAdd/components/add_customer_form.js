import React, { Component } from 'react';
import { View } from 'react-native';
import { FloatingTextInput } from 'components';
import { PhoneInput } from 'components'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class AddCustomerForm extends Component {
  state = {
    Username: '',
    Password: '',
    UserFirstName: '',
    UserLastName: '',
    UserMobileNumber: '',
    CountryCode: '',
    registeredReferralCode: '',
    otpType: 1,
    BusinessName: '',
    errors: {},
  };

  _checkEmail() {
    const { Username } = this.state;
    if (Username === '') {
      return this.setState({
        errors: {
          ...(this.state.errors || {}),
          Username: ['Enter a valid e-mail address'],
        },
      });
    }
  }

  _checkMobile() {
    const { UserMobileNumber, CallingCode } = this.state;
    const regex = new RegExp(/^\d{10}$/);
    if (!regex.test(UserMobileNumber)) {
      return this.setState({
        errors: {
          ...(this.state.errors || {}),
          mobile: ['Enter a valid mobile number'],
        },
      });
    }
  }
  _textChange(key, value) {
    this.setState({ [key]: value });
    const errors = this.state.errors;
    errors[key] = [];
    this.setState(
      {
        errors,
      },
      () => {
        this._changeForm({
          ...this.state,
          ...{ [key]: value },
        });
      }
    );
  }

  _changeForm = payload => {
    if (this.props.onChangeForm) {
      const { errors, ...newPayload } = payload;
      this.formIsValid();

      this.props.onChangeForm(newPayload);
    }
  };

  formIsValid = () => {
    const errors = {};
    if (this.state.UserFirstName === '') {
      errors['UserFirstName'] = ['First name cannot be empty'];
    }

    if (this.state.UserLastName === '') {
      errors['UserLastName'] = ['Last name cannot be empty'];
    }
    if (this.state.Password === '') {
      errors['Password'] = ['Password name cannot be empty'];
    }
    if (this.state.UserMobileNumber === '') {
      errors['UserMobileNumber'] = ['Mobile number cannot be empty'];
    }
    this.setState(
      {
        errors: {
          ...(this.state.errors || {}),
          ...errors,
        },
      },
      () => {
        let valid = true;
        for (const key in this.state.errors) {
          if (errors.hasOwnProperty(key)) {
            const element = this.state.errors[key];
            if (element.length > 0) {
              valid = false;
            }
          }
        }
        console.log(errors);
        this.props.isValid(valid);
      }
    );
  };

  _changePhone = value => {
    const errors = this.state.errors;
    errors['mobile'] = [];
    this.setState({
      CountryCode: value.alpha2Code,
      UserMobileNumber: value.phone,
      CallingCode: value.callingCode,
      errors,
    });
    this._changeForm({
      ...this.state,
      CountryCode: value.alpha2Code,
      UserMobileNumber: value.phone,
    });
  };

  render() {
    const {
      Username,
      Password,
      UserFirstName,
      UserLastName,
      registeredReferralCode,
      BusinessName,
      errors,
    } = this.state;

    return (
      <View style={styles.formContainer}>
        <View style={styles.nameInputs}>
          <View style={{ flex: 1 }}>
            <FloatingTextInput
              label={'First Name'}
              value={UserFirstName}
              onChangeText={val => this._textChange('UserFirstName', val)}
              // errors={errors.UserFirstName || []}
            />
          </View>
          <View style={{ flex: 1 }}>
            <FloatingTextInput
              label={'Last Name'}
              lineLeft={true}
              value={UserLastName}
              onChangeText={val => this._textChange('UserLastName', val)}
            />
          </View>
        </View>
        <View>
          <FloatingTextInput
            label={'E-mail'}
            value={Username}
            onChangeText={val => this._textChange('Username', val)}
            onSubmitEditing={this._checkEmail.bind(this)}
            onBlur={this._checkEmail.bind(this)}
            errors={errors.Username || []}
            autoCapitalize={'none'}
          />
        </View>
        <View>
          <FloatingTextInput
            label={'Password'}
            secureTextEntry={true}
            value={Password}
            onChangeText={val => this._textChange('Password', val)}
            validate={{
              title: 'Password must contain',
              validations: [
                {
                  name: '8 Characters',
                  validateInput: val => {
                    return val.length > 8;
                  },
                },
                {
                  name: '1 Number',
                  validateInput: val => {
                    return /\d/.test(val);
                  },
                },
                {
                  name: '1 Special Character',
                  validateInput: val => {
                    return /\W+/.test(val);
                  },
                },
              ],
            }}
          />
        </View>
        <View>
          <PhoneInput
            onChange={this._changePhone}
            onSubmitEditing={() => this._checkMobile()}
            errors={errors.mobile || []}
          />
        </View>
        <View>
          <FloatingTextInput
            label={'Company Name'}
            labelOptional={'(Optional)'}
            value={BusinessName}
            onChangeText={val => this._textChange('BusinessName', val)}
          />
        </View>
        <View>
          <FloatingTextInput
            label={'Referral Code'}
            labelOptional={'(Optional)'}
            value={registeredReferralCode}
            onChangeText={val =>
              this._textChange('registeredReferralCode', val)
            }
          />
        </View>
      </View>
    );
  }
}

const styles = {
  nameInputs: {
    flexDirection: 'row',
  },
  formContainer:{
    paddingHorizontal: hp('4%'),
  }
};

export default AddCustomerForm;
