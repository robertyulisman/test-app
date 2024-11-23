  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncStorage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _messaging = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _reactNativeCodePush = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  _$$_REQUIRE(_dependencyMap[7]);
  var _src = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  (0, _messaging.default)().setBackgroundMessageHandler(/*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (remoteMessage) {
      _asyncStorage.default.setItem('notification', JSON.stringify(remoteMessage));
    });
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  var MainScreen = function MainScreen() {
    _react.default.useEffect(function () {
      _reactNativeCodePush.default.sync({
        updateDialog: _reactNative.Platform.OS === 'android',
        installMode: _reactNativeCodePush.default.InstallMode.IMMEDIATE
      });
    }, []);
    return /*#__PURE__*/_react.default.createElement(_src.default, null);
  };
  var codePushOptions = {
    checkFrequency: _reactNativeCodePush.default.CheckFrequency.ON_APP_START,
    installMode: _reactNativeCodePush.default.InstallMode.IMMEDIATE
  };
  var pushMainScreen = (0, _reactNativeCodePush.default)(codePushOptions)(MainScreen);
  var _default = exports.default = pushMainScreen;
  _reactNative.AppRegistry.registerComponent(_$$_REQUIRE(_dependencyMap[9]).name, function () {
    return pushMainScreen;
  });
