import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { allLogo } from '../../Assets';
import { toDp } from '../../Helper/percentageToDP';

import CustomText from '../../Components/CustomText';
import * as NavigatorService from '../../Helper/NavigatorServices';

import Swiper from '../../Components/Swiper';

const { width, height } = Dimensions.get('window');
const DetailsMarketScreen = (props: any) => {
  const swiper = useRef(null);

  const [state, setState] = useState<any>({
    loading: false,
    item: props.route.params.item,
    index: 0,
    //quantity: props.route.params.item.quantity
    quantity: 0,
    arrayKeranjang: [],
    totalKeranjang: 0,
  });

  useEffect(() => {
    loadKeranjang();
  }, []);

  const loadKeranjang = async () => {
    let arrayKeranjang: any = await AsyncStorage.getItem('arrayKeranjang');
    let totalKeranjang = 0;
    for (var i = 0; i < JSON.parse(arrayKeranjang).length; i++) {
      totalKeranjang += parseInt(JSON.parse(arrayKeranjang)[i].quantity);
    }
    setState((state: any) => ({
      ...state,
      arrayKeranjang: JSON.parse(arrayKeranjang),
      totalKeranjang,
    }));
    props.route.params.loadKeranjang();
  };

  const convert = (amount: any) => {
    var reverse = amount.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };

  const minPlus = (operator: any) => {
    setState((state: any) => ({
      ...state,
      quantity: operator === '+' ? state.quantity + 1 : state.quantity - 1,
    }));
  };

  const addToKeranjang = () => {
    //if(state.quantity >= 1) {
    if (true) {
      let item = {
        id: state.item.id,
        image: state.item.product_images[0].image_url,
        name: state.item.name,
        price: state.item.price,
        quantity: state.quantity,
        status: false,
      };
      let arrayKeranjang = state.arrayKeranjang || [];

      let index = -1;
      let statusAvailable = false;
      for (var i = 0; i < arrayKeranjang.length; i++) {
        if (arrayKeranjang[i].id === state.item.id) {
          index = i;
          statusAvailable = true;
        }
      }
      if (!statusAvailable) {
        if (state.quantity >= 1) {
          arrayKeranjang.push(item);
        }
      } else {
        let item = {
          id: state.item.id,
          image: state.item.product_images[0].image_url,
          name: state.item.name,
          price: state.item.price,
          quantity: arrayKeranjang[index].quantity + state.quantity,
          status: false,
        };
        arrayKeranjang[index] = item;
      }
      AsyncStorage.setItem('arrayKeranjang', JSON.stringify(arrayKeranjang));
      setState((state: any) => ({ ...state, quantity: 0 }));
      loadKeranjang();

      console.log('props', props);
      props.route.params.loadKeranjang();
      redirectToKeranjang();
    }
  };

  const beliSekarang = () => {
    let item = {
      id: state.item.id,
      image: state.item.product_images[0].image_url,
      name: state.item.name,
      price: state.item.price,
      quantity: state.quantity,
      status: false,
    };
    let arrayKeranjang = [];
    arrayKeranjang.push(item);
    NavigatorService.navigate('ConfirmMarket', {
      arrayKeranjang,
      back,
      setContentPesanan: props.route.params.setContentPesanan,
    });
  };

  const redirectToKeranjang = () => {
    //back()
    NavigatorService.navigate('Keranjang', {
      setContentPesanan: props.route.params.setContentPesanan,
      back,
      loadKeranjang,
    });
  };

  const back = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.viewHeader}>
          <Swiper
            ref={swiper}
            dot={<View style={styles.dot} />}
            activeDot={<View style={styles.activeDot} />}
            onIndexChanged={(index) => setState((state: any) => ({ ...state, index }))}
            loop={false}
          >
            {state.item.product_images.map((data: any, index: number) => {
              return (
                <View style={styles.viewContainer} key={index}>
                  <Image source={{ uri: data.image_url }} style={styles.image} />
                </View>
              );
            })}
          </Swiper>
          <TouchableOpacity style={styles.touchBack} onPress={() => back()}>
            <Image source={allLogo.icBack} style={styles.icBack} />
          </TouchableOpacity>
          <View style={styles.viewCount}>
            <CustomText textType="medium" style={styles.textCount}>
              {state.index + 1 + '/' + state.item.product_images.length}
            </CustomText>
          </View>
        </View>
        <View style={styles.viewInfo}>
          <CustomText textType={'medium'} style={styles.textTitle}>
            {state.item.name}
          </CustomText>
          <CustomText textType={'medium'} style={styles.textCategory}>
            {state.item.product_category.name}
          </CustomText>
          <CustomText textType={'semibold'} style={styles.textPrice}>
            {'Rp. ' + convert(state.item.price)}
          </CustomText>
        </View>
        <View style={styles.line} />
        <View style={styles.viewInfo}>
          <CustomText textType={'semibold'} style={styles.textDetail}>
            DETAIL PRODUK
          </CustomText>
          <CustomText style={styles.textDesc}>{state.item.description}</CustomText>
        </View>
        <View style={styles.line} />
        <View style={styles.viewInfo}>
          <CustomText textType={'semibold'} style={styles.textDetail}>
            JUMLAH PESANAN
          </CustomText>
          <View style={styles.viewJumlah}>
            <CustomText>{'Masukan jumlah pesanan'}</CustomText>
            <View style={styles.row}>
              {state.quantity === 0 ? (
                <View style={[styles.touchMinPlus, { borderColor: '#C4C4C4' }]}>
                  <CustomText
                    textType="semibold"
                    style={[styles.textMinPlus, { color: '#C4C4C4' }]}
                  >
                    {'-'}
                  </CustomText>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    props.route.params.minPlus(state.item.id, '-');
                    minPlus('-');
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
                {state.quantity}
              </CustomText>
              {state.quantity === 999 ? (
                <View style={[styles.touchMinPlus, { borderColor: '#C4C4C4' }]}>
                  <CustomText
                    textType="semibold"
                    style={[styles.textMinPlus, { color: '#C4C4C4' }]}
                  >
                    {'+'}
                  </CustomText>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    props.route.params.minPlus(state.item.id, '+');
                    minPlus('+');
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
        <View style={{ height: toDp(48) }} />
      </ScrollView>
      <View style={styles.viewFooter}>
        <TouchableOpacity
          style={styles.touchMarket}
          onPress={() => {
            Linking.openURL('whatsapp://send?text=&phone=+628117757333').catch(() =>
              Linking.openURL(
                Platform.OS === 'ios'
                  ? 'https://apps.apple.com/us/app/whatsapp-messenger/id310633997'
                  : 'https://play.google.com/store/apps/details?id=com.whatsapp',
              ),
            );
          }}
        >
          <Image source={allLogo.icWa2} style={styles.iconFooter} />
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={styles.touchMarket}
            onPress={() => {
              addToKeranjang();
            }}
          >
            <Image source={allLogo.icAddKeranjang} style={styles.iconFooter} />
          </TouchableOpacity>
          {state.totalKeranjang !== 0 && (
            <View
              style={[
                styles.viewNotif,
                {
                  width:
                    state.totalKeranjang >= 100
                      ? toDp(31)
                      : state.totalKeranjang >= 10
                      ? toDp(25)
                      : toDp(18),
                },
              ]}
            >
              <CustomText textType={'medium'} style={styles.textNotif}>
                {state.totalKeranjang >= 100 ? '99+' : state.totalKeranjang}
              </CustomText>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={[
            styles.touchBeli,
            { backgroundColor: state.quantity === 0 ? '#CCCFC9' : '#5AAA0F' },
          ]}
          onPress={() => {
            if (state.quantity !== 0) {
              beliSekarang();
            }
          }}
        >
          <CustomText textType={'semibold'} style={styles.textBeli}>
            Beli Sekarang
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    alignItems: 'center',
    paddingHorizontal: toDp(16),
    paddingTop: toDp(8),
    paddingBottom: toDp(16),
    borderTopWidth: toDp(1),
    borderTopColor: '#EEEEEE',
    flexDirection: 'row',
  },
  touchBeli: {
    width: toDp(212),
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
  viewNotif: {
    backgroundColor: '#DD5A45',
    borderWidth: toDp(1),
    borderColor: 'white',
    width: toDp(18),
    height: toDp(18),
    borderRadius: toDp(9),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: toDp(0),
    top: toDp(-8),
  },
  textNotif: {
    fontSize: toDp(11),
    color: 'white',
  },
});

export default DetailsMarketScreen;
