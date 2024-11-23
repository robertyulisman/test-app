  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.firestore = exports.database = undefined;
  var firebase = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  _$$_REQUIRE(_dependencyMap[1]);
  _$$_REQUIRE(_dependencyMap[2]);
  _$$_REQUIRE(_dependencyMap[3]);
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  // Firebase App (the core Firebase SDK) is always required and
  // must be listed before other Firebase SDKs

  // TODO: Replace the following with your app's Firebase project configuration
  var firebaseConfig = {
    apiKey: 'AIzaSyDeETb555_oYWWX7Csi9q-wcszjgm3iPuM',
    authDomain: 'central-connect-3b0be.firebaseapp.com',
    databaseURL: 'https://central-connect-3b0be-default-rtdb.firebaseio.com',
    projectId: 'central-connect-3b0be',
    storageBucket: 'central-connect-3b0be.appspot.com',
    messagingSenderId: '546674808707',
    appId: '1:546674808707:web:eb2dbe3b2ee0b6e536c8b6',
    measurementId: 'G-FLM0FQXMEW'
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  var firestore = exports.firestore = firebase.firestore();
  var database = exports.database = firebase.database();
