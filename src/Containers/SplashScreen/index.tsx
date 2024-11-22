import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { allLogo } from '@src/Assets';
import { toDp } from '@src/Helper/percentageToDP';
import React, { useEffect } from 'react';
import { Dimensions, Image, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import * as NavigatorService from '../../Helper/NavigatorServices';

const { width, height } = Dimensions.get('window');
const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      messaging()
        .requestPermission()
        .then((res1) => {
          console.log('res1', res1);
        })
        .catch((err1) => {
          console.log('err1', err1);
        });
      messaging()
        .registerDeviceForRemoteMessages()
        .then((res2) => {
          console.log('res2', res2);
        })
        .catch((err2) => {
          console.log('err2', err2);
        });
    }
  }, []);

  // @ts-expect-error TS(2345): Argument of type '() => Promise<void>' is not assi... Remove this comment to see the full error message
  useEffect(async () => {
    const token = await AsyncStorage.getItem('token');
    const unit = await AsyncStorage.getItem('unit');
    console.log('token', token);
    setTimeout(function () {
      if (token === null) {
        NavigatorService.reset('OnBoarding');
      } else if (unit === null) {
        NavigatorService.reset('SetUnit');
      } else {
        NavigatorService.reset('Home');
      }
    }, 2500);
  }, []);

  useEffect(() => {
    // database.ref('/version').on('value', (querySnapShot) => {
    //   let getVersion = DeviceInfo.getVersion();
    //   let version = parseInt(getVersion.replace('.', '').replace('.', ''));
    //   console.log('version', version);
    //   console.log('querySnapShot.val()', querySnapShot.val());
    // });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Image source={allLogo.splash} style={styles.splash} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemBar: {
    width,
    height: toDp(20),
    backgroundColor: '#5AAA0F',
  },
  splash: {
    width,
    height,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
