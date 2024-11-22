import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { allLogo } from '@src/Assets';
import CustomText from '@src/Components/CustomText';
import Empty from '@src/Components/Empty';
import Loader from '@src/Components/Loader';
import NoConnection from '@src/Components/NoConnection';
import Toast from '@src/Components/Toast';
import { toDp } from '@src/Helper/percentageToDP';
import moment from 'moment';
import localization from 'moment/locale/id';
import React, { useEffect, useRef, useState } from 'react';
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
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import * as NavigatorService from '../../Helper/NavigatorServices';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import { isIphoneX } from 'react-native-iphone-x-helper';

import Highlighter from '@src/Components/Highlighter';
import { getNews, getNewsCategories, putLike } from '@src/Services/Apis';

const { width, height } = Dimensions.get('window');

let limit = 0;

const NewsScreen = (props: any) => {
  const netInfo = useNetInfo();
  const toast = useRef(null);
  const [state, setState] = useState({
    arrayData: [],
    loading: true,
    loadingModal: false,
    messages: '',
    filter: 'all',
    modalVisible: false,
    page: 1,
    arrayStatus: ['Semua', 'Promo', 'Akt', 'Dalam Proses', 'Selesai', 'Batal'],
    activeStatus: 'Semua',
    activeIdStatus: [],
    total: 0,
    totalPage: 0,
    limit: 20,
    activeSearch: false,
    searchValue: '',
    darkMode: false,
    temp: 0,
    dataUser: {},
  });

  useEffect(() => {
    loadUser();
    getAllLoadData();
  }, []);

  const loadUser = async () => {
    let dataUser = await AsyncStorage.getItem('dataUser');

    console.log('dataUser', JSON.parse(dataUser));
    // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
    setState((state) => ({ ...state, dataUser: JSON.parse(dataUser) }));
  };

  const getAllLoadData = () => {
    getNewsCategories()
      .then((response: any) => {
        console.log(response);
        setState((state) => ({
          ...state,
          arrayStatus: [...[{ id: 'all', name: 'Semua' }], ...response.data.news_categories],
        }));
      })
      .catch((error: any) => {
        console.log(error);
      });

    loadNews();
    limit = state.limit;
  };

  const showMessageSuccess = () => {
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    toast.current.show('Berita Anda berhasil terkirim.');
  };

  const loadNews = () => {
    setState((state) => ({ ...state, loading: state.page === 1 ? true : false }));
    let params = '?page=' + state.page + '&search=' + state.searchValue;
    let data = {
      filter: {
        news_category_id: state.activeIdStatus,
      },
    };
    getNews(params, data)
      .then((response: any) => {
        console.log(response);
        if (state.page === 1) {
          setState((state) => ({
            ...state,
            loading: false,
            arrayData: response.data.news_articles,
            total: response.data.meta.total,
            totalPage: response.data.meta.total_page,
          }));
        } else {
          // @ts-expect-error TS(2345): Argument of type '(state: { arrayData: never[]; lo... Remove this comment to see the full error message
          setState((state) => ({
            ...state,
            loading: false,
            arrayData: [...state.arrayData, ...response.data.news_articles],
          }));
        }
      })
      .catch((error: any) => {
        console.log(error);
        setState((state) => ({ ...state, loading: false, arrayData: [] }));
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
    if (name === 'Aktivitas') {
      return '#FF7F00';
    } else if (name === 'Pengumuman') {
      return '#28A595';
    } else if (name === 'Promo') {
      return '#2F80ED';
    }
  };

  const changeWidthStatus = (name: any) => {
    let min = 4;
    if (name === 'Aktivitas') {
      return toDp(69 - min);
    } else if (name === 'Pengumuman') {
      return toDp(100 - min);
    } else if (name === 'Promo') {
      return toDp(58 - min);
    }
  };

  const like = (id: any, is_liked: any) => {
    //fungsi like
    // @ts-expect-error TS(2345): Argument of type '(state: { arrayData: never[]; lo... Remove this comment to see the full error message
    setState((state) => ({
      ...state,
      arrayData: state.arrayData.map((data) => {
        // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
        if (data.id === id) {
          return {
            // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
            ...data,
            // @ts-expect-error TS(2339): Property 'is_liked' does not exist on type 'never'... Remove this comment to see the full error message
            is_liked: !data.is_liked,
            // @ts-expect-error TS(2339): Property 'is_liked' does not exist on type 'never'... Remove this comment to see the full error message
            like: !data.is_liked ? data.like + 1 : data.like - 1,
          };
        }
        return {
          // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
          ...data,
        };
      }),
    }));

    if (!is_liked) {
      Vibration.vibrate(100);
    }
    let body = { is_a_like: is_liked };
    putLike('/' + id, body)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const renderItem = ({ item, index }: any) => {
    // console.log('item', item);
    return (
      <TouchableOpacity
        style={[styles.containerItem, { backgroundColor: 'white' }]}
        onPress={() => {
          // @ts-expect-error TS(2345): Argument of type '(state: { arrayData: never[]; lo... Remove this comment to see the full error message
          setState((state) => ({
            ...state,
            arrayData: state.arrayData.map((data) => {
              // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
              if (data.id === item.id) {
                return {
                  // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
                  ...data,
                  is_viewed: true,
                  // @ts-expect-error TS(2339): Property 'is_viewed' does not exist on type 'never... Remove this comment to see the full error message
                  view: !data.is_viewed ? data.view + 1 : data.view,
                };
              }
              return {
                // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
                ...data,
              };
            }),
          }));
          NavigatorService.navigate('DetailsNews', { id: item.id, loadNews, like });
        }}
      >
        <View style={[styles.cards, { backgroundColor: 'white' }]}>
          <Image
            style={styles.imgPicture}
            source={{ uri: item.image_url === null ? item.image_urls[0] : item.image_url }}
          />
          <View style={styles.contentItem}>
            <CustomText
              textType="semibold"
              style={[styles.itemTitle, { color: '#273238' }]}
              numberOfLines={1}
              allowFontScaling={false}
              ellipsizeMode="tail"
            >
              {item.title}
            </CustomText>
            <View style={styles.viewRowLike}>
              <CustomText
                textType="regular"
                allowFontScaling={false}
                style={[styles.text, { color: '#9B9F95' }]}
              >
                {item.view} x dilihat ●{' '}
                {moment(item.created_at)
                  // @ts-expect-error TS(2554): Expected 0-1 arguments, but got 2.
                  .locale('id', localization)
                  .format('LLLL')
                  .replace('pukul', '')}
              </CustomText>
              <TouchableOpacity
                style={styles.viewLikeRowRight}
                onPress={() => {
                  // @ts-expect-error TS(2339): Property 'is_a_resident' does not exist on type '{... Remove this comment to see the full error message
                  if (state.dataUser.is_a_resident) {
                    like(item.id, item.is_liked);
                  }
                }}
              >
                <Image
                  style={styles.icLikeNews}
                  source={item.is_liked ? allLogo.icLikeNewsActive : allLogo.icLikeNews}
                />
                <CustomText
                  textType="regular"
                  allowFontScaling={false}
                  style={[styles.text, { color: '#273238', marginTop: 0 }]}
                >
                  {item.like + state.temp}
                </CustomText>
              </TouchableOpacity>
            </View>
            <CustomText
              textType="regular"
              style={[styles.desc, { color: '#383B34' }]}
              numberOfLines={2}
              allowFontScaling={false}
              ellipsizeMode="tail"
            >
              {item.content
                .replace(/(<([^>]+)>)/gi, '')
                .replace('&nbsp;', '')
                .replace('&nbsp;', '')}
            </CustomText>
          </View>
          <View
            style={[
              styles.viewStatus,
              {
                width: changeWidthStatus(item.news_category.name),
                backgroundColor: changeColorStatus(item.news_category.name),
              },
            ]}
          >
            <CustomText textType="medium" allowFontScaling={false} style={styles.textStatus}>
              {item.news_category.name}
            </CustomText>
          </View>
        </View>
        <View style={[styles.lineItem, { backgroundColor: '#f5f7f8' }]} />
      </TouchableOpacity>
    );
  };

  const renderItemShimmer = ({ item, index }: any) => {
    return (
      <View style={[styles.containerItem, { backgroundColor: 'white' }]}>
        <View style={[styles.cards, { backgroundColor: 'white' }]}>
          <ShimmerPlaceHolder style={styles.imgPicture} />
          <View style={styles.contentItem}>
            <ShimmerPlaceHolder style={styles.itemTitle} />
            <ShimmerPlaceHolder style={[styles.text, { width: toDp(250) }]} />
            <ShimmerPlaceHolder style={[styles.desc, { width: toDp(328) }]} />
          </View>
        </View>
        <View style={styles.lineItem} />
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <ActivityIndicator size="large" color={'#5AAA0F'} style={{ marginVertical: toDp(24) }} />
    );
  };

  useEffect(() => {
    // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
    loadNews(state.page);
  }, [state.activeIdStatus]);

  const renderStatus = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // @ts-expect-error TS(2345): Argument of type '(state: { arrayData: never[]; lo... Remove this comment to see the full error message
          setState((state) => ({
            ...state,
            activeIdStatus: [item.id],
            activeStatus: item.name,
            modalVisible: false,
            page: 1,
            limit: 20,
            arrayData: [],
          }));
          limit = state.limit;
        }}
        style={[
          styles.touchStatus,
          {
            backgroundColor: item.name == state.activeStatus ? '#5AAA0F19' : '#ffffff',
            borderColor: item.name === state.activeStatus ? '#5AAA0F' : '#d3d6db',
          },
        ]}
      >
        <CustomText
          textType="regular"
          allowFontScaling={false}
          style={[
            styles.textStatusItem,
            { color: item.name === state.activeStatus ? '#5AAA0F' : '#788f9c' },
          ]}
        >
          {item.name}
        </CustomText>
      </TouchableOpacity>
    );
  };

  const renderModalFilter = () => {
    return (
      <Modal
        onSwipeComplete={() => setState((state) => ({ ...state, modalVisible: false }))}
        swipeDirection={['down']}
        onBackdropPress={() => setState((state) => ({ ...state, modalVisible: false }))}
        isVisible={state.modalVisible}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View style={[styles.modalBox, { backgroundColor: 'white' }]}>
            <View style={styles.lineCenter}>
              <View style={styles.lineModal} />
            </View>

            <View style={styles.viewModalTitle}>
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                style={[styles.textTitleModal, { color: '#263238' }]}
              >
                PILIH LABEL BERITA
              </CustomText>
            </View>

            <View style={styles.viewArrayStatus}>
              <FlatList data={state.arrayStatus} renderItem={renderStatus} numColumns={3} />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderHeaderDefault = () => {
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
          {'Berita'}
        </CustomText>

        <View style={{ width: toDp(90), alignItems: 'flex-end' }}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.touchHeaderSearch}
              onPress={() => setState((state) => ({ ...state, modalVisible: true }))}
            >
              <Image source={allLogo.icFilter} style={styles.icFilter} />
            </TouchableOpacity>
            <View style={{ width: toDp(16) }} />
            <TouchableOpacity
              style={styles.touchHeaderSearch}
              onPress={() => {
                setState((state) => ({ ...state, page: 1, activeSearch: true }));
                //search.focus()
              }}
            >
              <Image source={allLogo.icSearch} style={styles.icSearch} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    loadNews();
  }, [state.searchValue]);

  const renderHeaderSearch = () => {
    return (
      <View
        style={[
          styles.header,
          {
            backgroundColor: 'white',
            borderBottomColor: '#5AAA0F',
          },
        ]}
      >
        <View style={styles.linearHeader}>
          <View style={styles.searchRow}>
            <View style={[styles.inputRow, { borderColor: '#5AAA0F' }]}>
              <Image
                source={allLogo.icSearch}
                style={[styles.icSearch, { tintColor: '#9B9F95' }]}
              />
              <TextInput
                onChangeText={(searchValue: any) => {
                  setState((state) => ({ ...state, searchValue }));
                }}
                autoCapitalize={'none'}
                underlineColorAndroid={'transparent'}
                style={[styles.textInput, { color: '#383B34' }]}
                placeholder={'Cari Berita'}
                placeholderTextColor={'#8d96a6'}
                returnKeyType="search"
                value={state.searchValue}
              />
              {state.searchValue !== '' && (
                <TouchableOpacity
                  style={styles.touchHeaderSearch}
                  onPress={() => {
                    setState((state) => ({ ...state, searchValue: '' }));
                  }}
                >
                  <Image source={allLogo.icDeleteAll} style={styles.icDeleteAll} />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={styles.touchHeaderSearch}
              onPress={() => {
                setState((state) => ({ ...state, activeSearch: false, page: 1, searchValue: '' }));
              }}
            >
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                style={[styles.textBatal, { color: '#5AAA0F' }]}
              >
                Batal
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderItemSearch = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={[styles.containerItem, { backgroundColor: 'white' }]}
        onPress={() => NavigatorService.navigate('DetailsNews', { id: item.id, loadNews, like })}
      >
        <View style={[styles.cards, { backgroundColor: 'white' }]}>
          <View style={styles.contentItem}>
            <Highlighter
              style={[styles.itemTitle, { color: '#383B34', marginTop: 0 }]}
              highlightStyle={{ backgroundColor: '#ffde00' }}
              searchWords={[state.searchValue]}
              textToHighlight={item.title}
            />
            <CustomText
              textType="regular"
              allowFontScaling={false}
              style={[styles.text, { color: '#9B9F95' }]}
            >
              // @ts-expect-error TS(2554): Expected 0-1 arguments, but got 2.
              {moment(item.created_at).locale('id', localization).format('LLLL')}
            </CustomText>
            <View
              style={[
                styles.viewStatusSearch,
                {
                  marginTop: toDp(4),
                  width: changeWidthStatus(item.news_category.name),
                  backgroundColor: changeColorStatus(item.news_category.name),
                  height: toDp(20),
                },
              ]}
            >
              <CustomText
                textType="medium"
                allowFontScaling={false}
                style={styles.textStatusSearch}
              >
                {item.news_category.name}
              </CustomText>
            </View>
          </View>
        </View>
        <View style={[styles.lineItem, { backgroundColor: '#f5f7f8' }]} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: 'white' }]}>
      {renderModalFilter()}
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
      <Toast ref={toast} />
      <Loader loading={state.loadingModal} />

      {!state.activeSearch ? renderHeaderDefault() : renderHeaderSearch()}

      {state.activeSearch && state.searchValue === '' && <View style={styles.overlaySearch} />}

      {
        <View style={[styles.content, { backgroundColor: '#f5f7f8' }]}>
          {!netInfo.isConnected ? (
            <NoConnection />
          ) : state.arrayData.length === 0 && !state.loading ? (
            state.activeSearch ? (
              <View style={styles.centerEmpty}>
                <Image source={allLogo.imgEmptyNews} style={styles.imgEmptyNews} />
                <CustomText textType="semibold" allowFontScaling={false} style={styles.emptySearch}>
                  Maaf, Tidak ada berita terkait.
                </CustomText>
              </View>
            ) : (
              <Empty images={allLogo.imgEmptyNews} title={'Belum ada berita'} />
            )
          ) : state.activeSearch && state.loading ? (
            renderFooter()
          ) : (
            <ScrollView
              removeClippedSubviews={true}
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
                    loadNews(state.page);
                  }}
                />
              }
              onMomentumScrollEnd={(e: any) => {
                let paddingToBottom =
                  state.activeSearch && state.searchValue !== '' ? toDp(99) : toDp(127);
                paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                if (
                  e.nativeEvent.contentOffset.y >=
                  e.nativeEvent.contentSize.height - paddingToBottom
                ) {
                  let page = state.page++;
                  // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
                  loadNews(page);
                  limit += state.limit;
                }
              }}
            >
              <FlatList
                removeClippedSubviews={true}
                data={state.loading ? ['', '', '', '', ''] : state.arrayData}
                renderItem={
                  state.loading
                    ? renderItemShimmer
                    : state.activeSearch && state.searchValue !== ''
                    ? renderItemSearch
                    : renderItem
                }
                ListFooterComponent={state.page < state.totalPage ? renderFooter() : <View />}
              />
            </ScrollView>
          )}
        </View>
      }

      {/* // @ts-expect-error TS(2339): Property 'is_a_resident' does not exist on type '{... Remove this comment to see the full error message */}
      {netInfo.isConnected && !state.dataUser.is_a_resident && (
        <LinearGradient
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 0.7, y: 1.0 }}
          colors={['#5AAA0F', '#5AAA0F']}
          style={styles.linearFab}
        >
          <TouchableOpacity
            style={styles.fabAdd}
            onPress={() => NavigatorService.navigate('AddNews', { loadNews, showMessageSuccess })}
          >
            <Image source={allLogo.icAdd} style={styles.icAdd} />
          </TouchableOpacity>
        </LinearGradient>
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

  content: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },
  containerItem: {
    width,
    height: 'auto',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    //paddingBottom: toDp(16),
    paddingTop: toDp(16),
    //paddingHorizontal: toDp(8)
  },
  lineItem: {
    width,
    height: toDp(8),
    backgroundColor: '#f5f7f8',
    marginTop: toDp(16),
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

  viewRow: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: toDp(20),
    paddingTop: toDp(16),
  },
  imgPicture: {
    width: toDp(328),
    height: toDp(160),
    borderRadius: toDp(4),
  },
  contentItem: {
    flex: 1,
    width: '100%',
    paddingHorizontal: toDp(16),
  },
  labelpic: {
    width: toDp(24),
    height: toDp(24),
  },
  itemTitle: {
    fontSize: toDp(14),
    marginTop: toDp(16),
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
    width: toDp(20),
    height: toDp(20),
    marginRight: toDp(8),
  },
  icLp: {
    width: toDp(20),
    height: toDp(20),
    marginRight: toDp(8),
  },
  text: {
    fontSize: toDp(12),
    color: '#868A8E',
    //fontFamily: 'Montserrat-Regular',
    letterSpacing: 0,
    marginTop: toDp(4),
  },
  desc: {
    fontSize: toDp(12),
    color: '#273238',
    //fontFamily: 'Montserrat-Regular',
    letterSpacing: 0,
    marginTop: toDp(8),
  },
  viewStatusSearch: {
    width: toDp(56),
    height: toDp(20),
    borderRadius: toDp(11),
    backgroundColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewStatus: {
    width: toDp(56),
    height: toDp(20),
    borderRadius: toDp(11),
    backgroundColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: toDp(8),
    right: toDp(24),
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
    height: toDp(230),
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
    backgroundColor: '#5AAA0F19',
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: toDp(14),
  },
  textStatusItem: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(14),
    color: '#273238',
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBatal: {
    color: '#5AAA0F',
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-SemiBold',
    marginHorizontal: toDp(8),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: toDp(8),
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    marginLeft: toDp(8),
    //marginRight: toDp(16),
    //flex: 1,
    width: '82%',
    borderRadius: toDp(10),
    height: toDp(40),
  },
  icDeleteAll: {
    width: toDp(20),
    height: toDp(20),
  },
  textInput: {
    marginLeft: toDp(4),
    width: '80%',
    fontSize: toDp(12),
    color: '#273238',
    //fontFamily: 'Montserrat-Regular',
  },
  overlaySearch: {
    width,
    height,
    marginTop: Platform.OS === 'android' ? toDp(89) : isIphoneX() ? toDp(98) : toDp(78),
    backgroundColor: 'black',
    opacity: 0.45,
    position: 'absolute',
    zIndex: 1,
  },

  textStatusSearch: {
    fontSize: toDp(12),
    color: '#FFFFFF',
    //fontFamily: 'Montserrat-Medium',
  },
  viewRowLike: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: toDp(6),
  },
  viewLikeRowRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icLikeNews: {
    width: toDp(16),
    height: toDp(16),
    marginRight: toDp(6),
  },
  centerEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  imgEmptyNews: {
    width: toDp(120),
    height: toDp(120),
  },
  emptySearch: {
    marginTop: toDp(20),
    fontSize: toDp(14),
    color: '#273238',
    //fontFamily: 'Montserrat-Regular',
  },
});

export default NewsScreen;
