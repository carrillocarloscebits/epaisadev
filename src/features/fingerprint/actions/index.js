import * as userService from '../../../services/user_service';
import {AsyncStorage} from 'react-native';

export const register_fingerprint = (user_id, token, auth_key) => {
    const requestRegister = () => ({ type: 'REQUEST_REGISTER_FINGERPRINT'})
    return (dispatch) => {
        dispatch(requestRegister());
        userService.register_fingerprint_token(user_id, token, auth_key)
        .then(res => {
            console.log(res)
            AsyncStorage.getItem('@UsersLogged:Fingerprint').then(item => {
                const users = JSON.parse(item);
                let exists;
                if(Array.isArray(users)) {
                    exists = users.find((user) => user === user_id)
                }
                AsyncStorage.setItem(`@UsersLogged:Fingerprint`, JSON.stringify(
                    exists ? [...users, user_id] : [user_id]
                ));
            })
        })
    }
}