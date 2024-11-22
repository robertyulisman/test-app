import { allLogo } from '@src/Assets';
import CustomComboBox from '@src/Components/CustomComboBox';
import CustomText from '@src/Components/CustomText';
import Header from '@src/Components/Header';
import Loader from '@src/Components/Loader';
import { toDp } from '@src/Helper/percentageToDP';
import { getUnits, getUnitsFloors, getUnitsTower, postUnitsOccupiedAdd } from '@src/Services/Apis';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');
// import { getUnits, getUnitsFloors, getUnitsTower, postUnitsOccupiedAdd } from '@Apis';

const AddUnitScreen = (props: any) => {
  const [viewState, setViewState] = useState({
    isShowSuccessModal: false,
    isShowFailModal: false,
    isLoading: false,
    isDarkMode: false,
    isAgree: false,
  });

  const [formAddress, setFormAddress] = useState({
    apartment: 'CentralConnect',
    tower: {
      id: '',
      name: '',
    },
    lantai: '',
    unit: '',
    unitId: '',
    syarat: false,
  });

  const [listAddress, setListAdress] = useState({
    arrTower: [],
    arrFloors: [],
    arrUnits: [],
    arrIdUnits: [],
  });

  useEffect(() => {
    getUnitsTower('')
      .then((response: any) => {
        let tempTower: any = [];
        for (var i = 0; i < response.data.length; i++) {
          tempTower.push({
            id: response.data[i].id,
            name: response.data[i].name,
          });
        }
        setListAdress((prevState) => ({
          ...prevState,
          arrTower: tempTower,
        }));
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (formAddress.tower?.id !== '') {
      getUnitsFloors('?cluster_id=' + formAddress.tower?.id)
        .then((response: any) => {
          let arrFloors: any = [];
          for (var i = 0; i < response.data.units.length; i++) {
            arrFloors.push(response.data.units[i].block);
          }
          setListAdress((prevState) => ({
            ...prevState,
            arrFloors,
          }));
          setFormAddress((prevState) => ({ ...prevState, lantai: '', unit: '' }));
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [formAddress.tower]);

  useEffect(() => {
    if (formAddress.lantai !== '') {
      getUnits('?cluster_id=' + formAddress.tower?.id + '&block=' + formAddress.lantai)
        .then((response: any) => {
          console.log('getUnits', response);
          let arrUnits: any = [];
          let arrIdUnits: any = [];
          for (var i = 0; i < response.data.units.length; i++) {
            arrIdUnits.push(response.data.units[i]);
            arrUnits.push(response.data.units[i].unit_name);
          }
          setListAdress((prevState) => ({
            ...prevState,
            arrUnits,
            arrIdUnits,
          }));
          setFormAddress((prevState) => ({ ...prevState, unit: '' }));
        })
        .catch((error: any) => {
          console.log(error);
        });
    }
  }, [formAddress.lantai]);

  useEffect(() => {
    if (viewState.isShowSuccessModal === false && viewState.isAgree) {
      props.navigation.goBack();
    }
  }, [viewState.isShowSuccessModal]);

  const handleSelectAddress = (value: any, type: any) => {
    if (type === 'unit') {
      let unitId = '';
      for (var i = 0; i < listAddress.arrIdUnits.length; i++) {
        // @ts-expect-error TS(2339): Property 'unit_name' does not exist on type 'never... Remove this comment to see the full error message
        if (listAddress.arrIdUnits[i].unit_name === value) {
          // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
          unitId = listAddress.arrIdUnits[i].id;
        }
      }
      setFormAddress((prevState) => ({
        ...prevState,
        unitId,
        unit: value,
      }));
    } else {
      setFormAddress((prevState) => ({
        ...prevState,
        [type]: value,
      }));
    }
  };

  const handleAddUnit = () => {
    let data = {
      unit_id: formAddress.unitId,
    };
    setViewState((prevState) => ({ ...prevState, isLoading: true }));
    postUnitsOccupiedAdd(data)
      .then((response: any) => {
        console.log('response.data', response.data);
        setViewState((prevState) => ({
          ...prevState,
          isLoading: false,
          isShowSuccessModal: true,
          isAgree: true,
        }));
        props.route.params.loadUnit();
      })
      .catch((error: any) => {
        console.log(error);
        if (error.data.name === 'UserLimitReachedError') {
          setViewState((prevState) => ({ ...prevState, isLoading: false, isShowFailModal: true }));
        } else if (error.data.name === 'AddUnitAlreadyRequestedError') {
          Alert.alert('Informasi', 'Permintaan untuk menambahkan unit ini sudah dikirimkan', [
            {
              text: 'OK',
              onPress: () => {
                setViewState((prevState) => ({ ...prevState, isLoading: false }));
              },
            },
          ]);
        } else {
          setViewState((prevState) => ({ ...prevState, isLoading: false }));
        }
      });
  };

  const SuccessModalView = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={viewState.isShowSuccessModal}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View style={styles.modalBox}>
            <Image source={allLogo.icSuccess} style={styles.icSuccess} />
            <CustomText textType="semibold" style={styles.textTitleModal}>
              TAMBAH UNIT BERHASIL
            </CustomText>
            <CustomText style={styles.textDescModal}>Unit telah berhasil Diajukan</CustomText>
            <TouchableOpacity
              onPress={() =>
                setViewState((prevState) => ({
                  ...prevState,
                  isShowSuccessModal: false,
                }))
              }
              style={styles.touchKembaliKeLogin}
            >
              <CustomText textType="semibold" style={styles.textKembaliKeLogin}>
                Kembali
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const FailModalView = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={viewState.isShowFailModal}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View style={styles.modalBox}>
            <Image source={allLogo.icGagal} style={styles.icGagal} />
            <CustomText
              textType="semibold"
              style={[styles.textTitleModal, { marginTop: toDp(16) }]}
            >
              TAMBAH UNIT GAGAL
            </CustomText>
            <CustomText style={[styles.textDescModal, { width: '85%', textAlign: 'center' }]}>
              Maaf, unit yang Anda daftarkan sudah terisi penuh. Silahkan hubungi pengelola untuk
              informasi lebih lanjut.
            </CustomText>
            <TouchableOpacity
              onPress={() =>
                setViewState((prevState) => ({ ...prevState, isShowFailModal: false }))
              }
              style={styles.touchKembaliKeLogin}
            >
              <CustomText textType="semibold" style={styles.textKembaliKeLogin}>
                KEMBALI
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView
      // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
      style={[styles.container, { backgroundColor: viewState.darkMode ? '#121212' : 'white' }]}
    >
      <StatusBar
        // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
        barStyle={viewState.darkMode ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <Header title={'Tambah Unit'} onPress={() => props.navigation.goBack()} />
      <Loader loading={viewState.isLoading} />
      <SuccessModalView />
      <FailModalView />
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.center}>
            <CustomText
              textType="semibold"
              style={[styles.textTitle, { color: viewState.isDarkMode && 'white' }]}
            >
              TAMBAHKAN KEPEMILIKAN UNIT
            </CustomText>
          </View>
          <ScrollView>
            <View style={styles.content}>
              <View style={styles.viewTextTitle}>
                <CustomComboBox
                  // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
                  darkMode={viewState.darkMode}
                  title={'Cluster/Jalan'}
                  desc={''}
                  textPlaceholder={'Pilih cluster/jalan'}
                  value={formAddress.tower?.name}
                  arrayData={listAddress.arrTower}
                  onSelected={(item: any, index: any) => handleSelectAddress(item, 'tower')}
                />

                <View style={{ height: toDp(16) }} />
                {listAddress.arrFloors.length !== 0 && (
                  <CustomComboBox
                    // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
                    darkMode={viewState.darkMode}
                    editable={false}
                    title={'Blok'}
                    desc={''}
                    textPlaceholder={'Pilih blok'}
                    value={formAddress.lantai}
                    arrayData={listAddress.arrFloors}
                    onSelected={(item: any, index: any) => handleSelectAddress(item, 'lantai')}
                  />
                )}
                <View style={{ height: toDp(16) }} />
                {listAddress.arrUnits.length !== 0 && (
                  <CustomComboBox
                    // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
                    darkMode={viewState.darkMode}
                    editable={false}
                    title={'No unit'}
                    desc={''}
                    textPlaceholder={'Pilih no unit'}
                    value={formAddress.unit}
                    arrayData={listAddress.arrUnits}
                    onSelected={(item: any, index: any) => handleSelectAddress(item, 'unit')}
                  />
                )}
                <View style={{ height: toDp(16) }} />

                <View style={styles.footerButton}>
                  {formAddress.apartment === '' ||
                  // @ts-expect-error TS(2367): This condition will always return 'false' since th... Remove this comment to see the full error message
                  formAddress.tower === '' ||
                  formAddress.lantai === '' ||
                  formAddress.unit === '' ? (
                    <View style={[styles.touchKirim, { flex: 1, backgroundColor: '#d3d6db' }]}>
                      <CustomText textType="semibold" style={styles.textKirim}>
                        Ajukan
                      </CustomText>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => handleAddUnit()}
                      style={[styles.touchKirim, { flex: 1, backgroundColor: '#5AAA0F' }]}
                    >
                      <CustomText textType="semibold" style={styles.textKirim}>
                        Ajukan
                      </CustomText>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? toDp(28) : 0,
  },
  systemBar: {
    width,
    height: toDp(20),
    backgroundColor: '#5AAA0F',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: toDp(30),
    marginTop: toDp(20),
  },
  logo: {
    width: toDp(120),
    height: toDp(120),
  },
  touchLupa: {
    paddingVertical: toDp(4),
    borderRadius: toDp(10),
    borderWidth: toDp(1),
    paddingHorizontal: toDp(31),
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    paddingVertical: toDp(10),
    borderColor: '#5AAA0F',
    height: toDp(40),
    color: '#5AAA0F',
  },
  textLupa: {
    fontSize: toDp(14),
    color: '#5AAA0F',
    fontStyle: 'normal',
  },
  touchKirim: {
    width: width * 0.82,
    height: toDp(40),
    backgroundColor: '#d3d6db',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKirim: {
    fontSize: toDp(14),
    color: 'white',
    fontStyle: 'normal',
    letterSpacing: toDp(0.7),
  },
  textLupaPassword: {
    marginLeft: toDp(30),
    fontSize: toDp(16),
    color: '#263238',
    fontStyle: 'normal',
    letterSpacing: toDp(1),
  },
  content: {
    padding: toDp(32),
  },
  viewTextTitle: {
    width: width * 0.82,
  },
  center: {
    alignItems: 'center',
  },
  textTitle: {
    marginTop: toDp(20),
    fontSize: toDp(16),
    color: '#263238',
    fontStyle: 'normal',
    letterSpacing: toDp(1),
  },
  logoDone: {
    marginTop: toDp(16),
    width: toDp(150),
    height: toDp(66.5),
  },
  contentDone: {
    marginTop: toDp(60),
    alignItems: 'center',
    paddingHorizontal: toDp(30),
  },
  successForget: {
    width: toDp(200),
    height: toDp(185.9),
  },
  textMessage: {
    marginTop: toDp(16),
    fontSize: toDp(14),
    color: '#263238',
    fontStyle: 'normal',
  },
  footerKetentuan: {
    flexDirection: 'row',
    paddingRight: toDp(8),
  },
  icCheckbox: {
    width: toDp(20),
    height: toDp(20),
  },
  textSyarat: {
    marginLeft: toDp(10),
    fontSize: toDp(12),
    color: '#273238',
  },
  textKetentuan: {
    color: '#5AAA0F',
  },
  footerButton: {
    flexDirection: 'row',
    marginTop: toDp(24),
  },

  bottomModal: {
    //justifyContent: "flex-end",
    //margin: 0,
  },
  viewRootModal: {
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: toDp(280),
    height: toDp(335),
    backgroundColor: '#FFFFFF',
    borderRadius: toDp(4),
    alignItems: 'center',
  },
  textTitleModal: {
    fontSize: toDp(14),
    color: '#263238',
    letterSpacing: toDp(1),
    marginTop: toDp(48),
  },
  textDescModal: {
    fontSize: toDp(12),
    color: '#263238',
    marginTop: toDp(16),
  },
  icSuccess: {
    width: toDp(80),
    height: toDp(80),
    marginTop: toDp(32),
  },
  icGagal: {
    width: toDp(80),
    height: toDp(80),
    marginTop: toDp(32),
  },
  touchKembaliKeLogin: {
    marginTop: toDp(40),
    width: toDp(200),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKembaliKeLogin: {
    fontSize: toDp(14),
    color: '#FFFFFF',
    letterSpacing: toDp(0.7),
  },
});

export default AddUnitScreen;
