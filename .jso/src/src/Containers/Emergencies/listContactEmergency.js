  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var ListContactEmergencyScreen = function ListContactEmergencyScreen(_ref) {
    var navigation = _ref.navigation,
      route = _ref.route;
    var _useState = (0, _react.useState)({
        isLoading: false,
        isDarkMode: false,
        listContact: []
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    var fetcListContact = function fetcListContact() {
      var body = {
        filter: {
          emergency_contact_category_id: route.params.data.id
        }
      };
      (0, _$$_REQUIRE(_dependencyMap[7]).postEmergencyContactList)(body).then(function (response) {
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: false,
            listContact: response.data.emergency_contacts
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
    (0, _react.useEffect)(function () {
      setState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isLoading: true
        });
      });
      fetcListContact();
    }, []);
    var ItemView = function ItemView(data) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.itemContainer
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        style: styles.contactImage,
        source: {
          uri: data.image_url
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.detailWrapper
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textName,
        textType: "semibold"
      }, data.name), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textAddress
      }, data.address), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return _reactNative.Linking.openURL("tel:" + data.phone.replace('()', ''));
        },
        style: styles.phoneButton
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[8]).allLogo.icPhone,
        style: styles.sosButton
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textPhone,
        textType: "semibold"
      }, data.phone))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: state.isDarkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.isLoading
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: route.params.data.name,
      onPress: function onPress() {
        return navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, state.listContact.map(function (data) {
      return ItemView(data);
    })));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f7f8'
    },
    sosButton: {
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(15),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(15),
      resizeMode: 'contain',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(7),
      tintColor: '#5AAA0F'
    },
    phoneButton: {
      flexDirection: 'row',
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(30),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(5),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(1),
      borderColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center',
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(140),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(10)
    },
    textPhone: {
      color: '#5AAA0F'
    },
    itemContainer: {
      margin: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(10),
      flexDirection: 'row'
    },
    detailWrapper: {
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(10),
      flexWrap: 'nowrap',
      flex: 1
    },
    contactImage: {
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)((width - 20) / 4),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(5)
    },
    textName: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(14)
    },
    textAddress: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(5),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(12),
      color: '#5E6157'
    }
  });
  var _default = exports.default = ListContactEmergencyScreen;
