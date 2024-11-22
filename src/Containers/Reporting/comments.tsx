import { useNetInfo } from '@react-native-community/netinfo';
import { allLogo } from '@src/Assets';
import CustomText from '@src/Components/CustomText';
import Empty from '@src/Components/Empty';
import Header from '@src/Components/Header';
import NoConnection from '@src/Components/NoConnection';
import { toDp } from '@src/Helper/percentageToDP';
import {
  deleteCommentComplaints,
  getCommentComplaints,
  postCommentComplaints,
} from '@src/Services/Apis';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
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
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getBottomSpace, isIphoneX } from 'react-native-iphone-x-helper';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

const { width, height } = Dimensions.get('window');
let limit = 0;

const CommentsScreen = (props: any) => {
  const netInfo = useNetInfo();
  const [state, setState] = useState({
    dataUser: props.route.params.dataUser,
    darkMode: false,
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
  });

  useEffect(() => {
    loadComment();
  }, []);

  const loadComment = () => {
    setState((state) => ({ ...state, loadingComments: state.page === 1 ? true : false }));

    let params = '/' + props.route.params.id + '?page=' + state.page + '&per_page=' + state.perPage;
    getCommentComplaints(params)
      .then((response: any) => {
        console.log(response);
        if (state.page === 1) {
          setState((state) => ({
            ...state,
            loading: false,
            loadingComments: false,
            arrayComments: response.data.comment_complaint_reports.map((data: any, index: any) => {
              return {
                ...data,
                key: '' + index,
              };
            }),
            total: response.data.meta.total,
            totalPage: response.data.meta.total_page,
          }));
        } else {
          // @ts-expect-error TS(2345): Argument of type '(state: { dataUser: any; darkMod... Remove this comment to see the full error message
          setState((state) => ({
            ...state,
            loading: false,
            loadingComments: false,
            arrayComments: [...state.arrayComments, ...response.data.comment_complaint_reports],
          }));
        }
      })
      .catch((error: any) => {
        setState((state) => ({
          ...state,
          loading: false,
          loadingComments: false,
          arrayComments: [],
        }));
      });
  };

  const send = () => {
    setState((state) => ({ ...state, loadingSend: true }));
    let body = {
      message: state.comment,
      complaint_report_id: props.route.params.id,
    };
    postCommentComplaints(body)
      .then((response: any) => {
        Keyboard.dismiss();
        setState((state) => ({ ...state, loadingSend: false, comment: '', page: 1 }));

        loadComment();
        //scroll.scrollTo()
      })
      .catch((error: any) => {
        console.log(error);
        setState((state) => ({ ...state, loadingSend: false }));
      });
  };

  const deleteComments = (id: any) => {
    setState((state) => ({ ...state, loadingDelete: true }));
    deleteCommentComplaints('/' + id)
      .then((response: any) => {
        setState((state) => ({ ...state, loadingDelete: false, page: 1 }));
        loadComment();
      })
      .catch((error: any) => {
        console.log(error);
        // @ts-expect-error TS(2552): Cannot find name 'alert'. Did you mean 'Alert'?
        alert(error.data.message);
        setState((state) => ({ ...state, loadingDelete: false }));
      });
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

  const renderFooter = () => {
    return (
      <ActivityIndicator
        size="large"
        color={state.darkMode ? 'white' : '#5AAA0F'}
        style={{ marginVertical: toDp(24) }}
      />
    );
  };

  const renderItem = (data: any, rowMap: any) => {
    return (
      <View style={[styles.rowFront, { backgroundColor: state.darkMode ? '#121212' : 'white' }]}>
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
                style={[
                  styles.textName,
                  { width: toDp(120), color: state.darkMode ? '#ebebeb' : '#9B9F95' },
                ]}
              >
                {data.item.user.name}
              </CustomText>

              {!data.item.user.is_a_resident && (
                <CustomText
                  allowFontScaling={false}
                  style={[
                    styles.textName,
                    { marginRight: toDp(8), color: state.darkMode ? 'white' : '#9B9F95' },
                  ]}
                >
                  {' '}
                  ●
                </CustomText>
              )}
              {!data.item.user.is_a_resident && (
                <CustomText
                  textType="medium"
                  allowFontScaling={false}
                  style={[
                    styles.textName,
                    { color: state.darkMode ? 'white' : '#006432', fontWeight: '500' },
                  ]}
                >
                  Pengelola
                </CustomText>
              )}
            </View>
            <ViewMoreText
              textStyle={{
                marginTop: toDp(4),
                width: width * 0.755,
              }}
              numberOfLines={3}
              renderViewMore={(onPress: any) => (
                <CustomText
                  textType="semibold"
                  allowFontScaling={false}
                  style={styles.textMore}
                  onPress={onPress}
                >
                  Lihat lebih banyak
                </CustomText>
              )}
              renderViewLess={(onPress: any) => (
                <CustomText
                  textType="semibold"
                  allowFontScaling={false}
                  style={styles.textMore}
                  onPress={onPress}
                >
                  Lihat lebih sedikit
                </CustomText>
              )}
            >
              <CustomText
                style={[styles.textMessage, { color: state.darkMode ? 'white' : '#000000' }]}
                ellipsizeMode="tail"
              >
                {data.item.message}
              </CustomText>
            </ViewMoreText>
          </View>
        </View>
        <CustomText
          allowFontScaling={false}
          style={[styles.textTime, { color: state.darkMode ? '#d6d6d6' : '#9B9F95' }]}
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
      <View style={[styles.rowBack, { backgroundColor: state.darkMode ? '#121212' : 'white' }]}>
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
                    text: 'Batal',
                    onPress: () => {},
                  },
                  {
                    text: 'Hapus',
                    onPress: () => {
                      deleteComments(data.item.id);
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Komentar'} onPress={() => props.navigation.goBack()} />
      <View
        style={[
          styles.viewArrayStatus,
          { backgroundColor: state.darkMode ? '#121212' : '#F6F6F8' },
        ]}
      >
        {!netInfo.isConnected ? (
          <View style={styles.viewCenterLoading}>
            <NoConnection />
          </View>
        ) : state.total === 0 && state.loadingComments ? (
          <View style={styles.viewEmpty}>
            <ActivityIndicator size="large" color={state.darkMode ? 'white' : '#5AAA0F'} />
          </View>
        ) : state.total === 0 ? (
          <Empty
            title={'Belum ada komentar'}
            subtitle={'Mulai percakapan dengan pengelola'}
            images={allLogo.imgEmptyNews}
          />
        ) : (
          <ScrollView
            removeClippedSubviews={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={state.loadingComments}
                onRefresh={() => {
                  (limit = 0),
                    setState((state) => ({
                      ...state,
                      total: 0,
                      totalPage: 0,
                      arrayComments: [],
                      page: 1,
                    }));
                  // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
                  loadComment(state.page);
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
                loadComment(page);
                limit += state.limit;
              }
            }}
          >
            <SwipeListView
              data={state.arrayComments}
              renderItem={(rowData, rowMap) => (
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : null}
        keyboardVerticalOffset={isIphoneX() ? toDp(-20) : toDp(0)}
      >
        <View
          style={[styles.modalFooter, { backgroundColor: state.darkMode ? '#121212' : 'white' }]}
        >
          <TouchableOpacity
            onPress={() => {
              setState((state) => ({ ...state, modalVisibleInput: true }));
            }}
          >
            {state.dataUser?.image_url === '' ? (
              <Image style={styles.imgUser} source={allLogo.imgDefault} />
            ) : (
              <Image style={styles.imgUser} source={{ uri: state.dataUser?.image_url }} />
            )}
          </TouchableOpacity>
          <View
            style={[styles.viewText, { backgroundColor: state.darkMode ? '#1C1C1E' : '#F3F5F6' }]}
          >
            <TextInput
              onChangeText={(response: any) => {
                setState((state) => ({ ...state, comment: response }));
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
              style={[styles.textInput, { color: state.darkMode ? 'white' : '#35405A' }]}
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
                <CustomText
                  textType="medium"
                  allowFontScaling={false}
                  style={[styles.textPost, { color: '#5AAA0F' }]}
                >
                  Kirim
                </CustomText>
              </TouchableOpacity>
            )
          ) : (
            <View />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom: Platform.OS === 'android' ? toDp(12) : 0,
  },
  modalFooter: {
    width,
    backgroundColor: 'white',
    borderTopWidth: toDp(1),
    borderTopColor: '#838A9A40',
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
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(12),
    color: '#5AAA0F',
    fontWeight: '600',
  },
  bgShadow: {
    width,
    height,
    backgroundColor: '#0000004D',
  },
  textMore: {
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-SemiBold',
    color: '#56a7d4',
    marginTop: toDp(2),
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
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(12),
    color: '#788F9C',
    fontWeight: '600',
  },
  textMessage: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(14),
    color: '#000000',
    fontWeight: '400',
  },
  textTime: {
    //fontFamily: 'Montserrat-Regular',
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
    backgroundColor: 'white',
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
    backgroundColor: '#F6F6F8',
  },
  viewEmpty: {
    alignItems: 'center',
    marginTop: toDp(-24),
  },
  textBelum: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(14),
    color: '#35405A',
    fontWeight: '500',
  },
  textMulai: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(14),
    color: '#838A9A',
    fontWeight: '400',
    marginTop: toDp(6),
  },
  viewText: {
    width: '86%',
    height: 'auto',
    backgroundColor: '#F3F5F6',
    marginLeft: toDp(8),
    borderRadius: toDp(2),
  },
  textInput: {
    flex: 1,
    fontSize: toDp(12),
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    color: '#273238',
    marginHorizontal: toDp(12),
    width: width * 0.61,
  },
  viewCenterLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7f8',
  },
});

export default CommentsScreen;
