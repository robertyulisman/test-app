  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var LandingPage = function LandingPage() {
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: "dark-content",
      translucent: true,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[5]).allLogo.imgLanding,
      style: styles.imgLanding
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[5]).allLogo.logo,
      style: styles.logo
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "bold",
      style: styles.textTitle
    }, "Welcome to"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "bold",
      style: [styles.textTitle, {
        color: '#5AAA0F'
      }]
    }, "Central Connect"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "regular",
      style: styles.textSilahkan
    }, "Silahkan..."), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchLogin,
      onPress: function onPress() {
        return NavigatorService.navigate('Login');
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textLogin
    }, "Login")), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "regular",
      style: styles.textAtau
    }, "Atau"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchRegister,
      onPress: function onPress() {
        return NavigatorService.navigate('Register');
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: [styles.textLogin, {
        color: '#5AAA0F'
      }]
    }, "Register"))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    logo: {
      width: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(200),
      height: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(200)
    },
    content: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(30)
    },
    textTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(32),
      color: '#383B34'
    },
    textSilahkan: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(16),
      color: '#5E6157',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(15)
    },
    textLogin: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(14),
      color: 'white'
    },
    touchLogin: {
      width: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(300),
      height: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(45)
    },
    touchRegister: {
      width: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(300),
      height: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(40),
      backgroundColor: 'white',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(10),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(1),
      borderColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textAtau: {
      color: '#5E6157',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(14),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(15),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(12),
      width: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(300),
      textAlign: 'center'
    },
    imgLanding: {
      width: width,
      height: height,
      position: 'absolute',
      bottom: 0
    }
  });
  var _default = exports.default = LandingPage;
