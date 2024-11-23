  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _CustomTextInput = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var ForgotPasswordScreen = function ForgotPasswordScreen(_ref) {
    var navigation = _ref.navigation;
    var _useState = (0, _react.useState)({
        isForgot: true,
        isDarkMode: false,
        isLoading: false,
        isTouch: false,
        isButtonActive: false,
        message: 'Email Berhasil Terkirim',
        backgroundColor: '#5AAA0F'
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      viewState = _useState2[0],
      setViewState = _useState2[1];
    var _useState3 = (0, _react.useState)({
        email: ''
      }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      form = _useState4[0],
      setForm = _useState4[1];
    var _useState5 = (0, _react.useState)({
        errorEmail: ''
      }),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      errorForm = _useState6[0],
      setErrorForm = _useState6[1];
    (0, _react.useEffect)(function () {
      var isEmailEmpty = form.email === '';
      setViewState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isButtonActive: !isEmailEmpty,
          backgroundColor: isEmailEmpty ? '#d3d6db' : '#5AAA0F'
        });
      });
    }, [form]);
    var handleEmail = function handleEmail(value) {
      setForm(function (prevState) {
        return {
          email: value
        };
      });
    };
    var validateEmail = function validateEmail(email) {
      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(String(email).toLowerCase());
    };
    var kirim = function kirim() {
      //what to do:
      //check validation email format
      if (!validateEmail(form.email)) {
        setErrorForm({
          errorEmail: 'Format email salah.'
        });
      } else {
        setViewState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: true
          });
        });
        (0, _$$_REQUIRE(_dependencyMap[8]).postForgotPassword)({
          email: form.email
        }).then(function (response) {
          setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isForgot: false,
              isTouch: true,
              isLoading: false,
              message: 'Email Berhasil Terkirim'
            });
          });
        }).catch(function (error) {
          var errorEmail = error.data.message;
          if (errorEmail === 'Email does not registred.') {
            errorEmail = 'Email tidak terdaftar.';
          }
          setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoading: false
            });
          });
          setErrorForm({
            errorEmail: errorEmail
          });
        });
      }
      //error handler if format email false
      //hit API forgot pass
      //show success modal if success API response
      //error handler if email not registered
    };
    var ForgotSuccessView = function ForgotSuccessView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.contentDone
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[9]).allLogo.icSuccess,
        style: styles.successForget
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textMessage, {
          color: viewState.isDarkMode ? 'white' : '#263238'
        }]
      }, viewState.message), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textDesc, {
          color: viewState.isDarkMode ? 'white' : '#263238'
        }]
      }, 'Silakan cek email anda dan ikuti petunjuk untuk memulihkan kembali password akun Anda'), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return navigation.goBack();
        },
        style: [styles.touchDoneKembali, {
          backgroundColor: '#5AAA0F'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textKirim
      }, "Kembali ke halaman login"))));
    };
    var ForgotView = function ForgotView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_Header.default, {
        title: 'Lupa Password',
        onPress: function onPress() {
          return navigation.goBack();
        }
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textLupaPassword, {
          color: viewState.isDarkMode ? 'white' : '#263238'
        }]
      }, "Silakan masukan alamat email untuk memulihkan kembali password akun anda"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.content
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewTextTitle
      }, /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
        title: 'Email',
        placeholder: 'Masukkan alamat email',
        error: errorForm.errorEmail,
        value: form.email,
        keyboardType: 'email-address',
        onChangeText: function onChangeText(value) {
          return handleEmail(value);
        }
      }))), viewState.isButtonActive ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return kirim();
        },
        style: [styles.touchKirim, {
          backgroundColor: viewState.backgroundColor
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textKirim
      }, "Kirim")) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.touchKirim, {
          backgroundColor: viewState.backgroundColor
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textKirim
      }, "Kirim")));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: viewState.isDarkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: viewState.darkMode ? 'light-content' : 'dark-content',
      translucent: true,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: viewState.isLoading
    }), viewState.isForgot ? ForgotView() : /*#__PURE__*/_react.default.createElement(ForgotSuccessView, null));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(28) : 0
    },
    systemBar: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(30),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20)
      //backgroundColor: 'cyan'
    },
    logo: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(100),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(44.34),
      resizeMode: 'contain'
      //position: 'absolute',
      //right: toDp(30),
      //top: toDp(24)
    },
    touchLupa: {
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(4)
    },
    textLupa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      color: '#5AAA0F',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(0.7)
    },
    touchKirim: {
      position: 'absolute',
      bottom: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(33),
      left: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(30),
      width: width * 0.82,
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(40),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKirim: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      color: 'white',
      fontStyle: 'normal'
    },
    textLupaPassword: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(30),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      color: '#263238',
      fontStyle: 'normal'
    },
    content: {
      padding: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(32)
      //marginTop: toDp(40)
    },
    viewTextTitle: {
      width: width * 0.82,
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(140)
    },
    logoDone: {
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24),
      resizeMode: 'contain',
      //width: toDp(180.4),
      //height: toDp(140),

      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(131.33333333333334),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(136.33333333333334)
    },
    contentDone: {
      //marginTop: toDp(60),
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20)
    },
    successForget: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(70),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(70),
      resizeMode: 'contain',
      tintColor: '#5AAA0F'
    },
    textMessage: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(1),
      textTransform: 'uppercase'
    },
    textDesc: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      color: '#263238',
      textAlign: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(4)
    },
    touchDoneKembali: {
      width: width * 0.82,
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(40),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  var _default = exports.default = ForgotPasswordScreen;
