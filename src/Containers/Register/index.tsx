import { allLogo } from '@src/Assets';
import CustomComboBox from '@src/Components/CustomComboBox';
import CustomText from '@src/Components/CustomText';
import CustomTextInput from '@src/Components/CustomTextInput';
import Loader from '@src/Components/Loader';
import { toDp } from '@src/Helper/percentageToDP';
import { getUnits, getUnitsFloors, getUnitsTower, postUsersRegister } from '@src/Services/Apis';
import React, { useEffect, useRef, useState } from 'react';
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
import Modal from 'react-native-modal';
import * as NavigatorService from '../../Helper/NavigatorServices';

const { width, height } = Dimensions.get('window');
const RegisterScreen = ({ navigation }: any) => {
  const fullNameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();
  const [viewState, setViewState] = useState({
    isShowSuccessModal: false,
    isShowFailModal: false,
    isLoading: false,
    isSecureTextEntry: true,
    isSecureConfirmPassEntry: true,
    isDarkMode: false,
    isRegister: true,
    isAgree: false,
  });

  const [formState, setFormState] = useState({
    fullname: '',
    email: '',
    noHp: '',
    password: '',
    confirmPass: '',
  });

  const [formAddress, setFormAddress] = useState({
    apartment: 'CentralConnect',
    tower: {
      id: '',
      name: '',
    },
    lantai: '',
    unit: '',
    unitId: '',
    syarat: false,
  });

  const [listAddress, setListAdress] = useState({
    arrTower: [],
    arrFloors: [],
    arrUnits: [],
    arrIdUnits: [],
  });

  const [errorFormState, setErrorFormState] = useState({
    errorFullname: '',
    errorEmail: '',
    errorNoHp: '',
    errorPassword: '',
    errorComfirmPass: '',
  });

  useEffect(() => {
    if (formAddress.tower?.id !== '') {
      getUnitsFloors('?cluster_id=' + formAddress.tower?.id)
        .then((response: any) => {
          let arrFloors: any = [];
          for (var i = 0; i < response.data.units.length; i++) {
            arrFloors.push(response.data.units[i].block);
          }
          setListAdress((prevState) => ({
            ...prevState,
            arrFloors,
          }));
          setFormAddress((prevState) => ({ ...prevState, lantai: '', unit: '' }));
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [formAddress.tower]);

  useEffect(() => {
    if (formAddress.lantai !== '') {
      getUnits('?cluster_id=' + formAddress.tower?.id + '&block=' + formAddress.lantai)
        .then((response: any) => {
          console.log('getUnits', response);
          let arrUnits: any = [];
          let arrIdUnits: any = [];
          for (var i = 0; i < response.data.units.length; i++) {
            arrIdUnits.push(response.data.units[i]);
            arrUnits.push(response.data.units[i].unit_name);
          }
          setListAdress((prevState) => ({
            ...prevState,
            arrUnits,
            arrIdUnits,
          }));
          setFormAddress((prevState) => ({ ...prevState, unit: '' }));
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [formAddress.lantai]);

  useEffect(() => {
    getUnitsTower('')
      .then((response: any) => {
        let tempTower: any = [];
        for (var i = 0; i < response.data.length; i++) {
          tempTower.push({
            id: response.data[i].id,
            name: response.data[i].name,
          });
        }
        setListAdress((prevState) => ({
          ...prevState,
          arrTower: tempTower,
        }));
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const handleForm = (value: any, type: any) => {
    setFormState((prevState) => ({
      ...prevState,
      [type]: type === 'noHp' ? value.replace(/[^0-9]/g, '') : value,
    }));
  };

  const handleSelectAddress = (value: any, type: any) => {
    if (type === 'unit') {
      let unitId = '';
      for (var i = 0; i < listAddress.arrIdUnits.length; i++) {
        // @ts-expect-error TS(2339): Property 'unit_name' does not exist on type 'never... Remove this comment to see the full error message
        if (listAddress.arrIdUnits[i].unit_name === value) {
          // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
          unitId = listAddress.arrIdUnits[i].id;
        }
      }
      setFormAddress((prevState) => ({
        ...prevState,
        unitId,
        unit: value,
      }));
    } else {
      setFormAddress((prevState) => ({
        ...prevState,
        [type]: value,
      }));
    }
  };

  const validateEmail = (email: any) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleNext = () => {
    if (!validateEmail(formState.email)) {
      setErrorFormState((prevState) => ({ ...prevState, errorEmail: 'Format email salah.' }));
    } else if (formState.password.length < 6) {
      setErrorFormState((prevState) => ({
        ...prevState,
        errorPassword: 'Password minimal 6 karakter.',
      }));
    } else if (formState.password != formState.confirmPass) {
      setErrorFormState((prevState) => ({
        ...prevState,
        errorComfirmPass: 'Password baru yang dimasukkan tidak sesuai.',
      }));
    } else {
      setViewState((prevState) => ({ ...prevState, isRegister: false }));
    }

    console.log('error form', errorFormState);
  };

  const handleRegister = () => {
    let data = {
      name: formState.fullname,
      email: formState.email,
      phone: formState.noHp,
      password: formState.password,
      unit_id: formAddress.unitId,
    };
    setViewState((prevState) => ({ ...prevState, isLoading: true }));
    postUsersRegister(data)
      .then((response: any) => {
        console.log('success', response);
        setViewState((prevState) => ({ ...prevState, isLoading: false, isShowSuccessModal: true }));
      })
      .catch((error: any) => {
        console.log('error', error);
        if (error.data.name === 'EmailAlreadyExistError') {
          setViewState((prevState) => ({
            ...prevState,
            isRegister: true,
            isLoading: false,
          }));
          setErrorFormState((prevState) => ({
            ...prevState,
            errorEmail: 'Email telah terdaftar',
          }));
        } else if (error.data.name === 'UserLimitReachedError') {
          setViewState((prevState) => ({
            ...prevState,
            isLoading: false,
            isShowFailModal: true,
          }));
        } else {
          setViewState((prevState) => ({
            ...prevState,
            isLoading: false,
          }));
        }
      });
  };

  const RegisterView = () => {
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={'padding'} enabled={Platform.OS === 'ios' ? true : false}>
          <ScrollView>
            <View style={styles.header}>
              <TouchableOpacity style={styles.touchLupa} onPress={() => navigation.goBack()}>
                <CustomText textType="semibold" style={[styles.textLupa]}>
                  Login
                </CustomText>
              </TouchableOpacity>
              <Image
                source={allLogo.logo}
                // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
                style={[styles.logo, { tintColor: viewState.darkMode && 'white' }]}
              />
            </View>

            <CustomText textType="semibold" style={[styles.textLupaPassword]}>
              REGISTER
            </CustomText>
            <View style={styles.content}>
              <View style={styles.viewTextTitle}>
                <CustomTextInput
                  inputRef={fullNameRef}
                  title={'Nama Lengkap'}
                  placeholder={'Masukan nama lengkap (sesuai KTP)'}
                  error={errorFormState.errorFullname}
                  value={formState.fullname}
                  returnKeyType="next"
                  onChangeText={(value: any) => handleForm(value, 'fullname')}
                  onSubmitEditing={() => {
                    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                    emailRef.current.focus();
                  }}
                />
                <View style={{ height: toDp(16) }} />
                <CustomTextInput
                  inputRef={emailRef}
                  title={'Email'}
                  placeholder={'Masukkan alamat email'}
                  error={errorFormState.errorEmail}
                  value={formState.email}
                  returnKeyType="next"
                  onChangeText={(value: any) => handleForm(value, 'email')}
                  keyboardType={'email-address'}
                  onSubmitEditing={() => {
                    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                    phoneRef.current.focus();
                  }}
                />
                <View style={{ height: toDp(16) }} />
                <CustomTextInput
                  inputRef={phoneRef}
                  title={'No handphone'}
                  placeholder={'Masukkan no handphone'}
                  error={errorFormState.errorNoHp}
                  value={formState.noHp}
                  returnKeyType="next"
                  onChangeText={(value: any) => handleForm(value, 'noHp')}
                  maxLength={13}
                  keyboardType={'phone-pad'}
                  onSubmitEditing={() => {
                    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                    passwordRef.current.focus();
                  }}
                />
                <View style={{ height: toDp(16) }} />
                <CustomTextInput
                  inputRef={passwordRef}
                  title={'Password'}
                  placeholder={'Masukkan password'}
                  value={formState.password}
                  error={errorFormState.errorPassword}
                  onChangeText={(value: any) => handleForm(value, 'password')}
                  autoCapitalize={'none'}
                  type="password"
                  returnKeyType={'next'}
                  maxLength={23}
                  secureTextEntry={viewState.isSecureTextEntry}
                  onChangeSecure={() => {
                    setViewState((prevState) => ({
                      ...prevState,
                      isSecureTextEntry: !prevState.isSecureTextEntry,
                    }));
                  }}
                  onSubmitEditing={() => {
                    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
                    confirmPassRef.current.focus();
                  }}
                />
                <View style={{ height: toDp(16) }} />
                <CustomTextInput
                  inputRef={confirmPassRef}
                  title={'Konfirmasi password'}
                  placeholder={'Masukkan konfirmasi password'}
                  value={formState.confirmPass}
                  error={errorFormState.errorComfirmPass}
                  onChangeText={(value: any) => {
                    handleForm(value, 'confirmPass');
                  }}
                  autoCapitalize={'none'}
                  type="password"
                  returnKeyType={'next'}
                  maxLength={23}
                  secureTextEntry={viewState.isSecureConfirmPassEntry}
                  onChangeSecure={() => {
                    setViewState((prevState) => ({
                      ...prevState,
                      isSecureConfirmPassEntry: !prevState.isSecureConfirmPassEntry,
                    }));
                  }}
                />
                <View style={{ height: toDp(24) }} />

                {formState.fullname.trim() === '' ||
                formState.email.trim() === '' ||
                formState.noHp.trim() === '' ||
                formState.password.trim() === '' ||
                formState.confirmPass.trim() === '' ? (
                  <View style={[styles.touchKirim, { backgroundColor: '#d3d6db' }]}>
                    <CustomText textType="semibold" style={styles.textKirim}>
                      Lanjut
                    </CustomText>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleNext()}
                    style={[styles.touchKirim, { backgroundColor: '#5AAA0F' }]}
                  >
                    <CustomText textType="semibold" style={styles.textKirim}>
                      Lanjut
                    </CustomText>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  };

  const AddressView = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity style={styles.touchLupa} onPress={() => navigation.goBack()}>
              <CustomText textType="semibold" style={[styles.textLupa]}>
                Login
              </CustomText>
            </TouchableOpacity>
            <Image source={allLogo.logo} style={[styles.logo]} />
          </View>

          <View style={styles.center}>
            <CustomText textType="semibold" style={[styles.textTitle]}>
              ALAMAT UNIT
            </CustomText>
          </View>
          <ScrollView>
            <View style={styles.content}>
              <View style={styles.viewTextTitle}>
                <CustomComboBox
                  // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
                  darkMode={viewState.darkMode}
                  title={'Cluster/Jalan'}
                  desc={''}
                  textPlaceholder={'Pilih cluster/jalan'}
                  value={formAddress.tower?.name}
                  arrayData={listAddress.arrTower}
                  onSelected={(item: any, index: any) => handleSelectAddress(item, 'tower')}
                />

                <View style={{ height: toDp(16) }} />
                {listAddress.arrFloors.length !== 0 && (
                  <CustomComboBox
                    // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
                    darkMode={viewState.darkMode}
                    editable={false}
                    title={'Blok'}
                    desc={''}
                    textPlaceholder={'Pilih blok'}
                    value={formAddress.lantai}
                    arrayData={listAddress.arrFloors}
                    onSelected={(item: any, index: any) => handleSelectAddress(item, 'lantai')}
                  />
                )}
                <View style={{ height: toDp(16) }} />
                {listAddress.arrUnits.length !== 0 && (
                  <CustomComboBox
                    // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
                    darkMode={viewState.darkMode}
                    editable={false}
                    title={'Unit'}
                    desc={''}
                    textPlaceholder={'Pilih unit'}
                    value={formAddress.unit}
                    arrayData={listAddress.arrUnits}
                    onSelected={(item: any, index: any) => handleSelectAddress(item, 'unit')}
                  />
                )}
                <View style={{ height: toDp(16) }} />

                <View style={styles.footerKetentuan}>
                  <TouchableOpacity
                    onPress={() =>
                      setViewState((prevState) => ({ ...prevState, isAgree: !viewState.isAgree }))
                    }
                  >
                    <Image
                      source={
                        viewState.isAgree ? allLogo.icCheckboxChecked : allLogo.icCheckboxUnChecked
                      }
                      style={styles.icCheckbox}
                    />
                  </TouchableOpacity>
                  <CustomText style={[styles.textSyarat]}>
                    Saya setuju dengan{' '}
                    <CustomText
                      textType={'medium'}
                      onPress={() => NavigatorService.navigate('Agreement')}
                      style={styles.textKetentuan}
                    >
                      syarat & ketentuan
                    </CustomText>
                    {'\n'}yang berlaku.
                  </CustomText>
                </View>

                <View style={styles.footerButton}>
                  <TouchableOpacity
                    onPress={() =>
                      setViewState((prevState) => ({ ...prevState, isRegister: true }))
                    }
                    style={[
                      styles.touchKirim,
                      {
                        flex: 1,
                        // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
                        backgroundColor: viewState.darkMode ? '#121212' : 'white',
                        borderRadius: toDp(10),
                        borderWidth: toDp(1),
                        borderColor: '#5AAA0F',
                      },
                    ]}
                  >
                    <CustomText
                      textType={'semibold'}
                      style={[styles.textKirim, { color: '#5AAA0F' }]}
                    >
                      Kembali
                    </CustomText>
                  </TouchableOpacity>
                  <View style={{ width: toDp(10) }} />
                  {formAddress.apartment === '' ||
                  // @ts-expect-error TS(2367): This condition will always return 'false' since th... Remove this comment to see the full error message
                  formAddress.tower === '' ||
                  formAddress.lantai === '' ||
                  formAddress.unit === '' ||
                  !viewState.isAgree ? (
                    <View style={[styles.touchKirim, { flex: 1, backgroundColor: '#d3d6db' }]}>
                      <CustomText textType="semibold" style={styles.textKirim}>
                        Daftar
                      </CustomText>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => handleRegister()}
                      style={[styles.touchKirim, { flex: 1, backgroundColor: '#5AAA0F' }]}
                    >
                      <CustomText textType="semibold" style={styles.textKirim}>
                        Daftar
                      </CustomText>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    );
  };

  const SuccessModalView = () => {
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
              REGISTER BERHASIL
            </CustomText>
            <CustomText style={styles.textDescModal}>Akun anda telah berhasil dibuat</CustomText>
            <TouchableOpacity
              onPress={() => {
                setViewState((prevState) => ({ ...prevState, isShowSuccessModal: false }));
                NavigatorService.reset('Login');
              }}
              style={styles.touchKembaliKeLogin}
            >
              <CustomText style={styles.textKembaliKeLogin}>Kembali ke login</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const FailModalView = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={viewState.isShowFailModal}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View style={styles.modalBox}>
            <Image source={allLogo.icGagal} style={styles.icGagal} />
            <CustomText
              textType="semibold"
              style={[styles.textTitleModal, { marginTop: toDp(16) }]}
            >
              REGISTER GAGAL
            </CustomText>
            <CustomText style={[styles.textDescModal, { width: '85%', textAlign: 'center' }]}>
              Maaf, unit yang Anda daftarkan sudah terisi penuh. Silahkan hubungi pengelola untuk
              informasi lebih lanjut.
            </CustomText>
            <TouchableOpacity
              onPress={() =>
                setViewState((prevState) => ({ ...prevState, isShowFailModal: false }))
              }
              style={styles.touchKembaliKeLogin}
            >
              <CustomText textType="semibold" style={styles.textKembaliKeLogin}>
                KEMBALI
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar
        // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
        barStyle={viewState.darkMode ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <Loader loading={viewState.isLoading} />
      <SuccessModalView />
      <FailModalView />
      {viewState.isRegister ? RegisterView() : AddressView()}
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
    marginHorizontal: toDp(30),
    marginTop: toDp(20),
  },
  logo: {
    width: toDp(120),
    height: toDp(120),
  },
  touchLupa: {
    borderRadius: toDp(10),
    borderWidth: toDp(1),
    paddingHorizontal: toDp(31),
    paddingVertical: toDp(10),
    borderColor: '#5AAA0F',
    height: toDp(42),
    color: '#5AAA0F',
  },
  textLupa: {
    fontSize: toDp(14),
    color: '#5AAA0F',
  },
  touchKirim: {
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
    letterSpacing: toDp(0.7),
  },
  textLupaPassword: {
    marginLeft: toDp(30),
    fontSize: toDp(16),
    color: '#263238',
    fontStyle: 'normal',
    letterSpacing: toDp(1),
  },
  content: {
    padding: toDp(32),
  },
  viewTextTitle: {
    width: width * 0.82,
  },
  center: {
    alignItems: 'center',
  },
  textTitle: {
    marginTop: toDp(20),
    fontSize: toDp(16),
    color: '#263238',
    fontStyle: 'normal',
    letterSpacing: toDp(1),
  },
  logoDone: {
    marginTop: toDp(16),
    width: toDp(150),
    height: toDp(66.5),
  },
  contentDone: {
    marginTop: toDp(60),
    alignItems: 'center',
    paddingHorizontal: toDp(30),
  },
  successForget: {
    width: toDp(200),
    height: toDp(185.9),
  },
  textMessage: {
    marginTop: toDp(16),
    fontSize: toDp(14),
    //   fontFamily: 'Montserrat-Regular',
    color: '#263238',
    fontStyle: 'normal',
  },
  footerKetentuan: {
    flexDirection: 'row',
    paddingRight: toDp(8),
  },
  icCheckbox: {
    width: toDp(20),
    height: toDp(20),
  },
  textSyarat: {
    marginLeft: toDp(10),
    fontSize: toDp(12),
    //   fontFamily: 'Montserrat-Regular',
    color: '#273238',
  },
  textKetentuan: {
    //   fontFamily: 'Montserrat-SemiBold',
    color: '#5AAA0F',
  },
  footerButton: {
    flexDirection: 'row',
    marginTop: toDp(24),
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
    marginTop: toDp(48),
  },
  textDescModal: {
    fontSize: toDp(12),
    color: '#263238',
    marginTop: toDp(16),
  },
  icSuccess: {
    width: toDp(80),
    height: toDp(80),
    marginTop: toDp(32),
    tintColor: '#5AAA0F',
  },
  icGagal: {
    width: toDp(80),
    height: toDp(80),
    marginTop: toDp(32),
  },
  touchKembaliKeLogin: {
    marginTop: toDp(40),
    width: toDp(200),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKembaliKeLogin: {
    fontSize: toDp(14),
    color: '#FFFFFF',
    letterSpacing: toDp(0.2),
  },
});

export default RegisterScreen;
