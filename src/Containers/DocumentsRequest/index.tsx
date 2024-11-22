import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';
import NoConnection from '../../Components/NoConnection';

import moment from 'moment';
import Modal from 'react-native-modal';
import { allLogo } from '../../Assets';
import CustomText from '../../Components/CustomText';
import Empty from '../../Components/Empty';
import { toDp } from '../../Helper/percentageToDP';

import Toast from '../../Components/Toast';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import { getDocumentsRequestMobile } from '../../Services/Apis';

import * as NavigatorService from '../../Helper/NavigatorServices';
import styles from './styles';
let limit = 0;

const { width, height } = Dimensions.get('window');
const DocumentsRequest = (props: any) => {
  const netInfo = useNetInfo();
  const toast = useRef<any>(null);
  const [state, setState] = useState<any>({
    dataUser: props.route.params.dataUser,
    arrayData: [],
    loading: true,
    messages: '',
    filter: 'all',
    //modalVisible: false,
    //modalVisible: true,
    modalVisible: props.modalVisible,
    page: 1,
    total: 0,
    totalPage: 0,
    limit: 20,
    connection: true,
    darkMode: false,
    arrayStatus: [],
    activeStatus: 'Semua',
    activeIdStatus: [],
    activePublik: 'Pribadi',
    arrayCategory: [],
    statusAll: true,
    objFilter: null,
    isConnected: true,
  });

  useEffect(() => {
    getAllLoadData();
  }, []);

  const getAllLoadData = () => {
    loadComplains();
    limit = state.limit;
  };

  const loadComplains = () => {
    setState((state: any) => ({ ...state, loading: state.page === 1 ? true : false }));
    let params = '?per_page=20&page=' + state.page;
    getDocumentsRequestMobile(params)
      .then((response) => {
        console.log(response);
        if (state.page === 1) {
          setState((state: any) => ({
            ...state,
            loading: false,
            arrayData: response.data.data,
            total: response.data.meta.total,
            totalPage: response.data.meta.total_page,
          }));
        } else {
          setState((state: any) => ({
            ...state,
            loading: false,
            arrayData: [...state.arrayData, ...response.data.data],
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        setState((state: any) => ({ ...state, loading: false, arrayData: [] }));
      });
  };

  const showMessageSuccess = () => {
    toast.current.show('Documents Anda berhasil terkirim.');
  };

  const showMessageDelete = () => {
    toast.current.show('Documents Anda berhasil dibatalkan');
  };

  const showModalFilter = () => {
    setState((state: any) => ({ ...state, modalVisible: true }));
  };

  const renderLabel = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.viewTextModal,
          { borderBottomColor: props.darkMode ? '#1C1C1E' : '#e9ebed' },
        ]}
        key={index}
        onPress={() => {
          setState((state: any) => ({
            ...state,
            statusAll: !state.statusAll,
            arrayCategory: state.arrayCategory.map((data: any, i: number) => {
              if (index == 0) {
                return {
                  ...data,
                  status: !state.statusAll,
                };
              }
              return {
                ...data,
                status: data.name === item.name ? !data.status : data.status,
              };
            }),
          }));
        }}
      >
        <CustomText
          textType="regular"
          allowFontScaling={false}
          style={[styles.textWhiteTitle, { color: state.darkMode ? 'white' : '#273238' }]}
        >
          {item.name ? item.name : item}
        </CustomText>
        <Image
          source={item.status ? allLogo.icNewsCheck : allLogo.icCheckboxUnChecked}
          style={styles.icCheckbox}
        />
      </TouchableOpacity>
    );
  };

  const renderStatus = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setState((state: any) => ({
            ...state,
            activeIdStatus: [item.id],
            activeStatus: item.name,
            page: 1,
            limit: 20,
          }));
          limit = state.limit;
        }}
        style={[
          styles.touchStatus,
          {
            backgroundColor:
              item.name == state.activeStatus ? '#E5F9CC' : state.darkMode ? '#1C1C1E' : '#ffffff',
            borderColor:
              item.name === state.activeStatus ? '#5AAA0F' : state.darkMode ? '#1C1C1E' : '#d3d6db',
          },
        ]}
      >
        <CustomText
          textType={item.name === state.activeStatus ? 'semibold' : 'regular'}
          allowFontScaling={false}
          style={[
            styles.textStatusItem,
            {
              color:
                item.name === state.activeStatus ? '#5AAA0F' : state.darkMode ? 'white' : '#9B9F95',
            },
          ]}
        >
          {item.name}
        </CustomText>
      </TouchableOpacity>
    );
  };

  const bersih = () => {
    setState((state: any) => ({
      ...state,
      activeStatus: 'Semua',
      activeIdStatus: 'all',
      activePublik: 'Pribadi',
      statusAll: true,
      arrayCategory: state.arrayCategory.map((data: any, i: number) => {
        return {
          ...data,
          status: true,
        };
      }),
    }));
  };

  const simpan = () => {
    let labelId = [];
    for (var i = 0; i < state.arrayCategory.length; i++) {
      if (state.arrayCategory[i].status && state.arrayCategory[i].id !== 0) {
        labelId.push(state.arrayCategory[i].id);
      }
    }

    let objFilter: any = null;

    if (state.activePublik === 'Semua') {
      if (state.activeIdStatus === 'all') {
        objFilter = {
          complaint_category_id: labelId,
        };
      } else {
        objFilter = {
          complaint_status_id: state.activeIdStatus,
          complaint_category_id: labelId,
        };
      }
    } else {
      if (state.activeIdStatus === 'all') {
        objFilter = {
          is_public: state.activePublik === 'Publik',
          complaint_category_id: labelId,
        };
      } else {
        objFilter = {
          complaint_status_id: state.activeIdStatus,
          is_public: state.activePublik === 'Publik',
          complaint_category_id: labelId,
        };
      }
    }

    setState((state: any) => ({ ...state, objFilter, modalVisible: false }));

    //loadComplains()
  };

  const renderModalFilter = () => {
    return (
      <Modal
        onBackButtonPress={() => setState((state: any) => ({ ...state, modalVisible: false }))}
        onBackdropPress={() => setState((state: any) => ({ ...state, modalVisible: false }))}
        isVisible={state.modalVisible}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View
            style={[
              styles.modalBox,
              {
                height: height * 0.7,
                backgroundColor: state.darkMode ? '#121212' : 'white',
              },
            ]}
          >
            <View style={styles.viewModalTitle}>
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                style={[styles.textTitleModal, { color: state.darkMode ? 'white' : '#263238' }]}
              >
                FILTER
              </CustomText>
              <TouchableOpacity
                style={styles.touchSilang}
                onPress={() => setState((state: any) => ({ ...state, modalVisible: false }))}
              >
                <Image
                  source={allLogo.icSilang}
                  style={[styles.icSilang, { tintColor: props.darkMode ? 'white' : '#263238' }]}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.viewArrayStatus, { marginTop: 0 }]}>
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={state.arrayCategory}
                renderItem={renderLabel}
                numColumns={1}
                ListHeaderComponent={() => {
                  return (
                    <View style={{ width: '100%' }}>
                      <View
                        style={[styles.viewArrayStatus, { marginTop: 0, paddingHorizontal: 0 }]}
                      >
                        <FlatList
                          data={[]}
                          renderItem={() => <View />}
                          numColumns={3}
                          ListHeaderComponent={() => {
                            return (
                              <View style={{ width: '100%' }}>
                                <View style={[styles.viewArrayStatus, { paddingHorizontal: 0 }]}>
                                  <CustomText
                                    textType="semibold"
                                    allowFontScaling={false}
                                    style={[
                                      styles.textModalTitle,
                                      { color: state.darkMode ? 'white' : '#9B9F95' },
                                    ]}
                                  >
                                    Status
                                  </CustomText>
                                  <FlatList
                                    data={state.arrayStatus}
                                    renderItem={renderStatus}
                                    numColumns={3}
                                  />
                                </View>
                              </View>
                            );
                          }}
                        />
                      </View>
                      <View style={styles.lineModalDialog} />
                      <CustomText
                        textType="semibold"
                        allowFontScaling={false}
                        style={[
                          styles.textModalTitle,
                          { color: state.darkMode ? 'white' : '#9B9F95' },
                        ]}
                      >
                        Label
                      </CustomText>
                    </View>
                  );
                }}
                ListFooterComponent={() => <View style={{ height: toDp(100) }} />}
              />
            </View>
          </View>

          <View
            style={[
              styles.viewFooterDialog,
              { backgroundColor: state.darkMode ? '#121212' : 'white' },
            ]}
          >
            <TouchableOpacity style={styles.touchBershikan} onPress={() => bersih()}>
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                style={[styles.textBersihkan, { color: state.darkMode ? 'white' : '#5AAA0F' }]}
              >
                Atur Ulang
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchSimpan} onPress={() => simpan()}>
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                style={[styles.textSimpan, { color: state.darkMode ? 'white' : 'white' }]}
              >
                Simpan
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  // useEffect(() => {
  //   loadComplains(state.page)
  // }, [state.page])

  const renderItemShimmer = ({ item, index }: any) => {
    return (
      <View
        style={[styles.containerItem, { backgroundColor: state.darkMode ? '#121212' : 'white' }]}
      >
        <View style={[styles.cards, { backgroundColor: state.darkMode ? '#121212' : 'white' }]}>
          <View style={styles.viewRow}>
            <ShimmerPlaceHolder style={styles.imgPicture} />
            <View>
              <View style={{ height: toDp(4) }} />
              <ShimmerPlaceHolder style={styles.itemTitle} />
              <View style={styles.viewRowItem}>
                <ShimmerPlaceHolder style={{ width: toDp(80) }} />
              </View>
              <View style={styles.viewRowItem}>
                <ShimmerPlaceHolder style={{ width: toDp(120) }} />
              </View>
              <ShimmerPlaceHolder style={[styles.viewStatus, { width: toDp(85) }]} />
            </View>
          </View>
        </View>
      </View>
    );
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

  const changeColorStatus = (name: any) => {
    if (name === 'Terkirim') {
      return '#f53c3c';
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
    if (name === 'Terkirim') {
      return toDp(60);
    } else if (name === 'Proses') {
      return toDp(56);
    } else if (name === 'Selesai') {
      return toDp(56);
    } else if (name === 'Batal') {
      return toDp(50);
    } else if (name === 'Invalid') {
      return toDp(60);
    }
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={state.darkMode ? 1 : 0.2}
        style={[
          styles.containerItem,
          {
            backgroundColor: state.darkMode ? '#121212' : 'white',
          },
        ]}
        onPress={() =>
          NavigatorService.navigate('DetailsDocumentsRequestScreen', {
            item,
            showMessageDelete,
            loadComplains,
          })
        }
      >
        <View style={[styles.cards, { backgroundColor: state.darkMode ? '#121212' : 'white' }]}>
          <View style={styles.viewRow}>
            {/*<Image
              style={styles.imgPicture}
              source={{uri: item?.complaint_report_images[0]?.image_url}}
            />*/}
            <View>
              <CustomText
                textType="semibold"
                numberOfLines={1}
                allowFontScaling={false}
                ellipsizeMode="tail"
                style={[
                  styles.itemTitle,
                  {
                    width: toDp(300),
                    color: state.darkMode ? 'white' : '#383B34',
                  },
                ]}
              >
                {item.document.name}
              </CustomText>
              <View style={styles.viewRowItem}>
                <Image
                  source={allLogo.icLp}
                  style={[styles.icLp, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
                />
                <CustomText
                  numberOfLines={1}
                  allowFontScaling={false}
                  ellipsizeMode="tail"
                  style={[
                    styles.text,
                    { width: toDp(300), color: state.darkMode ? 'white' : '#5E6157' },
                  ]}
                >
                  {item.description ? item.description : 'Tidak ada'}
                </CustomText>
              </View>
              <View style={styles.viewRowItem}>
                <Image
                  source={allLogo.icCalendar}
                  style={[styles.icCalendar, { tintColor: state.darkMode ? 'white' : '#9B9F95' }]}
                />
                <CustomText
                  allowFontScaling={false}
                  style={[styles.text, { color: state.darkMode ? 'white' : '#5E6157' }]}
                >
                  {moment(item.created_at).format('DD MMMM YYYY')}
                </CustomText>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={[
                    styles.viewStatus,
                    {
                      width: changeWidthStatus(item.status),
                      backgroundColor: changeColorStatus(item.status),
                    },
                  ]}
                >
                  <CustomText textType="medium" allowFontScaling={false} style={styles.textStatus}>
                    {item.status}
                  </CustomText>
                </View>
                <View style={{ width: toDp(6) }} />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
        <View style={{ width: toDp(40) }}>
          <TouchableOpacity style={styles.touchHeader} onPress={() => props.navigation.goBack()}>
            <Image source={allLogo.icBack} style={styles.icBack} />
          </TouchableOpacity>
        </View>

        <CustomText textType="medium" style={styles.title}>
          {'Documents Request'}
        </CustomText>

        <View style={{ width: toDp(40), alignItems: 'flex-end' }}>
          {/*<View style={styles.headerRow}>
            <TouchableOpacity style={styles.touchHeaderSearch} onPress={() => {
              setState(state => ({...state, modalVisible: true}))
            }}>
              <Image source={allLogo.icFilter} style={styles.icFilter} />
            </TouchableOpacity>
          </View>*/}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      {renderHeader()}
      <Toast ref={toast} />
      {renderModalFilter()}
      <View style={[styles.content, { backgroundColor: state.darkMode ? '#121212' : '#f5f7f8' }]}>
        {!netInfo.isConnected ? (
          <NoConnection />
        ) : state.arrayData.length === 0 && !state.loading ? (
          <Empty
            title={'Belum ada dokumen'}
            subtitle={'Silakan buat dokumen pertama Anda'}
            images={allLogo.imgEmptyNews}
          />
        ) : (
          <ScrollView
            removeClippedSubviews={true}
            refreshControl={
              <RefreshControl
                refreshing={state.loading}
                onRefresh={() => {
                  limit = 0;
                  setState((state: any) => ({
                    ...state,
                    total: 0,
                    totalPage: 0,
                    arrayData: [],
                    page: 1,
                  }));
                  // loadComplains(state.page); // ini harus diperbaiki ...
                  loadComplains();
                }}
              />
            }
            onMomentumScrollEnd={(e: any) => {
              let hasil = limit - e.nativeEvent.contentOffset.y / toDp(127);
              if (hasil <= 5 && state.page < state.totalPage) {
                let page = state.page++;
                // loadComplains(page);
                loadComplains();
                limit += state.limit;
              }

              console.log('TOTAL PAGE', state.totalPage);

              console.log('HASIL', hasil);

              console.log('LIMIT', limit);

              console.log('arrayData.length', state.arrayData.length);
            }}
          >
            <FlatList
              removeClippedSubviews={true}
              data={state.loading ? ['', '', '', '', ''] : state.arrayData}
              renderItem={state.loading ? renderItemShimmer : renderItem}
              ListFooterComponent={state.page < state.totalPage ? renderFooter() : <View />}
            />
          </ScrollView>
        )}
      </View>
      // @ts-expect-error TS(2769): No overload matches this call.
      <LinearGradient
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 0.7, y: 1.0 }}
        colors={['#5AAA0F', '#5AAA0F']}
        style={styles.linearFab}
      >
        <TouchableOpacity
          style={styles.fabAdd}
          onPress={() => {
            NavigatorService.navigate('AddDocumentsRequestScreen', {
              loadComplains: loadComplains,
              showMessageSuccess: showMessageSuccess,
              dataUser: props.route.params.dataUser,
            });
          }}
        >
          <Image source={allLogo.icAdd} style={styles.icAdd} />
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default DocumentsRequest;
