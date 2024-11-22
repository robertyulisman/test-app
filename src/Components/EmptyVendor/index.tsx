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

let { width, height } = Dimensions.get('window');

class EmptyVendor extends Component<any, any> {

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
      <View
        style={[styles.container, { backgroundColor: this.state.darkMode ? '#121212' : '#f5f7f8' }]}
      >
        <Image source={allLogo.imgNoVendor} style={styles.imgEmpty} />
        <Text style={[styles.desc, { color: this.state.darkMode ? 'white' : 'black' }]}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7f8',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: toDp(16),
  },
  imgEmpty: {
    width: toDp(100),
    height: toDp(97.6),
    resizeMode: 'contain',
    marginTop: toDp(-60),
  },
  title: {
    color: '#000000',
    fontSize: toDp(16),
    fontFamily: 'Montserrat-SemiBold',
    marginTop: toDp(16),
    marginBottom: toDp(8),
  },
  desc: {
    marginTop: toDp(24),
    color: '#000000',
    fontSize: toDp(14),
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
});

export default EmptyVendor;
