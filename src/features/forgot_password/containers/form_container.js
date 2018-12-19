import {connect} from 'react-redux';
import {check_email} from './../actions';
import ForgotPasswordForm from './../components/forgot_password_form';
const mapStateToProps = state => {
    return {
        email: state.reset_password.email,
        mobile: state.reset_password.mobile,
    }
};

const mapDispatchToProps = dispatch => ({
    check_email: (email) => { dispatch(check_email(email))}
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ForgotPasswordForm
);
