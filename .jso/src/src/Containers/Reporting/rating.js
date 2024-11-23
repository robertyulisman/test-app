  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[5]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[6]);
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var RatingScreen = function RatingScreen(props) {
    var _useState = (0, _react.useState)({
        loading: false,
        darkMode: false,
        star: 0,
        info: '',
        review: '',
        successModal: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      if (props.route.params.rating) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            star: props.route.params.rating,
            review: props.route.params.review
          });
        });
      }
    }, []);
    var kirimRating = function kirimRating() {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loading: true
        });
      });
      if (props.route.params.is_a_resident) {
        var body = {
          rating: state.star,
          review: state.review
        };
        (0, _$$_REQUIRE(_dependencyMap[8]).postRating)('?report_id=' + props.route.params.id, body).then(function (response) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              successModal: true
            });
          });
        }).catch(function (error) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false
            });
          });
        });
      } else {
        var _body = {
          rating_pengelola: state.star,
          review_pengelola: state.review
        };
        (0, _$$_REQUIRE(_dependencyMap[8]).postRatingPengelola)('?report_id=' + props.route.params.id, _body).then(function (response) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              successModal: true
            });
          });
        }).catch(function (error) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false
            });
          });
        });
      }
    };
    var modalSuccess = function modalSuccess() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        isVisible: state.successModal,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBox, {
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[9]).allLogo.icTepukTangan,
        style: styles.icTepukTangan
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textTitleModal, {
          color: state.darkMode ? 'white' : '#263238'
        }]
      }, "TERIMA KASIH"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        allowFontScaling: false,
        style: [styles.textDescModal, {
          color: state.darkMode ? 'white' : '#263238'
        }]
      }, "Penilaian Anda berguna untuk meningkatkan kualitas kami"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              successModal: false
            });
          });
          props.route.params.load();
          props.navigation.goBack();
        },
        style: styles.touchKembaliKeLogin
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: styles.textKembaliKeLogin
      }, "Selesai")))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Rating Layanan',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.loading
    }), modalSuccess(), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: {
        uri: props.route.params.img
      },
      style: styles.imgRating
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      allowFontScaling: false,
      style: [styles.textTitle, {
        color: state.darkMode ? 'white' : 'black'
      }]
    }, "Beri rating pelayanan kami", ' '), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "regular",
      allowFontScaling: false,
      style: [styles.textDesc, {
        color: state.darkMode ? 'white' : 'black'
      }]
    }, "Apakah Anda puas dengan layanan penanganan laporan petugas kami?"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewRow
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        return setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            star: 1,
            info: 'Buruk'
          });
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[9]).allLogo.icStar,
      style: [styles.icStar, {
        tintColor: state.star >= 1 ? '#f2c141' : '#e7ebee'
      }]
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12)
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        return setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            star: 2,
            info: 'Kurang'
          });
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[9]).allLogo.icStar,
      style: [styles.icStar, {
        tintColor: state.star >= 2 ? '#f2c141' : '#e7ebee'
      }]
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12)
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        return setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            star: 3,
            info: 'Cukup'
          });
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[9]).allLogo.icStar,
      style: [styles.icStar, {
        tintColor: state.star >= 3 ? '#f2c141' : '#e7ebee'
      }]
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12)
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        return setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            star: 4,
            info: 'Baik'
          });
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[9]).allLogo.icStar,
      style: [styles.icStar, {
        tintColor: state.star >= 4 ? '#f2c141' : '#e7ebee'
      }]
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12)
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        return setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            star: 5,
            info: 'Sangat Baik'
          });
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[9]).allLogo.icStar,
      style: [styles.icStar, {
        tintColor: state.star >= 5 ? '#f2c141' : '#e7ebee'
      }]
    }))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      allowFontScaling: false,
      style: [styles.textInfo, {
        color: state.darkMode ? 'white' : '#383B34'
      }]
    }, state.info), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewReview
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "regular",
      allowFontScaling: false,
      style: [styles.textReview, {
        color: state.darkMode ? 'white' : '#5E6157'
      }]
    }, "Komentar (optional)"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.viewTextArea, {
        backgroundColor: state.darkMode ? '#FFFFFF' : '#f3f5f6'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
      style: styles.textInput,
      onChangeText: function onChangeText(review) {
        return setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            review: review
          });
        });
      },
      value: state.review,
      multiline: true,
      maxLength: 255,
      placeholder: 'Tulis komentar Anda disini',
      placeholderTextColor: '#838a9a'
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "medium",
      allowFontScaling: false,
      style: styles.textCount
    }, state.review.length + '/255')))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(200)
      }
    })), state.star === 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.touchKirim, {
        backgroundColor: '#CCCFC9'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      allowFontScaling: false,
      style: styles.textKirim
    }, "Kirim Penilaian")) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        return kirimRating();
      },
      style: [styles.touchKirim, {
        backgroundColor: '#5AAA0F'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      allowFontScaling: false,
      style: styles.textKirim
    }, "Kirim Penilaian")));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    content: {
      flex: 1,
      padding: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      alignItems: 'center'
    },
    touchKirim: {
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      width: '90%',
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(40),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKirim: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      color: 'white',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(0.7)
    },
    imgRating: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(95),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(95),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(4)
    },
    textTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      color: '#000000',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(0.7),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20)
    },
    textDesc: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(16),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      color: '#273238',
      textAlign: 'center'
    },
    viewRow: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(30),
      flexDirection: 'row'
    },
    icStar: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(42),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(42)
    },
    textInfo: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      color: '#000000',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(0.7),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12)
    },
    viewReview: {
      width: '100%',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24)
    },
    textReview: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#273238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(0.6)
    },
    viewTextArea: {
      width: '100%',
      //height: toDp(100),
      height: 'auto',
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      backgroundColor: '#f3f5f6',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(2)
    },
    textCount: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#c1c7ca',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(0.25),
      position: 'absolute',
      bottom: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      right: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10)
    },
    textInput: {
      textAlignVertical: 'top',
      margin: _reactNative.Platform.OS === 'ios' ? (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12) : (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(8),
      width: '93%',
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(64),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#383B34',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(0.25),
      fontFamily: 'Poppins-Regular',
      fontWeight: '400'
    },
    textMax: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(2),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#f5493c',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(0.25)
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
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(300),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(280),
      backgroundColor: '#FFFFFF',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(4),
      alignItems: 'center'
    },
    textTitleModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(0.7),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24)
    },
    textDescModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      color: '#263238',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(8),
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(255),
      textAlign: 'center'
    },
    icTepukTangan: {
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(80),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(24)
    },
    touchKembaliKeLogin: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(20),
      width: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(180),
      height: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKembaliKeLogin: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[10]).toDp)(0.7)
    }
  });
  var _default = exports.default = RatingScreen;
