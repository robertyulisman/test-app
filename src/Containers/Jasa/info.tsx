import React, { useEffect, useState } from 'react';
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
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import NoConnection from '../../Components/NoConnection';

import Clipboard from '@react-native-clipboard/clipboard';

import { allLogo } from '../../Assets';
import Header from '../../Components/Header';
import { toDp } from '../../Helper/percentageToDP';

import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';

import ImageView from 'react-native-image-viewing';
import CustomImageView from '../../Components/CustomImageView';
import Loader from '../../Components/Loader';

import CustomText from '../../Components/CustomText';

import { postServicePaymentProcess, postUpload } from '../../Services/Apis';

const { width, height } = Dimensions.get('window');
const InfoJasaScreen = (props: any) => {
  const netInfo = useNetInfo();
  const [state, setState] = useState<any>({
    isImageViewVisible: false,
    arrayMenu: '',
    imageUrl: '',
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
    modalSuccess: false,
  });

  useEffect(() => {
    console.log('PROPS', props);
  }, []);

  const processUpload = (response: any) => {
    console.log('processUpload', response);
    if (response.didCancel) {
    } else {
      // @ts-expect-error TS(2693): 'FormData' only refers to a type, but is being use... Remove this comment to see the full error message
      const postData = new FormData();
      postData.append('file', {
        uri: response.path,
        type: 'image/jpg',
        name: 'buktibayar.jpg',
      } as any);
      setState((state: any) => ({ ...state, loading: true }));
      postUpload(postData)
        .then((response) => {
          console.log(response);
          setState((state: any) => ({
            ...state,
            loading: false,
            modalVisible: false,
            imageUrl: response.data.image_urls[0],
          }));
        })
        .catch((error) => {
          console.log(error);
          setState((state: any) => ({
            ...state,
            loading: false,
            modalVisible: false,
            imageUrl: '',
          }));
          Alert.alert('' + error.status, '' + error.data);
        });
    }
  };

  const camera = () => {
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

  const renderModal = () => {
    return (
      <Modal
        onBackdropPress={() => setState((state: any) => ({ ...state, modalVisible: false }))}
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
                Ambil Foto
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
                  textType="semibold"
                  allowFontScaling={false}
                  style={[styles.textModal, { color: state.darkMode ? 'white' : 'black' }]}
                >
                  {'Camera'}
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.touchChatCocierge} onPress={() => gallery()}>
                <View style={styles.circleModal}>
                  <Image source={allLogo.icModalGallery} style={styles.icModalGallery} />
                </View>
                <CustomText
                  textType="semibold"
                  allowFontScaling={false}
                  style={[styles.textModal, { color: state.darkMode ? 'white' : 'black' }]}
                >
                  {'Gallery'}
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderContent = () => {
    return (
      <ScrollView>
        <View style={styles.content}>
          <CustomText textType="semibold" style={styles.textInfoTransfer}>
            {'INFO TRANSFER'}
          </CustomText>
          <CustomText style={styles.textSilahkan}>{'Silakan transfer ke rekening'}</CustomText>
          <View style={styles.viewRowContent}>
            <View style={styles.viewImage}>
              <Image
                source={{ uri: props.route.params.bank.bank.image_url }}
                style={styles.imgBank}
              />
            </View>
            <View style={{ marginLeft: toDp(20) }}>
              <CustomText textType="semibold" style={styles.textBank}>
                {props.route.params.bank.bank.name}
              </CustomText>
              <CustomText textType="semibold" style={styles.textBank}>
                PT Mahkota Permata Jaya
              </CustomText>
              {/*<CustomText textType='semibold' style={styles.textBank}>{props.route.params.bank.account_owner}</CustomText>*/}
            </View>
          </View>
          <CustomText style={styles.textNomor}>{'Nomor Rekening'}</CustomText>
          <View style={styles.viewNomor}>
            <CustomText textType="medium" style={styles.textValueNomor}>
              {props.route.params.bank.virtual_account_number}
            </CustomText>
            <TouchableOpacity
              style={styles.touchSalin}
              onPress={() => {
                Clipboard.setString(props.route.params.bank.virtual_account_number);
                if (Platform.OS === 'android') {
                  ToastAndroid.show('Copy', ToastAndroid.SHORT);
                }
              }}
            >
              <CustomText textType="semibold" style={styles.textSalin}>
                {'Salin'}
              </CustomText>
            </TouchableOpacity>
          </View>
          <CustomText style={styles.textNomor}>{'Nominal transfer'}</CustomText>
          <View style={styles.viewNomor}>
            <CustomText textType="medium" style={styles.textValueNomor}>
              {props.route.params.nominal}
            </CustomText>
            <TouchableOpacity
              style={styles.touchSalin}
              onPress={() => {
                Clipboard.setString('' + props.route.params.totalPrice);
                if (Platform.OS === 'android') {
                  ToastAndroid.show('Copy', ToastAndroid.SHORT);
                }
              }}
            >
              <CustomText textType="semibold" style={styles.textSalin}>
                {'Salin'}
              </CustomText>
            </TouchableOpacity>
          </View>
          <CustomText style={styles.textPastikan}>
            {'* Pastikan jumlah yang anda transfer benar'}
          </CustomText>
          <View style={styles.batas} />
          <CustomText textType="semibold" style={styles.textInfoTransfer}>
            {'KONFIRMASI PEMBAYARAN'}
          </CustomText>
          <CustomText style={styles.textJika}>
            {'Jika sudah melakukan transfer, mohon upload bukti transfer untuk proses verifikasi.'}
          </CustomText>
          <CustomText style={styles.textUpload}>{'Upload bukti transfer'}</CustomText>

          {state.imageUrl === '' ? (
            <TouchableOpacity
              style={styles.touchUpload}
              onPress={() => setState((state: any) => ({ ...state, modalVisible: true }))}
            >
              <Image source={allLogo.icCameraPlus} style={styles.icCameraPlus} />
            </TouchableOpacity>
          ) : Platform.OS === 'ios' ? (
            <View style={{ marginTop: toDp(5) }}>
              <TouchableOpacity
                onPress={() => setState((state: any) => ({ ...state, isImageViewVisible: true }))}
              >
                <Image source={{ uri: state.imageUrl }} style={[styles.imgUrl, { marginTop: 0 }]} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setState((state: any) => ({ ...state, imageUrl: '' }))}
                style={styles.touchPhoto}
              >
                <Image source={allLogo.icRemovePhoto} style={styles.icRemovePhoto} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ marginTop: toDp(5) }}>
              <CustomImageView style={[styles.imgUrl, { marginTop: 0 }]} uri={state.imageUrl} />
              <TouchableOpacity
                onPress={() => setState((state: any) => ({ ...state, imageUrl: '' }))}
                style={styles.touchPhoto}
              >
                <Image source={allLogo.icRemovePhoto} style={styles.icRemovePhoto} />
              </TouchableOpacity>
            </View>
          )}

          {Platform.OS === 'ios' && (
            <ImageView
              images={[{ uri: state.imageUrl }]}
              animationType={'fade'}
              imageIndex={0}
              visible={state.isImageViewVisible}
              onRequestClose={() =>
                setState((state: any) => ({ ...state, isImageViewVisible: false }))
              }
            />
          )}
        </View>
      </ScrollView>
    );
  };

  const renderModalSuccess = () => {
    return (
      <Modal animationIn={'fadeIn'} animationOut={'fadeOut'} isVisible={state.modalSuccess}>
        <View
          style={{
            width: 'auto',
            height: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height: 'auto',
              paddingBottom: toDp(20),
              width: toDp(280),
              backgroundColor: '#FFFFFF',
              borderRadius: toDp(4),
              alignItems: 'center',
            }}
          >
            <Image
              source={allLogo.icSuccess}
              style={{
                width: toDp(80),
                height: toDp(80),
                marginTop: toDp(32),
                tintColor: '#5AAA0F',
              }}
            />
            <CustomText
              textType="semibold"
              style={{
                marginTop: toDp(25),
                fontSize: toDp(16),
                color: '#263238',
              }}
            >
              BUKTI TRANSFER TERKIRIM
            </CustomText>
            <CustomText
              style={{
                marginTop: toDp(10),
                fontSize: toDp(14),
                color: '#263238',
                textAlign: 'center',
                marginHorizontal: toDp(20),
              }}
            >
              Terima kasih telah melakukan pembayaran tagihan, kami akan memverifikasi pembayaran
              tagihan Anda.
            </CustomText>
            <TouchableOpacity
              onPress={() => {
                setState((prevState: any) => ({ ...prevState, modalSuccess: false }));
                props.route.params.loadDetails(props.route.params.id);
                props.navigation.goBack();
              }}
              style={styles.touchKembaliKeLogin}
            >
              <CustomText style={styles.textKembaliKeLogin}>OK</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.viewFooter}>
        <TouchableOpacity
          style={[
            styles.touchFooter,
            { backgroundColor: state.imageUrl === '' ? '#CCCFC9' : '#5AAA0F' },
          ]}
          onPress={() => {
            if (state.imageUrl !== '') {
              setState((state: any) => ({ ...state, loading: true }));
              let data = {
                image_url: state.imageUrl,
                note:
                  'Bank: ' +
                  props.route.params.bank.bank.name +
                  '\nNominal: ' +
                  props.route.params.nominal,
              };
              postServicePaymentProcess(props.route.params.id, data)
                .then((response) => {
                  console.log('response', response);
                  setState((state: any) => ({
                    ...state,
                    loading: false,
                    modalSuccess: true,
                  }));
                })
                .catch((err) => {
                  console.log('err', err);
                  setState((state: any) => ({ ...state, loading: false }));
                });
            }
          }}
        >
          <CustomText textType="semibold" style={styles.textFooter}>
            {'Kirim Bukti Transfer'}
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Info Bayar'} onPress={() => props.navigation.goBack()} />
      <Loader loading={state.loading} />
      {renderModal()}
      {renderModalSuccess()}
      {!netInfo.isConnected ? <NoConnection /> : renderContent()}
      {netInfo.isConnected && renderFooter()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: toDp(20),
  },
  viewRowContent: {
    flexDirection: 'row',
    marginTop: toDp(5),
    alignItems: 'center',
  },
  viewImage: {
    width: toDp(60),
    height: toDp(60),
    backgroundColor: '#F6F7F4',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInfoTransfer: {
    fontSize: toDp(16),
    color: '#9B9F95',
  },
  textNomor: {
    fontSize: toDp(14),
    color: '#383B34',
    marginTop: toDp(20),
  },
  textPastikan: {
    fontSize: toDp(12),
    color: '#383B34',
    marginTop: toDp(5),
  },
  viewNomor: {
    width: toDp(320),
    height: toDp(50),
    backgroundColor: '#F6F7F4',
    borderRadius: toDp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: toDp(20),
    paddingRight: toDp(14),
    marginTop: toDp(5),
  },
  textValueNomor: {
    fontSize: toDp(18),
    color: '#383B34',
  },
  touchSalin: {
    width: toDp(61),
    height: toDp(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSalin: {
    fontSize: toDp(14),
    color: '#5AAA0F',
  },
  textBank: {
    fontSize: toDp(14),
    color: '#383B34',
    height: toDp(24),
  },
  textSilahkan: {
    fontSize: toDp(14),
    color: '#383B34',
    marginTop: toDp(20),
  },
  viewFooter: {
    width,
    alignItems: 'center',
    borderTopColor: '#DDE3E0',
    borderTopWidth: toDp(1),
    paddingTop: toDp(10),
    paddingBottom: Platform.OS === 'android' ? toDp(16) : toDp(10),
    /*shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,*/
  },
  touchFooter: {
    width: toDp(320),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFooter: {
    fontSize: toDp(14),
    color: 'white',
  },
  imgBank: {
    width: toDp(40),
    height: toDp(40),
    resizeMode: 'contain',
  },
  batas: {
    width,
    height: toDp(16),
    backgroundColor: '#F6F7F4',
    marginLeft: toDp(-20),
    marginTop: toDp(16),
    marginBottom: toDp(20),
  },
  textJika: {
    marginTop: toDp(20),
    fontSize: toDp(14),
    color: '#383B34',
  },
  textUpload: {
    marginTop: toDp(10),
    fontSize: toDp(14),
    color: '#9B9F95',
  },
  touchUpload: {
    width: toDp(80),
    height: toDp(80),
    backgroundColor: '#F6F7F4',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: toDp(5),
  },
  icCameraPlus: {
    width: toDp(30.67),
    height: toDp(28),
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
    color: '#263238',
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
  imgUrl: {
    width: toDp(80),
    height: toDp(80),
    borderRadius: toDp(4),
    marginTop: toDp(5),
  },
  img: {
    width,
    height: toDp(240),
    resizeMode: 'cover',
  },

  touchKembaliKeLogin: {
    marginTop: toDp(20),
    width: toDp(180),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKembaliKeLogin: {
    fontSize: toDp(14),
    color: '#FFFFFF',
    letterSpacing: toDp(0.2),
  },
  touchPhoto: {
    position: 'absolute',
    top: toDp(0),
    left: toDp(52),
    padding: toDp(4),
  },
  icRemovePhoto: {
    width: toDp(20),
    height: toDp(20),
  },
});

export default InfoJasaScreen;
