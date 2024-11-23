  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.widthPercentageToDP = exports.toDp = exports.heightPercentageToDP = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  // @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message

  var widthPercentageToDP = exports.widthPercentageToDP = function widthPercentageToDP(widthPercent) {
    var screenWidth = _reactNative.Dimensions.get('window').width;
    var elemWidth = parseFloat(widthPercent);
    return _reactNative.PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
  };
  var heightPercentageToDP = exports.heightPercentageToDP = function heightPercentageToDP(heightPercent) {
    var screenHeight = _reactNative.Dimensions.get('window').height;
    var elemHeight = parseFloat(heightPercent);
    return _reactNative.PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
  };
  var toDp = exports.toDp = function toDp(size) {
    var screenWidth = _reactNative.Dimensions.get('window').width;
    var elemSize = parseFloat(size);
    return _reactNative.PixelRatio.roundToNearestPixel(screenWidth * elemSize / 100) / 3.6;
  };
