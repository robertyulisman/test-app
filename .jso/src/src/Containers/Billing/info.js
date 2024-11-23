  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _clipboard = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _CustomImageView = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _CustomTextInput = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _NoConnection = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _reactNativeImageCropPicker = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _reactNativeImageViewing = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width;
  var billingType = [
  // {
  //   _id: '1abaf505-6785-5d40-a92b-2292b0253e78',
  //   type: 'PARTIAL',
  //   label: 'Cicilan',
  //   title: 'Cicilan',
  // },
  {
    _id: '94ddc504-30c2-55b4-b47e-57a6bf506fed',
    type: 'CASH',
    label: 'Lunas',
    title: 'Bayar Penuh'
  }, {
    _id: 'b8a8beca-23f7-5a1d-a34d-21a21ff95c6f',
    type: 'CASH_ADVANCES',
    label: 'Cash Advance',
    title: 'Cash Advance'
  }];
  function formatRpToNumber(input) {
    return input.replace(/Rp\s*(\d+(?:\.\d{3})*)/g, function (_, match) {
      return match.replace(/\./g, '');
    });
  }
  var InfoBillingScreen = function InfoBillingScreen(props) {
    var nominalTransfer = formatRpToNumber(props.route.params.nominal);
    var dataBilling = props.route.params.dataBilling;
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[14]).useNetInfo)();
    var _useState = (0, _react.useState)({
        isImageViewVisible: false,
        arrayMenu: '',
        imageUrl: '',
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
        modalSuccess: false,
        isCheck: false,
        nominal: ''
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    var _React$useState = _react.default.useState(null),
      _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
      billingTypeSelected = _React$useState2[0],
      setBillingTypeSelected = _React$useState2[1];
    var convert = function convert(angka) {
      var rupiah = '';
      var angkarev = angka.toString().split('').reverse().join('');
      for (var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
      return rupiah.split('', rupiah.length - 1).reverse().join('');
    };
    var processUpload = function processUpload(response) {
      if (response.didCancel) {} else {
        var postData = new FormData();
        postData.append('file', {
          uri: response.path,
          type: 'image/jpg',
          name: 'buktibayar.jpg'
        });
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: true
          });
        });
        (0, _$$_REQUIRE(_dependencyMap[15]).postUpload)(postData).then(function (response) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              modalVisible: false,
              imageUrl: response.data.image_urls[0]
            });
          });
        }).catch(function (error) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              modalVisible: false,
              imageUrl: ''
            });
          });
          _reactNative.Alert.alert('' + error.status, '' + error.data);
        });
      }
    };
    var camera = function camera() {
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
      }, "Ambil Foto"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSilang,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icSilang,
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
        source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icModalCamera,
        style: styles.icModalGallery
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textModal, {
          color: state.darkMode ? 'white' : 'black'
        }]
      }, 'Camera')), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchChatCocierge,
        onPress: function onPress() {
          return gallery();
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
          color: state.darkMode ? 'white' : 'black'
        }]
      }, 'Gallery'))))));
    };
    var renderContent = function renderContent() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.content
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textInfoTransfer
      }, 'INFO TRANSFER'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textSilahkan
      }, 'Silakan transfer ke rekening'), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowContent
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewImage
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: props.route.params.bank.bank.image_url
        },
        style: styles.imgBank
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textBank
      }, props.route.params.bank.bank.name), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textBank
      }, props.route.params.bank.account_owner))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginTop: 22
        }
      }, billingType.map(function (item) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          key: item._id,
          style: styles.viewCheck,
          onPress: function onPress() {
            setBillingTypeSelected(item);
            if (item.type === 'CASH_ADVANCES' || item.type === 'PARTIAL') {
              setState(Object.assign(Object.assign({}, state), {}, {
                nominal: ''
              }));
            } else {
              setState(Object.assign(Object.assign({}, state), {}, {
                nominal: nominalTransfer
              }));
            }
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: (billingTypeSelected == null ? undefined : billingTypeSelected._id) !== item._id ? _$$_REQUIRE(_dependencyMap[16]).allLogo.icCheck : _$$_REQUIRE(_dependencyMap[16]).allLogo.icCheckActive,
          style: styles.icCheck
        }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
          style: styles.textBayar
        }, item.title));
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textNomor
      }, 'Nomor rekening'), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNomor
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: styles.textValueNomor
      }, props.route.params.bank.account_number), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSalin,
        onPress: function onPress() {
          _clipboard.default.setString(props.route.params.bank.account_number);
          if (_reactNative.Platform.OS === 'android') {
            _reactNative.ToastAndroid.show('Copy', _reactNative.ToastAndroid.SHORT);
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textSalin
      }, 'Salin'))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textNomor
      }, 'Nominal transfer'), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNomor
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: styles.textValueNomor
      }, props.route.params.nominal), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSalin,
        onPress: function onPress() {
          _clipboard.default.setString('' + props.route.params.totalPrice);
          if (_reactNative.Platform.OS === 'android') {
            _reactNative.ToastAndroid.show('Copy', _reactNative.ToastAndroid.SHORT);
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textSalin
      }, 'Salin'))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textPastikan
      }, '* Pastikan jumlah yang anda transfer benar'), billingTypeSelected !== null && ((billingTypeSelected == null ? undefined : billingTypeSelected.type) === 'PARTIAL' || (billingTypeSelected == null ? undefined : billingTypeSelected.type) === 'CASH_ADVANCES') && /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textNomor
      }, "Nominal " + (billingTypeSelected == null ? undefined : billingTypeSelected.label)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewNomor, {
          justifyContent: 'flex-start',
          backgroundColor: 'white',
          borderWidth: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(1),
          borderColor: '#5AAA0F'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: [styles.textValueNomor, {
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(32)
        }]
      }, 'Rp '), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(200),
          height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(50)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomTextInput.default, {
        style: styles.textNominal,
        rootStyles: styles.rootStyles,
        title: '',
        placeholder: '',
        error: '',
        value: convert(state.nominal.replace(/[,.]/g, '')),
        onChangeText: function onChangeText(value) {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              nominal: value.replace(/[,.]/g, '')
            });
          });
        },
        keyboardType: 'phone-pad',
        maxLength: 10
      }))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textPastikan
      }, "* Masukkan jumlah pembayaran sebagai " + (billingTypeSelected == null ? undefined : billingTypeSelected.label) + " ")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.batas
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textInfoTransfer
      }, 'KONFIRMASI PEMBAYARAN'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textJika
      }, 'Jika sudah melakukan transfer, mohon upload bukti transfer untuk proses verifikasi.'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textUpload
      }, 'Upload bukti transfer'), state.imageUrl === '' ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchUpload,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: true
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icCameraPlus,
        style: styles.icCameraPlus
      })) : _reactNative.Platform.OS === 'ios' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(5)
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isImageViewVisible: true
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: state.imageUrl
        },
        style: [styles.imgUrl, {
          marginTop: 0
        }]
      })), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              imageUrl: ''
            });
          });
        },
        style: styles.touchPhoto
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icRemovePhoto,
        style: styles.icRemovePhoto
      }))) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(5)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomImageView.default, {
        style: [styles.imgUrl, {
          marginTop: 0
        }],
        uri: state.imageUrl
      }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              imageUrl: ''
            });
          });
        },
        style: styles.touchPhoto
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icRemovePhoto,
        style: styles.icRemovePhoto
      }))), _reactNative.Platform.OS === 'ios' && /*#__PURE__*/_react.default.createElement(_reactNativeImageViewing.default, {
        images: [{
          uri: state.imageUrl
        }],
        animationType: 'fade',
        imageIndex: 0,
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
    var renderModalSuccess = function renderModalSuccess() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        isVisible: state.modalSuccess
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: 'auto',
          height: 'auto',
          justifyContent: 'center',
          alignItems: 'center'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: 'auto',
          paddingBottom: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(280),
          backgroundColor: '#FFFFFF',
          borderRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4),
          alignItems: 'center'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[16]).allLogo.icSuccess,
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(80),
          height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(80),
          marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(32),
          tintColor: '#5AAA0F'
        }
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(25),
          fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
          color: '#263238'
        }
      }, "BUKTI TRANSFER TERKIRIM"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10),
          fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
          color: '#263238',
          textAlign: 'center',
          marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20)
        }
      }, "Terima kasih telah melakukan pembayaran tagihan, kami akan memverifikasi pembayaran tagihan Anda. maksimal Proses Verifikasi Maksimal 3 x 24 Jam."), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              modalSuccess: false
            });
          });
          props.route.params.loadPaidUnpaid();
          props.route.params.loadDetails(props.route.params.id);
          props.navigation.goBack();
        },
        style: styles.touchKembaliKeLogin
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textKembaliKeLogin
      }, "OK")))));
    };
    var prosesBilling = function prosesBilling() {
      // setState((state) => ({ ...state, loading: true }));

      var data = {
        image_url: state.imageUrl,
        note: 'Bank: ' + props.route.params.bank.bank.name + '\nNominal: ' + parseInt(state.nominal),
        payment: parseInt(state.nominal),
        messages: "Pembayaran telah di unggah oleh Penghuni dengan jenis Pembayaran " + (billingTypeSelected == null ? undefined : billingTypeSelected.title),
        // is_partial_payment: state.isCheck,
        payment_type: billingTypeSelected == null ? undefined : billingTypeSelected.type,
        ids: dataBilling.map(function (i) {
          return i.id;
        })
      };
      (0, _$$_REQUIRE(_dependencyMap[15]).postBillingProcess)(data).then(function (response) {
        // console.log('response', response);
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false,
            modalSuccess: true,
            nominal: ''
          });
        });
        setBillingTypeSelected(null);
      }).catch(function (err) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false,
            nominal: ''
          });
        });
        setBillingTypeSelected(null);
      });
    };
    var kirimBuktiTransfer = function kirimBuktiTransfer() {
      if (!validationPayment()) {
        if (billingTypeSelected.type === 'PARTIAL' && parseInt(state.nominal) >= parseInt(nominalTransfer)) {
          return _reactNative.Alert.alert('Informasi', 'Nominal Cicilan harus lebih kecil dari Nominal transfer', [{
            text: 'OK',
            onPress: function onPress() {
              return setState(function (state) {
                return Object.assign(Object.assign({}, state), {}, {
                  loading: false
                });
              });
            }
          }]);
        }
        if (billingTypeSelected.type === 'CASH_ADVANCES' && parseInt(state.nominal) <= parseInt(nominalTransfer)) {
          return _reactNative.Alert.alert('Informasi', 'Nominal Cash Advance harus lebih Besar dari Nominal transfer', [{
            text: 'OK',
            onPress: function onPress() {
              return setState(function (state) {
                return Object.assign(Object.assign({}, state), {}, {
                  loading: false
                });
              });
            }
          }]);
        }
        prosesBilling();
      }
    };
    var validationPayment = function validationPayment() {
      if (state.imageUrl === '') return true;
      if (billingTypeSelected === null) return true;
      if (billingTypeSelected.type === 'PARTIAL' && state.nominal === '') return true;
      if (billingTypeSelected.type === 'CASH_ADVANCES' && state.nominal === '') return true;
      return false;
    };
    var renderFooter = function renderFooter() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewFooter
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        disabled: validationPayment(),
        style: [styles.touchFooter, {
          backgroundColor: validationPayment() ? '#CCCFC9' : '#5AAA0F'
        }],
        onPress: function onPress() {
          return kirimBuktiTransfer();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textFooter
      }, 'Kirim Bukti Transfer')));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Info Bayar',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.loading
    }), renderModal(), renderModalSuccess(), !netInfo.isConnected ? /*#__PURE__*/_react.default.createElement(_NoConnection.default, null) : renderContent(), netInfo.isConnected && renderFooter());
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    content: {
      flex: 1,
      padding: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20)
    },
    viewRowContent: {
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(5),
      alignItems: 'center'
    },
    viewImage: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(60),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(60),
      backgroundColor: '#F6F7F4',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textInfoTransfer: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      color: '#9B9F95'
    },
    textNomor: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      color: '#383B34',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20)
    },
    textPastikan: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      color: '#383B34',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(5)
    },
    viewNomor: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(320),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(50),
      backgroundColor: '#F6F7F4',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      paddingRight: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(5)
    },
    textValueNomor: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(18),
      color: '#383B34'
    },
    textNominal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(18),
      color: '#383B34',
      fontWeight: '600'
      // marginTop: toDp(6),
    },
    touchSalin: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(61),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(22),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textSalin: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      color: '#5AAA0F'
    },
    textBank: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      color: '#383B34',
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24)
    },
    textSilahkan: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      color: '#383B34',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20)
    },
    viewFooter: {
      width: width,
      alignItems: 'center',
      borderTopColor: '#DDE3E0',
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(1),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10),
      paddingBottom: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16) : (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10)
      /*shadowColor: "#000",
      shadowOffset: {
      	width: 0,
      	height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,*/
    },
    touchFooter: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(320),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textFooter: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      color: 'white'
    },
    imgBank: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(40),
      resizeMode: 'contain'
    },
    batas: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      backgroundColor: '#F6F7F4',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(-20),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20)
    },
    textJika: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      color: '#383B34'
    },
    textUpload: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      color: '#9B9F95'
    },
    touchUpload: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(80),
      backgroundColor: '#F6F7F4',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(5)
    },
    icCameraPlus: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(30.67),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(28)
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
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(165),
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
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
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(2),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4)
    },
    icSilangModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      tintColor: '#263238'
    },
    circleModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(40),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(1),
      borderColor: '#5AAA0F',
      backgroundColor: 'white',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      justifyContent: 'center',
      alignItems: 'center'
    },
    icModalGallery: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      resizeMode: 'contain',
      tintColor: '#5AAA0F'
    },
    textModal: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(8),
      textAlign: 'center',
      //fontFamily: 'Montserrat-Medium',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      color: '#263238'
    },
    touchLabelItem: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      flex: 1,
      alignItems: 'center'
    },
    picture: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(48),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(48)
    },
    textLabel: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4),
      textAlign: 'center',
      //fontFamily: 'Montserrat-Medium',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10),
      color: '#000000'
    },
    touchLabellaporan: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(54),
      flexDirection: 'row'
    },
    icChevronDown: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(28),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(28),
      tintColor: '#B0BEC5',
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0),
      bottom: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4)
    },
    imgUrl: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(80),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(5)
    },
    img: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(240),
      resizeMode: 'cover'
    },
    touchKembaliKeLogin: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(180),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKembaliKeLogin: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0.2)
    },
    touchPhoto: {
      position: 'absolute',
      top: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0),
      left: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(52),
      padding: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4)
    },
    icRemovePhoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20)
    },
    viewCheck: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
    },
    icCheck: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24)
    },
    textBayar: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      color: '#5E6157',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(8)
    },
    rootStyles: {
      backgroundColor: 'white'
    }
  });
  var _default = exports.default = InfoBillingScreen;
