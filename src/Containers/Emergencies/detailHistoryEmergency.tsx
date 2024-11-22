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

import moment from 'moment';
import ImageView from 'react-native-image-viewing';
import { allLogo } from '../../Assets';
import CustomText from '../../Components/CustomText';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import { toDp } from '../../Helper/percentageToDP';
import { getEmergencyDetailHistory } from '../../Services/Apis';

const { width, height } = Dimensions.get('window');

const DetailHistoryEmergencyScreen = ({ navigation, route }: any) => {
  const [state, setState] = useState({
    isDarkMode: false,
    isLoading: false,
    isImageViewVisible: false,
    isShowSuccessModal: false,
    emergencyData: {
      emergency_status: 'Request',
      created_at: '',
      unit: {
        unit_name: '',
      },
      finished_at: '',
      processed_at: '',
      admin: {
        name: '',
      },
      emergency_response: {
        content: '',
        emergency_response_images: [],
      },
    },
    imagesUri: [],
    indexPhotoResponse: 0,
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    fetchEmergencyDetail(route.params.emergencyId);
  }, []);

  const fetchEmergencyDetail = (id: any) => {
    getEmergencyDetailHistory(id)
      .then((response) => {
        console.log(response);
        let images: any = [];
        if (response.data.emergency.emergency_response != null) {
          images = response.data.emergency.emergency_response.emergency_response_images.map(
            (value: any) => ({ uri: value.image_url }),
          );
        }
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
          emergencyData: response.data.emergency,
          imagesUri: images,
        }));
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const ProcessView = () => {
    return (
      <View style={styles.subInfoWrapper}>
        <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: toDp(12) }}>
          <View style={[styles.circleStatus, { backgroundColor: '#F2C041' }]}></View>
          {state.emergencyData.emergency_status === 'Selesai' ? (
            <View style={styles.borderLine}></View>
          ) : (
            <View />
          )}
        </View>

        <View>
          <CustomText style={styles.textStatus}>Diproses</CustomText>
          <View style={styles.descWrapper}>
            <Image source={allLogo.icCalendar} style={styles.iconInfo} />
            <CustomText style={styles.textInfo}>
              {moment(state.emergencyData.processed_at).format('DD MMMM YYYY, HH:mm')} WIB
            </CustomText>
          </View>
          <View style={styles.descWrapper}>
            <Image source={allLogo.icOfficer} style={styles.iconInfo} />
            <CustomText style={styles.textInfo}>{state.emergencyData.admin.name}</CustomText>
          </View>
          <View style={{ height: toDp(15) }}></View>
        </View>
      </View>
    );
  };

  const CompleteView = () => {
    console.log('state', state);
    return (
      <View style={styles.subInfoWrapper}>
        <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: toDp(12) }}>
          <View style={[styles.circleStatus, { backgroundColor: '#8FB339' }]}></View>
        </View>

        <View>
          <CustomText style={styles.textStatus}>Selesai</CustomText>
          <View style={styles.descWrapper}>
            <Image source={allLogo.icCalendar} style={styles.iconInfo} />
            <CustomText style={styles.textInfo}>
              {moment(state.emergencyData.finished_at).format('DD MMMM YYYY, HH:mm')} WIB
            </CustomText>
          </View>
          <View style={styles.descWrapper}>
            <Image source={allLogo.icOfficer} style={styles.iconInfo} />
            <CustomText style={styles.textInfo}>{state.emergencyData.admin.name}</CustomText>
          </View>
          <View style={[styles.descWrapper, { alignItems: 'flex-start' }]}>
            <Image source={allLogo.icNote} style={[styles.iconInfo, { marginTop: toDp(1) }]} />
            <CustomText style={styles.textInfo}>
              {state.emergencyData.emergency_response.content}
            </CustomText>
          </View>
          <ScrollView horizontal={true} style={{ marginBottom: toDp(10) }}>
            {state.emergencyData.emergency_response.emergency_response_images.map(
              (data: any, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setState((prevState) => ({
                        ...prevState,
                        isImageViewVisible: true,
                        indexPhotoResponse: index,
                      }));
                    }}
                  >
                    <Image
                      style={[
                        styles.img,
                        {
                          width: toDp(80),
                          height: toDp(80),
                          marginRight: toDp(10),
                        },
                      ]}
                      source={{ uri: data.image_url }}
                    />
                  </TouchableOpacity>
                );
              },
            )}
          </ScrollView>
          <ImageView
            images={state.imagesUri}
            animationType={'fade'}
            imageIndex={state.indexPhotoResponse}
            visible={state.isImageViewVisible}
            onRequestClose={() => setState((state) => ({ ...state, isImageViewVisible: false }))}
          />
        </View>
      </View>
    );
  };

  console.log('status', state.emergencyData.emergency_status);
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: state.isDarkMode ? '#121212' : 'white' }]}
    >
      <Loader loading={state.isLoading} />
      <StatusBar
        barStyle={state.isDarkMode ? 'light-content' : 'dark-content'}
        translucent={false}
        backgroundColor={'transparent'}
      />
      <Header title={'Detail Emergency'} onPress={() => navigation.goBack()} />
      <ScrollView style={{ backgroundColor: '#f5f7f8' }}>
        <View style={styles.infoWrapper}>
          <CustomText textType="semibold" style={styles.textPanggilan}>
            DETAIL RIWAYAT
          </CustomText>
          <View style={styles.subInfoWrapper}>
            <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: toDp(12) }}>
              <View style={styles.circleStatus}></View>
              {state.emergencyData.emergency_status == 'Proses' ||
              state.emergencyData.emergency_status == 'Selesai' ? (
                <View style={styles.borderLine}></View>
              ) : (
                <View />
              )}
            </View>

            <View>
              <CustomText style={styles.textStatus}>Panggilan SOS</CustomText>
              <View style={styles.descWrapper}>
                <Image source={allLogo.icCalendar} style={styles.iconInfo} />
                <CustomText style={styles.textInfo}>
                  {moment(state.emergencyData.created_at).format('DD MMMM YYYY, HH:mm')} WIB
                </CustomText>
              </View>
              <View style={styles.descWrapper}>
                <Image source={allLogo.icHomeCluster} style={styles.iconInfo} />
                <CustomText style={styles.textInfo}>
                  {state.emergencyData.unit.unit_name}
                </CustomText>
              </View>
              <View style={{ height: toDp(15) }}></View>
            </View>
          </View>
          {state.emergencyData.emergency_status == 'Selesai' ? (
            <View>
              {ProcessView()}
              {CompleteView()}
            </View>
          ) : state.emergencyData.emergency_status == 'Proses' ? (
            ProcessView()
          ) : (
            <View></View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },
  infoWrapper: {
    padding: toDp(20),
    backgroundColor: 'white',
  },
  descWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: toDp(5),
  },
  circleStatus: {
    backgroundColor: '#EE4040',
    width: toDp(20),
    height: toDp(20),
    borderRadius: toDp(10),
  },
  borderLine: {
    flex: 1,
    width: toDp(1),
    backgroundColor: '#CCCFC9',
  },
  textInfo: {
    fontSize: toDp(12),
    color: '#5E6157',
    width: toDp(260),
  },
  iconInfo: {
    width: toDp(13),
    height: toDp(13),
    tintColor: '#9B9F95',
    marginRight: toDp(12),
  },
  subInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textPanggilan: {
    fontSize: toDp(16),
    color: '#9B9F95',
    marginBottom: toDp(20),
    letterSpacing: toDp(1),
  },
  textTitle: {
    fontSize: toDp(12),
    color: '#9B9F95',
  },
  textValue: {
    fontSize: toDp(14),
    lineHeight: toDp(24),
    marginTop: toDp(2),
  },
  buttonValue: {
    borderRadius: toDp(5),
    borderColor: '#5AAA0F',
    borderWidth: toDp(1),
    paddingHorizontal: toDp(10),
    paddingVertical: toDp(5),
  },
  textButton: {
    fontSize: toDp(12),
    color: '#5AAA0F',
  },
  viewStatus: {
    width: '100%',
    height: 'auto',
    borderTopWidth: toDp(10),
    borderBottomWidth: toDp(2),
    borderTopColor: '#f5f7f8',
    borderBottomColor: '#f5f7f8',
    padding: toDp(20),
    backgroundColor: 'white',
  },
  viewUlasan: {
    marginTop: toDp(10),
    paddingTop: toDp(20),
    backgroundColor: 'white',
  },
  img: {
    width: toDp(300),
    height: toDp(162),
    borderRadius: toDp(4),
    marginTop: toDp(10),
    //marginRight: toDp(10),
  },
  textNo: {
    height: toDp(24),
    fontSize: toDp(14),
    color: '#000000',
    marginVertical: toDp(30),
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginTop: toDp(20),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line: {
    width: toDp(262),
    height: toDp(1),
    backgroundColor: '#d3d6db',
    position: 'absolute',
    top: toDp(8),
    left: toDp(30),
    zIndex: -1,
  },
  viewCenterStatus: {
    alignItems: 'center',
  },
  sizeActive: {
    width: toDp(16),
    height: toDp(16),
    borderRadius: toDp(11),
  },
  sizeNoActive: {
    width: toDp(10),
    height: toDp(10),
    borderRadius: toDp(11),
  },
  grey: {
    width: toDp(10),
    height: toDp(10),
    backgroundColor: '#d3d6db',
    borderRadius: toDp(11),
    marginTop: toDp(4),
  },
  textActive: {
    marginTop: toDp(10),
    fontSize: toDp(14),
    color: '#273238',
  },
  textNoActive: {
    marginTop: toDp(14),
    fontSize: toDp(14),
    color: '#788f9c',
  },
  viewStatusNew: {
    marginTop: toDp(20),
    width: toDp(78),
    height: toDp(30),
    borderRadius: toDp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStatus: {
    fontSize: toDp(14),
    color: '#383B34',
  },
  viewItemRow: {
    marginHorizontal: toDp(20),
    marginTop: toDp(20),
    flexDirection: 'row',
  },
  doneButton: {
    width: toDp(width * 0.85),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(10),
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: toDp(2),
    borderColor: '#DDE3E0',
    paddingVertical: toDp(10),
    position: 'absolute',
    bottom: 20,
    width: width,
    backgroundColor: 'white',
  },
  doneText: {
    color: '#ffffff',
    fontSize: toDp(14),
  },
  imgPhoto: {
    width: toDp(40),
    height: toDp(40),
    borderRadius: toDp(20),
    marginRight: toDp(16),
    backgroundColor: '#9B9F95',
  },
  textName: {
    fontSize: toDp(12),
    color: '#788f9c',
  },
  textTime: {
    fontSize: toDp(12),
    color: '#788f9c',
  },
  textContent: {
    marginTop: toDp(6),
    fontSize: toDp(14),
    color: '#000000',
  },
  textMore: {
    fontSize: toDp(12),
    color: '#56a7d4',
  },
  textBatal: {
    marginTop: toDp(16),
    fontSize: toDp(14),
    fontWeight: '600',
    letterSpacing: toDp(0.05),
  },
});

export default DetailHistoryEmergencyScreen;
