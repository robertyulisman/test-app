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
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[8]);
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var CustomTime = /*#__PURE__*/function (_Component) {
    function CustomTime(props) {
      var _this;
      (0, _classCallCheck2.default)(this, CustomTime);
      _this = _callSuper(this, CustomTime, [props]);
      _this.renderModal = function () {
        return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
          onBackButtonPress: function onBackButtonPress() {
            return _this.setState({
              modalVisible: false
            });
          },
          onBackdropPress: function onBackdropPress() {
            return _this.setState({
              modalVisible: false
            });
          },
          isVisible: _this.state.modalVisible,
          style: styles.bottomModal
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [styles.viewRootModal, {
            height: _this.props.arrayData.length >= 100 ? height * 0.75 : 'auto'
          }]
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [styles.modalBox, {
            backgroundColor: _this.props.darkMode ? '#121212' : 'white',
            height: height * 0.6
          }]
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewModalTitle
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: 'semibold',
          style: [styles.textTitleModal, {
            color: _this.props.darkMode && 'white'
          }]
        }, _this.props.title.toUpperCase()), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.touchSilang,
          onPress: function onPress() {
            return _this.setState({
              modalVisible: false
            });
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[10]).allLogo.icSilang,
          style: [styles.icSilang, {
            tintColor: _this.props.darkMode ? 'white' : '#5AAA0F'
          }]
        }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewCenter
        }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
          data: _this.state.arrayData,
          renderItem: function renderItem(_ref) {
            var item = _ref.item,
              index = _ref.index;
            return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
              style: [styles.viewTextModal, {
                backgroundColor: _this.props.darkMode ? '#1C1C1E' : '#e9ebed'
              }],
              key: index,
              onPress: function onPress() {
                _this.props.onSelected(item, index);
                _this.setState({
                  modalVisible: false
                });
              }
            }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
              allowFontScaling: false,
              style: [styles.textWhiteTitle, {
                color: _this.props.darkMode ? 'white' : '#273238'
              }]
            }, item.name ? item.name : item));
          },
          numColumns: 4
        })))));
      };
      _this.state = {
        modalVisible: false,
        text: '',
        lainnya: '',
        valueSearch: '',
        arrayData: []
      };
      return _this;
    }
    (0, _inherits2.default)(CustomTime, _Component);
    return (0, _createClass2.default)(CustomTime, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        if (prevProps.arrayData.length !== prevState.arrayData.length) {
          this.setState({
            arrayData: this.props.arrayData
          });
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;
        var _this$props = this.props,
          title = _this$props.title,
          desc = _this$props.desc,
          value = _this$props.value,
          inputRef = _this$props.inputRef,
          textPlaceholder = _this$props.textPlaceholder;
        return /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
          style: {
            paddingTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24)
          }
        }, this.renderModal(), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: 'semibold',
          style: [styles.textPukul, {
            color: this.props.darkMode ? 'white' : '#9B9F95'
          }]
        }, "Pukul berapa layanan ini akan dikerjakan?"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          onPress: function onPress() {
            return _this2.setState({
              modalVisible: true
            });
          },
          style: [styles.viewValueForm, {
            backgroundColor: this.props.darkMode ? '#121212' : '#EEEEEE',
            borderColor: this.props.darkMode ? '#121212' : '#d8d8d8',
            borderWidth: 0,
            marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20)
          }]
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          style: [styles.textTime, {
            color: value === '0' ? '#9B9F95' : '#5E6157'
          }]
        }, value === '0' ? '00.00' : value)));
      }
    }]);
  }(_react.Component);
  var styles = _reactNative.StyleSheet.create({
    viewForm: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(67)
    },
    textTitle: {
      // fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(12),
      color: '#788F9C',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(0.6)
    },
    viewText: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4),
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(32),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1),
      borderColor: '#788F9C',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    icChevronDown: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20.3),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      tintColor: '#b0bec5',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8)
    },
    textValue: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14)
      // fontFamily: 'Montserrat-Regular',
    },
    textInclude: {
      color: 'red',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      fontWeight: '500'
      // fontFamily: 'Montserrat-Medium',
    },
    textInput: {
      flex: 1,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      fontWeight: '300',
      color: '#757575'
    },
    textDesc: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(12),
      fontWeight: '300',
      color: '#9B9B9B'
    },
    viewCategoryMenu: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(56),
      justifyContent: 'center',
      alignItems: 'center'
      // borderTopWidth: 1,
      // borderTopColor: '#BDBDBD'
    },
    viewTextModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(60),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(48),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4),
      backgroundColor: '#EEEEEE',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textWhiteTitle: {
      color: '#273238',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16)
      // fontFamily: 'Montserrat-Regular',
    },
    viewCenter: {
      width: width,
      alignItems: 'center'
    },
    viewTextInput: {
      width: '90%',
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(54),
      backgroundColor: '#FFFFFF',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4),
      justifyContent: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1),
      borderColor: '#E0E0E0'
    },
    textInputNew: {
      color: 'black',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      // fontFamily: 'Montserrat-Medium',
      fontWeight: '500'
    },
    row: {
      flexDirection: 'row',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      alignItems: 'center',
      width: width * 0.9,
      height: 'auto',
      backgroundColor: '#FFFFFF'
    },
    viewTextTitle: {
      flex: 1,
      height: 'auto',
      backgroundColor: '#FFFFFF'
    },
    linearButton: {
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(36),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(54),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(54),
      alignItems: 'center',
      justifyContent: 'center'
    },
    viewButton: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(54),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(54),
      alignItems: 'center',
      justifyContent: 'center'
    },
    header: {
      width: '100%',
      height: 'auto',
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(12),
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(12),
      backgroundColor: '#f5f5f5',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 1.0,
      elevation: 4
    },
    linearHeader: {
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(48),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(12),
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(12),
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 1.0,
      elevation: 4
    },
    title: {
      color: '#151d2c',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      fontWeight: '500',
      fontFamily: _reactNative.Platform.OS === 'ios' ? 'Montserrat-Regular' : 'Montserrat-SemiBold'
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0
    },
    viewRootModal: {
      width: width,
      position: 'absolute',
      bottom: 0
    },
    modalBox: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(165),
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewSearchRoot: {
      flexDirection: 'row',
      alignItems: 'center',
      //marginTop: toDp(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8)
    },
    viewSearch: {
      width: '90%',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1),
      borderColor: '#788f9c',
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(44),
      alignItems: 'center',
      flexDirection: 'row'
    },
    icSearch2: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20.3),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      tintColor: '#b0bec5'
    },
    touchAll: {
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8)
    },
    icDeleteAll: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24)
    },
    textInput: {
      flex: 1,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      color: '#757575',
      // fontFamily: 'Montserrat-Medium',
      fontWeight: '300'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      // fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(2),
      color: '#9B9F95'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(0)
    },
    icSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      tintColor: '#917438'
    },
    textInputSearch: {
      flex: 1,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      color: '#273238'
      // fontFamily: 'Montserrat-Regular',
    },
    lineModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(64),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(7),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(15)
    },
    centerEmpty: {
      alignItems: 'center'
    },
    emptySearch: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(60),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      color: '#273238'
      // fontFamily: 'Montserrat-Regular',
    },
    textPukul: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      // fontFamily: 'Montserrat-Bold',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(0.5)
    },
    viewForm: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      width: '100%',
      height: 'auto',
      padding: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4),
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      justifyContent: 'center',
      alignItems: 'center'
    },
    viewValueForm: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1),
      borderColor: '#D8D8D8',
      backgroundColor: '#EEEEEE',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textTime: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14)
      // fontFamily: 'Montserrat-Regular',
    },
    red: {
      color: '#f5493c'
    }
  });
  var _default = exports.default = CustomTime;
