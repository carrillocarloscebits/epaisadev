import {userConstants} from './../../api/auth/constants';

let initialState = {}

const opt = (state = initialState, action) => {
    initialState = state;
    switch (action.type) {
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

export default opt;