import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import { allLogo } from '../../Assets';
import CustomText from '../../Components/CustomText';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import NoConnection from '../../Components/NoConnection';
import * as NavigatorService from '../../Helper/NavigatorServices';
import { toDp } from '../../Helper/percentageToDP';
import { getEmergencyCategory, getEmergencyStatus, postEmergenciesSend } from '../../Services/Apis';
import HistoryEmergencyScreen from './historyEmergency';

const { width, height } = Dimensions.get('window');

const EmergencyScreen = ({ route, navigation }: any) => {
  const netInfo = useNetInfo();
  const [state, setState] = useState({
    isDarkMode: false,
    isLoading: false,
    listEmergencyContact: [],
    content: 'emergency',
    location: route.params.location,
  });

  const postEmergencies = () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    postEmergenciesSend({
      // latitude: state.location.latitude,
      // longitude: state.location.longitude,
      latitude: 1.1016133,
      longitude: 104.0309097,
    })
      .then((response) => {
        console.log('response', response);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
        navigation.goBack();
        NavigatorService.navigate('SosRequest');
      })
      .catch((error) => {
        console.log('error', error);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
        Alert.alert('' + error.status, '' + error.data.message);
      });
  };

  const checkEmergencyStatus = () => {
    getEmergencyStatus()
      .then((response) => {
        console.log(response);
        if (response.data.emergency.emergency_status === 'Request') {
          setState((prevState) => ({
            ...prevState,
            emergencyStatus: 'waiting',
            isLoading: false,
          }));
          NavigatorService.navigate('SosRequest');
        } else if (response.data.emergency.emergency_status === 'Proses') {
          setState((prevState) => ({
            ...prevState,
            emergencyStatus: 'process',
            isLoading: false,
          }));
          NavigatorService.navigate('SosRequest');
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEmergencies = () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
  };

  const handleSelectCategory = (categoryData: any) => {
    NavigatorService.navigate('ListContactEmergency', { data: categoryData });
  };

  const fetchContactCategory = () => {
    getEmergencyCategory()
      .then((response) => {
        console.log('response', response);
        setState((prevState) => ({
          ...prevState,
          listEmergencyContact: response.data.emergency_contact_categories,
          isLoading: false,
        }));
      })
      .catch((error) => {
        console.log('error', error);
        setState((prevState) => ({ ...prevState, isLoading: false }));
      });
  };

  useEffect(() => {
    //setState(prevState => ({...prevState, isLoading: true}))
    //fetchContactCategory()
    checkEmergencyStatus();
  }, []);

  const DefaultView = () => {
    return (
      <View style={[styles.content, { backgroundColor: state.isDarkMode ? '#121212' : '#FFFFFF' }]}>
        <View style={styles.topTextWrapper}>
          <CustomText style={styles.textDesc} textType="semibold">
            Perhatian!
          </CustomText>
          <CustomText style={[styles.textDesc, { color: state.isDarkMode ? 'white' : '#273238' }]}>
            Gunakan Fitur Darurat ini dengan bijak, hanya berlaku pada area kawasan
          </CustomText>
        </View>
        <TouchableOpacity onPress={() => postEmergencies() /*handleEmergencies()*/}>
          <Image source={allLogo.sosButton} style={styles.sosButton} />
        </TouchableOpacity>
        <CustomText
          style={[
            styles.textDesc,
            { color: state.isDarkMode ? 'white' : '#273238', marginTop: toDp(20) },
          ]}
        >
          Tekan tombol SOS untuk {'\n'} mengaktifkan panggilan darurat
        </CustomText>
      </View>
    );
  };

  const TabView = () => {
    return (
      <View style={styles.viewSection}>
        <TouchableOpacity
          style={styles.touchSection}
          onPress={() => {
            setState((state) => ({ ...state, content: 'emergency' }));
          }}
        >
          <CustomText
            textType="semibold"
            style={[
              styles.textNameSection,
              {
                color: state.content === 'emergency' ? '#5AAA0F' : '#CCCFC9',
              },
            ]}
          >
            EMERGENCY
          </CustomText>
          {state.content === 'emergency' && <View style={styles.active} />}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchSection}
          onPress={() => {
            setState((state) => ({ ...state, content: 'riwayat' }));
          }}
        >
          <CustomText
            textType="semibold"
            style={[
              styles.textNameSection,
              {
                color: state.content === 'riwayat' ? '#5AAA0F' : '#CCCFC9',
              },
            ]}
          >
            RIWAYAT
          </CustomText>
          {state.content === 'riwayat' && <View style={styles.active} />}
        </TouchableOpacity>
      </View>
    );
  };

  const EmergencyContactView = () => {
    return (
      <View style={styles.contactListWrapper}>
        <CustomText textType="semibold" style={styles.emergencyContantText}>
          EMERGENCY CONTACT
        </CustomText>

        {state.listEmergencyContact.map((data: any) => {
          return (
            <TouchableOpacity
              style={styles.buttonContact}
              onPress={() => handleSelectCategory(data)}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: data.image_url }} style={styles.leftIcon} />
                <CustomText>{data.name}</CustomText>
              </View>
              <Image source={allLogo.arrowRight} style={styles.rightIcon} />
              <View style={styles.line} />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: state.isDarkMode ? '#121212' : 'white' }]}
    >
      <Loader loading={state.isLoading} />
      <Header title={'Emergency'} onPress={() => navigation.goBack()} />
      <TabView />
      {!netInfo.isConnected ? (
        <NoConnection />
      ) : state.content === 'emergency' ? (
        <ScrollView>
          {DefaultView()}
          <View style={styles.divider}></View>
          {/*EmergencyContactView()*/}
        </ScrollView>
      ) : (
        <HistoryEmergencyScreen />
      )}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: toDp(16),
  },
  contactListWrapper: {
    margin: toDp(20),
  },
  line: {
    width: width * 0.9,
    height: toDp(1),
    backgroundColor: '#DDE3E0',
    position: 'absolute',
    bottom: 0,
  },
  divider: {
    width: width,
    height: toDp(7),
    backgroundColor: '#EEEEEE',
  },
  topTextWrapper: {
    marginTop: toDp(20),
    marginBottom: toDp(20),
    marginHorizontal: toDp(6),
  },
  leftIcon: {
    resizeMode: 'cover',
    width: toDp(20),
    height: toDp(17),
    marginRight: toDp(12),
  },
  emergencyContantText: {
    marginBottom: toDp(20),
    marginTop: toDp(10),
    fontSize: toDp(16),
    color: '#9B9F95',
  },
  rightIcon: {
    width: toDp(8),
    height: toDp(12),
    tintColor: '#5AAA0F',
  },
  buttonContact: {
    height: toDp(40),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginTop: toDp(63),
    marginBottom: toDp(65),
  },
  textDesc: {
    fontSize: toDp(14),
    textAlign: 'center',
    color: '#273238',
    lineHeight: toDp(24),
  },
  touchKeluar: {
    width: toDp(189),
    height: toDp(40),
    borderRadius: toDp(4),
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: toDp(8),
    fontSize: toDp(12),
    textAlign: 'center',
    color: '#8C8E92',
  },
  viewSection: {
    width,
    height: toDp(40),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default EmergencyScreen;
