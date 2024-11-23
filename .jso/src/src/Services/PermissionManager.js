  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var PermissionManager = function PermissionManager() {
    _react.default.useEffect(function () {
      (0, _$$_REQUIRE(_dependencyMap[3]).requestMultiple)(_reactNative.Platform.select({
        android: [_$$_REQUIRE(_dependencyMap[3]).PERMISSIONS.ANDROID.POST_NOTIFICATIONS],
        ios: [_$$_REQUIRE(_dependencyMap[3]).PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY]
      })).then(function (result) {}), (0, _$$_REQUIRE(_dependencyMap[3]).checkMultiple)(_reactNative.Platform.select({
        android: [_$$_REQUIRE(_dependencyMap[3]).PERMISSIONS.ANDROID.POST_NOTIFICATIONS],
        ios: [_$$_REQUIRE(_dependencyMap[3]).PERMISSIONS.IOS.APP_TRACKING_TRANSPARENCY]
      })).then(function (result) {
        switch (result) {
          // @ts-expect-error TS(2678): Type 'string' is not comparable to type 'Record<an... Remove this comment to see the full error message
          case _$$_REQUIRE(_dependencyMap[3]).RESULTS.UNAVAILABLE:
            break;

          // @ts-expect-error TS(2678): Type 'string' is not comparable to type 'Record<an... Remove this comment to see the full error message
          case _$$_REQUIRE(_dependencyMap[3]).RESULTS.DENIED:
            break;

          // @ts-expect-error TS(2678): Type 'string' is not comparable to type 'Record<an... Remove this comment to see the full error message
          case _$$_REQUIRE(_dependencyMap[3]).RESULTS.GRANTED:
            break;

          // @ts-expect-error TS(2678): Type 'string' is not comparable to type 'Record<an... Remove this comment to see the full error message
          case _$$_REQUIRE(_dependencyMap[3]).RESULTS.BLOCKED:
            break;
        }
      }).catch(function (error) {});
    }, []);
    return null;
  };
  var _default = exports.default = PermissionManager;
