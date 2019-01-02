import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import BackgroundImage from './components/BackgroundImage/backgroundImage';
import Footer from './components/Footer/footer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FingerContainer from './components/FingerContainer/fingerContainer';
import { FingerprintModal } from 'components';
import { isTablet } from '../cash_register/constants/isLandscape';
import { CASH_REGISTER } from 'navigation/screen_names';
import { connect } from 'react-redux';
import Biometrics from 'react-native-biometrics';
import { register_fingerprint } from './actions';
import AndroidOpenSettings from 'react-native-android-open-settings'

class FingerPrint extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    modalActive: false,
    status: 'normal',
  };
  toggleModalFinger = (status, callback) => {
    this.setState(
      {
        modalActive: !this.state.modalActive,
        status: status || 'normal',
      },
      () => {
        if (callback) callback();
        console.log(this.state);
      }
    );
  };

  _rejectLinkFingerprint = () => {
    const userId = this.props.user.response.id;

    AsyncStorage.getItem(`@UsersLogged`)
      .then(item => {
        let value = JSON.parse(item);
        prevData = value[userId] ? value[userId] : {};
        value[userId] = {
          fingerprintLinkRejected: true,
          ...prevData,
        };
        this.props.navigation.replace(CASH_REGISTER);
        AsyncStorage.setItem('@UsersLogged', JSON.stringify(value));
      })
      .catch(err => {
        // Error saving data
        console.log(err);
        this.props.navigation.replace(CASH_REGISTER);
      });
  };

  _acceptLinkFingerprint = async () => {
    try {
      const isSensor = await Biometrics.isSensorAvailable();
      if (isSensor === Biometrics.TouchID) {
        const publicKey = await Biometrics.createKeys('register');
        this.props.register_fingerprint(
          this.props.user.response.id,
          publicKey,
          this.props.user.response.auth_key
        );
      } else {
        throw new Error('Fingerprint scanner not found');
      }
    } catch (error) {
      console.log(error);
      this.toggleModalFinger('error');
    }
  };

  fingerprintError = err => {
    this.toggleModalFinger('error');
    console.log(err);
  };

  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <BackgroundImage
          source={isTablet?require('./assets/img/backgroundL.png'):require('./assets/img/backgroundP.png')}
        />
        {isTablet ? (
          <View style={styles.wrapper}>
            <Text
              style={[
                styles.textDown,
                { fontSize: hp('2%'), fontFamily: 'Montserrat-SemiBold' },
              ]}
            >
              All of the fingerprints stored on this device can be used to log
              into your ePaisa account.
            </Text>
          </View>
        ) : (
          <View style={styles.wrapper}>
            <Text style={styles.textDown}>
              All of the fingerprints stored on this device can be used to
            </Text>
            <Text style={styles.textDown}>log into your ePaisa account.</Text>
          </View>
        )}
        <Footer
          linkFingerprint={this._acceptLinkFingerprint}
          onReject={this._rejectLinkFingerprint}
        />
        <FingerContainer />
        {this.state.modalActive && (
          <FingerprintModal
            action={this.changeStatus}
            status={this.state.status}
            openSettings={()=> AndroidOpenSettings.securitySettings()}
            cancel={() => this.setState({ modalActive: false })}
            notNow={() => this.setState({ modalActive: false })}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    height: isTablet ? hp('85') : hp('89%'),
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: hp('1.5%'),
  },
  textDown: {
    textAlign: 'center',
    fontSize: hp('1.4%'),
    fontFamily: 'Montserrat-Bold',
    color: '#575B64',
  },
});
const mapStateToProps = state => {
  console.log(state);
  return {
    user: state.login.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register_fingerprint: (user_id, token, auth_key) =>
      dispatch(register_fingerprint(user_id, token, auth_key)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FingerPrint);
