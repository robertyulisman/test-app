  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _asyncStorage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _Empty = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _NoConnection = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _Toast = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[9]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[10]);
  var _reactNativeBlobUtil = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _reactNativeSharePdf = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[15]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[16]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  // make update

  var BillingScreen = function BillingScreen(props) {
    var toast = (0, _react.useRef)(null);
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[17]).useNetInfo)();
    var billingId = '03ce4913-9652-4169-a875-36c7b888f00b';
    var _useState = (0, _react.useState)({
        status: 'ongoing',
        unit: {},
        unit: props.route.params.unit,
        arrayData: [],
        arrayBackupData: [],
        loading: true,
        connection: true,
        darkMode: false,
        modalVisible: false,
        arrayTahun: []
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      loadUser();
      loadPaidUnpaid();
      var tempArrayTahun = [];
      tempArrayTahun.push({
        name: 'Semua',
        status: true
      });
      for (var i = (0, _moment.default)(new Date()).format('YYYY'); i >= 2014; i--) {
        tempArrayTahun.push({
          name: '' + i,
          status: false
        });
      }
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          arrayTahun: tempArrayTahun
        });
      });
    }, []);
    var loadUser = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* () {
        var unit = yield _asyncStorage.default.getItem('unit');
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            unit: JSON.parse(unit)
          });
        });
      });
      return function loadUser() {
        return _ref.apply(this, arguments);
      };
    }();
    var loadPaidUnpaid = function loadPaidUnpaid() {
      var params = "/" + state.status + "/" + (0, _moment.default)(new Date()).format('YYYYMM');
      (0, _$$_REQUIRE(_dependencyMap[18]).getBillingPaid)(params).then(function (response) {
        var tempArrayData = [];
        for (var i = 0; i < response.data.billing.length; i++) {
          if (response.data.billing[i].id) {
            tempArrayData.push(response.data.billing[i]);
          }
        }
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false,
            arrayData: tempArrayData,
            arrayBackupData: tempArrayData
          });
        });
      }).catch(function (error) {});
    };
    var convert = function convert(angka) {
      var rupiah = '';
      var angkarev = angka.toString().split('').reverse().join('');
      for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
      return rupiah.split('', rupiah.length - 1).reverse().join('');
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
    var renderStatusColor = function renderStatusColor(id) {
      if (id === 'b31b097a-8516-452c-a723-690388791735') return '#F2C141'; // Verifikasi
      if (id === '79c07edd-094e-4df5-bee2-12a430c4e1f1') return '#EE4040'; // Perbaikan pembayaran
      if (id === '6613a96f-0a4a-4091-9ba8-a0b30d9bf76c') return '#28A595'; // Sudah bayar
      if (id === 'd36080cc-58f6-449f-b082-c20066401bfb') return '#EE4040'; // Belum bayar
      if (id === 'da3393ce-4ca8-42bb-8632-533de7d31685') return '#EE4040'; // Belum bayar
    };
    var showMessage = function showMessage() {
      toast.current.show('Unduh Tagihan berhasil');
    };
    var handleDownloadSOA = function handleDownloadSOA() {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loading: true
        });
      });
      var params = '/' + state.unit.id;
      (0, _$$_REQUIRE(_dependencyMap[18]).postBillingSOAPDF)(params).then(function (response) {
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
      var fileName = "statement-of-account.pdf";
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
            // console.log('RESULT - 02', base64Data);
            showMessage();
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                loading: false
              });
            });
            setTimeout(function () {
              _reactNativeSharePdf.default.sharePDF(base64Data, fileName).then(function (res1) {
                // console.log('res1', res1);
              }).catch(function (err1) {
                // console.log('err1', err1);
              });
            }, 1000);
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
    var renderItem = function renderItem(_ref2) {
      var item = _ref2.item,
        index = _ref2.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        activeOpacity: 1,
        disabled: item.billing_status.id === 'd36080cc-58f6-449f-b082-c20066401bfb',
        onPress: function onPress() {
          if (item.id) {
            NavigatorService.navigate('DetailsBilling', {
              item: item,
              loadPaidUnpaid: loadPaidUnpaid,
              unit: state.unit
            });
          }
        },
        style: [styles.touchRow, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white'
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
      }, changeMonth(item.period)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewStatus1, {
          backgroundColor: renderStatusColor(item.billing_status.id)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        allowFontScaling: false,
        style: [styles.textStatus, {
          color: state.darkMode ? '#121212' : '#ffffff'
        }]
      }, item.billing_status.name))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textPrice, {
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, "Rp", ' ', item.billing_status.id === 'b31b097a-8516-452c-a723-690388791735' || item.billing_status.id === '79c07edd-094e-4df5-bee2-12a430c4e1f1' ? convert(item.total_remaining) : item.billing_status.id === 'd36080cc-58f6-449f-b082-c20066401bfb' ? convert(item.total_remaining) : convert(item.total_remaining)), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        allowFontScaling: false,
        style: [styles.textId, {
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, item.invoice_id), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, state.status === 'ongoing' ? /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [styles.textDate, {
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, '' + (state.status === 'ongoing' ? 'Batas bayar' : 'Waktu bayar') + ': ' + (item.due_date === null ? '-' : (0, _moment.default)(item.due_date).format('DD MMMM YYYY'))) : /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [styles.textDate, {
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, '' + (state.status === 'ongoing' ? 'Batas bayar' : 'Waktu bayar') + ': ' + (item.payment_timestamp === null ? '-' : (0, _moment.default)(item.payment_timestamp).format('DD MMMM YYYY')))), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [styles.textDate, {
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "type :", ' ', (item == null ? undefined : item.type) === 'MONTHLY_BILL' ? 'Tagihan Bulanan' : item.type === 'AGING_INSTALLMENT' ? 'Cicilan Aging' : 'Cicilan Tunggakan'))));
    };
    var renderItemShimmer = function renderItemShimmer(_ref3) {
      var item = _ref3.item,
        index = _ref3.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewCenter
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: styles.loadingShimmer
      }));
    };
    var renderItemTahun = function renderItemTahun(_ref4) {
      var item = _ref4.item,
        index = _ref4.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false,
              arrayTahun: state.arrayTahun.map(function (value, i) {
                return Object.assign(Object.assign({}, value), {}, {
                  status: index === i
                });
              }),
              arrayData: item.name === 'Semua' ? state.arrayBackupData : state.arrayBackupData.filter(function (data) {
                return data.period.includes(item.name);
              })
            });
          });
        },
        style: [styles.touchLabelItem, {
          borderBottomColor: state.darkMode ? '#1C1C1E' : '#e9ebed'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: item.status ? 'semibold' : 'regular',
        allowFontScaling: false,
        style: [styles.textLabel, {
          color: state.darkMode ? 'white' : '#273238'
        }]
      }, item.name), item.status && /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[19]).allLogo.icCeklisTagihan,
        style: styles.icCeklisTagihan
      }));
    };
    var renderModalFilter = function renderModalFilter() {
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
      }, "TAHUN TAGIHAN"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSilang,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[19]).allLogo.icSilang,
        style: styles.icSilangModal
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewArrayStatus
      }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
        data: state.arrayTahun,
        renderItem: renderItemTahun,
        numColumns: 1,
        ListFooterComponent: function ListFooterComponent() {
          return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
            style: {
              height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(80)
            }
          });
        }
      })))));
    };
    var renderHeader = function renderHeader() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.header, {
          backgroundColor: 'white',
          borderBottomColor: '#CCCFC9'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(90)
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHeader,
        onPress: function onPress() {
          return props.navigation.goBack();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[19]).allLogo.icBack,
        style: styles.icBack
      }))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: styles.title
      }, 'Tagihan'), state.status === 'paid' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(90),
          alignItems: 'flex-end'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.headerRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHeaderSearch,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: true
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[19]).allLogo.icFilter,
        style: styles.icFilter
      })))) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(90),
          alignItems: 'flex-end'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.headerRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHeaderSearch,
        onPress: handleDownloadSOA
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[19]).allLogo.icExportTagihan,
        style: styles.icFilter
      })))));
    };
    (0, _react.useEffect)(function () {
      loadPaidUnpaid();
    }, [state.status]);
    var renderSection = function renderSection() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.tab, {
          borderBottomColor: state.darkMode ? '#1C1C1E' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touch,
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: true,
              status: 'ongoing',
              arrayTahun: state.arrayTahun.map(function (value, i) {
                return Object.assign(Object.assign({}, value), {}, {
                  status: i === 0
                });
              })
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.text, {
          color: state.darkMode ? 'white' : state.status === 'ongoing' ? '#5AAA0F' : '#CCCFC9'
        }]
      }, "Berjalan"), state.status === 'ongoing' && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.line, {
          backgroundColor: state.darkMode ? 'white' : '#5AAA0F'
        }]
      })), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touch,
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: true,
              status: 'paid',
              arrayTahun: state.arrayTahun.map(function (value, i) {
                return Object.assign(Object.assign({}, value), {}, {
                  status: i === 0
                });
              })
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.text, {
          color: state.darkMode ? 'white' : state.status === 'paid' ? '#5AAA0F' : '#CCCFC9'
        }]
      }, "Riwayat"), state.status === 'paid' && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.line, {
          backgroundColor: state.darkMode ? 'white' : '#5AAA0F'
        }]
      })));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Toast.default, {
      ref: toast
    }), renderModalFilter(), renderHeader(), renderSection(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.content, {
        backgroundColor: state.darkMode ? '#121212' : '#F6F7F4'
      }]
    }, !netInfo.isConnected ? /*#__PURE__*/_react.default.createElement(_NoConnection.default, null) : state.arrayData.length === 0 && !state.loading ? /*#__PURE__*/_react.default.createElement(_Empty.default, {
      title: 'Belum ada tagihan baru',
      subtitle: 'Tagihan baru akan muncul diantara tanggal 1-5 disetiap bulannya.',
      images: _$$_REQUIRE(_dependencyMap[19]).allLogo.imgEmptyNews
    }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      data: state.loading ? ['', '', '', '', '', '', '', ''] : state.arrayData,
      renderItem: state.loading ? renderItemShimmer : renderItem,
      ListFooterComponent: /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24)
        }
      })
    }), state.status === 'ongoing' && state.arrayData.length > 0 && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        NavigatorService.navigate('DetailsBilling', {
          item: state.arrayData[0],
          dataBilling: state.arrayData,
          loadPaidUnpaid: loadPaidUnpaid,
          unit: state.unit
        });
      },
      style: {
        backgroundColor: '#5AAA0F',
        paddingHorizontal: 16,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
        borderRadius: 12
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      allowFontScaling: false,
      style: [styles.text, {
        color: 'white'
      }]
    }, "Selanjutnya")))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f7f8'
    },
    headeriOS: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    tab: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(40),
      flexDirection: 'row',
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(1),
      borderBottomColor: '#dadada'
    },
    touch: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    text: {
      color: '#5AAA0F',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(0.07)
    },
    line: {
      backgroundColor: '#5AAA0F',
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(2),
      position: 'absolute',
      bottom: 0
    },
    content: {
      flex: 1,
      backgroundColor: '#f5f7f8'
    },
    containerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(8)
    },
    cards: {
      width: '95%',
      height: 'auto',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(5),
      backgroundColor: '#FFFFFF',
      elevation: 2,
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16),
      paddingRight: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16),
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16),
      shadowOpacity: 0.2,
      shadowOffset: {
        height: 1,
        width: 0
      },
      shadowColor: '#000000',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(8),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(8),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(8),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(8)
    },
    cardHeader: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    months: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16),
      color: '#333'
      //fontFamily: 'Montserrat-Bold'
    },
    price: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(18),
      color: '#333'
      //fontFamily: 'Montserrat-Regular'
    },
    cardDate: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16),
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    logo: {
      width: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(25),
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(25),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(5),
      alignItems: 'center',
      justifyContent: 'center'
    },
    icon: {
      maxWidth: '100%',
      resizeMode: 'contain'
    },
    cardDetails: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(10),
      width: '100%',
      flexDirection: 'row'
    },
    date: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(12),
      color: '#666',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(20)
      //fontFamily: 'Montserrat-Regular'
    },
    invoiceNumber: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(14),
      color: '#666',
      alignItems: 'flex-start'
      //fontFamily: 'Montserrat-Regular'
    },
    logoContainer: {
      width: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16),
      alignItems: 'center',
      justifyContent: 'center'
    },
    icNext: {
      width: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24),
      tintColor: '#5AAA0F'
    },
    due: {
      color: 'red',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(12)
    },
    viewCenter: {
      width: width,
      alignItems: 'center'
    },
    loadingShimmer: {
      width: '92%',
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(136),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(5),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16)
    },
    touchRow: {
      width: width,
      height: 'auto',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(4),
      backgroundColor: '#FFFFFF',
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(4),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(4)
    },
    viewStatus: {
      width: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(8),
      height: 'auto',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(4),
      borderBottomLeftRadius: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(4)
    },
    viewRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 'auto',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(-8)
    },
    textTitle: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(0.7)
    },
    textPrice: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(0.8),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(8)
    },
    textId: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(12),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(0.6),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(8)
    },
    textDate: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(12),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(0.6),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(4)
    },
    viewStatus1: {
      backgroundColor: '#f2c141',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(12),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(10),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(3)
    },
    textStatus: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(12),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(0.5)
    },
    dateRow: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(14),
      fontWeight: '300',
      color: '#616161'
    },
    viewRootRow: {
      flex: 1,
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(20),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16)
    },
    rowInvoice: {
      flexDirection: 'row',
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(8),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(8)
    },
    viewRowHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(8),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(8),
      height: 'auto',
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0'
    },
    titleHeader: {
      color: '#F44336',
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(12),
      fontWeight: '300',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(8),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(8)
    },
    viewRowFooter: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(50),
      flexDirection: 'row'
    },
    iconNext: {
      width: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24),
      tintColor: '#5AAA0F',
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(-5)
    },
    titleFooter: {
      textAlign: 'center',
      color: '#424242',
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(12),
      fontWeight: '300',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16)
    },
    viewDetails: {
      flexDirection: 'row',
      alignItems: 'flex-end'
    },
    textDetail: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(12),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(0.7),
      color: '#5AAA0F'
    },
    header: {
      width: width,
      height: 'auto',
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(1),
      borderBottomColor: '#5AAA0F',
      backgroundColor: 'white'
    },
    linearHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(60)
    },
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(4),
      position: 'absolute',
      left: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16),
      zIndex: 1
    },
    icBack: {
      //marginHorizontal: toDp(8),
      width: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24),
      tintColor: '#5AAA0F'
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(4),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16)
    },
    icFilter: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(14),
      width: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24),
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
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(360),
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(1),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(4)
    },
    icSilangModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(20),
      tintColor: '#5E6157'
    },
    touchLabelItem: {
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(50),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(1),
      borderBottomColor: '#e9ebed',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    textLabel: {
      color: '#273238',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(14)
      //fontFamily: 'Montserrat-Regular',
    },
    header: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(60),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(1),
      borderBottomColor: '#CCCFC9',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16)
    },
    linearHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(60)
    },
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(4)
    },
    icBack: {
      width: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(16),
      tintColor: '#383B34'
    },
    headerRow: {
      flexDirection: 'row'
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(4)
    },
    icFilter: {
      width: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24),
      tintColor: '#383B34'
    },
    icSearch: {
      width: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24),
      tintColor: '#383B34'
    },
    title: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(18)
    },
    icCeklisTagihan: {
      width: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[20]).toDp)(24)
    }
  });
  var _default = exports.default = BillingScreen;
