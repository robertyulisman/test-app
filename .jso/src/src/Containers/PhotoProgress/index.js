  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.ImageFooter = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _Empty = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[8]);
  var _reactNativeImageViewing = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    height = _Dimensions$get.height,
    width = _Dimensions$get.width;
  var ImageFooter = exports.ImageFooter = function ImageFooter(_ref) {
    var imageIndex = _ref.imageIndex,
      imagesCount = _ref.imagesCount;
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.root
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: styles.text
    }, imageIndex + 1 + " / " + imagesCount));
  };
  var PhotoProgress = function PhotoProgress(_ref2) {
    var navigation = _ref2.navigation,
      route = _ref2.route;
    var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      images = _useState2[0],
      setImages = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      visible = _useState4[0],
      setIsVisible = _useState4[1];
    var _useState5 = (0, _react.useState)({
        isDarkMode: false,
        isLoading: false,
        isImageViewVisible: false,
        listPhoto: []
      }),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      state = _useState6[0],
      setState = _useState6[1];
    var fetcListPhoto = function fetcListPhoto() {
      (0, _$$_REQUIRE(_dependencyMap[10]).getProgressPhoto)(route.params.unit.id).then(function (response) {
        if (response.data.statusCode === 200) {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoading: false,
              listPhoto: response.data.data
            });
          });
        }
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: false
          });
        });
      }).catch(function (error) {
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: false
          });
        });
      });
    };
    (0, _react.useEffect)(function () {
      setState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isLoading: true
        });
      });
      fetcListPhoto();
    }, []);
    var ItemView = function ItemView(data) {
      var handleOnPressImage = function handleOnPressImage() {
        var formatImages = data.files.map(function (item) {
          return {
            uri: item
          };
        });
        setImages(formatImages);
        setIsVisible(true);
      };
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        key: data.id,
        style: {
          flexDirection: 'row',
          paddingHorizontal: 16,
          paddingBottom: 12
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: handleOnPressImage
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        style: styles.img,
        source: {
          uri: data.files[0]
        }
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginLeft: 16
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textDate,
        textType: "semibold"
      }, (0, _moment.default)(data.created_at).format('dddd, DD MMM YYYY, HH:mm')), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textName,
        textType: "semi"
      }, data.description)));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: state.isDarkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.isLoading
    }), /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: state.isDarkMode ? 'light-content' : 'dark-content',
      translucent: false,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Progress Update',
      onPress: function onPress() {
        return navigation.goBack();
      }
    }), state.listPhoto.length > 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, state.listPhoto.map(function (data) {
      return ItemView(data);
    })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement(_Empty.default, {
      title: 'Belum ada data',
      images: _$$_REQUIRE(_dependencyMap[11]).allLogo.imgEmptyNews
    })), /*#__PURE__*/_react.default.createElement(_reactNativeImageViewing.default, {
      images: images,
      imageIndex: 0,
      visible: visible,
      onRequestClose: function onRequestClose() {
        return setIsVisible(false);
      },
      FooterComponent: function FooterComponent(_ref3) {
        var imageIndex = _ref3.imageIndex;
        return /*#__PURE__*/_react.default.createElement(ImageFooter, {
          imageIndex: imageIndex,
          imagesCount: images.length
        });
      }
    }));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f7f8'
    },
    img: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(100),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(100),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10)
    },
    textDate: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      color: '#788f9c',
      marginTop: 16
    },
    textName: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      color: '#788f9c',
      marginTop: 8
    },
    root: {
      height: 64,
      backgroundColor: '#00000077',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      fontSize: 17,
      color: '#FFF'
    }
  });
  var _default = exports.default = PhotoProgress;
