// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { StyleSheet, Dimensions, Platform } from 'react-native';
import { toDp } from "../../Helper/percentageToDP";
import { getBottomSpace } from 'react-native-iphone-x-helper';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headeriOS: {
    width,
    height: toDp(20),
    backgroundColor: '#917438',
  },
  linearFab: {
    padding: toDp(16),
    borderRadius: toDp(28),
    width: toDp(56),
    height: toDp(56),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 4,
    position: 'absolute',
    bottom: toDp(24),
    right: toDp(24),
    zIndex: 1,
  },
  fabAdd: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icAdd: {
    width: toDp(36),
    height: toDp(36),
    tintColor: 'white',
  },
  // header: {
  //   width,
  //   height: 'auto',
  //   borderBottomWidth: toDp(1),
  //   borderBottomColor: '#917438',
  //   backgroundColor: 'white',
  // },
  // linearHeader: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   height: toDp(60),
  // },
  // touchHeader: {
  //   padding: toDp(4),
  //   position: 'absolute',
  //   left: toDp(12),
  //   top: toDp(16),
  //   zIndex: 1,
  // },
  // icBack: {
  //   //marginHorizontal: toDp(8),
  //   width: toDp(24),
  //   height: toDp(24),
  //   tintColor: '#917438',
  // },
  // touchHeaderSearch: {
  //   padding: toDp(4),
  //   position: 'absolute',
  //   right: toDp(12),
  //   top: toDp(16),
  // },
  // icFilter: {
  //   fontSize: toDp(14),
  //   width: toDp(24),
  //   height: toDp(24),
  //   tintColor: '#917438',
  // },
  // title: {
  //   color: '#917438',
  //   fontSize: toDp(18),
  //   //fontFamily: 'Montserrat-SemiBold',
  // },

  content: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },
  containerItem: {
    width,
    //height: toDp(127),
    height: 'auto',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: toDp(2),
    paddingBottom: toDp(16),
    //paddingHorizontal: toDp(8)
  },
  cards: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: toDp(16),
  },
  months: {
    fontSize: toDp(16),
    color: '#333',
    //fontFamily: 'Montserrat-Bold'
  },
  price: {
    fontSize: toDp(18),
    color: '#333',
    //fontFamily: 'Montserrat-Regular'
  },
  cardDate: {
    marginTop: toDp(16),
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: toDp(25),
    height: toDp(25),
    marginRight: toDp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewModalTitle: {
    marginTop: toDp(24),
    marginHorizontal: toDp(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    maxWidth: '100%',
    resizeMode: 'contain',
  },
  cardDetails: {
    marginTop: toDp(10),
    width: '100%',
    flexDirection: 'row',
  },
  date: {
    fontSize: toDp(12),
    color: '#666',
    marginRight: toDp(20),
    //fontFamily: 'Montserrat-Regular'
  },
  invoiceNumber: {
    fontSize: toDp(14),
    color: '#666',
    alignItems: 'flex-start',
    //fontFamily: 'Montserrat-Regular'
  },
  logoContainer: {
    width: toDp(16),
    height: toDp(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconNext: {
    maxHeight: '100%',
    resizeMode: 'contain',
    marginLeft: toDp(4),
    marginBottom: toDp(12),
  },
  due: {
    color: 'red',
    fontSize: toDp(12),
  },
  viewCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingShimmer: {
    width: '95%',
    height: toDp(110),
    borderRadius: toDp(5),
    marginTop: toDp(16),
  },
  // textName: {
  //   marginLeft: toDp(8),
  //   color: '#616161',
  //   //fontFamily: 'Montserrat-Bold',
  //   fontSize: toDp(16),
  // },
  textPosition: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(12),
    color: '#BDBDBD',
    marginLeft: toDp(8),
  },
  containerDesc: {
    width: width * 0.906,
    marginLeft: toDp(16),
    paddingHorizontal: toDp(16),
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  titleContent: {
    //fontFamily: 'Montserrat-Bold',
    fontSize: toDp(18),
    marginTop: toDp(6),
    textAlign: 'center',
    color: '#333333',
  },
  textContent: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(16),
    color: '#333333',
    marginTop: toDp(10),
    textAlign: 'center',
  },
  profile: {
    width: toDp(40),
    height: toDp(40),
    borderRadius: toDp(40),
  },
  imageContent: {
    //height: height / 2,
    height: toDp(328),
    marginTop: toDp(16),
    marginBottom: toDp(8),
    width: width * 0.906,
    resizeMode: 'contain',
  },

  //ZAINI
  viewRow: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: toDp(20),
    paddingTop: toDp(16),
  },
  imgPicture: {
    width: toDp(95),
    height: toDp(95),
    borderRadius: toDp(4),
    marginRight: toDp(12),
  },
  labelpic: {
    width: toDp(24),
    height: toDp(24),
  },
  // itemTitle: {
  //   fontSize: toDp(14),
  //   color: '#383B34',
  //   marginTop: toDp(-4),
  //   width: toDp(212),
  // },
  viewRowItem: {
    flexDirection: 'row',
    marginTop: toDp(8),
    alignItems: 'center',
  },
  itemContent: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(14),
    color: '#333333',
  },
  viewTitleContent: {
    width: '100%',
    paddingLeft: toDp(16),
    paddingBottom: toDp(16),
  },
  itemDate: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(14),
    color: '#4b5a74',
    marginLeft: toDp(4),
  },
  itemLocation: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(12),
    color: '#4b5a74',
    marginTop: toDp(16),
  },

  icCalendar: {
    width: toDp(16),
    height: toDp(16),
    marginRight: toDp(8),
  },
  icLp: {
    width: toDp(16),
    height: toDp(16),
    marginRight: toDp(8),
  },
  text: {
    fontSize: toDp(12),
    color: '#000000',
    //fontFamily: 'Montserrat-Regular',
    letterSpacing: 0,
  },
  viewStatus: {
    marginTop: toDp(10),
    width: toDp(56),
    height: toDp(20),
    borderRadius: toDp(11),
    backgroundColor: '#917438',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStatus: {
    fontSize: toDp(10),
    color: '#FFFFFF',
    //fontFamily: 'Montserrat-SemiBold',
  },

  // touchSilang: {
  //   padding: toDp(4),
  // },
  icSilangModal: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#917438',
  },
  viewArrayStatus: {
    marginTop: toDp(24),
    paddingHorizontal: toDp(24),
  },
  touchStatus: {
    width: 'auto',
    height: toDp(40),
    paddingHorizontal: toDp(14),
    borderRadius: toDp(45),
    marginBottom: toDp(16),
    backgroundColor: '#91743819',
    borderWidth: toDp(1),
    borderColor: '#917438',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: toDp(10),
  },
  textStatusItem: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(14),
    color: '#917438',
  },
  lineCenter: {
    alignItems: 'center',
    marginTop: toDp(16),
  },
  lineModal: {
    width: toDp(64),
    height: toDp(4),
    backgroundColor: '#d3d6db',
    borderRadius: toDp(7),
  },
  viewRowImage: {
    width: '92%',
    flexDirection: 'row',
    height: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: toDp(12),
  },
  viewRowNameImage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgProfile: {
    width: toDp(40),
    height: toDp(40),
    borderRadius: toDp(20),
  },
  textNameReport: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(12),
    marginLeft: toDp(8),
  },
  itemTitle: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(14),
    color: '#273238',
  },
  viewContentItem: {
    width: '92%',
    marginTop: toDp(12),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  itemDesc: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(12),
    marginTop: toDp(8),
    textAlign: 'left',
    width: '92%',
  },
  viewKomentar: {
    width: '100%',
    alignItems: 'flex-end',
    backgroundColor: 'white',
    paddingRight: toDp(20),
  },
  touchKomentar: {
    flexDirection: 'row',
    padding: toDp(4),
  },
  icMessage: {
    width: toDp(14),
    height: toDp(14),
  },
  textKomentar: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(12),
    fontWeight: '500',
    color: '#273238',
    marginLeft: toDp(8),
  },

  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewRootModal: {
    width,
    position: 'absolute',
    bottom: 0,
  },
  modalBox: {
    width,
    height: height * 0.7,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: toDp(16),
    borderTopRightRadius: toDp(16),
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  textTitleModal: {
    //fontFamily: 'Montserrat-Bold',
    fontSize: toDp(14),
    letterSpacing: toDp(2),
    color: '#263238',
    fontWeight: '700',
  },
  // touchSilang: {
  //   padding: toDp(4),
  // },
  // icSilang: {
  //   width: toDp(20),
  //   height: toDp(20),
  //   tintColor: '#263238',
  // },
  modalFooter: {
    width,
    height: toDp(60) + getBottomSpace(),
    backgroundColor: 'white',
    borderTopWidth: Platform.OS === 'ios' ? toDp(1) : 0,
    borderTopColor: '#838A9A40',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: toDp(0.8),
    flexDirection: 'row',
    paddingHorizontal: toDp(8),
    paddingTop: toDp(10),
    paddingBottom: Platform.OS === 'android' ? toDp(10) : getBottomSpace(),
  },
  imgUser: {
    width: toDp(40),
    height: toDp(40),
    borderRadius: toDp(20),
  },
  touchPost: {
    position: 'absolute',
    right: toDp(20),
    top: toDp(24),
  },
  textPost: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(12),
    color: '#917438',
    fontWeight: '600',
  },
  bgShadow: {
    width,
    height,
    backgroundColor: '#0000004D',
  },
  rowFront: {
    width,
    backgroundColor: 'white',
    flexDirection: 'row',
    //alignItems: 'center',
    height: 'auto',
    justifyContent: 'space-between',
    paddingVertical: toDp(12),
  },
  imgCommentUser: {
    width: toDp(40),
    height: toDp(40),
    borderRadius: toDp(20),
    marginHorizontal: toDp(16),
  },
  textName: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(12),
    color: '#788F9C',
    fontWeight: '600',
  },
  textMessage: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(14),
    color: '#000000',
    fontWeight: '400',
    marginTop: toDp(4),
    width: width * 0.755,
  },
  textTime: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(12),
    color: '#788F9C',
    fontWeight: '400',
    position: 'absolute',
    right: toDp(16),
    top: toDp(12),
  },
  viewUserName: {
    flexDirection: 'row',
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  touchDelete: {
    flex: 1,
    backgroundColor: '#EE4040',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icCommentDelete: {
    tintColor: 'white',
    width: toDp(26.67),
    height: toDp(26.67),
  },

  viewEmpty: {
    alignItems: 'center',
    marginTop: toDp(-24),
  },
  textBelum: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(14),
    color: '#35405A',
    fontWeight: '500',
  },
  textMulai: {
    //fontFamily: 'Montserrat-Regular',
    fontSize: toDp(14),
    color: '#838A9A',
    fontWeight: '400',
    marginTop: toDp(6),
  },
  // header: {
  //   width,
  //   height: 'auto',
  //   borderBottomWidth: toDp(1),
  //   borderBottomColor: '#917438',
  //   backgroundColor: 'white',
  // },
  linearHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    height: toDp(60),
  },
  // touchHeader: {
  //   padding: toDp(4),
  //   position: 'absolute',
  //   left: toDp(12),
  //   top: toDp(16),
  //   zIndex: 1,
  // },
  // icBack: {
  //   //marginHorizontal: toDp(8),
  //   width: toDp(24),
  //   height: toDp(24),
  //   tintColor: '#917438',
  // },
  // headerRow: {
  //   position: 'absolute',
  //   right: toDp(12),
  //   top: toDp(16),
  //   flexDirection: 'row',
  // },
  touchHeaderSearchNew: {
    padding: toDp(4),
    position: 'absolute',
    top: toDp(-86),
    right: toDp(12),
  },
  // icFilter: {
  //   width: toDp(24),
  //   height: toDp(24),
  //   tintColor: '#917438',
  // },
  // title: {
  //   color: '#917438',
  //   fontSize: toDp(18),
  //   //fontFamily: 'Montserrat-SemiBold',
  // },

  viewText: {
    width: '86%',
    //height: toDp(40),
    height: 'auto',
    backgroundColor: '#F3F5F6',
    marginLeft: toDp(8),
    borderRadius: toDp(2),
    //padding: toDp(12)
  },
  textInput: {
    flex: 1,
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    fontWeight: '400',
    color: '#273238',
    marginHorizontal: toDp(12),
    width: width * 0.61,
    //marginLeft: Platform.OS === 'android' ? toDp(-4) : 0,
  },

  touchSilang: {
    padding: toDp(4),
  },
  icSilang: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#917438',
  },
  viewFooterDialog: {
    width: '100%',
    height: toDp(54) + getBottomSpace(),
    paddingBottom: Platform.OS === 'android' ? toDp(10) : getBottomSpace(),
    //borderTopWidth: Platform.OS === 'ios' ? toDp(0.8) : 0,
    //borderTopColor: '#d3d6db',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    //paddingHorizontal: toDp(24),
  },
  touchBershikan: {
    width: toDp(155),
    height: toDp(40),
    padding: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBersihkan: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(14),
  },
  touchSimpan: {
    padding: toDp(4),
    width: toDp(155),
    height: toDp(40),
    borderRadius: toDp(10),
    backgroundColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSimpan: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(14),
  },
  viewTextModal: {
    height: toDp(50),
    borderBottomWidth: toDp(1),
    borderBottomColor: '#e9ebed',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textWhiteTitle: {
    color: '#273238',
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
  },
  icCheckbox: {
    width: toDp(18),
    height: toDp(18),
    marginRight: toDp(10),
  },
  textModalTitle: {
    //fontFamily: 'Montserrat-SemiBold',
    fontSize: toDp(16),
    marginBottom: toDp(12),
  },
  lineModalDialog: {
    width: '100%',
    height: toDp(1),
    backgroundColor: '#d3d6db',
    marginBottom: toDp(12),
  },
  header: {
    width,
    height: toDp(60),
    borderBottomWidth: toDp(1),
    borderBottomColor: '#CCCFC9',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: toDp(16),
  },
  touchHeader: {
    padding: toDp(4),
  },
  icBack: {
    width: toDp(16),
    height: toDp(16),
    tintColor: '#383B34',
  },
  title: {
    color: '#383B34',
    fontSize: toDp(18),
  },
  headerRow: {
    flexDirection: 'row',
  },
  touchHeaderSearch: {
    padding: toDp(4),
  },
  icFilter: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#383B34',
  },

  touchKirim: {
    marginTop: toDp(48),
    marginLeft: toDp(20),
    width: '88%',
    height: toDp(40),
    borderRadius: toDp(4),
    backgroundColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKirim: {
    fontSize: toDp(14),
    color: 'white',
    fontStyle: 'normal',
    letterSpacing: toDp(0.7),
  },
});

export default styles;
