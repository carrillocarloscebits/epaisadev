import { Platform, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from 'api';

export const portraitStyles = StyleSheet.create({
  logoContainer: {
    height: hp('24.2%'),
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: hp('6.4%'),
  },
  cardContainer: {
    alignItems: 'center',
  },
  card: {
    width: wp('86.6%'),
    height: hp('25.3%'),
    backgroundColor: 'white',
    borderRadius: hp('2%'),
    paddingHorizontal: wp('8.8%'),
    paddingTop: hp('3%'),
    elevation: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  forgotPasswordText: {
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
    fontSize: hp('2.1%'),
    marginTop: hp('2.1%'),
  },
  buttonSignIn: {
    width: wp('86.6%'),
    marginTop: hp('2.3%'),
  },
  textSignIn: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
    letterSpacing: 1.33,
  },
  buttonCreateAccount: {
    width: wp('86.6%'),
    justifyContent: 'flex-end',
    height: hp('23.5%'),
  },
  textCreateAccount: {
    color: '#164486',
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
    letterSpacing: 1.33,
  },
  containerCreateAccount: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: hp('29.5%'),
    paddingBottom: hp('8.35%'),
  },
});
