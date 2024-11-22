import CustomText from '@src/Components/CustomText';
import Header from '@src/Components/Header';
import { toDp } from '@src/Helper/percentageToDP';
import React, { useState } from 'react';
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';

const DetailUnitScreen = (props: any) => {
  const [state, setState] = useState({
    isDarkMode: false,
    userData: {},
  });

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: state.isDarkMode ? '#121212' : 'white' }]}
    >
      <StatusBar
        barStyle={state.isDarkMode ? 'light-content' : 'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <Header title={'Penghuni'} onPress={() => props.navigation.goBack()} />
      <View style={styles.content}>
        <CustomText style={[styles.textAlamat, { color: state.isDarkMode ? 'white' : '#263238' }]}>
          Alamat unit
        </CustomText>
        <CustomText
          textType="semibold"
          style={[styles.textValueAlamat, { color: state.isDarkMode ? 'white' : '#263238' }]}
        >
          {props.route.params.data.unit.unit_name}
        </CustomText>
        <CustomText
          style={[
            styles.textAlamat,
            {
              color: state.isDarkMode ? 'white' : '#263238',
              marginTop: toDp(24),
              marginBottom: toDp(8),
            },
          ]}
        >
          Daftar Penghuni
        </CustomText>
        <ScrollView>
          {props.route.params.data.users &&
            props.route.params.data.users.map((data: any, index: any) => {
              return (
                <View style={styles.viewText}>
                  <CustomText
                    style={[styles.textData, { color: state.isDarkMode ? 'white' : '#263238' }]}
                  >
                    // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
                    {data.name + (state.userData.id === data.id ? ' (Anda)' : '')}
                  </CustomText>
                </View>
              );
            })}
        </ScrollView>
      </View>
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
  content: {
    padding: toDp(16),
    flex: 1,
  },
  textAlamat: {
    fontSize: toDp(12),
    color: 'black',
  },
  textValueAlamat: {
    fontSize: toDp(14),
    color: 'black',
    marginTop: toDp(4),
  },
  textData: {
    fontSize: toDp(14),
    color: 'black',
    marginTop: toDp(4),
  },
  viewText: {
    height: toDp(40),
    justifyContent: 'center',
    borderBottomWidth: toDp(1),
    borderBottomColor: '#e9ebed',
  },
});

export default DetailUnitScreen;
