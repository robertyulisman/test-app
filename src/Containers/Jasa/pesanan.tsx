import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { allLogo } from '../../Assets';
import { toDp } from '../../Helper/percentageToDP';

import moment from 'moment';
import Empty from '../../Components/Empty';

import Toast from '../../Components/Toast';

import CustomText from '../../Components/CustomText';
import * as NavigatorService from '../../Helper/NavigatorServices';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import { getServicesOrders, getServicesOrdersStatuses } from '../../Services/Apis';

let limit = 0;
const { width, height } = Dimensions.get('window');
const Pesanan = (props: any) => {
  const toast = useRef<any>(null);
  const [state, setState] = useState<any>({
    arrayData: [],
    loading: true,
    messages: '',
    filter: 'all',
    modalVisible: false,
    page: 1,
    arrayStatus: ['Semua', 'Invalid', 'Terkirim', 'Dalam Proses', 'Selesai', 'Batal'],
    activeStatus: 'Semua',
    activeIdStatus: '',
    total: 0,
    totalPage: 0,
    limit: 20,
    connection: true, // default nya gak tau,
    darkMode: false,
  });

  useEffect(() => {
    getAllLoadData();
  }, []);

  const getAllLoadData = () => {
    getServicesOrdersStatuses()
      .then((response) => {
        console.log(response);
        setState((state: any) => ({
          ...state,
          arrayStatus: [...[{ id: 'all', name: 'Semua' }], ...response.data.service_order_statuses],
        }));
      })
      .catch((error) => {
        console.log(error);
      });

    servicesOrders();
    limit = state.limit;
  };

  const servicesOrders = () => {
    setState((state: any) => ({ ...state, loading: state.page === 1 ? true : false }));

    let params = '?page=' + state.page;
    let data = {
      filter: {
        service_order_status_id: state.activeIdStatus,
      },
    };

    //postServicesOrders(params, data).then(response => {
    getServicesOrders(params)
      .then((response) => {
        console.log(response);
        if (state.page === 1) {
          setState((state: any) => ({
            ...state,
            loading: false,
            arrayData: response.data.service_orders,
            total: response.data.meta.total,
            totalPage: response.data.meta.total_page,
          }));
        } else {
          setState((state: any) => ({
            ...state,
            loading: false,
            arrayData: [...state.arrayData, ...response.data.service_orders],
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        setState((state: any) => ({
          ...state,
          loading: false,
          arrayData: [],
          messages: error.data.result,
        }));
      });
  };

  const changeIcon = (text: any) => {
    if (text === 'waiting') {
      return allLogo.filterWaiting;
    } else if (text === 'progress') {
      return allLogo.filterProgress;
    } else if (text === 'done') {
      return allLogo.filterDone;
    } else {
      return allLogo.filterInvalid;
    }
  };

  const changeTextStatus = (text: any) => {
    if (text === 'waiting') {
      return 'Terkirim';
    } else if (text === 'progress') {
      return 'Dalam Proses';
    } else if (text === 'done') {
      return 'Selesai';
    } else {
      return 'Invalid';
    }
  };

  const changeColorStatus = (name: any) => {
    if (name === 'Menunggu pembayaran') {
      return '#f53c3c';
    } else if (name === 'Verifikasi') {
      return '#f2c141';
    } else if (name === 'Perbaikan pembayaran') {
      return '#f53c3c';
    } else if (name === 'Request') {
      return '#56a7d4';
    } else if (name === 'Proses') {
      return '#f2c141';
    } else if (name === 'Selesai') {
      return '#28a595';
    } else if (name === 'Batal') {
      return '#6b7b83';
    } else if (name === 'Invalid') {
      return '#6b7b83';
    }
  };

  const changeWidthStatus = (name: any) => {
    if (name === 'Menunggu pembayaran') {
      return toDp(140);
    } else if (name === 'Verifikasi') {
      return toDp(70);
    } else if (name === 'Perbaikan pembayaran') {
      return toDp(140);
    } else if (name === 'Request') {
      return toDp(60);
    } else if (name === 'Proses') {
      return toDp(60);
    } else if (name === 'Selesai') {
      return toDp(56);
    } else if (name === 'Batal') {
      return toDp(50);
    } else if (name === 'Invalid') {
      return toDp(60);
    }
  };

  const changeWidthIcon = (name: any) => {
    if (name === 'Service AC') {
      return toDp(61);
    } else if (name === 'Laundry') {
      return toDp(42);
    } else if (name === 'Bersih-Bersih') {
      return toDp(52);
    } else {
      return toDp(75);
    }
  };

  const changeHeightIcon = (name: any) => {
    if (name === 'd45f7f57-c89c-4793-8a6c-a0b8b2b5de27') {
      return toDp(40);
    } else if (name === 'Laundry') {
      return toDp(52.5);
    } else if (name === 'Bersih-Bersih') {
      return toDp(52);
    } else {
      return toDp(50);
    }
  };

  const showMessageSuccess = () => {
    toast.current.show('Pesanan Anda berhasil dibatalkan.');
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={state.darkMode ? 1 : 0.2}
        style={[
          styles.containerItem,
          {
            backgroundColor: state.darkMode ? '#121212' : 'white',
          },
        ]}
        onPress={() => {
          NavigatorService.navigate('DetailsJasa', {
            id: item.id,
            servicesOrders,
            showMessageSuccess,
            getAllLoadData,
          });
        }}
      >
        <View style={[styles.cards, { backgroundColor: state.darkMode ? '#121212' : 'white' }]}>
          <View style={styles.viewRow}>
            <View style={styles.viewImage}>
              <Image
                style={[
                  styles.imgPicture,
                  {
                    tintColor: state.darkMode ? 'white' : '#9B9F95',
                    width: changeWidthIcon(item.service_category && item.service_category.id),
                    height: changeHeightIcon(item.service_category && item.service_category.id),
                    resizeMode: 'contain',
                  },
                ]}
                source={{ uri: item.service_category && item.service_category.image_url }}
              />
            </View>
            <View>
              <CustomText
                textType="semibold"
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[styles.itemTitle, { color: state.darkMode ? 'white' : '#273238' }]}
              >
                {item.service_category && item.service_category.name}
              </CustomText>
              <View style={styles.viewRowItem}>
                <Image
                  source={allLogo.icCalendar}
                  style={[styles.icCalendar, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
                />
                <CustomText style={[styles.text, { color: state.darkMode ? 'white' : '#5E6157' }]}>
                  {moment(item.time).add(-7, 'hours').format('LLL')}
                </CustomText>
              </View>
              <View
                style={[
                  styles.viewStatus,
                  {
                    width: changeWidthStatus(item.service_order_status.name),
                    backgroundColor: changeColorStatus(item.service_order_status.name),
                  },
                ]}
              >
                <CustomText textType="medium" style={styles.textStatus}>
                  {item.service_order_status.name}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemShimmer = ({ item, index }: any) => {
    return (
      <View
        style={[
          styles.containerItem,
          {
            backgroundColor: state.darkMode ? '#121212' : 'white',
          },
        ]}
      >
        <View style={[styles.cards, { backgroundColor: state.darkMode ? '#121212' : 'white' }]}>
          <View style={styles.viewRow}>
            <ShimmerPlaceHolder style={styles.imgPicture} />
            <View style={{ marginLeft: toDp(16) }}>
              <View style={{ height: toDp(4) }} />
              <ShimmerPlaceHolder style={styles.itemTitle} />
              <View style={styles.viewRowItem}>
                <ShimmerPlaceHolder style={{ width: toDp(120) }} />
              </View>
              <ShimmerPlaceHolder style={[styles.viewStatus, { width: toDp(85) }]} />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <ActivityIndicator size="large" color={'#5AAA0F'} style={{ marginVertical: toDp(24) }} />
    );
  };

  return (
    <View style={styles.container}>
      <Toast ref={toast} />
      <View style={[styles.content, { backgroundColor: state.darkMode ? '#1C1C1E' : '#f5f7f8' }]}>
        {state.arrayData.length === 0 && !state.loading ? (
          <Empty
            images={allLogo.imgEmptyNews}
            title={'Belum ada pesanan'}
            subtitle={'Silakan pesan layanan jasa kami.'}
          />
        ) : (
          <ScrollView
            removeClippedSubviews={true}
            refreshControl={
              <RefreshControl
                refreshing={state.loading}
                onRefresh={() => {
                  (limit = 0),
                    setState((state: any) => ({
                      ...state,
                      total: 0,
                      totalPage: 0,
                      arrayData: [],
                      page: 1,
                    }));
                  servicesOrders();
                }}
              />
            }
            onMomentumScrollEnd={(e: any) => {
              let hasil = limit - e.nativeEvent.contentOffset.y / toDp(102);
              if (hasil <= 5 && state.page < state.totalPage) {
                //if(state.totalPage != state.page) {
                let page = state.page++;
                servicesOrders();
                limit += state.limit;
              }

              console.log('TOTAL PAGE', state.totalPage);

              console.log('HASIL', hasil);

              console.log('LIMIT', limit);

              console.log('arrayData.length', state.arrayData.length);
            }}
          >
            <FlatList
              data={state.loading ? ['', '', '', '', ''] : state.arrayData}
              renderItem={state.loading ? renderItemShimmer : renderItem}
              ListFooterComponent={state.page < state.totalPage ? renderFooter() : <View />}
            />
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    borderBottomColor: '#5AAA0F',
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
    width: toDp(24),
    height: toDp(24),
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
    color: '#5AAA0F',
    fontSize: toDp(18),
    //fontFamily: 'Montserrat-SemiBold',
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: toDp(2),
    paddingBottom: toDp(16),
    //paddingHorizontal: toDp(8)
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
    //fontFamily: 'Montserrat-Bold'
  },
  price: {
    fontSize: toDp(18),
    color: '#333',
    //fontFamily: 'Montserrat-Regular'
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
    //fontFamily: 'Montserrat-Regular'
  },
  invoiceNumber: {
    fontSize: toDp(14),
    color: '#666',
    alignItems: 'flex-start',
    //fontFamily: 'Montserrat-Regular'
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
    //fontFamily: 'Montserrat-Bold',
    fontSize: toDp(16),
  },
  textPosition: {
    //fontFamily: 'Montserrat-Regular',
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
    //fontFamily: 'Montserrat-Bold',
    fontSize: toDp(18),
    marginTop: toDp(6),
    textAlign: 'center',
    color: '#333333',
  },
  textContent: {
    //fontFamily: 'Montserrat-Regular',
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
  viewImage: {
    width: toDp(50),
    height: toDp(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: toDp(16),
  },
  imgPicture: {
    width: toDp(50),
    height: toDp(50),
    //marginRight: toDp(16),
    //resizeMode: 'contain'
  },
  labelpic: {
    width: toDp(24),
    height: toDp(24),
  },
  itemTitle: {
    //fontFamily: 'Montserrat-SemiBold',
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
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(14),
    color: '#333333',
  },
  viewTitleContent: {
    width: '100%',
    paddingLeft: toDp(16),
    paddingBottom: toDp(16),
  },
  itemDate: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(14),
    color: '#4b5a74',
    marginLeft: toDp(4),
  },
  itemLocation: {
    //fontFamily: 'Montserrat-Regular',
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
    fontSize: toDp(12),
    color: '#000000',
    //fontFamily: 'Montserrat-Regular',
    letterSpacing: 0,
  },
  viewStatus: {
    marginTop: toDp(10),
    width: toDp(56),
    height: toDp(20),
    borderRadius: toDp(11),
    backgroundColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStatus: {
    fontSize: toDp(10),
    color: '#FFFFFF',
    //fontFamily: 'Montserrat-SemiBold',
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
    //fontFamily: 'Montserrat-Bold',
    fontSize: toDp(14),
    letterSpacing: toDp(2),
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
    //fontFamily: 'Montserrat-SemiBold',
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
});

export default Pesanan;
