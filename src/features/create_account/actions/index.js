import {userConstants} from 'api/auth/constants';
import * as userService from '../../../services/user_service';
import NavigationService from './../../../services/navigation';
import {APP} from './../../../navigation/screen_names';

export function create_account(userData) {
    return dispatch => {
        dispatch(request());
        
        setTimeout(() => {
            dispatch(successRegister({
                mobile_number: `+${51}${userData.UserMobileNumber}`
            }));
        }, 1000)


        // userService.create_account(userData)
        // .then((res) => {
        //     console.log(res)
        //     const {success} = res;
        //     if(success) {
        //         // const {success, ...user} = res;
        //         dispatch(successRegister({
        //             mobile_number: `+${51}${userData.UserMobileNumber}`
        //         }));
        //         // NavigationService.navigate(APP)
        //     } else {
        //         const {message} = res;
        //         dispatch(failure(message));
        //     }
        // })




        //     .then((res) => {
        //         const {success} = res;
        //         if(success) {
        //             const {success, ...user} = res;
        //             dispatch(successLogin(user));
        //             NavigationService.navigate(APP)
        //         } else {
        //             const {message} = res;
        //             dispatch(failureLogin(message));
        //         }
        //     }).catch((err) => {
        //         console.log(err)
        //         dispatch(failureLogin('Network error, try again!'));
        //     })

            // user => { 
            //     dispatch(success(user));
            //     history.push('/');
            // },
            // error => {
            //     dispatch(failure(error.toString()));
            //     dispatch(alertActions.error(error.toString()));
            // }
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST } }
    function successRegister(payload) { return { type: userConstants.REGISTER_SUCCESS, payload } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

export const validate_otp = (mobile, otp) => {
    
    const request         = () => ({type: userConstants.OTP_VALIDATION_REQUEST})
    const successValidate = (payload) => ({type: userConstants.OTP_VALIDATION_SUCCESS, payload})
    const failureValidate = (payload) => ({type: userConstants.OTP_VALIDATION_FAILURE, payload})
verifyAccPut = (numberValue) => {
    //added numberValue parameter, this.state.otpCode4 was sending it's declaration value, function called before setting new state value
    let fourDigitOtpCode = this.state.otpCode1 + this.state.otpCode2 + this.state.otpCode3 + numberValue //this.state.otpCode4
    console.log('consoleError OTP VALUE '+fourDigitOtpCode)
    var returnEncrypt = encryptJsonVerifyPut(authKey,fourDigitOtpCode);
    var direction = "/user/verify";
    sendRequestPut(returnEncrypt,direction).then((result)=>{
      let verify = result['success'];
      let err = result['message'];
      if (verify ==1) {
        this.setState({confirmationCodeSuccess: true});
        this.setState({confirmationCodeFail: false});
        clearInterval(interval)
        this.navigateToCash()
      }
      else {
        this.setState({confirmationCodeSuccess: false});
        this.setState({confirmationCodeFail: true});
        Keyboard.dismiss;
        Alert.alert('Error', err)
        console.log('consoleError'+err)
      }
    },()=>{
      Alert.alert('Error','Network Error, Please check your connection')
    })
  }
    return (dispatch) => {
        dispatch(request());
        
        user_service.validate_otp(mobile, otp)
        .then((res) => {
            console.log(res)
            if(res.success) {
                dispatch(successValidate({otp_code: otp, auth_key: res.response.auth_key}))
            } else {
                dispatch(failureValidate({otp_invalid: true}))
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    
}

export const resend_otp = (mobile) => {
    
    const request         = () => ({type: userConstants.OTP_MOBILE_REQUEST})
    const successValidate = () => ({type: userConstants.OTP_MOBILE_SUCCESS})
    const failureValidate = () => ({type: userConstants.OTP_MOBILE_FAILURE})

    return (dispatch) => {
        dispatch(request());
        
        user_service.opt_send(mobile, 'mobile')
        .then((res) => {
            console.log(res)
            dispatch(successValidate())
        })
        .catch(err => {
            console.log(err)
            dispatch(failureValidate(['Network error, try again!']));
        })
    }
    
}