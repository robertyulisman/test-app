import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

// import { allLogo } from '@Assets';
// import { toDp } from '@percentageToDP';

// import Swiper from '@Swiper';
import * as NavigatorService from '../../Helper/NavigatorServices';
// import CustomText from '@CustomText';
import { allLogo } from '@src/Assets';
import CustomText from '@src/Components/CustomText';
import Swiper from '@src/Components/Swiper';
import { toDp } from '@src/Helper/percentageToDP';

const { width, height } = Dimensions.get('window');

type Props = {};

const OnBoarding = () => {
  const swiper = useRef(null);
  const [state, setState] = useState({
    index: 0,
    array: [
      {
        image: allLogo.onBoarding1,
        title: 'SELAMAT DATANG',
        description:
          'Central Connect merupakan Aplikasi hunian pertama di kota Batam. Central Connect memberikan keamanan, kenyamanan, dan kemudahan dalam hunian anda',
      },
      {
        image: allLogo.onBoarding2,
        title: 'Fitur 3 S',
        description:
          'Sistem Hunian yang terintegrasi dengan fitur Smart Cluster, Smart Community dan Smart Home',
      },
      {
        image: allLogo.onBoarding3,
        title: 'Informasi lengkap',
        description:
          'Informasi lengkap dari Central Group sebagai Property Developer Kepercayaan Anda',
      },
    ],
  });

  useEffect(() => {
    // @ts-expect-error TS(2531): Object is possibly 'null'.
    swiper.current.scrollTo(state.index);
  }, [state.index]);

  const footer = (index: any) => {
    if (index === 2) {
      NavigatorService.reset('LandingPage');
    } else {
      setState((state) => ({ ...state, index: state.index + 1 }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} translucent={true} backgroundColor={'transparent'} />
      <Swiper
        ref={swiper}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        onIndexChanged={(index: any) => setState((state) => ({ ...state, index }))}
        loop={false}
      >
        {state.array.map((data, index) => {
          return (
            <View style={styles.viewContainer} key={index}>
              <Image
                source={
                  index === 0
                    ? allLogo.onBoarding1
                    : index === 1
                    ? allLogo.onBoarding2
                    : allLogo.onBoarding3
                }
                style={styles.image}
              />
              <CustomText textType="medium" style={styles.title}>
                {data.title}
              </CustomText>
              <CustomText textType="regular" style={styles.description}>
                {data.description}
              </CustomText>
            </View>
          );
        })}
      </Swiper>
      <TouchableOpacity
        style={[
          styles.buttonFooter,
          {
            backgroundColor: state.index === 2 ? '#5AAA0F' : 'white',
            borderColor: state.index === 2 ? '#5AAA0F' : '#5AAA0F',
          },
        ]}
        onPress={() => footer(state.index)}
      >
        <CustomText
          textType="semibold"
          style={[styles.textFooter, { color: state.index === 2 ? 'white' : '#5AAA0F' }]}
        >
          {state.index === 2 ? 'Mulai' : 'Lanjut'}
        </CustomText>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? toDp(28) : 0,
    backgroundColor: 'white',
  },
  systemBar: {
    width,
    height: toDp(20),
    backgroundColor: '#5AAA0F',
  },
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: toDp(95),
  },
  image: {
    width: toDp(204),
    height: toDp(204),
  },
  title: {
    fontSize: toDp(24),
    marginVertical: toDp(10),
    marginTop: toDp(36),
    color: '#383B34',
  },
  description: {
    fontSize: toDp(14),
    marginHorizontal: toDp(40),
    textAlign: 'center',
    marginTop: toDp(4),
    color: '#5E6157',
  },
  dot: {
    backgroundColor: '#CCCFC9',
    width: toDp(6),
    height: toDp(6),
    borderRadius: toDp(3),
    marginLeft: toDp(6),
    marginRight: toDp(6),
    marginTop: toDp(3),
    marginBottom: toDp(3),
  },
  activeDot: {
    backgroundColor: '#92DE48',
    width: toDp(12),
    height: toDp(12),
    borderRadius: toDp(6),
    marginLeft: toDp(6),
    marginRight: toDp(6),
    marginTop: toDp(3),
    marginBottom: toDp(3),
  },
  buttonFooter: {
    margin: toDp(16),
    //paddingVertical: toDp(16),
    height: toDp(40),
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#5AAA0F',
    borderWidth: toDp(1.5),
    alignItems: 'center',
    borderRadius: toDp(10),
  },
  textFooter: {
    color: '#5AAA0F',

    fontSize: toDp(16),
  },
});

export default OnBoarding;
