import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { allLogo } from '@src/Assets';
import CustomText from '@src/Components/CustomText';
import Header from '@src/Components/Header';
import Loader from '@src/Components/Loader';
import { toDp } from '@src/Helper/percentageToDP';
import { postLogout } from '@src/Services/Apis';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Modal from 'react-native-modal';
import * as NavigatorService from '../../Helper/NavigatorServices';

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ navigation, route }: any) => {
  const [viewState, setViewState] = useState({
    isDarkMode: false,
    isLoading: false,
    isShowModalConfirm: false,
  });

  const [userState, setUserState] = useState({
    dataUser: {
      name: '',
      image_url: '',
    },
    fullname: '',
    image_url: '',
    phone: '',
    fcmToken: '',
    deviceId: '',
    unit: {},
    label: '',
  });

  useEffect(() => {
    console.log('re render');
    const fetchData = async () => {
      let dataUser = await AsyncStorage.getItem('dataUser');
      let unit = await AsyncStorage.getItem('unit');
      let fcmTokem = await AsyncStorage.getItem('fcmToken');

      setUserState((prevState) => ({
        ...prevState,
        // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
        dataUser: JSON.parse(dataUser),
        // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
        unit: JSON.parse(unit),
      }));

      console.log('JSON.parse(dataUser)', JSON.parse(dataUser));
    };

    fetchData().catch(console.error);
    getFcmTokenAndDeviceId();
  }, []);

  useEffect(() => {
    let label = '';
    // @ts-expect-error TS(2339): Property 'is_a_resident' does not exist on type '{... Remove this comment to see the full error message
    if (!userState.dataUser.is_a_resident) {
      // @ts-expect-error TS(2339): Property 'labels' does not exist on type '{ name: ... Remove this comment to see the full error message
      if (userState.dataUser.labels !== undefined) {
        // @ts-expect-error TS(2339): Property 'labels' does not exist on type '{ name: ... Remove this comment to see the full error message
        for (var i = 0; i < userState.dataUser.labels.length; i++) {
          label +=
            // @ts-expect-error TS(2339): Property 'labels' does not exist on type '{ name: ... Remove this comment to see the full error message
            userState.dataUser.labels[i].complaint_category +
            // @ts-expect-error TS(2339): Property 'labels' does not exist on type '{ name: ... Remove this comment to see the full error message
            (userState.dataUser.labels.length == i + 1 ? '' : ', ');
        }
      }
    }
    setUserState((prevState) => ({
      ...prevState,
      fullname: userState.dataUser.name,
      image_url: userState.dataUser.image_url,
      // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{ name: s... Remove this comment to see the full error message
      phone: userState.dataUser.phone,
      label: label,
    }));
  }, [userState.dataUser]);

  const getFcmTokenAndDeviceId = () => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        setUserState((state) => ({ ...state, fcmToken }));
      })
      .catch((error) => {
        console.log('MASUK catch', error);
      });
    DeviceInfo.getUniqueId()
      .then((deviceId) => {
        setUserState((state) => ({ ...state, deviceId }));
      })
      .catch((error) => {
        console.log('MASUK catch', error);
      });
  };

  const setUnit = (unit: any) => {
    setUserState((prevState) => ({
      ...prevState,
      unit,
    }));
  };

  const setData = (name: any, image_url: any, phone: any) => {
    setUserState((prevState) => ({
      ...prevState,
      fullname: name,
      image_url: image_url,
      phone: phone,
    }));
    route.params.setImageProfile(image_url);
  };

  const clearAsyncStorage = () => {
    setViewState((prevState) => ({ ...prevState, isLoading: false }));
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('refresh');
    AsyncStorage.removeItem('dataUser');
    AsyncStorage.removeItem('features');
    AsyncStorage.removeItem('fcmToken');
    AsyncStorage.removeItem('notification');
    NavigatorService.reset('Login');
  };

  const logout = () => {
    setViewState((prevState) => ({ ...prevState, isShowModalConfirm: true }));
  };

  const handleLogout = () => {
    let body = {
      fcm_token: userState.fcmToken,
      device_id: 'DeviceInfo',
    };
    setUserState((prevState) => ({ ...prevState, isLoading: true, isShowModalConfirm: false }));
    postLogout(body)
      .then((response: any) => {
        console.log(response);
        clearAsyncStorage();
      })
      .catch((error: any) => {
        console.log(error);
        clearAsyncStorage();
      });
  };

  const ModalConfirmationLogout = () => {
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
              { backgroundColor: viewState.isDarkMode ? '#121212' : 'white', height: toDp(240) },
            ]}
          >
            <CustomText
              textType="semibold"
              style={[styles.titleConfirm, { color: viewState.isDarkMode ? 'white' : '#263238' }]}
            >
              LOG OUT
            </CustomText>
            <CustomText
              style={[styles.textApakah, { color: viewState.isDarkMode ? 'white' : '#263238' }]}
            >
              Anda perlu login kembali jika ingin melanjutkan atau memantau aktivitas sebelumnya.
              Anda yakin ingin keluar?
            </CustomText>

            <View style={styles.viewRow}>
              <TouchableOpacity
                style={styles.touchTidak}
                onPress={() =>
                  setViewState((prevState) => ({ ...prevState, isShowModalConfirm: false }))
                }
              >
                <CustomText textType="semibold" style={styles.textTidak}>
                  Batal
                </CustomText>
              </TouchableOpacity>
              <View style={{ width: toDp(10) }}></View>
              <TouchableOpacity style={styles.touchYa} onPress={() => handleLogout()}>
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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: viewState.isDarkMode ? '#121212' : 'white' }]}
    >
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Profil'} onPress={() => navigation.goBack()} />
      <Loader loading={viewState.isLoading} />
      {ModalConfirmationLogout()}
      <ScrollView>
        <Image source={allLogo.imgHeaderProfile} style={styles.linearHeader} />
        <View style={styles.viewProfile}>
          <View style={styles.viewImage}>
            {userState.image_url ? (
              <Image source={{ uri: userState.image_url }} style={styles.imgProfile} />
            ) : (
              <Image source={allLogo.imgDefault} style={styles.imgProfile} />
            )}
          </View>
          <CustomText
            textType="semibold"
            style={[styles.textName, { color: viewState.isDarkMode ? 'white' : '#273238' }]}
          >
            {userState.fullname}
          </CustomText>
          <CustomText
            style={[styles.textEmail, { color: viewState.isDarkMode ? 'white' : '#273238' }]}
          >
            {/* // @ts-expect-error TS(2339): Property 'email' does not exist on type '{ name: s... Remove this comment to see the full error message */}
            {userState.dataUser.email}
          </CustomText>
          <CustomText
            style={[styles.textNo, { color: viewState.isDarkMode ? 'white' : '#273238' }]}
          >
            {userState.phone}
          </CustomText>
          {/* // @ts-expect-error TS(2339): Property 'is_a_resident' does not exist on type '{... Remove this comment to see the full error message */}
          {userState.dataUser.is_a_resident ? (
            <CustomText
              style={[styles.textNo, { color: viewState.isDarkMode ? 'white' : '#273238' }]}
            >
              {/* // @ts-expect-error TS(2339): Property 'code' does not exist on type '{}'. */}
              {userState.unit.code + '\n' + userState.unit.unit_name}
            </CustomText>
          ) : (
            <View style={{ marginTop: toDp(12) }}>
              <CustomText
                style={[styles.textLabel, { color: viewState.isDarkMode ? 'white' : '#b0bec5' }]}
              >
                {'Label tugas'}
              </CustomText>
              <CustomText
                style={[styles.valueLabel, { color: viewState.isDarkMode ? 'white' : '#273238' }]}
              >
                {userState.label}
              </CustomText>
            </View>
          )}
          <TouchableOpacity
            style={styles.touchEdit}
            onPress={() => NavigatorService.navigate('EditProfile', { setData: setData })}
          >
            <CustomText
              textType="semibold"
              style={[styles.textEdit, { color: viewState.isDarkMode ? 'white' : '#5AAA0F' }]}
            >
              Edit Profil
            </CustomText>
          </TouchableOpacity>

          <View style={{ height: toDp(24) }} />
          {/* // @ts-expect-error TS(2339): Property 'is_a_resident' does not exist on type '{... Remove this comment to see the full error message */}
          {userState.dataUser.is_a_resident && (
            <View
              style={[
                styles.detailInfo,
                { backgroundColor: viewState.isDarkMode ? '#1C1C1E' : 'white' },
              ]}
            >
              <TouchableOpacity
                style={styles.viewValue}
                onPress={() => NavigatorService.navigate('Unit', { setUnit: setUnit })}
              >
                <CustomText
                  textType="semibold"
                  style={[styles.textValue, { color: viewState.isDarkMode ? 'white' : '#5AAA0F' }]}
                >
                  Unit
                </CustomText>
                <Image
                  source={allLogo.icNext}
                  style={[styles.icNext, { tintColor: viewState.isDarkMode ? 'white' : '#5AAA0F' }]}
                />
              </TouchableOpacity>
            </View>
          )}
          <View
            style={[
              styles.detailInfo,
              { backgroundColor: viewState.isDarkMode ? '#1C1C1E' : 'white' },
            ]}
          >
            <TouchableOpacity
              style={styles.viewValue}
              onPress={() => NavigatorService.navigate('ChangePass')}
            >
              <CustomText
                textType="semibold"
                style={[styles.textValue, { color: viewState.isDarkMode ? 'white' : '#5AAA0F' }]}
              >
                Ubah Password
              </CustomText>
              <Image
                source={allLogo.icNext}
                style={[styles.icNext, { tintColor: viewState.isDarkMode ? 'white' : '#5AAA0F' }]}
              />
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.detailInfo,
              { backgroundColor: viewState.isDarkMode ? '#1C1C1E' : 'white' },
            ]}
          >
            <TouchableOpacity
              style={styles.viewValue}
              onPress={() => NavigatorService.navigate('ContactUs')}
            >
              <CustomText
                textType="semibold"
                style={[styles.textValue, { color: viewState.isDarkMode ? 'white' : '#5AAA0F' }]}
              >
                Hubungi Kami
              </CustomText>
              <Image
                source={allLogo.icNext}
                style={[styles.icNext, { tintColor: viewState.isDarkMode ? 'white' : '#5AAA0F' }]}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: toDp(120) }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.buttonFooter,
            { backgroundColor: viewState.isDarkMode ? 'white' : '#5AAA0F' },
          ]}
          onPress={() => logout()}
        >
          <CustomText textType="semibold" style={styles.textFooter}>
            Log Out
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
  header: {
    height: toDp(60),
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: toDp(1),
    /*shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: {
          height: 2,
          width: 0
        },
        elevation: 2,
        zIndex: 1*/
    alignItems: 'center',
  },
  title: {
    fontSize: toDp(18),
    color: '#5AAA0F',
  },
  touchSetting: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(16),
  },
  icSetting: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#5AAA0F',
  },

  linearHeader: {
    width,
    height: toDp(150),
    alignItems: 'center',
  },
  viewProfile: {
    width,
    height: 'auto',
    alignItems: 'center',
    marginTop: toDp(-120),
  },
  viewImage: {},
  imgProfile: {
    width: toDp(100),
    height: toDp(100),
    borderRadius: toDp(50),
  },
  textName: {
    marginTop: toDp(16),
    fontSize: toDp(16),
    color: '#273238',
    letterSpacing: toDp(0.05),
    textAlign: 'center',
    marginHorizontal: toDp(10),
  },
  textEmail: {
    marginTop: toDp(8),
    fontSize: toDp(12),
    color: '#273238',
    letterSpacing: toDp(0.05),
  },
  textNo: {
    marginTop: toDp(4),
    fontSize: toDp(12),
    color: '#273238',
    letterSpacing: toDp(0.05),
    marginHorizontal: toDp(16),
    textAlign: 'center',
  },
  textLabel: {
    fontSize: toDp(10),
    textAlign: 'center',
  },
  valueLabel: {
    marginTop: toDp(4),
    fontSize: toDp(12),
    color: '#273238',
    letterSpacing: toDp(0.05),
    textAlign: 'center',
    marginHorizontal: toDp(16),
  },
  touchEdit: {
    marginTop: toDp(12),
    padding: toDp(4),
  },
  textEdit: {
    fontSize: toDp(14),
    color: '#5AAA0F',
    letterSpacing: toDp(0.05),
  },

  viewInfo: {
    marginTop: toDp(36),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: toDp(16),
    alignItems: 'center',
  },
  textInfo: {
    fontSize: toDp(14),
    color: '#788F9C',
    letterSpacing: toDp(0.05),
  },
  touchEditInfo: {
    paddingHorizontal: toDp(4),
  },
  // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
  textEdit: {
    fontSize: toDp(14),
    color: '#5AAA0F',
    letterSpacing: toDp(0.05),
  },
  textEditInfo: {
    fontSize: toDp(14),
    color: '#5AAA0F',
    letterSpacing: toDp(0.05),
  },
  detailInfo: {
    marginTop: toDp(8),
    marginHorizontal: toDp(16),
    width: '90%',
    height: 'auto',
    borderRadius: toDp(6),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  viewValue: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: toDp(12),
  },
  lineValue: {
    width: '100%',
    height: toDp(1),
    backgroundColor: '#EEEEEE',
  },

  wrapper: {
    flex: 1,
  },

  content: {
    flex: 1,
    alignItems: 'center',
  },
  root: {
    width,
    height: 'auto',
    backgroundColor: '#FFFFFF',
  },
  row: {
    height: toDp(66),
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ECECED',
    borderBottomWidth: 1,
    paddingLeft: toDp(16),
    paddingRight: toDp(16),
  },
  col: {
    height: toDp(66),
    justifyContent: 'center',
    borderBottomColor: '#ECECED',
    borderBottomWidth: 1,
    paddingLeft: toDp(16),
    paddingRight: toDp(16),
  },
  text: {
    fontSize: toDp(14),
    fontWeight: '300',
    color: '#212121',
  },
  icCircle: {
    width: toDp(28),
    height: toDp(28),
  },
  icChevronRight: {
    width: toDp(28),
    height: toDp(28),
    tintColor: '#189E84',
  },

  viewButtonCenter: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  viewButton: {
    width: width * 0.75,
    marginTop: toDp(16),
  },
  textEmptyTitle: {
    fontSize: toDp(16),
    marginBottom: toDp(12),
    textAlign: 'center',
    color: '#151d2c',
  },
  textEmptyDesc: {
    fontSize: toDp(14),
    textAlign: 'center',
    color: '#151d2c',
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconProfil: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#212121',
  },
  textFooter: {
    color: '#ffffff',
    fontStyle: 'normal',
  },
  icNext: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#212121',
    position: 'absolute',
    right: toDp(16),
  },

  // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
  viewValue: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: toDp(12),
    height: toDp(50),
    alignItems: 'center',
  },
  textValue: {
    fontSize: toDp(14),
    color: '#5AAA0F',
    letterSpacing: toDp(0.7),
  },
  // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
  lineValue: {
    width: '100%',
    height: toDp(1),
    backgroundColor: '#EEEEEE',
  },
  // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
  icNext: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#5AAA0F',
    position: 'absolute',
    right: toDp(16),
  },
  buttonFooter: {
    marginHorizontal: toDp(16),
    width: '90%',
    marginTop: toDp(10),
    height: toDp(40),
    borderRadius: toDp(4),
    backgroundColor: '#5AAA0F',
    justifyContent: 'center',
    borderWidth: toDp(1),
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    borderRadius: 10,
    borderColor: '#5AAA0F',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  footer: {
    borderTopColor: '#DDE3E0',
    borderTopWidth: toDp(1),
    // @ts-expect-error TS(2304): Cannot find name 'Platform'.
    paddingBottom: Platform.OS === 'android' ? toDp(10) : toDp(10),
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
    marginTop: toDp(10),
    marginHorizontal: toDp(30),
    textAlign: 'center',
    fontSize: toDp(12),
    color: '#263238',
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
});

export default ProfileScreen;
