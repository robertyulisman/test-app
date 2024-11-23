  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncStorage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _messaging = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _Toast = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[9]);
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[12]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[13]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var UnitScreen = function UnitScreen(props) {
    var toast = (0, _react.useRef)(null);
    var _useState = (0, _react.useState)({
        isLoading: false,
        isDarkMode: false,
        isShowModalConfirm: false,
        isShowSuccessModal: false,
        unitList: [],
        unitId: '',
        unitName: '',
        fcmToken: ''
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      loadUnit();
      getFcmToken();
    }, []);
    var getFcmToken = function getFcmToken() {
      (0, _messaging.default)().getToken().then(function (fcmToken) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            fcmToken: fcmToken
          });
        });
      }).catch(function (error) {});
    };
    var loadUnit = function loadUnit() {
      (0, _$$_REQUIRE(_dependencyMap[14]).getUnitsOccupied)('').then(function (response) {
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            unitList: response.data.units
          });
        });
      }).catch(function (error) {});
    };
    var handleDeleteUnit = function handleDeleteUnit() {
      setState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isShowModalConfirm: false
        });
      });
      setTimeout(function () {
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: true
          });
        });
        if (state.unitList.length === 1) {
          (0, _$$_REQUIRE(_dependencyMap[14]).putUserExitUnit)({
            fcm_token: state.fcmToken,
            unit_id: state.unitId
          }).then(function (response) {
            if (response.data.message === 'Logout success') {
              setState(function (prevState) {
                return Object.assign(Object.assign({}, prevState), {}, {
                  isLoading: false
                });
              });
              _asyncStorage.default.removeItem('token');
              _asyncStorage.default.removeItem('refresh');
              _asyncStorage.default.removeItem('dataUser');
              _asyncStorage.default.removeItem('features');
              _asyncStorage.default.removeItem('notification');
              _asyncStorage.default.removeItem('unit');
              NavigatorService.reset('Login');
            }
          }).catch(function (error) {
            _reactNative.Alert.alert('Exit Unit', '' + error.data.message, [{
              text: 'OK',
              onPress: function onPress() {
                setState(function (prevState) {
                  return Object.assign(Object.assign({}, prevState), {}, {
                    isLoading: false
                  });
                });
              }
            }], {
              cancelable: false
            });
          });
        } else {
          (0, _$$_REQUIRE(_dependencyMap[14]).deleteUnitsOccupied)('/' + state.unitId).then(function (response) {
            setState(function (prevState) {
              return Object.assign(Object.assign({}, prevState), {}, {
                isLoading: false
              });
            });
            _asyncStorage.default.setItem('unit', JSON.stringify(response.data.activeUnit.unit));
            showMessageDelete();
            loadUnit();
            props.navigation.state.params.setUnit(response.data.activeUnit.unit);
          }).catch(function (error) {
            if (error.data.message === 'Must at least have one active units') {
              _reactNative.Alert.alert('Mohon Maaf', 'Harus memiliki setidaknya satu unit aktif', [{
                text: 'OK',
                onPress: function onPress() {
                  setState(function (prevState) {
                    return Object.assign(Object.assign({}, prevState), {}, {
                      isLoading: false
                    });
                  });
                }
              }], {
                cancelable: false
              });
            } else {
              setState(function (prevState) {
                return Object.assign(Object.assign({}, prevState), {}, {
                  isLoading: false
                });
              });
            }
          });
        }
      }, 400);
    };
    var ModalConfirmView = function ModalConfirmView() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        onBackdropPress: function onBackdropPress() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowModalConfirm: true
            });
          });
        },
        isVisible: state.isShowModalConfirm
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewModalCenter, {
          alignItems: 'center'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBoxCenter, {
          backgroundColor: state.isDarkMode ? '#121212' : 'white',
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(184)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.titleConfirm, {
          color: state.isDarkMode ? 'white' : '#263238'
        }]
      }, "HAPUS UNIT"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textApakah, {
          color: state.isDarkMode ? 'white' : '#263238'
        }]
      }, "Apakah anda yakin menghapus unit", '\n', /*#__PURE__*/_react.default.createElement(_CustomText.default, null, state.unitName), state.unitList.length === 1 && '\nAplikasi akan otomatis ter-Logout'), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
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
          width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchYa,
        onPress: function onPress() {
          return handleDeleteUnit();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textYa
      }, "Hapus"))))));
    };
    var handleDelete = function handleDelete(unit) {
      setState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isShowModalConfirm: true,
          unitName: unit.unit_name,
          unitId: unit.id
        });
      });
    };
    var showMessageDelete = function showMessageDelete() {
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      toast.current.show('Unit berhasil dihapus.');
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: state.isDarkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: state.isDarkMode ? 'light-content' : 'dark-content',
      translucent: true,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Unit',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_Toast.default, {
      ref: toast
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.isLoading
    }), ModalConfirmView(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10)
      }
    }), state.unitList.length === 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, ['', '', '', '', ''].map(function () {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewItem, {
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(56),
          backgroundColor: state.isDarkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: styles.imgPicture
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.contentItem
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: [styles.text, {
          width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(30)
        }]
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.lineItem
      }));
    })) : /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      style: styles.content
    }, state.unitList.map(function (data, index) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewItem
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          // @ts-expect-error TS(2339): Property 'status' does not exist on type 'never'.
          if (data.status.name !== 'Request') {
            NavigatorService.navigate('DetailUnit', {
              data: data
            });
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textName, {
          color: state.isDarkMode ? 'white' : '#273238'
        }]
      }, data.unit.unit_name), index === 0 && /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textStatus, {
          color: '#28a595'
        }]
      }, 'Aktif'), data.status.name === 'Request' && /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textStatus
      }, 'Menunggu Konfirmasi')), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchDelete
        // @ts-expect-error TS(2339): Property 'unit' does not exist on type 'never'.
        ,
        onPress: function onPress() {
          return handleDelete(data.unit);
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icDelete,
        style: [styles.icDelete, {
          tintColor: state.isDarkMode ? 'white' : '#5AAA0F'
        }]
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.lineItem
      }));
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewFooter
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchTanbah,
      onPress: function onPress() {
        NavigatorService.navigate('AddUnit', {
          loadUnit: loadUnit
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textTambah
    }, "TAMBAH UNIT"))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(28) : 0,
      paddingBottom: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(28) : 0
    },
    viewFooter: {
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    touchTanbah: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      borderColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textTambah: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.7)
    },
    headeriOS: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    content: {
      flex: 1
    },
    viewItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12)
    },
    textName: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#273238',
      width: width * 0.8
    },
    textStatus: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#f53c3c'
    },
    touchDelete: {
      padding: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4)
    },
    icDelete: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
    },
    lineItem: {
      width: '92%',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      backgroundColor: '#e9ebed',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    titleConfirm: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.7)
    },
    textApakah: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      textAlign: 'center',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.6)
    },
    viewRow: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      flexDirection: 'row'
    },
    touchTidak: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(100),
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
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(100),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      borderColor: '#5AAA0F'
    },
    textYa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.7)
    },
    modalBoxCenter: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(280),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(345),
      backgroundColor: '#FFFFFF',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      alignItems: 'center'
    }
  });
  var _default = exports.default = UnitScreen;
