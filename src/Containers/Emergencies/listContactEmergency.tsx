import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { allLogo } from '../../Assets';
import CustomText from '../../Components/CustomText';
import Header from '../../Components/Header';
import Loader from '../../Components/Loader';
import { toDp } from '../../Helper/percentageToDP';
import { postEmergencyContactList } from '../../Services/Apis';

const { width, height } = Dimensions.get('window');

const ListContactEmergencyScreen = ({ navigation, route }: any) => {
  const [state, setState] = useState<any>({
    isLoading: false,
    isDarkMode: false,
    listContact: [],
  });

  const fetcListContact = () => {
    let body = {
      filter: {
        emergency_contact_category_id: route.params.data.id,
      },
    };
    postEmergencyContactList(body)
      .then((response) => {
        console.log('resposen', response);
        setState((prevState: any) => ({
          ...prevState,
          isLoading: false,
          listContact: response.data.emergency_contacts,
        }));
      })
      .catch((error) => {
        console.log('error', error);
        setState((prevState: any) => ({
          ...prevState,
          isLoading: false,
        }));
      });
  };

  useEffect(() => {
    setState((prevState: any) => ({
      ...prevState,
      isLoading: true,
    }));
    fetcListContact();
  }, []);

  const ItemView = (data: any) => {
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.contactImage} source={{ uri: data.image_url }} />
        <View style={styles.detailWrapper}>
          <CustomText style={styles.textName} textType="semibold">
            {data.name}
          </CustomText>
          <CustomText style={styles.textAddress}>{data.address}</CustomText>
          <TouchableOpacity
            onPress={() => Linking.openURL(`tel:${data.phone.replace('()', '')}`)}
            style={styles.phoneButton}
          >
            <Image source={allLogo.icPhone} style={styles.sosButton} />
            <CustomText style={styles.textPhone} textType="semibold">
              {data.phone}
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  console.log('route', route);
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: state.isDarkMode ? '#121212' : 'white' }]}
    >
      <Loader loading={state.isLoading} />
      <Header title={route.params.data.name} onPress={() => navigation.goBack()} />
      <ScrollView>
        {state.listContact.map((data: any) => {
          return ItemView(data);
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },
  sosButton: {
    width: toDp(15),
    height: toDp(15),
    resizeMode: 'contain',
    marginRight: toDp(7),
    tintColor: '#5AAA0F',
  },
  phoneButton: {
    flexDirection: 'row',
    height: toDp(30),
    borderRadius: toDp(5),
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
    width: toDp(140),
    marginTop: toDp(10),
  },
  textPhone: {
    color: '#5AAA0F',
  },
  itemContainer: {
    margin: toDp(10),
    flexDirection: 'row',
  },
  detailWrapper: {
    marginHorizontal: toDp(10),
    flexWrap: 'nowrap',
    flex: 1,
  },
  contactImage: {
    width: toDp((width - 20) / 4),
    borderRadius: toDp(5),
  },
  textName: {
    fontSize: toDp(14),
  },
  textAddress: {
    marginTop: toDp(5),
    fontSize: toDp(12),
    color: '#5E6157',
  },
});

export default ListContactEmergencyScreen;
