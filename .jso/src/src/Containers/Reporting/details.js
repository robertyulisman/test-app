  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _CustomImageView = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _CustomTextArea = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _NoConnection = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _ViewMoreText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[9]);
  var _reactNativeImageViewing = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[12]));
  var _stylesDetails = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var DetailsReportScreen = function DetailsReportScreen(props) {
    var _state$detailsReport6, _state$detailsReport7, _state$detailsReport8, _state$detailsReport9, _state$detailsReport10, _state$detailsReport11, _state$detailsReport$2, _state$detailsReport12, _state$detailsReport13, _state$detailsReport14, _state$detailsReport15, _state$detailsReport16, _state$detailsReport17, _state$detailsReport$3, _state$detailsReport$4;
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[14]).useNetInfo)();
    var _useState = (0, _react.useState)({
        isImageViewVisible: false,
        images: [],
        imageIndex: 0,
        darkMode: false,
        loading: true,
        modalVisible: false,
        textTitleModal: '',
        tanggapan: '',
        // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
        loading: true,
        detailsReport: {},
        isImageViewVisibleProses: false,
        imageIndexProses: 0,
        imagesProses: [],
        isImageViewVisibleSelesai: false,
        imageIndexSelesai: 0,
        imagesSelesai: [],
        isShowModalConfirm: false,
        hide: true
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      _$$_REQUIRE(_dependencyMap[15]).database.ref('/hide').on('value', function (querySnapShot) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            hide: querySnapShot.val()
          });
        });
      });
    }, []);
    (0, _react.useEffect)(function () {
      load();
    }, []);
    var load = function load() {
      (0, _$$_REQUIRE(_dependencyMap[16]).getDetailsComplaints)('/' + props.route.params.item.id).then(function (response) {
        var images = [];
        var imagesProses = [];
        var imagesSelesai = [];
        response.data.complaint_report.complaint_report_images.map(function (data, index) {
          images.push({
            uri: data.image_url,
            title: '',
            width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(400)
          });
        });
        response.data.complaint_report.complaint_report_responses.map(function (data, index) {
          if (data.complaint_status.name === 'Proses') {
            data.complaint_report_response_images.map(function (value, i) {
              imagesProses.push({
                uri: value.img,
                title: '',
                width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(400)
              });
            });
          } else {
            // Selesai
            data.complaint_report_response_images.map(function (value, i) {
              imagesSelesai.push({
                uri: value.img,
                title: '',
                width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(400)
              });
            });
          }
        });
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            images: images,
            imagesProses: imagesProses,
            imagesSelesai: imagesSelesai,
            detailsReport: response.data.complaint_report,
            loading: false
          });
        });
      }).catch(function (error) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false
          });
        });
      });
    };
    var backLaporan = function backLaporan() {
      props.navigation.goBack();
    };
    var renderHeader = function renderHeader() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_stylesDetails.default.header, {
          backgroundColor: 'white',
          borderBottomColor: '#CCCFC9'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(90)
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: _stylesDetails.default.touchHeader,
        onPress: function onPress() {
          return props.navigation.goBack();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icBack,
        style: _stylesDetails.default.icBack
      }))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: _stylesDetails.default.title
      }, 'Detail Laporan'), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(90),
          alignItems: 'flex-end'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.headerRow
      }, !state.hide && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: _stylesDetails.default.touchHeaderSearch,
        onPress: function onPress() {
          NavigatorService.navigate('Comments', {
            dataUser: props.route.params.dataUser,
            id: props.route.params.item.id
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icMessage,
        style: _stylesDetails.default.icFilter
      })))));
    };
    var renderPelapor = function renderPelapor() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewInfo
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [_stylesDetails.default.textTitle, {
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "PELAPOR"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewItem
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textField, {
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "Nama pelapor"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textValue, {
          color: state.darkMode ? 'white' : '#383B34',
          fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14)
        }]
      }, "// @ts-expect-error TS(2339): Property 'user' does not exist on type '", "'.", state.detailsReport.user.name)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewItem
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textField, {
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "Alamat laporan"), "// @ts-expect-error TS(2339): Property 'unit' does not exist on type '", "'.", state.detailsReport.unit === null ? /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textValue, {
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, '-') : /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textValue, {
          color: state.darkMode ? 'white' : 'black'
        }]
      }, "// @ts-expect-error TS(2339): Property 'unit' does not exist on type '", "'.", state.detailsReport.unit.code + '/' + state.detailsReport.unit.unit_name)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewItem
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textField, {
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "Waktu laporan"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textValue, {
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, "// @ts-expect-error TS(2339): Property 'created_at' does not exist on type '", "'.", (0, _moment.default)(state.detailsReport.created_at).format('dddd, DD MMMM YYYY, HH:mm:ss'))));
    };
    var valueMarginRight = function valueMarginRight(count, index) {
      if (count >= 5) {
        return index === 0 || index === 1 || index === 2 || index === 3 ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10) : (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0);
      } else if (count === 4) {
        return index === 0 || index === 1 || index === 2 ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10) : (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0);
      } else if (count === 3) {
        return index === 0 || index === 1 ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10) : (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0);
      } else if (count === 2) {
        return index === 0 ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10) : (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0);
      } else {
        return (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0);
      }
    };
    var renderInfo = function renderInfo() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewInfo
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [_stylesDetails.default.textTitle, {
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "INFO"), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
        horizontal: true
      }, "// @ts-expect-error TS(2339): Property 'complaint_report_images' does not exist ... Remove this comment to see the full error message", state.detailsReport.complaint_report_images.map(function (data, index) {
        if (index <= 2) {
          if (_reactNative.Platform.OS === 'ios') {
            return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
              onPress: function onPress() {
                return setState(function (state) {
                  return Object.assign(Object.assign({}, state), {}, {
                    isImageViewVisible: true,
                    imageIndex: index
                  });
                });
              }
            }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
              style: [_stylesDetails.default.img, {
                width:
                // @ts-expect-error TS(2339): Property 'complaint_report_images' does not exist ... Remove this comment to see the full error message
                state.detailsReport.complaint_report_images.length === 1 ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(320) : (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(300),
                marginRight: valueMarginRight(
                // @ts-expect-error TS(2339): Property 'complaint_report_images' does not exist ... Remove this comment to see the full error message
                state.detailsReport.complaint_report_images.length, index)
              }],
              source: {
                uri: data.image_url
              }
            }));
          } else {
            return /*#__PURE__*/_react.default.createElement(_CustomImageView.default, {
              style: [_stylesDetails.default.img, {
                width:
                // @ts-expect-error TS(2339): Property 'complaint_report_images' does not exist ... Remove this comment to see the full error message
                state.detailsReport.complaint_report_images.length === 1 ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(320) : (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(300),
                marginRight: valueMarginRight(
                // @ts-expect-error TS(2339): Property 'complaint_report_images' does not exist ... Remove this comment to see the full error message
                state.detailsReport.complaint_report_images.length, index)
              }],
              uri: data.image_url
            });
          }
        }
      })), /*#__PURE__*/_react.default.createElement(_reactNativeImageViewing.default, {
        images: state.images,
        animationType: "fade",
        imageIndex: state.imageIndex
        // @ts-expect-error TS(2322): Type '{ images: never[]; animationType: string; im... Remove this comment to see the full error message
        ,
        isVisible: state.isImageViewVisible,
        onRequestClose: function onRequestClose() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isImageViewVisible: false
            });
          });
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewItem
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textField, {
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "Judul Laporan"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textValue, {
          color: state.darkMode ? 'white' : '#383B34',
          fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14)
        }]
      }, props.route.params.item.title)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewItem
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textField, {
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "Label laporan"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textValue, {
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, props.route.params.item.complaint_category ? props.route.params.item.complaint_category.name : 'Tidak ada')), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewItem
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textField, {
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "Deskripsi"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textValue, {
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, props.route.params.item.content.trim())));
    };
    var renderStatus = function renderStatus(status) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_stylesDetails.default.viewStatus, {
          borderTopColor: state.darkMode ? '#1C1C1E' : '#f5f7f8',
          borderBottomColor: state.darkMode ? '#1C1C1E' : '#f5f7f8'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [_stylesDetails.default.textTitle, {
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "STATUS"), status === 'Invalid' || status === 'Batal' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_stylesDetails.default.viewStatusNew, {
          backgroundColor: status === 'Invalid' ? '#6b7b83' : '#6b7b83'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: _stylesDetails.default.textStatus
      }, status)) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.row
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewCenterStatus
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [status === 'Terkirim' ? _stylesDetails.default.sizeActive : _stylesDetails.default.sizeNoActive, {
          backgroundColor: status === 'Terkirim' ? '#f53c3c' : '#CCCFC9',
          marginTop: status === 'Terkirim' ? 0 : (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4),
          marginLeft: status === 'Terkirim' ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(-4) : (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(-16)
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: status === 'Terkirim' ? 'medium' : 'regular',
        allowFontScaling: false,
        style: status === 'Terkirim' ? [_stylesDetails.default.textActive, {
          color: status === 'Terkirim' ? '#273238' : '#788F9C'
        }] : [_stylesDetails.default.textNoActive, {
          textAlign: 'center'
        }]
      }, "Menunggu", '\n', "Proses")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewCenterStatus
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [status === 'Proses' ? _stylesDetails.default.sizeActive : _stylesDetails.default.sizeNoActive, {
          backgroundColor: status === 'Proses' ? '#f2c141' : '#CCCFC9',
          marginTop: status === 'Proses' ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(-20) : (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(-16)
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: status === 'Proses' ? 'medium' : 'regular',
        allowFontScaling: false,
        style: status === 'Proses' ? [_stylesDetails.default.textActive, {
          color: status === 'Proses' ? '#273238' : '#788F9C'
        }] : _stylesDetails.default.textNoActive
      }, "Proses")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewCenterStatus
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [status === 'Selesai' ? _stylesDetails.default.sizeActive : _stylesDetails.default.sizeNoActive, {
          backgroundColor: status === 'Selesai' ? '#28a595' : '#CCCFC9',
          marginTop: status === 'Selesai' ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(-18) : (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(-14)
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: status === 'Selesai' ? 'medium' : 'regular',
        allowFontScaling: false,
        style: status === 'Selesai' ? [_stylesDetails.default.textActive, {
          color: status === 'Selesai' ? '#273238' : '#788F9C',
          marginTop: status === 'Selesai' ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10) : (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0)
        }] : _stylesDetails.default.textNoActive
      }, "Selesai")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.line
      })));
    };
    var renderItem = function renderItem(_ref) {
      var item = _ref.item,
        index = _ref.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewItemRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        resizeMode: "contain",
        source: {
          uri: item.user.image_url
        },
        style: _stylesDetails.default.imgPhoto
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        allowFontScaling: false,
        style: [_stylesDetails.default.textName, {
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(240),
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, item.user.name), /*#__PURE__*/_react.default.createElement(_ViewMoreText.default, {
        textStyle: {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(6),
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(240)
        },
        numberOfLines: 3,
        renderViewMore: function renderViewMore(onPress) {
          return /*#__PURE__*/_react.default.createElement(_CustomText.default, {
            allowFontScaling: false,
            style: _stylesDetails.default.textMore,
            onPress: onPress
          }, "Lihat lebih banyak");
        },
        renderViewLess: function renderViewLess(onPress) {
          return /*#__PURE__*/_react.default.createElement(_CustomText.default, {
            allowFontScaling: false,
            style: _stylesDetails.default.textMore,
            onPress: onPress
          }, "Lihat lebih sedikit");
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [_stylesDetails.default.textContent, {
          color: state.darkMode ? 'white' : '#000000'
        }],
        allowFontScaling: false,
        ellipsizeMode: "tail"
      }, item.content)), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textTime, {
          color: state.darkMode ? 'white' : '#9B9F95',
          marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(2)
        }]
      }, (0, _moment.default)(item.created_at).format('dddd, DD MMMM YYYY, HH:mm:ss'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewRigthTanggapan
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_stylesDetails.default.viewStatusTanggapan, {
          backgroundColor: item.complaint_status.name === 'Proses' ? '#f2c141' : item.complaint_status.name === 'Invalid' ? '#6b7b83' : '#28a595'
        }]
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
        horizontal: true,
        style: {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(76)
        }
      }, item.complaint_report_response_images.map(function (data, index) {
        if (_reactNative.Platform.OS === 'ios') {
          return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
            onPress: function onPress() {
              if (item.complaint_status.name === 'Proses') {
                setState(function (state) {
                  return Object.assign(Object.assign({}, state), {}, {
                    isImageViewVisibleProses: true,
                    imageIndexProses: index
                  });
                });
              } else {
                //Selesai
                setState(function (state) {
                  return Object.assign(Object.assign({}, state), {}, {
                    isImageViewVisibleSelesai: true,
                    imageIndexSelesai: index
                  });
                });
              }
            }
          }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
            style: [_stylesDetails.default.img, {
              width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(80),
              height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(80),
              marginRight: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10)
            }],
            source: {
              uri: data.img
            }
          }));
        } else {
          return /*#__PURE__*/_react.default.createElement(_CustomImageView.default, {
            style: [_stylesDetails.default.img, {
              width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(80),
              height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(80),
              marginRight: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10)
            }],
            uri: data.img
          });
        }
      })));
    };
    var renderUlasan = function renderUlasan() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewUlasan
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [_stylesDetails.default.textTitle, {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "TANGGAPAN"), "// @ts-expect-error TS(2339): Property 'complaint_report_responses' does not exi... Remove this comment to see the full error message", state.detailsReport.complaint_report_responses.length === 0 ? /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textNo, {
          color: state.darkMode ? 'white' : '#000000'
        }]
      }, "Belum ada tanggapan!") : /*#__PURE__*/_react.default.createElement(_reactNative.FlatList
      // @ts-expect-error TS(2339): Property 'complaint_report_responses' does not exi... Remove this comment to see the full error message
      , {
        data: state.detailsReport.complaint_report_responses
        // @ts-expect-error TS(2304): Cannot find name 'renderItemShimmer'.
        ,
        renderItem: state.loading ? renderItemShimmer : renderItem,
        ListFooterComponent: function ListFooterComponent() {
          return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
            style: {
              height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24)
            }
          });
        }
      }));
    };
    var renderRating = function renderRating() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewUlasan
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewRowRating
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [_stylesDetails.default.textTitle, {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "RATING"), props.route.params.dataUser.is_a_resident &&
      // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
      state.detailsReport.rating.available_to_rate && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: _stylesDetails.default.touchPencil,
        onPress: function onPress() {
          return navigateRating();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icPencil,
        style: [_stylesDetails.default.icPencil, {
          tintColor: '#5AAA0F'
        }]
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_stylesDetails.default.viewRow, {
          paddingLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icStar,
        style: [_stylesDetails.default.icStar,
        // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
        {
          tintColor: state.detailsReport.rating.rating >= 1 ? '#F2C041' : '#EBECE9'
        }]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(8)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icStar,
        style: [_stylesDetails.default.icStar,
        // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
        {
          tintColor: state.detailsReport.rating.rating >= 2 ? '#F2C041' : '#EBECE9'
        }]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(8)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icStar,
        style: [_stylesDetails.default.icStar,
        // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
        {
          tintColor: state.detailsReport.rating.rating >= 3 ? '#F2C041' : '#EBECE9'
        }]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(8)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icStar,
        style: [_stylesDetails.default.icStar,
        // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
        {
          tintColor: state.detailsReport.rating.rating >= 4 ? '#F2C041' : '#EBECE9'
        }]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(8)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icStar,
        style: [_stylesDetails.default.icStar,
        // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
        {
          tintColor: state.detailsReport.rating.rating >= 5 ? '#F2C041' : '#EBECE9'
        }]
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewReview
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: _stylesDetails.default.textReview
      }, "Komentar"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textValueReview, {
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, "// @ts-expect-error TS(2339): Property 'rating' does not exist on type '", "'.", state.detailsReport.rating.review), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textValueReview, {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, "// @ts-expect-error TS(2339): Property 'rating' does not exist on type '", "'.", (0, _moment.default)(state.detailsReport.rating.timestamp_rating).format('DD MMMM YYYY; HH:mm'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24)
        }
      }));
    };
    var renderRatingPengelola = function renderRatingPengelola() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewUlasan
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewRowRating
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [_stylesDetails.default.textTitle, {
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, "RATING PENGHUNI"), !props.route.params.dataUser.is_a_resident &&
      // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
      state.detailsReport.rating.available_to_rate && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: _stylesDetails.default.touchPencil,
        onPress: function onPress() {
          return navigateRating();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icPencil,
        style: [_stylesDetails.default.icPencil, {
          tintColor: '#5AAA0F'
        }]
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_stylesDetails.default.viewRow, {
          paddingLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icStar,
        style: [_stylesDetails.default.icStar, {
          // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
          tintColor: state.detailsReport.rating.rating_pengelola >= 1 ? '#F2C041' : '#EBECE9'
        }]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(8)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icStar,
        style: [_stylesDetails.default.icStar, {
          // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
          tintColor: state.detailsReport.rating.rating_pengelola >= 2 ? '#F2C041' : '#EBECE9'
        }]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(8)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icStar,
        style: [_stylesDetails.default.icStar, {
          // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
          tintColor: state.detailsReport.rating.rating_pengelola >= 3 ? '#F2C041' : '#EBECE9'
        }]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(8)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icStar,
        style: [_stylesDetails.default.icStar, {
          // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
          tintColor: state.detailsReport.rating.rating_pengelola >= 4 ? '#F2C041' : '#EBECE9'
        }]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(8)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icStar,
        style: [_stylesDetails.default.icStar, {
          // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
          tintColor: state.detailsReport.rating.rating_pengelola >= 5 ? '#F2C041' : '#EBECE9'
        }]
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewReview
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: _stylesDetails.default.textReview
      }, "Komentar"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textValueReview, {
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, "// @ts-expect-error TS(2339): Property 'rating' does not exist on type '", "'.", state.detailsReport.rating.review_pengelola), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_stylesDetails.default.textValueReview, {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, "// @ts-expect-error TS(2339): Property 'rating' does not exist on type '", "'.", (0, _moment.default)(state.detailsReport.rating.timestamp_rating_pengelola).format('DD MMMM YYYY; HH:mm'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(48)
        }
      }));
    };
    var responseLoadSuccess = function responseLoadSuccess() {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loading: false,
          modalVisible: false
        });
      });
      props.route.params.loadComplains();
      props.navigation.goBack();
    };
    var kirim = function kirim() {
      var _state$detailsReport, _state$detailsReport$;
      var data = {
        complaint_status_id: state.textTitleModal === 'Tanggapan laporan\nTidak valid'.toUpperCase() ? 'e5b03a77-6df3-4939-814b-85d12cbb311b' :
        // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message
        ((_state$detailsReport = state.detailsReport) == null ? undefined : (_state$detailsReport$ = _state$detailsReport.complaint_status) == null ? undefined : _state$detailsReport$.name) == 'Terkirim' ? '42bed447-c3fa-4799-b8a0-f42451be4c37' : '5ddcd42b-7e27-48df-a11a-3cf197d76e51',
        response: state.tanggapan,
        image_urls: []
      };
      (0, _$$_REQUIRE(_dependencyMap[16]).postComplainsStatus)('/' + props.route.params.item.id + '/response', data).then(function (response) {
        responseLoadSuccess();
      }).catch(function (error) {
        if (error.data.name === 'ComplaintReportNotFoundError') {
          _reactNative.Alert.alert('Informasi', 'Laporan telah dipindah tugaskan ke pengelola/petugas lain', [{
            text: 'OK',
            onPress: function onPress() {
              responseLoadSuccess();
            }
          }], {
            cancelable: false
          });
        } else {
          _reactNative.Alert.alert('Informasi', 'Petugas lain sudah menanggapi laporan ini', [{
            text: 'OK',
            onPress: function onPress() {
              responseLoadSuccess();
            }
          }], {
            cancelable: false
          });
        }
      });
    };
    var renderModalNoted = function renderModalNoted() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        onBackdropPress: function onBackdropPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
        },
        onBackButtonPress: function onBackButtonPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
        },
        isVisible: state.modalVisible,
        style: _stylesDetails.default.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_stylesDetails.default.modalBox, {
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.lineCenter
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.lineModal
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewModalTitle
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [_stylesDetails.default.textTitleModal, {
          color: state.darkMode ? 'white' : '#263238'
        }]
      }, state.textTitleModal)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24),
          marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24)
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomTextArea.default, {
        title: 'Tanggapan',
        placeholder: 'Masukan tanggapan Anda',
        error: '',
        value: state.tanggapan,
        onChangeText: function onChangeText(tanggapan) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              tanggapan: tanggapan
            });
          });
        },
        autoFocus: true,
        returnKeyType: 'done',
        maxLength: 160
      }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return kirim();
        },
        style: [_stylesDetails.default.touchKirim, {
          width: '100%',
          height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(40),
          backgroundColor: '#5AAA0F',
          marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(48),
          marginBottom: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: _stylesDetails.default.textKirim
      }, "Kirim"))))));
    };
    var renderFooter = function renderFooter() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_stylesDetails.default.footer, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          borderTopColor: state.darkMode ? '#1C1C1E' : '#5AAA0F'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              textTitleModal: 'Tanggapan laporan\nTidak valid'.toUpperCase(),
              modalVisible: true
            });
          });
        },
        style: [_stylesDetails.default.touchKirim, {
          flex: 1,
          backgroundColor: 'white',
          borderWidth: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(1),
          borderColor: '#5AAA0F',
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
          marginVertical: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
          marginRight: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [_stylesDetails.default.textKirim, {
          color: '#5AAA0F'
        }]
      }, "Tidak Valid")), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          var _state$detailsReport2, _state$detailsReport3;
          //setState({textTitleModal: 'Tanggapan laporan\ndi Proses'.toUpperCase(), modalVisible: true})
          NavigatorService.navigate('Tanggapan', {
            id: props.route.params.item.id,
            // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message
            statusName: (_state$detailsReport2 = state.detailsReport) == null ? undefined : (_state$detailsReport3 = _state$detailsReport2.complaint_status) == null ? undefined : _state$detailsReport3.name,
            backLaporan: backLaporan,
            load: load,
            responseLoadSuccess: responseLoadSuccess,
            loadComplains: props.route.params.loadComplains
          });
        },
        style: [_stylesDetails.default.touchKirim, {
          flex: 1,
          backgroundColor: '#5AAA0F',
          marginVertical: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
          marginRight: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [_stylesDetails.default.textKirim, {
          color: 'white'
        }]
      }, "Proses")));
    };
    var renderFooterProses = function renderFooterProses() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_stylesDetails.default.footer, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          borderTopColor: state.darkMode ? '#1C1C1E' : '#5AAA0F'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          var _state$detailsReport4, _state$detailsReport5;
          //setState({textTitleModal: 'Tanggapan laporan\nSelesai diproses'.toUpperCase(), modalVisible: true})
          NavigatorService.navigate('Tanggapan', {
            id: props.route.params.item.id,
            backLaporan: backLaporan,
            load: load,
            // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message
            statusName: (_state$detailsReport4 = state.detailsReport) == null ? undefined : (_state$detailsReport5 = _state$detailsReport4.complaint_status) == null ? undefined : _state$detailsReport5.name,
            responseLoadSuccess: responseLoadSuccess,
            loadComplains: props.route.params.loadComplains
          });
        },
        style: [_stylesDetails.default.touchKirim, {
          flex: 1,
          backgroundColor: '#5AAA0F',
          margin: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: _stylesDetails.default.textKirim
      }, "SELESAIKAN LAPORAN")));
    };
    var batal = function batal() {
      (0, _$$_REQUIRE(_dependencyMap[16]).postComplainsCancel)(props.route.params.item.id).then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            isShowModalConfirm: false
          });
        });
        props.route.params.showMessageDelete();
        props.route.params.loadComplains();
        props.navigation.goBack();
      }).catch(function (error) {});
    };
    var renderModalConfirmationBatal = function renderModalConfirmationBatal() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        animationIn: 'fadeIn',
        animationOut: 'fadeOut',
        onBackdropPress: function onBackdropPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isShowModalConfirm: false
            });
          });
        },
        isVisible: state.isShowModalConfirm
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewModalCenter
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_stylesDetails.default.modalBoxCenter,
        // @ts-expect-error TS(2551): Property 'isDarkMode' does not exist on type '{ is... Remove this comment to see the full error message
        {
          backgroundColor: state.isDarkMode ? '#121212' : 'white',
          height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(216)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold"
        // @ts-expect-error TS(2551): Property 'isDarkMode' does not exist on type '{ is... Remove this comment to see the full error message
        ,
        style: [_stylesDetails.default.titleConfirm, {
          color: state.isDarkMode ? 'white' : '#263238'
        }]
      }, "BATALKAN LAPORAN"), /*#__PURE__*/_react.default.createElement(_CustomText.default
      // @ts-expect-error TS(2551): Property 'isDarkMode' does not exist on type '{ is... Remove this comment to see the full error message
      , {
        style: [_stylesDetails.default.textApakah, {
          color: state.isDarkMode ? 'white' : '#263238'
        }]
      }, "Pembatalan akan menghapus laporan ini. Apakah yakin ingin membatalkan laporan ini?"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _stylesDetails.default.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: _stylesDetails.default.touchYa,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isShowModalConfirm: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: _stylesDetails.default.textYa
      }, "Tidak")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: _stylesDetails.default.touchTidak,
        onPress: function onPress() {
          return batal();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: _stylesDetails.default.textTidak
      }, "Ya"))))));
    };
    var renderFooterResident = function renderFooterResident() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_stylesDetails.default.footer, {
          borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(1),
          borderTopColor: state.darkMode ? '#1C1C1E' : '#f5f7f8'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isShowModalConfirm: true
            });
          });
        },
        style: [_stylesDetails.default.touchKirim, {
          flex: 1,
          backgroundColor: '#5AAA0F',
          margin: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [_stylesDetails.default.textKirim, {
          color: 'white'
        }]
      }, "Batalkan Laporan")));
    };
    var navigateRating = function navigateRating() {
      if (props.route.params.dataUser.is_a_resident) {
        NavigatorService.navigate('Rating', {
          // @ts-expect-error TS(2339): Property 'complaint_report_images' does not exist ... Remove this comment to see the full error message
          img: state.detailsReport.complaint_report_images[0].image_url,
          id: props.route.params.item.id,
          load: load,
          // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
          rating: state.detailsReport.rating.rating,
          // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
          review: state.detailsReport.rating.review,
          is_a_resident: props.route.params.dataUser.is_a_resident
        });
      } else {
        NavigatorService.navigate('Rating', {
          // @ts-expect-error TS(2339): Property 'complaint_report_images' does not exist ... Remove this comment to see the full error message
          img: state.detailsReport.complaint_report_images[0].image_url,
          id: props.route.params.item.id,
          load: load,
          // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
          rating: state.detailsReport.rating.rating_pengelola,
          // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
          review: state.detailsReport.rating.review_pengelola,
          is_a_resident: props.route.params.dataUser.is_a_resident
        });
      }
    };
    var renderFooterSelesai = function renderFooterSelesai() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_stylesDetails.default.footer, {
          backgroundColor: state.darkMode ? '#1C1C1E' : 'white',
          borderTopColor: state.darkMode ? '#1C1C1E' : '#5AAA0F'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return navigateRating();
        },
        style: [_stylesDetails.default.touchKirim, {
          flex: 1,
          backgroundColor: '#5AAA0F',
          marginVertical: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
          marginRight: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
          marginLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: _stylesDetails.default.textKirim
      }, "BERI RATING")));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: _stylesDetails.default.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), renderHeader(), !netInfo.isConnected ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _stylesDetails.default.viewCenterLoading
    }, /*#__PURE__*/_react.default.createElement(_NoConnection.default, null)) : state.loading ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _stylesDetails.default.viewCenterLoading
    }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
      size: "large",
      color: state.darkMode ? 'white' : '#5AAA0F',
      style: {
        marginVertical: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24)
      }
    })) : /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      style: [_stylesDetails.default.scrollView, {
        backgroundColor: state.darkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_stylesDetails.default.content, {
        backgroundColor: state.darkMode ? '#121212' : 'white'
      }]
    }, !props.route.params.dataUser.is_a_resident && renderPelapor(), !props.route.params.dataUser.is_a_resident && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_stylesDetails.default.lineInfo, {
        backgroundColor: state.darkMode ? '#1C1C1E' : '#F6F7F4'
      }]
    }), renderInfo(), "// @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message", renderStatus((_state$detailsReport6 = state.detailsReport) == null ? undefined : (_state$detailsReport7 = _state$detailsReport6.complaint_status) == null ? undefined : _state$detailsReport7.name), renderUlasan(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_stylesDetails.default.lineRating, {
        backgroundColor: state.darkMode ? '#1C1C1E' : '#f5f7f8'
      }]
    }), "// @ts-expect-error TS(2339): Property 'rating' does not exist on type '", "'.", state.detailsReport.rating.rating !== 0 && renderRating(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_stylesDetails.default.lineRating, {
        backgroundColor: state.darkMode ? '#1C1C1E' : '#f5f7f8'
      }]
    }), !props.route.params.dataUser.is_a_resident &&
    // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
    state.detailsReport.rating.rating_pengelola !== 0 && renderRatingPengelola())), renderModalNoted(), renderModalConfirmationBatal(), props.route.params.dataUser.is_a_resident ?
    // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message
    ((_state$detailsReport8 = state.detailsReport) == null ? undefined : (_state$detailsReport9 = _state$detailsReport8.complaint_status) == null ? undefined : _state$detailsReport9.name) === 'Terkirim' ? renderFooterResident() :
    // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message
    ((_state$detailsReport10 = state.detailsReport) == null ? undefined : (_state$detailsReport11 = _state$detailsReport10.complaint_status) == null ? undefined : _state$detailsReport11.name) === 'Selesai' ?
    // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
    state.detailsReport.rating.available_to_rate &&
    // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
    ((_state$detailsReport$2 = state.detailsReport.rating) == null ? undefined : _state$detailsReport$2.rating) === 0 && renderFooterSelesai() : /*#__PURE__*/_react.default.createElement(_reactNative.View, null) : props.route.params.from === 'laporan' ?
    // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message
    ((_state$detailsReport12 = state.detailsReport) == null ? undefined : (_state$detailsReport13 = _state$detailsReport12.complaint_status) == null ? undefined : _state$detailsReport13.name) === 'Terkirim' ? renderFooter() :
    // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message
    ((_state$detailsReport14 = state.detailsReport) == null ? undefined : (_state$detailsReport15 = _state$detailsReport14.complaint_status) == null ? undefined : _state$detailsReport15.name) === 'Proses' ? renderFooterProses() :
    // @ts-expect-error TS(2339): Property 'complaint_status' does not exist on type... Remove this comment to see the full error message
    ((_state$detailsReport16 = state.detailsReport) == null ? undefined : (_state$detailsReport17 = _state$detailsReport16.complaint_status) == null ? undefined : _state$detailsReport17.name) === 'Selesai' ?
    // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
    ((_state$detailsReport$3 = state.detailsReport.rating) == null ? undefined : _state$detailsReport$3.available_to_rate) &&
    // @ts-expect-error TS(2339): Property 'rating' does not exist on type '{}'.
    ((_state$detailsReport$4 = state.detailsReport.rating) == null ? undefined : _state$detailsReport$4.rating_pengelola) === 0 && renderFooterSelesai() : /*#__PURE__*/_react.default.createElement(_reactNative.View, null) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null), /*#__PURE__*/_react.default.createElement(_reactNativeImageViewing.default, {
      images: state.images,
      imageIndex: state.imageIndex,
      animationType: 'fade',
      visible: state.isImageViewVisible,
      onRequestClose: function onRequestClose() {
        return setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            isImageViewVisible: false
          });
        });
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNativeImageViewing.default, {
      images: state.imagesProses,
      imageIndex: state.imageIndexProses,
      animationType: 'fade',
      visible: state.isImageViewVisibleProses,
      onRequestClose: function onRequestClose() {
        return setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            isImageViewVisibleProses: false
          });
        });
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNativeImageViewing.default, {
      images: state.imagesSelesai,
      imageIndex: state.imageIndexSelesai,
      animationType: 'fade',
      visible: state.isImageViewVisibleSelesai,
      onRequestClose: function onRequestClose() {
        return setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            isImageViewVisibleSelesai: false
          });
        });
      }
    }));
  };
  var _default = exports.default = DetailsReportScreen;
