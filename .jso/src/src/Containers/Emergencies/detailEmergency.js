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
  var _ViewMoreText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[10]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var DetailEmergencyScreen = function DetailEmergencyScreen(_ref) {
    var navigation = _ref.navigation,
      route = _ref.route;
    var _useState = (0, _react.useState)({
        isDarkMode: false,
        isLoading: false,
        isImageViewVisible: false,
        detailsReport: {
          complaint_report_responses: []
        },
        detailEmergency: {
          user: {
            name: '',
            phone: ''
          },
          unit: {
            unit_name: ''
          },
          created_at: '',
          latitude: 0,
          longitude: 0,
          emergency_status: 'waiting'
        },
        adminData: {
          name: '',
          image_url: ''
        },
        responseData: {
          content: '',
          created_at: '',
          emergency_response_images: []
        },
        imagesUri: [],
        indexPhotoResponse: 0
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      fetchEmergencyDetail(route.params.emergencyData.id);
    }, []);
    var fetchEmergencyDetail = function fetchEmergencyDetail(id) {
      (0, _$$_REQUIRE(_dependencyMap[11]).getEmergencyDetail)(id).then(function (response) {
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
            detailEmergency: response.data.emergency,
            adminData: response.data.emergency.admin,
            responseData: response.data.emergency.emergency_response,
            imagesUri: images
          });
        });
      }).catch(function (error) {});
    };
    var handleProcess = function handleProcess() {
      NavigatorService.navigate('EmergencyResponse', {
        emergencyData: route.params.emergencyData
      });
    };
    var handleLocation = function handleLocation() {
      _reactNative.Linking.openURL(_reactNative.Platform.OS === 'android' ? "google.navigation:q=" + state.detailEmergency.latitude + "+" + state.detailEmergency.longitude : "http://maps.apple.com/?ll=" + state.detailEmergency.latitude + "," + state.detailEmergency.longitude + "&q=" + state.detailEmergency.user.name);
    };
    var StatusView = function StatusView(status) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewStatus, {
          borderTopColor: state.isDarkMode ? '#1C1C1E' : '#f5f7f8',
          borderBottomColor: state.isDarkMode ? '#1C1C1E' : '#f5f7f8'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textPanggilan, {
          color: state.isDarkMode ? 'white' : '#9B9F95'
        }]
      }, "STATUS"), status === 'Invalid' || status === 'Batal' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewStatusNew, {
          backgroundColor: status === 'Invalid' ? '#6b7b83' : '#6b7b83'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textStatus
      }, status)) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.row
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewCenterStatus
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [status === 'Terkirim' ? styles.sizeActive : styles.sizeNoActive, {
          backgroundColor: status === 'Terkirim' ? '#f53c3c' : '#CCCFC9',
          marginTop: status === 'Terkirim' ? 0 : (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4)
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: status === 'Terkirim' ? [styles.textActive, {
          color: state.isDarkMode ? 'white' : '#273238'
        }] : styles.textNoActive
      }, "Terkirim")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewCenterStatus
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [status === 'Proses' ? styles.sizeActive : styles.sizeNoActive, {
          backgroundColor: status === 'Proses' ? '#f2c141' : '#CCCFC9',
          marginTop: status === 'Proses' ? 0 : (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4)
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: status === 'Proses' ? [styles.textActive, {
          color: state.isDarkMode ? 'white' : '#273238'
        }] : styles.textNoActive
      }, "Proses")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewCenterStatus
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [status === 'Selesai' ? styles.sizeActive : styles.sizeNoActive, {
          backgroundColor: status === 'Selesai' ? '#28a595' : '#CCCFC9',
          marginTop: status === 'Selesai' ? 0 : (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4)
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: status === 'Selesai' ? [styles.textActive, {
          color: state.isDarkMode ? 'white' : '#273238'
        }] : styles.textNoActive
      }, "Selesai")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.line
      })));
    };
    var FooterView = function FooterView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.footer
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.doneButton,
        onPress: function onPress() {
          return handleProcess();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.doneText
      }, "Selesaikan")));
    };
    var ResponseView = function ResponseView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewUlasan, {
          borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
          borderBottomColor: state.isDarkMode ? '#1C1C1E' : '#f5f7f8'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textPanggilan, {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
          color: state.isDarkMode ? 'white' : '#9B9F95'
        }]
      }, "TANGGAPAN"), ItemView());
    };
    var ItemView = function ItemView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewItemRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: state.adminData.image_url
        },
        style: styles.imgPhoto
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textName, {
          color: state.isDarkMode ? 'white' : '#788f9c'
        }]
      }, state.adminData.name), /*#__PURE__*/_react.default.createElement(_ViewMoreText.default, {
        textStyle: {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(6),
          width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(240)
        },
        numberOfLines: 3,
        renderViewMore: function renderViewMore(onPress) {
          return /*#__PURE__*/_react.default.createElement(_CustomText.default, {
            style: styles.textMore,
            onPress: onPress
          }, "Lihat lebih banyak");
        },
        renderViewLess: function renderViewLess(onPress) {
          return /*#__PURE__*/_react.default.createElement(_CustomText.default, {
            style: styles.textMore,
            onPress: onPress
          }, "Lihat lebih sedikit");
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textContent, {
          color: state.isDarkMode ? 'white' : '#000000'
        }],
        ellipsizeMode: "tail"
      }, state.responseData.content)), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textTime, {
          color: state.isDarkMode ? 'white' : '#788f9c',
          marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2)
        }]
      }, (0, _moment.default)(state.responseData.created_at).format('dddd, DD MMMM YYYY, HH:mm:ss'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [{
          backgroundColor: state.detailEmergency.emergency_status === 'Selesai' ? '#f2c141' : state.detailEmergency.emergency_status === 'Invalid' ? '#6b7b83' : '#28a595'
        }]
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
        horizontal: true,
        style: {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(76),
          marginBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(50)
        }
      }, state.responseData.emergency_response_images.map(function (data, index) {
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
            width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80),
            height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80),
            marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10)
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
      }));
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
    }, "INFO PANGGILAN"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.subInfoWrapper
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textTitle
    }, "Nama Pemanggil"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textValue
    }, state.detailEmergency.user.name)), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.buttonValue,
      onPress: function onPress() {
        handleLocation();
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textButton
    }, "Lacak Lokasi"))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.subInfoWrapper
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textTitle
    }, "Telepon"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textValue
    }, state.detailEmergency.user.phone)), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.buttonValue,
      onPress: function onPress() {
        if (state.detailEmergency.user.phone[0] + state.detailEmergency.user.phone[1] === '62') {
          _reactNative.Linking.openURL("tel:+" + state.detailEmergency.user.phone.trim());
        } else {
          _reactNative.Linking.openURL("tel:" + state.detailEmergency.user.phone.trim());
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textButton
    }, "Hubungi"))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.subInfoWrapper
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textTitle
    }, "Alamat"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textValue
    }, state.detailEmergency.unit.unit_name))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.subInfoWrapper
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: styles.textTitle
    }, "Waktu Melakukan Panggilan"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      style: [styles.textValue, {
        maxWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(300)
      }]
    }, (0, _moment.default)(state.detailEmergency.created_at).format('dddd, DD MMMM YYYY, HH:mm:ss'))))), StatusView(state.detailEmergency.emergency_status), state.detailEmergency.emergency_status === 'Selesai' ? ResponseView() : /*#__PURE__*/_react.default.createElement(_reactNative.View, null)), state.detailEmergency.emergency_status === 'Proses' ? FooterView() : /*#__PURE__*/_react.default.createElement(_reactNative.View, null));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f7f8'
    },
    infoWrapper: {
      padding: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      backgroundColor: 'white'
    },
    subInfoWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20)
    },
    textPanggilan: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      color: '#9B9F95'
    },
    textTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      color: '#9B9F95'
    },
    textValue: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2),
      maxWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(210)
    },
    buttonValue: {
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(5),
      borderColor: '#5AAA0F',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(5)
    },
    textButton: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      color: '#5AAA0F'
    },
    viewStatus: {
      width: '100%',
      height: 'auto',
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2),
      borderTopColor: '#f5f7f8',
      borderBottomColor: '#f5f7f8',
      padding: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      backgroundColor: 'white'
    },
    viewUlasan: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      backgroundColor: 'white'
    },
    img: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(300),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(162),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10)
      //marginRight: toDp(10),
    },
    textNo: {
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#000000',
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(30),
      textAlign: 'center'
    },
    row: {
      flexDirection: 'row',
      width: '100%',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    line: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(262),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      backgroundColor: '#d3d6db',
      position: 'absolute',
      top: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      left: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(30),
      zIndex: -1
    },
    viewCenterStatus: {
      alignItems: 'center'
    },
    sizeActive: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(11)
    },
    sizeNoActive: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(11)
    },
    grey: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(11),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4)
    },
    textActive: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#273238'
    },
    textNoActive: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#788f9c'
    },
    viewStatusNew: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(78),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(30),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(15),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textStatus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#FFFFFF'
    },
    viewItemRow: {
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      flexDirection: 'row'
    },
    doneButton: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(width * 0.85),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10)
    },
    footer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2),
      borderColor: '#DDE3E0',
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      paddingBottom: _reactNative.Platform.OS === 'ios' ? (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(25) : 10,
      position: 'absolute',
      bottom: 0,
      width: width,
      backgroundColor: 'white'
    },
    doneText: {
      color: '#ffffff',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14)
    },
    imgPhoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      backgroundColor: '#9B9F95'
    },
    textName: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      color: '#788f9c'
    },
    textTime: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      color: '#788f9c'
    },
    textContent: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(6),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#000000'
    },
    textMore: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      color: '#56a7d4'
    },
    textBatal: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      fontWeight: '600',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.05)
    }
  });
  var _default = exports.default = DetailEmergencyScreen;
