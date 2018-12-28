import { userConstants } from 'api/auth/constants';
import * as userService from '../../../services/user_service';
// import NavigationService from './../../../services/navigation';
// import { APP } from './../../../navigation/screen_names';

export function create_account(userData) {
  return dispatch => {
    dispatch(requestRegister());

    userService
      .create_account(userData)
      .then(res => {
        console.log(res);
        const { success } = res;
        if (success) {
          // const {success, ...user} = res;
          dispatch(
            successRegister({
              mobile_number: `+${51}${userData.UserMobileNumber}`,
              auth_key: res.response.auth_key,
            })
          );
          // NavigationService.navigate(APP)
        } else {
          const { message } = res;
          dispatch(failureRegister(message));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(failureRegister('Network error, try again!'));
      });
  };

  function requestRegister() {
    return { type: userConstants.REGISTER_REQUEST };
  }
  function successRegister(payload) {
    return { type: userConstants.REGISTER_SUCCESS, payload };
  }
  function failureRegister(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

export const verify_otp = (auth_key, otp) => {
  const requestVerify = () => ({ type: userConstants.OTP_VERIFY_REQUEST });
  const successVerify = payload => ({
    type: userConstants.OTP_VERIFY_SUCCESS,
    payload,
  });
  const failureVerify = payload => ({
    type: userConstants.OTP_VERIFY_FAILURE,
    payload,
  });

  return dispatch => {
    dispatch(requestVerify());

    userService
      .verify_otp(auth_key, otp)
      .then(res => {
        console.log(res);
        if (res.success) {
          dispatch(
            successVerify({
              showAccountCreatedModal: true,
            })
          );
        } else {
          dispatch(failureVerify({ otp_invalid: true }));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const resend_otp = auth_key => {
  const requestResend = () => ({
    type: userConstants.RESEND_REGISTER_OTP_REQUEST,
  });
  //   const successResend = payload => ({
  //     type: userConstants.RESEND_REGISTER_OTP_SUCCESS,
  //     payload,
  //   });
  //   const failureResend = payload => ({
  //     type: userConstants.RESEND_REGISTER_OTP_FAILURE,
  //     payload,
  //   });

  return dispatch => {
    dispatch(requestResend());

    userService
      .resend_register_otp(auth_key)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
