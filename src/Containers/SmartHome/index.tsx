import { useNetInfo } from '@react-native-community/netinfo';
import { allLogo } from '@src/Assets';
import CustomText from '@src/Components/CustomText';
import Empty from '@src/Components/Empty';
import Header from '@src/Components/Header';
import NoConnection from '@src/Components/NoConnection';
import { toDp } from '@src/Helper/percentageToDP';
import { getSmartHome } from '@src/Services/Apis';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const { width, height } = Dimensions.get('window');

const CCTVScreen = (props: any) => {
  const netInfo = useNetInfo();
  const [state, setState] = useState({
    loading: true,
    tower: {
      id: '',
      name: '',
    },
    arrayCluster: [],
  });

  useEffect(() => {
    loadCluster();
  }, []);

  const loadCluster = () => {
    getSmartHome()
      .then((response: any) => {
        setState((state) => ({
          ...state,
          arrayCluster: response.data.smart_home,
          loading: false,
        }));
      })
      .catch((error: any) => {});
  };

  const renderItemShimmer = ({ item, index }: any) => {
    return (
      <View style={styles.touchMenu}>
        <ShimmerPlaceHolder style={[styles.viewShimmer, { borderRadius: toDp(4) }]} />
        {/*<ShimmerPlaceHolder style={styles.textShimmer} />*/}
      </View>
    );
  };

  const funcOrvibo = () => {
    Linking.openURL(Platform.OS === 'android' ? 'homemate://' : 'HomeMate://').catch(() => {
      Linking.openURL(
        Platform.OS === 'android'
          ? 'https://play.google.com/store/apps/details?id=com.orvibo.homemate'
          : 'https://apps.apple.com/id/app/orvibo-home/id1002853448',
      );
    });
  };

  const funcAcome = () => {
    Linking.openURL('acomewook://com.acome.wook/deeplink').catch(() => {
      Linking.openURL(
        Platform.OS === 'android'
          ? 'https://play.google.com/store/apps/details?id=com.acome.wook'
          : 'https://apps.apple.com/id/app/acome-iot/id1556024103',
      );
    });
  };
  const funcAqara = () => {
    Linking.openURL('aqara://mp.aqara.com').catch(() => {
      Linking.openURL(
        Platform.OS === 'android'
          ? 'https://play.google.com/store/apps/details?id=com.lumiunited.aqarahome.play&hl=en_US'
          : 'https://apps.apple.com/us/app/aqara-home/id1248669703',
      );
    });
  };

  const funcEzviz = () => {
    Linking.openURL('ezviz://com.ezviz/openwith').catch(() => {
      Linking.openURL(
        Platform.select({
          android: 'https://play.google.com/store/apps/details?id=com.ezviz&hl=en_US',
          ios: 'https://apps.apple.com/id/app/ezviz/id886947564',
        }),
      );
    });
  };

  const handleOnPressBrand = (item: any) => {
    switch (item.brand) {
      case 'ORVIBO':
        return funcOrvibo();

      case 'AQARA':
        return funcAqara();

      case 'ACOME':
        return funcAcome();

      case 'EZVIZ':
        return funcEzviz();

      default:
        return null;
    }
  };

  const renderItem = ({ item, index }: any) => {
    console.log('item.brand', item);
    return (
      <TouchableOpacity style={styles.touchMenu} onPress={() => handleOnPressBrand(item)}>
        <Image resizeMode="contain" source={{ uri: item.image_url }} style={styles.viewShimmer} />
        <Image
          resizeMode="contain"
          source={allLogo.icDevice}
          style={[styles.icDevice, { tintColor: item.brand === 'ACOME' ? '#EE4040' : '#383B34' }]}
        />
        {/* <View style={styles.viewTextPosition}>
          <CustomText
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.textTitleMenu}>
            {item.name}
          </CustomText>
        </View> */}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Smart Home'} onPress={() => props.navigation.goBack()} />
      {!netInfo.isConnected ? (
        <NoConnection />
      ) : state.arrayCluster.length === 0 && !state.loading ? (
        <Empty images={allLogo.imgEmptyNews} title={'Belum ada device'} />
      ) : (
        <View style={styles.viewTextTitle}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={state.loading ? ['', ''] : state.arrayCluster}
            renderItem={state.loading ? renderItemShimmer : renderItem}
            numColumns={2}
            ListHeaderComponent={() => (
              <CustomText style={styles.textInfo}>
                {'Silakan pilih device yang Anda gunakan di unit Anda.'}
              </CustomText>
            )}
            ListFooterComponent={() => <View style={{ height: toDp(60) }} />}
            refreshControl={
              <RefreshControl
                refreshing={state.loading}
                onRefresh={() => {
                  setState((state) => ({
                    ...state,
                    loading: true,
                    arrayData: [],
                  }));
                  loadCluster();
                }}
              />
            }
          />
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
    paddingHorizontal: toDp(20),
    width,
  },
  touchMenu: {
    marginLeft: toDp(2),
    marginRight: toDp(15),
    marginBottom: toDp(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: toDp(148),
    height: toDp(148),
    borderRadius: toDp(4),
    backgroundColor: 'white',
  },
  viewShimmer: {
    width: toDp(120),
    height: toDp(120),
  },
  textShimmer: {
    marginVertical: toDp(8),
    width: toDp(124),
    borderRadius: toDp(2),
    marginTop: toDp(16),
  },
  viewTextPosition: {
    width: '100%',
    marginVertical: toDp(8),
  },
  textTitleMenu: {
    //marginTop: toDp(16),
    marginHorizontal: toDp(4),
    fontSize: toDp(14),
    color: '#383B34',
    textAlign: 'center',
  },
  icDevice: {
    width: toDp(24),
    height: toDp(24),
    position: 'absolute',
    bottom: toDp(10),
    right: toDp(14),
  },
  textInfo: {
    color: '#273238',
    fontSize: toDp(14),
    marginTop: toDp(16),
    marginBottom: toDp(12),
  },
});

export default CCTVScreen;
