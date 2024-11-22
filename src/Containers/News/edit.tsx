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

// import { allLogo } from "@Assets";
// import Header from '@Header';
// import { toDp } from "@percentageToDP";
import moment from 'moment';

import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';

import CustomComboBox from '../../Components/CustomComboBox';
// import CustomSelectCluster from "@CustomSelectCluster";
// import CustomTextArea from "@CustomTextArea";
// import CustomTextInput from "@CustomTextInput";
// import Loader from "@Loader";

// import CustomText from "@CustomText";
import { allLogo } from '@src/Assets';
import CustomSelectCluster from '@src/Components/CustomSelectCluster';
import CustomText from '@src/Components/CustomText';
import CustomTextArea from '@src/Components/CustomTextArea';
import Header from '@src/Components/Header';
import { toDp } from '@src/Helper/percentageToDP';
import { getClusters, getNewsCategories, postUpload, putNewsEdit } from '@src/Services/Apis';

const { width, height } = Dimensions.get('window');
const EditNewsScreen = (props: any) => {
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

    isChangePhoto: false,
    isChangeCluster: false,
  });

  useEffect(() => {
    getNewsCategories()
      .then((response) => {
        console.log(response);
        setState((state) => ({
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
          status: props.route.params.item.clusters.length === response.data.length,
        });
        for (var i = 0; i < response.data.length; i++) {
          let status = false;
          for (var j = 0; j < props.route.params.item.clusters.length; j++) {
            let obj = props.route.params.item.clusters[j];
            if (obj.id === response.data[i].id) {
              status = true;
            }
          }
          arrTower.push({
            id: response.data[i].id,
            name: response.data[i].name,
            status,
          });
        }
        setState((state) => ({
          ...state,
          arrTower,
          statusAll: props.route.params.item.clusters.length === response.data.length,
        }));
      })
      .catch((error) => {
        console.log(error);
        // @ts-expect-error TS(2552): Cannot find name 'alert'. Did you mean 'Alert'?
        alert(error);
      });

    setDefaultEdit();
  }, []);

  const replaceStringNews = (body: any) => {
    return body
      .replace(/(<([^>]+)>)/gi, '')
      .replace('&nbsp;', '')
      .replace('&nbsp;', '');
  };

  const setDefaultEdit = () => {
    console.log('props item', props.route.params.item);

    // @ts-expect-error TS(2345): Argument of type '(state: { date: string; title: s... Remove this comment to see the full error message
    setState((state) => ({
      ...state,
      date: '',
      title: props.route.params.item.title,
      desciption: replaceStringNews(props.route.params.item.content),
      arrayPhoto: [{ path: props.route.params.item.image_url }],

      idCategory: props.route.params.item.news_category.id,
      nameCategory: props.route.params.item.news_category.name,

      arrayHolder: [],
      valueSearch: '',

      isChangePhoto: false,

      errorTitle: '',
      errorDesciption: '',

      latitude: '',
      longitude: '',
      type: 'news', //news or banner
      modalVisible: false,
      loading: false,

      modalLabel: false,
      arrayCategory: [],

      cluster: '' + props.route.params.item.clusters.length + ' Cluster',
      arrayCluster: props.route.params.item.clusters,

      darkMode: false,
      touch: true,

      isBanner: props.route.params.item.is_banner,
      bannerImageUrl: props.route.params.item.banner_image_url,
    }));
  };

  const renderFoto = () => {
    return (
      <View>
        <CustomText textType="regular" allowFontScaling={false} style={styles.textTitleField}>
          Gambar Berita
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
                      setState((state) => ({
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
                setState((state) => ({
                  ...state,
                  modalVisible: true,
                  type: 'news',
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

  const camera = () => {
    // @ts-expect-error TS(2345): Argument of type '{ width: number; height: number;... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2345): Argument of type '{ width: number; height: number;... Remove this comment to see the full error message
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

        setState((state) => ({
          ...state,
          arrayPhoto,
          modalVisible: false,
          isChangePhoto: true,
        }));
      } else {
        //Banner
        const postData = new FormData();
        postData.append('file', {
          uri: response.path,
          type: 'image/jpg',
          name: 'centralconnect-banner.jpg',
        });
        setState((state) => ({ ...state, loading: true }));
        postUpload(postData)
          .then((response) => {
            console.log(response);
            setState((state) => ({
              ...state,
              loading: false,
              modalVisible: false,
              bannerImageUrl: response.data.image_urls[0],
            }));
          })
          .catch((error) => {
            console.log(error);
            setState((state) => ({
              ...state,
              loading: false,
              modalVisible: false,
            }));
            Alert.alert('' + error.status, '' + error.data);
          });
      }
    }
  };

  const renderModal = () => {
    return (
      <Modal
        // @ts-expect-error TS(2345): Argument of type '{ modalVisible: false; }' is not... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2339): Property 'path' does not exist on type 'never'.
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
        const postData = new FormData();
        postData.append('file', {
          uri: response.path,
          type: 'image/jpg',
          name: 'centralconnect-banner.jpg',
        });

        setState((state) => ({ ...state, loading: true }));
        postUpload(postData)
          .then((response) => {
            console.log(response);
            setState((state) => ({
              ...state,
              loading: false,
              modalVisible: false,
              bannerImageUrl: response.data.image_urls[0],
            }));
          })
          .catch((error) => {
            console.log(error);
            setState((state) => ({
              ...state,
              loading: false,
              modalVisible: false,
            }));
            Alert.alert('' + error.status, '' + error.data);
          });
      })
      .catch((err) => {
        console.log('err', err);
        setState((state) => ({ ...state, isBanner: false }));
      });
  };

  const kirim = () => {
    if (state.desciption.length < 10) {
      setState((state) => ({
        ...state,
        errorDesciption: 'Field ini minimal 10 karakter.',
      }));
    } else {
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

      if (state.touch) {
        setState((state) => ({ ...state, touch: false }));

        let clusterIds: any = [];
        if (!state.isChangeCluster) {
          for (var i = 0; i < state.arrayCluster.length; i++) {
            // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
            clusterIds.push(state.arrayCluster[i].id);
          }
        } else {
          clusterIds = state.arrayCluster;
        }

        if (state.isChangePhoto) {
          postUpload(postData)
            .then((response) => {
              console.log(response);
              let data = {
                id: props.route.params.item.id,
                title: state.title,
                content: state.desciption,
                image_url: response.data.image_urls[0],
                news_category_id: state.idCategory,
                is_published: true,
                is_banner: state.isBanner,
                banner_image_url: state.bannerImageUrl,
                cluster_ids: clusterIds,
              };
              apiEdit(data);
            })
            .catch((error) => {
              console.log(error);
              setState((state) => ({ ...state, loading: false }));
              Alert.alert('' + error.status, '' + error.data);
            });
        } else {
          let data = {
            id: props.route.params.item.id,
            title: state.title,
            content: state.desciption,
            image_url: props.route.params.item.image_url,
            news_category_id: state.idCategory,
            is_published: true,
            is_banner: state.isBanner,
            banner_image_url: state.bannerImageUrl,
            cluster_ids: clusterIds,
          };
          apiEdit(data);
        }
      }
    }
  };

  const apiEdit = (data: any) => {
    putNewsEdit(data)
      .then((_) => {
        setState((state) => ({
          ...state,
          loading: false,
        }));
        if (typeof props.route.params.loadNews == 'function') {
          props.route.params.loadNews();
        }
        props.route.params.load();
        props.route.params.loadComment();
        props.route.params.showMessageSuccess();
        props.navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('' + error.status, '' + error.data.message, [
          {
            text: 'OK',
            onPress: () =>
              setState((state) => ({
                ...state,
                loading: false,
              })),
          },
        ]);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Edit Berita'} onPress={() => props.navigation.goBack()} />
      // @ts-expect-error TS(2304): Cannot find name 'Loader'.
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
                    setState((state) => ({
                      ...state,
                      isBanner: !state.isBanner,
                    }));

                    if (!state.isBanner) {
                      cropBanner();
                    } else {
                      setState((state) => ({ ...state, bannerImageUrl: '' }));
                    }
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
                  // @ts-expect-error TS(17001): JSX elements cannot have multiple attributes with ... Remove this comment to see the full error message
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
                        setState((state) => ({
                          ...state,
                          modalVisible: true,
                          type: 'banner',
                        }))
                      }
                    >
                      <Image source={allLogo.icCameraPlus} style={styles.icCamera} />
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={[
                        styles.viewHide,
                        {
                          marginLeft: 0,
                          marginTop: toDp(-16),
                          marginBottom: toDp(16),
                        },
                      ]}
                    >
                      <Image source={{ uri: state.bannerImageUrl }} style={styles.bannerImageUrl} />
                      <View style={styles.viewSilangBanner}>
                        <TouchableOpacity
                          style={styles.circle}
                          onPress={() => {
                            setState((state) => ({
                              ...state,
                              bannerImageUrl: '',
                            }));
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
              // @ts-expect-error TS(2304): Cannot find name 'CustomTextInput'.
              <CustomTextInput
                title={'Judul Berita'}
                placeholder={'Masukkan judul berita'}
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
                // @ts-expect-error TS(2304): Cannot find name 'desciption'.
                onSubmitEditing={() => desciption.focus()}
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
                  onSelected={(item: any, index: any) => {
                    setState((state) => ({
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
                      setState((state) => ({
                        ...state,
                        cluster: '',
                        arrayCluster: array,
                      }));
                    } else {
                      setState((state) => ({
                        ...state,
                        cluster: '' + array.length + ' Cluster',
                        arrayCluster: array,
                        isChangeCluster: true,
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

export default EditNewsScreen;
