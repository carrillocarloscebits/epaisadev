import { connect } from "react-redux";
import Login from "../login";
import {login} from './../actions';
import {failureAlertHide} from './../actions/hideAction';

const mapStateToProps = state => ({
    auth: state.login,
});

const mapDispatchToProps = dispatch => ({
    login: (email, password, signature) => { dispatch(login(email, password, signature)) },
    failureHide : () => {dispatch(failureAlertHide())}
});

export default connect(mapStateToProps, mapDispatchToProps)(
    Login
);
