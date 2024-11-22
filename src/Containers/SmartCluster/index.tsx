import CustomText from '@src/Components/CustomText';
import Header from '@src/Components/Header';
import Loader from '@src/Components/Loader';
import { toDp } from '@src/Helper/percentageToDP';
import { getEmergencyStatus } from '@src/Services/Apis';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import GetLocation from 'react-native-get-location';
import * as NavigatorService from '../../Helper/NavigatorServices';

const SmartClusterScreen = (props: any) => {
  const [state, setState] = useState({
    arrayMenu: props.route.params.subFeature,
    isLoading: false,
  });

  console.log('props.route.params.dataUser', props.route.params.unit);

  useEffect(() => {
    let arrayMenu = state.arrayMenu;
    setState((state) => ({ ...state, arrayMenu }));
  }, []);

  const functionDetails = (id: any) => {
    console.log(id);
    if (id === 'af01c2ac-8eee-4d7f-858a-d0976e73367c') {
      NavigatorService.navigate('News');
    } else if (id === '0cf4085e-7453-4843-aeb0-0a5e49fa8428') {
      setState((state) => ({ ...state, isLoading: true }));
      getEmergencyStatus()
        .then((response: any) => {
          console.log(response);
          if (
            response.data.emergency.emergency_status === 'Request' ||
            response.data.emergency.emergency_status === 'Proses'
          ) {
            setState((state) => ({ ...state, isLoading: false }));
            NavigatorService.navigate('SosRequest');
          } else {
            GetLocation.getCurrentPosition({
              enableHighAccuracy: true,
              timeout: 10000,
            })
              .then((location) => {
                setState((state) => ({ ...state, isLoading: false }));
                NavigatorService.navigate('Emergency', { location });
              })
              .catch((error) => {
                setState((state) => ({ ...state, isLoading: false }));
                const { code, message } = error;
                console.log(code, message);
                if (code === 'CANCELLED') {
                  Alert.alert(
                    'DIBATALKAN',
                    'Lokasi dibatalkan oleh pengguna atau oleh permintaan lain',
                  );
                } else if (code === 'UNAVAILABLE') {
                  Alert.alert('TIDAK TERSEDIA', 'Layanan lokasi dinonaktifkan atau tidak tersedia');
                } else if (code === 'TIMEOUT') {
                  Alert.alert('WAKTU HABIS', 'Permintaan lokasi habis waktunya');
                } else if (code === 'UNAUTHORIZED') {
                  Alert.alert('TIDAK SAH', 'Otorisasi ditolak');
                }
              });
          }
        })
        .catch((error: any) => {
          console.log(error);
          Alert.alert('Error', 'Masuk Catch');
        });
    } else if (id === 'b32eb510-1b20-48b9-b176-0ac5658830fb') {
      NavigatorService.navigate('Reporting', { dataUser: props.route.params.dataUser });
    }
    if (id === 'd6b6d9ce-2cda-4cd6-8dc2-8aeadead57b2') {
      NavigatorService.navigate('Billing', { unit: props.route.params.unit });
    }
    if (id === '1f4864fe-8b70-4824-8c6c-00c90454cc4a') {
      NavigatorService.navigate('CCTV', { dataUser: props.route.params.dataUser });
    }
    if (id === '80414387-079e-4c87-8a15-226537d12372') {
      NavigatorService.navigate('PhotoProgress', { unit: props.route.params.unit });
    }
    if (id === 'ef88087c-4ccd-466e-afae-d9c40299986b') {
      NavigatorService.navigate('EmergencyContact');
    } else if (id === 'e5f21482-04b1-4064-8caa-1e25694201fa') {
      NavigatorService.navigate('DocumentsRequestScreen', {
        dataUser: props.route.params.dataUser,
      });
    } else {
      //Alert.alert('Coming Soon', 'Feature ini akan segera hadir')
    }
  };

  const renderButton = ({ item, index }: any) => {
    return (
      <TouchableOpacity style={styles.touchButton} onPress={() => functionDetails(item.id)}>
        <Image source={{ uri: item.image_url }} style={styles.iconMenu} />
        <CustomText
          textType="medium"
          style={[
            styles.textName,
            {
              marginTop: item.name.includes('&') ? toDp(8) : toDp(16),
              marginHorizontal: 4,
            },
          ]}
        >
          {item.name}
        </CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Smart Cluster'} onPress={() => props.navigation.goBack()} />
      <Loader loading={state.isLoading} />
      <View style={styles.content}>
        <FlatList
          data={state.arrayMenu}
          renderItem={renderButton}
          numColumns={3}
          ListHeaderComponent={() => (
            <CustomText style={styles.textInfo}>
              {'Nikmati kenyamanan tinggal di Batam Central dengan semua fasilitas yang ada. '}
            </CustomText>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: toDp(20),
    flex: 1,
  },
  viewChildButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMenu: {
    width: toDp(40),
    height: toDp(40),
    marginTop: toDp(10),
  },
  touchButton: {
    width: toDp(100),
    height: toDp(120),
    backgroundColor: '#FFFFFF',
    borderRadius: toDp(10),
    alignItems: 'center',
    //justifyContent: 'space-between',
    //justifyContent: 'center',
    marginLeft: toDp(2),
    marginRight: toDp(6),
    marginBottom: toDp(2),
    marginTop: toDp(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    backgroundColor: 'white',
  },
  textName: {
    color: '#383B34',
    fontSize: toDp(12),
    textAlign: 'center',
    marginTop: toDp(8),
    //height: toDp(40),
    height: toDp(36),
    //backgroundColor: 'cyan'
  },
  textInfo: {
    color: '#273238',
    fontSize: toDp(14),
    marginTop: toDp(20),
    marginBottom: toDp(8),
  },
  icMenuRight: {
    width: toDp(16.9),
    height: toDp(15.84),
  },
});

export default SmartClusterScreen;
