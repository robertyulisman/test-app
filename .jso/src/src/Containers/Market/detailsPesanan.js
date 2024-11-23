  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _reactNativeImageViewing = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _CustomImageView = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _ViewMoreText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[11]));
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var DetailsPesananMarketScreen = function DetailsPesananMarketScreen(props) {
    var _state$data21, _state$data22, _state$data22$product, _state$data23, _state$data23$product, _state$data27, _state$data27$product;
    var _useState = (0, _react.useState)({
        isShowModalConfirm: false,
        loading: true,
        loadingForm: false,
        darkMode: false,
        arrLayanan: [],
        connection: true,
        data: {},
        arrayVirtualAccount: [],
        modalVisible: false,
        isHideLayanan: false,
        isHideRiwayat: false,
        isAvailableVA: false,
        virtualAccount: null
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      getDetailsData();
      (0, _$$_REQUIRE(_dependencyMap[13]).getBank)('?search=product').then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            arrayVirtualAccount: response.data
          });
        });
      }).catch(function (err) {});
    }, []);
    var getDetailsData = function getDetailsData() {
      (0, _$$_REQUIRE(_dependencyMap[13]).getProductOrder)('' + props.route.params.id).then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false,
            data: response.data
          });
        });
        /*getServicesVirtualAccount(response.data.product_category.id).then(response => {
        console.log('getServicesVirtualAccount', response);
        setState(state => ({...state, isAvailableVA: true, virtualAccount: response.data}))
        }).catch(err => {
        console.log('err', err)
        setState(state => ({...state, isAvailableVA: false}))
        })*/
        //belum ada API nya
      }).catch(function (error) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false
          });
        });
      });
    };
    var getListAndDetails = function getListAndDetails() {
      getDetailsData();
      props.route.params.getAllLoadData();
    };
    var renderItemSelectBank = function renderItemSelectBank(_ref) {
      var item = _ref.item,
        index = _ref.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          var _state$data, _state$data2, _state$data3;
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
          NavigatorService.navigate('InfoMarket', {
            nominal: 'Rp ' + convert(parseInt((_state$data = state.data) == null ? undefined : _state$data.total_price)),
            totalPrice: (_state$data2 = state.data) == null ? undefined : _state$data2.total_price,
            bank: item,
            id: (_state$data3 = state.data) == null ? undefined : _state$data3.id,
            loadDetails: getListAndDetails
          });
        },
        style: [styles.touchLabelItem, {
          borderBottomColor: state.darkMode ? '#1C1C1E' : '#e9ebed'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: item.bank.image_url
        },
        style: styles.imgBank
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'regular',
        allowFontScaling: false,
        style: [styles.textLabel, {
          color: state.darkMode ? 'white' : '#273238'
        }]
      }, item.bank.name));
    };
    var renderModalSelectBank = function renderModalSelectBank() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        onBackButtonPress: function onBackButtonPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
        },
        onBackdropPress: function onBackdropPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
        },
        isVisible: state.modalVisible,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBox, {
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewModalTitle
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textTitleModal, {
          color: state.darkMode ? 'white' : '#263238'
        }]
      }, "PILIH BANK TRANSFER"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSilang,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icSilang,
        style: styles.icSilangModal
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewArrayStatus
      }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
        data: state.arrayVirtualAccount,
        renderItem: renderItemSelectBank,
        numColumns: 1,
        ListFooterComponent: function ListFooterComponent() {
          return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
            style: {
              height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48)
            }
          });
        }
      })))));
    };
    var convert = function convert(amount) {
      var reverse = amount.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
      ribuan = ribuan.join('.').split('').reverse().join('');
      return ribuan;
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
        return (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(168);
      } else if (name === 'Verifikasi') {
        return (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(80);
      } else if (name === 'Perbaikan pembayaran') {
        return (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(168);
      } else if (name === 'Request') {
        return (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(70);
      } else if (name === 'Proses') {
        return (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(70);
      } else if (name === 'Selesai') {
        return (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(66);
      } else if (name === 'Batal') {
        return (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(60);
      } else if (name === 'Invalid') {
        return (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(70);
      }
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
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(190)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.titleConfirm, {
          color: state.isDarkMode ? 'white' : '#263238'
        }]
      }, "BATALKAN PESANAN"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textApakah2, {
          color: state.isDarkMode ? 'white' : '#263238'
        }]
      }, "Apakah Anda yakin ingin membatalkan pesanan ini?", ' '), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
          width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchYa,
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isShowModalConfirm: false,
              loadingForm: true
            });
          });
          (0, _$$_REQUIRE(_dependencyMap[13]).putProductOrdersUpdateStatus)(props.route.params.id).then(function (response) {
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                loadingForm: false
              });
            });
            props.route.params.getAllLoadData();
            props.route.params.showMessageSuccess();
            props.navigation.goBack();
          }).catch(function (error) {});
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textYa
      }, "Ya, Batalkan"))))));
    };
    var renderKontak = function renderKontak() {
      var _state$data4, _state$data4$user, _state$data5, _state$data5$user, _state$data6, _state$data7;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
          backgroundColor: 'white',
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPukul, {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "INFO PENGIRIMAN"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewFormLayanan, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icProfil,
        style: [styles.icCalendar2, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textName2, {
          color: state.darkMode ? 'white' : '#5E6157'
        }]
      }, (_state$data4 = state.data) == null ? undefined : (_state$data4$user = _state$data4.user) == null ? undefined : _state$data4$user.name)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icPhone,
        style: [styles.icCalendar2, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textName2, {
          color: state.darkMode ? 'white' : '#5E6157'
        }]
      }, (_state$data5 = state.data) == null ? undefined : (_state$data5$user = _state$data5.user) == null ? undefined : _state$data5$user.phone)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewRow, {
          alignItems: 'flex-start'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icLocation,
        style: [styles.icCalendar2, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textName2, {
          color: state.darkMode ? 'white' : '#5E6157'
        }]
      }, ((_state$data6 = state.data) == null ? undefined : _state$data6.unit.code) + '\n' + ((_state$data7 = state.data) == null ? undefined : _state$data7.unit.unit_name)))));
    };
    var renderFooterDetail = function renderFooterDetail() {
      var _state$data8, _state$data9;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.detailRow, {
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [
        // styles.textSubTotal,
        {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
          color: state.darkMode ? 'white' : '#1C2028'
        }]
      }, "Sub Total"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPriceDetail, {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
          color: state.darkMode ? 'white' : '#1C2028'
        }]
      }, 'Rp ' + convert((_state$data8 = state.data) == null ? undefined : _state$data8.total_price))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.lineDetail, {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
          backgroundColor: state.darkMode ? '#121212' : '#EEEEEE'
        }]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.detailRow, {
          paddingVertical: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0),
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [
        // styles.textSubTotal,
        {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
          color: state.darkMode ? 'white' : '#1C2028'
        }]
      }, "Grand Total"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPriceDetail, {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
          color: state.darkMode ? 'white' : '#1C2028'
        }]
      }, 'Rp ' + convert((_state$data9 = state.data) == null ? undefined : _state$data9.total_price))));
    };
    var renderItemDetail = function renderItemDetail(_ref2) {
      var item = _ref2.item,
        index = _ref2.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNewRowNew
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: item.product.product_images[0].image_url
        },
        style: styles.shimmerPhoto
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(15)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        numberOfLines: 2,
        ellipsizeMode: "tail",
        style: styles.textNameNew
      }, item.product.name), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.rowPrice
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textBarang
      }, item.quantity + ' barang'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: styles.textPriceNew
      }, 'Rp. ' + convert(item.price))))));
    };
    var renderDetails = function renderDetails() {
      var _state$data10;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
          backgroundColor: 'white',
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20)
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewSectionRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPukul, {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "DETAIL PRODUK"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHide,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isHideLayanan: !state.isHideLayanan
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icHide,
        style: [styles.icHide, {
          transform: [{
            rotate: !state.isHideLayanan ? '0deg' : '180deg'
          }]
        }]
      }))), !state.isHideLayanan ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewFormLayanan, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
        data: (_state$data10 = state.data) == null ? undefined : _state$data10.product_order_details,
        renderItem: !state.loading && renderItemDetail,
        ListFooterComponent: function ListFooterComponent() {
          return renderFooterDetail();
        }
      })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
        }
      }));
    };
    var renderId = function renderId() {
      var _state$data15, _state$data15$product, _state$data16, _state$data16$product, _state$data17, _state$data17$product, _state$data18, _state$data19;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewFormLayanan, {
          marginTop: 0,
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
          height: 'auto'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNewRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textField
      }, "Status"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewStatus, {
          width: changeWidthStatus((_state$data15 = state.data) == null ? undefined : (_state$data15$product = _state$data15.product_order_status) == null ? undefined : _state$data15$product.name),
          backgroundColor: changeColorStatus((_state$data16 = state.data) == null ? undefined : (_state$data16$product = _state$data16.product_order_status) == null ? undefined : _state$data16$product.name)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textStatus
      }, (_state$data17 = state.data) == null ? undefined : (_state$data17$product = _state$data17.product_order_status) == null ? undefined : _state$data17$product.name))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNewRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textField
      }, "Order ID"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textValue
      }, (_state$data18 = state.data) == null ? undefined : _state$data18.id)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNewRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textField
      }, "Waktu Pemesanan"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textValue
      }, (0, _moment.default)((_state$data19 = state.data) == null ? undefined : _state$data19.created_at).format('DD MMM YYYY, HH:mm') + ' WIB')));
    };
    var replaceImageStatus = function replaceImageStatus(id) {
      if (id === 'd7983aa3-75e9-4e1f-b2d0-e90e86d88559') return _$$_REQUIRE(_dependencyMap[14]).allLogo.imgButkbayar01; // Verifikasi
      if (id === '4b3b43f4-f0f9-4ddf-b96f-a298a07ec1c4') return _$$_REQUIRE(_dependencyMap[14]).allLogo.imgButkbayar02; // Perbaikan pembayaran
      if (id === '29e9cac0-38c7-4193-95b0-f64ac56f69d4') return _$$_REQUIRE(_dependencyMap[14]).allLogo.imgButkbayar03; // Sudah bayar
      if (id === '12cb8ab3-59be-4602-8ae8-cec8f652ad01') return _$$_REQUIRE(_dependencyMap[14]).allLogo.icJasaProcess; // Sudah proses
      if (id === 'bdb77c55-4f01-404b-8635-f5b4f67a28ce') return _$$_REQUIRE(_dependencyMap[14]).allLogo.icJasaDone; // Sudah selesai
      if (id === 'd36080cc-58f6-449f-b082-c20066401bfb') return _$$_REQUIRE(_dependencyMap[14]).allLogo.imgButkbayar01; // Belum bayar
      return _$$_REQUIRE(_dependencyMap[14]).allLogo.icJasaInvalid;
    };
    var replaceStringStatus = function replaceStringStatus(id) {
      if (id === 'd7983aa3-75e9-4e1f-b2d0-e90e86d88559') return 'Bukti bayar'; // Verifikasi
      if (id === '4b3b43f4-f0f9-4ddf-b96f-a298a07ec1c4') return 'Bukti bayar diverifikasi dengan catatan oleh pengelola'; // Perbaikan pembayaran
      if (id === '29e9cac0-38c7-4193-95b0-f64ac56f69d4') return 'Bukti bayar telah diverifikasi'; // Sudah bayar
      if (id === '12cb8ab3-59be-4602-8ae8-cec8f652ad01') return 'Pesanan diproses'; // Sudah proses
      if (id === 'bdb77c55-4f01-404b-8635-f5b4f67a28ce') return 'Pesanan selesai'; // Sudah selesai
      if (id === 'd36080cc-58f6-449f-b082-c20066401bfb') return 'Bukti bayar'; // Belum bayar
      return 'Invalid';
    };
    var renderHistory = function renderHistory() {
      var _state$data20;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewFormLayanan, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
          paddingLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20)
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewSectionRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPukul, {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "RIWAYAT"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHide,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isHideRiwayat: !state.isHideRiwayat
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icHide,
        style: [styles.icHide, {
          transform: [{
            rotate: !state.isHideRiwayat ? '0deg' : '180deg'
          }]
        }]
      }))), !state.isHideRiwayat ? (_state$data20 = state.data) == null ? undefined : _state$data20.product_payment_histories.map(function (data) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
            flexDirection: 'row'
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: replaceImageStatus(data.product_order_status_id),
          style: styles.imgButkbayar
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10)
          }
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          style: styles.textTitleBukti
        }, replaceStringStatus(data.product_order_status.id)), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          style: styles.textDateBukti
        }, (0, _moment.default)(data.created_at).format('DD/MM/YYYY; HH:mm')), data.product_order_status_id === '29e9cac0-38c7-4193-95b0-f64ac56f69d4' || data.product_order_status_id === '12cb8ab3-59be-4602-8ae8-cec8f652ad01' || data.product_order_status_id === '613feb5c-78f3-406a-aa59-eaf5c7692230' || data.product_order_status_id === 'bdb77c55-4f01-404b-8635-f5b4f67a28ce' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, null) : _reactNative.Platform.OS === 'ios' ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          onPress: function onPress() {
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                isImageViewVisible: true,
                imageUrl: data.image_url
              });
            });
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: {
            uri: data.image_url
          },
          style: styles.imgBukti
        })) : /*#__PURE__*/_react.default.createElement(_CustomImageView.default, {
          style: styles.imgBukti,
          uri: data.image_url
        }), /*#__PURE__*/_react.default.createElement(_ViewMoreText.default, {
          textStyle: {
            marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(6),
            width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(240)
          },
          numberOfLines: 3,
          renderViewMore: function renderViewMore(onPress) {
            return /*#__PURE__*/_react.default.createElement(_CustomText.default, {
              textType: "semibold",
              onPress: onPress
            }, "Lihat lebih banyak");
          },
          renderViewLess: function renderViewLess(onPress) {
            return /*#__PURE__*/_react.default.createElement(_CustomText.default, {
              textType: "semibold",
              onPress: onPress
            }, "Lihat lebih sedikit");
          }
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          style: styles.textNoteBukti
        }, data.note))), _reactNative.Platform.OS === 'ios' && /*#__PURE__*/_react.default.createElement(_reactNativeImageViewing.default, {
          images: [{
            uri: state.imageUrl
          }],
          animationType: 'fade',
          imageIndex: 0,
          visible: state.isImageViewVisible,
          onRequestClose: function onRequestClose() {
            return setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                isImageViewVisible: false
              });
            });
          }
        }));
      }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0)
        }
      }));
    };
    var renderWa = function renderWa() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewWa, {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textWa
      }, "Apabila Anda memiliki pertanyaan terkait pesanan Anda, silahkan hubungi kami."), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchWa,
        onPress: function onPress() {
          _reactNative.Linking.openURL('whatsapp://send?text=&phone=+628117757333').catch(function () {
            return _reactNative.Linking.openURL(_reactNative.Platform.OS === 'ios' ? 'https://apps.apple.com/us/app/whatsapp-messenger/id310633997' : 'https://play.google.com/store/apps/details?id=com.whatsapp');
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icNewWa,
        style: styles.icNewWa
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: styles.textHubungi
      }, "Hubungi")));
    };
    if (state.loading) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
        style: styles.container
      }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
        barStyle: 'dark-content',
        translucent: false
      }), /*#__PURE__*/_react.default.createElement(_Header.default, {
        title: 'Detail Pesanan',
        onPress: function onPress() {
          return props.navigation.goBack();
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewContainerCenter
      }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
        size: "large",
        color: state.darkMode ? 'white' : '#5AAA0F'
      })));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Detail Pesanan',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.loadingForm
    }), renderModalConfirmation(), renderModalSelectBank(), state.loading ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewContainerCenter
    }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
      size: "large",
      color: state.darkMode ? 'white' : '#5AAA0F'
    })) : /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      style: [styles.scrollView, {
        backgroundColor: state.darkMode ? '#121212' : '#F6F7F4'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.content, {
        backgroundColor: state.darkMode ? '#121212' : '#F6F7F4'
      }]
    }, renderId(), renderKontak(), renderDetails(), ((_state$data21 = state.data) == null ? undefined : _state$data21.product_payment_histories.length) !== 0 && renderHistory(), ((_state$data22 = state.data) == null ? undefined : (_state$data22$product = _state$data22.product_order_status) == null ? undefined : _state$data22$product.name) !== 'Menunggu pembayaran' && renderWa(), ((_state$data23 = state.data) == null ? undefined : (_state$data23$product = _state$data23.product_order_status) == null ? undefined : _state$data23$product.name) === 'Menunggu pembayaran' && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.centerFooter
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        var _state$data24, _state$data25, _state$data26;
        //setState(state => ({...state, modalVisible: true}))
        NavigatorService.navigate('InfoMarket', {
          nominal: 'Rp ' + convert(parseInt((_state$data24 = state.data) == null ? undefined : _state$data24.total_price)),
          totalPrice: (_state$data25 = state.data) == null ? undefined : _state$data25.total_price,
          //bank: item,
          bank: state.arrayVirtualAccount[0],
          id: (_state$data26 = state.data) == null ? undefined : _state$data26.id,
          loadDetails: getListAndDetails
        });
      },
      style: [styles.touchBatalkan, {
        backgroundColor: '#5AAA0F'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: [styles.textBatal, {
        color: 'white'
      }]
    }, "Bayar Sekarang")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            isShowModalConfirm: true
          });
        });
      },
      style: styles.touchBatalkan
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: [styles.textBatal, {
        color: state.darkMode ? 'white' : '#5AAA0F'
      }]
    }, "Batalkan Pesanan"))), ((_state$data27 = state.data) == null ? undefined : (_state$data27$product = _state$data27.product_order_status) == null ? undefined : _state$data27$product.name) === 'Perbaikan pembayaran' && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.centerFooter
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            modalVisible: true
          });
        });
      },
      style: [styles.touchBatalkan, {
        backgroundColor: '#5AAA0F'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: [styles.textBatal, {
        color: 'white'
      }]
    }, "Upload Bukti Bayar"))))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    touchBatalkan: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(320),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      borderColor: '#5AAA0F',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    },
    scrollView: {},
    viewContainerCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    content: {
      flex: 1
      //paddingHorizontal: toDp(16),
      //paddingBottom: toDp(16)
    },
    textPukul: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      //fontWeight: 'bold',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.5)
    },
    viewFormLayanan: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      width: '100%',
      height: 'auto',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4)
    },
    viewRow: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      flexDirection: 'row',
      alignItems: 'center'
    },
    textDate: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: '600',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.5)
    },
    textTime2: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(44),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: '500'
    },
    line2: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      backgroundColor: '#EEEEEE',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    textName2: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14)
      //fontFamily: 'Montserrat-Regular',
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      alignItems: 'center'
    },
    lineDetail: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      backgroundColor: '#EEEEEE'
    },
    icCalendar2: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20)
    },
    textCatatan: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: '400'
    },
    viewStatus: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(56),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(26),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(13),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textStatus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#FFFFFF'
      //fontFamily: 'Montserrat-SemiBold',
    },
    textBatal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: '600',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.05)
    },
    centerFooter: {
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      alignItems: 'center',
      backgroundColor: 'white',
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      borderTopColor: '#DDE3E0'
    },
    textPriceDetail: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14)
      //fontFamily: 'Montserrat-Regular',
      //fontWeight: '500',
    },
    textNameDetail: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14)
      //fontFamily: 'Montserrat-Regular',
      //fontWeight: '600',
    },
    textQtyDetail: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(6),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      //fontWeight: '600',
      fontStyle: 'italic'
    },
    viewModalCenter: {
      width: 'auto',
      height: 'auto',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalBoxCenter: {
      width: width * 0.8,
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(200),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      alignItems: 'center'
    },
    titleConfirm: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.7)
    },
    textApakah2: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(30),
      textAlign: 'center',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#263238',
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
    },
    viewRow2: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      flexDirection: 'row'
    },
    touchTidak: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(110),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textTidak: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.7)
    },
    touchYa: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(110),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      borderColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10)
    },
    textYa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.7)
    },
    icSuccess: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(70),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(70),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
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
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    textTitleModal: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      color: '#263238',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4)
    },
    icSilangModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      tintColor: '#5E6157'
    },
    viewArrayStatus: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
    },
    touchLabelItem: {
      //margin: toDp(24),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(50),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      borderBottomColor: '#e9ebed',
      alignItems: 'center',
      flexDirection: 'row'
    },
    imgBank: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      resizeMode: 'contain',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    textLabel: {
      color: '#273238',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14)
    },
    imgButkbayar: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40)
    },
    textTitleBukti: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(270)
    },
    textDateBukti: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#383B34'
    },
    imgBukti: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(80),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4)
    },
    textNoteBukti: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#383B34',
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(270)
    },
    viewSectionRow: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    touchHide: {
      padding: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4)
    },
    icHide: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
    },
    viewWa: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(136),
      backgroundColor: '#F5FFE9',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20)
    },
    textWa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#5AAA0F',
      textAlign: 'center'
    },
    touchWa: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(134),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8)
    },
    icNewWa: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20)
    },
    textHubungi: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#FFFFFF',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8)
    },
    viewNewRow: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(32),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    textField: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#9B9F95'
    },
    textValue: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(11),
      color: '#383B34'
    },
    viewNewRowNew: {
      width: '100%',
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(15),
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8)
    },
    shimmerPhoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(70),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(70),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10)
    },
    textNameNew: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(206),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#383B34'
    },
    textPriceNew: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#383B34'
    },
    textBarang: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#383B34'
    },
    rowPrice: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(5),
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(235),
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  });
  var _default = exports.default = DetailsPesananMarketScreen;
