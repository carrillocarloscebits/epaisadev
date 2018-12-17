import React, {Component} from 'react';
import {View, Text} from 'react-native';
import OtpInput from './OtpInput';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

class OtpInputs extends Component {
    render() {

        return (
            <View style={{flexDirection:'row'}}>
                <OtpInput 
                    containerStyle={{...styles.container, borderBottomLeftRadius:5, borderTopLeftRadius:5}} 
                    inputStyle={styles.input} 
                    />
                <OtpInput 
                    containerStyle={styles.container} 
                    inputStyle={styles.input} 
                    />
                <OtpInput 
                    containerStyle={styles.container} 
                    inputStyle={styles.input} 
                    />
                <OtpInput 
                    containerStyle={{...styles.container, borderBottomRightRadius:5, borderTopRightRadius:5, borderRightWidth:hp('0.15%')}}
                    inputStyle={styles.input} 
                    />
            </View>
        )
    }
}

const styles = {
    container: {
        height:hp('6.25%'), 
        width:wp('12.5'), 
        justifyContent:'center', 
        borderWidth:hp('0.15%'), 
        borderRightWidth: 0, 
        borderColor:'#174285'
    },
    input: {
        width:'100%', 
        fontFamily:'Montserrat-SemiBold', 
        fontSize:hp('4.5%'), 
        color:'#5D6770', 
        paddingBottom:0, 
        textAlign:'center'
    }
}

export default OtpInputs;