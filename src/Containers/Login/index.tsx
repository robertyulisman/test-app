import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import DeviceInfo from 'react-native-device-info';
import { postLogin } from '../../Services/Apis';

import { allLogo } from '../../Assets';
import CustomText from '../../Components/CustomText';
import CustomTextInput from '../../Components/CustomTextInput';
import Loader from '../../Components/Loader';
import * as NavigatorService from '../../Helper/NavigatorServices';
import { toDp } from '../../Helper/percentageToDP';

const { width, height } = Dimensions.get('window');

import messaging from '@react-native-firebase/messaging';

const Login = ({ navigation }: any) => {
  const [state, setState] = useState({
    secureTextEntry: true,
    isLoading: false,
    isDarkMode: false,
  });

  const [form, setForm] = useState({
    //email: Platform.OS === 'android' ? 'dleader.zaii@gmail.com' : 'admin.bod@mailinator.com', password: Platform.OS === 'android' ? '123456' : 'qlue1234',
    // @ts-expect-error TS(2304): Cannot find name '__DEV__'.
    email: __DEV__ ? 'desainku1092@gmail.com' : '',
    // @ts-expect-error TS(2304): Cannot find name '__DEV__'.
    password: __DEV__ ? '123456' : '',
    //email: 'admin.bod@mailinator.com' , password: 'qlue1234',
    //email: __DEV__ ? 'smarthome@givmail.com' : '' , password: __DEV__ ? 'qlue1234' : '',
    //email: __DEV__ ? 'qaqlue.pengelola@givmail.com' : '' , password: __DEV__ ? 'qlue1234' : '',
    //email: __DEV__ ? 'qaqlue.township@givmail.com' : '' , password: __DEV__ ? 'qlue1234' : '',

    // email: Platform.OS === 'android' ? 'qaqlue2.township@givmail.com' : 'qaqlue.pengelola@givmail.com', password: 'qlue1234',
    //email: Platform.OS === 'ios' ? 'dleader.zaii@gmail.com' : 'qaqlue.pengelola@givmail.com', password: Platform.OS === 'ios' ? 'admin1234' : 'qlue1234',
    //email: true ? 'dleader.zaii@gmail.com' : 'qaqlue.pengelola@givmail.com', password: true ? '123456' : 'qlue1234',
    // email: 'admin.bod@mailinator.com', password: 'qlue1234',

    //email: __DEV__ ? 'qaqlue.pengelola@givmail.com' : '' , password: __DEV__ ? 'qlue1234' : '',
    //email: __DEV__ ? 'email.qa@givmail.com' : '' , password: __DEV__ ? 'qlue1234' : '',
    //email: __DEV__ ? 'zaiidleader@qlue.id' : '' , password: __DEV__ ? '123456' : '',

    //email: 'qaqlue.pengelola@givmail.com'  , password: 'qlue1234' ,

    //email: '' , password: '',
    fcmToken: '',
    deviceId: '',
  });

  useEffect(() => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        console.log('fcmToken', fcmToken);
        setForm((state) => ({ ...state, fcmToken }));
      })
      .catch((error) => {
        console.log('error getToken', error);
      });
    DeviceInfo.getUniqueId()
      .then((deviceId) => {
        setForm((state) => ({ ...state, deviceId }));
      })
      .catch((error) => {
        console.log('error getUniqueId', error);
      });
  }, []);

  const [errorForm, setErrorForm] = useState({
    errorEmail: '',
    errorPassword: '',
  });

  useEffect(() => {
    if (form.email.trim() === '') {
      // setErrorForm(prevState => ({
      //   ...prevState, errorEmail: "Field ini tidak boleh kosong."
      // }))
    } else {
      setErrorForm((prevState) => ({
        ...prevState,
        errorEmail: '',
      }));
    }
  }, [form]);

  const handleForm = (value: any, type: any) => {
    setForm((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const validateEmail = (email: any) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    if (form.email.trim() === '' && form.password.trim() === '') {
      setErrorForm((prevState) => ({
        ...prevState,
        errorEmail: 'Field ini tidak boleh kosong.',
        errorPassword: 'Field ini tidak boleh kosong.',
      }));
    } else if (form.email.trim() === '') {
      setErrorForm((prevState) => ({
        ...prevState,
        errorEmail: 'Field ini tidak boleh kosong.',
        errorPassword: '',
      }));
    } else if (!validateEmail(form.email)) {
      setErrorForm((prevState) => ({
        ...prevState,
        errorEmail: 'Format email salah.',
        errorPassword: '',
      }));
    } else if (form.password.trim() === '') {
      setErrorForm((prevState) => ({
        ...prevState,
        errorEmail: '',
        errorPassword: 'Field ini tidak boleh kosong.',
      }));
    } else {
      request(form.email, form.password, form.fcmToken, form.deviceId);
    }
  };

  const request = async (email: any, password: any, fcmToken: any, deviceId: any) => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    let body = {
      email,
      password,
      fcm_token: fcmToken,
      platform: 'mobile',
      device_id: deviceId,
    };
    postLogin(body)
      .then((response) => {
        console.log('response', response);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
        let topic = 'centralconnect_' + Platform.OS;

        console.log('topic', topic);
        messaging()
          .subscribeToTopic(topic)
          .then((response) => {
            console.log('response', response);
          })
          .catch((error) => {
            console.log('error', error);
          });

        /*messaging().subscribeToTopic('cobasaja').then(response => {
        console.log('response',response)
      }).catch(error => {
        console.log('error', error)
      })*/

        AsyncStorage.setItem(
          'token',
          response.data.token.type + ' ' + response.data.token.access_token,
        );
        AsyncStorage.setItem(
          'refresh',
          response.data.token.type + ' ' + response.data.token.refresh_token,
        );
        AsyncStorage.setItem('dataUser', JSON.stringify(response.data.profile));
        AsyncStorage.setItem('features', JSON.stringify(response.data.feature));
        AsyncStorage.setItem('fcmToken', fcmToken);
        AsyncStorage.setItem('deviceId', deviceId);
        if (response.data.unit === null && response.data.profile.is_a_resident) {
          console.log('masuk SetUnit');
          NavigatorService.reset('SetUnit');
        } else {
          console.log('masuk HomePage');
          AsyncStorage.setItem('unit', JSON.stringify(response.data.unit));
          NavigatorService.reset('Home');
        }
      })
      .catch((error) => {
        console.log('error.status', error);
        let errorPassword = '';
        if (error.status === 400) {
          if (error.data.message === 'Email is not registered') {
            errorPassword = 'Email tidak terdaftar.';
          } else {
            errorPassword = 'Akun anda sedang dalam verifikasi.';
          }
        } else if (error.status === 401) {
          errorPassword = 'Email atau password salah.';
        } else {
          errorPassword = 'Tolong dicoba kembali.';
        }
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
        setErrorForm((prevState) => ({
          ...prevState,
          errorPassword,
        }));
      });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: state.isDarkMode ? '#121212' : 'white' }]}
    >
      <StatusBar
        barStyle={state.isDarkMode ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <Loader loading={state.isLoading} />

      <ScrollView>
        <KeyboardAvoidingView behavior={'padding'} enabled={Platform.OS === 'ios' ? true : false}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={allLogo.logo}
              style={[styles.logo, { tintColor: state.isDarkMode && ('white' as any) }]}
            />
            <CustomText
              textType="semibold"
              style={[styles.textLogin, { color: state.isDarkMode ? 'white' : '#263238' }]}
            >
              LOGIN
            </CustomText>

            <View style={styles.content}>
              <View style={styles.viewTextTitle}>
                <CustomTextInput
                  title={'Email'}
                  placeholder={'Masukkan alamat email Anda disini'}
                  error={errorForm.errorEmail}
                  value={form.email}
                  onChangeText={(value: any) => handleForm(value, 'email')}
                  keyboardType={'email-address'}
                />
                <View style={{ height: toDp(24) }} />
                <CustomTextInput
                  title={'Password'}
                  placeholder={'Masukkan password Anda disini'}
                  value={form.password}
                  error={errorForm.errorPassword}
                  autoCapitalize={'none'}
                  type="password"
                  returnKeyType={'next'}
                  maxLength={23}
                  secureTextEntry={state.secureTextEntry}
                  onChangeText={(value: any) => handleForm(value, 'password')}
                  onChangeSecure={() => {
                    setState((state) => ({
                      ...state,
                      secureTextEntry: !state.secureTextEntry,
                    }));
                  }}
                />
              </View>

              <TouchableOpacity
                style={styles.touchLupa}
                onPress={() => NavigatorService.navigate('ForgotPass')}
              >
                <CustomText textType="semibold" style={styles.textLupa}>
                  Lupa Password?
                </CustomText>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <TouchableOpacity style={styles.touchLogin} onPress={() => handleLogin()}>
                <CustomText textType="semibold" style={styles.text}>
                  Login
                </CustomText>
              </TouchableOpacity>
              <View style={styles.viewAtau}>
                <CustomText
                  style={[styles.textAtau, { color: state.isDarkMode ? 'white' : '#5E6157' }]}
                >
                  Belum punya akun?
                </CustomText>
              </View>
              <TouchableOpacity
                style={styles.touchRegister}
                onPress={() => NavigatorService.navigate('Register')}
              >
                <CustomText textType="semibold" style={styles.textLupa}>
                  Register
                </CustomText>
              </TouchableOpacity>
            </View>
            <View style={{ height: toDp(48) }} />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? toDp(28) : 0,
  },
  systemBar: {
    width,
    height: toDp(20),
    backgroundColor: '#5AAA0F',
  },
  logo: {
    width: toDp(394 / 3.5),
    height: toDp(409 / 3.5),
    marginTop: toDp(16),
    resizeMode: 'contain',
    alignSelf: 'flex-end',
    marginRight: toDp(30),
  },
  textLogin: {
    fontSize: toDp(16),
    color: '#263238',
    fontStyle: 'normal',
    letterSpacing: toDp(1),
    alignSelf: 'flex-start',
    marginLeft: toDp(30),
  },
  content: {
    paddingHorizontal: toDp(32),
    paddingTop: toDp(32),
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
    width: toDp(124),
  },
  textLupa: {
    fontSize: toDp(14),
    color: '#5AAA0F',
    fontStyle: 'normal',
  },
  footer: {},
  touchLogin: {
    width: width * 0.82,
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    // borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: toDp(1),
    borderRadius: 10,
    borderColor: '#5AAA0F',
    marginTop: toDp(20),
  },
  text: {
    fontSize: toDp(14),
    color: 'white',
    fontStyle: 'normal',
    letterSpacing: toDp(0.7),
  },
  viewAtau: {
    marginTop: toDp(40),
  },
  textAtau: {
    fontSize: toDp(12),
    color: '#5E6157',
  },
  touchRegister: {
    alignItems: 'center',
    borderColor: '#5AAA0F',
    borderWidth: toDp(1),
    borderRadius: 10,
    marginTop: toDp(12),
    height: toDp(40),
    justifyContent: 'center',
  },
});

export default Login;
