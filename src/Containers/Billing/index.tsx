import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { allLogo } from '@src/Assets';
import CustomText from '@src/Components/CustomText';
import Empty from '@src/Components/Empty';
import NoConnection from '@src/Components/NoConnection';
import Toast from '@src/Components/Toast';
import { toDp } from '@src/Helper/percentageToDP';
import { getBillingPaid, postBillingSOAPDF } from '@src/Services/Apis';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import RNShareFile from 'react-native-share-pdf';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import * as NavigatorService from '../../Helper/NavigatorServices';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const { width, height } = Dimensions.get('window');
// make update

const BillingScreen = (props) => {
  const toast = useRef(null);
  const netInfo = useNetInfo();
  const billingId = '03ce4913-9652-4169-a875-36c7b888f00b';
  const [state, setState] = useState({
    status: 'ongoing',
    unit: {},
    unit: props.route.params.unit,
    arrayData: [],
    arrayBackupData: [],
    loading: true,
    connection: true,
    darkMode: false,
    modalVisible: false,
    arrayTahun: [],
  });

  useEffect(() => {
    loadUser();
    loadPaidUnpaid();
    let tempArrayTahun = [];
    tempArrayTahun.push({ name: 'Semua', status: true });
    for (var i = moment(new Date()).format('YYYY'); i >= 2014; i--) {
      tempArrayTahun.push({ name: '' + i, status: false });
    }
    setState((state) => ({ ...state, arrayTahun: tempArrayTahun }));
  }, []);

  const loadUser = async () => {
    let unit = await AsyncStorage.getItem('unit');
    console.log('unit', JSON.parse(unit));
    setState((state) => ({ ...state, unit: JSON.parse(unit) }));
  };

  const loadPaidUnpaid = () => {
    let params = `/${state.status}/${moment(new Date()).format('YYYYMM')}`;
    console.log('params x================', params);
    getBillingPaid(params)
      .then((response) => {
        console.log(response);
        let tempArrayData = [];
        for (var i = 0; i < response.data.billing.length; i++) {
          if (response.data.billing[i].id) {
            tempArrayData.push(response.data.billing[i]);
          }
        }
        setState((state) => ({
          ...state,
          loading: false,
          arrayData: tempArrayData,
          arrayBackupData: tempArrayData,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
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

  const renderStatusColor = (id) => {
    if (id === 'b31b097a-8516-452c-a723-690388791735') return '#F2C141'; // Verifikasi
    if (id === '79c07edd-094e-4df5-bee2-12a430c4e1f1') return '#EE4040'; // Perbaikan pembayaran
    if (id === '6613a96f-0a4a-4091-9ba8-a0b30d9bf76c') return '#28A595'; // Sudah bayar
    if (id === 'd36080cc-58f6-449f-b082-c20066401bfb') return '#EE4040'; // Belum bayar
    if (id === 'da3393ce-4ca8-42bb-8632-533de7d31685') return '#EE4040'; // Belum bayar
  };

  const showMessage = () => {
    toast.current.show('Unduh Tagihan berhasil');
  };

  const handleDownloadSOA = () => {
    setState((state) => ({ ...state, loading: true }));
    let params = '/' + state.unit.id;
    postBillingSOAPDF(params)
      .then((response) => {
        console.log('response xxxxx', response.data);
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

  const downloadPDF = (linkPDF) => {
    const { config, fs } = RNFetchBlob;
    const date = new Date();
    const { DownloadDir, DocumentDir } = fs.dirs;
    const dirToSave = Platform.select({
      ios: fs.dirs.DocumentDir,
      android: fs.dirs.DownloadDir,
    });

    let fileName = `statement-of-account.pdf`;
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
            // console.log('RESULT - 02', base64Data);
            showMessage();
            setState((state) => ({ ...state, loading: false }));
            setTimeout(function () {
              console.log('fileName', fileName);
              RNShareFile.sharePDF(base64Data, fileName)
                .then((res1) => {
                  // console.log('res1', res1);
                })
                .catch((err1) => {
                  // console.log('err1', err1);
                });
            }, 1000);
          })
          .catch((error) => {
            console.log('error download ios', error);
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

  const renderItem = ({ item, index }) => {
    console.log('item xxxxxx', item);
    return (
      <TouchableOpacity
        activeOpacity={1}
        disabled={item.billing_status.id === 'd36080cc-58f6-449f-b082-c20066401bfb'}
        onPress={() => {
          if (item.id) {
            console.log('item', item);
            NavigatorService.navigate('DetailsBilling', {
              item,
              loadPaidUnpaid,
              unit: state.unit,
            });
          }
        }}
        style={[styles.touchRow, { backgroundColor: state.darkMode ? '#1C1C1E' : 'white' }]}
      >
        <View style={styles.viewRootRow}>
          <View style={styles.viewRow}>
            <CustomText
              textType="semibold"
              allowFontScaling={false}
              style={[styles.textTitle, { color: state.darkMode ? 'white' : '#383B34' }]}
            >
              {changeMonth(item.period)}
            </CustomText>
            <View
              style={[
                styles.viewStatus1,
                { backgroundColor: renderStatusColor(item.billing_status.id) },
              ]}
            >
              <CustomText
                textType="medium"
                allowFontScaling={false}
                style={[styles.textStatus, { color: state.darkMode ? '#121212' : '#ffffff' }]}
              >
                {item.billing_status.name}
              </CustomText>
            </View>
          </View>

          <CustomText
            textType="semibold"
            allowFontScaling={false}
            style={[styles.textPrice, { color: state.darkMode ? 'white' : '#383B34' }]}
          >
            Rp{' '}
            {item.billing_status.id === 'b31b097a-8516-452c-a723-690388791735' ||
            item.billing_status.id === '79c07edd-094e-4df5-bee2-12a430c4e1f1'
              ? convert(item.total_remaining)
              : item.billing_status.id === 'd36080cc-58f6-449f-b082-c20066401bfb'
              ? convert(item.total_remaining)
              : convert(item.total_remaining)}
          </CustomText>
          <CustomText
            textType="regular"
            allowFontScaling={false}
            style={[styles.textId, { color: state.darkMode ? 'white' : '#9B9F95' }]}
          >
            {item.invoice_id}
          </CustomText>

          <View style={styles.viewRow}>
            {state.status === 'ongoing' ? (
              <CustomText
                allowFontScaling={false}
                style={[styles.textDate, { color: state.darkMode ? 'white' : '#9B9F95' }]}
              >
                {'' +
                  (state.status === 'ongoing' ? 'Batas bayar' : 'Waktu bayar') +
                  ': ' +
                  (item.due_date === null ? '-' : moment(item.due_date).format('DD MMMM YYYY'))}
              </CustomText>
            ) : (
              <CustomText
                allowFontScaling={false}
                style={[styles.textDate, { color: state.darkMode ? 'white' : '#9B9F95' }]}
              >
                {'' +
                  (state.status === 'ongoing' ? 'Batas bayar' : 'Waktu bayar') +
                  ': ' +
                  (item.payment_timestamp === null
                    ? '-'
                    : moment(item.payment_timestamp).format('DD MMMM YYYY'))}
              </CustomText>
            )}
          </View>
          <View>
            <CustomText
              allowFontScaling={false}
              style={[styles.textDate, { color: state.darkMode ? 'white' : '#9B9F95' }]}
            >
              type :{' '}
              {item?.type === 'MONTHLY_BILL'
                ? 'Tagihan Bulanan'
                : item.type === 'AGING_INSTALLMENT'
                ? 'Cicilan Aging'
                : 'Cicilan Tunggakan'}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItemShimmer = ({ item, index }) => {
    return (
      <View style={styles.viewCenter}>
        <ShimmerPlaceHolder style={styles.loadingShimmer} />
      </View>
    );
  };

  const renderItemTahun = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setState((state) => ({
            ...state,
            modalVisible: false,
            arrayTahun: state.arrayTahun.map((value, i) => {
              return {
                ...value,
                status: index === i,
              };
            }),
            arrayData:
              item.name === 'Semua'
                ? state.arrayBackupData
                : state.arrayBackupData.filter((data) => data.period.includes(item.name)),
          }));
        }}
        style={[
          styles.touchLabelItem,
          { borderBottomColor: state.darkMode ? '#1C1C1E' : '#e9ebed' },
        ]}
      >
        <CustomText
          textType={item.status ? 'semibold' : 'regular'}
          allowFontScaling={false}
          style={[
            styles.textLabel,
            {
              color: state.darkMode ? 'white' : '#273238',
            },
          ]}
        >
          {item.name}
        </CustomText>
        {item.status && <Image source={allLogo.icCeklisTagihan} style={styles.icCeklisTagihan} />}
      </TouchableOpacity>
    );
  };

  const renderModalFilter = () => {
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
                TAHUN TAGIHAN
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
                data={state.arrayTahun}
                renderItem={renderItemTahun}
                numColumns={1}
                ListFooterComponent={() => <View style={{ height: toDp(80) }} />}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderHeader = () => {
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
          {'Tagihan'}
        </CustomText>

        {state.status === 'paid' ? (
          <View style={{ width: toDp(90), alignItems: 'flex-end' }}>
            <View style={styles.headerRow}>
              <TouchableOpacity
                style={styles.touchHeaderSearch}
                onPress={() => setState((state) => ({ ...state, modalVisible: true }))}
              >
                <Image source={allLogo.icFilter} style={styles.icFilter} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ width: toDp(90), alignItems: 'flex-end' }}>
            <View style={styles.headerRow}>
              <TouchableOpacity style={styles.touchHeaderSearch} onPress={handleDownloadSOA}>
                <Image source={allLogo.icExportTagihan} style={styles.icFilter} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  useEffect(() => {
    loadPaidUnpaid();
  }, [state.status]);

  const renderSection = () => {
    return (
      <View style={[styles.tab, { borderBottomColor: state.darkMode ? '#1C1C1E' : 'white' }]}>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => {
            setState((state) => ({
              ...state,
              loading: true,
              status: 'ongoing',
              arrayTahun: state.arrayTahun.map((value, i) => {
                return {
                  ...value,
                  status: i === 0,
                };
              }),
            }));
          }}
        >
          <CustomText
            textType="semibold"
            allowFontScaling={false}
            style={[
              styles.text,
              {
                color: state.darkMode
                  ? 'white'
                  : state.status === 'ongoing'
                  ? '#5AAA0F'
                  : '#CCCFC9',
              },
            ]}
          >
            Berjalan
          </CustomText>
          {state.status === 'ongoing' && (
            <View
              style={[styles.line, { backgroundColor: state.darkMode ? 'white' : '#5AAA0F' }]}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touch}
          onPress={() => {
            setState((state) => ({
              ...state,
              loading: true,
              status: 'paid',
              arrayTahun: state.arrayTahun.map((value, i) => {
                return {
                  ...value,
                  status: i === 0,
                };
              }),
            }));
          }}
        >
          <CustomText
            textType="semibold"
            allowFontScaling={false}
            style={[
              styles.text,
              {
                color: state.darkMode ? 'white' : state.status === 'paid' ? '#5AAA0F' : '#CCCFC9',
              },
            ]}
          >
            Riwayat
          </CustomText>
          {state.status === 'paid' && (
            <View
              style={[styles.line, { backgroundColor: state.darkMode ? 'white' : '#5AAA0F' }]}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  console.log('state.arrayData', state.arrayData);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Toast ref={toast} />
      {renderModalFilter()}
      {renderHeader()}
      {renderSection()}
      <View style={[styles.content, { backgroundColor: state.darkMode ? '#121212' : '#F6F7F4' }]}>
        {!netInfo.isConnected ? (
          <NoConnection />
        ) : state.arrayData.length === 0 && !state.loading ? (
          <Empty
            title={'Belum ada tagihan baru'}
            subtitle={'Tagihan baru akan muncul diantara tanggal 1-5 disetiap bulannya.'}
            images={allLogo.imgEmptyNews}
          />
        ) : (
          <React.Fragment>
            <FlatList
              data={state.loading ? ['', '', '', '', '', '', '', ''] : state.arrayData}
              renderItem={state.loading ? renderItemShimmer : renderItem}
              ListFooterComponent={<View style={{ height: toDp(24) }} />}
            />
            {state.status === 'ongoing' && state.arrayData.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  NavigatorService.navigate('DetailsBilling', {
                    item: state.arrayData[0],
                    dataBilling: state.arrayData,
                    loadPaidUnpaid,
                    unit: state.unit,
                  });
                }}
                style={{
                  backgroundColor: '#5AAA0F',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 16,
                  borderRadius: 12,
                }}
              >
                <CustomText
                  textType="semibold"
                  allowFontScaling={false}
                  style={[
                    styles.text,
                    {
                      color: 'white',
                    },
                  ]}
                >
                  Selanjutnya
                </CustomText>
              </TouchableOpacity>
            )}
          </React.Fragment>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },
  headeriOS: {
    width,
    height: toDp(20),
    backgroundColor: '#5AAA0F',
  },
  tab: {
    width,
    height: toDp(40),
    flexDirection: 'row',
    borderBottomWidth: toDp(1),
    borderBottomColor: '#dadada',
  },
  touch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: '#5AAA0F',
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-SemiBold',
    letterSpacing: toDp(0.07),
  },
  line: {
    backgroundColor: '#5AAA0F',
    width: '100%',
    height: toDp(2),
    position: 'absolute',
    bottom: 0,
  },
  content: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },
  containerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: toDp(8),
  },
  cards: {
    width: '95%',
    height: 'auto',
    borderRadius: toDp(5),
    backgroundColor: '#FFFFFF',
    elevation: 2,

    paddingTop: toDp(16),
    paddingRight: toDp(16),
    paddingLeft: toDp(16),

    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowColor: '#000000',
    marginTop: toDp(8),
    marginBottom: toDp(8),
    marginLeft: toDp(8),
    marginRight: toDp(8),
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  icNext: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#5AAA0F',
  },
  due: {
    color: 'red',
    fontSize: toDp(12),
  },
  viewCenter: {
    width,
    alignItems: 'center',
  },
  loadingShimmer: {
    width: '92%',
    height: toDp(136),
    borderRadius: toDp(5),
    marginTop: toDp(16),
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
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto',
    marginRight: toDp(-8),
  },
  textTitle: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(14),
    letterSpacing: toDp(0.7),
  },
  textPrice: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(16),
    letterSpacing: toDp(0.8),
    marginTop: toDp(8),
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
  viewStatus1: {
    backgroundColor: '#f2c141',
    borderRadius: toDp(12),
    paddingHorizontal: toDp(10),
    paddingVertical: toDp(3),
  },
  textStatus: {
    //fontFamily: 'Montserrat-Bold',
    fontSize: toDp(12),
    letterSpacing: toDp(0.5),
  },
  dateRow: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(14),
    fontWeight: '300',
    color: '#616161',
  },
  viewRootRow: {
    flex: 1,
    paddingHorizontal: toDp(20),
    paddingVertical: toDp(16),
  },
  rowInvoice: {
    flexDirection: 'row',
    marginBottom: toDp(8),
    marginTop: toDp(8),
  },
  viewRowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: toDp(16),
    paddingTop: toDp(8),
    paddingBottom: toDp(8),
    height: 'auto',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  titleHeader: {
    color: '#F44336',
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(12),
    fontWeight: '300',
    marginTop: toDp(8),
    marginBottom: toDp(8),
  },
  viewRowFooter: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: toDp(50),
    flexDirection: 'row',
  },
  iconNext: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#5AAA0F',
    marginBottom: toDp(-5),
  },
  titleFooter: {
    textAlign: 'center',
    color: '#424242',
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(12),
    fontWeight: '300',
    marginTop: toDp(16),
    marginBottom: toDp(16),
  },
  viewDetails: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textDetail: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(12),
    letterSpacing: toDp(0.7),
    color: '#5AAA0F',
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
    height: toDp(360),
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
    marginHorizontal: toDp(24),
    height: toDp(50),
    borderBottomWidth: toDp(1),
    borderBottomColor: '#e9ebed',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  textLabel: {
    color: '#273238',
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
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
});

export default BillingScreen;
