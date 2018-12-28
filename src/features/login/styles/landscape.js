import {Platform, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Colors} from 'api';

export const landscapeStyles = StyleSheet.create({
    logoContainer: {
        height:hp('30%'),
        width:'100%',
        justifyContent:'flex-end',
        marginBottom:hp('3.8%')
    },
    cardContainer: {
        alignItems: 'center',
    },
    card: {
        width: wp('45.7%'),
        height: hp('31.7%'),
        backgroundColor:'white',
        borderRadius:hp('2%'),
        paddingHorizontal:wp('4.7%'),
        paddingTop:hp('6%'),
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
        fontSize: hp('2.5%'),
        marginTop:hp('0.7%')
    },
    buttonSignIn: {
        width:wp('45.7%'), 
        height:hp('7.8%'),
        marginTop:hp('3.3%'),
        borderRadius:hp('20%'),
        ...Platform.select({
            ios: {
                shadowOffset: { width: 1, height: 2 },
                shadowColor: "black",
                shadowOpacity: .5,
            },
            android: {
                elevation: hp('0.35%'),
            }
        })
    },
    buttonCreateAccount: {
        width:wp('45.7%'), 
        height:hp('7.8%'),
        borderWidth: hp('0.15%'),
        borderRadius:hp('20%'),
        borderColor:'#979797'
    },
    containerCreateAccount: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height:hp('22.35%'),
        paddingBottom:hp('8.35%')
    },
})

