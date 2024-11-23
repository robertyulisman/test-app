  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncStorage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _AlertAsync = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _axios = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[5]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var xhr = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (url, method, data, headers) {
      var token = yield _asyncStorage.default.getItem('token');
      var defaultHeader = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: token
      };
      var config = {
        method: method,
        url: url,
        headers: token !== null ? defaultHeader : headers,
        data: data,
        timeout: 15000
      };
      // LOG ALL DATA

      try {
        var res = yield (0, _axios.default)(config);
        return res;
      } catch (_ref2) {
        var response = _ref2.response;
        if (response.status === 401 && (response.data.message === 'Token expired.' || response.data.message === 'Invalid token.')) {
          //if(true) {
          var refresh = yield _asyncStorage.default.getItem('refresh');
          var body = {
            method: 'POST',
            url: _$$_REQUIRE(_dependencyMap[6]).URL_REFRESH,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: refresh
            },
            timeout: 15000
          };
          (0, _axios.default)(body).then(function (response) {
            _asyncStorage.default.setItem('token', response.data.token.type + ' ' + response.data.token.access_token);
            _asyncStorage.default.setItem('refresh', response.data.token.type + ' ' + response.data.token.refresh_token);
            _asyncStorage.default.setItem('dataUser', JSON.stringify(response.data.profile));
            //xhr(url, method, data, headers)
            if (response.data.unit === null && response.data.profile.is_a_resident) {
              NavigatorService.reset('SetUnit');
            } else {
              _asyncStorage.default.setItem('unit', JSON.stringify(response.data.unit));
              NavigatorService.reset('Home');
            }
          }).catch(/*#__PURE__*/function () {
            var _ref3 = (0, _asyncToGenerator2.default)(function* (error) {
              // bug harus HIT API LOGOUT
              yield (0, _AlertAsync.default)('Session Habis', 'Silahkan lakukan login ulang', [{
                text: 'OK',
                onPress: function () {
                  var _onPress = (0, _asyncToGenerator2.default)(function* () {
                    var fcmToken = yield _asyncStorage.default.getItem('fcmToken');
                    var deviceId = yield _asyncStorage.default.getItem('deviceId');
                    var body = {
                      fcm_token: fcmToken,
                      device_id: deviceId
                    };
                    (0, _$$_REQUIRE(_dependencyMap[7]).postLogout)(body).then(function (response) {
                      _asyncStorage.default.removeItem('token');
                      _asyncStorage.default.removeItem('refresh');
                      _asyncStorage.default.removeItem('dataUser');
                      _asyncStorage.default.removeItem('features');
                      _asyncStorage.default.removeItem('fcmToken');
                      _asyncStorage.default.removeItem('deviceId');
                      _asyncStorage.default.removeItem('notification');
                      NavigatorService.reset('Login');
                    }).catch(/*#__PURE__*/function () {
                      var _ref4 = (0, _asyncToGenerator2.default)(function* (error) {
                        _asyncStorage.default.removeItem('token');
                        _asyncStorage.default.removeItem('refresh');
                        _asyncStorage.default.removeItem('dataUser');
                        _asyncStorage.default.removeItem('features');
                        _asyncStorage.default.removeItem('fcmToken');
                        _asyncStorage.default.removeItem('deviceId');
                        _asyncStorage.default.removeItem('notification');
                        NavigatorService.reset('Login');
                      });
                      return function (_x6) {
                        return _ref4.apply(this, arguments);
                      };
                    }());
                  });
                  function onPress() {
                    return _onPress.apply(this, arguments);
                  }
                  return onPress;
                }()
              }]);
            });
            return function (_x5) {
              return _ref3.apply(this, arguments);
            };
          }());
        } else if (response.status === 402 || response.status === 403) {
          yield (0, _AlertAsync.default)(
          // bug harus HIT API LOGOUT
          'Mohon Maaf', 'Kami tidak dapat memproses permintaan anda. Silahkan Login kembali', [{
            text: 'OK',
            onPress: function () {
              var _onPress2 = (0, _asyncToGenerator2.default)(function* () {
                var fcmToken = yield _asyncStorage.default.getItem('fcmToken');
                var deviceId = yield _asyncStorage.default.getItem('deviceId');
                var body = {
                  fcm_token: fcmToken,
                  device_id: deviceId
                };
                (0, _$$_REQUIRE(_dependencyMap[7]).postLogout)(body).then(function (response) {
                  _asyncStorage.default.removeItem('token');
                  _asyncStorage.default.removeItem('refresh');
                  _asyncStorage.default.removeItem('dataUser');
                  _asyncStorage.default.removeItem('features');
                  _asyncStorage.default.removeItem('fcmToken');
                  _asyncStorage.default.removeItem('deviceId');
                  _asyncStorage.default.removeItem('notification');
                  NavigatorService.reset('Login');
                }).catch(/*#__PURE__*/function () {
                  var _ref5 = (0, _asyncToGenerator2.default)(function* (error) {
                    _asyncStorage.default.removeItem('token');
                    _asyncStorage.default.removeItem('refresh');
                    _asyncStorage.default.removeItem('dataUser');
                    _asyncStorage.default.removeItem('features');
                    _asyncStorage.default.removeItem('fcmToken');
                    _asyncStorage.default.removeItem('deviceId');
                    _asyncStorage.default.removeItem('notification');
                    NavigatorService.reset('Login');
                  });
                  return function (_x7) {
                    return _ref5.apply(this, arguments);
                  };
                }());
              });
              function onPress() {
                return _onPress2.apply(this, arguments);
              }
              return onPress;
            }()
          }]);
        } else if (response.status === 500) {
          // @ts-expect-error TS(2571): Object is of type 'unknown'.
          yield (0, _AlertAsync.default)('' + response.status + ' - ' + response.data.message, '' + url, [{
            text: 'OK',
            onPress: function onPress() {}
          }]);
        }
        throw response;
      }
    });
    return function xhr(_x, _x2, _x3, _x4) {
      return _ref.apply(this, arguments);
    };
  }();
  var _default = exports.default = xhr;
