  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
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
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var NoConnection = /*#__PURE__*/function (_Component) {
    function NoConnection(props) {
      var _this;
      (0, _classCallCheck2.default)(this, NoConnection);
      _this = _callSuper(this, NoConnection, [props]);
      _this.state = {
        darkMode: false
      };
      return _this;
    }
    (0, _inherits2.default)(NoConnection, _Component);
    return (0, _createClass2.default)(NoConnection, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [styles.container, {
            backgroundColor: this.state.darkMode ? '#121212' : '#f5f7f8'
          }]
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[9]).allLogo.imgNoConnection,
          style: styles.imgNoConnection
        }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          style: [styles.desc, {
            color: this.state.darkMode ? 'white' : '#5E6157'
          }]
        }, "Maaf, tidak ada koneksi internet."));
      }
    }]);
  }(_react.Component);
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      backgroundColor: '#f5f7f8',
      justifyContent: 'center',
      alignItems: 'center'
      //paddingHorizontal: toDp(16),
    },
    imgNoConnection: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(120),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(120),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(-60)
    },
    title: {
      color: '#000000',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      //fontFamily: 'Montserrat-SemiBold',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(8)
    },
    desc: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      textAlign: 'center'
    }
  });
  var _default = exports.default = NoConnection;
