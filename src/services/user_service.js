import { 
    sendRequest,
    encryptJson,
    encryptJsonCreateUser,
    encryptJsonCredentials,
    encryptForgotPassword,
    encryptOtpVerify,
    encryptResetPassword
} from '../services/server-api';

export function login(email, password) {
    const returnEncrypt = encryptJson(email, password);
    return sendRequest(returnEncrypt,'/user/login');
}

export function create_account(userData) {
    
    var returnEncrypt = encryptJsonCreateUser(userData);

    return sendRequest(returnEncrypt,'/user/register')
}

export function check_email(email) {

    var returnEncrypt = encryptJsonCredentials(email, null);

    return sendRequest(returnEncrypt, '/user/check').then(({response}) => {
        const {username} = response;

        return {
            exists: username.exists,
            errors: username.exists ? [] : [username.message]
        }
    })
}

export function check_mobile(mobile) {

    var returnEncrypt = encryptJsonCredentials(null, mobile);

    return sendRequest(returnEncrypt, '/user/check').then(({response}) => {
        const {mobile} = response;
        return {
            exists: mobile.exists,
            errors: mobile.exists ? [] : [mobile.message]
        }
    })
}

export function opt_send(value, key) {
    var returnEncrypt = encryptForgotPassword(JSON.stringify({[key]: value}));

    return sendRequest(returnEncrypt, '/user/forgotpassword')
}

export function validate_otp(mobile, otp) {
    var returnEncrypt = encryptOtpVerify(mobile, otp);
    var direction = "/user/validateotp";

    return sendRequest(returnEncrypt, direction);
}

export function reset_password(mobile, otp, password, auth_key) {
    
    var returnEncrypt = encryptResetPassword(mobile, otp, password, auth_key);
    var direction = "/user/forgotpassword";

    return sendRequest(returnEncrypt, direction)
}