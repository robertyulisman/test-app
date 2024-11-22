import { allLogo } from '@src/Assets';
import CustomImageView from '@src/Components/CustomImageView';
import CustomText from '@src/Components/CustomText';
import Loader from '@src/Components/Loader';
import Toast from '@src/Components/Toast';
import ViewMoreText from '@src/Components/ViewMoreText';
import { toDp } from '@src/Helper/percentageToDP';
import {
  getBillingDetail,
  getUnits,
  postBillingInvoicePDF,
  postBillingReceiptPDF,
} from '@src/Services/Apis';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import ImageView from 'react-native-image-viewing';
import Modal from 'react-native-modal';
import RNShareFile from 'react-native-share-pdf';
import * as NavigatorService from '../../Helper/NavigatorServices';

const { width, height } = Dimensions.get('window');

const DetailsBillingScreen = (props) => {
  console.log('props.params.dataBilling', props.route.params.dataBilling);
  const toast = useRef(null);

  const [state, setState] = useState({
    loading: false,
    modalVisible: false,
    arrayVirtualAccount: [],
    billing: null,
    isImageViewVisible: false,
    imageUrl: '',
  });

  console.log('props.route.params?.dataBilling', props.route.params.item.bill);

  const totalTagihan =
    props.route.params?.dataBilling !== undefined &&
    props.route.params?.dataBilling.reduce((acc, curr) => acc + parseInt(curr.total_remaining), 0);

  useEffect(() => {
    // getListBilling();
    loadDetails(props.route.params.item.id);
    /*getBank(props.route.params.unit.id)
      .then(response => {
        console.log('getBank', response);
        setState(state => ({
          ...state,
          arrayVirtualAccount: response.data.virtual_account,
        }));
      })
      .catch(err => {
        console.log('err', err);
      });*/
    getUnits(props.route.params.unit.id)
      .then((response) => {
        setState((state) => ({
          ...state,
          arrayVirtualAccount: response.data.virtual_account,
        }));
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  // const getListBilling = async () => {
  //   const unitId = props.route.params.unit.id;
  //   const period = props.route.params.item.period;
  //   getBillingDetail(`?unit_id=${unitId}&period=${period}`)
  //     .then((response) => {
  //       console.log('response list billing xxxxxx', response.data);
  //       // setState((state) => ({ ...state, billing: response.data.data }));
  //     })
  //     .catch((err) => {
  //       console.log('err', err);
  //     });
  // };

  const loadDetails = (id) => {
    getBillingDetail('/' + id)
      .then((response) => {
        console.log('response billing detail', response.data);
        setState((state) => ({ ...state, billing: response.data.data }));
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const renderStatusColor = (id) => {
    if (id === 'b31b097a-8516-452c-a723-690388791735') return '#F2C141'; // Verifikasi
    if (id === '79c07edd-094e-4df5-bee2-12a430c4e1f1') return '#EE4040'; // Perbaikan pembayaran
    if (id === '6613a96f-0a4a-4091-9ba8-a0b30d9bf76c') return '#28A595'; // Sudah bayar
    if (id === 'd36080cc-58f6-449f-b082-c20066401bfb') return '#EE4040'; // Belum bayar
    if (id === 'da3393ce-4ca8-42bb-8632-533de7d31685') return '#EE4040'; // Belum lunas
  };

  const showMessage = () => {
    toast.current.show('Unduh Tagihan berhasil');
  };

  const downloadPDF = (linkPDF) => {
    const { config, fs } = RNFetchBlob;
    const date = new Date();
    const { DownloadDir, DocumentDir } = fs.dirs;
    const dirToSave = Platform.select({
      ios: fs.dirs.DocumentDir,
      android: fs.dirs.DownloadDir,
    });

    let fileName = `${state.billing.id}.pdf`;
    let path = `${dirToSave}/${fileName}`;
    console.log('path', path);
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path,
        description: 'Downloading.',
      },
    };
    const configOptions = Platform.select({
      ios: {
        fileCache: options.fileCache,
        title: 'BEBAS IOS',
        path,
        appendExt: 'pdf',
      },
      android: options,
    });

    try {
      if (Platform.OS === 'ios') {
        config(configOptions)
          .fetch('GET', linkPDF)
          .then((res) => {
            return res.readFile('base64');
          })
          .then((base64Data) => {
            console.log('RESULT - 02', base64Data);
            showMessage();
            setState((state) => ({ ...state, loading: false }));
            setTimeout(function () {
              console.log('fileName', fileName);
              RNShareFile.sharePDF(base64Data, fileName)
                .then((res1) => {
                  console.log('res1', res1);
                })
                .catch((err1) => {
                  console.log('err1', err1);
                });
            }, 500);
          })
          .catch((error) => {
            setState((state) => ({ ...state, loading: false }));
          });
      } else {
        // ANDROID
        config(options)
          .fetch('GET', linkPDF)
          .then((res) => {
            showMessage();
            setState((state) => ({ ...state, loading: false }));
          })
          .catch((error) => {
            setState((state) => ({ ...state, loading: false }));
          });
      }
    } catch (e) {
      setState((state) => ({ ...state, loading: false }));
    }
  };

  const headerDownload = () => {
    console.log('state cccc', state.billing?.unit?.id);
    setState((state) => ({ ...state, loading: true }));
    let data = {
      unit_id: state.billing?.unit?.id,
    };
    postBillingInvoicePDF(data)
      .then((response) => {
        console.log('response', response);
        downloadPDF(response.data.data.image_url);
        setState((state) => ({ ...state, loading: false }));
      })
      .catch((error) => {
        console.log('error', error);
        Alert.alert('Mohon Maaf', error.data.message, [
          {
            text: 'OK',
            onPress: () => setState((state) => ({ ...state, loading: false })),
          },
        ]);
      });
  };

  const renderHeader = () => {
    console.log('state', state);
    return (
      <View
        style={[
          styles.header,
          {
            backgroundColor: 'white',
            borderBottomColor: '#CCCFC9',
          },
        ]}
      >
        <View style={{ width: toDp(90) }}>
          <TouchableOpacity style={styles.touchHeader} onPress={() => props.navigation.goBack()}>
            <Image source={allLogo.icBack} style={styles.icBack} />
          </TouchableOpacity>
        </View>

        <CustomText textType="medium" style={styles.title}>
          {'Detail Tagihan'}
        </CustomText>

        {state.billing?.billing_status?.name === 'Belum Lunas' ||
        state.billing?.billing_status?.name === 'Belum bayar' ? (
          <View style={{ width: toDp(90), alignItems: 'flex-end' }}>
            <View style={styles.headerRow}>
              <TouchableOpacity style={styles.touchHeaderSearch} onPress={() => headerDownload()}>
                <Image source={allLogo.icExportTagihan} style={styles.icExportTagihan} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ width: toDp(90), alignItems: 'flex-end' }} />
        )}
      </View>
    );
  };

  const renderItemSelectBank = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setState((state) => ({ ...state, modalVisible: false }));
          NavigatorService.navigate('InfoBilling', {
            nominal: 'Rp ' + convert(parseInt(totalTagihan)),
            totalPrice: state.billing.total_remaining,
            bank: item,
            id: state.billing.id,
            loadDetails,
            loadPaidUnpaid: props.route.params.loadPaidUnpaid,
            dataBilling: props.route.params.dataBilling,
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
        onBackButtonPress={() => setState((state) => ({ ...state, modalVisible: false }))}
        onBackdropPress={() => setState((state) => ({ ...state, modalVisible: false }))}
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
                onPress={() => setState((state) => ({ ...state, modalVisible: false }))}
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

  const convert = (angka) => {
    var rupiah = '';
    var angkarev = angka.toString().split('').reverse().join('');
    for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
    return rupiah
      .split('', rupiah.length - 1)
      .reverse()
      .join('');
  };

  const replaceImageStatus = (id) => {
    console.log('id image histori status', id);
    if (id === 'b31b097a-8516-452c-a723-690388791735') return allLogo.imgButkbayar01; // Verifikasi
    if (id === '79c07edd-094e-4df5-bee2-12a430c4e1f1') return allLogo.imgButkbayar02; // Perbaikan pembayaran
    if (id === '6613a96f-0a4a-4091-9ba8-a0b30d9bf76c') return allLogo.imgButkbayar03; // Sudah bayar
    if (id === 'd36080cc-58f6-449f-b082-c20066401bfb') return allLogo.imgButkbayar01; // Belum bayar
    if (id === 'da3393ce-4ca8-42bb-8632-533de7d31685') return allLogo.imgButkbayar01; // Belum Lunas
  };

  const replaceStringStatus = (id) => {
    if (id === 'b31b097a-8516-452c-a723-690388791735') return 'Bukti bayar'; // Verifikasi
    if (id === '79c07edd-094e-4df5-bee2-12a430c4e1f1')
      return 'Bukti bayar diverifikasi dengan catatan oleh pengelola'; // Perbaikan pembayaran
    if (id === '6613a96f-0a4a-4091-9ba8-a0b30d9bf76c') return 'Bukti bayar telah diverifikasi'; // Sudah bayar
    if (id === 'd36080cc-58f6-449f-b082-c20066401bfb') return 'Bukti bayar'; // Belum bayar
  };

  // console.log('state.billing xxxxx', state.billing.billing_histories)
  const result = () => {
    const finalResult =
      parseInt(state.billing.total_remaining) - parseInt(state.billing.total_payment);

    if (finalResult < 0) {
      return 0;
    }
    return finalResult;
  };

  const renderCicilan = () => {
    return (
      <View>
        <View style={styles.viewBatas} />
        <View style={styles.viewDetailsTagihan}>
          <View style={styles.viewRowDetails}>
            <CustomText
              allowFontScaling={false}
              style={[styles.textValueDetails, { color: '#383B34' }]}
            >
              {'Pembayaran\n' +
                moment(state.billing.payment_timestamp).format('DD MMMM YYYY, HH:mm:ss')}
            </CustomText>
            <CustomText
              allowFontScaling={false}
              style={[styles.textValueDetails, { color: '#383B34' }]}
            >
              Rp {convert(state.billing.total_payment)}
            </CustomText>
          </View>
          <View style={styles.lineDetails} />
          <View style={styles.viewRowDetails}>
            <CustomText
              textType="semibold"
              allowFontScaling={false}
              style={[styles.textValueDetails, { color: '#383B34' }]}
            >
              {'Sisa Tagihan'}
            </CustomText>
            <CustomText
              textType="semibold"
              allowFontScaling={false}
              style={[styles.textValueDetails, { color: '#383B34' }]}
            >
              Rp {convert(result())}
            </CustomText>
          </View>
        </View>
      </View>
    );
  };

  const renderDetailsTagihan = () => {
    return (
      <View>
        <View style={styles.viewDetailsTagihan}>
          {/* <CustomText
            textType="semibold"
            allowFontScaling={false}
            style={[styles.textDetailTagihan, { color: '#9B9F95' }]}
          >
            {'DETAIL TAGIHAN'}
          </CustomText>
          {state.billing.pending_billings.length !== 0 && (
            <View>
              <CustomText
                textType="medium"
                allowFontScaling={false}
                style={[styles.textLabelDetails, { color: '#9B9F95', marginTop: toDp(20) }]}
              >
                {'Tunggakan'}
              </CustomText>
              {state.billing.pending_billings.map((item) => {
                return (
                  <View style={styles.viewRowDetails}>
                    <CustomText
                      allowFontScaling={false}
                      style={[styles.textValueDetails, { color: '#383B34' }]}
                    >
                      {'Maintenance Service\n' + changeMonth(item.period)}
                    </CustomText>
                    <CustomText
                      allowFontScaling={false}
                      style={[styles.textValueDetails, { color: '#383B34' }]}
                    >
                      Rp {convert(item.remaining)}
                    </CustomText>
                  </View>
                );
              })}
            </View>
          )}
          <View>
            <CustomText
              textType="medium"
              allowFontScaling={false}
              style={[styles.textLabelDetails, { color: '#9B9F95', marginTop: toDp(15) }]}
            >
              {'Tagihan Berjalan'}
            </CustomText>
            <View style={styles.viewRowDetails}>
              <CustomText
                allowFontScaling={false}
                style={[styles.textValueDetails, { color: '#383B34' }]}
              >
                {'Maintenance Service\n' + changeMonth(state.billing.period)}
              </CustomText>
              <CustomText
                allowFontScaling={false}
                style={[styles.textValueDetails, { color: '#383B34' }]}
              >
                Rp {convert(state.billing.remaining)}
              </CustomText>
            </View>
          </View> */}

          {props.route.params.dataBilling !== undefined &&
            props.route.params.dataBilling.map((i) => {
              return (
                <View key={i.unit_id} style={styles.viewRowDetails}>
                  <CustomText
                    textType="semibold"
                    allowFontScaling={false}
                    style={[styles.textValueDetails, { color: '#383B34' }]}
                  >
                    {i.type === 'AGING_INSTALLMENT'
                      ? 'Cicilan Aging'
                      : i.type === 'MONTHLY_BILL'
                      ? 'Tagihan Berjalan'
                      : i.type === 'ARREAR_INSTALLMENT'
                      ? 'Cicilan Tagihan'
                      : null}
                  </CustomText>
                  <CustomText
                    textType="semibold"
                    allowFontScaling={false}
                    style={[styles.textValueDetails, { color: '#383B34' }]}
                  >
                    Rp {convert(parseInt(i.total_remaining))}
                  </CustomText>
                </View>
              );
            })}
          <View style={styles.viewRowDetails}>
            <CustomText
              textType="semibold"
              allowFontScaling={false}
              style={[styles.textValueDetails, { color: '#383B34' }]}
            >
              {'TOTAL TAGIHAN'}
            </CustomText>
            <CustomText
              textType="semibold"
              allowFontScaling={false}
              style={[styles.textValueDetails, { color: '#383B34' }]}
            >
              Rp {convert(parseInt(totalTagihan) || parseInt(props.route.params.item.bill))}
            </CustomText>
          </View>
        </View>

        {/* {state.billing.total_payment > 0 && renderCicilan()} */}

        {state.billing?.billing_status?.name === 'Belum bayar' ||
          (state.billing?.billing_status?.name === 'Belum Lunas' && (
            <>
              <View style={styles.lineDetails} />
              <View style={{ alignItems: 'center', marginTop: 8, marginBottom: 16 }}>
                <View style={styles.viewInfo}>
                  <Image source={allLogo.icInfo} style={styles.icInfo} />
                  <CustomText
                    allowFontScaling={false}
                    style={[styles.textInfo, { color: '#383B34' }]}
                  >
                    {
                      'Untuk Melihat Detail Tagihan, Silahkan Unduh Invoice PDF melalui Tombol Unduh diatas.'
                    }
                  </CustomText>
                </View>
              </View>
            </>
          ))}
        {state.billing?.billing_status?.name === 'Belum bayar' && (
          <>
            <View style={styles.lineDetails} />
            <View style={{ alignItems: 'center', marginTop: 8, marginBottom: 16 }}>
              <View style={styles.viewInfo}>
                <Image source={allLogo.icInfo} style={styles.icInfo} />
                <CustomText
                  allowFontScaling={false}
                  style={[styles.textInfo, { color: '#383B34' }]}
                >
                  {
                    'Untuk Melihat Detail Tagihan, Silahkan Unduh Invoice PDF melalui Tombol Unduh diatas.'
                  }
                </CustomText>
              </View>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.viewInfo}>
                <Image source={allLogo.icInfo} style={styles.icInfo} />
                <CustomText
                  allowFontScaling={false}
                  style={[styles.textInfo, { color: '#383B34' }]}
                >
                  {'Pembayaran untuk saat ini dapat dilakukan secara langsung dengan Transfer.'}
                </CustomText>
              </View>
            </View>
          </>
        )}

        {state.billing?.billing_status?.id === '6613a96f-0a4a-4091-9ba8-a0b30d9bf76c' && (
          <View>
            <View style={{ width, height: toDp(16), backgroundColor: '#F6F7F4' }} />
            <View style={{ padding: toDp(20) }}>
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                style={[styles.textDetailTagihan, { color: '#9B9F95' }]}
              >
                {'INFO PEMBAYARAN'}
              </CustomText>
              <View style={[styles.viewRowDetails, { marginTop: toDp(18) }]}>
                <CustomText
                  allowFontScaling={false}
                  style={[styles.textValueDetails, { color: '#383B34' }]}
                >
                  {'Bank Transfer'}
                </CustomText>
                <CustomText
                  allowFontScaling={false}
                  style={[styles.textValueDetails, { color: '#383B34' }]}
                >
                  {state.billing.origin_bank?.name}
                </CustomText>
              </View>
              <View style={[styles.viewRowDetails, { marginTop: toDp(8) }]}>
                <CustomText
                  allowFontScaling={false}
                  style={[styles.textValueDetails, { color: '#383B34' }]}
                >
                  {'Waktu bayar'}
                </CustomText>
                <CustomText
                  allowFontScaling={false}
                  style={[styles.textValueDetails, { color: '#383B34' }]}
                >
                  {moment(state.billing.payment_timestamp).format('LLL').replace('pukul', '')}
                </CustomText>
              </View>
            </View>
          </View>
        )}

        {state.billing?.billing_status?.name !== 'Belum bayar' ? (
          <View>
            <View style={{ width, height: toDp(16), backgroundColor: '#F6F7F4' }} />
            <View style={{ padding: toDp(20) }}>
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                style={[styles.textDetailTagihan, { color: '#9B9F95' }]}
              >
                {'RIWAYAT'}
              </CustomText>
              {state.billing?.billing_histories.map((data) => {
                console.log('data xxxxxxxxx', data);
                return (
                  <View style={{ marginTop: toDp(20), flexDirection: 'row' }}>
                    <Image
                      source={replaceImageStatus(data.billing_status.id)}
                      style={styles.imgButkbayar}
                    />

                    <View style={{ marginLeft: toDp(10) }}>
                      <View>
                        <CustomText textType="semibold" style={styles.textTitleBukti}>
                          {/* {replaceStringStatus(data.billing_status.id)} */}
                          {data.messages || '-'}
                        </CustomText>
                        <CustomText style={styles.textDateBukti}>
                          {moment(data.created_at).format('DD/MM/YYYY; HH:mm')}
                        </CustomText>
                        {data.image_url === null ? null : data.billing_status.id !==
                          '6613a96f-0a4a-4091-9ba8-a0b30d9bf76c' ? (
                          Platform.OS === 'ios' ? (
                            <TouchableOpacity
                              onPress={() => {
                                setState((state) => ({
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
                          )
                        ) : (
                          <View />
                        )}
                        <ViewMoreText
                          textStyle={{
                            marginTop: toDp(6),
                            width: toDp(240),
                          }}
                          numberOfLines={3}
                          renderViewMore={(onPress) => (
                            <CustomText
                              textType="semibold"
                              style={styles.textMore}
                              onPress={onPress}
                            >
                              Lihat lebih banyak
                            </CustomText>
                          )}
                          renderViewLess={(onPress) => (
                            <CustomText
                              textType="semibold"
                              style={styles.textMore}
                              onPress={onPress}
                            >
                              Lihat lebih sedikit
                            </CustomText>
                          )}
                        >
                          <CustomText style={styles.textNoteBukti}>{data.note}</CustomText>
                        </ViewMoreText>
                        {data.billing_payment !== null &&
                          data.billing_payment.status === 'verified' &&
                          renderFooterViewReceipt(data)}
                      </View>
                    </View>
                    {Platform.OS === 'ios' && (
                      <ImageView
                        images={[{ uri: state.imageUrl }]}
                        animationType={'fade'}
                        imageIndex={0}
                        visible={state.isImageViewVisible}
                        onRequestClose={() =>
                          setState((state) => ({
                            ...state,
                            isImageViewVisible: false,
                          }))
                        }
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        ) : (
          <View style={{ height: toDp(48) }} />
        )}
      </View>
    );
  };

  const renderContent = () => {
    return (
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.headerContent}>
            <View style={styles.rowContent}>
              <Image
                source={allLogo.icHomeCluster}
                style={[styles.icHomeCluster, { tintColor: '#9B9F95' }]}
              />
              <View style={{ marginLeft: toDp(10) }}>
                <CustomText
                  textType="semibold"
                  allowFontScaling={false}
                  style={[styles.textTitleConten, { color: '#383B34', width: toDp(288) }]}
                >
                  {state.billing?.unit?.owner_name}
                </CustomText>
                <CustomText
                  allowFontScaling={false}
                  style={[styles.textTitleConten, { color: '#383B34', marginTop: toDp(4) }]}
                >
                  {state.billing?.unit?.unit_name}
                </CustomText>
              </View>
            </View>
            <View style={{ height: toDp(8) }} />
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.touchRow, { backgroundColor: state.darkMode ? '#1C1C1E' : '#F6F7F4' }]}
          >
            <View style={styles.viewRootRow}>
              <View style={styles.viewRow}>
                <CustomText
                  textType="semibold"
                  allowFontScaling={false}
                  style={[styles.textTitle, { color: state.darkMode ? 'white' : '#383B34' }]}
                >
                  {changeMonth(props.route.params.item.period)}
                </CustomText>
                <View
                  style={[
                    styles.viewStatus1,
                    {
                      backgroundColor: renderStatusColor(state.billing?.billing_status?.id),
                    },
                  ]}
                >
                  <CustomText
                    textType="medium"
                    allowFontScaling={false}
                    style={[styles.textStatus, { color: state.darkMode ? '#121212' : '#ffffff' }]}
                  >
                    {state.billing?.billing_status?.name}
                  </CustomText>
                </View>
              </View>

              {/* {props.route.params.item.billing_status.name === 'Belum bayar' ||
              props.route.params.item.billing_status.name === 'Verifikasi' ||
              props.route.params.item.billing_status.name === 'Perbaikan pembayaran' ? (
                <CustomText
                  textType="semibold"
                  allowFontScaling={false}
                  style={[styles.textPrice, { color: state.darkMode ? 'white' : '#383B34' }]}
                >
                 
                  Rp {convert(result())}
                </CustomText>
              ) : (
                <CustomText
                  textType="semibold"
                  allowFontScaling={false}
                  style={[styles.textPrice, { color: state.darkMode ? 'white' : '#383B34' }]}
                >
                  Rp {props.route.params.item.total_remaining}
                </CustomText>
              )} */}

              <CustomText
                textType="regular"
                allowFontScaling={false}
                style={[styles.textId, { color: state.darkMode ? 'white' : '#383B34' }]}
              >
                {props.route.params.item.invoice_id}
              </CustomText>
              <View style={styles.viewRow}>
                {props.route.params.item.billing_status.name === 'Belum bayar' ||
                props.route.params.item.billing_status.name === 'Verifikasi' ||
                props.route.params.item.billing_status.name === 'Perbaikan pembayaran' ||
                props.route.params.item.billing_status.name === 'Belum Lunas' ? (
                  <>
                    {/* <CustomText
                      allowFontScaling={false}
                      style={[styles.textDate, { color: state.darkMode ? 'white' : '#383B34' }]}
                    >
                      {'Batas bayar ' +
                        ': ' +
                        (state.billing?.due_date === null
                          ? '-'
                          : moment(state.billing?.due_date).format('DD MMMM YYYY'))}
                    </CustomText> */}
                    <CustomText
                      allowFontScaling={false}
                      style={[styles.textDate, { color: state.darkMode ? 'white' : '#383B34' }]}
                    >
                      {`Pembayaran Maintenance Service Paling lambat tanggal ${
                        state.billing?.due_date === null
                          ? '-'
                          : moment(state.billing?.due_date).format('DD MMMM YYYY')
                      }. Keterlambatan Pembayaran Maintenance dikenakan denda 5%.`}
                    </CustomText>
                  </>
                ) : (
                  <CustomText
                    allowFontScaling={false}
                    style={[styles.textDate, { color: state.darkMode ? 'white' : '#383B34' }]}
                  >
                    {'Waktu bayar ' +
                      ': ' +
                      (state.billing?.payment_timestamp === null
                        ? '-'
                        : moment(state.billing?.payment_timestamp).format('DD MMMM YYYY'))}
                  </CustomText>
                )}
              </View>
            </View>
          </TouchableOpacity>

          {renderDetailsTagihan()}
        </View>
      </ScrollView>
    );
  };

  const convetBulan = (month) => {
    if (month === '01') return 'Januari';
    if (month === '02') return 'Februari';
    if (month === '03') return 'Maret';
    if (month === '04') return 'April';
    if (month === '05') return 'Mei';
    if (month === '06') return 'Juni';
    if (month === '07') return 'Juli';
    if (month === '08') return 'Agustus';
    if (month === '09') return 'September';
    if (month === '10') return 'Oktober';
    if (month === '11') return 'November';
    if (month === '12') return 'Desember';
  };

  const changeMonth = (period) => {
    let tahun = period.substr(0, 4);
    let bulan = period.substr(4);
    return convetBulan(bulan) + ' ' + tahun;
  };

  const generateMonthTunggakan = (period) => {
    let tahun = period.substr(0, 4);
    let bulan = period.substr(4) - 1;
    let temp = bulan;
    if (bulan <= 10) {
      temp = '0' + bulan;
    }
    return tahun + temp;
  };

  const handleDownloadReceipt = (billing) => {
    // console.log('download Receipt', data);
    // console.log('state cccc', state.billing?.unit?.id);
    setState((state) => ({ ...state, loading: true }));
    let data = {
      payment_id: billing.billing_payment.id,
    };
    postBillingReceiptPDF(data)
      .then((response) => {
        console.log('response', response);
        downloadPDF(response.data.data.image_url);
        setState((state) => ({ ...state, loading: false }));
      })
      .catch((error) => {
        console.log('error', error);
        Alert.alert('Mohon Maaf', error.data.message, [
          {
            text: 'OK',
            onPress: () => setState((state) => ({ ...state, loading: false })),
          },
        ]);
      });
  };

  const renderFooter = () => {
    return (
      <View style={styles.viewFooter}>
        <TouchableOpacity
          style={styles.touchFooterPayNow}
          onPress={() => {
            if (state.arrayVirtualAccount.length === 0) {
              Alert.alert('Mohon Maaf', 'Virtual Account tidak tersedia', [
                { text: 'OK', onPress: () => console.log('OK') },
              ]);
            } else {
              setState((state) => ({ ...state, modalVisible: true }));
            }
          }}
        >
          <CustomText textType="semibold" style={styles.textFooter}>
            {'Bayar Sekarang'}
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFooterViewReceipt = (data) => {
    return (
      <View style={styles.viewFooter}>
        <TouchableOpacity
          style={[
            styles.touchFooter,
            {
              backgroundColor: 'white',
              borderWidth: toDp(1),
              borderColor: '#5AAA0F',
            },
          ]}
          onPress={() => handleDownloadReceipt(data)}
        >
          <CustomText textType="semibold" style={[styles.textFooter, { color: '#5AAA0F' }]}>
            {'Unduh Receipt'}
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFooterPerbaikan = () => {
    return (
      <View style={styles.viewFooter}>
        <TouchableOpacity
          style={styles.touchFooterPayNow}
          onPress={() => setState((state) => ({ ...state, modalVisible: true }))}
        >
          <CustomText textType="semibold" style={styles.textFooter}>
            {'Upload Bukti Bayar'}
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  if (state.billing === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.viewLoading}>
          <ActivityIndicator size="large" color="#5AAA0F" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Loader loading={state.loading} />
      <Toast ref={toast} />
      {renderHeader()}
      {renderModalSelectBank()}
      {renderContent()}
      {state.billing.billing_status.name === 'Belum bayar' ||
      state.billing.billing_status.name === 'Belum Lunas' ? (
        renderFooter()
      ) : state.billing.billing_status.name === 'Perbaikan pembayaran' ? (
        renderFooterPerbaikan()
      ) : (
        <View />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  viewInfo: {
    flexDirection: 'row',
    backgroundColor: '#F6F7F4',
    padding: toDp(10),
    width: toDp(320),
    borderRadius: toDp(10),
  },
  viewLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icInfo: {
    width: toDp(20),
    height: toDp(20),
  },
  textInfo: {
    fontSize: toDp(12),
  },
  touchLabelItem: {
    marginHorizontal: toDp(24),
    height: toDp(50),
    borderBottomWidth: toDp(1),
    borderBottomColor: '#e9ebed',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  touchRow: {
    width: width,
    height: 'auto',
    borderRadius: toDp(4),
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginTop: toDp(4),
    marginBottom: toDp(4),
  },
  viewStatus: {
    width: toDp(8),
    height: 'auto',
    borderTopLeftRadius: toDp(4),
    borderBottomLeftRadius: toDp(4),
  },
  viewRowDetails: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: toDp(5),
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto',
  },
  textTitle: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(14),
    letterSpacing: toDp(0.7),
  },
  viewDetailsTagihan: {
    paddingHorizontal: toDp(20),
    paddingBottom: toDp(20),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  textDetailTagihan: {
    fontSize: toDp(16),
  },
  textId: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(12),
    letterSpacing: toDp(0.6),
    marginTop: toDp(8),
  },
  textDate: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(12),
    letterSpacing: toDp(0.6),
    marginTop: toDp(4),
  },

  textLabelDetails: {
    color: '#273238',
    fontSize: toDp(12),
  },
  textValueDetails: {
    color: '#383B34',
    fontSize: toDp(14),
  },
  rowContent: {
    flexDirection: 'row',
    marginTop: toDp(16),
    marginLeft: toDp(20),
  },
  headerContent: {
    width,
    //height: toDp(78),
    height: 'auto',
    backgroundColor: '#EBECE9',
  },
  icHomeCluster: {
    width: toDp(20),
    height: toDp(20),
  },
  textTitleConten: {
    fontSize: toDp(14),
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
  },
  textDetail: {
    //fontFamily: 'Montserrat-Bold',
    fontSize: toDp(14),
    letterSpacing: toDp(1),
  },
  viewDetails: {
    flex: 1,
    padding: toDp(16),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: toDp(16),
    borderTopRightRadius: toDp(16),
    elevation: toDp(6),
  },
  touchRow: {
    width,
    height: 'auto',
    borderRadius: toDp(4),
    flexDirection: 'row',
    marginBottom: toDp(16),
    paddingHorizontal: toDp(20),
    paddingVertical: toDp(16),
  },
  viewRootRow: {
    flex: 1,
    //padding: toDp(16)
  },
  textTitle: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(14),
    letterSpacing: toDp(0.7),
  },
  textPrice: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(24),
    //letterSpacing: toDp(1.2),
    marginTop: toDp(5),
  },
  textMore: {
    color: '#5AAA0F',
  },
  textId: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(12),
    letterSpacing: toDp(0.6),
    marginTop: toDp(16),
  },
  textDate: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(12),
    letterSpacing: toDp(0.6),
    marginTop: toDp(6),
  },
  viewStatus1: {
    backgroundColor: '#28A595',
    borderRadius: toDp(13),
    paddingHorizontal: toDp(10),
    paddingVertical: toDp(5),
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto',
  },
  textStatus: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(12),
    textAlign: 'right',
  },
  viewRowItem: {
    marginTop: toDp(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto',
  },
  textDetails: {
    //fontFamily: 'Montserrat-Medium',
    fontSize: toDp(14),
    letterSpacing: toDp(0.7),
  },
  line: {
    width: '100%',
    height: toDp(1),
    backgroundColor: '#b0bec5',
    marginTop: toDp(24),
  },
  lineDetails: {
    width: '90%',
    height: toDp(1),
    backgroundColor: '#9B9F95',
    // marginTop: toDp(14),
    marginBottom: toDp(8),
    alignSelf: 'center',
  },
  viewRenderInfo: {
    marginTop: toDp(24),
  },
  viewPembayaran: {
    width: '100%',
    height: toDp(72),
    backgroundColor: '#eeeeee',
    borderRadius: toDp(6),
    marginTop: toDp(16),
    padding: toDp(12),
    flexDirection: 'row',
  },
  imgInfo: {
    width: toDp(24),
    height: toDp(24),
  },
  textInfo: {
    marginRight: toDp(24),
    marginLeft: toDp(8),
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(12),
    letterSpacing: toDp(0.29),
  },
  viewLihat: {
    width: '100%',
    height: toDp(40),
    borderRadius: toDp(4),
    borderWidth: toDp(1),
    borderColor: '#917438',
    marginTop: toDp(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLihat: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(14),
    color: '#917438',
    letterSpacing: toDp(0.7),
  },

  touchBayar: {
    width: toDp(141),
    height: toDp(40),
    backgroundColor: '#917438',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBayar: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(14),
    color: 'white',
    letterSpacing: toDp(0.7),
  },
  textTotal: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(12),
    color: 'black',
  },
  textValueTotal: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(16),
    color: 'black',
    marginTop: toDp(4),
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
    marginHorizontal: toDp(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitleModal: {
    //fontFamily: 'Montserrat-Bold',
    fontSize: toDp(14),
    letterSpacing: toDp(1),
    color: '#263238',
    marginLeft: toDp(16),
  },
  touchSilang: {},
  icSilang: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#917438',
  },
  textTransfer: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(14),
    letterSpacing: toDp(1),
    color: '#263238',
    marginTop: toDp(24),
    marginLeft: toDp(16),
    marginBottom: toDp(12),
  },
  viewRowItemVa: {
    width: '90%',
    height: toDp(54),
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: toDp(16),
    borderBottomWidth: toDp(0.5),
    borderBottomColor: '#b0bec5',
  },
  imageBank: {
    width: toDp(50),
    height: toDp(50),
    resizeMode: 'contain',
  },
  textNameBank: {
    //fontFamily: 'Montserrat-Medium',
    fontSize: toDp(14),
    letterSpacing: toDp(0.7),
    color: '#263238',
    marginLeft: toDp(16),
  },
  touchNext: {
    position: 'absolute',
    right: 0,
  },
  icNext: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#917438',
  },
  viewRowModal: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: toDp(16),
    marginHorizontal: toDp(16),
  },
  textModalField: {
    //fontFamily: 'Montserrat-Medium',
    fontSize: toDp(14),
    letterSpacing: toDp(0.7),
    color: '#1c2028',
  },
  textModalValue: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(14),
    letterSpacing: toDp(0.7),
    color: '#1c2028',
  },
  icCopy: {
    width: toDp(18),
    height: toDp(18),
    marginLeft: toDp(8),
  },
  modalRowTab: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: toDp(24),
    marginHorizontal: toDp(16),
  },
  touchModalTab: {
    //width: toDp(70),
    width: 'auto',
    flex: 1,
    height: toDp(44),
    backgroundColor: '#917438',
    borderWidth: toDp(1),
    borderColor: '#917438',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: toDp(4),
  },
  textTab: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(10),
    letterSpacing: toDp(0.25),
    color: 'white',
    textAlign: 'center',
  },
  modalContent: {
    marginTop: toDp(16),
    marginHorizontal: toDp(16),
    borderRadius: toDp(6),
    backgroundColor: '#eeeeee',
    height: 'auto',
    padding: toDp(12),
  },
  textContent: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(12),
    letterSpacing: toDp(0.29),
    color: '#1c2028',
  },
  viewArrayStatus: {
    marginTop: toDp(24),
    paddingHorizontal: toDp(24),
  },
  touchFunction: {
    marginTop: toDp(8),
    paddingVertical: toDp(8),
  },
  textTitleFunction: {
    fontSize: toDp(14),
    color: '#917438',
    //fontFamily: 'Montserrat-SemiBold'
  },
  icBack: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#917438',
  },

  header: {
    width,
    height: 'auto',
    borderBottomWidth: toDp(1),
    borderBottomColor: '#917438',
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
  title: {
    color: '#917438',
    fontSize: toDp(18),
    fontWeight: '600',
    //fontFamily: 'Montserrat-SemiBold',
  },
  icBack: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#917438',
  },
  touchHeaderSearch: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(12),
    top: toDp(16),
  },
  icExportTagihan: {
    fontSize: toDp(14),
    width: toDp(24),
    height: toDp(24),
    tintColor: '#5E6157',
  },
  header: {
    width,
    height: toDp(60),
    borderBottomWidth: toDp(1),
    borderBottomColor: '#CCCFC9',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: toDp(16),
  },
  linearHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: toDp(60),
  },
  touchHeader: {
    padding: toDp(4),
  },
  icBack: {
    width: toDp(16),
    height: toDp(16),
    tintColor: '#383B34',
  },
  headerRow: {
    flexDirection: 'row',
  },
  touchHeaderSearch: {
    padding: toDp(4),
  },
  icFilter: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#383B34',
  },
  icSearch: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#383B34',
  },
  title: {
    color: '#383B34',
    fontSize: toDp(18),
  },
  icCeklisTagihan: {
    width: toDp(24),
    height: toDp(24),
  },
  viewFooter: {
    // width,
    alignItems: 'center',
    borderTopColor: '#DDE3E0',
    borderTopWidth: toDp(1),
    paddingTop: toDp(10),
    paddingBottom: Platform.OS === 'android' ? toDp(16) : toDp(10),

    /*shadowColor: "#000",
    shadowOffset: {
    	width: 0,
    	height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,*/
  },
  touchFooter: {
    width: toDp(250),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchFooterPayNow: {
    width: width - toDp(36),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFooter: {
    fontSize: toDp(14),
    color: 'white',
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
    fontSize: toDp(16),
    letterSpacing: toDp(1),
    color: '#263238',
  },
  touchSilang: {
    padding: toDp(4),
  },
  icSilangModal: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#5E6157',
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
  viewBatas: {
    width,
    height: toDp(10),
    backgroundColor: '#F6F7F4',
    marginBottom: toDp(16),
  },
});

export default DetailsBillingScreen;
