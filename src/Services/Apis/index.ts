import xhr from './axios';

import {
  URL_ACTIVITIES_LIST,
  URL_BANK_ACCOUNT,
  URL_BILLING_DETAIL,
  URL_BILLING_PAID,
  URL_BILLING_PDF,
  URL_BILLING_PDF_INVOICE,
  URL_BILLING_PDF_RECEIPT,
  URL_BILLING_PDF_SOA,
  URL_BILLING_PROCESS,
  URL_CCTVS_RESIDENTS,
  URL_COMMENT_COMPLAINTS,
  URL_COMMENT_NEWS,
  URL_COMPLAINS_CREATE,
  URL_COMPLAINS_FILTER,
  URL_COMPLAINS_LABELS,
  URL_COMPLAINTS,
  URL_COMPLAINTS_CANCEL,
  URL_COMPLAINTS_DELETE,
  URL_COMPLAINTS_STATUSES,
  URL_DELETE_USER,
  URL_DOCUMENTS_ALL,
  URL_DOCUMENTS_REQUEST_CANCEL,
  URL_DOCUMENTS_REQUEST_CREATE,
  URL_DOCUMENTS_REQUEST_MOBILE,
  URL_EMERGENCIES,
  URL_EMERGENCIES_ACTION,
  URL_EMERGENCIES_CANCEL,
  URL_EMERGENCIES_SEND,
  URL_EMERGENCIES_STATUS,
  URL_EMERGENCIES_STATUSES,
  URL_FEATURES,
  URL_FORGET,
  URL_FORGOT_PASSWORD,
  URL_GET_CLUSTERS,
  URL_GET_CONTACT_CATEGORY,
  URL_GET_CONTACT_LIST,
  URL_GET_DETAIL_EMERGENCY,
  URL_GET_DETAIL_HISTORY_EMERGENCY,
  URL_GET_HISTORY_EMERGENCY,
  URL_GET_MARKET_CATEGORY,
  URL_GET_PROGRESS_PHOTO,
  URL_GET_TIME,
  URL_HIGHLIGHTS,
  URL_LOGIN,
  URL_LOGIN_MANAGER,
  URL_LOGOUT,
  URL_NEWS,
  URL_NEWS_ARTICLE,
  URL_NEWS_CATEGORIES,
  URL_NEWS_CATEGORY,
  URL_NEWS_CREATE,
  URL_NEWS_EDIT,
  URL_NEWS_TOGGLE,
  URL_NOTIFICATIONS_LIST,
  URL_NOTIFICATION_READED,
  URL_NOTIFICATION_READED_ALL,
  URL_NOTIFICATION_USER,
  URL_POST_FINISH_EMERGENCY,
  URL_PRODUCT_LIST,
  URL_PRODUCT_ORDER,
  URL_PRODUCT_ORDERS_UPDATE_STATUS,
  URL_PRODUCT_ORDER_CREATE,
  URL_PRODUCT_ORDER_LIST,
  URL_PRODUCT_PAYMENT_PROCESS,
  URL_PUT_LIKE,
  URL_RATING,
  URL_RATING_PENGELOLA,
  URL_RESIDENTS_EDIT,
  URL_RESIDENTS_HOUSES,
  URL_RESIDENTS_LOGOUT,
  URL_RESIDENTS_PASSWORD,
  URL_SERVICES,
  URL_SERVICES_CATEGORIES,
  URL_SERVICES_CURRENT_TIME,
  URL_SERVICES_ORDERS,
  URL_SERVICES_ORDERS_CANCEL,
  URL_SERVICES_ORDERS_CONFIRMATION,
  URL_SERVICES_ORDERS_CREATE,
  URL_SERVICES_ORDERS_STATUSES,
  URL_SERVICES_VIRTUAL_ACCOUNT,
  URL_SERVICE_PAYMENT_PROCESS,
  URL_SMART_HOME,
  URL_UNITS,
  URL_UNITS_FLOORS,
  URL_UNITS_OCCUPIED,
  URL_UNITS_OCCUPIED_ADD,
  URL_UNITS_OCCUPIED_SWITCH,
  URL_UNITS_TOWER,
  URL_UPLOADS,
  URL_USERS_REGISTER,
  URL_USER_EXIT_UNIT,
  URL_USER_SET_UNIT,
  URL_VENDORS,
} from '../../Configs/Api';

export const postLogin = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_LOGIN, 'POST', data);
};

export const postLogout = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_LOGOUT, 'POST', data);
};

export const postForget = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_FORGET, 'POST', data);
};

export const getNotificationList = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_NOTIFICATIONS_LIST + params, 'GET');
};

export const getActivitiesList = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_ACTIVITIES_LIST + params, 'GET');
};

