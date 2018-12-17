import {userConstants} from 'api/auth/constants';
let initialState = {}

const authData = (state = initialState, action) => {
    initialState = state;
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                registering: true
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                otp: true
            };
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
};

export default authData;