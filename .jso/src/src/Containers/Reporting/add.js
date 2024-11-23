  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _CustomComboBox = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _CustomTextArea = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _CustomTextInput = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[9]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[10]);
  var _reactNativeImageCropPicker = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var AddReportScreen = function AddReportScreen(props) {
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
        touch: true,
        statusReport: 'Pribadi'
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      (0, _$$_REQUIRE(_dependencyMap[13]).getComplainsLabels)().then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            arrayCategory: response.data.complaint_categories,
            date: (0, _moment.default)(new Date()).format('dddd, DD MMMM YYYY, HH:mm:ss') + ' WIB'
          });
        });
      }).catch(function (error) {});
    }, []);
    (0, _react.useEffect)(function () {
      var newData = state.arrayHolder.filter(function (item) {
        // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
        var itemData = "" + item.name.toUpperCase();
        // @ts-expect-error TS(2304): Cannot find name 'valueSearch'.
        var textData = valueSearch.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          arrCategory: newData
        });
      });
    }, [state.valueSearch]);
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
          data: response.data,
          mime: response.mime,
          exif: response.exif,
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
      if (state.desciption.length < 10) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            errorDesciption: 'Field ini minimal 10 karakter.'
          });
        });
      } else {
        var pictures = state.pictures;
        var postData = new FormData();
        for (var i = 0; i < state.arrayPhoto.length; i++) {
          postData.append('file', {
            // @ts-expect-error TS(2339): Property 'path' does not exist on type 'never'.
            uri: state.arrayPhoto[i].path,
            type: 'image/jpg',
            name: 'qluster-' + i + '.jpg'
          });
        }
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: true
          });
        });
        (0, _$$_REQUIRE(_dependencyMap[13]).postUpload)(postData).then(function (response) {
          var data = {
            title: state.title,
            content: state.desciption,
            complaint_category_id: state.idCategory,
            image_urls: response.data.image_urls,
            is_public: false
          };
          (0, _$$_REQUIRE(_dependencyMap[13]).postComplainsCreate)(data).then(function (response) {
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                loading: false
              });
            });
            props.route.params.showMessageSuccess();
            props.route.params.loadComplains();
            props.navigation.goBack();
          }).catch(function (error) {
            _reactNative.Alert.alert('' + error.status, '' + error.data.message, [{
              text: 'OK',
              onPress: function onPress() {
                return setState(function (state) {
                  return Object.assign(Object.assign({}, state), {}, {
                    loading: false
                  });
                });
              }
            }]);
          });
        }).catch(function (error) {
          _reactNative.Alert.alert('' + error.status, '' + error.data, [{
            text: 'OK',
            onPress: function onPress() {
              return setState(function (state) {
                return Object.assign(Object.assign({}, state), {}, {
                  loading: false
                });
              });
            }
          }]);
        });
      }
    };
    var renderFoto = function renderFoto() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [styles.textTitleField, {
          color: '#9B9F95'
        }]
      }, "Foto tanggapan (max 3)"), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
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
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                arrayPhoto: arrayPhoto
              });
            });
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icSilang,
          style: styles.icSilang
        }))));
      }), state.arrayPhoto.length !== 3 && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchAddFoto,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: true
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icCameraPlus,
        style: styles.icCamera
      }))));
    };
    var renderModal = function renderModal() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        onBackButtonPress: function onBackButtonPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
        },
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
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icSilang,
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
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icModalCamera,
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
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icModalGallery,
        style: styles.icModalGallery
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textModal, {
          color: state.darkMode ? 'white' : '#263238'
        }]
      }, 'Pilih foto'))))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Buat Laporan',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.loading
    }), renderModal(), /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
      behavior: 'padding',
      enabled: _reactNative.Platform.OS === 'ios' ? true : false
    }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        backgroundColor: '#F6F7F4',
        width: width,
        height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(54),
        paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
        justifyContent: 'center'
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.rowView
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icCalendar,
      style: [styles.icCalendar, {
        tintColor: state.darkMode ? 'white' : '#9B9F95'
      }]
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      allowFontScaling: false,
      style: [styles.text, {
        color: state.darkMode ? 'white' : '#5E6157'
      }]
    }, state.date))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.viewTextTitle, {
        backgroundColor: state.darkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20)
      }
    }), renderFoto(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20)
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
      title: 'Judul laporan',
      placeholder: 'Masukkan judul laporan disini',
      error: state.errorTitle,
      value: state.title,
      maxLength: 255,
      onChangeText: function onChangeText(title) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            title: title
          });
        });
        if (title.trim() === '') {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              errorTitle: 'Field ini tidak boleh kosong.'
            });
          });
        } else {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              errorTitle: ''
            });
          });
        }
      },
      autoCapitalize: 'sentences',
      returnKeyType: 'next'
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
      }
    }), state.arrayCategory.length !== 0 && /*#__PURE__*/_react.default.createElement(_CustomComboBox.default, {
      darkMode: state.darkMode,
      title: 'Label laporan',
      desc: '',
      textPlaceholder: 'Pilih Label laporan',
      value: state.nameCategory,
      maxLength: 2000,
      arrayData: state.arrayCategory,
      onSelected: function onSelected(item, index) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            idCategory: item.id,
            nameCategory: item.name
          });
        });
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomTextArea.default, {
      title: 'Deskripsi laporan',
      placeholder: 'Masukkan deskripsi laporan disini',
      error: state.errorDesciption,
      value: state.desciption,
      onChangeText: function onChangeText(desciption) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            desciption: desciption
          });
        });
        if (desciption.trim() === '') {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              errorDesciption: 'Field ini tidak boleh kosong.'
            });
          });
        } else {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              errorDesciption: ''
            });
          });
        }
      },
      autoCapitalize: 'sentences',
      returnKeyType: 'next'
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(80)
      }
    }), state.title.trim() === '' || state.desciption.trim() === '' || state.nameCategory === '' || state.arrayPhoto.length === 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.touchKirim, {
        backgroundColor: '#d3d6db'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      allowFontScaling: false,
      style: styles.textKirim
    }, "Kirim Laporan")) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchKirim,
      onPress: function onPress() {
        return kirim();
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      allowFontScaling: false,
      style: styles.textKirim
    }, "Kirim Laporan")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(44)
      }
    }))))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    headeriOS: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      backgroundColor: '#917438'
    },
    content: {
      alignItems: 'center'
    },
    viewTextTitle: {
      width: width * 0.9,
      height: 'auto',
      backgroundColor: '#FFFFFF'
    },
    textInclude: {
      color: 'red',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      fontWeight: '500'
      //fontFamily: 'Montserrat-Medium',
    },
    textTitleField: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#788F9C'
      //letterSpacing: toDp(0.6)
    },
    scrollViewRow: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(80)
    },
    viewPhoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(80),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      backgroundColor: '#F6F7F4'
    },
    photoUpload: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(80),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10)
    },
    viewSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(80),
      position: 'absolute'
    },
    circle: {
      position: 'absolute',
      top: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      right: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      //backgroundColor: '#917438',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
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
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      tintColor: '#FFFFFF'
    },
    touchAddFoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(80),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F6F7F4'
    },
    icAddZoom: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48),
      tintColor: '#788F9C'
    },
    touchKirim: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKirim: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: 'white',
      fontStyle: 'normal'
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
    touchChatCocierge: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center'
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
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(2),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4)
    },
    icSilangModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      tintColor: '#5E6157'
    },
    circleModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      borderColor: '#5AAA0F',
      backgroundColor: 'white',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      justifyContent: 'center',
      alignItems: 'center'
    },
    icModalGallery: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      resizeMode: 'contain',
      tintColor: '#5AAA0F'
    },
    textModal: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      textAlign: 'center',
      //fontFamily: 'Montserrat-Medium',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#000000',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(2)
    },
    touchLabelItem: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      flex: 1,
      alignItems: 'center'
    },
    picture: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48)
    },
    textLabel: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      textAlign: 'center',
      //fontFamily: 'Montserrat-Medium',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      color: '#000000'
    },
    touchLabellaporan: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(54),
      flexDirection: 'row'
    },
    icChevronDown: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(28),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(28),
      tintColor: '#B0BEC5',
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0),
      bottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4)
    },
    viewSearchRoot: {
      flexDirection: 'row',
      alignItems: 'center',
      //marginTop: toDp(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8)
    },
    viewSearch: {
      width: '90%',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      borderColor: '#788F9C',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(44),
      alignItems: 'center',
      flexDirection: 'row'
    },
    icSearch2: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      tintColor: '#8d96a6',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4)
    },
    touchAll: {
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8)
    },
    icDeleteAll: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
    },
    textInput: {
      flex: 1,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      color: '#757575',
      //fontFamily: 'Montserrat-Medium',
      fontWeight: '300'
    },
    rowView: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    line: {
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      backgroundColor: '#e7ebee'
    },
    icCamera: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(30),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(25.3),
      tintColor: '#CCCFC9'
    },
    icCalendar: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8)
    },
    icLp: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8)
    },
    text: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#000000',
      //fontFamily: 'Montserrat-Regular',
      letterSpacing: 0
    },
    viewRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(56)
    },
    touchPublic: {
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(6)
    },
    icPublic: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
    },
    textPublic: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4)
    },
    touchStatusPublicPrivate: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(84),
      backgroundColor: '#DAD1BD',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4)
    },
    viewAja: {
      width: '86%',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10)
    },
    textLaporan: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(6)
    },
    textTitleLaporan: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12)
    }
  });
  var _default = exports.default = AddReportScreen;
