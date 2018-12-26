import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

class OtpInputs extends Component {
    inputs = {};
    focusTheField = (id) => {
        this.inputs[id].focus();
    }
    state = {
        otp: {}
    }

    _handle_change = (value, i) => {
        this.setState((prevState) => ({
            otp: {
                ...prevState.otp,
                [i]: value
            }
        }))
    }

    _handle_complete = () => {
        let string_val = '';
        for (const key in this.state.otp) {
            string_val = `${string_val}${this.state.otp[key]}`;
        }
        
        this.props.onComplete(parseInt(string_val));
    }

    _get_color_status = () => {
        if(this.props.invalid && !this.props.valid) {
            return '#D0021B'
        }else {
            if(this.props.valid) {
                return '#09BA83'
            }
            return '#174285';
        }
    }

    renderInputs = () => {
        const border = 5;
        const inputsArr = this.props.data;
        return inputsArr.map((x, i) => {
            const isFirst = i === 0;
            const isLast = i === inputsArr.length - 1;

            const firstViewStyle = isFirst ? {
                borderTopLeftRadius: border, 
                borderBottomLeftRadius: border
            } : {}

            const lastViewStyle = isLast ? {
                borderTopRightRadius: border, 
                borderBottomRightRadius: border,
                borderRightWidth: 1.5
            } : {}

            const viewStyle = {
                ...styles.container,
                borderColor: this._get_color_status(),
                ...firstViewStyle,
                ...lastViewStyle
            }

            return (
                <View key={`input_${i}`} style={viewStyle}>
                    <TextInput
                        ref={input => { this.inputs[x] = input }}
                        returnKeyType={isLast ? 'done' : 'next'}
                        onSubmitEditing={() => { 
                            isLast ? this._handle_complete() : this.focusTheField(inputsArr[i+1])
                        }}
                        onChangeText={(value) => this._handle_change(value, i)}
                        style= {styles.input}
                        keyboardType='numeric'
                        maxLength={1}
                        blurOnSubmit={isLast ? true : false}
                        underlineColorAndroid='transparent'
                    />
                </View>
            )
        })
    }

    render() {
        return (
            <View style={{flexDirection:'row'}}>
                {this.renderInputs()}
            </View>
        )
    }
}

const styles = EStyleSheet.create({
    container: {
        height: '5rem', 
        width: '4.5rem',
        paddingTop: '.5rem',
        justifyContent:'center',
        alignItems: 'center',
        borderWidth: 1.5, 
        borderRightWidth: 0,
    },
    input: {
        width:'4rem',
        height:'4rem',
        bottom: '.5rem',
        fontFamily:'Montserrat-SemiBold',
        fontSize:'3rem',
        color:'#5D6770',
        paddingBottom:0,
        textAlign:'center'
    }
})

export default OtpInputs;