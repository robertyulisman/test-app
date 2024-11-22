import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Platform,
  RefreshControl,
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
import Empty from '../../Components/Empty';
import { toDp } from '../../Helper/percentageToDP';

import moment from 'moment';
import Modal from 'react-native-modal';

import Loader from '../../Components/Loader';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import CustomText from '../../Components/CustomText';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import { getEmergency, getEmergencyStatuses } from '../../Services/Apis';

// import firebase from 'react-native-firebase'
import * as NavigatorService from '../../Helper/NavigatorServices';
const { width, height } = Dimensions.get('window');

let limit = 0;

const ListEmergencyScreen = ({ navigation }: any) => {
  const netInfo = useNetInfo();
  const [isDarkMode, setDarkMode] = useState(false);
  const [state, setState] = useState({
    filter: 'all',
    page: 1,
    total: 0,
    totalPage: 0,
    limit: 20,
    activeStatus: 'Semua',
    activeIdStatus: [],
    arrayStatus: ['Semua'],
    arrayData: [],
    item: {},
    isLoading: false,
    loadingType: '',
    messages: '',
    connection: true,
    isModalFilterActive: false,
    isModalFuctionActive: false,
  });

  useEffect(() => {
    getAllLoadData();
  }, []);

  useEffect(() => {
    if (state.isLoading) {
      switch (state.loadingType) {
        case 'listEmergency':
          fetchEmergencies();
        default:
          console.log('nothing to do');
      }
    }
  }, [state.isLoading]);

  const fetchEmergencies = () => {
    let params = '?page=' + state.page;
    let data = {
      filter: {
        emergency_status: state.activeStatus === 'Semua' ? [] : state.activeStatus,
      },
    };
    getEmergency(params, data)
      .then((response) => {
        console.log(response);
        if (state.page === 1) {
          setState((prevState) => ({
            ...prevState,
            isLoading: false,
            arrayData: response.data.emergencies,
            total: response.data.meta.total,
            totalPage: response.data.meta.total_page,
          }));
        } else {
          setState((prevState: any) => ({
            ...prevState,
            arrayData: [...state.arrayData, ...response.data.emergencies],
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        setState((prevState) => ({
          ...prevState,
          arrayData: [],
          isLoading: false,
        }));
      });
  };

  const getAllLoadData = () => {
    getEmergencyStatuses()
      .then((response) => {
        console.log(response);
        setState((prevState) => ({
          ...prevState,
          arrayStatus: [...['Semua'], ...response.data.emergency_statuses],
        }));
      })
      .catch((error) => {
        console.log(error);
      });

    loadEmergency();
  };

  const loadEmergency = () => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      loadingType: 'listEmergency',
    }));
  };

  const refreshList = () => {
    setState((prevState) => ({
      ...prevState,
      total: 0,
      totalPage: 0,
      arrayData: [],
      page: 1,
      loadingType: 'listEmergency',
      isLoading: true,
    }));
  };

  const changeIcon = (text: any) => {
    switch (text) {
      case 'waiting':
        return allLogo.filterWaiting;
      case 'progress':
        return allLogo.filterProgress;
      case 'done':
        return allLogo.filterDone;
      default:
        return allLogo.filterInvalid;
    }
  };

  const changeTextStatus = (text: any) => {
    switch (text) {
      case 'Request':
        return 'Menunggu Respon';
      case 'Proses':
        return 'Proses';
      case 'Selesai':
        return 'Selesai';
      case 'Batal':
        return 'Batal';
      case 'Invalid':
        return 'Invalid';
      default:
        break;
    }
  };

  const changeColorStatus = (name: any) => {
    switch (name) {
      case 'Request':
        return '#EE4040';
      case 'Proses':
        return '#f2c141';
      case 'Selesai':
        return '#8FB339';
      case 'Batal':
        return '#6b7b83';
      case 'Invalid':
        return '#f53c3c';
      default:
        break;
    }
  };

  const changeWidthStatus = (name: any) => {
    switch (name) {
      case 'Request':
        return toDp(135);
      case 'Proses':
        return toDp(60);
      case 'Selesai':
        return toDp(65);
      case 'Batal':
        return toDp(50);
      case 'Invalid':
        return toDp(60);
      default:
        break;
    }
  };

  const ModalFilterView = () => {
    return (
      <Modal
        onSwipeComplete={() =>
          setState((prevState) => ({ ...prevState, isModalFilterActive: false }))
        }
        swipeDirection={['down']}
        onBackdropPress={() =>
          setState((prevState) => ({ ...prevState, isModalFilterActive: false }))
        }
        isVisible={state.isModalFilterActive}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View style={[styles.modalBox, { backgroundColor: isDarkMode ? '#121212' : 'white' }]}>
            <View style={styles.lineCenter}>
              <View style={styles.lineModal} />
            </View>

            <View style={styles.viewModalTitle}>
              <CustomText
                textType="semibold"
                style={[styles.textTitleModal, { color: isDarkMode ? 'white' : '#263238' }]}
              >
                FILTER
              </CustomText>
            </View>

            <View style={styles.viewArrayStatus}>
              <FlatList data={state.arrayStatus} renderItem={StatusView} numColumns={3} />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const ModalFunctionView = () => {
    return <View></View>;
  };

  const handleSelectFilter = (item: any) => {
    setState((prevState: any) => ({
      ...prevState,
      activeIdStatus: [item.id],
      activeStatus: item,
      isModalFilterActive: false,
      page: 1,
      limit: 20,
      arrayData: [],
      isLoading: true,
      loadingType: 'listEmergency',
    }));
  };

  const StatusView = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        onPress={() => handleSelectFilter(item)}
        style={[
          styles.touchStatus,
          {
            backgroundColor:
              item == state.activeStatus ? '#91743819' : isDarkMode ? '#1C1C1E' : '#ffffff',
            borderColor:
              item === state.activeStatus ? '#5AAA0F' : isDarkMode ? '#1C1C1E' : '#d3d6db',
          },
        ]}
      >
        <CustomText
          textType="medium"
          style={[
            styles.textStatusItem,
            { color: item === state.activeStatus ? '#5AAA0F' : isDarkMode ? 'white' : '#788f9c' },
          ]}
        >
          {item}
        </CustomText>
      </TouchableOpacity>
    );
  };

  const ShimmerView = () => {
    return (
      <View
        style={[
          styles.containerItem,
          {
            backgroundColor: isDarkMode ? '#121212' : 'white',
          },
        ]}
      >
        <View style={[styles.cards, { backgroundColor: isDarkMode ? '#121212' : 'white' }]}>
          <View style={styles.viewRow}>
            <View>
              <View style={styles.viewRowItem}>
                <ShimmerPlaceHolder style={{ width: toDp(120) }} />
              </View>
              <View style={styles.viewRowItem}>
                <ShimmerPlaceHolder style={{ width: toDp(100) }} />
              </View>
              <View style={styles.viewRowItem}>
                <ShimmerPlaceHolder style={{ width: toDp(120) }} />
              </View>
              <View style={styles.viewRowItem}>
                <ShimmerPlaceHolder style={{ width: toDp(90) }} />
              </View>
            </View>
          </View>
          <ShimmerPlaceHolder
            style={{ width: toDp(70), position: 'absolute', right: toDp(20), top: toDp(26) }}
          />
          <ShimmerPlaceHolder
            style={{
              width: toDp(100),
              height: toDp(30),
              position: 'absolute',
              right: toDp(20),
              bottom: toDp(0),
            }}
          />
        </View>
      </View>
    );
  };

  const handleSelectItem = (item: any) => {
    if (item.emergency_status == 'Request') {
      NavigatorService.navigate('NotifDarurat', {
        emergencyData: { ...item, refreshData: refreshList },
      });
    } else {
      NavigatorService.navigate('DetailEmergency', {
        emergencyData: { id: item.id, refreshData: refreshList },
      });
    }
  };

  const ItemView = ({ item, index }: any) => {
    const id = item.id;
    return (
      <TouchableOpacity
        onPress={() => handleSelectItem(item)}
        activeOpacity={isDarkMode ? 1 : 0.2}
        style={[
          styles.containerItem,
          {
            backgroundColor: isDarkMode ? '#121212' : 'white',
            // height: toDp(160)
          },
        ]}
      >
        <View style={[styles.cards, { backgroundColor: isDarkMode ? '#121212' : 'white' }]}>
          <View style={styles.viewRow}>
            <View>
              <View style={styles.itemRow}>
                <View style={[styles.viewRowItem, { marginTop: 0 }]}>
                  <Image
                    source={allLogo.icUser}
                    style={[styles.icUser, { tintColor: isDarkMode ? 'white' : '#9B9F95' }]}
                  />
                  <CustomText
                    textType="semibold"
                    style={[styles.text, { color: isDarkMode ? 'white' : '#383B34' }]}
                  >
                    {item.user.name}
                  </CustomText>
                </View>
              </View>

              <View style={styles.viewRowItem}>
                <Image
                  source={allLogo.icPhoneAndroid}
                  style={[styles.icPhoneAndroid, { tintColor: isDarkMode ? 'white' : '#9B9F95' }]}
                />
                <CustomText style={[styles.text, { color: isDarkMode ? 'white' : '#383B34' }]}>
                  {item.user.phone}
                </CustomText>
              </View>
              <View
                style={[
                  styles.viewRowItem,
                  {
                    alignItems: 'flex-start',
                  },
                ]}
              >
                <Image
                  source={allLogo.icHomeCluster}
                  style={[styles.icLp, { tintColor: isDarkMode ? 'white' : '#9B9F95' }]}
                />
                {item.user.unit === null ? (
                  <CustomText style={[styles.text, { color: isDarkMode ? 'white' : '#383B34' }]}>
                    {'-'}
                  </CustomText>
                ) : (
                  <CustomText
                    style={[
                      styles.text,
                      {
                        color: isDarkMode ? 'white' : '#383B34',
                        width: width * 0.8,
                      },
                    ]}
                  >
                    {(item.unit && item.unit.code) + '/' + (item.unit && item.unit.unit_name)}
                  </CustomText>
                )}
              </View>
              <View style={styles.viewRowItem}>
                <Image
                  source={allLogo.icCalendar}
                  style={[styles.icCalendar, { tintColor: isDarkMode ? 'white' : '#9B9F95' }]}
                />
                <CustomText style={[styles.text, { color: isDarkMode ? 'white' : '#383B34' }]}>
                  {moment(item.created_at).format('DD MMMM YYYY')}
                </CustomText>
              </View>
              <View style={styles.viewRowItem}>
                <View
                  style={[
                    styles.viewStatus,
                    {
                      width: changeWidthStatus(item.emergency_status),
                      backgroundColor: changeColorStatus(item.emergency_status),
                    },
                  ]}
                >
                  <CustomText style={styles.textStatus}>
                    {changeTextStatus(item.emergency_status)}
                  </CustomText>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const FooterView = () => {
    return (
      <ActivityIndicator
        size="large"
        color={isDarkMode ? 'white' : '#5AAA0F'}
        style={{ marginVertical: toDp(24) }}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : 'white' }]}>
      {ModalFilterView()}
      {ModalFunctionView()}
      {/* <Toast ref='toast' /> */}
      <Loader loading={state.isLoading} />
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />

      <View
        style={[
          styles.header,
          {
            backgroundColor: isDarkMode ? '#1C1C1E' : 'white',
            borderBottomColor: isDarkMode ? '#1C1C1E' : '#9B9F95',
          },
        ]}
      >
        <TouchableOpacity style={styles.touchHeader} onPress={() => navigation.goBack()}>
          <Image
            source={allLogo.icBack}
            style={[styles.icBack, { tintColor: isDarkMode ? 'white' : '#383B34' }]}
          />
        </TouchableOpacity>

        <View style={styles.linearHeader}>
          <CustomText textType="medium" style={[styles.title]}>
            {'Emergency'}
          </CustomText>
        </View>

        {state.connection && (
          <TouchableOpacity
            style={styles.touchHeaderSearch}
            onPress={() => setState((prevState) => ({ ...prevState, isModalFilterActive: true }))}
          >
            <Image
              source={allLogo.icFilter}
              style={[styles.icFilter, { tintColor: isDarkMode ? 'white' : '#383B34' }]}
            />
          </TouchableOpacity>
        )}
      </View>

      {!netInfo.isConnected ? (
        <NoConnection />
      ) : (
        <View style={[styles.content, { backgroundColor: isDarkMode ? '#121212' : '#f5f7f8' }]}>
          {state.arrayData && state.arrayData.length === 0 && !state.isLoading ? (
            <Empty
              title={'Belum ada panggilan emergency'}
              subtitle={'Selalu siap siaga untuk merespon panggilan emergency dari penghuni'}
            />
          ) : (
            <ScrollView
              removeClippedSubviews={true}
              // ref={(c) => {this.scroll = c}}
              refreshControl={
                <RefreshControl
                  refreshing={state.isLoading}
                  onRefresh={() => {
                    (limit = 0),
                      setState((prevState) => ({
                        ...prevState,
                        total: 0,
                        totalPage: 0,
                        arrayData: [],
                        page: 1,
                        loadingType: 'listEmergency',
                      }));
                    //should fetch emergency list after isLoading re render
                    loadEmergency();
                  }}
                />
              }
              onMomentumScrollEnd={(e: any) => {
                let hasil = limit - e.nativeEvent.contentOffset.y / toDp(127);
                if (hasil <= 5 && state.page < state.totalPage) {
                  //if(state.totalPage != state.page) {
                  let page = state.page++;
                  //should load emergency without loading
                  fetchEmergencies();
                  limit += state.limit;
                } else {
                  console.log('MASUK ELSE');
                }

                console.log('state.page', state.page);

                console.log('TOTAL PAGE', state.totalPage);

                console.log('LIMIT', limit);

                console.log('arrayData.length', state.arrayData.length);
              }}
            >
              <FlatList
                removeClippedSubviews={true}
                data={state.isLoading ? ['', '', '', '', ''] : state.arrayData}
                renderItem={state.isLoading ? ShimmerView : ItemView}
                ListFooterComponent={state.page < state.totalPage ? FooterView() : <View />}
              />
            </ScrollView>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? toDp(28) : 0,
  },
  headeriOS: {
    width,
    height: toDp(20),
    backgroundColor: '#5AAA0F',
  },
  linearFab: {
    padding: toDp(16),
    borderRadius: toDp(28),
    width: toDp(56),
    height: toDp(56),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 4,
    position: 'absolute',
    bottom: toDp(24),
    right: toDp(24),
    zIndex: 1,
  },
  fabAdd: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icAdd: {
    width: toDp(36),
    height: toDp(36),
    tintColor: 'white',
  },
  header: {
    width,
    height: 'auto',
    borderBottomWidth: toDp(1),
    borderBottomColor: '#121212',
    backgroundColor: 'white',
  },
  linearHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: toDp(60),
  },
  touchHeader: {
    padding: toDp(4),
    position: 'absolute',
    left: toDp(12),
    top: toDp(16),
    zIndex: 1,
  },
  icBack: {
    //marginHorizontal: toDp(8),
    width: toDp(16),
    height: toDp(16),
    tintColor: '#5AAA0F',
  },
  touchHeaderSearch: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(12),
    top: toDp(16),
  },
  icFilter: {
    fontSize: toDp(14),
    width: toDp(24),
    height: toDp(24),
    tintColor: '#5AAA0F',
  },
  title: {
    color: '#383B34',
    fontSize: toDp(18),
  },

  content: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },
  containerItem: {
    width,
    height: 'auto',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: toDp(2),
    paddingBottom: toDp(30),
  },
  cards: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: toDp(16),
  },
  months: {
    fontSize: toDp(16),
    color: '#333',
  },
  price: {
    fontSize: toDp(18),
    color: '#333',
  },
  cardDate: {
    marginTop: toDp(16),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: toDp(25),
    height: toDp(25),
    marginRight: toDp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    maxWidth: '100%',
    resizeMode: 'contain',
  },
  cardDetails: {
    marginTop: toDp(10),
    width: '100%',
    flexDirection: 'row',
  },
  date: {
    fontSize: toDp(12),
    color: '#666',
    marginRight: toDp(20),
  },
  invoiceNumber: {
    fontSize: toDp(14),
    color: '#666',
    alignItems: 'flex-start',
  },
  touchFunction: {
    marginTop: toDp(8),
    paddingVertical: toDp(8),
  },
  textTitleFunction: {
    fontSize: toDp(14),
    color: '#5AAA0F',
  },
  logoContainer: {
    width: toDp(16),
    height: toDp(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconNext: {
    maxHeight: '100%',
    resizeMode: 'contain',
    marginLeft: toDp(4),
    marginBottom: toDp(12),
  },
  due: {
    color: 'red',
    fontSize: toDp(12),
  },
  viewCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingShimmer: {
    width: '95%',
    height: toDp(110),
    borderRadius: toDp(5),
    marginTop: toDp(16),
  },
  textName: {
    marginLeft: toDp(8),
    color: '#616161',
    fontSize: toDp(16),
  },
  textPosition: {
    fontSize: toDp(12),
    color: '#BDBDBD',
    marginLeft: toDp(8),
  },
  containerDesc: {
    width: width * 0.906,
    marginLeft: toDp(16),
    paddingHorizontal: toDp(16),
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  titleContent: {
    fontSize: toDp(18),
    marginTop: toDp(6),
    textAlign: 'center',
    color: '#333333',
  },
  textContent: {
    fontSize: toDp(16),
    color: '#333333',
    marginTop: toDp(10),
    textAlign: 'center',
  },
  profile: {
    width: toDp(40),
    height: toDp(40),
    borderRadius: toDp(40),
  },
  imageContent: {
    //height: height / 2,
    height: toDp(328),
    marginTop: toDp(16),
    marginBottom: toDp(8),
    width: width * 0.906,
    resizeMode: 'contain',
  },

  //ZAINI
  viewRow: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: toDp(20),
    paddingTop: toDp(16),
  },
  imgPicture: {
    width: toDp(95),
    height: toDp(95),
    borderRadius: toDp(4),
    marginRight: toDp(12),
  },
  labelpic: {
    width: toDp(24),
    height: toDp(24),
  },
  itemTitle: {
    fontSize: toDp(14),
    color: '#273238',
    marginTop: toDp(-4),
    width: toDp(212),
  },
  viewRowItem: {
    flexDirection: 'row',
    marginTop: toDp(8),
    alignItems: 'center',
  },
  itemContent: {
    fontSize: toDp(14),
    color: '#333333',
  },
  viewTitleContent: {
    width: '100%',
    paddingLeft: toDp(16),
    paddingBottom: toDp(16),
  },
  itemDate: {
    fontSize: toDp(14),
    color: '#4b5a74',
    marginLeft: toDp(4),
  },
  itemLocation: {
    fontSize: toDp(12),
    color: '#4b5a74',
    marginTop: toDp(16),
  },

  icCalendar: {
    width: toDp(16),
    height: toDp(16),
    marginRight: toDp(8),
  },
  icLp: {
    width: toDp(16),
    height: toDp(16),
    marginRight: toDp(8),
  },
  text: {
    fontSize: toDp(14),
    color: '#383B34',
    letterSpacing: 0,
  },
  viewStatus: {
    width: toDp(56),
    height: toDp(20),
    borderRadius: toDp(11),
    backgroundColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'flex-start',
  },
  textStatus: {
    fontSize: toDp(12),
    color: '#FFFFFF',
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
    height: toDp(210),
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitleModal: {
    fontSize: toDp(14),
    letterSpacing: toDp(0.6),
    color: '#263238',
  },
  touchSilang: {
    padding: toDp(4),
  },
  icSilangModal: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#5AAA0F',
  },
  viewArrayStatus: {
    marginTop: toDp(24),
    paddingHorizontal: toDp(24),
  },
  touchStatus: {
    width: 'auto',
    height: toDp(40),
    paddingHorizontal: toDp(14),
    borderRadius: toDp(45),
    marginBottom: toDp(16),
    backgroundColor: '#91743819',
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: toDp(16),
  },
  textStatusItem: {
    fontSize: toDp(12),
    color: '#5AAA0F',
  },
  lineCenter: {
    alignItems: 'center',
    marginTop: toDp(16),
  },
  lineModal: {
    width: toDp(64),
    height: toDp(4),
    backgroundColor: '#d3d6db',
    borderRadius: toDp(7),
  },
  icUser: {
    width: toDp(16),
    height: toDp(16),
    marginRight: toDp(8),
  },
  icPhoneAndroid: {
    width: toDp(10),
    height: toDp(16),
    marginRight: toDp(10),
    marginLeft: toDp(3),
  },
  itemRow: {
    //backgroundColor: 'cyan',
    width: '87%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchTindak: {
    width: toDp(130),
    height: toDp(30),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(4),
    right: toDp(20),
    bottom: toDp(0),
  },
  textTindak: {
    fontSize: toDp(12),
    color: 'white',
    letterSpacing: toDp(0.06),
  },
  touchSelesai: {
    width: toDp(71),
    height: toDp(30),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    borderRadius: toDp(4),
    right: toDp(20),
    bottom: toDp(0),
  },
  textSelesai: {
    fontSize: toDp(12),
    color: '#5AAA0F',
    letterSpacing: toDp(0.06),
  },
  icPhone2: {
    width: toDp(16),
    height: toDp(16),
  },
});

export default ListEmergencyScreen;
