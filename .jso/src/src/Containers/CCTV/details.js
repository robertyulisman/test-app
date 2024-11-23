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
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[8]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var DetailsCCTVScreen = function DetailsCCTVScreen(props) {
    var _useState = (0, _react.useState)({
        isModalVisible: false,
        item: props.route.params.item
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {}, []);
    var renderHeader = function renderHeader() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.header, {
          backgroundColor: 'white',
          borderBottomColor: '#CCCFC9'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(90)
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHeader,
        onPress: function onPress() {
          return props.navigation.goBack();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[10]).allLogo.icBack,
        style: styles.icBack
      }))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: styles.title
      }, 'Details CCTV'), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(90),
          alignItems: 'flex-end'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.headerRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHeaderSearch,
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isModalVisible: true
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[10]).allLogo.icInfo,
        style: styles.icInfo
      })))));
    };
    var renderModal = function renderModal() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        onBackButtonPress: function onBackButtonPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isModalVisible: false
            });
          });
        },
        onBackdropPress: function onBackdropPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isModalVisible: false
            });
          });
        },
        isVisible: state.isModalVisible,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewRootModal, {
          height: 'auto'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBox, {
          backgroundColor: 'white',
          height: height * 0.4
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewModalTitle
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textTitleModal
      }, 'INFORMASI'), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSilang,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isModalVisible: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[10]).allLogo.icSilang,
        style: styles.icSilang
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewContent
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewField, {
          marginTop: 0
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.field
      }, 'Nama CCTV'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: styles.nameCCTV
      }, state.item.name)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewField
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.field
      }, 'Tanggal dibuat'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: styles.dateCCTV
      }, (0, _moment.default)(state.item.created_at).format('DD MMMM YYYY'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewField
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.field
      }, 'Alamat CCTV'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: styles.addressCCTV
      }, state.item.address))))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), renderHeader(), renderModal(), /*#__PURE__*/_react.default.createElement(_$$_REQUIRE(_dependencyMap[11]).WebView, {
      style: {
        width: width,
        height: height
      },
      originWhitelist: ['*'],
      source: {
        uri: props.route.params.item.source_url
      }
    }));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    header: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(60),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(1),
      borderBottomColor: '#CCCFC9',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16)
    },
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(4)
    },
    icBack: {
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16),
      tintColor: '#383B34'
    },
    title: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(18)
    },
    headerRow: {
      flexDirection: 'row'
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(4)
    },
    icInfo: {
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(24),
      tintColor: '#383B34'
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
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(165),
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewSearchRoot: {
      flexDirection: 'row',
      alignItems: 'center',
      //marginTop: toDp(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(8),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(8)
    },
    viewSearch: {
      width: '90%',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(24),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(24),
      backgroundColor: '#F6F7F4',
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(40),
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(10)
    },
    icSearch2: {
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(20.3),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(20),
      tintColor: '#9B9F95',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(12)
    },
    touchAll: {
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(8)
    },
    icDeleteAll: {
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(24)
    },
    textInput: {
      flex: 1,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16),
      color: '#757575',
      fontWeight: '300'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(24),
      //marginHorizontal: toDp(24),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(24),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(14),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(4)
    },
    icSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(20),
      tintColor: '#263238'
    },
    icSilangClear: {
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(20)
    },
    textInputSearch: {
      flex: 1,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(14),
      color: '#273238',
      fontFamily: 'Poppins-Regular',
      fontWeight: '400'
    },
    lineModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(64),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(4),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(7),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(15)
    },
    centerEmpty: {
      alignItems: 'center'
    },
    viewContent: {
      flex: 1,
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(24)
    },
    nameCCTV: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(14),
      color: '#273238'
    },
    dateCCTV: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(14),
      color: '#273238'
    },
    viewField: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16)
    },
    field: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(14),
      color: '#273238'
    },
    addressCCTV: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(14),
      color: '#273238'
    },
    viewCustomSearch: {
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(1),
      borderColor: '#5AAA0F'
    }
  });
  var _default = exports.default = DetailsCCTVScreen;
