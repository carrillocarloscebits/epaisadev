import {userConstants} from 'api/auth/constants';
import * as userService from '../../../services/user_service';
import NavigationService from './../../../services/navigation';
import {APP} from './../../../navigation/screen_names';

export function create_account(userData) {
    return dispatch => {
        dispatch(request());
        userService.create_account(userData)
        .then((res) => {
            console.log(res)
            const {success} = res;
            if(success) {
                // const {success, ...user} = res;
                dispatch(successRegister());
                // NavigationService.navigate(APP)
            } else {
                const {message} = res;
                dispatch(failure(message));
            }
        })
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
    function successRegister() { return { type: userConstants.REGISTER_SUCCESS } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
