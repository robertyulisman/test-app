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
  var _Empty = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[12]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[13]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);

  // import firebase from 'react-native-firebase'

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var limit = 0;
  var ListEmergencyScreen = function ListEmergencyScreen(_ref) {
    var navigation = _ref.navigation;
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[14]).useNetInfo)();
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
        activeStatus: 'Semua',
        activeIdStatus: [],
        arrayStatus: ['Semua'],
        arrayData: [],
        item: {},
        isLoading: false,
        loadingType: '',
        messages: '',
        connection: true,
        isModalFilterActive: false,
        isModalFuctionActive: false
      }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      state = _useState4[0],
      setState = _useState4[1];
    (0, _react.useEffect)(function () {
      getAllLoadData();
    }, []);
    (0, _react.useEffect)(function () {
      if (state.isLoading) {
        switch (state.loadingType) {
          case 'listEmergency':
            fetchEmergencies();
          default:
        }
      }
    }, [state.isLoading]);
    var fetchEmergencies = function fetchEmergencies() {
      var params = '?page=' + state.page;
      var data = {
        filter: {
          emergency_status: state.activeStatus === 'Semua' ? [] : state.activeStatus
        }
      };
      (0, _$$_REQUIRE(_dependencyMap[15]).getEmergency)(params, data).then(function (response) {
        if (state.page === 1) {
          setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isLoading: false,
              arrayData: response.data.emergencies,
              total: response.data.meta.total,
              totalPage: response.data.meta.total_page
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
            isLoading: false
          });
        });
      });
    };
    var getAllLoadData = function getAllLoadData() {
      (0, _$$_REQUIRE(_dependencyMap[15]).getEmergencyStatuses)().then(function (response) {
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            arrayStatus: ['Semua'].concat((0, _toConsumableArray2.default)(response.data.emergency_statuses))
          });
        });
      }).catch(function (error) {});
      loadEmergency();
    };
    var loadEmergency = function loadEmergency() {
      setState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          isLoading: true,
          loadingType: 'listEmergency'
        });
      });
    };
    var refreshList = function refreshList() {
      setState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          total: 0,
          totalPage: 0,
          arrayData: [],
          page: 1,
          loadingType: 'listEmergency',
          isLoading: true
        });
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
          return (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(135);
        case 'Proses':
          return (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(60);
        case 'Selesai':
          return (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(65);
        case 'Batal':
          return (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(50);
        case 'Invalid':
          return (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(60);
        default:
          break;
      }
    };
    var ModalFilterView = function ModalFilterView() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        onSwipeComplete: function onSwipeComplete() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isModalFilterActive: false
            });
          });
        },
        swipeDirection: ['down'],
        onBackdropPress: function onBackdropPress() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isModalFilterActive: false
            });
          });
        },
        isVisible: state.isModalFilterActive,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBox, {
          backgroundColor: isDarkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.lineCenter
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.lineModal
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewModalTitle
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitleModal, {
          color: isDarkMode ? 'white' : '#263238'
        }]
      }, "FILTER")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewArrayStatus
      }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
        data: state.arrayStatus,
        renderItem: StatusView,
        numColumns: 3
      })))));
    };
    var ModalFunctionView = function ModalFunctionView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null);
    };
    var handleSelectFilter = function handleSelectFilter(item) {
      setState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          activeIdStatus: [item.id],
          activeStatus: item,
          isModalFilterActive: false,
          page: 1,
          limit: 20,
          arrayData: [],
          isLoading: true,
          loadingType: 'listEmergency'
        });
      });
    };
    var StatusView = function StatusView(_ref2) {
      var item = _ref2.item,
        index = _ref2.index;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return handleSelectFilter(item);
        },
        style: [styles.touchStatus, {
          backgroundColor: item == state.activeStatus ? '#91743819' : isDarkMode ? '#1C1C1E' : '#ffffff',
          borderColor: item === state.activeStatus ? '#5AAA0F' : isDarkMode ? '#1C1C1E' : '#d3d6db'
        }]
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        style: [styles.textStatusItem, {
          color: item === state.activeStatus ? '#5AAA0F' : isDarkMode ? 'white' : '#788f9c'
        }]
      }, item));
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
          width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(120)
        }
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(100)
        }
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(120)
        }
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(90)
        }
      })))), /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(70),
          position: 'absolute',
          right: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
          top: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(26)
        }
      }), /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(100),
          height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(30),
          position: 'absolute',
          right: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
          bottom: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0)
        }
      })));
    };
    var handleSelectItem = function handleSelectItem(item) {
      if (item.emergency_status == 'Request') {
        NavigatorService.navigate('NotifDarurat', {
          emergencyData: Object.assign(Object.assign({}, item), {}, {
            refreshData: refreshList
          })
        });
      } else {
        NavigatorService.navigate('DetailEmergency', {
          emergencyData: {
            id: item.id,
            refreshData: refreshList
          }
        });
      }
    };
    var ItemView = function ItemView(_ref3) {
      var item = _ref3.item,
        index = _ref3.index;
      var id = item.id;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return handleSelectItem(item);
        },
        activeOpacity: isDarkMode ? 1 : 0.2,
        style: [styles.containerItem, {
          backgroundColor: isDarkMode ? '#121212' : 'white'
          // height: toDp(160)
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.cards, {
          backgroundColor: isDarkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.itemRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewRowItem, {
          marginTop: 0
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icUser,
        style: [styles.icUser, {
          tintColor: isDarkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.text, {
          color: isDarkMode ? 'white' : '#383B34'
        }]
      }, item.user.name))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icPhoneAndroid,
        style: [styles.icPhoneAndroid, {
          tintColor: isDarkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.text, {
          color: isDarkMode ? 'white' : '#383B34'
        }]
      }, item.user.phone)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewRowItem, {
          alignItems: 'flex-start'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icHomeCluster,
        style: [styles.icLp, {
          tintColor: isDarkMode ? 'white' : '#9B9F95'
        }]
      }), item.user.unit === null ? /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.text, {
          color: isDarkMode ? 'white' : '#383B34'
        }]
      }, '-') : /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.text, {
          color: isDarkMode ? 'white' : '#383B34',
          width: width * 0.8
        }]
      }, (item.unit && item.unit.code) + '/' + (item.unit && item.unit.unit_name))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRowItem
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icCalendar,
        style: [styles.icCalendar, {
          tintColor: isDarkMode ? 'white' : '#9B9F95'
        }]
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.text, {
          color: isDarkMode ? 'white' : '#383B34'
        }]
      }, (0, _moment.default)(item.created_at).format('DD MMMM YYYY'))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
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
    var FooterView = function FooterView() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
        size: "large",
        color: isDarkMode ? 'white' : '#5AAA0F',
        style: {
          marginVertical: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24)
        }
      });
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: [styles.container, {
        backgroundColor: isDarkMode ? '#121212' : 'white'
      }]
    }, ModalFilterView(), ModalFunctionView(), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.isLoading
    }), /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
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
        return navigation.goBack();
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icBack,
      style: [styles.icBack, {
        tintColor: isDarkMode ? 'white' : '#383B34'
      }]
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.linearHeader
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "medium",
      style: [styles.title]
    }, 'Emergency')), state.connection && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchHeaderSearch,
      onPress: function onPress() {
        return setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isModalFilterActive: true
          });
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[17]).allLogo.icFilter,
      style: [styles.icFilter, {
        tintColor: isDarkMode ? 'white' : '#383B34'
      }]
    }))), !netInfo.isConnected ? /*#__PURE__*/_react.default.createElement(_NoConnection.default, null) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.content, {
        backgroundColor: isDarkMode ? '#121212' : '#f5f7f8'
      }]
    }, state.arrayData && state.arrayData.length === 0 && !state.isLoading ? /*#__PURE__*/_react.default.createElement(_Empty.default, {
      title: 'Belum ada panggilan emergency',
      subtitle: 'Selalu siap siaga untuk merespon panggilan emergency dari penghuni'
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      removeClippedSubviews: true
      // ref={(c) => {this.scroll = c}}
      ,
      refreshControl: /*#__PURE__*/_react.default.createElement(_reactNative.RefreshControl, {
        refreshing: state.isLoading,
        onRefresh: function onRefresh() {
          limit = 0, setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              total: 0,
              totalPage: 0,
              arrayData: [],
              page: 1,
              loadingType: 'listEmergency'
            });
          });
          //should fetch emergency list after isLoading re render
          loadEmergency();
        }
      }),
      onMomentumScrollEnd: function onMomentumScrollEnd(e) {
        var hasil = limit - e.nativeEvent.contentOffset.y / (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(127);
        if (hasil <= 5 && state.page < state.totalPage) {
          //if(state.totalPage != state.page) {
          var page = state.page++;
          //should load emergency without loading
          fetchEmergencies();
          limit += state.limit;
        } else {}
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      removeClippedSubviews: true,
      data: state.isLoading ? ['', '', '', '', ''] : state.arrayData,
      renderItem: state.isLoading ? ShimmerView : ItemView,
      ListFooterComponent: state.page < state.totalPage ? FooterView() : /*#__PURE__*/_react.default.createElement(_reactNative.View, null)
    }))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(28) : 0
    },
    headeriOS: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
      backgroundColor: '#5AAA0F'
    },
    linearFab: {
      padding: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(28),
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(56),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(56),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 1.0,
      elevation: 4,
      position: 'absolute',
      bottom: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      right: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      zIndex: 1
    },
    fabAdd: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    icAdd: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(36),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(36),
      tintColor: 'white'
    },
    header: {
      width: width,
      height: 'auto',
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1),
      borderBottomColor: '#121212',
      backgroundColor: 'white'
    },
    linearHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(60)
    },
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4),
      position: 'absolute',
      left: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      zIndex: 1
    },
    icBack: {
      //marginHorizontal: toDp(8),
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      tintColor: '#5AAA0F'
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    icFilter: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      tintColor: '#5AAA0F'
    },
    title: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(18)
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
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(2),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(30)
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
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    months: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      color: '#333'
    },
    price: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(18),
      color: '#333'
    },
    cardDate: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    logo: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(25),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(25),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(5),
      alignItems: 'center',
      justifyContent: 'center'
    },
    icon: {
      maxWidth: '100%',
      resizeMode: 'contain'
    },
    cardDetails: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10),
      width: '100%',
      flexDirection: 'row'
    },
    date: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      color: '#666',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20)
    },
    invoiceNumber: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      color: '#666',
      alignItems: 'flex-start'
    },
    touchFunction: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8),
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8)
    },
    textTitleFunction: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      color: '#5AAA0F'
    },
    logoContainer: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      alignItems: 'center',
      justifyContent: 'center'
    },
    iconNext: {
      maxHeight: '100%',
      resizeMode: 'contain',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12)
    },
    due: {
      color: 'red',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12)
    },
    viewCenter: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingShimmer: {
      width: '95%',
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(110),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(5),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    textName: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8),
      color: '#616161',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    textPosition: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      color: '#BDBDBD',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8)
    },
    containerDesc: {
      width: width * 0.906,
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      backgroundColor: 'transparent',
      justifyContent: 'space-between'
    },
    titleContent: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(18),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(6),
      textAlign: 'center',
      color: '#333333'
    },
    textContent: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      color: '#333333',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10),
      textAlign: 'center'
    },
    profile: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(40)
    },
    imageContent: {
      //height: height / 2,
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(328),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8),
      width: width * 0.906,
      resizeMode: 'contain'
    },
    //ZAINI
    viewRow: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    imgPicture: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(95),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(95),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12)
    },
    labelpic: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24)
    },
    itemTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      color: '#273238',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(-4),
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(212)
    },
    viewRowItem: {
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8),
      alignItems: 'center'
    },
    itemContent: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      color: '#333333'
    },
    viewTitleContent: {
      width: '100%',
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    itemDate: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      color: '#4b5a74',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4)
    },
    itemLocation: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      color: '#4b5a74',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    icCalendar: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8)
    },
    icLp: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8)
    },
    text: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      color: '#383B34',
      letterSpacing: 0
    },
    viewStatus: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(56),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(11),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      alignSelf: 'flex-start'
    },
    textStatus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
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
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(210),
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.6),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4)
    },
    icSilangModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
      tintColor: '#5AAA0F'
    },
    viewArrayStatus: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(24)
    },
    touchStatus: {
      width: 'auto',
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(40),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(14),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(45),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      backgroundColor: '#91743819',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1),
      borderColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    textStatusItem: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      color: '#5AAA0F'
    },
    lineCenter: {
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    },
    lineModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(64),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(7)
    },
    icUser: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(8)
    },
    icPhoneAndroid: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(10),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(3)
    },
    itemRow: {
      //backgroundColor: 'cyan',
      width: '87%',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center'
    },
    touchTindak: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(130),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(30),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4),
      right: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
      bottom: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0)
    },
    textTindak: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      color: 'white',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.06)
    },
    touchSelesai: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(71),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(30),
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: 'white',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(1),
      borderColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(4),
      right: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(20),
      bottom: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0)
    },
    textSelesai: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(12),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(0.06)
    },
    icPhone2: {
      width: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[16]).toDp)(16)
    }
  });
  var _default = exports.default = ListEmergencyScreen;
