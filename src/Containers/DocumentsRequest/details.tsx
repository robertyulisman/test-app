import React, { useRef, useState } from 'react';
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

import { useNetInfo } from '@react-native-community/netinfo';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { allLogo } from '../../Assets';
import CustomText from '../../Components/CustomText';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import Toast from '../../Components/Toast';
import { toDp } from '../../Helper/percentageToDP';
import { patchDocumentsRequestCancel } from '../../Services/Apis';
import styles from './styles';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

let limit = 0;
const { width, height } = Dimensions.get('window');

const DetailsDocumentsRequestScreen = (props: any) => {
  const netInfo = useNetInfo();
  const toast = useRef(null);
  const [state, setState] = useState({
    loading: false,
    item: props.route.params.item,
    isShowModalBatal: false,
    isDarkMode: false,
  });

  const modalConfirmationBatal = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={() => setState((prevState) => ({ ...prevState, isShowModalBatal: false }))}
        isVisible={state.isShowModalBatal}
      >
        <View style={styles2.viewModalCenter}>
          <View
            style={[
              styles2.modalBoxCenter,
              { backgroundColor: state.isDarkMode ? '#121212' : 'white', height: toDp(240) },
            ]}
          >
            <CustomText
              textType="semibold"
              style={[styles2.titleConfirm, { color: state.isDarkMode ? 'white' : '#263238' }]}
            >
              Konfirmasi Pembatalan
            </CustomText>
            <CustomText
              style={[styles2.textApakah, { color: state.isDarkMode ? 'white' : '#263238' }]}
            >
              Status akan menjadi Batal setelah anda menekan tombol Ya. Anda yakin ingin membatalkan
              documents request ?
            </CustomText>

            <View style={styles2.viewRow}>
              <TouchableOpacity
                style={styles2.touchTidak}
                onPress={() => setState((prevState) => ({ ...prevState, isShowModalBatal: false }))}
              >
                <CustomText textType="semibold" style={styles2.textTidak}>
                  Tidak
                </CustomText>
              </TouchableOpacity>
              <View style={{ width: toDp(10) }}></View>
              <TouchableOpacity style={styles2.touchYa} onPress={() => prosesBatal()}>
                <CustomText textType="semibold" style={styles2.textYa}>
                  Ya, Batal
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const prosesBatal = () => {
    patchDocumentsRequestCancel('/' + props.route.params.item.id)
      .then((response) => {
        console.log(response);
        setState((state) => ({ ...state, isShowModalBatal: false }));

        props.navigation.goBack();
        props.route.params.showMessageDelete();
        props.route.params.loadComplains();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const batal = () => {
    setState((state) => ({ ...state, isShowModalBatal: true }));
  };

  const changeColorStatus = (name: any) => {
    if (name === 'Terkirim') {
      return '#f53c3c';
    } else if (name === 'Proses') {
      return '#f2c141';
    } else if (name === 'Selesai') {
      return '#28a595';
    } else if (name === 'Batal') {
      return '#6b7b83';
    } else if (name === 'Invalid') {
      return '#6b7b83';
    }
  };

  const changeWidthStatus = (name: any) => {
    if (name === 'Terkirim') {
      return toDp(60);
    } else if (name === 'Proses') {
      return toDp(56);
    } else if (name === 'Selesai') {
      return toDp(56);
    } else if (name === 'Batal') {
      return toDp(50);
    } else if (name === 'Invalid') {
      return toDp(60);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Details Documents Request'} onPress={() => props.navigation.goBack()} />
      <Loader loading={state.loading} />
      <Toast ref={toast} />
      {modalConfirmationBatal()}
      <ScrollView>
        <View>
          <View style={styles.viewRow}>
            <View>
              <CustomText
                textType="semibold"
                numberOfLines={1}
                allowFontScaling={false}
                ellipsizeMode="tail"
                style={[
                  styles.itemTitle,
                  {
                    width: toDp(300),
                    color: state.isDarkMode ? 'white' : '#383B34',
                  },
                ]}
              >
                {state.item.document.name}
              </CustomText>
              <View style={[styles.viewRowItem, { alignItems: 'flex-start' }]}>
                <Image
                  source={allLogo.icLp}
                  style={[styles.icLp, { tintColor: state.isDarkMode ? 'white' : '#9B9F95' }]}
                />
                <CustomText
                  allowFontScaling={false}
                  style={[
                    styles.text,
                    { width: toDp(300), color: state.isDarkMode ? 'white' : '#5E6157' },
                  ]}
                >
                  {state.item.description ? state.item.description : 'Tidak ada'}
                </CustomText>
              </View>
              <View style={styles.viewRowItem}>
                <Image
                  source={allLogo.icCalendar}
                  style={[styles.icCalendar, { tintColor: state.isDarkMode ? 'white' : '#9B9F95' }]}
                />
                <CustomText
                  allowFontScaling={false}
                  style={[styles.text, { color: state.isDarkMode ? 'white' : '#5E6157' }]}
                >
                  {moment(state.item.created_at).format('DD MMMM YYYY')}
                </CustomText>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={[
                    styles.viewStatus,
                    {
                      width: changeWidthStatus(state.item.status),
                      backgroundColor: changeColorStatus(state.item.status),
                    },
                  ]}
                >
                  <CustomText textType="medium" allowFontScaling={false} style={styles.textStatus}>
                    {state.item.status}
                  </CustomText>
                </View>
                <View style={{ width: toDp(6) }} />
              </View>
            </View>
          </View>
          {state.item.status === 'Proses' && (
            <TouchableOpacity style={styles.touchKirim} onPress={() => batal()}>
              <CustomText textType="semibold" allowFontScaling={false} style={styles.textKirim}>
                BATAL
              </CustomText>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles2 = StyleSheet.create({
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

export default DetailsDocumentsRequestScreen;
