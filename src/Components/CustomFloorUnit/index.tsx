import React, { Component } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
} from 'react-native';

import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';

import { allLogo } from "../../Assets";
import { toDp } from "../../Helper/percentageToDP";
import CustomTextInput from "../CustomTextInput";

let { width, height } = Dimensions.get('window');

class CustomFloorUnit extends Component<any, any> {

  private searchInput : any = null;

  constructor(props: any) {
    super(props);
    this.state = {
      modalVisible: false,
      text: '',
      lainnya: '',
      valueSearch: '',
      arrayData: this.props.arrayData,
      arrayHolder: this.props.arrayData,
    };
  }

  onChangeTextSearch = (valueSearch: any) => {
    this.setState({ valueSearch }, () => {
      const newData = this.state.arrayHolder.filter((item: any) => {
        const itemData = item.name ? item.name.toUpperCase() : item.toUpperCase();
        const textData = valueSearch.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({ arrayData: newData });
    });
  };

  renderSearch = () => {
    return (
      <View style={styles.viewSearchRoot}>
        <View style={styles.viewSearch}>
          <Image source={allLogo.icSearch} style={styles.icSearch2} />
          <TextInput
            ref={(ref: any) => {
              this.searchInput = ref;
            }}
            onChangeText={(valueSearch: any) => this.onChangeTextSearch(valueSearch)}
            autoCapitalize={'none'}
            underlineColorAndroid={'transparent'}
            value={this.state.valueSearch}
            style={[
              styles.textInputSearch,
              {
                marginLeft: Platform.OS === 'ios' ? toDp(8) : toDp(2),
                color: this.props.darkMode ? 'white' : '#273238',
              },
            ]}
            maxLength={this.props.title === 'Unit' ? 4 : 2}
            placeholder={'Cari ' + this.props.title.toLowerCase() + '...'}
            autoFocus={false}
            placeholderTextColor={'#B0BEC5'}
          />
          {this.state.valueSearch !== '' && (
            <TouchableOpacity style={styles.touchAll} onPress={() => this.onChangeTextSearch('')}>
              <Image source={allLogo.icSilang} style={styles.icSilang} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  renderModal = () => {
    return (
      <Modal
        onBackButtonPress={() => this.setState({ modalVisible: false })}
        onBackdropPress={() => this.setState({ modalVisible: false })}
        isVisible={this.state.modalVisible}
        style={styles.bottomModal}
      >
        <View
          style={[
            styles.viewRootModal,
            { height: this.props.arrayData.length >= 100 ? height * 0.75 : 'auto' },
          ]}
        >
          <View
            style={[
              styles.modalBox,
              { backgroundColor: this.props.darkMode ? '#121212' : 'white', height: height * 0.6 },
            ]}
          >
            <View style={styles.viewModalTitle}>
              <Text style={[styles.textTitleModal, { color: this.props.darkMode && 'white' }]}>
                {this.props.title.toUpperCase()}
              </Text>
              <TouchableOpacity
                style={styles.touchSilang}
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Image
                  source={allLogo.icSilang}
                  style={[
                    styles.icSilang,
                    { tintColor: this.props.darkMode ? 'white' : '#917438' },
                  ]}
                />
              </TouchableOpacity>
            </View>

            {this.renderSearch()}
            <View style={{ height: toDp(16) }} />
            <ScrollView>
              <View style={styles.viewCenter}>
                <FlatList
                  data={this.state.arrayData}
                  renderItem={({
                    item,
                    index
                  }: any) => {
                    return (
                      <TouchableOpacity
                        style={[
                          styles.viewTextModal,
                          {
                            backgroundColor: this.props.darkMode ? '#1C1C1E' : '#e9ebed',
                            width: item.length >= 5 ? 'auto' : toDp(60),
                            paddingHorizontal: item.length >= 5 ? toDp(12) : toDp(0),
                          },
                        ]}
                        key={index}
                        onPress={() => {
                          this.props.onSelected(item, index);
                          this.setState({ modalVisible: false });
                        }}
                      >
                        <Text
                          allowFontScaling={false}
                          style={[
                            styles.textWhiteTitle,
                            { color: this.props.darkMode ? 'white' : '#273238' },
                          ]}
                        >
                          {item.name ? item.name : item}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  numColumns={4}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const { title, desc, value, inputRef, textPlaceholder } = this.props;
    return (
      <KeyboardAvoidingView style={styles.viewForm}>
        {this.renderModal()}
        <Text style={styles.textTitle}>{title}</Text>
        {desc !== '' && <Text style={styles.textDesc}>{'  ' + desc}</Text>}
        <TouchableOpacity
          style={styles.viewText}
          onPress={() => this.setState({ modalVisible: true })}
        >
          <Text
            style={[
              styles.textValue,
              { color: value === '' ? '#b0bec5' : this.props.darkMode ? 'white' : '#273238' },
            ]}
          >
            {value === '' ? textPlaceholder : value}
          </Text>
          <Image source={allLogo.icChevronDown} style={styles.icChevronDown} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  viewForm: {
    width: '100%',
    height: toDp(67),
  },
  textTitle: {
    // fontFamily: 'Montserrat-Regular',
    fontSize: toDp(12),
    color: '#788F9C',
    letterSpacing: toDp(0.6),
  },
  viewText: {
    marginTop: toDp(4),
    width: '100%',
    height: toDp(32),
    borderBottomWidth: toDp(1),
    borderColor: '#788F9C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icChevronDown: {
    width: toDp(20.3),
    height: toDp(20),
    tintColor: '#b0bec5',
    marginRight: toDp(8),
  },
  textValue: {
    fontSize: toDp(14),
    // fontFamily: 'Montserrat-Regular',
  },
  textInclude: {
    color: 'red',
    fontSize: toDp(14),
    fontWeight: '500',
    // fontFamily: 'Montserrat-Medium',
  },
  textInput: {
    flex: 1,
    fontSize: toDp(14),
    fontWeight: '300',
    color: '#757575',
  },
  textDesc: {
    marginTop: toDp(4),
    fontSize: toDp(12),
    fontWeight: '300',
    color: '#9B9B9B',
  },
  viewCategoryMenu: {
    width,
    height: toDp(56),
    justifyContent: 'center',
    alignItems: 'center',
    // borderTopWidth: 1,
    // borderTopColor: '#BDBDBD'
  },

  viewTextModal: {
    width: toDp(60),
    height: toDp(48),
    borderRadius: toDp(4),
    backgroundColor: '#EEEEEE',
    marginRight: toDp(16),
    marginBottom: toDp(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWhiteTitle: {
    color: '#273238',
    fontSize: toDp(16),
    // fontFamily: 'Montserrat-Regular',
  },
  viewCenter: {
    width,
    alignItems: 'center',
  },
  viewTextInput: {
    width: '90%',
    height: toDp(54),
    backgroundColor: '#FFFFFF',
    borderRadius: toDp(4),
    justifyContent: 'center',
    marginTop: toDp(8),
    paddingHorizontal: toDp(16),
    borderWidth: toDp(1),
    borderColor: '#E0E0E0',
  },
  textInputNew: {
    color: 'black',
    fontSize: toDp(16),
    // fontFamily: 'Montserrat-Medium',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: toDp(16),
    alignItems: 'center',
    width: width * 0.9,
    height: 'auto',
    backgroundColor: '#FFFFFF',
  },
  viewTextTitle: {
    flex: 1,
    height: 'auto',
    backgroundColor: '#FFFFFF',
  },
  linearButton: {
    borderRadius: toDp(4),
    marginTop: toDp(36),
    marginLeft: toDp(16),
    width: toDp(54),
    height: toDp(54),
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButton: {
    width: toDp(54),
    height: toDp(54),
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: 'auto',
    borderTopRightRadius: toDp(12),
    borderTopLeftRadius: toDp(12),
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 4,
  },
  linearHeader: {
    height: toDp(48),
    borderTopRightRadius: toDp(12),
    borderTopLeftRadius: toDp(12),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 4,
  },
  title: {
    color: '#151d2c',
    fontSize: toDp(20),
    fontWeight: '500',
    // fontFamily: Platform.OS === 'ios' ? 'Montserrat-Regular' : 'Montserrat-SemiBold',
  },

  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewRootModal: {
    width,
    position: 'absolute',
    bottom: 0,
  },
  modalBox: {
    width,
    height: toDp(165),
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: toDp(16),
    borderTopRightRadius: toDp(16),
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  viewSearchRoot: {
    flexDirection: 'row',
    alignItems: 'center',
    //marginTop: toDp(16),
    marginRight: toDp(8),
    marginBottom: toDp(8),
  },
  viewSearch: {
    width: '90%',
    marginLeft: toDp(24),
    marginRight: toDp(24),
    borderBottomWidth: toDp(1),
    borderColor: '#788f9c',
    height: toDp(44),
    alignItems: 'center',
    flexDirection: 'row',
  },
  icSearch2: {
    width: toDp(20.3),
    height: toDp(20),
    tintColor: '#b0bec5',
  },
  touchAll: {
    position: 'absolute',
    right: toDp(8),
  },
  icDeleteAll: {
    width: toDp(24),
    height: toDp(24),
  },

  viewModalTitle: {
    marginTop: toDp(24),
    marginHorizontal: toDp(24),
    marginBottom: toDp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitleModal: {
    // fontFamily: 'Montserrat-Bold',
    fontSize: toDp(14),
    letterSpacing: toDp(2),
    color: '#263238',
  },
  touchSilang: {
    padding: toDp(4),
    position: 'absolute',
    right: toDp(0),
  },
  icSilang: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#917438',
  },
  textInputSearch: {
    flex: 1,
    fontSize: toDp(14),
    color: '#273238',
    // fontFamily: 'Montserrat-Regular',
  },
  lineModal: {
    width: toDp(64),
    height: toDp(4),
    backgroundColor: '#d3d6db',
    borderRadius: toDp(7),
    marginTop: toDp(15),
  },
  centerEmpty: {
    alignItems: 'center',
  },
  emptySearch: {
    marginTop: toDp(60),
    fontSize: toDp(14),
    color: '#273238',
    // fontFamily: 'Montserrat-Regular',
  },
  textPukul: {
    fontSize: toDp(14),
    // fontFamily: 'Montserrat-Bold',
    letterSpacing: toDp(0.5),
  },
  viewValueForm: {
    width: '100%',
    height: toDp(40),
    borderRadius: toDp(4),
    borderWidth: toDp(1),
    borderColor: '#D8D8D8',
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTime: {
    fontSize: toDp(14),
    // fontFamily: 'Montserrat-Regular',
  },
  red: {
    color: '#f5493c',
  },
});

export default CustomFloorUnit;
