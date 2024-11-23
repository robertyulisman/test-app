  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _readOnlyError2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _extends2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[9]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } // @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
  var styles = {
    container: {
      backgroundColor: 'transparent',
      position: 'relative',
      flex: 1
    },
    wrapperIOS: {
      backgroundColor: 'transparent'
    },
    wrapperAndroid: {
      backgroundColor: 'transparent',
      flex: 1
    },
    slide: {
      backgroundColor: 'transparent'
    },
    pagination_x: {
      position: 'absolute',
      bottom: 25,
      left: 0,
      right: 0,
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    pagination_y: {
      position: 'absolute',
      right: 15,
      top: 0,
      bottom: 0,
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    title: {
      height: 30,
      justifyContent: 'center',
      position: 'absolute',
      paddingLeft: 10,
      bottom: -30,
      left: 0,
      flexWrap: 'nowrap',
      width: 250,
      backgroundColor: 'transparent'
    },
    buttonWrapper: {
      backgroundColor: 'transparent',
      flexDirection: 'row',
      position: 'absolute',
      top: 0,
      left: 0,
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 10,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    buttonText: {
      fontSize: 50,
      color: '#007aff'
    }
  };

  // missing `module.exports = exports['default'];` with babel6
  // export default React.createClass({
  var _default = exports.default = /*#__PURE__*/function (_Component) {
    function _default(_props) {
      var _this;
      (0, _classCallCheck2.default)(this, _default);
      _this = _callSuper(this, _default, [_props]);
      _this.initialRender = true;
      _this.autoplayTimer = null;
      _this.loopJumpTimer = null;
      _this.onLayout = function (event) {
        var _event$nativeEvent$la = event.nativeEvent.layout,
          width = _event$nativeEvent$la.width,
          height = _event$nativeEvent$la.height;
        var offset = _this.internals.offset = {};
        var state = {
          width: width,
          height: height
        };
        if (_this.state.total > 1) {
          var setup = _this.state.index;
          if (_this.props.loop) {
            setup++;
          }
          offset[_this.state.dir] = _this.state.dir === 'y' ? height * setup : width * setup;
        }

        // only update the offset in state if needed, updating offset while swiping
        // causes some bad jumping / stuttering
        if (!_this.state.offset) {
          state.offset = offset;
        }

        // related to https://github.com/leecade/react-native-swiper/issues/570
        // contentOffset is not working in react 0.48.x so we need to use scrollTo
        // to emulate offset.
        if (_this.state.total > 1) {
          _this.scrollView.scrollTo(Object.assign(Object.assign({}, offset), {}, {
            animated: false
          }));
        }
        if (_this.initialRender) {
          _this.initialRender = false;
        }
        _this.setState(state);
      };
      _this.loopJump = function () {
        if (!_this.state.loopJump) return;
        var i = _this.state.index + (_this.props.loop ? 1 : 0);
        var scrollView = _this.scrollView;
        _this.loopJumpTimer = setTimeout(function () {
          if (scrollView.setPageWithoutAnimation) {
            scrollView.setPageWithoutAnimation(i);
          } else {
            if (_this.state.index === 0) {
              scrollView.scrollTo(_this.props.horizontal === false ? {
                x: 0,
                y: _this.state.height,
                animated: false
              } : {
                x: _this.state.width,
                y: 0,
                animated: false
              });
            } else if (_this.state.index === _this.state.total - 1) {
              _this.props.horizontal === false ? _this.scrollView.scrollTo({
                x: 0,
                y: _this.state.height * _this.state.total,
                animated: false
              }) : _this.scrollView.scrollTo({
                x: _this.state.width * _this.state.total,
                y: 0,
                animated: false
              });
            }
          }
        },
        // Important Parameter
        // ViewPager 50ms, ScrollView 300ms
        scrollView.setPageWithoutAnimation ? 50 : 300);
      };
      /**
       * Automatic rolling
       */
      _this.autoplay = function () {
        if (!Array.isArray(_this.state.children) || !_this.props.autoplay || _this.internals.isScrolling || _this.state.autoplayEnd) return;

        // @ts-expect-error TS(2304): Cannot find name 'clearTimeout'.
        _this.autoplayTimer && clearTimeout(_this.autoplayTimer);
        _this.autoplayTimer = setTimeout(function () {
          if (!_this.props.loop && (_this.props.autoplayDirection ? _this.state.index === _this.state.total - 1 : _this.state.index === 0)) return _this.setState({
            autoplayEnd: true
          });
          _this.scrollBy(_this.props.autoplayDirection ? 1 : -1);
        }, _this.props.autoplayTimeout * 1000);
      };
      /**
       * Scroll begin handle
       * @param  {object} e native event
       */
      _this.onScrollBegin = function (e) {
        // update scroll state
        _this.internals.isScrolling = true;
        _this.props.onScrollBeginDrag && _this.props.onScrollBeginDrag(e, _this.fullState(), _this);
      };
      /**
       * Scroll end handle
       * @param  {object} e native event
       */
      _this.onScrollEnd = function (e) {
        // update scroll state
        _this.internals.isScrolling = false;

        // making our events coming from android compatible to updateIndex logic
        if (!e.nativeEvent.contentOffset) {
          if (_this.state.dir === 'x') {
            e.nativeEvent.contentOffset = {
              x: e.nativeEvent.position * _this.state.width
            };
          } else {
            e.nativeEvent.contentOffset = {
              y: e.nativeEvent.position * _this.state.height
            };
          }
        }
        _this.updateIndex(e.nativeEvent.contentOffset, _this.state.dir, function () {
          _this.autoplay();
          _this.loopJump();
        });
        // if `onMomentumScrollEnd` registered will be called here
        _this.props.onMomentumScrollEnd && _this.props.onMomentumScrollEnd(e, _this.fullState(), _this);
      };
      /*
       * Drag end handle
       * @param {object} e native event
       */
      _this.onScrollEndDrag = function (e) {
        var contentOffset = e.nativeEvent.contentOffset;
        var horizontal = _this.props.horizontal;
        var _this$state = _this.state,
          children = _this$state.children,
          index = _this$state.index;
        var offset = _this.internals.offset;
        var previousOffset = horizontal ? offset.x : offset.y;
        var newOffset = horizontal ? contentOffset.x : contentOffset.y;
        if (previousOffset === newOffset && (index === 0 || index === children.length - 1)) {
          _this.internals.isScrolling = false;
        }
      };
      /**
       * Update index after scroll
       * @param  {object} offset content offset
       * @param  {string} dir    'x' || 'y'
       */
      _this.updateIndex = function (offset, dir, cb) {
        var state = _this.state;
        // Android ScrollView will not scrollTo certain offset when props change
        var index = state.index;
        if (!_this.internals.offset)
          // Android not setting this onLayout first? https://github.com/leecade/react-native-swiper/issues/582
          _this.internals.offset = {};
        var diff = offset[dir] - (_this.internals.offset[dir] || 0);
        var step = dir === 'x' ? state.width : state.height;
        var loopJump = false;

        // Do nothing if offset no change.
        if (!diff) return;

        // Note: if touch very very quickly and continuous,
        // the variation of `index` more than 1.
        // parseInt() ensures it's always an integer
        index = parseInt(index + Math.round(diff / step));
        if (_this.props.loop) {
          if (index <= -1) {
            index = state.total - 1;
            offset[dir] = step * state.total;
            loopJump = true;
          } else if (index >= state.total) {
            index = 0;
            offset[dir] = step;
            loopJump = true;
          }
        }
        var newState = {};
        newState.index = index;
        newState.loopJump = loopJump;
        _this.internals.offset = offset;

        // only update offset in state if loopJump is true
        if (loopJump) {
          // when swiping to the beginning of a looping set for the third time,
          // the new offset will be the same as the last one set in state.
          // Setting the offset to the same thing will not do anything,
          // so we increment it by 1 then immediately set it to what it should be,
          // after render.
          if (offset[dir] === _this.internals.offset[dir]) {
            newState.offset = {
              x: 0,
              y: 0
            };
            newState.offset[dir] = offset[dir] + 1;
            _this.setState(newState, function () {
              _this.setState({
                offset: offset
              }, cb);
            });
          } else {
            newState.offset = offset;
            _this.setState(newState, cb);
          }
        } else {
          _this.setState(newState, cb);
        }
      };
      /**
       * Scroll by index
       * @param  {number} index offset index
       * @param  {bool} animated
       */
      _this.scrollBy = function (index) {
        var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        if (_this.internals.isScrolling || _this.state.total < 2) return;
        var state = _this.state;
        var diff = (_this.props.loop ? 1 : 0) + index + _this.state.index;
        var x = 0;
        var y = 0;
        if (state.dir === 'x') x = diff * state.width;
        if (state.dir === 'y') y = diff * state.height;
        _this.scrollView && _this.scrollView.scrollTo({
          x: x,
          y: y,
          animated: animated
        });

        // update scroll state
        _this.internals.isScrolling = true;
        _this.setState({
          autoplayEnd: false
        });

        // trigger onScrollEnd manually in android
        if (!animated || _reactNative.Platform.OS !== 'ios') {
          // @ts-expect-error TS(2304): Cannot find name 'setImmediate'.
          setImmediate(function () {
            _this.onScrollEnd({
              nativeEvent: {
                position: diff
              }
            });
          });
        }
      };
      /**
       * Scroll to index
       * @param  {number} index page
       * @param  {bool} animated
       */
      _this.scrollTo = function (index) {
        var animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        if (_this.internals.isScrolling || _this.state.total < 2 || index == _this.state.index) return;
        var state = _this.state;
        var diff = _this.state.index + (index - _this.state.index);
        var x = 0;
        var y = 0;
        if (state.dir === 'x') x = diff * state.width;
        if (state.dir === 'y') y = diff * state.height;
        _this.scrollView && _this.scrollView.scrollTo({
          x: x,
          y: y,
          animated: animated
        });

        // update scroll state
        _this.internals.isScrolling = true;
        _this.setState({
          autoplayEnd: false
        });

        // trigger onScrollEnd manually in android
        if (!animated || _reactNative.Platform.OS !== 'ios') {
          // @ts-expect-error TS(2304): Cannot find name 'setImmediate'.
          setImmediate(function () {
            _this.onScrollEnd({
              nativeEvent: {
                position: diff
              }
            });
          });
        }
      };
      _this.scrollViewPropOverrides = function () {
        var props = _this.props;
        var overrides = {};

        /*
        const scrollResponders = [
          'onMomentumScrollBegin',
          'onTouchStartCapture',
          'onTouchStart',
          'onTouchEnd',
          'onResponderRelease',
        ]
        */
        var _loop = function _loop() {
          if (typeof props[prop] === 'function' && prop !== 'onMomentumScrollEnd' && prop !== 'renderPagination' && prop !== 'onScrollBeginDrag') {
            var originResponder = props[prop];
            overrides[prop] = function (e) {
              return originResponder(e, _this.fullState(), _this);
            };
          }
        };
        for (var prop in props) {
          _loop();
        }
        return overrides;
      };
      /**
       * Render pagination
       * @return {object} react-dom
       */
      _this.renderPagination = function () {
        // By default, dots only show when `total` >= 2
        if (_this.state.total <= 1) return null;
        var dots = [];
        var ActiveDot = _this.props.activeDot || /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [{
            backgroundColor: _this.props.activeDotColor || '#007aff',
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3
          }, _this.props.activeDotStyle]
        });
        var Dot = _this.props.dot || /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [{
            backgroundColor: _this.props.dotColor || 'rgba(0,0,0,.2)',
            width: 8,
            height: 8,
            borderRadius: 4,
            marginLeft: 3,
            marginRight: 3,
            marginTop: 3,
            marginBottom: 3
          }, _this.props.dotStyle]
        });
        for (var i = 0; i < _this.state.total; i++) {
          dots.push(i === _this.state.index ? _react.default.cloneElement(ActiveDot, {
            key: i
          }) : _react.default.cloneElement(Dot, {
            key: i
          }));
        }
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          pointerEvents: "none",
          style: [styles["pagination_" + _this.state.dir], _this.props.paginationStyle]
        }, dots);
      };
      _this.renderTitle = function () {
        var child = _this.state.children[_this.state.index];
        var title = child && child.props && child.props.title;
        return title ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.title
        }, _this.state.children[_this.state.index].props.title) : null;
      };
      _this.renderNextButton = function () {
        var button = null;
        if (_this.props.loop || _this.state.index !== _this.state.total - 1) {
          button = _this.props.nextButton || /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
            style: styles.buttonText
          }, "\u203A");
        }
        return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          onPress: function onPress() {
            return button !== null && _this.scrollBy(1);
          },
          disabled: _this.props.disableNextButton
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, button));
      };
      _this.renderPrevButton = function () {
        var button = null;
        if (_this.props.loop || _this.state.index !== 0) {
          button = _this.props.prevButton || /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
            style: styles.buttonText
          }, "\u2039");
        }
        return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          onPress: function onPress() {
            return button !== null && _this.scrollBy(-1);
          },
          disabled: _this.props.disablePrevButton
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, button));
      };
      _this.renderButtons = function () {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          pointerEvents: "box-none",
          style: [styles.buttonWrapper, {
            width: _this.state.width,
            height: _this.state.height
          }, _this.props.buttonWrapperStyle]
        }, _this.renderPrevButton(), _this.renderNextButton());
      };
      _this.refScrollView = function (view) {
        _this.scrollView = view;
      };
      _this.onPageScrollStateChanged = function (state) {
        switch (state) {
          case 'dragging':
            return _this.onScrollBegin();
          case 'idle':
          case 'settling':
            if (_this.props.onTouchEnd) _this.props.onTouchEnd();
        }
      };
      _this.renderScrollView = function (pages) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, (0, _extends2.default)({
          ref: _this.refScrollView
        }, _this.props, _this.scrollViewPropOverrides(), {
          contentContainerStyle: [styles.wrapperIOS, _this.props.style],
          contentOffset: _this.state.offset,
          onScrollBeginDrag: _this.onScrollBegin,
          onMomentumScrollEnd: _this.onScrollEnd,
          onScrollEndDrag: _this.onScrollEndDrag,
          style: _this.props.scrollViewStyle
        }), pages);
      };
      _this.state = _this.initState(_this.props);
      return _this;
    }
    (0, _inherits2.default)(_default, _Component);
    return (0, _createClass2.default)(_default, [{
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps) {
        // @ts-expect-error TS(2304): Cannot find name 'clearTimeout'.
        if (!nextProps.autoplay && this.autoplayTimer) clearTimeout(this.autoplayTimer);
        if (nextProps.index === this.props.index) return;
        this.setState(this.initState(nextProps, this.props.index !== nextProps.index));
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.autoplay();
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        // @ts-expect-error TS(2304): Cannot find name 'clearTimeout'.
        this.autoplayTimer && clearTimeout(this.autoplayTimer);
        // @ts-expect-error TS(2304): Cannot find name 'clearTimeout'.
        this.loopJumpTimer && clearTimeout(this.loopJumpTimer);
      }
    }, {
      key: "UNSAFE_componentWillUpdate",
      value: function UNSAFE_componentWillUpdate(nextProps, nextState) {
        // If the index has changed, we notify the parent via the onIndexChanged callback
        if (this.state.index !== nextState.index) this.props.onIndexChanged(nextState.index);
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        // If autoplay props updated to true, autoplay immediately
        if (this.props.autoplay && !prevProps.autoplay) {
          this.autoplay();
        }
        if (this.props.children !== prevProps.children) {
          if (this.props.loadMinimal && _reactNative.Platform.OS === 'ios') {
            this.setState(Object.assign(Object.assign({}, this.props), {}, {
              index: this.state.index
            }));
          } else {
            this.setState(this.initState(Object.assign(Object.assign({}, this.props), {}, {
              index: this.state.index
            }), true));
          }
        }
      }
    }, {
      key: "initState",
      value: function initState(props) {
        var updateIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        // set the current state
        var state = this.state || {
          width: 0,
          height: 0,
          offset: {
            x: 0,
            y: 0
          }
        };
        var initState = {
          autoplayEnd: false,
          children: null,
          loopJump: false,
          offset: {}
        };

        // Support Optional render page
        initState.children = Array.isArray(props.children) ? props.children.filter(function (child) {
          return child;
        }) : props.children;
        initState.total = initState.children ? initState.children.length || 1 : 0;
        if (state.total === initState.total && !updateIndex) {
          // retain the index
          initState.index = state.index;
        } else {
          initState.index = initState.total > 1 ? Math.min(props.index, initState.total - 1) : 0;
        }

        // Default: horizontal
        var _Dimensions$get = _reactNative.Dimensions.get('window'),
          width = _Dimensions$get.width,
          height = _Dimensions$get.height;
        initState.dir = props.horizontal === false ? 'y' : 'x';
        if (props.width) {
          initState.width = props.width;
        } else if (this.state && this.state.width) {
          initState.width = this.state.width;
        } else {
          initState.width = width;
        }
        if (props.height) {
          initState.height = props.height;
        } else if (this.state && this.state.height) {
          initState.height = this.state.height;
        } else {
          initState.height = height;
        }
        initState.offset[initState.dir] = initState.dir === 'y' ? initState.height * props.index : initState.width * props.index;
        this.internals = Object.assign(Object.assign({}, this.internals), {}, {
          isScrolling: false
        });
        return initState;
      }

      // include internals with state
    }, {
      key: "fullState",
      value: function fullState() {
        return Object.assign({}, this.state, this.internals);
      }
    }, {
      key: "render",
      value:
      /**
       * Default render
       * @return {object} react-dom
       */
      function render() {
        var _this$state2 = this.state,
          index = _this$state2.index,
          total = _this$state2.total,
          width = _this$state2.width,
          height = _this$state2.height,
          children = _this$state2.children;
        var _this$props = this.props,
          containerStyle = _this$props.containerStyle,
          loop = _this$props.loop,
          loadMinimal = _this$props.loadMinimal,
          loadMinimalSize = _this$props.loadMinimalSize,
          loadMinimalLoader = _this$props.loadMinimalLoader,
          renderPagination = _this$props.renderPagination,
          showsButtons = _this$props.showsButtons,
          showsPagination = _this$props.showsPagination;
        // let dir = state.dir
        // let key = 0
        var loopVal = loop ? 1 : 0;
        var pages = [];
        var pageStyle = [{
          width: width,
          height: height
        }, styles.slide];
        var pageStyleLoading = {
          width: width,
          height: height,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        };

        // For make infinite at least total > 1
        if (total > 1) {
          // Re-design a loop model for avoid img flickering
          pages = Object.keys(children);
          if (loop) {
            pages.unshift(total - 1 + '');
            pages.push('0');
          }
          pages = pages.map(function (page, i) {
            if (loadMinimal) {
              if (i >= index + loopVal - loadMinimalSize && i <= index + loopVal + loadMinimalSize ||
              // The real first swiper should be keep
              loop && i === 1 ||
              // The real last swiper should be keep
              loop && i === total - 1) {
                return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
                  style: pageStyle,
                  key: i
                }, children[page]);
              } else {
                return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
                  style: pageStyleLoading,
                  key: i
                }, loadMinimalLoader ? loadMinimalLoader : /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, null));
              }
            } else {
              return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
                style: pageStyle,
                key: i
              }, children[page]);
            }
          });
        } else {
          pages = /*#__PURE__*/_react.default.createElement(_reactNative.View, {
            style: pageStyle,
            key: 0
          }, children);
        }
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [styles.container, containerStyle],
          onLayout: this.onLayout
        }, this.renderScrollView(pages), showsPagination && (renderPagination ? renderPagination(index, total, this) : this.renderPagination()), this.renderTitle(), showsButtons && this.renderButtons());
      }
    }]);
  }(_react.Component);
  _default.defaultProps = {
    horizontal: true,
    pagingEnabled: true,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    bounces: false,
    scrollsToTop: false,
    removeClippedSubviews: true,
    automaticallyAdjustContentInsets: false,
    showsPagination: true,
    showsButtons: false,
    disableNextButton: false,
    disablePrevButton: false,
    loop: true,
    loadMinimal: false,
    loadMinimalSize: 1,
    autoplay: false,
    autoplayTimeout: 2.5,
    autoplayDirection: true,
    index: 0,
    onIndexChanged: function onIndexChanged() {
      return null;
    }
  };
