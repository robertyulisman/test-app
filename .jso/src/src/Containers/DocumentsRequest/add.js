  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _NoConnection = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _CustomComboBox = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _CustomTextArea = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _CustomTextInput = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _Toast = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _asyncStorage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[15]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);
  var limit = 0;
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var AddDocumentsRequestScreen = function AddDocumentsRequestScreen(props) {
    var _state$unit;
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[16]).useNetInfo)();
    var toast = (0, _react.useRef)(null);
    var _useState = (0, _react.useState)({
        dataUser: props.route.params.dataUser,
        loading: false,
        idLayanan: '',
        layanan: '',
        desciption: '',
        errorDesciption: '',
        arrayLayanan: [],
        unit: null
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      var fetchData = /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)(function* () {
          var unit = yield _asyncStorage.default.getItem('unit');
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              unit: JSON.parse(unit)
            });
          });
        });
        return function fetchData() {
          return _ref.apply(this, arguments);
        };
      }();
      fetchData().catch(function () {});
    }, []);
    (0, _react.useEffect)(function () {
      (0, _$$_REQUIRE(_dependencyMap[17]).getDocumentsAll)().then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            arrayLayanan: response.data.data
          });
        });
      }).catch(function (error) {});
    }, []);
    var submit = function submit() {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loading: true
        });
      });
      var data = {
        user_id: state.dataUser.id,
        unit_id: state.unit.id,
        document_id: state.idLayanan,
        description: state.desciption
      };
      (0, _$$_REQUIRE(_dependencyMap[17]).postDocumentsRequestCreate)(data).then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false
          });
        });
        props.navigation.goBack();
        props.route.params.showMessageSuccess();
        props.route.params.loadComplains();
      }).catch(function (error) {});
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Add Documents Request',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.loading
    }), /*#__PURE__*/_react.default.createElement(_Toast.default, {
      ref: toast
    }), !netInfo.isConnected ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewCenterNoConnecttion
    }, /*#__PURE__*/_react.default.createElement(_NoConnection.default, null)) : /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      style: styles.viewTextTitle
    }, /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
      title: 'Unit',
      placeholder: 'Unit anda saat ini',
      error: '',
      value: (_state$unit = state.unit) == null ? undefined : _state$unit.unit_name,
      editable: false
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(16)
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
      title: 'Nama Lengkap',
      placeholder: 'Masukan nama lengkap (sesuai KTP)',
      error: '',
      value: state.dataUser.name,
      editable: false
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(16)
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
      title: 'Email',
      placeholder: 'Masukkan email',
      error: '',
      value: state.dataUser.email,
      editable: false
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(16)
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
      title: 'Phone',
      placeholder: 'Masukan phone',
      error: '',
      value: state.dataUser.phone,
      editable: false
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(16)
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomComboBox.default, {
      title: 'Layanan',
      desc: '',
      textPlaceholder: 'Pilih layanan',
      value: state.layanan,
      arrayData: state.arrayLayanan,
      onSelected: function onSelected(item, index) {
        return setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            layanan: item.name,
            idLayanan: item.id
          });
        });
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(16)
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomTextArea.default, {
      title: 'Desciption (optional)',
      placeholder: 'Masukkan isi desciption',
      error: state.errorDesciption,
      value: state.desciption,
      onChangeText: function onChangeText(desciption) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            desciption: desciption
          });
        });
        if (desciption.trim() === '') {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              errorDesciption: 'Field ini tidak boleh kosong.'
            });
          });
        } else {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              errorDesciption: ''
            });
          });
        }
      },
      autoCapitalize: 'sentences',
      returnKeyType: 'next'
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(70)
      }
    }), state.layanan === '' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.touchKirim, {
        backgroundColor: '#CCCFC9'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      allowFontScaling: false,
      style: styles.textKirim
    }, "SUBMIT")) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchKirim,
      onPress: function onPress() {
        return submit();
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      allowFontScaling: false,
      style: styles.textKirim
    }, "SUBMIT"))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    viewTextTitle: {
      padding: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(20),
      width: width
    },
    viewCenterNoConnecttion: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    touchKirim: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(4),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKirim: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(14),
      color: 'white',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(0.7)
    }
  });
  var _default = exports.default = AddDocumentsRequestScreen;
