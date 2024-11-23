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
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[10]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var KeranjangScreen = function KeranjangScreen(props) {
    var _useState = (0, _react.useState)({
        arrayKeranjang: [],
        totalHarga: 0,
        statusAll: false,
        statusBeli: false,
        isShowModalConfirm: false,
        index: -1
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      loadKeranjang();
    }, []);
    (0, _react.useEffect)(function () {
      generateTotalHarga(state.arrayKeranjang);
      props.route.params.loadKeranjang();
    }, [state.arrayKeranjang]);
    (0, _react.useEffect)(function () {
      var statusBeli = false;
      for (var i = 0; i < state.arrayKeranjang.length; i++) {
        if (state.arrayKeranjang[i].status) {
          statusBeli = true;
        }
      }
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          statusBeli: statusBeli
        });
      });
    }, [state.arrayKeranjang]);
    var loadKeranjang = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* () {
        var arrayKeranjang = yield _asyncStorage.default.getItem('arrayKeranjang');
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            arrayKeranjang: JSON.parse(arrayKeranjang) || []
          });
        });
      });
      return function loadKeranjang() {
        return _ref.apply(this, arguments);
      };
    }();
    var generateTotalHarga = function generateTotalHarga(arrayKeranjang) {
      var totalHarga = 0;
      for (var i = 0; i < arrayKeranjang.length; i++) {
        if (arrayKeranjang[i].status) {
          totalHarga += parseInt(arrayKeranjang[i].price) * arrayKeranjang[i].quantity;
        }
      }
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          totalHarga: totalHarga
        });
      });
      _asyncStorage.default.setItem('arrayKeranjang', JSON.stringify(arrayKeranjang));
    };
    var minPlus = function minPlus(id, operator) {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          arrayKeranjang: state.arrayKeranjang.map(function (data) {
            if (data.id === id) {
              return Object.assign(Object.assign({}, data), {}, {
                quantity: operator === '+' ? data.quantity + 1 : data.quantity - 1
              });
            } else {
              return Object.assign({}, data);
            }
          })
        });
      });
    };
    var convert = function convert(amount) {
      var reverse = amount.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
      ribuan = ribuan.join('.').split('').reverse().join('');
      return ribuan;
    };
    var removeAsyncStorage = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (index) {
        var arrayKeranjang = JSON.parse(yield _asyncStorage.default.getItem('arrayKeranjang'));
        arrayKeranjang.splice(index, 1);
        _asyncStorage.default.setItem('arrayKeranjang', JSON.stringify(arrayKeranjang));
        loadAllKeranjang();
      });
      return function removeAsyncStorage(_x) {
        return _ref2.apply(this, arguments);
      };
    }();
    var loadAllKeranjang = function loadAllKeranjang() {
      loadKeranjang();
      props.route.params.loadKeranjang();
    };
    var renderModalConfirmation = function renderModalConfirmation() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        onBackdropPress: function onBackdropPress() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowModalConfirm: false
            });
          });
        },
        isVisible: state.isShowModalConfirm
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewModalCenter
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBoxCenter, {
          backgroundColor: state.isDarkMode ? '#121212' : 'white',
          height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(190)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.titleConfirm, {
          color: state.isDarkMode ? 'white' : '#263238'
        }]
      }, "Hapus Item"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textApakah2, {
          color: state.isDarkMode ? 'white' : '#263238'
        }]
      }, "Apakah Anda yakin akan menghapus item ini?"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow2
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchTidak,
        onPress: function onPress() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowModalConfirm: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textTidak
      }, "Tidak")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchYa,
        onPress: function onPress() {
          removeAsyncStorage(state.index);
          setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowModalConfirm: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textYa
      }, "Ya, Hapus"))))));
    };
    var renderItem = function renderItem(_ref3) {
      var item = _ref3.item,
        index = _ref3.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewShimmer
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.viewRowHeader,
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              arrayKeranjang: state.arrayKeranjang.map(function (data, index) {
                return Object.assign(Object.assign({}, data), {}, {
                  status: item.id === data.id ? !data.status : data.status
                });
              })
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: !item.status ? _$$_REQUIRE(_dependencyMap[12]).allLogo.icUnselect : _$$_REQUIRE(_dependencyMap[12]).allLogo.icNewsCheck,
        style: styles.icUnselect
      }), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: item.image
        },
        style: styles.shimmerPhoto
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(15)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        numberOfLines: 2,
        ellipsizeMode: "tail",
        style: styles.textName
      }, item.name), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textPriceNew
      }, 'Rp. ' + convert(item.price)))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowFooter
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.row
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchDeleteMarket,
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isShowModalConfirm: true,
              index: index
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[12]).allLogo.icDeleteMarket,
        style: styles.icDeleteMarket
      })), item.quantity === 1 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
          minPlus(item.id, '-');
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
      }, item.quantity), item.quantity === 999 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
          minPlus(item.id, '+');
        },
        style: styles.touchMinPlus
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textMinPlus
      }, '+')))));
    };
    var back = function back() {
      props.navigation.goBack();
      if (props.route.params.back) {
        props.route.params.back();
      }
    };
    var beli = function beli() {
      if (state.statusBeli) {
        var arrayKeranjang = [];
        for (var i = 0; i < state.arrayKeranjang.length; i++) {
          if (state.arrayKeranjang[i].status) {
            arrayKeranjang.push(state.arrayKeranjang[i]);
          }
        }
        NavigatorService.navigate('ConfirmMarket', {
          arrayKeranjang: arrayKeranjang,
          back: back,
          setContentPesanan: props.route.params.setContentPesanan,
          loadAllKeranjang: loadAllKeranjang
        });
      }
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Keranjang',
      onPress: function onPress() {
        return back();
      }
    }), renderModalConfirmation(), state.arrayKeranjang.length !== 0 && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewSelect
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchPilih,
      onPress: function onPress() {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            statusAll: !state.statusAll,
            arrayKeranjang: state.arrayKeranjang.map(function (data, index) {
              return Object.assign(Object.assign({}, data), {}, {
                status: !state.statusAll
              });
            })
          });
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: !state.statusAll ? _$$_REQUIRE(_dependencyMap[12]).allLogo.icUnselect : _$$_REQUIRE(_dependencyMap[12]).allLogo.icNewsCheck,
      style: styles.icUnselect
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textPilih
    }, "Pilih Semua")), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchHapus,
      onPress: function onPress() {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            statusAll: false,
            arrayKeranjang: state.arrayKeranjang.map(function (data, index) {
              return Object.assign(Object.assign({}, data), {}, {
                status: false
              });
            })
          });
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: 'semibold',
      style: styles.textHapus
    }, "Hapus"))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flex: 1,
        backgroundColor: '#F6F7F4',
        marginTop: state.arrayKeranjang.length !== 0 ? (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4) : 0
      }
    }, state.arrayKeranjang.length === 0 ? /*#__PURE__*/_react.default.createElement(_Empty.default, {
      images: _$$_REQUIRE(_dependencyMap[12]).allLogo.imgEmptyNews,
      title: 'Wah, keranjang belanjamu kosong',
      subtitle: 'Yuk, isi dengan barang-barang impianmu!'
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      data: state.arrayKeranjang,
      renderItem: renderItem,
      numColumns: 1,
      showsVerticalScrollIndicator: false,
      showsHorizontalScrollIndicator: false
    })), state.arrayKeranjang.length !== 0 && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewFooter
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: [styles.textEstimase, {
        color: '#383B34'
      }]
    }, "Total Harga"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: 'semibold',
      style: [styles.textHarga, {
        color: '#383B34'
      }]
    }, !state.statusBeli ? '-' : 'Rp ' + convert(state.totalHarga))), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: [styles.touchBeli, {
        backgroundColor: !state.statusBeli ? '#CCCFC9' : '#5AAA0F'
      }],
      onPress: function onPress() {
        return beli();
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: 'semibold',
      style: styles.textBeli
    }, "Beli"))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
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
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(150),
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
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1),
      borderBottomColor: '#F6F7F4'
    },
    touchDeleteMarket: {
      padding: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16)
    },
    icDeleteMarket: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24)
    },
    viewModalCenter: {
      width: 'auto',
      height: 'auto',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalBoxCenter: {
      width: width * 0.8,
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(200),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8),
      alignItems: 'center'
    },
    titleConfirm: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(0.7)
    },
    textApakah2: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(30),
      textAlign: 'center',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      color: '#263238',
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24)
    },
    viewRow2: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      flexDirection: 'row'
    },
    touchTidak: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(110),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textTidak: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(0.7)
    },
    touchYa: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(110),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(40),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1),
      borderColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10)
    },
    textYa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(0.7)
    },
    icSuccess: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(70),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(70),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      tintColor: '#5AAA0F'
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0
    },
    viewRootModal: {
      width: width,
      position: 'absolute',
      bottom: 0
    },
    modalBox: {
      width: width,
      //height: toDp(240),
      height: 'auto',
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    textTitleModal: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1),
      color: '#263238',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16)
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4)
    },
    icSilangModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      tintColor: '#5E6157'
    }
  });
  var _default = exports.default = KeranjangScreen;
