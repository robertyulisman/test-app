import React, { Component } from 'react';
import {
  BackHandler,
  StatusBar,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Platform,
  TouchableOpacity,
  ScrollView,
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { allLogo } from "../../Assets";
import { toDp } from "../../Helper/percentageToDP";
import CustomText from "../CustomText";

let { width, height } = Dimensions.get('window');

class NoConnection extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      darkMode: false,
    };
  }

  render() {
    return (
      <View
        style={[styles.container, { backgroundColor: this.state.darkMode ? '#121212' : '#f5f7f8' }]}
      >
        <Image source={allLogo.imgNoConnection} style={styles.imgNoConnection} />
        <CustomText
          textType="semibold"
          style={[styles.desc, { color: this.state.darkMode ? 'white' : '#5E6157' }]}
        >
          Maaf, tidak ada koneksi internet.
        </CustomText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    backgroundColor: '#f5f7f8',
    justifyContent: 'center',
    alignItems: 'center',
    //paddingHorizontal: toDp(16),
  },
  imgNoConnection: {
    width: toDp(120),
    height: toDp(120),
    marginTop: toDp(-60),
  },
  title: {
    color: '#000000',
    fontSize: toDp(16),
    //fontFamily: 'Montserrat-SemiBold',
    marginTop: toDp(16),
    marginBottom: toDp(8),
  },
  desc: {
    marginTop: toDp(24),
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
});

export default NoConnection;
