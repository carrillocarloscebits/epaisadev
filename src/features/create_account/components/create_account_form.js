import React, { Component } from 'react';
import { View } from 'react-native';
import { FloatingTextInput } from 'components';
import { PhoneInput } from 'components';
import {
  check_email,
  check_mobile,
  get_user_country,
} from './../../../services/user_service';
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
    CountryCode: '',
    registeredReferralCode: '',
    otpType: 1,
    BusinessName: '',
    errors: {},
  };

  componentDidMount() {
    get_user_country().then(x => {
      this.setState(
        {
          CountryCode: x.country_code,
        },
        () => {
          console.log(this.state);
          this.props.onChangeForm(this.state);
        }
      );
    });
  }

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
    return check_email(Username)
      .then(res => {
        return this.setState({
          errors: {
            ...(this.state.errors || {}),
            Username: res.errors,
          },
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  _checkMobile() {
    const { UserMobileNumber, CallingCode } = this.state;
    if (UserMobileNumber === '' || UserMobileNumber.length > 10) {
      return this.setState({
        errors: {
          ...(this.state.errors || {}),
          mobile: ['Enter a valid mobile number'],
        },
      });
    }
    return check_mobile(`+${CallingCode}${UserMobileNumber}`)
      .then(res => {
        return this.setState({
          errors: {
            ...(this.state.errors || {}),
            mobile: !res.exists ? [] : ['This number is already taken'],
          },
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  _textChange(key, value) {
    this.setState({ [key]: value });
    const errors = this.state.errors;
    errors[key] = [];
    this.setState({
      errors,
    });
    this._changeForm({
      ...this.state,
      ...{ [key]: value },
    });
  }

  _changeForm = payload => {
    if (this.props.onChangeForm) {
      const { errors, ...newPayload } = payload;
      console.log(newPayload);
      this.props.onChangeForm(newPayload);
    }
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
      UserMobileNumber,
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
            errors={errors.Username || []}
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
};

export default CreateAccountForm;
