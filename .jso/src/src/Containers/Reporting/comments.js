  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _Empty = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _NoConnection = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[9]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var limit = 0;
  var CommentsScreen = function CommentsScreen(props) {
    var _state$dataUser, _state$dataUser2;
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[10]).useNetInfo)();
    var _useState = (0, _react.useState)({
        dataUser: props.route.params.dataUser,
        darkMode: false,
        comment: '',
        statusKeyboard: false,
        loadingSend: false,
        loadingDelete: false,
        arrayComments: [],
        page: 1,
        total: 0,
        totalPage: 0,
        perPage: 20,
        limit: 20,
        loadingComments: false,
        fadeAnim: new _reactNative.Animated.Value(0)
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      loadComment();
    }, []);
    var loadComment = function loadComment() {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loadingComments: state.page === 1 ? true : false
        });
      });
      var params = '/' + props.route.params.id + '?page=' + state.page + '&per_page=' + state.perPage;
      (0, _$$_REQUIRE(_dependencyMap[11]).getCommentComplaints)(params).then(function (response) {
        if (state.page === 1) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              loadingComments: false,
              arrayComments: response.data.comment_complaint_reports.map(function (data, index) {
                return Object.assign(Object.assign({}, data), {}, {
                  key: '' + index
                });
              }),
              total: response.data.meta.total,
              totalPage: response.data.meta.total_page
            });
          });
        } else {
          // @ts-expect-error TS(2345): Argument of type '(state: { dataUser: any; darkMod... Remove this comment to see the full error message
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              loadingComments: false,
              arrayComments: [].concat((0, _toConsumableArray2.default)(state.arrayComments), (0, _toConsumableArray2.default)(response.data.comment_complaint_reports))
            });
          });
        }
      }).catch(function (error) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false,
            loadingComments: false,
            arrayComments: []
          });
        });
      });
    };
    var send = function send() {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loadingSend: true
        });
      });
      var body = {
        message: state.comment,
        complaint_report_id: props.route.params.id
      };
      (0, _$$_REQUIRE(_dependencyMap[11]).postCommentComplaints)(body).then(function (response) {
        _reactNative.Keyboard.dismiss();
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loadingSend: false,
            comment: '',
            page: 1
          });
        });
        loadComment();
        //scroll.scrollTo()
      }).catch(function (error) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loadingSend: false
          });
        });
      });
    };
    var deleteComments = function deleteComments(id) {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loadingDelete: true
        });
      });
      (0, _$$_REQUIRE(_dependencyMap[11]).deleteCommentComplaints)('/' + id).then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loadingDelete: false,
            page: 1
          });
        });
        loadComment();
      }).catch(function (error) {
        // @ts-expect-error TS(2552): Cannot find name 'alert'. Did you mean 'Alert'?
        alert(error.data.message);
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loadingDelete: false
          });
        });
      });
    };
    var replaceStringTime = function replaceStringTime(time) {
      if (time.includes('beberapa detik')) {
        return 'Baru saja';
      } else if (time.includes('semenit')) {
        return '1mnt';
      } else if (time.includes('sejam')) {
        return '1 jam';
      } else if (time.includes('sehari')) {
        return '1 hari';
      } else if (time.includes('sebulan')) {
        return '1bln';
      } else if (time.includes('setahun')) {
        return '1thn';
      } else if (time.includes('detik')) {
        return time.split(' ')[0] + 'd';
      } else if (time.includes('menit')) {
        return time.split(' ')[0] + 'mnt';
      } else if (time.includes('jam')) {
        return time.split(' ')[0] + ' jam';
      } else if (time.includes('hari')) {
        return time.split(' ')[0] + ' hari';
      } else if (time.includes('bulan')) {
        return time.split(' ')[0] + 'bln';
      } else if (time.includes('tahun')) {
        return time.split(' ')[0] + 'thn';
      }
      return 'gagal';
    };
    var renderFooter = function renderFooter() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
        size: "large",
        color: state.darkMode ? 'white' : '#5AAA0F',
        style: {
          marginVertical: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24)
        }
      });
    };
    var _renderItem = function renderItem(data, rowMap) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.rowFront, {
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewUserName
      }, data.item.user.image_url === '' ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.imgDefault,
        style: styles.imgCommentUser
      }) : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: data.item.user.image_url
        },
        style: styles.imgCommentUser
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          flexDirection: 'row',
          alignItems: 'center'
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        numberOfLines: 1,
        allowFontScaling: false,
        ellipsizeMode: "tail",
        style: [styles.textName, {
          width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(120),
          color: state.darkMode ? '#ebebeb' : '#9B9F95'
        }]
      }, data.item.user.name), !data.item.user.is_a_resident && /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [styles.textName, {
          marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
          color: state.darkMode ? 'white' : '#9B9F95'
        }]
      }, ' ', "\u25CF"), !data.item.user.is_a_resident && /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        allowFontScaling: false,
        style: [styles.textName, {
          color: state.darkMode ? 'white' : '#006432',
          fontWeight: '500'
        }]
      }, "Pengelola")), /*#__PURE__*/_react.default.createElement(ViewMoreText, {
        textStyle: {
          marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
          width: width * 0.755
        },
        numberOfLines: 3,
        renderViewMore: function renderViewMore(onPress) {
          return /*#__PURE__*/_react.default.createElement(_CustomText.default, {
            textType: "semibold",
            allowFontScaling: false,
            style: styles.textMore,
            onPress: onPress
          }, "Lihat lebih banyak");
        },
        renderViewLess: function renderViewLess(onPress) {
          return /*#__PURE__*/_react.default.createElement(_CustomText.default, {
            textType: "semibold",
            allowFontScaling: false,
            style: styles.textMore,
            onPress: onPress
          }, "Lihat lebih sedikit");
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        style: [styles.textMessage, {
          color: state.darkMode ? 'white' : '#000000'
        }],
        ellipsizeMode: "tail"
      }, data.item.message)))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        allowFontScaling: false,
        style: [styles.textTime, {
          color: state.darkMode ? '#d6d6d6' : '#9B9F95'
        }]
      }, replaceStringTime((0, _moment.default)(data.item.created_at).fromNow())));
    };
    var closeRow = function closeRow(rowMap, rowKey) {
      if (rowMap[rowKey]) {
        rowMap[rowKey].closeRow();
      }
    };
    var renderHiddenItem = function renderHiddenItem(data, rowMap) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.rowBack, {
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(60)
        }
      }, state.loadingDelete ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.touchDelete
      }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
        size: "small",
        color: "white"
      })) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchDelete,
        onPress: function onPress() {
          _reactNative.Alert.alert('Hapus komentar', 'Anda yakin ingin menghapus komentar ini?', [{
            text: 'Batal',
            onPress: function onPress() {}
          }, {
            text: 'Hapus',
            onPress: function onPress() {
              deleteComments(data.item.id);
              closeRow(rowMap, data.item.key);
            },
            style: 'destructive'
          }]);
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icDelete,
        style: styles.icCommentDelete
      }))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Komentar',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.viewArrayStatus, {
        backgroundColor: state.darkMode ? '#121212' : '#F6F6F8'
      }]
    }, !netInfo.isConnected ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewCenterLoading
    }, /*#__PURE__*/_react.default.createElement(_NoConnection.default, null)) : state.total === 0 && state.loadingComments ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewEmpty
    }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
      size: "large",
      color: state.darkMode ? 'white' : '#5AAA0F'
    })) : state.total === 0 ? /*#__PURE__*/_react.default.createElement(_Empty.default, {
      title: 'Belum ada komentar',
      subtitle: 'Mulai percakapan dengan pengelola',
      images: _$$_REQUIRE(_dependencyMap[13]).allLogo.imgEmptyNews
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      removeClippedSubviews: true,
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      refreshControl: /*#__PURE__*/_react.default.createElement(_reactNative.RefreshControl, {
        refreshing: state.loadingComments,
        onRefresh: function onRefresh() {
          limit = 0, setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              total: 0,
              totalPage: 0,
              arrayComments: [],
              page: 1
            });
          });
          // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
          loadComment(state.page);
        }
      }),
      onMomentumScrollEnd: function onMomentumScrollEnd(e) {
        var paddingToBottom =
        // @ts-expect-error TS(2339): Property 'activeSearch' does not exist on type '{ ... Remove this comment to see the full error message
        state.activeSearch && state.searchValue !== '' ? (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(99) : (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(127);
        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
        if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
          var page = state.page++;
          // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
          loadComment(page);
          limit += state.limit;
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_$$_REQUIRE(_dependencyMap[14]).SwipeListView, {
      data: state.arrayComments,
      renderItem: function renderItem(rowData, rowMap) {
        return (
          /*#__PURE__*/
          // @ts-expect-error TS(2769): No overload matches this call.
          _react.default.createElement(_$$_REQUIRE(_dependencyMap[14]).SwipeRow, {
            disableLeftSwipe: state.dataUser.id !== rowData.item.user.id,
            rightOpenValue: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(-60),
            disableRightSwipe: true
          }, renderHiddenItem(rowData, rowMap), _renderItem(rowData, rowMap))
        );
      },
      ListFooterComponent: state.page < state.totalPage ? renderFooter() : /*#__PURE__*/_react.default.createElement(_reactNative.View, null)
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(120)
      }
    }))), /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
      behavior: _reactNative.Platform.OS === 'ios' ? 'position' : null,
      keyboardVerticalOffset: (0, _$$_REQUIRE(_dependencyMap[15]).isIphoneX)() ? (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(-20) : (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(0)
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.modalFooter, {
        backgroundColor: state.darkMode ? '#121212' : 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            modalVisibleInput: true
          });
        });
      }
    }, ((_state$dataUser = state.dataUser) == null ? undefined : _state$dataUser.image_url) === '' ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: styles.imgUser,
      source: _$$_REQUIRE(_dependencyMap[13]).allLogo.imgDefault
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: styles.imgUser,
      source: {
        uri: (_state$dataUser2 = state.dataUser) == null ? undefined : _state$dataUser2.image_url
      }
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.viewText, {
        backgroundColor: state.darkMode ? '#1C1C1E' : '#F3F5F6'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
      onChangeText: function onChangeText(response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            comment: response
          });
        });
      },
      onSubmitEditing: function onSubmitEditing() {
        send();
      },
      returnKeyType: 'send',
      maxLength: 150
      //multiline={true}
      ,
      autoCapitalize: 'none',
      underlineColorAndroid: 'transparent',
      value: state.comment,
      style: [styles.textInput, {
        color: state.darkMode ? 'white' : '#35405A'
      }],
      placeholderTextColor: '#CCCFC9',
      placeholder: 'Tulis komentar Anda disini... '
    })), state.comment.length !== 0 ? state.loadingSend ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.touchPost
    }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
      size: "small",
      color: "#5AAA0F"
    })) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchPost,
      onPress: function onPress() {
        return send();
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "medium",
      allowFontScaling: false,
      style: [styles.textPost, {
        color: '#5AAA0F'
      }]
    }, "Kirim")) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingBottom: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12) : 0
    },
    modalFooter: {
      width: width,
      backgroundColor: 'white',
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(1),
      borderTopColor: '#838A9A40',
      flexDirection: 'row',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      paddingBottom: _reactNative.Platform.OS === 'android' ? 0 : (0, _$$_REQUIRE(_dependencyMap[15]).isIphoneX)() ? (0, _$$_REQUIRE(_dependencyMap[15]).getBottomSpace)() : (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10)
    },
    imgUser: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20)
    },
    touchPost: {
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      top: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24)
    },
    textPost: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      color: '#5AAA0F',
      fontWeight: '600'
    },
    bgShadow: {
      width: width,
      height: height,
      backgroundColor: '#0000004D'
    },
    textMore: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      //fontFamily: 'Montserrat-SemiBold',
      color: '#56a7d4',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2)
    },
    rowFront: {
      width: width,
      backgroundColor: 'white',
      flexDirection: 'row',
      //alignItems: 'center',
      height: 'auto',
      justifyContent: 'space-between',
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12)
    },
    imgCommentUser: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16)
    },
    textName: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      color: '#788F9C',
      fontWeight: '600'
    },
    textMessage: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#000000',
      fontWeight: '400'
    },
    textTime: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      color: '#788F9C',
      fontWeight: '400',
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(16),
      top: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12)
    },
    viewUserName: {
      flexDirection: 'row'
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: 'white',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    touchDelete: {
      flex: 1,
      backgroundColor: '#EE4040',
      justifyContent: 'center',
      alignItems: 'center'
    },
    icCommentDelete: {
      tintColor: 'white',
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(26.67),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(26.67)
    },
    viewArrayStatus: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F6F6F8'
    },
    viewEmpty: {
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(-24)
    },
    textBelum: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#35405A',
      fontWeight: '500'
    },
    textMulai: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#838A9A',
      fontWeight: '400',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(6)
    },
    viewText: {
      width: '86%',
      height: 'auto',
      backgroundColor: '#F3F5F6',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(2)
    },
    textInput: {
      flex: 1,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      fontFamily: 'Poppins-Regular',
      fontWeight: '400',
      color: '#273238',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      width: width * 0.61
    },
    viewCenterLoading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f7f8'
    }
  });
  var _default = exports.default = CommentsScreen;
