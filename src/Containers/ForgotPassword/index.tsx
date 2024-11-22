import React, { useEffect } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { useState } from 'react';
import { allLogo } from '../../Assets';
import { toDp } from '../../Helper/percentageToDP';

import CustomText from '../../Components/CustomText';
import CustomTextInput from '../../Components/CustomTextInput';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';

import { postForgotPassword } from '../../Services/Apis';

const { width, height } = Dimensions.get('window');

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [viewState, setViewState] = useState<any>({
    isForgot: true,
    isDarkMode: false,
    isLoading: false,
    isTouch: false,
    isButtonActive: false,
    message: 'Email Berhasil Terkirim',
    backgroundColor: '#5AAA0F',
  });

  const [form, setForm] = useState({
    email: '',
  });

  const [errorForm, setErrorForm] = useState({
    errorEmail: '',
  });

  useEffect(() => {
    const isEmailEmpty = form.email === '';
    setViewState((prevState: any) => ({
      ...prevState,
      isButtonActive: !isEmailEmpty,
      backgroundColor: isEmailEmpty ? '#d3d6db' : '#5AAA0F',
    }));
  }, [form]);

  const handleEmail = (value: any) => {
    setForm((prevState) => ({
      email: value,
    }));
  };

  const validateEmail = (email: any) => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  const kirim = () => {
    //what to do:
    //check validation email format
    if (!validateEmail(form.email)) {
      setErrorForm({ errorEmail: 'Format email salah.' });
    } else {
      setViewState((prevState: any) => ({ ...prevState, isLoading: true }));
      postForgotPassword({ email: form.email })
        .then((response) => {
          console.log(response);
          setViewState((prevState: any) => ({
            ...prevState,
            isForgot: false,
            isTouch: true,
            isLoading: false,
            message: 'Email Berhasil Terkirim',
          }));
        })
        .catch((error) => {
          console.log(error);
          let errorEmail = error.data.message;
          if (errorEmail === 'Email does not registred.') {
            errorEmail = 'Email tidak terdaftar.';
          }
          setViewState((prevState: any) => ({ ...prevState, isLoading: false }));
          setErrorForm({ errorEmail });
        });
    }
    //error handler if format email false
    //hit API forgot pass
    //show success modal if success API response
    //error handler if email not registered
  };

  const ForgotSuccessView = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.contentDone}>
          <Image source={allLogo.icSuccess} style={styles.successForget} />
          <CustomText
            textType="semibold"
            style={[styles.textMessage, { color: viewState.isDarkMode ? 'white' : '#263238' }]}
          >
            {viewState.message}
          </CustomText>
          <CustomText
            style={[styles.textDesc, { color: viewState.isDarkMode ? 'white' : '#263238' }]}
          >
            {
              'Silakan cek email anda dan ikuti petunjuk untuk memulihkan kembali password akun Anda'
            }
          </CustomText>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.touchDoneKembali, { backgroundColor: '#5AAA0F' }]}
          >
            <CustomText textType="semibold" style={styles.textKirim}>
              Kembali ke halaman login
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const ForgotView = () => {
    return (
      <View>
        <Header title={'Lupa Password'} onPress={() => navigation.goBack()} />

        <CustomText
          style={[styles.textLupaPassword, { color: viewState.isDarkMode ? 'white' : '#263238' }]}
        >
          Silakan masukan alamat email untuk memulihkan kembali password akun anda
        </CustomText>
        <View style={styles.content}>
          <View style={styles.viewTextTitle}>
            <CustomTextInput
              title={'Email'}
              placeholder={'Masukkan alamat email'}
              error={errorForm.errorEmail}
              value={form.email}
              keyboardType={'email-address'}
              onChangeText={(value: any) => handleEmail(value)}
            />
          </View>
        </View>

        {viewState.isButtonActive ? (
          <TouchableOpacity
            onPress={() => kirim()}
            style={[styles.touchKirim, { backgroundColor: viewState.backgroundColor }]}
          >
            <CustomText textType="semibold" style={styles.textKirim}>
              Kirim
            </CustomText>
          </TouchableOpacity>
        ) : (
          <View style={[styles.touchKirim, { backgroundColor: viewState.backgroundColor }]}>
            <CustomText textType="semibold" style={styles.textKirim}>
              Kirim
            </CustomText>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: viewState.isDarkMode ? '#121212' : 'white' }]}
    >
      <StatusBar
        barStyle={viewState.darkMode ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <Loader loading={viewState.isLoading} />

      {viewState.isForgot ? ForgotView() : <ForgotSuccessView />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? toDp(28) : 0,
  },
  systemBar: {
    width,
    height: toDp(20),
    backgroundColor: '#5AAA0F',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: toDp(30),
    marginTop: toDp(20),
    //backgroundColor: 'cyan'
  },
  logo: {
    width: toDp(100),
    height: toDp(44.34),
    resizeMode: 'contain',
    //position: 'absolute',
    //right: toDp(30),
    //top: toDp(24)
  },
  touchLupa: {
    paddingVertical: toDp(4),
  },
  textLupa: {
    fontSize: toDp(14),

    color: '#5AAA0F',
    fontStyle: 'normal',
    letterSpacing: toDp(0.7),
  },
  touchKirim: {
    position: 'absolute',
    bottom: toDp(33),
    left: toDp(30),
    width: width * 0.82,
    height: toDp(40),
    backgroundColor: '#d3d6db',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKirim: {
    fontSize: toDp(14),

    color: 'white',
    fontStyle: 'normal',
  },
  textLupaPassword: {
    marginLeft: toDp(30),
    marginTop: toDp(24),
    fontSize: toDp(14),

    color: '#263238',
    fontStyle: 'normal',
  },
  content: {
    padding: toDp(32),
    //marginTop: toDp(40)
  },
  viewTextTitle: {
    width: width * 0.82,
    height: toDp(140),
  },

  logoDone: {
    marginVertical: toDp(24),
    resizeMode: 'contain',
    //width: toDp(180.4),
    //height: toDp(140),

    width: toDp(394 / 3),
    height: toDp(409 / 3),
  },
  contentDone: {
    //marginTop: toDp(60),
    alignItems: 'center',
    paddingHorizontal: toDp(20),
  },
  successForget: {
    width: toDp(70),
    height: toDp(70),
    resizeMode: 'contain',
    tintColor: '#5AAA0F',
  },
  textMessage: {
    marginTop: toDp(24),
    fontSize: toDp(16),
    color: '#263238',
    letterSpacing: toDp(1),
    textTransform: 'uppercase',
  },
  textDesc: {
    fontSize: toDp(14),
    color: '#263238',
    textAlign: 'center',
    marginTop: toDp(4),
  },
  touchDoneKembali: {
    width: width * 0.82,
    height: toDp(40),
    marginTop: toDp(20),
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForgotPasswordScreen;
