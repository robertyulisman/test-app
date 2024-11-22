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

import { allLogo } from '../../Assets';
import Header from '../../Components/Header';
import { toDp } from '../../Helper/percentageToDP';

import { useNetInfo } from '@react-native-community/netinfo';
import Empty from '../../Components/Empty';
import NoConnection from '../../Components/NoConnection';

import CustomComboBox from '../../Components/CustomComboBox';
import CustomText from '../../Components/CustomText';
import * as NavigatorService from '../../Helper/NavigatorServices';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import { getCctvsResidents, getUnitsTower, postCctvsResidents } from '../../Services/Apis';
let limit = 0;
const { width, height } = Dimensions.get('window');
const CCTVScreen = (props: any) => {
  const netInfo = useNetInfo();
  const [state, setState] = useState({
    dataUser: props.route.params.dataUser,
    loading: true,
    tower: {
      id: 'allcluster',
      name: 'SEMUA CLUSTER',
    },
    arrTower: [],
    arrayData: [],
    page: 1,
    total: 0,
    totalPage: 0,
    limit: 20,
    darkMode: false,
  });

  useEffect(() => {
    limit = 0;
    if (props.route.params.dataUser.is_a_resident) {
      loadCCTVResident(1);
    } else {
      getUnitsTower('')
        .then((response) => {
          let tempTower: any = [];
          tempTower.push({
            id: 'allcluster',
            name: 'SEMUA CLUSTER',
          });
          for (var i = 0; i < response.data.length; i++) {
            tempTower.push({
              id: response.data[i].id,
              name: response.data[i].name,
            });
          }
          setState((state: any) => ({
            ...state,
            arrTower: tempTower,
            loading: false,
          }));
        })
        .catch((error) => {
          console.log(error);
          setState((state) => ({ ...state, loading: false }));
        });
      loadCCTV(1, { filter: { cluster_id: [] } });
    }
  }, []);

  const loadCCTVResident = (page: any) => {
    getCctvsResidents('?page=' + page)
      .then((response) => {
        console.log(response);
        if (page === 1) {
          setState((state) => ({
            ...state,
            loading: false,
            arrayData: response.data.cameras,
            total: response.data.meta.total,
            totalPage: response.data.meta.total_page,
            page,
          }));
        } else {
          setState((state: any) => ({
            ...state,
            loading: false,
            arrayData: [...state.arrayData, ...response.data.cameras],
            page,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        setState((state) => ({ ...state, loading: false, page: 1 }));
      });
  };

  const loadCCTV = (page: any, body: any) => {
    postCctvsResidents('?page=' + page, body)
      .then((response) => {
        console.log(response);

        console.log('loadCCTV state.page', state.page);
        if (page === 1) {
          setState((state) => ({
            ...state,
            loading: false,
            arrayData: response.data.cameras,
            total: response.data.meta.total,
            totalPage: response.data.meta.total_page,
            page,
          }));
        } else {
          setState((state: any) => ({
            ...state,
            loading: false,
            arrayData: [...state.arrayData, ...response.data.cameras],
            page,
          }));
        }
      })
      .catch((error) => {
        console.log(error);
        setState((state) => ({ ...state, loading: false, page: 1 }));
      });
    limit = state.limit;
  };

  const renderItemShimmer = ({ item, index }: any) => {
    return (
      <View style={[styles.touchMenu, { height: toDp(132) }]}>
        <ShimmerPlaceHolder style={styles.viewShimmer} />
        <ShimmerPlaceHolder style={styles.textShimmer} />
      </View>
    );
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.touchMenu}
        onPress={() => {
          NavigatorService.navigate('DetailsCCTV', { item });
        }}
      >
        <Image
          resizeMode="contain"
          source={{ uri: item.source_url + '&mode=single' }}
          style={styles.viewShimmer}
        />
        <View style={styles.viewTextPosition}>
          <CustomText numberOfLines={1} ellipsizeMode="tail" style={styles.textTitleMenu}>
            {item.name}
          </CustomText>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <View style={{ marginBottom: toDp(16) }}>
        {!state.loading && (
          <CustomComboBox
            darkMode={false}
            title={'Cluster'}
            desc={''}
            textPlaceholder={'Pilih cluster'}
            value={state.tower?.name}
            arrayData={state.arrTower}
            onSelected={(item: any, index: number) => {
              setState((state) => ({
                ...state,
                tower: {
                  id: item.id,
                  name: item.name,
                },
              }));
              if (index === 0) {
                loadCCTV(1, { filter: { cluster_id: [] } });
                return;
              }
              let body = {
                filter: {
                  cluster_id: [item.id],
                },
              };
              loadCCTV(1, body);
            }}
          />
        )}
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'CCTV'} onPress={() => props.navigation.goBack()} />

      {!netInfo.isConnected ? (
        <View style={styles.viewCenterNoConnecttion}>
          <NoConnection />
        </View>
      ) : (
        <View style={styles.viewTextTitle}>
          {state.arrayData.length === 0 &&
            !props.route.params.dataUser.is_a_resident &&
            renderHeader()}
          {state.arrayData.length === 0 && !state.loading ? (
            <View style={styles.viewCenter}>
              <Empty images={allLogo.imgEmptyNews} title={'Belum ada cctv'} />
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              removeClippedSubviews={true}
              refreshControl={
                <RefreshControl
                  refreshing={state.loading}
                  onRefresh={() => {
                    if (props.route.params.dataUser.is_a_resident) {
                      loadCCTVResident(1);
                    } else {
                      setState((state) => ({
                        ...state,
                        loading: true,
                        tower: {
                          id: 'allcluster',
                          name: 'SEMUA CLUSTER',
                        },
                      }));
                      loadCCTV(1, { filter: { cluster_id: [] } });
                    }
                  }}
                />
              }
              onMomentumScrollEnd={(e: any) => {
                console.log('e.nativeEvent.contentOffset.y', e.nativeEvent.contentOffset.y);
                let hasil = limit - e.nativeEvent.contentOffset.y / toDp(120);

                console.log('(state.page < state.totalPage)', state.page < state.totalPage);

                console.log('state.page', state.page);
                if (hasil <= 13 && state.page < state.totalPage) {
                  let page = state.page + 1;

                  console.log('page', page);
                  if (props.route.params.dataUser.is_a_resident) {
                    loadCCTVResident(page);
                  } else {
                    loadCCTV(page, { filter: { cluster_id: [] } });
                  }
                  limit += state.limit;
                }

                console.log('TOTAL PAGE', state.totalPage);

                console.log('HASIL', hasil);

                console.log('LIMIT', limit);

                console.log('arrayData.length', state.arrayData.length);
              }}
            >
              <FlatList
                data={state.loading ? ['', '', '', '', '', '', '', ''] : state.arrayData}
                renderItem={state.loading ? renderItemShimmer : renderItem}
                numColumns={2}
                ListHeaderComponent={() =>
                  !props.route.params.dataUser.is_a_resident && renderHeader()
                }
                ListFooterComponent={
                  state.page < state.totalPage ? (
                    renderFooter()
                  ) : (
                    <View style={{ height: toDp(48) }} />
                  )
                }
              />
            </ScrollView>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  viewTextTitle: {
    padding: toDp(20),
    width,
  },
  touchMenu: {
    marginLeft: toDp(2),
    marginRight: toDp(16),
    marginBottom: toDp(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    alignItems: 'center',
    width: toDp(148),
    height: 'auto',
    borderRadius: toDp(4),
    backgroundColor: 'white',
  },
  viewShimmer: {
    width: toDp(148),
    height: toDp(100),
    resizeMode: 'cover',
    borderTopRightRadius: toDp(4),
    borderTopLeftRadius: toDp(4),
  },
  textShimmer: {
    marginVertical: toDp(8),
    width: toDp(124),
    borderRadius: toDp(2),
  },
  overlay: {
    position: 'absolute',
    width: toDp(155),
    height: toDp(155),
    opacity: 0.5,
    backgroundColor: 'black',
  },
  viewTextPosition: {
    width: '100%',
    marginVertical: toDp(8),
  },
  textTitleMenu: {
    marginHorizontal: toDp(8),
    fontSize: toDp(12),
    color: '#000000',
    textAlign: 'center',
  },
  viewCenter: {
    height: height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCenterNoConnecttion: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default CCTVScreen;
