import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Header from '../../Components/Header';
import { toDp } from '../../Helper/percentageToDP';

import { useNetInfo } from '@react-native-community/netinfo';
import NoConnection from '../../Components/NoConnection';

import CustomComboBox from '../../Components/CustomComboBox';
import CustomText from '../../Components/CustomText';
import CustomTextArea from '../../Components/CustomTextArea';
import CustomTextInput from '../../Components/CustomTextInput';
import Loader from '../../Components/Loader';
import Toast from '../../Components/Toast';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import AsyncStorage from '@react-native-async-storage/async-storage';

import { getDocumentsAll, postDocumentsRequestCreate } from '../../Services/Apis';

let limit = 0;
const { width, height } = Dimensions.get('window');
const AddDocumentsRequestScreen = (props: any) => {
  const netInfo = useNetInfo();
  const toast = useRef(null);
  const [state, setState] = useState<any>({
    dataUser: props.route.params.dataUser,
    loading: false,
    idLayanan: '',
    layanan: '',
    desciption: '',
    errorDesciption: '',
    arrayLayanan: [],
    unit: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      let unit: any = await AsyncStorage.getItem('unit');
      setState((state: any) => ({ ...state, unit: JSON.parse(unit) }));
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    getDocumentsAll()
      .then((response) => {
        console.log(response);
        setState((state: any) => ({ ...state, arrayLayanan: response.data.data }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submit = () => {
    setState((state: any) => ({ ...state, loading: true }));

    let data = {
      user_id: state.dataUser.id,
      unit_id: state.unit.id,
      document_id: state.idLayanan,
      description: state.desciption,
    };

    postDocumentsRequestCreate(data)
      .then((response) => {
        console.log(response);
        setState((state: any) => ({ ...state, loading: false }));

        props.navigation.goBack();
        props.route.params.showMessageSuccess();
        props.route.params.loadComplains();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Add Documents Request'} onPress={() => props.navigation.goBack()} />
      <Loader loading={state.loading} />
      <Toast ref={toast} />
      {!netInfo.isConnected ? (
        <View style={styles.viewCenterNoConnecttion}>
          <NoConnection />
        </View>
      ) : (
        <ScrollView style={styles.viewTextTitle}>
          <CustomTextInput
            title={'Unit'}
            placeholder={'Unit anda saat ini'}
            error={''}
            value={state.unit?.unit_name}
            editable={false}
          />
          <View style={{ height: toDp(16) }} />
          <CustomTextInput
            title={'Nama Lengkap'}
            placeholder={'Masukan nama lengkap (sesuai KTP)'}
            error={''}
            value={state.dataUser.name}
            editable={false}
          />
          <View style={{ height: toDp(16) }} />
          <CustomTextInput
            title={'Email'}
            placeholder={'Masukkan email'}
            error={''}
            value={state.dataUser.email}
            editable={false}
          />
          <View style={{ height: toDp(16) }} />
          <CustomTextInput
            title={'Phone'}
            placeholder={'Masukan phone'}
            error={''}
            value={state.dataUser.phone}
            editable={false}
          />
          <View style={{ height: toDp(16) }} />
          <CustomComboBox
            title={'Layanan'}
            desc={''}
            textPlaceholder={'Pilih layanan'}
            value={state.layanan}
            arrayData={state.arrayLayanan}
            onSelected={(item: any, index: number) =>
              setState((state: any) => ({ ...state, layanan: item.name, idLayanan: item.id }))
            }
          />
          <View style={{ height: toDp(16) }} />
          <CustomTextArea
            title={'Desciption (optional)' as any}
            placeholder={'Masukkan isi desciption'}
            error={state.errorDesciption}
            value={state.desciption}
            onChangeText={(desciption: any) => {
              setState((state: any) => ({ ...state, desciption }));
              if (desciption.trim() === '') {
                setState((state: any) => ({
                  ...state,
                  errorDesciption: 'Field ini tidak boleh kosong.',
                }));
              } else {
                setState((state: any) => ({ ...state, errorDesciption: '' }));
              }
            }}
            autoCapitalize={'sentences'}
            returnKeyType={'next'}
          />
          <View style={{ height: toDp(70) }} />
          {state.layanan === '' ? (
            <View style={[styles.touchKirim, { backgroundColor: '#CCCFC9' }]}>
              <CustomText textType="semibold" allowFontScaling={false} style={styles.textKirim}>
                SUBMIT
              </CustomText>
            </View>
          ) : (
            <TouchableOpacity style={styles.touchKirim} onPress={() => submit()}>
              <CustomText textType="semibold" allowFontScaling={false} style={styles.textKirim}>
                SUBMIT
              </CustomText>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  viewTextTitle: {
    padding: toDp(20),
    width,
  },
  viewCenterNoConnecttion: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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
    color: 'white',
    fontStyle: 'normal',
    letterSpacing: toDp(0.7),
  },
});

export default AddDocumentsRequestScreen;
