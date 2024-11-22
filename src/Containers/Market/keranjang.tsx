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
import { toDp } from '../../Helper/percentageToDP';

import CustomText from '../../Components/CustomText';
import * as NavigatorService from '../../Helper/NavigatorServices';

const { width, height } = Dimensions.get('window');
const KeranjangScreen = (props: any) => {
  const [state, setState] = useState<any>({
    arrayKeranjang: [],
    totalHarga: 0,
    statusAll: false,
    statusBeli: false,
    isShowModalConfirm: false,
    index: -1,
  });

  useEffect(() => {
    loadKeranjang();
  }, []);

  useEffect(() => {
    generateTotalHarga(state.arrayKeranjang);
    props.route.params.loadKeranjang();
  }, [state.arrayKeranjang]);

  useEffect(() => {
    let statusBeli = false;
    for (var i = 0; i < state.arrayKeranjang.length; i++) {
      if (state.arrayKeranjang[i].status) {
        statusBeli = true;
      }
    }
    setState((state: any) => ({ ...state, statusBeli }));
  }, [state.arrayKeranjang]);

  const loadKeranjang = async () => {
    let arrayKeranjang: any = await AsyncStorage.getItem('arrayKeranjang');

    console.log('arrayKeranjang', JSON.parse(arrayKeranjang));
    setState((state: any) => ({ ...state, arrayKeranjang: JSON.parse(arrayKeranjang) || [] }));
  };

  const generateTotalHarga = (arrayKeranjang: any) => {
    let totalHarga = 0;
    for (var i = 0; i < arrayKeranjang.length; i++) {
      if (arrayKeranjang[i].status) {
        totalHarga += parseInt(arrayKeranjang[i].price) * arrayKeranjang[i].quantity;
      }
    }
    setState((state: any) => ({ ...state, totalHarga }));
    AsyncStorage.setItem('arrayKeranjang', JSON.stringify(arrayKeranjang));
  };

  const minPlus = (id: any, operator: any) => {
    setState((state: any) => ({
      ...state,
      arrayKeranjang: state.arrayKeranjang.map((data: any) => {
        if (data.id === id) {
          return {
            ...data,
            quantity: operator === '+' ? data.quantity + 1 : data.quantity - 1,
          };
        } else {
          return {
            ...data,
          };
        }
      }),
    }));
  };

  const convert = (amount: any) => {
    var reverse = amount.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };

  const removeAsyncStorage = async (index: any) => {
    let arrayKeranjang = JSON.parse((await AsyncStorage.getItem('arrayKeranjang')) as any);
    arrayKeranjang.splice(index, 1);

    console.log('arrayKeranjang', arrayKeranjang);
    AsyncStorage.setItem('arrayKeranjang', JSON.stringify(arrayKeranjang));
    loadAllKeranjang();
  };

  const loadAllKeranjang = () => {
    loadKeranjang();
    props.route.params.loadKeranjang();
  };

  const renderModalConfirmation = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={() =>
          setState((prevState: any) => ({ ...prevState, isShowModalConfirm: false }))
        }
        isVisible={state.isShowModalConfirm}
      >
        <View style={styles.viewModalCenter}>
          <View
            style={[
              styles.modalBoxCenter,
              { backgroundColor: state.isDarkMode ? '#121212' : 'white', height: toDp(190) },
            ]}
          >
            <CustomText
              textType="semibold"
              style={[styles.titleConfirm, { color: state.isDarkMode ? 'white' : '#263238' }]}
            >
              Hapus Item
            </CustomText>
            <CustomText
              style={[styles.textApakah2, { color: state.isDarkMode ? 'white' : '#263238' }]}
            >
              Apakah Anda yakin akan menghapus item ini?
            </CustomText>

            <View style={styles.viewRow2}>
              <TouchableOpacity
                style={styles.touchTidak}
                onPress={() =>
                  setState((prevState: any) => ({ ...prevState, isShowModalConfirm: false }))
                }
              >
                <CustomText textType="semibold" style={styles.textTidak}>
                  Tidak
                </CustomText>
              </TouchableOpacity>
              <View style={{ width: toDp(10) }}></View>
              <TouchableOpacity
                style={styles.touchYa}
                onPress={() => {
                  removeAsyncStorage(state.index);
                  setState((prevState: any) => ({ ...prevState, isShowModalConfirm: false }));
                }}
              >
                <CustomText textType="semibold" style={styles.textYa}>
                  Ya, Hapus
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
      <View style={styles.viewShimmer}>
        <TouchableOpacity
          style={styles.viewRowHeader}
          onPress={() => {
            setState((state: any) => ({
              ...state,
              arrayKeranjang: state.arrayKeranjang.map((data: any, index: any) => {
                return {
                  ...data,
                  status: item.id === data.id ? !data.status : data.status,
                };
              }),
            }));
          }}
        >
          <Image
            source={!item.status ? allLogo.icUnselect : allLogo.icNewsCheck}
            style={styles.icUnselect}
          />
          <Image source={{ uri: item.image }} style={styles.shimmerPhoto} />
          <View style={{ marginLeft: toDp(15) }}>
            <CustomText numberOfLines={2} ellipsizeMode="tail" style={styles.textName}>
              {item.name}
            </CustomText>
            <CustomText textType="semibold" style={styles.textPriceNew}>
              {'Rp. ' + convert(item.price)}
            </CustomText>
          </View>
        </TouchableOpacity>
        <View style={styles.viewRowFooter}>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.touchDeleteMarket}
              onPress={() => {
                setState((state: any) => ({ ...state, isShowModalConfirm: true, index }));
              }}
            >
              <Image source={allLogo.icDeleteMarket} style={styles.icDeleteMarket} />
            </TouchableOpacity>
            {item.quantity === 1 ? (
              <View style={[styles.touchMinPlus, { borderColor: '#C4C4C4' }]}>
                <CustomText textType="semibold" style={[styles.textMinPlus, { color: '#C4C4C4' }]}>
                  {'-'}
                </CustomText>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  minPlus(item.id, '-');
                }}
                style={styles.touchMinPlus}
              >
                <CustomText textType="semibold" style={styles.textMinPlus}>
                  {'-'}
                </CustomText>
              </TouchableOpacity>
            )}
            <CustomText
              numberOfLines={1}
              ellipsizeMode="tail"
              textType="semibold"
              style={[styles.textQty, { color: state.darkMode ? 'white' : '#1C2028' }]}
            >
              {item.quantity}
            </CustomText>
            {item.quantity === 999 ? (
              <View style={[styles.touchMinPlus, { borderColor: '#C4C4C4' }]}>
                <CustomText textType="semibold" style={[styles.textMinPlus, { color: '#C4C4C4' }]}>
                  {'+'}
                </CustomText>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  minPlus(item.id, '+');
                }}
                style={styles.touchMinPlus}
              >
                <CustomText textType="semibold" style={styles.textMinPlus}>
                  {'+'}
                </CustomText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const back = () => {
    props.navigation.goBack();
    if (props.route.params.back) {
      props.route.params.back();
    }
  };

  const beli = () => {
    if (state.statusBeli) {
      let arrayKeranjang = [];
      for (var i = 0; i < state.arrayKeranjang.length; i++) {
        if (state.arrayKeranjang[i].status) {
          arrayKeranjang.push(state.arrayKeranjang[i]);
        }
      }
      NavigatorService.navigate('ConfirmMarket', {
        arrayKeranjang,
        back,
        setContentPesanan: props.route.params.setContentPesanan,
        loadAllKeranjang,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Keranjang'} onPress={() => back()} />
      {renderModalConfirmation()}
      {state.arrayKeranjang.length !== 0 && (
        <View style={styles.viewSelect}>
          <TouchableOpacity
            style={styles.touchPilih}
            onPress={() => {
              setState((state: any) => ({
                ...state,
                statusAll: !state.statusAll,
                arrayKeranjang: state.arrayKeranjang.map((data: any, index: any) => {
                  return {
                    ...data,
                    status: !state.statusAll,
                  };
                }),
              }));
            }}
          >
            <Image
              source={!state.statusAll ? allLogo.icUnselect : allLogo.icNewsCheck}
              style={styles.icUnselect}
            />
            <CustomText style={styles.textPilih}>Pilih Semua</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.touchHapus}
            onPress={() => {
              setState((state: any) => ({
                ...state,
                statusAll: false,
                arrayKeranjang: state.arrayKeranjang.map((data: any, index: number) => {
                  return {
                    ...data,
                    status: false,
                  };
                }),
              }));
            }}
          >
            <CustomText textType={'semibold'} style={styles.textHapus}>
              Hapus
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          flex: 1,
          backgroundColor: '#F6F7F4',
          marginTop: state.arrayKeranjang.length !== 0 ? toDp(4) : 0,
        }}
      >
        {state.arrayKeranjang.length === 0 ? (
          <Empty
            images={allLogo.imgEmptyNews}
            title={'Wah, keranjang belanjamu kosong'}
            subtitle={'Yuk, isi dengan barang-barang impianmu!'}
          />
        ) : (
          <FlatList
            data={state.arrayKeranjang}
            renderItem={renderItem}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>

      {state.arrayKeranjang.length !== 0 && (
        <View style={styles.viewFooter}>
          <View>
            <CustomText style={[styles.textEstimase, { color: '#383B34' }]}>Total Harga</CustomText>
            <CustomText textType={'semibold'} style={[styles.textHarga, { color: '#383B34' }]}>
              {!state.statusBeli ? '-' : 'Rp ' + convert(state.totalHarga)}
            </CustomText>
          </View>

          <TouchableOpacity
            style={[
              styles.touchBeli,
              { backgroundColor: !state.statusBeli ? '#CCCFC9' : '#5AAA0F' },
            ]}
            onPress={() => beli()}
          >
            <CustomText textType={'semibold'} style={styles.textBeli}>
              Beli
            </CustomText>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    width: toDp(150),
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
    paddingBottom: toDp(16),
    borderBottomWidth: toDp(1),
    borderBottomColor: '#F6F7F4',
  },
  touchDeleteMarket: {
    padding: toDp(4),
    marginRight: toDp(16),
  },
  icDeleteMarket: {
    width: toDp(24),
    height: toDp(24),
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
  textApakah2: {
    marginTop: toDp(10),
    marginHorizontal: toDp(30),
    textAlign: 'center',
    fontSize: toDp(14),
    color: '#263238',
    lineHeight: toDp(24),
  },
  viewRow2: {
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
  icSuccess: {
    width: toDp(70),
    height: toDp(70),
    marginTop: toDp(16),
    tintColor: '#5AAA0F',
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
    //height: toDp(240),
    height: 'auto',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: toDp(16),
    borderTopRightRadius: toDp(16),
    paddingBottom: toDp(16),
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewModalTitle: {
    marginTop: toDp(24),
    marginRight: toDp(16),
    marginLeft: toDp(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTitleModal: {
    //fontFamily: 'Montserrat-Bold',
    fontSize: toDp(14),
    letterSpacing: toDp(1),
    color: '#263238',
    marginLeft: toDp(16),
  },
  touchSilang: {
    padding: toDp(4),
  },
  icSilangModal: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#5E6157',
  },
});

export default KeranjangScreen;
