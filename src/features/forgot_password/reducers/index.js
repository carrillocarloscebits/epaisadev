import {userConstants} from './../.././../api/auth/constants';

let initialState = {
    email: {
        errors: []
    },
    mobile: {
        errors: []
    }
}

const resetPass = (state = initialState, action) => {
    initialState = state;
    switch (action.type) {
        case userConstants.CHECK_EMAIL_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case userConstants.CHECK_EMAIL_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false
            };
        case userConstants.CHECK_EMAIL_FAILURE:
            return {
                ...state,
                ...action.payload,
                loading: false
            };
        case userConstants.OTP_EMAIL_REQUEST: 
            return {
                loading: true,
                ...state
            }
        case userConstants.OTP_EMAIL_SUCCESS: 
            return {
                loading: false,
                otpSent: true,
                otpData: {
                    to: 'email'
                },
                ...state
            }
        default:
            return state
    }
};

export default resetPass;