export const getHighlights = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_HIGHLIGHTS, 'GET');
};

export const getResidentsHouses = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_RESIDENTS_HOUSES, 'GET');
};

export const getNewsCategory = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_NEWS_CATEGORY + params, 'GET');
};
export const getProgressPhoto = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_GET_PROGRESS_PHOTO + params, 'GET');
};

export const postCctvsResidents = (params: any, data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_CCTVS_RESIDENTS + params, 'POST', data);
};

export const getCctvsResidents = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_CCTVS_RESIDENTS + params, 'GET');
};

export const getComplainsLabels = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_COMPLAINS_LABELS, 'GET');
};

export const getComplaints = (params: any, data: any) => {
  //agak ragu
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_COMPLAINTS + params, 'POST', data);
};

export const postUpload = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_UPLOADS, 'POST', data);
};

export const getComplainsFilter = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_COMPLAINS_FILTER + params, 'GET');
};

export const putResidentEdit = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_RESIDENTS_EDIT, 'PUT', data);
};

export const postResidentLogout = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_RESIDENTS_LOGOUT, 'POST', data);
};

export const getNews = (params: any, data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_NEWS + params, 'POST', data);
};

export const getNewsCategories = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_NEWS_CATEGORIES, 'GET');
};

export const getFeatures = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_FEATURES, 'GET');
};

export const getComplaintsStatuses = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_COMPLAINTS_STATUSES, 'GET');
};

export const postComplainsCreate = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_COMPLAINS_CREATE, 'POST', data);
};

export const postEmergenciesSend = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_EMERGENCIES_SEND, 'POST', data);
};

export const getEmergencyStatus = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_EMERGENCIES_STATUS, 'GET');
};

export const getEmergencyCancel = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_EMERGENCIES_CANCEL, 'GET');
};

export const putResidentPassword = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_RESIDENTS_PASSWORD, 'PUT', data);
};

export const getServicesCategories = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_SERVICES_CATEGORIES, 'GET');
};

export const getServices = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_SERVICES + params, 'GET');
};

export const postServiceOrdersConfirmation = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_SERVICES_ORDERS_CONFIRMATION, 'POST', data);
};

export const postServiceOrdersCreate = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_SERVICES_ORDERS_CREATE, 'POST', data);
};

export const getServicesOrders = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_SERVICES_ORDERS + params, 'GET');
};

export const postServicesOrders = (params: any, data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_SERVICES_ORDERS + params, 'POST', data);
};

export const getServicesOrdersStatuses = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_SERVICES_ORDERS_STATUSES, 'GET');
};

export const getServicesOrdersCancel = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_SERVICES_ORDERS_CANCEL + params, 'GET');
};

export const getUnitsTower = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_UNITS_TOWER + params, 'GET');
};

export const getUnitsFloors = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_UNITS_FLOORS + params, 'GET');
};

export const getUnits = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_UNITS + params, 'GET');
};

export const postUsersRegister = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_USERS_REGISTER, 'POST', data);
};

export const getNotificationUser = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_NOTIFICATION_USER + params, 'GET');
};

export const postComplainsCancel = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_COMPLAINTS_CANCEL + params, 'POST');
};

export const deleteComplains = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_COMPLAINTS_DELETE + params, 'DELETE');
};

export const postComplainsStatus = (params: any, data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_COMPLAINTS + params, 'POST', data);
};

export const getDetailsComplaints = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_COMPLAINTS + params, 'GET');
};

export const getEmergency = (params: any, data: any) => {
  //agak ragu
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_EMERGENCIES + params, 'POST', data);
};

export const postEmergenciesAction = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_EMERGENCIES_ACTION + params, 'POST');
};

export const putNotificationReaded = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_NOTIFICATION_READED, 'PUT', data);
};

export const getNewArticle = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_NEWS_ARTICLE + params, 'GET');
};

export const getEmergencyStatuses = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_EMERGENCIES_STATUSES, 'GET');
};

export const postForgotPassword = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_FORGOT_PASSWORD, 'POST', data);
};

export const getVirtualAccountDetail = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_UNITS + params, 'GET');
};

export const getBillingPaid = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_BILLING_PAID + params, 'GET');
};

export const getBillingDetail = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_BILLING_DETAIL + params, 'GET');
};

export const putNotificationReadedAll = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_NOTIFICATION_READED_ALL, 'PUT');
};

export const postLoginManager = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_LOGIN_MANAGER, 'POST', data);
};

export const postNewsCreate = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_NEWS_CREATE, 'POST', data);
};

export const putNewsEdit = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_NEWS_EDIT, 'PUT', data);
};

export const putNewsToggle = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_NEWS_TOGGLE + params, 'PUT');
};

