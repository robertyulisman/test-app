import AsyncStorage from '@react-native-async-storage/async-storage';
import { allLogo } from '@src/Assets';
import CustomText from '@src/Components/CustomText';
import CustomTextInput from '@src/Components/CustomTextInput';
import Loader from '@src/Components/Loader';
import Toast from '@src/Components/Toast';
import { toDp } from '@src/Helper/percentageToDP';
import { postUpload, putResidentEdit, putUserExitUnit } from '@src/Services/Apis';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import * as NavigatorService from '../../Helper/NavigatorServices';

const { width, height } = Dimensions.get('window');

const EditProfileScreen = (props: any) => {
  const toast = useRef(null);

  const [loading, setLoading] = useState({
    isLoading: false,
    loadingType: '',
  });
  const [isDarkMode, setDarkMode] = useState(false);
  const [viewState, setViewState] = useState({
    isModalVisible: false,
    isShowModalUnitInfo: false,
    isShowModalConfirm: false,
    isShowModalDelete: false,
  });
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    noHp: '',
    picture: '',
    bodyPicture: '',
    image_url: '',
    isResident: false,
  });
  const [fcmToken, setFcmToken] = useState('');
  const [unit, setUnit] = useState({});
  const [userData, setUserData] = useState({});
  const [errorForm, setErrorForm] = useState({
    errorFullname: '',
    errorEmail: '',
    errorNoHp: '',
    errorUnit: '',
  });
  const [options, setOptions] = useState({
    width: 200,
    height: 200,
    cropping: true,
    cropperCircleOverlay: true,
  });

  const handleForm = (value: any, type: any) => {
    setForm((prevState) => ({
      ...prevState,
      [type]:
        type === 'noHp'
          ? value.replace(/[^0-9]{1,10}$/g, '')
          : type === 'fullName'
          ? value.replace(/[\w\W]{1,30}/g, '')
          : value,
    }));
  };

  const handlePressUnit = () => {
    console.log('kepencet');
    setViewState((prevState) => ({ ...prevState, isShowModalUnitInfo: true }));
  };

  useEffect(() => {
    const fetchData = async () => {
      let dataUser = await AsyncStorage.getItem('dataUser');
      let unit = await AsyncStorage.getItem('unit');
      let fcmToken = await AsyncStorage.getItem('fcmToken');

      // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
      setUserData(JSON.parse(dataUser));
      // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
      setUnit(JSON.parse(unit));
      // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
      setFcmToken(fcmToken);
    };

    fetchData().catch(console.log('error'));
  }, []);

  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
      // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
      fullname: userData.name,
      // @ts-expect-error TS(2339): Property 'email' does not exist on type '{}'.
      email: userData.email,
      // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
      noHp: userData.phone,
      // @ts-expect-error TS(2339): Property 'image_url' does not exist on type '{}'.
      image_url: userData.image_url || '',
      // @ts-expect-error TS(2339): Property 'is_a_resident' does not exist on type '{... Remove this comment to see the full error message
      isResident: userData.is_a_resident,
    }));
  }, [userData]);

  useEffect(() => {}, [form.fullname, form.noHp]);

  const openCamera = () => {
    ImagePicker.openCamera(options)
      .then((response) => {
        processUpload(response);
      })
      .catch((err) => {
        console.log(err);
        if (
          err == 'Error: Required permission missing' ||
          err == 'User did not grant camera permission.'
        ) {
          Alert.alert(
            'Pengaturan',
            'Akses ambil foto belum diaktifkan.\nBerikan akses untuk memulai mengambil gambar. Aktifkan akses ambil foto dari Pengaturan.',
            [
              { text: 'Nanti Saja', onPress: () => console.log('Cancel') },
              {
                text: 'Aktifkan',
                onPress: () => {
                  Linking.openSettings();
                },
              },
            ],
            { cancelable: false },
          );
        }
      });
  };

  const openGallery = () => {
    ImagePicker.openPicker(options)
      .then((response) => {
        processUpload(response);
      })
      .catch((err) => {
        console.log(err);
        if (
          err == 'Error: Required permission missing' ||
          err ==
            'Error: Cannot access images. Please allow access if you want to be able to select images.'
        ) {
          Alert.alert(
            'Pengaturan',
            'Akses pilih foto belum diaktifkan.\nBerikan akses untuk memulai mengambil gambar. Aktifkan akses pilih foto dari Pengaturan.',
            [
              { text: 'Nanti Saja', onPress: () => console.log('Cancel') },
              {
                text: 'Aktifkan',
                onPress: () => {
                  Linking.openSettings();
                },
              },
            ],
            { cancelable: false },
          );
        }
      });
  };

  const handleDeleteAccount = () => {
    setViewState((prevState) => ({ ...prevState, isShowModalDelete: false, isLoading: true }));
    setLoading((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    deleteUser()
      .then((response: any) => {
        console.log(response);
        setLoading((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
        backToLogin();
      })
      .catch((err: any) => {
        console.log(err);
        Alert.alert(
          'Hapus Akun',
          '' + err.data.message,
          [
            {
              text: 'OK',
              onPress: () => {
                setLoading((prevState) => ({
                  ...prevState,
                  isLoading: false,
                }));
              },
            },
          ],
          { cancelable: false },
        );
      });
  };

  const backToLogin = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('refresh');
    AsyncStorage.removeItem('dataUser');
    AsyncStorage.removeItem('features');
    AsyncStorage.removeItem('notification');
    AsyncStorage.removeItem('unit');
    NavigatorService.reset('Login');
  };

  const handleQuitUnit = () => {
    setViewState((prevState) => ({ ...prevState, isShowModalConfirm: false }));
    setTimeout(function () {
      setLoading((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      putUserExitUnit({
        fcm_token: fcmToken,
      })
        .then((response: any) => {
          console.log(response);
          if (response.data.message === 'Logout success') {
            setLoading((prevState) => ({
              ...prevState,
              isLoading: false,
            }));
            backToLogin();
          }
        })
        .catch((error: any) => {
          console.log(error);
          Alert.alert(
            'Exit Unit',
            '' + error.data.message,
            [
              {
                text: 'OK',
                onPress: () => {
                  setLoading((prevState) => ({
                    ...prevState,
                    isLoading: false,
                  }));
                },
              },
            ],
            { cancelable: false },
          );
        });
    }, 400);
  };

  const processUpload = (response: any) => {
    console.log('processUpload', response);
    if (response.didCancel) {
      //upload cancel
    } else {
      setViewState((prevState) => ({ ...prevState, isModalVisible: false }));
      setForm((prevState) => ({ ...prevState, picture: response.path }));

      const postData = new FormData();
      postData.append('file', {
        uri: response.path,
        type: 'image/jpg',
        name: 'centralconnect.jpg',
      });
      postUpload(postData)
        .then((response: any) => {
          console.log('response upload', response);
          setForm((prevState) => ({ ...prevState, image_url: response.data.image_urls[0] }));
        })
        .catch((error: any) => {
          console.log(error);
          console.log('masuk error');
        });
    }
  };

  const validateForm = () => {
    setErrorForm((prevState) => ({
      ...prevState,
      errorFullname: form.fullname.length < 3 ? 'nama lengkap minimal 3 karakter' : '',
      errorNoHp: form.noHp.length < 9 ? 'No Handphone minimal 9 digit' : '',
    }));
  };

  const simpan = () => {
    validateForm();
    if (form.fullname.length > 2 && form.noHp.length > 8) {
      setLoading((prevState) => ({
        ...prevState,
        isLoading: true,
      }));
      let data = {
        name: form.fullname,
        phone: form.noHp,
        image_url: form.image_url,
      };
      putResidentEdit(data)
        .then((response: any) => {
          console.log(response);
          AsyncStorage.setItem(
            'dataUser',
            JSON.stringify({
              ...userData,
              ...{
                name: response.data.name,
                image_url: response.data.image_url,
                phone: response.data.phone,
              },
            }),
          );
          props.route.params.setData(
            response.data.name,
            response.data.image_url,
            response.data.phone,
          );
          setLoading((prevState) => ({
            ...prevState,
            isLoading: false,
            loadingType: 'success',
          }));
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          toast.current.show('Data profil berhasil di edit.');
        })
        .catch((error: any) => {
          console.log(error);
          setLoading((prevState) => ({
            ...prevState,
            isLoading: false,
          }));
        });
    }
  };

  const InfoUnitView = () => {
    return (
      <Modal
        onBackdropPress={() =>
          setViewState((prevState) => ({ ...prevState, isShowModalUnitInfo: false }))
        }
        isVisible={viewState.isShowModalUnitInfo}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View
            style={[
              styles.modalBox,
              { backgroundColor: isDarkMode ? '#121212' : 'white', height: toDp(198) },
            ]}
          >
            <View style={styles.viewModalTitle}>
              <CustomText
                textType="semibold"
                style={[styles.textTitleModal, { color: isDarkMode ? 'white' : '#263238' }]}
              >
                INFO UNIT
              </CustomText>
              <TouchableOpacity
                style={styles.touchSilang}
                onPress={() =>
                  setViewState((prevState) => ({ ...prevState, isShowModalUnitInfo: false }))
                }
              >
                <Image source={allLogo.icSilang} style={styles.icSilang} />
              </TouchableOpacity>
            </View>

            <CustomText style={[styles.textNo, { color: isDarkMode ? 'white' : '#273238' }]}>
              {/* // @ts-expect-error TS(2339): Property 'code' does not exist on type '{}'. */}
              {unit.code + '\n' + unit.unit_name}
            </CustomText>
            <TouchableOpacity
              style={styles.touchKeluar}
              onPress={() => {
                setViewState((prevState) => ({ ...prevState, isShowModalUnitInfo: false }));
                const self = this;
                setTimeout(function () {
                  setViewState((prevState) => ({ ...prevState, isShowModalConfirm: true }));
                }, 400);
              }}
            >
              <CustomText textType="semibold" style={styles.textKeluar}>
                Keluar dari unit
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const ModalConfirmation = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={() =>
          setViewState((prevState) => ({ ...prevState, isShowModalConfirm: false }))
        }
        isVisible={viewState.isShowModalConfirm}
      >
        <View style={styles.viewModalCenter}>
          <View
            style={[
              styles.modalBoxCenter,
              { backgroundColor: isDarkMode ? '#121212' : 'white', height: toDp(220) },
            ]}
          >
            <CustomText
              textType="semibold"
              style={[styles.titleConfirm, { color: isDarkMode ? 'white' : '#263238' }]}
            >
              KELUAR UNIT
            </CustomText>
            <CustomText style={[styles.textApakah, { color: isDarkMode ? 'white' : '#263238' }]}>
              Apakah Anda yakin keluar dari unit ini? secara otomatis Anda akan keluar dari
              aplikasi.
            </CustomText>

            <View style={styles.viewRow}>
              <TouchableOpacity
                style={styles.touchTidak}
                onPress={() =>
                  setViewState((prevState) => ({ ...prevState, isShowModalConfirm: false }))
                }
              >
                <CustomText textType="semibold" style={styles.textTidak}>
                  Tidak
                </CustomText>
              </TouchableOpacity>
              <View style={{ width: toDp(10) }}></View>
              <TouchableOpacity style={styles.touchYa} onPress={() => handleQuitUnit()}>
                <CustomText textType="semibold" style={styles.textYa}>
                  Ya, Keluar
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const ModalConfirmationDeleteAccount = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={() =>
          setViewState((prevState) => ({ ...prevState, isShowModalDelete: false }))
        }
        isVisible={viewState.isShowModalDelete}
      >
        <View style={styles.viewModalCenter}>
          <View
            style={[
              styles.modalBoxCenter,
              { backgroundColor: isDarkMode ? '#121212' : 'white', height: toDp(220) },
            ]}
          >
            <CustomText
              textType="semibold"
              style={[styles.titleConfirm, { color: isDarkMode ? 'white' : '#263238' }]}
            >
              Hapus Akun
            </CustomText>
            <CustomText style={[styles.textApakah, { color: isDarkMode ? 'white' : '#263238' }]}>
              Apakah Anda yakin menghapus akun ini, dan tidak bisa mengakses aplikasi ?
            </CustomText>

            <View style={styles.viewRow}>
              <TouchableOpacity
                style={styles.touchTidak}
                onPress={() =>
                  setViewState((prevState) => ({ ...prevState, isShowModalDelete: false }))
                }
              >
                <CustomText textType="semibold" style={styles.textTidak}>
                  Tidak
                </CustomText>
              </TouchableOpacity>
              <View style={{ width: toDp(10) }}></View>
              <TouchableOpacity style={styles.touchYa} onPress={() => handleDeleteAccount()}>
                <CustomText textType="semibold" style={styles.textYa}>
                  Hapus
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const ModalSelectMedia = () => {
    return (
      <Modal
        onBackdropPress={() =>
          setViewState((prevState) => ({ ...prevState, isModalVisible: false }))
        }
        isVisible={viewState.isModalVisible}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View style={[styles.modalBox, { backgroundColor: isDarkMode ? '#121212' : 'white' }]}>
            <View style={styles.viewModalTitle}>
              <CustomText
                textType="semibold"
                style={[styles.textTitleModal, { color: isDarkMode ? 'white' : '#263238' }]}
              >
                UBAH FOTO
              </CustomText>
              <TouchableOpacity
                style={styles.touchSilang}
                onPress={() =>
                  setViewState((prevState) => ({ ...prevState, isModalVisible: false }))
                }
              >
                <Image source={allLogo.icSilang} style={styles.icSilang} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalRow}>
              <TouchableOpacity style={styles.touchChatCocierge} onPress={() => openCamera()}>
                <View style={styles.circleModal}>
                  <Image source={allLogo.icModalCamera} style={styles.icModalGallery} />
                </View>
                <CustomText
                  textType="semibold"
                  allowFontScaling={false}
                  style={[styles.textModal, { color: isDarkMode ? 'white' : 'black' }]}
                >
                  {'Ambil foto'}
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchChatCocierge} onPress={() => openGallery()}>
                <View style={styles.circleModal}>
                  <Image source={allLogo.icModalGallery} style={styles.icModalGallery} />
                </View>
                <CustomText
                  textType="semibold"
                  allowFontScaling={false}
                  style={[styles.textModal, { color: isDarkMode ? 'white' : 'black' }]}
                >
                  {'Pilih foto'}
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : 'white' }]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <View
        style={[
          styles.header,
          {
            backgroundColor: isDarkMode ? '#1C1C1E' : 'white',
            borderBottomColor: isDarkMode ? '#1C1C1E' : '#9B9F95',
          },
        ]}
      >
        <TouchableOpacity style={styles.touchHeader} onPress={() => props.navigation.goBack()}>
          <Image
            source={allLogo.icBack}
            style={[styles.icBack, { tintColor: isDarkMode ? 'white' : '#383B34' }]}
          />
        </TouchableOpacity>
        <View style={styles.linearHeader}>
          <CustomText textType="medium" style={[styles.title]}>
            {'Edit Profil'}
          </CustomText>
        </View>
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove
        this comment to see the full error message
        {console.log('resident', form.isResident)}
        {form.isResident && (
          <TouchableOpacity
            style={styles.touchHeaderSearch}
            onPress={() => setViewState((prevState) => ({ ...prevState, isShowModalDelete: true }))}
          >
            <Image
              source={allLogo.icDelete}
              style={[styles.icFilter, { tintColor: isDarkMode ? 'white' : '#383B34' }]}
            />
          </TouchableOpacity>
        )}
      </View>

      <Toast ref={toast} />
      <View style={styles.viewProfile}>
        <View style={styles.wrapper}>
          {form.image_url ? (
            <Image source={{ uri: form.image_url }} style={styles.imgProfile} />
          ) : (
            <Image source={allLogo.imgDefault} style={styles.imgProfile} />
          )}
          <View style={{ width: toDp(16) }}></View>
          <TouchableOpacity
            style={styles.touchLupa}
            onPress={() => setViewState((prevState) => ({ ...prevState, isModalVisible: true }))}
          >
            <CustomText textType="semibold" style={[styles.textLupa]}>
              Ubah Foto
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
      <Loader loading={loading.isLoading} />
      {ModalSelectMedia()}
      {form.isResident && InfoUnitView()}
      {ModalConfirmation()}
      {ModalConfirmationDeleteAccount()}

      <ScrollView>
        <View style={styles.content}>
          <View style={styles.viewTextTitle}>
            <CustomTextInput
              title={'Nama Lengkap'}
              placeholder={'Masukan nama lengkap (sesuai KTP)'}
              error={errorForm.errorFullname}
              value={form.fullname}
              maxLength={50}
              onChangeText={(fullname: any) => handleForm(fullname, 'fullname')}
            />
            <View style={{ height: toDp(16) }} />
            <CustomTextInput
              title={'Email'}
              error={errorForm.errorEmail}
              value={form.email}
              editable={false}
              maxLength={50}
            />
            <View style={{ height: toDp(16) }} />
            <CustomTextInput
              title={'No handphone'}
              placeholder={'Masukkan no handphone'}
              error={errorForm.errorNoHp}
              value={form.noHp}
              onChangeText={(value: any) => handleForm(value, 'noHp')}
              maxLength={12}
              keyboardType={'phone-pad'}
              editable={true}
            />
            <View style={{ height: toDp(16) }} />

            {unit ? (
              <View>
                <CustomText textType="regular" style={styles.textTitle}>
                  Unit (aktif)
                </CustomText>
                <TouchableOpacity style={styles.viewText} onPress={() => handlePressUnit()}>
                  <CustomText textType="regular" style={[styles.textValue]}>
                    {/* // @ts-expect-error TS(2339): Property 'unit_name' does not exist on type '{}'. */}
                    {unit.unit_name}
                  </CustomText>
                  <Image source={allLogo.arrowRight} style={styles.icChevronDown} />
                </TouchableOpacity>
              </View>
            ) : (
              <View></View>
            )}
            <View style={{ height: toDp(16) }} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.positionFooter}>
        {form.fullname === '' || form.email === '' || form.noHp === '' ? (
          <View style={[styles.touchKirim, { backgroundColor: '#d3d6db' }]}>
            <CustomText textType="semibold" style={styles.textKirim}>
              Simpan
            </CustomText>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => simpan()}
            style={[styles.touchKirim, { backgroundColor: '#5AAA0F' }]}
          >
            <CustomText textType="semibold" style={styles.textKirim}>
              Simpan
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
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
  viewProfile: {
    width,
    height: 'auto',
    alignItems: 'flex-start',
    marginTop: toDp(24),
    marginLeft: toDp(24),
  },
  wrapper: {
    width: toDp(100),
    height: toDp(100),
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgProfile: {
    width: toDp(100),
    height: toDp(100),
    borderRadius: toDp(50),
  },
  touchPencil: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: toDp(28),
    height: toDp(28),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(4),
    padding: toDp(4),
    backgroundColor: '#5AAA0F',
  },
  icPencil: {
    width: toDp(20),
    height: toDp(20),
    tintColor: 'white',
  },
  content: {
    padding: toDp(32),
  },
  viewTextTitle: {
    width: width * 0.82,
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

  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewRootModal: {
    width,
    position: 'absolute',
    bottom: 0,
  },
  modalBox: {
    width,
    height: toDp(180),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: toDp(16),
    borderTopRightRadius: toDp(16),
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  touchChatCocierge: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewModalTitle: {
    marginTop: toDp(24),
    marginHorizontal: toDp(24),
    marginBottom: toDp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitleModal: {
    fontSize: toDp(14),
    letterSpacing: toDp(1),
    color: '#263238',
  },
  touchSilang: {
    padding: toDp(4),
  },
  icSilang: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#5AAA0F',
  },
  circleModal: {
    width: toDp(40),
    height: toDp(40),
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    backgroundColor: 'white',
    borderRadius: toDp(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icModalGallery: {
    width: toDp(20),
    height: toDp(20),
    resizeMode: 'contain',
    tintColor: '#5AAA0F',
  },
  textModal: {
    marginTop: toDp(8),
    textAlign: 'center',
    fontSize: toDp(14),
    color: '#000000',
  },
  viewTextEmail: {
    marginTop: toDp(6),
    marginBottom: toDp(8),
  },
  textEmailField: {
    fontSize: toDp(12),
    color: '#273238',
    letterSpacing: toDp(0.6),
  },
  textEmailValue: {
    marginTop: toDp(4),
    fontSize: toDp(14),
    color: '#273238',
  },
  positionFooter: {
    width,
    alignItems: 'center',
    marginBottom: toDp(24),
  },
  viewArea: {
    flexDirection: 'row',
    //backgroundColor: 'cyan'
  },
  touchDown: {
    position: 'absolute',
    top: toDp(36),
    right: 0,
  },
  icNext: {
    width: toDp(24),
    height: toDp(24),
  },
  textNo: {
    fontSize: toDp(16),
    color: '#273238',
    marginHorizontal: toDp(24),
  },
  touchKeluar: {
    marginTop: toDp(24),
    marginHorizontal: toDp(24),
    width: '90%',
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKeluar: {
    fontSize: toDp(14),
    color: '#FFFFFF',
    letterSpacing: toDp(0.7),
  },
  viewModalCenter: {
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBoxCenter: {
    width: width * 0.8,
    height: toDp(200),
    borderRadius: toDp(8),
    alignItems: 'center',
  },
  titleConfirm: {
    marginTop: toDp(24),
    fontSize: toDp(14),
    color: '#263238',
    letterSpacing: toDp(0.7),
  },
  textApakah: {
    marginTop: toDp(16),
    marginHorizontal: toDp(28),
    textAlign: 'center',
    fontSize: toDp(12),
    color: '#263238',
    letterSpacing: toDp(0.6),
    lineHeight: toDp(24),
  },
  viewRow: {
    marginTop: toDp(20),
    flexDirection: 'row',
  },
  touchTidak: {
    width: toDp(110),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTidak: {
    fontSize: toDp(14),
    color: '#FFFFFF',
    letterSpacing: toDp(0.7),
  },
  touchYa: {
    width: toDp(110),
    height: toDp(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    borderRadius: toDp(10),
  },
  textYa: {
    fontSize: toDp(14),
    color: '#5AAA0F',
    letterSpacing: toDp(0.7),
  },
  touchLupa: {
    paddingVertical: toDp(4),
    borderRadius: toDp(10),
    borderWidth: toDp(1),
    paddingHorizontal: toDp(10),
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    paddingVertical: toDp(10),
    borderColor: '#5AAA0F',
    height: toDp(40),
    color: '#5AAA0F',
  },
  textLupa: {
    color: '#5AAA0F',
  },
  viewText: {
    marginTop: toDp(2),
    width: '100%',
    height: toDp(40),
    backgroundColor: '#F6F7F4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: toDp(10),
  },
  icChevronDown: {
    width: toDp(8),
    height: toDp(12),
    tintColor: '#5E6157',
    marginRight: toDp(16),
  },
  textTitle: {
    fontSize: toDp(14),
    color: '#9B9F95',
  },
  textValue: {
    fontSize: toDp(14),
    marginLeft: toDp(15),
  },
  header: {
    width,
    height: 'auto',
    borderBottomWidth: toDp(1),
    borderBottomColor: '#121212',
    backgroundColor: 'white',
  },
  linearHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: toDp(60),
  },
  touchHeader: {
    padding: toDp(4),
    position: 'absolute',
    left: toDp(12),
    top: toDp(16),
    zIndex: 1,
  },
  icBack: {
    //marginHorizontal: toDp(8),
    width: toDp(16),
    height: toDp(16),
    tintColor: '#5AAA0F',
  },
  touchHeaderSearch: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(12),
    top: toDp(16),
  },
  icFilter: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#5AAA0F',
    resizeMode: 'contain',
  },
  title: {
    color: '#383B34',
    fontSize: toDp(18),
  },
});

export default EditProfileScreen;
