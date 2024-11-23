  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _asyncStorage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _Empty = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _NoConnection = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _Toast = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _id = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[12]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[13]);
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[16]));
  var _Highlighter = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[18]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var limit = 0;
  var NewsScreen = function NewsScreen(props) {
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[19]).useNetInfo)();
    var toast = (0, _react.useRef)(null);
    var _useState = (0, _react.useState)({
        arrayData: [],
        loading: true,
        loadingModal: false,
        messages: '',
        filter: 'all',
        modalVisible: false,
        page: 1,
        arrayStatus: ['Semua', 'Promo', 'Akt', 'Dalam Proses', 'Selesai', 'Batal'],
        activeStatus: 'Semua',
        activeIdStatus: [],
        total: 0,
        totalPage: 0,
        limit: 20,
        activeSearch: false,
        searchValue: '',
        darkMode: false,
        temp: 0,
        dataUser: {}
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      loadUser();
      getAllLoadData();
    }, []);
    var loadUser = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* () {
        var dataUser = yield _asyncStorage.default.getItem('dataUser');
        // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            dataUser: JSON.parse(dataUser)
          });
        });
      });
      return function loadUser() {
        return _ref.apply(this, arguments);
      };
    }();
    var getAllLoadData = function getAllLoadData() {
      (0, _$$_REQUIRE(_dependencyMap[20]).getNewsCategories)().then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            arrayStatus: [{
              id: 'all',
              name: 'Semua'
            }].concat((0, _toConsumableArray2.default)(response.data.news_categories))
          });
        });
      }).catch(function (error) {});
      loadNews();
      limit = state.limit;
    };
    var showMessageSuccess = function showMessageSuccess() {
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      toast.current.show('Berita Anda berhasil terkirim.');
    };
    var loadNews = function loadNews() {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loading: state.page === 1 ? true : false
        });
      });
      var params = '?page=' + state.page + '&search=' + state.searchValue;
      var data = {
        filter: {
          news_category_id: state.activeIdStatus
        }
      };
      (0, _$$_REQUIRE(_dependencyMap[20]).getNews)(params, data).then(function (response) {
        if (state.page === 1) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              arrayData: response.data.news_articles,
              total: response.data.meta.total,
              totalPage: response.data.meta.total_page
            });
          });
        } else {
          // @ts-expect-error TS(2345): Argument of type '(state: { arrayData: never[]; lo... Remove this comment to see the full error message
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              arrayData: [].concat((0, _toConsumableArray2.default)(state.arrayData), (0, _toConsumableArray2.default)(response.data.news_articles))
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
    var changeColorStatus = function changeColorStatus(name) {
      if (name === 'Aktivitas') {
        return '#FF7F00';
      } else if (name === 'Pengumuman') {
        return '#28A595';
      } else if (name === 'Promo') {
        return '#2F80ED';
      }
    };
    var changeWidthStatus = function changeWidthStatus(name) {
      var min = 4;
      if (name === 'Aktivitas') {
        return (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(65);
      } else if (name === 'Pengumuman') {
        return (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(96);
      } else if (name === 'Promo') {
        return (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(54);
      }
    };
    var like = function like(id, is_liked) {
      //fungsi like
      // @ts-expect-error TS(2345): Argument of type '(state: { arrayData: never[]; lo... Remove this comment to see the full error message
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          arrayData: state.arrayData.map(function (data) {
            // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
            if (data.id === id) {
              return Object.assign(Object.assign({}, data), {}, {
                // @ts-expect-error TS(2339): Property 'is_liked' does not exist on type 'never'... Remove this comment to see the full error message
                is_liked: !data.is_liked,
                // @ts-expect-error TS(2339): Property 'is_liked' does not exist on type 'never'... Remove this comment to see the full error message
                like: !data.is_liked ? data.like + 1 : data.like - 1
              });
            }
            return Object.assign({}, data);
          })
        });
      });
      if (!is_liked) {
        _reactNative.Vibration.vibrate(100);
      }
      var body = {
        is_a_like: is_liked
      };
      (0, _$$_REQUIRE(_dependencyMap[20]).putLike)('/' + id, body).then(function (response) {}).catch(function (error) {});
    };
    var renderItem = function renderItem(_ref2) {
      var item = _ref2.item,
        index = _ref2.index;
      // console.log('item', item);
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: [styles.containerItem, {
          backgroundColor: 'white'
        }],
        onPress: function onPress() {
          // @ts-expect-error TS(2345): Argument of type '(state: { arrayData: never[]; lo... Remove this comment to see the full error message
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              arrayData: state.arrayData.map(function (data) {
                // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                if (data.id === item.id) {
                  return Object.assign(Object.assign({}, data), {}, {
                    is_viewed: true,
                    // @ts-expect-error TS(2339): Property 'is_viewed' does not exist on type 'never... Remove this comment to see the full error message
                    view: !data.is_viewed ? data.view + 1 : data.view
                  });
                }
                return Object.assign({}, data);
              })
            });
          });
          NavigatorService.navigate('DetailsNews', {
            id: item.id,
            loadNews: loadNews,
            like: like
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.cards, {
          backgroundColor: 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        style: styles.imgPicture,
        source: {
          uri: item.image_url === null ? item.image_urls[0] : item.image_url
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.contentItem
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.itemTitle, {
          color: '#273238'
        }],
        numberOfLines: 1,
        allowFontScaling: false,
        ellipsizeMode: "tail"
      }, item.title), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowLike
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        allowFontScaling: false,
        style: [styles.text, {
          color: '#9B9F95'
        }]
      }, item.view, " x dilihat \u25CF", ' ', (0, _moment.default)(item.created_at)
      // @ts-expect-error TS(2554): Expected 0-1 arguments, but got 2.
      .locale('id', _id.default).format('LLLL').replace('pukul', '')), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.viewLikeRowRight,
        onPress: function onPress() {
          // @ts-expect-error TS(2339): Property 'is_a_resident' does not exist on type '{... Remove this comment to see the full error message
          if (state.dataUser.is_a_resident) {
            like(item.id, item.is_liked);
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        style: styles.icLikeNews,
        source: item.is_liked ? _$$_REQUIRE(_dependencyMap[22]).allLogo.icLikeNewsActive : _$$_REQUIRE(_dependencyMap[22]).allLogo.icLikeNews
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        allowFontScaling: false,
        style: [styles.text, {
          color: '#273238',
          marginTop: 0
        }]
      }, item.like + state.temp))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.desc, {
          color: '#383B34'
        }],
        numberOfLines: 2,
        allowFontScaling: false,
        ellipsizeMode: "tail"
      }, item.content.replace(/(<([^>]+)>)/gi, '').replace('&nbsp;', '').replace('&nbsp;', ''))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewStatus, {
          width: changeWidthStatus(item.news_category.name),
          backgroundColor: changeColorStatus(item.news_category.name)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        allowFontScaling: false,
        style: styles.textStatus
      }, item.news_category.name))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.lineItem, {
          backgroundColor: '#f5f7f8'
        }]
      }));
    };
    var renderItemShimmer = function renderItemShimmer(_ref3) {
      var item = _ref3.item,
        index = _ref3.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.containerItem, {
          backgroundColor: 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.cards, {
          backgroundColor: 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: styles.imgPicture
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.contentItem
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: styles.itemTitle
      }), /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: [styles.text, {
          width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(250)
        }]
      }), /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: [styles.desc, {
          width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(328)
        }]
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.lineItem
      }));
    };
    var renderFooter = function renderFooter() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
        size: "large",
        color: '#5AAA0F',
        style: {
          marginVertical: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(24)
        }
      });
    };
    (0, _react.useEffect)(function () {
      // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
      loadNews(state.page);
    }, [state.activeIdStatus]);
    var renderStatus = function renderStatus(_ref4) {
      var item = _ref4.item,
        index = _ref4.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          // @ts-expect-error TS(2345): Argument of type '(state: { arrayData: never[]; lo... Remove this comment to see the full error message
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              activeIdStatus: [item.id],
              activeStatus: item.name,
              modalVisible: false,
              page: 1,
              limit: 20,
              arrayData: []
            });
          });
          limit = state.limit;
        },
        style: [styles.touchStatus, {
          backgroundColor: item.name == state.activeStatus ? '#5AAA0F19' : '#ffffff',
          borderColor: item.name === state.activeStatus ? '#5AAA0F' : '#d3d6db'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        allowFontScaling: false,
        style: [styles.textStatusItem, {
          color: item.name === state.activeStatus ? '#5AAA0F' : '#788f9c'
        }]
      }, item.name));
    };
    var renderModalFilter = function renderModalFilter() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        onSwipeComplete: function onSwipeComplete() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
        },
        swipeDirection: ['down'],
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
          backgroundColor: 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.lineCenter
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.lineModal
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewModalTitle
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textTitleModal, {
          color: '#263238'
        }]
      }, "PILIH LABEL BERITA")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewArrayStatus
      }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
        data: state.arrayStatus,
        renderItem: renderStatus,
        numColumns: 3
      })))));
    };
    var renderHeaderDefault = function renderHeaderDefault() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.header, {
          backgroundColor: 'white',
          borderBottomColor: '#CCCFC9'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(90)
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHeader,
        onPress: function onPress() {
          return props.navigation.goBack();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[22]).allLogo.icBack,
        style: styles.icBack
      }))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: styles.title
      }, 'Berita'), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(90),
          alignItems: 'flex-end'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.headerRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHeaderSearch,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: true
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[22]).allLogo.icFilter,
        style: styles.icFilter
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16)
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHeaderSearch,
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              page: 1,
              activeSearch: true
            });
          });
          //search.focus()
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[22]).allLogo.icSearch,
        style: styles.icSearch
      })))));
    };
    (0, _react.useEffect)(function () {
      loadNews();
    }, [state.searchValue]);
    var renderHeaderSearch = function renderHeaderSearch() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.header, {
          backgroundColor: 'white',
          borderBottomColor: '#5AAA0F'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.linearHeader
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.searchRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.inputRow, {
          borderColor: '#5AAA0F'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[22]).allLogo.icSearch,
        style: [styles.icSearch, {
          tintColor: '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
        onChangeText: function onChangeText(searchValue) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              searchValue: searchValue
            });
          });
        },
        autoCapitalize: 'none',
        underlineColorAndroid: 'transparent',
        style: [styles.textInput, {
          color: '#383B34'
        }],
        placeholder: 'Cari Berita',
        placeholderTextColor: '#8d96a6',
        returnKeyType: "search",
        value: state.searchValue
      }), state.searchValue !== '' && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHeaderSearch,
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              searchValue: ''
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[22]).allLogo.icDeleteAll,
        style: styles.icDeleteAll
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHeaderSearch,
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              activeSearch: false,
              page: 1,
              searchValue: ''
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textBatal, {
          color: '#5AAA0F'
        }]
      }, "Batal")))));
    };
    var renderItemSearch = function renderItemSearch(_ref5) {
      var item = _ref5.item,
        index = _ref5.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: [styles.containerItem, {
          backgroundColor: 'white'
        }],
        onPress: function onPress() {
          return NavigatorService.navigate('DetailsNews', {
            id: item.id,
            loadNews: loadNews,
            like: like
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.cards, {
          backgroundColor: 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.contentItem
      }, /*#__PURE__*/_react.default.createElement(_Highlighter.default, {
        style: [styles.itemTitle, {
          color: '#383B34',
          marginTop: 0
        }],
        highlightStyle: {
          backgroundColor: '#ffde00'
        },
        searchWords: [state.searchValue],
        textToHighlight: item.title
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        allowFontScaling: false,
        style: [styles.text, {
          color: '#9B9F95'
        }]
      }, "// @ts-expect-error TS(2554): Expected 0-1 arguments, but got 2.", (0, _moment.default)(item.created_at).locale('id', _id.default).format('LLLL')), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewStatusSearch, {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(4),
          width: changeWidthStatus(item.news_category.name),
          backgroundColor: changeColorStatus(item.news_category.name),
          height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(20)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        allowFontScaling: false,
        style: styles.textStatusSearch
      }, item.news_category.name)))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.lineItem, {
          backgroundColor: '#f5f7f8'
        }]
      }));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: 'white'
      }]
    }, renderModalFilter(), /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: true,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_Toast.default, {
      ref: toast
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.loadingModal
    }), !state.activeSearch ? renderHeaderDefault() : renderHeaderSearch(), state.activeSearch && state.searchValue === '' && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.overlaySearch
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.content, {
        backgroundColor: '#f5f7f8'
      }]
    }, !netInfo.isConnected ? /*#__PURE__*/_react.default.createElement(_NoConnection.default, null) : state.arrayData.length === 0 && !state.loading ? state.activeSearch ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.centerEmpty
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[22]).allLogo.imgEmptyNews,
      style: styles.imgEmptyNews
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      allowFontScaling: false,
      style: styles.emptySearch
    }, "Maaf, Tidak ada berita terkait.")) : /*#__PURE__*/_react.default.createElement(_Empty.default, {
      images: _$$_REQUIRE(_dependencyMap[22]).allLogo.imgEmptyNews,
      title: 'Belum ada berita'
    }) : state.activeSearch && state.loading ? renderFooter() : /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      removeClippedSubviews: true,
      refreshControl: /*#__PURE__*/_react.default.createElement(_reactNative.RefreshControl, {
        refreshing: state.loading,
        onRefresh: function onRefresh() {
          limit = 0, setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              total: 0,
              totalPage: 0,
              arrayData: [],
              page: 1
            });
          });
          // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
          loadNews(state.page);
        }
      }),
      onMomentumScrollEnd: function onMomentumScrollEnd(e) {
        var paddingToBottom = state.activeSearch && state.searchValue !== '' ? (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(99) : (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(127);
        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
        if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
          var page = state.page++;
          // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
          loadNews(page);
          limit += state.limit;
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      removeClippedSubviews: true,
      data: state.loading ? ['', '', '', '', ''] : state.arrayData,
      renderItem: state.loading ? renderItemShimmer : state.activeSearch && state.searchValue !== '' ? renderItemSearch : renderItem,
      ListFooterComponent: state.page < state.totalPage ? renderFooter() : /*#__PURE__*/_react.default.createElement(_reactNative.View, null)
    }))), netInfo.isConnected && !state.dataUser.is_a_resident && /*#__PURE__*/_react.default.createElement(_reactNativeLinearGradient.default, {
      start: {
        x: 0.0,
        y: 0.5
      },
      end: {
        x: 0.7,
        y: 1.0
      },
      colors: ['#5AAA0F', '#5AAA0F'],
      style: styles.linearFab
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.fabAdd,
      onPress: function onPress() {
        return NavigatorService.navigate('AddNews', {
          loadNews: loadNews,
          showMessageSuccess: showMessageSuccess
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[22]).allLogo.icAdd,
      style: styles.icAdd
    }))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(28) : 0
    },
    headeriOS: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    linearFab: {
      padding: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(28),
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(56),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(56),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 1.0,
      elevation: 4,
      position: 'absolute',
      bottom: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(24),
      right: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(24),
      zIndex: 1
    },
    fabAdd: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    icAdd: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(36),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(36),
      tintColor: 'white'
    },
    header: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(60),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(1),
      borderBottomColor: '#CCCFC9',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16)
    },
    linearHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(60)
    },
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(4)
    },
    icBack: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      tintColor: '#383B34'
    },
    headerRow: {
      flexDirection: 'row'
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(4)
    },
    icFilter: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(24),
      tintColor: '#383B34'
    },
    icSearch: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(24),
      tintColor: '#383B34'
    },
    title: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(18)
    },
    content: {
      flex: 1,
      backgroundColor: '#f5f7f8'
    },
    containerItem: {
      width: width,
      height: 'auto',
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      //paddingBottom: toDp(16),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16)
      //paddingHorizontal: toDp(8)
    },
    lineItem: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(8),
      backgroundColor: '#f5f7f8',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16)
    },
    cards: {
      width: '100%',
      height: 'auto',
      backgroundColor: '#FFFFFF',
      alignItems: 'center'
    },
    cardHeader: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16)
    },
    months: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      color: '#333'
      //fontFamily: 'Montserrat-Bold'
    },
    price: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(18),
      color: '#333'
      //fontFamily: 'Montserrat-Regular'
    },
    cardDate: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    logo: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(25),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(25),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(5),
      alignItems: 'center',
      justifyContent: 'center'
    },
    icon: {
      maxWidth: '100%',
      resizeMode: 'contain'
    },
    cardDetails: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(10),
      width: '100%',
      flexDirection: 'row'
    },
    date: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(12),
      color: '#666',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(20)
      //fontFamily: 'Montserrat-Regular'
    },
    invoiceNumber: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(14),
      color: '#666',
      alignItems: 'flex-start'
      //fontFamily: 'Montserrat-Regular'
    },
    logoContainer: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      alignItems: 'center',
      justifyContent: 'center'
    },
    iconNext: {
      maxHeight: '100%',
      resizeMode: 'contain',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(4),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(12)
    },
    due: {
      color: 'red',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(12)
    },
    viewCenter: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingShimmer: {
      width: '95%',
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(110),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(5),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16)
    },
    textName: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(8),
      color: '#616161',
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16)
    },
    textPosition: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(12),
      color: '#BDBDBD',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(8)
    },
    containerDesc: {
      width: width * 0.906,
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      backgroundColor: 'transparent',
      justifyContent: 'space-between'
    },
    titleContent: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(18),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(6),
      textAlign: 'center',
      color: '#333333'
    },
    textContent: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      color: '#333333',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(10),
      textAlign: 'center'
    },
    profile: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(40)
    },
    imageContent: {
      //height: height / 2,
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(328),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(8),
      width: width * 0.906,
      resizeMode: 'contain'
    },
    viewRow: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(20),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16)
    },
    imgPicture: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(328),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(160),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(4)
    },
    contentItem: {
      flex: 1,
      width: '100%',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16)
    },
    labelpic: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(24)
    },
    itemTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(14),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16)
    },
    viewRowItem: {
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(8),
      alignItems: 'center'
    },
    itemContent: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(14),
      color: '#333333'
    },
    viewTitleContent: {
      width: '100%',
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16)
    },
    itemDate: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(14),
      color: '#4b5a74',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(4)
    },
    itemLocation: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(12),
      color: '#4b5a74',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16)
    },
    icCalendar: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(20),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(8)
    },
    icLp: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(20),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(8)
    },
    text: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(12),
      color: '#868A8E',
      //fontFamily: 'Montserrat-Regular',
      letterSpacing: 0,
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(4)
    },
    desc: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(12),
      color: '#273238',
      //fontFamily: 'Montserrat-Regular',
      letterSpacing: 0,
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(8)
    },
    viewStatusSearch: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(56),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(20),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(11),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center'
    },
    viewStatus: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(56),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(20),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(11),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(8),
      right: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(24)
    },
    textStatus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(10),
      color: '#FFFFFF'
      //fontFamily: 'Montserrat-SemiBold',
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
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(230),
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(24),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(1),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(4)
    },
    icSilangModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(20),
      tintColor: '#5AAA0F'
    },
    viewArrayStatus: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(24),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(24)
    },
    touchStatus: {
      width: 'auto',
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(40),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(14),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(45),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      backgroundColor: '#5AAA0F19',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(1),
      borderColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(14)
    },
    textStatusItem: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(14),
      color: '#273238'
    },
    lineCenter: {
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16)
    },
    lineModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(64),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(4),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(7)
    },
    searchRow: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    textBatal: {
      color: '#5AAA0F',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(8)
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(8),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(1),
      borderColor: '#5AAA0F',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(8),
      //marginRight: toDp(16),
      //flex: 1,
      width: '82%',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(10),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(40)
    },
    icDeleteAll: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(20)
    },
    textInput: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(4),
      width: '80%',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(12),
      color: '#273238'
      //fontFamily: 'Montserrat-Regular',
    },
    overlaySearch: {
      width: width,
      height: height,
      marginTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(89) : (0, _$$_REQUIRE(_dependencyMap[23]).isIphoneX)() ? (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(98) : (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(78),
      backgroundColor: 'black',
      opacity: 0.45,
      position: 'absolute',
      zIndex: 1
    },
    textStatusSearch: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(12),
      color: '#FFFFFF'
      //fontFamily: 'Montserrat-Medium',
    },
    viewRowLike: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(6)
    },
    viewLikeRowRight: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    icLikeNews: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(6)
    },
    centerEmpty: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    },
    imgEmptyNews: {
      width: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(120),
      height: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(120)
    },
    emptySearch: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(20),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[21]).toDp)(14),
      color: '#273238'
      //fontFamily: 'Montserrat-Regular',
    }
  });
  var _default = exports.default = NewsScreen;
