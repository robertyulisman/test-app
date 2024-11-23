  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _Empty = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _NoConnection = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _CustomComboBox = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[10]));
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[12]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);
  var limit = 0;
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var CCTVScreen = function CCTVScreen(props) {
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[13]).useNetInfo)();
    var _useState = (0, _react.useState)({
        dataUser: props.route.params.dataUser,
        loading: true,
        tower: {
          id: 'allcluster',
          name: 'SEMUA CLUSTER'
        },
        arrTower: [],
        arrayData: [],
        page: 1,
        total: 0,
        totalPage: 0,
        limit: 20,
        darkMode: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      limit = 0;
      if (props.route.params.dataUser.is_a_resident) {
        loadCCTVResident(1);
      } else {
        (0, _$$_REQUIRE(_dependencyMap[14]).getUnitsTower)('').then(function (response) {
          var tempTower = [];
          tempTower.push({
            id: 'allcluster',
            name: 'SEMUA CLUSTER'
          });
          for (var i = 0; i < response.data.length; i++) {
            tempTower.push({
              id: response.data[i].id,
              name: response.data[i].name
            });
          }
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              arrTower: tempTower,
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
        loadCCTV(1, {
          filter: {
            cluster_id: []
          }
        });
      }
    }, []);
    var loadCCTVResident = function loadCCTVResident(page) {
      (0, _$$_REQUIRE(_dependencyMap[14]).getCctvsResidents)('?page=' + page).then(function (response) {
        if (page === 1) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              arrayData: response.data.cameras,
              total: response.data.meta.total,
              totalPage: response.data.meta.total_page,
              page: page
            });
          });
        } else {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              arrayData: [].concat((0, _toConsumableArray2.default)(state.arrayData), (0, _toConsumableArray2.default)(response.data.cameras)),
              page: page
            });
          });
        }
      }).catch(function (error) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false,
            page: 1
          });
        });
      });
    };
    var loadCCTV = function loadCCTV(page, body) {
      (0, _$$_REQUIRE(_dependencyMap[14]).postCctvsResidents)('?page=' + page, body).then(function (response) {
        if (page === 1) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              arrayData: response.data.cameras,
              total: response.data.meta.total,
              totalPage: response.data.meta.total_page,
              page: page
            });
          });
        } else {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              arrayData: [].concat((0, _toConsumableArray2.default)(state.arrayData), (0, _toConsumableArray2.default)(response.data.cameras)),
              page: page
            });
          });
        }
      }).catch(function (error) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false,
            page: 1
          });
        });
      });
      limit = state.limit;
    };
    var renderItemShimmer = function renderItemShimmer(_ref) {
      var item = _ref.item,
        index = _ref.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.touchMenu, {
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(132)
        }]
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: styles.viewShimmer
      }), /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: styles.textShimmer
      }));
    };
    var renderItem = function renderItem(_ref2) {
      var item = _ref2.item,
        index = _ref2.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        activeOpacity: 1,
        style: styles.touchMenu,
        onPress: function onPress() {
          NavigatorService.navigate('DetailsCCTV', {
            item: item
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        resizeMode: "contain",
        source: {
          uri: item.source_url + '&mode=single'
        },
        style: styles.viewShimmer
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewTextPosition
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        numberOfLines: 1,
        ellipsizeMode: "tail",
        style: styles.textTitleMenu
      }, item.name)));
    };
    var renderHeader = function renderHeader() {
      var _state$tower;
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          marginBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
        }
      }, !state.loading && /*#__PURE__*/_react.default.createElement(_CustomComboBox.default, {
        darkMode: false,
        title: 'Cluster',
        desc: '',
        textPlaceholder: 'Pilih cluster',
        value: (_state$tower = state.tower) == null ? undefined : _state$tower.name,
        arrayData: state.arrTower,
        onSelected: function onSelected(item, index) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              tower: {
                id: item.id,
                name: item.name
              }
            });
          });
          if (index === 0) {
            loadCCTV(1, {
              filter: {
                cluster_id: []
              }
            });
            return;
          }
          var body = {
            filter: {
              cluster_id: [item.id]
            }
          };
          loadCCTV(1, body);
        }
      }));
    };
    var renderFooter = function renderFooter() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
        size: "large",
        color: state.darkMode ? 'white' : '#5AAA0F',
        style: {
          marginVertical: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
        }
      });
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'CCTV',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), !netInfo.isConnected ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewCenterNoConnecttion
    }, /*#__PURE__*/_react.default.createElement(_NoConnection.default, null)) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewTextTitle
    }, state.arrayData.length === 0 && !props.route.params.dataUser.is_a_resident && renderHeader(), state.arrayData.length === 0 && !state.loading ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewCenter
    }, /*#__PURE__*/_react.default.createElement(_Empty.default, {
      images: _$$_REQUIRE(_dependencyMap[16]).allLogo.imgEmptyNews,
      title: 'Belum ada cctv'
    })) : /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      showsVerticalScrollIndicator: false,
      showsHorizontalScrollIndicator: false,
      removeClippedSubviews: true,
      refreshControl: /*#__PURE__*/_react.default.createElement(_reactNative.RefreshControl, {
        refreshing: state.loading,
        onRefresh: function onRefresh() {
          if (props.route.params.dataUser.is_a_resident) {
            loadCCTVResident(1);
          } else {
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                loading: true,
                tower: {
                  id: 'allcluster',
                  name: 'SEMUA CLUSTER'
                }
              });
            });
            loadCCTV(1, {
              filter: {
                cluster_id: []
              }
            });
          }
        }
      }),
      onMomentumScrollEnd: function onMomentumScrollEnd(e) {
        var hasil = limit - e.nativeEvent.contentOffset.y / (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(120);
        if (hasil <= 13 && state.page < state.totalPage) {
          var page = state.page + 1;
          if (props.route.params.dataUser.is_a_resident) {
            loadCCTVResident(page);
          } else {
            loadCCTV(page, {
              filter: {
                cluster_id: []
              }
            });
          }
          limit += state.limit;
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      data: state.loading ? ['', '', '', '', '', '', '', ''] : state.arrayData,
      renderItem: state.loading ? renderItemShimmer : renderItem,
      numColumns: 2,
      ListHeaderComponent: function ListHeaderComponent() {
        return !props.route.params.dataUser.is_a_resident && renderHeader();
      },
      ListFooterComponent: state.page < state.totalPage ? renderFooter() : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48)
        }
      })
    }))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    viewTextTitle: {
      padding: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      width: width
    },
    touchMenu: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(2),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      alignItems: 'center',
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(148),
      height: 'auto',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      backgroundColor: 'white'
    },
    viewShimmer: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(148),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(100),
      resizeMode: 'cover',
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4)
    },
    textShimmer: {
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(124),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(2)
    },
    overlay: {
      position: 'absolute',
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(155),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(155),
      opacity: 0.5,
      backgroundColor: 'black'
    },
    viewTextPosition: {
      width: '100%',
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8)
    },
    textTitleMenu: {
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#000000',
      textAlign: 'center'
    },
    viewCenter: {
      height: height * 0.7,
      justifyContent: 'center',
      alignItems: 'center'
    },
    viewCenterNoConnecttion: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    }
  });
  var _default = exports.default = CCTVScreen;
