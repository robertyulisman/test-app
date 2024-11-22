import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
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

import { allLogo } from '../../Assets';
import Header from '../../Components/Header';
import { toDp } from '../../Helper/percentageToDP';

import ImageView from 'react-native-image-viewing';
import Modal from 'react-native-modal';
import CustomImageView from '../../Components/CustomImageView';
import CustomText from '../../Components/CustomText';
import ViewMoreText from '../../Components/ViewMoreText';
import * as NavigatorService from '../../Helper/NavigatorServices';

import moment from 'moment';
import {
  getBank,
  getServicesOrders,
  getServicesOrdersCancel,
  getServicesVirtualAccount,
} from '../../Services/Apis';

const { width, height } = Dimensions.get('window');
const DetailsJasaScreen = (props: any) => {
  const [state, setState] = useState<any>({
    isShowModalConfirm: false,
    loading: true,
    darkMode: false,
    arrLayanan: [],
    connection: true,
    data: {},
    arrayVirtualAccount: [],
    modalVisible: false,
    isHideLayanan: false,
    isHideRiwayat: false,
    isAvailableVA: false,
    virtualAccount: null,
    isModalNotAvailable: false,
  });

  useEffect(() => {
    getDetailsData();
    getBank('?search=service')
      .then((response) => {
        setState((state: any) => ({ ...state, arrayVirtualAccount: response.data }));

        console.log('getBank', response);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const getDetailsData = () => {
    getServicesOrders('' + props.route.params.id)
      .then((response) => {
        console.log('getDetailsData', response);
        setState((state: any) => ({ ...state, data: response.data, loading: false }));
        getServicesVirtualAccount(response.data.service_category.id)
          .then((response) => {
            //setState(state => ({...state, arrayVirtualAccount: response.data}))

            console.log('getServicesVirtualAccount', response);
            setState((state: any) => ({
              ...state,
              isAvailableVA: true,
              virtualAccount: response.data,
            }));
          })
          .catch((err) => {
            console.log('err', err);
            setState((state: any) => ({ ...state, isAvailableVA: false }));
          });
      })
      .catch((error) => {
        console.log(error);
        setState((state: any) => ({ ...state, loading: false }));
      });
  };

  const renderItemSelectBank = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setState((state: any) => ({ ...state, modalVisible: false }));
          NavigatorService.navigate('InfoJasa', {
            nominal: 'Rp ' + convert(parseInt(state.data.total_price)),
            totalPrice: state.data.total_price,
            bank: item,
            id: state.data.id,
            loadDetails: getListAndDetails,
          });
        }}
        style={[
          styles.touchLabelItem,
          { borderBottomColor: state.darkMode ? '#1C1C1E' : '#e9ebed' },
        ]}
      >
        <Image source={{ uri: item.bank.image_url }} style={styles.imgBank} />
        <CustomText
          textType={'regular'}
          allowFontScaling={false}
          style={[
            styles.textLabel,
            {
              color: state.darkMode ? 'white' : '#273238',
            },
          ]}
        >
          {item.bank.name}
        </CustomText>
      </TouchableOpacity>
    );
  };

  const renderModalSelectBank = () => {
    return (
      <Modal
        onBackButtonPress={() => setState((state: any) => ({ ...state, modalVisible: false }))}
        onBackdropPress={() => setState((state: any) => ({ ...state, modalVisible: false }))}
        isVisible={state.modalVisible}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View
            style={[styles.modalBox, { backgroundColor: state.darkMode ? '#121212' : 'white' }]}
          >
            <View style={styles.viewModalTitle}>
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                style={[styles.textTitleModal, { color: state.darkMode ? 'white' : '#263238' }]}
              >
                PILIH BANK TRANSFER
              </CustomText>
              <TouchableOpacity
                style={styles.touchSilang}
                onPress={() => setState((state: any) => ({ ...state, modalVisible: false }))}
              >
                <Image source={allLogo.icSilang} style={styles.icSilangModal} />
              </TouchableOpacity>
            </View>
            <View style={styles.viewArrayStatus}>
              <FlatList
                data={state.arrayVirtualAccount}
                renderItem={renderItemSelectBank}
                numColumns={1}
                ListFooterComponent={() => <View style={{ height: toDp(48) }} />}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const getListAndDetails = () => {
    getDetailsData();
    props.route.params.getAllLoadData();
  };

  const convert = (amount: any) => {
    var reverse = amount.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
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
      return toDp(168);
    } else if (name === 'Verifikasi') {
      return toDp(80);
    } else if (name === 'Perbaikan pembayaran') {
      return toDp(168);
    } else if (name === 'Request') {
      return toDp(70);
    } else if (name === 'Proses') {
      return toDp(70);
    } else if (name === 'Selesai') {
      return toDp(66);
    } else if (name === 'Batal') {
      return toDp(60);
    } else if (name === 'Invalid') {
      return toDp(70);
    }
  };

  const renderModalConfirmation = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={() =>
          setState((prevState: any) => ({ ...prevState, isShowModalConfirm: false }))
        }
        isVisible={state.isShowModalConfirm}
      >
        <View style={styles.viewModalCenter}>
          <View
            style={[
              styles.modalBoxCenter,
              { backgroundColor: state.isDarkMode ? '#121212' : 'white', height: toDp(190) },
            ]}
          >
            <CustomText
              textType="semibold"
              style={[styles.titleConfirm, { color: state.isDarkMode ? 'white' : '#263238' }]}
            >
              BATALKAN PESANAN
            </CustomText>
            <CustomText
              style={[styles.textApakah2, { color: state.isDarkMode ? 'white' : '#263238' }]}
            >
              Apakah Anda yakin ingin membatalkan pesanan jasa ini?{' '}
            </CustomText>

            <View style={styles.viewRow2}>
              <TouchableOpacity
                style={styles.touchTidak}
                onPress={() =>
                  setState((prevState: any) => ({ ...prevState, isShowModalConfirm: false }))
                }
              >
                <CustomText textType="semibold" style={styles.textTidak}>
                  Tidak
                </CustomText>
              </TouchableOpacity>
              <View style={{ width: toDp(10) }}></View>
              <TouchableOpacity
                style={styles.touchYa}
                onPress={() => {
                  getServicesOrdersCancel(props.route.params.id)
                    .then((response) => {
                      console.log(response);
                      props.route.params.servicesOrders();
                      props.route.params.showMessageSuccess();
                      props.navigation.goBack();
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                <CustomText textType="semibold" style={styles.textYa}>
                  Ya, Batalkan
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderKontak = () => {
    return (
      <View
        style={{
          marginTop: toDp(24),
          backgroundColor: 'white',
          paddingTop: toDp(20),
        }}
      >
        <CustomText
          textType={'semibold'}
          style={[
            styles.textPukul,
            { marginLeft: toDp(20), color: state.darkMode ? 'white' : '#9B9F95' },
          ]}
        >
          DETAIL PEMESAN
        </CustomText>
        <View
          style={[
            styles.viewFormLayanan,
            { backgroundColor: state.darkMode ? '#1C1C1E' : 'white', paddingBottom: toDp(16) },
          ]}
        >
          <View style={styles.viewRow}>
            <Image
              source={allLogo.icProfil}
              style={[styles.icCalendar2, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
            />
            <CustomText style={[styles.textName2, { color: state.darkMode ? 'white' : '#5E6157' }]}>
              {state.data.user.name}
            </CustomText>
          </View>
          <View style={styles.viewRow}>
            <Image
              source={allLogo.icMail}
              style={[styles.icCalendar2, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
            />
            <CustomText style={[styles.textName2, { color: state.darkMode ? 'white' : '#5E6157' }]}>
              {state.data.user.email}
            </CustomText>
          </View>
          <View style={styles.viewRow}>
            <Image
              source={allLogo.icPhone}
              style={[styles.icCalendar2, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
            />
            <CustomText style={[styles.textName2, { color: state.darkMode ? 'white' : '#5E6157' }]}>
              {state.data.user.phone}
            </CustomText>
          </View>
          <View style={styles.viewRow}>
            <Image
              source={allLogo.icLocation}
              style={[styles.icCalendar2, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
            />
            <CustomText style={[styles.textName2, { color: state.darkMode ? 'white' : '#5E6157' }]}>
              {state.data.unit.code + '\n' + state.data.unit.unit_name}
            </CustomText>
          </View>
          <View
            style={[styles.line2, { backgroundColor: state.darkMode ? '#121212' : '#EEEEEE' }]}
          />
          <View style={styles.viewRow}>
            <Image
              source={allLogo.icCalendar}
              style={[styles.icCalendar2, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
            />
            <CustomText style={[styles.textDate, { color: state.darkMode ? 'white' : '#5E6157' }]}>
              {moment(state.data.time).format('dddd, DD MMMM YYYY')}
            </CustomText>
          </View>
          <CustomText style={[styles.textTime2, { color: state.darkMode ? 'white' : '#5E6157' }]}>
            {moment(state.data.time).add(-7, 'hours').format('LT')}
          </CustomText>
        </View>
      </View>
    );
  };

  const renderFooterDetail = () => {
    return (
      <View>
        <View style={[styles.detailRow, { paddingBottom: toDp(8) }]}>
          <CustomText
            textType={'semibold'}
            style={[
              // styles.textSubTotal,
              { fontSize: toDp(14), color: state.darkMode ? 'white' : '#1C2028' },
            ]}
          >
            Sub Total
          </CustomText>
          <CustomText
            textType={'semibold'}
            style={[
              styles.textPriceDetail,
              { fontSize: toDp(14), color: state.darkMode ? 'white' : '#1C2028' },
            ]}
          >
            {'Rp ' + convert(state.data.total_price)}
          </CustomText>
        </View>
        {/*<View style={[styles.detailRow, {paddingVertical: toDp(0)}]}>
          <CustomText style={[styles.textNameDetail, {fontSize: toDp(14),color: state.darkMode ? 'white' : '#1C2028'}]}>PPN 11 %</CustomText>
          <CustomText textType={'semibold'} style={[styles.textPriceDetail, {fontSize: toDp(14), color: state.darkMode ? 'white' : '#1C2028'}]}>{'Rp ' + convert(state.data.admin_price)}</CustomText>
        </View>*/}
        <View
          style={[
            styles.lineDetail,
            { marginTop: toDp(16), backgroundColor: state.darkMode ? '#121212' : '#EEEEEE' },
          ]}
        />
        <View style={[styles.detailRow, { paddingVertical: toDp(0), paddingTop: toDp(16) }]}>
          <CustomText
            textType={'semibold'}
            style={[
              // styles.textSubTotal,
              { fontSize: toDp(14), color: state.darkMode ? 'white' : '#1C2028' },
            ]}
          >
            Grand Total
          </CustomText>
          <CustomText
            textType={'semibold'}
            style={[
              styles.textPriceDetail,
              { fontSize: toDp(14), color: state.darkMode ? 'white' : '#1C2028' },
            ]}
          >
            {'Rp ' + convert(state.data.total_price)}
          </CustomText>
        </View>
      </View>
    );
  };

  const renderItemDetail = ({ item, index }: any) => {
    return (
      <View>
        <View style={styles.detailRow}>
          <View>
            <CustomText
              textType={'semibold'}
              style={[
                styles.textNameDetail,
                { width: toDp(200), color: state.darkMode ? 'white' : '#383B34' },
              ]}
            >
              {item.service.name}
            </CustomText>
            <CustomText
              style={[styles.textQtyDetail, { color: state.darkMode ? 'white' : '#9B9F95' }]}
            >
              {item.quantity + 'x'}
            </CustomText>
          </View>
          <CustomText
            style={[styles.textPriceDetail, { color: state.darkMode ? 'white' : '#383B34' }]}
          >
            {'Rp ' + convert(item.price)}
          </CustomText>
        </View>
        <View
          style={[styles.lineDetail, { backgroundColor: state.darkMode ? '#121212' : '#EEEEEE' }]}
        />
      </View>
    );
  };

  const renderDetails = () => {
    return (
      <View
        style={{
          marginTop: toDp(10),
          backgroundColor: 'white',
          paddingTop: toDp(20),
        }}
      >
        <View style={styles.viewSectionRow}>
          <CustomText
            textType={'semibold'}
            style={[
              styles.textPukul,
              { marginLeft: toDp(20), color: state.darkMode ? 'white' : '#9B9F95' },
            ]}
          >
            LAYANAN
          </CustomText>
          <TouchableOpacity
            style={styles.touchHide}
            onPress={() =>
              setState((state: any) => ({ ...state, isHideLayanan: !state.isHideLayanan }))
            }
          >
            <Image
              source={allLogo.icHide}
              style={[
                styles.icHide,
                {
                  transform: [{ rotate: !state.isHideLayanan ? '0deg' : '180deg' }],
                },
              ]}
            />
          </TouchableOpacity>
        </View>
        {!state.isHideLayanan ? (
          <View
            style={[
              styles.viewFormLayanan,
              { backgroundColor: state.darkMode ? '#1C1C1E' : 'white', paddingBottom: toDp(16) },
            ]}
          >
            <FlatList
              data={state.data.service_order_details}
              // renderItem={state.loading ? renderItemShimmer : renderItemDetail}
              renderItem={state.loading && renderItemDetail}
              ListFooterComponent={() => renderFooterDetail()}
            />
          </View>
        ) : (
          <View style={{ height: toDp(16) }} />
        )}
      </View>
    );
  };

  const renderCatatan = () => {
    return (
      <View
        style={{
          marginTop: toDp(10),
          backgroundColor: 'white',
          paddingTop: toDp(20),
        }}
      >
        <CustomText
          textType={'semibold'}
          style={[
            styles.textPukul,
            {
              fontSize: toDp(16),
              marginLeft: toDp(20),
              color: state.darkMode ? 'white' : '#9B9F95',
            },
          ]}
        >
          Catatan
        </CustomText>
        <View
          style={[
            styles.viewFormLayanan,
            {
              backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
              paddingHorizontal: toDp(20),
              paddingBottom: toDp(20),
              paddingTop: toDp(8),
            },
          ]}
        >
          <CustomText
            style={[
              styles.textCatatan,
              { fontSize: toDp(14), color: state.darkMode ? 'white' : '#1C2028' },
            ]}
          >
            {state.data.note === '' ? 'Tidak ada catatan' : state.data.note}
          </CustomText>
        </View>
      </View>
    );
  };

  const renderCatatanPengelola = () => {
    return (
      <View
        style={{
          marginTop: toDp(10),
          backgroundColor: 'white',
          paddingTop: toDp(20),
        }}
      >
        <CustomText
          textType={'semibold'}
          style={[
            styles.textPukul,
            {
              fontSize: toDp(16),
              marginLeft: toDp(20),
              color: state.darkMode ? 'white' : '#9B9F95',
            },
          ]}
        >
          Catatan Pengelola
        </CustomText>
        <View
          style={[
            styles.viewFormLayanan,
            {
              backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
              paddingHorizontal: toDp(20),
              paddingBottom: toDp(20),
              paddingTop: toDp(8),
            },
          ]}
        >
          <CustomText
            style={[
              styles.textCatatan,
              { fontSize: toDp(14), color: state.darkMode ? 'white' : '#1C2028' },
            ]}
          >
            {state.data.invalid_note === '' ? 'Tidak ada catatan' : state.data.invalid_note}
          </CustomText>
        </View>
      </View>
    );
  };

  const renderId = () => {
    return (
      <View
        style={[
          styles.viewFormLayanan,
          {
            backgroundColor: state.darkMode ? '#1C1C1E' : '#F6F7F4',
            paddingHorizontal: toDp(20),
            height: 'auto',
          },
        ]}
      >
        <CustomText
          textType="medium"
          style={[
            styles.textPukul,
            { fontSize: toDp(16), color: state.darkMode ? 'white' : '#273238' },
          ]}
        >
          {state.data.service_category.name}
        </CustomText>
        <CustomText
          style={[
            styles.textCatatan,
            { fontWeight: '400', marginTop: toDp(8), color: state.darkMode ? 'white' : '#273238' },
          ]}
        >
          Order ID : {'\n'}
          {state.data.id}
        </CustomText>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: toDp(8),
          }}
        >
          <CustomText style={[{ color: state.darkMode ? 'white' : '#5E6157' }]}>
            Waktu Request : {'\n'}
            {moment(state.data.created_at).format('LLL')}
          </CustomText>
        </View>
        <View
          style={[
            styles.viewStatus,
            {
              marginTop: toDp(10),
              width: changeWidthStatus(state.data.service_order_status.name),
              backgroundColor: changeColorStatus(state.data.service_order_status.name),
            },
          ]}
        >
          <CustomText style={styles.textStatus}>{state.data.service_order_status.name}</CustomText>
        </View>
      </View>
    );
  };

  const replaceImageStatus = (id: any) => {
    if (id === '514cd86c-68a7-48d8-b152-e87ac12583ba') return allLogo.imgButkbayar01; // Verifikasi
    if (id === '244d1089-2d1b-4d33-be16-7cbf5140aa6b') return allLogo.imgButkbayar02; // Perbaikan pembayaran
    if (id === '974aa0f8-4fcf-4c58-bf00-30fdac05f86a') return allLogo.imgButkbayar03; // Sudah bayar
    if (id === 'e274f0a4-bf1d-4048-bb5f-c6bc14fa3d50') return allLogo.icJasaProcess; // Sudah proses
    if (id === 'a20f79b3-68dc-4735-95f8-121d4ff55be9') return allLogo.icJasaDone; // Sudah selesai
    if (id === 'd36080cc-58f6-449f-b082-c20066401bfb') return allLogo.imgButkbayar01; // Belum bayar
    return allLogo.icJasaInvalid;
  };

  const replaceStringStatus = (id: any) => {
    if (id === '514cd86c-68a7-48d8-b152-e87ac12583ba') return 'Bukti bayar'; // Verifikasi
    if (id === '244d1089-2d1b-4d33-be16-7cbf5140aa6b')
      return 'Bukti bayar diverifikasi dengan catatan oleh pengelola'; // Perbaikan pembayaran
    if (id === '974aa0f8-4fcf-4c58-bf00-30fdac05f86a') return 'Bukti bayar telah diverifikasi'; // Sudah bayar
    if (id === 'e274f0a4-bf1d-4048-bb5f-c6bc14fa3d50') return 'Pesanan diproses'; // Sudah proses
    if (id === 'a20f79b3-68dc-4735-95f8-121d4ff55be9') return 'Pesanan selesai'; // Sudah selesai
    if (id === 'd36080cc-58f6-449f-b082-c20066401bfb') return 'Bukti bayar'; // Belum bayar
    return 'Invalid';
  };

  const renderHistory = () => {
    return (
      <View
        style={[
          styles.viewFormLayanan,
          {
            backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
            paddingBottom: toDp(24),
            paddingLeft: toDp(16),
            paddingTop: toDp(20),
          },
        ]}
      >
        <View style={styles.viewSectionRow}>
          <CustomText
            textType={'semibold'}
            style={[
              styles.textPukul,
              { fontSize: toDp(16), color: state.darkMode ? 'white' : '#9B9F95' },
            ]}
          >
            RIWAYAT
          </CustomText>
          <TouchableOpacity
            style={styles.touchHide}
            onPress={() =>
              setState((state: any) => ({ ...state, isHideRiwayat: !state.isHideRiwayat }))
            }
          >
            <Image
              source={allLogo.icHide}
              style={[
                styles.icHide,
                {
                  transform: [{ rotate: !state.isHideRiwayat ? '0deg' : '180deg' }],
                },
              ]}
            />
          </TouchableOpacity>
        </View>

        {!state.isHideRiwayat ? (
          state.data?.service_payment_histories.map((data: any) => {
            return (
              <View style={{ marginTop: toDp(20), flexDirection: 'row' }}>
                <Image
                  source={replaceImageStatus(data.service_order_status_id)}
                  style={styles.imgButkbayar}
                />

                <View style={{ marginLeft: toDp(10) }}>
                  <CustomText textType="semibold" style={styles.textTitleBukti}>
                    {replaceStringStatus(data.service_order_status_id)}
                  </CustomText>
                  <CustomText style={styles.textDateBukti}>
                    {moment(data.created_at).format('DD/MM/YYYY; HH:mm')}
                  </CustomText>
                  {data.service_order_status_id === '974aa0f8-4fcf-4c58-bf00-30fdac05f86a' ||
                  data.service_order_status_id === 'e274f0a4-bf1d-4048-bb5f-c6bc14fa3d50' ||
                  data.service_order_status_id === '613feb5c-78f3-406a-aa59-eaf5c7692230' ||
                  data.service_order_status_id === 'a20f79b3-68dc-4735-95f8-121d4ff55be9' ? (
                    <View />
                  ) : Platform.OS === 'ios' ? (
                    <TouchableOpacity
                      onPress={() => {
                        setState((state: any) => ({
                          ...state,
                          isImageViewVisible: true,
                          imageUrl: data.image_url,
                        }));
                      }}
                    >
                      <Image source={{ uri: data.image_url }} style={styles.imgBukti} />
                    </TouchableOpacity>
                  ) : (
                    <CustomImageView style={styles.imgBukti} uri={data.image_url} />
                  )}
                  <ViewMoreText
                    textStyle={{
                      marginTop: toDp(6),
                      width: toDp(240),
                    }}
                    numberOfLines={3}
                    renderViewMore={(onPress: any) => (
                      <CustomText textType="semibold" onPress={onPress}>
                        Lihat lebih banyak
                      </CustomText>
                    )}
                    renderViewLess={(onPress: any) => (
                      <CustomText textType="semibold" onPress={onPress}>
                        Lihat lebih sedikit
                      </CustomText>
                    )}
                  >
                    <CustomText style={styles.textNoteBukti}>{data.note}</CustomText>
                  </ViewMoreText>
                </View>
                {Platform.OS === 'ios' && (
                  <ImageView
                    images={[{ uri: state.imageUrl }]}
                    animationType={'fade'}
                    imageIndex={0}
                    visible={state.isImageViewVisible}
                    onRequestClose={() =>
                      setState((state: any) => ({ ...state, isImageViewVisible: false }))
                    }
                  />
                )}
              </View>
            );
          })
        ) : (
          <View style={{ height: toDp(0) }} />
        )}
      </View>
    );
  };

  const renderWa = () => {
    return (
      <View
        style={[
          styles.viewWa,
          {
            marginTop: toDp(10),
          },
        ]}
      >
        <CustomText style={styles.textWa}>
          Apabila Anda memiliki pertanyaan terkait pesanan Anda, silahkan hubungi kami.
        </CustomText>
        <TouchableOpacity
          style={styles.touchWa}
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
          <Image source={allLogo.icNewWa} style={styles.icNewWa} />
          <CustomText textType={'semibold'} style={styles.textHubungi}>
            Hubungi
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  const renderModalNotAvailable = () => {
    return (
      <Modal animationIn={'fadeIn'} animationOut={'fadeOut'} isVisible={state.isModalNotAvailable}>
        <View
          style={{ width: 'auto', height: 'auto', justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={{
              height: 'auto',
              paddingBottom: toDp(30),
              width: toDp(280),
              backgroundColor: '#FFFFFF',
              borderRadius: toDp(4),
              alignItems: 'center',
            }}
          >
            <Image
              source={allLogo.icNewInfo}
              style={{ width: toDp(70), height: toDp(70), marginTop: toDp(32) }}
            />
            <CustomText
              textType="semibold"
              style={{
                textAlign: 'center',
                marginTop: toDp(25),
                fontSize: toDp(16),
                color: '#263238',
              }}
            >
              VIRTUAL ACCOUNT BELUM TERSEDIA
            </CustomText>
            <CustomText
              style={{
                marginTop: toDp(10),
                fontSize: toDp(14),
                color: '#263238',
                textAlign: 'center',
                marginHorizontal: toDp(20),
              }}
            >
              Maaf, Virtual Account belum tersedia pada unit Anda saat ini. Silahkan hubungi Hotline
              Central Connect.
            </CustomText>
            <TouchableOpacity
              onPress={() => {
                setState((prevState: any) => ({ ...prevState, isModalNotAvailable: false }));
              }}
              style={styles.touchKembaliKeLogin}
            >
              <CustomText textType="semibold" style={styles.textKembaliKeLogin}>
                OK
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Detail Pesanan'} onPress={() => props.navigation.goBack()} />
      {renderModalConfirmation()}
      {renderModalSelectBank()}
      {renderModalNotAvailable()}
      {state.loading ? (
        <View style={styles.viewContainerCenter}>
          <ActivityIndicator size="large" color={state.darkMode ? 'white' : '#5AAA0F'} />
        </View>
      ) : (
        <ScrollView
          style={[styles.scrollView, { backgroundColor: state.darkMode ? '#121212' : '#F6F7F4' }]}
        >
          <View
            style={[styles.content, { backgroundColor: state.darkMode ? '#121212' : '#F6F7F4' }]}
          >
            {renderId()}
            {renderKontak()}
            {renderDetails()}
            {renderCatatan()}
            {state.data.service_payment_histories.length !== 0 && renderHistory()}
            {state.data.invalid_note && renderCatatanPengelola()}
            {state.data?.service_order_status?.name !== 'Menunggu pembayaran' && renderWa()}
            {state.data?.service_order_status?.name === 'Menunggu pembayaran' && (
              <View style={styles.centerFooter}>
                <TouchableOpacity
                  onPress={() => {
                    //setState(state => ({...state, modalVisible: true}))

                    if (state.isAvailableVA) {
                      //alert('zaini - '+JSON.stringify(state.virtualAccount))
                      NavigatorService.navigate('InfoJasa', {
                        nominal: 'Rp ' + convert(parseInt(state.data.total_price)),
                        totalPrice: state.data.total_price,
                        //bank: item,
                        bank: state.virtualAccount,
                        id: state.data.id,
                        loadDetails: getListAndDetails,
                      });
                    } else {
                      //Alert.alert('Mohon Maaf','Virtual Account tidak ditemukan.')
                      setState((state: any) => ({ ...state, isModalNotAvailable: true }));
                    }
                  }}
                  style={[styles.touchBatalkan, { backgroundColor: '#5AAA0F' }]}
                >
                  <CustomText style={[styles.textBatal, { color: 'white' }]}>
                    Bayar Sekarang
                  </CustomText>
                </TouchableOpacity>
                <View style={{ height: toDp(16) }} />
                <TouchableOpacity
                  onPress={() => {
                    setState((state: any) => ({ ...state, isShowModalConfirm: true }));
                  }}
                  style={styles.touchBatalkan}
                >
                  <CustomText
                    style={[styles.textBatal, { color: state.darkMode ? 'white' : '#5AAA0F' }]}
                  >
                    Batalkan Pesanan
                  </CustomText>
                </TouchableOpacity>
              </View>
            )}
            {state.data?.service_order_status?.name === 'Perbaikan pembayaran' && (
              <View style={styles.centerFooter}>
                <TouchableOpacity
                  onPress={() => {
                    //setState(state => ({...state, modalVisible: true}))

                    console.log('STATE', state);
                    if (state.isAvailableVA) {
                      NavigatorService.navigate('InfoJasa', {
                        nominal: 'Rp ' + convert(parseInt(state.data.total_price)),
                        totalPrice: state.data.total_price,
                        //bank: item,
                        bank: state.virtualAccount,
                        id: state.data.id,
                        loadDetails: getListAndDetails,
                      });
                    } else {
                      //Alert.alert('Mohon Maaf','Virtual Account tidak ditemukan.')
                      setState((state: any) => ({ ...state, isModalNotAvailable: true }));
                    }
                  }}
                  style={[styles.touchBatalkan, { backgroundColor: '#5AAA0F' }]}
                >
                  <CustomText style={[styles.textBatal, { color: 'white' }]}>
                    Upload Bukti Bayar
                  </CustomText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  touchBatalkan: {
    width: toDp(320),
    height: toDp(40),
    borderRadius: toDp(10),
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {},
  viewContainerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    //paddingHorizontal: toDp(16),
    //paddingBottom: toDp(16)
  },
  textPukul: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    //fontWeight: 'bold',
    letterSpacing: toDp(0.5),
  },
  viewFormLayanan: {
    marginTop: toDp(8),
    width: '100%',
    height: 'auto',
    borderRadius: toDp(4),
  },
  viewRow: {
    marginLeft: toDp(16),
    marginTop: toDp(16),
    marginRight: toDp(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDate: {
    marginLeft: toDp(8),
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    letterSpacing: toDp(0.5),
  },
  textTime2: {
    marginTop: toDp(8),
    marginLeft: toDp(44),
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
  },
  line2: {
    width: '100%',
    height: toDp(1),
    backgroundColor: '#EEEEEE',
    marginTop: toDp(16),
  },
  textName2: {
    marginLeft: toDp(8),
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: toDp(20),
    paddingVertical: toDp(16),
    alignItems: 'center',
  },
  lineDetail: {
    width: '100%',
    height: toDp(1),
    backgroundColor: '#EEEEEE',
  },
  icCalendar2: {
    width: toDp(20),
    height: toDp(20),
  },
  textCatatan: {
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
  },
  viewStatus: {
    width: toDp(56),
    height: toDp(26),
    borderRadius: toDp(13),
    backgroundColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStatus: {
    fontSize: toDp(12),
    color: '#FFFFFF',
    //fontFamily: 'Montserrat-SemiBold',
  },
  textBatal: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    letterSpacing: toDp(0.05),
  },
  centerFooter: {
    paddingBottom: toDp(16),
    paddingTop: toDp(16),
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: toDp(1),
    borderTopColor: '#DDE3E0',
  },
  textPriceDetail: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    //fontWeight: '500',
  },
  textNameDetail: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    //fontWeight: '600',
  },
  textQtyDetail: {
    marginTop: toDp(6),
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    //fontWeight: '600',
    fontStyle: 'italic',
  },

  viewModalCenter: {
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBoxCenter: {
    width: width * 0.8,
    height: toDp(200),
    borderRadius: toDp(8),
    alignItems: 'center',
  },
  titleConfirm: {
    marginTop: toDp(24),
    fontSize: toDp(14),
    color: '#263238',
    letterSpacing: toDp(0.7),
  },
  textApakah2: {
    marginTop: toDp(10),
    marginHorizontal: toDp(30),
    textAlign: 'center',
    fontSize: toDp(14),
    color: '#263238',
    lineHeight: toDp(24),
  },
  viewRow2: {
    marginTop: toDp(20),
    flexDirection: 'row',
  },
  touchTidak: {
    width: toDp(110),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTidak: {
    fontSize: toDp(14),
    color: '#FFFFFF',
    letterSpacing: toDp(0.7),
  },
  touchYa: {
    width: toDp(110),
    height: toDp(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    borderRadius: toDp(10),
  },
  textYa: {
    fontSize: toDp(14),
    color: '#5AAA0F',
    letterSpacing: toDp(0.7),
  },
  icSuccess: {
    width: toDp(70),
    height: toDp(70),
    marginTop: toDp(16),
    tintColor: '#5AAA0F',
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
    //height: toDp(240),
    height: 'auto',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: toDp(16),
    borderTopRightRadius: toDp(16),
    paddingBottom: toDp(16),
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewModalTitle: {
    marginTop: toDp(24),
    marginRight: toDp(16),
    marginLeft: toDp(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTitleModal: {
    //fontFamily: 'Montserrat-Bold',
    fontSize: toDp(14),
    letterSpacing: toDp(1),
    color: '#263238',
    marginLeft: toDp(16),
  },
  touchSilang: {
    padding: toDp(4),
  },
  icSilangModal: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#5E6157',
  },
  viewArrayStatus: {
    marginTop: toDp(24),
    paddingHorizontal: toDp(24),
  },
  touchLabelItem: {
    //margin: toDp(24),
    height: toDp(50),
    borderBottomWidth: toDp(1),
    borderBottomColor: '#e9ebed',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imgBank: {
    width: toDp(40),
    height: toDp(40),
    resizeMode: 'contain',
    marginRight: toDp(16),
  },
  textLabel: {
    color: '#273238',
    fontSize: toDp(14),
  },
  imgButkbayar: {
    width: toDp(40),
    height: toDp(40),
  },
  textTitleBukti: {
    color: '#383B34',
    fontSize: toDp(14),
    width: toDp(270),
  },
  textDateBukti: {
    fontSize: toDp(12),
    color: '#383B34',
  },
  imgBukti: {
    width: toDp(80),
    height: toDp(80),
    marginTop: toDp(10),
    borderRadius: toDp(4),
  },
  textNoteBukti: {
    marginTop: toDp(10),
    fontSize: toDp(12),
    color: '#383B34',
    width: toDp(270),
  },
  viewSectionRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: toDp(16),
  },
  touchHide: {
    padding: toDp(4),
  },
  icHide: {
    width: toDp(24),
    height: toDp(24),
  },
  viewWa: {
    width,
    height: toDp(136),
    backgroundColor: '#F5FFE9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: toDp(20),
  },
  textWa: {
    fontSize: toDp(14),
    color: '#5AAA0F',
    textAlign: 'center',
  },
  touchWa: {
    width: toDp(134),
    height: toDp(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(10),
    marginTop: toDp(8),
  },
  icNewWa: {
    width: toDp(20),
    height: toDp(20),
  },
  textHubungi: {
    fontSize: toDp(14),
    color: '#FFFFFF',
    marginLeft: toDp(8),
  },
  touchKembaliKeLogin: {
    marginTop: toDp(20),
    width: toDp(180),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKembaliKeLogin: {
    fontSize: toDp(14),
    color: '#FFFFFF',
    letterSpacing: toDp(0.2),
  },
});

export default DetailsJasaScreen;
