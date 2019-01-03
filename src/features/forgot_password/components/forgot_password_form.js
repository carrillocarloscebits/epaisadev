import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import { TextMontserrat, FloatingTextInput, PhoneInput } from 'components';
import EStyleSheet from 'react-native-extended-stylesheet';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { isTablet } from '../../cash_register/constants/isLandscape';
class ForgotPasswordForm extends Component {
  state = {
    mobile: '',
    email: '',
  };

  _textChange(key, value) {
    this.setState({ [key]: value });
    if (this.props[key]) {
      this.props[key].errors = [];
    }
  }

  _checkField = key => {
    switch (key) {
      case 'email':
        this.props.check_email(this.state.email);
        break;
      case 'mobile':
        const regex = new RegExp(/^\d{10}$/);
        console.log(this.state);
        if (regex.test(this.state.number)) {
          this.props.check_mobile(this.state.mobile);
        } else {
          this.setState({
            number: { errors: ['Enter a valid mobile number.'] },
          });
        }
        break;

      default:
        break;
    }
  };

  getErrors = key => {
    let errors = [];
    switch (key) {
      case 'email':
        return this.props[key] ? this.props[key].errors : [];
      case 'mobile':
        if (this.props[key]) {
          errors = [...errors, ...this.props[key].errors];
        }
        if (this.state.number) {
          errors = [...errors, ...(this.state.number.errors || [])];
        }
        return errors;
      default:
        break;
    }
  };

  render() {
    return (
      <View style={{}}>
        <TextMontserrat style={this.props.headerStyle}>
          Enter your mobile number or e-mail
        </TextMontserrat>
        <TextMontserrat style={this.props.headerStyle}>
          address to reset your password
        </TextMontserrat>
        <View>
          <FloatingTextInput
            label={'E-mail'}
            autoCapitalize={'none'}
            keyboardType="email-address"
            onChangeText={val => this._textChange('email', val)}
            onBlur={this._changeForm}
            returnKeyType={'done'}
            onSubmitEditing={() => {
              Keyboard.dismiss;
              this._checkField('email');
            }}
            errors={this.getErrors('email')}
            //labelStyle={{color:'yellow'}}
          />
        </View>
        <TextMontserrat style={styles.or}>OR</TextMontserrat>
        {/* <FloatingTextInput
                        label={'Mobile Number'}
                        keyboardType='numeric'
                        onChangeText={(val) => this._textChange('mobile', val)}
                        onBlur={this._changeForm}
                        returnKeyType={'done'}
                        onSubmitEditing={()=> {Keyboard.dismiss; this._checkField('mobile')}}
                        errors={this.getErrors('mobile')}
                    /> */}
        <PhoneInput
          label="Mobile Number"
          onChange={val => {
            const phone = `+${val.callingCode}${val.phone}`;
            this._textChange('mobile', phone);
            this._textChange('number', val.phone);
          }}
          margin={22}
          height={-hp('1%')}
          onBlur={this._changeForm}
          returnKeyType={'done'}
          onSubmitEditing={() => {
            Keyboard.dismiss;
            this._checkField('mobile');
          }}
          errors={this.getErrors('mobile')}
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  instructions: {
    fontWeight: '700',
    fontSize: '1.42rem',
    textAlign: 'center',
  },
  or: {
    fontSize: '2rem',
    textAlign: 'center',
    fontWeight: '700',
    marginTop: '1.42rem',
    marginBottom: '1rem',
  },
  nameInputs: {
    flexDirection: 'row',
  },
  '@media (min-width: 500)': {
    instructions: {
      fontSize: '1.4rem',
    },
  },
});

export default ForgotPasswordForm;
