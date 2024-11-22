import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
} from 'react-native';

import { allLogo } from "../../Assets";
import { toDp } from "../../Helper/percentageToDP";

import * as NavigatorService from "../../Helper/NavigatorServices";
import CustomText from "../../Components/CustomText";

const { width, height } = Dimensions.get('window');
const LandingPage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor={'transparent'} />
      <Image source={allLogo.imgLanding} style={styles.imgLanding} />
      <Image source={allLogo.logo} style={styles.logo} />
      <View style={styles.content}>
        <CustomText textType="bold" style={styles.textTitle}>
          Welcome to
        </CustomText>
        <CustomText textType="bold" style={[styles.textTitle, { color: '#5AAA0F' }]}>
          Central Connect
        </CustomText>
        <CustomText textType="regular" style={styles.textSilahkan}>
          Silahkan...
        </CustomText>
        <TouchableOpacity
          style={styles.touchLogin}
          onPress={() => NavigatorService.navigate('Login')}
        >
          <CustomText textType="semibold" style={styles.textLogin}>
            Login
          </CustomText>
        </TouchableOpacity>
        <CustomText textType="regular" style={styles.textAtau}>
          Atau
        </CustomText>
        <TouchableOpacity
          style={styles.touchRegister}
          onPress={() => NavigatorService.navigate('Register')}
        >
          <CustomText textType="semibold" style={[styles.textLogin, { color: '#5AAA0F' }]}>
            Register
          </CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: toDp(200),
    height: toDp(200),
  },
  content: {
    marginLeft: toDp(30),
  },
  textTitle: {
    fontSize: toDp(32),
    color: '#383B34',
  },
  textSilahkan: {
    fontSize: toDp(16),
    color: '#5E6157',
    marginTop: toDp(15),
  },
  textLogin: {
    fontSize: toDp(14),
    color: 'white',
  },
  touchLogin: {
    width: toDp(300),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: toDp(45),
  },
  touchRegister: {
    width: toDp(300),
    height: toDp(40),
    backgroundColor: 'white',
    borderRadius: toDp(10),
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAtau: {
    color: '#5E6157',
    fontSize: toDp(14),
    marginTop: toDp(15),
    marginBottom: toDp(12),
    width: toDp(300),
    textAlign: 'center',
  },
  imgLanding: {
    width,
    height,
    position: 'absolute',
    bottom: 0,
  },
});

export default LandingPage;
