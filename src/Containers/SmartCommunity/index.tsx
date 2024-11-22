import CustomText from '@src/Components/CustomText';
import Header from '@src/Components/Header';
import { toDp } from '@src/Helper/percentageToDP';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as NavigatorService from '../../Helper/NavigatorServices';

const SmartCommunityScreen = (props: any) => {
  const [state, setState] = useState({
    arrayMenu: props.route.params.subFeature,
  });

  const functionDetails = (id: any) => {
    console.log('id', id);
    if (id === 'e7c1f38c-9cd3-47d0-a2cf-5b985ba36698') {
      NavigatorService.navigate('Jasa');
    } else {
      NavigatorService.navigate('Market');
      //Alert.alert('Coming Soon', 'Feature ini akan segera hadir')
    }
  };

  const renderButton = ({ item, index }: any) => {
    return (
      <TouchableOpacity style={styles.touchButton} onPress={() => functionDetails(item.id)}>
        <Image source={{ uri: item.image_url }} style={styles.iconMenu} />
        <CustomText textType="medium" style={styles.textName}>
          {item.name}
        </CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={false} />
      <Header title={'Smart Community'} onPress={() => props.navigation.goBack()} />
      <View style={styles.content}>
        <FlatList
          data={state.arrayMenu}
          renderItem={renderButton}
          numColumns={3}
          ListHeaderComponent={() => (
            <CustomText style={styles.textInfo}>
              {'Nikmati kenyamanan dan kemudahaan dengan fasilitas yang kami sediakan.'}
            </CustomText>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    backgroundColor: 'white',
  },
  content: {
    paddingHorizontal: toDp(20),
    flex: 1,
  },
  viewChildButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMenu: {
    width: toDp(40),
    height: toDp(40),
    //marginTop: toDp(10),
  },
  touchButton: {
    width: toDp(100),
    height: toDp(100),
    backgroundColor: '#FFFFFF',
    borderRadius: toDp(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: toDp(2),
    marginBottom: toDp(2),
    marginTop: toDp(16),
    marginRight: toDp(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    // @ts-expect-error TS(1117): An object literal cannot have multiple properties ... Remove this comment to see the full error message
    backgroundColor: 'white',
  },
  textName: {
    color: '#383B34',
    fontSize: toDp(12),
    textAlign: 'center',
    marginTop: toDp(8),
    //height: toDp(40),
  },
  textInfo: {
    color: '#273238',
    fontSize: toDp(14),
    marginTop: toDp(20),
    marginBottom: toDp(8),
  },
  icMenuRight: {
    width: toDp(16.9),
    height: toDp(15.84),
  },
});

export default SmartCommunityScreen;
