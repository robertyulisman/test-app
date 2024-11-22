import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { allLogo } from '../../Assets';
import { toDp } from '../../Helper/percentageToDP';

import { WebView } from 'react-native-webview';

import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import CustomText from '../../Components/CustomText';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const { width, height } = Dimensions.get('window');
const DetailsCCTVScreen = (props: any) => {
  const [state, setState] = useState({
    isModalVisible: false,
    item: props.route.params.item,
  });

  useEffect(() => {
    console.log('PROPS', props);
  }, []);

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
          {'Details CCTV'}
        </CustomText>

        <View style={{ width: toDp(90), alignItems: 'flex-end' }}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.touchHeaderSearch}
              onPress={() => {
                setState((state) => ({ ...state, isModalVisible: true }));
              }}
            >
              <Image source={allLogo.icInfo} style={styles.icInfo} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        onBackButtonPress={() => setState((state) => ({ ...state, isModalVisible: false }))}
        onBackdropPress={() => setState((state) => ({ ...state, isModalVisible: false }))}
        isVisible={state.isModalVisible}
        style={styles.bottomModal}
      >
        <View style={[styles.viewRootModal, { height: false ? height * 0.75 : 'auto' }]}>
          <View style={[styles.modalBox, { backgroundColor: 'white', height: height * 0.4 }]}>
            <View style={styles.viewModalTitle}>
              <CustomText textType="semibold" style={styles.textTitleModal}>
                {'INFORMASI'}
              </CustomText>
              <TouchableOpacity
                style={styles.touchSilang}
                onPress={() => setState((state) => ({ ...state, isModalVisible: false }))}
              >
                <Image source={allLogo.icSilang} style={styles.icSilang} />
              </TouchableOpacity>
            </View>

            <View style={styles.viewContent}>
              <View style={[styles.viewField, { marginTop: 0 }]}>
                <CustomText textType="semibold" style={styles.field}>
                  {'Nama CCTV'}
                </CustomText>
                <CustomText textType="regular" style={styles.nameCCTV}>
                  {state.item.name}
                </CustomText>
              </View>
              <View style={styles.viewField}>
                <CustomText textType="semibold" style={styles.field}>
                  {'Tanggal dibuat'}
                </CustomText>
                <CustomText textType="regular" style={styles.dateCCTV}>
                  {moment(state.item.created_at).format('DD MMMM YYYY')}
                </CustomText>
              </View>
              <View style={styles.viewField}>
                <CustomText textType="semibold" style={styles.field}>
                  {'Alamat CCTV'}
                </CustomText>
                <CustomText textType="regular" style={styles.addressCCTV}>
                  {state.item.address}
                </CustomText>
              </View>

              {/*<View style={styles.viewField}>
                <CustomText textType='semibold' style={styles.field}>{'Terdapat di CLuster'}</CustomText>
                <CustomText textType='regular' style={styles.nameCCTV}>{state.item?.cluster?.name}</CustomText>
              </View>
              <View style={styles.viewField}>
                <CustomText textType='semibold' style={styles.field}>{'Alamat Cluster'}</CustomText>
                <CustomText textType='regular' style={styles.addressCCTV}>{'Belian, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29465'}</CustomText>
              </View>*/}
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      {renderHeader()}
      {renderModal()}
      <WebView
        style={{ width, height }}
        originWhitelist={['*']}
        source={{ uri: props.route.params.item.source_url }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
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
  touchHeader: {
    padding: toDp(4),
  },
  icBack: {
    width: toDp(16),
    height: toDp(16),
    tintColor: '#383B34',
  },
  title: {
    color: '#383B34',
    fontSize: toDp(18),
  },
  headerRow: {
    flexDirection: 'row',
  },
  touchHeaderSearch: {
    padding: toDp(4),
  },
  icInfo: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#383B34',
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
    height: toDp(165),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: toDp(16),
    borderTopRightRadius: toDp(16),
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  viewSearchRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    //marginTop: toDp(16),
    marginRight: toDp(8),
    marginBottom: toDp(8),
  },
  viewSearch: {
    width: '90%',
    marginLeft: toDp(24),
    marginRight: toDp(24),
    backgroundColor: '#F6F7F4',
    height: toDp(40),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: toDp(10),
  },
  icSearch2: {
    width: toDp(20.3),
    height: toDp(20),
    tintColor: '#9B9F95',
    marginLeft: toDp(12),
  },
  touchAll: {
    position: 'absolute',
    right: toDp(8),
  },
  icDeleteAll: {
    width: toDp(24),
    height: toDp(24),
  },
  textInput: {
    flex: 1,
    fontSize: toDp(16),
    color: '#757575',
    fontWeight: '300',
  },

  viewModalTitle: {
    marginTop: toDp(24),
    //marginHorizontal: toDp(24),
    marginLeft: toDp(24),
    marginRight: toDp(16),
    marginBottom: toDp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitleModal: {
    fontSize: toDp(14),
    color: '#263238',
  },
  touchSilang: {
    padding: toDp(4),
  },
  icSilang: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#263238',
  },
  icSilangClear: {
    width: toDp(20),
    height: toDp(20),
  },
  textInputSearch: {
    flex: 1,
    fontSize: toDp(14),
    color: '#273238',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  },
  lineModal: {
    width: toDp(64),
    height: toDp(4),
    backgroundColor: '#d3d6db',
    borderRadius: toDp(7),
    marginTop: toDp(15),
  },
  centerEmpty: {
    alignItems: 'center',
  },
  viewContent: {
    flex: 1,
    paddingHorizontal: toDp(24),
  },
  nameCCTV: {
    fontSize: toDp(14),
    color: '#273238',
  },
  dateCCTV: {
    fontSize: toDp(14),
    color: '#273238',
  },
  viewField: {
    marginTop: toDp(16),
  },
  field: {
    fontSize: toDp(14),
    color: '#273238',
  },
  addressCCTV: {
    fontSize: toDp(14),
    color: '#273238',
  },
  viewCustomSearch: {
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
  },
});

export default DetailsCCTVScreen;
