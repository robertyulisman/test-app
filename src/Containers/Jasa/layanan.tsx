import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import moment from 'moment';
import { allLogo } from '../../Assets';
import Header from '../../Components/Header';
import { toDp } from '../../Helper/percentageToDP';

import CustomText from '../../Components/CustomText';
import CustomTextInput from '../../Components/CustomTextInput';
import CustomTime from '../../Components/CustomTime';

import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {
  getServiceCurrentTime,
  getServices,
  postServiceOrdersConfirmation,
  postServiceOrdersCreate,
} from '../../Services/Apis';

const { width, height } = Dimensions.get('window');
const LayananScreen = (props: any) => {
  const [state, setState] = useState<any>({
    title: props.route.params.item.name,
    isShowModalConfirm: false,
    isShowSuccessModal: false,
    content: 'form', // form / confrim
    connection: true,
    subTotal: 0,
    admin: 5000,
    grandTotal: 0,
    loading: true,
    darkMode: false,
    modalVisibleTime: false,
    modalVisible: false,
    responseTime: '0',
    modalVisibleDate: false,
    responseDate: '',
    catatan: '',
    dataUser: {},
    arrLayanan: [],
    unit: {},
    user: {},
    defaultDate: new Date(),
    defaultTime: new Date(),
    loadingDialog: false,
    touch: true,
    modalConfirm: false,
    arrayTime: [
      '09.00',
      '09.30',
      '10.00',
      '10.30',
      '11.00',
      '11.30',
      '12.00',
      '12.30',
      '13.00',
      '13.30',
      '14.00',
      '14.30',
      '15.00',
      '15.30',
      '16.00',
      '16.30',
    ],
    tempArrayTime: [
      '09.00',
      '09.30',
      '10.00',
      '10.30',
      '11.00',
      '11.30',
      '12.00',
      '12.30',
      '13.00',
      '13.30',
      '14.00',
      '14.30',
      '15.00',
      '15.30',
      '16.00',
      '16.30',
    ],
    searchValue: '',
    activeSearch: false,
    minimumDate: new Date(),
    idOrder: '',
  });

  useEffect(() => {
    getDetailsData();
  }, []);

  const getDetailsData = () => {
    getServices('' + props.route.params.item.id)
      .then((response) => {
        console.log(response);
        if (response.data.services.length === 0) {
          Alert.alert(
            'Jenis Layanan ' + state.title + ' belum tersedia',
            '',
            [
              {
                text: 'Kembali',
                onPress: () => {
                  props.navigation.goBack();
                },
              },
            ],
            { cancelable: false },
          );
          return;
        }
        setState((state: any) => ({
          ...state,
          loading: false,
          arrLayanan: response.data.services.map((data: any) => {
            return {
              ...data,
              quantity: 0,
            };
          }),
        }));
      })
      .catch((error) => {
        console.log(error);
      });
    getServiceCurrentTime()
      .then((response) => {
        console.log('response', response);
        let minimumDate = new Date(response.data.date);
        minimumDate.setDate(minimumDate.getDate() + 1);
        setState((state: any) => ({ ...state, minimumDate }));
        //setState(state => ({...state, minimumDate: new Date(response.data.date)}))
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    let subTotal = 0;
    state.arrLayanan.map((data: any) => {
      subTotal += data.quantity * data.price;
    });
    setState((state: any) => ({ ...state, subTotal }));
  }, [state.arrLayanan]);

  const minPlus = (id: any, operator: any) => {
    setState((state: any) => ({
      ...state,
      arrLayanan: state.arrLayanan.map((data: any) => {
        if (data.id === id) {
          return {
            ...data,
            quantity: operator === '+' ? data.quantity + 1 : data.quantity - 1,
          };
        } else {
          return {
            ...data,
          };
        }
      }),
    }));
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <View style={{ paddingHorizontal: toDp(4) }}>
        <CustomText
          numberOfLines={2}
          ellipsizeMode="tail"
          textType="semibold"
          style={[styles.textName, { color: state.darkMode ? 'white' : '#1C2028' }]}
        >
          {item.name}
        </CustomText>
        <CustomText
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[styles.textDesc, { color: state.darkMode ? 'white' : '#939599' }]}
        >
          {item.description}
        </CustomText>
        <CustomText
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.textVendor, { color: state.darkMode ? 'white' : '#939599' }]}
        >
          {item.service_vendor.name}
        </CustomText>
        <View style={[styles.viewPrice, { marginTop: toDp(8) }]}>
          <View style={{ width: '54%', marginLeft: toDp(12), height: 'auto' }}>
            <CustomText
              numberOfLines={1}
              ellipsizeMode="tail"
              textType="medium"
              style={[
                styles.textPrice,
                {
                  color: state.darkMode ? 'white' : '#1C2028',
                  width: '100%',
                },
              ]}
            >
              {'Rp ' +
                convert(item.price) +
                (item.unit.includes('/') ? item.unit : '/' + item.unit)}
            </CustomText>
          </View>
          <View style={styles.row}>
            {item.quantity === 0 ? (
              <View style={[styles.touchMinPlus, { borderColor: '#C4C4C4' }]}>
                <CustomText textType="semibold" style={[styles.textMinPlus, { color: '#C4C4C4' }]}>
                  {'-'}
                </CustomText>
              </View>
            ) : (
              <TouchableOpacity onPress={() => minPlus(item.id, '-')} style={styles.touchMinPlus}>
                <CustomText textType="semibold" style={styles.textMinPlus}>
                  {'-'}
                </CustomText>
              </TouchableOpacity>
            )}

            <CustomText
              numberOfLines={1}
              ellipsizeMode="tail"
              textType="semibold"
              style={[styles.textQty, { color: state.darkMode ? 'white' : '#1C2028' }]}
            >
              {item.quantity}
            </CustomText>
            {item.quantity === 999 ? (
              <View style={[styles.touchMinPlus, { borderColor: '#C4C4C4' }]}>
                <CustomText textType="semibold" style={[styles.textMinPlus, { color: '#C4C4C4' }]}>
                  {'+'}
                </CustomText>
              </View>
            ) : (
              <TouchableOpacity onPress={() => minPlus(item.id, '+')} style={styles.touchMinPlus}>
                <CustomText textType="semibold" style={styles.textMinPlus}>
                  {'+'}
                </CustomText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const convert = (amount: any) => {
    var reverse = amount.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };

  const renderLayanan = () => {
    return (
      <View>
        <View style={{ width, height: toDp(1), backgroundColor: '#EEEEEE' }} />
        <View
          style={[
            styles.viewFormLayanan,
            { backgroundColor: state.darkMode ? '#1C1C1E' : 'white' },
          ]}
        >
          <FlatList
            data={state.arrLayanan}
            renderItem={state.loading ? <View /> : (renderItem as any)}
            ItemSeparatorComponent={() => (
              <View
                style={[styles.line, { backgroundColor: state.darkMode ? '#121212' : '#EEEEEE' }]}
              />
            )}
            ListFooterComponent={() => <View style={{ height: toDp(48) }} />}
          />
        </View>
      </View>
    );
  };

  const renderKontak = () => {
    return (
      <View
        style={{
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
              {state.user.name}
            </CustomText>
          </View>
          <View style={styles.viewRow}>
            <Image
              source={allLogo.icMail}
              style={[styles.icCalendar2, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
            />
            <CustomText
              style={[
                styles.textName2,
                { color: state.darkMode ? 'white' : '#5E6157', marginBottom: toDp(0) },
              ]}
            >
              {state.user.email}
            </CustomText>
          </View>
          <View style={styles.viewRow}>
            <Image
              source={allLogo.icPhone}
              style={[styles.icCalendar2, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
            />
            <CustomText
              style={[
                styles.textName2,
                { color: state.darkMode ? 'white' : '#5E6157', marginBottom: toDp(0) },
              ]}
            >
              {state.user.phone}
            </CustomText>
          </View>
          <View style={styles.viewRow}>
            <Image
              source={allLogo.icLocation}
              style={[styles.icCalendar2, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
            />
            <CustomText style={[styles.textName2, { color: state.darkMode ? 'white' : '#5E6157' }]}>
              {state.unit?.code + '\n' + state.unit?.unit_name}
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
              {moment(state.responseDate).format('dddd, DD MMMM YYYY')}
            </CustomText>
          </View>
          <CustomText style={[styles.textTime2, { color: state.darkMode ? 'white' : '#5E6157' }]}>
            {state.responseTime}
          </CustomText>
        </View>
      </View>
    );
  };

  const convertToSecond = (time: any) => {
    let jam = time.split('.')[0];
    let menit = time.split('.')[1];
    let detik = jam * 3600 + menit * 60;
    return detik;
  };

  const renderDate = () => {
    //var date = new Date();
    //date.setDate(date.getDate() + 1);
    //console.log('date', date);
    return (
      <View
        style={{
          marginBottom: toDp(10),
          padding: toDp(20),
          backgroundColor: 'white',
        }}
      >
        <DateTimePickerModal
          headerTextIOS={'Kapan Anda membutuhkan layanan ini?'}
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          mode={'date'}
          isDarkModeEnabled={state.darkMode}
          isVisible={state.modalVisibleDate}
          onConfirm={(response) => {
            let filterArrayTime: any = [];
            //if(moment(new Date()).format('DD MMMM YYYY') === moment(response).format('DD MMMM YYYY')) {
            if (false) {
              for (var i = 0; i < state.arrayTime.length; i++) {
                if (
                  convertToSecond(state.arrayTime[i]) >
                  convertToSecond(moment(new Date()).format('HH.mm'))
                ) {
                  filterArrayTime.push(state.arrayTime[i]);
                }
              }
            } else {
              for (var i = 0; i < state.tempArrayTime.length; i++) {
                filterArrayTime.push(state.tempArrayTime[i]);
              }
            }

            setState((state: any) => ({
              ...state,
              responseDate: response,
              defaultDate: response,
              modalVisibleDate: false,
              arrayTime: filterArrayTime,
              responseTime: '0',
            }));
          }}
          onCancel={() => setState((state: any) => ({ ...state, modalVisibleDate: false }))}
          //date={date}
          //minimumDate={date}
          date={state.minimumDate}
          minimumDate={state.minimumDate}
        />
        <CustomText
          textType={'semibold'}
          style={[styles.textPukul, { color: state.darkMode ? 'white' : '#9B9F95' }]}
        >
          Kapan Anda membutuhkan layanan ini?
        </CustomText>
        <TouchableOpacity
          onPress={() => {
            setState((state: any) => ({ ...state, modalVisibleDate: true }));
          }}
          style={[
            styles.viewValueForm,
            {
              marginTop: toDp(20),
              justifyContent: 'flex-start',
              flexDirection: 'row',
              backgroundColor: state.darkMode ? '#121212' : '#EEEEEE',
              borderColor: state.darkMode ? '#121212' : '#d8d8d8',
              borderWidth: 0,
            },
          ]}
        >
          <Image
            source={allLogo.icCalendar}
            style={[styles.icCalendar, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
          />
          <CustomText
            style={[styles.textTime, { color: state.responseDate !== '' ? '#5E6157' : '#9B9F95' }]}
          >
            {state.responseDate === ''
              ? 'Pilih tanggal pelayanan'
              : moment(state.responseDate).format('DD MMMM YYYY')}
          </CustomText>
        </TouchableOpacity>
        <CustomTime
          title={'Pukul berapa layanan ini akan dikerjakan?'}
          textPlaceholder={'Silahkan Pilih'}
          value={state.responseTime}
          arrayData={state.arrayTime}
          darkMode={state.darkMode}
          onSelected={(item: any, index: any) => {
            setState((state: any) => ({
              ...state,
              responseTime: item,
              //defaultTime: item
            }));
          }}
        />
      </View>
    );
  };

  const renderCatatan = () => {
    return (
      <View
        style={{
          marginTop: Platform.OS === 'android' ? toDp(24) : toDp(4),
          backgroundColor: 'white',
          paddingTop: toDp(20),
        }}
      >
        <CustomText
          style={[
            styles.textPukul,
            {
              fontSize: toDp(14),
              marginLeft: toDp(20),
              color: state.darkMode ? 'white' : '#9B9F95',
            },
          ]}
        >
          Catatan{' '}
          <CustomText style={{ fontStyle: 'italic', color: '#9B9F95' }}>(optional)</CustomText>
        </CustomText>
        <View
          style={[
            styles.viewFormLayanan,
            {
              backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
              paddingHorizontal: toDp(16),
              paddingTop: toDp(8),
            },
          ]}
        >
          <CustomTextInput
            title={''}
            placeholder={'Tambahkan catatan untuk layanan'}
            error={''}
            value={state.catatan}
            onChangeText={(catatan: any) => {
              setState((state: any) => ({ ...state, catatan }));
            }}
            autoFocus={false}
            returnKeyType={'done'}
            maxLength={200}
          />
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={[
          styles.footer,
          {
            backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
            borderTopColor: state.darkMode ? '#1C1C1E' : '#EEEEEE',
          },
        ]}
      >
        <View style={styles.viewFooter}>
          <CustomText
            style={[styles.textEstimase, { color: state.darkMode ? 'white' : '#383B34' }]}
          >
            Estimasi Harga
          </CustomText>
          <CustomText
            textType={'semibold'}
            style={[styles.textHarga, { color: state.darkMode ? 'white' : '#383B34' }]}
          >
            Rp {convert(state.subTotal)}
          </CustomText>
        </View>

        {state.subTotal !== 0 && state.responseTime !== '0' && state.responseDate !== '' ? (
          <TouchableOpacity
            onPress={() => {
              let tanggal = moment(state.responseDate).format('YYYY-MM-DD');
              //let jam = moment(state.responseTime).format('LTS').replace('.',':').replace('.',':')
              let jam = state.responseTime.replace('.', ':');
              let time = '' + tanggal + 'T' + (jam + ':00') + '.000Z';

              let services = [];
              for (var i = 0; i < state.arrLayanan.length; i++) {
                if (state.arrLayanan[i].quantity >= 1) {
                  let obj = {
                    id: state.arrLayanan[i].id,
                    quantity: state.arrLayanan[i].quantity,
                  };
                  services.push(obj);
                }
              }

              let body = {
                service_category_id: props.route.params.item.id,
                time,
                services,
              };
              postServiceOrdersConfirmation(body)
                .then((response) => {
                  console.log(response);
                  setState((state: any) => ({
                    ...state,
                    subTotal: response.data.total_price,
                    admin: response.data.admin_price,
                    grandTotal: response.data.total_price + response.data.admin_price,
                    content: 'confrim',
                    unit: response.data.unit,
                    user: response.data.user,
                    title: 'Konfirmasi Pesanan',
                  }));

                  /*const self = this
                  setTimeout(function () {
                    self.scroll.scrollTo({x: 0, y: 0, animated: true});
                  }, 10);*/
                })
                .catch((error) => {
                  console.log(error);
                  // @ts-expect-error TS(2304): Cannot find name 'alert'.
                  alert(error.data.message);
                });
            }}
            style={[styles.touchKirim, { flex: 1, backgroundColor: '#5AAA0F' }]}
          >
            <CustomText textType={'semibold'} style={styles.textKirim}>
              Selanjutnya
            </CustomText>
          </TouchableOpacity>
        ) : (
          <View style={[styles.touchKirim, { flex: 1, backgroundColor: '#CCCFC9' }]}>
            <CustomText textType={'semibold'} style={styles.textKirim}>
              Selanjutnya
            </CustomText>
          </View>
        )}
      </View>
    );
  };

  const renderItemDetail = ({ item, index }: any) => {
    if (item.quantity >= 1) {
      return (
        <View>
          <View style={styles.detailRow}>
            <CustomText
              numberOfLines={2}
              ellipsizeMode="tail"
              textType={'semibold'}
              style={[
                styles.textNameDetail,
                {
                  color: state.darkMode ? 'white' : '#383B34',
                },
              ]}
            >
              {item.name}
            </CustomText>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: toDp(20),
              paddingBottom: toDp(16),
              alignItems: 'center',
            }}
          >
            <CustomText
              style={[styles.textQtyDetail, { color: state.darkMode ? 'white' : '#9B9F95' }]}
            >
              {item.quantity + 'x'}
            </CustomText>
            <CustomText
              style={[styles.textPriceDetail, { color: state.darkMode ? 'white' : '#383B34' }]}
            >
              {'Rp ' + convert(item.price)}
            </CustomText>
          </View>
          <View
            style={[
              styles.lineDetail,
              { marginBottom: toDp(8), backgroundColor: state.darkMode ? '#121212' : '#EEEEEE' },
            ]}
          />
        </View>
      );
    }
  };

  const getPPN = () => {
    let ppn = (state.admin * 100) / state.subTotal;
    return ppn;
  };

  const renderFooterDetail = () => {
    return (
      <View>
        <View style={[styles.detailRow, { paddingBottom: toDp(8) }]}>
          <CustomText
            textType={'semibold'}
            style={[styles.textSubTotal, { color: state.darkMode ? 'white' : '#383B34' }]}
          >
            Sub Total
          </CustomText>
          <CustomText
            textType={'semibold'}
            style={[
              styles.textPriceDetail,
              { fontWeight: '700', color: state.darkMode ? 'white' : '#383B34' },
            ]}
          >
            {'Rp ' + convert(state.subTotal)}
          </CustomText>
        </View>
        {/*<View style={[styles.detailRow, {paddingVertical: toDp(0)}]}>
          <CustomText textType={'regular'} style={[styles.textNameDetail, {color: state.darkMode ? 'white' : '#383B34'}]}>PPN {getPPN()}%</CustomText>
          <CustomText textType={'semibold'} style={[styles.textPriceDetail, {fontWeight: '700', color: state.darkMode ? 'white' : '#383B34'}]}>{'Rp ' + convert(state.admin)}</CustomText>
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
            style={[styles.textSubTotal, { color: state.darkMode ? 'white' : '#383B34' }]}
          >
            Grand Total
          </CustomText>
          <CustomText
            textType={'semibold'}
            style={[
              styles.textPriceDetail,
              { fontWeight: '700', color: state.darkMode ? 'white' : '#383B34' },
            ]}
          >
            {'Rp ' + convert(state.grandTotal)}
          </CustomText>
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
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: toDp(20),
            marginRight: toDp(8),
            marginTop: toDp(20),
            alignItems: 'center',
            paddingBottom: toDp(20),
          }}
        >
          <CustomText
            textType={'semibold'}
            style={[styles.textPukul, { color: state.darkMode ? 'white' : '#9B9F95' }]}
          >
            LAYANAN
          </CustomText>
          <TouchableOpacity
            onPress={() => {
              setState((state: any) => ({ ...state, content: 'form' }));
            }}
            style={{
              width: toDp(61),
              height: toDp(20),
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CustomText textType={'semibold'} style={{ color: '#5AAA0F' }}>
              Ubah
            </CustomText>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.viewFormLayanan,
            { backgroundColor: state.darkMode ? '#1C1C1E' : 'white', paddingBottom: toDp(16) },
          ]}
        >
          <FlatList
            data={state.arrLayanan}
            renderItem={renderItemDetail as any}
            ListFooterComponent={() => renderFooterDetail()}
          />
        </View>
      </View>
    );
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
              { backgroundColor: state.isDarkMode ? '#121212' : 'white', height: toDp(240) },
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
              Pesanan akan terhapus jika Anda membatalkan. Apakah Anda yakin ingin membatalkan
              pesanan jasa ini?
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
              <TouchableOpacity style={styles.touchYa} onPress={() => props.navigation.goBack()}>
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

  const renderFooterConfirm = () => {
    return (
      <View
        style={[
          styles.footerConfirm,
          {
            backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
            borderTopColor: state.darkMode ? '#1C1C1E' : '#EEEEEE',
          },
        ]}
      >
        <View style={styles.viewFooterConfrim}>
          <TouchableOpacity
            onPress={() => {
              if (true) {
                setState((state: any) => ({ ...state, loadingDialog: true }));
                if (true) {
                  let tanggal = moment(state.responseDate).format('YYYY-MM-DD');
                  //let jam = moment(state.responseTime).format('LTS').replace('.',':').replace('.',':')
                  let jam = state.responseTime.replace('.', ':');
                  let time = '' + tanggal + 'T' + (jam + ':00') + '.000Z';

                  let services = [];
                  for (var i = 0; i < state.arrLayanan.length; i++) {
                    if (state.arrLayanan[i].quantity >= 1) {
                      let obj = {
                        id: state.arrLayanan[i].id,
                        quantity: state.arrLayanan[i].quantity,
                      };
                      services.push(obj);
                    }
                  }

                  let body = {
                    service_category_id: props.route.params.item.id,
                    note: state.catatan,
                    time,
                    services,
                  };

                  const self = this;
                  postServiceOrdersCreate(body)
                    .then((response) => {
                      console.log('MASUK THEN');

                      console.log(response);
                      setState((prevState: any) => ({
                        ...prevState,
                        loadingDialog: false,
                        isShowSuccessModal: true,
                        idOrder: response.data.service_order.id,
                      }));
                    })
                    .catch((error) => {
                      console.log('MASUK CATCH');
                      Alert.alert(
                        'Pesan Jasa',
                        '' + error.data.message,
                        [
                          {
                            text: 'OK',
                            onPress: () => {
                              setState((state: any) => ({ ...state, loadingDialog: false }));
                            },
                          },
                        ],
                        { cancelable: false },
                      );

                      console.log(error);
                    });
                }
              } else {
                // @ts-expect-error TS(2304): Cannot find name 'alert'.
                alert('Koneksi Internet tidak stabil. Mohon dicoba kembali');
              }
            }}
            style={styles.touchPesan}
          >
            <CustomText textType={'semibold'} style={styles.textKirim}>
              Pesan Jasa
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderModalSuccess = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={state.isShowSuccessModal}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View style={[styles.modalBox, { alignItems: 'center' }]}>
            <Image source={allLogo.icSuccess} style={styles.icSuccess} />
            <CustomText
              textType="semibold"
              style={{ fontSize: toDp(16), color: '#263238', marginTop: toDp(24) }}
            >
              PESANAN JASA BERHASIL
            </CustomText>
            <CustomText
              style={{
                fontSize: toDp(14),
                color: '#263238',
                marginTop: toDp(10),
                textAlign: 'center',
              }}
            >
              Pesanan jasa Anda akan segera direspon oleh pengelola
            </CustomText>
            <TouchableOpacity
              onPress={() => {
                setState((prevState: any) => ({ ...prevState, isShowSuccessModal: false }));
                props.navigation.goBack();
                props.route.params.setContentPesanan();
              }}
              style={{
                width: toDp(180),
                height: toDp(40),
                marginTop: toDp(20),
                backgroundColor: '#5AAA0F',
                borderRadius: toDp(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CustomText textType="semibold" style={{ fontSize: toDp(14), color: 'white' }}>
                Okay
              </CustomText>
            </TouchableOpacity>
            <View style={{ height: toDp(16) }} />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : (null as any)}
        style={styles.container}
      >
        {renderModalConfirmation()}
        {renderModalSuccess()}
        <Header
          title={state.title}
          onPress={() => {
            setState((prevState: any) => ({ ...prevState, isShowModalConfirm: true }));
          }}
        />
        <ScrollView
          style={[styles.scrollView, { backgroundColor: state.darkMode ? '#121212' : '#F6F7F8' }]}
        >
          <View
            style={[styles.content, { backgroundColor: state.darkMode ? '#121212' : '#F6F7F8' }]}
          >
            {state.content === 'form' ? renderDate() : renderKontak()}
            {state.content === 'form' ? renderLayanan() : renderDetails()}

            {state.content === 'form' ? <View /> : renderCatatan()}
          </View>
        </ScrollView>
        {state.content === 'form' ? renderFooter() : renderFooterConfirm()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headeriOS: {
    width,
    height: toDp(20),
    backgroundColor: '#5AAA0F',
  },
  scrollView: {},
  content: {
    flex: 1,
    //padding: toDp(16)
  },
  viewInfo: {
    padding: toDp(20),
  },
  textTitle: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Bold',
    color: '#263238',
    letterSpacing: toDp(0.5),
  },
  img: {
    width: toDp(300),
    height: toDp(162),
    borderRadius: toDp(4),
    marginTop: toDp(20),
    //marginRight: toDp(10),
  },
  viewItem: {
    marginTop: toDp(20),
  },
  textField: {
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    color: '#788f9c',
  },
  textValue: {
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    color: '#000000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width,
    height: 'auto',
    borderTopWidth: toDp(1),
  },
  footerConfirm: {
    width,
    height: 'auto',
    borderTopWidth: toDp(1),
  },

  touchKirim: {
    width: toDp(150),
    height: toDp(40),
    backgroundColor: '#d3d6db',
    margin: toDp(16),
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKirim: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-SemiBold',
    color: 'white',
    fontStyle: 'normal',
    letterSpacing: toDp(0.7),
  },
  textEstimase: {
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
  },
  textHarga: {
    marginTop: toDp(2),
    fontSize: toDp(16),
    //fontFamily: 'Montserrat-SemiBold',
  },
  red: {
    color: '#f5493c',
  },
  textPukul: {
    fontSize: toDp(16),
    //fontFamily: 'Montserrat-Bold',
    //letterSpacing: toDp(0.5),
    //textTransform:'uppercase'
  },
  icVendor: {
    width: toDp(14),
    height: toDp(16),
    marginRight: toDp(6),
  },
  viewForm: {
    marginTop: toDp(16),
    width: '100%',
    height: 'auto',
    padding: toDp(16),
    borderRadius: toDp(4),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewValueForm: {
    width: '100%',
    height: toDp(40),
    borderRadius: toDp(4),
    borderWidth: toDp(1),
    borderColor: '#D8D8D8',
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTime: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
  },
  icCalendar: {
    width: toDp(20),
    height: toDp(20),
    marginLeft: toDp(12),
    marginRight: toDp(16),
  },
  icCalendar2: {
    width: toDp(20),
    height: toDp(20),
  },
  viewFormLayanan: {
    //marginTop: toDp(16),
    width: '100%',
    height: 'auto',
    //paddingHorizontal: toDp(12),
    /*borderRadius: toDp(4),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,*/
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  textName: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Bold',
    letterSpacing: toDp(0.5),
    marginTop: toDp(12),
    marginHorizontal: toDp(12),
  },
  viewUbah: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  touchUbah: {
    width: toDp(42),
    height: toDp(24),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#5AAA0F',
    borderWidth: toDp(1),
    borderRadius: toDp(2),
  },
  textUbah: {
    fontSize: toDp(10),
    //fontFamily: 'Montserrat-SemiBold',
    letterSpacing: toDp(0.5),
    color: '#5AAA0F',
  },
  textDesc: {
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    //letterSpacing: toDp(0.5),
    marginHorizontal: toDp(12),
    marginTop: toDp(6),
  },
  textVendor: {
    fontSize: toDp(12),
    //letterSpacing: toDp(0.5),
    marginTop: toDp(4),
    marginLeft: toDp(12),
  },
  textPrice: {
    //fontFamily: 'Montserrat-Regular',
    //fontWeight: 'bold',
    fontSize: toDp(12),
    letterSpacing: toDp(0.5),
    width: width * 0.84,
  },
  line: {
    width: '100%',
    height: toDp(1),
    backgroundColor: '#EEEEEE',
    marginTop: toDp(12),
  },
  viewPrice: {
    width: '100%',
    height: toDp(24),
    //marginTop: toDp(-16),
    //backgroundColor: '#121212',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textQty: {
    textAlign: 'center',
    width: toDp(28),
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    letterSpacing: toDp(0.5),
    marginRight: toDp(20),
    marginLeft: toDp(10),
  },
  touchMinPlus: {
    width: toDp(24),
    height: toDp(24),
    marginRight: toDp(12),
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textMinPlus: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
    letterSpacing: toDp(0.5),
    color: '#5AAA0F',
    marginLeft: Platform.OS === 'ios' ? toDp(1) : 0,
  },
  viewFooterConfrim: {
    marginHorizontal: toDp(16),
    marginTop: toDp(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touchKembali: {
    width: toDp(124),
    height: toDp(40),
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchPesan: {
    width: '100%',
    //width: toDp(193),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: toDp(16),
  },
  icBack: {
    width: toDp(20),
    height: toDp(20),
    marginRight: toDp(8),
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
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    fontWeight: '500',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: toDp(20),
    alignItems: 'center',
  },
  lineDetail: {
    width: '100%',
    height: toDp(1),
    backgroundColor: '#EEEEEE',
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
    marginTop: toDp(8),
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    fontStyle: 'italic',
  },
  textSubTotal: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    fontWeight: '700',
  },
  textCatatanIOS: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    color: 'red',
    marginTop: toDp(8),
    marginBottom: toDp(8),
  },
  lineIOS: {
    height: toDp(1),
    backgroundColor: '#788F9C',
    marginBottom: toDp(24),
  },
  bottomModal: {
    justifyContent: 'center',
    margin: 0,
  },
  viewRootModal: {
    width,
    alignItems: 'center',
    //position: 'absolute',
    //bottom: 0
  },
  modalBox: {
    width: '90%',
    height: 'auto',
    backgroundColor: '#FFFFFF',
    borderRadius: toDp(8),
    padding: toDp(16),
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewCenter: {
    width,
    alignItems: 'center',
  },
  lineModal: {
    width: toDp(64),
    height: toDp(4),
    backgroundColor: '#d3d6db',
    borderRadius: toDp(7),
    marginTop: toDp(15),
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
    //fontFamily: 'Montserrat-Bold',
    fontSize: toDp(14),
    letterSpacing: toDp(2),
    color: '#263238',
  },
  touchSilang: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(16),
    top: toDp(16),
    zIndex: 1,
  },
  icSilang: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#5AAA0F',
  },
  touchOk: {
    width: '100%',
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: toDp(16),
  },
  textApakah: {
    marginTop: toDp(16),
    marginHorizontal: toDp(16),
    textAlign: 'center',
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    color: '#263238',
    letterSpacing: toDp(0.6),
  },

  // touchTidak: {
  //   width: toDp(80),
  //   height: toDp(30),
  //   backgroundColor: '#5AAA0F',
  //   borderRadius: toDp(4),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // textTidak: {
  //   fontSize: toDp(14),
  //   //fontFamily: 'Montserrat-SemiBold',
  //   color: '#FFFFFF',
  //   letterSpacing: toDp(0.7),
  // },
  // touchYa: {
  //   width: toDp(125),
  //   height: toDp(30),
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // textYa: {
  //   fontSize: toDp(14),
  //   //fontFamily: 'Montserrat-SemiBold',
  //   color: '#5AAA0F',
  //   letterSpacing: toDp(0.7),
  // },
  // modalBoxCenter: {
  //   width: width * 0.8,
  //   height: toDp(168),
  //   borderRadius: toDp(8),
  //   alignItems: 'center',
  // },
  // titleConfirm: {
  //   marginTop: toDp(24),
  //   fontSize: toDp(14),
  //   //fontFamily: 'Montserrat-Bold',
  //   color: '#263238',
  //   letterSpacing: toDp(0.7),
  // },
  viewRowModal: {
    marginTop: toDp(20),
    flexDirection: 'row',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: toDp(20),
    paddingVertical: toDp(10),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    //borderWidth: toDp(1),
    //borderColor: '#5AAA0F',
    //marginLeft: toDp(8),
    //marginRight: toDp(16),
    //flex: 1,
    width: '100%',
    borderRadius: toDp(10),
    height: toDp(40),
    backgroundColor: '#F6F7F4',
  },
  icSearch: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#9B9F95',
    marginLeft: toDp(14),
  },
  textInput: {
    marginLeft: toDp(12),
    width: '80%',
    fontSize: toDp(14),
    color: '#383B34',
    //fontFamily: 'Montserrat-Regular',
  },
  touchHeaderSearch: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(12),
  },
  icDeleteAll: {
    width: toDp(20),
    height: toDp(20),
  },
  viewFooter: {
    flex: 1,
    padding: toDp(16),
    //justifyContent: 'center',
    //alignItems: 'center'
  },
  footerLinear: {
    width,
    height: toDp(2),
    opacity: 0.2,
    position: 'absolute',
    bottom: toDp(80),
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
});

export default LayananScreen;
