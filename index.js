import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import CodePush from 'react-native-code-push';
import 'react-native-gesture-handler';
import { name as appName } from './app.json';
import App from './src';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
  AsyncStorage.setItem('notification', JSON.stringify(remoteMessage));
});

const MainScreen = () => {
  React.useEffect(() => {
    CodePush.sync({
      updateDialog: Platform.OS === 'android',
      installMode: CodePush.InstallMode.IMMEDIATE,
    });
  }, []);
  return <App />;
};

let codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  installMode: CodePush.InstallMode.IMMEDIATE,
};

let pushMainScreen = CodePush(codePushOptions)(MainScreen);

export default pushMainScreen;

AppRegistry.registerComponent(appName, () => pushMainScreen);
