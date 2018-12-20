import OtpForgotPassword from './../otp_forgot_password';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    reset_password: state.reset_password
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(OtpForgotPassword)