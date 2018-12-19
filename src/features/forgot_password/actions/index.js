import {userConstants} from 'api/auth/constants';
import * as userService from '../../../services/user_service';
import NavigationService from './../../../services/navigation';
import {LOGIN} from './../../../navigation/screen_names';

export function check_email(email) {
    return async (dispatch) => {
        dispatch(request());
        const res = {
            email: null
        }
        try{
            res.email = await userService.check_email(email);

            if(res.email.exists) {
                dispatch(sendOpt(res))
                userService.opt_send(email, 'email').then(res => {
                    if(res.success) {
                        dispatch(sendOptSuccess({
                            alert: ['Check your registered email with', 'instructions to reset your password'],
                            dismissAlert: () => {
                                dispatch(dismissAlert())
                                NavigationService.navigate(LOGIN)
                            }
                        }))
                    }
                })
            } else {
                dispatch(failureCheck(res))
            }
        } catch (err) {
            res.email.errors = ['Network error, try again!'];
            dispatch(failureCheck(res));
        }
    };

    function request() { 
        return { type: userConstants.CHECK_EMAIL_REQUEST }
    }

    function failureCheck(payload) { return { type: userConstants.CHECK_EMAIL_FAILURE, payload } }
    function sendOpt(payload) { return { type: userConstants.OTP_EMAIL_REQUEST, payload } }
    function sendOptSuccess(payload) { return { type: userConstants.OTP_EMAIL_SUCCESS, payload } }
    function dismissAlert() { return { type: userConstants.OTP_EMAIL_ALERT_DISMISS } }
}
