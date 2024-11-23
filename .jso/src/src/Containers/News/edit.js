  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _moment = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _reactNativeImageCropPicker = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _reactNativeModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _CustomComboBox = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _CustomSelectCluster = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _CustomTextArea = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _Header = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  // import { allLogo } from "@Assets";
  // import Header from '@Header';
  // import { toDp } from "@percentageToDP";

  // import CustomSelectCluster from "@CustomSelectCluster";
  // import CustomTextArea from "@CustomTextArea";
  // import CustomTextInput from "@CustomTextInput";
  // import Loader from "@Loader";

  // import CustomText from "@CustomText";

  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var EditNewsScreen = function EditNewsScreen(props) {
    var _useState = (0, _react.useState)({
        date: '',
        title: '',
        desciption: '',
        arrayPhoto: [],
        location: '',
        arrCategory: [],
        idCategory: '',
        nameCategory: '',
        //ex
        pictures: [],
        arrayHolder: [],
        valueSearch: '',
        errorTitle: '',
        errorDesciption: '',
        latitude: '',
        longitude: '',
        options: {
          width: 100,
          height: 100,
          cropping: false,
          compressImageQuality: 0.2,
          compressImageMaxWidth: 1500,
          compressImageMaxHeight: 2000,
          includeExif: true,
          mediaType: 'photo'
        },
        optionsBanner: {
          width: 1080,
          height: 600,
          cropping: true,
          compressImageQuality: 0.2,
          compressImageMaxWidth: 1080,
          compressImageMaxHeight: 600,
          includeExif: true,
          mediaType: 'photo'
        },
        type: 'news',
        //news or banner
        modalVisible: false,
        loading: false,
        modalLabel: false,
        arrayCategory: [],
        arrTower: [],
        cluster: '',
        arrayCluster: [],
        darkMode: false,
        touch: true,
        isBanner: false,
        bannerImageUrl: '',
        isChangePhoto: false,
        isChangeCluster: false
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    (0, _react.useEffect)(function () {
      (0, _$$_REQUIRE(_dependencyMap[12]).getNewsCategories)().then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            arrayCategory: response.data.news_categories,
            date: (0, _moment.default)(new Date()).format('dddd, DD MMMM YYYY, HH:mm:ss') + ' WIB'
          });
        });
      }).catch(function (error) {});
      (0, _$$_REQUIRE(_dependencyMap[12]).getClusters)('?page=1&per_page=200').then(function (response) {
        var arrTower = [];
        arrTower.push({
          id: 0,
          name: 'Semua cluster',
          status: props.route.params.item.clusters.length === response.data.length
        });
        for (var i = 0; i < response.data.length; i++) {
          var status = false;
          for (var j = 0; j < props.route.params.item.clusters.length; j++) {
            var obj = props.route.params.item.clusters[j];
            if (obj.id === response.data[i].id) {
              status = true;
            }
          }
          arrTower.push({
            id: response.data[i].id,
            name: response.data[i].name,
            status: status
          });
        }
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            arrTower: arrTower,
            statusAll: props.route.params.item.clusters.length === response.data.length
          });
        });
      }).catch(function (error) {
        // @ts-expect-error TS(2552): Cannot find name 'alert'. Did you mean 'Alert'?
        alert(error);
      });
      setDefaultEdit();
    }, []);
    var replaceStringNews = function replaceStringNews(body) {
      return body.replace(/(<([^>]+)>)/gi, '').replace('&nbsp;', '').replace('&nbsp;', '');
    };
    var setDefaultEdit = function setDefaultEdit() {
      // @ts-expect-error TS(2345): Argument of type '(state: { date: string; title: s... Remove this comment to see the full error message
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          date: '',
          title: props.route.params.item.title,
          desciption: replaceStringNews(props.route.params.item.content),
          arrayPhoto: [{
            path: props.route.params.item.image_url
          }],
          idCategory: props.route.params.item.news_category.id,
          nameCategory: props.route.params.item.news_category.name,
          arrayHolder: [],
          valueSearch: '',
          isChangePhoto: false,
          errorTitle: '',
          errorDesciption: '',
          latitude: '',
          longitude: '',
          type: 'news',
          //news or banner
          modalVisible: false,
          loading: false,
          modalLabel: false,
          arrayCategory: [],
          cluster: '' + props.route.params.item.clusters.length + ' Cluster',
          arrayCluster: props.route.params.item.clusters,
          darkMode: false,
          touch: true,
          isBanner: props.route.params.item.is_banner,
          bannerImageUrl: props.route.params.item.banner_image_url
        });
      });
    };
    var renderFoto = function renderFoto() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        allowFontScaling: false,
        style: styles.textTitleField
      }, "Gambar Berita"), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
        horizontal: true,
        style: styles.scrollViewRow
      }, state.arrayPhoto.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewPhoto
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: {
            uri: item.path
          },
          style: styles.photoUpload
        }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: styles.viewSilang
        }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
          style: styles.circle,
          onPress: function onPress() {
            var arrayPhoto = state.arrayPhoto;
            arrayPhoto.splice(index, 1);
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                arrayPhoto: arrayPhoto,
                isBanner: false,
                bannerImageUrl: ''
              });
            });
          }
        }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
          source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icSilang,
          style: styles.icSilang
        }))));
      }), state.arrayPhoto.length !== 1 && /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchAddFoto,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: true,
              type: 'news'
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icCameraPlus,
        style: styles.icCamera
      }))));
    };
    var camera = function camera() {
      // @ts-expect-error TS(2345): Argument of type '{ width: number; height: number;... Remove this comment to see the full error message
      _reactNativeImageCropPicker.default.openCamera(state.type === 'news' ? state.options : state.optionsBanner).then(function (response) {
        processUpload(response);
      }).catch(function (err) {
        if (err == 'Error: Required permission missing' || err == 'User did not grant camera permission.') {
          _reactNative.Alert.alert('Pengaturan', 'Akses ambil foto belum diaktifkan.\nBerikan akses untuk memulai mengambil gambar. Aktifkan akses ambil foto dari Pengaturan.', [{
            text: 'Nanti Saja',
            onPress: function onPress() {
              return undefined;
            }
          }, {
            text: 'Aktifkan',
            onPress: function onPress() {
              _reactNative.Linking.openSettings();
            }
          }], {
            cancelable: false
          });
        }
      });
    };
    var gallery = function gallery() {
      // @ts-expect-error TS(2345): Argument of type '{ width: number; height: number;... Remove this comment to see the full error message
      _reactNativeImageCropPicker.default.openPicker(state.type === 'news' ? state.options : state.optionsBanner).then(function (response) {
        processUpload(response);
      }).catch(function (err) {
        if (err == 'Error: Required permission missing' || err == 'Error: Cannot access images. Please allow access if you want to be able to select images.') {
          _reactNative.Alert.alert('Pengaturan', 'Akses pilih foto belum diaktifkan.\nBerikan akses untuk memulai mengambil gambar. Aktifkan akses pilih foto dari Pengaturan.', [{
            text: 'Nanti Saja',
            onPress: function onPress() {
              return undefined;
            }
          }, {
            text: 'Aktifkan',
            onPress: function onPress() {
              _reactNative.Linking.openSettings();
            }
          }], {
            cancelable: false
          });
        }
      });
    };
    var processUpload = function processUpload(response) {
      //console.log(response)
      if (response.didCancel) {} else {
        if (state.type === 'news') {
          var arrayPhoto = state.arrayPhoto;
          arrayPhoto.push({
            data: response.data,
            mime: response.mime,
            exif: response.exif,
            path: response.path
          });
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              arrayPhoto: arrayPhoto,
              modalVisible: false,
              isChangePhoto: true
            });
          });
        } else {
          //Banner
          var postData = new FormData();
          postData.append('file', {
            uri: response.path,
            type: 'image/jpg',
            name: 'centralconnect-banner.jpg'
          });
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: true
            });
          });
          (0, _$$_REQUIRE(_dependencyMap[12]).postUpload)(postData).then(function (response) {
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                loading: false,
                modalVisible: false,
                bannerImageUrl: response.data.image_urls[0]
              });
            });
          }).catch(function (error) {
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                loading: false,
                modalVisible: false
              });
            });
            _reactNative.Alert.alert('' + error.status, '' + error.data);
          });
        }
      }
    };
    var renderModal = function renderModal() {
      return /*#__PURE__*/_react.default.createElement(_reactNativeModal.default
      // @ts-expect-error TS(2345): Argument of type '{ modalVisible: false; }' is not... Remove this comment to see the full error message
      , {
        onBackdropPress: function onBackdropPress() {
          return setState({
            modalVisible: false
          });
        },
        isVisible: state.modalVisible,
        style: styles.bottomModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewRootModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.modalBox, {
          backgroundColor: state.darkMode ? '#121212' : 'white'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewModalTitle
      }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        allowFontScaling: false,
        style: [styles.textTitleModal, {
          color: state.darkMode ? 'white' : '#263238'
        }]
      }, "Tambah Foto"), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchSilang,
        onPress: function onPress() {
          return setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              modalVisible: false
            });
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icSilang,
        style: styles.icSilangModal
      }))), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.modalRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchChatCocierge,
        onPress: function onPress() {
          return camera();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.circleModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icModalCamera,
        style: styles.icModalGallery
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        allowFontScaling: false,
        style: [styles.textModal, {
          color: state.darkMode ? 'white' : 'black'
        }]
      }, 'Ambil foto')), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.touchChatCocierge,
        onPress: function onPress() {
          return gallery();
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.circleModal
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icModalGallery,
        style: styles.icModalGallery
      })), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "regular",
        allowFontScaling: false,
        style: [styles.textModal, {
          color: state.darkMode ? 'white' : 'black'
        }]
      }, 'Pilih foto'))))));
    };
    var cropBanner = function cropBanner() {
      _reactNativeImageCropPicker.default.openCropper({
        // @ts-expect-error TS(2339): Property 'path' does not exist on type 'never'.
        path: state.arrayPhoto[0].path,
        width: 1080,
        height: 600,
        cropping: true,
        compressImageQuality: 0.2,
        compressImageMaxWidth: 1080,
        compressImageMaxHeight: 600,
        includeExif: true,
        mediaType: 'photo'
      }).then(function (response) {
        var postData = new FormData();
        postData.append('file', {
          uri: response.path,
          type: 'image/jpg',
          name: 'centralconnect-banner.jpg'
        });
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: true
          });
        });
        (0, _$$_REQUIRE(_dependencyMap[12]).postUpload)(postData).then(function (response) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              modalVisible: false,
              bannerImageUrl: response.data.image_urls[0]
            });
          });
        }).catch(function (error) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              loading: false,
              modalVisible: false
            });
          });
          _reactNative.Alert.alert('' + error.status, '' + error.data);
        });
      }).catch(function (err) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            isBanner: false
          });
        });
      });
    };
    var kirim = function kirim() {
      if (state.desciption.length < 10) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            errorDesciption: 'Field ini minimal 10 karakter.'
          });
        });
      } else {
        var postData = new FormData();
        for (var i = 0; i < state.arrayPhoto.length; i++) {
          postData.append('file', {
            // @ts-expect-error TS(2339): Property 'path' does not exist on type 'never'.
            uri: state.arrayPhoto[i].path,
            type: 'image/jpg',
            name: 'qluster-' + i + '.jpg'
          });
        }
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: true
          });
        });
        if (state.touch) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              touch: false
            });
          });
          var clusterIds = [];
          if (!state.isChangeCluster) {
            for (var i = 0; i < state.arrayCluster.length; i++) {
              // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
              clusterIds.push(state.arrayCluster[i].id);
            }
          } else {
            clusterIds = state.arrayCluster;
          }
          if (state.isChangePhoto) {
            (0, _$$_REQUIRE(_dependencyMap[12]).postUpload)(postData).then(function (response) {
              var data = {
                id: props.route.params.item.id,
                title: state.title,
                content: state.desciption,
                image_url: response.data.image_urls[0],
                news_category_id: state.idCategory,
                is_published: true,
                is_banner: state.isBanner,
                banner_image_url: state.bannerImageUrl,
                cluster_ids: clusterIds
              };
              apiEdit(data);
            }).catch(function (error) {
              setState(function (state) {
                return Object.assign(Object.assign({}, state), {}, {
                  loading: false
                });
              });
              _reactNative.Alert.alert('' + error.status, '' + error.data);
            });
          } else {
            var data = {
              id: props.route.params.item.id,
              title: state.title,
              content: state.desciption,
              image_url: props.route.params.item.image_url,
              news_category_id: state.idCategory,
              is_published: true,
              is_banner: state.isBanner,
              banner_image_url: state.bannerImageUrl,
              cluster_ids: clusterIds
            };
            apiEdit(data);
          }
        }
      }
    };
    var apiEdit = function apiEdit(data) {
      (0, _$$_REQUIRE(_dependencyMap[12]).putNewsEdit)(data).then(function (_) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false
          });
        });
        if (typeof props.route.params.loadNews == 'function') {
          props.route.params.loadNews();
        }
        props.route.params.load();
        props.route.params.loadComment();
        props.route.params.showMessageSuccess();
        props.navigation.goBack();
      }).catch(function (error) {
        _reactNative.Alert.alert('' + error.status, '' + error.data.message, [{
          text: 'OK',
          onPress: function onPress() {
            return setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                loading: false
              });
            });
          }
        }]);
      });
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.SafeAreaView, {
      style: styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
      barStyle: 'dark-content',
      translucent: false
    }), /*#__PURE__*/_react.default.createElement(_Header.default, {
      title: 'Edit Berita',
      onPress: function onPress() {
        return props.navigation.goBack();
      }
    }), "// @ts-expect-error TS(2304): Cannot find name 'Loader'.", /*#__PURE__*/_react.default.createElement(Loader, {
      loading: state.loading
    }), renderModal(), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
      behavior: 'padding',
      enabled: _reactNative.Platform.OS === 'ios' ? true : false
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.rowView
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icCalendar,
      style: [styles.icCalendar, {
        tintColor: state.darkMode ? 'white' : '#9B9F95'
      }]
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "regular",
      allowFontScaling: false,
      style: [styles.text, {
        color: state.darkMode ? 'white' : '#5E6157'
      }]
    }, state.date)), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.viewTextTitle, {
        backgroundColor: state.darkMode ? '#121212' : 'white'
      }]
    }, renderFoto(), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchTam,
      onPress: function onPress() {
        if (state.arrayPhoto.length !== 0) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              isBanner: !state.isBanner
            });
          });
          if (!state.isBanner) {
            cropBanner();
          } else {
            setState(function (state) {
              return Object.assign(Object.assign({}, state), {}, {
                bannerImageUrl: ''
              });
            });
          }
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: state.isBanner ? _$$_REQUIRE(_dependencyMap[13]).allLogo.icNewsCheck : _$$_REQUIRE(_dependencyMap[13]).allLogo.icCheckboxUnChecked,
      style: styles.icCheckbox
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "regular",
      allowFontScaling: false
      // @ts-expect-error TS(17001): JSX elements cannot have multiple attributes with ... Remove this comment to see the full error message
      ,
      allowFontScaling: false,
      style: [styles.textWhiteTitle, {
        color: state.isBanner ? '#273238' : '#9B9F95'
      }]
    }, 'Tampilkan sebagai banner')), state.isBanner && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewHide
    }, state.bannerImageUrl === '' ? /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: [styles.touchAddFoto, {
        marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10)
      }],
      onPress: function onPress() {
        return setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            modalVisible: true,
            type: 'banner'
          });
        });
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icCameraPlus,
      style: styles.icCamera
    })) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.viewHide, {
        marginLeft: 0,
        marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(-16),
        marginBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: {
        uri: state.bannerImageUrl
      },
      style: styles.bannerImageUrl
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.viewSilangBanner
    }, /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.circle,
      onPress: function onPress() {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            bannerImageUrl: ''
          });
        });
        cropBanner();
      }
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[13]).allLogo.icBannerReplace,
      style: styles.icBannerReplace
    }))))), "// @ts-expect-error TS(2304): Cannot find name 'CustomTextInput'.", /*#__PURE__*/_react.default.createElement(CustomTextInput, {
      title: 'Judul Berita',
      placeholder: 'Masukkan judul berita',
      error: state.errorTitle,
      value: state.title,
      maxLength: 255,
      onChangeText: function onChangeText(title) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            title: title
          });
        });
        if (title.trim() === '') {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              errorTitle: 'Field ini tidak boleh kosong.'
            });
          });
        } else {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              errorTitle: ''
            });
          });
        }
      }
      // @ts-expect-error TS(2304): Cannot find name 'desciption'.
      ,
      onSubmitEditing: function onSubmitEditing() {
        return desciption.focus();
      },
      autoCapitalize: 'sentences',
      returnKeyType: 'next'
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
      }
    }), state.arrayCategory.length !== 0 && /*#__PURE__*/_react.default.createElement(_CustomComboBox.default, {
      darkMode: state.darkMode,
      title: 'Kategori Berita',
      desc: '',
      textPlaceholder: 'Pilih kategori berita',
      value: state.nameCategory,
      arrayData: state.arrayCategory,
      onSelected: function onSelected(item, index) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            idCategory: item.id,
            nameCategory: item.name
          });
        });
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
      }
    }), state.arrTower.length !== 0 && /*#__PURE__*/_react.default.createElement(_CustomSelectCluster.default, {
      darkMode: state.darkMode,
      title: 'Cluster Tujuan',
      desc: '',
      textPlaceholder: 'Pilih cluster tujuan berita',
      value: state.cluster,
      arrayData: state.arrTower,
      onSelected: function onSelected(array) {
        if (array.length === 0) {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              cluster: '',
              arrayCluster: array
            });
          });
        } else {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              cluster: '' + array.length + ' Cluster',
              arrayCluster: array,
              isChangeCluster: true
            });
          });
        }
      }
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
      }
    }), /*#__PURE__*/_react.default.createElement(_CustomTextArea.default, {
      title: 'Isi Berita',
      placeholder: 'Masukkan isi berita',
      error: state.errorDesciption,
      value: state.desciption,
      onChangeText: function onChangeText(desciption) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            desciption: desciption
          });
        });
        if (desciption.trim() === '') {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              errorDesciption: 'Field ini tidak boleh kosong.'
            });
          });
        } else {
          setState(function (state) {
            return Object.assign(Object.assign({}, state), {}, {
              errorDesciption: ''
            });
          });
        }
      },
      autoCapitalize: 'sentences',
      returnKeyType: 'next'
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(70)
      }
    }), state.title.trim() === '' || state.desciption.trim() === '' || state.nameCategory === '' || state.arrayPhoto.length === 0 ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.touchKirim, {
        backgroundColor: '#CCCFC9'
      }]
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      allowFontScaling: false,
      style: styles.textKirim
    }, "SIMPAN")) : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      style: styles.touchKirim,
      onPress: function onPress() {
        return kirim();
      }
    }, /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "semibold",
      allowFontScaling: false,
      style: styles.textKirim
    }, "SIMPAN")), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(44)
      }
    }))))));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
      //paddingTop: Platform.OS === 'android' ? toDp(28) : 0,
      //paddingBottom: Platform.OS === 'android' ? toDp(28) : 0,
    },
    headeriOS: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      backgroundColor: '#917438'
    },
    content: {
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24)
    },
    viewTextTitle: {
      width: width * 0.9,
      height: 'auto',
      backgroundColor: '#FFFFFF'
    },
    textInclude: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      fontWeight: '500'
      //fontFamily: 'Montserrat-Medium',
    },
    textTitleField: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: '#9B9F95',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.6)
    },
    scrollViewRow: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(80)
    },
    viewPhoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(80),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      backgroundColor: '#e7ebee'
    },
    photoUpload: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(80),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4)
    },
    bannerImageUrl: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(288),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(160),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4)
    },
    viewSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(80),
      position: 'absolute'
    },
    viewSilangBanner: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(288),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(160),
      position: 'absolute'
    },
    circle: {
      position: 'absolute',
      top: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      right: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4)
    },
    icBannerReplace: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24)
    },
    icSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      tintColor: '#FFFFFF'
    },
    touchAddFoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(80),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(80),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F6F7F4'
    },
    icAddZoom: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(48),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(48),
      tintColor: '#788F9C'
    },
    touchKirim: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKirim: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      color: 'white',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0.7)
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
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(165),
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    touchChatCocierge: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(2),
      color: '#263238'
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4)
    },
    icSilangModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      tintColor: '#263238'
    },
    circleModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(40),
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      borderColor: '#5AAA0F',
      backgroundColor: 'white',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      justifyContent: 'center',
      alignItems: 'center'
    },
    icModalGallery: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      resizeMode: 'contain',
      tintColor: '#5AAA0F'
    },
    textModal: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      textAlign: 'center',
      //fontFamily: 'Montserrat-Medium',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14),
      color: '#000000',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(2)
    },
    touchLabelItem: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      flex: 1,
      alignItems: 'center'
    },
    picture: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(48),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(48)
    },
    textLabel: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      textAlign: 'center',
      //fontFamily: 'Montserrat-Medium',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10),
      color: '#000000'
    },
    touchLabellaporan: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(54),
      flexDirection: 'row'
    },
    icChevronDown: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(28),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(28),
      tintColor: '#B0BEC5',
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(0),
      bottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4)
    },
    viewSearchRoot: {
      flexDirection: 'row',
      alignItems: 'center',
      //marginTop: toDp(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
    },
    viewSearch: {
      width: '90%',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      borderColor: '#788F9C',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(44),
      alignItems: 'center',
      flexDirection: 'row'
    },
    icSearch2: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      tintColor: '#8d96a6',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(4)
    },
    touchAll: {
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
    },
    icDeleteAll: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24)
    },
    textInput: {
      flex: 1,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(16),
      color: '#757575',
      //fontFamily: 'Montserrat-Medium',
      fontWeight: '300'
    },
    rowView: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F6F7F4',
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(54),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20)
    },
    line: {
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(1),
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      backgroundColor: '#e7ebee'
    },
    icCamera: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(30.67),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(28),
      tintColor: '#CCCFC9'
    },
    icCalendar: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
    },
    icLp: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(20),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(8)
    },
    text: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12),
      color: '#000000',
      //fontFamily: 'Montserrat-Regular',
      letterSpacing: 0
    },
    touchTam: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(24)
    },
    icCheckbox: {
      width: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(18),
      height: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(18),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(10)
    },
    textWhiteTitle: {
      color: '#273238',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(14)
      //fontFamily: 'Montserrat-Regular',
    },
    viewHide: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(28)
      //marginTop: toDp(10)
    },
    textWhiteUggah: {
      color: '#788F9C',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[14]).toDp)(12)
      //fontFamily: 'Montserrat-Regular',
    }
  });
  var _default = exports.default = EditNewsScreen;
