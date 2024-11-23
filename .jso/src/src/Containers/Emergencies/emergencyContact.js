  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _NoConnection = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[9]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var EmergencyContactScreen = function EmergencyContactScreen(props) {
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[10]).useNetInfo)();
    var _useState = (0, _react.useState)({
        isLoading: true,
        listEmergencyContact: []
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      fetchContactCategory();
    }, []);
    var fetchContactCategory = function fetchContactCategory() {
      (0, _$$_REQUIRE(_dependencyMap[11]).getEmergencyCategory)().then(function (response) {
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            listEmergencyContact: response.data.emergency_contact_categories,
            isLoading: false
          });
        });
      }).catch(function (error) {
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: false
          });
        });
      });
    };
    var handleSelectCategory = function handleSelectCategory(categoryData) {
      NavigatorService.navigate('ListContactEmergency', {
        data: categoryData
      });
    };
    var EmergencyContactView = function EmergencyContactView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, state.listEmergencyContact.map(function (data) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.buttonContact,
          onPress: function onPress() {
            return handleSelectCategory(data);
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            flexDirection: 'row'
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: {
            uri: data.image_url
          },
          style: styles.leftIcon
        }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          style: styles.textName
        }, data.name)), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[12]).allLogo.arrowRight,
          style: styles.rightIcon
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.line
        }));
      }));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Emergency Contact',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), !netInfo.isConnected ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewCenterNoConnecttion
    }, /*#__PURE__*/_react.default.createElement(_NoConnection.default, null)) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, EmergencyContactView())));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    content: {
      padding: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      width: width
    },
    buttonContact: {
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(48),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    leftIcon: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12)
    },
    textName: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      color: '#273238'
    },
    rightIcon: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(8),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12),
      tintColor: '#5AAA0F'
    },
    line: {
      width: width * 0.9,
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1),
      backgroundColor: '#DDE3E0',
      position: 'absolute',
      bottom: 0
    },
    viewCenterNoConnecttion: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    }
  });
  var _default = exports.default = EmergencyContactScreen;
