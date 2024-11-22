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
  AsyncStorage,
  ScrollView,
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { allLogo } from "../../Assets";
import { toDp } from "../../Helper/percentageToDP";
import CustomText from "../CustomText";

let { width, height } = Dimensions.get('window');

class Empty extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      darkMode: false,
    };
  }

  async componentDidMount() {
    let darkMode: any = await AsyncStorage.getItem('darkMode');
    this.setState({ darkMode: JSON.parse(darkMode) });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={this.props.images} style={styles.imgEmpty} />
        <CustomText textType="semibold" style={[styles.desc, { color: '#5E6157' }]}>
          {this.props.title}
        </CustomText>
        {this.props.subtitle ? (
          <CustomText style={[styles.subtitle, { color: '#5E6157' }]}>
            {this.props.subtitle}
          </CustomText>
        ) : (
          <View></View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: toDp(16),
    width,
  },
  imgEmpty: {
    width: toDp(120),
    height: toDp(120),
    resizeMode: 'contain',
    marginTop: toDp(-60),
  },
  title: {
    color: '#000000',
    fontSize: toDp(16),
    marginTop: toDp(16),
    marginBottom: toDp(8),
  },
  desc: {
    marginTop: toDp(24),
    fontSize: toDp(14),
    textAlign: 'center',
  },
  subtitle: {
    marginTop: toDp(8),
    fontSize: toDp(14),
    textAlign: 'center',
    marginHorizontal: toDp(30),
  },
});

export default Empty;
