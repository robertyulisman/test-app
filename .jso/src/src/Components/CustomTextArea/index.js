  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _extends2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[9]);
  var _asyncStorage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var CustomTextArea = /*#__PURE__*/function (_Component) {
    function CustomTextArea(props) {
      var _this;
      (0, _classCallCheck2.default)(this, CustomTextArea);
      _this = _callSuper(this, CustomTextArea, [props]);
      _this.state = {
        darkMode: false
      };
      return _this;
    }
    (0, _inherits2.default)(CustomTextArea, _Component);
    return (0, _createClass2.default)(CustomTextArea, [{
      key: "componentDidMount",
      value: function () {
        var _componentDidMount = (0, _asyncToGenerator2.default)(function* () {
          var darkMode = yield _asyncStorage.default.getItem('darkMode');
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
        var _this$props = this.props,
          title = _this$props.title,
          error = _this$props.error,
          maxLength = _this$props.maxLength,
          value = _this$props.value,
          inputRef = _this$props.inputRef,
          _onChangeText = _this$props.onChangeText,
          _onSubmitEditing = _this$props.onSubmitEditing,
          placeholder = _this$props.placeholder,
          secureTextEntry = _this$props.secureTextEntry,
          onChangeSecure = _this$props.onChangeSecure,
          type = _this$props.type;
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewForm
        }, title !== '' && /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "regular",
          style: styles.textTitle
        }, title), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [styles.viewText, error !== '' && styles.viewError, {
            height: _reactNative.Platform.OS === 'android' ? title === 'Info Unit' ? (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(66) : (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80) : title === 'Info Unit' ? (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(60) : (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(70)
          }]
        }, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, (0, _extends2.default)({
          ref: function ref(r) {
            return inputRef && inputRef(r);
          },
          onChangeText: function onChangeText(text) {
            return _onChangeText(text);
          },
          onSubmitEditing: function onSubmitEditing() {
            return _onSubmitEditing && _onSubmitEditing();
          },
          maxLength: maxLength,
          autoCapitalize: 'none',
          underlineColorAndroid: 'transparent',
          value: value,
          secureTextEntry: secureTextEntry,
          style: [styles.textInput, {
            color: this.state.darkMode ? 'white' : '#383B34'
          }],
          placeholder: placeholder,
          placeholderTextColor: '#CCCFC9'
        }, this.props, {
          multiline: true,
          numberOfLines: 3,
          textAlignVertical: 'top'
        })), type === 'password' && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.touchEye,
          onPress: function onPress() {
            return onChangeSecure();
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: secureTextEntry ? _$$_REQUIRE(_dependencyMap[13]).allLogo.icEyeNonActive : _$$_REQUIRE(_dependencyMap[13]).allLogo.icEyeActive,
          style: styles.icEye
        }))), error !== '' && /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          style: styles.textError
        }, error));
      }
    }]);
  }(_react.Component);
  var styles = _reactNative.StyleSheet.create({
    viewForm: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(67)
    },
    textTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#9B9F95',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.6),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2)
    },
    viewText: {
      width: '100%',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      backgroundColor: '#F6F7F4',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10)
    },
    textInput: {
      flex: 1,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#273238',
      marginHorizontal: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(-4) : 0,
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      fontFamily: 'Poppins-Regular',
      fontWeight: '400'
    },
    textError: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      color: '#F5493C',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.05)
    },
    viewError: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      borderColor: '#F5493C',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1)
    },
    customRow: {
      flexDirection: 'row',
      width: '100%',
      backgroundColor: 'red'
    },
    touchEye: {
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      bottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8)
    },
    icEye: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20.3),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      tintColor: '#B0BEC5',
      resizeMode: 'contain'
    }
  });
  var _default = exports.default = CustomTextArea;
