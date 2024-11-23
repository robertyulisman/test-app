  var _interopRequireDefault = _$$_REQUIRE(_dependencyMap[0]);
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.putResidentPassword = exports.putResidentEdit = exports.putProductOrdersUpdateStatus = exports.putNotificationReadedAll = exports.putNotificationReaded = exports.putNewsToggle = exports.putNewsEdit = exports.putLike = exports.postUsersRegister = exports.postUpload = exports.postUnitsOccupiedAdd = exports.postServicesOrders = exports.postServicePaymentProcess = exports.postServiceOrdersCreate = exports.postServiceOrdersConfirmation = exports.postResidentLogout = exports.postRatingPengelola = exports.postRating = exports.postProductPaymentProcess = exports.postProductOrderCreate = exports.postProductList = exports.postNewsCreate = exports.postLogout = exports.postLoginManager = exports.postLogin = exports.postForgotPassword = exports.postForget = exports.postEmergencyResponseFinish = exports.postEmergencyContactList = exports.postEmergenciesSend = exports.postEmergenciesAction = exports.postDocumentsRequestCreate = exports.postComplainsStatus = exports.postComplainsCreate = exports.postComplainsCancel = exports.postCommentNews = exports.postCommentComplaints = exports.postCctvsResidents = exports.postBillingSOAPDF = exports.postBillingReceiptPDF = exports.postBillingProcess = exports.postBillingPDF = exports.postBillingInvoicePDF = exports.patchDocumentsRequestCancel = exports.getVirtualAccountDetail = exports.getVendors = exports.getUnitsTower = exports.getUnitsOccupied = exports.getUnitsFloors = exports.getUnits = exports.getTime = exports.getSmartHome = exports.getServicesVirtualAccount = exports.getServicesOrdersStatuses = exports.getServicesOrdersCancel = exports.getServicesOrders = exports.getServicesCategories = exports.getServices = exports.getServiceCurrentTime = exports.getResidentsHouses = exports.getProgressPhoto = exports.getProductOrderList = exports.getProductOrder = exports.getNotificationUser = exports.getNotificationList = exports.getNewsCategory = exports.getNewsCategories = exports.getNews = exports.getNewArticle = exports.getMarketCategory = exports.getHighlights = exports.getFeatures = exports.getEmergencyStatuses = exports.getEmergencyStatus = exports.getEmergencyHistory = exports.getEmergencyDetailHistory = exports.getEmergencyDetail = exports.getEmergencyCategory = exports.getEmergencyCancel = exports.getEmergency = exports.getDocumentsRequestMobile = exports.getDocumentsAll = exports.getDetailsComplaints = exports.getComplaintsStatuses = exports.getComplaints = exports.getComplainsLabels = exports.getComplainsFilter = exports.getCommentNews = exports.getCommentComplaints = exports.getClusters = exports.getCctvsResidents = exports.getBillingPaid = exports.getBillingDetail = exports.getBank = exports.getActivitiesList = exports.deleteUser = exports.deleteUnitsOccupied = exports.deleteComplains = exports.deleteCommentNews = exports.deleteCommentComplaints = undefined;
  exports.putUserSetUnit = exports.putUserExitUnit = exports.putUnitsOccupiedSwitch = undefined;
  var _axios = _interopRequireDefault(_$$_REQUIRE(_dependencyMap[1]));
  var postLogin = exports.postLogin = function postLogin(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_LOGIN, 'POST', data);
  };
  var postLogout = exports.postLogout = function postLogout(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_LOGOUT, 'POST', data);
  };
  var postForget = exports.postForget = function postForget(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_FORGET, 'POST', data);
  };
  var getNotificationList = exports.getNotificationList = function getNotificationList(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_NOTIFICATIONS_LIST + params, 'GET');
  };
  var getActivitiesList = exports.getActivitiesList = function getActivitiesList(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_ACTIVITIES_LIST + params, 'GET');
  };
  var getHighlights = exports.getHighlights = function getHighlights() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_HIGHLIGHTS, 'GET');
  };
  var getResidentsHouses = exports.getResidentsHouses = function getResidentsHouses() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_RESIDENTS_HOUSES, 'GET');
  };
  var getNewsCategory = exports.getNewsCategory = function getNewsCategory(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_NEWS_CATEGORY + params, 'GET');
  };
  var getProgressPhoto = exports.getProgressPhoto = function getProgressPhoto(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_GET_PROGRESS_PHOTO + params, 'GET');
  };
  var postCctvsResidents = exports.postCctvsResidents = function postCctvsResidents(params, data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_CCTVS_RESIDENTS + params, 'POST', data);
  };
  var getCctvsResidents = exports.getCctvsResidents = function getCctvsResidents(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_CCTVS_RESIDENTS + params, 'GET');
  };
  var getComplainsLabels = exports.getComplainsLabels = function getComplainsLabels() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_COMPLAINS_LABELS, 'GET');
  };
  var getComplaints = exports.getComplaints = function getComplaints(params, data) {
    //agak ragu
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_COMPLAINTS + params, 'POST', data);
  };
  var postUpload = exports.postUpload = function postUpload(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_UPLOADS, 'POST', data);
  };
  var getComplainsFilter = exports.getComplainsFilter = function getComplainsFilter(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_COMPLAINS_FILTER + params, 'GET');
  };
  var putResidentEdit = exports.putResidentEdit = function putResidentEdit(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_RESIDENTS_EDIT, 'PUT', data);
  };
  var postResidentLogout = exports.postResidentLogout = function postResidentLogout(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_RESIDENTS_LOGOUT, 'POST', data);
  };
  var getNews = exports.getNews = function getNews(params, data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_NEWS + params, 'POST', data);
  };
  var getNewsCategories = exports.getNewsCategories = function getNewsCategories() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_NEWS_CATEGORIES, 'GET');
  };
  var getFeatures = exports.getFeatures = function getFeatures() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_FEATURES, 'GET');
  };
  var getComplaintsStatuses = exports.getComplaintsStatuses = function getComplaintsStatuses() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_COMPLAINTS_STATUSES, 'GET');
  };
  var postComplainsCreate = exports.postComplainsCreate = function postComplainsCreate(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_COMPLAINS_CREATE, 'POST', data);
  };
  var postEmergenciesSend = exports.postEmergenciesSend = function postEmergenciesSend(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_EMERGENCIES_SEND, 'POST', data);
  };
  var getEmergencyStatus = exports.getEmergencyStatus = function getEmergencyStatus() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_EMERGENCIES_STATUS, 'GET');
  };
  var getEmergencyCancel = exports.getEmergencyCancel = function getEmergencyCancel() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_EMERGENCIES_CANCEL, 'GET');
  };
  var putResidentPassword = exports.putResidentPassword = function putResidentPassword(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_RESIDENTS_PASSWORD, 'PUT', data);
  };
  var getServicesCategories = exports.getServicesCategories = function getServicesCategories() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_SERVICES_CATEGORIES, 'GET');
  };
  var getServices = exports.getServices = function getServices(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_SERVICES + params, 'GET');
  };
  var postServiceOrdersConfirmation = exports.postServiceOrdersConfirmation = function postServiceOrdersConfirmation(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_SERVICES_ORDERS_CONFIRMATION, 'POST', data);
  };
  var postServiceOrdersCreate = exports.postServiceOrdersCreate = function postServiceOrdersCreate(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_SERVICES_ORDERS_CREATE, 'POST', data);
  };
  var getServicesOrders = exports.getServicesOrders = function getServicesOrders(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_SERVICES_ORDERS + params, 'GET');
  };
  var postServicesOrders = exports.postServicesOrders = function postServicesOrders(params, data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_SERVICES_ORDERS + params, 'POST', data);
  };
  var getServicesOrdersStatuses = exports.getServicesOrdersStatuses = function getServicesOrdersStatuses() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_SERVICES_ORDERS_STATUSES, 'GET');
  };
  var getServicesOrdersCancel = exports.getServicesOrdersCancel = function getServicesOrdersCancel(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_SERVICES_ORDERS_CANCEL + params, 'GET');
  };
  var getUnitsTower = exports.getUnitsTower = function getUnitsTower(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_UNITS_TOWER + params, 'GET');
  };
  var getUnitsFloors = exports.getUnitsFloors = function getUnitsFloors(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_UNITS_FLOORS + params, 'GET');
  };
  var getUnits = exports.getUnits = function getUnits(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_UNITS + params, 'GET');
  };
  var postUsersRegister = exports.postUsersRegister = function postUsersRegister(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_USERS_REGISTER, 'POST', data);
  };
  var getNotificationUser = exports.getNotificationUser = function getNotificationUser(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_NOTIFICATION_USER + params, 'GET');
  };
  var postComplainsCancel = exports.postComplainsCancel = function postComplainsCancel(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_COMPLAINTS_CANCEL + params, 'POST');
  };
  var deleteComplains = exports.deleteComplains = function deleteComplains(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_COMPLAINTS_DELETE + params, 'DELETE');
  };
  var postComplainsStatus = exports.postComplainsStatus = function postComplainsStatus(params, data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_COMPLAINTS + params, 'POST', data);
  };
  var getDetailsComplaints = exports.getDetailsComplaints = function getDetailsComplaints(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_COMPLAINTS + params, 'GET');
  };
  var getEmergency = exports.getEmergency = function getEmergency(params, data) {
    //agak ragu
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_EMERGENCIES + params, 'POST', data);
  };
  var postEmergenciesAction = exports.postEmergenciesAction = function postEmergenciesAction(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_EMERGENCIES_ACTION + params, 'POST');
  };
  var putNotificationReaded = exports.putNotificationReaded = function putNotificationReaded(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_NOTIFICATION_READED, 'PUT', data);
  };
  var getNewArticle = exports.getNewArticle = function getNewArticle(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_NEWS_ARTICLE + params, 'GET');
  };
  var getEmergencyStatuses = exports.getEmergencyStatuses = function getEmergencyStatuses() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_EMERGENCIES_STATUSES, 'GET');
  };
  var postForgotPassword = exports.postForgotPassword = function postForgotPassword(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_FORGOT_PASSWORD, 'POST', data);
  };
  var getVirtualAccountDetail = exports.getVirtualAccountDetail = function getVirtualAccountDetail(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_UNITS + params, 'GET');
  };
  var getBillingPaid = exports.getBillingPaid = function getBillingPaid(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_BILLING_PAID + params, 'GET');
  };
  var getBillingDetail = exports.getBillingDetail = function getBillingDetail(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_BILLING_DETAIL + params, 'GET');
  };
  var putNotificationReadedAll = exports.putNotificationReadedAll = function putNotificationReadedAll() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_NOTIFICATION_READED_ALL, 'PUT');
  };
  var postLoginManager = exports.postLoginManager = function postLoginManager(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_LOGIN_MANAGER, 'POST', data);
  };
  var postNewsCreate = exports.postNewsCreate = function postNewsCreate(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_NEWS_CREATE, 'POST', data);
  };
  var putNewsEdit = exports.putNewsEdit = function putNewsEdit(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_NEWS_EDIT, 'PUT', data);
  };
  var putNewsToggle = exports.putNewsToggle = function putNewsToggle(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_NEWS_TOGGLE + params, 'PUT');
  };
  var postRating = exports.postRating = function postRating(params, data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_RATING + params, 'POST', data);
  };
  var postRatingPengelola = exports.postRatingPengelola = function postRatingPengelola(params, data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_RATING_PENGELOLA + params, 'POST', data);
  };
  var putUserExitUnit = exports.putUserExitUnit = function putUserExitUnit(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_USER_EXIT_UNIT, 'PUT', data);
  };
  var putUserSetUnit = exports.putUserSetUnit = function putUserSetUnit(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_USER_SET_UNIT, 'PUT', data);
  };
  var getUnitsOccupied = exports.getUnitsOccupied = function getUnitsOccupied(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_UNITS_OCCUPIED + params, 'GET');
  };
  var postUnitsOccupiedAdd = exports.postUnitsOccupiedAdd = function postUnitsOccupiedAdd(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_UNITS_OCCUPIED_ADD, 'POST', data);
  };
  var deleteUnitsOccupied = exports.deleteUnitsOccupied = function deleteUnitsOccupied(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_UNITS_OCCUPIED + params, 'DELETE');
  };
  var putUnitsOccupiedSwitch = exports.putUnitsOccupiedSwitch = function putUnitsOccupiedSwitch(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_UNITS_OCCUPIED_SWITCH, 'PUT', data);
  };
  var postBillingPDF = exports.postBillingPDF = function postBillingPDF(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_BILLING_PDF, 'POST', data);
  };
  var getTime = exports.getTime = function getTime() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_GET_TIME, 'GET');
  };
  var getClusters = exports.getClusters = function getClusters(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_GET_CLUSTERS + params, 'GET');
  };
  var putLike = exports.putLike = function putLike(params, data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_PUT_LIKE + params, 'PUT', data);
  };
  var getVendors = exports.getVendors = function getVendors(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_VENDORS, 'POST', data);
  };
  var postCommentNews = exports.postCommentNews = function postCommentNews(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_COMMENT_NEWS, 'POST', data);
  };
  var getCommentNews = exports.getCommentNews = function getCommentNews(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_COMMENT_NEWS + params, 'GET');
  };
  var deleteCommentNews = exports.deleteCommentNews = function deleteCommentNews(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_COMMENT_NEWS + params, 'DELETE');
  };
  var postCommentComplaints = exports.postCommentComplaints = function postCommentComplaints(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_COMMENT_COMPLAINTS, 'POST', data);
  };
  var getCommentComplaints = exports.getCommentComplaints = function getCommentComplaints(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_COMMENT_COMPLAINTS + params, 'GET');
  };
  var deleteCommentComplaints = exports.deleteCommentComplaints = function deleteCommentComplaints(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_COMMENT_COMPLAINTS + params, 'DELETE');
  };
  var deleteUser = exports.deleteUser = function deleteUser() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_DELETE_USER, 'DELETE');
  };
  var getEmergencyCategory = exports.getEmergencyCategory = function getEmergencyCategory() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_GET_CONTACT_CATEGORY, 'GET');
  };
  var postEmergencyContactList = exports.postEmergencyContactList = function postEmergencyContactList(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_GET_CONTACT_LIST, 'POST', data);
  };
  var getEmergencyDetail = exports.getEmergencyDetail = function getEmergencyDetail(id) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_GET_DETAIL_EMERGENCY + id, 'GET');
  };
  var postEmergencyResponseFinish = exports.postEmergencyResponseFinish = function postEmergencyResponseFinish(id, data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_POST_FINISH_EMERGENCY + id, 'POST', data);
  };
  var getEmergencyHistory = exports.getEmergencyHistory = function getEmergencyHistory() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_GET_HISTORY_EMERGENCY, 'GET');
  };
  var getEmergencyDetailHistory = exports.getEmergencyDetailHistory = function getEmergencyDetailHistory(id) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_GET_DETAIL_HISTORY_EMERGENCY + id, 'GET');
  };
  var getBank = exports.getBank = function getBank(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_BANK_ACCOUNT + params, 'GET');
  };
  var postBillingProcess = exports.postBillingProcess = function postBillingProcess(id, data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_BILLING_PROCESS + id, 'POST', data);
  };
  var getServiceCurrentTime = exports.getServiceCurrentTime = function getServiceCurrentTime() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_SERVICES_CURRENT_TIME, 'GET');
  };
  var postServicePaymentProcess = exports.postServicePaymentProcess = function postServicePaymentProcess(id, data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_SERVICE_PAYMENT_PROCESS + id, 'POST', data);
  };
  var getProductOrderList = exports.getProductOrderList = function getProductOrderList(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_PRODUCT_ORDER_LIST + params, 'GET');
  };
  var postProductList = exports.postProductList = function postProductList(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_PRODUCT_LIST, 'POST', data);
  };
  var postProductOrderCreate = exports.postProductOrderCreate = function postProductOrderCreate(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_PRODUCT_ORDER_CREATE, 'POST', data);
  };
  var getProductOrder = exports.getProductOrder = function getProductOrder(id) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_PRODUCT_ORDER + id, 'GET');
  };
  var putProductOrdersUpdateStatus = exports.putProductOrdersUpdateStatus = function putProductOrdersUpdateStatus(id) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_PRODUCT_ORDERS_UPDATE_STATUS + id, 'PUT');
  };
  var postProductPaymentProcess = exports.postProductPaymentProcess = function postProductPaymentProcess(id, data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_PRODUCT_PAYMENT_PROCESS + id, 'POST', data);
  };
  var getSmartHome = exports.getSmartHome = function getSmartHome() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_SMART_HOME, 'GET');
  };
  var getServicesVirtualAccount = exports.getServicesVirtualAccount = function getServicesVirtualAccount(id) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_SERVICES_VIRTUAL_ACCOUNT + id, 'GET');
  };
  var getMarketCategory = exports.getMarketCategory = function getMarketCategory() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_GET_MARKET_CATEGORY, 'GET');
  };
  var getDocumentsAll = exports.getDocumentsAll = function getDocumentsAll() {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_DOCUMENTS_ALL, 'GET');
  };
  var postDocumentsRequestCreate = exports.postDocumentsRequestCreate = function postDocumentsRequestCreate(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_DOCUMENTS_REQUEST_CREATE, 'POST', data);
  };
  var getDocumentsRequestMobile = exports.getDocumentsRequestMobile = function getDocumentsRequestMobile(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_DOCUMENTS_REQUEST_MOBILE + params, 'GET');
  };
  var patchDocumentsRequestCancel = exports.patchDocumentsRequestCancel = function patchDocumentsRequestCancel(id) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_DOCUMENTS_REQUEST_CANCEL + id, 'PATCH');
  };

  // new v2
  var postBillingInvoicePDF = exports.postBillingInvoicePDF = function postBillingInvoicePDF(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_BILLING_PDF_INVOICE, 'POST', data);
  };
  var postBillingReceiptPDF = exports.postBillingReceiptPDF = function postBillingReceiptPDF(data) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_BILLING_PDF_RECEIPT, 'POST', data);
  };
  var postBillingSOAPDF = exports.postBillingSOAPDF = function postBillingSOAPDF(params) {
    // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
    return (0, _axios.default)(_$$_REQUIRE(_dependencyMap[2]).URL_BILLING_PDF_SOA + params, 'GET');
  };
