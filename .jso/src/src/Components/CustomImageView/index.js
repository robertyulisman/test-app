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
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNativeImagePanZoom = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } // @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var CustomImageView = /*#__PURE__*/function (_Component) {
    function CustomImageView(props) {
      var _this;
      (0, _classCallCheck2.default)(this, CustomImageView);
      _this = _callSuper(this, CustomImageView, [props]);
      _this.renderModal = function () {
        return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
          animationIn: 'fadeIn',
          animationOut: 'fadeOut',
          onBackButtonPress: function onBackButtonPress() {
            return _this.setState({
              modalVisible: false
            });
          },
          isVisible: _this.state.modalVisible,
          style: styles.bottomModal
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [styles.viewRootModal, {
            height: height
          }]
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [styles.modalBox, {
            backgroundColor: '#000000',
            height: height
          }]
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewModalTitle
        }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.touchSilang,
          onPress: function onPress() {
            _this.setState({
              modalVisible: false
            });
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[10]).allLogo.icSilang,
          style: [styles.icSilang, {
            tintColor: 'white'
          }]
        }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewCenter
        }, "// @ts-expect-error TS(2769): No overload matches this call.", /*#__PURE__*/_react.default.createElement(_reactNativeImagePanZoom.default, {
          cropWidth: _reactNative.Dimensions.get('window').width,
          cropHeight: _reactNative.Dimensions.get('window').height,
          imageWidth: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(400),
          imageHeight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(400)
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          style: {
            resizeMode: 'contain',
            width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(400),
            height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(400)
          },
          source: {
            uri: _this.props.uri
          }
        }))))));
      };
      _this.state = {
        modalVisible: false
      };
      return _this;
    }
    (0, _inherits2.default)(CustomImageView, _Component);
    return (0, _createClass2.default)(CustomImageView, [{
      key: "render",
      value: function render() {
        var _this2 = this;
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.container
        }, this.renderModal(), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          onPress: function onPress() {
            return _this2.setState({
              modalVisible: true
            });
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: {
            uri: this.props.uri
          },
          style: this.props.style
        })));
      }
    }]);
  }(_react.Component);
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1
    },
    viewCenter: {
      width: width,
      alignItems: 'center'
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0
    },
    viewRootModal: {
      width: width
    },
    modalBox: {
      width: width
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewModalTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      top: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      backgroundColor: '#121212',
      zIndex: 1
    },
    icSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      tintColor: 'white'
    }
  });
  var _default = exports.default = CustomImageView;
