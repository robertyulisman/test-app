  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _CustomTextArea = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[7]);
  var _reactNativeImageCropPicker = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var TanggapanScreen = function TanggapanScreen(props) {
    var _useState = (0, _react.useState)({
        date: '',
        title: '',
        desciption: '',
        arrayPhoto: [],
        location: '',
        arrCategory: [],
        idCategory: '',
        nameCategory: '',
        //ex
        pictures: [],
        arrayHolder: [],
        valueSearch: '',
        errorTitle: '',
        errorDesciption: '',
        tanggapan: '',
        errorTanggapan: '',
        latitude: '',
        longitude: '',
        options: {
          width: 100,
          height: 100,
          cropping: false,
          compressImageQuality: 0.2,
          compressImageMaxWidth: 1500,
          compressImageMaxHeight: 2000,
          includeExif: true,
          mediaType: 'photo'
        },
        modalVisible: false,
        loading: false,
        modalLabel: false,
        arrayCategory: [],
        darkMode: false,
        touch: true
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {}, []);
    var camera = function camera() {
      // @ts-expect-error TS(2345): Argument of type '{ width: number; height: number;... Remove this comment to see the full error message
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
    var gallery = function gallery() {
      // @ts-expect-error TS(2345): Argument of type '{ width: number; height: number;... Remove this comment to see the full error message
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
      if (response.didCancel) {} else {
        var arrayPhoto = state.arrayPhoto;
        arrayPhoto.push({
          // @ts-expect-error TS(2322): Type 'any' is not assignable to type 'never'.
          data: response.data,
          // @ts-expect-error TS(2322): Type 'any' is not assignable to type 'never'.
          mime: response.mime,
          // @ts-expect-error TS(2322): Type 'any' is not assignable to type 'never'.
          exif: response.exif,
          // @ts-expect-error TS(2322): Type 'any' is not assignable to type 'never'.
          path: response.path
        });
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            arrayPhoto: arrayPhoto,
            modalVisible: false
          });
        });
      }
    };
    var kirim = function kirim() {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loading: true
        });
      });

      // @ts-expect-error TS(2693): 'FormData' only refers to a type, but is being use... Remove this comment to see the full error message
      var postData = new FormData();
      for (var i = 0; i < state.arrayPhoto.length; i++) {
        postData.append('file', {
          // @ts-expect-error TS(2339): Property 'path' does not exist on type 'never'.
          uri: state.arrayPhoto[i].path,
          type: 'image/jpg',
          name: 'qluster-' + i + '.jpg'
        });
      }
      (0, _$$_REQUIRE(_dependencyMap[10]).postUpload)(postData).then(function (response) {
        var data = {
          complaint_status_id: props.route.params.statusName === 'Terkirim' ? '42bed447-c3fa-4799-b8a0-f42451be4c37' : '5ddcd42b-7e27-48df-a11a-3cf197d76e51',
          response: state.tanggapan,
          image_urls: response.data.image_urls
        };
        (0, _$$_REQUIRE(_dependencyMap[10]).postComplainsStatus)('/' + props.route.params.id + '/response', data).then(function (response) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              modalVisible: false
            });
          });
          props.navigation.goBack();
          props.route.params.load();
          props.route.params.loadComplains();
          props.route.params.backLaporan();
        }).catch(function (error) {
          if (error.data.name === 'ComplaintReportNotFoundError') {
            _reactNative.Alert.alert('Informasi', 'Laporan telah dipindah tugaskan ke pengelola/petugas lain', [{
              text: 'OK',
              onPress: function onPress() {
                setState(function (state) {
                  return Object.assign(Object.assign({}, state), {}, {
                    loading: false,
                    modalVisible: false
                  });
                });
                props.navigation.goBack();
                props.route.params.backLaporan();
              }
            }], {
              cancelable: false
            });
          } else {
            _reactNative.Alert.alert('Informasi', 'Petugas lain sudah menanggapi laporan ini', [{
              text: 'OK',
              onPress: function onPress() {
                setState(function (state) {
                  return Object.assign(Object.assign({}, state), {}, {
                    loading: false,
                    modalVisible: false
                  });
                });
                props.navigation.goBack();
                props.route.params.backLaporan();
              }
            }], {
              cancelable: false
            });
          }
        });
      }).catch(function (error) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false
          });
        });
        _reactNative.Alert.alert('' + error.status, '' + error.data);
      });
    };
    var renderModal = function renderModal() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        onBackdropPress: function onBackdropPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
        },
        isVisible: state.modalVisible,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBox, {
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewModalTitle
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textTitleModal, {
          color: state.darkMode ? 'white' : '#263238'
        }]
      }, "Tambah Foto"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSilang,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icSilang,
        style: styles.icSilangModal
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.modalRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchChatCocierge,
        onPress: function onPress() {
          return camera();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.circleModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icModalCamera,
        style: styles.icModalGallery
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textModal, {
          color: state.darkMode ? 'white' : '#263238'
        }]
      }, 'Ambil foto')), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchChatCocierge,
        onPress: function onPress() {
          return gallery();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.circleModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icModalGallery,
        style: styles.icModalGallery
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textModal, {
          color: state.darkMode ? 'white' : '#263238'
        }]
      }, 'Pilih foto'))))));
    };
    var renderFoto = function renderFoto() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24) : (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: styles.textTitleField
      }, "Foto tanggapan (max 5)"), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
        horizontal: true,
        style: styles.scrollViewRow
      }, state.arrayPhoto.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewPhoto
        }, "// @ts-expect-error TS(2339): Property 'path' does not exist on type 'never'.", /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
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
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                arrayPhoto: arrayPhoto
              });
            });
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icSilang,
          style: styles.icSilang
        }))));
      }), state.arrayPhoto.length !== 5 && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchAddFoto,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: true
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icCameraPlus,
        style: styles.icCamera
      }))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Tanggapan Laporan',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), renderModal(), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.loading
    }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
      behavior: 'padding',
      enabled: _reactNative.Platform.OS === 'ios' ? true : false
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.viewTextTitle, {
        backgroundColor: state.darkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      allowFontScaling: false,
      style: [styles.textTitleModal, {
        color: state.darkMode ? 'white' : '#9B9F95'
      }]
    }, props.route.params.statusName === 'Terkirim' ? 'TANGGAPAN PEMROSESAN LAPORAN' : 'Tanggapan laporan Selesai diproses'.toUpperCase()), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20)
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomTextArea.default, {
      title: 'Tanggapan',
      placeholder: 'Masukkan tanggapan anda',
      placeholderTextColor: '#CCCFC9',
      error: state.errorTanggapan,
      value: state.tanggapan,
      maxLength: 1600,
      onChangeText: function onChangeText(tanggapan) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            tanggapan: tanggapan
          });
        });
        if (tanggapan.trim() === '') {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              errorTanggapan: 'Field ini tidak boleh kosong.'
            });
          });
        } else {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              errorTanggapan: ''
            });
          });
        }
      },
      autoCapitalize: 'sentences',
      returnKeyType: 'done'
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(48)
      }
    }), renderFoto())))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footer
    }, state.tanggapan.trim() === '' || state.arrayPhoto.length === 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.touchKirim, {
        backgroundColor: '#CCCFC9'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      allowFontScaling: false,
      style: styles.textKirim
    }, "Kirim")) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: [styles.touchKirim, {
        backgroundColor: '#5AAA0F'
      }],
      onPress: function onPress() {
        return kirim();
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      t: true,
      allowFontScaling: false,
      style: styles.textKirim
    }, "Kirim"))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    headeriOS: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      backgroundColor: '#917438'
    },
    content: {
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24)
    },
    viewTextTitle: {
      width: width * 0.9,
      height: 'auto',
      backgroundColor: '#FFFFFF'
    },
    textInclude: {
      color: 'red',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      fontWeight: '500'
      //fontFamily: 'Montserrat-Medium',
    },
    textTitleField: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#9B9F95',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.6)
    },
    scrollViewRow: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80)
    },
    viewPhoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      backgroundColor: '#F6F7F4'
    },
    photoUpload: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4)
    },
    viewSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80),
      position: 'absolute'
    },
    circle: {
      position: 'absolute',
      top: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      right: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
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
    icSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      tintColor: '#FFFFFF'
    },
    touchAddFoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(80),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F6F7F4'
    },
    icAddZoom: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(48),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(48),
      tintColor: '#788F9C'
    },
    touchKirim: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      backgroundColor: '#917438',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKirim: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      color: 'white',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.7)
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
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(165),
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    touchChatCocierge: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4)
    },
    icSilangModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      tintColor: '#5E6157'
    },
    circleModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      borderColor: '#5AAA0F',
      backgroundColor: 'white',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      justifyContent: 'center',
      alignItems: 'center'
    },
    icModalGallery: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      resizeMode: 'contain',
      tintColor: '#5AAA0F'
    },
    textModal: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      textAlign: 'center',
      //fontFamily: 'Montserrat-Medium',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#000000',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2)
    },
    touchLabelItem: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      flex: 1,
      alignItems: 'center'
    },
    picture: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(48),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(48)
    },
    textLabel: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      textAlign: 'center',
      //fontFamily: 'Montserrat-Medium',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      color: '#000000'
    },
    touchLabellaporan: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(54),
      flexDirection: 'row'
    },
    icChevronDown: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(28),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(28),
      tintColor: '#B0BEC5',
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0),
      bottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4)
    },
    viewSearchRoot: {
      flexDirection: 'row',
      alignItems: 'center',
      //marginTop: toDp(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8)
    },
    viewSearch: {
      width: '90%',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      borderColor: '#788F9C',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(44),
      alignItems: 'center',
      flexDirection: 'row'
    },
    icSearch2: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      tintColor: '#8d96a6',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4)
    },
    touchAll: {
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8)
    },
    icDeleteAll: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24)
    },
    textInput: {
      flex: 1,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      color: '#757575',
      //fontFamily: 'Montserrat-Medium',
      fontWeight: '300'
    },
    rowView: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    line: {
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      backgroundColor: '#e7ebee'
    },
    icCamera: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(30),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(25.3),
      tintColor: '#CCCFC9'
    },
    icCalendar: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8)
    },
    icLp: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8)
    },
    text: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      color: '#000000',
      //fontFamily: 'Montserrat-Regular',
      letterSpacing: 0
    },
    footer: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(72),
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0.5),
      borderTopColor: '#DDE3E0'
    }
  });
  var _default = exports.default = TanggapanScreen;
