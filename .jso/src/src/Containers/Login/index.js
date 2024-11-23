  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _defineProperty2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _asyncStorage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNativeDeviceInfo = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _CustomTextInput = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[11]));
  var _messaging = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var Login = function Login(_ref) {
    var navigation = _ref.navigation;
    var _useState = (0, _react.useState)({
        secureTextEntry: true,
        isLoading: false,
        isDarkMode: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    var _useState3 = (0, _react.useState)({
        //email: Platform.OS === 'android' ? 'dleader.zaii@gmail.com' : 'admin.bod@mailinator.com', password: Platform.OS === 'android' ? '123456' : 'qlue1234',
        // @ts-expect-error TS(2304): Cannot find name '__DEV__'.
        email: '',
        // @ts-expect-error TS(2304): Cannot find name '__DEV__'.
        password: '',
        //email: 'admin.bod@mailinator.com' , password: 'qlue1234',
        //email: __DEV__ ? 'smarthome@givmail.com' : '' , password: __DEV__ ? 'qlue1234' : '',
        //email: __DEV__ ? 'qaqlue.pengelola@givmail.com' : '' , password: __DEV__ ? 'qlue1234' : '',
        //email: __DEV__ ? 'qaqlue.township@givmail.com' : '' , password: __DEV__ ? 'qlue1234' : '',

        // email: Platform.OS === 'android' ? 'qaqlue2.township@givmail.com' : 'qaqlue.pengelola@givmail.com', password: 'qlue1234',
        //email: Platform.OS === 'ios' ? 'dleader.zaii@gmail.com' : 'qaqlue.pengelola@givmail.com', password: Platform.OS === 'ios' ? 'admin1234' : 'qlue1234',
        //email: true ? 'dleader.zaii@gmail.com' : 'qaqlue.pengelola@givmail.com', password: true ? '123456' : 'qlue1234',
        // email: 'admin.bod@mailinator.com', password: 'qlue1234',

        //email: __DEV__ ? 'qaqlue.pengelola@givmail.com' : '' , password: __DEV__ ? 'qlue1234' : '',
        //email: __DEV__ ? 'email.qa@givmail.com' : '' , password: __DEV__ ? 'qlue1234' : '',
        //email: __DEV__ ? 'zaiidleader@qlue.id' : '' , password: __DEV__ ? '123456' : '',

        //email: 'qaqlue.pengelola@givmail.com'  , password: 'qlue1234' ,

        //email: '' , password: '',
        fcmToken: '',
        deviceId: ''
      }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      form = _useState4[0],
      setForm = _useState4[1];
    (0, _react.useEffect)(function () {
      (0, _messaging.default)().getToken().then(function (fcmToken) {
        setForm(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            fcmToken: fcmToken
          });
        });
      }).catch(function (error) {});
      _reactNativeDeviceInfo.default.getUniqueId().then(function (deviceId) {
        setForm(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            deviceId: deviceId
          });
        });
      }).catch(function (error) {});
    }, []);
    var _useState5 = (0, _react.useState)({
        errorEmail: '',
        errorPassword: ''
      }),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      errorForm = _useState6[0],
      setErrorForm = _useState6[1];
    (0, _react.useEffect)(function () {
      if (form.email.trim() === '') {
        // setErrorForm(prevState => ({
        //   ...prevState, errorEmail: "Field ini tidak boleh kosong."
        // }))
      } else {
        setErrorForm(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            errorEmail: ''
          });
        });
      }
    }, [form]);
    var handleForm = function handleForm(value, type) {
      setForm(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, (0, _defineProperty2.default)({}, type, value));
      });
    };
    var validateEmail = function validateEmail(email) {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(String(email).toLowerCase());
    };
    var handleLogin = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        if (form.email.trim() === '' && form.password.trim() === '') {
          setErrorForm(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              errorEmail: 'Field ini tidak boleh kosong.',
              errorPassword: 'Field ini tidak boleh kosong.'
            });
          });
        } else if (form.email.trim() === '') {
          setErrorForm(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              errorEmail: 'Field ini tidak boleh kosong.',
              errorPassword: ''
            });
          });
        } else if (!validateEmail(form.email)) {
          setErrorForm(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              errorEmail: 'Format email salah.',
              errorPassword: ''
            });
          });
        } else if (form.password.trim() === '') {
          setErrorForm(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              errorEmail: '',
              errorPassword: 'Field ini tidak boleh kosong.'
            });
          });
        } else {
          request(form.email, form.password, form.fcmToken, form.deviceId);
        }
      });
      return function handleLogin() {
        return _ref2.apply(this, arguments);
      };
    }();
    var request = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* (email, password, fcmToken, deviceId) {
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: true
          });
        });
        var body = {
          email: email,
          password: password,
          fcm_token: fcmToken,
          platform: 'mobile',
          device_id: deviceId
        };
        (0, _$$_REQUIRE(_dependencyMap[13]).postLogin)(body).then(function (response) {
          setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoading: false
            });
          });
          var topic = 'centralconnect_' + _reactNative.Platform.OS;
          (0, _messaging.default)().subscribeToTopic(topic).then(function (response) {}).catch(function (error) {});

          /*messaging().subscribeToTopic('cobasaja').then(response => {
          console.log('response',response)
          }).catch(error => {
          console.log('error', error)
          })*/

          _asyncStorage.default.setItem('token', response.data.token.type + ' ' + response.data.token.access_token);
          _asyncStorage.default.setItem('refresh', response.data.token.type + ' ' + response.data.token.refresh_token);
          _asyncStorage.default.setItem('dataUser', JSON.stringify(response.data.profile));
          _asyncStorage.default.setItem('features', JSON.stringify(response.data.feature));
          _asyncStorage.default.setItem('fcmToken', fcmToken);
          _asyncStorage.default.setItem('deviceId', deviceId);
          if (response.data.unit === null && response.data.profile.is_a_resident) {
            NavigatorService.reset('SetUnit');
          } else {
            _asyncStorage.default.setItem('unit', JSON.stringify(response.data.unit));
            NavigatorService.reset('Home');
          }
        }).catch(function (error) {
          var errorPassword = '';
          if (error.status === 400) {
            if (error.data.message === 'Email is not registered') {
              errorPassword = 'Email tidak terdaftar.';
            } else {
              errorPassword = 'Akun anda sedang dalam verifikasi.';
            }
          } else if (error.status === 401) {
            errorPassword = 'Email atau password salah.';
          } else {
            errorPassword = 'Tolong dicoba kembali.';
          }
          setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoading: false
            });
          });
          setErrorForm(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              errorPassword: errorPassword
            });
          });
        });
      });
      return function request(_x, _x2, _x3, _x4) {
        return _ref3.apply(this, arguments);
      };
    }();
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: state.isDarkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: state.isDarkMode ? 'light-content' : 'dark-content',
      translucent: true,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.isLoading
    }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
      behavior: 'padding',
      enabled: _reactNative.Platform.OS === 'ios' ? true : false
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        alignItems: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[14]).allLogo.logo,
      style: [styles.logo, {
        tintColor: state.isDarkMode && 'white'
      }]
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: [styles.textLogin, {
        color: state.isDarkMode ? 'white' : '#263238'
      }]
    }, "LOGIN"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewTextTitle
    }, /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
      title: 'Email',
      placeholder: 'Masukkan alamat email Anda disini',
      error: errorForm.errorEmail,
      value: form.email,
      onChangeText: function onChangeText(value) {
        return handleForm(value, 'email');
      },
      keyboardType: 'email-address'
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
      title: 'Password',
      placeholder: 'Masukkan password Anda disini',
      value: form.password,
      error: errorForm.errorPassword,
      autoCapitalize: 'none',
      type: "password",
      returnKeyType: 'next',
      maxLength: 23,
      secureTextEntry: state.secureTextEntry,
      onChangeText: function onChangeText(value) {
        return handleForm(value, 'password');
      },
      onChangeSecure: function onChangeSecure() {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            secureTextEntry: !state.secureTextEntry
          });
        });
      }
    })), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchLupa,
      onPress: function onPress() {
        return NavigatorService.navigate('ForgotPass');
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textLupa
    }, "Lupa Password?"))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchLogin,
      onPress: function onPress() {
        return handleLogin();
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.text
    }, "Login")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewAtau
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: [styles.textAtau, {
        color: state.isDarkMode ? 'white' : '#5E6157'
      }]
    }, "Belum punya akun?")), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchRegister,
      onPress: function onPress() {
        return NavigatorService.navigate('Register');
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textLupa
    }, "Register"))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48)
      }
    })))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      paddingTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(28) : 0
    },
    systemBar: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    logo: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(112.57142857142857),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(116.85714285714286),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      resizeMode: 'contain',
      alignSelf: 'flex-end',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(30)
    },
    textLogin: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      color: '#263238',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      alignSelf: 'flex-start',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(30)
    },
    content: {
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(32),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(32)
    },
    viewTextTitle: {
      width: width * 0.82
    },
    viewRow: {
      flexDirection: 'row'
    },
    touchEye: {
      padding: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0),
      top: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(31.5),
      tintColor: '#B0BEC5'
    },
    icEye: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
    },
    touchLupa: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(124)
    },
    textLupa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#5AAA0F',
      fontStyle: 'normal'
    },
    footer: {},
    touchLogin: {
      width: width * 0.82,
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      backgroundColor: '#5AAA0F',
      // borderRadius: toDp(4),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      borderRadius: 10,
      borderColor: '#5AAA0F',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20)
    },
    text: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: 'white',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.7)
    },
    viewAtau: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40)
    },
    textAtau: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#5E6157'
    },
    touchRegister: {
      alignItems: 'center',
      borderColor: '#5AAA0F',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      borderRadius: 10,
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      justifyContent: 'center'
    }
  });
  var _default = exports.default = Login;
