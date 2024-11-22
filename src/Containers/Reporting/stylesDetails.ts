import { toDp } from '@src/Helper/percentageToDP';
import { Dimensions, StyleSheet } from 'react-native';

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
  scrollView: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  viewInfo: {
    padding: toDp(20),
  },
  textTitle: {
    fontSize: toDp(16),
    //fontFamily: 'Montserrat-Bold',
    color: '#263238',
    letterSpacing: toDp(2),
  },
  img: {
    width: toDp(300),
    height: toDp(162),
    borderRadius: toDp(4),
    marginTop: toDp(20),
    //marginRight: toDp(10),
  },
  viewItem: {
    marginTop: toDp(20),
  },
  textField: {
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    color: '#788f9c',
  },
  textValue: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    color: '#000000',
  },
  viewStatus: {
    width: '100%',
    height: 'auto',
    borderTopWidth: toDp(2),
    borderBottomWidth: toDp(2),
    borderTopColor: '#f5f7f8',
    borderBottomColor: '#f5f7f8',
    padding: toDp(20),
  },
  viewUlasan: {
    //paddingLeft: toDp(20),
    paddingTop: toDp(20),
    //height: toDp(115),
    //width: '90%',
  },
  textNo: {
    height: toDp(24),
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    color: '#000000',
    marginVertical: toDp(30),
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginTop: toDp(20),
    alignItems: 'center',
    justifyContent: 'space-between',
    //backgroundColor: 'cyan'
  },
  line: {
    width: toDp(262),
    height: toDp(1),
    backgroundColor: '#CCCFC9',
    position: 'absolute',
    top: toDp(8),
    left: toDp(30),
    zIndex: -1,
  },
  viewCenterStatus: {
    alignItems: 'center',
  },
  sizeActive: {
    width: toDp(16),
    height: toDp(16),
    borderRadius: toDp(11),
  },
  sizeNoActive: {
    width: toDp(10),
    height: toDp(10),
    borderRadius: toDp(11),
    //marginTop: toDp(4)
  },
  grey: {
    width: toDp(10),
    height: toDp(10),
    backgroundColor: '#d3d6db',
    borderRadius: toDp(11),
    marginTop: toDp(4),
  },
  textActive: {
    marginTop: toDp(10),
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    color: '#273238',
    textAlign: 'center',
  },
  textNoActive: {
    marginTop: toDp(14),
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    color: '#788f9c',
  },
  viewStatusNew: {
    marginTop: toDp(20),
    width: toDp(78),
    height: toDp(30),
    borderRadius: toDp(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStatus: {
    fontSize: toDp(14),
    color: '#FFFFFF',
    //fontFamily: 'Montserrat-Medium',
  },
  viewItemRow: {
    marginHorizontal: toDp(20),
    marginTop: toDp(20),
    flexDirection: 'row',
  },
  imgPhoto: {
    width: toDp(40),
    height: toDp(40),
    borderRadius: toDp(40),
    marginRight: toDp(16),
    //backgroundColor: 'cyan'
  },
  textName: {
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-SemiBold',
    color: '#788f9c',
  },
  textTime: {
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    color: '#788f9c',
  },
  textContent: {
    marginTop: toDp(6),
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    color: '#000000',
  },
  textMore: {
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-SemiBold',
    color: '#56a7d4',
  },
  textBatal: {
    marginTop: toDp(16),
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    fontWeight: '600',
    letterSpacing: toDp(0.05),
  },
  center: {
    marginBottom: toDp(32),
    alignItems: 'center',
  },
  lineInfo: {
    width,
    height: toDp(10),
    backgroundColor: '#F6F7F4',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width,
    height: 'auto',
    borderTopWidth: toDp(1),
  },
  viewFooter: {
    flex: 1,
    padding: toDp(16),
  },
  touchKirim: {
    width: toDp(160),
    height: toDp(40),
    backgroundColor: '#d3d6db',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKirim: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-SemiBold',
    color: 'white',
    fontStyle: 'normal',
    letterSpacing: toDp(0.7),
  },
  bottomModal: {
    justifyContent: 'center',
    margin: 0,
  },
  viewRootModal: {
    width,
    alignItems: 'center',
  },
  modalBox: {
    width,
    height: 'auto',
    backgroundColor: '#FFFFFF',
    borderRadius: toDp(16),
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  viewModalTitle: {
    marginTop: toDp(24),
    marginHorizontal: toDp(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitleModal: {
    //fontFamily: 'Montserrat-Bold',
    fontSize: toDp(14),
    letterSpacing: toDp(2),
    color: '#263238',
  },
  viewFormLayanan: {
    marginTop: toDp(16),
    width: '100%',
    height: 'auto',
    //paddingHorizontal: toDp(12),
    borderRadius: toDp(4),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    //justifyContent: 'center',
    //alignItems: 'center'
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
  viewCenterLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f7f8',
  },
  viewRigthTanggapan: {
    position: 'absolute',
    right: toDp(0),
    alignItems: 'flex-start',
  },
  viewStatusTanggapan: {
    width: toDp(12),
    height: toDp(12),
    borderRadius: toDp(6),
    marginTop: toDp(4),
  },
  viewRowRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: toDp(20),
  },
  viewRow: {
    marginLeft: toDp(16),
    marginTop: toDp(16),
    flexDirection: 'row',
  },
  icStar: {
    width: toDp(24),
    height: toDp(24),
  },
  viewReview: {
    marginTop: toDp(20),
    marginLeft: toDp(20),
  },
  textReview: {
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    color: '#9B9F95',
  },
  textValueReview: {
    width: width * 0.9,
    marginTop: toDp(4),
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    color: '#273238',
  },
  // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
  viewRowRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: toDp(20),
  },

  textEdit: {
    marginLeft: toDp(4),
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    color: '#788f9c',
  },
  textInfo: {
    marginLeft: toDp(20),
    marginTop: toDp(8),
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    color: '#273238',
  },
  lineRating: {
    width,
    height: toDp(1),
    backgroundColor: 'red',
  },
  touchPencil: {
    flexDirection: 'row',
  },
  icPencil: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#788f9c',
  },
  // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
  textEdit: {
    marginLeft: toDp(4),
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    color: '#788f9c',
  },
  header: {
    width,
    height: 'auto',
    borderBottomWidth: toDp(1),
    borderBottomColor: '#917438',
    backgroundColor: 'white',
  },
  title: {
    color: '#917438',
    fontSize: toDp(18),
    //fontFamily: 'Montserrat-SemiBold',
  },
  // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
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
  // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
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
  viewModalCenter: {
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBoxCenter: {
    width: width * 0.8,
    height: toDp(200),
    borderRadius: toDp(8),
    alignItems: 'center',
  },
  titleConfirm: {
    marginTop: toDp(24),
    fontSize: toDp(16),
    color: '#263238',
    letterSpacing: toDp(0.7),
  },
  textApakah: {
    marginTop: toDp(10),
    marginHorizontal: toDp(30),
    textAlign: 'center',
    fontSize: toDp(14),
    color: '#263238',
    lineHeight: toDp(24),
  },
  // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
  viewRow: {
    marginTop: toDp(20),
    flexDirection: 'row',
  },
  touchTidak: {
    width: toDp(110),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTidak: {
    fontSize: toDp(14),
    color: '#FFFFFF',
    letterSpacing: toDp(0.7),
  },
  touchYa: {
    width: toDp(110),
    height: toDp(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    borderRadius: toDp(10),
  },
  textYa: {
    fontSize: toDp(14),
    color: '#5AAA0F',
    letterSpacing: toDp(0.7),
  },
});

export default styles;
