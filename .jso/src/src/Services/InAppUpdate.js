  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _reactNativeDeviceInfo = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _spReactNativeInAppUpdates = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var InAppUpdate = function InAppUpdate() {
    var version = _reactNativeDeviceInfo.default.getVersion();
    var inAppUpdates = new _spReactNativeInAppUpdates.default(false) // isDebug
    ;
    _react.default.useEffect(function () {
      inAppUpdates.checkNeedsUpdate({
        curVersion: version
      }).then(function (result) {
        if (result.shouldUpdate) {
          var updateOptions = {};
          _reactNative.Platform.select({
            ios: {
              title: 'Update available',
              message: 'There is a new version of the app available on the App Store, do you want to update it?',
              buttonUpgradeText: 'Update',
              buttonCancelText: 'Cancel'
              // country: 'it', // 👈🏻 the country code for the specific version to lookup for (optional)
            },
            android: {
              updateType: _spReactNativeInAppUpdates.IAUUpdateKind.IMMEDIATE
            }
          });
          inAppUpdates.startUpdate(updateOptions);
          // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
        }
      });
    }, []);
  };
  var _default = exports.default = InAppUpdate;
