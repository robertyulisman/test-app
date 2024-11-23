  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var ContactUsScreen = function ContactUsScreen(_ref) {
    var navigation = _ref.navigation;
    var _useState = (0, _react.useState)({
        isDarkMode: false,
        isContactActive: true
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      viewState = _useState2[0],
      setViewState = _useState2[1];
    (0, _react.useEffect)(function () {
      var hourCurrent = parseInt((0, _moment.default)(new Date()).format('HH')) * 3600;
      var minuteCurrent = parseInt((0, _moment.default)(new Date()).format('mm')) * 60;
      var current = hourCurrent + minuteCurrent;
      var minTime = 28800;
      var maxTime = 57600;
      if (current >= minTime && current <= maxTime) {
        setViewState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            statusHubungi: true
          });
        });
      } else {
        setViewState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            statusHubungi: false
          });
        });
      }
      (0, _$$_REQUIRE(_dependencyMap[7]).getTime)().then(function (response) {
        setViewState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            statusHubungi: response.data.status
          });
        });
      }).catch(function (error) {
        setViewState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            statusHubungi: false
          });
        });
      });
    }, []);
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: viewState.isDarkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: viewState.isDarkMode ? 'light-content' : 'dark-content',
      translucent: true,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Hubungi Kami',
      onPress: function onPress() {
        return navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[8]).allLogo.icContactUs,
      style: styles.imageContact
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textBuilding
    }, "Hotline Central Connect"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textNo
    }, "08117757333"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "medium",
      style: [styles.textHour, {
        marginTop: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(8),
        color: viewState.isDarkMode ? 'white' : '#9B9F95'
      }]
    }, "Open hour 08:00 - 16:00"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.contactUs,
      onPress: function onPress() {
        _reactNative.Linking.openURL('whatsapp://send?text=&phone=+628117757333').catch(function () {
          return _reactNative.Linking.openURL(_reactNative.Platform.OS === 'ios' ? 'https://apps.apple.com/us/app/whatsapp-messenger/id310633997' : 'https://play.google.com/store/apps/details?id=com.whatsapp');
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textContact
    }, "Hubungi")))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(28) : 0
    },
    content: {
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(8),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16),
      alignItems: 'center'
    },
    imageContact: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(40),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(10)
    },
    textContact: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(14),
      color: '#ffffff',
      fontStyle: 'normal'
    },
    textNo: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(14),
      color: '#263238',
      fontStyle: 'normal',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(7)
    },
    textHour: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(12),
      color: '#9B9F95',
      fontStyle: 'normal',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(7)
    },
    contactUs: {
      width: width * 0.3,
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(20)
    },
    viewBorder: {
      width: '100%',
      height: 'auto',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(1),
      borderColor: '#eeeeee',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(6),
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(8)
    },
    icCall: {
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(36),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(36),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(12),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16)
    },
    viewData: {
      //marginVertical: toDp(12)
    },
    textBuilding: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(14),
      color: '#263238',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(4)
      //   letterSpacing: toDp(0.5)
    },
    textEmail: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(4),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(14),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(0.7)
    },
    positionRight: {
      width: '100%',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(10),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(12)
    },
    touchCall: {
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(86),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(28),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    touchCallAdress: {
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(59),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(30),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(8)
    },
    textHubungi: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(12),
      color: 'white',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(0.4)
    },
    icWa: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(12),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16),
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(36),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(36),
      tintColor: '#5AAA0F'
    },
    icEmail: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(12),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16),
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(36),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(36),
      tintColor: '#5AAA0F'
    },
    icWebsite: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(12),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16),
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(36),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(36),
      tintColor: '#5AAA0F'
    },
    icAddress: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(12),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16),
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(36),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(36),
      tintColor: '#5AAA0F'
    }
  });
  var _default = exports.default = ContactUsScreen;
