  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNativeImageViewing = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var DetailHistoryEmergencyScreen = function DetailHistoryEmergencyScreen(_ref) {
    var navigation = _ref.navigation,
      route = _ref.route;
    var _useState = (0, _react.useState)({
        isDarkMode: false,
        isLoading: false,
        isImageViewVisible: false,
        isShowSuccessModal: false,
        emergencyData: {
          emergency_status: 'Request',
          created_at: '',
          unit: {
            unit_name: ''
          },
          finished_at: '',
          processed_at: '',
          admin: {
            name: ''
          },
          emergency_response: {
            content: '',
            emergency_response_images: []
          }
        },
        imagesUri: [],
        indexPhotoResponse: 0
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      setState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isLoading: true
        });
      });
      fetchEmergencyDetail(route.params.emergencyId);
    }, []);
    var fetchEmergencyDetail = function fetchEmergencyDetail(id) {
      (0, _$$_REQUIRE(_dependencyMap[9]).getEmergencyDetailHistory)(id).then(function (response) {
        var images = [];
        if (response.data.emergency.emergency_response != null) {
          images = response.data.emergency.emergency_response.emergency_response_images.map(function (value) {
            return {
              uri: value.image_url
            };
          });
        }
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: false,
            emergencyData: response.data.emergency,
            imagesUri: images
          });
        });
      }).catch(function (error) {});
    };
    var ProcessView = function ProcessView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.subInfoWrapper
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12)
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.circleStatus, {
          backgroundColor: '#F2C041'
        }]
      }), state.emergencyData.emergency_status === 'Selesai' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.borderLine
      }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null)), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textStatus
      }, "Diproses"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.descWrapper
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icCalendar,
        style: styles.iconInfo
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textInfo
      }, (0, _moment.default)(state.emergencyData.processed_at).format('DD MMMM YYYY, HH:mm'), " WIB")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.descWrapper
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icOfficer,
        style: styles.iconInfo
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textInfo
      }, state.emergencyData.admin.name)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(15)
        }
      })));
    };
    var CompleteView = function CompleteView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.subInfoWrapper
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12)
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.circleStatus, {
          backgroundColor: '#8FB339'
        }]
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textStatus
      }, "Selesai"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.descWrapper
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icCalendar,
        style: styles.iconInfo
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textInfo
      }, (0, _moment.default)(state.emergencyData.finished_at).format('DD MMMM YYYY, HH:mm'), " WIB")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.descWrapper
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icOfficer,
        style: styles.iconInfo
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textInfo
      }, state.emergencyData.admin.name)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.descWrapper, {
          alignItems: 'flex-start'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icNote,
        style: [styles.iconInfo, {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(1)
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textInfo
      }, state.emergencyData.emergency_response.content)), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
        horizontal: true,
        style: {
          marginBottom: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10)
        }
      }, state.emergencyData.emergency_response.emergency_response_images.map(function (data, index) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          onPress: function onPress() {
            setState(function (prevState) {
              return Object.assign(Object.assign({}, prevState), {}, {
                isImageViewVisible: true,
                indexPhotoResponse: index
              });
            });
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          style: [styles.img, {
            width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(80),
            height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(80),
            marginRight: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10)
          }],
          source: {
            uri: data.image_url
          }
        }));
      })), /*#__PURE__*/_react.default.createElement(_reactNativeImageViewing.default, {
        images: state.imagesUri,
        animationType: 'fade',
        imageIndex: state.indexPhotoResponse,
        visible: state.isImageViewVisible,
        onRequestClose: function onRequestClose() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isImageViewVisible: false
            });
          });
        }
      })));
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
      title: 'Detail Emergency',
      onPress: function onPress() {
        return navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      style: {
        backgroundColor: '#f5f7f8'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.infoWrapper
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textPanggilan
    }, "DETAIL RIWAYAT"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.subInfoWrapper
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12)
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.circleStatus
    }), state.emergencyData.emergency_status == 'Proses' || state.emergencyData.emergency_status == 'Selesai' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.borderLine
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null)), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textStatus
    }, "Panggilan SOS"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.descWrapper
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icCalendar,
      style: styles.iconInfo
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textInfo
    }, (0, _moment.default)(state.emergencyData.created_at).format('DD MMMM YYYY, HH:mm'), " WIB")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.descWrapper
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icHomeCluster,
      style: styles.iconInfo
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textInfo
    }, state.emergencyData.unit.unit_name)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(15)
      }
    }))), state.emergencyData.emergency_status == 'Selesai' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, null, ProcessView(), CompleteView()) : state.emergencyData.emergency_status == 'Proses' ? ProcessView() : /*#__PURE__*/_react.default.createElement(_reactNative.View, null))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f7f8'
    },
    infoWrapper: {
      padding: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      backgroundColor: 'white'
    },
    descWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(5)
    },
    circleStatus: {
      backgroundColor: '#EE4040',
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10)
    },
    borderLine: {
      flex: 1,
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(1),
      backgroundColor: '#CCCFC9'
    },
    textInfo: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12),
      color: '#5E6157',
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(260)
    },
    iconInfo: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(13),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(13),
      tintColor: '#9B9F95',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12)
    },
    subInfoWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
    textPanggilan: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      color: '#9B9F95',
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(1)
    },
    textTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12),
      color: '#9B9F95'
    },
    textValue: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(2)
    },
    buttonValue: {
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(5),
      borderColor: '#5AAA0F',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(1),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(5)
    },
    textButton: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12),
      color: '#5AAA0F'
    },
    viewStatus: {
      width: '100%',
      height: 'auto',
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(2),
      borderTopColor: '#f5f7f8',
      borderBottomColor: '#f5f7f8',
      padding: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      backgroundColor: 'white'
    },
    viewUlasan: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      backgroundColor: 'white'
    },
    img: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(300),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(162),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(4),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10)
      //marginRight: toDp(10),
    },
    textNo: {
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      color: '#000000',
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(30),
      textAlign: 'center'
    },
    row: {
      flexDirection: 'row',
      width: '100%',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    line: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(262),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(1),
      backgroundColor: '#d3d6db',
      position: 'absolute',
      top: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(8),
      left: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(30),
      zIndex: -1
    },
    viewCenterStatus: {
      alignItems: 'center'
    },
    sizeActive: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(11)
    },
    sizeNoActive: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(11)
    },
    grey: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(11),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(4)
    },
    textActive: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      color: '#273238'
    },
    textNoActive: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      color: '#788f9c'
    },
    viewStatusNew: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(78),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(30),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(15),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textStatus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      color: '#383B34'
    },
    viewItemRow: {
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      flexDirection: 'row'
    },
    doneButton: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(width * 0.85),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(40),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10)
    },
    footer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(2),
      borderColor: '#DDE3E0',
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      position: 'absolute',
      bottom: 20,
      width: width,
      backgroundColor: 'white'
    },
    doneText: {
      color: '#ffffff',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14)
    },
    imgPhoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      backgroundColor: '#9B9F95'
    },
    textName: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12),
      color: '#788f9c'
    },
    textTime: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12),
      color: '#788f9c'
    },
    textContent: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(6),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      color: '#000000'
    },
    textMore: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12),
      color: '#56a7d4'
    },
    textBatal: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      fontWeight: '600',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(0.05)
    }
  });
  var _default = exports.default = DetailHistoryEmergencyScreen;
