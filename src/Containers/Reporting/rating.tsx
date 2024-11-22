import { allLogo } from '@src/Assets';
import CustomText from '@src/Components/CustomText';
import Header from '@src/Components/Header';
import Loader from '@src/Components/Loader';
import { toDp } from '@src/Helper/percentageToDP';
import { postRating, postRatingPengelola } from '@src/Services/Apis';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('window');
const RatingScreen = (props: any) => {
  const [state, setState] = useState({
    loading: false,
    darkMode: false,
    star: 0,
    info: '',
    review: '',
    successModal: false,
  });

  useEffect(() => {
    if (props.route.params.rating) {
      setState((state) => ({
        ...state,
        star: props.route.params.rating,
        review: props.route.params.review,
      }));
    }
  }, []);

  const kirimRating = () => {
    setState((state) => ({ ...state, loading: true }));
    if (props.route.params.is_a_resident) {
      let body = {
        rating: state.star,
        review: state.review,
      };
      postRating('?report_id=' + props.route.params.id, body)
        .then((response: any) => {
          console.log('response', response);
          setState((state) => ({ ...state, loading: false, successModal: true }));
        })
        .catch((error: any) => {
          console.log(error);
          setState((state) => ({ ...state, loading: false }));
        });
    } else {
      let body = {
        rating_pengelola: state.star,
        review_pengelola: state.review,
      };
      postRatingPengelola('?report_id=' + props.route.params.id, body)
        .then((response: any) => {
          console.log('response', response);
          setState((state) => ({ ...state, loading: false, successModal: true }));
        })
        .catch((error: any) => {
          console.log(error);
          setState((state) => ({ ...state, loading: false }));
        });
    }
  };

  const modalSuccess = () => {
    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        isVisible={state.successModal}
        style={styles.bottomModal}
      >
        <View style={styles.viewRootModal}>
          <View
            style={[styles.modalBox, { backgroundColor: state.darkMode ? '#121212' : 'white' }]}
          >
            <Image source={allLogo.icTepukTangan} style={styles.icTepukTangan} />
            <CustomText
              textType="semibold"
              allowFontScaling={false}
              style={[styles.textTitleModal, { color: state.darkMode ? 'white' : '#263238' }]}
            >
              TERIMA KASIH
            </CustomText>
            <CustomText
              textType="regular"
              allowFontScaling={false}
              style={[styles.textDescModal, { color: state.darkMode ? 'white' : '#263238' }]}
            >
              Penilaian Anda berguna untuk meningkatkan kualitas kami
            </CustomText>
            <TouchableOpacity
              onPress={() => {
                setState((state) => ({ ...state, successModal: false }));
                props.route.params.load();
                props.navigation.goBack();
              }}
              style={styles.touchKembaliKeLogin}
            >
              <CustomText
                textType="semibold"
                allowFontScaling={false}
                style={styles.textKembaliKeLogin}
              >
                Selesai
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'Rating Layanan'} onPress={() => props.navigation.goBack()} />
      <Loader loading={state.loading} />
      {modalSuccess()}
      <ScrollView>
        <View style={styles.content}>
          <Image source={{ uri: props.route.params.img }} style={styles.imgRating} />
          <CustomText
            textType="semibold"
            allowFontScaling={false}
            style={[styles.textTitle, { color: state.darkMode ? 'white' : 'black' }]}
          >
            Beri rating pelayanan kami{' '}
          </CustomText>
          <CustomText
            textType="regular"
            allowFontScaling={false}
            style={[styles.textDesc, { color: state.darkMode ? 'white' : 'black' }]}
          >
            Apakah Anda puas dengan layanan penanganan laporan petugas kami?
          </CustomText>
          <View style={styles.viewRow}>
            <TouchableOpacity
              onPress={() => setState((state) => ({ ...state, star: 1, info: 'Buruk' }))}
            >
              <Image
                source={allLogo.icStar}
                style={[styles.icStar, { tintColor: state.star >= 1 ? '#f2c141' : '#e7ebee' }]}
              />
            </TouchableOpacity>
            <View style={{ width: toDp(12) }} />
            <TouchableOpacity
              onPress={() => setState((state) => ({ ...state, star: 2, info: 'Kurang' }))}
            >
              <Image
                source={allLogo.icStar}
                style={[styles.icStar, { tintColor: state.star >= 2 ? '#f2c141' : '#e7ebee' }]}
              />
            </TouchableOpacity>
            <View style={{ width: toDp(12) }} />
            <TouchableOpacity
              onPress={() => setState((state) => ({ ...state, star: 3, info: 'Cukup' }))}
            >
              <Image
                source={allLogo.icStar}
                style={[styles.icStar, { tintColor: state.star >= 3 ? '#f2c141' : '#e7ebee' }]}
              />
            </TouchableOpacity>
            <View style={{ width: toDp(12) }} />
            <TouchableOpacity
              onPress={() => setState((state) => ({ ...state, star: 4, info: 'Baik' }))}
            >
              <Image
                source={allLogo.icStar}
                style={[styles.icStar, { tintColor: state.star >= 4 ? '#f2c141' : '#e7ebee' }]}
              />
            </TouchableOpacity>
            <View style={{ width: toDp(12) }} />
            <TouchableOpacity
              onPress={() => setState((state) => ({ ...state, star: 5, info: 'Sangat Baik' }))}
            >
              <Image
                source={allLogo.icStar}
                style={[styles.icStar, { tintColor: state.star >= 5 ? '#f2c141' : '#e7ebee' }]}
              />
            </TouchableOpacity>
          </View>
          <CustomText
            textType="semibold"
            allowFontScaling={false}
            style={[styles.textInfo, { color: state.darkMode ? 'white' : '#383B34' }]}
          >
            {state.info}
          </CustomText>
          <View style={styles.viewReview}>
            <CustomText
              textType="regular"
              allowFontScaling={false}
              style={[styles.textReview, { color: state.darkMode ? 'white' : '#5E6157' }]}
            >
              Komentar (optional)
            </CustomText>
            <View
              style={[
                styles.viewTextArea,
                { backgroundColor: state.darkMode ? '#FFFFFF' : '#f3f5f6' },
              ]}
            >
              <TextInput
                style={styles.textInput}
                onChangeText={(review: any) => setState((state) => ({ ...state, review }))}
                value={state.review}
                multiline={true}
                maxLength={255}
                placeholder={'Tulis komentar Anda disini'}
                placeholderTextColor={'#838a9a'}
              />
              <CustomText textType="medium" allowFontScaling={false} style={styles.textCount}>
                {state.review.length + '/255'}
              </CustomText>
            </View>
          </View>
        </View>
        <View style={{ height: toDp(200) }} />
      </ScrollView>
      {state.star === 0 ? (
        <View style={[styles.touchKirim, { backgroundColor: '#CCCFC9' }]}>
          <CustomText textType="semibold" allowFontScaling={false} style={styles.textKirim}>
            Kirim Penilaian
          </CustomText>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => kirimRating()}
          style={[styles.touchKirim, { backgroundColor: '#5AAA0F' }]}
        >
          <CustomText textType="semibold" allowFontScaling={false} style={styles.textKirim}>
            Kirim Penilaian
          </CustomText>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    padding: toDp(16),
    alignItems: 'center',
  },
  touchKirim: {
    marginBottom: toDp(20),
    marginHorizontal: toDp(20),
    width: '90%',
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
  imgRating: {
    width: toDp(95),
    height: toDp(95),
    borderRadius: toDp(4),
  },
  textTitle: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
    letterSpacing: toDp(0.7),
    marginTop: toDp(20),
  },
  textDesc: {
    marginTop: toDp(16),
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    color: '#273238',
    textAlign: 'center',
  },
  viewRow: {
    marginTop: toDp(30),
    flexDirection: 'row',
  },
  icStar: {
    width: toDp(42),
    height: toDp(42),
  },
  textInfo: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-SemiBold',
    color: '#000000',
    letterSpacing: toDp(0.7),
    marginTop: toDp(12),
  },
  viewReview: {
    width: '100%',
    marginTop: toDp(24),
  },
  textReview: {
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    color: '#273238',
    letterSpacing: toDp(0.6),
  },
  viewTextArea: {
    width: '100%',
    //height: toDp(100),
    height: 'auto',
    paddingBottom: toDp(20),
    backgroundColor: '#f3f5f6',
    marginTop: toDp(10),
    borderRadius: toDp(2),
  },
  textCount: {
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    color: '#c1c7ca',
    letterSpacing: toDp(0.25),
    position: 'absolute',
    bottom: toDp(10),
    right: toDp(10),
  },
  textInput: {
    textAlignVertical: 'top',
    margin: Platform.OS === 'ios' ? toDp(12) : toDp(8),
    width: '93%',
    height: toDp(64),
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    color: '#383B34',
    letterSpacing: toDp(0.25),
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  },
  textMax: {
    marginTop: toDp(2),
    fontSize: toDp(12),
    //fontFamily: 'Montserrat-Regular',
    color: '#f5493c',
    letterSpacing: toDp(0.25),
  },
  bottomModal: {
    //justifyContent: "flex-end",
    //margin: 0,
  },
  viewRootModal: {
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: toDp(300),
    height: toDp(280),
    backgroundColor: '#FFFFFF',
    borderRadius: toDp(4),
    alignItems: 'center',
  },
  textTitleModal: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-SemiBold',
    color: '#263238',
    letterSpacing: toDp(0.7),
    marginTop: toDp(24),
  },
  textDescModal: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    color: '#263238',
    marginTop: toDp(8),
    width: toDp(255),
    textAlign: 'center',
  },
  icTepukTangan: {
    width: toDp(80),
    height: toDp(80),
    marginTop: toDp(24),
  },
  touchKembaliKeLogin: {
    marginTop: toDp(20),
    width: toDp(180),
    height: toDp(40),
    backgroundColor: '#5AAA0F',
    borderRadius: toDp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textKembaliKeLogin: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
    letterSpacing: toDp(0.7),
  },
});

export default RatingScreen;
