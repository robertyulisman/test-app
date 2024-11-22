import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GetLocation from 'react-native-get-location';
import Modal from 'react-native-modal';
import Carousel from 'react-native-reanimated-carousel';
import { allLogo } from '../../Assets';
import CustomText from '../../Components/CustomText';
import Loader from '../../Components/Loader';
import * as NavigatorService from '../../Helper/NavigatorServices';
import { toDp } from '../../Helper/percentageToDP';
import { getHighlights, getUnitsOccupied, putUnitsOccupiedSwitch } from '../../Services/Apis';

const { width, height } = Dimensions.get('window');
const HomeScreen = (props: any) => {
  const netInfo = useNetInfo();
  const [state, setState] = useState<any>({
    arrayBanner: [],
    unit: {},
    arrayUnits: [],
    dataUser: null,
    isModalUnit: false,
    features: [],
    imageUser: '',
    loading: false,
  });

  useEffect(() => {
    loadUserUnit();
    getHighlights()
      .then((response) => {
        console.log(response);
        setState((state: any) => ({ ...state, arrayBanner: response.data.news_article }));
      })
      .catch((error) => {
        console.log(error);
      });
    loadUnit();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage((remoteMessage: any) => {
      console.log('HomeScreen', remoteMessage);
      if (remoteMessage.data.entity_type === 'unit') {
        loadUnit();
      }
    });
    return unsubscribe;
  }, []);

  const loadUserUnit = async () => {
    let dataUser: any = await AsyncStorage.getItem('dataUser');
    let unit: any = await AsyncStorage.getItem('unit');
    let features: any = await AsyncStorage.getItem('features');
    setState((state: any) => ({
      ...state,
      dataUser: JSON.parse(dataUser),
      unit: JSON.parse(unit),
      features: JSON.parse(features),
      imageUser: JSON.parse(dataUser)?.image_url,
    }));
  };

  const setImageProfile = (imageUser: any) => {
    setState((state: any) => ({ ...state, imageUser }));
  };

  const loadUnit = () => {
    getUnitsOccupied('?isApproved=1')
      .then((response) => {
        console.log(response);
        let arrayUnits: any = [];
        for (var i = 0; i < response.data.units.length; i++) {
          if (response.data.units[i].is_approved) {
            arrayUnits.push(response.data.units[i]);
          }
        }
        setState((state: any) => ({ ...state, arrayUnits }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderItem = ({ item, index }: any, parallaxProps: any) => {
    return <Image source={{ uri: item }} style={{ width: toDp(200), height: toDp(100) }} />;
  };

  const functionDetailsMenu = (id: any, sub_feature_mobiles: any) => {
    console.log('id', id);
    if (state.dataUser.is_a_resident) {
      // Penghuni
      if (id === '1483423a-e325-4fe3-97a4-ab68e2dd3d8d') {
        //Smart Cluster
        NavigatorService.navigate('SmartCluster', {
          subFeature: sub_feature_mobiles,
          dataUser: state.dataUser,
          unit: state.unit,
        });
      } else if (id === '4e672548-4418-432a-b273-1955fabd12b7') {
        // Smart Community
        NavigatorService.navigate('SmartCommunity', { subFeature: sub_feature_mobiles });
      } else {
        // Smart Home
        NavigatorService.navigate('SmartHome', { subFeature: sub_feature_mobiles });
      }
    } else {
      //Pengelola
      if (id === '9312462a-03c1-4d95-b47c-e5df05bd661d') {
        // Berita
        NavigatorService.navigate('News');
      } else if (id === '35144d0e-8987-432b-a6c6-ac1e6bbd44f9') {
        NavigatorService.navigate('ListEmergency');
      } else if (id === '86052745-d673-4f19-beb4-582d34613e0a') {
        NavigatorService.navigate('Reporting', { dataUser: state.dataUser });
      } else if (id === '65aa7b86-139a-4bba-9aff-32fc6ead1718') {
        NavigatorService.navigate('CCTV', { dataUser: state.dataUser });
      } else {
        //Alert.alert('Coming Soon','Feature ini akan segera hadir')
      }
    }
  };

  const renderButton = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.touchButton,
          {
            marginLeft: index % 3 === 0 ? toDp(20) : 0,
          },
        ]}
        onPress={() => functionDetailsMenu(item.id, item?.sub_feature_mobiles)}
      >
        <Image
          source={{ uri: item.image_url }}
          style={[
            styles.iconMenu,
            {
              marginTop: state.dataUser.is_a_resident ? toDp(4) : 0,
            },
          ]}
        />
        <CustomText
          textType="medium"
          style={[
            styles.textName,
            {
              height: state.dataUser.is_a_resident ? toDp(40) : 'auto',
            },
          ]}
        >
          {item.name.replace(' ', '\n')}
        </CustomText>
      </TouchableOpacity>
    );
  };

  const renderModalUnit = () => {
    return (
      <Modal
        onBackdropPress={() => setState((state: any) => ({ ...state, isModalUnit: false }))}
        onBackButtonPress={() => setState((state: any) => ({ ...state, isModalUnit: false }))}
        style={styles.bottomModal}
        isVisible={state.isModalUnit}
      >
        <View style={[styles.viewRootModal, { height: height * 0.8 }]}>
          <View style={[styles.modalBox, { backgroundColor: 'white', height: height * 0.8 }]}>
            <View style={styles.viewModalTitle}>
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                style={styles.textTitleModal}
              >
                {'UNIT'}
              </CustomText>
              <TouchableOpacity
                style={styles.touchSilang}
                onPress={() => setState((state: any) => ({ ...state, isModalUnit: false }))}
              >
                <Image
                  source={allLogo.icSilang}
                  style={[styles.icSilang, { tintColor: '#273238' }]}
                />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {state.arrayUnits.length !== 0 &&
                state.arrayUnits.map((data: any, index: any) => {
                  return (
                    <View>
                      <TouchableOpacity
                        style={styles.viewItem}
                        onPress={() => {
                          let body = { unit_id: data.unit.id };
                          putUnitsOccupiedSwitch(body)
                            .then((response) => {
                              console.log(response);
                              setState((state: any) => ({
                                ...state,
                                isModalUnit: false,
                                unit: response.data.units.unit,
                              }));
                              loadUnit();
                              AsyncStorage.setItem(
                                'unit',
                                JSON.stringify(response.data.units.unit),
                              );
                            })
                            .catch((error) => {
                              console.log(error);
                            });
                        }}
                      >
                        <CustomText
                          textType="regular"
                          allowFontScaling={false}
                          style={[styles.textNameUnit, { color: '#273238' }]}
                        >
                          {data.unit.unit_name}
                        </CustomText>
                        {index === 0 && (
                          <Image source={allLogo.icHouseCeklis} style={styles.icHouseCeklis} />
                        )}
                      </TouchableOpacity>
                      <View style={styles.lineItem} />
                    </View>
                  );
                })}
            </ScrollView>

            <View style={styles.viewFooter}>
              <TouchableOpacity
                style={styles.touchTanbah}
                onPress={() => {
                  NavigatorService.navigate('AddUnit');
                  setState((state: any) => ({ ...state, isModalUnit: false }));
                }}
              >
                <CustomText textType="semibold" allowFontScaling={false} style={styles.textTambah}>
                  TAMBAH UNIT
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'transparent'} />
      {renderModalUnit()}
      <Loader loading={state.loading} />
      <ImageBackground source={allLogo.imgBackground} style={styles.imgBackground}>
        <View style={styles.backgroundShadow} />
        <View style={styles.header}>
          <View style={styles.headerWelcome}>
            <CustomText textType="semibold" style={styles.textWelcome}>
              Welcome to{'\n'}Central Connect
            </CustomText>
            <TouchableOpacity
              onPress={() => {
                NavigatorService.navigate('Profile', { setImageProfile });
              }}
            >
              {state.imageUser === '' ? (
                <Image source={allLogo.imgDefault} style={styles.imgProfile} />
              ) : (
                <Image source={{ uri: state.imageUser }} style={styles.imgProfile} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.viewUnitNotification}>
            {state.dataUser?.is_a_resident ? (
              <TouchableOpacity
                style={styles.touchUnit}
                onPress={() => setState((state: any) => ({ ...state, isModalUnit: true }))}
              >
                <CustomText textType="semibold" style={styles.textUnit}>
                  {state.unit?.unit_name}
                </CustomText>
                <Image source={allLogo.icDownChevron} style={styles.icDownChevron} />
              </TouchableOpacity>
            ) : (
              <View style={{ width: toDp(250) }} />
            )}
            <TouchableOpacity
              onPress={() =>
                NavigatorService.navigate('Notification', {
                  isResident: state.dataUser?.is_a_resident,
                })
              }
            >
              <Image
                source={allLogo.icHomepageNotification}
                style={styles.icHomepageNotification}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <FlatList
            data={state.features}
            renderItem={renderButton}
            numColumns={3}
            ListHeaderComponent={() => {
              return (
                <View style={styles.viewCarousel}>
                  {state.arrayBanner.length !== 0 && (
                    <GestureHandlerRootView>
                      <Carousel
                        loop={false}
                        vertical={false}
                        style={{ width, height: toDp(200) }}
                        width={toDp(332)}
                        height={0}
                        // removeClippedSubviews={false}
                        data={state.arrayBanner}
                        mode={'default' as any}
                        renderItem={({ item }: any) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                if (netInfo.isConnected) {
                                  NavigatorService.navigate('DetailsNews', { id: item.id });
                                } else {
                                  // @ts-expect-error TS(2304): Cannot find name 'alert'.
                                  alert('Maaf, tidak ada koneksi internet.');
                                }
                              }}
                            >
                              <Image
                                source={{ uri: item.banner_image_url }}
                                style={styles.imgBanner}
                              />
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </GestureHandlerRootView>
                  )}
                </View>
              );
            }}
          />
        </View>
        {state.dataUser?.is_a_resident && (
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.touchHelpMe}
              onPress={() => {
                setState((state: any) => ({ ...state, loading: true }));
                GetLocation.getCurrentPosition({
                  enableHighAccuracy: true,
                  timeout: 10000,
                })
                  .then((location) => {
                    setState((state: any) => ({ ...state, loading: false }));
                    NavigatorService.navigate('Emergency', { location });
                  })
                  .catch((error) => {
                    setState((state: any) => ({ ...state, loading: false }));
                    const { code, message } = error;

                    console.log(code, message);
                    if (code === 'CANCELLED') {
                      //Alert.alert('DIBATALKAN','Lokasi dibatalkan oleh pengguna atau oleh permintaan lain')
                    } else if (code === 'UNAVAILABLE') {
                      Alert.alert(
                        'TIDAK TERSEDIA',
                        'Layanan lokasi dinonaktifkan atau tidak tersedia',
                      );
                    } else if (code === 'TIMEOUT') {
                      Alert.alert('WAKTU HABIS', 'Permintaan lokasi habis waktunya');
                    } else if (code === 'UNAUTHORIZED') {
                      Alert.alert('TIDAK SAH', 'Otorisasi ditolak');
                    }
                  });
              }}
            >
              <CustomText textType="semibold" style={styles.textHelpMe}>
                Help me!
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgBackground: {
    flex: 1,
    //padding: toDp(20)
  },
  header: {
    paddingTop: toDp(36),
    paddingHorizontal: toDp(20),
  },
  headerWelcome: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textWelcome: {
    color: 'white',
    fontSize: toDp(24),
    fontWeight: '600',
  },
  imgProfile: {
    width: toDp(60),
    height: toDp(60),
    borderRadius: toDp(30),
  },
  viewUnitNotification: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: toDp(16),
  },
  icHomepageNotification: {
    width: toDp(40),
    height: toDp(40),
  },
  touchUnit: {
    width: toDp(250),
    height: toDp(40),
    backgroundColor: '#FFFFFF4D',
    borderRadius: toDp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textUnit: {
    color: 'white',
    fontSize: toDp(12),
    fontWeight: '600',
    marginLeft: toDp(10),
  },
  icDownChevron: {
    width: toDp(12),
    height: toDp(7.42),
    tintColor: 'white',
    marginRight: toDp(16),
  },
  content: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: toDp(20),
    paddingBottom: toDp(20),
  },
  touchHelpMe: {
    width: toDp(90),
    height: toDp(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(10),
    backgroundColor: '#5AAA0F',
  },
  textHelpMe: {
    color: 'white',
    fontSize: toDp(14),
    fontWeight: '600',
  },
  touchButton: {
    width: toDp(100),
    height: toDp(100),
    backgroundColor: '#FFFFFF',
    borderRadius: toDp(10),
    alignItems: 'center',
    justifyContent: 'center',
    //paddingHorizontal: toDp(20),
    marginTop: toDp(16),
    marginRight: toDp(10),
  },
  viewChildButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMenu: {
    width: toDp(40),
    height: toDp(40),
    marginTop: toDp(4),
  },
  textName: {
    color: '#383B34',
    fontSize: toDp(12),
    textAlign: 'center',
    marginTop: toDp(8),
    //height: toDp(40),
    paddingHorizontal: toDp(12),
  },
  icMenuRight: {
    width: toDp(16.9),
    height: toDp(15.84),
  },
  imgBanner: {
    width: toDp(320),
    height: toDp(200),
    borderRadius: toDp(10),
    marginLeft: toDp(20),
  },
  viewCarousel: {
    marginTop: toDp(20),
    marginBottom: toDp(16),
  },
  backgroundShadow: {
    width,
    height,
    backgroundColor: '#00000066',
    position: 'absolute',
  },

  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewRootModal: {
    width,
    position: 'absolute',
    bottom: 0,
  },
  modalBox: {
    width,
    height: toDp(165),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: toDp(16),
    borderTopRightRadius: toDp(16),
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewModalTitle: {
    marginTop: toDp(24),
    marginHorizontal: toDp(24),
    marginBottom: toDp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitleModal: {
    fontSize: toDp(16),
    color: '#263238',
  },
  touchSilang: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(-8),
  },
  icSilang: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#917438',
  },
  viewFooter: {
    paddingHorizontal: toDp(16),
    marginTop: Platform.OS === 'android' ? toDp(16) : toDp(16),
    marginBottom: Platform.OS === 'android' ? toDp(16) : toDp(24),
  },
  touchTanbah: {
    width: '100%',
    height: toDp(40),
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    // borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(10),
  },
  textTambah: {
    fontSize: toDp(14),
    color: '#5AAA0F',
    letterSpacing: toDp(0.7),
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: toDp(16),
    paddingLeft: toDp(24),
    paddingVertical: toDp(12),
  },
  textNameUnit: {
    fontSize: toDp(14),
    color: '#273238',
    width: width * 0.8,
  },
  icHouseCeklis: {
    width: toDp(24),
    height: toDp(24),
  },
  lineItem: {
    width: '88%',
    height: toDp(1),
    backgroundColor: '#e9ebed',
    marginLeft: toDp(24),
  },
});

export default HomeScreen;
