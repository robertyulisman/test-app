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
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _Empty = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var ConfirmMarketScreen = function ConfirmMarketScreen(props) {
    var _useState = (0, _react.useState)({
        loading: false,
        arrayKeranjang: [],
        totalHarga: 0,
        statusAll: false,
        dataUser: null,
        unit: null,
        darkMode: false,
        isShowSuccessModal: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      loadKeranjang();
      loadUserUnit();
    }, []);
    var loadUserUnit = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* () {
        var dataUser = yield _asyncStorage.default.getItem('dataUser');
        var unit = yield _asyncStorage.default.getItem('unit');
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            dataUser: JSON.parse(dataUser),
            unit: JSON.parse(unit)
          });
        });
      });
      return function loadUserUnit() {
        return _ref.apply(this, arguments);
      };
    }();
    var loadKeranjang = function loadKeranjang() {
      var arrayKeranjang = props.route.params.arrayKeranjang;
      var totalHarga = 0;
      for (var i = 0; i < arrayKeranjang.length; i++) {
        totalHarga += arrayKeranjang[i].price * arrayKeranjang[i].quantity;
      }
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          arrayKeranjang: arrayKeranjang,
          totalHarga: totalHarga
        });
      });
    };
    var convert = function convert(amount) {
      var reverse = amount.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
      ribuan = ribuan.join('.').split('').reverse().join('');
      return ribuan;
    };
    var renderItem = function renderItem(_ref2) {
      var item = _ref2.item;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: item.image
        },
        style: styles.shimmerPhoto
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(15)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        numberOfLines: 2,
        ellipsizeMode: "tail",
        style: styles.textNameNew
      }, item.name), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.rowPrice
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textBarang
      }, item.quantity + ' barang'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textPriceNew2
      }, 'Rp. ' + convert(item.price * item.quantity))))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.lineNew
      }));
    };
    var renderKontak = function renderKontak() {
      var _state$dataUser, _state$dataUser2, _state$dataUser3, _state$unit, _state$unit2;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          backgroundColor: 'white',
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPukul, {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "DETAIL PEMESAN"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewFormLayanan, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16)
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[12]).allLogo.icProfil,
        style: [styles.icCalendar2, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textName2, {
          color: state.darkMode ? 'white' : '#5E6157'
        }]
      }, (_state$dataUser = state.dataUser) == null ? undefined : _state$dataUser.name)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[12]).allLogo.icMail,
        style: [styles.icCalendar2, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textName2, {
          color: state.darkMode ? 'white' : '#5E6157',
          marginBottom: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(0)
        }]
      }, (_state$dataUser2 = state.dataUser) == null ? undefined : _state$dataUser2.email)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[12]).allLogo.icPhone,
        style: [styles.icCalendar2, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textName2, {
          color: state.darkMode ? 'white' : '#5E6157',
          marginBottom: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(0)
        }]
      }, (_state$dataUser3 = state.dataUser) == null ? undefined : _state$dataUser3.phone)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewRow, {
          alignItems: 'flex-start'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[12]).allLogo.icLocation,
        style: [styles.icCalendar2, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textName2, {
          color: state.darkMode ? 'white' : '#5E6157'
        }]
      }, ((_state$unit = state.unit) == null ? undefined : _state$unit.code) + '\n' + ((_state$unit2 = state.unit) == null ? undefined : _state$unit2.unit_name))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.line2, {
          backgroundColor: state.darkMode ? '#121212' : '#EEEEEE'
        }]
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPukul, {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "PESANAN"));
    };
    var removeAsyncStorage = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* () {
        var myArray = JSON.parse(yield _asyncStorage.default.getItem('arrayKeranjang'));
        var toRemove = props.route.params.arrayKeranjang;
        var arrayKeranjang = myArray.filter(function (ar) {
          return !toRemove.find(function (rm) {
            return rm.id === ar.id;
          });
        });
        _asyncStorage.default.setItem('arrayKeranjang', JSON.stringify(arrayKeranjang));
        props.route.params.loadAllKeranjang();
      });
      return function removeAsyncStorage() {
        return _ref3.apply(this, arguments);
      };
    }();
    var pesanSekarang = function pesanSekarang() {
      var products = [];
      for (var i = 0; i < state.arrayKeranjang.length; i++) {
        var item = {
          id: state.arrayKeranjang[i].id,
          quantity: state.arrayKeranjang[i].quantity
        };
        products.push(item);
      }
      var body = {
        product_category_id: 'a6a600e1-98c7-4d99-a58e-48daf40b9174',
        products: products
      };
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loading: true
        });
      });
      (0, _$$_REQUIRE(_dependencyMap[13]).postProductOrderCreate)(body).then(function (response) {
        props.route.params.setContentPesanan();
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false,
            isShowSuccessModal: true
          });
        });
      }).catch(function (err) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false
          });
        });
      });
    };
    var renderModalSuccess = function renderModalSuccess() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        isVisible: state.isShowSuccessModal,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBox, {
          alignItems: 'center'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[12]).allLogo.icSuccess,
        style: styles.icSuccess
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
          color: '#263238',
          marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24)
        }
      }, "PESANAN BERHASIL"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
          color: '#263238',
          marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10),
          textAlign: 'center'
        }
      }, "Pesanan Anda akan segera direspon oleh pengelola"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowSuccessModal: false
            });
          });
          removeAsyncStorage();
          props.navigation.goBack();
          if (props.route.params.back) {
            props.route.params.back();
          }
        },
        style: styles.touchOk
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
          color: 'white'
        }
      }, "Okay")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16)
        }
      }))));
    };
    var renderFooter = function renderFooter() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewFooterNew
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textTotalBelanja
      }, 'Total Belanja'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textTotalBelanja
      }, 'Rp. ' + convert(state.totalHarga)));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Konfirmasi Pemesanan',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), renderModalSuccess(), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.loading
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flex: 1
      }
    }, state.arrayKeranjang.length === 0 ? /*#__PURE__*/_react.default.createElement(_Empty.default, {
      images: _$$_REQUIRE(_dependencyMap[12]).allLogo.imgEmptyNews,
      title: 'Wah, keranjang belanjamu kosong',
      subtitle: 'Yuk, isi dengan barang-barang impianmu!'
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      ListHeaderComponent: renderKontak(),
      ListFooterComponent: renderFooter(),
      data: state.arrayKeranjang,
      renderItem: renderItem,
      numColumns: 1,
      showsVerticalScrollIndicator: false,
      showsHorizontalScrollIndicator: false
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewFooter
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchBeli,
      onPress: function onPress() {
        pesanSekarang();
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: 'semibold',
      style: styles.textBeli
    }, "Pesan Sekarang"))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    line2: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1),
      backgroundColor: '#EEEEEE',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16)
    },
    lineNew: {
      width: '91%',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1),
      backgroundColor: '#EEEEEE',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16)
    },
    textName2: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(12),
      fontWeight: '500'
    },
    viewRow: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      flexDirection: 'row',
      alignItems: 'center'
    },
    icCalendar2: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20)
    },
    viewFormLayanan: {
      width: '100%',
      height: 'auto'
    },
    textPukul: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16)
    },
    viewRowFooter: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(17),
      justifyContent: 'flex-end',
      alignItems: 'flex-end'
    },
    // row: {
    //   flexDirection: 'row',
    //   alignItems: 'center',
    // },
    // textQty: {
    //   textAlign: 'center',
    //   width: toDp(28),
    //   fontSize: toDp(14),
    //   fontWeight: 'bold',
    //   letterSpacing: toDp(0.5),
    //   marginRight: toDp(20),
    //   marginLeft: toDp(10),
    // },
    // touchMinPlus: {
    //   width: toDp(24),
    //   height: toDp(24),
    //   marginRight: toDp(12),
    //   borderWidth: toDp(1),
    //   borderColor: '#5AAA0F',
    //   borderRadius: toDp(4),
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    // textMinPlus: {
    //   fontSize: toDp(14),
    //   fontWeight: 'bold',
    //   letterSpacing: toDp(0.5),
    //   color: '#5AAA0F',
    //   marginLeft: Platform.OS === 'ios' ? toDp(1) : 0,
    // },
    viewRowHeader: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(15),
      flexDirection: 'row',
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(23)
    },
    shimmerPhoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(60),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(60),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10)
    },
    textName: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(206),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      color: '#383B34'
    },
    textPriceNew: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      color: '#383B34',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(5)
    },
    textEstimase: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(12)
    },
    textHarga: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(2),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16)
    },
    viewJumlah: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    line: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(12),
      backgroundColor: '#F6F7F4',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20)
    },
    viewInfo: {
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10)
    },
    textDetail: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      color: '#9B9F95',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10)
    },
    textDesc: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      color: '#5E6157',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20)
    },
    textTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      color: '#383B34'
    },
    textCategory: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(12),
      color: '#9B9F95',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(5)
    },
    textPrice: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      color: '#383B34',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10)
    },
    touchMarket: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(44),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(40),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1),
      borderColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10)
    },
    iconFooter: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      tintColor: '#5AAA0F'
    },
    viewFooter: {
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8),
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1),
      borderTopColor: '#EEEEEE',
      flexDirection: 'row'
    },
    touchBeli: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textBeli: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      color: 'white'
    },
    touchOk: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(180),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(40),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    touchBack: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(34),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(34),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#383B344D',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10),
      position: 'absolute',
      left: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10),
      top: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(40)
    },
    viewCount: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#383B344D',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(5),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10),
      top: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(40)
    },
    textCount: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(12),
      color: 'white'
    },
    icBack: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
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
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(6),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(6),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(3),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(6),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(6),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(3),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(-8)
    },
    activeDot: {
      backgroundColor: '#92DE48',
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(6),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(6),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(6),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(6),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(6),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(3),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(-8)
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    textQty: {
      textAlign: 'center',
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(28),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      fontWeight: 'bold',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(0.5),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10)
    },
    touchMinPlus: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(12),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1),
      borderColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textMinPlus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      fontWeight: 'bold',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(0.5),
      color: '#5AAA0F',
      marginLeft: _reactNative.Platform.OS === 'ios' ? (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1) : 0
    },
    viewSelect: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(54),
      backgroundColor: 'white',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      paddingRight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(23)
    },
    touchPilih: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(100),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      flexDirection: 'row',
      alignItems: 'center'
    },
    touchHapus: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(100),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      alignItems: 'flex-end',
      justifyContent: 'center'
    },
    textPilih: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      color: '#383B34'
    },
    textHapus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      color: '#5AAA0F'
    },
    icUnselect: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(18),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(18),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8)
    },
    viewShimmer: {
      width: width,
      height: 'auto',
      backgroundColor: 'white',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(12),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1),
      borderBottomColor: '#F6F7F4'
    },
    bottomModal: {
      justifyContent: 'center',
      margin: 0
    },
    viewRootModal: {
      width: width,
      alignItems: 'center'
    },
    modalBox: {
      width: '90%',
      height: 'auto',
      backgroundColor: '#FFFFFF',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8),
      padding: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16)
    },
    icSuccess: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(70),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(70),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      tintColor: '#5AAA0F'
    },
    viewNewRow: {
      width: '100%',
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(15),
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8)
    },
    textNameNew: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(206),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      color: '#383B34'
    },
    textPriceNew2: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      color: '#383B34'
    },
    textBarang: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(12),
      color: '#383B34'
    },
    rowPrice: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(5),
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(250),
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    viewFooterNew: {
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    textTotalBelanja: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      color: '#383B34'
    }
  });
  var _default = exports.default = ConfirmMarketScreen;
