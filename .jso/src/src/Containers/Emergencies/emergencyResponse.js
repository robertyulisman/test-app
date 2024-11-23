  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _reactNativeImageCropPicker = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _CustomTextArea = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var EmergencyResponseScreen = function EmergencyResponseScreen(_ref) {
    var navigation = _ref.navigation,
      route = _ref.route;
    var _useState = (0, _react.useState)({
        isLoading: false,
        isDarkMode: false,
        tanggapan: '',
        errorTanggapan: '',
        arrayPhoto: [],
        isModalVisible: false,
        options: {
          width: 100,
          height: 100,
          cropping: false,
          compressImageQuality: 0.2,
          compressImageMaxWidth: 1500,
          compressImageMaxHeight: 2000,
          includeExif: true,
          mediaType: 'photo'
        }
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    var openCamera = function openCamera() {
      _reactNativeImageCropPicker.default.openCamera(state.options).then(function (response) {
        processUpload(response);
      }).catch(function (err) {
        if (err == 'Error: Required permission missing' || err == 'User did not grant camera permission.') {
          _reactNative.Alert.alert('Pengaturan', 'Akses ambil foto belum diaktifkan.\nBerikan akses untuk memulai mengambil gambar. Aktifkan akses ambil foto dari Pengaturan.', [{
            text: 'Nanti Saja',
            onPress: function onPress() {
              return undefined;
            }
          }, {
            text: 'Aktifkan',
            onPress: function onPress() {
              _reactNative.Linking.openSettings();
            }
          }], {
            cancelable: false
          });
        }
      });
    };
    var openGallery = function openGallery() {
      _reactNativeImageCropPicker.default.openPicker(state.options).then(function (response) {
        processUpload(response);
      }).catch(function (err) {
        if (err == 'Error: Required permission missing' || err == 'Error: Cannot access images. Please allow access if you want to be able to select images.') {
          _reactNative.Alert.alert('Pengaturan', 'Akses pilih foto belum diaktifkan.\nBerikan akses untuk memulai mengambil gambar. Aktifkan akses pilih foto dari Pengaturan.', [{
            text: 'Nanti Saja',
            onPress: function onPress() {
              return undefined;
            }
          }, {
            text: 'Aktifkan',
            onPress: function onPress() {
              _reactNative.Linking.openSettings();
            }
          }], {
            cancelable: false
          });
        }
      });
    };
    var processUpload = function processUpload(response) {
      if (response.didCancel) {
        //upload cancel
      } else {
        var arrayPhoto = state.arrayPhoto;
        arrayPhoto.push({
          data: response.data,
          mime: response.mime,
          exif: response.exif,
          path: response.path
        });
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            arrayPhoto: arrayPhoto,
            isModalVisible: false
          });
        });
      }
    };
    var handleSendResponse = function handleSendResponse() {
      setState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isLoading: true
        });
      });
      // @ts-expect-error TS(2693): 'FormData' only refers to a type, but is being use... Remove this comment to see the full error message
      var postData = new FormData();
      for (var i = 0; i < state.arrayPhoto.length; i++) {
        postData.append('file', {
          uri: state.arrayPhoto[i].path,
          type: 'image/jpg',
          name: 'batam-central' + i + '.jpg'
        });
      }
      (0, _$$_REQUIRE(_dependencyMap[10]).postUpload)(postData).then(function (response) {
        var data = {
          content: state.tanggapan,
          image_urls: response.data.image_urls
        };
        (0, _$$_REQUIRE(_dependencyMap[10]).postEmergencyResponseFinish)(route.params.emergencyData.id, data).then(function (responsePost) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false
            });
          });
          route.params.emergencyData.refreshData();
          var popAction = _$$_REQUIRE(_dependencyMap[11]).StackActions.pop(2);
          navigation.dispatch(popAction);
          route;
        }).catch(function (error) {
          //error when post response
          _reactNative.Alert.alert('' + error.status, '' + error.data.message, [{
            text: 'OK',
            onPress: function onPress() {
              return setState(function (state) {
                return Object.assign(Object.assign({}, state), {}, {
                  isLoading: false
                });
              });
            }
          }]);
        });
      }).catch(function (error) {
        //error when upload image
        _reactNative.Alert.alert('' + error.status, '' + error.data.message, [{
          text: 'OK',
          onPress: function onPress() {
            return setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                isLoading: false
              });
            });
          }
        }]);
      });
    };
    var FooterView = function FooterView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.footer
      }, state.tanggapan.trim() === '' || state.arrayPhoto.length < 1 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.doneButton, {
          backgroundColor: '#d3d6db'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.doneText
      }, "Kirim dan Selesaikan Panggilan")) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.doneButton,
        onPress: function onPress() {
          return handleSendResponse();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.doneText
      }, "Kirim dan Selesaikan Panggilan")));
    };
    var ModalSelectMedia = function ModalSelectMedia() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        onBackdropPress: function onBackdropPress() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isModalVisible: false
            });
          });
        },
        isVisible: state.isModalVisible,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBox, {
          backgroundColor: state.isDarkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewModalTitle
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitleModal, {
          color: state.isDarkMode ? 'white' : '#263238'
        }]
      }, "Pilih Media"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSilang,
        onPress: function onPress() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isModalVisible: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[12]).allLogo.icSilang,
        style: styles.icSilang
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.modalRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchChatCocierge,
        onPress: function onPress() {
          return openCamera();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.circleModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[12]).allLogo.icModalCamera,
        style: styles.icModalGallery
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textModal, {
          color: state.isDarkMode ? 'white' : 'black'
        }]
      }, 'Ambil foto')), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchChatCocierge,
        onPress: function onPress() {
          return openGallery();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.circleModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[12]).allLogo.icModalGallery,
        style: styles.icModalGallery
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textModal, {
          color: state.isDarkMode ? 'white' : 'black'
        }]
      }, 'Pilih foto'))))));
    };
    var ResponsePhotoView = function ResponsePhotoView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textTitleField
      }, "Foto tanggapan (max 5)"), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
        horizontal: true,
        style: styles.scrollViewRow
      }, state.arrayPhoto.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewPhoto
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: {
            uri: item.path
          },
          style: styles.photoUpload
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewSilang
        }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.circle,
          onPress: function onPress() {
            var arrayPhoto = state.arrayPhoto;
            arrayPhoto.splice(index, 1);
            setState(function (prevState) {
              return Object.assign(Object.assign({}, prevState), {}, {
                arrayPhoto: arrayPhoto
              });
            });
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[12]).allLogo.icSilang,
          style: styles.icSilangPhoto
        }))));
      }), state.arrayPhoto.length !== 5 && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchAddFoto,
        onPress: function onPress() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isModalVisible: true
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[12]).allLogo.icCameraPlus,
        style: styles.icCamera
      }))));
    };
    var handleChangeTanggapan = function handleChangeTanggapan(value) {
      setState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          tanggapan: value
        });
      });
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
      title: 'Tanggapan Panggilan',
      onPress: function onPress() {
        return navigation.goBack();
      }
    }), ModalSelectMedia(), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.infoWrapper
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textPanggilan
    }, "TANGGAPAN PENYELESAIAN \nPANGGILAN EMERGENCY"), /*#__PURE__*/_react.default.createElement(_CustomTextArea.default
    // inputRef={(ref) => this.tanggapan = ref}
    , {
      title: 'Tanggapan',
      placeholder: 'Masukkan tanggapan anda',
      error: state.errorTanggapan,
      value: state.tanggapan,
      maxLength: 1600,
      onChangeText: function onChangeText(tanggapan) {
        return handleChangeTanggapan(tanggapan);
      },
      autoCapitalize: 'sentences',
      returnKeyType: 'done'
    }), ResponsePhotoView())), FooterView());
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f7f8'
    },
    textPanggilan: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      color: '#9B9F95',
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20)
    },
    doneButton: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(width * 0.85),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(40),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(10)
    },
    infoWrapper: {
      padding: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      backgroundColor: 'white'
    },
    footer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(2),
      borderColor: '#DDE3E0',
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(10),
      paddingBottom: _reactNative.Platform.OS === 'ios' ? (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(25) : 10,
      position: 'absolute',
      bottom: 0,
      width: width,
      backgroundColor: 'white'
    },
    doneText: {
      color: '#ffffff',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14)
    },
    textTitleField: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12),
      color: '#788F9C',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(0.6),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(45)
    },
    scrollViewRow: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(8),
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(80)
    },
    viewPhoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(80),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(8),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4),
      backgroundColor: '#e7ebee'
    },
    photoUpload: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(80),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4)
    },
    viewSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(80),
      position: 'absolute'
    },
    circle: {
      position: 'absolute',
      top: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4),
      right: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4),
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center',
      shadowOpacity: 0.2,
      shadowOffset: {
        height: 1,
        width: 0
      },
      shadowColor: '#000000',
      elevation: 2
    },
    icSilangPhoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      tintColor: '#FFFFFF'
    },
    touchAddFoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(80),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F6F7F4'
    },
    icAddZoom: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(48),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(48),
      tintColor: '#788F9C'
    },
    icCamera: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(30),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(25.3),
      tintColor: '#b0bec5'
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
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(180),
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewModalCenter: {
      width: 'auto',
      height: 'auto',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalBoxCenter: {
      width: width * 0.8,
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(200),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(8),
      alignItems: 'center'
    },
    titleConfirm: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(0.7)
    },
    textTitleModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4)
    },
    icSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      tintColor: '#5AAA0F'
    },
    circleModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(40),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1),
      borderColor: '#5AAA0F',
      backgroundColor: 'white',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      justifyContent: 'center',
      alignItems: 'center'
    },
    icModalGallery: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      resizeMode: 'contain',
      tintColor: '#5AAA0F'
    },
    textModal: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(8),
      textAlign: 'center',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      color: '#000000'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    touchChatCocierge: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
  var _default = exports.default = EmergencyResponseScreen;
