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
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var CustomComboBox = /*#__PURE__*/function (_Component) {
    function CustomComboBox(props) {
      var _this;
      (0, _classCallCheck2.default)(this, CustomComboBox);
      _this = _callSuper(this, CustomComboBox, [props]);
      _this.searchInput = null;
      _this.scrollView = null;
      _this.onChangeTextSearch = function (valueSearch) {
        _this.setState({
          valueSearch: valueSearch
        }, function () {
          var newData = _this.state.arrayHolder.filter(function (item) {
            var itemData = item.name ? item.name.toUpperCase() : item.toUpperCase();
            var textData = valueSearch.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          _this.setState({
            arrayData: newData
          }, function () {});
        });
      };
      _this.renderSearch = function () {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewSearchRoot
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [styles.viewSearch, _this.state.valueSearch !== '' ? styles.viewCustomSearch : {}]
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[10]).allLogo.icSearch,
          style: styles.icSearch2
        }), /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
          ref: function ref(_ref) {
            _this.searchInput = _ref;
          },
          onChangeText: function onChangeText(valueSearch) {
            return _this.onChangeTextSearch(valueSearch);
          },
          autoCapitalize: 'none',
          underlineColorAndroid: 'transparent',
          value: _this.state.valueSearch,
          style: [styles.textInputSearch, {
            marginLeft: _reactNative.Platform.OS === 'ios' ? (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8) : (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(2),
            color: _this.props.darkMode ? 'white' : '#273238'
          }],
          maxLength: 20,
          placeholder: 'Cari ' + _this.props.title.toLowerCase() + '...',
          autoFocus: false,
          placeholderTextColor: '#9B9F95'
        }), _this.state.valueSearch !== '' && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.touchAll,
          onPress: function onPress() {
            return _this.onChangeTextSearch('');
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[10]).allLogo.icSearchClear,
          style: styles.icSilangClear
        }))));
      };
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
            height: 'auto'
          }]
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [styles.modalBox, {
            backgroundColor: _this.props.darkMode ? '#121212' : 'white',
            height: height * 0.6
          }]
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewModalTitle
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
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
          style: styles.icSilang
        }))), _this.renderSearch(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16)
          }
        }), _this.state.arrayData.length === 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.centerEmpty
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "regular",
          style: [styles.emptySearch, {
            color: _this.props.darkMode && 'white'
          }]
        }, "Tidak ada ", _this.props.title, " terkait.")) : /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
          ref: function ref(_ref2) {
            return _this.scrollView = _ref2;
          }
        }, _this.state.arrayData.map(function (item, index) {
          return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
            style: [styles.viewTextModal, {
              borderBottomColor: _this.props.darkMode ? '#1C1C1E' : '#DDE3E0'
            }],
            key: index,
            onPress: function onPress() {
              _this.props.onSelected(item, index);
              _this.setState({
                modalVisible: false
              });
            }
          }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
            textType: "regular",
            style: [styles.textWhiteTitle, {
              color: '#273238'
            }]
          }, item.name ? item.name : item));
        }), _this.props.statusKeyboard && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(150)
          }
        })))));
      };
      _this.state = {
        modalVisible: false,
        text: '',
        lainnya: '',
        valueSearch: '',
        arrayData: _this.props.arrayData,
        arrayHolder: _this.props.arrayData
      };
      return _this;
    }
    (0, _inherits2.default)(CustomComboBox, _Component);
    return (0, _createClass2.default)(CustomComboBox, [{
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps, prevState) {
        if (prevProps.arrayData !== this.props.arrayData) {
          this.setState({
            arrayData: this.props.arrayData,
            arrayHolder: this.props.arrayData
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
          style: styles.viewForm
        }, this.renderModal(), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "regular",
          style: styles.textTitle
        }, title), desc !== '' && /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "regular",
          style: styles.textDesc
        }, '  ' + desc), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.viewText,
          onPress: function onPress() {
            return _this2.setState({
              modalVisible: true
            });
          }
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "regular",
          style: [styles.textValue, {
            color: value === '' ? '#CCCFC9' : this.props.darkMode ? 'white' : '#383B34'
          }]
        }, value === '' ? textPlaceholder : value), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[10]).allLogo.icArrowBottom,
          style: styles.icChevronDown
        })));
      }
    }]);
  }(_react.Component);
  var styles = _reactNative.StyleSheet.create({
    viewForm: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(67)
    },
    textTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      color: '#9B9F95',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(0.6)
    },
    viewText: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(2),
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(40),
      backgroundColor: '#F6F7F4',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10)
    },
    icChevronDown: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      tintColor: '#5E6157',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8)
    },
    textValue: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10)
    },
    textInclude: {
      color: 'red',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      fontWeight: '500'
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
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(50),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1),
      borderBottomColor: '#e9ebed',
      justifyContent: 'center'
    },
    textWhiteTitle: {
      color: '#273238',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14)
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
      fontWeight: '500'
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
      backgroundColor: '#F6F7F4',
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(40),
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(10)
    },
    icSearch2: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20.3),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      tintColor: '#9B9F95',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(12)
    },
    touchAll: {
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(8)
    },
    icDeleteAll: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24)
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      //marginHorizontal: toDp(24),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(24),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(2),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(4)
    },
    icSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      tintColor: '#263238'
    },
    icSilangClear: {
      width: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(20)
    },
    textInputSearch: {
      flex: 1,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(14),
      color: '#273238',
      fontFamily: 'Poppins-Regular',
      fontWeight: '400'
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
    },
    viewCustomSearch: {
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[11]).toDp)(1),
      borderColor: '#5AAA0F'
    }
  });
  var _default = exports.default = CustomComboBox;
