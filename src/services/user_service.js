import {
  sendRequest,
  encryptJson,
  encryptJsonCreateUser,
  encryptJsonCredentials,
  encryptForgotPassword,
  encryptOtpVerify,
  encryptResetPassword,
  sendRequestPut,
  encryptJsonVerifyPut,
  encryptJsonVerifyPost,
  encryptMerchantFingerPrintToken,
} from '../services/server-api';
import { AsyncStorage } from 'react-native';
export function login(email, password) {
  const returnEncrypt = encryptJson(email, password);
  return sendRequest(returnEncrypt, '/user/login');
}

export function create_account(userData) {
  var returnEncrypt = encryptJsonCreateUser(userData);

  return sendRequest(returnEncrypt, '/user/register');
}

export function check_email(email) {
  var returnEncrypt = encryptJsonCredentials(email, null);

  return sendRequest(returnEncrypt, '/user/check').then(({ response }) => {
    const { username } = response;

    return {
      exists: username.exists,
      errors: username.exists ? [] : [username.message],
    };
  });
}

export function check_mobile(mobile) {
  var returnEncrypt = encryptJsonCredentials(null, mobile);

  return sendRequest(returnEncrypt, '/user/check').then(({ response }) => {
    const { mobile } = response;
    return {
      exists: mobile.exists,
      errors: mobile.exists ? [] : [mobile.message],
    };
  });
}

export function opt_send(value, key) {
  var returnEncrypt = encryptForgotPassword(JSON.stringify({ [key]: value }));

  return sendRequest(returnEncrypt, '/user/forgotpassword');
}

export function validate_otp(mobile, otp) {
  var returnEncrypt = encryptOtpVerify(mobile, otp);
  var direction = '/user/validateotp';

  return sendRequest(returnEncrypt, direction);
}

export function reset_password(mobile, otp, password, auth_key) {
  var returnEncrypt = encryptResetPassword(mobile, otp, password, auth_key);
  var direction = '/user/forgotpassword';

  return sendRequest(returnEncrypt, direction);
}

export function verify_otp(auth_key, otp) {
  var returnEncrypt = encryptJsonVerifyPut(auth_key, otp);
  var direction = '/user/verify';

  return sendRequestPut(returnEncrypt, direction);
}

export function resend_register_otp(auth_key) {
  var returnEncrypt = encryptJsonVerifyPost(auth_key);
  var direction = '/user/verify';

  return sendRequest(returnEncrypt, direction);
}

export function register_fingerprint_token(user_id, token, auth_key) {
  var returnEncrypt = encryptMerchantFingerPrintToken(user_id, token, auth_key);

  return sendRequest(returnEncrypt, '/fingerprint/register');
}

export async function get_user_country() {
  try {
    const userLocation = await AsyncStorage.getItem('@PhoneLocation');

    if (JSON.parse(userLocation)) {
      return JSON.parse(userLocation);
    } else {
      const url =
        'http://api.ipstack.com/check?access_key=eae5590f3a37ea38fc1a863c3a7685e0&format=1';
      const res = await fetch(url);
      const json = await res.json();
      const data = {
        ...json,
        location: {
          ...json.location,
          country_flag: `https://www.countryflags.io/${json.country_code.toLowerCase()}/flat/64.png`,
        },
      };
      await AsyncStorage.setItem('@PhoneLocation', JSON.stringify(data));
      return json;
    }
  } catch (error) {
    return Promise.reject(error);
  }
}
