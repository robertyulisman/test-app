  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _defineProperty2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _asyncStorage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _CustomTextInput = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _Toast = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[9]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[10]);
  var _reactNativeImageCropPicker = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[13]));
  var _this = this;
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var EditProfileScreen = function EditProfileScreen(props) {
    var toast = (0, _react.useRef)(null);
    var _useState = (0, _react.useState)({
        isLoading: false,
        loadingType: ''
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];
    var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isDarkMode = _useState4[0],
      setDarkMode = _useState4[1];
    var _useState5 = (0, _react.useState)({
        isModalVisible: false,
        isShowModalUnitInfo: false,
        isShowModalConfirm: false,
        isShowModalDelete: false
      }),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      viewState = _useState6[0],
      setViewState = _useState6[1];
    var _useState7 = (0, _react.useState)({
        fullname: '',
        email: '',
        noHp: '',
        picture: '',
        bodyPicture: '',
        image_url: '',
        isResident: false
      }),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      form = _useState8[0],
      setForm = _useState8[1];
    var _useState9 = (0, _react.useState)(''),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      fcmToken = _useState10[0],
      setFcmToken = _useState10[1];
    var _useState11 = (0, _react.useState)({}),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      unit = _useState12[0],
      setUnit = _useState12[1];
    var _useState13 = (0, _react.useState)({}),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      userData = _useState14[0],
      setUserData = _useState14[1];
    var _useState15 = (0, _react.useState)({
        errorFullname: '',
        errorEmail: '',
        errorNoHp: '',
        errorUnit: ''
      }),
      _useState16 = (0, _slicedToArray2.default)(_useState15, 2),
      errorForm = _useState16[0],
      setErrorForm = _useState16[1];
    var _useState17 = (0, _react.useState)({
        width: 200,
        height: 200,
        cropping: true,
        cropperCircleOverlay: true
      }),
      _useState18 = (0, _slicedToArray2.default)(_useState17, 2),
      options = _useState18[0],
      setOptions = _useState18[1];
    var handleForm = function handleForm(value, type) {
      setForm(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, (0, _defineProperty2.default)({}, type, type === 'noHp' ? value.replace(/[^0-9]{1,10}$/g, '') : type === 'fullName' ? value.replace(/[\w\W]{1,30}/g, '') : value));
      });
    };
    var handlePressUnit = function handlePressUnit() {
      setViewState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isShowModalUnitInfo: true
        });
      });
    };
    (0, _react.useEffect)(function () {
      var fetchData = /*#__PURE__*/function () {
        var _ref = (0, _asyncToGenerator2.default)(function* () {
          var dataUser = yield _asyncStorage.default.getItem('dataUser');
          var unit = yield _asyncStorage.default.getItem('unit');
          var fcmToken = yield _asyncStorage.default.getItem('fcmToken');

          // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
          setUserData(JSON.parse(dataUser));
          // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
          setUnit(JSON.parse(unit));
          // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
          setFcmToken(fcmToken);
        });
        return function fetchData() {
          return _ref.apply(this, arguments);
        };
      }();
      fetchData().catch(undefined);
    }, []);
    (0, _react.useEffect)(function () {
      setForm(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          // @ts-expect-error TS(2339): Property 'name' does not exist on type '{}'.
          fullname: userData.name,
          // @ts-expect-error TS(2339): Property 'email' does not exist on type '{}'.
          email: userData.email,
          // @ts-expect-error TS(2339): Property 'phone' does not exist on type '{}'.
          noHp: userData.phone,
          // @ts-expect-error TS(2339): Property 'image_url' does not exist on type '{}'.
          image_url: userData.image_url || '',
          // @ts-expect-error TS(2339): Property 'is_a_resident' does not exist on type '{... Remove this comment to see the full error message
          isResident: userData.is_a_resident
        });
      });
    }, [userData]);
    (0, _react.useEffect)(function () {}, [form.fullname, form.noHp]);
    var openCamera = function openCamera() {
      _reactNativeImageCropPicker.default.openCamera(options).then(function (response) {
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
      _reactNativeImageCropPicker.default.openPicker(options).then(function (response) {
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
    var handleDeleteAccount = function handleDeleteAccount() {
      setViewState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isShowModalDelete: false,
          isLoading: true
        });
      });
      setLoading(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isLoading: true
        });
      });
      deleteUser().then(function (response) {
        setLoading(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: false
          });
        });
        backToLogin();
      }).catch(function (err) {
        _reactNative.Alert.alert('Hapus Akun', '' + err.data.message, [{
          text: 'OK',
          onPress: function onPress() {
            setLoading(function (prevState) {
              return Object.assign(Object.assign({}, prevState), {}, {
                isLoading: false
              });
            });
          }
        }], {
          cancelable: false
        });
      });
    };
    var backToLogin = function backToLogin() {
      _asyncStorage.default.removeItem('token');
      _asyncStorage.default.removeItem('refresh');
      _asyncStorage.default.removeItem('dataUser');
      _asyncStorage.default.removeItem('features');
      _asyncStorage.default.removeItem('notification');
      _asyncStorage.default.removeItem('unit');
      NavigatorService.reset('Login');
    };
    var handleQuitUnit = function handleQuitUnit() {
      setViewState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isShowModalConfirm: false
        });
      });
      setTimeout(function () {
        setLoading(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: true
          });
        });
        (0, _$$_REQUIRE(_dependencyMap[14]).putUserExitUnit)({
          fcm_token: fcmToken
        }).then(function (response) {
          if (response.data.message === 'Logout success') {
            setLoading(function (prevState) {
              return Object.assign(Object.assign({}, prevState), {}, {
                isLoading: false
              });
            });
            backToLogin();
          }
        }).catch(function (error) {
          _reactNative.Alert.alert('Exit Unit', '' + error.data.message, [{
            text: 'OK',
            onPress: function onPress() {
              setLoading(function (prevState) {
                return Object.assign(Object.assign({}, prevState), {}, {
                  isLoading: false
                });
              });
            }
          }], {
            cancelable: false
          });
        });
      }, 400);
    };
    var processUpload = function processUpload(response) {
      if (response.didCancel) {
        //upload cancel
      } else {
        setViewState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isModalVisible: false
          });
        });
        setForm(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            picture: response.path
          });
        });
        var postData = new FormData();
        postData.append('file', {
          uri: response.path,
          type: 'image/jpg',
          name: 'centralconnect.jpg'
        });
        (0, _$$_REQUIRE(_dependencyMap[14]).postUpload)(postData).then(function (response) {
          setForm(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              image_url: response.data.image_urls[0]
            });
          });
        }).catch(function (error) {});
      }
    };
    var validateForm = function validateForm() {
      setErrorForm(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          errorFullname: form.fullname.length < 3 ? 'nama lengkap minimal 3 karakter' : '',
          errorNoHp: form.noHp.length < 9 ? 'No Handphone minimal 9 digit' : ''
        });
      });
    };
    var simpan = function simpan() {
      validateForm();
      if (form.fullname.length > 2 && form.noHp.length > 8) {
        setLoading(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: true
          });
        });
        var data = {
          name: form.fullname,
          phone: form.noHp,
          image_url: form.image_url
        };
        (0, _$$_REQUIRE(_dependencyMap[14]).putResidentEdit)(data).then(function (response) {
          _asyncStorage.default.setItem('dataUser', JSON.stringify(Object.assign(Object.assign({}, userData), {
            name: response.data.name,
            image_url: response.data.image_url,
            phone: response.data.phone
          })));
          props.route.params.setData(response.data.name, response.data.image_url, response.data.phone);
          setLoading(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoading: false,
              loadingType: 'success'
            });
          });
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          toast.current.show('Data profil berhasil di edit.');
        }).catch(function (error) {
          setLoading(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoading: false
            });
          });
        });
      }
    };
    var InfoUnitView = function InfoUnitView() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        onBackdropPress: function onBackdropPress() {
          return setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowModalUnitInfo: false
            });
          });
        },
        isVisible: viewState.isShowModalUnitInfo,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBox, {
          backgroundColor: isDarkMode ? '#121212' : 'white',
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(198)
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewModalTitle
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitleModal, {
          color: isDarkMode ? 'white' : '#263238'
        }]
      }, "INFO UNIT"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSilang,
        onPress: function onPress() {
          return setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowModalUnitInfo: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icSilang,
        style: styles.icSilang
      }))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textNo, {
          color: isDarkMode ? 'white' : '#273238'
        }]
      }, unit.code + '\n' + unit.unit_name), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchKeluar,
        onPress: function onPress() {
          setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowModalUnitInfo: false
            });
          });
          var self = _this;
          setTimeout(function () {
            setViewState(function (prevState) {
              return Object.assign(Object.assign({}, prevState), {}, {
                isShowModalConfirm: true
              });
            });
          }, 400);
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textKeluar
      }, "Keluar dari unit")))));
    };
    var ModalConfirmation = function ModalConfirmation() {
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
          backgroundColor: isDarkMode ? '#121212' : 'white',
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(220)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.titleConfirm, {
          color: isDarkMode ? 'white' : '#263238'
        }]
      }, "KELUAR UNIT"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textApakah, {
          color: isDarkMode ? 'white' : '#263238'
        }]
      }, "Apakah Anda yakin keluar dari unit ini? secara otomatis Anda akan keluar dari aplikasi."), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
      }, "Tidak")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchYa,
        onPress: function onPress() {
          return handleQuitUnit();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textYa
      }, "Ya, Keluar"))))));
    };
    var ModalConfirmationDeleteAccount = function ModalConfirmationDeleteAccount() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        onBackdropPress: function onBackdropPress() {
          return setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowModalDelete: false
            });
          });
        },
        isVisible: viewState.isShowModalDelete
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewModalCenter
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBoxCenter, {
          backgroundColor: isDarkMode ? '#121212' : 'white',
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(220)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.titleConfirm, {
          color: isDarkMode ? 'white' : '#263238'
        }]
      }, "Hapus Akun"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textApakah, {
          color: isDarkMode ? 'white' : '#263238'
        }]
      }, "Apakah Anda yakin menghapus akun ini, dan tidak bisa mengakses aplikasi ?"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchTidak,
        onPress: function onPress() {
          return setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowModalDelete: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textTidak
      }, "Tidak")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchYa,
        onPress: function onPress() {
          return handleDeleteAccount();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textYa
      }, "Hapus"))))));
    };
    var ModalSelectMedia = function ModalSelectMedia() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        onBackdropPress: function onBackdropPress() {
          return setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isModalVisible: false
            });
          });
        },
        isVisible: viewState.isModalVisible,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBox, {
          backgroundColor: isDarkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewModalTitle
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitleModal, {
          color: isDarkMode ? 'white' : '#263238'
        }]
      }, "UBAH FOTO"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSilang,
        onPress: function onPress() {
          return setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isModalVisible: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icSilang,
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
        source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icModalCamera,
        style: styles.icModalGallery
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textModal, {
          color: isDarkMode ? 'white' : 'black'
        }]
      }, 'Ambil foto')), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchChatCocierge,
        onPress: function onPress() {
          return openGallery();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.circleModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icModalGallery,
        style: styles.icModalGallery
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textModal, {
          color: isDarkMode ? 'white' : 'black'
        }]
      }, 'Pilih foto'))))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: isDarkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: isDarkMode ? 'light-content' : 'dark-content',
      translucent: true,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.header, {
        backgroundColor: isDarkMode ? '#1C1C1E' : 'white',
        borderBottomColor: isDarkMode ? '#1C1C1E' : '#9B9F95'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchHeader,
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icBack,
      style: [styles.icBack, {
        tintColor: isDarkMode ? 'white' : '#383B34'
      }]
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.linearHeader
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "medium",
      style: [styles.title]
    }, 'Edit Profil')), "// @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message", undefined, form.isResident && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchHeaderSearch,
      onPress: function onPress() {
        return setViewState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isShowModalDelete: true
          });
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icDelete,
      style: [styles.icFilter, {
        tintColor: isDarkMode ? 'white' : '#383B34'
      }]
    }))), /*#__PURE__*/_react.default.createElement(_Toast.default, {
      ref: toast
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewProfile
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.wrapper
    }, form.image_url ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: {
        uri: form.image_url
      },
      style: styles.imgProfile
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[16]).allLogo.imgDefault,
      style: styles.imgProfile
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchLupa,
      onPress: function onPress() {
        return setViewState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isModalVisible: true
          });
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: [styles.textLupa]
    }, "Ubah Foto")))), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: loading.isLoading
    }), ModalSelectMedia(), form.isResident && InfoUnitView(), ModalConfirmation(), ModalConfirmationDeleteAccount(), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewTextTitle
    }, /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
      title: 'Nama Lengkap',
      placeholder: 'Masukan nama lengkap (sesuai KTP)',
      error: errorForm.errorFullname,
      value: form.fullname,
      maxLength: 50,
      onChangeText: function onChangeText(fullname) {
        return handleForm(fullname, 'fullname');
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
      title: 'Email',
      error: errorForm.errorEmail,
      value: form.email,
      editable: false,
      maxLength: 50
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
      title: 'No handphone',
      placeholder: 'Masukkan no handphone',
      error: errorForm.errorNoHp,
      value: form.noHp,
      onChangeText: function onChangeText(value) {
        return handleForm(value, 'noHp');
      },
      maxLength: 12,
      keyboardType: 'phone-pad',
      editable: true
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
      }
    }), unit ? /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "regular",
      style: styles.textTitle
    }, "Unit (aktif)"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.viewText,
      onPress: function onPress() {
        return handlePressUnit();
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "regular",
      style: [styles.textValue]
    }, unit.unit_name), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[16]).allLogo.arrowRight,
      style: styles.icChevronDown
    }))) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
      }
    })))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.positionFooter
    }, form.fullname === '' || form.email === '' || form.noHp === '' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.touchKirim, {
        backgroundColor: '#d3d6db'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textKirim
    }, "Simpan")) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        return simpan();
      },
      style: [styles.touchKirim, {
        backgroundColor: '#5AAA0F'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      style: styles.textKirim
    }, "Simpan"))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(28) : 0
    },
    headeriOS: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    viewProfile: {
      width: width,
      height: 'auto',
      alignItems: 'flex-start',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
    },
    wrapper: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(100),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(100),
      flexDirection: 'row',
      alignItems: 'center'
    },
    imgProfile: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(100),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(100),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(50)
    },
    touchPencil: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(28),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(28),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      padding: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      backgroundColor: '#5AAA0F'
    },
    icPencil: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      tintColor: 'white'
    },
    content: {
      padding: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(32)
    },
    viewTextTitle: {
      width: width * 0.82
    },
    touchKirim: {
      width: width * 0.82,
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKirim: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: 'white',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.7)
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
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(180),
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
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4)
    },
    icSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      tintColor: '#5AAA0F'
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
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#000000'
    },
    viewTextEmail: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(6),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8)
    },
    textEmailField: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#273238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.6)
    },
    textEmailValue: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#273238'
    },
    positionFooter: {
      width: width,
      alignItems: 'center',
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
    },
    viewArea: {
      flexDirection: 'row'
      //backgroundColor: 'cyan'
    },
    touchDown: {
      position: 'absolute',
      top: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(36),
      right: 0
    },
    icNext: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
    },
    textNo: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      color: '#273238',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
    },
    touchKeluar: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      width: '90%',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKeluar: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.7)
    },
    viewModalCenter: {
      width: 'auto',
      height: 'auto',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalBoxCenter: {
      width: width * 0.8,
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(200),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      alignItems: 'center'
    },
    titleConfirm: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.7)
    },
    textApakah: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(28),
      textAlign: 'center',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.6),
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
    },
    viewRow: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      flexDirection: 'row'
    },
    touchTidak: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(110),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textTidak: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.7)
    },
    touchYa: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(110),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      borderColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10)
    },
    textYa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.7)
    },
    touchLupa: {
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      borderColor: '#5AAA0F',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      color: '#5AAA0F'
    },
    textLupa: {
      color: '#5AAA0F'
    },
    viewText: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(2),
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      backgroundColor: '#F6F7F4',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10)
    },
    icChevronDown: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      tintColor: '#5E6157',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    textTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#9B9F95'
    },
    textValue: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(15)
    },
    header: {
      width: width,
      height: 'auto',
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      borderBottomColor: '#121212',
      backgroundColor: 'white'
    },
    linearHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(60)
    },
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      position: 'absolute',
      left: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      zIndex: 1
    },
    icBack: {
      //marginHorizontal: toDp(8),
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      tintColor: '#5AAA0F'
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    icFilter: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      tintColor: '#5AAA0F',
      resizeMode: 'contain'
    },
    title: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(18)
    }
  });
  var _default = exports.default = EditProfileScreen;
