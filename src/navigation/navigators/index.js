import * as screenNames from "../screen_names";
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';

// SCREENS
import LoginContainer from "../../features/login/containers/loginContainer";
import CreateAccount from "../../features/create_account/containers/create_account_container";
import ForgotPassword from "../../features/forgot_password";
import Inside from "../../features/inside";
import AuthLoading from "../../features/auth_loading";
  
const AuthStack = createStackNavigator({
  [screenNames.LOGIN]: {
    screen: LoginContainer
  },
  [screenNames.CREATE_ACCOUNT]: {
    screen: CreateAccount,
  },
  [screenNames.FORGOT_PASSWORD]: {
    screen: ForgotPassword,
  }
}, {
  initialRouteName: screenNames.LOGIN
});

const AppStack = createStackNavigator({
  [screenNames.INSIDE_APP]: {
    screen: Inside,
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