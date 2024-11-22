import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import moment from 'moment';
import ImageView from 'react-native-image-viewing';
import CustomText from '../../Components/CustomText';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import ViewMoreText from '../../Components/ViewMoreText';
import * as NavigatorService from '../../Helper/NavigatorServices';
import { toDp } from '../../Helper/percentageToDP';
import { getEmergencyDetail } from '../../Services/Apis';

const { width, height } = Dimensions.get('window');

const DetailEmergencyScreen = ({ navigation, route }: any) => {
  const [state, setState] = useState({
    isDarkMode: false,
    isLoading: false,
    isImageViewVisible: false,
    detailsReport: {
      complaint_report_responses: [],
    },
    detailEmergency: {
      user: {
        name: '',
        phone: '',
      },
      unit: {
        unit_name: '',
      },
      created_at: '',
      latitude: 0,
      longitude: 0,
      emergency_status: 'waiting',
    },
    adminData: {
      name: '',
      image_url: '',
    },
    responseData: {
      content: '',
      created_at: '',
      emergency_response_images: [],
    },
    imagesUri: [],
    indexPhotoResponse: 0,
  });

  useEffect(() => {
    fetchEmergencyDetail(route.params.emergencyData.id);
  }, []);

  const fetchEmergencyDetail = (id: any) => {
    getEmergencyDetail(id)
      .then((response) => {
        console.log('response', response);
        let images: any = [];
        if (response.data.emergency.emergency_response != null) {
          images = response.data.emergency.emergency_response.emergency_response_images.map(
            (value: any) => ({ uri: value.image_url }),
          );
        }
        setState((prevState) => ({
          ...prevState,
          detailEmergency: response.data.emergency,
          adminData: response.data.emergency.admin,
          responseData: response.data.emergency.emergency_response,
          imagesUri: images,
        }));
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const handleProcess = () => {
    NavigatorService.navigate('EmergencyResponse', { emergencyData: route.params.emergencyData });
  };

  const handleLocation = () => {
    Linking.openURL(
      Platform.OS === 'android'
        ? `google.navigation:q=${state.detailEmergency.latitude}+${state.detailEmergency.longitude}`
        : `http://maps.apple.com/?ll=${state.detailEmergency.latitude},${state.detailEmergency.longitude}&q=${state.detailEmergency.user.name}`,
    );
  };

  const StatusView = (status: any) => {
    return (
      <View
        style={[
          styles.viewStatus,
          {
            borderTopColor: state.isDarkMode ? '#1C1C1E' : '#f5f7f8',
            borderBottomColor: state.isDarkMode ? '#1C1C1E' : '#f5f7f8',
          },
        ]}
      >
        <CustomText
          textType="semibold"
          style={[styles.textPanggilan, { color: state.isDarkMode ? 'white' : '#9B9F95' }]}
        >
          STATUS
        </CustomText>

        {status === 'Invalid' || status === 'Batal' ? (
          <View
            style={[
              styles.viewStatusNew,
              {
                backgroundColor: status === 'Invalid' ? '#6b7b83' : '#6b7b83',
              },
            ]}
          >
            <CustomText style={styles.textStatus}>{status}</CustomText>
          </View>
        ) : (
          <View style={styles.row}>
            <View style={styles.viewCenterStatus}>
              <View
                style={[
                  status === 'Terkirim' ? styles.sizeActive : styles.sizeNoActive,
                  {
                    backgroundColor: status === 'Terkirim' ? '#f53c3c' : '#CCCFC9',
                    marginTop: status === 'Terkirim' ? 0 : toDp(4),
                  },
                ]}
              />
              <CustomText
                style={
                  status === 'Terkirim'
                    ? [styles.textActive, { color: state.isDarkMode ? 'white' : '#273238' }]
                    : styles.textNoActive
                }
              >
                Terkirim
              </CustomText>
            </View>
            <View style={styles.viewCenterStatus}>
              <View
                style={[
                  status === 'Proses' ? styles.sizeActive : styles.sizeNoActive,
                  {
                    backgroundColor: status === 'Proses' ? '#f2c141' : '#CCCFC9',
                    marginTop: status === 'Proses' ? 0 : toDp(4),
                  },
                ]}
              />
              <CustomText
                style={
                  status === 'Proses'
                    ? [styles.textActive, { color: state.isDarkMode ? 'white' : '#273238' }]
                    : styles.textNoActive
                }
              >
                Proses
              </CustomText>
            </View>
            <View style={styles.viewCenterStatus}>
              <View
                style={[
                  status === 'Selesai' ? styles.sizeActive : styles.sizeNoActive,
                  {
                    backgroundColor: status === 'Selesai' ? '#28a595' : '#CCCFC9',
                    marginTop: status === 'Selesai' ? 0 : toDp(4),
                  },
                ]}
              />
              <CustomText
                style={
                  status === 'Selesai'
                    ? [styles.textActive, { color: state.isDarkMode ? 'white' : '#273238' }]
                    : styles.textNoActive
                }
              >
                Selesai
              </CustomText>
            </View>
            <View style={styles.line} />
          </View>
        )}
      </View>
    );
  };

  const FooterView = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.doneButton} onPress={() => handleProcess()}>
          <CustomText textType="semibold" style={styles.doneText}>
            Selesaikan
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  const ResponseView = () => {
    return (
      <View
        style={[
          styles.viewUlasan,
          {
            borderBottomWidth: toDp(1),
            borderBottomColor: state.isDarkMode ? '#1C1C1E' : '#f5f7f8',
          },
        ]}
      >
        <CustomText
          textType="semibold"
          style={[
            styles.textPanggilan,
            { marginLeft: toDp(20), color: state.isDarkMode ? 'white' : '#9B9F95' },
          ]}
        >
          TANGGAPAN
        </CustomText>
        {ItemView()}
      </View>
    );
  };

  const ItemView = () => {
    return (
      <View>
        <View style={styles.viewItemRow}>
          <Image source={{ uri: state.adminData.image_url }} style={styles.imgPhoto} />
          <View>
            <CustomText
              style={[styles.textName, { color: state.isDarkMode ? 'white' : '#788f9c' }]}
            >
              {state.adminData.name}
            </CustomText>
            <ViewMoreText
              textStyle={{
                marginTop: toDp(6),
                width: toDp(240),
              }}
              numberOfLines={3}
              renderViewMore={(onPress: any) => (
                <CustomText style={styles.textMore} onPress={onPress}>
                  Lihat lebih banyak
                </CustomText>
              )}
              renderViewLess={(onPress: any) => (
                <CustomText style={styles.textMore} onPress={onPress}>
                  Lihat lebih sedikit
                </CustomText>
              )}
            >
              <CustomText
                style={[
                  styles.textContent,
                  {
                    color: state.isDarkMode ? 'white' : '#000000',
                  },
                ]}
                ellipsizeMode="tail"
              >
                {state.responseData.content}
              </CustomText>
            </ViewMoreText>
            <CustomText
              style={[
                styles.textTime,
                { color: state.isDarkMode ? 'white' : '#788f9c', marginTop: toDp(2) },
              ]}
            >
              {moment(state.responseData.created_at).format('dddd, DD MMMM YYYY, HH:mm:ss')}
            </CustomText>
          </View>
          <View>
            <View
              style={[
                {
                  backgroundColor:
                    state.detailEmergency.emergency_status === 'Selesai'
                      ? '#f2c141'
                      : state.detailEmergency.emergency_status === 'Invalid'
                      ? '#6b7b83'
                      : '#28a595',
                },
              ]}
            />
          </View>
        </View>
        <ScrollView horizontal={true} style={{ marginLeft: toDp(76), marginBottom: toDp(50) }}>
          {state.responseData.emergency_response_images.map((data: any, index) => {
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
          })}
        </ScrollView>

        <ImageView
          images={state.imagesUri}
          animationType={'fade'}
          imageIndex={state.indexPhotoResponse}
          visible={state.isImageViewVisible}
          onRequestClose={() => setState((state) => ({ ...state, isImageViewVisible: false }))}
        />
      </View>
    );
  };

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
            INFO PANGGILAN
          </CustomText>
          <View style={styles.subInfoWrapper}>
            <View>
              <CustomText style={styles.textTitle}>Nama Pemanggil</CustomText>
              <CustomText style={styles.textValue}>{state.detailEmergency.user.name}</CustomText>
            </View>
            <TouchableOpacity
              style={styles.buttonValue}
              onPress={() => {
                handleLocation();
              }}
            >
              <CustomText style={styles.textButton}>Lacak Lokasi</CustomText>
            </TouchableOpacity>
          </View>
          <View style={styles.subInfoWrapper}>
            <View>
              <CustomText style={styles.textTitle}>Telepon</CustomText>
              <CustomText style={styles.textValue}>{state.detailEmergency.user.phone}</CustomText>
            </View>
            <TouchableOpacity
              style={styles.buttonValue}
              onPress={() => {
                if (
                  state.detailEmergency.user.phone[0] + state.detailEmergency.user.phone[1] ===
                  '62'
                ) {
                  Linking.openURL(`tel:+${state.detailEmergency.user.phone.trim()}`);
                } else {
                  Linking.openURL(`tel:${state.detailEmergency.user.phone.trim()}`);
                }
              }}
            >
              <CustomText style={styles.textButton}>Hubungi</CustomText>
            </TouchableOpacity>
          </View>
          <View style={styles.subInfoWrapper}>
            <View>
              <CustomText style={styles.textTitle}>Alamat</CustomText>
              <CustomText style={styles.textValue}>
                {state.detailEmergency.unit.unit_name}
              </CustomText>
            </View>
          </View>
          <View style={styles.subInfoWrapper}>
            <View>
              <CustomText style={styles.textTitle}>Waktu Melakukan Panggilan</CustomText>
              <CustomText style={[styles.textValue, { maxWidth: toDp(300) }]}>
                {moment(state.detailEmergency.created_at).format('dddd, DD MMMM YYYY, HH:mm:ss')}
              </CustomText>
            </View>
          </View>
        </View>
        {StatusView(state.detailEmergency.emergency_status)}
        {state.detailEmergency.emergency_status === 'Selesai' ? ResponseView() : <View></View>}
      </ScrollView>
      {state.detailEmergency.emergency_status === 'Proses' ? FooterView() : <View></View>}
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
  subInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: toDp(20),
  },
  textPanggilan: {
    fontSize: toDp(16),
    color: '#9B9F95',
  },
  textTitle: {
    fontSize: toDp(12),
    color: '#9B9F95',
  },
  textValue: {
    fontSize: toDp(14),
    lineHeight: toDp(24),
    marginTop: toDp(2),
    maxWidth: toDp(210),
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
    color: '#FFFFFF',
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
    paddingBottom: Platform.OS === 'ios' ? toDp(25) : 10,
    position: 'absolute',
    bottom: 0,
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

export default DetailEmergencyScreen;
