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
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[10]));
  var _CustomTextInput = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  // import Toast, {DURATION} from '@Toast'

  // import NetInfo from '@react-native-community/netinfo'

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var ChangePasswordScreen = function ChangePasswordScreen(_ref) {
    var navigation = _ref.navigation;
    var refPassword = (0, _react.useRef)();
    var refPasswordBaru = (0, _react.useRef)();
    var refConfirmPasswordBaru = (0, _react.useRef)();
    var _useState = (0, _react.useState)({
        isConnectionAvailable: false,
        isLoading: false,
        isDarkMode: false,
        isPasswordSecure: true,
        isNewPassSecure: true,
        isConfirmPassSecure: true,
        isShowSuccessModal: false,
        isSuccess: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      viewState = _useState2[0],
      setViewState = _useState2[1];
    var _useState3 = (0, _react.useState)({
        password: '',
        newPassword: '',
        confirmPassword: ''
      }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      formState = _useState4[0],
      setFormState = _useState4[1];
    var _useState5 = (0, _react.useState)({
        errorPassword: '',
        errorNewPassword: '',
        errorConfirmPassword: ''
      }),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      formError = _useState6[0],
      setFormError = _useState6[1];
    var handleForm = function handleForm(value, type) {
      setFormState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, (0, _defineProperty2.default)({}, type, value));
      });
    };
    var handleDone = function handleDone() {
      setViewState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isShowSuccessModal: false
        });
      });
    };
    (0, _react.useEffect)(function () {
      if (viewState.isSuccess === true && viewState.isShowSuccessModal === false) {
        NavigatorService.reset('Home');
      }
    }, [viewState.isShowSuccessModal]);
    var ForgotSuccessView = function ForgotSuccessView() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        isVisible: viewState.isShowSuccessModal,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.modalBox
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[12]).allLogo.icSuccess,
        style: styles.icSuccess
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textTitleModal
      }, "PASSWORD BERHASIL DIUBAH"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textDescModal
      }, "Password Anda telah berhasil diperbaharui"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return handleDone();
        },
        style: styles.touchKembaliKeLogin
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textKembaliKeLogin
      }, "Selesai")))));
    };
    var handleSimpan = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        if (formState.password.length < 6) {
          setFormError(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              errorPassword: 'Password minimal 6 karakter.'
            });
          });
        } else if (formState.newPassword.length < 6) {
          setFormError(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              errorNewPassword: 'Password baru minimal 6 karakter.'
            });
          });
        } else if (formState.newPassword !== formState.confirmPassword) {
          setFormError(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              errorConfirmPassword: 'Password baru yang dimasukkan tidak sesuai.'
            });
          });
        } else {
          var body = {
            old_password: formState.password,
            new_password: formState.newPassword
          };
          setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoading: true
            });
          });
          (0, _$$_REQUIRE(_dependencyMap[13]).putResidentPassword)(body).then(function (response) {
            setViewState(function (prevState) {
              return Object.assign(Object.assign({}, prevState), {}, {
                isLoading: false,
                isShowSuccessModal: true,
                isSuccess: true
              });
            });
            setFormState({
              password: '',
              newPassword: '',
              confirmPassword: ''
            });
            setFormError({
              errorPassword: '',
              errorNewPassword: '',
              errorConfirmPassword: ''
            });
            _reactNative.Keyboard.dismiss();
          }).catch(function (error) {
            setViewState(function (prevState) {
              return Object.assign(Object.assign({}, prevState), {}, {
                isLoading: false
              });
            });
            if (error.data.message === 'Old Password does not match.') {
              setFormError(function (prevState) {
                return Object.assign(Object.assign({}, prevState), {}, {
                  errorPassword: 'Password yang dimasukkan tidak sesuai.'
                });
              });
            } else {
              _reactNative.Alert.alert('' + error.status, '' + error.data.message);
            }
          });
        }
      });
      return function handleSimpan() {
        return _ref2.apply(this, arguments);
      };
    }();
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: viewState.isDarkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: viewState.isDarkMode ? 'light-content' : 'dark-content',
      translucent: true,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Ubah Password',
      onPress: function onPress() {
        return navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: viewState.isLoading
    }), /*#__PURE__*/_react.default.createElement(ForgotSuccessView, null), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
      behavior: 'padding',
      enabled: _reactNative.Platform.OS === 'ios' ? true : false
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.detailInfo
    }, /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
      inputRef: refPassword,
      title: 'Password',
      placeholder: 'Masukkan password Anda disini',
      value: formState.password,
      error: formError.errorPassword,
      autoCapitalize: 'none',
      type: "password",
      returnKeyType: 'next',
      maxLength: 23,
      secureTextEntry: viewState.isPasswordSecure,
      onChangeText: function onChangeText(value) {
        return handleForm(value, 'password');
      },
      onChangeSecure: function onChangeSecure() {
        setViewState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isPasswordSecure: !prevState.isPasswordSecure
          });
        });
      },
      onSubmitEditing: function onSubmitEditing() {
        refPasswordBaru.current.focus();
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24)
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
      inputRef: refPasswordBaru,
      title: 'Password baru',
      placeholder: 'Masukkan password baru disini',
      value: formState.newPassword,
      error: formError.errorNewPassword,
      autoCapitalize: 'none',
      type: "password",
      returnKeyType: 'next',
      maxLength: 23,
      secureTextEntry: viewState.isNewPassSecure,
      onChangeText: function onChangeText(value) {
        return handleForm(value, 'newPassword');
      },
      onChangeSecure: function onChangeSecure() {
        setViewState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isNewPassSecure: !prevState.isNewPassSecure
          });
        });
      },
      onSubmitEditing: function onSubmitEditing() {
        refConfirmPasswordBaru.current.focus();
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24)
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
      inputRef: refConfirmPasswordBaru,
      title: 'Ketik ulang password baru',
      placeholder: 'Ketik ulang password baru disini',
      value: formState.confirmPassword,
      error: formError.errorConfirmPassword,
      autoCapitalize: 'none',
      type: "password",
      returnKeyType: 'next',
      maxLength: 23,
      secureTextEntry: viewState.isConfirmPassSecure,
      onChangeText: function onChangeText(value) {
        return handleForm(value, 'confirmPassword');
      },
      onChangeSecure: function onChangeSecure() {
        setViewState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isConfirmPassSecure: !prevState.isConfirmPassSecure
          });
        });
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24)
      }
    }), formState.password.trim() === '' || formState.newPassword.trim() === '' || formState.confirmPassword.trim() === '' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.touchKirim, {
        backgroundColor: '#d3d6db'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textKirim
    }, "Simpan")) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        return handleSimpan();
      },
      style: [styles.touchKirim, {
        backgroundColor: '#5AAA0F'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textKirim
    }, "Simpan"))))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(28) : 0
    },
    headeriOS: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    content: {
      flex: 1,
      padding: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    detailInfo: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      width: '100%',
      height: 'auto',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(6)
    },
    touchKirim: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'

      //marginHorizontal: toDp(20),
      //marginBottom: toDp(20),
      //width: '89%',
      //position: 'absolute',
      //bottom: 0
    },
    textKirim: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: 'white',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.7)
    },
    bottomModal: {
      //justifyContent: "flex-end",
      //margin: 0,
    },
    viewRootModal: {
      width: 'auto',
      height: 'auto',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalBox: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(280),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(335),
      backgroundColor: '#FFFFFF',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      alignItems: 'center'
    },
    textTitleModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(25),
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(200),
      textAlign: 'center'
    },
    textDescModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      //   fontFamily: 'Montserrat-Regular',
      color: '#263238',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(210),
      textAlign: 'center',
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(18)
    },
    icSuccess: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(80),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(32)
    },
    icGagal: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(80),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(32)
    },
    touchKembaliKeLogin: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(200),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKembaliKeLogin: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.7)
    }
  });
  var _default = exports.default = ChangePasswordScreen;
