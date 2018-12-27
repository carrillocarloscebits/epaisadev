import React, { Component } from 'react';
import {
  Text, TouchableOpacity,
  View, TextInput,Keyboard
        } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {discountStylesPortrait,discountStylesLandscape,selectPortrait,selectLandscape} from './styles';
import {TextMontserrat} from '../texts';

export default class SelectorDiscount extends Component {
    constructor(props) {
        super(props)

        this.state = {
            discountSign:'%',
            discount:'',
            totalDiscount:'0.00',

            opacityError: 0,
            colorError: '#174285',
            errorMessage:'',

            keyboardActive:false,
            orientation: this.props.orientation,
        }

        this.changeDropdownDiscountArrow = this.changeDropdownDiscountArrow.bind(this);
    }

    clearModalDiscountInput = () => {
        this.setState({
            discount: ''
        })
    }

    hideErrorMessageDiscount = () => {
        this.setState({
            opacityError: 0,
            colorError: '#174285'
        })
    }

    changeKeyboardActive = () => {
        this.setState({
            keyboardActive : true
        })
    }
    
    changeKeyboardInactive = () => {
        this.setState({
            keyboardActive : false
        })
    }

    componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.changeKeyboardActive);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.changeKeyboardInactive);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    
    changeDropdownDiscountArrow() {
        return (
            <IconMaterialCommunityIcons size={25} name={'chevron-down'} color={this.state.orientation ? "#7f7f7f" : "#174285"}/>
        );
    }

    render() {
        
        let dataDiscountNomination = [
            {value: "%"},
            {value: '₹'}
        ];

        return (
            <View ref={(ref) => { this.bottomSeparator = ref; }} style={ this.state.orientation ? [discountStylesPortrait.textInputModal, {width:wp(this.props.width+'%') ,borderBottomColor:this.state.colorError}] : [discountStylesLandscape.textInputModalLandscape, {width:wp(this.props.width+'%') ,borderBottomColor:this.state.colorError}]}>
                <View style={{ flexDirection: 'row', width:'100%', alignItems: 'flex-start'}}>
                        <TextMontserrat
                            style={ this.state.orientation ? {fontSize: hp('1.7%'), fontWeight:'600', color: '#6B6B6B'} : {fontSize: hp('1.7%'), fontWeight:'600', color: '#6B6B6B'} }
                            >
                            Discount
                        </TextMontserrat>
                </View>
                <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                    <View style={this.state.orientation ? {height:hp('4.5%'), justifyContent:'flex-start'} : {height:hp('4.5%'), justifyContent:'flex-start'}}>       
                            <Dropdown
                                //box label
                                boxLabelStyle={{fontSize: hp('2.1%'), color: this.state.colorError, fontFamily:'Montserrat-SemiBold'}}
                                //keyActive?
                                disabled={this.state.keyboardActive}
                                textColor={this.state.colorError}
                                style={{fontFamily:'Montserrat-Medium', fontWeight:'600'}}
                                selectedItemColor='#222222'
                                textAlign='center'
                                value = {this.state.discountSign}
                                dropdownPosition={ this.state.orientation ? -3.11 : -3.1 }
                                dropdownMargins={{min: 0, max: 0}}
                                dropdownOffset={ this.state.orientation ? {top:hp('0.85%'),left:0} : {top:hp('0.7%'),left:0} }
                                renderAccessory={null}
                                inputContainerStyle={{ borderBottomColor: 'transparent' }}
                                itemPadding={hp('0.38%')}
                                itemCount={2}
                                fontSize={ this.state.orientation ? hp('2.32%') : hp('2.4%') }
                                data={dataDiscountNomination}
                                itemTextStyle={{textAlign: 'center', fontWeight: '500',fontSize: hp('2.32%')}}
                                containerStyle={this.state.orientation ? selectPortrait.dropdownContainer : selectLandscape.dropdownContainer}
                                pickerStyle={ this.state.orientation ? selectPortrait.pickerStyle : selectLandscape.pickerStyle}
                                onChangeText={(value)=>{this.setState({discountSign: value})}} />  
                    </View>

                    {/*  SEPARATOR BETWEEN BOTH INPUTS  */}
                    {  
                        <View 
                            ref={(ref) => { this.inputsSeparator = ref; }}
                            style={ this.state.orientation ? [discountStylesPortrait.inputsSeparator, {backgroundColor: this.state.colorError}] :
                                                            {height:hp('4%'), width:wp('0.2%'), paddingTop:hp('0.5%'), backgroundColor: this.state.colorError}} /> 
                    }


                    <View width={this.state.orientation ? wp('56%') : wp('16%')}>
                        <TextInput 
                            ref={(ref) => { this.discountInput = ref; }}
                            value={this.state.discount}
                            keyboardType={'numeric'}
                            returnKeyType={'done'}
                            underlineColorAndroid='transparent'
                            height={hp('6%')}
                            style={ this.state.orientation ? [discountStylesPortrait.discountModalDiscountInputPortrait, {color:this.state.colorError}] : [discountStylesLandscape.discountModalDiscountInputLandscape, {color:this.state.colorError}] }
                            onChangeText={ (text) => {this.setState({discount:text}); if(this.state.opacityError === 1){ this.hideErrorMessageDiscount() } }} />
                    </View>

                    {/* CLEAR TEXT BUTTON */}
                    {
                        this.state.discount.length > 0 ? 
                        <TouchableOpacity 
                        onPress={
                        () => {this.clearModalDiscountInput(); this.discountInput.focus()}
                        }
                        style={this.state.orientation ? discountStylesPortrait.clearTextButton : discountStylesPortrait.clearTextButton}>                  
                            <IconMaterialCommunityIcons name="close-circle" size={this.state.orientation ? hp('2.8%') : hp('2.8%')} color={'#6B6B6B'} />
                        </TouchableOpacity> : null
                    }
                </View>

            </View>
        );
    }
}
