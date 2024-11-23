  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[8]);
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var Empty = /*#__PURE__*/function (_Component) {
    function Empty(props) {
      var _this;
      (0, _classCallCheck2.default)(this, Empty);
      _this = _callSuper(this, Empty, [props]);
      _this.state = {
        darkMode: false
      };
      return _this;
    }
    (0, _inherits2.default)(Empty, _Component);
    return (0, _createClass2.default)(Empty, [{
      key: "componentDidMount",
      value: function () {
        var _componentDidMount = (0, _asyncToGenerator2.default)(function* () {
          var darkMode = yield _reactNative.AsyncStorage.getItem('darkMode');
          this.setState({
            darkMode: JSON.parse(darkMode)
          });
        });
        function componentDidMount() {
          return _componentDidMount.apply(this, arguments);
        }
        return componentDidMount;
      }()
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.container
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: this.props.images,
          style: styles.imgEmpty
        }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          style: [styles.desc, {
            color: '#5E6157'
          }]
        }, this.props.title), this.props.subtitle ? /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          style: [styles.subtitle, {
            color: '#5E6157'
          }]
        }, this.props.subtitle) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null));
      }
    }]);
  }(_react.Component);
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      width: width
    },
    imgEmpty: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(120),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(120),
      resizeMode: 'contain',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(-60)
    },
    title: {
      color: '#000000',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(8)
    },
    desc: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      textAlign: 'center'
    },
    subtitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      textAlign: 'center',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(30)
    }
  });
  var _default = exports.default = Empty;
