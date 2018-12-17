import { connect } from "react-redux";
import CreateAccount from "../create_account";
import {create_account} from './../actions';

const mapStateToProps = ({register}) => ({
    register
});

const mapDispatchToProps = dispatch => ({
    create_account: (userData) => { dispatch(create_account(userData))}
});

export default connect(mapStateToProps, mapDispatchToProps)(
    CreateAccount
);
