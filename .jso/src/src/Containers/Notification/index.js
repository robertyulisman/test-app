  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _Empty = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _NoConnection = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _id = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[8]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[9]);
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[11]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var limit = 0;
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var NotificationScreen = function NotificationScreen(props) {
    var netInfo = (0, _$$_REQUIRE(_dependencyMap[12]).useNetInfo)();
    var _useState = (0, _react.useState)({
        loading: true,
        arrayData: [],
        page: 1,
        total: 0,
        totalPage: 0,
        limit: 20,
        isShowModal: false,
        isResident: props.route.params.isResident
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      loadNotification();
    }, []);
    var loadNotification = function loadNotification() {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          loading: state.page === 1 ? true : false
        });
      });
      var params = '?page=' + state.page;
      (0, _$$_REQUIRE(_dependencyMap[13]).getNotificationUser)(params).then(function (response) {
        if (state.page === 1) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              arrayData: response.data.user_notifications,
              total: response.data.meta.total,
              totalPage: response.data.meta.total_page
            });
          });
        } else {
          // @ts-expect-error TS(2345): Argument of type '(state: { loading: boolean; arra... Remove this comment to see the full error message
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              arrayData: [].concat((0, _toConsumableArray2.default)(state.arrayData), (0, _toConsumableArray2.default)(response.data.user_notifications))
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
    var replaceStringNews = function replaceStringNews(body) {
      return body.replace(/(<([^>]+)>)/gi, '').replace('&nbsp;', '').replace('&nbsp;', '');
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
    var handleReadAllNotif = function handleReadAllNotif() {
      setState(function (prevState) {
        return Object.assign(Object.assign({}, prevState), {}, {
          loading: true
        });
      });
      (0, _$$_REQUIRE(_dependencyMap[13]).putNotificationReadedAll)().then(function (response) {
        limit = 0, setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            loading: false,
            isShowModal: false,
            total: 0,
            totalPage: 0,
            arrayData: [],
            page: 1
          });
        });
        // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
        loadNotification(state.page);
      }).catch(function (error) {
        setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            loading: false,
            isShowModal: false
          });
        });
      });
    };
    var touchPemberitahuan = function touchPemberitahuan(item) {
      if (!item.is_read) {
        var data = {
          notification_ids: [item.notification.id]
        };
        (0, _$$_REQUIRE(_dependencyMap[13]).putNotificationReaded)(data).then(function (response) {
          limit = 0, setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              total: 0,
              totalPage: 0,
              arrayData: [],
              page: 1
            });
          });
          // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
          loadNotification(state.page);
        }).catch(function (error) {});
      }
      if (item.notification.entity_type === 'comment_news_article') {
        (0, _$$_REQUIRE(_dependencyMap[13]).getNewArticle)('/' + item.notification.entity_id).then(function (response) {
          NavigatorService.navigate('DetailsNews', {
            id: response.data.news_article.id,
            from: 'comment_news_article'
          });
        }).catch(function (error) {
          if (error.status === 404) {
            // @ts-expect-error TS(2304): Cannot find name 'alert'.
            alert('Berita tidak ditemukan.');
          } else {
            // @ts-expect-error TS(2304): Cannot find name 'alert'.
            alert(JSON.stringify(error));
          }
        });
      }
    };
    var renderNotificationNews = function renderNotificationNews(item) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return touchPemberitahuan(item);
        },
        activeOpacity: 1,
        style: [styles.containerItem, {
          backgroundColor: item.is_read ? 'white' : '#F5FFE9'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icNotifNews,
        style: styles.icNotif
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNotifContent
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNewRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textCategoryNotif, {
          color: '#9B9F95'
        }]
      }, "Berita"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textTimeNotif, {
          color: '#788F9C'
        }]
      }, replaceStringTime(
      // @ts-expect-error TS(2554): Expected 0-1 arguments, but got 2.
      (0, _moment.default)(item.notification.created_at).locale('id', _id.default).fromNow()))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitleNotif, {
          fontSize: item.notification.entity_additional_info === 'Pengumuman' ? (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(13) : (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
          color: '#383B34'
        }]
      }, 'Berita baru dengan kategori ' + item.notification.entity_additional_info.toLowerCase()), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewInfoNotif, {
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48),
          backgroundColor: '#E5F9CC',
          borderColor: '#E5F9CC'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: item.notification.image_url
        },
        style: styles.imgNotifComplaint
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textDescNotif, {
          width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(232),
          color: '#383B34'
        }],
        numberOfLines: 2,
        ellipsizeMode: "tail"
      }, replaceStringNews(item.notification.body)))));
    };
    var renderNotificationEmergency = function renderNotificationEmergency(item) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return touchPemberitahuan(item);
        },
        activeOpacity: 1,
        style: [styles.containerItem, {
          backgroundColor: item.is_read ? 'white' : '#F5FFE9'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icNotifDarurat,
        style: styles.icNotif
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNotifContent
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNewRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textCategoryNotif, {
          color: '#9B9F95'
        }]
      }, "Darurat"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textTimeNotif, {
          color: '#788F9C'
        }]
      }, replaceStringTime((0, _moment.default)(item.notification.created_at).fromNow()))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitleNotif, {
          color: '#273238'
        }]
      }, item.notification.title), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textDescNotifComment, {
          color: '#383B34'
        }]
      }, item.notification.body)));
    };
    var renderNotificationComplaints = function renderNotificationComplaints(item) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return touchPemberitahuan(item);
        },
        activeOpacity: 1,
        style: [styles.containerItem, {
          backgroundColor: item.is_read ? 'white' : '#F5FFE9'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icNotifComplaint,
        style: styles.icNotif
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNotifContent
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNewRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textCategoryNotif, {
          color: '#9B9F95'
        }]
      }, "Laporan"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textTimeNotif, {
          color: '#788F9C'
        }]
      }, replaceStringTime((0, _moment.default)(item.notification.created_at).fromNow()))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitleNotif, {
          color: '#273238'
        }]
      }, item.notification.title), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewInfoNotif, {
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48),
          backgroundColor: '#E5F9CC',
          borderColor: '#E5F9CC'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: item.notification.image_url
        },
        style: styles.imgNotifComplaint
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        numberOfLines: 2,
        ellipsizeMode: "tail",
        style: [styles.textDescNotif, {
          width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(232),
          color: '#273238'
        }]
      }, item.notification.body))));
    };
    var renderNotificationCommentReport = function renderNotificationCommentReport(item) {
      var _item$notification$co;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return touchPemberitahuan(item);
        },
        activeOpacity: 1,
        style: [styles.containerItem, {
          backgroundColor: item.is_read ? 'white' : '#F5FFE9'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icNotifComplaint,
        style: styles.icNotif
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNotifContent
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNewRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textCategoryNotif, {
          color: '#9B9F95'
        }]
      }, "Laporan"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textTimeNotif, {
          color: '#788F9C'
        }]
      }, replaceStringTime((0, _moment.default)(item.notification.created_at).fromNow()))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitleNotif, {
          color: '#273238'
        }]
      }, 'Komentar baru dari ' + (state.isResident ? 'pengelola' : 'penghuni')), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textDescNotifComment, {
          color: '#273238'
        }]
      }, 'Anda menerima komentar baru di laporan\n' + ((_item$notification$co = item.notification.complaint_report) == null ? undefined : _item$notification$co.title))));
    };
    var renderNotificationUnit = function renderNotificationUnit(item) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return touchPemberitahuan(item);
        },
        activeOpacity: 1,
        style: [styles.containerItem, {
          backgroundColor: item.is_read ? 'white' : '#F5FFE9'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icNotifUnit,
        style: styles.icNotif
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNotifContent
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNewRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textCategoryNotif, {
          color: '#9B9F95'
        }]
      }, "Unit"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textTimeNotif, {
          color: '#788F9C'
        }]
      }, replaceStringTime((0, _moment.default)(item.notification.created_at).fromNow()))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitleNotif, {
          color: '#273238'
        }]
      }, item.notification.title === 'Permintaan penambahan unit disetujui' ? 'Penambahan unit disetujui' : 'Penambahan unit ditolak'), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textDescNotifComment, {
          color: '#273238'
        }]
      }, item.notification.body)));
    };

    //code here
    var renderNotificationTagihan = function renderNotificationTagihan(item) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return touchPemberitahuan(item);
        },
        activeOpacity: 1,
        style: [styles.containerItem, {
          backgroundColor: item.is_read ? 'white' : '#F5FFE9'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icNotifTagihan,
        style: [styles.icNotif, {
          width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(15),
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(15)
        }]
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNotifContent
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNewRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textCategoryNotif, {
          color: '#9B9F95'
        }]
      }, "Tagihan"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textTimeNotif, {
          color: '#788F9C'
        }]
      }, replaceStringTime((0, _moment.default)(item.notification.created_at).fromNow()))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitleNotif, {
          color: '#273238'
        }]
      }, item.notification.title), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textDescNotifComment, {
          color: '#273238'
        }]
      }, item.notification.body)));
    };
    var renderNotificationServices = function renderNotificationServices(item) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return touchPemberitahuan(item);
        },
        activeOpacity: 1,
        style: [styles.containerItem, {
          backgroundColor: item.is_read ? 'white' : '#F5FFE9'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icNotifJasa,
        style: styles.icNotif
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNotifContent
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNewRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textCategoryNotif, {
          color: '#9B9F95'
        }]
      }, "Jasa"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textTimeNotif, {
          color: '#788F9C'
        }]
      }, replaceStringTime((0, _moment.default)(item.notification.created_at).fromNow()))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitleNotif, {
          color: '#273238'
        }]
      }, item.notification.title), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewInfoNotif, {
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48),
          backgroundColor: '#E5F9CC',
          borderColor: '#E5F9CC'
        }]
      }, item.notification.image_url !== '' && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewImageServices
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: item.notification.image_url
        },
        style: styles.imgNotifImage
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        numberOfLines: 2,
        ellipsizeMode: "tail",
        style: [styles.textDescNotif, {
          width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(232),
          color: '#273238'
        }]
      }, item.notification.body))));
    };
    var renderNotificationProduct = function renderNotificationProduct(item) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return touchPemberitahuan(item);
        },
        activeOpacity: 1,
        style: [styles.containerItem, {
          backgroundColor: item.is_read ? 'white' : '#F5FFE9'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icNotifJasa,
        style: styles.icNotif
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNotifContent
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNewRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textCategoryNotif, {
          color: '#9B9F95'
        }]
      }, "Market"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textTimeNotif, {
          color: '#788F9C'
        }]
      }, replaceStringTime((0, _moment.default)(item.notification.created_at).fromNow()))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitleNotif, {
          color: '#273238'
        }]
      }, item.notification.title), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewInfoNotif, {
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48),
          backgroundColor: '#E5F9CC',
          borderColor: '#E5F9CC'
        }]
      }, item.notification.image_url !== '' && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewImageServices
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: item.notification.image_url
        },
        style: styles.imgNotifImage
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        numberOfLines: 2,
        ellipsizeMode: "tail",
        style: [styles.textDescNotif, {
          width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(232),
          color: '#273238'
        }]
      }, item.notification.body))));
    };
    var renderNotificationCommentNews = function renderNotificationCommentNews(item) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        onPress: function onPress() {
          return touchPemberitahuan(item);
        },
        activeOpacity: 1,
        style: [styles.containerItem, {
          backgroundColor: item.is_read ? 'white' : '#F6F6F2'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icNotifNews,
        style: styles.icNotif
      }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNotifContent
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewNewRow
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textCategoryNotif, {
          color: '#9B9F95'
        }]
      }, "Berita"), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textTimeNotif, {
          color: '#788F9C'
        }]
      }, replaceStringTime((0, _moment.default)(item.notification.created_at).fromNow()))), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: [styles.textTitleNotif, {
          color: '#273238'
        }]
      }, 'Komentar baru dari penghuni'), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.viewInfoNotif, {
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48),
          backgroundColor: '#E5F9CC',
          borderColor: '#E5F9CC'
        }]
      }, item.notification.image_url && /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: item.notification.image_url
        },
        style: styles.imgNotifComplaint
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        style: [styles.textDescNotif, {
          width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(232),
          color: '#273238'
        }],
        numberOfLines: 2,
        ellipsizeMode: "tail"
      }, 'Anda menerima komentar baru dari penghuni diberita ' + item.notification.entity_additional_info))));
    };
    var renderItem = function renderItem(_ref) {
      var item = _ref.item,
        index = _ref.index;
      if (item.notification.entity_type === 'news') {
        return renderNotificationNews(item);
      } else if (item.notification.entity_type === 'emergency') {
        return renderNotificationEmergency(item);
      } else if (item.notification.entity_type === 'complaint') {
        return renderNotificationComplaints(item);
      } else if (item.notification.entity_type === 'comment_complaint_report') {
        return renderNotificationCommentReport(item);
      } else if (item.notification.entity_type === 'comment_news_article') {
        return renderNotificationCommentNews(item);
      } else if (item.notification.entity_type === 'service') {
        return renderNotificationServices(item);
      } else if (item.notification.entity_type === 'unit') {
        return renderNotificationUnit(item);
      } else if (item.notification.entity_type === 'tagihan') {
        return renderNotificationTagihan(item);
      } else if (item.notification.entity_type === 'product') {
        return renderNotificationProduct(item);
      }
    };
    var renderFooter = function renderFooter() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(136),
          backgroundColor: 'white'
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
        size: "large",
        color: '#5AAA0F',
        style: {
          marginVertical: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
        }
      }));
    };
    var ModalReadAllView = function ModalReadAllView() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default, {
        onSwipeComplete: function onSwipeComplete() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowModal: false
            });
          });
        },
        swipeDirection: ['down'],
        onBackdropPress: function onBackdropPress() {
          return setState(function (prevState) {
            return Object.assign(Object.assign({}, prevState), {}, {
              isShowModal: false
            });
          });
        },
        isVisible: state.isShowModal,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBox, {
          backgroundColor: props.darkMode ? '#121212' : 'white'
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
          color: props.darkMode ? 'white' : '#263238'
        }]
      }, "TANDAI")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewArrayStatus
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchTanbah,
        onPress: function onPress() {
          handleReadAllNotif();
        }
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textTambah
      }, "Tandai Semua Telah Dibaca"))))));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.header, {
        backgroundColor: props.darkMode ? '#1C1C1E' : 'white',
        borderBottomColor: props.darkMode ? '#1C1C1E' : '#9B9F95'
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchHeader,
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icBack,
      style: [styles.icBack, {
        tintColor: props.darkMode ? 'white' : '#383B34'
      }]
    })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.linearHeader
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "medium",
      style: [styles.title]
    }, 'Pemberitahuan')), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchHeaderSearch,
      onPress: function onPress() {
        return setState(function (prevState) {
          return Object.assign(Object.assign({}, prevState), {}, {
            isShowModal: true
          });
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[14]).allLogo.icMenuDot,
      style: [styles.icFilter, {
        tintColor: props.darkMode ? 'white' : '#383B34'
      }]
    }))), ModalReadAllView(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, !netInfo.isConnected ? /*#__PURE__*/_react.default.createElement(_NoConnection.default, null) : state.loading ? /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, {
      size: "large",
      color: '#5AAA0F',
      style: {
        marginVertical: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
      }
    }) : state.arrayData.length === 0 ? /*#__PURE__*/_react.default.createElement(_Empty.default, {
      title: 'Belum ada pemberitahuan baru',
      images: _$$_REQUIRE(_dependencyMap[14]).allLogo.imgEmptyNotification
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
      removeClippedSubviews: true,
      ref: function ref(c) {
        // @ts-expect-error TS(2304): Cannot find name 'scroll'.
        scroll = c;
      },
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
          loadNotification(state.page);
        }
      }),
      onMomentumScrollEnd: function onMomentumScrollEnd(e) {
        var paddingToBottom =
        // @ts-expect-error TS(2339): Property 'activeSearch' does not exist on type '{ ... Remove this comment to see the full error message
        state.activeSearch && state.searchValue !== '' ? (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(99) : (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(127);
        paddingToBottom += e.nativeEvent.layoutMeasurement.height;
        if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
          var page = state.page++;
          // @ts-expect-error TS(2554): Expected 0 arguments, but got 1.
          loadNotification(page);
          limit += state.limit;
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
      removeClippedSubviews: true,
      keyExtractor: function keyExtractor(item, index) {
        return item.id;
      },
      data: state.loading ? ['', '', '', '', ''] : state.arrayData
      // @ts-expect-error TS(2304): Cannot find name 'renderItemShimmer'.
      ,
      renderItem: state.loading ? renderItemShimmer : renderItem,
      ListHeaderComponent: function ListHeaderComponent() {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
            backgroundColor: props.darkMode ? '#121212' : 'white'
          }
        });
      },
      ItemSeparatorComponent: function ItemSeparatorComponent() {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: [styles.line, {
            backgroundColor: props.darkMode ? '#1C1C1E' : '#f5f7f8'
          }]
        });
      },
      ListFooterComponent: state.loading && state.page < state.totalPage ? renderFooter() : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: {
          height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0),
          backgroundColor: props.darkMode ? '#121212' : 'white'
        }
      }),
      showsVerticalScrollIndicator: false,
      showsHorizontalScrollIndicator: false
    }))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    content: {
      flex: 1,
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F6F7F4'
    },
    containerItem: {
      width: width,
      height: 'auto',
      flexDirection: 'row',
      padding: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    line: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(2),
      backgroundColor: '#f5f7f8'
    },
    imgPicture: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(60),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(60),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    itemTitle: {
      //width: toDp(175),
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(256),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#273238'
    },
    viewStatus: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      //marginLeft: toDp(16),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(25),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(11),
      backgroundColor: '#917438',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textStatus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#FFFFFF'
    },
    textTime: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#99abb5',
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      bottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(22)
    },
    containerLoading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(68)
    },
    viewRow: {
      width: '100%',
      flexDirection: 'row',
      //paddingHorizontal: toDp(20),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    imgPictureCircle: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(50),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(50),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(25),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12)
    },
    viewImage: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(60),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(60),
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    icNotifSos: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(44.86),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(43.22)
    },
    itemRow: {
      width: '87%',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center'
    },
    viewRowItem: {
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      alignItems: 'center'
    },
    icUser: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8)
    },
    icPhone2: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    text: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#000000',
      letterSpacing: 0
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    textStatus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#FFFFFF'
    },
    icCalendar: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8)
    },
    icLp: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8)
    },
    icServiceAc: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(45.47),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(29.68),
      resizeMode: 'contain'
    },
    textNameUhit: {
      width: width * 0.7,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#000000',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8)
    },
    viewRoot: {
      flexDirection: 'row',
      backgroundColor: 'cyan',
      width: 100,
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(100)
    },
    icNotif: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      tintColor: '#5AAA0F'
    },
    viewNewRow: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    textCategoryNotif: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#828282',
      fontWeight: '600'
    },
    textTimeNotif: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#788F9C',
      fontWeight: '400'
    },
    textTitleNotif: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#273238',
      fontWeight: '600',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(2)
    },
    viewNotifContent: {
      width: '92%',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8)
    },
    viewInfoNotif: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(300),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(30),
      backgroundColor: '#E5F9CC',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.5),
      borderColor: '#91743833',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(8),
      flexDirection: 'row',
      alignItems: 'center'
    },
    imgNotif: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(30),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(30),
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      borderBottomLeftRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(-0.5)
    },
    imgNotifComplaint: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48),
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      borderBottomLeftRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4)
    },
    textDescNotif: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#273238',
      fontWeight: '400',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(254)
    },
    textDescNotifComment: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      color: '#273238',
      fontWeight: '400',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4)
    },
    viewImageServices: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(46),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(46),
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      borderBottomLeftRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white'
    },
    imgNotifServices: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      resizeMode: 'contain',
      tintColor: '#5AAA0F'
    },
    imgNotifServicesNew: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      resizeMode: 'contain'
    },
    header: {
      width: width,
      height: 'auto',
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      borderBottomColor: '#121212',
      backgroundColor: 'white'
    },
    linearHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(60)
    },
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      position: 'absolute',
      left: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      zIndex: 1
    },
    icBack: {
      //marginHorizontal: toDp(8),
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      tintColor: '#5AAA0F'
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    icFilter: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      tintColor: '#5AAA0F',
      resizeMode: 'contain'
    },
    title: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(18)
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
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(150),
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(16),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.6),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(4)
    },
    icSilangModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(20),
      tintColor: '#5AAA0F'
    },
    viewArrayStatus: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(24)
    },
    touchTanbah: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(40),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(1),
      borderColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textTambah: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(14),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(0.7)
    },
    imgNotifImage: {
      width: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48),
      height: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(48),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[15]).toDp)(2)
    }
  });
  var _default = exports.default = NotificationScreen;
