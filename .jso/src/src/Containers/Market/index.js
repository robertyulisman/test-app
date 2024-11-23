  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _asyncStorage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _pesanan = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _produk = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  // import NoConnection from '@NoConnection';

  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[11]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var MarketScreen = function MarketScreen(props) {
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[12]).useNetInfo)();
    var _useState = (0, _react.useState)({
        content: 'Produk',
        // Produk, Pesanan,
        totalKeranjang: 0
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      loadKeranjang();
    }, []);
    var loadKeranjang = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* () {
        var arrayKeranjang = yield _asyncStorage.default.getItem('arrayKeranjang');
        var totalKeranjang = 0;
        for (var i = 0; i < JSON.parse(arrayKeranjang).length; i++) {
          totalKeranjang += parseInt(JSON.parse(arrayKeranjang)[i].quantity);
        }
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            totalKeranjang: totalKeranjang
          });
        });
      });
      return function loadKeranjang() {
        return _ref.apply(this, arguments);
      };
    }();
    var setContentPesanan = function setContentPesanan() {
      if (state.content === 'Produk') {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            content: 'Pesanan'
          });
        });
      } else {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            content: 'Produk'
          });
        });
        setTimeout(function () {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              content: 'Pesanan'
            });
          });
        }, 100);
      }
      loadKeranjang();
    };
    var renderSection = function renderSection() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewSection
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSection,
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              content: 'Produk'
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textNameSection, {
          color: state.content === 'Produk' ? '#5AAA0F' : '#CCCFC9'
        }]
      }, "Produk"), state.content === 'Produk' && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
    var renderHeader = function renderHeader() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.header, {
          backgroundColor: 'white',
          borderBottomColor: '#CCCFC9'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(90)
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHeader,
        onPress: function onPress() {
          return props.navigation.goBack();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icBack,
        style: styles.icBack
      }))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: styles.title
      }, 'Market'), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(90),
          alignItems: 'flex-end'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.headerRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHeaderSearch,
        onPress: function onPress() {
          NavigatorService.navigate('Keranjang', {
            setContentPesanan: setContentPesanan,
            loadKeranjang: loadKeranjang
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icKeranjang,
        style: styles.icFilter
      })), state.totalKeranjang !== 0 && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewNotif, {
          width: state.totalKeranjang >= 100 ? (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(31) : state.totalKeranjang >= 10 ? (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(25) : (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(18)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'medium',
        style: styles.textNotif
      }, state.totalKeranjang >= 100 ? '99+' : state.totalKeranjang)))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), renderHeader(), renderSection(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    },
    // !netInfo.isConnected ?
    //   <View style={styles.viewNoConnection}>
    //     <NoConnection />
    //   </View>
    // :
    state.content === 'Produk' ? /*#__PURE__*/_react.default.createElement(_produk.default, {
      setContentPesanan: setContentPesanan,
      loadKeranjang: loadKeranjang
    }) : /*#__PURE__*/_react.default.createElement(_pesanan.default, null)));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    viewNoConnection: {
      width: width,
      height: height * 0.82,
      backgroundColor: '#f5f7f8'
    },
    viewSection: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(40),
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
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
    },
    content: {
      flex: 1
    },
    viewKeranjang: {
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(8)
    },
    icKeranjang: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24)
    },
    header: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(60),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1),
      borderBottomColor: '#CCCFC9',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
    },
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4)
    },
    icBack: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      tintColor: '#383B34'
    },
    title: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(18)
    },
    headerRow: {
      flexDirection: 'row'
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4)
    },
    icFilter: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      tintColor: '#383B34'
    },
    viewNotif: {
      backgroundColor: '#DD5A45',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1),
      borderColor: 'white',
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(18),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(18),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(9),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(0),
      top: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(-8)
    },
    textNotif: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(11),
      color: 'white'
    }
  });
  var _default = exports.default = MarketScreen;
