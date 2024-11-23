  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var DetailUnitScreen = function DetailUnitScreen(props) {
    var _useState = (0, _react.useState)({
        isDarkMode: false,
        userData: {}
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: state.isDarkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: state.isDarkMode ? 'light-content' : 'dark-content',
      translucent: true,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Penghuni',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: [styles.textAlamat, {
        color: state.isDarkMode ? 'white' : '#263238'
      }]
    }, "Alamat unit"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: [styles.textValueAlamat, {
        color: state.isDarkMode ? 'white' : '#263238'
      }]
    }, props.route.params.data.unit.unit_name), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: [styles.textAlamat, {
        color: state.isDarkMode ? 'white' : '#263238',
        marginTop: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(24),
        marginBottom: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(8)
      }]
    }, "Daftar Penghuni"), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, props.route.params.data.users && props.route.params.data.users.map(function (data, index) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewText
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textData, {
          color: state.isDarkMode ? 'white' : '#263238'
        }]
      }, "// @ts-expect-error TS(2339): Property 'id' does not exist on type '", "'.", data.name + (state.userData.id === data.id ? ' (Anda)' : '')));
    }))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(28) : 0,
      paddingBottom: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(28) : 0
    },
    content: {
      padding: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(16),
      flex: 1
    },
    textAlamat: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(12),
      color: 'black'
    },
    textValueAlamat: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(14),
      color: 'black',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(4)
    },
    textData: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(14),
      color: 'black',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(4)
    },
    viewText: {
      height: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(40),
      justifyContent: 'center',
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(1),
      borderBottomColor: '#e9ebed'
    }
  });
  var _default = exports.default = DetailUnitScreen;
