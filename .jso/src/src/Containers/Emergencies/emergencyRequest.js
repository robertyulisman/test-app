  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _messaging = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var SosRequestScreen = function SosRequestScreen(_ref) {
    var navigation = _ref.navigation;
    var _useState = (0, _react.useState)({
        emergencyStatus: 'waiting',
        isLoadingImage: false,
        isLoading: false,
        isDarkMode: false,
        isTouch: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    var handleCancel = function handleCancel() {
      setState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isLoading: true
        });
      });
      (0, _$$_REQUIRE(_dependencyMap[9]).getEmergencyCancel)().then(function (response) {
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: false
          });
        });
        navigation.goBack();
      }).catch(function (error) {
        _reactNative.Alert.alert('' + error.status + ' - ' + error.data.name, error.data.message, [{
          text: 'OK',
          onPress: function onPress() {
            setState(function (prevState) {
              return Object.assign(Object.assign({}, prevState), {}, {
                isLoading: false
              });
            });
            navigation.goBack();
          }
        }], {
          cancelable: false
        });
      });
    };
    var requestEmergencyStatus = function requestEmergencyStatus() {
      (0, _$$_REQUIRE(_dependencyMap[9]).getEmergencyStatus)().then(function (response) {
        if (response.data.emergency.emergency_status === 'Request') {
          setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              emergencyStatus: 'waiting'
            });
          });
        } else if (response.data.emergency.emergency_status === 'Proses') {
          setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              emergencyStatus: 'process'
            });
          });
        } else if (response.data.emergency.emergency_status === 'Selesai') {
          // id = 2f12937a-887a-46c9-b1d5-c4b9162000e1
          setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              emergencyStatus: 'done'
            });
          });
        }
      }).catch(function (error) {});
    };
    (0, _react.useEffect)(function () {
      requestEmergencyStatus();
      var unsubscribe = (0, _messaging.default)().onMessage(/*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)(function* (remoteMessage) {
          if (remoteMessage.data.entity_type === 'emergency') {
            requestEmergencyStatus();
          }
        });
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
      return unsubscribe;
    }, []);
    var WaitingView = function WaitingView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.content, {
          backgroundColor: state.isDarkMode ? '#121212' : '#FFFFFF'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image
      //source={{uri: 'https://firebasestorage.googleapis.com/v0/b/ayodhya-edcf7.appspot.com/o/Darurat%2Fsos_waiting_gif.gif?alt=media&token=4b4e7c58-165a-4b8a-aa86-e09bb158a8e2'}}
      , {
        source: state.isDarkMode ? _$$_REQUIRE(_dependencyMap[10]).allLogo.sosWaitingDark : _$$_REQUIRE(_dependencyMap[10]).allLogo.sosWaitingLight,
        style: styles.sosWaitingGif,
        onLoadStart: function onLoadStart() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoadingImage: true
            });
          });
        },
        onLoadEnd: function onLoadEnd() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoadingImage: false
            });
          });
        }
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.descriptionWaiting, {
          color: state.isDarkMode ? 'white' : '#273238'
        }]
      }, "Menghubungi pengelola..."), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.centerFooter
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return handleCancel();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[10]).allLogo.sosCancel,
        style: styles.sosCancel
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textTekan, {
          color: state.isDarkMode ? 'white' : '#273238'
        }]
      }, "Tekan untuk membatalkan")));
    };
    var ProcessView = function ProcessView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.content, {
          backgroundColor: state.isDarkMode ? '#121212' : '#FFFFFF'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image
      //source={{uri: 'https://firebasestorage.googleapis.com/v0/b/ayodhya-edcf7.appspot.com/o/Darurat%2Fsos_respond_gif.gif?alt=media&token=70bedb3f-4037-4fab-ab78-2789f083759f'}}
      , {
        source: state.isDarkMode ? _$$_REQUIRE(_dependencyMap[10]).allLogo.sosProsesDark : _$$_REQUIRE(_dependencyMap[10]).allLogo.sosProsesLight,
        onLoadStart: function onLoadStart() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoadingImage: true
            });
          });
        },
        onLoadEnd: function onLoadEnd() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoadingImage: false
            });
          });
        }
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.description, {
          color: state.isDarkMode ? 'white' : '#273238'
        }]
      }, "Panggilan darurat diterima.", '\n', "Petugas sedang menuju ke lokasi Anda."), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textFooter, {
          color: state.isDarkMode ? 'white' : '#9B9F95'
        }]
      }, "Panggilan darurat Anda akan tetap terproses sampai diselesaikan oleh petugas. Anda juga bisa membatalkan panggilan darurat ini melalui menu riwayat"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: [styles.touchKeluar, {
          backgroundColor: state.isDarkMode ? '#1C1C1E' : 'transparent',
          borderColor: state.isDarkMode ? '#1C1C1E' : '#5AAA0F'
        }],
        onPress: function onPress() {
          return navigation.goBack();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textKeluar
      }, "Kembali ke Beranda")));
    };
    var CompleteView = function CompleteView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.content, {
          backgroundColor: state.isDarkMode ? '#121212' : '#FFFFFF'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image
      //source={{uri: 'https://firebasestorage.googleapis.com/v0/b/ayodhya-edcf7.appspot.com/o/Darurat%2Fsos_done_gif.gif?alt=media&token=d2b4b725-eecc-4295-ba11-f81d4eb6477f'}}
      , {
        source: state.isDarkMode ? _$$_REQUIRE(_dependencyMap[10]).allLogo.sosDoneDark : _$$_REQUIRE(_dependencyMap[10]).allLogo.sosDoneLight,
        style: styles.sosWaitingGif,
        onLoadStart: function onLoadStart() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoadingImage: true
            });
          });
        },
        onLoadEnd: function onLoadEnd() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoadingImage: false
            });
          });
        }
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.description, {
          color: state.isDarkMode ? 'white' : '#273238'
        }]
      }, "Situasi darurat telah berhasil diatasi oleh petugas."), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: [styles.touchKeluar, {
          backgroundColor: state.isDarkMode ? '#1C1C1E' : 'transparent',
          borderColor: state.isDarkMode ? '#1C1C1E' : '#5AAA0F'
        }],
        onPress: function onPress() {
          return navigation.goBack();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textKeluar
      }, "KEMBALI KE HOME")));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: state.isDarkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.isLoading
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'SOS Request',
      onPress: function onPress() {
        return navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.isLoading
    }), state.emergencyStatus === 'waiting' ? WaitingView() : state.emergencyStatus === 'process' ? ProcessView() : CompleteView());
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f7f8'
    },
    headeriOS: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16)
    },
    sosButton: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(200),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(200),
      resizeMode: 'contain'
    },
    sosWaitingGif: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(222),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(222)
    },
    description: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      textAlign: 'center',
      color: '#273238'
    },
    descriptionWaiting: {
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(80),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      textAlign: 'center',
      color: '#273238'
    },
    touchKeluar: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(189),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1),
      borderColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10)
    },
    textKeluar: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      textAlign: 'center',
      color: '#5AAA0F',
      letterSpacing: 0.7
    },
    centerFooter: {
      alignItems: 'center'
    },
    sosCancel: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(50),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(50)
    },
    textTekan: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      textAlign: 'center',
      color: '#273238'
    },
    textFooter: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(12),
      textAlign: 'center',
      color: '#8C8E92',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(30),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(19)
    }
  });
  var _default = exports.default = SosRequestScreen;
