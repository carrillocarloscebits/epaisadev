import * as screenNames from "../screen_names";
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';

// SCREENS
import LoginContainer from "../../features/login/containers/loginContainer";
import CreateAccount from "../../features/create_account/containers/create_account_container";
import ForgotPassword from "../../features/forgot_password/containers/";
import Inside from "../../features/inside";
import AuthLoading from "../../features/auth_loading";
import cashScreen from "../../features/cash_register/cashScreen";
import CashRegister from "../../features/cash_register/cashScreen";
  
const AuthStack = createStackNavigator({
  [screenNames.LOGIN]: {
    screen: LoginContainer
  },
  [screenNames.CREATE_ACCOUNT]: {
    screen: CreateAccount,
  },
  [screenNames.FORGOT_PASSWORD]: {
    screen: ForgotPassword,
  },
  //added for quick navigation
  [screenNames.CASH_REGISTER]: {
    screen: CashRegister,
  },
}, {
  //initialRouteName: screenNames.LOGIN
  initialRouteName: screenNames.CASH_REGISTER
});

const AppStack = createStackNavigator({
  [screenNames.CASH_REGISTER]: {
    screen: CashRegister,
  }
})

AppNavigator = createSwitchNavigator({
  [screenNames.AUTH_LOADING]: {
    screen: AuthLoading
  },
  Auth: AuthStack,
  App: AppStack
},
{
  initialRouteName: screenNames.AUTH_LOADING
})


export default createAppContainer(AppNavigator);