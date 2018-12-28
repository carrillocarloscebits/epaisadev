import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
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
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.state = {
      orientation: isPortrait(),
    };
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = () => {
    // const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    setTimeout(() => {
      this.props.navigation.navigate(false ? 'App' : 'Auth');
    }, 2000);
  };

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
