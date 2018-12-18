import { combineReducers } from "redux";
import login from "../features/login/reducers";
import register from "../features/create_account/reducers";
import cashData from "../features/cash_register/reducers"
export default combineReducers({
  login, 
  register,
  cashData
});
