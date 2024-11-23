  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNativeImageViewing = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _CustomImageView = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _ViewMoreText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[10]));
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var DetailsJasaScreen = function DetailsJasaScreen(props) {
    var _state$data2, _state$data2$service_, _state$data3, _state$data3$service_, _state$data4, _state$data4$service_;
    var _useState = (0, _react.useState)({
        isShowModalConfirm: false,
        loading: true,
        darkMode: false,
        arrLayanan: [],
        connection: true,
        data: {},
        arrayVirtualAccount: [],
        modalVisible: false,
        isHideLayanan: false,
        isHideRiwayat: false,
        isAvailableVA: false,
        virtualAccount: null,
        isModalNotAvailable: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      getDetailsData();
      (0, _$$_REQUIRE(_dependencyMap[12]).getBank)('?search=service').then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            arrayVirtualAccount: response.data
          });
        });
      }).catch(function (err) {});
    }, []);
    var getDetailsData = function getDetailsData() {
      (0, _$$_REQUIRE(_dependencyMap[12]).getServicesOrders)('' + props.route.params.id).then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            data: response.data,
            loading: false
          });
        });
        (0, _$$_REQUIRE(_dependencyMap[12]).getServicesVirtualAccount)(response.data.service_category.id).then(function (response) {
          //setState(state => ({...state, arrayVirtualAccount: response.data}))

          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isAvailableVA: true,
              virtualAccount: response.data
            });
          });
        }).catch(function (err) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isAvailableVA: false
            });
          });
        });
      }).catch(function (error) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false
          });
        });
      });
    };
    var renderItemSelectBank = function renderItemSelectBank(_ref) {
      var item = _ref.item,
        index = _ref.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
          NavigatorService.navigate('InfoJasa', {
            nominal: 'Rp ' + convert(parseInt(state.data.total_price)),
            totalPrice: state.data.total_price,
            bank: item,
            id: state.data.id,
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
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icSilang,
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
              height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(48)
            }
          });
        }
      })))));
    };
    var getListAndDetails = function getListAndDetails() {
      getDetailsData();
      props.route.params.getAllLoadData();
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
        return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(168);
      } else if (name === 'Verifikasi') {
        return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(80);
      } else if (name === 'Perbaikan pembayaran') {
        return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(168);
      } else if (name === 'Request') {
        return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(70);
      } else if (name === 'Proses') {
        return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(70);
      } else if (name === 'Selesai') {
        return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(66);
      } else if (name === 'Batal') {
        return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(60);
      } else if (name === 'Invalid') {
        return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(70);
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
          height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(190)
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
      }, "Apakah Anda yakin ingin membatalkan pesanan jasa ini?", ' '), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
          width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchYa,
        onPress: function onPress() {
          (0, _$$_REQUIRE(_dependencyMap[12]).getServicesOrdersCancel)(props.route.params.id).then(function (response) {
            props.route.params.servicesOrders();
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
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
          backgroundColor: 'white',
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPukul, {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "DETAIL PEMESAN"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewFormLayanan, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icProfil,
        style: [styles.icCalendar2, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textName2, {
          color: state.darkMode ? 'white' : '#5E6157'
        }]
      }, state.data.user.name)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icMail,
        style: [styles.icCalendar2, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textName2, {
          color: state.darkMode ? 'white' : '#5E6157'
        }]
      }, state.data.user.email)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icPhone,
        style: [styles.icCalendar2, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textName2, {
          color: state.darkMode ? 'white' : '#5E6157'
        }]
      }, state.data.user.phone)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icLocation,
        style: [styles.icCalendar2, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textName2, {
          color: state.darkMode ? 'white' : '#5E6157'
        }]
      }, state.data.unit.code + '\n' + state.data.unit.unit_name)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.line2, {
          backgroundColor: state.darkMode ? '#121212' : '#EEEEEE'
        }]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icCalendar,
        style: [styles.icCalendar2, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textDate, {
          color: state.darkMode ? 'white' : '#5E6157'
        }]
      }, (0, _moment.default)(state.data.time).format('dddd, DD MMMM YYYY'))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textTime2, {
          color: state.darkMode ? 'white' : '#5E6157'
        }]
      }, (0, _moment.default)(state.data.time).add(-7, 'hours').format('LT'))));
    };
    var renderFooterDetail = function renderFooterDetail() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.detailRow, {
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [
        // styles.textSubTotal,
        {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
          color: state.darkMode ? 'white' : '#1C2028'
        }]
      }, "Sub Total"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPriceDetail, {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
          color: state.darkMode ? 'white' : '#1C2028'
        }]
      }, 'Rp ' + convert(state.data.total_price))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.lineDetail, {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
          backgroundColor: state.darkMode ? '#121212' : '#EEEEEE'
        }]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.detailRow, {
          paddingVertical: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0),
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [
        // styles.textSubTotal,
        {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
          color: state.darkMode ? 'white' : '#1C2028'
        }]
      }, "Grand Total"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPriceDetail, {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
          color: state.darkMode ? 'white' : '#1C2028'
        }]
      }, 'Rp ' + convert(state.data.total_price))));
    };
    var renderItemDetail = function renderItemDetail(_ref2) {
      var item = _ref2.item,
        index = _ref2.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.detailRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textNameDetail, {
          width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(200),
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, item.service.name), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textQtyDetail, {
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, item.quantity + 'x')), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textPriceDetail, {
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, 'Rp ' + convert(item.price))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.lineDetail, {
          backgroundColor: state.darkMode ? '#121212' : '#EEEEEE'
        }]
      }));
    };
    var renderDetails = function renderDetails() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
          backgroundColor: 'white',
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20)
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewSectionRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPukul, {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "LAYANAN"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHide,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isHideLayanan: !state.isHideLayanan
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icHide,
        style: [styles.icHide, {
          transform: [{
            rotate: !state.isHideLayanan ? '0deg' : '180deg'
          }]
        }]
      }))), !state.isHideLayanan ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewFormLayanan, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
        data: state.data.service_order_details
        // renderItem={state.loading ? renderItemShimmer : renderItemDetail}
        ,
        renderItem: state.loading && renderItemDetail,
        ListFooterComponent: function ListFooterComponent() {
          return renderFooterDetail();
        }
      })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
        }
      }));
    };
    var renderCatatan = function renderCatatan() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
          backgroundColor: 'white',
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPukul, {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "Catatan"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewFormLayanan, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textCatatan, {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
          color: state.darkMode ? 'white' : '#1C2028'
        }]
      }, state.data.note === '' ? 'Tidak ada catatan' : state.data.note)));
    };
    var renderCatatanPengelola = function renderCatatanPengelola() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
          backgroundColor: 'white',
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPukul, {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "Catatan Pengelola"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewFormLayanan, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textCatatan, {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
          color: state.darkMode ? 'white' : '#1C2028'
        }]
      }, state.data.invalid_note === '' ? 'Tidak ada catatan' : state.data.invalid_note)));
    };
    var renderId = function renderId() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewFormLayanan, {
          backgroundColor: state.darkMode ? '#1C1C1E' : '#F6F7F4',
          paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
          height: 'auto'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: [styles.textPukul, {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
          color: state.darkMode ? 'white' : '#273238'
        }]
      }, state.data.service_category.name), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textCatatan, {
          fontWeight: '400',
          marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
          color: state.darkMode ? 'white' : '#273238'
        }]
      }, "Order ID : ", '\n', state.data.id), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [{
          color: state.darkMode ? 'white' : '#5E6157'
        }]
      }, "Waktu Request : ", '\n', (0, _moment.default)(state.data.created_at).format('LLL'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewStatus, {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
          width: changeWidthStatus(state.data.service_order_status.name),
          backgroundColor: changeColorStatus(state.data.service_order_status.name)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textStatus
      }, state.data.service_order_status.name)));
    };
    var replaceImageStatus = function replaceImageStatus(id) {
      if (id === '514cd86c-68a7-48d8-b152-e87ac12583ba') return _$$_REQUIRE(_dependencyMap[13]).allLogo.imgButkbayar01; // Verifikasi
      if (id === '244d1089-2d1b-4d33-be16-7cbf5140aa6b') return _$$_REQUIRE(_dependencyMap[13]).allLogo.imgButkbayar02; // Perbaikan pembayaran
      if (id === '974aa0f8-4fcf-4c58-bf00-30fdac05f86a') return _$$_REQUIRE(_dependencyMap[13]).allLogo.imgButkbayar03; // Sudah bayar
      if (id === 'e274f0a4-bf1d-4048-bb5f-c6bc14fa3d50') return _$$_REQUIRE(_dependencyMap[13]).allLogo.icJasaProcess; // Sudah proses
      if (id === 'a20f79b3-68dc-4735-95f8-121d4ff55be9') return _$$_REQUIRE(_dependencyMap[13]).allLogo.icJasaDone; // Sudah selesai
      if (id === 'd36080cc-58f6-449f-b082-c20066401bfb') return _$$_REQUIRE(_dependencyMap[13]).allLogo.imgButkbayar01; // Belum bayar
      return _$$_REQUIRE(_dependencyMap[13]).allLogo.icJasaInvalid;
    };
    var replaceStringStatus = function replaceStringStatus(id) {
      if (id === '514cd86c-68a7-48d8-b152-e87ac12583ba') return 'Bukti bayar'; // Verifikasi
      if (id === '244d1089-2d1b-4d33-be16-7cbf5140aa6b') return 'Bukti bayar diverifikasi dengan catatan oleh pengelola'; // Perbaikan pembayaran
      if (id === '974aa0f8-4fcf-4c58-bf00-30fdac05f86a') return 'Bukti bayar telah diverifikasi'; // Sudah bayar
      if (id === 'e274f0a4-bf1d-4048-bb5f-c6bc14fa3d50') return 'Pesanan diproses'; // Sudah proses
      if (id === 'a20f79b3-68dc-4735-95f8-121d4ff55be9') return 'Pesanan selesai'; // Sudah selesai
      if (id === 'd36080cc-58f6-449f-b082-c20066401bfb') return 'Bukti bayar'; // Belum bayar
      return 'Invalid';
    };
    var renderHistory = function renderHistory() {
      var _state$data;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewFormLayanan, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
          paddingLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20)
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewSectionRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPukul, {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
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
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icHide,
        style: [styles.icHide, {
          transform: [{
            rotate: !state.isHideRiwayat ? '0deg' : '180deg'
          }]
        }]
      }))), !state.isHideRiwayat ? (_state$data = state.data) == null ? undefined : _state$data.service_payment_histories.map(function (data) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
            flexDirection: 'row'
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: replaceImageStatus(data.service_order_status_id),
          style: styles.imgButkbayar
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10)
          }
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          style: styles.textTitleBukti
        }, replaceStringStatus(data.service_order_status_id)), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          style: styles.textDateBukti
        }, (0, _moment.default)(data.created_at).format('DD/MM/YYYY; HH:mm')), data.service_order_status_id === '974aa0f8-4fcf-4c58-bf00-30fdac05f86a' || data.service_order_status_id === 'e274f0a4-bf1d-4048-bb5f-c6bc14fa3d50' || data.service_order_status_id === '613feb5c-78f3-406a-aa59-eaf5c7692230' || data.service_order_status_id === 'a20f79b3-68dc-4735-95f8-121d4ff55be9' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, null) : _reactNative.Platform.OS === 'ios' ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
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
            marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(6),
            width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(240)
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
          height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0)
        }
      }));
    };
    var renderWa = function renderWa() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewWa, {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10)
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
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icNewWa,
        style: styles.icNewWa
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: styles.textHubungi
      }, "Hubungi")));
    };
    var renderModalNotAvailable = function renderModalNotAvailable() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        isVisible: state.isModalNotAvailable
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: 'auto',
          height: 'auto',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: 'auto',
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(30),
          width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(280),
          backgroundColor: '#FFFFFF',
          borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
          alignItems: 'center'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icNewInfo,
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(70),
          height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(70),
          marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(32)
        }
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: {
          textAlign: 'center',
          marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(25),
          fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
          color: '#263238'
        }
      }, "VIRTUAL ACCOUNT BELUM TERSEDIA"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
          fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
          color: '#263238',
          textAlign: 'center',
          marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20)
        }
      }, "Maaf, Virtual Account belum tersedia pada unit Anda saat ini. Silahkan hubungi Hotline Central Connect."), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isModalNotAvailable: false
            });
          });
        },
        style: styles.touchKembaliKeLogin
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textKembaliKeLogin
      }, "OK")))));
    };
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
    }), renderModalConfirmation(), renderModalSelectBank(), renderModalNotAvailable(), state.loading ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
    }, renderId(), renderKontak(), renderDetails(), renderCatatan(), state.data.service_payment_histories.length !== 0 && renderHistory(), state.data.invalid_note && renderCatatanPengelola(), ((_state$data2 = state.data) == null ? undefined : (_state$data2$service_ = _state$data2.service_order_status) == null ? undefined : _state$data2$service_.name) !== 'Menunggu pembayaran' && renderWa(), ((_state$data3 = state.data) == null ? undefined : (_state$data3$service_ = _state$data3.service_order_status) == null ? undefined : _state$data3$service_.name) === 'Menunggu pembayaran' && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.centerFooter
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        //setState(state => ({...state, modalVisible: true}))

        if (state.isAvailableVA) {
          //alert('zaini - '+JSON.stringify(state.virtualAccount))
          NavigatorService.navigate('InfoJasa', {
            nominal: 'Rp ' + convert(parseInt(state.data.total_price)),
            totalPrice: state.data.total_price,
            //bank: item,
            bank: state.virtualAccount,
            id: state.data.id,
            loadDetails: getListAndDetails
          });
        } else {
          //Alert.alert('Mohon Maaf','Virtual Account tidak ditemukan.')
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isModalNotAvailable: true
            });
          });
        }
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
        height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
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
    }, "Batalkan Pesanan"))), ((_state$data4 = state.data) == null ? undefined : (_state$data4$service_ = _state$data4.service_order_status) == null ? undefined : _state$data4$service_.name) === 'Perbaikan pembayaran' && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.centerFooter
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        //setState(state => ({...state, modalVisible: true}))

        if (state.isAvailableVA) {
          NavigatorService.navigate('InfoJasa', {
            nominal: 'Rp ' + convert(parseInt(state.data.total_price)),
            totalPrice: state.data.total_price,
            //bank: item,
            bank: state.virtualAccount,
            id: state.data.id,
            loadDetails: getListAndDetails
          });
        } else {
          //Alert.alert('Mohon Maaf','Virtual Account tidak ditemukan.')
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isModalNotAvailable: true
            });
          });
        }
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
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(320),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
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
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      //fontWeight: 'bold',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.5)
    },
    viewFormLayanan: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      width: '100%',
      height: 'auto',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4)
    },
    viewRow: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      flexDirection: 'row',
      alignItems: 'center'
    },
    textDate: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: '600',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.5)
    },
    textTime2: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(44),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: '500'
    },
    line2: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      backgroundColor: '#EEEEEE',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    textName2: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14)
      //fontFamily: 'Montserrat-Regular',
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      alignItems: 'center'
    },
    lineDetail: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      backgroundColor: '#EEEEEE'
    },
    icCalendar2: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20)
    },
    textCatatan: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: '400'
    },
    viewStatus: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(56),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(26),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(13),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textStatus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: '#FFFFFF'
      //fontFamily: 'Montserrat-SemiBold',
    },
    textBatal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: '600',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.05)
    },
    centerFooter: {
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      alignItems: 'center',
      backgroundColor: 'white',
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      borderTopColor: '#DDE3E0'
    },
    textPriceDetail: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14)
      //fontFamily: 'Montserrat-Regular',
      //fontWeight: '500',
    },
    textNameDetail: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14)
      //fontFamily: 'Montserrat-Regular',
      //fontWeight: '600',
    },
    textQtyDetail: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(6),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
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
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(200),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      alignItems: 'center'
    },
    titleConfirm: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.7)
    },
    textApakah2: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(30),
      textAlign: 'center',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#263238',
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24)
    },
    viewRow2: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      flexDirection: 'row'
    },
    touchTidak: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(110),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textTidak: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.7)
    },
    touchYa: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(110),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      borderColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10)
    },
    textYa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.7)
    },
    icSuccess: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(70),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(70),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
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
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    textTitleModal: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      color: '#263238',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4)
    },
    icSilangModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      tintColor: '#5E6157'
    },
    viewArrayStatus: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24)
    },
    touchLabelItem: {
      //margin: toDp(24),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(50),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      borderBottomColor: '#e9ebed',
      alignItems: 'center',
      flexDirection: 'row'
    },
    imgBank: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      resizeMode: 'contain',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    textLabel: {
      color: '#273238',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14)
    },
    imgButkbayar: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40)
    },
    textTitleBukti: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(270)
    },
    textDateBukti: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: '#383B34'
    },
    imgBukti: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(80),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4)
    },
    textNoteBukti: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: '#383B34',
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(270)
    },
    viewSectionRow: {
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    touchHide: {
      padding: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4)
    },
    icHide: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24)
    },
    viewWa: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(136),
      backgroundColor: '#F5FFE9',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20)
    },
    textWa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#5AAA0F',
      textAlign: 'center'
    },
    touchWa: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(134),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
    },
    icNewWa: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20)
    },
    textHubungi: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#FFFFFF',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
    },
    touchKembaliKeLogin: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(180),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKembaliKeLogin: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.2)
    }
  });
  var _default = exports.default = DetailsJasaScreen;
