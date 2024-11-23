  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _asyncStorage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _messaging = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[5]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[6]);
  var _reactNativeGetLocation = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNativeReanimatedCarousel = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[12]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var HomeScreen = function HomeScreen(props) {
    var _state$dataUser, _state$unit, _state$dataUser3;
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[13]).useNetInfo)();
    var _useState = (0, _react.useState)({
        arrayBanner: [],
        unit: {},
        arrayUnits: [],
        dataUser: null,
        isModalUnit: false,
        features: [],
        imageUser: '',
        loading: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      loadUserUnit();
      (0, _$$_REQUIRE(_dependencyMap[14]).getHighlights)().then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            arrayBanner: response.data.news_article
          });
        });
      }).catch(function (error) {});
      loadUnit();
    }, []);
    (0, _react.useEffect)(function () {
      var unsubscribe = (0, _messaging.default)().onMessage(function (remoteMessage) {
        if (remoteMessage.data.entity_type === 'unit') {
          loadUnit();
        }
      });
      return unsubscribe;
    }, []);
    var loadUserUnit = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* () {
        var dataUser = yield _asyncStorage.default.getItem('dataUser');
        var unit = yield _asyncStorage.default.getItem('unit');
        var features = yield _asyncStorage.default.getItem('features');
        setState(function (state) {
          var _JSON$parse;
          return Object.assign(Object.assign({}, state), {}, {
            dataUser: JSON.parse(dataUser),
            unit: JSON.parse(unit),
            features: JSON.parse(features),
            imageUser: (_JSON$parse = JSON.parse(dataUser)) == null ? undefined : _JSON$parse.image_url
          });
        });
      });
      return function loadUserUnit() {
        return _ref.apply(this, arguments);
      };
    }();
    var setImageProfile = function setImageProfile(imageUser) {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          imageUser: imageUser
        });
      });
    };
    var loadUnit = function loadUnit() {
      (0, _$$_REQUIRE(_dependencyMap[14]).getUnitsOccupied)('?isApproved=1').then(function (response) {
        var arrayUnits = [];
        for (var i = 0; i < response.data.units.length; i++) {
          if (response.data.units[i].is_approved) {
            arrayUnits.push(response.data.units[i]);
          }
        }
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            arrayUnits: arrayUnits
          });
        });
      }).catch(function (error) {});
    };
    var functionDetailsMenu = function functionDetailsMenu(id, sub_feature_mobiles) {
      if (state.dataUser.is_a_resident) {
        // Penghuni
        if (id === '1483423a-e325-4fe3-97a4-ab68e2dd3d8d') {
          //Smart Cluster
          NavigatorService.navigate('SmartCluster', {
            subFeature: sub_feature_mobiles,
            dataUser: state.dataUser,
            unit: state.unit
          });
        } else if (id === '4e672548-4418-432a-b273-1955fabd12b7') {
          // Smart Community
          NavigatorService.navigate('SmartCommunity', {
            subFeature: sub_feature_mobiles
          });
        } else {
          // Smart Home
          NavigatorService.navigate('SmartHome', {
            subFeature: sub_feature_mobiles
          });
        }
      } else {
        //Pengelola
        if (id === '9312462a-03c1-4d95-b47c-e5df05bd661d') {
          // Berita
          NavigatorService.navigate('News');
        } else if (id === '35144d0e-8987-432b-a6c6-ac1e6bbd44f9') {
          NavigatorService.navigate('ListEmergency');
        } else if (id === '86052745-d673-4f19-beb4-582d34613e0a') {
          NavigatorService.navigate('Reporting', {
            dataUser: state.dataUser
          });
        } else if (id === '65aa7b86-139a-4bba-9aff-32fc6ead1718') {
          NavigatorService.navigate('CCTV', {
            dataUser: state.dataUser
          });
        } else {
          //Alert.alert('Coming Soon','Feature ini akan segera hadir')
        }
      }
    };
    var renderButton = function renderButton(_ref3) {
      var item = _ref3.item,
        index = _ref3.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: [styles.touchButton, {
          marginLeft: index % 3 === 0 ? (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20) : 0
        }],
        onPress: function onPress() {
          return functionDetailsMenu(item.id, item == null ? undefined : item.sub_feature_mobiles);
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: item.image_url
        },
        style: [styles.iconMenu, {
          marginTop: state.dataUser.is_a_resident ? (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4) : 0
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: [styles.textName, {
          height: state.dataUser.is_a_resident ? (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40) : 'auto'
        }]
      }, item.name.replace(' ', '\n')));
    };
    var renderModalUnit = function renderModalUnit() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        onBackdropPress: function onBackdropPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isModalUnit: false
            });
          });
        },
        onBackButtonPress: function onBackButtonPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isModalUnit: false
            });
          });
        },
        style: styles.bottomModal,
        isVisible: state.isModalUnit
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewRootModal, {
          height: height * 0.8
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBox, {
          backgroundColor: 'white',
          height: height * 0.8
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewModalTitle
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: styles.textTitleModal
      }, 'UNIT'), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSilang,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isModalUnit: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icSilang,
        style: [styles.icSilang, {
          tintColor: '#273238'
        }]
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, state.arrayUnits.length !== 0 && state.arrayUnits.map(function (data, index) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.viewItem,
          onPress: function onPress() {
            var body = {
              unit_id: data.unit.id
            };
            (0, _$$_REQUIRE(_dependencyMap[14]).putUnitsOccupiedSwitch)(body).then(function (response) {
              setState(function (state) {
                return Object.assign(Object.assign({}, state), {}, {
                  isModalUnit: false,
                  unit: response.data.units.unit
                });
              });
              loadUnit();
              _asyncStorage.default.setItem('unit', JSON.stringify(response.data.units.unit));
            }).catch(function (error) {});
          }
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "regular",
          allowFontScaling: false,
          style: [styles.textNameUnit, {
            color: '#273238'
          }]
        }, data.unit.unit_name), index === 0 && /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icHouseCeklis,
          style: styles.icHouseCeklis
        })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.lineItem
        }));
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewFooter
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchTanbah,
        onPress: function onPress() {
          NavigatorService.navigate('AddUnit');
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isModalUnit: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: styles.textTambah
      }, "TAMBAH UNIT"))))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'light-content',
      translucent: true,
      backgroundColor: 'transparent'
    }), renderModalUnit(), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.loading
    }), /*#__PURE__*/_react.default.createElement(_reactNative.ImageBackground, {
      source: _$$_REQUIRE(_dependencyMap[16]).allLogo.imgBackground,
      style: styles.imgBackground
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.backgroundShadow
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.header
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.headerWelcome
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textWelcome
    }, "Welcome to", '\n', "Central Connect"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        NavigatorService.navigate('Profile', {
          setImageProfile: setImageProfile
        });
      }
    }, state.imageUser === '' ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[16]).allLogo.imgDefault,
      style: styles.imgProfile
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: {
        uri: state.imageUser
      },
      style: styles.imgProfile
    }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewUnitNotification
    }, (_state$dataUser = state.dataUser) != null && _state$dataUser.is_a_resident ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchUnit,
      onPress: function onPress() {
        return setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            isModalUnit: true
          });
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textUnit
    }, (_state$unit = state.unit) == null ? undefined : _state$unit.unit_name), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icDownChevron,
      style: styles.icDownChevron
    })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(250)
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        var _state$dataUser2;
        return NavigatorService.navigate('Notification', {
          isResident: (_state$dataUser2 = state.dataUser) == null ? undefined : _state$dataUser2.is_a_resident
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icHomepageNotification,
      style: styles.icHomepageNotification
    })))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      data: state.features,
      renderItem: renderButton,
      numColumns: 3,
      ListHeaderComponent: function ListHeaderComponent() {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewCarousel
        }, state.arrayBanner.length !== 0 && /*#__PURE__*/_react.default.createElement(_$$_REQUIRE(_dependencyMap[17]).GestureHandlerRootView, null, /*#__PURE__*/_react.default.createElement(_reactNativeReanimatedCarousel.default, {
          loop: false,
          vertical: false,
          style: {
            width: width,
            height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(200)
          },
          width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(332),
          height: 0
          // removeClippedSubviews={false}
          ,
          data: state.arrayBanner,
          mode: 'default',
          renderItem: function renderItem(_ref4) {
            var item = _ref4.item;
            return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
              onPress: function onPress() {
                if (netInfo.isConnected) {
                  NavigatorService.navigate('DetailsNews', {
                    id: item.id
                  });
                } else {
                  // @ts-expect-error TS(2304): Cannot find name 'alert'.
                  alert('Maaf, tidak ada koneksi internet.');
                }
              }
            }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
              source: {
                uri: item.banner_image_url
              },
              style: styles.imgBanner
            }));
          }
        })));
      }
    })), ((_state$dataUser3 = state.dataUser) == null ? undefined : _state$dataUser3.is_a_resident) && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchHelpMe,
      onPress: function onPress() {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: true
          });
        });
        _reactNativeGetLocation.default.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000
        }).then(function (location) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false
            });
          });
          NavigatorService.navigate('Emergency', {
            location: location
          });
        }).catch(function (error) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false
            });
          });
          var code = error.code,
            message = error.message;
          if (code === 'CANCELLED') {
            //Alert.alert('DIBATALKAN','Lokasi dibatalkan oleh pengguna atau oleh permintaan lain')
          } else if (code === 'UNAVAILABLE') {
            _reactNative.Alert.alert('TIDAK TERSEDIA', 'Layanan lokasi dinonaktifkan atau tidak tersedia');
          } else if (code === 'TIMEOUT') {
            _reactNative.Alert.alert('WAKTU HABIS', 'Permintaan lokasi habis waktunya');
          } else if (code === 'UNAUTHORIZED') {
            _reactNative.Alert.alert('TIDAK SAH', 'Otorisasi ditolak');
          }
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textHelpMe
    }, "Help me!")))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1
    },
    imgBackground: {
      flex: 1
      //padding: toDp(20)
    },
    header: {
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(36),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20)
    },
    headerWelcome: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    textWelcome: {
      color: 'white',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      fontWeight: '600'
    },
    imgProfile: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(60),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(60),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(30)
    },
    viewUnitNotification: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    icHomepageNotification: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40)
    },
    touchUnit: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(250),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      backgroundColor: '#FFFFFF4D',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textUnit: {
      color: 'white',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      fontWeight: '600',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10)
    },
    icDownChevron: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(7.42),
      tintColor: 'white',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    content: {
      flex: 1
    },
    footer: {
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20)
    },
    touchHelpMe: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(90),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      backgroundColor: '#5AAA0F'
    },
    textHelpMe: {
      color: 'white',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      fontWeight: '600'
    },
    touchButton: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(100),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(100),
      backgroundColor: '#FFFFFF',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      alignItems: 'center',
      justifyContent: 'center',
      //paddingHorizontal: toDp(20),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10)
    },
    viewChildButton: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    iconMenu: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4)
    },
    textName: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      textAlign: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      //height: toDp(40),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12)
    },
    icMenuRight: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16.9),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(15.84)
    },
    imgBanner: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(320),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(200),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20)
    },
    viewCarousel: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    backgroundShadow: {
      width: width,
      height: height,
      backgroundColor: '#00000066',
      position: 'absolute'
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
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(165),
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(-8)
    },
    icSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      tintColor: '#917438'
    },
    viewFooter: {
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      marginTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16) : (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      marginBottom: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16) : (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
    },
    touchTanbah: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      borderColor: '#5AAA0F',
      // borderRadius: toDp(4),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10)
    },
    textTambah: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.7)
    },
    viewItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12)
    },
    textNameUnit: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#273238',
      width: width * 0.8
    },
    icHouseCeklis: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
    },
    lineItem: {
      width: '88%',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      backgroundColor: '#e9ebed',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
    }
  });
  var _default = exports.default = HomeScreen;
