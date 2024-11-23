  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.URL_VENDORS = exports.URL_USER_SET_UNIT = exports.URL_USER_EXIT_UNIT = exports.URL_USERS_REGISTER = exports.URL_UPLOADS = exports.URL_UNITS_TOWER = exports.URL_UNITS_OCCUPIED_SWITCH = exports.URL_UNITS_OCCUPIED_ADD = exports.URL_UNITS_OCCUPIED = exports.URL_UNITS_FLOORS = exports.URL_UNITS = exports.URL_SMART_HOME = exports.URL_SERVICE_PAYMENT_PROCESS = exports.URL_SERVICES_VIRTUAL_ACCOUNT = exports.URL_SERVICES_ORDERS_STATUSES = exports.URL_SERVICES_ORDERS_CREATE = exports.URL_SERVICES_ORDERS_CONFIRMATION = exports.URL_SERVICES_ORDERS_CANCEL = exports.URL_SERVICES_ORDERS = exports.URL_SERVICES_CURRENT_TIME = exports.URL_SERVICES_CATEGORIES = exports.URL_SERVICES = exports.URL_RESIDENTS_PASSWORD = exports.URL_RESIDENTS_LOGOUT = exports.URL_RESIDENTS_HOUSES = exports.URL_RESIDENTS_EDIT = exports.URL_REFRESH = exports.URL_RATING_PENGELOLA = exports.URL_RATING = exports.URL_PUT_LIKE = exports.URL_PRODUCT_PAYMENT_PROCESS = exports.URL_PRODUCT_ORDER_LIST = exports.URL_PRODUCT_ORDER_CREATE = exports.URL_PRODUCT_ORDERS_UPDATE_STATUS = exports.URL_PRODUCT_ORDER = exports.URL_PRODUCT_LIST = exports.URL_POST_FINISH_EMERGENCY = exports.URL_NOTIFICATION_USER = exports.URL_NOTIFICATION_READED_ALL = exports.URL_NOTIFICATION_READED = exports.URL_NOTIFICATIONS_LIST = exports.URL_NEWS_TOGGLE = exports.URL_NEWS_EDIT = exports.URL_NEWS_CREATE = exports.URL_NEWS_CATEGORY = exports.URL_NEWS_CATEGORIES = exports.URL_NEWS_ARTICLE = exports.URL_NEWS = exports.URL_LOGOUT = exports.URL_LOGIN = exports.URL_HIGHLIGHTS = exports.URL_GET_TIME = exports.URL_GET_PROGRESS_PHOTO = exports.URL_GET_MARKET_CATEGORY = exports.URL_GET_HISTORY_EMERGENCY = exports.URL_GET_DETAIL_HISTORY_EMERGENCY = exports.URL_GET_DETAIL_EMERGENCY = exports.URL_GET_CONTACT_LIST = exports.URL_GET_CONTACT_CATEGORY = exports.URL_GET_CLUSTERS = exports.URL_FORGOT_PASSWORD = exports.URL_FORGET = exports.URL_FEATURES = exports.URL_EMERGENCIES_STATUSES = exports.URL_EMERGENCIES_STATUS = exports.URL_EMERGENCIES_SEND = exports.URL_EMERGENCIES_CANCEL = exports.URL_EMERGENCIES_ACTION = exports.URL_EMERGENCIES = exports.URL_DOCUMENTS_REQUEST_MOBILE = exports.URL_DOCUMENTS_REQUEST_CREATE = exports.URL_DOCUMENTS_REQUEST_CANCEL = exports.URL_DOCUMENTS_ALL = exports.URL_DELETE_USER = exports.URL_COMPLAINTS_STATUSES = exports.URL_COMPLAINTS_DELETE = exports.URL_COMPLAINTS_CANCEL = exports.URL_COMPLAINTS = exports.URL_COMPLAINS_LABELS = exports.URL_COMPLAINS_FILTER = exports.URL_COMPLAINS_CREATE = exports.URL_COMMENT_NEWS = exports.URL_COMMENT_COMPLAINTS = exports.URL_CCTVS_RESIDENTS = exports.URL_BILLING_PROCESS = exports.URL_BILLING_PDF_SOA = exports.URL_BILLING_PDF_RECEIPT = exports.URL_BILLING_PDF_INVOICE = exports.URL_BILLING_PDF = exports.URL_BILLING_PAID = exports.URL_BILLING_DETAIL = exports.URL_BANK_ACCOUNT = exports.URL_ACTIVITIES_LIST = undefined;
  var BASE_URL = "https://api.centralconnect.id"; // DEV
  // const BASE_URL = 'https://api.centralconnect.id'; // PROD
  // const BASE_URL = 'http://192.168.0.111:5000'; // LOCAL

  var URL_ACTIVITIES_LIST = exports.URL_ACTIVITIES_LIST = "https://api.centralconnect.id/api/activities/list";
  var URL_BANK_ACCOUNT = exports.URL_BANK_ACCOUNT = "https://api.centralconnect.id/api/bank/account";
  var URL_BILLING_DETAIL = exports.URL_BILLING_DETAIL = "https://api.centralconnect.id/api/v2/billing-actual/mobile";
  // export const URL_BILLING_DETAIL = BASE_URL + '/api/billing/detail';
  var URL_BILLING_PAID = exports.URL_BILLING_PAID = "https://api.centralconnect.id/api/billing";
  var URL_BILLING_PDF = exports.URL_BILLING_PDF = "https://api.centralconnect.id/api/billing/pdf";
  var URL_BILLING_PROCESS = exports.URL_BILLING_PROCESS = "https://api.centralconnect.id/api/v2/billing-actual/mobile/pay";
  // export const URL_BILLING_PROCESS = BASE_URL + '/api/billing/process/';
  var URL_CCTVS_RESIDENTS = exports.URL_CCTVS_RESIDENTS = "https://api.centralconnect.id/api/cameras";
  var URL_COMMENT_COMPLAINTS = exports.URL_COMMENT_COMPLAINTS = "https://api.centralconnect.id/api/comment/complaints";
  var URL_COMMENT_NEWS = exports.URL_COMMENT_NEWS = "https://api.centralconnect.id/api/comment/news";
  var URL_COMPLAINS_CREATE = exports.URL_COMPLAINS_CREATE = "https://api.centralconnect.id/api/complaints/create";
  var URL_COMPLAINS_FILTER = exports.URL_COMPLAINS_FILTER = "https://api.centralconnect.id/api/complains/filter";
  var URL_COMPLAINS_LABELS = exports.URL_COMPLAINS_LABELS = "https://api.centralconnect.id/api/complaints/categories";
  var URL_COMPLAINTS = exports.URL_COMPLAINTS = "https://api.centralconnect.id/api/complaints";
  var URL_COMPLAINTS_CANCEL = exports.URL_COMPLAINTS_CANCEL = "https://api.centralconnect.id/api/complaints/cancel/";
  var URL_COMPLAINTS_DELETE = exports.URL_COMPLAINTS_DELETE = "https://api.centralconnect.id/api/complaints/";
  var URL_COMPLAINTS_STATUSES = exports.URL_COMPLAINTS_STATUSES = "https://api.centralconnect.id/api/complaints/statuses";
  var URL_DELETE_USER = exports.URL_DELETE_USER = "https://api.centralconnect.id/api/users/delete";
  var URL_DOCUMENTS_ALL = exports.URL_DOCUMENTS_ALL = "https://api.centralconnect.id/api/documents/all";
  var URL_DOCUMENTS_REQUEST_CANCEL = exports.URL_DOCUMENTS_REQUEST_CANCEL = "https://api.centralconnect.id/api/documents/request/cancel";
  var URL_DOCUMENTS_REQUEST_CREATE = exports.URL_DOCUMENTS_REQUEST_CREATE = "https://api.centralconnect.id/api/documents/request/create";
  var URL_DOCUMENTS_REQUEST_MOBILE = exports.URL_DOCUMENTS_REQUEST_MOBILE = "https://api.centralconnect.id/api/documents/request/mobile";
  var URL_EMERGENCIES = exports.URL_EMERGENCIES = "https://api.centralconnect.id/api/emergencies";
  var URL_EMERGENCIES_ACTION = exports.URL_EMERGENCIES_ACTION = "https://api.centralconnect.id/api/emergencies/action";
  var URL_EMERGENCIES_CANCEL = exports.URL_EMERGENCIES_CANCEL = "https://api.centralconnect.id/api/emergencies/cancel";
  var URL_EMERGENCIES_SEND = exports.URL_EMERGENCIES_SEND = "https://api.centralconnect.id/api/emergencies/send";
  var URL_EMERGENCIES_STATUS = exports.URL_EMERGENCIES_STATUS = "https://api.centralconnect.id/api/emergencies/status";
  var URL_EMERGENCIES_STATUSES = exports.URL_EMERGENCIES_STATUSES = "https://api.centralconnect.id/api/emergencies/statuses";
  var URL_FEATURES = exports.URL_FEATURES = "https://api.centralconnect.id/api/features";
  var URL_FORGET = exports.URL_FORGET = "https://api.centralconnect.id/api/residents/forget";
  var URL_FORGOT_PASSWORD = exports.URL_FORGOT_PASSWORD = "https://api.centralconnect.id/api/users/forgot_password";
  var URL_GET_CLUSTERS = exports.URL_GET_CLUSTERS = "https://api.centralconnect.id/api/clusters";
  var URL_GET_TIME = exports.URL_GET_TIME = "https://api.centralconnect.id/api/users/time/now";
  var URL_HIGHLIGHTS = exports.URL_HIGHLIGHTS = "https://api.centralconnect.id/api/news/banners";
  var URL_LOGIN = exports.URL_LOGIN = "https://api.centralconnect.id/api/auths/login";
  var URL_LOGOUT = exports.URL_LOGOUT = "https://api.centralconnect.id/api/auths/logout";
  var URL_NEWS = exports.URL_NEWS = "https://api.centralconnect.id/api/news";
  var URL_NEWS_ARTICLE = exports.URL_NEWS_ARTICLE = "https://api.centralconnect.id/api/news/article";
  var URL_NEWS_CATEGORIES = exports.URL_NEWS_CATEGORIES = "https://api.centralconnect.id/api/news/categories";
  var URL_NEWS_CATEGORY = exports.URL_NEWS_CATEGORY = "https://api.centralconnect.id/api/news/category";
  var URL_NEWS_CREATE = exports.URL_NEWS_CREATE = "https://api.centralconnect.id/api/news/create";
  var URL_NEWS_EDIT = exports.URL_NEWS_EDIT = "https://api.centralconnect.id/api/news/edit";
  var URL_NEWS_TOGGLE = exports.URL_NEWS_TOGGLE = "https://api.centralconnect.id/api/news/toggle";
  var URL_NOTIFICATION_READED = exports.URL_NOTIFICATION_READED = "https://api.centralconnect.id/api/notifications/readed";
  var URL_NOTIFICATION_READED_ALL = exports.URL_NOTIFICATION_READED_ALL = "https://api.centralconnect.id/api/notifications/read/all";
  var URL_NOTIFICATION_USER = exports.URL_NOTIFICATION_USER = "https://api.centralconnect.id/api/notifications/user";
  var URL_NOTIFICATIONS_LIST = exports.URL_NOTIFICATIONS_LIST = "https://api.centralconnect.id/api/notifications/list";
  var URL_PRODUCT_LIST = exports.URL_PRODUCT_LIST = "https://api.centralconnect.id/api/products?order=created_at:asc";
  var URL_PRODUCT_ORDER = exports.URL_PRODUCT_ORDER = "https://api.centralconnect.id/api/products/orders/";
  var URL_PRODUCT_ORDER_CREATE = exports.URL_PRODUCT_ORDER_CREATE = "https://api.centralconnect.id/api/products/orders/create";
  var URL_PRODUCT_ORDER_LIST = exports.URL_PRODUCT_ORDER_LIST = "https://api.centralconnect.id/api/products/orders/list";
  var URL_PRODUCT_ORDERS_UPDATE_STATUS = exports.URL_PRODUCT_ORDERS_UPDATE_STATUS = "https://api.centralconnect.id/api/products/orders/cancel/";
  var URL_PRODUCT_PAYMENT_PROCESS = exports.URL_PRODUCT_PAYMENT_PROCESS = "https://api.centralconnect.id/api/products/payment/process/";
  var URL_PUT_LIKE = exports.URL_PUT_LIKE = "https://api.centralconnect.id/api/news/like";
  var URL_RATING = exports.URL_RATING = "https://api.centralconnect.id/api/complaints/rating";
  var URL_RATING_PENGELOLA = exports.URL_RATING_PENGELOLA = "https://api.centralconnect.id/api/complaints/rating-pengelola";
  var URL_REFRESH = exports.URL_REFRESH = "https://api.centralconnect.id/api/auths/refresh";
  var URL_RESIDENTS_EDIT = exports.URL_RESIDENTS_EDIT = "https://api.centralconnect.id/api/users/update";
  var URL_RESIDENTS_HOUSES = exports.URL_RESIDENTS_HOUSES = "https://api.centralconnect.id/api/residents/houses";
  var URL_RESIDENTS_LOGOUT = exports.URL_RESIDENTS_LOGOUT = "https://api.centralconnect.id/api/residents/logout";
  var URL_RESIDENTS_PASSWORD = exports.URL_RESIDENTS_PASSWORD = "https://api.centralconnect.id/api/users/password";
  var URL_SERVICE_PAYMENT_PROCESS = exports.URL_SERVICE_PAYMENT_PROCESS = "https://api.centralconnect.id/api/services/payment/process/";
  var URL_SERVICES = exports.URL_SERVICES = "https://api.centralconnect.id/api/services/mobile/";
  var URL_SERVICES_CATEGORIES = exports.URL_SERVICES_CATEGORIES = "https://api.centralconnect.id/api/services/categories";
  var URL_SERVICES_CURRENT_TIME = exports.URL_SERVICES_CURRENT_TIME = "https://api.centralconnect.id/api/services/current/time";
  var URL_SERVICES_ORDERS = exports.URL_SERVICES_ORDERS = "https://api.centralconnect.id/api/services/orders/";
  var URL_SERVICES_ORDERS_CANCEL = exports.URL_SERVICES_ORDERS_CANCEL = "https://api.centralconnect.id/api/services/orders/cancel/";
  var URL_SERVICES_ORDERS_CONFIRMATION = exports.URL_SERVICES_ORDERS_CONFIRMATION = "https://api.centralconnect.id/api/services/orders/confirmation";
  var URL_SERVICES_ORDERS_CREATE = exports.URL_SERVICES_ORDERS_CREATE = "https://api.centralconnect.id/api/services/orders/create";
  var URL_SERVICES_ORDERS_STATUSES = exports.URL_SERVICES_ORDERS_STATUSES = "https://api.centralconnect.id/api/services/orders/statuses";
  var URL_SERVICES_VIRTUAL_ACCOUNT = exports.URL_SERVICES_VIRTUAL_ACCOUNT = "https://api.centralconnect.id/api/services/virtual-account/";
  var URL_SMART_HOME = exports.URL_SMART_HOME = "https://api.centralconnect.id/api/features/smart-home";
  var URL_UNITS = exports.URL_UNITS = "https://api.centralconnect.id/api/units/";
  var URL_UNITS_FLOORS = exports.URL_UNITS_FLOORS = "https://api.centralconnect.id/api/units/block";
  var URL_UNITS_OCCUPIED = exports.URL_UNITS_OCCUPIED = "https://api.centralconnect.id/api/units/occupied";
  var URL_UNITS_OCCUPIED_ADD = exports.URL_UNITS_OCCUPIED_ADD = "https://api.centralconnect.id/api/units/occupied/add";
  var URL_UNITS_OCCUPIED_SWITCH = exports.URL_UNITS_OCCUPIED_SWITCH = "https://api.centralconnect.id/api/units/occupied/switch";
  var URL_UNITS_TOWER = exports.URL_UNITS_TOWER = "https://api.centralconnect.id/api/clusters";
  var URL_UPLOADS = exports.URL_UPLOADS = "https://api.centralconnect.id/api/uploads";
  var URL_USER_EXIT_UNIT = exports.URL_USER_EXIT_UNIT = "https://api.centralconnect.id/api/users/exit-unit";
  var URL_USER_SET_UNIT = exports.URL_USER_SET_UNIT = "https://api.centralconnect.id/api/users/set-unit";
  var URL_USERS_REGISTER = exports.URL_USERS_REGISTER = "https://api.centralconnect.id/api/users/register";
  var URL_VENDORS = exports.URL_VENDORS = "https://api.centralconnect.id/api/services/vendors";

  //Manager
  //export const URL_LOGIN_MANAGER = BASE_URL + '/api/managers/login'
  //export const URL_EMERGENCIES_STATUS = BASE_URL + '/api/emergencies/status'
  //export const URL_EMERGENCIES = BASE_URL + '/api/emergencies/'

  //Emergencies
  var URL_GET_CONTACT_CATEGORY = exports.URL_GET_CONTACT_CATEGORY = "https://api.centralconnect.id/api/emergencies/contact/categories";
  var URL_GET_CONTACT_LIST = exports.URL_GET_CONTACT_LIST = "https://api.centralconnect.id/api/emergencies/contact/list?page=1&per_page=50&search=&order=name:asc";
  var URL_GET_DETAIL_EMERGENCY = exports.URL_GET_DETAIL_EMERGENCY = "https://api.centralconnect.id/api/emergencies/detail/";
  var URL_POST_FINISH_EMERGENCY = exports.URL_POST_FINISH_EMERGENCY = "https://api.centralconnect.id/api/emergencies/finish/";
  var URL_GET_HISTORY_EMERGENCY = exports.URL_GET_HISTORY_EMERGENCY = "https://api.centralconnect.id/api/emergencies/history/list";
  var URL_GET_DETAIL_HISTORY_EMERGENCY = exports.URL_GET_DETAIL_HISTORY_EMERGENCY = "https://api.centralconnect.id/api/emergencies/history/detail/";

  //Market
  var URL_GET_MARKET_CATEGORY = exports.URL_GET_MARKET_CATEGORY = "https://api.centralconnect.id/api/products/categories";
  var URL_GET_PROGRESS_PHOTO = exports.URL_GET_PROGRESS_PHOTO = "https://api.centralconnect.id/api/photos/";

  // new v2
  var URL_BILLING_PDF_INVOICE = exports.URL_BILLING_PDF_INVOICE = "https://api.centralconnect.id/api/v2/billing-actual/pdf-invoice";
  var URL_BILLING_PDF_RECEIPT = exports.URL_BILLING_PDF_RECEIPT = "https://api.centralconnect.id/api/v2/billing-actual/pdf-receipt";
  var URL_BILLING_PDF_SOA = exports.URL_BILLING_PDF_SOA = "https://api.centralconnect.id/api/v2/billing-actual/pdf-soa";
