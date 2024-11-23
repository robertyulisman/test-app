  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _defineProperty2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _CustomComboBox = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _CustomTextInput = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[7]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[8]);
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[10]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var RegisterScreen = function RegisterScreen(_ref) {
    var navigation = _ref.navigation;
    var fullNameRef = (0, _react.useRef)();
    var emailRef = (0, _react.useRef)();
    var phoneRef = (0, _react.useRef)();
    var passwordRef = (0, _react.useRef)();
    var confirmPassRef = (0, _react.useRef)();
    var _useState = (0, _react.useState)({
        isShowSuccessModal: false,
        isShowFailModal: false,
        isLoading: false,
        isSecureTextEntry: true,
        isSecureConfirmPassEntry: true,
        isDarkMode: false,
        isRegister: true,
        isAgree: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      viewState = _useState2[0],
      setViewState = _useState2[1];
    var _useState3 = (0, _react.useState)({
        fullname: '',
        email: '',
        noHp: '',
        password: '',
        confirmPass: ''
      }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      formState = _useState4[0],
      setFormState = _useState4[1];
    var _useState5 = (0, _react.useState)({
        apartment: 'CentralConnect',
        tower: {
          id: '',
          name: ''
        },
        lantai: '',
        unit: '',
        unitId: '',
        syarat: false
      }),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      formAddress = _useState6[0],
      setFormAddress = _useState6[1];
    var _useState7 = (0, _react.useState)({
        arrTower: [],
        arrFloors: [],
        arrUnits: [],
        arrIdUnits: []
      }),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      listAddress = _useState8[0],
      setListAdress = _useState8[1];
    var _useState9 = (0, _react.useState)({
        errorFullname: '',
        errorEmail: '',
        errorNoHp: '',
        errorPassword: '',
        errorComfirmPass: ''
      }),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      errorFormState = _useState10[0],
      setErrorFormState = _useState10[1];
    (0, _react.useEffect)(function () {
      var _formAddress$tower;
      if (((_formAddress$tower = formAddress.tower) == null ? undefined : _formAddress$tower.id) !== '') {
        var _formAddress$tower2;
        (0, _$$_REQUIRE(_dependencyMap[11]).getUnitsFloors)('?cluster_id=' + ((_formAddress$tower2 = formAddress.tower) == null ? undefined : _formAddress$tower2.id)).then(function (response) {
          var arrFloors = [];
          for (var i = 0; i < response.data.units.length; i++) {
            arrFloors.push(response.data.units[i].block);
          }
          setListAdress(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              arrFloors: arrFloors
            });
          });
          setFormAddress(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              lantai: '',
              unit: ''
            });
          });
        }).catch(function (error) {});
      }
    }, [formAddress.tower]);
    (0, _react.useEffect)(function () {
      if (formAddress.lantai !== '') {
        var _formAddress$tower3;
        (0, _$$_REQUIRE(_dependencyMap[11]).getUnits)('?cluster_id=' + ((_formAddress$tower3 = formAddress.tower) == null ? undefined : _formAddress$tower3.id) + '&block=' + formAddress.lantai).then(function (response) {
          var arrUnits = [];
          var arrIdUnits = [];
          for (var i = 0; i < response.data.units.length; i++) {
            arrIdUnits.push(response.data.units[i]);
            arrUnits.push(response.data.units[i].unit_name);
          }
          setListAdress(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              arrUnits: arrUnits,
              arrIdUnits: arrIdUnits
            });
          });
          setFormAddress(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              unit: ''
            });
          });
        }).catch(function (error) {});
      }
    }, [formAddress.lantai]);
    (0, _react.useEffect)(function () {
      (0, _$$_REQUIRE(_dependencyMap[11]).getUnitsTower)('').then(function (response) {
        var tempTower = [];
        for (var i = 0; i < response.data.length; i++) {
          tempTower.push({
            id: response.data[i].id,
            name: response.data[i].name
          });
        }
        setListAdress(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            arrTower: tempTower
          });
        });
      }).catch(function (error) {});
    }, []);
    var handleForm = function handleForm(value, type) {
      setFormState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, (0, _defineProperty2.default)({}, type, type === 'noHp' ? value.replace(/[^0-9]/g, '') : value));
      });
    };
    var handleSelectAddress = function handleSelectAddress(value, type) {
      if (type === 'unit') {
        var unitId = '';
        for (var i = 0; i < listAddress.arrIdUnits.length; i++) {
          // @ts-expect-error TS(2339): Property 'unit_name' does not exist on type 'never... Remove this comment to see the full error message
          if (listAddress.arrIdUnits[i].unit_name === value) {
            // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
            unitId = listAddress.arrIdUnits[i].id;
          }
        }
        setFormAddress(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            unitId: unitId,
            unit: value
          });
        });
      } else {
        setFormAddress(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, (0, _defineProperty2.default)({}, type, value));
        });
      }
    };
    var validateEmail = function validateEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };
    var handleNext = function handleNext() {
      if (!validateEmail(formState.email)) {
        setErrorFormState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            errorEmail: 'Format email salah.'
          });
        });
      } else if (formState.password.length < 6) {
        setErrorFormState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            errorPassword: 'Password minimal 6 karakter.'
          });
        });
      } else if (formState.password != formState.confirmPass) {
        setErrorFormState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            errorComfirmPass: 'Password baru yang dimasukkan tidak sesuai.'
          });
        });
      } else {
        setViewState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isRegister: false
          });
        });
      }
    };
    var handleRegister = function handleRegister() {
      var data = {
        name: formState.fullname,
        email: formState.email,
        phone: formState.noHp,
        password: formState.password,
        unit_id: formAddress.unitId
      };
      setViewState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isLoading: true
        });
      });
      (0, _$$_REQUIRE(_dependencyMap[11]).postUsersRegister)(data).then(function (response) {
        setViewState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isLoading: false,
            isShowSuccessModal: true
          });
        });
      }).catch(function (error) {
        if (error.data.name === 'EmailAlreadyExistError') {
          setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isRegister: true,
              isLoading: false
            });
          });
          setErrorFormState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              errorEmail: 'Email telah terdaftar'
            });
          });
        } else if (error.data.name === 'UserLimitReachedError') {
          setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoading: false,
              isShowFailModal: true
            });
          });
        } else {
          setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoading: false
            });
          });
        }
      });
    };
    var RegisterView = function RegisterView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
        behavior: 'padding',
        enabled: _reactNative.Platform.OS === 'ios' ? true : false
      }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.header
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchLupa,
        onPress: function onPress() {
          return navigation.goBack();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textLupa]
      }, "Login")), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[12]).allLogo.logo
        // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
        ,
        style: [styles.logo, {
          tintColor: viewState.darkMode && 'white'
        }]
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textLupaPassword]
      }, "REGISTER"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.content
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewTextTitle
      }, /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
        inputRef: fullNameRef,
        title: 'Nama Lengkap',
        placeholder: 'Masukan nama lengkap (sesuai KTP)',
        error: errorFormState.errorFullname,
        value: formState.fullname,
        returnKeyType: "next",
        onChangeText: function onChangeText(value) {
          return handleForm(value, 'fullname');
        },
        onSubmitEditing: function onSubmitEditing() {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          emailRef.current.focus();
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
        }
      }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
        inputRef: emailRef,
        title: 'Email',
        placeholder: 'Masukkan alamat email',
        error: errorFormState.errorEmail,
        value: formState.email,
        returnKeyType: "next",
        onChangeText: function onChangeText(value) {
          return handleForm(value, 'email');
        },
        keyboardType: 'email-address',
        onSubmitEditing: function onSubmitEditing() {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          phoneRef.current.focus();
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
        }
      }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
        inputRef: phoneRef,
        title: 'No handphone',
        placeholder: 'Masukkan no handphone',
        error: errorFormState.errorNoHp,
        value: formState.noHp,
        returnKeyType: "next",
        onChangeText: function onChangeText(value) {
          return handleForm(value, 'noHp');
        },
        maxLength: 13,
        keyboardType: 'phone-pad',
        onSubmitEditing: function onSubmitEditing() {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          passwordRef.current.focus();
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
        }
      }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
        inputRef: passwordRef,
        title: 'Password',
        placeholder: 'Masukkan password',
        value: formState.password,
        error: errorFormState.errorPassword,
        onChangeText: function onChangeText(value) {
          return handleForm(value, 'password');
        },
        autoCapitalize: 'none',
        type: "password",
        returnKeyType: 'next',
        maxLength: 23,
        secureTextEntry: viewState.isSecureTextEntry,
        onChangeSecure: function onChangeSecure() {
          setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isSecureTextEntry: !prevState.isSecureTextEntry
            });
          });
        },
        onSubmitEditing: function onSubmitEditing() {
          // @ts-expect-error TS(2532): Object is possibly 'undefined'.
          confirmPassRef.current.focus();
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
        }
      }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
        inputRef: confirmPassRef,
        title: 'Konfirmasi password',
        placeholder: 'Masukkan konfirmasi password',
        value: formState.confirmPass,
        error: errorFormState.errorComfirmPass,
        onChangeText: function onChangeText(value) {
          handleForm(value, 'confirmPass');
        },
        autoCapitalize: 'none',
        type: "password",
        returnKeyType: 'next',
        maxLength: 23,
        secureTextEntry: viewState.isSecureConfirmPassEntry,
        onChangeSecure: function onChangeSecure() {
          setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isSecureConfirmPassEntry: !prevState.isSecureConfirmPassEntry
            });
          });
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24)
        }
      }), formState.fullname.trim() === '' || formState.email.trim() === '' || formState.noHp.trim() === '' || formState.password.trim() === '' || formState.confirmPass.trim() === '' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.touchKirim, {
          backgroundColor: '#d3d6db'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textKirim
      }, "Lanjut")) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return handleNext();
        },
        style: [styles.touchKirim, {
          backgroundColor: '#5AAA0F'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textKirim
      }, "Lanjut")))))));
    };
    var AddressView = function AddressView() {
      var _formAddress$tower4;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          flex: 1
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.header
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchLupa,
        onPress: function onPress() {
          return navigation.goBack();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textLupa]
      }, "Login")), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[12]).allLogo.logo,
        style: [styles.logo]
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.center
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitle]
      }, "ALAMAT UNIT")), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.content
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewTextTitle
      }, /*#__PURE__*/_react.default.createElement(_CustomComboBox.default
      // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
      , {
        darkMode: viewState.darkMode,
        title: 'Cluster/Jalan',
        desc: '',
        textPlaceholder: 'Pilih cluster/jalan',
        value: (_formAddress$tower4 = formAddress.tower) == null ? undefined : _formAddress$tower4.name,
        arrayData: listAddress.arrTower,
        onSelected: function onSelected(item, index) {
          return handleSelectAddress(item, 'tower');
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
        }
      }), listAddress.arrFloors.length !== 0 && /*#__PURE__*/_react.default.createElement(_CustomComboBox.default
      // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
      , {
        darkMode: viewState.darkMode,
        editable: false,
        title: 'Blok',
        desc: '',
        textPlaceholder: 'Pilih blok',
        value: formAddress.lantai,
        arrayData: listAddress.arrFloors,
        onSelected: function onSelected(item, index) {
          return handleSelectAddress(item, 'lantai');
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
        }
      }), listAddress.arrUnits.length !== 0 && /*#__PURE__*/_react.default.createElement(_CustomComboBox.default
      // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
      , {
        darkMode: viewState.darkMode,
        editable: false,
        title: 'Unit',
        desc: '',
        textPlaceholder: 'Pilih unit',
        value: formAddress.unit,
        arrayData: listAddress.arrUnits,
        onSelected: function onSelected(item, index) {
          return handleSelectAddress(item, 'unit');
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.footerKetentuan
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isAgree: !viewState.isAgree
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: viewState.isAgree ? _$$_REQUIRE(_dependencyMap[12]).allLogo.icCheckboxChecked : _$$_REQUIRE(_dependencyMap[12]).allLogo.icCheckboxUnChecked,
        style: styles.icCheckbox
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textSyarat]
      }, "Saya setuju dengan", ' ', /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'medium',
        onPress: function onPress() {
          return NavigatorService.navigate('Agreement');
        },
        style: styles.textKetentuan
      }, "syarat & ketentuan"), '\n', "yang berlaku.")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.footerButton
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isRegister: true
            });
          });
        },
        style: [styles.touchKirim, {
          flex: 1,
          // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
          backgroundColor: viewState.darkMode ? '#121212' : 'white',
          borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(10),
          borderWidth: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1),
          borderColor: '#5AAA0F'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: 'semibold',
        style: [styles.textKirim, {
          color: '#5AAA0F'
        }]
      }, "Kembali")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(10)
        }
      }), formAddress.apartment === '' ||
      // @ts-expect-error TS(2367): This condition will always return 'false' since th... Remove this comment to see the full error message
      formAddress.tower === '' || formAddress.lantai === '' || formAddress.unit === '' || !viewState.isAgree ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.touchKirim, {
          flex: 1,
          backgroundColor: '#d3d6db'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textKirim
      }, "Daftar")) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return handleRegister();
        },
        style: [styles.touchKirim, {
          flex: 1,
          backgroundColor: '#5AAA0F'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textKirim
      }, "Daftar"))))))));
    };
    var SuccessModalView = function SuccessModalView() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        isVisible: viewState.isShowSuccessModal,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.modalBox
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[12]).allLogo.icSuccess,
        style: styles.icSuccess
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textTitleModal
      }, "REGISTER BERHASIL"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textDescModal
      }, "Akun anda telah berhasil dibuat"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowSuccessModal: false
            });
          });
          NavigatorService.reset('Login');
        },
        style: styles.touchKembaliKeLogin
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textKembaliKeLogin
      }, "Kembali ke login")))));
    };
    var FailModalView = function FailModalView() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        isVisible: viewState.isShowFailModal,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.modalBox
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[12]).allLogo.icGagal,
        style: styles.icGagal
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitleModal, {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
        }]
      }, "REGISTER GAGAL"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textDescModal, {
          width: '85%',
          textAlign: 'center'
        }]
      }, "Maaf, unit yang Anda daftarkan sudah terisi penuh. Silahkan hubungi pengelola untuk informasi lebih lanjut."), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return setViewState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowFailModal: false
            });
          });
        },
        style: styles.touchKembaliKeLogin
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textKembaliKeLogin
      }, "KEMBALI")))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar
    // @ts-expect-error TS(2551): Property 'darkMode' does not exist on type '{ isSh... Remove this comment to see the full error message
    , {
      barStyle: viewState.darkMode ? 'light-content' : 'dark-content',
      translucent: true,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: viewState.isLoading
    }), /*#__PURE__*/_react.default.createElement(SuccessModalView, null), /*#__PURE__*/_react.default.createElement(FailModalView, null), viewState.isRegister ? RegisterView() : AddressView());
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(28) : 0
    },
    systemBar: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(30),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20)
    },
    logo: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(120),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(120)
    },
    touchLupa: {
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(10),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(31),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(10),
      borderColor: '#5AAA0F',
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(42),
      color: '#5AAA0F'
    },
    textLupa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      color: '#5AAA0F'
    },
    touchKirim: {
      width: width * 0.82,
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(40),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKirim: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      color: 'white',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(0.7)
    },
    textLupaPassword: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(30),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      color: '#263238',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1)
    },
    content: {
      padding: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(32)
    },
    viewTextTitle: {
      width: width * 0.82
    },
    center: {
      alignItems: 'center'
    },
    textTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      color: '#263238',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1)
    },
    logoDone: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(150),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(66.5)
    },
    contentDone: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(60),
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(30)
    },
    successForget: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(200),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(185.9)
    },
    textMessage: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      //   fontFamily: 'Montserrat-Regular',
      color: '#263238',
      fontStyle: 'normal'
    },
    footerKetentuan: {
      flexDirection: 'row',
      paddingRight: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(8)
    },
    icCheckbox: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(20)
    },
    textSyarat: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(10),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12),
      //   fontFamily: 'Montserrat-Regular',
      color: '#273238'
    },
    textKetentuan: {
      //   fontFamily: 'Montserrat-SemiBold',
      color: '#5AAA0F'
    },
    footerButton: {
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(24)
    },
    bottomModal: {
      //justifyContent: "flex-end",
      //margin: 0,
    },
    viewRootModal: {
      width: 'auto',
      height: 'auto',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalBox: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(280),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(335),
      backgroundColor: '#FFFFFF',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4),
      alignItems: 'center'
    },
    textTitleModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(1),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(48)
    },
    textDescModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(12),
      color: '#263238',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(16)
    },
    icSuccess: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(80),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(32),
      tintColor: '#5AAA0F'
    },
    icGagal: {
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(80),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(32)
    },
    touchKembaliKeLogin: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(40),
      width: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(200),
      height: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKembaliKeLogin: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(14),
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[13]).toDp)(0.2)
    }
  });
  var _default = exports.default = RegisterScreen;
