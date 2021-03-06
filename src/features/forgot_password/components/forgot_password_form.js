import React, { Component } from 'react';
import { View, Keyboard, Dimensions } from 'react-native';
import { TextMontserrat, FloatingTextInput, PhoneInput } from 'components';
import EStyleSheet from 'react-native-extended-stylesheet';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { isTablet } from '../../cash_register/constants/isLandscape';

const isPortrait = () => {
  const dim = Dimensions.get('window');
  if (dim.height >= dim.width) {
    return true;
  } else {
    return false;
  }
};

class ForgotPasswordForm extends Component {
  state = {
    mobile: '',
    email: '',

    orientation: isPortrait(),
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
      <View style={{height:'100%', width:'100%', paddingTop: this.state.orientation ? 0 : hp('1.7%')}}>
        <TextMontserrat style={this.props.headerStyle}>
          Enter your mobile number or e-mail
        </TextMontserrat>
        <TextMontserrat style={this.props.headerStyle}>
          address to reset your password
        </TextMontserrat>
        <View 
          style={ this.state.orientation ? 
            {marginTop:hp('1.5%'), marginBottom:hp('3.5%')} :
            {marginTop:hp('2.3%'), marginBottom:hp('4%')}
            }
        >
          <FloatingTextInput
            inputRef={input => {
              this.emailForgotInput = input;
            }}
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
        <TextMontserrat 
          style={ this.state.orientation ? 
                    {marginBottom:hp('2.2%'), fontSize:hp('2.8%'), textAlign: 'center', fontWeight: '700',} : 
                    {marginBottom:hp('2.7%'), fontSize:hp('3.6%'), textAlign: 'center', fontWeight: '700',}
                }
        >
                OR
        </TextMontserrat>
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
          inputRef={input => {
            this.phoneForgotInput = input;
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

          restyleComp={true}
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
