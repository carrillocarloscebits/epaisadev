import { userConstants } from '../api/auth/constants';
import { AsyncStorage } from 'react-native';
import * as userService from '../services/user_service';
import NavigationService from '../../../services/navigation';
import { FINGERPRINT, CASH_REGISTER } from './../api/screen_names';

export function login(email, password, signature) {
  return dispatch => {
    dispatch(request({ email }));

    loginUser(email, password, signature)
      .then(res => {
        const { success } = res;
        if (success) {
          
        console.log('SUCCESS DATA')
        console.log(res['response']['userLastName'].toString())
        AsyncStorage.setItem(
          `UsersData`,
          JSON.stringify({
            userData: {
              userLastName: res['response']['userLastName'].toString(),
            },
          })
        );

        AsyncStorage.getItem('UsersData').then((token) => {
        
          // Update State
          // this.setState({ 
          //   value: token
          // });
              console.log(token);
      
        });
        

          const { success, ...user } = res;
          dispatch(successLogin(user));

          const userId = user.response.id;
          AsyncStorage.getItem(`@UsersLogged`)
            .then(res => {
              const value = JSON.parse(res);
              console.log('DATA FROM RESPONSE - VALUE')
              console.log(value);
              if (!value) {
                AsyncStorage.setItem(
                  `@UsersLogged`,
                  JSON.stringify({
                    [userId]: {
                      firstLogin: new Date(),
                    },
                  })
                );
                return NavigationService.navigate(FINGERPRINT);
              }
              if (value[userId]) {
                console.log(value[userId]);
                // We have data!!
                if (value[userId].fingerprintLinkRejected) {
                  NavigationService.navigate(CASH_REGISTER);
                  //   NavigationService.navigate(FINGERPRINT);
                } else {
                  NavigationService.navigate(FINGERPRINT);
                }
              } else {
                AsyncStorage.setItem(
                  `@UsersLogged`,
                  JSON.stringify({
                    [userId]: {
                      firstLogin: new Date(),
                    },
                  })
                );
                NavigationService.navigate(FINGERPRINT);
              }
            })
            .catch(error => {
              // Error retrieving data
              console.log(error);
              NavigationService.navigate(FINGERPRINT);
            });
        } else {
          const { message } = res;
          dispatch(failureLogin(message));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch(failureLogin('Network error, try again!'));
      });
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function successLogin(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failureLogin(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }

  function loginUser(email, password, signature) {
    if (signature) {
      return userService.login_fingerprint(signature);
    } else {
      return userService.login(email, password);
    }
  }
}
