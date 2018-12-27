import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, TextInput, Animated, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
  
class FloatingLabelInput extends Component {
    constructor(props){
      super(props)
      this.state = {
        isFocused: false,
        rupeeSign:'₹ ',
        orientation:this.props.orientation
      };
    }
  
    componentWillMount() {
      this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
    }
  
    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });
  
    componentDidUpdate() {
      Animated.timing(this._animatedIsFocused, {
        toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
        duration: 200,
      }).start();
    }
  
    render() {
      const { label, ...props } = this.props;
      const labelStyle = {
        position: 'absolute',
        left: wp('1%'),
        fontFamily:'Montserrat-Medium',
        top: this._animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [hp('3.2%'), 0],  // on text input, above text input
        }),
        fontSize: this._animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [hp('2.1%'), hp('1.8%')],  // on text input, above text input
        }),
        color: this._animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: ['#6B6B6B', '#6B6B6B'],  // on text input, above text input
        }),
      };

      const mainInputPortraitStyle = {
        height: hp('6.5%'), 
        width: this.props.eraseOption ? '93.5%' : '100%',  
        fontSize: hp('2.1%'), 
        paddingBottom:0, 
        color: this.state.isFocused? '#174285' : '#174285',
        fontFamily:'Montserrat-SemiBold'
      }

      const mainInputLandscapeStyle = {
        height: hp('6.5%'), 
        width: this.props.eraseOption ? '93.5%' : '100%',  
        fontSize: hp('2.1%'), 
        paddingBottom:0, 
        color: this.state.isFocused? '#174285' : '#174285',
        fontFamily:'Montserrat-SemiBold',
        paddingLeft: this.props.rupeeSign ? 0 : wp('1%')
      }

      const rupeePortrait = { 
        height: hp('6.5%'), 
        width: '8%',  
        fontSize: hp('2.1%'), 
        paddingBottom:0, 
        color: '#174285', 
        fontFamily:'Montserrat-SemiBold' 
      }

      const rupeeLandscape = { 
        height: hp('6.5%'), 
        width: '8%',  
        fontSize: hp('2.1%'), 
        paddingBottom:0, 
        color: '#174285', 
        fontFamily:'Montserrat-SemiBold',
        paddingLeft: wp('1%')
      }

      const clearButtonPortrait = {
        height:hp('5%'), 
        width:'6.5%', 
        position:'absolute', 
        right:0, 
        top:hp('2.8%')
      }

      const clearButtonLandscape = {
        height:hp('5%'), 
        width:'5.3%', 
        position:'absolute', 
        right:0, 
        top:hp('2.8%')
      }

      return (
        <View style={{ width: wp(''+this.props.inputWidth), height:hp(''+this.props.inputHeight), /*backgroundColor:'#EDCFAC'*/}}>
          <Animated.Text style={labelStyle}>
            {label}
          </Animated.Text>
          <View style={{flexDirection:'row'}}>
            { this.props.rupeeSign &&
              <TextInput 
                style={this.state.orientation ? rupeePortrait : rupeeLandscape} 
                underlineColorAndroid='rgba(0,0,0,0)'
                value={this.props.value !== '' ? this.state.rupeeSign : ''}
                editable={false}
              />
            }
            <TextInput
              {...props}
              style={this.props.orientation ? mainInputPortraitStyle : mainInputLandscapeStyle} 
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              numberOfLines={1}
              autoCapitalize={this.props.autoCapitalizeInput} 
              keyboardType= {this.props.keyboard}
              maxLength={this.props.maxLength}
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              blurOnSubmit
            />
            {
              /*this.state.isFocused && */this.props.eraseOption && this.props.value !== '' ? 
              <TouchableOpacity style={this.state.orientation ? clearButtonPortrait : clearButtonLandscape} onPress={this.props.onPressAction}>
                <View>
                    <IconMaterialIcons name="cancel" size={hp('2.8%')} />
                </View>
              </TouchableOpacity> : null
            }
          </View>
          <View style={{ backgroundColor: this.state.isFocused? '#174285' : /* 6B6B6B */ '#174285', width: wp(''+this.props.inputWidth), height:hp('0.35%'),}}>
            <View style={{ backgroundColor:'#fff', width: wp('1%'), height:'100%',}}/>
          </View>
        </View>
      );
    }
  }


  
  
  export default class FloatingTextEditProductInput extends Component {

    state = {
      value: '',
    };
  
    handleTextChange = (newText) => {this.setState({ value: newText });};

    eraseText = () => {this.setState({value:''})}
  
    render() {
      return (
        <View>
          {/*<StatusBar hidden />*/}
          <FloatingLabelInput
            inputWidth={ this.props.width }
            inputHeight={ this.props.height }
            //label={(!this.state.isFocused && this.state.value !== '')  ? '' : this.props.labelText }
            label={this.props.labelText}
            value={this.state.value}
            maxLength={this.props.maximumLength}
            onChangeText={this.handleTextChange}
            keyboard={this.props.typeOfKeyboard}
            eraseOption={this.props.eraseOption}
            autoCapitalizeInput={this.props.autoCapitalizeText}
            rupeeSign={this.props.rupeeSign}
            orientation={this.props.orientation}
            onPressAction={this.eraseText}
          />
        </View>
      );
    }
  }