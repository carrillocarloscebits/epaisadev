import OtpForgotPassword from './../otp_forgot_password';
import { connect } from 'react-redux';
import {validate_otp, resend_otp, reset_password} from './../actions';

const mapStateToProps = (state) => ({
    reset_password: state.reset_password
})

const mapDispatchToProps = (dispatch) => ({
    validate_otp: (mobile, otp) => dispatch(validate_otp(mobile, otp)),
    resend_otp: (mobile) => dispatch(resend_otp(mobile)),
    reset_pass: (mobile, otp, password, auth_key) => dispatch(reset_password(mobile, otp, password, auth_key))
})

export default connect(mapStateToProps, mapDispatchToProps)(OtpForgotPassword)