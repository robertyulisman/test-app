import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { allLogo } from '../../Assets';
import Loader from '../../Components/Loader';
import { toDp } from '../../Helper/percentageToDP';
//import ViewMoreText from '@ViewMoreText'

import moment from 'moment';
import ImageView from 'react-native-image-viewing';
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';
import HTML from 'react-native-render-html';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import CustomText from '../../Components/CustomText';
import Toast from '../../Components/Toast';
import * as NavigatorService from '../../Helper/NavigatorServices';
// import localization from 'moment/locale/id';

import {
  deleteCommentNews,
  getCommentNews,
  getNewArticle,
  postCommentNews,
  putLike,
  putNewsToggle,
} from '../../Services/Apis';

import { database } from '../../Configs/firebase';
import { ImageFooter } from '../PhotoProgress';

const { width, height } = Dimensions.get('window');
const computeEmbeddedMaxWidth = (availableWidth: any) => {
  return Math.min(availableWidth, 500);
};
let limit = 0;
const DetailsNewsScreen = (props: any) => {
  const toast = useRef<any>(null);

  const [images, setImages] = useState([]);
  const [state, setState] = useState<any>({
    dataUser: {},
    isImageViewVisible: false,
    webViewHeight: 0,
    status: false,
    modalVisible: false,
    item: null,
    comment: '',
    statusKeyboard: false,
    loadingSend: false,
    loadingDelete: false,
    arrayComments: [],
    page: 1,
    total: 0,
    totalPage: 0,
    perPage: 20,
    limit: 20,
    loadingComments: false,
    fadeAnim: new Animated.Value(0),
    hide: true,
  });

  useEffect(() => {
    database.ref('/hide').on('value', (querySnapShot) => {
      console.log('querySnapShot.val()', querySnapShot.val());
      setState((state: any) => ({
        ...state,
        hide: querySnapShot.val(),
      }));
    });
  }, []);

  useEffect(() => {
    loadUser();
    load();
    loadComment();
    limit = state.limit;
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setState((state: any) => ({ ...state, statusKeyboard: true }));
      Animated.timing(state.fadeAnim, { toValue: 1, duration: 100 } as any).start();
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setState((state: any) => ({ ...state, statusKeyboard: false }));
      Animated.timing(state.fadeAnim, { toValue: 0, duration: 100 } as any).start();
    });
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const loadComment = () => {
    setState((state: any) => ({ ...state, loadingComments: state.page === 1 ? true : false }));
    let params = '/' + props.route.params.id + '?page=' + state.page + '&per_page=' + state.perPage;
    getCommentNews(params)
      .then((response) => {
        console.log(response);
        if (state.page === 1) {
          setState((state: any) => ({
            ...state,
            loading: false,
            loadingComments: false,
            arrayComments: response.data.comment_news_articles.map((data: any, index: number) => {
              return {
                ...data,
                key: '' + index,
              };
            }),
            total: response.data.meta.total,
            totalPage: response.data.meta.total_page,
          }));

          if (props.route.params.from === 'comment_news_article') {
            setTimeout(function () {
              setState((state: any) => ({ ...state, loadingComments: false, modalVisible: true }));
            }, 500);
          }
        } else {
          setState((state: any) => ({
            ...state,
            loading: false,
            loadingComments: false,
            arrayComments: [...state.arrayComments, ...response.data.comment_news_articles],
          }));
        }
      })
      .catch((error) => {
        setState((state: any) => ({
          ...state,
          loading: false,
          loadingComments: false,
          arrayComments: [],
        }));
      });
  };

  const loadUser = async () => {
    let dataUser: any = await AsyncStorage.getItem('dataUser');
    setState((state: any) => ({ ...state, dataUser: JSON.parse(dataUser) }));
  };

  const load = () => {
    getNewArticle('/' + props.route.params.id)
      .then((response) => {
        console.log(response);
        setState((state: any) => ({
          ...state,
          item: response.data.news_article,
          loading: false,
          status: response.data.news_article.is_published,
        }));
      })
      .catch((error) => {
        console.log(error);
        setState((state: any) => ({ ...state, loading: false }));
      });
  };

  const changeColorStatus = (name: any) => {
    if (name === 'Aktivitas') {
      return '#f2c141';
    } else if (name === 'Pengumuman') {
      return '#28a595';
    } else if (name === 'Promo') {
      return '#0186d5';
    }
  };

  const changeWidthStatus = (name: any) => {
    if (name === 'Aktivitas') {
      return toDp(74);
    } else if (name === 'Pengumuman') {
      return toDp(110);
    } else if (name === 'Promo') {
      return toDp(63);
    }
  };

  const onWebViewMessage = (event: any) => {
    setState((state: any) => ({ ...state, webViewHeight: Number(event.nativeEvent.data) }));
  };

  const deleteComment = (id: any) => {
    setState((state: any) => ({ ...state, loadingDelete: true }));
    deleteCommentNews('/' + id)
      .then((response) => {
        setState((state: any) => ({ ...state, loadingDelete: false, page: 1 }));
        loadComment();
      })
      .catch((error) => {
        console.log(error);
        setState((state: any) => ({ ...state, loadingDelete: false }));
      });
  };

  const like = (countLike: any, is_liked: any) => {
    setState((state: any) => ({
      ...state,
      item: {
        ...state.item,
        like: !is_liked ? countLike + 1 : countLike - 1,
        is_liked: !is_liked,
      },
    }));
  };

  const setStatus = () => {
    setState((state: any) => ({ ...state, status: !state.status }));
    putNewsToggle('/' + state.item?.id)
      .then((response) => {
        props.route.params.loadNews();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderItem = (data: any, rowMap: any) => {
    return (
      <View style={[styles.rowFront, { backgroundColor: 'white' }]}>
        <View style={styles.viewUserName}>
          {data.item.user.image_url === '' ? (
            <Image source={allLogo.imgDefault} style={styles.imgCommentUser} />
          ) : (
            <Image source={{ uri: data.item.user.image_url }} style={styles.imgCommentUser} />
          )}
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CustomText
                textType="medium"
                numberOfLines={1}
                allowFontScaling={false}
                ellipsizeMode="tail"
                style={[styles.textName, { width: toDp(120), color: '#9B9F95' }]}
              >
                {data.item.user.name}
              </CustomText>

              {/*
                !data.item.user.is_a_resident &&
                <Text allowFontScaling={false} style={[styles.textName, {marginRight: toDp(8), color: state.darkMode ? 'white' : '#788F9C'}]}>  ●</Text>
              */}
              {!data.item.user.is_a_resident && (
                <CustomText
                  textType="medium"
                  allowFontScaling={false}
                  style={[styles.textName, { color: '#006432' }]}
                >
                  Pengelola
                </CustomText>
              )}
            </View>

            <CustomText
              textType="regular"
              style={[styles.textMessage, { color: '#000000' }]}
              numberOfLines={6}
              allowFontScaling={false}
              ellipsizeMode="tail"
            >
              {data.item.message}
            </CustomText>
          </View>
        </View>
        <CustomText
          textType="regular"
          allowFontScaling={false}
          style={[styles.textTime, { color: '#9B9F95' }]}
        >
          {replaceStringTime(moment(data.item.created_at).fromNow())}
        </CustomText>
      </View>
    );
  };

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderHiddenItem = (data: any, rowMap: any) => {
    return (
      <View style={[styles.rowBack, { backgroundColor: 'white' }]}>
        <View style={{ width: toDp(60) }}>
          {state.loadingDelete ? (
            <View style={styles.touchDelete}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <TouchableOpacity
              style={styles.touchDelete}
              onPress={() => {
                Alert.alert('Hapus komentar', 'Anda yakin ingin menghapus komentar ini?', [
                  {
                    text: 'Tidak',
                    onPress: () => {},
                  },
                  {
                    text: 'Hapus',
                    onPress: () => {
                      deleteComment(data.item.id);
                      closeRow(rowMap, data.item.key);
                    },
                    style: 'destructive',
                  },
                ]);
              }}
            >
              <Image source={allLogo.icDelete} style={styles.icCommentDelete} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const replaceHTML = (content: any) => {
    if (!content?.includes('<p>')) {
      return '<p>' + content + '</p>';
    }
    return content;
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

  const renderHeader = () => {
    return (
      <View style={styles.viewHeader}>
        <TouchableOpacity style={styles.touchHeader} onPress={() => props.navigation.goBack()}>
          <Image source={allLogo.icBack} style={styles.icBack} />
        </TouchableOpacity>

        {!state.dataUser.is_a_resident && (
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.touchHeaderSearch}
              onPress={() => {
                NavigatorService.navigate('EditNews', {
                  item: state.item,
                  load: load,
                  loadNews: props.route.params.loadNews,
                  loadComment: loadComment,
                  showMessageSuccess: showMessageSuccess,
                });
              }}
            >
              <Image source={allLogo.icPencil} style={styles.icBack} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const showMessageSuccess = () => {
    toast.current.show('Berita Anda berhasil diedit.');
  };

  const renderFooter = () => {
    return (
      <ActivityIndicator size="large" color={'#917438'} style={{ marginVertical: toDp(24) }} />
    );
  };

  const send = () => {
    setState((state: any) => ({ ...state, loadingSend: true }));
    let body = {
      message: state.comment,
      news_article_id: props.route.params.id,
    };
    postCommentNews(body)
      .then((response) => {
        Keyboard.dismiss();
        setState((state: any) => ({ ...state, loadingSend: false, comment: '', page: 1 }));
        loadComment();
        //scroll.scrollTo()
      })
      .catch((error) => {
        console.log(error);
        setState((state: any) => ({ ...state, loadingSend: false }));
      });
  };

  useEffect(() => {
    // loadComment(state.page);
    loadComment();
  }, [state.page]);

  const renderComment = () => {
    return (
      <Modal
        backdropOpacity={0.0}
        isVisible={state.modalVisible}
        onBackdropPress={() => setState((state: any) => ({ ...state, modalVisible: false }))}
        onBackButtonPress={() => setState((stat: any) => ({ ...state, modalVisible: false }))}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View style={[styles.modalBox, { backgroundColor: 'white' }]}>
            <View style={styles.viewModalTitle}>
              <View style={styles.touchSilang}>
                <View style={styles.icSilang} />
              </View>
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                style={[styles.textTitleModal, { color: '#263238' }]}
              >
                {state.total} KOMENTAR
              </CustomText>
              <TouchableOpacity
                style={[styles.touchSilang, { marginRight: toDp(10) }]}
                onPress={() => setState((state: any) => ({ ...state, modalVisible: false }))}
              >
                <Image
                  source={allLogo.icSilang}
                  style={[styles.icSilang, { tintColor: '#263238' }]}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.viewArrayStatus}>
              {state.total === 0 ? (
                <View style={styles.viewEmpty}>
                  <Image source={allLogo.imgEmptyNews} style={styles.imgEmptyNews} />
                  <CustomText
                    textType="semibold"
                    allowFontScaling={false}
                    style={[styles.textBelum, { color: '#5E6157' }]}
                  >
                    Belum ada komentar
                  </CustomText>
                  <CustomText
                    textType="regular"
                    allowFontScaling={false}
                    style={[styles.textMulai, { color: '#5E6157' }]}
                  >
                    Mulai percakapan
                  </CustomText>
                </View>
              ) : (
                <ScrollView
                  removeClippedSubviews={true}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  //ref={(c) => {scroll = c}}
                  refreshControl={
                    <RefreshControl
                      refreshing={state.loadingComments}
                      onRefresh={() => {
                        (limit = 0),
                          setState((state: any) => ({
                            ...state,
                            total: 0,
                            totalPage: 0,
                            arrayComments: [],
                            page: 1,
                          }));
                        // loadComment(state.page);
                        loadComment();
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
                      // loadComment(page);
                      loadComment();
                      limit += state.limit;
                    }
                  }}
                >
                  <SwipeListView
                    data={state.arrayComments}
                    renderItem={(rowData: any, rowMap: any) => (
                      // @ts-expect-error TS(2769): No overload matches this call.
                      <SwipeRow
                        disableLeftSwipe={state.dataUser.id !== rowData.item.user.id}
                        rightOpenValue={toDp(-60)}
                        disableRightSwipe={true}
                      >
                        {renderHiddenItem(rowData, rowMap)}
                        {renderItem(rowData, rowMap)}
                      </SwipeRow>
                    )}
                    ListFooterComponent={state.page < state.totalPage ? renderFooter() : <View />}
                  />
                  <View style={{ height: toDp(120) }} />
                </ScrollView>
              )}
            </View>
          </View>
        </View>

        {state.statusKeyboard && (
          <TouchableOpacity
            style={styles.bgShadow}
            onPress={() => {
              setState((state: any) => ({ ...state, statusKeyboard: false }));
              Keyboard.dismiss();
            }}
          />
        )}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'position' : (null as any)}
          keyboardVerticalOffset={isIphoneX() ? toDp(-20) : toDp(0)}
        >
          <View style={[styles.modalFooter, { backgroundColor: 'white' }]}>
            <TouchableOpacity
              onPress={() => {
                setState((state: any) => ({ ...state, modalVisibleInput: true }));
              }}
            >
              {state.dataUser.image_url === '' ? (
                <Image style={styles.imgUser} source={allLogo.imgDefault} />
              ) : (
                <Image style={styles.imgUser} source={{ uri: state.dataUser.image_url }} />
              )}
            </TouchableOpacity>
            <View style={[styles.viewText, { backgroundColor: '#F6F7F4' }]}>
              <TextInput
                onChangeText={(response: any) => {
                  setState((state: any) => ({ ...state, comment: response }));
                }}
                onSubmitEditing={() => {
                  send();
                }}
                returnKeyType={'send'}
                maxLength={150}
                //multiline={true}
                autoCapitalize={'none'}
                underlineColorAndroid={'transparent'}
                value={state.comment}
                style={styles.textInput}
                placeholderTextColor={'#CCCFC9'}
                placeholder={'Tulis komentar Anda disini... '}
              />
            </View>
            {state.comment.length !== 0 ? (
              state.loadingSend ? (
                <View style={styles.touchPost}>
                  <ActivityIndicator size="small" color="#5AAA0F" />
                </View>
              ) : (
                <TouchableOpacity style={styles.touchPost} onPress={() => send()}>
                  <CustomText textType="medium" allowFontScaling={false} style={styles.textPost}>
                    Kirim
                  </CustomText>
                </TouchableOpacity>
              )
            ) : (
              <View />
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
      <Loader loading={state.loading} />
      {renderComment()}
      <ScrollView>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => {
              console.log('state.item?.image_url', state.item?.image_url);
              if (state.item?.image_url !== null) {
                setImages([{ uri: state.item?.image_url }] as any);
              } else {
                const formatImages = state.item?.image_urls.map((item: any) => {
                  return {
                    uri: item,
                  };
                });
                setImages(formatImages);
              }

              setState((state: any) => ({ ...state, isImageViewVisible: true }));
            }}
          >
            <Image
              // cache="only-if-cached"
              source={{
                uri:
                  state.item?.image_url !== null
                    ? state.item?.image_url
                    : state.item?.image_urls[0],
              }}
              style={styles.img}
            />
          </TouchableOpacity>
          {/* {Platform.OS === 'ios' ? (
            <TouchableOpacity
              onPress={() => setState((state) => ({ ...state, isImageViewVisible: true }))}
            >
              <Image
                cache="only-if-cached"
                source={{
                  uri:
                    state.item?.image_url !== null
                      ? state.item?.image_url
                      : state.item?.image_urls[0],
                }}
                style={styles.img}
              />
            </TouchableOpacity>
          ) : (
            <CustomImageView
              style={styles.img}
              uri={
                state.item?.image_url !== null ? state.item?.image_url : state.item?.image_urls[0]
              }
            />
          )} */}

          <View style={{ padding: toDp(16) }}>
            <CustomText
              textType="semibold"
              allowFontScaling={false}
              style={[styles.textTitle, { color: '#273238' }]}
            >
              {state.item?.title}
            </CustomText>
            <View style={styles.viewRowLike}>
              <View>
                <CustomText
                  textType="regular"
                  allowFontScaling={false}
                  style={[styles.textCreate, { color: '#9B9F95' }]}
                >
                  {'Dibuat oleh ' + state.item?.user.name}
                </CustomText>
                <CustomText
                  textType="regular"
                  allowFontScaling={false}
                  style={[styles.textDate, { color: '#9B9F95' }]}
                >
                  {state.item?.view} x dilihat ●{' '}
                  {moment(state.item?.created_at)
                    // @ts-expect-error TS(2304): Cannot find name 'localization'.
                    .locale('id', localization)
                    .format('LLLL')
                    .replace('pukul', '')}
                </CustomText>
              </View>
            </View>
            <View style={styles.viewStatusNew}>
              <View
                style={[
                  styles.viewStatus,
                  {
                    backgroundColor: changeColorStatus(state.item?.news_category.name),
                    width: changeWidthStatus(state.item?.news_category.name),
                  },
                ]}
              >
                <CustomText textType="medium" allowFontScaling={false} style={styles.textStatus}>
                  {state.item?.news_category.name}
                </CustomText>
              </View>
            </View>
            <HTML
              source={{
                html: '<body style="color:black">' + replaceHTML(state.item?.content) + '</body>',
              }}
              contentWidth={width}
              computeEmbeddedMaxWidth={computeEmbeddedMaxWidth}
            />

            {!state.dataUser.is_a_resident && (
              <View style={[styles.detailInfo, { backgroundColor: 'white' }]}>
                <View style={styles.viewValue}>
                  <Text allowFontScaling={false} style={[styles.textValue, { color: '#121212' }]}>
                    Status
                  </Text>
                  <Switch onValueChange={setStatus} value={state.status} />
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <ImageView
        images={images}
        imageIndex={0}
        visible={state.isImageViewVisible}
        onRequestClose={() =>
          setState((state: any) => ({
            ...state,
            isImageViewVisible: false,
          }))
        }
        FooterComponent={({ imageIndex }) => (
          <ImageFooter imageIndex={imageIndex} imagesCount={images.length} />
        )}
      />

      {renderHeader()}
      <Toast ref={toast} />
      {
        <View style={styles.footer}>
          {state.item?.clusters && !state.dataUser.is_a_resident && (
            <TouchableOpacity
              style={styles.touchCluster}
              onPress={() => {
                NavigatorService.navigate('ListCluster', {
                  listClusters: state.item?.clusters,
                });
              }}
            >
              <Image style={styles.icHomeCluster} source={allLogo.icHomeCluster} />
              <CustomText
                textType="medium"
                allowFontScaling={false}
                style={[styles.textCluster, { color: '#273238' }]}
              >
                {state.item?.clusters.length} Cluster
              </CustomText>
            </TouchableOpacity>
          )}

          {!state.hide && (
            <TouchableOpacity
              style={styles.viewFooterRow}
              onPress={() => {
                setState((state: any) => ({
                  ...state,
                  modalVisible: true,
                }));
              }}
            >
              <Image style={styles.icMessage} source={allLogo.icMessage} />
              <CustomText
                textType="medium"
                allowFontScaling={false}
                style={[styles.textCount, { color: '#273238' }]}
              >
                {state.total}
              </CustomText>
            </TouchableOpacity>
          )}
          <View style={{ width: toDp(8) }} />

          {state.dataUser.is_a_resident ? (
            <TouchableOpacity
              style={styles.viewFooterRow}
              onPress={() => {
                like(state.item?.like, state.item?.is_liked);
                if (props.route.params.like) {
                  props.route.params.like(props.route.params.id, state.item?.is_liked);
                } else {
                  if (!state.item?.is_liked) {
                    Vibration.vibrate(100);
                  }
                  let body = { is_a_like: state.item?.is_liked };
                  putLike('/' + props.route.params.id, body)
                    .then((response) => {
                      console.log(response);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              }}
            >
              <Image
                style={styles.icMessage}
                source={state.item?.is_liked ? allLogo.icLikeNewsActive : allLogo.icLikeNews}
              />
              <CustomText
                textType="medium"
                allowFontScaling={false}
                style={[styles.textCount, { color: '#273238' }]}
              >
                {state.item?.like}
              </CustomText>
            </TouchableOpacity>
          ) : (
            <View style={styles.viewFooterRow}>
              <Image
                style={styles.icMessage}
                source={state.item?.is_liked ? allLogo.icLikeNewsActive : allLogo.icLikeNews}
              />
              <CustomText
                textType="medium"
                allowFontScaling={false}
                style={[styles.textCount, { color: '#273238' }]}
              >
                {state.item?.like}
              </CustomText>
            </View>
          )}

          <View style={{ width: toDp(16) }} />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? toDp(28) : 0,
  },
  viewText: {
    width: '86%',
    //height: toDp(40),
    height: 'auto',
    backgroundColor: '#F3F5F6',
    marginLeft: toDp(8),
    borderRadius: toDp(10),
    //padding: toDp(12)
  },
  textInput: {
    flex: 1,
    fontSize: toDp(14),
    fontWeight: '400',
    color: '#35405A',
    marginHorizontal: toDp(12),
    width: width * 0.61,
    fontFamily: 'Poppins-Regular',
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    fontWeight: '400',
    //marginLeft: Platform.OS === 'android' ? toDp(-4) : 0,
  },
  textMore: {
    fontSize: toDp(12),
    color: '#56a7d4',
    marginTop: toDp(2),
  },
  viewStatusNew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: toDp(12),
  },
  touchCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'cyan',
    position: 'absolute',
    bottom: getBottomSpace() + toDp(12),
    left: toDp(16),
  },
  textCluster: {
    fontSize: toDp(12),
    color: '#273238',
  },
  icNext: {
    width: toDp(24),
    height: toDp(24),
    marginRight: toDp(-8),
    tintColor: '#917438',
  },
  headeriOS: {
    width,
    height: toDp(20),
    backgroundColor: '#917438',
  },
  content: {
    flex: 1,
    //padding: toDp(16)
  },
  textTitle: {
    fontSize: toDp(16),
    color: '#273238',
    fontWeight: '600',
  },
  textDate: {
    fontSize: toDp(12),
    color: '#868A8E',
    letterSpacing: 0,
    marginTop: toDp(6),
  },
  textCreate: {
    fontSize: toDp(12),
    color: '#917438',
    letterSpacing: 0,
  },
  viewStatus: {
    width: toDp(69),
    height: toDp(25),
    borderRadius: toDp(12),
    backgroundColor: '#f2c141',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStatus: {
    fontSize: toDp(12),
    color: '#FFFFFF',
  },
  textDesc: {
    marginTop: toDp(16),
    fontSize: toDp(12),
    color: '#273238',
  },
  textDescWebView: {
    marginTop: toDp(16),
    width: '100%',
    height: toDp(100),
  },
  img: {
    width,
    height: toDp(240),
    resizeMode: 'cover',
  },
  detailInfo: {
    marginTop: toDp(16),
    width: '100%',
    height: 'auto',
    borderRadius: toDp(6),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  viewValue: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: toDp(12),
  },
  textValue: {
    fontSize: toDp(14),
    color: '#000000',
    letterSpacing: toDp(0.05),
  },
  viewRowLike: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: toDp(12),
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
  footer: {
    width,
    height: toDp(48) + getBottomSpace(),
    paddingBottom: Platform.OS === 'android' ? toDp(10) : getBottomSpace(),
    borderTopWidth: Platform.OS === 'ios' ? toDp(1) : 0,
    borderTopColor: '#838A9A40',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: toDp(0.8),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  viewFooterRow: {
    width: toDp(58),
    height: toDp(32),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icMessage: {
    width: toDp(16),
    height: toDp(16),
  },
  textCount: {
    fontSize: toDp(12),
    color: '#273238',
    letterSpacing: toDp(0.05),
    fontWeight: '500',
    marginLeft: toDp(6),
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
    height: height * 0.7,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: toDp(16),
    borderTopRightRadius: toDp(16),
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewModalTitle: {
    marginVertical: toDp(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitleModal: {
    fontSize: toDp(12),
    letterSpacing: toDp(2),
    color: '#263238',
    fontWeight: '700',
  },
  touchSilang: {
    padding: toDp(4),
  },
  icSilang: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#263238',
  },
  modalFooter: {
    width,
    height: toDp(60) + getBottomSpace(),
    backgroundColor: 'white',
    borderTopWidth: Platform.OS === 'ios' ? toDp(1) : 0,
    borderTopColor: '#838A9A40',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: toDp(0.8),
    flexDirection: 'row',
    paddingHorizontal: toDp(8),
    paddingTop: toDp(10),
    paddingBottom: Platform.OS === 'android' ? 0 : isIphoneX() ? getBottomSpace() : toDp(10),
  },
  imgUser: {
    width: toDp(40),
    height: toDp(40),
    borderRadius: toDp(20),
  },
  touchPost: {
    position: 'absolute',
    right: toDp(20),
    top: toDp(24),
  },
  textPost: {
    fontSize: toDp(12),
    color: '#5AAA0F',
    fontWeight: '600',
  },
  bgShadow: {
    width,
    height,
    backgroundColor: '#0000004D',
  },
  rowFront: {
    width,
    backgroundColor: 'white',
    flexDirection: 'row',
    //alignItems: 'center',
    height: 'auto',
    justifyContent: 'space-between',
    paddingVertical: toDp(12),
  },
  imgCommentUser: {
    width: toDp(40),
    height: toDp(40),
    borderRadius: toDp(20),
    marginHorizontal: toDp(16),
  },
  textName: {
    fontSize: toDp(12),
    color: '#788F9C',
    fontWeight: '600',
  },
  textMessage: {
    fontSize: toDp(14),
    color: '#000000',
    fontWeight: '400',
    marginTop: toDp(4),
    width: width * 0.755,
  },
  textTime: {
    fontSize: toDp(12),
    color: '#788F9C',
    fontWeight: '400',
    position: 'absolute',
    right: toDp(16),
    top: toDp(12),
  },
  viewUserName: {
    flexDirection: 'row',
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  touchDelete: {
    flex: 1,
    backgroundColor: '#EE4040',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icCommentDelete: {
    tintColor: 'white',
    width: toDp(26.67),
    height: toDp(26.67),
  },
  viewArrayStatus: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewEmpty: {
    alignItems: 'center',
    marginTop: toDp(-120),
  },
  textBelum: {
    marginTop: toDp(20),
    fontSize: toDp(14),
    color: '#35405A',
    fontWeight: '500',
  },
  textMulai: {
    fontSize: toDp(14),
    color: '#838A9A',
    fontWeight: '400',
    marginTop: toDp(6),
  },
  viewHeader: {
    width,
    height: toDp(60),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: toDp(16),
    backgroundColor: '#383B341A',
    position: 'absolute',
    top: toDp(30),
  },
  touchHeader: {
    padding: toDp(4),
  },
  icBack: {
    width: toDp(24),
    height: toDp(24),
    tintColor: 'white',
  },
  imgEmptyNews: {
    width: toDp(120),
    height: toDp(120),
  },
  icHomeCluster: {
    width: toDp(20),
    height: toDp(20),
    marginRight: toDp(5),
  },
  headerRow: {
    position: 'absolute',
    right: toDp(12),
    top: toDp(16),
    flexDirection: 'row',
  },
  touchHeaderSearch: {
    padding: toDp(4),
  },
});

export default DetailsNewsScreen;
