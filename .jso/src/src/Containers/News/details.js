  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[5]);
  var _asyncStorage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _Loader = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNativeImageViewing = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _reactNativeRenderHtml = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _Toast = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[14]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  //import ViewMoreText from '@ViewMoreText'

  // import localization from 'moment/locale/id';

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var computeEmbeddedMaxWidth = function computeEmbeddedMaxWidth(availableWidth) {
    return Math.min(availableWidth, 500);
  };
  var limit = 0;
  var DetailsNewsScreen = function DetailsNewsScreen(props) {
    var _state$item5, _state$item6, _state$item7, _state$item8, _state$item9, _state$item10, _state$item11, _state$item12, _state$item13, _state$item14, _state$item15, _state$item16, _state$item18, _state$item24, _state$item25, _state$item26, _state$item27;
    var toast = (0, _react.useRef)(null);
    var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      images = _useState2[0],
      setImages = _useState2[1];
    var _useState3 = (0, _react.useState)({
        dataUser: {},
        isImageViewVisible: false,
        webViewHeight: 0,
        status: false,
        modalVisible: false,
        item: null,
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
        fadeAnim: new _reactNative.Animated.Value(0),
        hide: true
      }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      state = _useState4[0],
      setState = _useState4[1];
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
      loadUser();
      load();
      loadComment();
      limit = state.limit;
    }, []);
    (0, _react.useEffect)(function () {
      var keyboardDidShowListener = _reactNative.Keyboard.addListener('keyboardDidShow', function () {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            statusKeyboard: true
          });
        });
        _reactNative.Animated.timing(state.fadeAnim, {
          toValue: 1,
          duration: 100
        }).start();
      });
      var keyboardDidHideListener = _reactNative.Keyboard.addListener('keyboardDidHide', function () {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            statusKeyboard: false
          });
        });
        _reactNative.Animated.timing(state.fadeAnim, {
          toValue: 0,
          duration: 100
        }).start();
      });
      return function () {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);
    var loadComment = function loadComment() {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loadingComments: state.page === 1 ? true : false
        });
      });
      var params = '/' + props.route.params.id + '?page=' + state.page + '&per_page=' + state.perPage;
      (0, _$$_REQUIRE(_dependencyMap[16]).getCommentNews)(params).then(function (response) {
        if (state.page === 1) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              loadingComments: false,
              arrayComments: response.data.comment_news_articles.map(function (data, index) {
                return Object.assign(Object.assign({}, data), {}, {
                  key: '' + index
                });
              }),
              total: response.data.meta.total,
              totalPage: response.data.meta.total_page
            });
          });
          if (props.route.params.from === 'comment_news_article') {
            setTimeout(function () {
              setState(function (state) {
                return Object.assign(Object.assign({}, state), {}, {
                  loadingComments: false,
                  modalVisible: true
                });
              });
            }, 500);
          }
        } else {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              loadingComments: false,
              arrayComments: [].concat((0, _toConsumableArray2.default)(state.arrayComments), (0, _toConsumableArray2.default)(response.data.comment_news_articles))
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
    var loadUser = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)(function* () {
        var dataUser = yield _asyncStorage.default.getItem('dataUser');
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
    var load = function load() {
      (0, _$$_REQUIRE(_dependencyMap[16]).getNewArticle)('/' + props.route.params.id).then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            item: response.data.news_article,
            loading: false,
            status: response.data.news_article.is_published
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
    var changeColorStatus = function changeColorStatus(name) {
      if (name === 'Aktivitas') {
        return '#f2c141';
      } else if (name === 'Pengumuman') {
        return '#28a595';
      } else if (name === 'Promo') {
        return '#0186d5';
      }
    };
    var changeWidthStatus = function changeWidthStatus(name) {
      if (name === 'Aktivitas') {
        return (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(74);
      } else if (name === 'Pengumuman') {
        return (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(110);
      } else if (name === 'Promo') {
        return (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(63);
      }
    };
    var deleteComment = function deleteComment(id) {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loadingDelete: true
        });
      });
      (0, _$$_REQUIRE(_dependencyMap[16]).deleteCommentNews)('/' + id).then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loadingDelete: false,
            page: 1
          });
        });
        loadComment();
      }).catch(function (error) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loadingDelete: false
          });
        });
      });
    };
    var like = function like(countLike, is_liked) {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          item: Object.assign(Object.assign({}, state.item), {}, {
            like: !is_liked ? countLike + 1 : countLike - 1,
            is_liked: !is_liked
          })
        });
      });
    };
    var setStatus = function setStatus() {
      var _state$item;
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          status: !state.status
        });
      });
      (0, _$$_REQUIRE(_dependencyMap[16]).putNewsToggle)('/' + ((_state$item = state.item) == null ? undefined : _state$item.id)).then(function (response) {
        props.route.params.loadNews();
      }).catch(function (error) {});
    };
    var _renderItem = function renderItem(data, rowMap) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.rowFront, {
          backgroundColor: 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewUserName
      }, data.item.user.image_url === '' ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.imgDefault,
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
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(120),
          color: '#9B9F95'
        }]
      }, data.item.user.name), !data.item.user.is_a_resident && /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "medium",
        allowFontScaling: false,
        style: [styles.textName, {
          color: '#006432'
        }]
      }, "Pengelola")), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textMessage, {
          color: '#000000'
        }],
        numberOfLines: 6,
        allowFontScaling: false,
        ellipsizeMode: "tail"
      }, data.item.message))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        allowFontScaling: false,
        style: [styles.textTime, {
          color: '#9B9F95'
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
          backgroundColor: 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(60)
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
            text: 'Tidak',
            onPress: function onPress() {}
          }, {
            text: 'Hapus',
            onPress: function onPress() {
              deleteComment(data.item.id);
              closeRow(rowMap, data.item.key);
            },
            style: 'destructive'
          }]);
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icDelete,
        style: styles.icCommentDelete
      }))));
    };
    var replaceHTML = function replaceHTML(content) {
      if (!(content != null && content.includes('<p>'))) {
        return '<p>' + content + '</p>';
      }
      return content;
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
    var renderHeader = function renderHeader() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewHeader
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHeader,
        onPress: function onPress() {
          return props.navigation.goBack();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icBack,
        style: styles.icBack
      })), !state.dataUser.is_a_resident && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.headerRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchHeaderSearch,
        onPress: function onPress() {
          NavigatorService.navigate('EditNews', {
            item: state.item,
            load: load,
            loadNews: props.route.params.loadNews,
            loadComment: loadComment,
            showMessageSuccess: showMessageSuccess
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icPencil,
        style: styles.icBack
      }))));
    };
    var showMessageSuccess = function showMessageSuccess() {
      toast.current.show('Berita Anda berhasil diedit.');
    };
    var renderFooter = function renderFooter() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
        size: "large",
        color: '#917438',
        style: {
          marginVertical: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24)
        }
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
        news_article_id: props.route.params.id
      };
      (0, _$$_REQUIRE(_dependencyMap[16]).postCommentNews)(body).then(function (response) {
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
    (0, _react.useEffect)(function () {
      // loadComment(state.page);
      loadComment();
    }, [state.page]);
    var renderComment = function renderComment() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        backdropOpacity: 0.0,
        isVisible: state.modalVisible,
        onBackdropPress: function onBackdropPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
        },
        onBackButtonPress: function onBackButtonPress() {
          return setState(function (stat) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
        },
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBox, {
          backgroundColor: 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewModalTitle
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.touchSilang
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.icSilang
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textTitleModal, {
          color: '#263238'
        }]
      }, state.total, " KOMENTAR"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: [styles.touchSilang, {
          marginRight: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10)
        }],
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icSilang,
        style: [styles.icSilang, {
          tintColor: '#263238'
        }]
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewArrayStatus
      }, state.total === 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewEmpty
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.imgEmptyNews,
        style: styles.imgEmptyNews
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textBelum, {
          color: '#5E6157'
        }]
      }, "Belum ada komentar"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        allowFontScaling: false,
        style: [styles.textMulai, {
          color: '#5E6157'
        }]
      }, "Mulai percakapan")) : /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
        removeClippedSubviews: true,
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false
        //ref={(c) => {scroll = c}}
        ,
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
            // loadComment(state.page);
            loadComment();
          }
        }),
        onMomentumScrollEnd: function onMomentumScrollEnd(e) {
          var paddingToBottom = state.activeSearch && state.searchValue !== '' ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(99) : (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(127);
          paddingToBottom += e.nativeEvent.layoutMeasurement.height;
          if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
            var page = state.page++;
            // loadComment(page);
            loadComment();
            limit += state.limit;
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_$$_REQUIRE(_dependencyMap[19]).SwipeListView, {
        data: state.arrayComments,
        renderItem: function renderItem(rowData, rowMap) {
          return (
            /*#__PURE__*/
            // @ts-expect-error TS(2769): No overload matches this call.
            _react.default.createElement(_$$_REQUIRE(_dependencyMap[19]).SwipeRow, {
              disableLeftSwipe: state.dataUser.id !== rowData.item.user.id,
              rightOpenValue: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(-60),
              disableRightSwipe: true
            }, renderHiddenItem(rowData, rowMap), _renderItem(rowData, rowMap))
          );
        },
        ListFooterComponent: state.page < state.totalPage ? renderFooter() : /*#__PURE__*/_react.default.createElement(_reactNative.View, null)
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(120)
        }
      }))))), state.statusKeyboard && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.bgShadow,
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              statusKeyboard: false
            });
          });
          _reactNative.Keyboard.dismiss();
        }
      }), /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
        behavior: _reactNative.Platform.OS === 'ios' ? 'position' : null,
        keyboardVerticalOffset: (0, _$$_REQUIRE(_dependencyMap[20]).isIphoneX)() ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(-20) : (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0)
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalFooter, {
          backgroundColor: 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisibleInput: true
            });
          });
        }
      }, state.dataUser.image_url === '' ? /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        style: styles.imgUser,
        source: _$$_REQUIRE(_dependencyMap[18]).allLogo.imgDefault
      }) : /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        style: styles.imgUser,
        source: {
          uri: state.dataUser.image_url
        }
      })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewText, {
          backgroundColor: '#F6F7F4'
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
        style: styles.textInput,
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
        style: styles.textPost
      }, "Kirim")) : /*#__PURE__*/_react.default.createElement(_reactNative.View, null))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.container, {
        backgroundColor: 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: true,
      backgroundColor: 'transparent'
    }), /*#__PURE__*/_react.default.createElement(_Loader.default, {
      loading: state.loading
    }), renderComment(), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onPress: function onPress() {
        var _state$item2;
        if (((_state$item2 = state.item) == null ? undefined : _state$item2.image_url) !== null) {
          var _state$item3;
          setImages([{
            uri: (_state$item3 = state.item) == null ? undefined : _state$item3.image_url
          }]);
        } else {
          var _state$item4;
          var formatImages = (_state$item4 = state.item) == null ? undefined : _state$item4.image_urls.map(function (item) {
            return {
              uri: item
            };
          });
          setImages(formatImages);
        }
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            isImageViewVisible: true
          });
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image
    // cache="only-if-cached"
    , {
      source: {
        uri: ((_state$item5 = state.item) == null ? undefined : _state$item5.image_url) !== null ? (_state$item6 = state.item) == null ? undefined : _state$item6.image_url : (_state$item7 = state.item) == null ? undefined : _state$item7.image_urls[0]
      },
      style: styles.img
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        padding: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      allowFontScaling: false,
      style: [styles.textTitle, {
        color: '#273238'
      }]
    }, (_state$item8 = state.item) == null ? undefined : _state$item8.title), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewRowLike
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "regular",
      allowFontScaling: false,
      style: [styles.textCreate, {
        color: '#9B9F95'
      }]
    }, 'Dibuat oleh ' + ((_state$item9 = state.item) == null ? undefined : _state$item9.user.name)), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "regular",
      allowFontScaling: false,
      style: [styles.textDate, {
        color: '#9B9F95'
      }]
    }, (_state$item10 = state.item) == null ? undefined : _state$item10.view, " x dilihat \u25CF", ' ', (0, _moment.default)((_state$item11 = state.item) == null ? undefined : _state$item11.created_at)
    // @ts-expect-error TS(2304): Cannot find name 'localization'.
    .locale('id', localization).format('LLLL').replace('pukul', '')))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewStatusNew
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.viewStatus, {
        backgroundColor: changeColorStatus((_state$item12 = state.item) == null ? undefined : _state$item12.news_category.name),
        width: changeWidthStatus((_state$item13 = state.item) == null ? undefined : _state$item13.news_category.name)
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "medium",
      allowFontScaling: false,
      style: styles.textStatus
    }, (_state$item14 = state.item) == null ? undefined : _state$item14.news_category.name))), /*#__PURE__*/_react.default.createElement(_reactNativeRenderHtml.default, {
      source: {
        html: '<body style="color:black">' + replaceHTML((_state$item15 = state.item) == null ? undefined : _state$item15.content) + '</body>'
      },
      contentWidth: width,
      computeEmbeddedMaxWidth: computeEmbeddedMaxWidth
    }), !state.dataUser.is_a_resident && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.detailInfo, {
        backgroundColor: 'white'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewValue
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      allowFontScaling: false,
      style: [styles.textValue, {
        color: '#121212'
      }]
    }, "Status"), /*#__PURE__*/_react.default.createElement(_reactNative.Switch, {
      onValueChange: setStatus,
      value: state.status
    })))))), /*#__PURE__*/_react.default.createElement(_reactNativeImageViewing.default, {
      images: images,
      imageIndex: 0,
      visible: state.isImageViewVisible,
      onRequestClose: function onRequestClose() {
        return setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            isImageViewVisible: false
          });
        });
      },
      FooterComponent: function FooterComponent(_ref2) {
        var imageIndex = _ref2.imageIndex;
        return /*#__PURE__*/_react.default.createElement(_$$_REQUIRE(_dependencyMap[21]).ImageFooter, {
          imageIndex: imageIndex,
          imagesCount: images.length
        });
      }
    }), renderHeader(), /*#__PURE__*/_react.default.createElement(_Toast.default, {
      ref: toast
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.footer
    }, ((_state$item16 = state.item) == null ? undefined : _state$item16.clusters) && !state.dataUser.is_a_resident && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchCluster,
      onPress: function onPress() {
        var _state$item17;
        NavigatorService.navigate('ListCluster', {
          listClusters: (_state$item17 = state.item) == null ? undefined : _state$item17.clusters
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: styles.icHomeCluster,
      source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icHomeCluster
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "medium",
      allowFontScaling: false,
      style: [styles.textCluster, {
        color: '#273238'
      }]
    }, (_state$item18 = state.item) == null ? undefined : _state$item18.clusters.length, " Cluster")), !state.hide && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.viewFooterRow,
      onPress: function onPress() {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            modalVisible: true
          });
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: styles.icMessage,
      source: _$$_REQUIRE(_dependencyMap[18]).allLogo.icMessage
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "medium",
      allowFontScaling: false,
      style: [styles.textCount, {
        color: '#273238'
      }]
    }, state.total)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(8)
      }
    }), state.dataUser.is_a_resident ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.viewFooterRow,
      onPress: function onPress() {
        var _state$item19, _state$item20;
        like((_state$item19 = state.item) == null ? undefined : _state$item19.like, (_state$item20 = state.item) == null ? undefined : _state$item20.is_liked);
        if (props.route.params.like) {
          var _state$item21;
          props.route.params.like(props.route.params.id, (_state$item21 = state.item) == null ? undefined : _state$item21.is_liked);
        } else {
          var _state$item22, _state$item23;
          if (!((_state$item22 = state.item) != null && _state$item22.is_liked)) {
            _reactNative.Vibration.vibrate(100);
          }
          var body = {
            is_a_like: (_state$item23 = state.item) == null ? undefined : _state$item23.is_liked
          };
          (0, _$$_REQUIRE(_dependencyMap[16]).putLike)('/' + props.route.params.id, body).then(function (response) {}).catch(function (error) {});
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: styles.icMessage,
      source: (_state$item24 = state.item) != null && _state$item24.is_liked ? _$$_REQUIRE(_dependencyMap[18]).allLogo.icLikeNewsActive : _$$_REQUIRE(_dependencyMap[18]).allLogo.icLikeNews
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "medium",
      allowFontScaling: false,
      style: [styles.textCount, {
        color: '#273238'
      }]
    }, (_state$item25 = state.item) == null ? undefined : _state$item25.like)) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewFooterRow
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      style: styles.icMessage,
      source: (_state$item26 = state.item) != null && _state$item26.is_liked ? _$$_REQUIRE(_dependencyMap[18]).allLogo.icLikeNewsActive : _$$_REQUIRE(_dependencyMap[18]).allLogo.icLikeNews
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "medium",
      allowFontScaling: false,
      style: [styles.textCount, {
        color: '#273238'
      }]
    }, (_state$item27 = state.item) == null ? undefined : _state$item27.like)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
      }
    })));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(28) : 0
    },
    viewText: {
      width: '86%',
      //height: toDp(40),
      height: 'auto',
      backgroundColor: '#F3F5F6',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(8),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10)
      //padding: toDp(12)
    },
    textInput: {
      flex: 1,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      fontWeight: '400',
      color: '#35405A',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      width: width * 0.61,
      fontFamily: 'Poppins-Regular',
      // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
      fontWeight: '400'
      //marginLeft: Platform.OS === 'android' ? toDp(-4) : 0,
    },
    textMore: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      color: '#56a7d4',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(2)
    },
    viewStatusNew: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12)
    },
    touchCluster: {
      flexDirection: 'row',
      alignItems: 'center',
      //backgroundColor: 'cyan',
      position: 'absolute',
      bottom: (0, _$$_REQUIRE(_dependencyMap[20]).getBottomSpace)() + (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      left: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
    },
    textCluster: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      color: '#273238'
    },
    icNext: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(-8),
      tintColor: '#917438'
    },
    headeriOS: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      backgroundColor: '#917438'
    },
    content: {
      flex: 1
      //padding: toDp(16)
    },
    textTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      color: '#273238',
      fontWeight: '600'
    },
    textDate: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      color: '#868A8E',
      letterSpacing: 0,
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(6)
    },
    textCreate: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      color: '#917438',
      letterSpacing: 0
    },
    viewStatus: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(69),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(25),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      backgroundColor: '#f2c141',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textStatus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      color: '#FFFFFF'
    },
    textDesc: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      color: '#273238'
    },
    textDescWebView: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(100)
    },
    img: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(240),
      resizeMode: 'cover'
    },
    detailInfo: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      width: '100%',
      height: 'auto',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(6),
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2
    },
    viewValue: {
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      padding: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12)
    },
    textValue: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      color: '#000000',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0.05)
    },
    viewRowLike: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12)
    },
    viewLikeRowRight: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    icLikeNews: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(6)
    },
    footer: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(48) + (0, _$$_REQUIRE(_dependencyMap[20]).getBottomSpace)(),
      paddingBottom: _reactNative.Platform.OS === 'android' ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10) : (0, _$$_REQUIRE(_dependencyMap[20]).getBottomSpace)(),
      borderTopWidth: _reactNative.Platform.OS === 'ios' ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(1) : 0,
      borderTopColor: '#838A9A40',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0.8),
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    viewFooterRow: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(58),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(32),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    icMessage: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
    },
    textCount: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      color: '#273238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0.05),
      fontWeight: '500',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(6)
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
      height: height * 0.7,
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewModalTitle: {
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(2),
      color: '#263238',
      fontWeight: '700'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4)
    },
    icSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      tintColor: '#263238'
    },
    modalFooter: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(60) + (0, _$$_REQUIRE(_dependencyMap[20]).getBottomSpace)(),
      backgroundColor: 'white',
      borderTopWidth: _reactNative.Platform.OS === 'ios' ? (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(1) : 0,
      borderTopColor: '#838A9A40',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(0.8),
      flexDirection: 'row',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(8),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10),
      paddingBottom: _reactNative.Platform.OS === 'android' ? 0 : (0, _$$_REQUIRE(_dependencyMap[20]).isIphoneX)() ? (0, _$$_REQUIRE(_dependencyMap[20]).getBottomSpace)() : (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(10)
    },
    imgUser: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20)
    },
    touchPost: {
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      top: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24)
    },
    textPost: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      color: '#5AAA0F',
      fontWeight: '600'
    },
    bgShadow: {
      width: width,
      height: height,
      backgroundColor: '#0000004D'
    },
    rowFront: {
      width: width,
      backgroundColor: 'white',
      flexDirection: 'row',
      //alignItems: 'center',
      height: 'auto',
      justifyContent: 'space-between',
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12)
    },
    imgCommentUser: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16)
    },
    textName: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      color: '#788F9C',
      fontWeight: '600'
    },
    textMessage: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      color: '#000000',
      fontWeight: '400',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4),
      width: width * 0.755
    },
    textTime: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      color: '#788F9C',
      fontWeight: '400',
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      top: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12)
    },
    viewUserName: {
      flexDirection: 'row'
    },
    rowBack: {
      alignItems: 'center',
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
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(26.67),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(26.67)
    },
    viewArrayStatus: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    viewEmpty: {
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(-120)
    },
    textBelum: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      color: '#35405A',
      fontWeight: '500'
    },
    textMulai: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(14),
      color: '#838A9A',
      fontWeight: '400',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(6)
    },
    viewHeader: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(60),
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      backgroundColor: '#383B341A',
      position: 'absolute',
      top: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(30)
    },
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4)
    },
    icBack: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(24),
      tintColor: 'white'
    },
    imgEmptyNews: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(120),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(120)
    },
    icHomeCluster: {
      width: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(20),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(5)
    },
    headerRow: {
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(16),
      flexDirection: 'row'
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[17]).toDp)(4)
    }
  });
  var _default = exports.default = DetailsNewsScreen;
