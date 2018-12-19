import {userConstants} from 'api/auth/constants';
import * as userService from '../../../services/user_service';
import NavigationService from './../../../services/navigation';
import {APP} from './../../../navigation/screen_names';

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
                userService.opt_send('+51917324872', 'mobile');
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
    function sendOpt(payload) { return { type: userConstants.OTP_EMAIL_REQUEST, payload } }
    function failureCheck(payload) { return { type: userConstants.CHECK_EMAIL_FAILURE, payload } }
}
