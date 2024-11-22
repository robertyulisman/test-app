import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { allLogo } from '@src/Assets';
import CustomText from '@src/Components/CustomText';
import Header from '@src/Components/Header';
import Loader from '@src/Components/Loader';
import Toast from '@src/Components/Toast';
import { toDp } from '@src/Helper/percentageToDP';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import * as NavigatorService from '../../Helper/NavigatorServices';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import { deleteUnitsOccupied, getUnitsOccupied, putUserExitUnit } from '@src/Services/Apis';

const { width, height } = Dimensions.get('window');

const UnitScreen = (props: any) => {
  const toast = useRef(null);
  const [state, setState] = useState({
    isLoading: false,
    isDarkMode: false,
    isShowModalConfirm: false,
    isShowSuccessModal: false,
    unitList: [],
    unitId: '',
    unitName: '',
    fcmToken: '',
  });

  useEffect(() => {
    loadUnit();
    getFcmToken();
  }, []);

  const getFcmToken = () => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        setState((state) => ({ ...state, fcmToken }));
      })
      .catch((error) => {
        console.log('MASUK catch', error);
      });
  };

  const loadUnit = () => {
    getUnitsOccupied('')
      .then((response: any) => {
        console.log(response);
        setState((prevState) => ({ ...prevState, unitList: response.data.units }));
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const handleDeleteUnit = () => {
    setState((prevState) => ({ ...prevState, isShowModalConfirm: false }));
    setTimeout(function () {
      setState((prevState) => ({ ...prevState, isLoading: true }));
      if (state.unitList.length === 1) {
        putUserExitUnit({
          fcm_token: state.fcmToken,
          unit_id: state.unitId,
        })
          .then((response: any) => {
            console.log(response);
            if (response.data.message === 'Logout success') {
              setState((prevState) => ({ ...prevState, isLoading: false }));
              AsyncStorage.removeItem('token');
              AsyncStorage.removeItem('refresh');
              AsyncStorage.removeItem('dataUser');
              AsyncStorage.removeItem('features');
              AsyncStorage.removeItem('notification');
              AsyncStorage.removeItem('unit');
              NavigatorService.reset('Login');
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
                    setState((prevState) => ({ ...prevState, isLoading: false }));
                  },
                },
              ],
              { cancelable: false },
            );
          });
      } else {
        deleteUnitsOccupied('/' + state.unitId)
          .then((response: any) => {
            console.log(response);
            setState((prevState) => ({ ...prevState, isLoading: false }));
            AsyncStorage.setItem('unit', JSON.stringify(response.data.activeUnit.unit));
            showMessageDelete();
            loadUnit();
            props.navigation.state.params.setUnit(response.data.activeUnit.unit);
          })
          .catch((error: any) => {
            console.log(error);
            if (error.data.message === 'Must at least have one active units') {
              Alert.alert(
                'Mohon Maaf',
                'Harus memiliki setidaknya satu unit aktif',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      setState((prevState) => ({ ...prevState, isLoading: false }));
                    },
                  },
                ],
                { cancelable: false },
              );
            } else {
              setState((prevState) => ({ ...prevState, isLoading: false }));
            }
          });
      }
    }, 400);
  };

  const ModalConfirmView = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={() =>
          setState((prevState) => ({ ...prevState, isShowModalConfirm: true }))
        }
        isVisible={state.isShowModalConfirm}
      >
        <View style={[styles.viewModalCenter, { alignItems: 'center' }]}>
          <View
            style={[
              styles.modalBoxCenter,
              { backgroundColor: state.isDarkMode ? '#121212' : 'white', height: toDp(184) },
            ]}
          >
            <CustomText
              textType="semibold"
              style={[styles.titleConfirm, { color: state.isDarkMode ? 'white' : '#263238' }]}
            >
              HAPUS UNIT
            </CustomText>
            <CustomText
              style={[styles.textApakah, { color: state.isDarkMode ? 'white' : '#263238' }]}
            >
              Apakah anda yakin menghapus unit{'\n'}
              <CustomText>{state.unitName}</CustomText>
              {state.unitList.length === 1 && '\nAplikasi akan otomatis ter-Logout'}
            </CustomText>

            <View style={styles.viewRow}>
              <TouchableOpacity
                style={styles.touchTidak}
                onPress={() =>
                  setState((prevState) => ({ ...prevState, isShowModalConfirm: false }))
                }
              >
                <CustomText textType="semibold" style={styles.textTidak}>
                  Tidak
                </CustomText>
              </TouchableOpacity>
              <View style={{ width: toDp(20) }}></View>
              <TouchableOpacity style={styles.touchYa} onPress={() => handleDeleteUnit()}>
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

  const handleDelete = (unit: any) => {
    console.log('masuk sini');
    setState((prevState) => ({
      ...prevState,
      isShowModalConfirm: true,
      unitName: unit.unit_name,
      unitId: unit.id,
    }));
  };

  const showMessageDelete = () => {
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    toast.current.show('Unit berhasil dihapus.');
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
      <Header title={'Unit'} onPress={() => props.navigation.goBack()} />
      <Toast ref={toast} />
      <Loader loading={state.isLoading} />
      {ModalConfirmView()}
      <View style={{ height: toDp(10) }} />
      {state.unitList.length === 0 ? (
        <View style={styles.content}>
          {['', '', '', '', ''].map(() => {
            return (
              <View>
                <View
                  style={[
                    styles.viewItem,
                    {
                      height: toDp(56),
                      backgroundColor: state.isDarkMode ? '#121212' : 'white',
                    },
                  ]}
                >
                  <ShimmerPlaceHolder style={styles.imgPicture} />
                  <View style={styles.contentItem}>
                    <ShimmerPlaceHolder style={[styles.text, { width: toDp(30) }]} />
                  </View>
                </View>
                <View style={styles.lineItem} />
              </View>
            );
          })}
        </View>
      ) : (
        <ScrollView style={styles.content}>
          {state.unitList.map((data, index) => {
            return (
              <View>
                <View style={styles.viewItem}>
                  <TouchableOpacity
                    onPress={() => {
                      // @ts-expect-error TS(2339): Property 'status' does not exist on type 'never'.
                      if (data.status.name !== 'Request') {
                        NavigatorService.navigate('DetailUnit', { data });
                      }
                    }}
                  >
                    <CustomText
                      style={[styles.textName, { color: state.isDarkMode ? 'white' : '#273238' }]}
                    >
                      {/* // @ts-expect-error TS(2339): Property 'unit' does not exist on type 'never'. */}
                      {data.unit.unit_name}
                    </CustomText>
                    {index === 0 && (
                      <CustomText style={[styles.textStatus, { color: '#28a595' }]}>
                        {'Aktif'}
                      </CustomText>
                    )}
                    {/* // @ts-expect-error TS(2339): Property 'status' does not exist on type 'never'. */}
                    {data.status.name === 'Request' && (
                      <CustomText style={styles.textStatus}>{'Menunggu Konfirmasi'}</CustomText>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.touchDelete}
                    // @ts-expect-error TS(2339): Property 'unit' does not exist on type 'never'.
                    onPress={() => handleDelete(data.unit)}
                  >
                    <Image
                      source={allLogo.icDelete}
                      style={[
                        styles.icDelete,
                        { tintColor: state.isDarkMode ? 'white' : '#5AAA0F' },
                      ]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.lineItem} />
              </View>
            );
          })}
        </ScrollView>
      )}
      <View style={styles.viewFooter}>
        <TouchableOpacity
          style={styles.touchTanbah}
          onPress={() => {
            NavigatorService.navigate('AddUnit', { loadUnit: loadUnit });
          }}
        >
          <CustomText style={styles.textTambah}>TAMBAH UNIT</CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? toDp(28) : 0,
    paddingBottom: Platform.OS === 'android' ? toDp(28) : 0,
  },
  viewFooter: {
    paddingHorizontal: toDp(16),
  },
  touchTanbah: {
    width: '100%',
    height: toDp(40),
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTambah: {
    fontSize: toDp(14),
    color: '#5AAA0F',
    letterSpacing: toDp(0.7),
  },
  headeriOS: {
    width,
    height: toDp(20),
    backgroundColor: '#5AAA0F',
  },
  content: {
    flex: 1,
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: toDp(16),
    paddingVertical: toDp(12),
  },
  textName: {
    fontSize: toDp(14),
    color: '#273238',
    width: width * 0.8,
  },
  textStatus: {
    marginTop: toDp(8),
    fontSize: toDp(12),
    color: '#f53c3c',
  },
  touchDelete: {
    padding: toDp(4),
  },
  icDelete: {
    width: toDp(24),
    height: toDp(24),
  },
  lineItem: {
    width: '92%',
    height: toDp(1),
    backgroundColor: '#e9ebed',
    marginLeft: toDp(16),
  },
  titleConfirm: {
    marginTop: toDp(24),
    fontSize: toDp(14),
    color: '#263238',
    letterSpacing: toDp(0.7),
  },
  textApakah: {
    marginTop: toDp(16),
    marginHorizontal: toDp(16),
    textAlign: 'center',
    fontSize: toDp(12),
    color: '#263238',
    letterSpacing: toDp(0.6),
  },
  viewRow: {
    marginTop: toDp(20),
    flexDirection: 'row',
  },
  touchTidak: {
    width: toDp(100),
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
    width: toDp(100),
    height: toDp(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: toDp(1),
    borderRadius: toDp(10),
    borderColor: '#5AAA0F',
  },
  textYa: {
    fontSize: toDp(14),
    color: '#5AAA0F',
    letterSpacing: toDp(0.7),
  },
  modalBoxCenter: {
    width: toDp(280),
    height: toDp(345),
    backgroundColor: '#FFFFFF',
    borderRadius: toDp(10),
    alignItems: 'center',
  },
});

export default UnitScreen;
