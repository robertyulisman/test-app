  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  // import { allLogo } from '@Assets';
  // import { toDp } from '@percentageToDP';
  // import Header from '@Header';

  // import NavigatorService from '@NavigatorService';
  // import CustomText from '@CustomText';

  // import Header from '../../Components/Header';

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var ListClusterScreen = function ListClusterScreen(props) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'List Cluster',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, props.route.params.listClusters.map(function (data, index) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewItem
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        allowFontScaling: false,
        style: styles.textName
      }, index + 1 + '. ' + data.name))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.lineItem
      }));
    })));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(28) : 0,
      paddingBottom: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(28) : 0
    },
    viewFooter: {
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(16)
    },
    touchTanbah: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(40),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(1),
      borderColor: '#917438',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textTambah: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      color: '#917438',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(0.7)
    },
    content: {
      flex: 1
    },
    viewItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(16),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(12)
    },
    textName: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      color: '#273238',
      width: width * 0.8
    },
    textStatus: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#f53c3c'
    },
    touchDelete: {
      padding: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(4)
    },
    icDelete: {
      width: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(24)
    },
    lineItem: {
      width: '92%',
      height: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(1),
      backgroundColor: '#e9ebed',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(16)
    },
    titleConfirm: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(14),
      //fontFamily: 'Montserrat-Bold',
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(0.7)
    },
    textApakah: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(16),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(16),
      textAlign: 'center',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(0.6)
    },
    viewRow: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(20),
      flexDirection: 'row'
    },
    touchTidak: {
      width: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(30),
      backgroundColor: '#917438',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textTidak: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(0.7)
    },
    touchYa: {
      width: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(125),
      height: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(30),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textYa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      color: '#917438',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(0.7)
    },
    modalBoxCenter: {
      width: width * 0.8,
      height: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(168),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[5]).toDp)(8),
      alignItems: 'center'
    }
  });
  var _default = exports.default = ListClusterScreen;
