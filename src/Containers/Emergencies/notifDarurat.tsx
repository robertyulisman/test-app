import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Modal from 'react-native-modal';
import { allLogo } from '../../Assets';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import { toDp } from '../../Helper/percentageToDP';

import messaging from '@react-native-firebase/messaging';
import CustomText from '../../Components/CustomText';
import { postEmergenciesAction } from '../../Services/Apis';

const { width, height } = Dimensions.get('window');
// @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
var Sound = require('react-native-sound');
type Props = {};
var tempWshoosh: any = '';
const NotifDaruratScreen = ({ navigation, route }: any) => {
  const [state, setState] = useState({
    isLoading: false,
    isDarkMode: false,
    isGoBack: false,
    isShowSuccessModal: false,
  });

  useEffect(() => {
    const unsubscribe = messaging().onMessage((remoteMessage: any) => {
      console.log('NotifDaruratScreen remoteMessage', remoteMessage);
      if (
        remoteMessage.data.entity_type === 'emergency' &&
        remoteMessage.data.entity_additional_info === 'Batal'
      ) {
        Alert.alert(
          remoteMessage.data.title,
          remoteMessage.data.body,
          [
            {
              text: 'OK',
              onPress: () => {
                handleBack();
              },
            },
          ],
          { cancelable: false },
        );
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    playSound();
  }, []);

  useEffect(() => {
    if (state.isLoading === false && state.isGoBack === true) {
      route.params.emergencyData.refreshData();
    }
  }, [state.isLoading]);

  useEffect(() => {
    if (state.isShowSuccessModal === false && state.isGoBack === true) {
      try {
        tempWshoosh.stop(() => {
          navigation.goBack();
        });
      } catch (e) {}
    }
  }, [state.isShowSuccessModal]);

  const playSound = () => {
    var whoosh = new Sound('sirine.mp3', Sound.MAIN_BUNDLE, (error: any) => {
      if (error) {
        return;
      }
      whoosh.play((success: any) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
    whoosh.setVolume(0.1);
    tempWshoosh = whoosh;
  };

  const handleUpdateProcess = () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    postEmergenciesAction('/' + route.params.emergencyData.id)
      .then((response) => {
        console.log(response);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          isGoBack: true,
          isShowSuccessModal: true,
        }));
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          'Informasi',
          'Petugas lain sudah menanggapi sinyal darurat ini',
          [
            {
              text: 'OK',
              onPress: () => {
                setState((prevState) => ({
                  ...prevState,
                  isLoading: false,
                  isGoBack: true,
                }));
              },
            },
          ],
          { cancelable: false },
        );
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('transitionEnd', (e: any) => {
      if (e.data.closing) {
        if (Platform.OS === 'ios') {
          stop();
        }
      }
    });
    return unsubscribe;
  }, [navigation]);

  const stop = () => {
    tempWshoosh.stop(() => {
      console.log('stop');
    });
  };

  const handleBackButtonClick = () => {
    stop();
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick as any);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick as any);
    };
  }, []);

  const handleBack = () => {
    tempWshoosh.stop(() => {
      navigation.goBack();
    });
  };

  const SuccessModalView = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={state.isShowSuccessModal}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View style={styles.modalBox}>
            <Image source={allLogo.icClap} style={styles.icSuccess} />
            <CustomText textType="semibold" style={styles.textTitleModal}>
              TERIMA KASIH TELAH MERESPON
            </CustomText>
            <CustomText style={styles.textDescModal}>
              Silakan menuju lokasi untuk menindak lanjuti panggilan.
            </CustomText>
            <TouchableOpacity
              onPress={() =>
                setState((prevState) => ({
                  ...prevState,
                  isShowSuccessModal: false,
                }))
              }
              style={styles.touchKembaliKeLogin}
            >
              <CustomText style={styles.textKembaliKeLogin}>OK</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: state.isDarkMode ? '#121212' : 'white' }]}
    >
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'SOS Request'} onPress={() => handleBack()} />
      {SuccessModalView()}
      <View style={styles.containerContent}>
        {/*<Image source={allLogo.bgNotifDarurat} style={styles.bgNotifDarurat} />*/}
        <Loader loading={state.isLoading} />
        <View style={styles.center}>
          <Image source={allLogo.sosWaitingGif} style={styles.sosButton} />
          <CustomText textType="semibold" style={styles.title}>
            PANGGILAN DARURAT
          </CustomText>

          <CustomText style={styles.textName}>{route.params.emergencyData.user.name}</CustomText>
          <CustomText style={[styles.textAddress, { textAlign: 'center' }]}>
            {route.params.emergencyData.unit.unit_name}
          </CustomText>

          <TouchableOpacity style={[styles.button]} onPress={() => handleUpdateProcess()}>
            <CustomText textType="semibold" style={styles.textTindakLanjut}>
              Tindak Lanjuti
            </CustomText>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.buttonSilang} onPress={() => this.back()}>
            <Image source={allLogo.icCancelDarurat} style={styles.icCancelDarurat} />
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },
  containerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
  },
  bgNotifDarurat: {
    width,
    //height: Platform.OS === 'android' ? (height + toDp(28)) : height
  },
  whiteLayer: {
    flex: 1,
    backgroundColor: 'cyan',
    position: 'absolute',
  },
  center: {
    flex: 1,
    //backgroundColor: '#99ffffff',
    position: 'absolute',
    alignItems: 'center',
  },
  button: {
    marginTop: toDp(60),
    width: toDp(250),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: toDp(10),
  },
  title: {
    color: '#f5493c',
    fontSize: toDp(20),
    letterSpacing: toDp(2),
  },
  sosButton: {
    marginTop: toDp(30),
    width: toDp(222),
    height: toDp(222),
  },
  textName: {
    marginTop: toDp(40),
    color: '#1c2028',
    fontSize: toDp(18),
    letterSpacing: toDp(1),
    textAlign: 'center',
  },
  textAddress: {
    marginTop: toDp(16),
    color: '#5E6157',
    fontSize: toDp(14),
  },
  textTindakLanjut: {
    color: '#ffffff',
    fontSize: toDp(14),
    letterSpacing: toDp(1),
  },
  buttonSilang: {
    marginTop: toDp(34),
    borderRadius: toDp(23),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icCancelDarurat: {
    width: toDp(60),
    height: toDp(60),
  },
  bottomModal: {
    //justifyContent: "flex-end",
    //margin: 0,
  },
  viewRootModal: {
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: toDp(280),
    height: toDp(320),
    backgroundColor: '#FFFFFF',
    borderRadius: toDp(4),
    alignItems: 'center',
  },
  textTitleModal: {
    fontSize: toDp(14),
    color: '#263238',
    letterSpacing: toDp(1),
    marginTop: toDp(25),
    width: toDp(240),
    textAlign: 'center',
  },
  textDescModal: {
    fontSize: toDp(12),
    color: '#263238',
    marginTop: toDp(12),
    width: toDp(240),
    textAlign: 'center',
  },
  icSuccess: {
    width: toDp(80),
    height: toDp(80),
    marginTop: toDp(40),
  },
  touchKembaliKeLogin: {
    marginTop: toDp(20),
    width: toDp(200),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKembaliKeLogin: {
    fontSize: toDp(14),
    color: '#FFFFFF',
    letterSpacing: toDp(0.2),
  },
});

export default NotifDaruratScreen;
