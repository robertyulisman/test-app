import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { StatusBar, Dimensions, StyleSheet, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';

import CustomText from "../CustomText";
import { allLogo } from "../../Assets";
import { toDp } from "../../Helper/percentageToDP";
let { width, height } = Dimensions.get('window');

class Header extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      darkMode: false,
    };
  }

  async componentDidMount() {
    let darkMode : any = await AsyncStorage.getItem('darkMode');
    this.setState({ darkMode: JSON.parse(darkMode) });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={'white'} />
        <View style={styles.header}>
          <TouchableOpacity style={styles.touchHeader} onPress={this.props.onPress}>
            <Image source={allLogo.icBack} style={styles.icBack} />
          </TouchableOpacity>
          <CustomText textType="medium" style={styles.title}>
            {this.props.title}
          </CustomText>
          <View style={styles.touchHeader}>
            <View style={styles.icBack} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  systemBar: {
    width,
  },
  header: {
    width,
    height: toDp(60),
    borderBottomWidth: toDp(1),
    borderBottomColor: '#CCCFC9',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: toDp(16),
  },
  touchHeader: {
    padding: toDp(4),
  },
  icBack: {
    width: toDp(16),
    height: toDp(16),
    tintColor: '#383B34',
  },
  title: {
    color: '#383B34',
    fontSize: toDp(18),
  },
});

export default Header;
