import { allLogo } from '@src/Assets';
import CustomText from '@src/Components/CustomText';
import Empty from '@src/Components/Empty';
import Header from '@src/Components/Header';
import Loader from '@src/Components/Loader';
import { toDp } from '@src/Helper/percentageToDP';
import { getProgressPhoto } from '@src/Services/Apis';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
const { height, width } = Dimensions.get('window');

export const ImageFooter = ({ imageIndex, imagesCount }: any) => (
  <View style={styles.root}>
    <Text style={styles.text}>{`${imageIndex + 1} / ${imagesCount}`}</Text>
  </View>
);

const PhotoProgress = ({ navigation, route }: any) => {
  const [images, setImages] = useState([]);
  const [visible, setIsVisible] = useState(false);
  const [state, setState] = useState({
    isDarkMode: false,
    isLoading: false,
    isImageViewVisible: false,
    listPhoto: [],
  });

  const fetcListPhoto = () => {
    getProgressPhoto(route.params.unit.id)
      .then((response: any) => {
        if (response.data.statusCode === 200) {
          return setState((prevState) => ({
            ...prevState,
            isLoading: false,
            listPhoto: response.data.data,
          }));
        }

        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      })
      .catch((error: any) => {
        console.log('error', error);
        setState((prevState) => ({
          ...prevState,
          isLoading: false,
        }));
      });
  };

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));
    fetcListPhoto();
  }, []);

  const ItemView = (data: any) => {
    console.log('data', data);

    const handleOnPressImage = () => {
      console.log('data.files', data.files);
      const formatImages = data.files.map((item: any) => {
        return {
          uri: item,
        };
      });

      setImages(formatImages);
      setIsVisible(true);
    };
    return (
      <View
        key={data.id}
        style={{ flexDirection: 'row', paddingHorizontal: 16, paddingBottom: 12 }}
      >
        <TouchableOpacity onPress={handleOnPressImage}>
          <Image style={styles.img} source={{ uri: data.files[0] }} />
        </TouchableOpacity>
        <View style={{ marginLeft: 16 }}>
          <CustomText style={styles.textDate} textType="semibold">
            {moment(data.created_at).format('dddd, DD MMM YYYY, HH:mm')}
          </CustomText>
          <CustomText style={styles.textName} textType="semi">
            {data.description}
          </CustomText>
        </View>
      </View>
    );
  };

  console.log('first', state.listPhoto);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: state.isDarkMode ? '#121212' : 'white' }]}
    >
      <Loader loading={state.isLoading} />
      <StatusBar
        barStyle={state.isDarkMode ? 'light-content' : 'dark-content'}
        translucent={false}
        backgroundColor={'transparent'}
      />
      <Header title={'Progress Update'} onPress={() => navigation.goBack()} />

      {state.listPhoto.length > 0 ? (
        <ScrollView>
          {state.listPhoto.map((data) => {
            return ItemView(data);
          })}
        </ScrollView>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Empty title={'Belum ada data'} images={allLogo.imgEmptyNews} />
        </View>
      )}

      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        FooterComponent={({ imageIndex }) => (
          <ImageFooter imageIndex={imageIndex} imagesCount={images.length} />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8',
  },

  img: {
    width: toDp(100),
    height: toDp(100),
    borderRadius: toDp(4),
    marginTop: toDp(10),
  },

  textDate: {
    fontSize: toDp(10),
    color: '#788f9c',
    marginTop: 16,
  },
  textName: {
    fontSize: toDp(12),
    color: '#788f9c',
    marginTop: 8,
  },
  root: {
    height: 64,
    backgroundColor: '#00000077',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    color: '#FFF',
  },
});

export default PhotoProgress;
