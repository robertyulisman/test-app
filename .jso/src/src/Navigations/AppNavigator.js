  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = AppNavigator;
  var React = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[1]));
  var _Billing = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[2]));
  var _details = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[3]));
  var _info = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[4]));
  var _CCTV = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[5]));
  var _details2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[6]));
  var _ChangePassword = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[7]));
  var _ContactUs = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[8]));
  var _Detail = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[9]));
  var _DocumentsRequest = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[10]));
  var _add = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[11]));
  var _details3 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[12]));
  var _Emergencies = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[13]));
  var _detailEmergency = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[14]));
  var _detailHistoryEmergency = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[15]));
  var _emergencyContact = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[16]));
  var _emergencyRequest = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[17]));
  var _emergencyResponse = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[18]));
  var _historyEmergency = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[19]));
  var _listContactEmergency = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[20]));
  var _listEmergency = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[21]));
  var _notifDarurat = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[22]));
  var _ForgotPassword = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[23]));
  var _Home = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[24]));
  var _Jasa = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[25]));
  var _details4 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[26]));
  var _info2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[27]));
  var _layanan = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[28]));
  var _multifinance = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[29]));
  var _LandingPage = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[30]));
  var _Login = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[31]));
  var _Market = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[32]));
  var _confirm = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[33]));
  var _details5 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[34]));
  var _detailsPesanan = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[35]));
  var _info3 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[36]));
  var _keranjang = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[37]));
  var _News = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[38]));
  var _add2 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[39]));
  var _details6 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[40]));
  var _edit = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[41]));
  var _listCluster = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[42]));
  var _Notification = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[43]));
  var _OnBoarding = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[44]));
  var _PhotoProgress = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[45]));
  var _Profile = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[46]));
  var _editProfile = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[47]));
  var _Register = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[48]));
  var _agreement = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[49]));
  var _Reporting = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[50]));
  var _add3 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[51]));
  var _comments = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[52]));
  var _details7 = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[53]));
  var _rating = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[54]));
  var _tanggapan = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[55]));
  var _RestorePassword = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[56]));
  var _SmartCluster = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[57]));
  var _SmartCommunity = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[58]));
  var _SmartHome = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[59]));
  var _SplashScreen = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[60]));
  var _Unit = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[61]));
  var _addUnit = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[62]));
  var _detailUnit = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[63]));
  var _setUnit = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[64]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  var Stack = (0, _$$_REQUIRE(_dependencyMap[65]).createNativeStackNavigator)();
  function AppNavigator() {
    return /*#__PURE__*/React.createElement(Stack.Navigator, {
      initialRouteName: "Splash",
      screenOptions: {
        headerShown: false,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'tomato'
        }
      }
    }, /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Splash",
      component: _SplashScreen.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "OnBoarding",
      component: _OnBoarding.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Home",
      component: _Home.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Detail",
      component: _Detail.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Login",
      component: _Login.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "ForgotPass",
      component: _ForgotPassword.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "RestorePass",
      component: _RestorePassword.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Register",
      component: _Register.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "LandingPage",
      component: _LandingPage.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "SmartHome",
      component: _SmartHome.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Agreement",
      component: _agreement.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "SmartCluster",
      component: _SmartCluster.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Notification",
      component: _Notification.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "News",
      component: _News.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Profile",
      component: _Profile.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "ContactUs",
      component: _ContactUs.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "ChangePass",
      component: _ChangePassword.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Unit",
      component: _Unit.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "AddUnit",
      component: _addUnit.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "SetUnit",
      component: _setUnit.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "DetailUnit",
      component: _detailUnit.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "EditProfile",
      component: _editProfile.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "DetailsNews",
      component: _details6.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "ListCluster",
      component: _listCluster.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "AddNews",
      component: _add2.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "EditNews",
      component: _edit.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "CCTV",
      component: _CCTV.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "DetailsCCTV",
      component: _details2.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "SmartCommunity",
      component: _SmartCommunity.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Jasa",
      component: _Jasa.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Layanan",
      component: _layanan.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "ListEmergency",
      component: _listEmergency.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Emergency",
      component: _Emergencies.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "SosRequest",
      component: _emergencyRequest.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "ListContactEmergency",
      component: _listContactEmergency.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "HistoryEmergency",
      component: _historyEmergency.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "DetailEmergency",
      component: _detailEmergency.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Multifinance",
      component: _multifinance.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "DetailsJasa",
      component: _details4.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Reporting",
      component: _Reporting.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "AddReport",
      component: _add3.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "DetailsReport",
      component: _details7.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "EmergencyResponse",
      component: _emergencyResponse.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "NotifDarurat",
      component: _notifDarurat.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Comments",
      component: _comments.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Tanggapan",
      component: _tanggapan.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Billing",
      component: _Billing.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "DetailsBilling",
      component: _details.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "DetailHistoryEmergency",
      component: _detailHistoryEmergency.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "InfoBilling",
      component: _info.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Rating",
      component: _rating.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "InfoJasa",
      component: _info2.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Market",
      component: _Market.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "DetailsMarket",
      component: _details5.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "Keranjang",
      component: _keranjang.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "ConfirmMarket",
      component: _confirm.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "DetailsPesananMarket",
      component: _detailsPesanan.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "InfoMarket",
      component: _info3.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "EmergencyContact",
      component: _emergencyContact.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "DocumentsRequestScreen",
      component: _DocumentsRequest.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "AddDocumentsRequestScreen",
      component: _add.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "DetailsDocumentsRequestScreen",
      component: _details3.default
    }), /*#__PURE__*/React.createElement(Stack.Screen, {
      name: "PhotoProgress",
      component: _PhotoProgress.default
    }));
  }
