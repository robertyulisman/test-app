  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.navigate = navigate;
  exports.reset = reset;
  exports.setContainer = setContainer;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  // @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message

  var _container; // eslint-disable-line

  function setContainer(container) {
    _container = container;
  }
  function reset(name, params) {
    _container.dispatch(_$$_REQUIRE(_dependencyMap[1]).CommonActions.reset({
      index: 0,
      routes: [{
        name: name
      }]
    }));
  }
  function navigate(name, params) {
    var event = (_reactNative.Platform.OS + '_' + name).toUpperCase();
    // await firebase.analytics().logEvent(event, {});
    // await firebase.analytics().setCurrentScreen(event)
    _container.dispatch(_$$_REQUIRE(_dependencyMap[1]).CommonActions.navigate({
      name: name,
      params: params
    }));
  }
