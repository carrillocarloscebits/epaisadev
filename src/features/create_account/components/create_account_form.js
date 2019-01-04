import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { FloatingTextInput } from 'components';
import { PhoneInput } from 'components';
import {
  check_email,
  check_mobile,
  get_user_country,
} from './../../../services/user_service';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const isPortrait = () => {
  const dim = Dimensions.get('window');
  if (dim.height >= dim.width) {
    return true;
  } else {
    return false;
  }
};

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

    orientation: isPortrait(),
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
        const errors =
          res.errors[0] == 'There is no user found with given details.'
            ? []
            : res.errors;
        const taken = res.exists
          ? ['This email address is already taken.']
          : [];
        return this.setState({
          errors: {
            ...(this.state.errors || {}),
            Username: [...taken, ...errors],
          },
        });
      })
      .catch(err => {
        console.log(err);
      });
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
      <View style={this.props.containerStyle}>
        <View style={styles.nameInputs}>
          <View style={{ flex: 1 }}>
            <FloatingTextInput
              label={'First Name'}
              value={UserFirstName}
              onChangeText={val => this._textChange('UserFirstName', val)}

              labelSizeUp={this.state.orientation ? hp('1.8%') : hp('2.2%')}
              labelSizeDown={this.state.orientation ? hp('2.1%') : hp('2.7%')}
              labelPlacingUp={0}
              labelPlacingDown={this.state.orientation ? hp('4%') : hp('4%')}

              inputContainerStyle={this.state.orientation ? {height:hp('8%')} : {height:hp('10%')}}
              inputStyle={
                this.state.orientation ? 
                { fontSize:hp('2.1%'), height:hp('5%'), marginTop:hp('3%'), paddingBottom:0} :
                { fontSize:hp('2.7%'), height:hp('6.9%'), marginTop:hp('3%'), paddingBottom:0}
              }
              underlineStyle={this.state.orientation ? {height:hp('0.4%')} : {height:hp('0.4%')}}
              iconStyle={this.state.orientation ? {bottom: hp('0.1%'), zIndex: 0,} : {bottom: hp('0.1%'), zIndex: 0,}}
              iconSize={this.state.orientation ? hp('3%') : hp('3.8%')}
              //inputStyle={{backgroundColor:'#E3C1A5'}}
              // errors={errors.UserFirstName || []}
            />
          </View>
          <View style={{ flex: 1 }}>
            <FloatingTextInput
              label={'Last Name'}
              lineLeft={true}
              value={UserLastName}
              onChangeText={val => this._textChange('UserLastName', val)}

              labelSizeUp={this.state.orientation ? hp('1.8%') : hp('2.2%')}
              labelSizeDown={this.state.orientation ? hp('2.1%') : hp('2.7%')}
              labelPlacingUp={0}
              labelPlacingDown={this.state.orientation ? hp('4%') : hp('4%')}

              inputContainerStyle={this.state.orientation ? {height:hp('8%')} : {height:hp('10%')}}
              inputStyle={
                this.state.orientation ? 
                { fontSize:hp('2.1%'), height:hp('5%'), marginTop:hp('3%'), paddingBottom:0} :
                { fontSize:hp('2.7%'), height:hp('6.9%'), marginTop:hp('3%'), paddingBottom:0}
              }
              underlineStyle={this.state.orientation ? {height:hp('0.4%')} : {height:hp('0.4%')}}
              iconStyle={this.state.orientation ? {bottom: hp('0.1%'), zIndex: 0,} : {bottom: hp('0.1%'), zIndex: 0,}}
              iconSize={this.state.orientation ? hp('3%') : hp('3.8%')}
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

            labelSizeUp={this.state.orientation ? hp('1.8%') : hp('2.2%')}
              labelSizeDown={this.state.orientation ? hp('2.1%') : hp('2.7%')}
              labelPlacingUp={0}
              labelPlacingDown={this.state.orientation ? hp('4%') : hp('4%')}

              inputContainerStyle={this.state.orientation ? {height:hp('8%')} : {height:hp('10%')}}
              inputStyle={
                this.state.orientation ? 
                { fontSize:hp('2.1%'), height:hp('5%'), marginTop:hp('3%'), paddingBottom:0} :
                { fontSize:hp('2.7%'), height:hp('6.9%'), marginTop:hp('3%'), paddingBottom:0}
              }
              underlineStyle={this.state.orientation ? {height:hp('0.4%')} : {height:hp('0.4%')}}
              iconStyle={this.state.orientation ? {bottom: hp('0.1%'), zIndex: 0,} : {bottom: hp('0.1%'), zIndex: 0,}}
              iconSize={this.state.orientation ? hp('3%') : hp('3.8%')}
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

            labelSizeUp={this.state.orientation ? hp('1.8%') : hp('2.2%')}
              labelSizeDown={this.state.orientation ? hp('2.1%') : hp('2.7%')}
              labelPlacingUp={0}
              labelPlacingDown={this.state.orientation ? hp('4%') : hp('4%')}

              inputContainerStyle={this.state.orientation ? {height:hp('8%')} : {height:hp('10%')}}
              inputStyle={
                this.state.orientation ? 
                { fontSize:hp('2.1%'), height:hp('5%'), marginTop:hp('3%'), paddingBottom:0} :
                { fontSize:hp('2.7%'), height:hp('6.9%'), marginTop:hp('3%'), paddingBottom:0}
              }
              underlineStyle={this.state.orientation ? {height:hp('0.4%')} : {height:hp('0.4%')}}
              iconStyle={this.state.orientation ? {bottom: hp('0.1%'), zIndex: 0,} : {bottom: hp('0.1%'), zIndex: 0,}}
              iconSize={this.state.orientation ? hp('3%') : hp('3.8%')}
          />
        </View>
        <View>
          <PhoneInput
            onChange={this._changePhone}
            onSubmitEditing={() => this._checkMobile()}
            errors={errors.mobile || []}

            restyleComp={true}
          />
        </View>
        <View>
          <FloatingTextInput
            label={'Company Name'}
            labelOptional={'(Optional)'}
            value={BusinessName}
            onChangeText={val => this._textChange('BusinessName', val)}

            labelSizeUp={this.state.orientation ? hp('1.8%') : hp('2.2%')}
              labelSizeDown={this.state.orientation ? hp('2.1%') : hp('2.7%')}
              labelPlacingUp={0}
              labelPlacingDown={this.state.orientation ? hp('4%') : hp('4%')}

              inputContainerStyle={this.state.orientation ? {height:hp('8%')} : {height:hp('10%')}}
              inputStyle={
                this.state.orientation ? 
                { fontSize:hp('2.1%'), height:hp('5%'), marginTop:hp('3%'), paddingBottom:0} :
                { fontSize:hp('2.7%'), height:hp('6.9%'), marginTop:hp('3%'), paddingBottom:0}
              }
              underlineStyle={this.state.orientation ? {height:hp('0.4%')} : {height:hp('0.4%')}}
              iconStyle={this.state.orientation ? {bottom: hp('0.1%'), zIndex: 0,} : {bottom: hp('0.1%'), zIndex: 0,}}
              iconSize={this.state.orientation ? hp('3%') : hp('3.8%')}
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

            labelSizeUp={this.state.orientation ? hp('1.8%') : hp('2.2%')}
            labelSizeDown={this.state.orientation ? hp('2.1%') : hp('2.7%')}
            labelPlacingUp={0}
            labelPlacingDown={this.state.orientation ? hp('4%') : hp('4%')}

            inputContainerStyle={this.state.orientation ? {height:hp('8%')} : {height:hp('10%')}}
            inputStyle={
              this.state.orientation ? 
                { fontSize:hp('2.1%'), height:hp('5%'), marginTop:hp('3%'), paddingBottom:0} :
                { fontSize:hp('2.7%'), height:hp('6.9%'), marginTop:hp('3%'), paddingBottom:0}
              }
            underlineStyle={this.state.orientation ? {height:hp('0.4%')} : {height:hp('0.4%')}}
            iconStyle={this.state.orientation ? {bottom: hp('0.1%'), zIndex: 0,} : {bottom: hp('0.1%'), zIndex: 0,}}
            iconSize={this.state.orientation ? hp('3%') : hp('3.8%')}
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
