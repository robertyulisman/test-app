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
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var SmartCommunityScreen = function SmartCommunityScreen(props) {
    var _useState = (0, _react.useState)({
        arrayMenu: props.route.params.subFeature
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    var functionDetails = function functionDetails(id) {
      if (id === 'e7c1f38c-9cd3-47d0-a2cf-5b985ba36698') {
        NavigatorService.navigate('Jasa');
      } else {
        NavigatorService.navigate('Market');
        //Alert.alert('Coming Soon', 'Feature ini akan segera hadir')
      }
    };
    var renderButton = function renderButton(_ref) {
      var item = _ref.item,
        index = _ref.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchButton,
        onPress: function onPress() {
          return functionDetails(item.id);
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: item.image_url
        },
        style: styles.iconMenu
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: styles.textName
      }, item.name));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Smart Community',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      data: state.arrayMenu,
      renderItem: renderButton,
      numColumns: 3,
      ListHeaderComponent: function ListHeaderComponent() {
        return /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          style: styles.textInfo
        }, 'Nikmati kenyamanan dan kemudahaan dengan fasilitas yang kami sediakan.');
      }
    })));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      //alignItems: 'center',
      backgroundColor: 'white'
    },
    content: {
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(20),
      flex: 1
    },
    viewChildButton: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    iconMenu: {
      width: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(40)
      //marginTop: toDp(10),
    },
    touchButton: {
      width: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(100),
      height: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(100),
      backgroundColor: '#FFFFFF',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(10),
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(2),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(2),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(10),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
      backgroundColor: 'white'
    },
    textName: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(12),
      textAlign: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(8)
      //height: toDp(40),
    },
    textInfo: {
      color: '#273238',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(14),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(20),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(8)
    },
    icMenuRight: {
      width: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(16.9),
      height: (0, _$$_REQUIRE(_dependencyMap[7]).toDp)(15.84)
    }
  });
  var _default = exports.default = SmartCommunityScreen;
