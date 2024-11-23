  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _toConsumableArray2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[3]);
  /* eslint-disable react-native/no-inline-styles */

  // @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message

  var CustomText = function CustomText(props) {
    var textStyle;
    switch (props.textType) {
      case 'regular':
        textStyle = styles.regular;
        break;
      case 'medium':
        textStyle = styles.medium;
        break;
      case 'semibold':
        textStyle = styles.semibold;
        break;
      case 'bold':
        textStyle = styles.bold;
        break;
      default:
        textStyle = styles.regular;
        break;
    }
    var passedStyles = Array.isArray(props.style) ? Object.assign.apply(Object, [{}].concat((0, _toConsumableArray2.default)(props.style))) : props.style;
    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: [textStyle, Object.assign({}, passedStyles)],
      onPress: props.onPress,
      numberOfLines: props.numberOfLines
    }, props.children);
  };
  var styles = _reactNative.StyleSheet.create({
    regular: {
      fontFamily: 'Poppins-Regular',
      fontWeight: '400',
      color: '#273238'
    },
    medium: {
      fontFamily: 'Poppins-Medium',
      fontWeight: '500',
      color: '#273238'
    },
    semibold: {
      fontFamily: 'Poppins-SemiBold',
      fontWeight: '600',
      color: '#273238'
    },
    bold: {
      fontFamily: 'Poppins-Bold',
      fontWeight: '700',
      color: '#273238'
    }
  });
  var _default = exports.default = CustomText;
