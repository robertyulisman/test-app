  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[5]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[6]);
  var _reactNativeGetLocation = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var SmartClusterScreen = function SmartClusterScreen(props) {
    var _useState = (0, _react.useState)({
        arrayMenu: props.route.params.subFeature,
        isLoading: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      var arrayMenu = state.arrayMenu;
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          arrayMenu: arrayMenu
        });
      });
    }, []);
    var functionDetails = function functionDetails(id) {
      if (id === 'af01c2ac-8eee-4d7f-858a-d0976e73367c') {
        NavigatorService.navigate('News');
      } else if (id === '0cf4085e-7453-4843-aeb0-0a5e49fa8428') {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            isLoading: true
          });
        });
        (0, _$$_REQUIRE(_dependencyMap[9]).getEmergencyStatus)().then(function (response) {
          if (response.data.emergency.emergency_status === 'Request' || response.data.emergency.emergency_status === 'Proses') {
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                isLoading: false
              });
            });
            NavigatorService.navigate('SosRequest');
          } else {
            _reactNativeGetLocation.default.getCurrentPosition({
              enableHighAccuracy: true,
              timeout: 10000
            }).then(function (location) {
              setState(function (state) {
                return Object.assign(Object.assign({}, state), {}, {
                  isLoading: false
                });
              });
              NavigatorService.navigate('Emergency', {
                location: location
              });
            }).catch(function (error) {
              setState(function (state) {
                return Object.assign(Object.assign({}, state), {}, {
                  isLoading: false
                });
              });
              var code = error.code,
                message = error.message;
              if (code === 'CANCELLED') {
                _reactNative.Alert.alert('DIBATALKAN', 'Lokasi dibatalkan oleh pengguna atau oleh permintaan lain');
              } else if (code === 'UNAVAILABLE') {
                _reactNative.Alert.alert('TIDAK TERSEDIA', 'Layanan lokasi dinonaktifkan atau tidak tersedia');
              } else if (code === 'TIMEOUT') {
                _reactNative.Alert.alert('WAKTU HABIS', 'Permintaan lokasi habis waktunya');
              } else if (code === 'UNAUTHORIZED') {
                _reactNative.Alert.alert('TIDAK SAH', 'Otorisasi ditolak');
              }
            });
          }
        }).catch(function (error) {
          _reactNative.Alert.alert('Error', 'Masuk Catch');
        });
      } else if (id === 'b32eb510-1b20-48b9-b176-0ac5658830fb') {
        NavigatorService.navigate('Reporting', {
          dataUser: props.route.params.dataUser
        });
      }
      if (id === 'd6b6d9ce-2cda-4cd6-8dc2-8aeadead57b2') {
        NavigatorService.navigate('Billing', {
          unit: props.route.params.unit
        });
      }
      if (id === '1f4864fe-8b70-4824-8c6c-00c90454cc4a') {
        NavigatorService.navigate('CCTV', {
          dataUser: props.route.params.dataUser
        });
      }
      if (id === '80414387-079e-4c87-8a15-226537d12372') {
        NavigatorService.navigate('PhotoProgress', {
          unit: props.route.params.unit
        });
      }
      if (id === 'ef88087c-4ccd-466e-afae-d9c40299986b') {
        NavigatorService.navigate('EmergencyContact');
      } else if (id === 'e5f21482-04b1-4064-8caa-1e25694201fa') {
        NavigatorService.navigate('DocumentsRequestScreen', {
          dataUser: props.route.params.dataUser
        });
      } else {
        //Alert.alert('Coming Soon', 'Feature ini akan segera hadir')
      }
    };
    var renderButton = function renderButton(_ref) {
      var item = _ref.item,
        index = _ref.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchButton,
        onPress: function onPress() {
          return functionDetails(item.id);
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: item.image_url
        },
        style: styles.iconMenu
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: [styles.textName, {
          marginTop: item.name.includes('&') ? (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(8) : (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
          marginHorizontal: 4
        }]
      }, item.name));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Smart Cluster',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.isLoading
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      data: state.arrayMenu,
      renderItem: renderButton,
      numColumns: 3,
      ListHeaderComponent: function ListHeaderComponent() {
        return /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          style: styles.textInfo
        }, 'Nikmati kenyamanan tinggal di Batam Central dengan semua fasilitas yang ada. ');
      }
    })));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      //alignItems: 'center',
      backgroundColor: 'white'
    },
    content: {
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      flex: 1
    },
    viewChildButton: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    iconMenu: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(40),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10)
    },
    touchButton: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(100),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(120),
      backgroundColor: '#FFFFFF',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      alignItems: 'center',
      //justifyContent: 'space-between',
      //justifyContent: 'center',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(2),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(6),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(2),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
      backgroundColor: 'white'
    },
    textName: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12),
      textAlign: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(8),
      //height: toDp(40),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(36)
      //backgroundColor: 'cyan'
    },
    textInfo: {
      color: '#273238',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(8)
    },
    icMenuRight: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16.9),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(15.84)
    }
  });
  var _default = exports.default = SmartClusterScreen;