export const postRating = (params: any, data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_RATING + params, 'POST', data);
};

export const postRatingPengelola = (params: any, data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_RATING_PENGELOLA + params, 'POST', data);
};

export const putUserExitUnit = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_USER_EXIT_UNIT, 'PUT', data);
};

export const putUserSetUnit = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_USER_SET_UNIT, 'PUT', data);
};

export const getUnitsOccupied = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_UNITS_OCCUPIED + params, 'GET');
};

export const postUnitsOccupiedAdd = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_UNITS_OCCUPIED_ADD, 'POST', data);
};

export const deleteUnitsOccupied = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_UNITS_OCCUPIED + params, 'DELETE');
};

export const putUnitsOccupiedSwitch = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_UNITS_OCCUPIED_SWITCH, 'PUT', data);
};

export const postBillingPDF = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_BILLING_PDF, 'POST', data);
};

export const getTime = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_GET_TIME, 'GET');
};

export const getClusters = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_GET_CLUSTERS + params, 'GET');
};

export const putLike = (params: any, data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_PUT_LIKE + params, 'PUT', data);
};

export const getVendors = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_VENDORS, 'POST', data);
};

export const postCommentNews = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_COMMENT_NEWS, 'POST', data);
};

export const getCommentNews = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_COMMENT_NEWS + params, 'GET');
};

export const deleteCommentNews = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_COMMENT_NEWS + params, 'DELETE');
};

export const postCommentComplaints = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_COMMENT_COMPLAINTS, 'POST', data);
};

export const getCommentComplaints = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_COMMENT_COMPLAINTS + params, 'GET');
};

export const deleteCommentComplaints = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_COMMENT_COMPLAINTS + params, 'DELETE');
};

export const deleteUser = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_DELETE_USER, 'DELETE');
};

export const getEmergencyCategory = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_GET_CONTACT_CATEGORY, 'GET');
};

export const postEmergencyContactList = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_GET_CONTACT_LIST, 'POST', data);
};

export const getEmergencyDetail = (id: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_GET_DETAIL_EMERGENCY + id, 'GET');
};

export const postEmergencyResponseFinish = (id: any, data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_POST_FINISH_EMERGENCY + id, 'POST', data);
};

export const getEmergencyHistory = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_GET_HISTORY_EMERGENCY, 'GET');
};

export const getEmergencyDetailHistory = (id: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_GET_DETAIL_HISTORY_EMERGENCY + id, 'GET');
};

export const getBank = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_BANK_ACCOUNT + params, 'GET');
};

export const postBillingProcess = (id: any, data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_BILLING_PROCESS + id, 'POST', data);
};

export const getServiceCurrentTime = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_SERVICES_CURRENT_TIME, 'GET');
};

export const postServicePaymentProcess = (id: any, data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_SERVICE_PAYMENT_PROCESS + id, 'POST', data);
};

export const getProductOrderList = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_PRODUCT_ORDER_LIST + params, 'GET');
};

export const postProductList = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_PRODUCT_LIST, 'POST', data);
};

export const postProductOrderCreate = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_PRODUCT_ORDER_CREATE, 'POST', data);
};

export const getProductOrder = (id: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_PRODUCT_ORDER + id, 'GET');
};

export const putProductOrdersUpdateStatus = (id: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_PRODUCT_ORDERS_UPDATE_STATUS + id, 'PUT');
};

export const postProductPaymentProcess = (id: any, data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_PRODUCT_PAYMENT_PROCESS + id, 'POST', data);
};

export const getSmartHome = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_SMART_HOME, 'GET');
};

export const getServicesVirtualAccount = (id: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_SERVICES_VIRTUAL_ACCOUNT + id, 'GET');
};

export const getMarketCategory = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_GET_MARKET_CATEGORY, 'GET');
};

export const getDocumentsAll = () => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_DOCUMENTS_ALL, 'GET');
};

export const postDocumentsRequestCreate = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_DOCUMENTS_REQUEST_CREATE, 'POST', data);
};

export const getDocumentsRequestMobile = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_DOCUMENTS_REQUEST_MOBILE + params, 'GET');
};

export const patchDocumentsRequestCancel = (id: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_DOCUMENTS_REQUEST_CANCEL + id, 'PATCH');
};

// new v2
export const postBillingInvoicePDF = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_BILLING_PDF_INVOICE, 'POST', data);
};
export const postBillingReceiptPDF = (data: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 3.
  return xhr(URL_BILLING_PDF_RECEIPT, 'POST', data);
};
export const postBillingSOAPDF = (params: any) => {
  // @ts-expect-error TS(2554): Expected 4 arguments, but got 2.
  return xhr(URL_BILLING_PDF_SOA + params, 'GET');
};
