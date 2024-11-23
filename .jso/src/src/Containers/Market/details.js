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
  var _Swiper = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var DetailsMarketScreen = function DetailsMarketScreen(props) {
    var swiper = (0, _react.useRef)(null);
    var _useState = (0, _react.useState)({
        loading: false,
        item: props.route.params.item,
        index: 0,
        //quantity: props.route.params.item.quantity
        quantity: 0,
        arrayKeranjang: [],
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
            arrayKeranjang: JSON.parse(arrayKeranjang),
            totalKeranjang: totalKeranjang
          });
        });
        props.route.params.loadKeranjang();
      });
      return function loadKeranjang() {
        return _ref.apply(this, arguments);
      };
    }();
    var convert = function convert(amount) {
      var reverse = amount.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
      ribuan = ribuan.join('.').split('').reverse().join('');
      return ribuan;
    };
    var minPlus = function minPlus(operator) {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          quantity: operator === '+' ? state.quantity + 1 : state.quantity - 1
        });
      });
    };
    var addToKeranjang = function addToKeranjang() {
      //if(state.quantity >= 1) {
      {
        var item = {
          id: state.item.id,
          image: state.item.product_images[0].image_url,
          name: state.item.name,
          price: state.item.price,
          quantity: state.quantity,
          status: false
        };
        var arrayKeranjang = state.arrayKeranjang || [];
        var index = -1;
        var statusAvailable = false;
        for (var i = 0; i < arrayKeranjang.length; i++) {
          if (arrayKeranjang[i].id === state.item.id) {
            index = i;
            statusAvailable = true;
          }
        }
        if (!statusAvailable) {
          if (state.quantity >= 1) {
            arrayKeranjang.push(item);
          }
        } else {
          var _item = {
            id: state.item.id,
            image: state.item.product_images[0].image_url,
            name: state.item.name,
            price: state.item.price,
            quantity: arrayKeranjang[index].quantity + state.quantity,
            status: false
          };
          arrayKeranjang[index] = _item;
        }
        _asyncStorage.default.setItem('arrayKeranjang', JSON.stringify(arrayKeranjang));
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            quantity: 0
          });
        });
        loadKeranjang();
        props.route.params.loadKeranjang();
        redirectToKeranjang();
      }
    };
    var beliSekarang = function beliSekarang() {
      var item = {
        id: state.item.id,
        image: state.item.product_images[0].image_url,
        name: state.item.name,
        price: state.item.price,
        quantity: state.quantity,
        status: false
      };
      var arrayKeranjang = [];
      arrayKeranjang.push(item);
      NavigatorService.navigate('ConfirmMarket', {
        arrayKeranjang: arrayKeranjang,
        back: back,
        setContentPesanan: props.route.params.setContentPesanan
      });
    };
    var redirectToKeranjang = function redirectToKeranjang() {
      //back()
      NavigatorService.navigate('Keranjang', {
        setContentPesanan: props.route.params.setContentPesanan,
        back: back,
        loadKeranjang: loadKeranjang
      });
    };
    var back = function back() {
      props.navigation.goBack();
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      style: {
        flex: 1
      },
      showsVerticalScrollIndicator: false
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewHeader
    }, /*#__PURE__*/_react.default.createElement(_Swiper.default, {
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
    }, state.item.product_images.map(function (data, index) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewContainer,
        key: index
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: data.image_url
        },
        style: styles.image
      }));
    })), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchBack,
      onPress: function onPress() {
        return back();
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[9]).allLogo.icBack,
      style: styles.icBack
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewCount
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "medium",
      style: styles.textCount
    }, state.index + 1 + '/' + state.item.product_images.length))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewInfo
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: 'medium',
      style: styles.textTitle
    }, state.item.name), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: 'medium',
      style: styles.textCategory
    }, state.item.product_category.name), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: 'semibold',
      style: styles.textPrice
    }, 'Rp. ' + convert(state.item.price))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.line
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewInfo
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: 'semibold',
      style: styles.textDetail
    }, "DETAIL PRODUK"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textDesc
    }, state.item.description)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.line
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewInfo
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: 'semibold',
      style: styles.textDetail
    }, "JUMLAH PESANAN"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewJumlah
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, null, 'Masukan jumlah pesanan'), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.row
    }, state.quantity === 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.touchMinPlus, {
        borderColor: '#C4C4C4'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: [styles.textMinPlus, {
        color: '#C4C4C4'
      }]
    }, '-')) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        props.route.params.minPlus(state.item.id, '-');
        minPlus('-');
      },
      style: styles.touchMinPlus
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textMinPlus
    }, '-')), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      numberOfLines: 1,
      ellipsizeMode: "tail",
      textType: "semibold",
      style: [styles.textQty, {
        color: state.darkMode ? 'white' : '#1C2028'
      }]
    }, state.quantity), state.quantity === 999 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.touchMinPlus, {
        borderColor: '#C4C4C4'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: [styles.textMinPlus, {
        color: '#C4C4C4'
      }]
    }, '+')) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        props.route.params.minPlus(state.item.id, '+');
        minPlus('+');
      },
      style: styles.touchMinPlus
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textMinPlus
    }, '+'))))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(48)
      }
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewFooter
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchMarket,
      onPress: function onPress() {
        _reactNative.Linking.openURL('whatsapp://send?text=&phone=+628117757333').catch(function () {
          return _reactNative.Linking.openURL(_reactNative.Platform.OS === 'ios' ? 'https://apps.apple.com/us/app/whatsapp-messenger/id310633997' : 'https://play.google.com/store/apps/details?id=com.whatsapp');
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[9]).allLogo.icWa2,
      style: styles.iconFooter
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchMarket,
      onPress: function onPress() {
        addToKeranjang();
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[9]).allLogo.icAddKeranjang,
      style: styles.iconFooter
    })), state.totalKeranjang !== 0 && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.viewNotif, {
        width: state.totalKeranjang >= 100 ? (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(31) : state.totalKeranjang >= 10 ? (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(25) : (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(18)
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: 'medium',
      style: styles.textNotif
    }, state.totalKeranjang >= 100 ? '99+' : state.totalKeranjang))), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: [styles.touchBeli, {
        backgroundColor: state.quantity === 0 ? '#CCCFC9' : '#5AAA0F'
      }],
      onPress: function onPress() {
        if (state.quantity !== 0) {
          beliSekarang();
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: 'semibold',
      style: styles.textBeli
    }, "Beli Sekarang"))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    viewJumlah: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    line: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12),
      backgroundColor: '#F6F7F4',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20)
    },
    viewInfo: {
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10)
    },
    textDetail: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      color: '#9B9F95',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10)
    },
    textDesc: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      color: '#5E6157',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20)
    },
    textTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      color: '#383B34'
    },
    textCategory: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12),
      color: '#9B9F95',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(5)
    },
    textPrice: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24),
      color: '#383B34',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10)
    },
    touchMarket: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(44),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(40),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(1),
      borderColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10)
    },
    iconFooter: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24),
      tintColor: '#5AAA0F'
    },
    viewFooter: {
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(8),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(1),
      borderTopColor: '#EEEEEE',
      flexDirection: 'row'
    },
    touchBeli: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(212),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textBeli: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      color: 'white'
    },
    touchBack: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(34),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(34),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#383B344D',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      position: 'absolute',
      left: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      top: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(40)
    },
    viewCount: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#383B344D',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(5),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      top: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(40)
    },
    textCount: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12),
      color: 'white'
    },
    icBack: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      tintColor: 'white'
    },
    viewHeader: {
      width: width,
      height: width
    },
    viewContainer: {
      flex: 1,
      alignItems: 'center'
    },
    image: {
      width: width,
      height: width
    },
    dot: {
      backgroundColor: '#CCCFC9',
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(6),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(6),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(3),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(6),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(6),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(3),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(-8)
    },
    activeDot: {
      backgroundColor: '#92DE48',
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(6),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(6),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(6),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(6),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(6),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(3),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(-8)
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    textQty: {
      textAlign: 'center',
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(28),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      fontWeight: 'bold',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(0.5),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10)
    },
    touchMinPlus: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(1),
      borderColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textMinPlus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      fontWeight: 'bold',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(0.5),
      color: '#5AAA0F',
      marginLeft: _reactNative.Platform.OS === 'ios' ? (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(1) : 0
    },
    viewNotif: {
      backgroundColor: '#DD5A45',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(1),
      borderColor: 'white',
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(18),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(18),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(9),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(0),
      top: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(-8)
    },
    textNotif: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(11),
      color: 'white'
    }
  });
  var _default = exports.default = DetailsMarketScreen;
