  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _Toast = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[12]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);
  var limit = 0;
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var DetailsDocumentsRequestScreen = function DetailsDocumentsRequestScreen(props) {
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[13]).useNetInfo)();
    var toast = (0, _react.useRef)(null);
    var _useState = (0, _react.useState)({
        loading: false,
        item: props.route.params.item,
        isShowModalBatal: false,
        isDarkMode: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    var modalConfirmationBatal = function modalConfirmationBatal() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        onBackdropPress: function onBackdropPress() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowModalBatal: false
            });
          });
        },
        isVisible: state.isShowModalBatal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles2.viewModalCenter
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles2.modalBoxCenter, {
          backgroundColor: state.isDarkMode ? '#121212' : 'white',
          height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(240)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles2.titleConfirm, {
          color: state.isDarkMode ? 'white' : '#263238'
        }]
      }, "Konfirmasi Pembatalan"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles2.textApakah, {
          color: state.isDarkMode ? 'white' : '#263238'
        }]
      }, "Status akan menjadi Batal setelah anda menekan tombol Ya. Anda yakin ingin membatalkan documents request ?"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles2.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles2.touchTidak,
        onPress: function onPress() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowModalBatal: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles2.textTidak
      }, "Tidak")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles2.touchYa,
        onPress: function onPress() {
          return prosesBatal();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles2.textYa
      }, "Ya, Batal"))))));
    };
    var prosesBatal = function prosesBatal() {
      (0, _$$_REQUIRE(_dependencyMap[15]).patchDocumentsRequestCancel)('/' + props.route.params.item.id).then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            isShowModalBatal: false
          });
        });
        props.navigation.goBack();
        props.route.params.showMessageDelete();
        props.route.params.loadComplains();
      }).catch(function (error) {});
    };
    var batal = function batal() {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          isShowModalBatal: true
        });
      });
    };
    var changeColorStatus = function changeColorStatus(name) {
      if (name === 'Terkirim') {
        return '#f53c3c';
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
      if (name === 'Terkirim') {
        return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(60);
      } else if (name === 'Proses') {
        return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(56);
      } else if (name === 'Selesai') {
        return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(56);
      } else if (name === 'Batal') {
        return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(50);
      } else if (name === 'Invalid') {
        return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(60);
      }
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: _styles.default.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Details Documents Request',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.loading
    }), /*#__PURE__*/_react.default.createElement(_Toast.default, {
      ref: toast
    }), modalConfirmationBatal(), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.default.viewRow
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      numberOfLines: 1,
      allowFontScaling: false,
      ellipsizeMode: "tail",
      style: [_styles.default.itemTitle, {
        width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(300),
        color: state.isDarkMode ? 'white' : '#383B34'
      }]
    }, state.item.document.name), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_styles.default.viewRowItem, {
        alignItems: 'flex-start'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icLp,
      style: [_styles.default.icLp, {
        tintColor: state.isDarkMode ? 'white' : '#9B9F95'
      }]
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      allowFontScaling: false,
      style: [_styles.default.text, {
        width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(300),
        color: state.isDarkMode ? 'white' : '#5E6157'
      }]
    }, state.item.description ? state.item.description : 'Tidak ada')), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.default.viewRowItem
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icCalendar,
      style: [_styles.default.icCalendar, {
        tintColor: state.isDarkMode ? 'white' : '#9B9F95'
      }]
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      allowFontScaling: false,
      style: [_styles.default.text, {
        color: state.isDarkMode ? 'white' : '#5E6157'
      }]
    }, (0, _moment.default)(state.item.created_at).format('DD MMMM YYYY'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: 'row'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_styles.default.viewStatus, {
        width: changeWidthStatus(state.item.status),
        backgroundColor: changeColorStatus(state.item.status)
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "medium",
      allowFontScaling: false,
      style: _styles.default.textStatus
    }, state.item.status)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(6)
      }
    })))), state.item.status === 'Proses' && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: _styles.default.touchKirim,
      onPress: function onPress() {
        return batal();
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      allowFontScaling: false,
      style: _styles.default.textKirim
    }, "BATAL")))));
  };
  var styles2 = _reactNative.StyleSheet.create({
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
    textApakah: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(30),
      textAlign: 'center',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: '#263238',
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24)
    },
    viewRow: {
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
    }
  });
  var _default = exports.default = DetailsDocumentsRequestScreen;
