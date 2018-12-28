import {Platform, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Colors} from 'api';

export const portraitStyles = StyleSheet.create({
    logoContainer: {
        marginTop:hp('13.8%')
        //height:hp('10%'),
        //justifyContent:'flex-end'
    },
    cardContainer: {
        alignItems: 'center',
    },
    card: {
        width: wp('86.6%'),
        height: hp('25.3%'),
        backgroundColor:'white',
        borderRadius:hp('2%'),
        paddingHorizontal:wp('8.8%'),
        paddingTop:hp('3%'),
        marginTop:hp('3.4%'),
        elevation:10,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
    },
    forgotPasswordText: {
        fontWeight: '700',
        color: Colors.primary,
        textAlign: 'center',
        fontSize: hp('2.1%'),
        marginTop:hp('2%')
    },
})
