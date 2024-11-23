  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncStorage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _messaging = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var SplashScreen = function SplashScreen(_ref) {
    var navigation = _ref.navigation;
    (0, _react.useEffect)(function () {
      if (_reactNative.Platform.OS === 'ios') {
        (0, _messaging.default)().requestPermission().then(function (res1) {}).catch(function (err1) {});
        (0, _messaging.default)().registerDeviceForRemoteMessages().then(function (res2) {}).catch(function (err2) {});
      }
    }, []);

    // @ts-expect-error TS(2345): Argument of type '() => Promise<void>' is not assi... Remove this comment to see the full error message
    (0, _react.useEffect)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var token = yield _asyncStorage.default.getItem('token');
      var unit = yield _asyncStorage.default.getItem('unit');
      setTimeout(function () {
        if (token === null) {
          NavigatorService.reset('OnBoarding');
        } else if (unit === null) {
          NavigatorService.reset('SetUnit');
        } else {
          NavigatorService.reset('Home');
        }
      }, 2500);
    }), []);
    (0, _react.useEffect)(function () {
      // database.ref('/version').on('value', (querySnapShot) => {
      //   let getVersion = DeviceInfo.getVersion();
      //   let version = parseInt(getVersion.replace('.', '').replace('.', ''));
      //   console.log('version', version);
      //   console.log('querySnapShot.val()', querySnapShot.val());
      // });
    }, []);
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: "dark-content",
      translucent: true,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[7]).allLogo.splash,
      style: styles.splash
    }));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center'
    },
    systemBar: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[8]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    splash: {
      width: width,
      height: height,
      resizeMode: 'contain'
    }
  });
  var _default = exports.default = SplashScreen;
