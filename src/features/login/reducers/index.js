import {userConstants} from './../api/constants';
let initialState = {}

const authData = (state = initialState, action) => {
    initialState = state;
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        default:
            return state
    }
};

export default authData;