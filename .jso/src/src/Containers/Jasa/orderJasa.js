  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[5]));
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[7]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var OrderJasa = function OrderJasa(props) {
    var _useState = (0, _react.useState)({
        arrMenu: [],
        loading: true
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      getAllLoadData();
    }, []);
    var getAllLoadData = function getAllLoadData() {
      (0, _$$_REQUIRE(_dependencyMap[8]).getServicesCategories)().then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            arrMenu: response.data.service_categories,
            loading: false
          });
        });
      }).catch(function (error) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false
          });
        });
      });
    };
    var renderItem = function renderItem(item) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchItem,
        onPress: function onPress() {
          if (item.id === '1b394b57-7fc2-4562-a7b6-6cc761a2d15c') {
            NavigatorService.navigate('Multifinance');
          } else {
            NavigatorService.navigate('Layanan', {
              item: item,
              setContentPesanan: props.setContentPesanan
            });
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewItem
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: item.image_url
        },
        style: styles.imgCategory
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textName
      }, item.name)), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[9]).allLogo.icNext,
        style: styles.icNext
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.line
      }));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, state.arrMenu.map(function (item, index) {
      return renderItem(item);
    })));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white',
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10)
    },
    touchItem: {
      width: width,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(48),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20)
    },
    line: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      width: width * 0.88,
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(1),
      backgroundColor: '#DDE3E0',
      position: 'absolute',
      bottom: 0
    },
    viewItem: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    imgCategory: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24)
    },
    textName: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      color: '#273238',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10)
    },
    icNext: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24),
      tintColor: '#5AAA0F'
    }
  });
  var _default = exports.default = OrderJasa;
