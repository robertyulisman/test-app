import { StackActions } from '@react-navigation/native';
import React, { useState } from 'react';
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
import { allLogo } from '../../Assets';
import CustomText from '../../Components/CustomText';
import CustomTextArea from '../../Components/CustomTextArea';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import { toDp } from '../../Helper/percentageToDP';
import { postEmergencyResponseFinish, postUpload } from '../../Services/Apis';

const { width, height } = Dimensions.get('window');

const EmergencyResponseScreen = ({ navigation, route }: any) => {
  const [state, setState] = useState<any>({
    isLoading: false,
    isDarkMode: false,
    tanggapan: '',
    errorTanggapan: '',
    arrayPhoto: [],
    isModalVisible: false,
    options: {
      width: 100,
      height: 100,
      cropping: false,
      compressImageQuality: 0.2,
      compressImageMaxWidth: 1500,
      compressImageMaxHeight: 2000,
      includeExif: true,
      mediaType: 'photo',
    },
  });

  const openCamera = () => {
    ImagePicker.openCamera(state.options as any)
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
    ImagePicker.openPicker(state.options as any)
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

  const processUpload = (response: any) => {
    console.log('response select camera', response);
    if (response.didCancel) {
      //upload cancel
    } else {
      let arrayPhoto: Array<any> = state.arrayPhoto;
      arrayPhoto.push({
        data: response.data,
        mime: response.mime,
        exif: response.exif,
        path: response.path,
      });

      setState((prevState: any) => ({
        ...prevState,
        arrayPhoto,
        isModalVisible: false,
      }));
    }
  };

  const handleSendResponse = () => {
    setState((prevState: any) => ({
      ...prevState,
      isLoading: true,
    }));
    // @ts-expect-error TS(2693): 'FormData' only refers to a type, but is being use... Remove this comment to see the full error message
    const postData = new FormData();
    for (var i = 0; i < state.arrayPhoto.length; i++) {
      postData.append('file', {
        uri: state.arrayPhoto[i].path,
        type: 'image/jpg',
        name: 'batam-central' + i + '.jpg',
      } as any);
    }
    postUpload(postData)
      .then((response) => {
        console.log('response', response);
        let data = {
          content: state.tanggapan,
          image_urls: response.data.image_urls,
        };
        postEmergencyResponseFinish(route.params.emergencyData.id, data)
          .then((responsePost) => {
            console.log('response', responsePost);
            setState((state: any) => ({ ...state, loading: false }));
            route.params.emergencyData.refreshData();
            const popAction = StackActions.pop(2);
            navigation.dispatch(popAction);
            route;
          })
          .catch((error) => {
            //error when post response
            Alert.alert('' + error.status, '' + error.data.message, [
              {
                text: 'OK',
                onPress: () => setState((state: any) => ({ ...state, isLoading: false })),
              },
            ]);
          });
      })
      .catch((error) => {
        //error when upload image
        Alert.alert('' + error.status, '' + error.data.message, [
          { text: 'OK', onPress: () => setState((state: any) => ({ ...state, isLoading: false })) },
        ]);
      });
  };

  const FooterView = () => {
    return (
      <View style={styles.footer}>
        {state.tanggapan.trim() === '' || state.arrayPhoto.length < 1 ? (
          <View style={[styles.doneButton, { backgroundColor: '#d3d6db' }]}>
            <CustomText textType="semibold" style={styles.doneText}>
              Kirim dan Selesaikan Panggilan
            </CustomText>
          </View>
        ) : (
          <TouchableOpacity style={styles.doneButton} onPress={() => handleSendResponse()}>
            <CustomText textType="semibold" style={styles.doneText}>
              Kirim dan Selesaikan Panggilan
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const ModalSelectMedia = () => {
    return (
      <Modal
        onBackdropPress={() =>
          setState((prevState: any) => ({ ...prevState, isModalVisible: false }))
        }
        isVisible={state.isModalVisible}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View
            style={[styles.modalBox, { backgroundColor: state.isDarkMode ? '#121212' : 'white' }]}
          >
            <View style={styles.viewModalTitle}>
              <CustomText
                textType="semibold"
                style={[styles.textTitleModal, { color: state.isDarkMode ? 'white' : '#263238' }]}
              >
                Pilih Media
              </CustomText>
              <TouchableOpacity
                style={styles.touchSilang}
                onPress={() =>
                  setState((prevState: any) => ({ ...prevState, isModalVisible: false }))
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
                  style={[styles.textModal, { color: state.isDarkMode ? 'white' : 'black' }]}
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
                  style={[styles.textModal, { color: state.isDarkMode ? 'white' : 'black' }]}
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

  const ResponsePhotoView = () => {
    return (
      <View>
        <CustomText style={styles.textTitleField}>Foto tanggapan (max 5)</CustomText>
        <ScrollView horizontal={true} style={styles.scrollViewRow}>
          {state.arrayPhoto.map((item: any, index: number) => {
            return (
              <View style={styles.viewPhoto}>
                <Image source={{ uri: item.path }} style={styles.photoUpload} />
                <View style={styles.viewSilang}>
                  <TouchableOpacity
                    style={styles.circle}
                    onPress={() => {
                      let arrayPhoto = state.arrayPhoto;
                      arrayPhoto.splice(index, 1);
                      setState((prevState: any) => ({
                        ...prevState,
                        arrayPhoto,
                      }));
                    }}
                  >
                    <Image source={allLogo.icSilang} style={styles.icSilangPhoto} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          {state.arrayPhoto.length !== 5 && (
            <TouchableOpacity
              style={styles.touchAddFoto}
              onPress={() =>
                setState((prevState: any) => ({
                  ...prevState,
                  isModalVisible: true,
                }))
              }
            >
              <Image source={allLogo.icCameraPlus} style={styles.icCamera} />
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  };

  const handleChangeTanggapan = (value: any) => {
    setState((prevState: any) => ({
      ...prevState,
      tanggapan: value,
    }));
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: state.isDarkMode ? '#121212' : 'white' }]}
    >
      <Loader loading={state.isLoading} />
      <StatusBar
        barStyle={state.isDarkMode ? 'light-content' : 'dark-content'}
        translucent={false}
        backgroundColor={'transparent'}
      />
      <Header title={'Tanggapan Panggilan'} onPress={() => navigation.goBack()} />
      {ModalSelectMedia()}
      <ScrollView>
        <View style={styles.infoWrapper}>
          <CustomText textType="semibold" style={styles.textPanggilan}>
            {'TANGGAPAN PENYELESAIAN ' + '\n' + 'PANGGILAN EMERGENCY'}
          </CustomText>
          <CustomTextArea
            // inputRef={(ref) => this.tanggapan = ref}
            title={'Tanggapan'}
            placeholder={'Masukkan tanggapan anda'}
            error={state.errorTanggapan}
            value={state.tanggapan}
            maxLength={1600}
            onChangeText={(tanggapan: any) => handleChangeTanggapan(tanggapan)}
            autoCapitalize={'sentences'}
            returnKeyType={'done'}
          />
          {ResponsePhotoView()}
        </View>
      </ScrollView>
      {FooterView()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },
  textPanggilan: {
    fontSize: toDp(16),
    color: '#9B9F95',
    marginBottom: toDp(20),
  },
  doneButton: {
    width: toDp(width * 0.85),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(10),
  },
  infoWrapper: {
    padding: toDp(20),
    backgroundColor: 'white',
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: toDp(2),
    borderColor: '#DDE3E0',
    paddingVertical: toDp(10),
    paddingBottom: Platform.OS === 'ios' ? toDp(25) : 10,
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: 'white',
  },
  doneText: {
    color: '#ffffff',
    fontSize: toDp(14),
  },
  textTitleField: {
    fontSize: toDp(12),
    color: '#788F9C',
    letterSpacing: toDp(0.6),
    marginTop: toDp(45),
  },
  scrollViewRow: {
    marginTop: toDp(8),
    width: '100%',
    height: toDp(80),
  },
  viewPhoto: {
    width: toDp(80),
    height: toDp(80),
    marginRight: toDp(8),
    borderRadius: toDp(4),
    backgroundColor: '#e7ebee',
  },
  photoUpload: {
    width: toDp(80),
    height: toDp(80),
    borderRadius: toDp(4),
  },
  viewSilang: {
    width: toDp(80),
    height: toDp(80),
    position: 'absolute',
  },
  circle: {
    position: 'absolute',
    top: toDp(4),
    right: toDp(4),
    width: toDp(20),
    height: toDp(20),
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowColor: '#000000',
    elevation: 2,
  },
  icSilangPhoto: {
    width: toDp(16),
    height: toDp(16),
    tintColor: '#FFFFFF',
  },
  touchAddFoto: {
    width: toDp(80),
    height: toDp(80),
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F7F4',
  },
  icAddZoom: {
    width: toDp(48),
    height: toDp(48),
    tintColor: '#788F9C',
  },
  icCamera: {
    width: toDp(30),
    height: toDp(25.3),
    tintColor: '#b0bec5',
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
  viewModalTitle: {
    marginTop: toDp(24),
    marginHorizontal: toDp(24),
    marginBottom: toDp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touchChatCocierge: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmergencyResponseScreen;
