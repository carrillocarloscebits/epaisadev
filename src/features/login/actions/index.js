import {userConstants} from '../api/auth/constants';
import * as userService from '../services/user_service';
import NavigationService from '../../../services/navigation';
import {APP} from './../api/screen_names';

export function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then((res) => {
                const {success} = res;
                if(success) {
                    const {success, ...user} = res;
                    dispatch(successLogin(user));
                    NavigationService.navigate(APP)
                } else {
                    const {message} = res;
                    dispatch(failureLogin(message));
                }
            }).catch((err) => {
                console.log(err)
                dispatch(failureLogin('Network error, try again!'));
            })
    };

    function request(user) { 
            return { type: userConstants.LOGIN_REQUEST, user }
    }
    function successLogin(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failureLogin(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
