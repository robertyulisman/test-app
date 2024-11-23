  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _excluded = ["loading"]; // @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
  var Loader = function Loader(props) {
    var loading = props.loading,
      attributes = (0, _objectWithoutProperties2.default)(props, _excluded);

    /*return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={loading}
        onRequestClose={() => {console.log('close modal')}}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
           <View style={styles.kotak}>
             <Image source={allLogo.loading} style={styles.imgLoading}/>
           </View>
          </View>
        </View>
      </Modal>
    )*/

    return /*#__PURE__*/_react.default.createElement(_reactNative.Modal, {
      transparent: true,
      animationType: 'none',
      visible: loading,
      onRequestClose: function onRequestClose() {}
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.modalBackground
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.activityIndicatorWrapper
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
      source: _$$_REQUIRE(_dependencyMap[5]).allLogo.loading,
      style: styles.loading
    }), /*#__PURE__*/_react.default.createElement(_CustomText.default, {
      textType: "regular",
      style: styles.text
    }, "Tunggu sebentar"))));
  };
  var styles = _reactNative.StyleSheet.create({
    modalBackground: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000060'
    },
    activityIndicatorWrapper: {
      backgroundColor: 'white',
      width: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(190),
      height: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(148),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(16),
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2,
      shadowOpacity: 0.2,
      shadowOffset: {
        height: 1,
        width: 0
      },
      shadowColor: '#000000'
    },
    loading: {
      width: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(120),
      height: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(60),
      resizeMode: 'contain'
    },
    text: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(14),
      color: '#000000',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[6]).toDp)(2)
    }
  });
  var _default = exports.default = Loader;
