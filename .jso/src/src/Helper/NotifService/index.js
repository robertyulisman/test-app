  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _asyncStorage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _messaging = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _react = _$$_REQUIRE(_dependencyMap[5]);
  var _reactNative2 = _$$_REQUIRE(_dependencyMap[6]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  // @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message

  var NotifService = function NotifService(props) {
    var onDisplayNotification = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* (notif) {
        var channelId = yield _reactNative.default.createChannel({
          id: 'centralconnect',
          name: 'CentralConnect Channel',
          importance: _reactNative.AndroidImportance.HIGH,
          sound: 'default',
          vibration: true
        });
        yield _reactNative.default.displayNotification({
          title: notif.title,
          body: notif.body,
          android: {
            channelId: channelId,
            smallIcon: 'ic_notification',
            pressAction: {
              id: 'default',
              launchActivity: 'default' // works fine
            },
            color: '#00a551'
          }
          // pressAction: {
          //   id: 'default',
          //   launchActivity: 'default',
          //   launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
          // },
        });
      });
      return function onDisplayNotification(_x) {
        return _ref.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      notificationEvent();
    }, []);
    var notificationEvent = /*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* () {
        var setting = yield _reactNative.default.requestPermission();
        return _reactNative.default.onForegroundEvent(function (_ref3) {
          var type = _ref3.type,
            detail = _ref3.detail;
          switch (type) {
            case _reactNative.EventType.DISMISSED:
              break;
            case _reactNative.EventType.PRESS:
              if (detail.notification.title === 'Sinyal Darurat Baru') {
                _asyncStorage.default.getItem('notification').then(function (notification) {
                  var notif = JSON.parse(notification);
                  var emergencyData = {
                    id: notif.data.entity_id,
                    user: {
                      name: notif.data.penghuni_name
                    },
                    unit: {
                      unit_name: notif.data.unit
                    },
                    refreshData: function refreshData() {
                      return undefined;
                    }
                  };
                  loadUserUnit(emergencyData);
                }).catch(function (err) {
                  return undefined;
                });
              } else {}
              break;
          }
        });
      });
      return function notificationEvent() {
        return _ref2.apply(this, arguments);
      };
    }();
    (0, _react.useEffect)(function () {
      return _reactNative.default.onBackgroundEvent(/*#__PURE__*/function () {
        var _ref5 = (0, _asyncToGenerator2.default)(function* (_ref4) {
          var type = _ref4.type,
            detail = _ref4.detail;
          var notification = detail.notification,
            pressAction = detail.pressAction;
          if (type === _reactNative.EventType.ACTION_PRESS &&
          // @ts-expect-error TS(2304): Cannot find name 'NOTIFICATION_ACTIONS_ID'.
          (pressAction == null ? undefined : pressAction.id) === NOTIFICATION_ACTIONS_ID.cancelIncomingCall) {
            if (notification != null && notification.id) {
              yield _reactNative.default.cancelNotification(notification == null ? undefined : notification.id);
            }
          } else if (type === _reactNative.EventType.ACTION_PRESS &&
          // @ts-expect-error TS(2304): Cannot find name 'NOTIFICATION_ACTIONS_ID'.
          (pressAction == null ? undefined : pressAction.id) === NOTIFICATION_ACTIONS_ID.acceptIncomingCall) {
            if (notification != null && notification.id) {
              yield _reactNative.default.cancelNotification(notification == null ? undefined : notification.id);
            }
          }
        });
        return function (_x2) {
          return _ref5.apply(this, arguments);
        };
      }());
    }, []);
    (0, _react.useEffect)(function () {
      var unsubscribe = (0, _messaging.default)().onMessage(function (remoteMessage) {
        _asyncStorage.default.setItem('notification', JSON.stringify(remoteMessage));
        onDisplayNotification(remoteMessage.notification);
        if (remoteMessage.data.entity_type === 'emergency' && remoteMessage.data.entity_additional_info === 'Request') {
          var emergencyData = {
            id: remoteMessage.data.entity_id,
            user: {
              name: remoteMessage.data.penghuni_name
            },
            unit: {
              unit_name: remoteMessage.data.unit
            },
            refreshData: function refreshData() {
              return undefined;
            }
          };
          loadUserUnit(emergencyData);
        } else if (remoteMessage.data.entity_type === 'emergency' && remoteMessage.data.entity_additional_info === 'Batal') {
          _reactNative2.Alert.alert(remoteMessage.data.title, remoteMessage.data.body, [{
            text: 'OK',
            onPress: function onPress() {}
          }], {
            cancelable: false
          });
        }
      });
      return unsubscribe;
    }, []);
    (0, _react.useEffect)(function () {
      return (0, _messaging.default)().onNotificationOpenedApp(function (remoteMessage) {});
    }, []);
    (0, _react.useEffect)(function () {
      return (0, _messaging.default)().setBackgroundMessageHandler(/*#__PURE__*/function () {
        var _ref6 = (0, _asyncToGenerator2.default)(function* (remoteMessage) {
          _asyncStorage.default.setItem('notification', JSON.stringify(remoteMessage));
        });
        return function (_x3) {
          return _ref6.apply(this, arguments);
        };
      }());
    }, []);
    var loadUserUnit = /*#__PURE__*/function () {
      var _ref7 = (0, _asyncToGenerator2.default)(function* (emergencyData) {
        var dataUser = yield _asyncStorage.default.getItem('dataUser');
        if (JSON.parse(dataUser).is_a_resident === false) {
          (0, _$$_REQUIRE(_dependencyMap[7]).navigate)('NotifDarurat', {
            emergencyData: emergencyData
          });
        }
      });
      return function loadUserUnit(_x4) {
        return _ref7.apply(this, arguments);
      };
    }();
    return null;
  };
  var _default = exports.default = NotifService;
