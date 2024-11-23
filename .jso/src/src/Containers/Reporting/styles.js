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
    linearFab: {
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(28),
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(56),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(56),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.1,
      shadowRadius: 1.0,
      elevation: 4,
      position: 'absolute',
      bottom: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      right: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      zIndex: 1
    },
    fabAdd: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    icAdd: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(36),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(36),
      tintColor: 'white'
    },
    header: {
      width: width,
      height: 'auto',
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(1),
      borderBottomColor: '#917438',
      backgroundColor: 'white'
    },
    linearHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(60)
    },
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4),
      position: 'absolute',
      left: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      zIndex: 1
    },
    icBack: {
      //marginHorizontal: toDp(8),
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      tintColor: '#917438'
    },
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4),
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16)
    },
    icFilter: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      tintColor: '#917438'
    },
    title: {
      color: '#917438',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(18)
      //fontFamily: 'Montserrat-SemiBold',
    },
    content: {
      flex: 1,
      backgroundColor: '#f5f7f8'
    },
    containerItem: {
      width: width,
      height: 'auto',
      backgroundColor: '#ffffff',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(2),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16)
      //paddingHorizontal: toDp(8)
    },
    cards: {
      width: '100%',
      height: 'auto',
      backgroundColor: '#FFFFFF',
      alignItems: 'center'
    },
    cardHeader: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16)
    },
    months: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      color: '#333'
      //fontFamily: 'Montserrat-Bold'
    },
    price: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(18),
      color: '#333'
      //fontFamily: 'Montserrat-Regular'
    },
    cardDate: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    logo: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(25),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(25),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(5),
      alignItems: 'center',
      justifyContent: 'center'
    },
    viewModalTitle: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    icon: {
      maxWidth: '100%',
      resizeMode: 'contain'
    },
    cardDetails: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10),
      width: '100%',
      flexDirection: 'row'
    },
    date: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      color: '#666',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20)
      //fontFamily: 'Montserrat-Regular'
    },
    invoiceNumber: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      color: '#666',
      alignItems: 'flex-start'
      //fontFamily: 'Montserrat-Regular'
    },
    logoContainer: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      alignItems: 'center',
      justifyContent: 'center'
    },
    iconNext: {
      maxHeight: '100%',
      resizeMode: 'contain',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12)
    },
    due: {
      color: 'red',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12)
    },
    viewCenter: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    loadingShimmer: {
      width: '95%',
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(110),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(5),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16)
    },
    textName: {
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(8),
      color: '#616161',
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16)
    },
    textPosition: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      color: '#BDBDBD',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(8)
    },
    containerDesc: {
      width: width * 0.906,
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      backgroundColor: 'transparent',
      justifyContent: 'space-between'
    },
    titleContent: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(18),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(6),
      textAlign: 'center',
      color: '#333333'
    },
    textContent: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      color: '#333333',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10),
      textAlign: 'center'
    },
    profile: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40)
    },
    imageContent: {
      //height: height / 2,
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(328),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(8),
      width: width * 0.906,
      resizeMode: 'contain'
    },
    //ZAINI
    viewRow: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16)
    },
    imgPicture: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(95),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(95),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12)
    },
    labelpic: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24)
    },
    itemTitle: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      color: '#383B34',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(-4),
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(212)
    },
    viewRowItem: {
      flexDirection: 'row',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(8),
      alignItems: 'center'
    },
    itemContent: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      color: '#333333'
    },
    viewTitleContent: {
      width: '100%',
      paddingLeft: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16)
    },
    itemDate: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      color: '#4b5a74',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4)
    },
    itemLocation: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      color: '#4b5a74',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16)
    },
    icCalendar: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(8)
    },
    icLp: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(8)
    },
    text: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      color: '#000000',
      //fontFamily: 'Montserrat-Regular',
      letterSpacing: 0
    },
    viewStatus: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10),
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(56),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(11),
      backgroundColor: '#917438',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textStatus: {
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10),
      color: '#FFFFFF'
      //fontFamily: 'Montserrat-SemiBold',
    },
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4)
    },
    icSilangModal: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      tintColor: '#917438'
    },
    viewArrayStatus: {
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24)
    },
    touchStatus: {
      width: 'auto',
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(45),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      backgroundColor: '#91743819',
      borderWidth: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(1),
      borderColor: '#917438',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10)
    },
    textStatusItem: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      color: '#917438'
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
    viewRowImage: {
      width: '92%',
      flexDirection: 'row',
      height: 'auto',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12)
    },
    viewRowNameImage: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    imgProfile: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20)
    },
    textNameReport: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(8)
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    itemTitle: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      color: '#273238'
    },
    viewContentItem: {
      width: '92%',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      alignItems: 'flex-start',
      justifyContent: 'flex-start'
    },
    itemDesc: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(8),
      textAlign: 'left',
      width: '92%'
    },
    viewKomentar: {
      width: '100%',
      alignItems: 'flex-end',
      backgroundColor: 'white',
      paddingRight: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20)
    },
    touchKomentar: {
      flexDirection: 'row',
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4)
    },
    icMessage: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14)
    },
    textKomentar: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      fontWeight: '500',
      color: '#273238',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(8)
    },
    bottomModal: {
      justifyContent: 'flex-end',
      margin: 0
    },
    viewRootModal: {
      width: width,
      position: 'absolute',
      bottom: 0
    },
    modalBox: {
      width: width,
      height: height * 0.7,
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      borderTopRightRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16)
    },
    modalRow: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    textTitleModal: {
      //fontFamily: 'Montserrat-Bold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      letterSpacing: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(2),
      color: '#263238',
      fontWeight: '700'
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4)
    },
    icSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      tintColor: '#263238'
    },
    modalFooter: {
      width: width,
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(60) + (0, _$$_REQUIRE(_dependencyMap[2]).getBottomSpace)(),
      backgroundColor: 'white',
      // @ts-expect-error TS(2304): Cannot find name 'Platform'.
      borderTopWidth: 0,
      borderTopColor: '#838A9A40',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(0.8),
      flexDirection: 'row',
      paddingHorizontal: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(8),
      paddingTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10),
      // @ts-expect-error TS(2304): Cannot find name 'Platform'.
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10)
    },
    imgUser: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20)
    },
    touchPost: {
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      top: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24)
    },
    textPost: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      color: '#917438',
      fontWeight: '600'
    },
    bgShadow: {
      width: width,
      height: height,
      backgroundColor: '#0000004D'
    },
    rowFront: {
      width: width,
      backgroundColor: 'white',
      flexDirection: 'row',
      //alignItems: 'center',
      height: 'auto',
      justifyContent: 'space-between',
      paddingVertical: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12)
    },
    imgCommentUser: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16)
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    textName: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      color: '#788F9C',
      fontWeight: '600'
    },
    textMessage: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      color: '#000000',
      fontWeight: '400',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4),
      width: width * 0.755
    },
    textTime: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      color: '#788F9C',
      fontWeight: '400',
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      top: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12)
    },
    viewUserName: {
      flexDirection: 'row'
    },
    rowBack: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    touchDelete: {
      flex: 1,
      backgroundColor: '#EE4040',
      justifyContent: 'center',
      alignItems: 'center'
    },
    icCommentDelete: {
      tintColor: 'white',
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(26.67),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(26.67)
    },
    viewEmpty: {
      alignItems: 'center',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(-24)
    },
    textBelum: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      color: '#35405A',
      fontWeight: '500'
    },
    textMulai: {
      //fontFamily: 'Montserrat-Regular',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14),
      color: '#838A9A',
      fontWeight: '400',
      marginTop: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(6)
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    header: {
      width: width,
      height: 'auto',
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(1),
      borderBottomColor: '#917438',
      backgroundColor: 'white'
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    linearHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(60)
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4),
      position: 'absolute',
      left: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      zIndex: 1
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    icBack: {
      //marginHorizontal: toDp(8),
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      tintColor: '#917438'
    },
    headerRow: {
      position: 'absolute',
      right: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      top: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      flexDirection: 'row'
    },
    touchHeaderSearchNew: {
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4),
      position: 'absolute',
      top: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(-86),
      right: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12)
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    icFilter: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      tintColor: '#917438'
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    title: {
      color: '#917438',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(18)
      //fontFamily: 'Montserrat-SemiBold',
    },
    viewText: {
      width: '86%',
      //height: toDp(40),
      height: 'auto',
      backgroundColor: '#F3F5F6',
      marginLeft: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(8),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(2)
      //padding: toDp(12)
    },
    textInput: {
      flex: 1,
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      //fontFamily: 'Montserrat-Regular',
      fontWeight: '400',
      color: '#273238',
      marginHorizontal: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12),
      width: width * 0.61
      //marginLeft: Platform.OS === 'android' ? toDp(-4) : 0,
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    touchSilang: {
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4)
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    icSilang: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(20),
      tintColor: '#917438'
    },
    viewFooterDialog: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(54) + (0, _$$_REQUIRE(_dependencyMap[2]).getBottomSpace)(),
      // @ts-expect-error TS(2304): Cannot find name 'Platform'.
      paddingBottom: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10),
      //borderTopWidth: Platform.OS === 'ios' ? toDp(0.8) : 0,
      //borderTopColor: '#d3d6db',
      backgroundColor: 'white',
      justifyContent: 'space-around',
      flexDirection: 'row',
      alignItems: 'center'
      //paddingHorizontal: toDp(24),
    },
    touchBershikan: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(155),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4),
      justifyContent: 'center',
      alignItems: 'center'
    },
    textBersihkan: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14)
    },
    touchSimpan: {
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4),
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(155),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(40),
      borderRadius: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10),
      backgroundColor: '#5AAA0F',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textSimpan: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14)
    },
    viewTextModal: {
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(50),
      borderBottomWidth: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(1),
      borderBottomColor: '#e9ebed',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    textWhiteTitle: {
      color: '#273238',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(14)
      //fontFamily: 'Montserrat-Regular',
    },
    icCheckbox: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(18),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(18),
      marginRight: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(10)
    },
    textModalTitle: {
      //fontFamily: 'Montserrat-SemiBold',
      fontSize: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(16),
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12)
    },
    lineModalDialog: {
      width: '100%',
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(1),
      backgroundColor: '#d3d6db',
      marginBottom: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(12)
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
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    touchHeader: {
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4)
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
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
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    headerRow: {
      flexDirection: 'row'
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    touchHeaderSearch: {
      padding: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(4)
    },
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    icFilter: {
      width: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      height: (0, _$$_REQUIRE(_dependencyMap[1]).toDp)(24),
      tintColor: '#383B34'
    }
  });
  var _default = exports.default = styles;
