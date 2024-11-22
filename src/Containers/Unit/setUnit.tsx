import { allLogo } from '@src/Assets';
import CustomComboBox from '@src/Components/CustomComboBox';
import CustomText from '@src/Components/CustomText';
import CustomTextInput from '@src/Components/CustomTextInput';
import Loader from '@src/Components/Loader';
import { toDp } from '@src/Helper/percentageToDP';
import { getUnits, getUnitsFloors, getUnitsTower, putUserSetUnit } from '@src/Services/Apis';
import React, { Component } from 'react';
import {
  AsyncStorage,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import * as NavigatorService from '../../Helper/NavigatorServices';

const { width, height } = Dimensions.get('window');
type Props = {};
export default class SetUnit extends Component<Props> {
  confirmPassword: any;
  email: any;
  fullname: any;
  noHp: any;
  password: any;
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,

      fullname: '',
      errorFullname: '',
      email: '',
      errorEmail: '',
      noHp: '',
      errorNoHp: '',
      password: '',
      errorPassword: '',
      confirmPassword: '',
      errorConfirmPassword: '',

      backgroundColor: '#d3d6db',
      message: 'Email Berhasil Terkirim!',
      content: 'alamat', // register / tinggal / alamat,
      secureTextEntry: true,
      secureConfirmTextEntry: true,

      apartment: 'Suvarna',
      tower: {
        id: '',
        name: '',
      },
      lantai: '',
      unit: '',
      unitId: '',
      syarat: false,

      arrTower: [],
      arrFloors: [],
      arrUnits: [],
      arrIdUnits: [],

      successModal: false,
      gagalModal: false,
      darkMode: false,
      touch: true,
    };
  }

  componentWillMount() {
    getUnitsTower('')
      .then((response: any) => {
        console.log('getUnitsTower', response);
        let arrTower = [];
        for (var i = 0; i < response.data.length; i++) {
          arrTower.push({
            id: response.data[i].id,
            name: response.data[i].name,
          });
        }
        this.setState({ arrTower });
      })
      .catch((error: any) => {
        console.log(error);
        // @ts-expect-error TS(2552): Cannot find name 'alert'. Did you mean 'Alert'?
        alert(error);
      });
  }

  async componentDidMount() {
    console.disableYellowBox = true;
    let darkMode = await AsyncStorage.getItem('darkMode');
    this.setState({ darkMode: JSON.parse(darkMode) }, () => {
      //this.testDataDefault()
    });
  }

  testDataDefault = () => {
    this.setState({
      fullname: 'Zaini Jamathsani',
      email: 'dleader.zaii@gmail.com',
      noHp: '085694084870',
      password: '123456',
      confirmPassword: '123456',
    });
  };

  validateEmail = (email: any) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  lanjut = () => {
    // @ts-expect-error TS(2339): Property 'email' does not exist on type 'Readonly<... Remove this comment to see the full error message
    if (!this.validateEmail(this.state.email)) {
      this.setState({ errorEmail: 'Format email salah.' });
      this.email.focus();
      // @ts-expect-error TS(2339): Property 'password' does not exist on type 'Readon... Remove this comment to see the full error message
    } else if (this.state.password.length < 6) {
      this.setState({ errorPassword: 'Password minimal 6 karakter.' });
      this.password.focus();
      // @ts-expect-error TS(2339): Property 'password' does not exist on type 'Readon... Remove this comment to see the full error message
    } else if (this.state.password !== this.state.confirmPassword) {
      this.setState({ errorConfirmPassword: 'Password baru yang dimasukkan tidak sesuai.' });
      this.confirmPassword.focus();
    } else {
      this.setState({ content: 'alamat' });
    }
  };

  kembali = () => {
    this.setState({ content: 'register' });
  };

  setUnit = () => {
    let data = {
      // @ts-expect-error TS(2339): Property 'unitId' does not exist on type 'Readonly... Remove this comment to see the full error message
      unit_id: this.state.unitId,
    };
    this.setState({ loading: true }, () => {
      putUserSetUnit(data)
        .then((response: any) => {
          console.log('response.data', response.data);

          AsyncStorage.removeItem('token');
          this.setState({ loading: false, successModal: true });
        })
        .catch((error: any) => {
          console.log(error);
          if (error.data.name === 'UserLimitReachedError') {
            this.setState({ loading: false, gagalModal: true });
          } else {
            this.setState({ loading: false });
          }
        });
    });
  };

  modalSuccess = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        // @ts-expect-error TS(2339): Property 'successModal' does not exist on type 'Re... Remove this comment to see the full error message
        isVisible={this.state.successModal}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View
            style={[
              styles.modalBox,
              // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
              { backgroundColor: this.state.darkMode ? '#121212' : 'white' },
            ]}
          >
            <CustomText
              textType="semibold"
              allowFontScaling={false}
              // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
              style={[styles.textTitleModal, { color: this.state.darkMode ? 'white' : '#263238' }]}
            >
              SET UNIT BERHASIL
            </CustomText>
            <CustomText
              allowFontScaling={false}
              // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
              style={[styles.textDescModal, { color: this.state.darkMode ? 'white' : '#263238' }]}
            >
              Akun anda telah berhasil set unit, admin kami akan memverifikasi akun Anda dalam waktu
              maksimal tiga hari kerja
            </CustomText>
            <Image source={allLogo.icSuccess} style={styles.icSuccess} />
            <TouchableOpacity
              onPress={() => {
                this.setState({ successModal: false }, () => {
                  NavigatorService.reset('Login');
                });
              }}
              style={styles.touchKembaliKeLogin}
            >
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                style={styles.textKembaliKeLogin}
              >
                KEMBALI KE LOGIN
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  modalGagal = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        // @ts-expect-error TS(2339): Property 'gagalModal' does not exist on type 'Read... Remove this comment to see the full error message
        isVisible={this.state.gagalModal}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View
            style={[
              styles.modalBox,
              // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
              { backgroundColor: this.state.darkMode ? '#121212' : 'white' },
            ]}
          >
            <Image source={allLogo.icGagal} style={styles.icGagal} />
            <CustomText
              textType="semibold"
              allowFontScaling={false}
              style={[
                styles.textTitleModal,
                // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
                { marginTop: toDp(16), color: this.state.darkMode ? 'white' : '#263238' },
              ]}
            >
              SET UNIT GAGAL
            </CustomText>
            <CustomText
              allowFontScaling={false}
              style={[
                styles.textDescModal,
                {
                  width: '85%',
                  textAlign: 'center',
                  // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
                  color: this.state.darkMode ? 'white' : '#263238',
                },
              ]}
            >
              Maaf, unit yang Anda daftarkan sudah terisi penuh. Silahkan hubungi pengelola untuk
              informasi lebih lanjut.
            </CustomText>
            <TouchableOpacity
              onPress={() => {
                this.setState({ touch: true, gagalModal: false });
              }}
              style={styles.touchKembaliKeLogin}
            >
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                style={styles.textKembaliKeLogin}
              >
                KEMBALI
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  renderRegister = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <KeyboardAvoidingView behavior={'padding'} enabled={Platform.OS === 'ios' ? true : false}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.touchLupa}
                // @ts-expect-error TS(2339): Property 'navigation' does not exist on type 'Read... Remove this comment to see the full error message
                onPress={() => this.props.navigation.goBack()}
              >
                <Text
                  allowFontScaling={false}
                  // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
                  style={[styles.textLupa, { color: this.state.darkMode && 'white' }]}
                >
                  LOGIN
                </Text>
              </TouchableOpacity>
              <Image
                source={allLogo.logo}
                // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
                style={[styles.logo, { tintColor: this.state.darkMode && 'white' }]}
              />
            </View>

            <Text
              allowFontScaling={false}
              // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
              style={[styles.textLupaPassword, { color: this.state.darkMode && 'white' }]}
            >
              REGISTER
            </Text>
            <View style={styles.content}>
              <View style={styles.viewTextTitle}>
                <CustomTextInput
                  inputRef={(ref: any) => (this.fullname = ref)}
                  title={'Nama Lengkap'}
                  placeholder={'Masukan nama lengkap (sesuai KTP)'}
                  // @ts-expect-error TS(2339): Property 'errorFullname' does not exist on type 'R... Remove this comment to see the full error message
                  error={this.state.errorFullname}
                  // @ts-expect-error TS(2339): Property 'fullname' does not exist on type 'Readon... Remove this comment to see the full error message
                  value={this.state.fullname}
                  onChangeText={(fullname: any) => {
                    this.setState({ fullname }, () => {
                      if (fullname.trim() === '') {
                        this.setState({
                          errorFullname: 'Field ini tidak boleh kosong.',
                        });
                      } else {
                        this.setState({
                          errorFullname: '',
                        });
                      }
                    });
                  }}
                  onSubmitEditing={() => this.email.focus()}
                />
                <View style={{ height: toDp(16) }} />
                <CustomTextInput
                  inputRef={(ref: any) => (this.email = ref)}
                  title={'Email'}
                  placeholder={'Masukkan alamat email'}
                  // @ts-expect-error TS(2339): Property 'errorEmail' does not exist on type 'Read... Remove this comment to see the full error message
                  error={this.state.errorEmail}
                  // @ts-expect-error TS(2339): Property 'email' does not exist on type 'Readonly<... Remove this comment to see the full error message
                  value={this.state.email}
                  onChangeText={(email: any) => {
                    this.setState({ email }, () => {
                      if (email.trim() === '') {
                        this.setState({
                          errorEmail: 'Field ini tidak boleh kosong.',
                        });
                      } else {
                        this.setState({
                          errorEmail: '',
                        });
                      }
                    });
                  }}
                  keyboardType={'email-address'}
                  onSubmitEditing={() => this.noHp.focus()}
                />
                <View style={{ height: toDp(16) }} />
                <CustomTextInput
                  inputRef={(ref: any) => (this.noHp = ref)}
                  title={'No handphone'}
                  placeholder={'Masukkan no handphone'}
                  // @ts-expect-error TS(2339): Property 'errorNoHp' does not exist on type 'Reado... Remove this comment to see the full error message
                  error={this.state.errorNoHp}
                  // @ts-expect-error TS(2339): Property 'noHp' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                  value={this.state.noHp}
                  onChangeText={(noHp: any) => {
                    this.setState({ noHp: noHp.replace(/[^0-9]/g, '') }, () => {
                      if (noHp.trim() === '') {
                        this.setState({
                          errorNoHp: 'Field ini tidak boleh kosong.',
                        });
                      } else {
                        this.setState({
                          errorNoHp: '',
                        });
                      }
                    });
                  }}
                  maxLength={13}
                  keyboardType={'phone-pad'}
                  onSubmitEditing={() => this.password.focus()}
                />
                <View style={{ height: toDp(16) }} />
                <CustomTextInput
                  inputRef={(ref: any) => (this.password = ref)}
                  title={'Password'}
                  placeholder={'Masukkan password'}
                  // @ts-expect-error TS(2339): Property 'password' does not exist on type 'Readon... Remove this comment to see the full error message
                  value={this.state.password}
                  // @ts-expect-error TS(2339): Property 'errorPassword' does not exist on type 'R... Remove this comment to see the full error message
                  error={this.state.errorPassword}
                  onChangeText={(password: any) => this.setState({ password })}
                  autoCapitalize={'none'}
                  type="password"
                  returnKeyType={'next'}
                  maxLength={23}
                  // @ts-expect-error TS(2339): Property 'secureTextEntry' does not exist on type ... Remove this comment to see the full error message
                  secureTextEntry={this.state.secureTextEntry}
                  // @ts-expect-error TS(17001): JSX elements cannot have multiple attributes with ... Remove this comment to see the full error message
                  onChangeText={(password: any) => {
                    this.setState({ password }, () => {
                      if (password.trim() === '') {
                        this.setState({ errorPassword: 'Field ini tidak boleh kosong.' });
                      } else {
                        this.setState({ errorPassword: '' });
                      }
                    });
                  }}
                  onChangeSecure={() => {
                    // @ts-expect-error TS(2339): Property 'secureTextEntry' does not exist on type ... Remove this comment to see the full error message
                    this.setState({ secureTextEntry: !this.state.secureTextEntry });
                  }}
                  onSubmitEditing={() => this.confirmPassword.focus()}
                />
                <View style={{ height: toDp(16) }} />
                <CustomTextInput
                  inputRef={(ref: any) => (this.confirmPassword = ref)}
                  title={'Konfirmasi password'}
                  placeholder={'Masukkan konfirmasi password'}
                  // @ts-expect-error TS(2339): Property 'confirmPassword' does not exist on type ... Remove this comment to see the full error message
                  value={this.state.confirmPassword}
                  // @ts-expect-error TS(2339): Property 'errorConfirmPassword' does not exist on ... Remove this comment to see the full error message
                  error={this.state.errorConfirmPassword}
                  onChangeText={(confirmPassword: any) => this.setState({ confirmPassword })}
                  autoCapitalize={'none'}
                  type="password"
                  returnKeyType={'next'}
                  maxLength={23}
                  // @ts-expect-error TS(2339): Property 'secureConfirmTextEntry' does not exist o... Remove this comment to see the full error message
                  secureTextEntry={this.state.secureConfirmTextEntry}
                  // @ts-expect-error TS(17001): JSX elements cannot have multiple attributes with ... Remove this comment to see the full error message
                  onChangeText={(confirmPassword: any) => {
                    this.setState({ confirmPassword }, () => {
                      if (confirmPassword.trim() === '') {
                        this.setState({ errorConfirmPassword: 'Field ini tidak boleh kosong.' });
                      } else {
                        this.setState({ errorConfirmPassword: '' });
                      }
                    });
                  }}
                  onChangeSecure={() => {
                    // @ts-expect-error TS(2339): Property 'secureConfirmTextEntry' does not exist o... Remove this comment to see the full error message
                    this.setState({ secureConfirmTextEntry: !this.state.secureConfirmTextEntry });
                  }}
                />
                <View style={{ height: toDp(24) }} />
                // @ts-expect-error TS(2339): Property 'fullname' does not exist on type 'Readon...
                Remove this comment to see the full error message
                {this.state.fullname.trim() === '' ||
                // @ts-expect-error TS(2339): Property 'email' does not exist on type 'Readonly<... Remove this comment to see the full error message
                this.state.email.trim() === '' ||
                // @ts-expect-error TS(2339): Property 'noHp' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                this.state.noHp.trim() === '' ||
                // @ts-expect-error TS(2339): Property 'password' does not exist on type 'Readon... Remove this comment to see the full error message
                this.state.password.trim() === '' ||
                // @ts-expect-error TS(2339): Property 'confirmPassword' does not exist on type ... Remove this comment to see the full error message
                this.state.confirmPassword.trim() === '' ? (
                  <View style={[styles.touchKirim, { backgroundColor: '#d3d6db' }]}>
                    <Text allowFontScaling={false} style={styles.textKirim}>
                      LANJUT
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => this.lanjut()}
                    style={[styles.touchKirim, { backgroundColor: '#917438' }]}
                  >
                    <Text allowFontScaling={false} style={styles.textKirim}>
                      LANJUT
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  };

  renderTinggal = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image source={allLogo.logo} style={styles.logoDone} />

        <View style={styles.contentDone}>
          <Image source={allLogo.successForget} style={styles.successForget} />
          <Text allowFontScaling={false} style={styles.textMessage}>
            // @ts-expect-error TS(2339): Property 'message' does not exist on type 'Readonl...
            Remove this comment to see the full error message
            {this.state.message}
          </Text>
        </View>

        <TouchableOpacity
          // @ts-expect-error TS(2339): Property 'navigation' does not exist on type 'Read... Remove this comment to see the full error message
          onPress={() => this.props.navigation.goBack()}
          style={[styles.touchKirim, { backgroundColor: '#917438' }]}
        >
          <Text allowFontScaling={false} style={styles.textKirim}>
            KEMBALI KE HALAMAN LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderAlamat = () => {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.touchLupa}>
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
                style={[styles.textLupa, { color: this.state.darkMode && 'white' }]}
              >
                Set Unit
              </CustomText>
            </View>
            <Image
              source={allLogo.logo}
              // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
              style={[styles.logo, { tintColor: this.state.darkMode && 'white' }]}
            />
          </View>

          <View style={styles.center}>
            <CustomText
              textType="semibold"
              allowFontScaling={false}
              // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
              style={[styles.textTitle, { color: this.state.darkMode && 'white' }]}
            >
              ALAMAT PERUMAHAN
            </CustomText>
          </View>
          <ScrollView>
            <View style={styles.content}>
              <View style={styles.viewTextTitle}>
                // @ts-expect-error TS(2339): Property 'arrTower' does not exist on type 'Readon...
                Remove this comment to see the full error message
                {this.state.arrTower.length !== 0 && (
                  <CustomComboBox
                    // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
                    darkMode={this.state.darkMode}
                    title={'Cluster/Jalan'}
                    desc={''}
                    textPlaceholder={'Pilih cluster/jalan'}
                    // @ts-expect-error TS(2339): Property 'tower' does not exist on type 'Readonly<... Remove this comment to see the full error message
                    value={this.state.tower.name || ''}
                    // @ts-expect-error TS(2339): Property 'arrTower' does not exist on type 'Readon... Remove this comment to see the full error message
                    arrayData={this.state.arrTower}
                    onSelected={(item: any, index: any) => {
                      this.setState({ arrFloors: [], tower: item }, () => {
                        getUnitsFloors('?cluster_id=' + item.id)
                          .then((response: any) => {
                            console.log('getUnitsFloors', response);
                            let arrFloors = [];
                            for (var i = 0; i < response.data.units.length; i++) {
                              arrFloors.push(response.data.units[i].block);
                            }
                            this.setState({ arrFloors, arrUnits: [], lantai: '', unit: '' });
                          })
                          .catch((error: any) => {
                            console.log(error);
                          });
                      });
                    }}
                  />
                )}
                <View style={{ height: toDp(16) }} />
                // @ts-expect-error TS(2339): Property 'arrFloors' does not exist on type 'Reado...
                Remove this comment to see the full error message
                {this.state.arrFloors.length !== 0 && (
                  <CustomComboBox
                    // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
                    darkMode={this.state.darkMode}
                    editable={false}
                    title={'Blok'}
                    desc={''}
                    textPlaceholder={'Pilih blok'}
                    // @ts-expect-error TS(2339): Property 'lantai' does not exist on type 'Readonly... Remove this comment to see the full error message
                    value={this.state.lantai}
                    // @ts-expect-error TS(2339): Property 'arrFloors' does not exist on type 'Reado... Remove this comment to see the full error message
                    arrayData={this.state.arrFloors}
                    onSelected={(item: any, index: any) => {
                      this.setState({ arrUnits: [], arrIdUnits: [], lantai: item }, () => {
                        // @ts-expect-error TS(2339): Property 'tower' does not exist on type 'Readonly<... Remove this comment to see the full error message
                        getUnits('?cluster_id=' + this.state.tower.id + '&block=' + item)
                          .then((response: any) => {
                            console.log('getUnits', response);
                            let arrUnits = [];
                            let arrIdUnits = [];
                            for (var i = 0; i < response.data.units.length; i++) {
                              arrIdUnits.push(response.data.units[i]);
                              arrUnits.push(response.data.units[i].unit_name);
                            }
                            this.setState({ arrIdUnits, arrUnits, unit: '' });
                          })
                          .catch((error: any) => {
                            console.log(error);
                          });
                      });
                    }}
                  />
                )}
                <View style={{ height: toDp(16) }} />
                // @ts-expect-error TS(2339): Property 'arrUnits' does not exist on type 'Readon...
                Remove this comment to see the full error message
                {this.state.arrUnits.length !== 0 && (
                  <CustomComboBox
                    // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
                    darkMode={this.state.darkMode}
                    editable={false}
                    title={'Unit'}
                    desc={''}
                    textPlaceholder={'Pilih unit'}
                    // @ts-expect-error TS(2339): Property 'unit' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                    value={this.state.unit}
                    // @ts-expect-error TS(2339): Property 'arrUnits' does not exist on type 'Readon... Remove this comment to see the full error message
                    arrayData={this.state.arrUnits}
                    onSelected={(item: any, index: any) => {
                      let unitId = '';
                      // @ts-expect-error TS(2339): Property 'arrIdUnits' does not exist on type 'Read... Remove this comment to see the full error message
                      for (var i = 0; i < this.state.arrIdUnits.length; i++) {
                        // @ts-expect-error TS(2339): Property 'arrIdUnits' does not exist on type 'Read... Remove this comment to see the full error message
                        if (this.state.arrIdUnits[i].unit_name === item) {
                          // @ts-expect-error TS(2339): Property 'arrIdUnits' does not exist on type 'Read... Remove this comment to see the full error message
                          unitId = this.state.arrIdUnits[i].id;
                        }
                      }
                      this.setState({ unitId, unit: item });
                    }}
                  />
                )}
                <View style={{ height: toDp(16) }} />
                {/*
                <View style={styles.footerKetentuan}>
                  <TouchableOpacity onPress={() => this.setState({syarat: !this.state.syarat})}>
                    <Image source={!this.state.syarat ? allLogo.icCheckboxUnChecked : allLogo.icCheckboxChecked} style={styles.icCheckbox} />
                  </TouchableOpacity>
                  <Text allowFontScaling={false} style={[styles.textSyarat, {color: this.state.darkMode && 'white'}]}>Saya setuju dengan <Text allowFontScaling={false}onPress={() => NavigatorService.navigate('Syarat')} style={styles.textKetentuan}>syarat & ketentuan</Text> yang berlaku.</Text>
                </View>
              */}
                <View style={styles.footerButton}>
                  // @ts-expect-error TS(2339): Property 'apartment' does not exist on type
                  'Reado... Remove this comment to see the full error message
                  {this.state.apartment === '' ||
                  // @ts-expect-error TS(2339): Property 'tower' does not exist on type 'Readonly<... Remove this comment to see the full error message
                  this.state.tower === '' ||
                  // @ts-expect-error TS(2339): Property 'lantai' does not exist on type 'Readonly... Remove this comment to see the full error message
                  this.state.lantai === '' ||
                  // @ts-expect-error TS(2339): Property 'unit' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                  this.state.unit === '' ? (
                    //|| !this.state.syarat
                    <View style={[styles.touchKirim, { flex: 1, backgroundColor: '#d3d6db' }]}>
                      <CustomText
                        textType="semibold"
                        allowFontScaling={false}
                        style={styles.textKirim}
                      >
                        SET UNIT
                      </CustomText>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => this.setUnit()}
                      style={[styles.touchKirim, { flex: 1, backgroundColor: '#5AAA0F' }]}
                    >
                      <CustomText
                        textType="semibold"
                        allowFontScaling={false}
                        style={styles.textKirim}
                      >
                        SET UNIT
                      </CustomText>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView
        // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
        style={[styles.container, { backgroundColor: this.state.darkMode ? '#121212' : 'white' }]}
      >
        <StatusBar
          // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
          barStyle={this.state.darkMode ? 'light-content' : 'dark-content'}
          translucent={true}
          backgroundColor={'transparent'}
        />
        // @ts-expect-error TS(2339): Property 'loading' does not exist on type 'Readonl... Remove
        this comment to see the full error message
        <Loader loading={this.state.loading} />
        {this.modalSuccess()}
        {this.modalGagal()}
        // @ts-expect-error TS(2339): Property 'content' does not exist on type 'Readonl... Remove
        this comment to see the full error message
        {this.state.content === 'register'
          ? this.renderRegister()
          : // @ts-expect-error TS(2339): Property 'content' does not exist on type 'Readonl... Remove this comment to see the full error message
          this.state.content === 'tinggal'
          ? this.renderTinggal()
          : this.renderAlamat()}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? toDp(28) : 0,
  },
  systemBar: {
    width,
    height: toDp(20),
    backgroundColor: '#917438',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: toDp(30),
    //marginTop: toDp(20),
    //backgroundColor: 'cyan'
  },
  logo: {
    width: toDp(120),
    height: toDp(120),
  },
  touchLupa: {
    paddingVertical: toDp(4),
  },
  textLupa: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-SemiBold',
    color: '#917438',
    fontStyle: 'normal',
    letterSpacing: toDp(0.7),
  },
  touchKirim: {
    width: width * 0.82,
    height: toDp(40),
    backgroundColor: '#d3d6db',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKirim: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-SemiBold',
    color: 'white',
    fontStyle: 'normal',
    letterSpacing: toDp(0.7),
  },
  textLupaPassword: {
    marginLeft: toDp(30),
    marginTop: toDp(72),
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Bold',
    color: '#263238',
    fontStyle: 'normal',
    letterSpacing: toDp(2),
  },
  content: {
    padding: toDp(32),
    //marginTop: toDp(40)
  },
  viewTextTitle: {
    width: width * 0.82,
  },
  center: {
    alignItems: 'center',
  },
  textTitle: {
    marginTop: toDp(16),
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Bold',
    color: '#263238',
    fontStyle: 'normal',
    letterSpacing: toDp(2),
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
    //fontFamily: 'Montserrat-Regular',
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
    //fontFamily: 'Montserrat-Regular',
    color: '#273238',
  },
  textKetentuan: {
    //fontFamily: 'Montserrat-SemiBold',
    color: '#917438',
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
    //height: toDp(340),
    height: 'auto',
    paddingBottom: toDp(24),
    backgroundColor: '#FFFFFF',
    borderRadius: toDp(4),
    alignItems: 'center',
  },
  textTitleModal: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Bold',
    color: '#263238',
    letterSpacing: toDp(2),
    marginTop: toDp(24),
  },
  textDescModal: {
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    color: '#263238',
    marginTop: toDp(16),
    textAlign: 'center',
    marginHorizontal: toDp(16),
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
    width: toDp(228),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKembaliKeLogin: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
    letterSpacing: toDp(0.7),
  },
});
