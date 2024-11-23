  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _defineProperty2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _CustomTextInput = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var RestorePasswordScreen = function RestorePasswordScreen(_ref) {
    var navigation = _ref.navigation;
    var _useState = (0, _react.useState)({
        isDarkMode: false,
        isButtonActive: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      viewState = _useState2[0],
      setViewState = _useState2[1];
    var _useState3 = (0, _react.useState)({
        newPassword: '',
        confirmPassword: '',
        isNewPassSecureTextEntry: false,
        isConfirmPassSecureTextEntry: false
      }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      formState = _useState4[0],
      setFormState = _useState4[1];
    var _useState5 = (0, _react.useState)({
        newPassError: '',
        confirmPassError: ''
      }),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      errorState = _useState6[0],
      setErrorState = _useState6[1];
    var handleForm = function handleForm(value, type) {
      setFormState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, (0, _defineProperty2.default)({}, type, value));
      });
    };
    var handleSecureText = function handleSecureText(type) {
      setFormState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, (0, _defineProperty2.default)({}, type, !prevState[type]));
      });
    };
    (0, _react.useEffect)(function () {
      if (formState.confirmPassword.trim() === '' || formState.newPassword.trim() === '') {
        setViewState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isButtonActive: false
          });
        });
      } else {
        setViewState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isButtonActive: true
          });
        });
      }
    }, [formState]);
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: viewState.isDarkMode ? 'light-content' : 'dark-content',
      translucent: true,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
      behavior: 'padding'
      // @ts-expect-error TS(2304): Cannot find name 'Platform'.
      ,
      enabled: false
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        alignItems: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[6]).allLogo.logo,
      style: [styles.logo, {
        tintColor: viewState.isDarkMode && 'white'
      }]
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [styles.textLogin, {
        color: viewState.isDarkMode && 'white'
      }]
    }, "Atur ulang password"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewTextTitle
    }, /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
      title: 'Password baru',
      placeholder: 'Masukkan password baru',
      error: errorState.newPassError,
      value: formState.newPassword,
      onChangeText: function onChangeText(value) {
        return handleForm(value, 'newPassword');
      },
      autoCapitalize: 'none',
      type: "password",
      secureTextEntry: formState.isNewPassSecureTextEntry,
      onChangeSecure: function onChangeSecure() {
        return handleSecureText('isNewPassSecureTextEntry');
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(24)
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
      title: 'Konfirmasi password',
      placeholder: 'Masukkan ulang password baru',
      value: formState.confirmPassword,
      error: errorState.confirmPassError,
      autoCapitalize: 'none',
      type: "password",
      returnKeyType: 'next',
      maxLength: 23,
      secureTextEntry: formState.isConfirmPassSecureTextEntry,
      onChangeText: function onChangeText(value) {
        return handleForm(value, 'confirmPassword');
      },
      onChangeSecure: function onChangeSecure() {
        return handleSecureText('isConfirmPassSecureTextEntry');
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(24)
      }
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footer
    }, "// @ts-expect-error TS(2304): Cannot find name 'handleLogin'.", /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchLogin,
      onPress: function onPress() {
        return handleLogin();
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.text
    }, "Selesai")))))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      // @ts-expect-error TS(2304): Cannot find name 'Platform'.
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(28)
    },
    systemBar: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    logo: {
      //width: toDp(180),
      //height: toDp(140),
      width: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(112.57142857142857),
      height: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(116.85714285714286),
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(16),
      resizeMode: 'contain'
    },
    textLogin: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(14),
      // fontFamily: 'Montserrat-Bold',
      color: '#263238',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(2)
    },
    content: {
      padding: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(32)
      //marginTop: toDp(40)
    },
    viewTextTitle: {
      width: width * 0.82
    },
    viewRow: {
      flexDirection: 'row'
    },
    touchEye: {
      padding: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(8),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(0),
      top: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(31.5),
      tintColor: '#B0BEC5'
    },
    icEye: {
      width: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(24)
    },
    touchLupa: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(20),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(4)
    },
    textLupa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(14),
      // fontFamily: 'Montserrat-SemiBold',
      color: '#5AAA0F',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(0.7)
    },
    footer: {},
    touchLogin: {
      width: width * 0.82,
      height: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(14),
      // fontFamily: 'Montserrat-SemiBold',
      color: 'white',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(0.7)
    },
    viewAtau: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(20),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(30),
      alignItems: 'center'
    },
    textAtau: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(12),
      // fontFamily: 'Montserrat-Regular',
      color: '#263238',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(2)
    },
    touchRegister: {
      alignItems: 'center'
    }
  });
  var _default = exports.default = RestorePasswordScreen;
