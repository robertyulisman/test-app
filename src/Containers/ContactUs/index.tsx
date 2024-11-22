import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  FlatList,
  SafeAreaView,
  Linking,
  ScrollView,
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';
import Header from "../../Components/Header";
import CustomText from "../../Components/CustomText";
import { allLogo } from "../../Assets";
import { toDp } from "../../Helper/percentageToDP";

import { getTime } from "../../Services/Apis";
const { width, height } = Dimensions.get('window');

const ContactUsScreen = ({ navigation } : any) => {
  const [viewState, setViewState] = useState({
    isDarkMode: false,
    isContactActive: true,
  });

  useEffect(() => {
    let hourCurrent   = parseInt(moment(new Date()).format('HH')) * 3600;
    let minuteCurrent = parseInt(moment(new Date()).format('mm')) * 60;

    let current = hourCurrent + minuteCurrent;

    let minTime = 8 * 3600 + 0 * 60;
    let maxTime = 16 * 3600 + 0 * 60;

    if (current >= minTime && current <= maxTime) {
      setViewState((prevState) => ({ ...prevState, statusHubungi: true }));
    } else {
      setViewState((prevState) => ({ ...prevState, statusHubungi: false }));
    }

    getTime()
      .then((response) => {
        setViewState((prevState) => ({ ...prevState, statusHubungi: response.data.status }));
      })
      .catch((error) => {
        setViewState((prevState) => ({ ...prevState, statusHubungi: false }));
      });
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: viewState.isDarkMode ? '#121212' : 'white' }]}
    >
      <StatusBar
        barStyle={viewState.isDarkMode ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <Header title={'Hubungi Kami'} onPress={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.content}>
          <Image source={allLogo.icContactUs} style={styles.imageContact} />
          <CustomText style={styles.textBuilding}>Hotline Central Connect</CustomText>
          <CustomText textType="semibold" style={styles.textNo}>
            08117757333
          </CustomText>
          <CustomText
            textType="medium"
            style={[
              styles.textHour,
              { marginTop: toDp(8), color: viewState.isDarkMode ? 'white' : '#9B9F95' },
            ]}
          >
            Open hour 08:00 - 16:00
          </CustomText>
          <TouchableOpacity
            style={styles.contactUs}
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
            <CustomText textType="semibold" style={styles.textContact}>
              Hubungi
            </CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? toDp(28) : 0,
  },
  content: {
    paddingTop: toDp(8),
    paddingHorizontal: toDp(16),
    alignItems: 'center',
  },
  imageContact: {
    marginTop: toDp(40),
    marginBottom: toDp(10),
  },
  textContact: {
    fontSize: toDp(14),
    color: '#ffffff',
    fontStyle: 'normal',
  },
  textNo: {
    fontSize: toDp(14),
    color: '#263238',
    fontStyle: 'normal',
    marginTop: toDp(7),
  },
  textHour: {
    fontSize: toDp(12),
    color: '#9B9F95',
    fontStyle: 'normal',
    marginTop: toDp(7),
  },
  contactUs: {
    width: width * 0.3,
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: toDp(20),
  },
  viewBorder: {
    width: '100%',
    height: 'auto',
    borderWidth: toDp(1),
    borderColor: '#eeeeee',
    borderRadius: toDp(6),
    flexDirection: 'row',
    marginTop: toDp(8),
  },
  icCall: {
    width: toDp(36),
    height: toDp(36),
    marginLeft: toDp(12),
    marginRight: toDp(16),
  },
  viewData: {
    //marginVertical: toDp(12)
  },
  textBuilding: {
    fontSize: toDp(14),
    color: '#263238',
    marginTop: toDp(4),
    //   letterSpacing: toDp(0.5)
  },

  textEmail: {
    marginTop: toDp(4),
    fontSize: toDp(14),
    color: '#5AAA0F',
    letterSpacing: toDp(0.7),
  },
  positionRight: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: toDp(16),
    paddingTop: toDp(10),
    paddingBottom: toDp(12),
  },
  touchCall: {
    width: toDp(86),
    height: toDp(28),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchCallAdress: {
    width: toDp(59),
    height: toDp(30),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: toDp(8),
  },
  textHubungi: {
    fontSize: toDp(12),
    color: 'white',
    letterSpacing: toDp(0.4),
  },
  icWa: {
    marginLeft: toDp(12),
    marginRight: toDp(16),
    width: toDp(36),
    height: toDp(36),
    tintColor: '#5AAA0F',
  },
  icEmail: {
    marginLeft: toDp(12),
    marginRight: toDp(16),
    width: toDp(36),
    height: toDp(36),
    tintColor: '#5AAA0F',
  },
  icWebsite: {
    marginLeft: toDp(12),
    marginRight: toDp(16),
    width: toDp(36),
    height: toDp(36),
    tintColor: '#5AAA0F',
  },
  icAddress: {
    marginLeft: toDp(12),
    marginRight: toDp(16),
    width: toDp(36),
    height: toDp(36),
    tintColor: '#5AAA0F',
  },
});

export default ContactUsScreen;
