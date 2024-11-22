import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { allLogo } from '../../Assets';
import CustomTextInput from '../../Components/CustomText';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import { toDp } from '../../Helper/percentageToDP';
import { postForgotPassword } from '../../Services/Apis';

const { width, height } = Dimensions.get('window');
type Props = {};

export default class LupaPassword extends Component<any, any> {
  private email: any;
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      errorEmail: '',
      backgroundColor: '#CCCFC9',
      message: 'Email Berhasil Terkirim!',
      content: 'done', // forgot / done,
      darkMode: false,
      touch: true,
    };
  }

  async componentDidMount() {
    let darkMode: any = await AsyncStorage.getItem('darkMode');
    this.setState({ darkMode: JSON.parse(darkMode), loading: false });
  }

  kirim = () => {
    if (this.state.email.trim() === '') {
      this.setState({ errorEmail: 'Field ini tidak boleh kosong.' });
      this.email.focus();
    } else if (!this.props.navigation.state.params.validateEmail(this.state.email)) {
      this.setState({ errorEmail: 'Format email salah.' });
      this.email.focus();
    } else {
      this.setState({ loading: true }, () => {
        if (this.state.touch) {
          postForgotPassword({ email: this.state.email })
            .then((response) => {
              console.log(response);
              const self = this;

              setTimeout(function () {
                self.setState({
                  content: 'done',
                  touch: true,
                  loading: false,
                  message: 'Email Berhasil Terkirim!',
                });
              }, 100);
            })
            .catch((error) => {
              console.log(error);
              let errorEmail = error.data.message;
              if (errorEmail === 'Email does not registred.') {
                errorEmail = 'Email tidak terdaftar.';
              }
              this.setState({ errorEmail, loading: false, touch: true });
              this.email.focus();
            });
        }
      });
    }
  };

  renderForgot = () => {
    return (
      <View>
        <Header title={'Lupa Password'} onPress={() => this.props.navigation.goBack()} />

        <Text
          style={[styles.textLupaPassword, { color: this.state.darkMode ? 'white' : '#263238' }]}
        >
          Silakan masukan alamat email untuk memulihkan kembali password akun anda
        </Text>
        <View style={styles.content}>
          <View style={styles.viewTextTitle}>
            <CustomTextInput
              inputRef={(ref: any) => (this.email = ref)}
              title={'Email'}
              placeholder={'Masukkan alamat email'}
              error={this.state.errorEmail}
              value={this.state.email}
              keyboardType={'email-address'}
              onChangeText={(email: any) => {
                this.setState({ email }, () => {
                  if (email.trim() === '') {
                    this.setState({
                      errorEmail: 'Field ini tidak boleh kosong.',
                      backgroundColor: '#CCCFC9',
                    });
                  } else {
                    this.setState({
                      errorEmail: '',
                      backgroundColor: '#5AAA0F',
                    });
                  }
                });
              }}
            />
          </View>
        </View>

        {this.state.email.trim() === '' ? (
          <View style={[styles.touchKirim, { backgroundColor: this.state.backgroundColor }]}>
            <Text style={styles.textKirim}>Kirim</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => this.kirim()}
            style={[styles.touchKirim, { backgroundColor: this.state.backgroundColor }]}
          >
            <Text style={styles.textKirim}>Kirim</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  renderDone = () => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.contentDone}>
          <Image source={allLogo.icSuccess} style={styles.successForget} />
          <Text style={[styles.textMessage, { color: this.state.darkMode ? 'white' : '#263238' }]}>
            {this.state.message}
          </Text>
          <Text style={[styles.textDesc, { color: this.state.darkMode ? 'white' : '#263238' }]}>
            {
              'Silakan cek email anda dan ikuti petunjuk untuk memulihkan kembali password akun Anda'
            }
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={[styles.touchDoneKembali, { backgroundColor: '#5AAA0F' }]}
          >
            <Text style={styles.textKirim}>Kembali ke halaman login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: this.state.darkMode ? '#121212' : 'white' }]}
      >
        <StatusBar
          barStyle={this.state.darkMode ? 'light-content' : 'dark-content'}
          translucent={true}
          backgroundColor={'transparent'}
        />
        <Loader loading={this.state.loading} />

        {this.state.content === 'forgot' ? this.renderForgot() : this.renderDone()}
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
    backgroundColor: '#5AAA0F',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: toDp(30),
    marginTop: toDp(20),
    //backgroundColor: 'cyan'
  },
  logo: {
    width: toDp(100),
    height: toDp(44.34),
    resizeMode: 'contain',
    //position: 'absolute',
    //right: toDp(30),
    //top: toDp(24)
  },
  touchLupa: {
    paddingVertical: toDp(4),
  },
  textLupa: {
    fontSize: toDp(14),
    color: '#5AAA0F',
    fontStyle: 'normal',
    letterSpacing: toDp(0.7),
  },
  touchKirim: {
    position: 'absolute',
    bottom: toDp(33),
    left: toDp(30),
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
    marginTop: toDp(24),
    fontSize: toDp(14),

    color: '#263238',
    fontStyle: 'normal',
  },
  content: {
    padding: toDp(32),
    //marginTop: toDp(40)
  },
  viewTextTitle: {
    width: width * 0.82,
    height: toDp(140),
  },

  logoDone: {
    marginVertical: toDp(24),
    resizeMode: 'contain',
    //width: toDp(180.4),
    //height: toDp(140),

    width: toDp(394 / 3),
    height: toDp(409 / 3),
  },
  contentDone: {
    //marginTop: toDp(60),
    alignItems: 'center',
    paddingHorizontal: toDp(20),
  },
  successForget: {
    width: toDp(70),
    height: toDp(70),
    resizeMode: 'contain',
    tintColor: '#5AAA0F',
  },
  textMessage: {
    marginTop: toDp(24),
    fontSize: toDp(16),

    color: '#263238',
  },
  textDesc: {
    fontSize: toDp(16),

    color: '#263238',
    textAlign: 'center',
    marginTop: toDp(4),
  },
  touchDoneKembali: {
    width: width * 0.82,
    height: toDp(40),
    marginTop: toDp(20),
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
