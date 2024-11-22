import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
} from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import NoConnection from "../../Components/NoConnection";

import Header from "../../Components/Header";
// import { allLogo } from "../../Assets";
import { toDp } from "../../Helper/percentageToDP";

// import { WebView } from 'react-native-webview';

// import * as NavigatorService from "../../Helper/NavigatorServices";
import CustomText from "../../Components/CustomText";

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import OrderJasa from './orderJasa';
import Pesanan from './pesanan';

const { width, height } = Dimensions.get('window');
const JasaScreen = (props: any) => {
  const netInfo = useNetInfo();
  const [state, setState] = useState({
    content: 'OrderJasa', // OrderJasa, Pesanan
  });

  useEffect(() => {}, []);

  const setContentPesanan = () => {
    setState((state) => ({ ...state, content: 'Pesanan' }));
  };

  const renderSection = () => {
    return (
      <View style={styles.viewSection}>
        <TouchableOpacity
          style={styles.touchSection}
          onPress={() => {
            setState((state) => ({ ...state, content: 'OrderJasa' }));
          }}
        >
          <CustomText
            textType="semibold"
            style={[
              styles.textNameSection,
              {
                color: state.content === 'OrderJasa' ? '#5AAA0F' : '#CCCFC9',
              },
            ]}
          >
            Order Jasa
          </CustomText>
          {state.content === 'OrderJasa' && <View style={styles.active} />}
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Jasa'} onPress={() => props.navigation.goBack()} />
      {renderSection()}
      <View style={styles.content}>
        {!netInfo.isConnected ? (
          <View style={styles.viewNoConnection}>
            <NoConnection />
          </View>
        ) : state.content === 'OrderJasa' ? (
          <OrderJasa setContentPesanan={setContentPesanan} />
        ) : (
          <Pesanan />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f7f8',
  },
  viewNoConnection: {
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default JasaScreen;
