  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  // By default RN adds a default button if nothing is provided.
  // We have to emulate this default setting to ensure that we can intercept this button's press
  var DefaultRNButtons = [{
    text: 'OK'
  }];
  var AlertAsync = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (title, message, buttons) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var type = arguments.length > 4 ? arguments[4] : undefined;
      return new Promise(function (resolve, reject) {
        var interceptCallback = function interceptCallback(callback) {
          if (!callback) {
            resolve(null);
          } else {
            try {
              var maybePromise = callback();
              if (maybePromise instanceof Promise) {
                maybePromise.then(resolve, reject);
              } else {
                resolve(maybePromise);
              }
            } catch (e) {
              reject(e);
            }
          }
        };
        var nonEmptyButtons = buttons && buttons.length > 0 ? buttons : DefaultRNButtons;
        var interceptedButtons = nonEmptyButtons.map(function (button) {
          return Object.assign(Object.assign({}, button), {}, {
            onPress: function onPress() {
              return interceptCallback(button.onPress);
            }
          });
        });
        var interceptedOptions = Object.assign(Object.assign({}, options), {}, {
          onDismiss: function onDismiss() {
            return interceptCallback(options.onDismiss);
          }
        });
        _reactNative.Alert.alert(title, message, interceptedButtons, interceptedOptions);
      });
    });
    return function AlertAsync(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();
  var _default = exports.default = AlertAsync;
