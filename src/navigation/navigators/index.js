import * as screenNames from '../screen_names';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

// SCREENS
import LoginContainer from '../../features/login/containers/loginContainer';
import CreateAccount from '../../features/create_account/containers/create_account_container';
import ForgotPassword from '../../features/forgot_password/containers/';
import AuthLoading from '../../features/auth_loading';
import CashRegister from '../../features/cash_register/cashScreen';
import Fingerprint from '../../features/fingerprint/fingerprint';
import AccountCreated from '../../features/account_created/account_created';

const AuthStack = createStackNavigator(
  {
    [screenNames.LOGIN]: {
      screen: LoginContainer,
    },
    [screenNames.CREATE_ACCOUNT]: {
      screen: CreateAccount,
    },
    [screenNames.FORGOT_PASSWORD]: {
      screen: ForgotPassword,
    },
    [screenNames.ACCOUNT_CREATED]: {
      screen: AccountCreated,
    },
    [screenNames.CASH_REGISTER]: {
      screen: CashRegister,
    },
  },
  {
    initialRouteName: screenNames.CASH_REGISTER,
  }
);

const AppStack = createStackNavigator(
  {
    [screenNames.FINGERPRINT]: {
      screen: Fingerprint,
    },
    [screenNames.CASH_REGISTER]: {
      screen: CashRegister,
    },
  },
  {
    initialRouteName: screenNames.FINGERPRINT,
  }
);

const AppNavigator = createSwitchNavigator(
  {
    [screenNames.AUTH_LOADING]: {
      screen: AuthLoading,
    },
    Auth: AuthStack,
    App: AppStack,
  },
  {
    initialRouteName: screenNames.AUTH_LOADING,
  }
);

export default createAppContainer(AppNavigator);
