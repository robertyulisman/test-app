import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import messaging from '@react-native-firebase/messaging';
import { allLogo } from '../../Assets';
import CustomText from '../../Components/CustomText';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import { toDp } from '../../Helper/percentageToDP';
import { getEmergencyCancel, getEmergencyStatus, postEmergenciesSend } from '../../Services/Apis';

const { width, height } = Dimensions.get('window');

const SosRequestScreen = ({ navigation }: any) => {
  const [state, setState] = useState({
    emergencyStatus: 'waiting',
    isLoadingImage: false,
    isLoading: false,
    isDarkMode: false,
    isTouch: false,
  });

  const handleCancel = () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    getEmergencyCancel()
      .then((response) => {
        console.log(response);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          '' + error.status + ' - ' + error.data.name,
          error.data.message,
          [
            {
              text: 'OK',
              onPress: () => {
                setState((prevState) => ({
                  ...prevState,
                  isLoading: false,
                }));
                navigation.goBack();
              },
            },
          ],
          { cancelable: false },
        );
      });
  };

  const setupFirebase = () => {};

  const requestSos = () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    postEmergenciesSend({
      latitude: '',
      longitude: '',
    })
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const requestEmergencyStatus = () => {
    getEmergencyStatus()
      .then((response) => {
        console.log(response);
        if (response.data.emergency.emergency_status === 'Request') {
          setState((prevState) => ({
            ...prevState,
            emergencyStatus: 'waiting',
          }));
        } else if (response.data.emergency.emergency_status === 'Proses') {
          setState((prevState) => ({
            ...prevState,
            emergencyStatus: 'process',
          }));
        } else if (response.data.emergency.emergency_status === 'Selesai') {
          // id = 2f12937a-887a-46c9-b1d5-c4b9162000e1
          setState((prevState) => ({
            ...prevState,
            emergencyStatus: 'done',
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    requestEmergencyStatus();
    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      console.log('remoteMessage', remoteMessage);
      if (remoteMessage.data.entity_type === 'emergency') {
        requestEmergencyStatus();
      }
    });

    return unsubscribe;
  }, []);

  const WaitingView = () => {
    return (
      <View style={[styles.content, { backgroundColor: state.isDarkMode ? '#121212' : '#FFFFFF' }]}>
        <Image
          //source={{uri: 'https://firebasestorage.googleapis.com/v0/b/ayodhya-edcf7.appspot.com/o/Darurat%2Fsos_waiting_gif.gif?alt=media&token=4b4e7c58-165a-4b8a-aa86-e09bb158a8e2'}}
          source={state.isDarkMode ? allLogo.sosWaitingDark : allLogo.sosWaitingLight}
          style={styles.sosWaitingGif}
          onLoadStart={() => setState((prevState) => ({ ...prevState, isLoadingImage: true }))}
          onLoadEnd={() => setState((prevState) => ({ ...prevState, isLoadingImage: false }))}
        />
        <CustomText
          textType="semibold"
          style={[styles.descriptionWaiting, { color: state.isDarkMode ? 'white' : '#273238' }]}
        >
          Menghubungi pengelola...
        </CustomText>
        <View style={styles.centerFooter}>
          <TouchableOpacity onPress={() => handleCancel()}>
            <Image source={allLogo.sosCancel} style={styles.sosCancel} />
          </TouchableOpacity>
          <CustomText style={[styles.textTekan, { color: state.isDarkMode ? 'white' : '#273238' }]}>
            Tekan untuk membatalkan
          </CustomText>
        </View>
      </View>
    );
  };

  const ProcessView = () => {
    return (
      <View style={[styles.content, { backgroundColor: state.isDarkMode ? '#121212' : '#FFFFFF' }]}>
        <Image
          //source={{uri: 'https://firebasestorage.googleapis.com/v0/b/ayodhya-edcf7.appspot.com/o/Darurat%2Fsos_respond_gif.gif?alt=media&token=70bedb3f-4037-4fab-ab78-2789f083759f'}}
          source={state.isDarkMode ? allLogo.sosProsesDark : allLogo.sosProsesLight}
          onLoadStart={() => setState((prevState) => ({ ...prevState, isLoadingImage: true }))}
          onLoadEnd={() => setState((prevState) => ({ ...prevState, isLoadingImage: false }))}
        />
        <CustomText
          textType="semibold"
          style={[styles.description, { color: state.isDarkMode ? 'white' : '#273238' }]}
        >
          Panggilan darurat diterima.{'\n'}Petugas sedang menuju ke lokasi Anda.
        </CustomText>
        <CustomText style={[styles.textFooter, { color: state.isDarkMode ? 'white' : '#9B9F95' }]}>
          Panggilan darurat Anda akan tetap terproses sampai diselesaikan oleh petugas. Anda juga
          bisa membatalkan panggilan darurat ini melalui menu riwayat
        </CustomText>
        <TouchableOpacity
          style={[
            styles.touchKeluar,
            {
              backgroundColor: state.isDarkMode ? '#1C1C1E' : 'transparent',
              borderColor: state.isDarkMode ? '#1C1C1E' : '#5AAA0F',
            },
          ]}
          onPress={() => navigation.goBack()}
        >
          <CustomText textType="semibold" style={styles.textKeluar}>
            Kembali ke Beranda
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  const CompleteView = () => {
    return (
      <View style={[styles.content, { backgroundColor: state.isDarkMode ? '#121212' : '#FFFFFF' }]}>
        <Image
          //source={{uri: 'https://firebasestorage.googleapis.com/v0/b/ayodhya-edcf7.appspot.com/o/Darurat%2Fsos_done_gif.gif?alt=media&token=d2b4b725-eecc-4295-ba11-f81d4eb6477f'}}
          source={state.isDarkMode ? allLogo.sosDoneDark : allLogo.sosDoneLight}
          style={styles.sosWaitingGif}
          onLoadStart={() => setState((prevState) => ({ ...prevState, isLoadingImage: true }))}
          onLoadEnd={() => setState((prevState) => ({ ...prevState, isLoadingImage: false }))}
        />
        <CustomText style={[styles.description, { color: state.isDarkMode ? 'white' : '#273238' }]}>
          Situasi darurat telah berhasil diatasi oleh petugas.
        </CustomText>
        <TouchableOpacity
          style={[
            styles.touchKeluar,
            {
              backgroundColor: state.isDarkMode ? '#1C1C1E' : 'transparent',
              borderColor: state.isDarkMode ? '#1C1C1E' : '#5AAA0F',
            },
          ]}
          onPress={() => navigation.goBack()}
        >
          <CustomText style={styles.textKeluar}>KEMBALI KE HOME</CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: state.isDarkMode ? '#121212' : 'white' }]}
    >
      <Loader loading={state.isLoading} />
      <Header title={'SOS Request'} onPress={() => navigation.goBack()} />
      <Loader loading={state.isLoading} />
      {state.emergencyStatus === 'waiting'
        ? WaitingView()
        : state.emergencyStatus === 'process'
        ? ProcessView()
        : CompleteView()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },
  headeriOS: {
    width,
    height: toDp(20),
    backgroundColor: '#5AAA0F',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: toDp(16),
  },
  sosButton: {
    width: toDp(200),
    height: toDp(200),
    resizeMode: 'contain',
  },
  sosWaitingGif: {
    width: toDp(222),
    height: toDp(222),
  },
  description: {
    marginTop: toDp(20),
    fontSize: toDp(14),
    textAlign: 'center',
    color: '#273238',
  },
  descriptionWaiting: {
    marginBottom: toDp(80),
    fontSize: toDp(14),
    textAlign: 'center',
    color: '#273238',
  },
  touchKeluar: {
    width: toDp(189),
    height: toDp(40),
    borderRadius: toDp(10),
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: toDp(10),
  },
  textKeluar: {
    fontSize: toDp(14),
    textAlign: 'center',
    color: '#5AAA0F',
    letterSpacing: 0.7,
  },
  centerFooter: {
    alignItems: 'center',
  },
  sosCancel: {
    width: toDp(50),
    height: toDp(50),
  },
  textTekan: {
    marginTop: toDp(8),
    fontSize: toDp(14),
    textAlign: 'center',
    color: '#273238',
  },
  textFooter: {
    fontSize: toDp(12),
    textAlign: 'center',
    color: '#8C8E92',
    marginTop: toDp(20),
    marginBottom: toDp(30),
    marginHorizontal: toDp(19),
  },
});

export default SosRequestScreen;
