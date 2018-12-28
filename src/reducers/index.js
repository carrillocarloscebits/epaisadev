import { combineReducers } from 'redux';
import login from '../features/login/reducers';
import register from '../features/create_account/reducers';
import cashData from '../features/cash_register/reducers';
import reset_password from '../features/forgot_password/reducers';
//import productsReducer from "../features/cash_register/components/EditProduct/reducers";
export default combineReducers({
  login,
  register,
  cashData,
  reset_password,
  //productsReducer
});
