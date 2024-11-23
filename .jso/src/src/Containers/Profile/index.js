  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _asyncStorage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _messaging = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[9]);
  var _reactNativeDeviceInfo = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[12]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var ProfileScreen = function ProfileScreen(_ref) {
    var navigation = _ref.navigation,
      route = _ref.route;
    var _useState = (0, _react.useState)({
        isDarkMode: false,
        isLoading: false,
        isShowModalConfirm: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      viewState = _useState2[0],
      setViewState = _useState2[1];
    var _useState3 = (0, _react.useState)({
        dataUser: {
          name: '',
          image_url: ''
        },
        fullname: '',
        image_url: '',
        phone: '',
        fcmToken: '',
        deviceId: '',
        unit: {},
        label: ''
      }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      userState = _useState4[0],
      setUserState = _useState4[1];
    (0, _react.useEffect)(function () {
      var fetchData = /*#__PURE__*/function () {
        var _ref2 = (0, _asyncToGenerator2.default)(function* () {
          var dataUser = yield _asyncStorage.default.getItem('dataUser');
          var unit = yield _asyncStorage.default.getItem('unit');
          var fcmTokem = yield _asyncStorage.default.getItem('fcmToken');
          setUserState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
              dataUser: JSON.parse(dataUser),
              // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
              unit: JSON.parse(unit)
            });
          });
        });
        return function fetchData() {
          return _ref2.apply(this, arguments);
        };
      }();
      fetchData().catch(function () {});
      getFcmTokenAndDeviceId();
    }, []);
    (0, _react.useEffect)(function () {
      var label = '';
      // @ts-expect-error TS(2339): Property 'is_a_resident' does not exist on type '{... Remove this comment to see the full error message
      if (!userState.dataUser.is_a_resident) {
        // @ts-expect-error TS(2339): Property 'labels' does not exist on type '{ name: ... Remove this comment to see the full error message
        if (userState.dataUser.labels !== undefined) {
          // @ts-expect-error TS(2339): Property 'labels' does not exist on type '{ name: ... Remove this comment to see the full error message
          for (var i = 0; i < userState.dataUser.labels.length; i++) {
            label +=
            // @ts-expect-error TS(2339): Property 'labels' does not exist on type '{ name: ... Remove this comment to see the full error message
            userState.dataUser.labels[i].complaint_category + (
            // @ts-expect-error TS(2339): Property 'labels' does not exist on type '{ name: ... Remove this comment to see the full error message
            userState.dataUser.labels.length == i + 1 ? '' : ', ');
          }
        }
      }
      setUserState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          fullname: userState.dataUser.name,
          image_url: userState.dataUser.image_url,
          // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{ name: s... Remove this comment to see the full error message
          phone: userState.dataUser.phone,
          label: label
        });
      });
    }, [userState.dataUser]);
    var getFcmTokenAndDeviceId = function getFcmTokenAndDeviceId() {
      (0, _messaging.default)().getToken().then(function (fcmToken) {
        setUserState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            fcmToken: fcmToken
          });
        });
      }).catch(function (error) {});
      _reactNativeDeviceInfo.default.getUniqueId().then(function (deviceId) {
        setUserState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            deviceId: deviceId
          });
        });
      }).catch(function (error) {});
    };
    var setUnit = function setUnit(unit) {
      setUserState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          unit: unit
        });
      });
    };
    var setData = function setData(name, image_url, phone) {
      setUserState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          fullname: name,
          image_url: image_url,
          phone: phone
        });
      });
      route.params.setImageProfile(image_url);
    };
    var clearAsyncStorage = function clearAsyncStorage() {
      setViewState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isLoading: false
        });
      });
      _asyncStorage.default.removeItem('token');
      _asyncStorage.default.removeItem('refresh');
      _asyncStorage.default.removeItem('dataUser');
      _asyncStorage.default.removeItem('features');
      _asyncStorage.default.removeItem('fcmToken');
      _asyncStorage.default.removeItem('notification');
      NavigatorService.reset('Login');
    };
    var logout = function logout() {
      setViewState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isShowModalConfirm: true
        });
      });
    };
    var handleLogout = function handleLogout() {
      var body = {
        fcm_token: userState.fcmToken,
        device_id: 'DeviceInfo'
      };
      setUserState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isLoading: true,
          isShowModalConfirm: false
        });
      });
      (0, _$$_REQUIRE(_dependencyMap[13]).postLogout)(body).then(function (response) {
        clearAsyncStorage();
      }).catch(function (error) {
        clearAsyncStorage();
      });
    };
    var ModalConfirmationLogout = function ModalConfirmationLogout() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        onBackdropPress: function onBackdropPress() {
          return setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowModalConfirm: false
            });
          });
        },
        isVisible: viewState.isShowModalConfirm
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewModalCenter
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBoxCenter, {
          backgroundColor: viewState.isDarkMode ? '#121212' : 'white',
          height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(240)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.titleConfirm, {
          color: viewState.isDarkMode ? 'white' : '#263238'
        }]
      }, "LOG OUT"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textApakah, {
          color: viewState.isDarkMode ? 'white' : '#263238'
        }]
      }, "Anda perlu login kembali jika ingin melanjutkan atau memantau aktivitas sebelumnya. Anda yakin ingin keluar?"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchTidak,
        onPress: function onPress() {
          return setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowModalConfirm: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textTidak
      }, "Batal")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchYa,
        onPress: function onPress() {
          return handleLogout();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textYa
      }, "Ya, Keluar"))))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: viewState.isDarkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Profil',
      onPress: function onPress() {
        return navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: viewState.isLoading
    }), ModalConfirmationLogout(), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[15]).allLogo.imgHeaderProfile,
      style: styles.linearHeader
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewProfile
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewImage
    }, userState.image_url ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: {
        uri: userState.image_url
      },
      style: styles.imgProfile
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[15]).allLogo.imgDefault,
      style: styles.imgProfile
    })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: [styles.textName, {
        color: viewState.isDarkMode ? 'white' : '#273238'
      }]
    }, userState.fullname), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: [styles.textEmail, {
        color: viewState.isDarkMode ? 'white' : '#273238'
      }]
    }, userState.dataUser.email), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: [styles.textNo, {
        color: viewState.isDarkMode ? 'white' : '#273238'
      }]
    }, userState.phone), userState.dataUser.is_a_resident ? /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: [styles.textNo, {
        color: viewState.isDarkMode ? 'white' : '#273238'
      }]
    }, userState.unit.code + '\n' + userState.unit.unit_name) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12)
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: [styles.textLabel, {
        color: viewState.isDarkMode ? 'white' : '#b0bec5'
      }]
    }, 'Label tugas'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: [styles.valueLabel, {
        color: viewState.isDarkMode ? 'white' : '#273238'
      }]
    }, userState.label)), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchEdit,
      onPress: function onPress() {
        return NavigatorService.navigate('EditProfile', {
          setData: setData
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: [styles.textEdit, {
        color: viewState.isDarkMode ? 'white' : '#5AAA0F'
      }]
    }, "Edit Profil")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24)
      }
    }), userState.dataUser.is_a_resident && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.detailInfo, {
        backgroundColor: viewState.isDarkMode ? '#1C1C1E' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.viewValue,
      onPress: function onPress() {
        return NavigatorService.navigate('Unit', {
          setUnit: setUnit
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: [styles.textValue, {
        color: viewState.isDarkMode ? 'white' : '#5AAA0F'
      }]
    }, "Unit"), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[15]).allLogo.icNext,
      style: [styles.icNext, {
        tintColor: viewState.isDarkMode ? 'white' : '#5AAA0F'
      }]
    }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.detailInfo, {
        backgroundColor: viewState.isDarkMode ? '#1C1C1E' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.viewValue,
      onPress: function onPress() {
        return NavigatorService.navigate('ChangePass');
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: [styles.textValue, {
        color: viewState.isDarkMode ? 'white' : '#5AAA0F'
      }]
    }, "Ubah Password"), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[15]).allLogo.icNext,
      style: [styles.icNext, {
        tintColor: viewState.isDarkMode ? 'white' : '#5AAA0F'
      }]
    }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.detailInfo, {
        backgroundColor: viewState.isDarkMode ? '#1C1C1E' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.viewValue,
      onPress: function onPress() {
        return NavigatorService.navigate('ContactUs');
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: [styles.textValue, {
        color: viewState.isDarkMode ? 'white' : '#5AAA0F'
      }]
    }, "Hubungi Kami"), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[15]).allLogo.icNext,
      style: [styles.icNext, {
        tintColor: viewState.isDarkMode ? 'white' : '#5AAA0F'
      }]
    })))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(120)
      }
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footer
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: [styles.buttonFooter, {
        backgroundColor: viewState.isDarkMode ? 'white' : '#5AAA0F'
      }],
      onPress: function onPress() {
        return logout();
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textFooter
    }, "Log Out"))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    header: {
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(60),
      justifyContent: 'center',
      backgroundColor: 'white',
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      /*shadowOpacity: 0.1,
          shadowRadius: 3,
          shadowOffset: {
            height: 2,
            width: 0
          },
          elevation: 2,
          zIndex: 1*/
      alignItems: 'center'
    },
    title: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(18),
      color: '#5AAA0F'
    },
    touchSetting: {
      padding: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    icSetting: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      tintColor: '#5AAA0F'
    },
    linearHeader: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(150),
      alignItems: 'center'
    },
    viewProfile: {
      width: width,
      height: 'auto',
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(-120)
    },
    viewImage: {},
    imgProfile: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(100),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(100),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(50)
    },
    textName: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      color: '#273238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.05),
      textAlign: 'center',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10)
    },
    textEmail: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: '#273238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.05)
    },
    textNo: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: '#273238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.05),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      textAlign: 'center'
    },
    textLabel: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      textAlign: 'center'
    },
    valueLabel: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: '#273238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.05),
      textAlign: 'center',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    touchEdit: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      padding: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4)
    },
    textEdit: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.05)
    },
    viewInfo: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(36),
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      alignItems: 'center'
    },
    textInfo: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#788F9C',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.05)
    },
    touchEditInfo: {
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4)
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    textEdit: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.05)
    },
    textEditInfo: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.05)
    },
    detailInfo: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      width: '90%',
      height: 'auto',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(6),
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2
    },
    viewValue: {
      width: '100%',
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12)
    },
    lineValue: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      backgroundColor: '#EEEEEE'
    },
    wrapper: {
      flex: 1
    },
    content: {
      flex: 1,
      alignItems: 'center'
    },
    root: {
      width: width,
      height: 'auto',
      backgroundColor: '#FFFFFF'
    },
    row: {
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(66),
      flexDirection: 'row',
      //justifyContent: 'space-between',
      alignItems: 'center',
      borderBottomColor: '#ECECED',
      borderBottomWidth: 1,
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      paddingRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    col: {
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(66),
      justifyContent: 'center',
      borderBottomColor: '#ECECED',
      borderBottomWidth: 1,
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      paddingRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    text: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      fontWeight: '300',
      color: '#212121'
    },
    icCircle: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(28),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(28)
    },
    icChevronRight: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(28),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(28),
      tintColor: '#189E84'
    },
    viewButtonCenter: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    },
    viewButton: {
      width: width * 0.75,
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    textEmptyTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      textAlign: 'center',
      color: '#151d2c'
    },
    textEmptyDesc: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      textAlign: 'center',
      color: '#151d2c'
    },
    centerView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    iconProfil: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      tintColor: '#212121'
    },
    textFooter: {
      color: '#ffffff',
      fontStyle: 'normal'
    },
    icNext: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      tintColor: '#212121',
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    viewValue: {
      width: '100%',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(50),
      alignItems: 'center'
    },
    textValue: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.7)
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    lineValue: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      backgroundColor: '#EEEEEE'
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    icNext: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      tintColor: '#5AAA0F',
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    buttonFooter: {
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      width: '90%',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
      borderRadius: 10,
      borderColor: '#5AAA0F',
      alignItems: 'center',
      alignSelf: 'flex-end'
    },
    footer: {
      borderTopColor: '#DDE3E0',
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      // @ts-expect-error TS(2304): Cannot find name 'Platform'.
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10)
    },
    viewModalCenter: {
      width: 'auto',
      height: 'auto',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalBoxCenter: {
      width: width * 0.8,
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(200),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      alignItems: 'center'
    },
    titleConfirm: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.7)
    },
    textApakah: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(30),
      textAlign: 'center',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: '#263238',
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24)
    },
    viewRow: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      flexDirection: 'row'
    },
    touchTidak: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(110),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textTidak: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.7)
    },
    touchYa: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(110),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      borderColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10)
    },
    textYa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.7)
    }
  });
  var _default = exports.default = ProfileScreen;
