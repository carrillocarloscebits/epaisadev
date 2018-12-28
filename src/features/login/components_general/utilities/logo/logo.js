import React from 'react';
import {View, Image} from 'react-native';
import TextMontserrat from '../../texts/textMontserrat';
import LogoSrc from './assets/ep_logo.png';
import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const styles = EStyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: '2rem'
    },
    logo: {
        height: hp('5.8%'),
        marginBottom: hp('2.2%')
    },
    lineStyle: {
        marginTop: hp('1.15%'),
        borderColor: '#fff',
        borderWidth: hp('3%'),
        backgroundColor:'#FFF',
        width: wp('11%'),
    },
    text : {
        marginHorizontal: 15,
        color: 'white', 
        fontWeight: '700',
        fontSize: hp('1.8%'), 
        letterSpacing: wp('0.2%'),
    },
    lineStyle: {
        width: '11%'
    },
})

export default () => {
    const {lineStyle, logo, container, text} = styles;
    return (
        <View style={container}>
            <Image 
                resizeMode="contain"
                style={logo} source={LogoSrc}/>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={lineStyle}/>
                    <TextMontserrat style={text}>LEARN MORE</TextMontserrat>
                <View style={lineStyle}/>
            </View>
        </View>
    )
}