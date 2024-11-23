  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _Empty = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _Toast = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[9]));
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[11]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);
  var limit = 0;
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var Pesanan = function Pesanan(props) {
    var toast = (0, _react.useRef)(null);
    var _useState = (0, _react.useState)({
        arrayData: [],
        loading: true,
        messages: '',
        filter: 'all',
        modalVisible: false,
        page: 1,
        arrayStatus: ['Semua', 'Invalid', 'Terkirim', 'Dalam Proses', 'Selesai', 'Batal'],
        activeStatus: 'Semua',
        activeIdStatus: '',
        total: 0,
        totalPage: 0,
        limit: 20,
        connection: true,
        // default nya gak tau,
        darkMode: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      getAllLoadData();
    }, []);
    var getAllLoadData = function getAllLoadData() {
      (0, _$$_REQUIRE(_dependencyMap[12]).getServicesOrdersStatuses)().then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            arrayStatus: [{
              id: 'all',
              name: 'Semua'
            }].concat((0, _toConsumableArray2.default)(response.data.service_order_statuses))
          });
        });
      }).catch(function (error) {});
      servicesOrders();
      limit = state.limit;
    };
    var servicesOrders = function servicesOrders() {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loading: state.page === 1 ? true : false
        });
      });
      var params = '?page=' + state.page;
      var data = {
        filter: {
          service_order_status_id: state.activeIdStatus
        }
      };
      (0, _$$_REQUIRE(_dependencyMap[12]).getProductOrderList)(params).then(function (response) {
        if (state.page === 1) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              arrayData: response.data.product_orders,
              total: response.data.meta.total,
              totalPage: response.data.meta.total_page
            });
          });
        } else {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              arrayData: [].concat((0, _toConsumableArray2.default)(state.arrayData), (0, _toConsumableArray2.default)(response.data.product_orders))
            });
          });
        }
      }).catch(function (error) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false,
            arrayData: [],
            messages: error.data.result
          });
        });
      });
    };
    var changeColorStatus = function changeColorStatus(name) {
      if (name === 'Menunggu pembayaran') {
        return '#f53c3c';
      } else if (name === 'Verifikasi') {
        return '#f2c141';
      } else if (name === 'Perbaikan pembayaran') {
        return '#f53c3c';
      } else if (name === 'Request') {
        return '#56a7d4';
      } else if (name === 'Proses') {
        return '#f2c141';
      } else if (name === 'Selesai') {
        return '#28a595';
      } else if (name === 'Batal') {
        return '#6b7b83';
      } else if (name === 'Invalid') {
        return '#6b7b83';
      }
    };
    var changeWidthStatus = function changeWidthStatus(name) {
      if (name === 'Menunggu pembayaran') {
        return (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(140);
      } else if (name === 'Verifikasi') {
        return (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(70);
      } else if (name === 'Perbaikan pembayaran') {
        return (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(140);
      } else if (name === 'Request') {
        return (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(60);
      } else if (name === 'Proses') {
        return (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(60);
      } else if (name === 'Selesai') {
        return (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(56);
      } else if (name === 'Batal') {
        return (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(50);
      } else if (name === 'Invalid') {
        return (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(60);
      }
    };
    var convert = function convert(amount) {
      var reverse = amount.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
      ribuan = ribuan.join('.').split('').reverse().join('');
      return ribuan;
    };
    var showMessageSuccess = function showMessageSuccess() {
      toast.current.show('Pesanan Anda berhasil dibatalkan.');
    };
    var renderItem = function renderItem(_ref) {
      var item = _ref.item,
        index = _ref.index;
      // id = item.id;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        activeOpacity: state.darkMode ? 1 : 0.2,
        style: [styles.containerItem, {
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }],
        onPress: function onPress() {
          NavigatorService.navigate('DetailsPesananMarket', {
            id: item.id,
            servicesOrders: servicesOrders,
            showMessageSuccess: showMessageSuccess,
            getAllLoadData: getAllLoadData
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.cards, {
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.newRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icCalendar,
        style: [styles.icCalendar, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.text, {
          color: state.darkMode ? 'white' : '#5E6157'
        }]
      }, (0, _moment.default)(item.created_at).add(-7, 'hours').format('DD MMMM YYYY'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewStatus, {
          width: changeWidthStatus(item.product_order_status.name),
          backgroundColor: changeColorStatus(item.product_order_status.name)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: styles.textStatus
      }, item.product_order_status.name))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.lineNew
      })), item.product_order_details.map(function (data) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewNewRow
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: {
            uri: data.product.product_images[0].image_url
          },
          style: styles.shimmerPhoto
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            marginLeft: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(15)
          }
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          numberOfLines: 2,
          ellipsizeMode: "tail",
          style: styles.textNameNew
        }, data.product.name), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.rowPrice
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          style: styles.textBarang
        }, data.quantity + ' barang'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "medium",
          style: styles.textPriceNew
        }, 'Rp. ' + convert(data.price)))));
      })));
    };
    var renderItemShimmer = function renderItemShimmer(_ref2) {
      var item = _ref2.item,
        index = _ref2.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View
      // activeOpacity={state.darkMode ? 1 : 0.2 as any}
      , {
        style: [styles.containerItem, {
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.cards, {
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.newRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: styles.icCalendar
      }), /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(120)
        }
      })), /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: [styles.viewStatus, {
          width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(120)
        }]
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.lineNew
      })), [1, 2].map(function (data) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewNewRow
        }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
          style: styles.shimmerPhoto
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            marginLeft: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(15)
          }
        }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
          style: {
            width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(220),
            marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4)
          }
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [styles.rowPrice, {
            marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12)
          }]
        }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
          style: {
            width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(60)
          }
        }), /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
          style: {
            width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(100)
          }
        }))));
      })));
    };
    var renderFooter = function renderFooter() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
        size: "large",
        color: '#5AAA0F',
        style: {
          marginVertical: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24)
        }
      });
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_Toast.default, {
      ref: toast
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.content, {
        backgroundColor: state.darkMode ? '#1C1C1E' : '#f5f7f8'
      }]
    }, state.arrayData.length === 0 && !state.loading ? /*#__PURE__*/_react.default.createElement(_Empty.default, {
      images: _$$_REQUIRE(_dependencyMap[14]).allLogo.imgEmptyNews,
      title: 'Belum ada pesanan',
      subtitle: 'Silakan pesan layanan market kami.'
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      removeClippedSubviews: true,
      refreshControl: /*#__PURE__*/_react.default.createElement(_reactNative.RefreshControl, {
        refreshing: state.loading,
        onRefresh: function onRefresh() {
          limit = 0, setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              total: 0,
              totalPage: 0,
              arrayData: [],
              page: 1
            });
          });
          // servicesOrders(state.page);
          servicesOrders();
        }
      }),
      onMomentumScrollEnd: function onMomentumScrollEnd(e) {
        var hasil = limit - e.nativeEvent.contentOffset.y / (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(102);
        if (hasil <= 5 && state.page < state.totalPage) {
          //if(state.totalPage != state.page) {
          var page = state.page++;
          // servicesOrders(page);
          servicesOrders();
          limit += state.limit;
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      data: state.loading ? ['', '', '', '', ''] : state.arrayData,
      renderItem: state.loading ? renderItemShimmer : renderItem,
      ListFooterComponent: state.page < state.totalPage ? renderFooter() : /*#__PURE__*/_react.default.createElement(_reactNative.View, null)
    }))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center'
    },
    rowPrice: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(5),
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(250),
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    viewNewRow: {
      width: '100%',
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(15),
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(8)
    },
    shimmerPhoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(60),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(60),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(10)
    },
    textNameNew: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(206),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      color: '#383B34'
    },
    textPriceNew: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12),
      color: '#383B34'
    },
    textBarang: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12),
      color: '#9B9F95'
    },
    viewRow: {
      width: '100%',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20)
    },
    lineNew: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1),
      backgroundColor: '#DDE3E0'
    },
    lineRoot: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1),
      backgroundColor: '#DDE3E0'
    },
    newRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      alignItems: 'center',
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
    },
    viewStatus: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(56),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(11),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textStatus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(10),
      color: '#FFFFFF'
    },
    viewRowItem: {
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4),
      alignItems: 'center'
    },
    headeriOS: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    linearFab: {
      padding: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(28),
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(56),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(56),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 1.0,
      elevation: 4,
      position: 'absolute',
      bottom: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      right: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      zIndex: 1
    },
    fabAdd: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    icAdd: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(36),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(36),
      tintColor: 'white'
    },
    header: {
      width: width,
      height: 'auto',
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1),
      borderBottomColor: '#5AAA0F',
      backgroundColor: 'white'
    },
    linearHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(60)
    },
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4),
      position: 'absolute',
      left: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      zIndex: 1
    },
    icBack: {
      //marginHorizontal: toDp(8),
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      tintColor: '#5AAA0F'
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
    },
    icFilter: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      tintColor: '#5AAA0F'
    },
    title: {
      color: '#5AAA0F',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(18)
      //fontFamily: 'Montserrat-SemiBold',
    },
    content: {
      flex: 1,
      backgroundColor: '#f5f7f8'
    },
    containerItem: {
      width: width,
      height: 'auto',
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(2),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1),
      borderBottomColor: '#DDE3E0'
    },
    cards: {
      width: '100%',
      height: 'auto',
      backgroundColor: '#FFFFFF',
      alignItems: 'center'
    },
    cardHeader: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
    },
    months: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      color: '#333'
      //fontFamily: 'Montserrat-Bold'
    },
    price: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(18),
      color: '#333'
      //fontFamily: 'Montserrat-Regular'
    },
    cardDate: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    logo: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(25),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(25),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(5),
      alignItems: 'center',
      justifyContent: 'center'
    },
    icon: {
      maxWidth: '100%',
      resizeMode: 'contain'
    },
    cardDetails: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(10),
      width: '100%',
      flexDirection: 'row'
    },
    date: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12),
      color: '#666',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20)
      //fontFamily: 'Montserrat-Regular'
    },
    invoiceNumber: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      color: '#666',
      alignItems: 'flex-start'
      //fontFamily: 'Montserrat-Regular'
    },
    logoContainer: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      alignItems: 'center',
      justifyContent: 'center'
    },
    iconNext: {
      maxHeight: '100%',
      resizeMode: 'contain',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12)
    },
    due: {
      color: 'red',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12)
    },
    viewCenter: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingShimmer: {
      width: '95%',
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(110),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(5),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
    },
    textName: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(8),
      color: '#616161',
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
    },
    textPosition: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12),
      color: '#BDBDBD',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(8)
    },
    containerDesc: {
      width: width * 0.906,
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      backgroundColor: 'transparent',
      justifyContent: 'space-between'
    },
    titleContent: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(18),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(6),
      textAlign: 'center',
      color: '#333333'
    },
    textContent: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      color: '#333333',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(10),
      textAlign: 'center'
    },
    profile: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(40)
    },
    imageContent: {
      //height: height / 2,
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(328),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(8),
      width: width * 0.906,
      resizeMode: 'contain'
    },
    //ZAINI

    viewImage: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(50),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(50),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
    },
    imgPicture: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(50),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(50)
      //marginRight: toDp(16),
      //resizeMode: 'contain'
    },
    labelpic: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24)
    },
    itemTitle: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      color: '#273238',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(-4),
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(212)
    },
    itemContent: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      color: '#333333'
    },
    viewTitleContent: {
      width: '100%',
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
    },
    itemDate: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      color: '#4b5a74',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4)
    },
    itemLocation: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12),
      color: '#4b5a74',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
    },
    icCalendar: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(8)
    },
    icLp: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(8)
    },
    text: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12),
      color: '#000000',
      //fontFamily: 'Montserrat-Regular',
      letterSpacing: 0
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
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(210),
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(2),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4)
    },
    icSilangModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      tintColor: '#5AAA0F'
    },
    viewArrayStatus: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24)
    },
    touchStatus: {
      width: 'auto',
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(40),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(45),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      backgroundColor: '#91743819',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1),
      borderColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
    },
    textStatusItem: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12),
      color: '#5AAA0F'
    },
    lineCenter: {
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
    },
    lineModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(64),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(7)
    }
  });
  var _default = exports.default = Pesanan;
