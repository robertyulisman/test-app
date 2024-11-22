import { allLogo } from '@src/Assets';
import CustomComboBox from '@src/Components/CustomComboBox';
import CustomText from '@src/Components/CustomText';
import CustomTextArea from '@src/Components/CustomTextArea';
import CustomTextInput from '@src/Components/CustomTextInput';
import Header from '@src/Components/Header';
import Loader from '@src/Components/Loader';
import { toDp } from '@src/Helper/percentageToDP';
import { getComplainsLabels, postComplainsCreate, postUpload } from '@src/Services/Apis';
import moment from 'moment';
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
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');
const AddReportScreen = (props: any) => {
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
    statusReport: 'Pribadi',
  });

  useEffect(() => {
    getComplainsLabels()
      .then((response: any) => {
        console.log(response);
        setState((state) => ({
          ...state,
          arrayCategory: response.data.complaint_categories,
          date: moment(new Date()).format('dddd, DD MMMM YYYY, HH:mm:ss') + ' WIB',
        }));
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  const onChangeTextSearch = (valueSearch: any) => {
    setState((state) => ({ ...state, valueSearch }));
  };

  useEffect(() => {
    const newData = state.arrayHolder.filter((item) => {
      // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
      const itemData = `${item.name.toUpperCase()}`;
      // @ts-expect-error TS(2304): Cannot find name 'valueSearch'.
      const textData = valueSearch.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setState((state) => ({ ...state, arrCategory: newData }));
  }, [state.valueSearch]);

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
    console.log('processUpload response', response);
    if (response.didCancel) {
    } else {
      let arrayPhoto = state.arrayPhoto;
      arrayPhoto.push({
        data: response.data,
        mime: response.mime,
        exif: response.exif,
        path: response.path,
      });
      setState((state) => ({ ...state, arrayPhoto, modalVisible: false }));
    }
  };

  const kirim = () => {
    if (state.desciption.length < 10) {
      setState((state) => ({ ...state, errorDesciption: 'Field ini minimal 10 karakter.' }));
    } else {
      let pictures = state.pictures;
      const postData = new FormData();
      for (var i = 0; i < state.arrayPhoto.length; i++) {
        postData.append('file', {
          // @ts-expect-error TS(2339): Property 'path' does not exist on type 'never'.
          uri: state.arrayPhoto[i].path,
          type: 'image/jpg',
          name: 'qluster-' + i + '.jpg',
        });
      }
      setState((state) => ({ ...state, loading: true }));

      postUpload(postData)
        .then((response: any) => {
          console.log(response);

          let data = {
            title: state.title,
            content: state.desciption,
            complaint_category_id: state.idCategory,
            image_urls: response.data.image_urls,
            is_public: false,
          };
          postComplainsCreate(data)
            .then((response: any) => {
              console.log(response);
              setState((state) => ({ ...state, loading: false }));
              props.route.params.showMessageSuccess();
              props.route.params.loadComplains();
              props.navigation.goBack();
            })
            .catch((error: any) => {
              console.log(error);
              Alert.alert('' + error.status, '' + error.data.message, [
                { text: 'OK', onPress: () => setState((state) => ({ ...state, loading: false })) },
              ]);
            });
        })
        .catch((error: any) => {
          console.log(error);
          Alert.alert('' + error.status, '' + error.data, [
            { text: 'OK', onPress: () => setState((state) => ({ ...state, loading: false })) },
          ]);
        });
    }
  };

  const renderFoto = () => {
    return (
      <View>
        <CustomText allowFontScaling={false} style={[styles.textTitleField, { color: '#9B9F95' }]}>
          Foto tanggapan (max 3)
        </CustomText>
        <ScrollView horizontal={true} style={styles.scrollViewRow}>
          {state.arrayPhoto.map((item, index) => {
            return (
              <View style={styles.viewPhoto}>
                {/* // @ts-expect-error TS(2339): Property 'path' does not exist on type 'never'. */}
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
          {state.arrayPhoto.length !== 3 && (
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

  const renderModal = () => {
    return (
      <Modal
        onBackButtonPress={() => setState((state) => ({ ...state, modalVisible: false }))}
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

  const renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={styles.touchLabelItem}
        onPress={() => {
          setState((state) => ({
            ...state,
            idCategory: item.id,
            nameCategory: item.name,
            modalLabel: false,
            valueSearch: '',
            arrCategory: state.arrayHolder,
          }));
        }}
      >
        <Image source={{ uri: item.picture }} style={styles.picture} />
        <Text allowFontScaling={false} style={styles.textLabel}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSearch = () => {
    return (
      <View style={styles.viewSearchRoot}>
        <View style={styles.viewSearch}>
          <Image source={allLogo.icSearch} style={styles.icSearch2} />
          <TextInput
            onChangeText={(valueSearch: any) => onChangeTextSearch(valueSearch)}
            autoCapitalize={'none'}
            underlineColorAndroid={'transparent'}
            value={state.valueSearch}
            style={styles.textInput}
            maxLength={20}
            placeholder={'Cari Label...'}
            autoFocus={false}
            placeholderTextColor={'#B0BEC5'}
          />
          {state.valueSearch !== '' && (
            <TouchableOpacity style={styles.touchAll} onPress={() => onChangeTextSearch('')}>
              <Image source={allLogo.icSilang} style={styles.icSilang} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Buat Laporan'} onPress={() => props.navigation.goBack()} />
      <Loader loading={state.loading} />
      {renderModal()}
      <KeyboardAvoidingView behavior={'padding'} enabled={Platform.OS === 'ios' ? true : false}>
        <ScrollView>
          <View style={styles.content}>
            <View
              style={{
                backgroundColor: '#F6F7F4',
                width,
                height: toDp(54),
                paddingHorizontal: toDp(16),
                justifyContent: 'center',
              }}
            >
              <View style={styles.rowView}>
                <Image
                  source={allLogo.icCalendar}
                  style={[styles.icCalendar, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
                />
                <CustomText
                  allowFontScaling={false}
                  style={[styles.text, { color: state.darkMode ? 'white' : '#5E6157' }]}
                >
                  {state.date}
                </CustomText>
              </View>
            </View>
            <View
              style={[
                styles.viewTextTitle,
                { backgroundColor: state.darkMode ? '#121212' : 'white' },
              ]}
            >
              <View style={{ height: toDp(20) }} />
              {renderFoto()}
              <View style={{ height: toDp(20) }} />
              <CustomTextInput
                title={'Judul laporan'}
                placeholder={'Masukkan judul laporan disini'}
                error={state.errorTitle}
                value={state.title}
                maxLength={255}
                onChangeText={(title: any) => {
                  setState((state) => ({ ...state, title }));
                  if (title.trim() === '') {
                    setState((state) => ({
                      ...state,
                      errorTitle: 'Field ini tidak boleh kosong.',
                    }));
                  } else {
                    setState((state) => ({ ...state, errorTitle: '' }));
                  }
                }}
                autoCapitalize={'sentences'}
                returnKeyType={'next'}
              />
              <View style={{ height: toDp(24) }} />
              {state.arrayCategory.length !== 0 && (
                <CustomComboBox
                  darkMode={state.darkMode}
                  title={'Label laporan'}
                  desc={''}
                  textPlaceholder={'Pilih Label laporan'}
                  value={state.nameCategory}
                  maxLength={2000}
                  arrayData={state.arrayCategory}
                  onSelected={(item: any, index: any) => {
                    setState((state) => ({
                      ...state,
                      idCategory: item.id,
                      nameCategory: item.name,
                    }));
                  }}
                />
              )}
              <View style={{ height: toDp(24) }} />
              <CustomTextArea
                title={'Deskripsi laporan'}
                placeholder={'Masukkan deskripsi laporan disini'}
                error={state.errorDesciption}
                value={state.desciption}
                onChangeText={(desciption: any) => {
                  setState((state) => ({ ...state, desciption }));
                  if (desciption.trim() === '') {
                    setState((state) => ({
                      ...state,
                      errorDesciption: 'Field ini tidak boleh kosong.',
                    }));
                  } else {
                    setState((state) => ({ ...state, errorDesciption: '' }));
                  }
                }}
                autoCapitalize={'sentences'}
                returnKeyType={'next'}
              />
              <View style={{ height: toDp(80) }} />
              {state.title.trim() === '' ||
              state.desciption.trim() === '' ||
              state.nameCategory === '' ||
              state.arrayPhoto.length === 0 ? (
                <View style={[styles.touchKirim, { backgroundColor: '#d3d6db' }]}>
                  <CustomText textType="semibold" allowFontScaling={false} style={styles.textKirim}>
                    Kirim Laporan
                  </CustomText>
                </View>
              ) : (
                <TouchableOpacity style={styles.touchKirim} onPress={() => kirim()}>
                  <CustomText textType="semibold" allowFontScaling={false} style={styles.textKirim}>
                    Kirim Laporan
                  </CustomText>
                </TouchableOpacity>
              )}
              <View style={{ height: toDp(44) }} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    fontSize: toDp(12),
    color: '#788F9C',
    //letterSpacing: toDp(0.6)
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
    borderRadius: toDp(10),
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
    //backgroundColor: '#917438',
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
    backgroundColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKirim: {
    fontSize: toDp(14),
    color: 'white',
    fontStyle: 'normal',
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
    fontSize: toDp(14),
    letterSpacing: toDp(2),
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
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: toDp(56),
  },
  touchPublic: {
    flexDirection: 'row',
    marginTop: toDp(10),
    marginLeft: toDp(6),
  },
  icPublic: {
    width: toDp(24),
    height: toDp(24),
  },
  textPublic: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    marginTop: toDp(4),
  },
  touchStatusPublicPrivate: {
    width: '100%',
    height: toDp(84),
    backgroundColor: '#DAD1BD',
    borderRadius: toDp(4),
  },
  viewAja: {
    width: '86%',
    height: toDp(48),
    marginLeft: toDp(10),
  },
  textLaporan: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    marginTop: toDp(6),
  },
  textTitleLaporan: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    marginBottom: toDp(12),
  },
});

export default AddReportScreen;
