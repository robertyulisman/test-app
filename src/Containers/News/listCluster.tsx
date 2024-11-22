import React from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
} from 'react-native';

// import { allLogo } from '@Assets';
// import { toDp } from '@percentageToDP';
// import Header from '@Header';

// import NavigatorService from '@NavigatorService';
// import CustomText from '@CustomText';
import CustomText from '../../Components/CustomText';
// import Header from '../../Components/Header';
import Header from '@src/Components/Header';
import { toDp } from '../../Helper/percentageToDP';

const { width, height } = Dimensions.get('window');
const ListClusterScreen = (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'List Cluster'} onPress={() => props.navigation.goBack()} />
      <ScrollView>
        {props.route.params.listClusters.map((data: any, index: any) => {
          return (
            <View>
              <View style={styles.viewItem}>
                <View>
                  <CustomText textType="regular" allowFontScaling={false} style={styles.textName}>
                    {index + 1 + '. ' + data.name}
                  </CustomText>
                </View>
              </View>
              <View style={styles.lineItem} />
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? toDp(28) : 0,
    paddingBottom: Platform.OS === 'android' ? toDp(28) : 0,
  },
  viewFooter: {
    paddingHorizontal: toDp(16),
  },
  touchTanbah: {
    width: '100%',
    height: toDp(40),
    borderWidth: toDp(1),
    borderColor: '#917438',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTambah: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-SemiBold',
    color: '#917438',
    letterSpacing: toDp(0.7),
  },
  content: {
    flex: 1,
  },
  viewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: toDp(16),
    paddingVertical: toDp(12),
  },
  textName: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    color: '#273238',
    width: width * 0.8,
  },
  textStatus: {
    marginTop: toDp(8),
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    color: '#f53c3c',
  },
  touchDelete: {
    padding: toDp(4),
  },
  icDelete: {
    width: toDp(24),
    height: toDp(24),
  },
  lineItem: {
    width: '92%',
    height: toDp(1),
    backgroundColor: '#e9ebed',
    marginLeft: toDp(16),
  },
  titleConfirm: {
    marginTop: toDp(24),
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Bold',
    color: '#263238',
    letterSpacing: toDp(0.7),
  },
  textApakah: {
    marginTop: toDp(16),
    marginHorizontal: toDp(16),
    textAlign: 'center',
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    color: '#263238',
    letterSpacing: toDp(0.6),
  },
  viewRow: {
    marginTop: toDp(20),
    flexDirection: 'row',
  },
  touchTidak: {
    width: toDp(80),
    height: toDp(30),
    backgroundColor: '#917438',
    borderRadius: toDp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTidak: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
    letterSpacing: toDp(0.7),
  },
  touchYa: {
    width: toDp(125),
    height: toDp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textYa: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-SemiBold',
    color: '#917438',
    letterSpacing: toDp(0.7),
  },
  modalBoxCenter: {
    width: width * 0.8,
    height: toDp(168),
    borderRadius: toDp(8),
    alignItems: 'center',
  },
});

export default ListClusterScreen;
