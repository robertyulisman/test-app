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
import Loader from '../../Components/Loader';
import { toDp } from '../../Helper/percentageToDP';

import ImageView from 'react-native-image-viewing';
import Modal from 'react-native-modal';
import CustomImageView from '../../Components/CustomImageView';
import CustomText from '../../Components/CustomText';
import ViewMoreText from '../../Components/ViewMoreText';
import * as NavigatorService from '../../Helper/NavigatorServices';

import moment from 'moment';
import { getBank, getProductOrder, putProductOrdersUpdateStatus } from '../../Services/Apis';

const { width, height } = Dimensions.get('window');
const DetailsPesananMarketScreen = (props: any) => {
  const [state, setState] = useState<any>({
    isShowModalConfirm: false,
    loading: true,
    loadingForm: false,
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
  });

  useEffect(() => {
    getDetailsData();
    getBank('?search=product')
      .then((response) => {
        setState((state: any) => ({ ...state, arrayVirtualAccount: response.data }));

        console.log('getBank', response);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const getDetailsData = () => {
    getProductOrder('' + props.route.params.id)
      .then((response) => {
        console.log(response);
        setState((state: any) => ({ ...state, loading: false, data: response.data }));
        /*getServicesVirtualAccount(response.data.product_category.id).then(response => {
        console.log('getServicesVirtualAccount', response);
        setState(state => ({...state, isAvailableVA: true, virtualAccount: response.data}))
      }).catch(err => {
        console.log('err', err)
        setState(state => ({...state, isAvailableVA: false}))
      })*/
        //belum ada API nya
      })
      .catch((error) => {
        console.log(error);
        setState((state: any) => ({ ...state, loading: false }));
      });
  };

  const getListAndDetails = () => {
    getDetailsData();
    props.route.params.getAllLoadData();
  };

  const renderItemSelectBank = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setState((state: any) => ({ ...state, modalVisible: false }));
          NavigatorService.navigate('InfoMarket', {
            nominal: 'Rp ' + convert(parseInt(state.data?.total_price)),
            totalPrice: state.data?.total_price,
            bank: item,
            id: state.data?.id,
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
              Apakah Anda yakin ingin membatalkan pesanan ini?{' '}
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
                  console.log('props.route.params.id', props.route.params.id);
                  setState((state: any) => ({
                    ...state,
                    isShowModalConfirm: false,
                    loadingForm: true,
                  }));
                  putProductOrdersUpdateStatus(props.route.params.id)
                    .then((response) => {
                      console.log(response);
                      setState((state: any) => ({ ...state, loadingForm: false }));
                      props.route.params.getAllLoadData();
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
          marginTop: toDp(12),
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
          INFO PENGIRIMAN
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
              {state.data?.user?.name}
            </CustomText>
          </View>
          {/*<View style={styles.viewRow}>
            <Image source={allLogo.icMail} style={[styles.icCalendar2, {tintColor: state.darkMode ? 'white' : '#9B9F95'}]} />
            <CustomText style={[styles.textName2, {color: state.darkMode ? 'white' : '#5E6157'}]}>{state.data?.user?.email}</CustomText>
          </View>*/}
          <View style={styles.viewRow}>
            <Image
              source={allLogo.icPhone}
              style={[styles.icCalendar2, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
            />
            <CustomText style={[styles.textName2, { color: state.darkMode ? 'white' : '#5E6157' }]}>
              {state.data?.user?.phone}
            </CustomText>
          </View>
          <View style={[styles.viewRow, { alignItems: 'flex-start' }]}>
            <Image
              source={allLogo.icLocation}
              style={[styles.icCalendar2, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
            />
            <CustomText style={[styles.textName2, { color: state.darkMode ? 'white' : '#5E6157' }]}>
              {state.data?.unit.code + '\n' + state.data?.unit.unit_name}
            </CustomText>
          </View>
          {/*<View style={[styles.line2, {backgroundColor: state.darkMode ? '#121212' : '#EEEEEE'}]} />
          <View style={styles.viewRow}>
            <Image source={allLogo.icCalendar} style={[styles.icCalendar2, {tintColor: state.darkMode ? 'white' : '#9B9F95'}]} />
            <CustomText style={[styles.textDate, {color: state.darkMode ? 'white' : '#5E6157'}]}>{moment(state.data?.time).format('dddd, DD MMMM YYYY')}</CustomText>
          </View>
          <CustomText style={[styles.textTime2, {color: state.darkMode ? 'white' : '#5E6157'}]}>{moment(state.data?.time).add(-7, 'hours').format('LT')}</CustomText>*/}
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
            {'Rp ' + convert(state.data?.total_price)}
          </CustomText>
        </View>
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
            {'Rp ' + convert(state.data?.total_price)}
          </CustomText>
        </View>
      </View>
    );
  };

  const renderItemDetail = ({ item, index }: any) => {
    return (
      <View>
        <View style={styles.viewNewRowNew}>
          <Image
            source={{ uri: item.product.product_images[0].image_url }}
            style={styles.shimmerPhoto}
          />
          <View style={{ marginLeft: toDp(15) }}>
            <CustomText
              textType="semibold"
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.textNameNew}
            >
              {item.product.name}
            </CustomText>
            <View style={styles.rowPrice}>
              <CustomText style={styles.textBarang}>{item.quantity + ' barang'}</CustomText>
              <CustomText textType="medium" style={styles.textPriceNew}>
                {'Rp. ' + convert(item.price)}
              </CustomText>
            </View>
          </View>
        </View>
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
            DETAIL PRODUK
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
              data={state.data?.product_order_details}
              renderItem={!state.loading && (renderItemDetail as any)}
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
            {state.data?.note === '' ? 'Tidak ada catatan' : state.data?.note}
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
            {state.data?.invalid_note === '' ? 'Tidak ada catatan' : state.data?.invalid_note}
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
            marginTop: 0,
            paddingTop: toDp(20),
            backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
            paddingHorizontal: toDp(20),
            paddingBottom: toDp(16),
            height: 'auto',
          },
        ]}
      >
        <View style={styles.viewNewRow}>
          <CustomText style={styles.textField}>Status</CustomText>
          <View
            style={[
              styles.viewStatus,
              {
                width: changeWidthStatus(state.data?.product_order_status?.name),
                backgroundColor: changeColorStatus(state.data?.product_order_status?.name),
              },
            ]}
          >
            <CustomText style={styles.textStatus}>
              {state.data?.product_order_status?.name}
            </CustomText>
          </View>
        </View>
        <View style={styles.viewNewRow}>
          <CustomText style={styles.textField}>Order ID</CustomText>
          <CustomText style={styles.textValue}>{state.data?.id}</CustomText>
        </View>
        <View style={styles.viewNewRow}>
          <CustomText style={styles.textField}>Waktu Pemesanan</CustomText>
          <CustomText style={styles.textValue}>
            {moment(state.data?.created_at).format('DD MMM YYYY, HH:mm') + ' WIB'}
          </CustomText>
        </View>
      </View>
    );
  };

  const replaceImageStatus = (id: any) => {
    if (id === 'd7983aa3-75e9-4e1f-b2d0-e90e86d88559') return allLogo.imgButkbayar01; // Verifikasi
    if (id === '4b3b43f4-f0f9-4ddf-b96f-a298a07ec1c4') return allLogo.imgButkbayar02; // Perbaikan pembayaran
    if (id === '29e9cac0-38c7-4193-95b0-f64ac56f69d4') return allLogo.imgButkbayar03; // Sudah bayar
    if (id === '12cb8ab3-59be-4602-8ae8-cec8f652ad01') return allLogo.icJasaProcess; // Sudah proses
    if (id === 'bdb77c55-4f01-404b-8635-f5b4f67a28ce') return allLogo.icJasaDone; // Sudah selesai
    if (id === 'd36080cc-58f6-449f-b082-c20066401bfb') return allLogo.imgButkbayar01; // Belum bayar
    return allLogo.icJasaInvalid;
  };

  const replaceStringStatus = (id: any) => {
    if (id === 'd7983aa3-75e9-4e1f-b2d0-e90e86d88559') return 'Bukti bayar'; // Verifikasi
    if (id === '4b3b43f4-f0f9-4ddf-b96f-a298a07ec1c4')
      return 'Bukti bayar diverifikasi dengan catatan oleh pengelola'; // Perbaikan pembayaran
    if (id === '29e9cac0-38c7-4193-95b0-f64ac56f69d4') return 'Bukti bayar telah diverifikasi'; // Sudah bayar
    if (id === '12cb8ab3-59be-4602-8ae8-cec8f652ad01') return 'Pesanan diproses'; // Sudah proses
    if (id === 'bdb77c55-4f01-404b-8635-f5b4f67a28ce') return 'Pesanan selesai'; // Sudah selesai
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
          state.data?.product_payment_histories.map((data: any) => {
            return (
              <View style={{ marginTop: toDp(20), flexDirection: 'row' }}>
                <Image
                  source={replaceImageStatus(data.product_order_status_id)}
                  style={styles.imgButkbayar}
                />

                <View style={{ marginLeft: toDp(10) }}>
                  <CustomText textType="semibold" style={styles.textTitleBukti}>
                    {replaceStringStatus(data.product_order_status.id)}
                  </CustomText>
                  <CustomText style={styles.textDateBukti}>
                    {moment(data.created_at).format('DD/MM/YYYY; HH:mm')}
                  </CustomText>
                  {data.product_order_status_id === '29e9cac0-38c7-4193-95b0-f64ac56f69d4' ||
                  data.product_order_status_id === '12cb8ab3-59be-4602-8ae8-cec8f652ad01' ||
                  data.product_order_status_id === '613feb5c-78f3-406a-aa59-eaf5c7692230' ||
                  data.product_order_status_id === 'bdb77c55-4f01-404b-8635-f5b4f67a28ce' ? (
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

  if (state.loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'dark-content'} translucent={false} />
        <Header title={'Detail Pesanan'} onPress={() => props.navigation.goBack()} />
        <View style={styles.viewContainerCenter}>
          <ActivityIndicator size="large" color={state.darkMode ? 'white' : '#5AAA0F'} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Detail Pesanan'} onPress={() => props.navigation.goBack()} />
      <Loader loading={state.loadingForm} />
      {renderModalConfirmation()}
      {renderModalSelectBank()}
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
            {/*renderCatatan()*/}
            {state.data?.product_payment_histories.length !== 0 && renderHistory()}
            {/*state.data?.invalid_note && renderCatatanPengelola()*/}
            {state.data?.product_order_status?.name !== 'Menunggu pembayaran' && renderWa()}
            {state.data?.product_order_status?.name === 'Menunggu pembayaran' && (
              <View style={styles.centerFooter}>
                <TouchableOpacity
                  onPress={() => {
                    //setState(state => ({...state, modalVisible: true}))
                    NavigatorService.navigate('InfoMarket', {
                      nominal: 'Rp ' + convert(parseInt(state.data?.total_price)),
                      totalPrice: state.data?.total_price,
                      //bank: item,
                      bank: state.arrayVirtualAccount[0],
                      id: state.data?.id,
                      loadDetails: getListAndDetails,
                    });

                    console.log('STATE', state);
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
            {state.data?.product_order_status?.name === 'Perbaikan pembayaran' && (
              <View style={styles.centerFooter}>
                <TouchableOpacity
                  onPress={() => {
                    setState((state: any) => ({ ...state, modalVisible: true }));
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
  viewNewRow: {
    width: '100%',
    height: toDp(32),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textField: {
    fontSize: toDp(14),
    color: '#9B9F95',
  },
  textValue: {
    fontSize: toDp(11),
    color: '#383B34',
  },
  viewNewRowNew: {
    width: '100%',
    flexDirection: 'row',
    marginTop: toDp(15),
    paddingLeft: toDp(8),
  },
  shimmerPhoto: {
    width: toDp(70),
    height: toDp(70),
    borderRadius: toDp(4),
    marginLeft: toDp(10),
  },
  textNameNew: {
    width: toDp(206),
    fontSize: toDp(14),
    color: '#383B34',
  },
  textPriceNew: {
    fontSize: toDp(12),
    color: '#383B34',
  },
  textBarang: {
    fontSize: toDp(12),
    color: '#383B34',
  },
  rowPrice: {
    marginTop: toDp(5),
    width: toDp(235),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DetailsPesananMarketScreen;
