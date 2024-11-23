  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _CustomTextInput = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _CustomTime = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _reactNativeModalDatetimePicker = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _this = this;
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var LayananScreen = function LayananScreen(props) {
    var _useState = (0, _react.useState)({
        title: props.route.params.item.name,
        isShowModalConfirm: false,
        isShowSuccessModal: false,
        content: 'form',
        // form / confrim
        connection: true,
        subTotal: 0,
        admin: 5000,
        grandTotal: 0,
        loading: true,
        darkMode: false,
        modalVisibleTime: false,
        modalVisible: false,
        responseTime: '0',
        modalVisibleDate: false,
        responseDate: '',
        catatan: '',
        dataUser: {},
        arrLayanan: [],
        unit: {},
        user: {},
        defaultDate: new Date(),
        defaultTime: new Date(),
        loadingDialog: false,
        touch: true,
        modalConfirm: false,
        arrayTime: ['09.00', '09.30', '10.00', '10.30', '11.00', '11.30', '12.00', '12.30', '13.00', '13.30', '14.00', '14.30', '15.00', '15.30', '16.00', '16.30'],
        tempArrayTime: ['09.00', '09.30', '10.00', '10.30', '11.00', '11.30', '12.00', '12.30', '13.00', '13.30', '14.00', '14.30', '15.00', '15.30', '16.00', '16.30'],
        searchValue: '',
        activeSearch: false,
        minimumDate: new Date(),
        idOrder: ''
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      getDetailsData();
    }, []);
    var getDetailsData = function getDetailsData() {
      (0, _$$_REQUIRE(_dependencyMap[11]).getServices)('' + props.route.params.item.id).then(function (response) {
        if (response.data.services.length === 0) {
          _reactNative.Alert.alert('Jenis Layanan ' + state.title + ' belum tersedia', '', [{
            text: 'Kembali',
            onPress: function onPress() {
              props.navigation.goBack();
            }
          }], {
            cancelable: false
          });
          return;
        }
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false,
            arrLayanan: response.data.services.map(function (data) {
              return Object.assign(Object.assign({}, data), {}, {
                quantity: 0
              });
            })
          });
        });
      }).catch(function (error) {});
      (0, _$$_REQUIRE(_dependencyMap[11]).getServiceCurrentTime)().then(function (response) {
        var minimumDate = new Date(response.data.date);
        minimumDate.setDate(minimumDate.getDate() + 1);
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            minimumDate: minimumDate
          });
        });
        //setState(state => ({...state, minimumDate: new Date(response.data.date)}))
      }).catch(function (error) {});
    };
    (0, _react.useEffect)(function () {
      var subTotal = 0;
      state.arrLayanan.map(function (data) {
        subTotal += data.quantity * data.price;
      });
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          subTotal: subTotal
        });
      });
    }, [state.arrLayanan]);
    var minPlus = function minPlus(id, operator) {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          arrLayanan: state.arrLayanan.map(function (data) {
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
    var renderItem = function renderItem(_ref) {
      var item = _ref.item,
        index = _ref.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        numberOfLines: 2,
        ellipsizeMode: "tail",
        textType: "semibold",
        style: [styles.textName, {
          color: state.darkMode ? 'white' : '#1C2028'
        }]
      }, item.name), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        numberOfLines: 2,
        ellipsizeMode: "tail",
        style: [styles.textDesc, {
          color: state.darkMode ? 'white' : '#939599'
        }]
      }, item.description), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        numberOfLines: 1,
        ellipsizeMode: "tail",
        style: [styles.textVendor, {
          color: state.darkMode ? 'white' : '#939599'
        }]
      }, item.service_vendor.name), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewPrice, {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8)
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: '54%',
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
          height: 'auto'
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        numberOfLines: 1,
        ellipsizeMode: "tail",
        textType: "medium",
        style: [styles.textPrice, {
          color: state.darkMode ? 'white' : '#1C2028',
          width: '100%'
        }]
      }, 'Rp ' + convert(item.price) + (item.unit.includes('/') ? item.unit : '/' + item.unit))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.row
      }, item.quantity === 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
          return minPlus(item.id, '-');
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
          return minPlus(item.id, '+');
        },
        style: styles.touchMinPlus
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textMinPlus
      }, '+')))));
    };
    var convert = function convert(amount) {
      var reverse = amount.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
      ribuan = ribuan.join('.').split('').reverse().join('');
      return ribuan;
    };
    var renderLayanan = function renderLayanan() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: width,
          height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
          backgroundColor: '#EEEEEE'
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewFormLayanan, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
        data: state.arrLayanan,
        renderItem: state.loading ? /*#__PURE__*/_react.default.createElement(_reactNative.View, null) : renderItem,
        ItemSeparatorComponent: function ItemSeparatorComponent() {
          return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
            style: [styles.line, {
              backgroundColor: state.darkMode ? '#121212' : '#EEEEEE'
            }]
          });
        },
        ListFooterComponent: function ListFooterComponent() {
          return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
            style: {
              height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(48)
            }
          });
        }
      })));
    };
    var renderKontak = function renderKontak() {
      var _state$unit, _state$unit2;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          backgroundColor: 'white',
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPukul, {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "DETAIL PEMESAN"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewFormLayanan, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
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
      }, state.user.name)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icMail,
        style: [styles.icCalendar2, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textName2, {
          color: state.darkMode ? 'white' : '#5E6157',
          marginBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0)
        }]
      }, state.user.email)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icPhone,
        style: [styles.icCalendar2, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textName2, {
          color: state.darkMode ? 'white' : '#5E6157',
          marginBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0)
        }]
      }, state.user.phone)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
      }, ((_state$unit = state.unit) == null ? undefined : _state$unit.code) + '\n' + ((_state$unit2 = state.unit) == null ? undefined : _state$unit2.unit_name))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
      }, (0, _moment.default)(state.responseDate).format('dddd, DD MMMM YYYY'))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textTime2, {
          color: state.darkMode ? 'white' : '#5E6157'
        }]
      }, state.responseTime)));
    };
    var renderDate = function renderDate() {
      //var date = new Date();
      //date.setDate(date.getDate() + 1);
      //console.log('date', date);
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
          padding: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
          backgroundColor: 'white'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNativeModalDatetimePicker.default, {
        headerTextIOS: 'Kapan Anda membutuhkan layanan ini?',
        display: _reactNative.Platform.OS === 'ios' ? 'inline' : 'default',
        mode: 'date',
        isDarkModeEnabled: state.darkMode,
        isVisible: state.modalVisibleDate,
        onConfirm: function onConfirm(response) {
          var filterArrayTime = [];
          //if(moment(new Date()).format('DD MMMM YYYY') === moment(response).format('DD MMMM YYYY')) {

          {
            for (var i = 0; i < state.tempArrayTime.length; i++) {
              filterArrayTime.push(state.tempArrayTime[i]);
            }
          }
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              responseDate: response,
              defaultDate: response,
              modalVisibleDate: false,
              arrayTime: filterArrayTime,
              responseTime: '0'
            });
          });
        },
        onCancel: function onCancel() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisibleDate: false
            });
          });
        }
        //date={date}
        //minimumDate={date}
        ,
        date: state.minimumDate,
        minimumDate: state.minimumDate
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPukul, {
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "Kapan Anda membutuhkan layanan ini?"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisibleDate: true
            });
          });
        },
        style: [styles.viewValueForm, {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
          justifyContent: 'flex-start',
          flexDirection: 'row',
          backgroundColor: state.darkMode ? '#121212' : '#EEEEEE',
          borderColor: state.darkMode ? '#121212' : '#d8d8d8',
          borderWidth: 0
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icCalendar,
        style: [styles.icCalendar, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textTime, {
          color: state.responseDate !== '' ? '#5E6157' : '#9B9F95'
        }]
      }, state.responseDate === '' ? 'Pilih tanggal pelayanan' : (0, _moment.default)(state.responseDate).format('DD MMMM YYYY'))), /*#__PURE__*/_react.default.createElement(_CustomTime.default, {
        title: 'Pukul berapa layanan ini akan dikerjakan?',
        textPlaceholder: 'Silahkan Pilih',
        value: state.responseTime,
        arrayData: state.arrayTime,
        darkMode: state.darkMode,
        onSelected: function onSelected(item, index) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              responseTime: item
              //defaultTime: item
            });
          });
        }
      }));
    };
    var renderCatatan = function renderCatatan() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24) : (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
          backgroundColor: 'white',
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textPukul, {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "Catatan", ' ', /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: {
          fontStyle: 'italic',
          color: '#9B9F95'
        }
      }, "(optional)")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewFormLayanan, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
        title: '',
        placeholder: 'Tambahkan catatan untuk layanan',
        error: '',
        value: state.catatan,
        onChangeText: function onChangeText(catatan) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              catatan: catatan
            });
          });
        },
        autoFocus: false,
        returnKeyType: 'done',
        maxLength: 200
      })));
    };
    var renderFooter = function renderFooter() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.footer, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          borderTopColor: state.darkMode ? '#1C1C1E' : '#EEEEEE'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewFooter
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textEstimase, {
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, "Estimasi Harga"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textHarga, {
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, "Rp ", convert(state.subTotal))), state.subTotal !== 0 && state.responseTime !== '0' && state.responseDate !== '' ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          var tanggal = (0, _moment.default)(state.responseDate).format('YYYY-MM-DD');
          //let jam = moment(state.responseTime).format('LTS').replace('.',':').replace('.',':')
          var jam = state.responseTime.replace('.', ':');
          var time = '' + tanggal + 'T' + (jam + ':00') + '.000Z';
          var services = [];
          for (var i = 0; i < state.arrLayanan.length; i++) {
            if (state.arrLayanan[i].quantity >= 1) {
              var obj = {
                id: state.arrLayanan[i].id,
                quantity: state.arrLayanan[i].quantity
              };
              services.push(obj);
            }
          }
          var body = {
            service_category_id: props.route.params.item.id,
            time: time,
            services: services
          };
          (0, _$$_REQUIRE(_dependencyMap[11]).postServiceOrdersConfirmation)(body).then(function (response) {
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                subTotal: response.data.total_price,
                admin: response.data.admin_price,
                grandTotal: response.data.total_price + response.data.admin_price,
                content: 'confrim',
                unit: response.data.unit,
                user: response.data.user,
                title: 'Konfirmasi Pesanan'
              });
            });

            /*const self = this
            setTimeout(function () {
              self.scroll.scrollTo({x: 0, y: 0, animated: true});
            }, 10);*/
          }).catch(function (error) {
            // @ts-expect-error TS(2304): Cannot find name 'alert'.
            alert(error.data.message);
          });
        },
        style: [styles.touchKirim, {
          flex: 1,
          backgroundColor: '#5AAA0F'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: styles.textKirim
      }, "Selanjutnya")) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.touchKirim, {
          flex: 1,
          backgroundColor: '#CCCFC9'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: styles.textKirim
      }, "Selanjutnya")));
    };
    var renderItemDetail = function renderItemDetail(_ref2) {
      var item = _ref2.item,
        index = _ref2.index;
      if (item.quantity >= 1) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.detailRow
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          numberOfLines: 2,
          ellipsizeMode: "tail",
          textType: 'semibold',
          style: [styles.textNameDetail, {
            color: state.darkMode ? 'white' : '#383B34'
          }]
        }, item.name)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
            paddingBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
            alignItems: 'center'
          }
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          style: [styles.textQtyDetail, {
            color: state.darkMode ? 'white' : '#9B9F95'
          }]
        }, item.quantity + 'x'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          style: [styles.textPriceDetail, {
            color: state.darkMode ? 'white' : '#383B34'
          }]
        }, 'Rp ' + convert(item.price))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [styles.lineDetail, {
            marginBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
            backgroundColor: state.darkMode ? '#121212' : '#EEEEEE'
          }]
        }));
      }
    };
    var renderFooterDetail = function renderFooterDetail() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.detailRow, {
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textSubTotal, {
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, "Sub Total"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPriceDetail, {
          fontWeight: '700',
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, 'Rp ' + convert(state.subTotal))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.lineDetail, {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
          backgroundColor: state.darkMode ? '#121212' : '#EEEEEE'
        }]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.detailRow, {
          paddingVertical: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0),
          paddingTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textSubTotal, {
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, "Grand Total"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPriceDetail, {
          fontWeight: '700',
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, 'Rp ' + convert(state.grandTotal))));
    };
    var renderDetails = function renderDetails() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
          backgroundColor: 'white'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
          marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
          marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
          alignItems: 'center',
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textPukul, {
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "LAYANAN"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              content: 'form'
            });
          });
        },
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(61),
          height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
          justifyContent: 'center',
          alignItems: 'center'
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: {
          color: '#5AAA0F'
        }
      }, "Ubah"))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewFormLayanan, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
        data: state.arrLayanan,
        renderItem: renderItemDetail,
        ListFooterComponent: function ListFooterComponent() {
          return renderFooterDetail();
        }
      })));
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
          height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(240)
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
      }, "Pesanan akan terhapus jika Anda membatalkan. Apakah Anda yakin ingin membatalkan pesanan jasa ini?"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
          width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchYa,
        onPress: function onPress() {
          return props.navigation.goBack();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textYa
      }, "Ya, Batalkan"))))));
    };
    var renderFooterConfirm = function renderFooterConfirm() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.footerConfirm, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          borderTopColor: state.darkMode ? '#1C1C1E' : '#EEEEEE'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewFooterConfrim
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          {
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                loadingDialog: true
              });
            });
            {
              var tanggal = (0, _moment.default)(state.responseDate).format('YYYY-MM-DD');
              //let jam = moment(state.responseTime).format('LTS').replace('.',':').replace('.',':')
              var jam = state.responseTime.replace('.', ':');
              var time = '' + tanggal + 'T' + (jam + ':00') + '.000Z';
              var services = [];
              for (var i = 0; i < state.arrLayanan.length; i++) {
                if (state.arrLayanan[i].quantity >= 1) {
                  var obj = {
                    id: state.arrLayanan[i].id,
                    quantity: state.arrLayanan[i].quantity
                  };
                  services.push(obj);
                }
              }
              var body = {
                service_category_id: props.route.params.item.id,
                note: state.catatan,
                time: time,
                services: services
              };
              var self = _this;
              (0, _$$_REQUIRE(_dependencyMap[11]).postServiceOrdersCreate)(body).then(function (response) {
                setState(function (prevState) {
                  return Object.assign(Object.assign({}, prevState), {}, {
                    loadingDialog: false,
                    isShowSuccessModal: true,
                    idOrder: response.data.service_order.id
                  });
                });
              }).catch(function (error) {
                _reactNative.Alert.alert('Pesan Jasa', '' + error.data.message, [{
                  text: 'OK',
                  onPress: function onPress() {
                    setState(function (state) {
                      return Object.assign(Object.assign({}, state), {}, {
                        loadingDialog: false
                      });
                    });
                  }
                }], {
                  cancelable: false
                });
              });
            }
          }
        },
        style: styles.touchPesan
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: styles.textKirim
      }, "Pesan Jasa"))));
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
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icSuccess,
        style: styles.icSuccess
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
          color: '#263238',
          marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24)
        }
      }, "PESANAN JASA BERHASIL"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
          color: '#263238',
          marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
          textAlign: 'center'
        }
      }, "Pesanan jasa Anda akan segera direspon oleh pengelola"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowSuccessModal: false
            });
          });
          props.navigation.goBack();
          props.route.params.setContentPesanan();
        },
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(180),
          height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
          marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
          backgroundColor: '#5AAA0F',
          borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
          justifyContent: 'center',
          alignItems: 'center'
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: {
          fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
          color: 'white'
        }
      }, "Okay")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
        }
      }))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
      behavior: _reactNative.Platform.OS === 'ios' ? 'padding' : null,
      style: styles.container
    }, renderModalConfirmation(), renderModalSuccess(), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: state.title,
      onPress: function onPress() {
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isShowModalConfirm: true
          });
        });
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      style: [styles.scrollView, {
        backgroundColor: state.darkMode ? '#121212' : '#F6F7F8'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.content, {
        backgroundColor: state.darkMode ? '#121212' : '#F6F7F8'
      }]
    }, state.content === 'form' ? renderDate() : renderKontak(), state.content === 'form' ? renderLayanan() : renderDetails(), state.content === 'form' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, null) : renderCatatan())), state.content === 'form' ? renderFooter() : renderFooterConfirm()));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    headeriOS: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    scrollView: {},
    content: {
      flex: 1
      //padding: toDp(16)
    },
    viewInfo: {
      padding: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20)
    },
    textTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      //fontFamily: 'Montserrat-Bold',
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.5)
    },
    img: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(300),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(162),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20)
      //marginRight: toDp(10),
    },
    viewItem: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20)
    },
    textField: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#788f9c'
    },
    textValue: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#000000'
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: width,
      height: 'auto',
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1)
    },
    footerConfirm: {
      width: width,
      height: 'auto',
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1)
    },
    touchKirim: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(150),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      backgroundColor: '#d3d6db',
      margin: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKirim: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      color: 'white',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.7)
    },
    textEstimase: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12)
      //fontFamily: 'Montserrat-Regular',
    },
    textHarga: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
      //fontFamily: 'Montserrat-SemiBold',
    },
    red: {
      color: '#f5493c'
    },
    textPukul: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
      //fontFamily: 'Montserrat-Bold',
      //letterSpacing: toDp(0.5),
      //textTransform:'uppercase'
    },
    icVendor: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(6)
    },
    viewForm: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      width: '100%',
      height: 'auto',
      padding: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      justifyContent: 'center',
      alignItems: 'center'
    },
    viewValueForm: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      borderColor: '#D8D8D8',
      backgroundColor: '#EEEEEE',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textTime: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14)
      //fontFamily: 'Montserrat-Regular',
    },
    icCalendar: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
    },
    icCalendar2: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20)
    },
    viewFormLayanan: {
      //marginTop: toDp(16),
      width: '100%',
      height: 'auto'
      //paddingHorizontal: toDp(12),
      /*borderRadius: toDp(4),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,*/
      //justifyContent: 'center',
      //alignItems: 'center'
    },
    textName: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      //fontFamily: 'Montserrat-Bold',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.5),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12)
    },
    viewUbah: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    touchUbah: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(42),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: '#5AAA0F',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2)
    },
    textUbah: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      //fontFamily: 'Montserrat-SemiBold',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.5),
      color: '#5AAA0F'
    },
    textDesc: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      //letterSpacing: toDp(0.5),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(6)
    },
    textVendor: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      //letterSpacing: toDp(0.5),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12)
    },
    textPrice: {
      //fontFamily: 'Montserrat-Regular',
      //fontWeight: 'bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.5),
      width: width * 0.84
    },
    line: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      backgroundColor: '#EEEEEE',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12)
    },
    viewPrice: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      //marginTop: toDp(-16),
      //backgroundColor: '#121212',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    textQty: {
      textAlign: 'center',
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(28),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: 'bold',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.5),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10)
    },
    touchMinPlus: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      borderColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textMinPlus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: 'bold',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.5),
      color: '#5AAA0F',
      marginLeft: _reactNative.Platform.OS === 'ios' ? (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1) : 0
    },
    viewFooterConfrim: {
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    touchKembali: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(124),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      borderColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    touchPesan: {
      width: '100%',
      //width: toDp(193),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
    },
    icBack: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8)
    },
    viewRow: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      flexDirection: 'row',
      alignItems: 'center'
    },
    textDate: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: '600',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.5)
    },
    textTime2: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(44),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: '500'
    },
    line2: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      backgroundColor: '#EEEEEE',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
    },
    textName2: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: '500'
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      alignItems: 'center'
    },
    lineDetail: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      backgroundColor: '#EEEEEE'
    },
    textPriceDetail: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14)
      //fontFamily: 'Montserrat-Regular',
      //fontWeight: '500',
    },
    textNameDetail: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14)
      //fontFamily: 'Montserrat-Regular',
      //fontWeight: '600',
    },
    textQtyDetail: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: '600',
      fontStyle: 'italic'
    },
    textSubTotal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: '700'
    },
    textCatatanIOS: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      color: 'red',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8)
    },
    lineIOS: {
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      backgroundColor: '#788F9C',
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24)
    },
    bottomModal: {
      justifyContent: 'center',
      margin: 0
    },
    viewRootModal: {
      width: width,
      alignItems: 'center'
      //position: 'absolute',
      //bottom: 0
    },
    modalBox: {
      width: '90%',
      height: 'auto',
      backgroundColor: '#FFFFFF',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      padding: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewCenter: {
      width: width,
      alignItems: 'center'
    },
    lineModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(64),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(7),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(15)
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      top: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      zIndex: 1
    },
    icSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      tintColor: '#5AAA0F'
    },
    touchOk: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
    },
    textApakah: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      textAlign: 'center',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.6)
    },
    // touchTidak: {
    //   width: toDp(80),
    //   height: toDp(30),
    //   backgroundColor: '#5AAA0F',
    //   borderRadius: toDp(4),
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    // textTidak: {
    //   fontSize: toDp(14),
    //   //fontFamily: 'Montserrat-SemiBold',
    //   color: '#FFFFFF',
    //   letterSpacing: toDp(0.7),
    // },
    // touchYa: {
    //   width: toDp(125),
    //   height: toDp(30),
    //   justifyContent: 'center',
    //   alignItems: 'center',
    // },
    // textYa: {
    //   fontSize: toDp(14),
    //   //fontFamily: 'Montserrat-SemiBold',
    //   color: '#5AAA0F',
    //   letterSpacing: toDp(0.7),
    // },
    // modalBoxCenter: {
    //   width: width * 0.8,
    //   height: toDp(168),
    //   borderRadius: toDp(8),
    //   alignItems: 'center',
    // },
    // titleConfirm: {
    //   marginTop: toDp(24),
    //   fontSize: toDp(14),
    //   //fontFamily: 'Montserrat-Bold',
    //   color: '#263238',
    //   letterSpacing: toDp(0.7),
    // },
    viewRowModal: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      flexDirection: 'row'
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10)
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      //borderWidth: toDp(1),
      //borderColor: '#5AAA0F',
      //marginLeft: toDp(8),
      //marginRight: toDp(16),
      //flex: 1,
      width: '100%',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      backgroundColor: '#F6F7F4'
    },
    icSearch: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      tintColor: '#9B9F95',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14)
    },
    textInput: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      width: '80%',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#383B34'
      //fontFamily: 'Montserrat-Regular',
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12)
    },
    icDeleteAll: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20)
    },
    viewFooter: {
      flex: 1,
      padding: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
      //justifyContent: 'center',
      //alignItems: 'center'
    },
    footerLinear: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2),
      opacity: 0.2,
      position: 'absolute',
      bottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80)
    },
    viewModalCenter: {
      width: 'auto',
      height: 'auto',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalBoxCenter: {
      width: width * 0.8,
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(200),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      alignItems: 'center'
    },
    titleConfirm: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.7)
    },
    textApakah2: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(30),
      textAlign: 'center',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#263238',
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24)
    },
    viewRow2: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      flexDirection: 'row'
    },
    touchTidak: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(110),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textTidak: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.7)
    },
    touchYa: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(110),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      borderColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10)
    },
    textYa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.7)
    },
    icSuccess: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(70),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(70),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      tintColor: '#5AAA0F'
    }
  });
  var _default = exports.default = LayananScreen;
