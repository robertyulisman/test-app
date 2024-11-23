  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _NoConnection = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[8]));
  var _historyEmergency = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var EmergencyScreen = function EmergencyScreen(_ref) {
    var route = _ref.route,
      navigation = _ref.navigation;
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[10]).useNetInfo)();
    var _useState = (0, _react.useState)({
        isDarkMode: false,
        isLoading: false,
        listEmergencyContact: [],
        content: 'emergency',
        location: route.params.location
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    var postEmergencies = function postEmergencies() {
      setState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isLoading: true
        });
      });
      (0, _$$_REQUIRE(_dependencyMap[11]).postEmergenciesSend)({
        // latitude: state.location.latitude,
        // longitude: state.location.longitude,
        latitude: 1.1016133,
        longitude: 104.0309097
      }).then(function (response) {
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: false
          });
        });
        navigation.goBack();
        NavigatorService.navigate('SosRequest');
      }).catch(function (error) {
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: false
          });
        });
        _reactNative.Alert.alert('' + error.status, '' + error.data.message);
      });
    };
    var checkEmergencyStatus = function checkEmergencyStatus() {
      (0, _$$_REQUIRE(_dependencyMap[11]).getEmergencyStatus)().then(function (response) {
        if (response.data.emergency.emergency_status === 'Request') {
          setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              emergencyStatus: 'waiting',
              isLoading: false
            });
          });
          NavigatorService.navigate('SosRequest');
        } else if (response.data.emergency.emergency_status === 'Proses') {
          setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              emergencyStatus: 'process',
              isLoading: false
            });
          });
          NavigatorService.navigate('SosRequest');
        } else {}
      }).catch(function (error) {});
    };
    (0, _react.useEffect)(function () {
      //setState(prevState => ({...prevState, isLoading: true}))
      //fetchContactCategory()
      checkEmergencyStatus();
    }, []);
    var DefaultView = function DefaultView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.content, {
          backgroundColor: state.isDarkMode ? '#121212' : '#FFFFFF'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.topTextWrapper
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textDesc,
        textType: "semibold"
      }, "Perhatian!"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textDesc, {
          color: state.isDarkMode ? 'white' : '#273238'
        }]
      }, "Gunakan Fitur Darurat ini dengan bijak, hanya berlaku pada area kawasan")), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return postEmergencies();
        } /*handleEmergencies()*/
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[12]).allLogo.sosButton,
        style: styles.sosButton
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textDesc, {
          color: state.isDarkMode ? 'white' : '#273238',
          marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20)
        }]
      }, "Tekan tombol SOS untuk ", '\n', " mengaktifkan panggilan darurat"));
    };
    var TabView = function TabView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewSection
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSection,
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              content: 'emergency'
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textNameSection, {
          color: state.content === 'emergency' ? '#5AAA0F' : '#CCCFC9'
        }]
      }, "EMERGENCY"), state.content === 'emergency' && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.active
      })), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSection,
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              content: 'riwayat'
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textNameSection, {
          color: state.content === 'riwayat' ? '#5AAA0F' : '#CCCFC9'
        }]
      }, "RIWAYAT"), state.content === 'riwayat' && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.active
      })));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: state.isDarkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.isLoading
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Emergency',
      onPress: function onPress() {
        return navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(TabView, null), !netInfo.isConnected ? /*#__PURE__*/_react.default.createElement(_NoConnection.default, null) : state.content === 'emergency' ? /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, DefaultView(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.divider
    })) : /*#__PURE__*/_react.default.createElement(_historyEmergency.default, null));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f7f8'
    },
    headeriOS: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    content: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
    },
    contactListWrapper: {
      margin: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20)
    },
    line: {
      width: width * 0.9,
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1),
      backgroundColor: '#DDE3E0',
      position: 'absolute',
      bottom: 0
    },
    divider: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(7),
      backgroundColor: '#EEEEEE'
    },
    topTextWrapper: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(6)
    },
    leftIcon: {
      resizeMode: 'cover',
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(17),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12)
    },
    emergencyContantText: {
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(10),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      color: '#9B9F95'
    },
    rightIcon: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(8),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12),
      tintColor: '#5AAA0F'
    },
    buttonContact: {
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(40),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    sosButton: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(200),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(200),
      resizeMode: 'contain'
    },
    sosWaitingGif: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(222),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(222)
    },
    description: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(63),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(65)
    },
    textDesc: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      textAlign: 'center',
      color: '#273238',
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24)
    },
    touchKeluar: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(189),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1),
      borderColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKeluar: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      textAlign: 'center',
      color: '#5AAA0F',
      letterSpacing: 0.7
    },
    centerFooter: {
      alignItems: 'center'
    },
    sosCancel: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(50),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(50)
    },
    textTekan: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      textAlign: 'center',
      color: '#273238'
    },
    textFooter: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12),
      textAlign: 'center',
      color: '#8C8E92'
    },
    viewSection: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(40),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    touchSection: {
      flex: 1,
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(40),
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1),
      borderBottomColor: '#DDE3E0'
    },
    textNameSection: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      color: '#5AAA0F'
    },
    active: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(2),
      backgroundColor: '#5AAA0F',
      position: 'absolute',
      bottom: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(-1)
    }
  });
  var _default = exports.default = EmergencyScreen;
