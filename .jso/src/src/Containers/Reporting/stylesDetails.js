  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _reactNative = _$$_REQUIRE(_dependencyMap[0]);
  var _Dimensions$get = _reactNative.Dimensions.get('window'),
    width = _Dimensions$get.width,
    height = _Dimensions$get.height;
  var styles = _reactNative.StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white'
    },
    headeriOS: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      backgroundColor: '#917438'
    },
    scrollView: {
      backgroundColor: '#FFFFFF'
    },
    content: {
      flex: 1,
      backgroundColor: '#FFFFFF'
    },
    viewInfo: {
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20)
    },
    textTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      //fontFamily: 'Montserrat-Bold',
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(2)
    },
    img: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(300),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(162),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20)
      //marginRight: toDp(10),
    },
    viewItem: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20)
    },
    textField: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#788f9c'
    },
    textValue: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      color: '#000000'
    },
    viewStatus: {
      width: '100%',
      height: 'auto',
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(2),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(2),
      borderTopColor: '#f5f7f8',
      borderBottomColor: '#f5f7f8',
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20)
    },
    viewUlasan: {
      //paddingLeft: toDp(20),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20)
      //height: toDp(115),
      //width: '90%',
    },
    textNo: {
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      color: '#000000',
      marginVertical: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(30),
      textAlign: 'center'
    },
    row: {
      flexDirection: 'row',
      width: '100%',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      alignItems: 'center',
      justifyContent: 'space-between'
      //backgroundColor: 'cyan'
    },
    line: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(262),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(1),
      backgroundColor: '#CCCFC9',
      position: 'absolute',
      top: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(8),
      left: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(30),
      zIndex: -1
    },
    viewCenterStatus: {
      alignItems: 'center'
    },
    sizeActive: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(11)
    },
    sizeNoActive: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(11)
      //marginTop: toDp(4)
    },
    grey: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(11),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4)
    },
    textActive: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      color: '#273238',
      textAlign: 'center'
    },
    textNoActive: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      color: '#788f9c'
    },
    viewStatusNew: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(78),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(30),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(15),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textStatus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      color: '#FFFFFF'
      //fontFamily: 'Montserrat-Medium',
    },
    viewItemRow: {
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      flexDirection: 'row'
    },
    imgPhoto: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16)
      //backgroundColor: 'cyan'
    },
    textName: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      //fontFamily: 'Montserrat-SemiBold',
      color: '#788f9c'
    },
    textTime: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#788f9c'
    },
    textContent: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(6),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      color: '#000000'
    },
    textMore: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      //fontFamily: 'Montserrat-SemiBold',
      color: '#56a7d4'
    },
    textBatal: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: '600',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(0.05)
    },
    center: {
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(32),
      alignItems: 'center'
    },
    lineInfo: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10),
      backgroundColor: '#F6F7F4'
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: width,
      height: 'auto',
      borderTopWidth: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(1)
    },
    viewFooter: {
      flex: 1,
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16)
    },
    touchKirim: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(160),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textKirim: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      //fontFamily: 'Montserrat-SemiBold',
      color: 'white',
      fontStyle: 'normal',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(0.7)
    },
    bottomModal: {
      justifyContent: 'center',
      margin: 0
    },
    viewRootModal: {
      width: width,
      alignItems: 'center'
    },
    modalBox: {
      width: width,
      height: 'auto',
      backgroundColor: '#FFFFFF',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    textTitleModal: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(2),
      color: '#263238'
    },
    viewFormLayanan: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      width: '100%',
      height: 'auto',
      //paddingHorizontal: toDp(12),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3
      //justifyContent: 'center',
      //alignItems: 'center'
    },
    lineCenter: {
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16)
    },
    lineModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(64),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4),
      backgroundColor: '#d3d6db',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(7)
    },
    viewCenterLoading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f7f8'
    },
    viewRigthTanggapan: {
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(0),
      alignItems: 'flex-start'
    },
    viewStatusTanggapan: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(6),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4)
    },
    viewRowRating: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingRight: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20)
    },
    viewRow: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      flexDirection: 'row'
    },
    icStar: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24)
    },
    viewReview: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20)
    },
    textReview: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#9B9F95'
    },
    textValueReview: {
      width: width * 0.9,
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      //fontFamily: 'Montserrat-Regular',
      color: '#273238'
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    viewRowRating: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingRight: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20)
    },
    textEdit: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#788f9c'
    },
    textInfo: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(8),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#273238'
    },
    lineRating: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(1),
      backgroundColor: 'red'
    },
    touchPencil: {
      flexDirection: 'row'
    },
    icPencil: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      tintColor: '#788f9c'
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    textEdit: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      color: '#788f9c'
    },
    header: {
      width: width,
      height: 'auto',
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(1),
      borderBottomColor: '#917438',
      backgroundColor: 'white'
    },
    title: {
      color: '#917438',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(18)
      //fontFamily: 'Montserrat-SemiBold',
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    header: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(60),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(1),
      borderBottomColor: '#CCCFC9',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16)
    },
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4)
    },
    icBack: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      tintColor: '#383B34'
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    title: {
      color: '#383B34',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(18)
    },
    headerRow: {
      flexDirection: 'row'
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4)
    },
    icFilter: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      tintColor: '#383B34'
    },
    viewModalCenter: {
      width: 'auto',
      height: 'auto',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalBoxCenter: {
      width: width * 0.8,
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(200),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(8),
      alignItems: 'center'
    },
    titleConfirm: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      color: '#263238',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(0.7)
    },
    textApakah: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(30),
      textAlign: 'center',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      color: '#263238',
      lineHeight: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24)
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    viewRow: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      flexDirection: 'row'
    },
    touchTidak: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(110),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      backgroundColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textTidak: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      color: '#FFFFFF',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(0.7)
    },
    touchYa: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(110),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(1),
      borderColor: '#5AAA0F',
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10)
    },
    textYa: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      color: '#5AAA0F',
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(0.7)
    }
  });
  var _default = exports.default = styles;
