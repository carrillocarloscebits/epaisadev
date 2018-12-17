import { Provider } from 'react-redux';
import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import store from './myStore';
import AppNavigator from './navigation/navigators';
import NavigationService from './services/navigation';

export default class Root extends Component {
  // _didFocusSubscription;
  // _willBlurSubscription;

  constructor(props){
    super(props)
    // this._didFocusSubscription = props.navigation.addListener('didFocus', (payload) => {
    //   return BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    // });
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}