  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _classCallCheck2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _createClass2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _possibleConstructorReturn2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _getPrototypeOf2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _inherits2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _CustomComboBox = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _CustomTextInput = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[11]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[12]);
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[14]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2.default)(o), (0, _possibleConstructorReturn2.default)(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2.default)(t).constructor) : o.apply(t, e)); }
  function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var SetUnit = exports.default = /*#__PURE__*/function (_Component) {
    function SetUnit(props) {
      var _this;
      (0, _classCallCheck2.default)(this, SetUnit);
      _this = _callSuper(this, SetUnit, [props]);
      _this.testDataDefault = function () {
        _this.setState({
          fullname: 'Zaini Jamathsani',
          email: 'dleader.zaii@gmail.com',
          noHp: '085694084870',
          password: '123456',
          confirmPassword: '123456'
        });
      };
      _this.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      };
      _this.lanjut = function () {
        // @ts-expect-error TS(2339): Property 'email' does not exist on type 'Readonly<... Remove this comment to see the full error message
        if (!_this.validateEmail(_this.state.email)) {
          _this.setState({
            errorEmail: 'Format email salah.'
          });
          _this.email.focus();
          // @ts-expect-error TS(2339): Property 'password' does not exist on type 'Readon... Remove this comment to see the full error message
        } else if (_this.state.password.length < 6) {
          _this.setState({
            errorPassword: 'Password minimal 6 karakter.'
          });
          _this.password.focus();
          // @ts-expect-error TS(2339): Property 'password' does not exist on type 'Readon... Remove this comment to see the full error message
        } else if (_this.state.password !== _this.state.confirmPassword) {
          _this.setState({
            errorConfirmPassword: 'Password baru yang dimasukkan tidak sesuai.'
          });
          _this.confirmPassword.focus();
        } else {
          _this.setState({
            content: 'alamat'
          });
        }
      };
      _this.kembali = function () {
        _this.setState({
          content: 'register'
        });
      };
      _this.setUnit = function () {
        var data = {
          // @ts-expect-error TS(2339): Property 'unitId' does not exist on type 'Readonly... Remove this comment to see the full error message
          unit_id: _this.state.unitId
        };
        _this.setState({
          loading: true
        }, function () {
          (0, _$$_REQUIRE(_dependencyMap[15]).putUserSetUnit)(data).then(function (response) {
            _reactNative.AsyncStorage.removeItem('token');
            _this.setState({
              loading: false,
              successModal: true
            });
          }).catch(function (error) {
            if (error.data.name === 'UserLimitReachedError') {
              _this.setState({
                loading: false,
                gagalModal: true
              });
            } else {
              _this.setState({
                loading: false
              });
            }
          });
        });
      };
      _this.modalSuccess = function () {
        return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
          animationIn: 'fadeIn',
          animationOut: 'fadeOut'
          // @ts-expect-error TS(2339): Property 'successModal' does not exist on type 'Re... Remove this comment to see the full error message
          ,
          isVisible: _this.state.successModal,
          style: styles.bottomModal
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewRootModal
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [styles.modalBox,
          // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
          {
            backgroundColor: _this.state.darkMode ? '#121212' : 'white'
          }]
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          allowFontScaling: false
          // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
          ,
          style: [styles.textTitleModal, {
            color: _this.state.darkMode ? 'white' : '#263238'
          }]
        }, "SET UNIT BERHASIL"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          allowFontScaling: false
          // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
          ,
          style: [styles.textDescModal, {
            color: _this.state.darkMode ? 'white' : '#263238'
          }]
        }, "Akun anda telah berhasil set unit, admin kami akan memverifikasi akun Anda dalam waktu maksimal tiga hari kerja"), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icSuccess,
          style: styles.icSuccess
        }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          onPress: function onPress() {
            _this.setState({
              successModal: false
            }, function () {
              NavigatorService.reset('Login');
            });
          },
          style: styles.touchKembaliKeLogin
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          allowFontScaling: false,
          style: styles.textKembaliKeLogin
        }, "KEMBALI KE LOGIN")))));
      };
      _this.modalGagal = function () {
        return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
          animationIn: 'fadeIn',
          animationOut: 'fadeOut'
          // @ts-expect-error TS(2339): Property 'gagalModal' does not exist on type 'Read... Remove this comment to see the full error message
          ,
          isVisible: _this.state.gagalModal,
          style: styles.bottomModal
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewRootModal
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [styles.modalBox,
          // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
          {
            backgroundColor: _this.state.darkMode ? '#121212' : 'white'
          }]
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icGagal,
          style: styles.icGagal
        }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          allowFontScaling: false,
          style: [styles.textTitleModal,
          // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
          {
            marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
            color: _this.state.darkMode ? 'white' : '#263238'
          }]
        }, "SET UNIT GAGAL"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          allowFontScaling: false,
          style: [styles.textDescModal, {
            width: '85%',
            textAlign: 'center',
            // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
            color: _this.state.darkMode ? 'white' : '#263238'
          }]
        }, "Maaf, unit yang Anda daftarkan sudah terisi penuh. Silahkan hubungi pengelola untuk informasi lebih lanjut."), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          onPress: function onPress() {
            _this.setState({
              touch: true,
              gagalModal: false
            });
          },
          style: styles.touchKembaliKeLogin
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          allowFontScaling: false,
          style: styles.textKembaliKeLogin
        }, "KEMBALI")))));
      };
      _this.renderRegister = function () {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            flex: 1
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
          behavior: 'padding',
          enabled: _reactNative.Platform.OS === 'ios' ? true : false
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.header
        }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.touchLupa
          // @ts-expect-error TS(2339): Property 'navigation' does not exist on type 'Read... Remove this comment to see the full error message
          ,
          onPress: function onPress() {
            return _this.props.navigation.goBack();
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          allowFontScaling: false
          // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
          ,
          style: [styles.textLupa, {
            color: _this.state.darkMode && 'white'
          }]
        }, "LOGIN")), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[16]).allLogo.logo
          // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
          ,
          style: [styles.logo, {
            tintColor: _this.state.darkMode && 'white'
          }]
        })), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          allowFontScaling: false
          // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
          ,
          style: [styles.textLupaPassword, {
            color: _this.state.darkMode && 'white'
          }]
        }, "REGISTER"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.content
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewTextTitle
        }, /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
          inputRef: function inputRef(ref) {
            return _this.fullname = ref;
          },
          title: 'Nama Lengkap',
          placeholder: 'Masukan nama lengkap (sesuai KTP)'
          // @ts-expect-error TS(2339): Property 'errorFullname' does not exist on type 'R... Remove this comment to see the full error message
          ,
          error: _this.state.errorFullname
          // @ts-expect-error TS(2339): Property 'fullname' does not exist on type 'Readon... Remove this comment to see the full error message
          ,
          value: _this.state.fullname,
          onChangeText: function onChangeText(fullname) {
            _this.setState({
              fullname: fullname
            }, function () {
              if (fullname.trim() === '') {
                _this.setState({
                  errorFullname: 'Field ini tidak boleh kosong.'
                });
              } else {
                _this.setState({
                  errorFullname: ''
                });
              }
            });
          },
          onSubmitEditing: function onSubmitEditing() {
            return _this.email.focus();
          }
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
          }
        }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
          inputRef: function inputRef(ref) {
            return _this.email = ref;
          },
          title: 'Email',
          placeholder: 'Masukkan alamat email'
          // @ts-expect-error TS(2339): Property 'errorEmail' does not exist on type 'Read... Remove this comment to see the full error message
          ,
          error: _this.state.errorEmail
          // @ts-expect-error TS(2339): Property 'email' does not exist on type 'Readonly<... Remove this comment to see the full error message
          ,
          value: _this.state.email,
          onChangeText: function onChangeText(email) {
            _this.setState({
              email: email
            }, function () {
              if (email.trim() === '') {
                _this.setState({
                  errorEmail: 'Field ini tidak boleh kosong.'
                });
              } else {
                _this.setState({
                  errorEmail: ''
                });
              }
            });
          },
          keyboardType: 'email-address',
          onSubmitEditing: function onSubmitEditing() {
            return _this.noHp.focus();
          }
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
          }
        }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
          inputRef: function inputRef(ref) {
            return _this.noHp = ref;
          },
          title: 'No handphone',
          placeholder: 'Masukkan no handphone'
          // @ts-expect-error TS(2339): Property 'errorNoHp' does not exist on type 'Reado... Remove this comment to see the full error message
          ,
          error: _this.state.errorNoHp
          // @ts-expect-error TS(2339): Property 'noHp' does not exist on type 'Readonly<{... Remove this comment to see the full error message
          ,
          value: _this.state.noHp,
          onChangeText: function onChangeText(noHp) {
            _this.setState({
              noHp: noHp.replace(/[^0-9]/g, '')
            }, function () {
              if (noHp.trim() === '') {
                _this.setState({
                  errorNoHp: 'Field ini tidak boleh kosong.'
                });
              } else {
                _this.setState({
                  errorNoHp: ''
                });
              }
            });
          },
          maxLength: 13,
          keyboardType: 'phone-pad',
          onSubmitEditing: function onSubmitEditing() {
            return _this.password.focus();
          }
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
          }
        }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
          inputRef: function inputRef(ref) {
            return _this.password = ref;
          },
          title: 'Password',
          placeholder: 'Masukkan password'
          // @ts-expect-error TS(2339): Property 'password' does not exist on type 'Readon... Remove this comment to see the full error message
          ,
          value: _this.state.password
          // @ts-expect-error TS(2339): Property 'errorPassword' does not exist on type 'R... Remove this comment to see the full error message
          ,
          error: _this.state.errorPassword,
          onChangeText: function onChangeText(password) {
            return _this.setState({
              password: password
            });
          },
          autoCapitalize: 'none',
          type: "password",
          returnKeyType: 'next',
          maxLength: 23
          // @ts-expect-error TS(2339): Property 'secureTextEntry' does not exist on type ... Remove this comment to see the full error message
          ,
          secureTextEntry: _this.state.secureTextEntry
          // @ts-expect-error TS(17001): JSX elements cannot have multiple attributes with ... Remove this comment to see the full error message
          ,
          onChangeText: function onChangeText(password) {
            _this.setState({
              password: password
            }, function () {
              if (password.trim() === '') {
                _this.setState({
                  errorPassword: 'Field ini tidak boleh kosong.'
                });
              } else {
                _this.setState({
                  errorPassword: ''
                });
              }
            });
          },
          onChangeSecure: function onChangeSecure() {
            // @ts-expect-error TS(2339): Property 'secureTextEntry' does not exist on type ... Remove this comment to see the full error message
            _this.setState({
              secureTextEntry: !_this.state.secureTextEntry
            });
          },
          onSubmitEditing: function onSubmitEditing() {
            return _this.confirmPassword.focus();
          }
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
          }
        }), /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
          inputRef: function inputRef(ref) {
            return _this.confirmPassword = ref;
          },
          title: 'Konfirmasi password',
          placeholder: 'Masukkan konfirmasi password'
          // @ts-expect-error TS(2339): Property 'confirmPassword' does not exist on type ... Remove this comment to see the full error message
          ,
          value: _this.state.confirmPassword
          // @ts-expect-error TS(2339): Property 'errorConfirmPassword' does not exist on ... Remove this comment to see the full error message
          ,
          error: _this.state.errorConfirmPassword,
          onChangeText: function onChangeText(confirmPassword) {
            return _this.setState({
              confirmPassword: confirmPassword
            });
          },
          autoCapitalize: 'none',
          type: "password",
          returnKeyType: 'next',
          maxLength: 23
          // @ts-expect-error TS(2339): Property 'secureConfirmTextEntry' does not exist o... Remove this comment to see the full error message
          ,
          secureTextEntry: _this.state.secureConfirmTextEntry
          // @ts-expect-error TS(17001): JSX elements cannot have multiple attributes with ... Remove this comment to see the full error message
          ,
          onChangeText: function onChangeText(confirmPassword) {
            _this.setState({
              confirmPassword: confirmPassword
            }, function () {
              if (confirmPassword.trim() === '') {
                _this.setState({
                  errorConfirmPassword: 'Field ini tidak boleh kosong.'
                });
              } else {
                _this.setState({
                  errorConfirmPassword: ''
                });
              }
            });
          },
          onChangeSecure: function onChangeSecure() {
            // @ts-expect-error TS(2339): Property 'secureConfirmTextEntry' does not exist o... Remove this comment to see the full error message
            _this.setState({
              secureConfirmTextEntry: !_this.state.secureConfirmTextEntry
            });
          }
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24)
          }
        }), "// @ts-expect-error TS(2339): Property 'fullname' does not exist on type 'Readon... Remove this comment to see the full error message", _this.state.fullname.trim() === '' ||
        // @ts-expect-error TS(2339): Property 'email' does not exist on type 'Readonly<... Remove this comment to see the full error message
        _this.state.email.trim() === '' ||
        // @ts-expect-error TS(2339): Property 'noHp' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        _this.state.noHp.trim() === '' ||
        // @ts-expect-error TS(2339): Property 'password' does not exist on type 'Readon... Remove this comment to see the full error message
        _this.state.password.trim() === '' ||
        // @ts-expect-error TS(2339): Property 'confirmPassword' does not exist on type ... Remove this comment to see the full error message
        _this.state.confirmPassword.trim() === '' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [styles.touchKirim, {
            backgroundColor: '#d3d6db'
          }]
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          allowFontScaling: false,
          style: styles.textKirim
        }, "LANJUT")) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          onPress: function onPress() {
            return _this.lanjut();
          },
          style: [styles.touchKirim, {
            backgroundColor: '#917438'
          }]
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          allowFontScaling: false,
          style: styles.textKirim
        }, "LANJUT")))))));
      };
      _this.renderTinggal = function () {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            flex: 1,
            alignItems: 'center'
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[16]).allLogo.logo,
          style: styles.logoDone
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.contentDone
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[16]).allLogo.successForget,
          style: styles.successForget
        }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          allowFontScaling: false,
          style: styles.textMessage
        }, "// @ts-expect-error TS(2339): Property 'message' does not exist on type 'Readonl... Remove this comment to see the full error message", _this.state.message)), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity
        // @ts-expect-error TS(2339): Property 'navigation' does not exist on type 'Read... Remove this comment to see the full error message
        , {
          onPress: function onPress() {
            return _this.props.navigation.goBack();
          },
          style: [styles.touchKirim, {
            backgroundColor: '#917438'
          }]
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
          allowFontScaling: false,
          style: styles.textKirim
        }, "KEMBALI KE HALAMAN LOGIN")));
      };
      _this.renderAlamat = function () {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            flex: 1
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.header
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.touchLupa
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          allowFontScaling: false
          // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
          ,
          style: [styles.textLupa, {
            color: _this.state.darkMode && 'white'
          }]
        }, "Set Unit")), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[16]).allLogo.logo
          // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
          ,
          style: [styles.logo, {
            tintColor: _this.state.darkMode && 'white'
          }]
        })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.center
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          allowFontScaling: false
          // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
          ,
          style: [styles.textTitle, {
            color: _this.state.darkMode && 'white'
          }]
        }, "ALAMAT PERUMAHAN")), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.content
        }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewTextTitle
        }, "// @ts-expect-error TS(2339): Property 'arrTower' does not exist on type 'Readon... Remove this comment to see the full error message", _this.state.arrTower.length !== 0 && /*#__PURE__*/_react.default.createElement(_CustomComboBox.default
        // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
        , {
          darkMode: _this.state.darkMode,
          title: 'Cluster/Jalan',
          desc: '',
          textPlaceholder: 'Pilih cluster/jalan'
          // @ts-expect-error TS(2339): Property 'tower' does not exist on type 'Readonly<... Remove this comment to see the full error message
          ,
          value: _this.state.tower.name || ''
          // @ts-expect-error TS(2339): Property 'arrTower' does not exist on type 'Readon... Remove this comment to see the full error message
          ,
          arrayData: _this.state.arrTower,
          onSelected: function onSelected(item, index) {
            _this.setState({
              arrFloors: [],
              tower: item
            }, function () {
              (0, _$$_REQUIRE(_dependencyMap[15]).getUnitsFloors)('?cluster_id=' + item.id).then(function (response) {
                var arrFloors = [];
                for (var i = 0; i < response.data.units.length; i++) {
                  arrFloors.push(response.data.units[i].block);
                }
                _this.setState({
                  arrFloors: arrFloors,
                  arrUnits: [],
                  lantai: '',
                  unit: ''
                });
              }).catch(function (error) {});
            });
          }
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
          }
        }), "// @ts-expect-error TS(2339): Property 'arrFloors' does not exist on type 'Reado... Remove this comment to see the full error message", _this.state.arrFloors.length !== 0 && /*#__PURE__*/_react.default.createElement(_CustomComboBox.default
        // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
        , {
          darkMode: _this.state.darkMode,
          editable: false,
          title: 'Blok',
          desc: '',
          textPlaceholder: 'Pilih blok'
          // @ts-expect-error TS(2339): Property 'lantai' does not exist on type 'Readonly... Remove this comment to see the full error message
          ,
          value: _this.state.lantai
          // @ts-expect-error TS(2339): Property 'arrFloors' does not exist on type 'Reado... Remove this comment to see the full error message
          ,
          arrayData: _this.state.arrFloors,
          onSelected: function onSelected(item, index) {
            _this.setState({
              arrUnits: [],
              arrIdUnits: [],
              lantai: item
            }, function () {
              // @ts-expect-error TS(2339): Property 'tower' does not exist on type 'Readonly<... Remove this comment to see the full error message
              (0, _$$_REQUIRE(_dependencyMap[15]).getUnits)('?cluster_id=' + _this.state.tower.id + '&block=' + item).then(function (response) {
                var arrUnits = [];
                var arrIdUnits = [];
                for (var i = 0; i < response.data.units.length; i++) {
                  arrIdUnits.push(response.data.units[i]);
                  arrUnits.push(response.data.units[i].unit_name);
                }
                _this.setState({
                  arrIdUnits: arrIdUnits,
                  arrUnits: arrUnits,
                  unit: ''
                });
              }).catch(function (error) {});
            });
          }
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
          }
        }), "// @ts-expect-error TS(2339): Property 'arrUnits' does not exist on type 'Readon... Remove this comment to see the full error message", _this.state.arrUnits.length !== 0 && /*#__PURE__*/_react.default.createElement(_CustomComboBox.default
        // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
        , {
          darkMode: _this.state.darkMode,
          editable: false,
          title: 'Unit',
          desc: '',
          textPlaceholder: 'Pilih unit'
          // @ts-expect-error TS(2339): Property 'unit' does not exist on type 'Readonly<{... Remove this comment to see the full error message
          ,
          value: _this.state.unit
          // @ts-expect-error TS(2339): Property 'arrUnits' does not exist on type 'Readon... Remove this comment to see the full error message
          ,
          arrayData: _this.state.arrUnits,
          onSelected: function onSelected(item, index) {
            var unitId = '';
            // @ts-expect-error TS(2339): Property 'arrIdUnits' does not exist on type 'Read... Remove this comment to see the full error message
            for (var i = 0; i < _this.state.arrIdUnits.length; i++) {
              // @ts-expect-error TS(2339): Property 'arrIdUnits' does not exist on type 'Read... Remove this comment to see the full error message
              if (_this.state.arrIdUnits[i].unit_name === item) {
                // @ts-expect-error TS(2339): Property 'arrIdUnits' does not exist on type 'Read... Remove this comment to see the full error message
                unitId = _this.state.arrIdUnits[i].id;
              }
            }
            _this.setState({
              unitId: unitId,
              unit: item
            });
          }
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
          }
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.footerButton
        }, "// @ts-expect-error TS(2339): Property 'apartment' does not exist on type 'Reado... Remove this comment to see the full error message", _this.state.apartment === '' ||
        // @ts-expect-error TS(2339): Property 'tower' does not exist on type 'Readonly<... Remove this comment to see the full error message
        _this.state.tower === '' ||
        // @ts-expect-error TS(2339): Property 'lantai' does not exist on type 'Readonly... Remove this comment to see the full error message
        _this.state.lantai === '' ||
        // @ts-expect-error TS(2339): Property 'unit' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        _this.state.unit === '' ?
        /*#__PURE__*/
        //|| !this.state.syarat
        _react.default.createElement(_reactNative.View, {
          style: [styles.touchKirim, {
            flex: 1,
            backgroundColor: '#d3d6db'
          }]
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          allowFontScaling: false,
          style: styles.textKirim
        }, "SET UNIT")) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          onPress: function onPress() {
            return _this.setUnit();
          },
          style: [styles.touchKirim, {
            flex: 1,
            backgroundColor: '#5AAA0F'
          }]
        }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          textType: "semibold",
          allowFontScaling: false,
          style: styles.textKirim
        }, "SET UNIT"))))))));
      };
      _this.state = {
        loading: false,
        fullname: '',
        errorFullname: '',
        email: '',
        errorEmail: '',
        noHp: '',
        errorNoHp: '',
        password: '',
        errorPassword: '',
        confirmPassword: '',
        errorConfirmPassword: '',
        backgroundColor: '#d3d6db',
        message: 'Email Berhasil Terkirim!',
        content: 'alamat',
        // register / tinggal / alamat,
        secureTextEntry: true,
        secureConfirmTextEntry: true,
        apartment: 'Suvarna',
        tower: {
          id: '',
          name: ''
        },
        lantai: '',
        unit: '',
        unitId: '',
        syarat: false,
        arrTower: [],
        arrFloors: [],
        arrUnits: [],
        arrIdUnits: [],
        successModal: false,
        gagalModal: false,
        darkMode: false,
        touch: true
      };
      return _this;
    }
    (0, _inherits2.default)(SetUnit, _Component);
    return (0, _createClass2.default)(SetUnit, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        var _this2 = this;
        (0, _$$_REQUIRE(_dependencyMap[15]).getUnitsTower)('').then(function (response) {
          var arrTower = [];
          for (var i = 0; i < response.data.length; i++) {
            arrTower.push({
              id: response.data[i].id,
              name: response.data[i].name
            });
          }
          _this2.setState({
            arrTower: arrTower
          });
        }).catch(function (error) {
          // @ts-expect-error TS(2552): Cannot find name 'alert'. Did you mean 'Alert'?
          alert(error);
        });
      }
    }, {
      key: "componentDidMount",
      value: function () {
        var _componentDidMount = (0, _asyncToGenerator2.default)(function* () {
          console.disableYellowBox = function () {};
          var darkMode = yield _reactNative.AsyncStorage.getItem('darkMode');
          this.setState({
            darkMode: JSON.parse(darkMode)
          }, function () {
            //this.testDataDefault()
          });
        });
        function componentDidMount() {
          return _componentDidMount.apply(this, arguments);
        }
        return componentDidMount;
      }()
    }, {
      key: "render",
      value: function render() {
        return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView
        // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
        , {
          style: [styles.container, {
            backgroundColor: this.state.darkMode ? '#121212' : 'white'
          }]
        }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar
        // @ts-expect-error TS(2339): Property 'darkMode' does not exist on type 'Readon... Remove this comment to see the full error message
        , {
          barStyle: this.state.darkMode ? 'light-content' : 'dark-content',
          translucent: true,
          backgroundColor: 'transparent'
        }), "// @ts-expect-error TS(2339): Property 'loading' does not exist on type 'Readonl... Remove this comment to see the full error message", /*#__PURE__*/_react.default.createElement(_Loader.default, {
          loading: this.state.loading
        }), this.modalSuccess(), this.modalGagal(), "// @ts-expect-error TS(2339): Property 'content' does not exist on type 'Readonl... Remove this comment to see the full error message", this.state.content === 'register' ? this.renderRegister() :
        // @ts-expect-error TS(2339): Property 'content' does not exist on type 'Readonl... Remove this comment to see the full error message
        this.state.content === 'tinggal' ? this.renderTinggal() : this.renderAlamat());
      }
    }]);
  }(_react.Component);
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(28) : 0
    },
    systemBar: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      backgroundColor: '#917438'
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(30)
      //marginTop: toDp(20),
      //backgroundColor: 'cyan'
    },
    logo: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(120),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(120)
    },
    touchLupa: {
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4)
    },
    textLupa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      color: '#917438',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0.7)
    },
    touchKirim: {
      width: width * 0.82,
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(40),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKirim: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      color: 'white',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0.7)
    },
    textLupaPassword: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(30),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(72),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      //fontFamily: 'Montserrat-Bold',
      color: '#263238',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(2)
    },
    content: {
      padding: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(32)
      //marginTop: toDp(40)
    },
    viewTextTitle: {
      width: width * 0.82
    },
    center: {
      alignItems: 'center'
    },
    textTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      //fontFamily: 'Montserrat-Bold',
      color: '#263238',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(2)
    },
    logoDone: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(150),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(66.5)
    },
    contentDone: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(60),
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(30)
    },
    successForget: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(200),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(185.9)
    },
    textMessage: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      color: '#263238',
      fontStyle: 'normal'
    },
    footerKetentuan: {
      flexDirection: 'row',
      paddingRight: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(8)
    },
    icCheckbox: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20)
    },
    textSyarat: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#273238'
    },
    textKetentuan: {
      //fontFamily: 'Montserrat-SemiBold',
      color: '#917438'
    },
    footerButton: {
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24)
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
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(280),
      //height: toDp(340),
      height: 'auto',
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24),
      backgroundColor: '#FFFFFF',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4),
      alignItems: 'center'
    },
    textTitleModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      //fontFamily: 'Montserrat-Bold',
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(2),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24)
    },
    textDescModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#263238',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      textAlign: 'center',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
    },
    icSuccess: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(80),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(32)
    },
    icGagal: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(80),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(32)
    },
    touchKembaliKeLogin: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(40),
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(228),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKembaliKeLogin: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0.7)
    }
  });
