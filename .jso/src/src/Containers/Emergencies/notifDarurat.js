  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _messaging = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  // @ts-expect-error TS(2580): Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message

  var tempWshoosh = '';
  var NotifDaruratScreen = function NotifDaruratScreen(_ref) {
    var navigation = _ref.navigation,
      route = _ref.route;
    var _useState = (0, _react.useState)({
        isLoading: false,
        isDarkMode: false,
        isGoBack: false,
        isShowSuccessModal: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      var unsubscribe = (0, _messaging.default)().onMessage(function (remoteMessage) {
        if (remoteMessage.data.entity_type === 'emergency' && remoteMessage.data.entity_additional_info === 'Batal') {
          _reactNative.Alert.alert(remoteMessage.data.title, remoteMessage.data.body, [{
            text: 'OK',
            onPress: function onPress() {
              handleBack();
            }
          }], {
            cancelable: false
          });
        }
      });
      return unsubscribe;
    }, []);
    (0, _react.useEffect)(function () {
      playSound();
    }, []);
    (0, _react.useEffect)(function () {
      if (state.isLoading === false && state.isGoBack === true) {
        route.params.emergencyData.refreshData();
      }
    }, [state.isLoading]);
    (0, _react.useEffect)(function () {
      if (state.isShowSuccessModal === false && state.isGoBack === true) {
        try {
          tempWshoosh.stop(function () {
            navigation.goBack();
          });
        } catch (e) {}
      }
    }, [state.isShowSuccessModal]);
    var playSound = function playSound() {
      var whoosh = new (_$$_REQUIRE(_dependencyMap[9]))('sirine.mp3', _$$_REQUIRE(_dependencyMap[9]).MAIN_BUNDLE, function (error) {
        if (error) {
          return;
        }
        whoosh.play(function (success) {
          if (success) {} else {}
        });
      });
      whoosh.setVolume(0.1);
      tempWshoosh = whoosh;
    };
    var handleUpdateProcess = function handleUpdateProcess() {
      setState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isLoading: true
        });
      });
      (0, _$$_REQUIRE(_dependencyMap[10]).postEmergenciesAction)('/' + route.params.emergencyData.id).then(function (response) {
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: false,
            isGoBack: true,
            isShowSuccessModal: true
          });
        });
      }).catch(function (error) {
        _reactNative.Alert.alert('Informasi', 'Petugas lain sudah menanggapi sinyal darurat ini', [{
          text: 'OK',
          onPress: function onPress() {
            setState(function (prevState) {
              return Object.assign(Object.assign({}, prevState), {}, {
                isLoading: false,
                isGoBack: true
              });
            });
          }
        }], {
          cancelable: false
        });
      });
    };
    (0, _react.useEffect)(function () {
      var unsubscribe = navigation.addListener('transitionEnd', function (e) {
        if (e.data.closing) {
          if (_reactNative.Platform.OS === 'ios') {
            stop();
          }
        }
      });
      return unsubscribe;
    }, [navigation]);
    var stop = function stop() {
      tempWshoosh.stop(function () {});
    };
    var handleBackButtonClick = function handleBackButtonClick() {
      stop();
    };
    (0, _react.useEffect)(function () {
      _reactNative.BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
      return function () {
        _reactNative.BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
      };
    }, []);
    var handleBack = function handleBack() {
      tempWshoosh.stop(function () {
        navigation.goBack();
      });
    };
    var SuccessModalView = function SuccessModalView() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        isVisible: state.isShowSuccessModal,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.modalBox
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icClap,
        style: styles.icSuccess
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textTitleModal
      }, "TERIMA KASIH TELAH MERESPON"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textDescModal
      }, "Silakan menuju lokasi untuk menindak lanjuti panggilan."), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowSuccessModal: false
            });
          });
        },
        style: styles.touchKembaliKeLogin
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textKembaliKeLogin
      }, "OK")))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: state.isDarkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'SOS Request',
      onPress: function onPress() {
        return handleBack();
      }
    }), SuccessModalView(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.containerContent
    }, /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.isLoading
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.center
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[11]).allLogo.sosWaitingGif,
      style: styles.sosButton
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.title
    }, "PANGGILAN DARURAT"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textName
    }, route.params.emergencyData.user.name), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: [styles.textAddress, {
        textAlign: 'center'
      }]
    }, route.params.emergencyData.unit.unit_name), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: [styles.button],
      onPress: function onPress() {
        return handleUpdateProcess();
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textTindakLanjut
    }, "Tindak Lanjuti")))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f7f8'
    },
    containerContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#f5f5f5'
    },
    bgNotifDarurat: {
      width: width
      //height: Platform.OS === 'android' ? (height + toDp(28)) : height
    },
    whiteLayer: {
      flex: 1,
      backgroundColor: 'cyan',
      position: 'absolute'
    },
    center: {
      flex: 1,
      //backgroundColor: '#99ffffff',
      position: 'absolute',
      alignItems: 'center'
    },
    button: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(60),
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(250),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      backgroundColor: '#5AAA0F',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10)
    },
    title: {
      color: '#f5493c',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2)
    },
    sosButton: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(30),
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(222),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(222)
    },
    textName: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      color: '#1c2028',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(18),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      textAlign: 'center'
    },
    textAddress: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      color: '#5E6157',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14)
    },
    textTindakLanjut: {
      color: '#ffffff',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1)
    },
    buttonSilang: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(34),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(23),
      alignItems: 'center',
      justifyContent: 'center'
    },
    icCancelDarurat: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(60),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(60)
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
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(280),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(320),
      backgroundColor: '#FFFFFF',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      alignItems: 'center'
    },
    textTitleModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(25),
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(240),
      textAlign: 'center'
    },
    textDescModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      color: '#263238',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(240),
      textAlign: 'center'
    },
    icSuccess: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40)
    },
    touchKembaliKeLogin: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(200),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKembaliKeLogin: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.2)
    }
  });
  var _default = exports.default = NotifDaruratScreen;
