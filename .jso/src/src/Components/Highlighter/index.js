  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Highlighter;
  var _extends2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var _objectWithoutProperties2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[4]);
  var _CustomText = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _excluded = ["autoEscape", "highlightStyle", "searchWords", "textToHighlight", "sanitize", "style"]; // @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
  // @ts-expect-error TS(7016): Could not find a declaration file for module 'high... Remove this comment to see the full error message
  /**
   * Highlights all occurrences of search terms (searchText) within a string (textToHighlight).
   * This function returns an array of strings and <Text> elements (wrapping highlighted words).
   */

  function Highlighter(_ref) {
    var autoEscape = _ref.autoEscape,
      highlightStyle = _ref.highlightStyle,
      searchWords = _ref.searchWords,
      textToHighlight = _ref.textToHighlight,
      sanitize = _ref.sanitize,
      style = _ref.style,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
    var chunks = (0, _$$_REQUIRE(_dependencyMap[6]).findAll)({
      textToHighlight: textToHighlight,
      searchWords: searchWords,
      sanitize: sanitize,
      autoEscape: autoEscape
    });
    return /*#__PURE__*/_react.default.createElement(_CustomText.default, (0, _extends2.default)({
      textType: "semibold",
      numberOfLines: 1,
      ellipsizeMode: "tail",
      style: style
    }, props), chunks.map(function (chunk, index) {
      var text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);
      return !chunk.highlight ? text : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        key: index,
        style: chunk.highlight && highlightStyle
      }, text);
    }));
  }
