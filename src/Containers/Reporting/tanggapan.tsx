import { allLogo } from '@src/Assets';
import CustomText from '@src/Components/CustomText';
import CustomTextArea from '@src/Components/CustomTextArea';
import Header from '@src/Components/Header';
import Loader from '@src/Components/Loader';
import { toDp } from '@src/Helper/percentageToDP';
import { postComplainsStatus, postUpload } from '@src/Services/Apis';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
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

const { width, height } = Dimensions.get('window');
const TanggapanScreen = (props: any) => {
  const [state, setState] = useState({
    date: '',
    title: '',
    desciption: '',
    arrayPhoto: [],
    location: '',

    arrCategory: [],
    idCategory: '',
    nameCategory: '', //ex
    pictures: [],

    arrayHolder: [],
    valueSearch: '',

    errorTitle: '',
    errorDesciption: '',

    tanggapan: '',
    errorTanggapan: '',

    latitude: '',
    longitude: '',
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
    modalVisible: false,
    loading: false,

    modalLabel: false,
    arrayCategory: [],
    darkMode: false,
    touch: true,
  });

  useEffect(() => {
    console.log('Props', props);
  }, []);

  const camera = () => {
    // @ts-expect-error TS(2345): Argument of type '{ width: number; height: number;... Remove this comment to see the full error message
    ImagePicker.openCamera(state.options)
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

  const gallery = () => {
    // @ts-expect-error TS(2345): Argument of type '{ width: number; height: number;... Remove this comment to see the full error message
    ImagePicker.openPicker(state.options)
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
    console.log(response);
    if (response.didCancel) {
    } else {
      let arrayPhoto = state.arrayPhoto;
      arrayPhoto.push({
        // @ts-expect-error TS(2322): Type 'any' is not assignable to type 'never'.
        data: response.data,
        // @ts-expect-error TS(2322): Type 'any' is not assignable to type 'never'.
        mime: response.mime,
        // @ts-expect-error TS(2322): Type 'any' is not assignable to type 'never'.
        exif: response.exif,
        // @ts-expect-error TS(2322): Type 'any' is not assignable to type 'never'.
        path: response.path,
      });
      setState((state) => ({ ...state, arrayPhoto, modalVisible: false }));
    }
  };

  const kirim = () => {
    setState((state) => ({ ...state, loading: true }));

    // @ts-expect-error TS(2693): 'FormData' only refers to a type, but is being use... Remove this comment to see the full error message
    const postData = new FormData();
    for (var i = 0; i < state.arrayPhoto.length; i++) {
      postData.append('file', {
        // @ts-expect-error TS(2339): Property 'path' does not exist on type 'never'.
        uri: state.arrayPhoto[i].path,
        type: 'image/jpg',
        name: 'qluster-' + i + '.jpg',
      });
    }
    postUpload(postData)
      .then((response: any) => {
        console.log(response);

        let data = {
          complaint_status_id:
            props.route.params.statusName === 'Terkirim'
              ? '42bed447-c3fa-4799-b8a0-f42451be4c37'
              : '5ddcd42b-7e27-48df-a11a-3cf197d76e51',
          response: state.tanggapan,
          image_urls: response.data.image_urls,
        };
        postComplainsStatus('/' + props.route.params.id + '/response', data)
          .then((response: any) => {
            console.log('response', response);
            setState((state) => ({ ...state, loading: false, modalVisible: false }));
            props.navigation.goBack();
            props.route.params.load();
            props.route.params.loadComplains();
            props.route.params.backLaporan();
          })
          .catch((error: any) => {
            console.log('Error', error);
            if (error.data.name === 'ComplaintReportNotFoundError') {
              Alert.alert(
                'Informasi',
                'Laporan telah dipindah tugaskan ke pengelola/petugas lain',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      setState((state) => ({ ...state, loading: false, modalVisible: false }));
                      props.navigation.goBack();
                      props.route.params.backLaporan();
                    },
                  },
                ],
                { cancelable: false },
              );
            } else {
              Alert.alert(
                'Informasi',
                'Petugas lain sudah menanggapi laporan ini',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      setState((state) => ({ ...state, loading: false, modalVisible: false }));
                      props.navigation.goBack();
                      props.route.params.backLaporan();
                    },
                  },
                ],
                { cancelable: false },
              );
            }
          });
      })
      .catch((error: any) => {
        console.log(error);
        setState((state) => ({ ...state, loading: false }));
        Alert.alert('' + error.status, '' + error.data);
      });
  };

  const renderModal = () => {
    return (
      <Modal
        onBackdropPress={() => setState((state) => ({ ...state, modalVisible: false }))}
        isVisible={state.modalVisible}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View
            style={[styles.modalBox, { backgroundColor: state.darkMode ? '#121212' : 'white' }]}
          >
            <View style={styles.viewModalTitle}>
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                style={[styles.textTitleModal, { color: state.darkMode ? 'white' : '#263238' }]}
              >
                Tambah Foto
              </CustomText>
              <TouchableOpacity
                style={styles.touchSilang}
                onPress={() => setState((state) => ({ ...state, modalVisible: false }))}
              >
                <Image source={allLogo.icSilang} style={styles.icSilangModal} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalRow}>
              <TouchableOpacity style={styles.touchChatCocierge} onPress={() => camera()}>
                <View style={styles.circleModal}>
                  <Image source={allLogo.icModalCamera} style={styles.icModalGallery} />
                </View>
                <CustomText
                  textType="semibold"
                  allowFontScaling={false}
                  style={[styles.textModal, { color: state.darkMode ? 'white' : '#263238' }]}
                >
                  {'Ambil foto'}
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchChatCocierge} onPress={() => gallery()}>
                <View style={styles.circleModal}>
                  <Image source={allLogo.icModalGallery} style={styles.icModalGallery} />
                </View>
                <CustomText
                  textType="semibold"
                  allowFontScaling={false}
                  style={[styles.textModal, { color: state.darkMode ? 'white' : '#263238' }]}
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

  const renderFoto = () => {
    return (
      <View style={{ marginTop: Platform.OS === 'android' ? toDp(24) : toDp(8) }}>
        <CustomText allowFontScaling={false} style={styles.textTitleField}>
          Foto tanggapan (max 5)
        </CustomText>
        <ScrollView horizontal={true} style={styles.scrollViewRow}>
          {state.arrayPhoto.map((item, index) => {
            return (
              <View style={styles.viewPhoto}>
                // @ts-expect-error TS(2339): Property 'path' does not exist on type 'never'.
                <Image source={{ uri: item.path }} style={styles.photoUpload} />
                <View style={styles.viewSilang}>
                  <TouchableOpacity
                    style={styles.circle}
                    onPress={() => {
                      let arrayPhoto = state.arrayPhoto;
                      arrayPhoto.splice(index, 1);
                      setState((state) => ({ ...state, arrayPhoto }));
                    }}
                  >
                    <Image source={allLogo.icSilang} style={styles.icSilang} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          {state.arrayPhoto.length !== 5 && (
            <TouchableOpacity
              style={styles.touchAddFoto}
              onPress={() => setState((state) => ({ ...state, modalVisible: true }))}
            >
              <Image source={allLogo.icCameraPlus} style={styles.icCamera} />
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Tanggapan Laporan'} onPress={() => props.navigation.goBack()} />
      {renderModal()}
      <Loader loading={state.loading} />
      <ScrollView>
        <KeyboardAvoidingView behavior={'padding'} enabled={Platform.OS === 'ios' ? true : false}>
          <View style={styles.content}>
            <View
              style={[
                styles.viewTextTitle,
                { backgroundColor: state.darkMode ? '#121212' : 'white' },
              ]}
            >
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                style={[styles.textTitleModal, { color: state.darkMode ? 'white' : '#9B9F95' }]}
              >
                {props.route.params.statusName === 'Terkirim'
                  ? 'TANGGAPAN PEMROSESAN LAPORAN'
                  : 'Tanggapan laporan Selesai diproses'.toUpperCase()}
              </CustomText>
              <View style={{ height: toDp(20) }} />
              <CustomTextArea
                title={'Tanggapan'}
                placeholder={'Masukkan tanggapan anda'}
                placeholderTextColor={'#CCCFC9'}
                error={state.errorTanggapan}
                value={state.tanggapan}
                maxLength={1600}
                onChangeText={(tanggapan: any) => {
                  setState((state) => ({ ...state, tanggapan }));
                  if (tanggapan.trim() === '') {
                    setState((state) => ({
                      ...state,
                      errorTanggapan: 'Field ini tidak boleh kosong.',
                    }));
                  } else {
                    setState((state) => ({ ...state, errorTanggapan: '' }));
                  }
                }}
                autoCapitalize={'sentences'}
                returnKeyType={'done'}
              />
              <View style={{ height: toDp(48) }} />
              {renderFoto()}
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={styles.footer}>
        {state.tanggapan.trim() === '' || state.arrayPhoto.length === 0 ? (
          <View style={[styles.touchKirim, { backgroundColor: '#CCCFC9' }]}>
            <CustomText textType="semibold" allowFontScaling={false} style={styles.textKirim}>
              Kirim
            </CustomText>
          </View>
        ) : (
          <TouchableOpacity
            style={[styles.touchKirim, { backgroundColor: '#5AAA0F' }]}
            onPress={() => kirim()}
          >
            <CustomText textType="semibold" t allowFontScaling={false} style={styles.textKirim}>
              Kirim
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
  },
  headeriOS: {
    width,
    height: toDp(20),
    backgroundColor: '#917438',
  },
  content: {
    alignItems: 'center',
    marginTop: toDp(24),
  },
  viewTextTitle: {
    width: width * 0.9,
    height: 'auto',
    backgroundColor: '#FFFFFF',
  },
  textInclude: {
    color: 'red',
    fontSize: toDp(12),
    fontWeight: '500',
    //fontFamily: 'Montserrat-Medium',
  },
  textTitleField: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(14),
    color: '#9B9F95',
    letterSpacing: toDp(0.6),
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
    backgroundColor: '#F6F7F4',
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
    backgroundColor: '#5AAA0F',
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
  icSilang: {
    width: toDp(16),
    height: toDp(16),
    tintColor: '#FFFFFF',
  },
  touchAddFoto: {
    width: toDp(80),
    height: toDp(80),
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F7F4',
  },
  icAddZoom: {
    width: toDp(48),
    height: toDp(48),
    tintColor: '#788F9C',
  },
  touchKirim: {
    width: '100%',
    height: toDp(40),
    borderRadius: toDp(10),
    backgroundColor: '#917438',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKirim: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-SemiBold',
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
    height: toDp(165),
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
    //fontFamily: 'Montserrat-Bold',
    fontSize: toDp(16),
    letterSpacing: toDp(1),
    color: '#263238',
  },
  touchSilang: {
    padding: toDp(4),
  },
  icSilangModal: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#5E6157',
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
    //fontFamily: 'Montserrat-Medium',
    fontSize: toDp(14),
    color: '#000000',
    letterSpacing: toDp(2),
  },
  touchLabelItem: {
    marginTop: toDp(16),
    flex: 1,
    alignItems: 'center',
  },
  picture: {
    width: toDp(48),
    height: toDp(48),
  },
  textLabel: {
    marginTop: toDp(4),
    textAlign: 'center',
    //fontFamily: 'Montserrat-Medium',
    fontSize: toDp(10),
    color: '#000000',
  },
  touchLabellaporan: {
    width: '100%',
    height: toDp(54),
    flexDirection: 'row',
  },
  icChevronDown: {
    width: toDp(28),
    height: toDp(28),
    tintColor: '#B0BEC5',
    position: 'absolute',
    right: toDp(0),
    bottom: toDp(4),
  },

  viewSearchRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    //marginTop: toDp(16),
    marginRight: toDp(8),
    marginBottom: toDp(8),
  },
  viewSearch: {
    width: '90%',
    marginLeft: toDp(24),
    marginRight: toDp(24),
    borderBottomWidth: toDp(1),
    borderColor: '#788F9C',
    borderRadius: toDp(4),
    height: toDp(44),
    alignItems: 'center',
    flexDirection: 'row',
  },
  icSearch2: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#8d96a6',
    marginLeft: toDp(12),
    marginRight: toDp(4),
  },
  touchAll: {
    position: 'absolute',
    right: toDp(8),
  },
  icDeleteAll: {
    width: toDp(24),
    height: toDp(24),
  },
  textInput: {
    flex: 1,
    fontSize: toDp(16),
    color: '#757575',
    //fontFamily: 'Montserrat-Medium',
    fontWeight: '300',
  },

  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: toDp(1),
    marginVertical: toDp(20),
    backgroundColor: '#e7ebee',
  },
  icCamera: {
    width: toDp(30),
    height: toDp(25.3),
    tintColor: '#CCCFC9',
  },
  icCalendar: {
    width: toDp(20),
    height: toDp(20),
    marginRight: toDp(8),
  },
  icLp: {
    width: toDp(20),
    height: toDp(20),
    marginRight: toDp(8),
  },
  text: {
    fontSize: toDp(12),
    color: '#000000',
    //fontFamily: 'Montserrat-Regular',
    letterSpacing: 0,
  },
  footer: {
    width,
    height: toDp(72),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: toDp(24),
    borderTopWidth: toDp(0.5),
    borderTopColor: '#DDE3E0',
  },
});

export default TanggapanScreen;
