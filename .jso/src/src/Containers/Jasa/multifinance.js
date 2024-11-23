  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var MultifinanceScreen = function MultifinanceScreen(props) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Multi Finance',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[6]).allLogo.imgEmptyNews,
      style: styles.imgEmpty
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: [styles.desc, {
        color: '#5E6157'
      }]
    }, "Maaf, belum Tersedia"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: [styles.subtitle, {
        color: '#5E6157'
      }]
    }, "Untuk mengetahui lebih lanjut seputar", '\n', "Multi Finance, silahkan cek menu", '\n', "\u201CNews & information\u201D"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchButton,
      onPress: function onPress() {
        NavigatorService.navigate('News');
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: [styles.textButton, {
        color: 'white'
      }]
    }, "Lihat Sekarang"))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    content: {
      backgroundColor: '#F6F7F4',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    imgEmpty: {
      width: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(120),
      height: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(120),
      resizeMode: 'contain',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(-60)
    },
    title: {
      color: '#000000',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(16),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(8)
    },
    desc: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(14),
      textAlign: 'center'
    },
    subtitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(14),
      textAlign: 'center'
    },
    touchButton: {
      justifyContent: 'center',
      alignItems: 'center',
      width: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(200),
      height: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(10),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(16),
      backgroundColor: '#5AAA0F'
    },
    textButton: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(14),
      color: 'white'
    }
  });
  var _default = exports.default = MultifinanceScreen;
