import { API_URL } from '@env';

const BASE_URL = API_URL; // DEV
// const BASE_URL = 'https://api.centralconnect.id'; // PROD
// const BASE_URL = 'http://192.168.0.111:5000'; // LOCAL

export const URL_ACTIVITIES_LIST = BASE_URL + '/api/activities/list';
export const URL_BANK_ACCOUNT = BASE_URL + '/api/bank/account';
export const URL_BILLING_DETAIL = BASE_URL + '/api/v2/billing-actual/mobile';
// export const URL_BILLING_DETAIL = BASE_URL + '/api/billing/detail';
export const URL_BILLING_PAID = BASE_URL + '/api/billing';
export const URL_BILLING_PDF = BASE_URL + '/api/billing/pdf';

export const URL_BILLING_PROCESS = BASE_URL + '/api/v2/billing-actual/mobile/pay';
// export const URL_BILLING_PROCESS = BASE_URL + '/api/billing/process/';
export const URL_CCTVS_RESIDENTS = BASE_URL + '/api/cameras';
export const URL_COMMENT_COMPLAINTS = BASE_URL + '/api/comment/complaints';
export const URL_COMMENT_NEWS = BASE_URL + '/api/comment/news';
export const URL_COMPLAINS_CREATE = BASE_URL + '/api/complaints/create';
export const URL_COMPLAINS_FILTER = BASE_URL + '/api/complains/filter';
export const URL_COMPLAINS_LABELS = BASE_URL + '/api/complaints/categories';
export const URL_COMPLAINTS = BASE_URL + '/api/complaints';
export const URL_COMPLAINTS_CANCEL = BASE_URL + '/api/complaints/cancel/';
export const URL_COMPLAINTS_DELETE = BASE_URL + '/api/complaints/';
export const URL_COMPLAINTS_STATUSES = BASE_URL + '/api/complaints/statuses';
export const URL_DELETE_USER = BASE_URL + '/api/users/delete';
export const URL_DOCUMENTS_ALL = BASE_URL + '/api/documents/all';
export const URL_DOCUMENTS_REQUEST_CANCEL = BASE_URL + '/api/documents/request/cancel';
export const URL_DOCUMENTS_REQUEST_CREATE = BASE_URL + '/api/documents/request/create';
export const URL_DOCUMENTS_REQUEST_MOBILE = BASE_URL + '/api/documents/request/mobile';
export const URL_EMERGENCIES = BASE_URL + '/api/emergencies';
export const URL_EMERGENCIES_ACTION = BASE_URL + '/api/emergencies/action';
export const URL_EMERGENCIES_CANCEL = BASE_URL + '/api/emergencies/cancel';
export const URL_EMERGENCIES_SEND = BASE_URL + '/api/emergencies/send';
export const URL_EMERGENCIES_STATUS = BASE_URL + '/api/emergencies/status';
export const URL_EMERGENCIES_STATUSES = BASE_URL + '/api/emergencies/statuses';
export const URL_FEATURES = BASE_URL + '/api/features';
export const URL_FORGET = BASE_URL + '/api/residents/forget';
export const URL_FORGOT_PASSWORD = BASE_URL + '/api/users/forgot_password';
export const URL_GET_CLUSTERS = BASE_URL + '/api/clusters';
export const URL_GET_TIME = BASE_URL + '/api/users/time/now';
export const URL_HIGHLIGHTS = BASE_URL + '/api/news/banners';
export const URL_LOGIN = BASE_URL + '/api/auths/login';
export const URL_LOGOUT = BASE_URL + '/api/auths/logout';
export const URL_NEWS = BASE_URL + '/api/news';
export const URL_NEWS_ARTICLE = BASE_URL + '/api/news/article';
export const URL_NEWS_CATEGORIES = BASE_URL + '/api/news/categories';
export const URL_NEWS_CATEGORY = BASE_URL + '/api/news/category';
export const URL_NEWS_CREATE = BASE_URL + '/api/news/create';
export const URL_NEWS_EDIT = BASE_URL + '/api/news/edit';
export const URL_NEWS_TOGGLE = BASE_URL + '/api/news/toggle';
export const URL_NOTIFICATION_READED = BASE_URL + '/api/notifications/readed';
export const URL_NOTIFICATION_READED_ALL = BASE_URL + '/api/notifications/read/all';
export const URL_NOTIFICATION_USER = BASE_URL + '/api/notifications/user';
export const URL_NOTIFICATIONS_LIST = BASE_URL + '/api/notifications/list';
export const URL_PRODUCT_LIST = BASE_URL + '/api/products?order=created_at:asc';
export const URL_PRODUCT_ORDER = BASE_URL + '/api/products/orders/';
export const URL_PRODUCT_ORDER_CREATE = BASE_URL + '/api/products/orders/create';
export const URL_PRODUCT_ORDER_LIST = BASE_URL + '/api/products/orders/list';
export const URL_PRODUCT_ORDERS_UPDATE_STATUS = BASE_URL + '/api/products/orders/cancel/';
export const URL_PRODUCT_PAYMENT_PROCESS = BASE_URL + '/api/products/payment/process/';
export const URL_PUT_LIKE = BASE_URL + '/api/news/like';
export const URL_RATING = BASE_URL + '/api/complaints/rating';
export const URL_RATING_PENGELOLA = BASE_URL + '/api/complaints/rating-pengelola';
export const URL_REFRESH = BASE_URL + '/api/auths/refresh';
export const URL_RESIDENTS_EDIT = BASE_URL + '/api/users/update';
export const URL_RESIDENTS_HOUSES = BASE_URL + '/api/residents/houses';
export const URL_RESIDENTS_LOGOUT = BASE_URL + '/api/residents/logout';
export const URL_RESIDENTS_PASSWORD = BASE_URL + '/api/users/password';
export const URL_SERVICE_PAYMENT_PROCESS = BASE_URL + '/api/services/payment/process/';
export const URL_SERVICES = BASE_URL + '/api/services/mobile/';
export const URL_SERVICES_CATEGORIES = BASE_URL + '/api/services/categories';
export const URL_SERVICES_CURRENT_TIME = BASE_URL + '/api/services/current/time';
export const URL_SERVICES_ORDERS = BASE_URL + '/api/services/orders/';
export const URL_SERVICES_ORDERS_CANCEL = BASE_URL + '/api/services/orders/cancel/';
export const URL_SERVICES_ORDERS_CONFIRMATION = BASE_URL + '/api/services/orders/confirmation';
export const URL_SERVICES_ORDERS_CREATE = BASE_URL + '/api/services/orders/create';
export const URL_SERVICES_ORDERS_STATUSES = BASE_URL + '/api/services/orders/statuses';
export const URL_SERVICES_VIRTUAL_ACCOUNT = BASE_URL + '/api/services/virtual-account/';
export const URL_SMART_HOME = BASE_URL + '/api/features/smart-home';
export const URL_UNITS = BASE_URL + '/api/units/';
export const URL_UNITS_FLOORS = BASE_URL + '/api/units/block';
export const URL_UNITS_OCCUPIED = BASE_URL + '/api/units/occupied';
export const URL_UNITS_OCCUPIED_ADD = BASE_URL + '/api/units/occupied/add';
export const URL_UNITS_OCCUPIED_SWITCH = BASE_URL + '/api/units/occupied/switch';
export const URL_UNITS_TOWER = BASE_URL + '/api/clusters';
export const URL_UPLOADS = BASE_URL + '/api/uploads';
export const URL_USER_EXIT_UNIT = BASE_URL + '/api/users/exit-unit';
export const URL_USER_SET_UNIT = BASE_URL + '/api/users/set-unit';
export const URL_USERS_REGISTER = BASE_URL + '/api/users/register';
export const URL_VENDORS = BASE_URL + '/api/services/vendors';

