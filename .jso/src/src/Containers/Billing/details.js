  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _CustomImageView = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _Toast = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _ViewMoreText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[9]);
  var _reactNativeBlobUtil = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _reactNativeImageViewing = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _reactNativeSharePdf = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[14]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var DetailsBillingScreen = function DetailsBillingScreen(props) {
    var _props$route$params, _props$route$params2;
    var toast = (0, _react.useRef)(null);
    var _useState = (0, _react.useState)({
        loading: false,
        modalVisible: false,
        arrayVirtualAccount: [],
        billing: null,
        isImageViewVisible: false,
        imageUrl: ''
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    var totalTagihan = ((_props$route$params = props.route.params) == null ? undefined : _props$route$params.dataBilling) !== undefined && ((_props$route$params2 = props.route.params) == null ? undefined : _props$route$params2.dataBilling.reduce(function (acc, curr) {
      return acc + parseInt(curr.total_remaining);
    }, 0));
    (0, _react.useEffect)(function () {
      // getListBilling();
      loadDetails(props.route.params.item.id);
      /*getBank(props.route.params.unit.id)
        .then(response => {
          console.log('getBank', response);
          setState(state => ({
            ...state,
            arrayVirtualAccount: response.data.virtual_account,
          }));
        })
        .catch(err => {
          console.log('err', err);
        });*/
      (0, _$$_REQUIRE(_dependencyMap[15]).getUnits)(props.route.params.unit.id).then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            arrayVirtualAccount: response.data.virtual_account
          });
        });
      }).catch(function (err) {});
    }, []);

    // const getListBilling = async () => {
    //   const unitId = props.route.params.unit.id;
    //   const period = props.route.params.item.period;
    //   getBillingDetail(`?unit_id=${unitId}&period=${period}`)
    //     .then((response) => {
    //       console.log('response list billing xxxxxx', response.data);
    //       // setState((state) => ({ ...state, billing: response.data.data }));
    //     })
    //     .catch((err) => {
    //       console.log('err', err);
    //     });
    // };

    var loadDetails = function loadDetails(id) {
      (0, _$$_REQUIRE(_dependencyMap[15]).getBillingDetail)('/' + id).then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            billing: response.data.data
          });
        });
      }).catch(function (err) {});
    };
    var renderStatusColor = function renderStatusColor(id) {
      if (id === 'b31b097a-8516-452c-a723-690388791735') return '#F2C141'; // Verifikasi
      if (id === '79c07edd-094e-4df5-bee2-12a430c4e1f1') return '#EE4040'; // Perbaikan pembayaran
      if (id === '6613a96f-0a4a-4091-9ba8-a0b30d9bf76c') return '#28A595'; // Sudah bayar
      if (id === 'd36080cc-58f6-449f-b082-c20066401bfb') return '#EE4040'; // Belum bayar
      if (id === 'da3393ce-4ca8-42bb-8632-533de7d31685') return '#EE4040'; // Belum lunas
    };
    var showMessage = function showMessage() {
      toast.current.show('Unduh Tagihan berhasil');
    };
    var downloadPDF = function downloadPDF(linkPDF) {
      var config = _reactNativeBlobUtil.default.config,
        fs = _reactNativeBlobUtil.default.fs;
      var date = new Date();
      var _fs$dirs = fs.dirs,
        DownloadDir = _fs$dirs.DownloadDir,
        DocumentDir = _fs$dirs.DocumentDir;
      var dirToSave = _reactNative.Platform.select({
        ios: fs.dirs.DocumentDir,
        android: fs.dirs.DownloadDir
      });
      var fileName = state.billing.id + ".pdf";
      var path = dirToSave + "/" + fileName;
      var options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: path,
          description: 'Downloading.'
        }
      };
      var configOptions = _reactNative.Platform.select({
        ios: {
          fileCache: options.fileCache,
          title: 'BEBAS IOS',
          path: path,
          appendExt: 'pdf'
        },
        android: options
      });
      try {
        if (_reactNative.Platform.OS === 'ios') {
          config(configOptions).fetch('GET', linkPDF).then(function (res) {
            return res.readFile('base64');
          }).then(function (base64Data) {
            showMessage();
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                loading: false
              });
            });
            setTimeout(function () {
              _reactNativeSharePdf.default.sharePDF(base64Data, fileName).then(function (res1) {}).catch(function (err1) {});
            }, 500);
          }).catch(function (error) {
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                loading: false
              });
            });
          });
        } else {
          // ANDROID
          config(options).fetch('GET', linkPDF).then(function (res) {
            showMessage();
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                loading: false
              });
            });
          }).catch(function (error) {
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                loading: false
              });
            });
          });
        }
      } catch (e) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false
          });
        });
      }
    };
    var headerDownload = function headerDownload() {
      var _state$billing, _state$billing$unit;
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loading: true
        });
      });
      var data = {
        unit_id: (_state$billing = state.billing) == null ? undefined : (_state$billing$unit = _state$billing.unit) == null ? undefined : _state$billing$unit.id
      };
      (0, _$$_REQUIRE(_dependencyMap[15]).postBillingInvoicePDF)(data).then(function (response) {
        downloadPDF(response.data.data.image_url);
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false
          });
        });
      }).catch(function (error) {
        _reactNative.Alert.alert('Mohon Maaf', error.data.message, [{
          text: 'OK',
          onPress: function onPress() {
            return setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                loading: false
              });
            });
          }
        }]);
      });
    };
    var renderHeader = function renderHeader() {
      var _state$billing2, _state$billing2$billi, _state$billing3, _state$billing3$billi;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.header, {
          backgroundColor: 'white',
          borderBottomColor: '#CCCFC9'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(90)
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHeader,
        onPress: function onPress() {
          return props.navigation.goBack();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icBack,
        style: styles.icBack
      }))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: styles.title
      }, 'Detail Tagihan'), ((_state$billing2 = state.billing) == null ? undefined : (_state$billing2$billi = _state$billing2.billing_status) == null ? undefined : _state$billing2$billi.name) === 'Belum Lunas' || ((_state$billing3 = state.billing) == null ? undefined : (_state$billing3$billi = _state$billing3.billing_status) == null ? undefined : _state$billing3$billi.name) === 'Belum bayar' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(90),
          alignItems: 'flex-end'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.headerRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHeaderSearch,
        onPress: function onPress() {
          return headerDownload();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icExportTagihan,
        style: styles.icExportTagihan
      })))) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(90),
          alignItems: 'flex-end'
        }
      }));
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
          NavigatorService.navigate('InfoBilling', {
            nominal: 'Rp ' + convert(parseInt(totalTagihan)),
            totalPrice: state.billing.total_remaining,
            bank: item,
            id: state.billing.id,
            loadDetails: loadDetails,
            loadPaidUnpaid: props.route.params.loadPaidUnpaid,
            dataBilling: props.route.params.dataBilling
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
        source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icSilang,
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
              height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(48)
            }
          });
        }
      })))));
    };
    var convert = function convert(angka) {
      var rupiah = '';
      var angkarev = angka.toString().split('').reverse().join('');
      for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
      return rupiah.split('', rupiah.length - 1).reverse().join('');
    };
    var replaceImageStatus = function replaceImageStatus(id) {
      if (id === 'b31b097a-8516-452c-a723-690388791735') return _$$_REQUIRE(_dependencyMap[17]).allLogo.imgButkbayar01; // Verifikasi
      if (id === '79c07edd-094e-4df5-bee2-12a430c4e1f1') return _$$_REQUIRE(_dependencyMap[17]).allLogo.imgButkbayar02; // Perbaikan pembayaran
      if (id === '6613a96f-0a4a-4091-9ba8-a0b30d9bf76c') return _$$_REQUIRE(_dependencyMap[17]).allLogo.imgButkbayar03; // Sudah bayar
      if (id === 'd36080cc-58f6-449f-b082-c20066401bfb') return _$$_REQUIRE(_dependencyMap[17]).allLogo.imgButkbayar01; // Belum bayar
      if (id === 'da3393ce-4ca8-42bb-8632-533de7d31685') return _$$_REQUIRE(_dependencyMap[17]).allLogo.imgButkbayar01; // Belum Lunas
    };

    // console.log('state.billing xxxxx', state.billing.billing_histories)

    var renderDetailsTagihan = function renderDetailsTagihan() {
      var _state$billing4, _state$billing4$billi, _state$billing5, _state$billing5$billi, _state$billing6, _state$billing6$billi, _state$billing7, _state$billing7$billi, _state$billing$origin, _state$billing8, _state$billing8$billi, _state$billing9;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewDetailsTagihan
      }, props.route.params.dataBilling !== undefined && props.route.params.dataBilling.map(function (i) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          key: i.unit_id,
          style: styles.viewRowDetails
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          allowFontScaling: false,
          style: [styles.textValueDetails, {
            color: '#383B34'
          }]
        }, i.type === 'AGING_INSTALLMENT' ? 'Cicilan Aging' : i.type === 'MONTHLY_BILL' ? 'Tagihan Berjalan' : i.type === 'ARREAR_INSTALLMENT' ? 'Cicilan Tagihan' : null), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          allowFontScaling: false,
          style: [styles.textValueDetails, {
            color: '#383B34'
          }]
        }, "Rp ", convert(parseInt(i.total_remaining))));
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowDetails
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textValueDetails, {
          color: '#383B34'
        }]
      }, 'TOTAL TAGIHAN'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textValueDetails, {
          color: '#383B34'
        }]
      }, "Rp ", convert(parseInt(totalTagihan) || parseInt(props.route.params.item.bill))))), ((_state$billing4 = state.billing) == null ? undefined : (_state$billing4$billi = _state$billing4.billing_status) == null ? undefined : _state$billing4$billi.name) === 'Belum bayar' || ((_state$billing5 = state.billing) == null ? undefined : (_state$billing5$billi = _state$billing5.billing_status) == null ? undefined : _state$billing5$billi.name) === 'Belum Lunas' && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.lineDetails
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          alignItems: 'center',
          marginTop: 8,
          marginBottom: 16
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewInfo
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icInfo,
        style: styles.icInfo
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [styles.textInfo, {
          color: '#383B34'
        }]
      }, 'Untuk Melihat Detail Tagihan, Silahkan Unduh Invoice PDF melalui Tombol Unduh diatas.')))), ((_state$billing6 = state.billing) == null ? undefined : (_state$billing6$billi = _state$billing6.billing_status) == null ? undefined : _state$billing6$billi.name) === 'Belum bayar' && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.lineDetails
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          alignItems: 'center',
          marginTop: 8,
          marginBottom: 16
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewInfo
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icInfo,
        style: styles.icInfo
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [styles.textInfo, {
          color: '#383B34'
        }]
      }, 'Untuk Melihat Detail Tagihan, Silahkan Unduh Invoice PDF melalui Tombol Unduh diatas.'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          alignItems: 'center'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewInfo
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icInfo,
        style: styles.icInfo
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [styles.textInfo, {
          color: '#383B34'
        }]
      }, 'Pembayaran untuk saat ini dapat dilakukan secara langsung dengan Transfer.')))), ((_state$billing7 = state.billing) == null ? undefined : (_state$billing7$billi = _state$billing7.billing_status) == null ? undefined : _state$billing7$billi.id) === '6613a96f-0a4a-4091-9ba8-a0b30d9bf76c' && /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: width,
          height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
          backgroundColor: '#F6F7F4'
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          padding: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textDetailTagihan, {
          color: '#9B9F95'
        }]
      }, 'INFO PEMBAYARAN'), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewRowDetails, {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(18)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [styles.textValueDetails, {
          color: '#383B34'
        }]
      }, 'Bank Transfer'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [styles.textValueDetails, {
          color: '#383B34'
        }]
      }, (_state$billing$origin = state.billing.origin_bank) == null ? undefined : _state$billing$origin.name)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewRowDetails, {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [styles.textValueDetails, {
          color: '#383B34'
        }]
      }, 'Waktu bayar'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [styles.textValueDetails, {
          color: '#383B34'
        }]
      }, (0, _moment.default)(state.billing.payment_timestamp).format('LLL').replace('pukul', ''))))), ((_state$billing8 = state.billing) == null ? undefined : (_state$billing8$billi = _state$billing8.billing_status) == null ? undefined : _state$billing8$billi.name) !== 'Belum bayar' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: width,
          height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
          backgroundColor: '#F6F7F4'
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          padding: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textDetailTagihan, {
          color: '#9B9F95'
        }]
      }, 'RIWAYAT'), (_state$billing9 = state.billing) == null ? undefined : _state$billing9.billing_histories.map(function (data) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
            flexDirection: 'row'
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: replaceImageStatus(data.billing_status.id),
          style: styles.imgButkbayar
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            marginLeft: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10)
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          style: styles.textTitleBukti
        }, data.messages || '-'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          style: styles.textDateBukti
        }, (0, _moment.default)(data.created_at).format('DD/MM/YYYY; HH:mm')), data.image_url === null ? null : data.billing_status.id !== '6613a96f-0a4a-4091-9ba8-a0b30d9bf76c' ? _reactNative.Platform.OS === 'ios' ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
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
        }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null), /*#__PURE__*/_react.default.createElement(_ViewMoreText.default, {
          textStyle: {
            marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(6),
            width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(240)
          },
          numberOfLines: 3,
          renderViewMore: function renderViewMore(onPress) {
            return /*#__PURE__*/_react.default.createElement(_CustomText.default, {
              textType: "semibold",
              style: styles.textMore,
              onPress: onPress
            }, "Lihat lebih banyak");
          },
          renderViewLess: function renderViewLess(onPress) {
            return /*#__PURE__*/_react.default.createElement(_CustomText.default, {
              textType: "semibold",
              style: styles.textMore,
              onPress: onPress
            }, "Lihat lebih sedikit");
          }
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          style: styles.textNoteBukti
        }, data.note)), data.billing_payment !== null && data.billing_payment.status === 'verified' && renderFooterViewReceipt(data))), _reactNative.Platform.OS === 'ios' && /*#__PURE__*/_react.default.createElement(_reactNativeImageViewing.default, {
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
      }))) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(48)
        }
      }));
    };
    var renderContent = function renderContent() {
      var _state$billing10, _state$billing10$unit, _state$billing11, _state$billing11$unit, _state$billing12, _state$billing12$bill, _state$billing13, _state$billing13$bill, _state$billing14, _state$billing15, _state$billing16, _state$billing17;
      return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.content
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.headerContent
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.rowContent
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icHomeCluster,
        style: [styles.icHomeCluster, {
          tintColor: '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textTitleConten, {
          color: '#383B34',
          width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(288)
        }]
      }, (_state$billing10 = state.billing) == null ? undefined : (_state$billing10$unit = _state$billing10.unit) == null ? undefined : _state$billing10$unit.owner_name), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [styles.textTitleConten, {
          color: '#383B34',
          marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4)
        }]
      }, (_state$billing11 = state.billing) == null ? undefined : (_state$billing11$unit = _state$billing11.unit) == null ? undefined : _state$billing11$unit.unit_name))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8)
        }
      })), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        activeOpacity: 1,
        style: [styles.touchRow, {
          backgroundColor: state.darkMode ? '#1C1C1E' : '#F6F7F4'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textTitle, {
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, changeMonth(props.route.params.item.period)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewStatus1, {
          backgroundColor: renderStatusColor((_state$billing12 = state.billing) == null ? undefined : (_state$billing12$bill = _state$billing12.billing_status) == null ? undefined : _state$billing12$bill.id)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        allowFontScaling: false,
        style: [styles.textStatus, {
          color: state.darkMode ? '#121212' : '#ffffff'
        }]
      }, (_state$billing13 = state.billing) == null ? undefined : (_state$billing13$bill = _state$billing13.billing_status) == null ? undefined : _state$billing13$bill.name))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        allowFontScaling: false,
        style: [styles.textId, {
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, props.route.params.item.invoice_id), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, props.route.params.item.billing_status.name === 'Belum bayar' || props.route.params.item.billing_status.name === 'Verifikasi' || props.route.params.item.billing_status.name === 'Perbaikan pembayaran' || props.route.params.item.billing_status.name === 'Belum Lunas' ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [styles.textDate, {
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, "Pembayaran Maintenance Service Paling lambat tanggal " + (((_state$billing14 = state.billing) == null ? undefined : _state$billing14.due_date) === null ? '-' : (0, _moment.default)((_state$billing15 = state.billing) == null ? undefined : _state$billing15.due_date).format('DD MMMM YYYY')) + ". Keterlambatan Pembayaran Maintenance dikenakan denda 5%.")) : /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [styles.textDate, {
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, "Waktu bayar : " + (((_state$billing16 = state.billing) == null ? undefined : _state$billing16.payment_timestamp) === null ? '-' : (0, _moment.default)((_state$billing17 = state.billing) == null ? undefined : _state$billing17.payment_timestamp).format('DD MMMM YYYY')))))), renderDetailsTagihan()));
    };
    var convetBulan = function convetBulan(month) {
      if (month === '01') return 'Januari';
      if (month === '02') return 'Februari';
      if (month === '03') return 'Maret';
      if (month === '04') return 'April';
      if (month === '05') return 'Mei';
      if (month === '06') return 'Juni';
      if (month === '07') return 'Juli';
      if (month === '08') return 'Agustus';
      if (month === '09') return 'September';
      if (month === '10') return 'Oktober';
      if (month === '11') return 'November';
      if (month === '12') return 'Desember';
    };
    var changeMonth = function changeMonth(period) {
      var tahun = period.substr(0, 4);
      var bulan = period.substr(4);
      return convetBulan(bulan) + ' ' + tahun;
    };
    var handleDownloadReceipt = function handleDownloadReceipt(billing) {
      // console.log('download Receipt', data);
      // console.log('state cccc', state.billing?.unit?.id);
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loading: true
        });
      });
      var data = {
        payment_id: billing.billing_payment.id
      };
      (0, _$$_REQUIRE(_dependencyMap[15]).postBillingReceiptPDF)(data).then(function (response) {
        downloadPDF(response.data.data.image_url);
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false
          });
        });
      }).catch(function (error) {
        _reactNative.Alert.alert('Mohon Maaf', error.data.message, [{
          text: 'OK',
          onPress: function onPress() {
            return setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                loading: false
              });
            });
          }
        }]);
      });
    };
    var renderFooter = function renderFooter() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewFooter
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchFooterPayNow,
        onPress: function onPress() {
          if (state.arrayVirtualAccount.length === 0) {
            _reactNative.Alert.alert('Mohon Maaf', 'Virtual Account tidak tersedia', [{
              text: 'OK',
              onPress: function onPress() {
                return undefined;
              }
            }]);
          } else {
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                modalVisible: true
              });
            });
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textFooter
      }, 'Bayar Sekarang')));
    };
    var renderFooterViewReceipt = function renderFooterViewReceipt(data) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewFooter
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: [styles.touchFooter, {
          backgroundColor: 'white',
          borderWidth: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1),
          borderColor: '#5AAA0F'
        }],
        onPress: function onPress() {
          return handleDownloadReceipt(data);
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textFooter, {
          color: '#5AAA0F'
        }]
      }, 'Unduh Receipt')));
    };
    var renderFooterPerbaikan = function renderFooterPerbaikan() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewFooter
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchFooterPayNow,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: true
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textFooter
      }, 'Upload Bukti Bayar')));
    };
    if (state.billing === null) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
        style: styles.container
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewLoading
      }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
        size: "large",
        color: "#5AAA0F"
      })));
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.loading
    }), /*#__PURE__*/_react.default.createElement(_Toast.default, {
      ref: toast
    }), renderHeader(), renderModalSelectBank(), renderContent(), state.billing.billing_status.name === 'Belum bayar' || state.billing.billing_status.name === 'Belum Lunas' ? renderFooter() : state.billing.billing_status.name === 'Perbaikan pembayaran' ? renderFooterPerbaikan() : /*#__PURE__*/_react.default.createElement(_reactNative.View, null));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF'
    },
    viewInfo: {
      flexDirection: 'row',
      backgroundColor: '#F6F7F4',
      padding: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10),
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(320),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10)
    },
    viewLoading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    icInfo: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20)
    },
    textInfo: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12)
    },
    touchLabelItem: {
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(50),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1),
      borderBottomColor: '#e9ebed',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    touchRow: {
      width: width,
      height: 'auto',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4),
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4)
    },
    viewStatus: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8),
      height: 'auto',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4),
      borderBottomLeftRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4)
    },
    viewRowDetails: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(5)
    },
    viewRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 'auto'
    },
    textTitle: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.7)
    },
    viewDetailsTagihan: {
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    },
    textDetailTagihan: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    textId: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.6),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8)
    },
    textDate: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.6),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4)
    },
    textLabelDetails: {
      color: '#273238',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12)
    },
    textValueDetails: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14)
    },
    rowContent: {
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20)
    },
    headerContent: {
      width: width,
      //height: toDp(78),
      height: 'auto',
      backgroundColor: '#EBECE9'
    },
    icHomeCluster: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20)
    },
    textTitleConten: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14)
    },
    content: {
      flex: 1,
      backgroundColor: 'white'
    },
    textDetail: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1)
    },
    viewDetails: {
      flex: 1,
      padding: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      elevation: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(6)
    },
    touchRow: {
      width: width,
      height: 'auto',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4),
      flexDirection: 'row',
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    viewRootRow: {
      flex: 1
      //padding: toDp(16)
    },
    textTitle: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.7)
    },
    textPrice: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      //letterSpacing: toDp(1.2),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(5)
    },
    textMore: {
      color: '#5AAA0F'
    },
    textId: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.6),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    textDate: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.6),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(6)
    },
    viewStatus1: {
      backgroundColor: '#28A595',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(13),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(5)
    },
    viewRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 'auto'
    },
    textStatus: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      textAlign: 'right'
    },
    viewRowItem: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 'auto'
    },
    textDetails: {
      //fontFamily: 'Montserrat-Medium',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.7)
    },
    line: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1),
      backgroundColor: '#b0bec5',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24)
    },
    lineDetails: {
      width: '90%',
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1),
      backgroundColor: '#9B9F95',
      // marginTop: toDp(14),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8),
      alignSelf: 'center'
    },
    viewRenderInfo: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24)
    },
    viewPembayaran: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(72),
      backgroundColor: '#eeeeee',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(6),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      padding: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      flexDirection: 'row'
    },
    imgInfo: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24)
    },
    textInfo: {
      marginRight: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8),
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.29)
    },
    viewLihat: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1),
      borderColor: '#917438',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(32),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textLihat: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      color: '#917438',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.7)
    },
    touchBayar: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(141),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(40),
      backgroundColor: '#917438',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textBayar: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      color: 'white',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.7)
    },
    textTotal: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      color: 'black'
    },
    textValueTotal: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      color: 'black',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4)
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
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      flexDirection: 'row',
      alignItems: 'center'
    },
    textTitleModal: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1),
      color: '#263238',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    touchSilang: {},
    icSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      tintColor: '#917438'
    },
    textTransfer: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1),
      color: '#263238',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12)
    },
    viewRowItemVa: {
      width: '90%',
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(54),
      alignItems: 'center',
      flexDirection: 'row',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.5),
      borderBottomColor: '#b0bec5'
    },
    imageBank: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(50),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(50),
      resizeMode: 'contain'
    },
    textNameBank: {
      //fontFamily: 'Montserrat-Medium',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.7),
      color: '#263238',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    touchNext: {
      position: 'absolute',
      right: 0
    },
    icNext: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      tintColor: '#917438'
    },
    viewRowModal: {
      width: '90%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    textModalField: {
      //fontFamily: 'Montserrat-Medium',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.7),
      color: '#1c2028'
    },
    textModalValue: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.7),
      color: '#1c2028'
    },
    icCopy: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(18),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(18),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8)
    },
    modalRowTab: {
      width: '90%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    touchModalTab: {
      //width: toDp(70),
      width: 'auto',
      flex: 1,
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(44),
      backgroundColor: '#917438',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1),
      borderColor: '#917438',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4)
    },
    textTab: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.25),
      color: 'white',
      textAlign: 'center'
    },
    modalContent: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(6),
      backgroundColor: '#eeeeee',
      height: 'auto',
      padding: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12)
    },
    textContent: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.29),
      color: '#1c2028'
    },
    viewArrayStatus: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24)
    },
    touchFunction: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8)
    },
    textTitleFunction: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      color: '#917438'
      //fontFamily: 'Montserrat-SemiBold'
    },
    icBack: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      tintColor: '#917438'
    },
    header: {
      width: width,
      height: 'auto',
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1),
      borderBottomColor: '#917438',
      backgroundColor: 'white'
    },
    linearHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(60)
    },
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4),
      position: 'absolute',
      left: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      zIndex: 1
    },
    title: {
      color: '#917438',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(18),
      fontWeight: '600'
      //fontFamily: 'Montserrat-SemiBold',
    },
    icBack: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      tintColor: '#917438'
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    icExportTagihan: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      tintColor: '#5E6157'
    },
    header: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(60),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1),
      borderBottomColor: '#CCCFC9',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    linearHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(60)
    },
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4)
    },
    icBack: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      tintColor: '#383B34'
    },
    headerRow: {
      flexDirection: 'row'
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4)
    },
    icFilter: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      tintColor: '#383B34'
    },
    icSearch: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      tintColor: '#383B34'
    },
    title: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(18)
    },
    icCeklisTagihan: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24)
    },
    viewFooter: {
      // width,
      alignItems: 'center',
      borderTopColor: '#DDE3E0',
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10),
      paddingBottom: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16) : (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10)

      /*shadowColor: "#000",
      shadowOffset: {
      	width: 0,
      	height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,*/
    },
    touchFooter: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(250),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    touchFooterPayNow: {
      width: width - (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(36),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textFooter: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      color: 'white'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4)
    },
    icSilangModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
      tintColor: '#5E6157'
    },
    touchLabelItem: {
      //margin: toDp(24),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(50),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1),
      borderBottomColor: '#e9ebed',
      alignItems: 'center',
      flexDirection: 'row'
    },
    imgBank: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(40),
      resizeMode: 'contain',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    textLabel: {
      color: '#273238',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14)
    },
    imgButkbayar: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(40)
    },
    textTitleBukti: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(270)
    },
    textDateBukti: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      color: '#383B34'
    },
    imgBukti: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(80),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4)
    },
    textNoteBukti: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      color: '#383B34',
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(270)
    },
    viewBatas: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10),
      backgroundColor: '#F6F7F4',
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    }
  });
  var _default = exports.default = DetailsBillingScreen;
