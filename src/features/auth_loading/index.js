import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  AsyncStorage
} from 'react-native';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const isPortrait = () => {
  const dim = Dimensions.get('window');
  if (dim.height >= dim.width) {
    return true;
  } else {
    return false;
  }
};
export default class AuthLoading extends Component {
  variab = null;
  constructor(props) {
    super(props);
    
    this._bootstrapAsync();
    this.state = {
      orientation: isPortrait(),
      value: null
    };
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = () => {
    // const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    setTimeout(() => {
      this._retrieveData();
      
      this.props.navigation.navigate(false ? 'App' : 'Auth');
    }, 2000);
  };

  //ADDED FOR RETRIEVING USER SAVE TO REDIRECT TO CASHSCREEN
  _retrieveData() {
    console.log('1');
    console.log(this.variab);
      AsyncStorage.getItem('UsersData').then((token) => {
        
    // Update State
    // this.setState({ 
    //   value: token
    // });
        this.variab = token;

  });
  } 
/*
  async _retrieveData() {
    const value = null;
    try {
      console.log('BEFORE RETRIEVING')
      // value = await AsyncStorage.getItem('@UsersData');
      AsyncStorage.setItem('testing','asd');
      console.log(AsyncStorage.getItem('testing'))
      console.log('---------')
      console.log(AsyncStorage.getItem('@UsersData'))
      if (value !== null) {
        console.log(JSON.parse(value))
        return JSON.parse(value)
      }
    } catch (error) {
      console.log('ERROR ON RETRIEVING USER DATA')
    }
    console.log(JSON.parse(value));
    return null;
  }*/

  render() {
    return (
      <ImageBackground
        source={
          this.state.orientation
            ? require('../../assets/images/bg/loadingBackground.png')
            : require('../../assets/images/bg/loadingBackgroundLandscape.png')
        }
        style={styles.backgroundImage}
        resizeMode={'stretch'}
      >
        <View style={styles.centerAnimation}>
          <Image
            style={{
              width: this.state.orientation ? wp('45.8%') : wp('29.2%'),
              resizeMode: 'contain',
            }}
            source={require('../../assets/images/bg/epaisa_logo.png')}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    //backgroundColor: '#fff',
  },
  centerAnimation: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#fff',
  },
});
