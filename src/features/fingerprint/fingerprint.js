import React, {Component} from 'react';
import {View, StyleSheet,Text, AsyncStorage} from 'react-native';
import BackgroundImage from './components/BackgroundImage/backgroundImage';
import Footer from './components/Footer/footer';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FingerContainer from './components/FingerContainer/fingerContainer';
import {FingerprintModal} from 'components';
import { isTablet } from '../cash_register/constants/isLandscape';
import {CASH_REGISTER} from 'navigation/screen_names';
import {connect} from 'react-redux';
import Biometrics from 'react-native-biometrics';

class FingerPrint extends Component{
    static navigationOptions = {
        header: null
    }
    state={
        modalActive: false,
        status: 'normal'
    }
    toggleModalFinger = (status, callback) => {
        this.setState({
            modalActive: !this.state.modalActive,
            status: status || 'normal'
        }, () => {
            if(callback) callback();
            console.log(this.state)
        })
    }

    _rejectLinkFingerprint = () => {
        const userId = this.props.user.response.id;

        AsyncStorage.getItem(`@UsersLogged`).then((item) => {
            let value = JSON.parse(item)
            prevData = value[userId] ? value[userId] : {};
            value[userId] = {
                fingerprintLinkRejected: true,
                ...prevData
            }
            this.props.navigation.replace(CASH_REGISTER)
            AsyncStorage.setItem('@UsersLogged', JSON.stringify(value))
        })
        .catch((err) => {
            // Error saving data
            console.log(err)
            this.props.navigation.replace(CASH_REGISTER)
        })
    }

    _acceptLinkFingerprint = () => {
        Biometrics.isSensorAvailable()
        .then((biometryType) => {
            if(biometryType === Biometrics.TouchID) {
                this.toggleModalFinger('normal', () => {
                    Biometrics.createSignature('Register Fingerprint', 'keyToEncript')
                    .then((signature) => {
                        this.setState({status: 'success'})
                        const userId = this.props.user.response.id;
                        AsyncStorage.getItem('@UsersLogged:Fingerprint').then(item => {
                            const users = JSON.parse(item);
                            let exists;
                            if(Array.isArray(users)) {
                                exists = users.find((user) => user === userId)
                            }
                            AsyncStorage.setItem(`@UsersLogged:Fingerprint`, JSON.stringify(
                                exists ? [...users, userId] : [userId]
                            ));
                        })
                        setTimeout(() => {
                            this.props.navigation.replace(CASH_REGISTER)
                        }, 1000)
                        console.log(signature)
                    })
                });
            }else{
                this.fingerprintError('no fingerprint scanner');
            }
        })
        .catch((err) => {
            this.fingerprintError(err);
        })
    }

    fingerprintError = (err) => {
        this.toggleModalFinger('error')
        console.log(err)
    }


  render() {

    return(
        <View style={styles.container}>
            <BackgroundImage source={require("./assets/img/side_nav_portrait_faded.png")} />
                {
                    isTablet?
                    <View style={styles.wrapper}>
                        <Text style={[styles.textDown,{fontSize: hp('2%'),fontFamily:"Montserrat-SemiBold"}]}>All of the fingerprints stores on this device can be used to log into your ePaisa account.</Text>
                    </View>
                    :
                    <View style={styles.wrapper}>
                        <Text style={styles.textDown}>All of the fingerprints stores on this device can be used to</Text>
                        <Text style={styles.textDown}>log into your ePaisa account.</Text>
                    </View>
                }
            <Footer 
                linkFingerprint={this._acceptLinkFingerprint}
                onReject={this._rejectLinkFingerprint}
            />
            <FingerContainer/>
            {this.state.modalActive && <FingerprintModal 
                action={this.changeStatus}
                status={this.state.status}
                cancel={() => this.setState({modalActive: false})}
            />}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  wrapper:{
      width:"100%",
      height:hp('89%'),
      alignItems:'center',
      justifyContent:'flex-end',
      paddingBottom: hp('1.5%'),
  },
  textDown:{
      textAlign:'center',
      fontSize: hp('1.4%'),
      fontFamily:"Montserrat-Bold",
      color:'#575B64'
  }
  
});
const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.login.user
    }
};

export default connect(mapStateToProps)(FingerPrint)