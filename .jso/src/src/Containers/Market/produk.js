  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _slicedToArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _reactNativeLinearGradient = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _CustomFilterModal = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _Empty = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var NavigatorService = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[8]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var ShimmerPlaceHolder = (0, _$$_REQUIRE(_dependencyMap[9]).createShimmerPlaceholder)(_reactNativeLinearGradient.default);
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var Produk = function Produk(props) {
    var _useState = (0, _react.useState)({
        loading: true,
        searchValue: '',
        arrayProducts: [],
        arrayHolder: []
      }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];
    var _useState3 = (0, _react.useState)({
        categories: [],
        selectedCategory: ''
      }),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      categoryState = _useState4[0],
      setCategory = _useState4[1];
    (0, _react.useEffect)(function () {
      loadProducts();
      loadCategory();
    }, []);
    (0, _react.useEffect)(function () {
      loadProducts();
    }, [categoryState.selectedCategory]);
    var loadCategory = function loadCategory() {
      (0, _$$_REQUIRE(_dependencyMap[10]).getMarketCategory)().then(function (response) {
        setCategory(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            categories: response.data.product_categories
          });
        });
      }).catch(function (err) {});
    };
    var loadProducts = function loadProducts() {
      var data = {
        filter: {
          product_category_id: categoryState.selectedCategory
        }
      };
      (0, _$$_REQUIRE(_dependencyMap[10]).postProductList)(data).then(function (response) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            arrayProducts: response.data.products.map(function (data) {
              return Object.assign(Object.assign({}, data), {}, {
                quantity: 0
              });
            }),
            loading: false,
            arrayHolder: response.data.products
          });
        });
      }).catch(function (err) {
        setState(function (state) {
          return Object.assign(Object.assign({}, state), {}, {
            loading: false
          });
        });
      });
    };
    (0, _react.useEffect)(function () {
      var newData = state.arrayHolder.filter(function (item) {
        var itemData = item.name ? item.name.toUpperCase() : item.toUpperCase();
        var textData = state.searchValue.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          arrayProducts: newData
        });
      });
    }, [state.searchValue]);
    var minPlus = function minPlus(id, operator) {
      setState(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          arrayProducts: state.arrayProducts.map(function (data) {
            if (data.id === id) {
              return Object.assign(Object.assign({}, data), {}, {
                quantity: operator === '+' ? data.quantity + 1 : data.quantity - 1
              });
            } else {
              return Object.assign({}, data);
            }
          })
        });
      });
    };
    var renderSearch = function renderSearch() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.searchRow
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.inputRow, {
          borderColor: '#5AAA0F'
        }]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icSearch,
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
        placeholder: 'Cari Market',
        placeholderTextColor: '#9B9F95',
        returnKeyType: "search",
        value: state.searchValue,
        maxLength: 30
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
        source: _$$_REQUIRE(_dependencyMap[11]).allLogo.icDeleteAll,
        style: styles.icDeleteAll
      }))), /*#__PURE__*/_react.default.createElement(_CustomFilterModal.default, {
        style: {
          paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20)
        },
        darkMode: state.darkMode,
        title: 'Market Kategori',
        desc: '',
        textPlaceholder: 'Pilih kategori market',
        value: categoryState.selectedCategory,
        arrayData: categoryState.categories,
        onSelected: function onSelected(item, index) {
          onSelectFilter(item);
        }
      }));
    };
    var onSelectFilter = function onSelectFilter(item) {
      setCategory(function (state) {
        return Object.assign(Object.assign({}, state), {}, {
          selectedCategory: item.id
        });
      });
    };
    var renderShimmer = function renderShimmer() {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: styles.viewShimmer
      }, /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: styles.shimmerPhoto
      }), /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: styles.shimmerName
      }), /*#__PURE__*/_react.default.createElement(ShimmerPlaceHolder, {
        style: styles.shimmerPrice
      }));
    };
    var convert = function convert(amount) {
      var reverse = amount.toString().split('').reverse().join(''),
        ribuan = reverse.match(/\d{1,3}/g);
      ribuan = ribuan.join('.').split('').reverse().join('');
      return ribuan;
    };
    var renderItem = function renderItem(_ref) {
      var item = _ref.item;
      return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
        style: styles.viewShimmer,
        onPress: function onPress() {
          return NavigatorService.navigate('DetailsMarket', {
            item: item,
            minPlus: minPlus,
            loadKeranjang: props.loadKeranjang,
            setContentPesanan: props.setContentPesanan
          });
        }
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
        source: {
          uri: item.product_images[0].image_url
        },
        style: styles.shimmerPhoto
      }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        numberOfLines: 2,
        ellipsizeMode: "tail",
        style: styles.textName
      }, item.name), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
        textType: "semibold",
        style: styles.textPrice
      }, 'Rp. ' + convert(item.price)));
    };
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.container
    }, renderSearch(), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.content
    }, state.arrayProducts.length === 0 ? /*#__PURE__*/_react.default.createElement(_Empty.default, {
      images: _$$_REQUIRE(_dependencyMap[11]).allLogo.imgEmptyNews,
      title: 'Produk tidak ditemukan',
      subtitle: 'Tidak ada ' + state.searchValue + ' terkait.'
    }) : /*#__PURE__*/_react.default.createElement(_reactNative.FlatList
    //ListHeaderComponent={() => renderSearch()}
    , {
      ListFooterComponent: function ListFooterComponent() {
        return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
          style: {
            height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24)
          }
        });
      },
      data: state.arrayProducts,
      renderItem: state.loading ? renderShimmer : renderItem,
      numColumns: 2,
      showsVerticalScrollIndicator: false,
      showsHorizontalScrollIndicator: false,
      refreshControl: /*#__PURE__*/_react.default.createElement(_reactNative.RefreshControl, {
        refreshing: state.loading,
        onRefresh: function onRefresh() {
          //setState(state => ({...state, loading: true, arrayData:[]}))
          //loadProducts()
        }
      })
    })));
  };
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      width: width
    },
    content: {
      backgroundColor: '#F6F7F4',
      flex: 1
    },
    textName: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      color: '#000000',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8)
    },
    textPrice: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(14),
      color: '#000000',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(5)
    },
    viewShimmer: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(160),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(235),
      backgroundColor: 'white',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(5),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12)
    },
    shimmerPhoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(160),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(160),
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(5),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(5)
    },
    shimmerName: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(140),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10)
    },
    shimmerPrice: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(100),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10)
    },
    searchRow: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(60),
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    icFilter: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      tintColor: '#383B34',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10)
    },
    icSearch: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(24),
      tintColor: '#383B34',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8)
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(8),
      backgroundColor: '#F6F7F4',
      width: '80%',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(10),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(40)
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4)
    },
    icDeleteAll: {
      width: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(20),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(-40)
    },
    textInput: {
      width: width * 0.7,
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(4),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[12]).toDp)(12),
      color: '#273238'
    }
  });
  var _default = exports.default = Produk;
