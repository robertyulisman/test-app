  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _NotifService = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _AppNavigator = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _InAppUpdate = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _PermissionManager = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var App = function App() {
    (0, _PermissionManager.default)();
    (0, _InAppUpdate.default)();
    return /*#__PURE__*/_react.default.createElement(_$$_REQUIRE(_dependencyMap[6]).NavigationContainer, {
      ref: function ref(navigatorRef) {
        return (0, _$$_REQUIRE(_dependencyMap[7]).setContainer)(navigatorRef);
      }
    }, /*#__PURE__*/_react.default.createElement(_AppNavigator.default, null), /*#__PURE__*/_react.default.createElement(_NotifService.default, null));
  };
  var _default = exports.default = App;
