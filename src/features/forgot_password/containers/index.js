import { connect } from "react-redux";
import ForgotPassword from "../forgot_password";
import {check_email} from './../actions';

const mapStateToProps = state => ({
    reset_password: state.reset_password,
});

const mapDispatchToProps = dispatch => ({
    check_email: (email) => { dispatch(check_email(email))}
});

export default connect(mapStateToProps, mapDispatchToProps)(
    ForgotPassword
);
