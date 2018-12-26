import { connect } from "react-redux";
import CreateAccount from "../create_account";
import {create_account, resend_otp, validate_otp} from './../actions';

const mapStateToProps = ({register}) => ({
    register
});

const mapDispatchToProps = dispatch => ({
    create_account: (userData) => { dispatch(create_account(userData))},
    validate_otp: (mobile, otp) => dispatch(validate_otp(mobile, otp)),
    resend_otp: (mobile) => dispatch(resend_otp(mobile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    CreateAccount
);
