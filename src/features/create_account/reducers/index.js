import {userConstants} from 'api/auth/constants';
let initialState = {}

const authData = (state = initialState, action) => {
    initialState = state;
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {
                registering: true,
                ...action.payload
            };
        case userConstants.REGISTER_SUCCESS:
            return {
                ...state,
                ...action.payload,
                show_otp: true,
                registering: false,
                otp_valid: false,
                otp_invalid: false,
            };
        case userConstants.REGISTER_FAILURE:
            return {};
        default:
            return state
    }
};

export default authData;