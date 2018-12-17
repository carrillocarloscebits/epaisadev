import React from 'react';
import {View, Image} from 'react-native';
import {TextMontserrat} from 'components';
import LogoSrc from '../../assets/images/ep_logo.png';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: '2rem'
    },
    logo: {
        width: '60%',
        height: 60
    },
    lineStyle: {
        width: '15%',
        height: '0.3rem',
        backgroundColor: 'white'
    },
    text : {
        marginHorizontal: 15,
        color: 'white', 
        fontWeight: '700',
        fontSize: '1.4rem'
    },
    '@media (min-width: 500)': {
        lineStyle: {
            width: '11%'
        },
        logo: {
            marginBottom: '.5rem'
        }
    }

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