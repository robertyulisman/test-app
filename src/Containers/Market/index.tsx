import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNetInfo } from '@react-native-community/netinfo';
// import NoConnection from '@NoConnection';

import { allLogo } from '../../Assets';
import { toDp } from '../../Helper/percentageToDP';

import CustomText from '../../Components/CustomText';
import * as NavigatorService from '../../Helper/NavigatorServices';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import Pesanan from './pesanan';
import Produk from './produk';

const { width, height } = Dimensions.get('window');
const MarketScreen = (props: any) => {
  const netInfo = useNetInfo();
  const [state, setState] = useState({
    content: 'Produk', // Produk, Pesanan,
    totalKeranjang: 0,
  });

  useEffect(() => {
    loadKeranjang();
  }, []);

  const loadKeranjang = async () => {
    let arrayKeranjang: any = await AsyncStorage.getItem('arrayKeranjang');
    let totalKeranjang: any = 0;
    for (var i = 0; i < JSON.parse(arrayKeranjang).length; i++) {
      totalKeranjang += parseInt(JSON.parse(arrayKeranjang)[i].quantity);
    }
    setState((state) => ({ ...state, totalKeranjang }));
  };

  const setContentPesanan = () => {
    if (state.content === 'Produk') {
      setState((state) => ({ ...state, content: 'Pesanan' }));
    } else {
      setState((state) => ({ ...state, content: 'Produk' }));

      setTimeout(function () {
        setState((state) => ({ ...state, content: 'Pesanan' }));
      }, 100);
    }
    loadKeranjang();
  };

  const renderSection = () => {
    return (
      <View style={styles.viewSection}>
        <TouchableOpacity
          style={styles.touchSection}
          onPress={() => {
            setState((state) => ({ ...state, content: 'Produk' }));
          }}
        >
          <CustomText
            textType="semibold"
            style={[
              styles.textNameSection,
              {
                color: state.content === 'Produk' ? '#5AAA0F' : '#CCCFC9',
              },
            ]}
          >
            Produk
          </CustomText>
          {state.content === 'Produk' && <View style={styles.active} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchSection}
          onPress={() => {
            setState((state) => ({ ...state, content: 'Pesanan' }));
          }}
        >
          <CustomText
            textType="semibold"
            style={[
              styles.textNameSection,
              {
                color: state.content === 'Pesanan' ? '#5AAA0F' : '#CCCFC9',
              },
            ]}
          >
            Pesanan
          </CustomText>
          {state.content === 'Pesanan' && <View style={styles.active} />}
        </TouchableOpacity>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View
        style={[
          styles.header,
          {
            backgroundColor: 'white',
            borderBottomColor: '#CCCFC9',
          },
        ]}
      >
        <View style={{ width: toDp(90) }}>
          <TouchableOpacity style={styles.touchHeader} onPress={() => props.navigation.goBack()}>
            <Image source={allLogo.icBack} style={styles.icBack} />
          </TouchableOpacity>
        </View>

        <CustomText textType="medium" style={styles.title}>
          {'Market'}
        </CustomText>

        <View style={{ width: toDp(90), alignItems: 'flex-end' }}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.touchHeaderSearch}
              onPress={() => {
                NavigatorService.navigate('Keranjang', { setContentPesanan, loadKeranjang });
              }}
            >
              <Image source={allLogo.icKeranjang} style={styles.icFilter} />
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
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      {renderHeader()}
      {renderSection()}
      <View style={styles.content}>
        {
          // !netInfo.isConnected ?
          //   <View style={styles.viewNoConnection}>
          //     <NoConnection />
          //   </View>
          // :
          state.content === 'Produk' ? (
            <Produk setContentPesanan={setContentPesanan} loadKeranjang={loadKeranjang} />
          ) : (
            <Pesanan />
          )
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  viewNoConnection: {
    width,
    height: height * 0.82,
    backgroundColor: '#f5f7f8',
  },
  viewSection: {
    width,
    height: toDp(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  touchSection: {
    flex: 1,
    height: toDp(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: toDp(1),
    borderBottomColor: '#DDE3E0',
  },
  textNameSection: {
    fontSize: toDp(14),
    color: '#5AAA0F',
  },
  active: {
    width: '100%',
    height: toDp(2),
    backgroundColor: '#5AAA0F',
    position: 'absolute',
    bottom: toDp(-1),
  },
  content: {
    flex: 1,
  },
  viewKeranjang: {
    position: 'absolute',
    right: toDp(8),
  },
  icKeranjang: {
    width: toDp(24),
    height: toDp(24),
  },
  header: {
    width,
    height: toDp(60),
    borderBottomWidth: toDp(1),
    borderBottomColor: '#CCCFC9',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: toDp(16),
  },
  touchHeader: {
    padding: toDp(4),
  },
  icBack: {
    width: toDp(16),
    height: toDp(16),
    tintColor: '#383B34',
  },
  title: {
    color: '#383B34',
    fontSize: toDp(18),
  },
  headerRow: {
    flexDirection: 'row',
  },
  touchHeaderSearch: {
    padding: toDp(4),
  },
  icFilter: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#383B34',
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

export default MarketScreen;
