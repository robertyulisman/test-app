import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Modal from 'react-native-modal';
import { allLogo } from '../../Assets';
import Empty from '../../Components/Empty';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import { toDp } from '../../Helper/percentageToDP';

import CustomText from '../../Components/CustomText';

import { postProductOrderCreate } from '../../Services/Apis';

const { width, height } = Dimensions.get('window');
const ConfirmMarketScreen = (props: any) => {
  const [state, setState] = useState<any>({
    loading: false,
    arrayKeranjang: [],
    totalHarga: 0,
    statusAll: false,
    dataUser: null,
    unit: null,
    darkMode: false,
    isShowSuccessModal: false,
  });

  useEffect(() => {
    loadKeranjang();
    loadUserUnit();
  }, []);

  const loadUserUnit = async () => {
    let dataUser: any = await AsyncStorage.getItem('dataUser');
    let unit: any = await AsyncStorage.getItem('unit');
    setState((state: any) => ({
      ...state,
      dataUser: JSON.parse(dataUser),
      unit: JSON.parse(unit),
    }));
  };

  const loadKeranjang = () => {
    let arrayKeranjang = props.route.params.arrayKeranjang;

    console.log('arrayKeranjang', arrayKeranjang);
    let totalHarga = 0;
    for (var i = 0; i < arrayKeranjang.length; i++) {
      totalHarga += arrayKeranjang[i].price * arrayKeranjang[i].quantity;
    }
    setState((state: any) => ({ ...state, arrayKeranjang, totalHarga }));
  };

  const minPlus = (operator: any) => {
    setState((state: any) => ({
      ...state,
      quantity: operator === '+' ? state.quantity + 1 : state.quantity - 1,
    }));
  };

  const convert = (amount: any) => {
    var reverse = amount.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };

  const renderItem = ({ item }: any) => {
    return (
      <View>
        <View style={styles.viewNewRow}>
          <Image source={{ uri: item.image }} style={styles.shimmerPhoto} />
          <View style={{ marginLeft: toDp(15) }}>
            <CustomText
              textType="semibold"
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.textNameNew}
            >
              {item.name}
            </CustomText>
            <View style={styles.rowPrice}>
              <CustomText style={styles.textBarang}>{item.quantity + ' barang'}</CustomText>
              <CustomText textType="semibold" style={styles.textPriceNew2}>
                {'Rp. ' + convert(item.price * item.quantity)}
              </CustomText>
            </View>
          </View>
        </View>
        <View style={styles.lineNew} />
      </View>
    );
  };

  const renderKontak = () => {
    return (
      <View style={{ backgroundColor: 'white', paddingTop: toDp(20) }}>
        <CustomText
          textType={'semibold'}
          style={[
            styles.textPukul,
            { marginLeft: toDp(20), color: state.darkMode ? 'white' : '#9B9F95' },
          ]}
        >
          DETAIL PEMESAN
        </CustomText>
        <View
          style={[
            styles.viewFormLayanan,
            { backgroundColor: state.darkMode ? '#1C1C1E' : 'white', paddingBottom: toDp(16) },
          ]}
        >
          <View style={styles.viewRow}>
            <Image
              source={allLogo.icProfil}
              style={[styles.icCalendar2, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
            />
            <CustomText style={[styles.textName2, { color: state.darkMode ? 'white' : '#5E6157' }]}>
              {state.dataUser?.name}
            </CustomText>
          </View>
          <View style={styles.viewRow}>
            <Image
              source={allLogo.icMail}
              style={[styles.icCalendar2, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
            />
            <CustomText
              style={[
                styles.textName2,
                { color: state.darkMode ? 'white' : '#5E6157', marginBottom: toDp(0) },
              ]}
            >
              {state.dataUser?.email}
            </CustomText>
          </View>
          <View style={styles.viewRow}>
            <Image
              source={allLogo.icPhone}
              style={[styles.icCalendar2, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
            />
            <CustomText
              style={[
                styles.textName2,
                { color: state.darkMode ? 'white' : '#5E6157', marginBottom: toDp(0) },
              ]}
            >
              {state.dataUser?.phone}
            </CustomText>
          </View>
          <View style={[styles.viewRow, { alignItems: 'flex-start' }]}>
            <Image
              source={allLogo.icLocation}
              style={[styles.icCalendar2, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
            />
            <CustomText style={[styles.textName2, { color: state.darkMode ? 'white' : '#5E6157' }]}>
              {state.unit?.code + '\n' + state.unit?.unit_name}
            </CustomText>
          </View>
          <View
            style={[styles.line2, { backgroundColor: state.darkMode ? '#121212' : '#EEEEEE' }]}
          />
        </View>
        <CustomText
          textType={'semibold'}
          style={[
            styles.textPukul,
            { marginLeft: toDp(20), color: state.darkMode ? 'white' : '#9B9F95' },
          ]}
        >
          PESANAN
        </CustomText>
      </View>
    );
  };

  const removeAsyncStorage = async () => {
    let myArray = JSON.parse((await AsyncStorage.getItem('arrayKeranjang')) as any);
    let toRemove = props.route.params.arrayKeranjang;
    let arrayKeranjang = myArray.filter((ar: any) => !toRemove.find((rm: any) => rm.id === ar.id));
    AsyncStorage.setItem('arrayKeranjang', JSON.stringify(arrayKeranjang));
    props.route.params.loadAllKeranjang();
  };

  const pesanSekarang = () => {
    let products = [];
    for (var i = 0; i < state.arrayKeranjang.length; i++) {
      let item = {
        id: state.arrayKeranjang[i].id,
        quantity: state.arrayKeranjang[i].quantity,
      };
      products.push(item);
    }
    let body = {
      product_category_id: 'a6a600e1-98c7-4d99-a58e-48daf40b9174',
      products: products,
    };
    setState((state: any) => ({ ...state, loading: true }));

    postProductOrderCreate(body)
      .then((response) => {
        console.log('response', response);
        props.route.params.setContentPesanan();
        setState((state: any) => ({ ...state, loading: false, isShowSuccessModal: true }));
      })
      .catch((err) => {
        console.log('err', err);
        setState((state: any) => ({ ...state, loading: false }));
      });
  };

  const renderModalSuccess = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={state.isShowSuccessModal}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View style={[styles.modalBox, { alignItems: 'center' }]}>
            <Image source={allLogo.icSuccess} style={styles.icSuccess} />
            <CustomText
              textType="semibold"
              style={{ fontSize: toDp(16), color: '#263238', marginTop: toDp(24) }}
            >
              PESANAN BERHASIL
            </CustomText>
            <CustomText
              style={{
                fontSize: toDp(14),
                color: '#263238',
                marginTop: toDp(10),
                textAlign: 'center',
              }}
            >
              Pesanan Anda akan segera direspon oleh pengelola
            </CustomText>
            <TouchableOpacity
              onPress={() => {
                setState((prevState: any) => ({ ...prevState, isShowSuccessModal: false }));
                removeAsyncStorage();
                props.navigation.goBack();
                if (props.route.params.back) {
                  props.route.params.back();
                }
              }}
              style={styles.touchOk}
            >
              <CustomText textType="semibold" style={{ fontSize: toDp(14), color: 'white' }}>
                Okay
              </CustomText>
            </TouchableOpacity>
            <View style={{ height: toDp(16) }} />
          </View>
        </View>
      </Modal>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.viewFooterNew}>
        <CustomText textType="semibold" style={styles.textTotalBelanja}>
          {'Total Belanja'}
        </CustomText>
        <CustomText textType="semibold" style={styles.textTotalBelanja}>
          {'Rp. ' + convert(state.totalHarga)}
        </CustomText>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Konfirmasi Pemesanan'} onPress={() => props.navigation.goBack()} />
      {renderModalSuccess()}
      <Loader loading={state.loading} />
      <View style={{ flex: 1 }}>
        {state.arrayKeranjang.length === 0 ? (
          <Empty
            images={allLogo.imgEmptyNews}
            title={'Wah, keranjang belanjamu kosong'}
            subtitle={'Yuk, isi dengan barang-barang impianmu!'}
          />
        ) : (
          <FlatList
            ListHeaderComponent={renderKontak()}
            ListFooterComponent={renderFooter()}
            data={state.arrayKeranjang}
            renderItem={renderItem}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>

      <View style={styles.viewFooter}>
        <TouchableOpacity
          style={styles.touchBeli}
          onPress={() => {
            pesanSekarang();
          }}
        >
          <CustomText textType={'semibold'} style={styles.textBeli}>
            Pesan Sekarang
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
  line2: {
    width: '100%',
    height: toDp(1),
    backgroundColor: '#EEEEEE',
    marginTop: toDp(16),
  },
  lineNew: {
    width: '91%',
    marginLeft: toDp(16),
    height: toDp(1),
    backgroundColor: '#EEEEEE',
    marginTop: toDp(16),
  },
  textName2: {
    marginLeft: toDp(8),
    fontSize: toDp(12),
    fontWeight: '500',
  },
  viewRow: {
    marginLeft: toDp(16),
    marginTop: toDp(16),
    marginRight: toDp(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icCalendar2: {
    width: toDp(20),
    height: toDp(20),
  },
  viewFormLayanan: {
    width: '100%',
    height: 'auto',
  },
  textPukul: {
    fontSize: toDp(16),
  },
  viewRowFooter: {
    marginTop: toDp(17),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  // row: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // textQty: {
  //   textAlign: 'center',
  //   width: toDp(28),
  //   fontSize: toDp(14),
  //   fontWeight: 'bold',
  //   letterSpacing: toDp(0.5),
  //   marginRight: toDp(20),
  //   marginLeft: toDp(10),
  // },
  // touchMinPlus: {
  //   width: toDp(24),
  //   height: toDp(24),
  //   marginRight: toDp(12),
  //   borderWidth: toDp(1),
  //   borderColor: '#5AAA0F',
  //   borderRadius: toDp(4),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // textMinPlus: {
  //   fontSize: toDp(14),
  //   fontWeight: 'bold',
  //   letterSpacing: toDp(0.5),
  //   color: '#5AAA0F',
  //   marginLeft: Platform.OS === 'ios' ? toDp(1) : 0,
  // },
  viewRowHeader: {
    marginTop: toDp(15),
    flexDirection: 'row',
    paddingLeft: toDp(23),
  },
  shimmerPhoto: {
    width: toDp(60),
    height: toDp(60),
    borderRadius: toDp(4),
    marginLeft: toDp(10),
  },
  textName: {
    width: toDp(206),
    fontSize: toDp(14),
    color: '#383B34',
  },
  textPriceNew: {
    fontSize: toDp(16),
    color: '#383B34',
    marginTop: toDp(5),
  },
  textEstimase: {
    fontSize: toDp(12),
  },
  textHarga: {
    marginTop: toDp(2),
    fontSize: toDp(16),
  },
  viewJumlah: {
    marginTop: toDp(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    width,
    height: toDp(12),
    backgroundColor: '#F6F7F4',
    marginTop: toDp(20),
  },
  viewInfo: {
    paddingLeft: toDp(20),
    paddingTop: toDp(10),
  },
  textDetail: {
    fontSize: toDp(16),
    color: '#9B9F95',
    marginTop: toDp(10),
  },
  textDesc: {
    fontSize: toDp(14),
    color: '#5E6157',
    marginTop: toDp(20),
  },
  textTitle: {
    fontSize: toDp(16),
    color: '#383B34',
  },
  textCategory: {
    fontSize: toDp(12),
    color: '#9B9F95',
    marginTop: toDp(5),
  },
  textPrice: {
    fontSize: toDp(24),
    color: '#383B34',
    marginTop: toDp(10),
  },
  touchMarket: {
    width: toDp(44),
    height: toDp(40),
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(10),
    marginRight: toDp(10),
  },
  iconFooter: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#5AAA0F',
  },
  viewFooter: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: toDp(16),
    paddingTop: toDp(8),
    paddingBottom: toDp(8),
    borderTopWidth: toDp(1),
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
  },
  touchBeli: {
    width: '100%',
    height: toDp(40),
    borderRadius: toDp(10),
    backgroundColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBeli: {
    fontSize: toDp(14),
    color: 'white',
  },
  touchOk: {
    width: toDp(180),
    height: toDp(40),
    marginTop: toDp(20),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchBack: {
    width: toDp(34),
    height: toDp(34),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383B344D',
    borderRadius: toDp(10),
    position: 'absolute',
    left: toDp(10),
    top: toDp(40),
  },
  viewCount: {
    width: toDp(40),
    height: toDp(24),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#383B344D',
    borderRadius: toDp(5),
    position: 'absolute',
    right: toDp(10),
    top: toDp(40),
  },
  textCount: {
    fontSize: toDp(12),
    color: 'white',
  },
  icBack: {
    width: toDp(16),
    height: toDp(16),
    tintColor: 'white',
  },
  viewHeader: {
    width,
    height: width,
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width,
    height: width,
  },
  dot: {
    backgroundColor: '#CCCFC9',
    width: toDp(6),
    height: toDp(6),
    borderRadius: toDp(3),
    marginLeft: toDp(6),
    marginRight: toDp(6),
    marginTop: toDp(3),
    marginBottom: toDp(-8),
  },
  activeDot: {
    backgroundColor: '#92DE48',
    width: toDp(6),
    height: toDp(6),
    borderRadius: toDp(6),
    marginLeft: toDp(6),
    marginRight: toDp(6),
    marginTop: toDp(3),
    marginBottom: toDp(-8),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textQty: {
    textAlign: 'center',
    width: toDp(28),
    fontSize: toDp(14),
    fontWeight: 'bold',
    letterSpacing: toDp(0.5),
    marginRight: toDp(20),
    marginLeft: toDp(10),
  },
  touchMinPlus: {
    width: toDp(24),
    height: toDp(24),
    marginRight: toDp(12),
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMinPlus: {
    fontSize: toDp(14),
    fontWeight: 'bold',
    letterSpacing: toDp(0.5),
    color: '#5AAA0F',
    marginLeft: Platform.OS === 'ios' ? toDp(1) : 0,
  },
  viewSelect: {
    width,
    height: toDp(54),
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingRight: toDp(20),
    paddingLeft: toDp(23),
  },
  touchPilih: {
    width: toDp(100),
    height: toDp(24),
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchHapus: {
    width: toDp(100),
    height: toDp(24),
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textPilih: {
    fontSize: toDp(14),
    color: '#383B34',
  },
  textHapus: {
    fontSize: toDp(14),
    color: '#5AAA0F',
  },
  icUnselect: {
    width: toDp(18),
    height: toDp(18),
    marginRight: toDp(8),
  },
  viewShimmer: {
    width,
    height: 'auto',
    backgroundColor: 'white',
    marginTop: toDp(4),
    paddingBottom: toDp(12),
    borderBottomWidth: toDp(1),
    borderBottomColor: '#F6F7F4',
  },
  bottomModal: {
    justifyContent: 'center',
    margin: 0,
  },
  viewRootModal: {
    width,
    alignItems: 'center',
  },
  modalBox: {
    width: '90%',
    height: 'auto',
    backgroundColor: '#FFFFFF',
    borderRadius: toDp(8),
    padding: toDp(16),
  },
  icSuccess: {
    width: toDp(70),
    height: toDp(70),
    marginTop: toDp(16),
    tintColor: '#5AAA0F',
  },
  viewNewRow: {
    width: '100%',
    flexDirection: 'row',
    marginTop: toDp(15),
    paddingLeft: toDp(8),
  },
  textNameNew: {
    width: toDp(206),
    fontSize: toDp(14),
    color: '#383B34',
  },
  textPriceNew2: {
    fontSize: toDp(14),
    color: '#383B34',
  },
  textBarang: {
    fontSize: toDp(12),
    color: '#383B34',
  },
  rowPrice: {
    marginTop: toDp(5),
    width: toDp(250),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewFooterNew: {
    paddingHorizontal: toDp(16),
    marginTop: toDp(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textTotalBelanja: {
    fontSize: toDp(14),
    color: '#383B34',
  },
});

export default ConfirmMarketScreen;
