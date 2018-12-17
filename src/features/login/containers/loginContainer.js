import { connect } from "react-redux";
import Login from "../login";
import {login} from './../actions';

const mapStateToProps = state => ({
    auth: state.login,
});

const mapDispatchToProps = dispatch => ({
    login: (email, password) => { dispatch(login(email, password))}
});

export default connect(mapStateToProps, mapDispatchToProps)(
    Login
);
