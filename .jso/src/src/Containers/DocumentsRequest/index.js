  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _NoConnection = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _Empty = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _Toast = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[12]));
  var _styles = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[14]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);
  var limit = 0;
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var DocumentsRequest = function DocumentsRequest(props) {
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[15]).useNetInfo)();
    var toast = (0, _react.useRef)(null);
    var _useState = (0, _react.useState)({
        dataUser: props.route.params.dataUser,
        arrayData: [],
        loading: true,
        messages: '',
        filter: 'all',
        //modalVisible: false,
        //modalVisible: true,
        modalVisible: props.modalVisible,
        page: 1,
        total: 0,
        totalPage: 0,
        limit: 20,
        connection: true,
        darkMode: false,
        arrayStatus: [],
        activeStatus: 'Semua',
        activeIdStatus: [],
        activePublik: 'Pribadi',
        arrayCategory: [],
        statusAll: true,
        objFilter: null,
        isConnected: true
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      getAllLoadData();
    }, []);
    var getAllLoadData = function getAllLoadData() {
      loadComplains();
      limit = state.limit;
    };
    var loadComplains = function loadComplains() {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loading: state.page === 1 ? true : false
        });
      });
      var params = '?per_page=20&page=' + state.page;
      (0, _$$_REQUIRE(_dependencyMap[16]).getDocumentsRequestMobile)(params).then(function (response) {
        if (state.page === 1) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              arrayData: response.data.data,
              total: response.data.meta.total,
              totalPage: response.data.meta.total_page
            });
          });
        } else {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              arrayData: [].concat((0, _toConsumableArray2.default)(state.arrayData), (0, _toConsumableArray2.default)(response.data.data))
            });
          });
        }
      }).catch(function (error) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false,
            arrayData: []
          });
        });
      });
    };
    var showMessageSuccess = function showMessageSuccess() {
      toast.current.show('Documents Anda berhasil terkirim.');
    };
    var showMessageDelete = function showMessageDelete() {
      toast.current.show('Documents Anda berhasil dibatalkan');
    };
    var renderLabel = function renderLabel(_ref) {
      var item = _ref.item,
        index = _ref.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: [_styles.default.viewTextModal, {
          borderBottomColor: props.darkMode ? '#1C1C1E' : '#e9ebed'
        }],
        key: index,
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              statusAll: !state.statusAll,
              arrayCategory: state.arrayCategory.map(function (data, i) {
                if (index == 0) {
                  return Object.assign(Object.assign({}, data), {}, {
                    status: !state.statusAll
                  });
                }
                return Object.assign(Object.assign({}, data), {}, {
                  status: data.name === item.name ? !data.status : data.status
                });
              })
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        allowFontScaling: false,
        style: [_styles.default.textWhiteTitle, {
          color: state.darkMode ? 'white' : '#273238'
        }]
      }, item.name ? item.name : item), /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: item.status ? _$$_REQUIRE(_dependencyMap[17]).allLogo.icNewsCheck : _$$_REQUIRE(_dependencyMap[17]).allLogo.icCheckboxUnChecked,
        style: _styles.default.icCheckbox
      }));
    };
    var renderStatus = function renderStatus(_ref2) {
      var item = _ref2.item,
        index = _ref2.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              activeIdStatus: [item.id],
              activeStatus: item.name,
              page: 1,
              limit: 20
            });
          });
          limit = state.limit;
        },
        style: [_styles.default.touchStatus, {
          backgroundColor: item.name == state.activeStatus ? '#E5F9CC' : state.darkMode ? '#1C1C1E' : '#ffffff',
          borderColor: item.name === state.activeStatus ? '#5AAA0F' : state.darkMode ? '#1C1C1E' : '#d3d6db'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: item.name === state.activeStatus ? 'semibold' : 'regular',
        allowFontScaling: false,
        style: [_styles.default.textStatusItem, {
          color: item.name === state.activeStatus ? '#5AAA0F' : state.darkMode ? 'white' : '#9B9F95'
        }]
      }, item.name));
    };
    var bersih = function bersih() {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          activeStatus: 'Semua',
          activeIdStatus: 'all',
          activePublik: 'Pribadi',
          statusAll: true,
          arrayCategory: state.arrayCategory.map(function (data, i) {
            return Object.assign(Object.assign({}, data), {}, {
              status: true
            });
          })
        });
      });
    };
    var simpan = function simpan() {
      var labelId = [];
      for (var i = 0; i < state.arrayCategory.length; i++) {
        if (state.arrayCategory[i].status && state.arrayCategory[i].id !== 0) {
          labelId.push(state.arrayCategory[i].id);
        }
      }
      var objFilter = null;
      if (state.activePublik === 'Semua') {
        if (state.activeIdStatus === 'all') {
          objFilter = {
            complaint_category_id: labelId
          };
        } else {
          objFilter = {
            complaint_status_id: state.activeIdStatus,
            complaint_category_id: labelId
          };
        }
      } else {
        if (state.activeIdStatus === 'all') {
          objFilter = {
            is_public: state.activePublik === 'Publik',
            complaint_category_id: labelId
          };
        } else {
          objFilter = {
            complaint_status_id: state.activeIdStatus,
            is_public: state.activePublik === 'Publik',
            complaint_category_id: labelId
          };
        }
      }
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          objFilter: objFilter,
          modalVisible: false
        });
      });

      //loadComplains()
    };
    var renderModalFilter = function renderModalFilter() {
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
        style: _styles.default.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _styles.default.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_styles.default.modalBox, {
          height: height * 0.7,
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _styles.default.viewModalTitle
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [_styles.default.textTitleModal, {
          color: state.darkMode ? 'white' : '#263238'
        }]
      }, "FILTER"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: _styles.default.touchSilang,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icSilang,
        style: [_styles.default.icSilang, {
          tintColor: props.darkMode ? 'white' : '#263238'
        }]
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_styles.default.viewArrayStatus, {
          marginTop: 0
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
        showsVerticalScrollIndicator: false,
        showsHorizontalScrollIndicator: false,
        data: state.arrayCategory,
        renderItem: renderLabel,
        numColumns: 1,
        ListHeaderComponent: function ListHeaderComponent() {
          return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
            style: {
              width: '100%'
            }
          }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
            style: [_styles.default.viewArrayStatus, {
              marginTop: 0,
              paddingHorizontal: 0
            }]
          }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
            data: [],
            renderItem: function renderItem() {
              return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
            },
            numColumns: 3,
            ListHeaderComponent: function ListHeaderComponent() {
              return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
                style: {
                  width: '100%'
                }
              }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
                style: [_styles.default.viewArrayStatus, {
                  paddingHorizontal: 0
                }]
              }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
                textType: "semibold",
                allowFontScaling: false,
                style: [_styles.default.textModalTitle, {
                  color: state.darkMode ? 'white' : '#9B9F95'
                }]
              }, "Status"), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
                data: state.arrayStatus,
                renderItem: renderStatus,
                numColumns: 3
              })));
            }
          })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
            style: _styles.default.lineModalDialog
          }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
            textType: "semibold",
            allowFontScaling: false,
            style: [_styles.default.textModalTitle, {
              color: state.darkMode ? 'white' : '#9B9F95'
            }]
          }, "Label"));
        },
        ListFooterComponent: function ListFooterComponent() {
          return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
            style: {
              height: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(100)
            }
          });
        }
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_styles.default.viewFooterDialog, {
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: _styles.default.touchBershikan,
        onPress: function onPress() {
          return bersih();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [_styles.default.textBersihkan, {
          color: state.darkMode ? 'white' : '#5AAA0F'
        }]
      }, "Atur Ulang")), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: _styles.default.touchSimpan,
        onPress: function onPress() {
          return simpan();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [_styles.default.textSimpan, {
          color: state.darkMode ? 'white' : 'white'
        }]
      }, "Simpan")))));
    };

    // useEffect(() => {
    //   loadComplains(state.page)
    // }, [state.page])

    var renderItemShimmer = function renderItemShimmer(_ref3) {
      var item = _ref3.item,
        index = _ref3.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_styles.default.containerItem, {
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_styles.default.cards, {
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _styles.default.viewRow
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: _styles.default.imgPicture
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(4)
        }
      }), /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: _styles.default.itemTitle
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _styles.default.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(80)
        }
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _styles.default.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(120)
        }
      })), /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: [_styles.default.viewStatus, {
          width: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(85)
        }]
      })))));
    };
    var renderFooter = function renderFooter() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
        size: "large",
        color: state.darkMode ? 'white' : '#5AAA0F',
        style: {
          marginVertical: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(24)
        }
      });
    };
    var changeColorStatus = function changeColorStatus(name) {
      if (name === 'Terkirim') {
        return '#f53c3c';
      } else if (name === 'Proses') {
        return '#f2c141';
      } else if (name === 'Selesai') {
        return '#28a595';
      } else if (name === 'Batal') {
        return '#6b7b83';
      } else if (name === 'Invalid') {
        return '#6b7b83';
      }
    };
    var changeWidthStatus = function changeWidthStatus(name) {
      if (name === 'Terkirim') {
        return (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(60);
      } else if (name === 'Proses') {
        return (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(56);
      } else if (name === 'Selesai') {
        return (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(56);
      } else if (name === 'Batal') {
        return (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(50);
      } else if (name === 'Invalid') {
        return (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(60);
      }
    };
    var renderItem = function renderItem(_ref4) {
      var item = _ref4.item,
        index = _ref4.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        activeOpacity: state.darkMode ? 1 : 0.2,
        style: [_styles.default.containerItem, {
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }],
        onPress: function onPress() {
          return NavigatorService.navigate('DetailsDocumentsRequestScreen', {
            item: item,
            showMessageDelete: showMessageDelete,
            loadComplains: loadComplains
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_styles.default.cards, {
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _styles.default.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        numberOfLines: 1,
        allowFontScaling: false,
        ellipsizeMode: "tail",
        style: [_styles.default.itemTitle, {
          width: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(300),
          color: state.darkMode ? 'white' : '#383B34'
        }]
      }, item.document.name), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _styles.default.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icLp,
        style: [_styles.default.icLp, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        numberOfLines: 1,
        allowFontScaling: false,
        ellipsizeMode: "tail",
        style: [_styles.default.text, {
          width: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(300),
          color: state.darkMode ? 'white' : '#5E6157'
        }]
      }, item.description ? item.description : 'Tidak ada')), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: _styles.default.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icCalendar,
        style: [_styles.default.icCalendar, {
          tintColor: state.darkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [_styles.default.text, {
          color: state.darkMode ? 'white' : '#5E6157'
        }]
      }, (0, _moment.default)(item.created_at).format('DD MMMM YYYY'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          flexDirection: 'row'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_styles.default.viewStatus, {
          width: changeWidthStatus(item.status),
          backgroundColor: changeColorStatus(item.status)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        allowFontScaling: false,
        style: _styles.default.textStatus
      }, item.status)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(6)
        }
      }))))));
    };
    var renderHeader = function renderHeader() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [_styles.default.header, {
          backgroundColor: 'white',
          borderBottomColor: '#CCCFC9'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(40)
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: _styles.default.touchHeader,
        onPress: function onPress() {
          return props.navigation.goBack();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icBack,
        style: _styles.default.icBack
      }))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: _styles.default.title
      }, 'Documents Request'), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(40),
          alignItems: 'flex-end'
        }
      }));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: _styles.default.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), renderHeader(), /*#__PURE__*/_react.default.createElement(_Toast.default, {
      ref: toast
    }), renderModalFilter(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [_styles.default.content, {
        backgroundColor: state.darkMode ? '#121212' : '#f5f7f8'
      }]
    }, !netInfo.isConnected ? /*#__PURE__*/_react.default.createElement(_NoConnection.default, null) : state.arrayData.length === 0 && !state.loading ? /*#__PURE__*/_react.default.createElement(_Empty.default, {
      title: 'Belum ada dokumen',
      subtitle: 'Silakan buat dokumen pertama Anda',
      images: _$$_REQUIRE(_dependencyMap[17]).allLogo.imgEmptyNews
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      removeClippedSubviews: true,
      refreshControl: /*#__PURE__*/_react.default.createElement(_reactNative.RefreshControl, {
        refreshing: state.loading,
        onRefresh: function onRefresh() {
          limit = 0;
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              total: 0,
              totalPage: 0,
              arrayData: [],
              page: 1
            });
          });
          // loadComplains(state.page); // ini harus diperbaiki ...
          loadComplains();
        }
      }),
      onMomentumScrollEnd: function onMomentumScrollEnd(e) {
        var hasil = limit - e.nativeEvent.contentOffset.y / (0, _$$_REQUIRE(_dependencyMap[18]).toDp)(127);
        if (hasil <= 5 && state.page < state.totalPage) {
          var page = state.page++;
          // loadComplains(page);
          loadComplains();
          limit += state.limit;
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      removeClippedSubviews: true,
      data: state.loading ? ['', '', '', '', ''] : state.arrayData,
      renderItem: state.loading ? renderItemShimmer : renderItem,
      ListFooterComponent: state.page < state.totalPage ? renderFooter() : /*#__PURE__*/_react.default.createElement(_reactNative.View, null)
    }))), "// @ts-expect-error TS(2769): No overload matches this call.", /*#__PURE__*/_react.default.createElement(_reactNativeLinearGradient.default, {
      start: {
        x: 0.0,
        y: 0.5
      },
      end: {
        x: 0.7,
        y: 1.0
      },
      colors: ['#5AAA0F', '#5AAA0F'],
      style: _styles.default.linearFab
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: _styles.default.fabAdd,
      onPress: function onPress() {
        NavigatorService.navigate('AddDocumentsRequestScreen', {
          loadComplains: loadComplains,
          showMessageSuccess: showMessageSuccess,
          dataUser: props.route.params.dataUser
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icAdd,
      style: _styles.default.icAdd
    }))));
  };
  var _default = exports.default = DocumentsRequest;
