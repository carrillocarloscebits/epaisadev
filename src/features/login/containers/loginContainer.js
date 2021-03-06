import { connect } from 'react-redux';
import Login from '../login';
import { login, failureAlertHide } from './../actions';

const mapStateToProps = state => ({
  auth: state.login,
});

const mapDispatchToProps = dispatch => ({
  login: (email, password, signature) => {
    dispatch(login(email, password, signature));
  },
  failureHide: () => {
    dispatch(failureAlertHide());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
