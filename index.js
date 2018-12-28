/** @format */

import { AppRegistry, Dimensions, YellowBox } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import EStyleSheet from 'react-native-extended-stylesheet';
const getRem = () => {
  const width = Dimensions.get('window').width;
  if (width > 500) {
    return 14;
  } else if (width <= 320) {
    return 8;
  }
  return 10;
};
EStyleSheet.build({
  $rem: getRem(),
});

YellowBox.ignoreWarnings(['Remote debugger is in']);
AppRegistry.registerComponent(appName, () => App);
