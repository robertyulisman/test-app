import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { allLogo } from '../../Assets';
import { toDp } from '../../Helper/percentageToDP';

import CustomText from '../../Components/CustomText';
import * as NavigatorService from '../../Helper/NavigatorServices';

import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

import { getServicesCategories } from '../../Services/Apis';

const { width, height } = Dimensions.get('window');
const OrderJasa = (props: any) => {
  const [state, setState] = useState({
    arrMenu: [],
    loading: true,
  });

  useEffect(() => {
    getAllLoadData();
  }, []);

  const getAllLoadData = () => {
    getServicesCategories()
      .then((response) => {
        console.log(response);
        setState((state) => ({
          ...state,
          arrMenu: response.data.service_categories,
          loading: false,
        }));
      })
      .catch((error) => {
        console.log(error);
        setState((state) => ({
          ...state,
          loading: false,
        }));
      });
  };

  const renderItem = (item: any) => {
    return (
      <TouchableOpacity
        style={styles.touchItem}
        onPress={() => {
          if (item.id === '1b394b57-7fc2-4562-a7b6-6cc761a2d15c') {
            NavigatorService.navigate('Multifinance');
          } else {
            console.log('props', props);
            NavigatorService.navigate('Layanan', {
              item,
              setContentPesanan: props.setContentPesanan,
            });
          }
        }}
      >
        <View style={styles.viewItem}>
          <Image source={{ uri: item.image_url }} style={styles.imgCategory} />
          <CustomText style={styles.textName}>{item.name}</CustomText>
        </View>
        <Image source={allLogo.icNext} style={styles.icNext} />
        <View style={styles.line} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {state.arrMenu.map((item, index) => {
          return renderItem(item);
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: toDp(10),
  },
  touchItem: {
    width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: toDp(48),
    paddingHorizontal: toDp(20),
  },
  line: {
    marginLeft: toDp(20),
    width: width * 0.88,
    height: toDp(1),
    backgroundColor: '#DDE3E0',
    position: 'absolute',
    bottom: 0,
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgCategory: {
    width: toDp(24),
    height: toDp(24),
  },
  textName: {
    fontSize: toDp(14),
    color: '#273238',
    marginLeft: toDp(10),
  },
  icNext: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#5AAA0F',
  },
});

export default OrderJasa;
