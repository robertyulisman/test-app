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
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';
import { useNetInfo } from '@react-native-community/netinfo';
import { allLogo } from '@src/Assets';
import CustomImageView from '@src/Components/CustomImageView';
import CustomText from '@src/Components/CustomText';
import CustomTextInput from '@src/Components/CustomTextInput';
import Header from '@src/Components/Header';
import Loader from '@src/Components/Loader';
import NoConnection from '@src/Components/NoConnection';
import { toDp } from '@src/Helper/percentageToDP';
import { postBillingProcess, postUpload } from '@src/Services/Apis';
import ImagePicker from 'react-native-image-crop-picker';
import ImageView from 'react-native-image-viewing';
import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');

const billingType = [
  // {
  //   _id: '1abaf505-6785-5d40-a92b-2292b0253e78',
  //   type: 'PARTIAL',
  //   label: 'Cicilan',
  //   title: 'Cicilan',
  // },
  {
    _id: '94ddc504-30c2-55b4-b47e-57a6bf506fed',
    type: 'CASH',
    label: 'Lunas',
    title: 'Bayar Penuh',
  },
  {
    _id: 'b8a8beca-23f7-5a1d-a34d-21a21ff95c6f',
    type: 'CASH_ADVANCES',
    label: 'Cash Advance',
    title: 'Cash Advance',
  },
];

function formatRpToNumber(input) {
  return input.replace(/Rp\s*(\d+(?:\.\d{3})*)/g, (_, match) => match.replace(/\./g, ''));
}

