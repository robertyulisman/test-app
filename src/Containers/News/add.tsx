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

import moment from 'moment';
import { allLogo } from '../../Assets';
import Header from '../../Components/Header';
import { toDp } from '../../Helper/percentageToDP';

import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';

import CustomComboBox from '../../Components/CustomComboBox';
import CustomSelectCluster from '../../Components/CustomSelectCluster';
import CustomTextArea from '../../Components/CustomTextArea';
import CustomTextInput from '../../Components/CustomTextInput';
import Loader from '../../Components/Loader';

import { getClusters, getNewsCategories, postNewsCreate, postUpload } from '../../Services/Apis';

import CustomText from '../../Components/CustomText';

const { width, height } = Dimensions.get('window');
const AddNewsScreen = (props: any) => {
  const [state, setState] = useState<any>({
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
    optionsBanner: {
      width: 1080,
      height: 600,
      cropping: true,
      compressImageQuality: 0.2,
      compressImageMaxWidth: 1080,
      compressImageMaxHeight: 600,
      includeExif: true,
      mediaType: 'photo',
    },
    type: 'news', //news or banner
    modalVisible: false,
    loading: false,

    modalLabel: false,
    arrayCategory: [],
    arrTower: [],
    cluster: '',
    arrayCluster: [],
    darkMode: false,
    touch: true,
    isBanner: false,
    bannerImageUrl: '',
  });

  useEffect(() => {
    getNewsCategories()
      .then((response) => {
        console.log(response);
        setState((state: any) => ({
          ...state,
          arrayCategory: response.data.news_categories,
          date: moment(new Date()).format('dddd, DD MMMM YYYY, HH:mm:ss') + ' WIB',
        }));
      })
      .catch((error) => {
        console.log(error);
      });
    getClusters('?page=1&per_page=200')
      .then((response) => {
        console.log(response);
        let arrTower: any = [];
        arrTower.push({
          id: 0,
          name: 'Semua cluster',
          status: false,
        });
        for (var i = 0; i < response.data.length; i++) {
          arrTower.push({
            id: response.data[i].id,
            name: response.data[i].name,
            status: false,
          });
        }
        setState((state: any) => ({ ...state, arrTower }));
      })
      .catch((error) => {
        console.log(error);
        // @ts-expect-error TS(2552): Cannot find name 'alert'. Did you mean 'Alert'?
        alert(error);
      });
  }, []);

  const renderFoto = () => {
    return (
      <View>
        <CustomText textType="regular" allowFontScaling={false} style={styles.textTitleField}>
          Gambar Berita
        </CustomText>
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
                      setState((state: any) => ({
                        ...state,
                        arrayPhoto,
                        isBanner: false,
                        bannerImageUrl: '',
                      }));
                    }}
                  >
                    <Image source={allLogo.icSilang} style={styles.icSilang} />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          {state.arrayPhoto.length !== 1 && (
            <TouchableOpacity
              style={styles.touchAddFoto}
              onPress={() =>
                setState((state: any) => ({ ...state, modalVisible: true, type: 'news' }))
              }
            >
              <Image source={allLogo.icCameraPlus} style={styles.icCamera} />
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  };

  useEffect(() => {
    if (state.isBanner) {
      cropBanner();
    } else {
      setState((state: any) => ({ ...state, bannerImageUrl: '' }));
    }
  }, [state.isBanner]);

  const camera = () => {
    ImagePicker.openCamera(state.type === 'news' ? state.options : state.optionsBanner)
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
    ImagePicker.openPicker(state.type === 'news' ? state.options : state.optionsBanner)
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
    //console.log(response)
    if (response.didCancel) {
    } else {
      console.log('state.type', state.type);
      if (state.type === 'news') {
        let arrayPhoto = state.arrayPhoto;
        arrayPhoto.push({
          data: response.data,
          mime: response.mime,
          exif: response.exif,
          path: response.path,
        });

        setState((state: any) => ({ ...state, arrayPhoto, modalVisible: false }));
      } else {
        //Banner
        // @ts-expect-error TS(2693): 'FormData' only refers to a type, but is being use... Remove this comment to see the full error message
        const postData = new FormData();
        postData.append('file', {
          uri: response.path,
          type: 'image/jpg',
          name: 'centralconnect-banner.jpg',
        } as any);
        setState((state: any) => ({ ...state, loading: true }));
        postUpload(postData)
          .then((response) => {
            console.log(response);
            setState((state: any) => ({
              ...state,
              loading: false,
              modalVisible: false,
              bannerImageUrl: response.data.image_urls[0],
            }));
          })
          .catch((error) => {
            console.log(error);
            setState((state: any) => ({ ...state, loading: false, modalVisible: false }));
            Alert.alert('' + error.status, '' + error.data);
          });
      }
    }
  };

  const renderModal = () => {
    return (
      <Modal
        onBackdropPress={() => setState({ modalVisible: false })}
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
                onPress={() => setState((state: any) => ({ ...state, modalVisible: false }))}
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
                  textType="regular"
                  allowFontScaling={false}
                  style={[styles.textModal, { color: state.darkMode ? 'white' : 'black' }]}
                >
                  {'Ambil foto'}
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchChatCocierge} onPress={() => gallery()}>
                <View style={styles.circleModal}>
                  <Image source={allLogo.icModalGallery} style={styles.icModalGallery} />
                </View>
                <CustomText
                  textType="regular"
                  allowFontScaling={false}
                  style={[styles.textModal, { color: state.darkMode ? 'white' : 'black' }]}
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

  const cropBanner = () => {
    ImagePicker.openCropper({
      path: state.arrayPhoto[0].path,
      width: 1080,
      height: 600,
      cropping: true,
      compressImageQuality: 0.2,
      compressImageMaxWidth: 1080,
      compressImageMaxHeight: 600,
      includeExif: true,
      mediaType: 'photo',
    })
      .then((response) => {
        console.log('ImagePicker.openCropper response', response);
        // @ts-expect-error TS(2693): 'FormData' only refers to a type, but is being use... Remove this comment to see the full error message
        const postData = new FormData();
        postData.append('file', {
          uri: response.path,
          type: 'image/jpg',
          name: 'centralconnect-banner.jpg',
        } as any);

        setState((state: any) => ({ ...state, loading: true }));
        postUpload(postData)
          .then((response) => {
            console.log(response);
            setState((state: any) => ({
              ...state,
              loading: false,
              modalVisible: false,
              bannerImageUrl: response.data.image_urls[0],
            }));
          })
          .catch((error) => {
            console.log(error);
            setState((state: any) => ({ ...state, loading: false, modalVisible: false }));
            Alert.alert('' + error.status, '' + error.data);
          });
      })
      .catch((err) => {
        console.log('err', err);
        setState((state: any) => ({ ...state, isBanner: false }));
      });
  };

  const kirim = () => {
    if (state.desciption.length < 10) {
      setState((state: any) => ({ ...state, errorDesciption: 'Field ini minimal 10 karakter.' }));
    } else {
      let pictures = state.pictures;
      // @ts-expect-error TS(2693): 'FormData' only refers to a type, but is being use... Remove this comment to see the full error message
      const postData = new FormData();
      for (var i = 0; i < state.arrayPhoto.length; i++) {
        postData.append('file', {
          uri: state.arrayPhoto[i].path,
          type: 'image/jpg',
          name: 'qluster-' + i + '.jpg',
        } as any);
      }
      setState((state: any) => ({ ...state, loading: true }));

      if (state.touch) {
        setState((state: any) => ({ ...state, touch: false }));
        postUpload(postData)
          .then((response) => {
            console.log(response);

            let data = {
              title: state.title,
              content: state.desciption,
              image_url: response.data.image_urls[0],
              news_category_id: state.idCategory,
              is_published: true,
              cluster_ids: state.arrayCluster,
              is_banner: state.isBanner,
              banner_image_url: state.bannerImageUrl,
            };

            postNewsCreate(data)
              .then((response) => {
                console.log(response);
                props.route.params.showMessageSuccess();
                props.route.params.loadNews();
                props.navigation.goBack();
                setState((state: any) => ({ ...state, loading: false }));
              })
              .catch((error) => {
                console.log(error);
                setState((state: any) => ({ ...state, loading: false }));
                Alert.alert('' + error.status, '' + error.data.message);
              });
          })
          .catch((error) => {
            console.log(error);
            setState((state: any) => ({ ...state, loading: false }));
            Alert.alert('' + error.status, '' + error.data);
          });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Buat Berita'} onPress={() => props.navigation.goBack()} />
      <Loader loading={state.loading} />
      {renderModal()}
      <ScrollView>
        <KeyboardAvoidingView behavior={'padding'} enabled={Platform.OS === 'ios' ? true : false}>
          <View style={styles.rowView}>
            <Image
              source={allLogo.icCalendar}
              style={[styles.icCalendar, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
            />
            <CustomText
              textType="regular"
              allowFontScaling={false}
              style={[styles.text, { color: state.darkMode ? 'white' : '#5E6157' }]}
            >
              {state.date}
            </CustomText>
          </View>
          <View style={styles.content}>
            <View
              style={[
                styles.viewTextTitle,
                { backgroundColor: state.darkMode ? '#121212' : 'white' },
              ]}
            >
              {renderFoto()}

              <TouchableOpacity
                style={styles.touchTam}
                onPress={() => {
                  if (state.arrayPhoto.length !== 0) {
                    setState((state: any) => ({ ...state, isBanner: !state.isBanner }));
                  }
                }}
              >
                <Image
                  source={state.isBanner ? allLogo.icNewsCheck : allLogo.icCheckboxUnChecked}
                  style={styles.icCheckbox}
                />
                <CustomText
                  textType="regular"
                  allowFontScaling={false}
                  style={[styles.textWhiteTitle, { color: state.isBanner ? '#273238' : '#9B9F95' }]}
                >
                  {'Tampilkan sebagai banner'}
                </CustomText>
              </TouchableOpacity>
              {state.isBanner && (
                <View style={styles.viewHide}>
                  {state.bannerImageUrl === '' ? (
                    <TouchableOpacity
                      style={[styles.touchAddFoto, { marginTop: toDp(10) }]}
                      onPress={() =>
                        setState((state: any) => ({ ...state, modalVisible: true, type: 'banner' }))
                      }
                    >
                      <Image source={allLogo.icCameraPlus} style={styles.icCamera} />
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={[
                        styles.viewHide,
                        { marginLeft: 0, marginTop: toDp(-16), marginBottom: toDp(16) },
                      ]}
                    >
                      <Image source={{ uri: state.bannerImageUrl }} style={styles.bannerImageUrl} />
                      <View style={styles.viewSilangBanner}>
                        <TouchableOpacity
                          style={styles.circle}
                          onPress={() => {
                            setState((state: any) => ({ ...state, bannerImageUrl: '' }));
                            cropBanner();
                          }}
                        >
                          <Image source={allLogo.icBannerReplace} style={styles.icBannerReplace} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </View>
              )}

              <CustomTextInput
                title={'Judul Berita'}
                placeholder={'Masukkan judul berita'}
                error={state.errorTitle}
                value={state.title}
                maxLength={255}
                onChangeText={(title: any) => {
                  setState((state: any) => ({ ...state, title }));
                  if (title.trim() === '') {
                    setState((state: any) => ({
                      ...state,
                      errorTitle: 'Field ini tidak boleh kosong.',
                    }));
                  } else {
                    setState((state: any) => ({ ...state, errorTitle: '' }));
                  }
                }}
                // onSubmitEditing={() => desciption.focus()}
                autoCapitalize={'sentences'}
                returnKeyType={'next'}
              />
              <View style={{ height: toDp(16) }} />
              {state.arrayCategory.length !== 0 && (
                <CustomComboBox
                  darkMode={state.darkMode}
                  title={'Kategori Berita'}
                  desc={''}
                  textPlaceholder={'Pilih kategori berita'}
                  value={state.nameCategory}
                  arrayData={state.arrayCategory}
                  onSelected={(item: any, index: number) => {
                    setState((state: any) => ({
                      ...state,
                      idCategory: item.id,
                      nameCategory: item.name,
                    }));
                  }}
                />
              )}
              <View style={{ height: toDp(8) }} />
              {state.arrTower.length !== 0 && (
                <CustomSelectCluster
                  darkMode={state.darkMode}
                  title={'Cluster Tujuan'}
                  desc={''}
                  textPlaceholder={'Pilih cluster tujuan berita'}
                  value={state.cluster}
                  arrayData={state.arrTower}
                  onSelected={(array: any) => {
                    if (array.length === 0) {
                      setState((state: any) => ({ ...state, cluster: '', arrayCluster: array }));
                    } else {
                      setState((state: any) => ({
                        ...state,
                        cluster: '' + array.length + ' Cluster',
                        arrayCluster: array,
                      }));
                    }
                  }}
                />
              )}
              <View style={{ height: toDp(8) }} />
              <CustomTextArea
                title={'Isi Berita'}
                placeholder={'Masukkan isi berita'}
                error={state.errorDesciption}
                value={state.desciption}
                onChangeText={(desciption: any) => {
                  setState((state: any) => ({ ...state, desciption }));
                  if (desciption.trim() === '') {
                    setState((state: any) => ({
                      ...state,
                      errorDesciption: 'Field ini tidak boleh kosong.',
                    }));
                  } else {
                    setState((state: any) => ({ ...state, errorDesciption: '' }));
                  }
                }}
                autoCapitalize={'sentences'}
                returnKeyType={'next'}
              />
              <View style={{ height: toDp(70) }} />
              {state.title.trim() === '' ||
              state.desciption.trim() === '' ||
              state.nameCategory === '' ||
              state.arrayPhoto.length === 0 ? (
                <View style={[styles.touchKirim, { backgroundColor: '#CCCFC9' }]}>
                  <CustomText textType="semibold" allowFontScaling={false} style={styles.textKirim}>
                    SIMPAN
                  </CustomText>
                </View>
              ) : (
                <TouchableOpacity style={styles.touchKirim} onPress={() => kirim()}>
                  <CustomText textType="semibold" allowFontScaling={false} style={styles.textKirim}>
                    SIMPAN
                  </CustomText>
                </TouchableOpacity>
              )}
              <View style={{ height: toDp(44) }} />
            </View>
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
    //paddingTop: Platform.OS === 'android' ? toDp(28) : 0,
    //paddingBottom: Platform.OS === 'android' ? toDp(28) : 0,
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
    fontSize: toDp(12),
    fontWeight: '500',
    //fontFamily: 'Montserrat-Medium',
  },
  textTitleField: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(12),
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
    backgroundColor: '#e7ebee',
  },
  photoUpload: {
    width: toDp(80),
    height: toDp(80),
    borderRadius: toDp(4),
  },
  bannerImageUrl: {
    width: toDp(288),
    height: toDp(160),
    borderRadius: toDp(4),
  },
  viewSilang: {
    width: toDp(80),
    height: toDp(80),
    position: 'absolute',
  },
  viewSilangBanner: {
    width: toDp(288),
    height: toDp(160),
    position: 'absolute',
  },
  circle: {
    position: 'absolute',
    top: toDp(4),
    right: toDp(4),
  },
  icBannerReplace: {
    width: toDp(24),
    height: toDp(24),
  },
  icSilang: {
    width: toDp(16),
    height: toDp(16),
    tintColor: '#FFFFFF',
  },
  touchAddFoto: {
    width: toDp(80),
    height: toDp(80),
    borderRadius: toDp(4),
    marginBottom: toDp(16),
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
    borderRadius: toDp(4),
    backgroundColor: '#5AAA0F',
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
    tintColor: '#263238',
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
    backgroundColor: '#F6F7F4',
    height: toDp(54),
    paddingHorizontal: toDp(20),
  },
  line: {
    height: toDp(1),
    marginVertical: toDp(20),
    backgroundColor: '#e7ebee',
  },
  icCamera: {
    width: toDp(30.67),
    height: toDp(28),
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
  touchTam: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: toDp(24),
  },
  icCheckbox: {
    width: toDp(18),
    height: toDp(18),
    marginRight: toDp(10),
  },
  textWhiteTitle: {
    color: '#273238',
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
  },
  viewHide: {
    marginLeft: toDp(28),
    //marginTop: toDp(10)
  },
  textWhiteUggah: {
    color: '#788F9C',
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
  },
});

export default AddNewsScreen;
