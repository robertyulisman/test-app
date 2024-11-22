import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Image, Modal, StyleSheet, View } from 'react-native';

import { allLogo } from '../../Assets';
import { toDp } from '../../Helper/percentageToDP';
import CustomText from '../CustomText';

const Loader = (props: any) => {
  const { loading, ...attributes } = props;

  /*return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
         <View style={styles.kotak}>
           <Image source={allLogo.loading} style={styles.imgLoading}/>
         </View>
        </View>
      </View>
    </Modal>
  )*/

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        console.log('close modal');
      }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Image source={allLogo.loading} style={styles.loading} />
          <CustomText textType="regular" style={styles.text}>
            Tunggu sebentar
          </CustomText>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000060',
  },
  activityIndicatorWrapper: {
    backgroundColor: 'white',
    width: toDp(190),
    height: toDp(148),
    borderRadius: toDp(16),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowColor: '#000000',
  },
  loading: {
    width: toDp(120),
    height: toDp(60),
    resizeMode: 'contain',
  },
  text: {
    fontSize: toDp(14),
    color: '#000000',
    marginTop: toDp(2),
  },
});

export default Loader;
