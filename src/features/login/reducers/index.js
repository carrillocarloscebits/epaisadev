import {userConstants} from './../api/constants';
let initialState = {}

const authData = (state = initialState, action) => {
    initialState = state;
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            console.log('on LOGIN_REQUEST')
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
        console.log('on LOGIN_SUCCESS')
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
        console.log('on LOGIN_FAILURE')
            return {};
        default:
            return state
    }
};

export default authData;