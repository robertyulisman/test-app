import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Modal from 'react-native-modal';
import { allLogo } from '../../Assets';
import CustomText from '../../Components/CustomText';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import * as NavigatorService from '../../Helper/NavigatorServices';
import { toDp } from '../../Helper/percentageToDP';

import CustomTextInput from '../../Components/CustomTextInput';
// import Toast, {DURATION} from '@Toast'

import { putResidentPassword } from '../../Services/Apis';
// import NetInfo from '@react-native-community/netinfo'

const { width, height } = Dimensions.get('window');

const ChangePasswordScreen = ({ navigation }: any) => {
  const refPassword = useRef();
  const refPasswordBaru = useRef<any>();
  const refConfirmPasswordBaru = useRef<any>();

  const [viewState, setViewState] = useState({
    isConnectionAvailable: false,
    isLoading: false,
    isDarkMode: false,
    isPasswordSecure: true,
    isNewPassSecure: true,
    isConfirmPassSecure: true,
    isShowSuccessModal: false,
    isSuccess: false,
  });

  const [formState, setFormState] = useState({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [formError, setFormError] = useState({
    errorPassword: '',
    errorNewPassword: '',
    errorConfirmPassword: '',
  });

  const handleForm = (value: any, type: any) => {
    setFormState((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleDone = () => {
    setViewState((prevState) => ({
      ...prevState,
      isShowSuccessModal: false,
    }));
  };

  useEffect(() => {
    if (viewState.isSuccess === true && viewState.isShowSuccessModal === false) {
      NavigatorService.reset('Home');
    }
  }, [viewState.isShowSuccessModal]);

  const ForgotSuccessView = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={viewState.isShowSuccessModal}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View style={styles.modalBox}>
            <Image source={allLogo.icSuccess} style={styles.icSuccess} />
            <CustomText textType="semibold" style={styles.textTitleModal}>
              PASSWORD BERHASIL DIUBAH
            </CustomText>
            <CustomText style={styles.textDescModal}>
              Password Anda telah berhasil diperbaharui
            </CustomText>
            <TouchableOpacity onPress={() => handleDone()} style={styles.touchKembaliKeLogin}>
              <CustomText textType="semibold" style={styles.textKembaliKeLogin}>
                Selesai
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const handleSimpan = async () => {
    if (formState.password.length < 6) {
      setFormError((prevState) => ({
        ...prevState,
        errorPassword: 'Password minimal 6 karakter.',
      }));
    } else if (formState.newPassword.length < 6) {
      setFormError((prevState) => ({
        ...prevState,
        errorNewPassword: 'Password baru minimal 6 karakter.',
      }));
    } else if (formState.newPassword !== formState.confirmPassword) {
      setFormError((prevState) => ({
        ...prevState,
        errorConfirmPassword: 'Password baru yang dimasukkan tidak sesuai.',
      }));
    } else {
      let body = {
        old_password: formState.password,
        new_password: formState.newPassword,
      };
      setViewState((prevState) => ({
        ...prevState,
        isLoading: true,
      }));

      putResidentPassword(body)
        .then((response) => {
          console.log(response);
          setViewState((prevState) => ({
            ...prevState,
            isLoading: false,
            isShowSuccessModal: true,
            isSuccess: true,
          }));
          setFormState({
            password: '',
            newPassword: '',
            confirmPassword: '',
          });
          setFormError({
            errorPassword: '',
            errorNewPassword: '',
            errorConfirmPassword: '',
          });
          Keyboard.dismiss();
        })
        .catch((error) => {
          console.log(error);
          setViewState((prevState) => ({
            ...prevState,
            isLoading: false,
          }));

          if (error.data.message === 'Old Password does not match.') {
            setFormError((prevState) => ({
              ...prevState,
              errorPassword: 'Password yang dimasukkan tidak sesuai.',
            }));
          } else {
            Alert.alert('' + error.status, '' + error.data.message);
          }
        });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: viewState.isDarkMode ? '#121212' : 'white' }]}
    >
      <StatusBar
        barStyle={viewState.isDarkMode ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <Header title={'Ubah Password'} onPress={() => navigation.goBack()} />
      <Loader loading={viewState.isLoading} />

      <ForgotSuccessView />
      <ScrollView style={styles.content}>
        <KeyboardAvoidingView behavior={'padding'} enabled={Platform.OS === 'ios' ? true : false}>
          <View style={styles.detailInfo}>
            <CustomTextInput
              inputRef={refPassword}
              title={'Password'}
              placeholder={'Masukkan password Anda disini'}
              value={formState.password}
              error={formError.errorPassword}
              autoCapitalize={'none'}
              type="password"
              returnKeyType={'next'}
              maxLength={23}
              secureTextEntry={viewState.isPasswordSecure}
              onChangeText={(value: any) => handleForm(value, 'password')}
              onChangeSecure={() => {
                setViewState((prevState) => ({
                  ...prevState,
                  isPasswordSecure: !prevState.isPasswordSecure,
                }));
              }}
              onSubmitEditing={() => {
                refPasswordBaru.current.focus();
              }}
            />
            <View style={{ height: toDp(24) }} />
            <CustomTextInput
              inputRef={refPasswordBaru}
              title={'Password baru'}
              placeholder={'Masukkan password baru disini'}
              value={formState.newPassword}
              error={formError.errorNewPassword}
              autoCapitalize={'none'}
              type="password"
              returnKeyType={'next'}
              maxLength={23}
              secureTextEntry={viewState.isNewPassSecure}
              onChangeText={(value: any) => handleForm(value, 'newPassword')}
              onChangeSecure={() => {
                setViewState((prevState) => ({
                  ...prevState,
                  isNewPassSecure: !prevState.isNewPassSecure,
                }));
              }}
              onSubmitEditing={() => {
                refConfirmPasswordBaru.current.focus();
              }}
            />
            <View style={{ height: toDp(24) }} />
            <CustomTextInput
              inputRef={refConfirmPasswordBaru}
              title={'Ketik ulang password baru'}
              placeholder={'Ketik ulang password baru disini'}
              value={formState.confirmPassword}
              error={formError.errorConfirmPassword}
              autoCapitalize={'none'}
              type="password"
              returnKeyType={'next'}
              maxLength={23}
              secureTextEntry={viewState.isConfirmPassSecure}
              onChangeText={(value: any) => handleForm(value, 'confirmPassword')}
              onChangeSecure={() => {
                setViewState((prevState) => ({
                  ...prevState,
                  isConfirmPassSecure: !prevState.isConfirmPassSecure,
                }));
              }}
            />
            <View style={{ height: toDp(24) }} />
            {formState.password.trim() === '' ||
            formState.newPassword.trim() === '' ||
            formState.confirmPassword.trim() === '' ? (
              <View style={[styles.touchKirim, { backgroundColor: '#d3d6db' }]}>
                <CustomText textType="semibold" style={styles.textKirim}>
                  Simpan
                </CustomText>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => handleSimpan()}
                style={[styles.touchKirim, { backgroundColor: '#5AAA0F' }]}
              >
                <CustomText textType="semibold" style={styles.textKirim}>
                  Simpan
                </CustomText>
              </TouchableOpacity>
            )}
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
    paddingTop: Platform.OS === 'android' ? toDp(28) : 0,
  },
  headeriOS: {
    width,
    height: toDp(20),
    backgroundColor: '#5AAA0F',
  },
  content: {
    flex: 1,
    padding: toDp(16),
  },
  detailInfo: {
    marginTop: toDp(8),
    paddingHorizontal: toDp(16),
    paddingTop: toDp(8),
    width: '100%',
    height: 'auto',
    borderRadius: toDp(6),
  },
  touchKirim: {
    width: '100%',
    height: toDp(40),
    backgroundColor: '#d3d6db',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',

    //marginHorizontal: toDp(20),
    //marginBottom: toDp(20),
    //width: '89%',
    //position: 'absolute',
    //bottom: 0
  },
  textKirim: {
    fontSize: toDp(14),
    color: 'white',
    fontStyle: 'normal',
    letterSpacing: toDp(0.7),
  },
  bottomModal: {
    //justifyContent: "flex-end",
    //margin: 0,
  },
  viewRootModal: {
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: toDp(280),
    height: toDp(335),
    backgroundColor: '#FFFFFF',
    borderRadius: toDp(4),
    alignItems: 'center',
  },
  textTitleModal: {
    fontSize: toDp(14),
    color: '#263238',
    letterSpacing: toDp(1),
    lineHeight: toDp(24),
    marginTop: toDp(25),
    width: toDp(200),
    textAlign: 'center',
  },
  textDescModal: {
    fontSize: toDp(12),
    //   fontFamily: 'Montserrat-Regular',
    color: '#263238',
    marginTop: toDp(4),
    width: toDp(210),
    textAlign: 'center',
    lineHeight: toDp(18),
  },
  icSuccess: {
    width: toDp(80),
    height: toDp(80),
    marginTop: toDp(32),
  },
  icGagal: {
    width: toDp(80),
    height: toDp(80),
    marginTop: toDp(32),
  },
  touchKembaliKeLogin: {
    marginTop: toDp(20),
    width: toDp(200),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKembaliKeLogin: {
    fontSize: toDp(14),
    color: '#FFFFFF',
    letterSpacing: toDp(0.7),
  },
});

export default ChangePasswordScreen;
