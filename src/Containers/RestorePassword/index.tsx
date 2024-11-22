import { allLogo } from '@src/Assets';
import CustomTextInput from '@src/Components/CustomTextInput';
import { toDp } from '@src/Helper/percentageToDP';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const RestorePasswordScreen = ({ navigation }: any) => {
  const [viewState, setViewState] = useState({
    isDarkMode: false,
    isButtonActive: false,
  });

  const [formState, setFormState] = useState({
    newPassword: '',
    confirmPassword: '',
    isNewPassSecureTextEntry: false,
    isConfirmPassSecureTextEntry: false,
  });

  const [errorState, setErrorState] = useState({
    newPassError: '',
    confirmPassError: '',
  });

  const handleForm = (value: any, type: any) => {
    setFormState((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleSecureText = (type: any) => {
    setFormState((prevState) => ({
      ...prevState,
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      [type]: !prevState[type],
    }));
  };

  useEffect(() => {
    if (formState.confirmPassword.trim() === '' || formState.newPassword.trim() === '') {
      setViewState((prevState) => ({
        ...prevState,
        isButtonActive: false,
      }));
    } else {
      setViewState((prevState) => ({
        ...prevState,
        isButtonActive: true,
      }));
    }
  }, [formState]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={viewState.isDarkMode ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <ScrollView>
        <KeyboardAvoidingView
          behavior={'padding'}
          // @ts-expect-error TS(2304): Cannot find name 'Platform'.
          enabled={Platform.OS === 'ios' ? true : false}
        ></KeyboardAvoidingView>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={allLogo.logo}
            style={[styles.logo, { tintColor: viewState.isDarkMode && 'white' }]}
          />
          <Text style={[styles.textLogin, { color: viewState.isDarkMode && 'white' }]}>
            Atur ulang password
          </Text>
          <View style={styles.content}>
            <View style={styles.viewTextTitle}>
              <CustomTextInput
                title={'Password baru'}
                placeholder={'Masukkan password baru'}
                error={errorState.newPassError}
                value={formState.newPassword}
                onChangeText={(value: any) => handleForm(value, 'newPassword')}
                autoCapitalize={'none'}
                type="password"
                secureTextEntry={formState.isNewPassSecureTextEntry}
                onChangeSecure={() => handleSecureText('isNewPassSecureTextEntry')}
              />
              <View style={{ height: toDp(24) }} />
              <CustomTextInput
                title={'Konfirmasi password'}
                placeholder={'Masukkan ulang password baru'}
                value={formState.confirmPassword}
                error={errorState.confirmPassError}
                autoCapitalize={'none'}
                type="password"
                returnKeyType={'next'}
                maxLength={23}
                secureTextEntry={formState.isConfirmPassSecureTextEntry}
                onChangeText={(value: any) => handleForm(value, 'confirmPassword')}
                onChangeSecure={() => handleSecureText('isConfirmPassSecureTextEntry')}
              />
              <View style={{ height: toDp(24) }} />
            </View>
            <View style={styles.footer}>
              // @ts-expect-error TS(2304): Cannot find name 'handleLogin'.
              <TouchableOpacity style={styles.touchLogin} onPress={() => handleLogin()}>
                <Text style={styles.text}>Selesai</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // @ts-expect-error TS(2304): Cannot find name 'Platform'.
    paddingTop: Platform.OS === 'android' ? toDp(28) : 0,
  },
  systemBar: {
    width,
    height: toDp(20),
    backgroundColor: '#5AAA0F',
  },
  logo: {
    //width: toDp(180),
    //height: toDp(140),
    width: toDp(394 / 3.5),
    height: toDp(409 / 3.5),
    marginVertical: toDp(16),
    resizeMode: 'contain',
  },
  textLogin: {
    fontSize: toDp(14),
    // fontFamily: 'Montserrat-Bold',
    color: '#263238',
    fontStyle: 'normal',
    letterSpacing: toDp(2),
  },
  content: {
    padding: toDp(32),
    //marginTop: toDp(40)
  },
  viewTextTitle: {
    width: width * 0.82,
  },
  viewRow: {
    flexDirection: 'row',
  },
  touchEye: {
    padding: toDp(8),
    position: 'absolute',
    right: toDp(0),
    top: toDp(31.5),
    tintColor: '#B0BEC5',
  },
  icEye: {
    width: toDp(24),
    height: toDp(24),
  },
  touchLupa: {
    marginTop: toDp(20),
    paddingVertical: toDp(4),
  },
  textLupa: {
    fontSize: toDp(14),
    // fontFamily: 'Montserrat-SemiBold',
    color: '#5AAA0F',
    fontStyle: 'normal',
    letterSpacing: toDp(0.7),
  },
  footer: {},
  touchLogin: {
    width: width * 0.82,
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: toDp(14),
    // fontFamily: 'Montserrat-SemiBold',
    color: 'white',
    fontStyle: 'normal',
    letterSpacing: toDp(0.7),
  },
  viewAtau: {
    marginTop: toDp(20),
    marginBottom: toDp(30),
    alignItems: 'center',
  },
  textAtau: {
    fontSize: toDp(12),
    // fontFamily: 'Montserrat-Regular',
    color: '#263238',
    fontStyle: 'normal',
    letterSpacing: toDp(2),
  },
  touchRegister: {
    alignItems: 'center',
  },
});

export default RestorePasswordScreen;
