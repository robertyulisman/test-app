import { useNetInfo } from '@react-native-community/netinfo';
import { allLogo } from '@src/Assets';
import CustomImageView from '@src/Components/CustomImageView';
import CustomText from '@src/Components/CustomText';
import CustomTextArea from '@src/Components/CustomTextArea';
import NoConnection from '@src/Components/NoConnection';
import ViewMoreText from '@src/Components/ViewMoreText';
import { toDp } from '@src/Helper/percentageToDP';
import { getDetailsComplaints, postComplainsCancel, postComplainsStatus } from '@src/Services/Apis';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import Modal from 'react-native-modal';
import { database } from '../../Configs/firebase';
import * as NavigatorService from '../../Helper/NavigatorServices';
import styles from './stylesDetails';

const DetailsReportScreen = (props: any) => {
  const netInfo = useNetInfo();
  const [state, setState] = useState({
    isImageViewVisible: false,
    images: [],
    imageIndex: 0,
    darkMode: false,
    loading: true,
    modalVisible: false,
    textTitleModal: '',
    tanggapan: '',
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    loading: true,
    detailsReport: {},

    isImageViewVisibleProses: false,
    imageIndexProses: 0,
    imagesProses: [],

    isImageViewVisibleSelesai: false,
    imageIndexSelesai: 0,
    imagesSelesai: [],

    isShowModalConfirm: false,
    hide: true,
  });

  useEffect(() => {
    database.ref('/hide').on('value', (querySnapShot) => {
      console.log('querySnapShot.val()', querySnapShot.val());
      setState((state) => ({ ...state, hide: querySnapShot.val() }));
    });
  }, []);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    getDetailsComplaints('/' + props.route.params.item.id)
      .then((response: any) => {
        console.log(response);
        let images: any = [];
        let imagesProses: any = [];
        let imagesSelesai: any = [];
        response.data.complaint_report.complaint_report_images.map((data: any, index: any) => {
          images.push({
            uri: data.image_url,
            title: '',
            width: toDp(400),
          });
        });
        response.data.complaint_report.complaint_report_responses.map((data: any, index: any) => {
          if (data.complaint_status.name === 'Proses') {
            data.complaint_report_response_images.map((value: any, i: any) => {
              imagesProses.push({
                uri: value.img,
                title: '',
                width: toDp(400),
              });
            });
          } else {
            // Selesai
            data.complaint_report_response_images.map((value: any, i: any) => {
              imagesSelesai.push({
                uri: value.img,
                title: '',
                width: toDp(400),
              });
            });
          }
        });

        setState((state) => ({
          ...state,
          images,
          imagesProses,
          imagesSelesai,
          detailsReport: response.data.complaint_report,
          loading: false,
        }));
      })
      .catch((error: any) => {
        console.log(error);
        setState((state) => ({ ...state, loading: false }));
      });
  };

  const backLaporan = () => {
    props.navigation.goBack();
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
          {'Detail Laporan'}
        </CustomText>

        <View style={{ width: toDp(90), alignItems: 'flex-end' }}>
          <View style={styles.headerRow}>
            {!state.hide && (
              <TouchableOpacity
                style={styles.touchHeaderSearch}
                onPress={() => {
                  NavigatorService.navigate('Comments', {
                    dataUser: props.route.params.dataUser,
                    id: props.route.params.item.id,
                  });
                }}
              >
                <Image source={allLogo.icMessage} style={styles.icFilter} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderPelapor = () => {
    return (
      <View style={styles.viewInfo}>
        <CustomText
          textType="semibold"
          allowFontScaling={false}
          style={[styles.textTitle, { color: state.darkMode ? 'white' : '#9B9F95' }]}
        >
          PELAPOR
        </CustomText>
        <View style={styles.viewItem}>
          <CustomText
            allowFontScaling={false}
            style={[styles.textField, { color: state.darkMode ? 'white' : '#9B9F95' }]}
          >
            Nama pelapor
          </CustomText>
          <CustomText
            allowFontScaling={false}
            style={[
              styles.textValue,
              { color: state.darkMode ? 'white' : '#383B34', fontSize: toDp(14) },
            ]}
          >
            // @ts-expect-error TS(2339): Property 'user' does not exist on type '{}'.
            {state.detailsReport.user.name}
          </CustomText>
        </View>
        <View style={styles.viewItem}>
          <CustomText
            allowFontScaling={false}
            style={[styles.textField, { color: state.darkMode ? 'white' : '#9B9F95' }]}
          >
            Alamat laporan
          </CustomText>
          // @ts-expect-error TS(2339): Property 'unit' does not exist on type '{}'.
          {state.detailsReport.unit === null ? (
            <CustomText
              allowFontScaling={false}
              style={[styles.textValue, { color: state.darkMode ? 'white' : '#383B34' }]}
            >
              {'-'}
            </CustomText>
          ) : (
            <CustomText
              allowFontScaling={false}
              style={[styles.textValue, { color: state.darkMode ? 'white' : 'black' }]}
            >
              // @ts-expect-error TS(2339): Property 'unit' does not exist on type '{}'.
              {state.detailsReport.unit.code + '/' + state.detailsReport.unit.unit_name}
            </CustomText>
          )}
        </View>
        <View style={styles.viewItem}>
          <CustomText
            allowFontScaling={false}
            style={[styles.textField, { color: state.darkMode ? 'white' : '#9B9F95' }]}
          >
            Waktu laporan
          </CustomText>
          <CustomText
            allowFontScaling={false}
            style={[styles.textValue, { color: state.darkMode ? 'white' : '#383B34' }]}
          >
            // @ts-expect-error TS(2339): Property 'created_at' does not exist on type '{}'.
            {moment(state.detailsReport.created_at).format('dddd, DD MMMM YYYY, HH:mm:ss')}
          </CustomText>
        </View>
      </View>
    );
  };

  const valueMarginRight = (count: any, index: any) => {
    if (count >= 5) {
      return index === 0 || index === 1 || index === 2 || index === 3 ? toDp(10) : toDp(0);
    } else if (count === 4) {
      return index === 0 || index === 1 || index === 2 ? toDp(10) : toDp(0);
    } else if (count === 3) {
      return index === 0 || index === 1 ? toDp(10) : toDp(0);
    } else if (count === 2) {
      return index === 0 ? toDp(10) : toDp(0);
    } else {
      return toDp(0);
    }
  };

  const renderInfo = () => {
    return (
      <View style={styles.viewInfo}>
        <CustomText
          textType="semibold"
          allowFontScaling={false}
          style={[styles.textTitle, { color: state.darkMode ? 'white' : '#9B9F95' }]}
        >
          INFO
        </CustomText>
        <ScrollView horizontal={true}>
          // @ts-expect-error TS(2339): Property 'complaint_report_images' does not exist ... Remove
          this comment to see the full error message
          {state.detailsReport.complaint_report_images.map((data: any, index: any) => {
            if (index <= 2) {
              if (Platform.OS === 'ios') {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      setState((state) => ({
                        ...state,
                        isImageViewVisible: true,
                        imageIndex: index,
                      }))
                    }
                  >
                    <Image
                      style={[
                        styles.img,
                        {
                          width:
                            // @ts-expect-error TS(2339): Property 'complaint_report_images' does not exist ... Remove this comment to see the full error message
                            state.detailsReport.complaint_report_images.length === 1
                              ? toDp(320)
                              : toDp(300),
                          marginRight: valueMarginRight(
                            // @ts-expect-error TS(2339): Property 'complaint_report_images' does not exist ... Remove this comment to see the full error message
                            state.detailsReport.complaint_report_images.length,
                            index,
                          ),
                        },
                      ]}
                      source={{ uri: data.image_url }}
                    />
                  </TouchableOpacity>
                );
              } else {
                return (
                  <CustomImageView
                    style={[
                      styles.img,
                      {
                        width:
                          // @ts-expect-error TS(2339): Property 'complaint_report_images' does not exist ... Remove this comment to see the full error message
                          state.detailsReport.complaint_report_images.length === 1
                            ? toDp(320)
                            : toDp(300),
                        marginRight: valueMarginRight(
                          // @ts-expect-error TS(2339): Property 'complaint_report_images' does not exist ... Remove this comment to see the full error message
                          state.detailsReport.complaint_report_images.length,
                          index,
                        ),
                      },
                    ]}
                    uri={data.image_url}
                  />
                );
              }
            }
          })}
        </ScrollView>
        <ImageView
          images={state.images}
          animationType="fade"
          imageIndex={state.imageIndex}
          // @ts-expect-error TS(2322): Type '{ images: never[]; animationType: string; im... Remove this comment to see the full error message
          isVisible={state.isImageViewVisible}
          onRequestClose={() => setState((state) => ({ ...state, isImageViewVisible: false }))}
        />
        <View style={styles.viewItem}>
          <CustomText
            allowFontScaling={false}
            style={[styles.textField, { color: state.darkMode ? 'white' : '#9B9F95' }]}
          >
            Judul Laporan
          </CustomText>
          <CustomText
            allowFontScaling={false}
            style={[
              styles.textValue,
              { color: state.darkMode ? 'white' : '#383B34', fontSize: toDp(14) },
            ]}
          >
            {props.route.params.item.title}
          </CustomText>
        </View>
        <View style={styles.viewItem}>
          <CustomText
            allowFontScaling={false}
            style={[styles.textField, { color: state.darkMode ? 'white' : '#9B9F95' }]}
          >
            Label laporan
          </CustomText>
          <CustomText
            allowFontScaling={false}
            style={[styles.textValue, { color: state.darkMode ? 'white' : '#383B34' }]}
          >
            {props.route.params.item.complaint_category
              ? props.route.params.item.complaint_category.name
              : 'Tidak ada'}
          </CustomText>
        </View>
        <View style={styles.viewItem}>
          <CustomText
            allowFontScaling={false}
            style={[styles.textField, { color: state.darkMode ? 'white' : '#9B9F95' }]}
          >
            Deskripsi
          </CustomText>
          <CustomText
            allowFontScaling={false}
            style={[styles.textValue, { color: state.darkMode ? 'white' : '#383B34' }]}
          >
            {props.route.params.item.content.trim()}
          </CustomText>
        </View>
      </View>
    );
  };

  const renderStatus = (status: any) => {
    return (
      <View
        style={[
          styles.viewStatus,
          {
            borderTopColor: state.darkMode ? '#1C1C1E' : '#f5f7f8',
            borderBottomColor: state.darkMode ? '#1C1C1E' : '#f5f7f8',
          },
        ]}
      >
        <CustomText
          textType="semibold"
          allowFontScaling={false}
          style={[styles.textTitle, { color: state.darkMode ? 'white' : '#9B9F95' }]}
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
            <CustomText allowFontScaling={false} style={styles.textStatus}>
              {status}
            </CustomText>
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
                    marginLeft: status === 'Terkirim' ? toDp(-4) : toDp(-16),
                  },
                ]}
              />
              <CustomText
                textType={status === 'Terkirim' ? 'medium' : 'regular'}
                allowFontScaling={false}
                style={
                  status === 'Terkirim'
                    ? [styles.textActive, { color: status === 'Terkirim' ? '#273238' : '#788F9C' }]
                    : [styles.textNoActive, { textAlign: 'center' }]
                }
              >
                Menunggu{'\n'}Proses
              </CustomText>
            </View>
            <View style={styles.viewCenterStatus}>
              <View
                style={[
                  status === 'Proses' ? styles.sizeActive : styles.sizeNoActive,
                  {
                    backgroundColor: status === 'Proses' ? '#f2c141' : '#CCCFC9',
                    marginTop: status === 'Proses' ? toDp(-20) : toDp(-16),
                  },
                ]}
              />
              <CustomText
                textType={status === 'Proses' ? 'medium' : 'regular'}
                allowFontScaling={false}
                style={
                  status === 'Proses'
                    ? [styles.textActive, { color: status === 'Proses' ? '#273238' : '#788F9C' }]
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
                    marginTop: status === 'Selesai' ? toDp(-18) : toDp(-14),
                  },
                ]}
              />
              <CustomText
                textType={status === 'Selesai' ? 'medium' : 'regular'}
                allowFontScaling={false}
                style={
                  status === 'Selesai'
                    ? [
                        styles.textActive,
                        {
                          color: status === 'Selesai' ? '#273238' : '#788F9C',
                          marginTop: status === 'Selesai' ? toDp(10) : toDp(0),
                        },
                      ]
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

  const renderItem = ({ item, index }: any) => {
    return (
      <View>
        <View style={styles.viewItemRow}>
          <Image
            resizeMode="contain"
            source={{ uri: item.user.image_url }}
            style={styles.imgPhoto}
          />
          <View>
            <CustomText
              textType="medium"
              allowFontScaling={false}
              style={[
                styles.textName,
                { width: toDp(240), color: state.darkMode ? 'white' : '#9B9F95' },
              ]}
            >
              {item.user.name}
            </CustomText>
            <ViewMoreText
              textStyle={{
                marginTop: toDp(6),
                width: toDp(240),
              }}
              numberOfLines={3}
              renderViewMore={(onPress: any) => (
                <CustomText allowFontScaling={false} style={styles.textMore} onPress={onPress}>
                  Lihat lebih banyak
                </CustomText>
              )}
              renderViewLess={(onPress: any) => (
                <CustomText allowFontScaling={false} style={styles.textMore} onPress={onPress}>
                  Lihat lebih sedikit
                </CustomText>
              )}
            >
              <CustomText
                style={[
                  styles.textContent,
                  {
                    color: state.darkMode ? 'white' : '#000000',
                  },
                ]}
                allowFontScaling={false}
                ellipsizeMode="tail"
              >
                {item.content}
              </CustomText>
            </ViewMoreText>
            <Text
              allowFontScaling={false}
              style={[
                styles.textTime,
                { color: state.darkMode ? 'white' : '#9B9F95', marginTop: toDp(2) },
              ]}
            >
              {moment(item.created_at).format('dddd, DD MMMM YYYY, HH:mm:ss')}
            </Text>
          </View>
          <View style={styles.viewRigthTanggapan}>
            <View
              style={[
                styles.viewStatusTanggapan,
                {
                  backgroundColor:
                    item.complaint_status.name === 'Proses'
                      ? '#f2c141'
                      : item.complaint_status.name === 'Invalid'
                      ? '#6b7b83'
                      : '#28a595',
                },
              ]}
            />
          </View>
        </View>

        <ScrollView horizontal={true} style={{ marginLeft: toDp(76) }}>
          {item.complaint_report_response_images.map((data: any, index: any) => {
            if (Platform.OS === 'ios') {
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log('state', state);
                    if (item.complaint_status.name === 'Proses') {
                      setState((state) => ({
                        ...state,
                        isImageViewVisibleProses: true,
                        imageIndexProses: index,
                      }));
                    } else {
                      //Selesai
                      setState((state) => ({
                        ...state,
                        isImageViewVisibleSelesai: true,
                        imageIndexSelesai: index,
                      }));
                    }
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
                    source={{ uri: data.img }}
                  />
                </TouchableOpacity>
              );
            } else {
              return (
                <CustomImageView
                  style={[
                    styles.img,
                    {
                      width: toDp(80),
                      height: toDp(80),
                      marginRight: toDp(10),
                    },
                  ]}
                  uri={data.img}
                />
              );
            }
          })}
        </ScrollView>
      </View>
    );
  };

  const renderUlasan = () => {
    return (
      <View style={styles.viewUlasan}>
        <CustomText
          textType="semibold"
          allowFontScaling={false}
          style={[
            styles.textTitle,
            { marginLeft: toDp(20), color: state.darkMode ? 'white' : '#9B9F95' },
          ]}
        >
          TANGGAPAN
        </CustomText>
        // @ts-expect-error TS(2339): Property 'complaint_report_responses' does not exi... Remove
        this comment to see the full error message
        {state.detailsReport.complaint_report_responses.length === 0 ? (
          <CustomText
            allowFontScaling={false}
            style={[styles.textNo, { color: state.darkMode ? 'white' : '#000000' }]}
          >
            Belum ada tanggapan!
          </CustomText>
        ) : (
          <FlatList
            // @ts-expect-error TS(2339): Property 'complaint_report_responses' does not exi... Remove this comment to see the full error message
            data={state.detailsReport.complaint_report_responses}
            // @ts-expect-error TS(2304): Cannot find name 'renderItemShimmer'.
            renderItem={state.loading ? renderItemShimmer : renderItem}
            ListFooterComponent={() => <View style={{ height: toDp(24) }} />}
          />
        )}
      </View>
    );
  };

  const renderRating = () => {
    return (
      <View style={styles.viewUlasan}>
        <View style={styles.viewRowRating}>
          <CustomText
            textType="semibold"
            allowFontScaling={false}
            style={[
              styles.textTitle,
              { marginLeft: toDp(20), color: state.darkMode ? 'white' : '#9B9F95' },
            ]}
          >
            RATING
          </CustomText>
          {props.route.params.dataUser.is_a_resident &&
            // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
            state.detailsReport.rating.available_to_rate && (
              <TouchableOpacity style={styles.touchPencil} onPress={() => navigateRating()}>
                <Image
                  source={allLogo.icPencil}
                  style={[styles.icPencil, { tintColor: '#5AAA0F' }]}
                />
              </TouchableOpacity>
            )}
        </View>
        {/*<CustomText allowFontScaling={false} style={[styles.textInfo, {color: state.darkMode ? 'white' : '#9B9F95'}]}>Rating yang penghuni berikan terhadap pengelola</CustomText>*/}
        <View style={[styles.viewRow, { paddingLeft: toDp(16) }]}>
          <Image
            source={allLogo.icStar}
            style={[
              styles.icStar,
              // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
              { tintColor: state.detailsReport.rating.rating >= 1 ? '#F2C041' : '#EBECE9' },
            ]}
          />
          <View style={{ width: toDp(8) }} />
          <Image
            source={allLogo.icStar}
            style={[
              styles.icStar,
              // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
              { tintColor: state.detailsReport.rating.rating >= 2 ? '#F2C041' : '#EBECE9' },
            ]}
          />
          <View style={{ width: toDp(8) }} />
          <Image
            source={allLogo.icStar}
            style={[
              styles.icStar,
              // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
              { tintColor: state.detailsReport.rating.rating >= 3 ? '#F2C041' : '#EBECE9' },
            ]}
          />
          <View style={{ width: toDp(8) }} />
          <Image
            source={allLogo.icStar}
            style={[
              styles.icStar,
              // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
              { tintColor: state.detailsReport.rating.rating >= 4 ? '#F2C041' : '#EBECE9' },
            ]}
          />
          <View style={{ width: toDp(8) }} />
          <Image
            source={allLogo.icStar}
            style={[
              styles.icStar,
              // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
              { tintColor: state.detailsReport.rating.rating >= 5 ? '#F2C041' : '#EBECE9' },
            ]}
          />
        </View>
        <View style={styles.viewReview}>
          <CustomText allowFontScaling={false} style={styles.textReview}>
            Komentar
          </CustomText>
          <CustomText
            allowFontScaling={false}
            style={[styles.textValueReview, { color: state.darkMode ? 'white' : '#383B34' }]}
          >
            // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
            {state.detailsReport.rating.review}
          </CustomText>
          <CustomText
            allowFontScaling={false}
            style={[
              styles.textValueReview,
              { marginTop: toDp(16), color: state.darkMode ? 'white' : '#383B34' },
            ]}
          >
            // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
            {moment(state.detailsReport.rating.timestamp_rating).format('DD MMMM YYYY; HH:mm')}
          </CustomText>
        </View>
        <View style={{ height: toDp(24) }} />
      </View>
    );
  };

  const renderRatingPengelola = () => {
    return (
      <View style={styles.viewUlasan}>
        <View style={styles.viewRowRating}>
          <CustomText
            textType="semibold"
            allowFontScaling={false}
            style={[
              styles.textTitle,
              { marginLeft: toDp(20), color: state.darkMode ? 'white' : '#9B9F95' },
            ]}
          >
            RATING PENGHUNI
          </CustomText>
          {!props.route.params.dataUser.is_a_resident &&
            // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
            state.detailsReport.rating.available_to_rate && (
              <TouchableOpacity style={styles.touchPencil} onPress={() => navigateRating()}>
                <Image
                  source={allLogo.icPencil}
                  style={[styles.icPencil, { tintColor: '#5AAA0F' }]}
                />
              </TouchableOpacity>
            )}
        </View>
        {/*<CustomText allowFontScaling={false} style={[styles.textInfo, {color: state.darkMode ? 'white' : '#9B9F95'}]}>Rating yang petugas berikan terhadap penghuni</CustomText>*/}
        <View style={[styles.viewRow, { paddingLeft: toDp(16) }]}>
          <Image
            source={allLogo.icStar}
            style={[
              styles.icStar,
              {
                // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
                tintColor: state.detailsReport.rating.rating_pengelola >= 1 ? '#F2C041' : '#EBECE9',
              },
            ]}
          />
          <View style={{ width: toDp(8) }} />
          <Image
            source={allLogo.icStar}
            style={[
              styles.icStar,
              {
                // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
                tintColor: state.detailsReport.rating.rating_pengelola >= 2 ? '#F2C041' : '#EBECE9',
              },
            ]}
          />
          <View style={{ width: toDp(8) }} />
          <Image
            source={allLogo.icStar}
            style={[
              styles.icStar,
              {
                // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
                tintColor: state.detailsReport.rating.rating_pengelola >= 3 ? '#F2C041' : '#EBECE9',
              },
            ]}
          />
          <View style={{ width: toDp(8) }} />
          <Image
            source={allLogo.icStar}
            style={[
              styles.icStar,
              {
                // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
                tintColor: state.detailsReport.rating.rating_pengelola >= 4 ? '#F2C041' : '#EBECE9',
              },
            ]}
          />
          <View style={{ width: toDp(8) }} />
          <Image
            source={allLogo.icStar}
            style={[
              styles.icStar,
              {
                // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
                tintColor: state.detailsReport.rating.rating_pengelola >= 5 ? '#F2C041' : '#EBECE9',
              },
            ]}
          />
        </View>
        <View style={styles.viewReview}>
          <CustomText allowFontScaling={false} style={styles.textReview}>
            Komentar
          </CustomText>
          <CustomText
            allowFontScaling={false}
            style={[styles.textValueReview, { color: state.darkMode ? 'white' : '#383B34' }]}
          >
            // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
            {state.detailsReport.rating.review_pengelola}
          </CustomText>
          <CustomText
            allowFontScaling={false}
            style={[
              styles.textValueReview,
              { marginTop: toDp(16), color: state.darkMode ? 'white' : '#383B34' },
            ]}
          >
            // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
            {moment(state.detailsReport.rating.timestamp_rating_pengelola).format(
              'DD MMMM YYYY; HH:mm',
            )}
          </CustomText>
        </View>
        <View style={{ height: toDp(48) }} />
      </View>
    );
  };

  const responseLoadSuccess = () => {
    setState((state) => ({ ...state, loading: false, modalVisible: false }));
    props.route.params.loadComplains();
    props.navigation.goBack();
  };

  const kirim = () => {
    let data = {
      complaint_status_id:
        state.textTitleModal === 'Tanggapan laporan\nTidak valid'.toUpperCase()
          ? 'e5b03a77-6df3-4939-814b-85d12cbb311b'
          : // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message
          state.detailsReport?.complaint_status?.name == 'Terkirim'
          ? '42bed447-c3fa-4799-b8a0-f42451be4c37'
          : '5ddcd42b-7e27-48df-a11a-3cf197d76e51',
      response: state.tanggapan,
      image_urls: [],
    };
    postComplainsStatus('/' + props.route.params.item.id + '/response', data)
      .then((response: any) => {
        console.log('response', response);
        responseLoadSuccess();
      })
      .catch((error: any) => {
        console.log('Error', error);
        if (error.data.name === 'ComplaintReportNotFoundError') {
          Alert.alert(
            'Informasi',
            'Laporan telah dipindah tugaskan ke pengelola/petugas lain',
            [
              {
                text: 'OK',
                onPress: () => {
                  responseLoadSuccess();
                },
              },
            ],
            { cancelable: false },
          );
        } else {
          Alert.alert(
            'Informasi',
            'Petugas lain sudah menanggapi laporan ini',
            [
              {
                text: 'OK',
                onPress: () => {
                  responseLoadSuccess();
                },
              },
            ],
            { cancelable: false },
          );
        }
      });
  };

  const renderModalNoted = () => {
    return (
      <Modal
        onBackdropPress={() => setState((state) => ({ ...state, modalVisible: false }))}
        onBackButtonPress={() => setState((state) => ({ ...state, modalVisible: false }))}
        isVisible={state.modalVisible}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View
            style={[styles.modalBox, { backgroundColor: state.darkMode ? '#121212' : 'white' }]}
          >
            <View style={styles.lineCenter}>
              <View style={styles.lineModal} />
            </View>

            <View style={styles.viewModalTitle}>
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                style={[styles.textTitleModal, { color: state.darkMode ? 'white' : '#263238' }]}
              >
                {state.textTitleModal}
              </CustomText>
            </View>

            <View
              style={{
                marginTop: toDp(24),
                marginHorizontal: toDp(24),
              }}
            >
              <CustomTextArea
                title={'Tanggapan'}
                placeholder={'Masukan tanggapan Anda'}
                error={''}
                value={state.tanggapan}
                onChangeText={(tanggapan: any) => {
                  setState((state) => ({ ...state, tanggapan }));
                }}
                autoFocus={true}
                returnKeyType={'done'}
                maxLength={160}
              />
              <TouchableOpacity
                onPress={() => kirim()}
                style={[
                  styles.touchKirim,
                  {
                    width: '100%',
                    height: toDp(40),
                    backgroundColor: '#5AAA0F',
                    marginTop: toDp(48),
                    marginBottom: toDp(16),
                  },
                ]}
              >
                <CustomText textType="semibold" allowFontScaling={false} style={styles.textKirim}>
                  Kirim
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={[
          styles.footer,
          {
            backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
            borderTopColor: state.darkMode ? '#1C1C1E' : '#5AAA0F',
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            setState((state) => ({
              ...state,
              textTitleModal: 'Tanggapan laporan\nTidak valid'.toUpperCase(),
              modalVisible: true,
            }));
          }}
          style={[
            styles.touchKirim,
            {
              flex: 1,
              backgroundColor: 'white',
              borderWidth: toDp(1),
              borderColor: '#5AAA0F',
              marginLeft: toDp(16),
              marginVertical: toDp(16),
              marginRight: toDp(4),
            },
          ]}
        >
          <CustomText
            textType="semibold"
            allowFontScaling={false}
            style={[styles.textKirim, { color: '#5AAA0F' }]}
          >
            Tidak Valid
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            //setState({textTitleModal: 'Tanggapan laporan\ndi Proses'.toUpperCase(), modalVisible: true})
            NavigatorService.navigate('Tanggapan', {
              id: props.route.params.item.id,
              // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message
              statusName: state.detailsReport?.complaint_status?.name,
              backLaporan,
              load,
              responseLoadSuccess,
              loadComplains: props.route.params.loadComplains,
            });
          }}
          style={[
            styles.touchKirim,
            {
              flex: 1,
              backgroundColor: '#5AAA0F',
              marginVertical: toDp(16),
              marginRight: toDp(16),
              marginLeft: toDp(4),
            },
          ]}
        >
          <CustomText
            textType="semibold"
            allowFontScaling={false}
            style={[styles.textKirim, { color: 'white' }]}
          >
            Proses
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFooterProses = () => {
    return (
      <View
        style={[
          styles.footer,
          {
            backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
            borderTopColor: state.darkMode ? '#1C1C1E' : '#5AAA0F',
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            //setState({textTitleModal: 'Tanggapan laporan\nSelesai diproses'.toUpperCase(), modalVisible: true})
            NavigatorService.navigate('Tanggapan', {
              id: props.route.params.item.id,
              backLaporan,
              load,
              // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message
              statusName: state.detailsReport?.complaint_status?.name,
              responseLoadSuccess,
              loadComplains: props.route.params.loadComplains,
            });
          }}
          style={[
            styles.touchKirim,
            {
              flex: 1,
              backgroundColor: '#5AAA0F',
              margin: toDp(16),
            },
          ]}
        >
          <CustomText textType="semibold" allowFontScaling={false} style={styles.textKirim}>
            SELESAIKAN LAPORAN
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  const batal = () => {
    postComplainsCancel(props.route.params.item.id)
      .then((response: any) => {
        console.log(response);
        setState((state) => ({ ...state, isShowModalConfirm: false }));
        props.route.params.showMessageDelete();
        props.route.params.loadComplains();
        props.navigation.goBack();
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const renderModalConfirmationBatal = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={() => setState((state) => ({ ...state, isShowModalConfirm: false }))}
        isVisible={state.isShowModalConfirm}
      >
        <View style={styles.viewModalCenter}>
          <View
            style={[
              styles.modalBoxCenter,
              // @ts-expect-error TS(2551): Property 'isDarkMode' does not exist on type '{ is... Remove this comment to see the full error message
              { backgroundColor: state.isDarkMode ? '#121212' : 'white', height: toDp(216) },
            ]}
          >
            <CustomText
              textType="semibold"
              // @ts-expect-error TS(2551): Property 'isDarkMode' does not exist on type '{ is... Remove this comment to see the full error message
              style={[styles.titleConfirm, { color: state.isDarkMode ? 'white' : '#263238' }]}
            >
              BATALKAN LAPORAN
            </CustomText>
            <CustomText
              // @ts-expect-error TS(2551): Property 'isDarkMode' does not exist on type '{ is... Remove this comment to see the full error message
              style={[styles.textApakah, { color: state.isDarkMode ? 'white' : '#263238' }]}
            >
              Pembatalan akan menghapus laporan ini. Apakah yakin ingin membatalkan laporan ini?
            </CustomText>

            <View style={styles.viewRow}>
              <TouchableOpacity
                style={styles.touchYa}
                onPress={() => setState((state) => ({ ...state, isShowModalConfirm: false }))}
              >
                <CustomText textType="semibold" style={styles.textYa}>
                  Tidak
                </CustomText>
              </TouchableOpacity>
              <View style={{ width: toDp(10) }}></View>
              <TouchableOpacity style={styles.touchTidak} onPress={() => batal()}>
                <CustomText textType="semibold" style={styles.textTidak}>
                  Ya
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderFooterResident = () => {
    return (
      <View
        style={[
          styles.footer,
          {
            borderTopWidth: toDp(1),
            borderTopColor: state.darkMode ? '#1C1C1E' : '#f5f7f8',
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            setState((state) => ({ ...state, isShowModalConfirm: true }));
          }}
          style={[
            styles.touchKirim,
            {
              flex: 1,
              backgroundColor: '#5AAA0F',
              margin: toDp(16),
            },
          ]}
        >
          <CustomText
            textType="semibold"
            allowFontScaling={false}
            style={[styles.textKirim, { color: 'white' }]}
          >
            Batalkan Laporan
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  const navigateRating = () => {
    if (props.route.params.dataUser.is_a_resident) {
      NavigatorService.navigate('Rating', {
        // @ts-expect-error TS(2339): Property 'complaint_report_images' does not exist ... Remove this comment to see the full error message
        img: state.detailsReport.complaint_report_images[0].image_url,
        id: props.route.params.item.id,
        load,
        // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
        rating: state.detailsReport.rating.rating,
        // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
        review: state.detailsReport.rating.review,
        is_a_resident: props.route.params.dataUser.is_a_resident,
      });
    } else {
      NavigatorService.navigate('Rating', {
        // @ts-expect-error TS(2339): Property 'complaint_report_images' does not exist ... Remove this comment to see the full error message
        img: state.detailsReport.complaint_report_images[0].image_url,
        id: props.route.params.item.id,
        load,
        // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
        rating: state.detailsReport.rating.rating_pengelola,
        // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
        review: state.detailsReport.rating.review_pengelola,
        is_a_resident: props.route.params.dataUser.is_a_resident,
      });
    }
  };

  const renderFooterSelesai = () => {
    return (
      <View
        style={[
          styles.footer,
          {
            backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
            borderTopColor: state.darkMode ? '#1C1C1E' : '#5AAA0F',
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigateRating()}
          style={[
            styles.touchKirim,
            {
              flex: 1,
              backgroundColor: '#5AAA0F',
              marginVertical: toDp(16),
              marginRight: toDp(16),
              marginLeft: toDp(16),
            },
          ]}
        >
          <CustomText textType="semibold" allowFontScaling={false} style={styles.textKirim}>
            BERI RATING
          </CustomText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      {renderHeader()}
      {!netInfo.isConnected ? (
        <View style={styles.viewCenterLoading}>
          <NoConnection />
        </View>
      ) : state.loading ? (
        <View style={styles.viewCenterLoading}>
          <ActivityIndicator
            size="large"
            color={state.darkMode ? 'white' : '#5AAA0F'}
            style={{ marginVertical: toDp(24) }}
          />
        </View>
      ) : (
        <ScrollView
          style={[styles.scrollView, { backgroundColor: state.darkMode ? '#121212' : 'white' }]}
        >
          <View style={[styles.content, { backgroundColor: state.darkMode ? '#121212' : 'white' }]}>
            {!props.route.params.dataUser.is_a_resident && renderPelapor()}
            {!props.route.params.dataUser.is_a_resident && (
              <View
                style={[
                  styles.lineInfo,
                  { backgroundColor: state.darkMode ? '#1C1C1E' : '#F6F7F4' },
                ]}
              />
            )}
            {renderInfo()}
            // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type...
            Remove this comment to see the full error message
            {renderStatus(state.detailsReport?.complaint_status?.name)}
            {renderUlasan()}
            <View
              style={[
                styles.lineRating,
                { backgroundColor: state.darkMode ? '#1C1C1E' : '#f5f7f8' },
              ]}
            />
            // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
            {state.detailsReport.rating.rating !== 0 && renderRating()}
            <View
              style={[
                styles.lineRating,
                { backgroundColor: state.darkMode ? '#1C1C1E' : '#f5f7f8' },
              ]}
            />
            {!props.route.params.dataUser.is_a_resident &&
              // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
              state.detailsReport.rating.rating_pengelola !== 0 &&
              renderRatingPengelola()}
          </View>
        </ScrollView>
      )}
      {renderModalNoted()}
      {renderModalConfirmationBatal()}
      {props.route.params.dataUser.is_a_resident ? (
        // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message
        state.detailsReport?.complaint_status?.name === 'Terkirim' ? (
          renderFooterResident()
        ) : // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message
        state.detailsReport?.complaint_status?.name === 'Selesai' ? (
          // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
          state.detailsReport.rating.available_to_rate &&
          // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
          state.detailsReport.rating?.rating === 0 &&
          renderFooterSelesai()
        ) : (
          <View />
        )
      ) : props.route.params.from === 'laporan' ? (
        // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message
        state.detailsReport?.complaint_status?.name === 'Terkirim' ? (
          renderFooter()
        ) : // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message
        state.detailsReport?.complaint_status?.name === 'Proses' ? (
          renderFooterProses()
        ) : // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message
        state.detailsReport?.complaint_status?.name === 'Selesai' ? (
          // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
          state.detailsReport.rating?.available_to_rate &&
          // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
          state.detailsReport.rating?.rating_pengelola === 0 &&
          renderFooterSelesai()
        ) : (
          <View />
        )
      ) : (
        <View />
      )}

      <ImageView
        images={state.images}
        imageIndex={state.imageIndex}
        animationType={'fade'}
        visible={state.isImageViewVisible}
        onRequestClose={() => setState((state) => ({ ...state, isImageViewVisible: false }))}
      />

      <ImageView
        images={state.imagesProses}
        imageIndex={state.imageIndexProses}
        animationType={'fade'}
        visible={state.isImageViewVisibleProses}
        onRequestClose={() => setState((state) => ({ ...state, isImageViewVisibleProses: false }))}
      />

      <ImageView
        images={state.imagesSelesai}
        imageIndex={state.imageIndexSelesai}
        animationType={'fade'}
        visible={state.isImageViewVisibleSelesai}
        onRequestClose={() => setState((state) => ({ ...state, isImageViewVisibleSelesai: false }))}
      />
    </SafeAreaView>
  );
};

export default DetailsReportScreen;