//Manager
//export const URL_LOGIN_MANAGER = BASE_URL + '/api/managers/login'
//export const URL_EMERGENCIES_STATUS = BASE_URL + '/api/emergencies/status'
//export const URL_EMERGENCIES = BASE_URL + '/api/emergencies/'

//Emergencies
export const URL_GET_CONTACT_CATEGORY = BASE_URL + '/api/emergencies/contact/categories';
export const URL_GET_CONTACT_LIST =
  BASE_URL + '/api/emergencies/contact/list?page=1&per_page=50&search=&order=name:asc';
export const URL_GET_DETAIL_EMERGENCY = BASE_URL + '/api/emergencies/detail/';
export const URL_POST_FINISH_EMERGENCY = BASE_URL + '/api/emergencies/finish/';
export const URL_GET_HISTORY_EMERGENCY = BASE_URL + '/api/emergencies/history/list';
export const URL_GET_DETAIL_HISTORY_EMERGENCY = BASE_URL + '/api/emergencies/history/detail/';

//Market
export const URL_GET_MARKET_CATEGORY = BASE_URL + '/api/products/categories';
export const URL_GET_PROGRESS_PHOTO = BASE_URL + '/api/photos/';

// new v2
export const URL_BILLING_PDF_INVOICE = BASE_URL + '/api/v2/billing-actual/pdf-invoice';
export const URL_BILLING_PDF_RECEIPT = BASE_URL + '/api/v2/billing-actual/pdf-receipt';
export const URL_BILLING_PDF_SOA = BASE_URL + '/api/v2/billing-actual/pdf-soa';
