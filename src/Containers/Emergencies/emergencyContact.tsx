import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import NoConnection from '../../Components/NoConnection';

import { allLogo } from '../../Assets';
import Header from '../../Components/Header';
import { toDp } from '../../Helper/percentageToDP';

import CustomText from '../../Components/CustomText';
import * as NavigatorService from '../../Helper/NavigatorServices';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

import { getEmergencyCategory } from '../../Services/Apis';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const { width, height } = Dimensions.get('window');
const EmergencyContactScreen = (props: any) => {
  const netInfo = useNetInfo();
  const [state, setState] = useState({
    isLoading: true,
    listEmergencyContact: [],
  });

  useEffect(() => {
    fetchContactCategory();
  }, []);

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

  const handleSelectCategory = (categoryData: any) => {
    NavigatorService.navigate('ListContactEmergency', { data: categoryData });
  };

  const EmergencyContactView = () => {
    return (
      <View>
        {state.listEmergencyContact.map((data: any) => {
          return (
            <TouchableOpacity
              style={styles.buttonContact}
              onPress={() => handleSelectCategory(data)}
            >
              <View style={{ flexDirection: 'row' }}>
                <Image source={{ uri: data.image_url }} style={styles.leftIcon} />
                <CustomText style={styles.textName}>{data.name}</CustomText>
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Emergency Contact'} onPress={() => props.navigation.goBack()} />
      {!netInfo.isConnected ? (
        <View style={styles.viewCenterNoConnecttion}>
          <NoConnection />
        </View>
      ) : (
        <View style={styles.content}>
          <ScrollView>{EmergencyContactView()}</ScrollView>
        </View>
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
  content: {
    padding: toDp(20),
    width,
  },
  buttonContact: {
    height: toDp(48),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftIcon: {
    width: toDp(24),
    height: toDp(24),
    marginRight: toDp(12),
  },
  textName: {
    fontSize: toDp(14),
    color: '#273238',
  },
  rightIcon: {
    width: toDp(8),
    height: toDp(12),
    tintColor: '#5AAA0F',
  },
  line: {
    width: width * 0.9,
    height: toDp(1),
    backgroundColor: '#DDE3E0',
    position: 'absolute',
    bottom: 0,
  },
  viewCenterNoConnecttion: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default EmergencyContactScreen;
