  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _Empty = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _NoConnection = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[7]);
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[9]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var CCTVScreen = function CCTVScreen(props) {
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[10]).useNetInfo)();
    var _useState = (0, _react.useState)({
        loading: true,
        tower: {
          id: '',
          name: ''
        },
        arrayCluster: []
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      loadCluster();
    }, []);
    var loadCluster = function loadCluster() {
      (0, _$$_REQUIRE(_dependencyMap[11]).getSmartHome)().then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            arrayCluster: response.data.smart_home,
            loading: false
          });
        });
      }).catch(function (error) {});
    };
    var renderItemShimmer = function renderItemShimmer(_ref) {
      var item = _ref.item,
        index = _ref.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.touchMenu
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: [styles.viewShimmer, {
          borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4)
        }]
      }));
    };
    var funcOrvibo = function funcOrvibo() {
      _reactNative.Linking.openURL(_reactNative.Platform.OS === 'android' ? 'homemate://' : 'HomeMate://').catch(function () {
        _reactNative.Linking.openURL(_reactNative.Platform.OS === 'android' ? 'https://play.google.com/store/apps/details?id=com.orvibo.homemate' : 'https://apps.apple.com/id/app/orvibo-home/id1002853448');
      });
    };
    var funcAcome = function funcAcome() {
      _reactNative.Linking.openURL('acomewook://com.acome.wook/deeplink').catch(function () {
        _reactNative.Linking.openURL(_reactNative.Platform.OS === 'android' ? 'https://play.google.com/store/apps/details?id=com.acome.wook' : 'https://apps.apple.com/id/app/acome-iot/id1556024103');
      });
    };
    var funcAqara = function funcAqara() {
      _reactNative.Linking.openURL('aqara://mp.aqara.com').catch(function () {
        _reactNative.Linking.openURL(_reactNative.Platform.OS === 'android' ? 'https://play.google.com/store/apps/details?id=com.lumiunited.aqarahome.play&hl=en_US' : 'https://apps.apple.com/us/app/aqara-home/id1248669703');
      });
    };
    var funcEzviz = function funcEzviz() {
      _reactNative.Linking.openURL('ezviz://com.ezviz/openwith').catch(function () {
        _reactNative.Linking.openURL(_reactNative.Platform.select({
          android: 'https://play.google.com/store/apps/details?id=com.ezviz&hl=en_US',
          ios: 'https://apps.apple.com/id/app/ezviz/id886947564'
        }));
      });
    };
    var handleOnPressBrand = function handleOnPressBrand(item) {
      switch (item.brand) {
        case 'ORVIBO':
          return funcOrvibo();
        case 'AQARA':
          return funcAqara();
        case 'ACOME':
          return funcAcome();
        case 'EZVIZ':
          return funcEzviz();
        default:
          return null;
      }
    };
    var renderItem = function renderItem(_ref2) {
      var item = _ref2.item,
        index = _ref2.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchMenu,
        onPress: function onPress() {
          return handleOnPressBrand(item);
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        resizeMode: "contain",
        source: {
          uri: item.image_url
        },
        style: styles.viewShimmer
      }), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        resizeMode: "contain",
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icDevice,
        style: [styles.icDevice, {
          tintColor: item.brand === 'ACOME' ? '#EE4040' : '#383B34'
        }]
      }));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Smart Home',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), !netInfo.isConnected ? /*#__PURE__*/_react.default.createElement(_NoConnection.default, null) : state.arrayCluster.length === 0 && !state.loading ? /*#__PURE__*/_react.default.createElement(_Empty.default, {
      images: _$$_REQUIRE(_dependencyMap[13]).allLogo.imgEmptyNews,
      title: 'Belum ada device'
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewTextTitle
    }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      showsVerticalScrollIndicator: false,
      showsHorizontalScrollIndicator: false,
      data: state.loading ? ['', ''] : state.arrayCluster,
      renderItem: state.loading ? renderItemShimmer : renderItem,
      numColumns: 2,
      ListHeaderComponent: function ListHeaderComponent() {
        return /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          style: styles.textInfo
        }, 'Silakan pilih device yang Anda gunakan di unit Anda.');
      },
      ListFooterComponent: function ListFooterComponent() {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(60)
          }
        });
      },
      refreshControl: /*#__PURE__*/_react.default.createElement(_reactNative.RefreshControl, {
        refreshing: state.loading,
        onRefresh: function onRefresh() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: true,
              arrayData: []
            });
          });
          loadCluster();
        }
      })
    })));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    viewTextTitle: {
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      width: width
    },
    touchMenu: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(15),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(15),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      alignItems: 'center',
      justifyContent: 'center',
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(148),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(148),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      backgroundColor: 'white'
    },
    viewShimmer: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(120),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(120)
    },
    textShimmer: {
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(124),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
    },
    viewTextPosition: {
      width: '100%',
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8)
    },
    textTitleMenu: {
      //marginTop: toDp(16),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#383B34',
      textAlign: 'center'
    },
    icDevice: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      position: 'absolute',
      bottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      right: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14)
    },
    textInfo: {
      color: '#273238',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12)
    }
  });
  var _default = exports.default = CCTVScreen;
