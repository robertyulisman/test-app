  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.DURATION = undefined;
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[7]);
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var DURATION = exports.DURATION = {
    LENGTH_SHORT: 1500,
    FOREVER: 0
  };
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    height = _Dimensions$get.height;
  var Toast = exports.default = /*#__PURE__*/function (_Component) {
    function Toast(props) {
      var _this;
      (0, _classCallCheck2.default)(this, Toast);
      _this = _callSuper(this, Toast, [props]);
      _this.isShow = false;
      _this.timer = null;
      _this.state = {
        isShow: false,
        text: '',
        opacityValue: new _reactNative.Animated.Value(_this.props.opacity)
      };
      return _this;
    }
    (0, _inherits2.default)(Toast, _Component);
    return (0, _createClass2.default)(Toast, [{
      key: "show",
      value: function show(text, duration, callback) {
        var _this2 = this;
        this.duration = typeof duration === 'number' ? duration : DURATION.LENGTH_SHORT;
        this.callback = callback;
        this.setState({
          isShow: true,
          text: text
        });
        this.animation = _reactNative.Animated.timing(this.state.opacityValue, {
          toValue: this.props.opacity,
          duration: this.props.fadeInDuration,
          useNativeDriver: true
        });
        this.animation.start(function () {
          _this2.isShow = true;
          if (_this2.duration !== DURATION.FOREVER) _this2.close();
        });
      }
    }, {
      key: "close",
      value: function close(duration) {
        var _this3 = this;
        var delay = duration === undefined ? this.duration : duration;
        if (delay === DURATION.FOREVER) {
          this.timer = setTimeout(function () {
            return _this3.close(_this3.props.defaultCloseDelay || 250);
          }, 0);
          return;
        }
        if (!this.isShow && !this.state.isShow) return;
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(function () {
          _this3.animation = _reactNative.Animated.timing(_this3.state.opacityValue, {
            toValue: 0,
            duration: _this3.props.fadeOutDuration,
            useNativeDriver: true
          });
          _this3.animation.start(function () {
            _this3.setState({
              isShow: false
            });
            _this3.isShow = false;
            _this3.callback && _this3.callback();
          });
        }, delay);
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var _this$animation;
        (_this$animation = this.animation) == null ? undefined : _this$animation.stop();
        this.timer && clearTimeout(this.timer);
      }
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;
        var pos = this.calculatePosition();
        return this.state.isShow ? /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
          style: [styles.container, {
            bottom: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(8)
          }]
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
          style: [styles.content, {
            opacity: this.state.opacityValue
          }, this.props.style]
        }, _react.default.isValidElement(this.state.text) ? this.state.text : /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          style: [{
            color: '#FFFFFF',
            fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(14),
            marginLeft: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16)
          }, this.props.textStyle]
        }, this.state.text), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.viewSilang,
          onPress: function onPress() {
            return _this4.close(10);
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[10]).allLogo.icSilang,
          style: styles.icSilang
        })))) : null;
      }
    }, {
      key: "calculatePosition",
      value: function calculatePosition() {
        switch (this.props.position) {
          case 'top':
            return this.props.positionValue;
          case 'center':
            return height / 2;
          case 'bottom':
          default:
            return height - this.props.positionValue;
        }
      }
    }]);
  }(_react.Component);
  Toast.defaultProps = {
    position: 'bottom',
    textStyle: {},
    positionValue: 120,
    fadeInDuration: 500,
    fadeOutDuration: 500,
    opacity: 1
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      position: 'absolute',
      left: 0,
      right: 0,
      elevation: 999,
      alignItems: 'center',
      zIndex: 10000
    },
    content: {
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(344),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(50),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(4),
      backgroundColor: '#5AAA0F',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    text: {
      color: '#FFFFFF',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(14),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(16)
    },
    viewSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(4),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(8)
    },
    icSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[9]).toDp)(20),
      tintColor: '#FFFFFF'
    }
  });
