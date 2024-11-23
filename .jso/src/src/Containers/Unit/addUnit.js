  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _defineProperty2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _CustomComboBox = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[8]);
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  // import { getUnits, getUnitsFloors, getUnitsTower, postUnitsOccupiedAdd } from '@Apis';

  var AddUnitScreen = function AddUnitScreen(props) {
    var _formAddress$tower4;
    var _useState = (0, _react.useState)({
        isShowSuccessModal: false,
        isShowFailModal: false,
        isLoading: false,
        isDarkMode: false,
        isAgree: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      viewState = _useState2[0],
      setViewState = _useState2[1];
    var _useState3 = (0, _react.useState)({
        apartment: 'CentralConnect',
        tower: {
          id: '',
          name: ''
        },
        lantai: '',
        unit: '',
        unitId: '',
        syarat: false
      }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      formAddress = _useState4[0],
      setFormAddress = _useState4[1];
    var _useState5 = (0, _react.useState)({
        arrTower: [],
        arrFloors: [],
        arrUnits: [],
        arrIdUnits: []
      }),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      listAddress = _useState6[0],
      setListAdress = _useState6[1];
    (0, _react.useEffect)(function () {
      (0, _$$_REQUIRE(_dependencyMap[10]).getUnitsTower)('').then(function (response) {
        var tempTower = [];
        for (var i = 0; i < response.data.length; i++) {
          tempTower.push({
            id: response.data[i].id,
            name: response.data[i].name
          });
        }
        setListAdress(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            arrTower: tempTower
          });
        });
      }).catch(function (error) {});
    }, []);
    (0, _react.useEffect)(function () {
      var _formAddress$tower;
      if (((_formAddress$tower = formAddress.tower) == null ? undefined : _formAddress$tower.id) !== '') {
        var _formAddress$tower2;
        (0, _$$_REQUIRE(_dependencyMap[10]).getUnitsFloors)('?cluster_id=' + ((_formAddress$tower2 = formAddress.tower) == null ? undefined : _formAddress$tower2.id)).then(function (response) {
          var arrFloors = [];
          for (var i = 0; i < response.data.units.length; i++) {
            arrFloors.push(response.data.units[i].block);
          }
          setListAdress(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              arrFloors: arrFloors
            });
          });
          setFormAddress(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              lantai: '',
              unit: ''
            });
          });
        }).catch(function (error) {});
      }
    }, [formAddress.tower]);
    (0, _react.useEffect)(function () {
      if (formAddress.lantai !== '') {
        var _formAddress$tower3;
        (0, _$$_REQUIRE(_dependencyMap[10]).getUnits)('?cluster_id=' + ((_formAddress$tower3 = formAddress.tower) == null ? undefined : _formAddress$tower3.id) + '&block=' + formAddress.lantai).then(function (response) {
          var arrUnits = [];
          var arrIdUnits = [];
          for (var i = 0; i < response.data.units.length; i++) {
            arrIdUnits.push(response.data.units[i]);
            arrUnits.push(response.data.units[i].unit_name);
          }
          setListAdress(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              arrUnits: arrUnits,
              arrIdUnits: arrIdUnits
            });
          });
          setFormAddress(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              unit: ''
            });
          });
        }).catch(function (error) {});
      }
    }, [formAddress.lantai]);
    (0, _react.useEffect)(function () {
      if (viewState.isShowSuccessModal === false && viewState.isAgree) {
        props.navigation.goBack();
      }
    }, [viewState.isShowSuccessModal]);
    var handleSelectAddress = function handleSelectAddress(value, type) {
      if (type === 'unit') {
        var unitId = '';
        for (var i = 0; i < listAddress.arrIdUnits.length; i++) {
          // @ts-expect-error TS(2339): Property 'unit_name' does not exist on type 'never... Remove this comment to see the full error message
          if (listAddress.arrIdUnits[i].unit_name === value) {
            // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
            unitId = listAddress.arrIdUnits[i].id;
          }
        }
        setFormAddress(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            unitId: unitId,
            unit: value
          });
        });
      } else {
        setFormAddress(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, (0, _defineProperty2.default)({}, type, value));
        });
      }
    };
    var handleAddUnit = function handleAddUnit() {
      var data = {
        unit_id: formAddress.unitId
      };
      setViewState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isLoading: true
        });
      });
      (0, _$$_REQUIRE(_dependencyMap[10]).postUnitsOccupiedAdd)(data).then(function (response) {
        setViewState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: false,
            isShowSuccessModal: true,
            isAgree: true
          });
        });
        props.route.params.loadUnit();
      }).catch(function (error) {
        if (error.data.name === 'UserLimitReachedError') {
          setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoading: false,
              isShowFailModal: true
            });
          });
        } else if (error.data.name === 'AddUnitAlreadyRequestedError') {
          _reactNative.Alert.alert('Informasi', 'Permintaan untuk menambahkan unit ini sudah dikirimkan', [{
            text: 'OK',
            onPress: function onPress() {
              setViewState(function (prevState) {
                return Object.assign(Object.assign({}, prevState), {}, {
                  isLoading: false
                });
              });
            }
          }]);
        } else {
          setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoading: false
            });
          });
        }
      });
    };
    var SuccessModalView = function SuccessModalView() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        isVisible: viewState.isShowSuccessModal,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.modalBox
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icSuccess,
        style: styles.icSuccess
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textTitleModal
      }, "TAMBAH UNIT BERHASIL"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textDescModal
      }, "Unit telah berhasil Diajukan"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowSuccessModal: false
            });
          });
        },
        style: styles.touchKembaliKeLogin
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textKembaliKeLogin
      }, "Kembali")))));
    };
    var FailModalView = function FailModalView() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        isVisible: viewState.isShowFailModal,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.modalBox
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icGagal,
        style: styles.icGagal
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitleModal, {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
        }]
      }, "TAMBAH UNIT GAGAL"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textDescModal, {
          width: '85%',
          textAlign: 'center'
        }]
      }, "Maaf, unit yang Anda daftarkan sudah terisi penuh. Silahkan hubungi pengelola untuk informasi lebih lanjut."), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowFailModal: false
            });
          });
        },
        style: styles.touchKembaliKeLogin
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textKembaliKeLogin
      }, "KEMBALI")))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView
    // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
    , {
      style: [styles.container, {
        backgroundColor: viewState.darkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar
    // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
    , {
      barStyle: viewState.darkMode ? 'light-content' : 'dark-content',
      translucent: true,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Tambah Unit',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: viewState.isLoading
    }), /*#__PURE__*/_react.default.createElement(SuccessModalView, null), /*#__PURE__*/_react.default.createElement(FailModalView, null), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.center
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: [styles.textTitle, {
        color: viewState.isDarkMode && 'white'
      }]
    }, "TAMBAHKAN KEPEMILIKAN UNIT")), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewTextTitle
    }, /*#__PURE__*/_react.default.createElement(_CustomComboBox.default
    // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
    , {
      darkMode: viewState.darkMode,
      title: 'Cluster/Jalan',
      desc: '',
      textPlaceholder: 'Pilih cluster/jalan',
      value: (_formAddress$tower4 = formAddress.tower) == null ? undefined : _formAddress$tower4.name,
      arrayData: listAddress.arrTower,
      onSelected: function onSelected(item, index) {
        return handleSelectAddress(item, 'tower');
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
      }
    }), listAddress.arrFloors.length !== 0 && /*#__PURE__*/_react.default.createElement(_CustomComboBox.default
    // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
    , {
      darkMode: viewState.darkMode,
      editable: false,
      title: 'Blok',
      desc: '',
      textPlaceholder: 'Pilih blok',
      value: formAddress.lantai,
      arrayData: listAddress.arrFloors,
      onSelected: function onSelected(item, index) {
        return handleSelectAddress(item, 'lantai');
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
      }
    }), listAddress.arrUnits.length !== 0 && /*#__PURE__*/_react.default.createElement(_CustomComboBox.default
    // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
    , {
      darkMode: viewState.darkMode,
      editable: false,
      title: 'No unit',
      desc: '',
      textPlaceholder: 'Pilih no unit',
      value: formAddress.unit,
      arrayData: listAddress.arrUnits,
      onSelected: function onSelected(item, index) {
        return handleSelectAddress(item, 'unit');
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footerButton
    }, formAddress.apartment === '' ||
    // @ts-expect-error TS(2367): This condition will always return 'false' since th... Remove this comment to see the full error message
    formAddress.tower === '' || formAddress.lantai === '' || formAddress.unit === '' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.touchKirim, {
        flex: 1,
        backgroundColor: '#d3d6db'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textKirim
    }, "Ajukan")) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        return handleAddUnit();
      },
      style: [styles.touchKirim, {
        flex: 1,
        backgroundColor: '#5AAA0F'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textKirim
    }, "Ajukan")))))))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(28) : 0
    },
    systemBar: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(30),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20)
    },
    logo: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(120),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(120)
    },
    touchLupa: {
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(31),
      // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      borderColor: '#5AAA0F',
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      color: '#5AAA0F'
    },
    textLupa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#5AAA0F',
      fontStyle: 'normal'
    },
    touchKirim: {
      width: width * 0.82,
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKirim: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: 'white',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.7)
    },
    textLupaPassword: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(30),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      color: '#263238',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1)
    },
    content: {
      padding: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(32)
    },
    viewTextTitle: {
      width: width * 0.82
    },
    center: {
      alignItems: 'center'
    },
    textTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      color: '#263238',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1)
    },
    logoDone: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(150),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(66.5)
    },
    contentDone: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(60),
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(30)
    },
    successForget: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(200),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(185.9)
    },
    textMessage: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#263238',
      fontStyle: 'normal'
    },
    footerKetentuan: {
      flexDirection: 'row',
      paddingRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8)
    },
    icCheckbox: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20)
    },
    textSyarat: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      color: '#273238'
    },
    textKetentuan: {
      color: '#5AAA0F'
    },
    footerButton: {
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24)
    },
    bottomModal: {
      //justifyContent: "flex-end",
      //margin: 0,
    },
    viewRootModal: {
      width: 'auto',
      height: 'auto',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalBox: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(280),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(335),
      backgroundColor: '#FFFFFF',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      alignItems: 'center'
    },
    textTitleModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(48)
    },
    textDescModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      color: '#263238',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
    },
    icSuccess: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(32)
    },
    icGagal: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(32)
    },
    touchKembaliKeLogin: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(200),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKembaliKeLogin: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.7)
    }
  });
  var _default = exports.default = AddUnitScreen;
