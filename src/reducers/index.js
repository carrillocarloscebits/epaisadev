import { combineReducers } from "redux";
import login from "../features/login/reducers";
import register from "../features/create_account/reducers";

export default combineReducers({
  login, 
  register
});
