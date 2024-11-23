  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _NoConnection = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _orderJasa = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _pesanan = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  // import { allLogo } from "../../Assets";

  // import { WebView } from 'react-native-webview';

  // import * as NavigatorService from "../../Helper/NavigatorServices";

  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[10]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var JasaScreen = function JasaScreen(props) {
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[11]).useNetInfo)();
    var _useState = (0, _react.useState)({
        content: 'OrderJasa' // OrderJasa, Pesanan
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {}, []);
    var setContentPesanan = function setContentPesanan() {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          content: 'Pesanan'
        });
      });
    };
    var renderSection = function renderSection() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewSection
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSection,
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              content: 'OrderJasa'
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textNameSection, {
          color: state.content === 'OrderJasa' ? '#5AAA0F' : '#CCCFC9'
        }]
      }, "Order Jasa"), state.content === 'OrderJasa' && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.active
      })), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSection,
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              content: 'Pesanan'
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textNameSection, {
          color: state.content === 'Pesanan' ? '#5AAA0F' : '#CCCFC9'
        }]
      }, "Pesanan"), state.content === 'Pesanan' && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.active
      })));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Jasa',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), renderSection(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, !netInfo.isConnected ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewNoConnection
    }, /*#__PURE__*/_react.default.createElement(_NoConnection.default, null)) : state.content === 'OrderJasa' ? /*#__PURE__*/_react.default.createElement(_orderJasa.default, {
      setContentPesanan: setContentPesanan
    }) : /*#__PURE__*/_react.default.createElement(_pesanan.default, null)));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#f5f7f8'
    },
    viewNoConnection: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f7f8'
    },
    viewSection: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    touchSection: {
      flex: 1,
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      borderBottomColor: '#DDE3E0'
    },
    textNameSection: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#5AAA0F'
    },
    active: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2),
      backgroundColor: '#5AAA0F',
      position: 'absolute',
      bottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(-1)
    },
    content: {
      flex: 1
    }
  });
  var _default = exports.default = JasaScreen;
