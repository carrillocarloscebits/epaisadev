import { connect } from "react-redux";
import CreateAccount from "../create_account";
import {create_account, resend_otp, verify_otp} from './../actions';

const mapStateToProps = ({register}) => ({
    register
});

const mapDispatchToProps = dispatch => ({
    create_account: (userData) => { dispatch(create_account(userData))},
    verify_otp: (auth_key, otp) => dispatch(verify_otp(auth_key, otp)),
    resend_otp: (auth_key) => dispatch(resend_otp(auth_key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(
    CreateAccount
);
