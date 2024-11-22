import { useNetInfo } from '@react-native-community/netinfo';
import { allLogo } from '@src/Assets';
import CustomText from '@src/Components/CustomText';
import Empty from '@src/Components/Empty';
import NoConnection from '@src/Components/NoConnection';
import { toDp } from '@src/Helper/percentageToDP';
import {
  getNewArticle,
  getNotificationUser,
  putNotificationReaded,
  putNotificationReadedAll,
} from '@src/Services/Apis';
import moment from 'moment';
import localization from 'moment/locale/id';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import * as NavigatorService from '../../Helper/NavigatorServices';

let limit = 0;
const { width, height } = Dimensions.get('window');
const NotificationScreen = (props: any) => {
  const netInfo = useNetInfo();
  const [state, setState] = useState({
    loading: true,
    arrayData: [],
    page: 1,
    total: 0,
    totalPage: 0,
    limit: 20,
    isShowModal: false,
    isResident: props.route.params.isResident,
  });

  useEffect(() => {
    loadNotification();
  }, []);

  const loadNotification = () => {
    setState((state) => ({ ...state, loading: state.page === 1 ? true : false }));
    let params = '?page=' + state.page;
    getNotificationUser(params)
      .then((response: any) => {
        console.log(response);
        if (state.page === 1) {
          setState((state) => ({
            ...state,
            loading: false,
            arrayData: response.data.user_notifications,
            total: response.data.meta.total,
            totalPage: response.data.meta.total_page,
          }));
        } else {
          // @ts-expect-error TS(2345): Argument of type '(state: { loading: boolean; arra... Remove this comment to see the full error message
          setState((state) => ({
            ...state,
            loading: false,
            arrayData: [...state.arrayData, ...response.data.user_notifications],
          }));
        }

        console.log('state.page', state.page);

        console.log('response.data.meta.total_page', response.data.meta.total_page);
      })
      .catch((error: any) => {
        console.log(error);
        setState((state) => ({
          ...state,
          loading: false,
          arrayData: [],
        }));
      });
  };

  const replaceStringNews = (body: any) => {
    return body
      .replace(/(<([^>]+)>)/gi, '')
      .replace('&nbsp;', '')
      .replace('&nbsp;', '');
  };

  const replaceStringTime = (time: any) => {
    if (time.includes('beberapa detik')) {
      return 'Baru saja';
    } else if (time.includes('semenit')) {
      return '1mnt';
    } else if (time.includes('sejam')) {
      return '1 jam';
    } else if (time.includes('sehari')) {
      return '1 hari';
    } else if (time.includes('sebulan')) {
      return '1bln';
    } else if (time.includes('setahun')) {
      return '1thn';
    } else if (time.includes('detik')) {
      return time.split(' ')[0] + 'd';
    } else if (time.includes('menit')) {
      return time.split(' ')[0] + 'mnt';
    } else if (time.includes('jam')) {
      return time.split(' ')[0] + ' jam';
    } else if (time.includes('hari')) {
      return time.split(' ')[0] + ' hari';
    } else if (time.includes('bulan')) {
      return time.split(' ')[0] + 'bln';
    } else if (time.includes('tahun')) {
      return time.split(' ')[0] + 'thn';
    }
    return 'gagal';
  };

  const handleReadAllNotif = () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    putNotificationReadedAll()
      .then((response: any) => {
        console.log(response);
        (limit = 0),
          setState((prevState) => ({
            ...prevState,
            loading: false,
            isShowModal: false,
            total: 0,
            totalPage: 0,
            arrayData: [],
            page: 1,
          }));
        // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
        loadNotification(state.page);
      })
      .catch((error: any) => {
        console.log(error);
        setState((prevState) => ({
          ...prevState,
          loading: false,
          isShowModal: false,
        }));
      });
  };

  const touchPemberitahuan = (item: any) => {
    if (!item.is_read) {
      let data = { notification_ids: [item.notification.id] };
      putNotificationReaded(data)
        .then((response: any) => {
          console.log(response);
          (limit = 0),
            setState((state) => ({
              ...state,
              total: 0,
              totalPage: 0,
              arrayData: [],
              page: 1,
            }));
          // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
          loadNotification(state.page);
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
    console.log('item', item);
    if (item.notification.entity_type === 'comment_news_article') {
      getNewArticle('/' + item.notification.entity_id)
        .then((response: any) => {
          console.log(response);
          NavigatorService.navigate('DetailsNews', {
            id: response.data.news_article.id,
            from: 'comment_news_article',
          });
        })
        .catch((error: any) => {
          console.log(error);
          if (error.status === 404) {
            // @ts-expect-error TS(2304): Cannot find name 'alert'.
            alert('Berita tidak ditemukan.');
          } else {
            // @ts-expect-error TS(2304): Cannot find name 'alert'.
            alert(JSON.stringify(error));
          }
        });
    }
  };

  const renderNotificationNews = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => touchPemberitahuan(item)}
        activeOpacity={1}
        style={[styles.containerItem, { backgroundColor: item.is_read ? 'white' : '#F5FFE9' }]}
      >
        <Image source={allLogo.icNotifNews} style={styles.icNotif} />
        <View style={styles.viewNotifContent}>
          <View style={styles.viewNewRow}>
            <CustomText textType="regular" style={[styles.textCategoryNotif, { color: '#9B9F95' }]}>
              Berita
            </CustomText>
            <CustomText textType="regular" style={[styles.textTimeNotif, { color: '#788F9C' }]}>
              {replaceStringTime(
                // @ts-expect-error TS(2554): Expected 0-1 arguments, but got 2.
                moment(item.notification.created_at).locale('id', localization).fromNow(),
              )}
            </CustomText>
          </View>
          <CustomText
            textType="semibold"
            style={[
              styles.textTitleNotif,
              {
                fontSize:
                  item.notification.entity_additional_info === 'Pengumuman' ? toDp(13) : toDp(14),
                color: '#383B34',
              },
            ]}
          >
            {'Berita baru dengan kategori ' +
              item.notification.entity_additional_info.toLowerCase()}
          </CustomText>
          <View
            style={[
              styles.viewInfoNotif,
              {
                height: toDp(48),
                backgroundColor: '#E5F9CC',
                borderColor: '#E5F9CC',
              },
            ]}
          >
            <Image source={{ uri: item.notification.image_url }} style={styles.imgNotifComplaint} />
            <CustomText
              textType="regular"
              style={[styles.textDescNotif, { width: toDp(232), color: '#383B34' }]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {replaceStringNews(item.notification.body)}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderNotificationEmergency = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => touchPemberitahuan(item)}
        activeOpacity={1}
        style={[styles.containerItem, { backgroundColor: item.is_read ? 'white' : '#F5FFE9' }]}
      >
        <Image source={allLogo.icNotifDarurat} style={styles.icNotif} />
        <View style={styles.viewNotifContent}>
          <View style={styles.viewNewRow}>
            <CustomText textType="regular" style={[styles.textCategoryNotif, { color: '#9B9F95' }]}>
              Darurat
            </CustomText>
            <CustomText textType="regular" style={[styles.textTimeNotif, { color: '#788F9C' }]}>
              {replaceStringTime(moment(item.notification.created_at).fromNow())}
            </CustomText>
          </View>
          <CustomText textType="semibold" style={[styles.textTitleNotif, { color: '#273238' }]}>
            {item.notification.title}
          </CustomText>
          <CustomText
            textType="regular"
            style={[styles.textDescNotifComment, { color: '#383B34' }]}
          >
            {item.notification.body}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  const renderNotificationComplaints = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => touchPemberitahuan(item)}
        activeOpacity={1}
        style={[styles.containerItem, { backgroundColor: item.is_read ? 'white' : '#F5FFE9' }]}
      >
        <Image source={allLogo.icNotifComplaint} style={styles.icNotif} />
        <View style={styles.viewNotifContent}>
          <View style={styles.viewNewRow}>
            <CustomText textType="regular" style={[styles.textCategoryNotif, { color: '#9B9F95' }]}>
              Laporan
            </CustomText>
            <CustomText textType="regular" style={[styles.textTimeNotif, { color: '#788F9C' }]}>
              {replaceStringTime(moment(item.notification.created_at).fromNow())}
            </CustomText>
          </View>
          {/*<CustomText textType='semibold' style={[styles.textTitleNotif, {color: '#273238'}]}>{item.notification.title === 'Laporan telah selesai diproses' ? 'Laporan Anda sudah selesai' : 'Laporan Anda sedang diproses'}</CustomText>*/}
          <CustomText textType="semibold" style={[styles.textTitleNotif, { color: '#273238' }]}>
            {item.notification.title}
          </CustomText>
          <View
            style={[
              styles.viewInfoNotif,
              {
                height: toDp(48),
                backgroundColor: '#E5F9CC',
                borderColor: '#E5F9CC',
              },
            ]}
          >
            <Image source={{ uri: item.notification.image_url }} style={styles.imgNotifComplaint} />
            <CustomText
              textType="regular"
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[styles.textDescNotif, { width: toDp(232), color: '#273238' }]}
            >
              {/*item.notification.body === 'Petugas telah menyelesaikan Laporan' ? 'Laporan '+item.notification.complaint_report.title+' sudah diselesaikan oleh petugas' : 'Laporan '+item.notification.complaint_report.title+' sudah diproses oleh petugas'*/}
              {item.notification.body}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderNotificationCommentReport = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => touchPemberitahuan(item)}
        activeOpacity={1}
        style={[styles.containerItem, { backgroundColor: item.is_read ? 'white' : '#F5FFE9' }]}
      >
        <Image source={allLogo.icNotifComplaint} style={styles.icNotif} />
        <View style={styles.viewNotifContent}>
          <View style={styles.viewNewRow}>
            <CustomText textType="regular" style={[styles.textCategoryNotif, { color: '#9B9F95' }]}>
              Laporan
            </CustomText>
            <CustomText textType="regular" style={[styles.textTimeNotif, { color: '#788F9C' }]}>
              {replaceStringTime(moment(item.notification.created_at).fromNow())}
            </CustomText>
          </View>
          <CustomText textType="semibold" style={[styles.textTitleNotif, { color: '#273238' }]}>
            {'Komentar baru dari ' + (state.isResident ? 'pengelola' : 'penghuni')}
          </CustomText>
          <CustomText
            textType="regular"
            style={[styles.textDescNotifComment, { color: '#273238' }]}
          >
            {'Anda menerima komentar baru di laporan\n' + item.notification.complaint_report?.title}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  const renderNotificationUnit = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => touchPemberitahuan(item)}
        activeOpacity={1}
        style={[styles.containerItem, { backgroundColor: item.is_read ? 'white' : '#F5FFE9' }]}
      >
        <Image source={allLogo.icNotifUnit} style={styles.icNotif} />
        <View style={styles.viewNotifContent}>
          <View style={styles.viewNewRow}>
            <CustomText textType="regular" style={[styles.textCategoryNotif, { color: '#9B9F95' }]}>
              Unit
            </CustomText>
            <CustomText textType="regular" style={[styles.textTimeNotif, { color: '#788F9C' }]}>
              {replaceStringTime(moment(item.notification.created_at).fromNow())}
            </CustomText>
          </View>
          <CustomText textType="semibold" style={[styles.textTitleNotif, { color: '#273238' }]}>
            {item.notification.title === 'Permintaan penambahan unit disetujui'
              ? 'Penambahan unit disetujui'
              : 'Penambahan unit ditolak'}
          </CustomText>
          <CustomText
            textType="regular"
            style={[styles.textDescNotifComment, { color: '#273238' }]}
          >
            {item.notification.body}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  //code here
  const renderNotificationTagihan = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => touchPemberitahuan(item)}
        activeOpacity={1}
        style={[styles.containerItem, { backgroundColor: item.is_read ? 'white' : '#F5FFE9' }]}
      >
        <Image
          source={allLogo.icNotifTagihan}
          style={[styles.icNotif, { width: toDp(15), height: toDp(15) }]}
        />
        <View style={styles.viewNotifContent}>
          <View style={styles.viewNewRow}>
            <CustomText textType="regular" style={[styles.textCategoryNotif, { color: '#9B9F95' }]}>
              Tagihan
            </CustomText>
            <CustomText textType="regular" style={[styles.textTimeNotif, { color: '#788F9C' }]}>
              {replaceStringTime(moment(item.notification.created_at).fromNow())}
            </CustomText>
          </View>
          <CustomText textType="semibold" style={[styles.textTitleNotif, { color: '#273238' }]}>
            {item.notification.title}
          </CustomText>
          <CustomText
            textType="regular"
            style={[styles.textDescNotifComment, { color: '#273238' }]}
          >
            {item.notification.body}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  const renderNotificationServices = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => touchPemberitahuan(item)}
        activeOpacity={1}
        style={[styles.containerItem, { backgroundColor: item.is_read ? 'white' : '#F5FFE9' }]}
      >
        <Image source={allLogo.icNotifJasa} style={styles.icNotif} />
        <View style={styles.viewNotifContent}>
          <View style={styles.viewNewRow}>
            <CustomText textType="regular" style={[styles.textCategoryNotif, { color: '#9B9F95' }]}>
              Jasa
            </CustomText>
            <CustomText textType="regular" style={[styles.textTimeNotif, { color: '#788F9C' }]}>
              {replaceStringTime(moment(item.notification.created_at).fromNow())}
            </CustomText>
          </View>
          {/*<CustomText textType='semibold' style={[styles.textTitleNotif, { color: '#273238' }]}>{item.notification.title === 'Layanan Diproses' ? 'Pesanan jasa Anda sedang diproses' : item.notification.title === 'Layanan Telah Selesai Diproses' ? 'Pesanan jasa Anda sudah selesai' : 'Pesanan jasa Anda belum tersedia'}</CustomText>*/}
          <CustomText textType="semibold" style={[styles.textTitleNotif, { color: '#273238' }]}>
            {item.notification.title}
          </CustomText>
          <View
            style={[
              styles.viewInfoNotif,
              {
                height: toDp(48),
                backgroundColor: '#E5F9CC',
                borderColor: '#E5F9CC',
              },
            ]}
          >
            {item.notification.image_url !== '' && (
              <View style={styles.viewImageServices}>
                <Image source={{ uri: item.notification.image_url }} style={styles.imgNotifImage} />
              </View>
            )}

            {/*<CustomText textType='regular'
              style={[styles.textDescNotif, { width: toDp(232), color: '#273238' }]}
            >{item.notification.body === 'Pengelola memproses layanan' ? 'Pesanan jasa AC sedang diproses oleh petugas' : item.notification.body === 'Pengelola menyelesaikan layanan' ? 'Pesanan jasa AC sudah diselesaikan oleh petugas' : 'Mohon maaf, Pesanan jasa anda belum tersedia'}</CustomText>*/}
            <CustomText
              textType="regular"
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[styles.textDescNotif, { width: toDp(232), color: '#273238' }]}
            >
              {item.notification.body}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderNotificationProduct = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => touchPemberitahuan(item)}
        activeOpacity={1}
        style={[styles.containerItem, { backgroundColor: item.is_read ? 'white' : '#F5FFE9' }]}
      >
        <Image source={allLogo.icNotifJasa} style={styles.icNotif} />
        <View style={styles.viewNotifContent}>
          <View style={styles.viewNewRow}>
            <CustomText textType="regular" style={[styles.textCategoryNotif, { color: '#9B9F95' }]}>
              Market
            </CustomText>
            <CustomText textType="regular" style={[styles.textTimeNotif, { color: '#788F9C' }]}>
              {replaceStringTime(moment(item.notification.created_at).fromNow())}
            </CustomText>
          </View>
          {/*<CustomText textType='semibold' style={[styles.textTitleNotif, { color: '#273238' }]}>{item.notification.title === 'Layanan Diproses' ? 'Pesanan jasa Anda sedang diproses' : item.notification.title === 'Layanan Telah Selesai Diproses' ? 'Pesanan jasa Anda sudah selesai' : 'Pesanan jasa Anda belum tersedia'}</CustomText>*/}
          <CustomText textType="semibold" style={[styles.textTitleNotif, { color: '#273238' }]}>
            {item.notification.title}
          </CustomText>
          <View
            style={[
              styles.viewInfoNotif,
              {
                height: toDp(48),
                backgroundColor: '#E5F9CC',
                borderColor: '#E5F9CC',
              },
            ]}
          >
            {item.notification.image_url !== '' && (
              <View style={styles.viewImageServices}>
                <Image source={{ uri: item.notification.image_url }} style={styles.imgNotifImage} />
              </View>
            )}

            {/*<CustomText textType='regular'
              style={[styles.textDescNotif, { width: toDp(232), color: '#273238' }]}
            >{item.notification.body === 'Pengelola memproses layanan' ? 'Pesanan jasa AC sedang diproses oleh petugas' : item.notification.body === 'Pengelola menyelesaikan layanan' ? 'Pesanan jasa AC sudah diselesaikan oleh petugas' : 'Mohon maaf, Pesanan jasa anda belum tersedia'}</CustomText>*/}
            <CustomText
              textType="regular"
              numberOfLines={2}
              ellipsizeMode="tail"
              style={[styles.textDescNotif, { width: toDp(232), color: '#273238' }]}
            >
              {item.notification.body}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderNotificationCommentNews = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => touchPemberitahuan(item)}
        activeOpacity={1}
        style={[styles.containerItem, { backgroundColor: item.is_read ? 'white' : '#F6F6F2' }]}
      >
        <Image source={allLogo.icNotifNews} style={styles.icNotif} />
        <View style={styles.viewNotifContent}>
          <View style={styles.viewNewRow}>
            <CustomText textType="regular" style={[styles.textCategoryNotif, { color: '#9B9F95' }]}>
              Berita
            </CustomText>
            <CustomText textType="regular" style={[styles.textTimeNotif, { color: '#788F9C' }]}>
              {replaceStringTime(moment(item.notification.created_at).fromNow())}
            </CustomText>
          </View>
          <CustomText textType="semibold" style={[styles.textTitleNotif, { color: '#273238' }]}>
            {'Komentar baru dari penghuni'}
          </CustomText>

          <View
            style={[
              styles.viewInfoNotif,
              {
                height: toDp(48),
                backgroundColor: '#E5F9CC',
                borderColor: '#E5F9CC',
              },
            ]}
          >
            {item.notification.image_url && (
              <Image
                source={{ uri: item.notification.image_url }}
                style={styles.imgNotifComplaint}
              />
            )}
            <CustomText
              textType="regular"
              style={[styles.textDescNotif, { width: toDp(232), color: '#273238' }]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {'Anda menerima komentar baru dari penghuni diberita ' +
                item.notification.entity_additional_info}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item, index }: any) => {
    if (item.notification.entity_type === 'news') {
      return renderNotificationNews(item);
    } else if (item.notification.entity_type === 'emergency') {
      return renderNotificationEmergency(item);
    } else if (item.notification.entity_type === 'complaint') {
      return renderNotificationComplaints(item);
    } else if (item.notification.entity_type === 'comment_complaint_report') {
      return renderNotificationCommentReport(item);
    } else if (item.notification.entity_type === 'comment_news_article') {
      return renderNotificationCommentNews(item);
    } else if (item.notification.entity_type === 'service') {
      return renderNotificationServices(item);
    } else if (item.notification.entity_type === 'unit') {
      return renderNotificationUnit(item);
    } else if (item.notification.entity_type === 'tagihan') {
      return renderNotificationTagihan(item);
    } else if (item.notification.entity_type === 'product') {
      return renderNotificationProduct(item);
    }
  };

  const renderFooter = () => {
    return (
      <View style={{ height: toDp(136), backgroundColor: 'white' }}>
        <ActivityIndicator size="large" color={'#5AAA0F'} style={{ marginVertical: toDp(24) }} />
      </View>
    );
  };

  const ModalReadAllView = () => {
    return (
      <Modal
        onSwipeComplete={() => setState((prevState) => ({ ...prevState, isShowModal: false }))}
        swipeDirection={['down']}
        onBackdropPress={() => setState((prevState) => ({ ...prevState, isShowModal: false }))}
        isVisible={state.isShowModal}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View
            style={[styles.modalBox, { backgroundColor: props.darkMode ? '#121212' : 'white' }]}
          >
            <View style={styles.lineCenter}>
              <View style={styles.lineModal} />
            </View>

            <View style={styles.viewModalTitle}>
              <CustomText
                textType="semibold"
                style={[styles.textTitleModal, { color: props.darkMode ? 'white' : '#263238' }]}
              >
                TANDAI
              </CustomText>
            </View>

            <View style={styles.viewArrayStatus}>
              <TouchableOpacity
                style={styles.touchTanbah}
                onPress={() => {
                  handleReadAllNotif();
                }}
              >
                <CustomText textType="semibold" style={styles.textTambah}>
                  Tandai Semua Telah Dibaca
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <View
        style={[
          styles.header,
          {
            backgroundColor: props.darkMode ? '#1C1C1E' : 'white',
            borderBottomColor: props.darkMode ? '#1C1C1E' : '#9B9F95',
          },
        ]}
      >
        <TouchableOpacity style={styles.touchHeader} onPress={() => props.navigation.goBack()}>
          <Image
            source={allLogo.icBack}
            style={[styles.icBack, { tintColor: props.darkMode ? 'white' : '#383B34' }]}
          />
        </TouchableOpacity>

        <View style={styles.linearHeader}>
          <CustomText textType="medium" style={[styles.title]}>
            {'Pemberitahuan'}
          </CustomText>
        </View>

        {
          <TouchableOpacity
            style={styles.touchHeaderSearch}
            onPress={() => setState((prevState) => ({ ...prevState, isShowModal: true }))}
          >
            <Image
              source={allLogo.icMenuDot}
              style={[styles.icFilter, { tintColor: props.darkMode ? 'white' : '#383B34' }]}
            />
          </TouchableOpacity>
        }
      </View>
      {ModalReadAllView()}
      <View style={styles.content}>
        {!netInfo.isConnected ? (
          <NoConnection />
        ) : state.loading ? (
          <ActivityIndicator size="large" color={'#5AAA0F'} style={{ marginVertical: toDp(24) }} />
        ) : state.arrayData.length === 0 ? (
          <Empty title={'Belum ada pemberitahuan baru'} images={allLogo.imgEmptyNotification} />
        ) : (
          <ScrollView
            removeClippedSubviews={true}
            ref={(c: any) => {
              // @ts-expect-error TS(2304): Cannot find name 'scroll'.
              scroll = c;
            }}
            refreshControl={
              <RefreshControl
                refreshing={state.loading}
                onRefresh={() => {
                  (limit = 0),
                    setState((state) => ({
                      ...state,
                      total: 0,
                      totalPage: 0,
                      arrayData: [],
                      page: 1,
                    }));
                  // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
                  loadNotification(state.page);
                }}
              />
            }
            onMomentumScrollEnd={(e: any) => {
              let paddingToBottom =
                // @ts-expect-error TS(2339): Property 'activeSearch' does not exist on type '{ ... Remove this comment to see the full error message
                state.activeSearch && state.searchValue !== '' ? toDp(99) : toDp(127);
              paddingToBottom += e.nativeEvent.layoutMeasurement.height;
              if (
                e.nativeEvent.contentOffset.y >=
                e.nativeEvent.contentSize.height - paddingToBottom
              ) {
                let page = state.page++;
                // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
                loadNotification(page);
                limit += state.limit;
              }
            }}
          >
            <FlatList
              removeClippedSubviews={true}
              keyExtractor={(item: any, index: any) => item.id}
              data={state.loading ? ['', '', '', '', ''] : state.arrayData}
              // @ts-expect-error TS(2304): Cannot find name 'renderItemShimmer'.
              renderItem={state.loading ? renderItemShimmer : renderItem}
              ListHeaderComponent={() => (
                <View
                  style={{ height: toDp(1), backgroundColor: props.darkMode ? '#121212' : 'white' }}
                />
              )}
              ItemSeparatorComponent={() => (
                <View
                  style={[styles.line, { backgroundColor: props.darkMode ? '#1C1C1E' : '#f5f7f8' }]}
                />
              )}
              ListFooterComponent={
                state.loading && state.page < state.totalPage ? (
                  renderFooter()
                ) : (
                  <View
                    style={{
                      height: toDp(0),
                      backgroundColor: props.darkMode ? '#121212' : 'white',
                    }}
                  />
                )
              }
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F7F4',
  },

  containerItem: {
    width,
    height: 'auto',
    flexDirection: 'row',
    padding: toDp(16),
  },
  line: {
    width,
    height: toDp(2),
    backgroundColor: '#f5f7f8',
  },
  imgPicture: {
    width: toDp(60),
    height: toDp(60),
    borderRadius: toDp(4),
    marginRight: toDp(16),
  },
  itemTitle: {
    //width: toDp(175),
    width: toDp(256),

    fontSize: toDp(14),
    color: '#273238',
  },
  viewStatus: {
    marginTop: toDp(12),
    //marginLeft: toDp(16),
    height: toDp(25),
    borderRadius: toDp(11),
    backgroundColor: '#917438',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStatus: {
    fontSize: toDp(12),
    color: '#FFFFFF',
  },
  textTime: {
    fontSize: toDp(12),
    color: '#99abb5',

    position: 'absolute',
    right: toDp(12),
    bottom: toDp(22),
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: toDp(68),
  },
  viewRow: {
    width: '100%',
    flexDirection: 'row',
    //paddingHorizontal: toDp(20),
    paddingTop: toDp(16),
  },
  imgPictureCircle: {
    width: toDp(50),
    height: toDp(50),
    borderRadius: toDp(25),
    marginRight: toDp(12),
  },
  viewImage: {
    width: toDp(60),
    height: toDp(60),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: toDp(16),
  },
  icNotifSos: {
    width: toDp(44.86),
    height: toDp(43.22),
  },
  itemRow: {
    width: '87%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewRowItem: {
    flexDirection: 'row',
    marginTop: toDp(8),
    alignItems: 'center',
  },
  icUser: {
    width: toDp(16),
    height: toDp(16),
    marginRight: toDp(8),
  },
  icPhone2: {
    width: toDp(16),
    height: toDp(16),
  },
  text: {
    fontSize: toDp(12),
    color: '#000000',

    letterSpacing: 0,
  },
  // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
  textStatus: {
    fontSize: toDp(12),
    color: '#FFFFFF',
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
  icServiceAc: {
    width: toDp(45.47),
    height: toDp(29.68),
    resizeMode: 'contain',
  },
  textNameUhit: {
    width: width * 0.7,
    fontSize: toDp(12),
    color: '#000000',

    marginTop: toDp(8),
  },
  viewRoot: {
    flexDirection: 'row',
    backgroundColor: 'cyan',
    width: 100,
    height: toDp(100),
  },
  icNotif: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#5AAA0F',
  },
  viewNewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textCategoryNotif: {
    fontSize: toDp(12),
    color: '#828282',

    fontWeight: '600',
  },
  textTimeNotif: {
    fontSize: toDp(12),
    color: '#788F9C',

    fontWeight: '400',
  },
  textTitleNotif: {
    fontSize: toDp(14),
    color: '#273238',

    fontWeight: '600',
    marginTop: toDp(2),
  },
  viewNotifContent: {
    width: '92%',
    marginLeft: toDp(8),
  },
  viewInfoNotif: {
    width: toDp(300),
    height: toDp(30),
    backgroundColor: '#E5F9CC',
    borderWidth: toDp(0.5),
    borderColor: '#91743833',
    borderRadius: toDp(4),
    marginTop: toDp(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgNotif: {
    width: toDp(30),
    height: toDp(30),
    borderTopLeftRadius: toDp(4),
    borderBottomLeftRadius: toDp(4),
    marginLeft: toDp(-0.5),
  },
  imgNotifComplaint: {
    width: toDp(48),
    height: toDp(48),
    borderTopLeftRadius: toDp(4),
    borderBottomLeftRadius: toDp(4),
  },
  textDescNotif: {
    fontSize: toDp(12),
    color: '#273238',

    fontWeight: '400',
    marginHorizontal: toDp(10),
    width: toDp(254),
  },
  textDescNotifComment: {
    fontSize: toDp(12),
    color: '#273238',

    fontWeight: '400',
    marginTop: toDp(4),
  },
  viewImageServices: {
    width: toDp(46),
    height: toDp(46),
    borderTopLeftRadius: toDp(4),
    borderBottomLeftRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imgNotifServices: {
    width: toDp(20),
    height: toDp(20),
    resizeMode: 'contain',
    tintColor: '#5AAA0F',
  },
  imgNotifServicesNew: {
    width: toDp(20),
    height: toDp(20),
    resizeMode: 'contain',
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
    width: toDp(20),
    height: toDp(20),
    tintColor: '#5AAA0F',
    resizeMode: 'contain',
  },
  title: {
    color: '#383B34',
    fontSize: toDp(18),
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
    height: toDp(150),
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
    fontSize: toDp(16),
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
  touchTanbah: {
    width: '100%',
    height: toDp(40),
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTambah: {
    fontSize: toDp(14),
    color: '#5AAA0F',
    letterSpacing: toDp(0.7),
  },
  imgNotifImage: {
    width: toDp(48),
    height: toDp(48),
    borderRadius: toDp(2),
  },
});

export default NotificationScreen;
