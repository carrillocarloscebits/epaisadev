import * as user_service from 'services/user_service';
import {userConstants} from 'api/auth/constants';
import NavigationService from 'services/navigation';
import {LOGIN} from 'navigation/screen_names';

export const validate_otp = (mobile, otp) => {
    
    const request         = () => ({type: userConstants.OTP_VALIDATION_REQUEST})
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

export const reset_password = (mobile, otp, password, auth_key) => {
    const request       = () => ({type: userConstants.RESET_PASSWORD_REQUEST})
    const successReset  = (payload) => ({type: userConstants.RESET_PASSWORD_SUCCESS, payload})
    const failureReset  = (payload) => ({type: userConstants.RESET_PASSWORD_FAILURE, payload})
    const dismissAlert  = () => ({ type: userConstants.RESET_PASSWORD_ALERT_DISMISS })


    return (dispatch) => {
        dispatch(request())
        user_service.reset_password(mobile, otp, password, auth_key)
        .then((res) => {
            if(res.success) {
                dispatch(successReset({
                    show_otp: false,
                    alert: ['Password reset successfully.'],
                    dismissAlert: () => {
                        dispatch(dismissAlert())
                        NavigationService.navigate(LOGIN)
                    }
                }))
            } else {
                dispatch(failureReset({
                    alert: [res.message],
                    dismissAlert: () => {
                        dispatch(dismissAlert())
                    }
                }))
            }
        })
        .catch(() => {
            dispatch(failureReset())
        })
    }
}