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
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[7]);
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } // @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
  var styles = _reactNative.StyleSheet.create({
    fullTextWrapper: {
      opacity: 0,
      position: 'absolute',
      left: 0,
      top: 0
    },
    viewMoreText: {
      color: 'blue'
    },
    transparent: {
      opacity: 0
    }
  });
  var ViewMoreText = /*#__PURE__*/function (_React$Component) {
    function ViewMoreText(props) {
      var _this;
      (0, _classCallCheck2.default)(this, ViewMoreText);
      _this = _callSuper(this, ViewMoreText, [props]);
      _this.trimmedTextHeight = null;
      _this.fullTextHeight = null;
      _this.shouldShowMore = false;
      _this.hideFullText = function () {
        if (_this.state.isFulltextShown && _this.trimmedTextHeight && _this.fullTextHeight) {
          _this.shouldShowMore = _this.trimmedTextHeight < _this.fullTextHeight;
          _this.setState({
            isFulltextShown: false
          });
        }
      };
      _this.onLayoutTrimmedText = function (event) {
        var height = event.nativeEvent.layout.height;
        _this.trimmedTextHeight = height;
        _this.hideFullText();
      };
      _this.onLayoutFullText = function (event) {
        var height = event.nativeEvent.layout.height;
        _this.fullTextHeight = height;
        _this.hideFullText();
      };
      _this.onPressMore = function () {
        _this.setState({
          numberOfLines: null
        }, function () {
          _this.props.afterExpand();
        });
      };
      _this.onPressLess = function () {
        _this.setState({
          numberOfLines: _this.props.numberOfLines
        }, function () {
          _this.props.afterCollapse();
        });
      };
      _this.getWrapperStyle = function () {
        if (_this.state.isFulltextShown) {
          return styles.transparent;
        }
        return {};
      };
      _this.renderViewMore = function () {
        return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          style: styles.viewMoreText,
          onPress: _this.onPressMore
        }, "View More");
      };
      _this.renderViewLess = function () {
        return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          style: styles.viewMoreText,
          onPress: _this.onPressLess
        }, "View Less");
      };
      _this.renderFooter = function () {
        var numberOfLines = _this.state.numberOfLines;
        if (_this.shouldShowMore === true) {
          if (numberOfLines > 0) {
            return (_this.props.renderViewMore || _this.renderViewMore)(_this.onPressMore);
          }
          return (_this.props.renderViewLess || _this.renderViewLess)(_this.onPressLess);
        }
        return null;
      };
      _this.renderFullText = function () {
        if (_this.state.isFulltextShown) {
          return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
            onLayout: _this.onLayoutFullText,
            style: styles.fullTextWrapper
          }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
            style: _this.props.textStyle
          }, _this.props.children));
        }
        return null;
      };
      _this.state = {
        isFulltextShown: true,
        numberOfLines: _this.props.numberOfLines
      };
      return _this;
    }
    (0, _inherits2.default)(ViewMoreText, _React$Component);
    return (0, _createClass2.default)(ViewMoreText, [{
      key: "render",
      value: function render() {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: this.getWrapperStyle()
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          onLayout: this.onLayoutTrimmedText
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          style: this.props.textStyle,
          numberOfLines: this.state.numberOfLines
        }, this.props.children), this.renderFooter()), this.renderFullText());
      }
    }]);
  }(_react.default.Component);
  ViewMoreText.defaultProps = {
    afterCollapse: function afterCollapse() {},
    afterExpand: function afterExpand() {},
    textStyle: {}
  };
  var _default = exports.default = ViewMoreText;
