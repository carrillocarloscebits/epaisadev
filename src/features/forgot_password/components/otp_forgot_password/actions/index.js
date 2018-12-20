import * as user_service from 'services/user_service';
import {userConstants} from 'api/auth/constants';

export const validate_otp = (mobile, otp) => {
    
    const request = () => ({type: userConstants.OTP_VALIDATION_REQUEST})
    const successValidate = (payload) => ({type: userConstants.OTP_VALIDATION_SUCCESS, payload})
    const failureValidate = (payload) => ({type: userConstants.OTP_VALIDATION_FAILURE, payload})

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
    
    const request = () => ({type: userConstants.OTP_MOBILE_REQUEST})
    const successValidate = () => ({type: userConstants.OTP_MOBILE_SUCCESS})

    return (dispatch) => {
        dispatch(request());
        
        user_service.opt_send(mobile, 'mobile')
        .then((res) => {
            console.log(res)
            dispatch(successValidate())
        })
        .catch(err => {
            console.log(err)
        })
    }
    
}