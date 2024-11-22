import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
  ScrollView,
  FlatList,
  Alert,
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
} from 'react-native';

import Header from "../../Components/Header";
import { allLogo } from "../../Assets";
import { toDp } from "../../Helper/percentageToDP";

import * as NavigatorService from "../../Helper/NavigatorServices";
import CustomText from "../../Components/CustomText";

const MultifinanceScreen = (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Multi Finance'} onPress={() => props.navigation.goBack()} />
      <View style={styles.content}>
        <Image source={allLogo.imgEmptyNews} style={styles.imgEmpty} />
        <CustomText textType="semibold" style={[styles.desc, { color: '#5E6157' }]}>
          Maaf, belum Tersedia
        </CustomText>
        <CustomText style={[styles.subtitle, { color: '#5E6157' }]}>
          Untuk mengetahui lebih lanjut seputar{'\n'}Multi Finance, silahkan cek menu{'\n'}“News &
          information”
        </CustomText>
        <TouchableOpacity
          style={styles.touchButton}
          onPress={() => {
            NavigatorService.navigate('News');
          }}
        >
          <CustomText textType="semibold" style={[styles.textButton, { color: 'white' }]}>
            Lihat Sekarang
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
  content: {
    backgroundColor: '#F6F7F4',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgEmpty: {
    width: toDp(120),
    height: toDp(120),
    resizeMode: 'contain',
    marginTop: toDp(-60),
  },
  title: {
    color: '#000000',
    fontSize: toDp(16),
    marginTop: toDp(16),
    marginBottom: toDp(8),
  },
  desc: {
    marginTop: toDp(24),
    fontSize: toDp(14),
    textAlign: 'center',
  },
  subtitle: {
    marginTop: toDp(8),
    fontSize: toDp(14),
    textAlign: 'center',
  },
  touchButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: toDp(200),
    height: toDp(40),
    borderRadius: toDp(10),
    marginTop: toDp(16),
    backgroundColor: '#5AAA0F',
  },
  textButton: {
    fontSize: toDp(14),
    color: 'white',
  },
});

export default MultifinanceScreen;
