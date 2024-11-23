  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _Swiper = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  // import { allLogo } from '@Assets';
  // import { toDp } from '@percentageToDP';

  // import Swiper from '@Swiper';

  // import CustomText from '@CustomText';

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var OnBoarding = function OnBoarding() {
    var swiper = (0, _react.useRef)(null);
    var _useState = (0, _react.useState)({
        index: 0,
        array: [{
          image: _$$_REQUIRE(_dependencyMap[7]).allLogo.onBoarding1,
          title: 'SELAMAT DATANG',
          description: 'Central Connect merupakan Aplikasi hunian pertama di kota Batam. Central Connect memberikan keamanan, kenyamanan, dan kemudahan dalam hunian anda'
        }, {
          image: _$$_REQUIRE(_dependencyMap[7]).allLogo.onBoarding2,
          title: 'Fitur 3 S',
          description: 'Sistem Hunian yang terintegrasi dengan fitur Smart Cluster, Smart Community dan Smart Home'
        }, {
          image: _$$_REQUIRE(_dependencyMap[7]).allLogo.onBoarding3,
          title: 'Informasi lengkap',
          description: 'Informasi lengkap dari Central Group sebagai Property Developer Kepercayaan Anda'
        }]
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      swiper.current.scrollTo(state.index);
    }, [state.index]);
    var footer = function footer(index) {
      if (index === 2) {
        NavigatorService.reset('LandingPage');
      } else {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            index: state.index + 1
          });
        });
      }
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: true,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_Swiper.default, {
      ref: swiper,
      dot: /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.dot
      }),
      activeDot: /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.activeDot
      }),
      onIndexChanged: function onIndexChanged(index) {
        return setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            index: index
          });
        });
      },
      loop: false
    }, state.array.map(function (data, index) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewContainer,
        key: index
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: index === 0 ? _$$_REQUIRE(_dependencyMap[7]).allLogo.onBoarding1 : index === 1 ? _$$_REQUIRE(_dependencyMap[7]).allLogo.onBoarding2 : _$$_REQUIRE(_dependencyMap[7]).allLogo.onBoarding3,
        style: styles.image
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: styles.title
      }, data.title), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: styles.description
      }, data.description));
    })), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: [styles.buttonFooter, {
        backgroundColor: state.index === 2 ? '#5AAA0F' : 'white',
        borderColor: state.index === 2 ? '#5AAA0F' : '#5AAA0F'
      }],
      onPress: function onPress() {
        return footer(state.index);
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: [styles.textFooter, {
        color: state.index === 2 ? 'white' : '#5AAA0F'
      }]
    }, state.index === 2 ? 'Mulai' : 'Lanjut')));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(28) : 0,
      backgroundColor: 'white'
    },
    systemBar: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    viewContainer: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(95)
    },
    image: {
      width: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(204),
      height: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(204)
    },
    title: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(24),
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(10),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(36),
      color: '#383B34'
    },
    description: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(14),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(40),
      textAlign: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(4),
      color: '#5E6157'
    },
    dot: {
      backgroundColor: '#CCCFC9',
      width: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(6),
      height: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(6),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(3),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(6),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(6),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(3),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(3)
    },
    activeDot: {
      backgroundColor: '#92DE48',
      width: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(12),
      height: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(12),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(6),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(6),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(6),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(3),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(3)
    },
    buttonFooter: {
      margin: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(16),
      //paddingVertical: toDp(16),
      height: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(40),
      justifyContent: 'center',
      backgroundColor: 'white',
      borderColor: '#5AAA0F',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(1.5),
      alignItems: 'center',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(10)
    },
    textFooter: {
      color: '#5AAA0F',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(16)
    }
  });
  var _default = exports.default = OnBoarding;