const InfoBillingScreen = (props) => {
  const nominalTransfer = formatRpToNumber(props.route.params.nominal);
  const dataBilling = props.route.params.dataBilling;

  console.log('props nominal', nominalTransfer);
  const netInfo = useNetInfo();
  const [state, setState] = useState({
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
    isCheck: false,
    nominal: '',
  });

  const [billingTypeSelected, setBillingTypeSelected] = React.useState(null);

  const convert = (angka) => {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('');
  };

  const processUpload = (response) => {
    console.log('processUpload', response);
    if (response.didCancel) {
    } else {
      const postData = new FormData();
      postData.append('file', {
        uri: response.path,
        type: 'image/jpg',
        name: 'buktibayar.jpg',
      });
      setState((state) => ({ ...state, loading: true }));
      postUpload(postData)
        .then((response) => {
          console.log(response);
          setState((state) => ({
            ...state,
            loading: false,
            modalVisible: false,
            imageUrl: response.data.image_urls[0],
          }));
        })
        .catch((error) => {
          console.log(error);
          setState((state) => ({
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
                Ambil Foto
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
                {props.route.params.bank.account_owner}
              </CustomText>
            </View>
          </View>
          <View style={{ marginTop: 22 }}>
            {billingType.map((item) => {
              return (
                <TouchableOpacity
                  key={item._id}
                  style={styles.viewCheck}
                  onPress={() => {
                    setBillingTypeSelected(item);
                    if (item.type === 'CASH_ADVANCES' || item.type === 'PARTIAL') {
                      setState({
                        ...state,
                        nominal: '',
                      });
                    } else {
                      setState({
                        ...state,
                        nominal: nominalTransfer,
                      });
                    }
                  }}
                >
                  <Image
                    source={
                      billingTypeSelected?._id !== item._id
                        ? allLogo.icCheck
                        : allLogo.icCheckActive
                    }
                    style={styles.icCheck}
                  />
                  <CustomText style={styles.textBayar}>{item.title}</CustomText>
                </TouchableOpacity>
              );
            })}
          </View>
          <CustomText style={styles.textNomor}>{'Nomor rekening'}</CustomText>
          <View style={styles.viewNomor}>
            <CustomText textType="medium" style={styles.textValueNomor}>
              {props.route.params.bank.account_number}
            </CustomText>
            <TouchableOpacity
              style={styles.touchSalin}
              onPress={() => {
                Clipboard.setString(props.route.params.bank.account_number);
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
          {/* <TouchableOpacity
            style={styles.viewCheck}
            onPress={() =>
              setState((state) => ({
                ...state,
                isCheck: !state.isCheck,
                nominal: '',
              }))
            }
          >
            <Image
              source={!state.isCheck ? allLogo.icCheck : allLogo.icCheckActive}
              style={styles.icCheck}
            />
            <CustomText style={styles.textBayar}>{'Bayar dengan cicilan'}</CustomText>
          </TouchableOpacity> */}

          {billingTypeSelected !== null &&
            (billingTypeSelected?.type === 'PARTIAL' ||
              billingTypeSelected?.type === 'CASH_ADVANCES') && (
              <View>
                <CustomText
                  style={styles.textNomor}
                >{`Nominal ${billingTypeSelected?.label}`}</CustomText>
                <View
                  style={[
                    styles.viewNomor,
                    {
                      justifyContent: 'flex-start',
                      backgroundColor: 'white',
                      borderWidth: toDp(1),
                      borderColor: '#5AAA0F',
                    },
                  ]}
                >
                  <CustomText
                    textType="medium"
                    style={[styles.textValueNomor, { width: toDp(32) }]}
                  >
                    {'Rp '}
                  </CustomText>
                  <View
                    style={{
                      width: toDp(200),
                      height: toDp(50),
                    }}
                  >
                    <CustomTextInput
                      style={styles.textNominal}
                      rootStyles={styles.rootStyles}
                      title={''}
                      placeholder={''}
                      error={''}
                      value={convert(state.nominal.replace(/[,.]/g, ''))}
                      onChangeText={(value) =>
                        setState((state) => ({
                          ...state,
                          nominal: value.replace(/[,.]/g, ''),
                        }))
                      }
                      keyboardType={'phone-pad'}
                      maxLength={10}
                    />
                  </View>
                </View>
                <CustomText style={styles.textPastikan}>
                  {`* Masukkan jumlah pembayaran sebagai ${billingTypeSelected?.label} `}
                </CustomText>
              </View>
            )}
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
              onPress={() => setState((state) => ({ ...state, modalVisible: true }))}
            >
              <Image source={allLogo.icCameraPlus} style={styles.icCameraPlus} />
            </TouchableOpacity>
          ) : Platform.OS === 'ios' ? (
            <View style={{ marginTop: toDp(5) }}>
              <TouchableOpacity
                onPress={() => setState((state) => ({ ...state, isImageViewVisible: true }))}
              >
                <Image source={{ uri: state.imageUrl }} style={[styles.imgUrl, { marginTop: 0 }]} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setState((state) => ({ ...state, imageUrl: '' }))}
                style={styles.touchPhoto}
              >
                <Image source={allLogo.icRemovePhoto} style={styles.icRemovePhoto} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ marginTop: toDp(5) }}>
              <CustomImageView style={[styles.imgUrl, { marginTop: 0 }]} uri={state.imageUrl} />
              <TouchableOpacity
                onPress={() => setState((state) => ({ ...state, imageUrl: '' }))}
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
              onRequestClose={() => setState((state) => ({ ...state, isImageViewVisible: false }))}
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
              tagihan Anda. maksimal Proses Verifikasi Maksimal 3 x 24 Jam.
            </CustomText>
            <TouchableOpacity
              onPress={() => {
                setState((prevState) => ({ ...prevState, modalSuccess: false }));
                props.route.params.loadPaidUnpaid();
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

  const prosesBilling = () => {
    // setState((state) => ({ ...state, loading: true }));

    console.log('state', state.nominal);
    let data = {
      image_url: state.imageUrl,
      note: 'Bank: ' + props.route.params.bank.bank.name + '\nNominal: ' + parseInt(state.nominal),
      payment: parseInt(state.nominal),
      messages: `Pembayaran telah di unggah oleh Penghuni dengan jenis Pembayaran ${billingTypeSelected?.title}`,
      // is_partial_payment: state.isCheck,
      payment_type: billingTypeSelected?.type,
      ids: dataBilling.map((i) => i.id),
    };

    console.log('data ==============>>>> ', data.ids);

    postBillingProcess(data)
      .then((response) => {
        // console.log('response', response);
        setState((state) => ({
          ...state,
          loading: false,
          modalSuccess: true,
          nominal: '',
        }));
        setBillingTypeSelected(null);
      })
      .catch((err) => {
        console.log('err post billing process', err);
        setState((state) => ({ ...state, loading: false, nominal: '' }));
        setBillingTypeSelected(null);
      });
  };

  const kirimBuktiTransfer = () => {
    console.log('state', state);
    if (!validationPayment()) {
      if (
        billingTypeSelected.type === 'PARTIAL' &&
        parseInt(state.nominal) >= parseInt(nominalTransfer)
      ) {
        return Alert.alert('Informasi', 'Nominal Cicilan harus lebih kecil dari Nominal transfer', [
          {
            text: 'OK',
            onPress: () => setState((state) => ({ ...state, loading: false })),
          },
        ]);
      }

      console.log('billingTypeSelected.type', billingTypeSelected.type);
      console.log('state.nominal', parseInt(state.nominal));

      if (
        billingTypeSelected.type === 'CASH_ADVANCES' &&
        parseInt(state.nominal) <= parseInt(nominalTransfer)
      ) {
        return Alert.alert(
          'Informasi',
          'Nominal Cash Advance harus lebih Besar dari Nominal transfer',
          [
            {
              text: 'OK',
              onPress: () => setState((state) => ({ ...state, loading: false })),
            },
          ],
        );
      }

      prosesBilling();
    }
  };

  const validationPayment = () => {
    if (state.imageUrl === '') return true;
    if (billingTypeSelected === null) return true;
    if (billingTypeSelected.type === 'PARTIAL' && state.nominal === '') return true;
    if (billingTypeSelected.type === 'CASH_ADVANCES' && state.nominal === '') return true;

    return false;
  };

  const renderFooter = () => {
    return (
      <View style={styles.viewFooter}>
        <TouchableOpacity
          disabled={validationPayment()}
          style={[
            styles.touchFooter,
            { backgroundColor: validationPayment() ? '#CCCFC9' : '#5AAA0F' },
          ]}
          onPress={() => kirimBuktiTransfer()}
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
  textNominal: {
    fontSize: toDp(18),
    color: '#383B34',
    fontWeight: '600',
    // marginTop: toDp(6),
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
  viewCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: toDp(16),
  },
  icCheck: {
    width: toDp(24),
    height: toDp(24),
  },
  textBayar: {
    fontSize: toDp(14),
    color: '#5E6157',
    marginLeft: toDp(8),
  },
  rootStyles: {
    backgroundColor: 'white',
  },
});

export default InfoBillingScreen;
