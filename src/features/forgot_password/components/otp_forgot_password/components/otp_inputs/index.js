import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

class OtpInputs extends Component {
    inputs = {};
    focusTheField = (id) => {
        this.inputs[id].focus();
    }
    render() {
        const border = 5;
        return (
            <View style={{flexDirection:'row'}}>
                <View style={{...styles.container, borderTopLeftRadius: border, borderBottomLeftRadius: border}}>
                    <TextInput
                        returnKeyType={'next'}
                        onSubmitEditing={() => { this.focusTheField('second'); }}
                        style= {styles.input}
                        keyboardType='numeric'
                        maxLength={1}
                        blurOnSubmit={false}
                        underlineColorAndroid='transparent'
                    />
                </View>
                
                <View style={styles.container}>
                    <TextInput
                        ref={input => { this.inputs['second'] = input }}
                        returnKeyType={'next'}
                        onSubmitEditing={() => { this.focusTheField('third'); }}
                        style= {styles.input}
                        keyboardType='numeric'
                        maxLength={1}
                        blurOnSubmit={false}
                        underlineColorAndroid='transparent'

                    />
                </View>
                <View style={styles.container}>
                    <TextInput
                        ref={input => { this.inputs['third'] = input }}
                        returnKeyType={'next'}
                        onSubmitEditing={() => { this.focusTheField('fourth'); }}
                        style= {styles.input}
                        keyboardType='numeric'
                        maxLength={1}
                        blurOnSubmit={false}
                        underlineColorAndroid='transparent'
                    />
                </View>
                
                <View style={styles.container}>
                    <TextInput
                        ref={input => { this.inputs['fourth'] = input }}
                        returnKeyType={'next'}
                        onSubmitEditing={() => { this.focusTheField('fifth'); }}
                        style= {styles.input}
                        keyboardType='numeric'
                        maxLength={1}
                        blurOnSubmit={false}                    
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={styles.container}>
                    <TextInput
                        ref={input => { this.inputs['fifth'] = input }}
                        returnKeyType={'next'}
                        onSubmitEditing={() => { this.focusTheField('sixth'); }}
                        style= {styles.input}
                        keyboardType='numeric'
                        maxLength={1}
                        blurOnSubmit={false}                    
                        underlineColorAndroid='transparent'
                    />
                </View>
                <View style={{...styles.container, borderRightWidth: 1.5, borderTopRightRadius: border, borderBottomRightRadius: border}}>
                    <TextInput
                        ref={input => { this.inputs['sixth'] = input }}
                        returnKeyType={'done'}
                        onSubmitEditing={() => alert('done')}
                        style= {styles.input}
                        keyboardType='numeric'
                        maxLength={1}                 
                        underlineColorAndroid='transparent'
                    />
                </View>
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
        borderColor:'#174285',
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