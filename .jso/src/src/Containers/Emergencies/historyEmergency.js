  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _Empty = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _NoConnection = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[11]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[12]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);

  // import firebase from 'react-native-firebase'

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var HistoryEmergencyScreen = function HistoryEmergencyScreen(_ref) {
    var navigation = _ref.navigation;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isDarkMode = _useState2[0],
      setDarkMode = _useState2[1];
    var _useState3 = (0, _react.useState)({
        filter: 'all',
        page: 1,
        total: 0,
        totalPage: 0,
        limit: 20,
        arrayData: [],
        item: {},
        isLoading: false,
        loadingType: '',
        messages: '',
        connection: true
      }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      state = _useState4[0],
      setState = _useState4[1];
    (0, _react.useEffect)(function () {
      loadEmergency();
    }, []);
    (0, _react.useEffect)(function () {
      if (state.isLoading) {
        switch (state.loadingType) {
          case 'listHistory':
            fetchHistoryEmergency();
          default:
            break;
        }
      }
    }, [state.isLoading]);
    var fetchHistoryEmergency = function fetchHistoryEmergency() {
      var params = '?page=' + state.page;
      (0, _$$_REQUIRE(_dependencyMap[13]).getEmergencyHistory)().then(function (response) {
        if (state.page === 1) {
          setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoading: false,
              arrayData: response.data.emergencies,
              // total: response.data.meta.total,
              // totalPage: response.data.meta.total_page,
              total: 20,
              totalPage: 1
            });
          });
        } else {
          setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              arrayData: [].concat((0, _toConsumableArray2.default)(state.arrayData), (0, _toConsumableArray2.default)(response.data.emergencies))
            });
          });
        }
      }).catch(function (error) {
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            arrayData: [],
            isLoading: false,
            messages: error.data.result
          });
        });
      });
    };
    var loadEmergency = function loadEmergency() {
      setState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isLoading: true,
          loadingType: 'listHistory'
        });
      });
    };
    var handleSelectItem = function handleSelectItem(item) {
      NavigatorService.navigate('DetailHistoryEmergency', {
        emergencyId: item.id
      });
    };
    var changeTextStatus = function changeTextStatus(text) {
      switch (text) {
        case 'Request':
          return 'Menunggu Respon';
        case 'Proses':
          return 'Proses';
        case 'Selesai':
          return 'Selesai';
        case 'Batal':
          return 'Batal';
        case 'Invalid':
          return 'Invalid';
        default:
          break;
      }
    };
    var changeColorStatus = function changeColorStatus(name) {
      switch (name) {
        case 'Request':
          return '#EE4040';
        case 'Proses':
          return '#f2c141';
        case 'Selesai':
          return '#8FB339';
        case 'Batal':
          return '#6b7b83';
        case 'Invalid':
          return '#f53c3c';
        default:
          break;
      }
    };
    var changeWidthStatus = function changeWidthStatus(name) {
      switch (name) {
        case 'Request':
          return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(135);
        case 'Proses':
          return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(70);
        case 'Selesai':
          return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(65);
        case 'Batal':
          return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(50);
        case 'Invalid':
          return (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(60);
        default:
          break;
      }
    };
    var ShimmerView = function ShimmerView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.containerItem, {
          backgroundColor: isDarkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.cards, {
          backgroundColor: isDarkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(120)
        }
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(100)
        }
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(120)
        }
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(90)
        }
      })))), /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(70),
          position: 'absolute',
          right: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
          top: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(26)
        }
      }), /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(100),
          height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(30),
          position: 'absolute',
          right: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
          bottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0)
        }
      })));
    };
    var ItemView = function ItemView(_ref2) {
      var item = _ref2.item,
        index = _ref2.index;
      var id = item.id;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return handleSelectItem(item);
        },
        activeOpacity: isDarkMode ? 1 : 0.2,
        style: [styles.containerItem, {
          backgroundColor: isDarkMode ? '#121212' : 'white'
          // height: toDp(100)
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.cards, {
          backgroundColor: isDarkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[15]).allLogo.icCalendar,
        style: [styles.icCalendar, {
          tintColor: isDarkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.text, {
          color: isDarkMode ? 'white' : '#37474f'
        }]
      }, (0, _moment.default)(item.created_at).format('DD MMMM YYYY, HH:mm'), " WIB")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewRowItem, {
          alignItems: 'flex-start'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[15]).allLogo.icHomeCluster,
        style: [styles.icLp, {
          tintColor: isDarkMode ? 'white' : '#9B9F95'
        }]
      }), item.user.unit === null ? /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.text, {
          color: isDarkMode ? 'white' : '#37474f'
        }]
      }, '-') : /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.text, {
          color: isDarkMode ? 'white' : '#37474f',
          width: width * 0.8
        }]
      }, (item.unit && item.unit.code) + '/' + (item.unit && item.unit.unit_name))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewStatus, {
          width: changeWidthStatus(item.emergency_status),
          backgroundColor: changeColorStatus(item.emergency_status)
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: styles.textStatus
      }, changeTextStatus(item.emergency_status))))))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: isDarkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.isLoading
    }), !state.connection ? /*#__PURE__*/_react.default.createElement(_NoConnection.default, null) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.content, {
        backgroundColor: isDarkMode ? '#121212' : '#f5f7f8'
      }]
    }, state.arrayData && state.arrayData.length === 0 && !state.isLoading ? /*#__PURE__*/_react.default.createElement(_Empty.default, {
      images: _$$_REQUIRE(_dependencyMap[15]).allLogo.icEmptyList,
      title: 'Belum ada panggilan emergency',
      subtitle: 'Selalu siap siaga untuk merespon panggilan emergency dari penghuni'
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      removeClippedSubviews: true
      // ref={(c) => {this.scroll = c}}
      ,
      refreshControl: /*#__PURE__*/_react.default.createElement(_reactNative.RefreshControl, {
        refreshing: state.isLoading,
        onRefresh: function onRefresh() {
          setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              total: 0,
              totalPage: 0,
              arrayData: [],
              page: 1,
              loadingType: 'listHistory'
            });
          });
          //should fetch emergency list after isLoading re render
          loadEmergency();
        }
      }),
      onMomentumScrollEnd: function onMomentumScrollEnd(e) {
        // let hasil = limit - parseInt(e.nativeEvent.contentOffset.y / toDp(127))
        // if ((hasil <= 5) && (state.page < state.totalPage)) {
        //     //if(state.totalPage != state.page) {
        //     let page = state.page++
        //     //should load emergency without loading
        //     loadEmergency()
        //     limit += state.limit
        // } else {
        //     console.log('MASUK ELSE');
        // }
        // console.log('state.page', state.page);
        // console.log('TOTAL PAGE', state.totalPage);
        // console.log('LIMIT', limit);
        // console.log('arrayData.length', state.arrayData.length);
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      removeClippedSubviews: true,
      data: state.isLoading ? ['', '', '', '', ''] : state.arrayData,
      renderItem: state.isLoading ? ShimmerView : ItemView,
      ListFooterComponent: /*#__PURE__*/_react.default.createElement(_reactNative.View, null)
      // ListFooterComponent={state.page < state.totalPage ? FooterView() : <View />}
    }))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    headeriOS: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    linearFab: {
      padding: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(28),
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(56),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(56),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 1.0,
      elevation: 4,
      position: 'absolute',
      bottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      right: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      zIndex: 1
    },
    fabAdd: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    icAdd: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(36),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(36),
      tintColor: 'white'
    },
    header: {
      width: width,
      height: 'auto',
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      borderBottomColor: '#5AAA0F',
      backgroundColor: 'white'
    },
    linearHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(60)
    },
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      position: 'absolute',
      left: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      zIndex: 1
    },
    icBack: {
      //marginHorizontal: toDp(8),
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      tintColor: '#5AAA0F'
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    icFilter: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      tintColor: '#5AAA0F'
    },
    title: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(18)
    },
    content: {
      flex: 1,
      backgroundColor: '#f5f7f8'
    },
    containerItem: {
      width: width,
      height: 'auto',
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(2),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(30)
      //paddingHorizontal: toDp(8)
    },
    cards: {
      width: '100%',
      height: 'auto',
      backgroundColor: '#FFFFFF',
      alignItems: 'flex-start'
    },
    cardHeader: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    months: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      color: '#333'
    },
    price: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(18),
      color: '#333'
    },
    cardDate: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    logo: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(25),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(25),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(5),
      alignItems: 'center',
      justifyContent: 'center'
    },
    icon: {
      maxWidth: '100%',
      resizeMode: 'contain'
    },
    cardDetails: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      width: '100%',
      flexDirection: 'row'
    },
    date: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: '#666',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20)
    },
    invoiceNumber: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#666',
      alignItems: 'flex-start'
    },
    touchFunction: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
    },
    textTitleFunction: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#5AAA0F'
    },
    logoContainer: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      alignItems: 'center',
      justifyContent: 'center'
    },
    iconNext: {
      maxHeight: '100%',
      resizeMode: 'contain',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12)
    },
    due: {
      color: 'red',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12)
    },
    viewCenter: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingShimmer: {
      width: '95%',
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(110),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(5),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    textName: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      color: '#616161',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    textPosition: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: '#BDBDBD',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
    },
    containerDesc: {
      width: width * 0.906,
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      backgroundColor: 'transparent',
      justifyContent: 'space-between'
    },
    titleContent: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(18),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(6),
      textAlign: 'center',
      color: '#333333'
    },
    textContent: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      color: '#333333',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      textAlign: 'center'
    },
    profile: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40)
    },
    imageContent: {
      //height: height / 2,
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(328),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      width: width * 0.906,
      resizeMode: 'contain'
    },
    //ZAINI
    viewRow: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10)
    },
    imgPicture: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(95),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(95),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12)
    },
    labelpic: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24)
    },
    itemTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#273238',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(-4),
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(212)
    },
    viewRowItem: {
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      alignItems: 'center'
    },
    itemContent: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#333333'
    },
    viewTitleContent: {
      width: '100%',
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    itemDate: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#4b5a74',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4)
    },
    itemLocation: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: '#4b5a74',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    icCalendar: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
    },
    icLp: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
    },
    text: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#000000',
      letterSpacing: 0
    },
    viewStatus: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(56),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(11),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      alignSelf: 'flex-start'
    },
    textStatus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: '#FFFFFF'
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
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(210),
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.6),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4)
    },
    icSilangModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      tintColor: '#5AAA0F'
    },
    viewArrayStatus: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24)
    },
    touchStatus: {
      width: 'auto',
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(45),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      backgroundColor: '#91743819',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      borderColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    textStatusItem: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: '#5AAA0F'
    },
    lineCenter: {
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    lineModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(64),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(7)
    },
    icUser: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
    },
    itemRow: {
      //backgroundColor: 'cyan',
      width: '87%',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center'
    },
    touchTindak: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(130),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(30),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      right: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      bottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0)
    },
    textTindak: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: 'white',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.06)
    },
    touchSelesai: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(71),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(30),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: 'white',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      borderColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      right: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      bottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0)
    },
    textSelesai: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.06)
    },
    icPhone2: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    }
  });
  var _default = exports.default = HistoryEmergencyScreen;
