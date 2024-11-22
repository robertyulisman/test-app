import { allLogo } from '@src/Assets';
import CustomText from '@src/Components/CustomText';
import { toDp } from '@src/Helper/percentageToDP';
import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

let { width, height } = Dimensions.get('window');

class CustomTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      text: '',
      lainnya: '',
      valueSearch: '',
      arrayData: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.arrayData.length !== prevState.arrayData.length) {
      this.setState({ arrayData: this.props.arrayData });
    }
  }

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
              <CustomText
                textType={'semibold'}
                style={[styles.textTitleModal, { color: this.props.darkMode && 'white' }]}
              >
                {this.props.title.toUpperCase()}
              </CustomText>
              <TouchableOpacity
                style={styles.touchSilang}
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Image
                  source={allLogo.icSilang}
                  style={[
                    styles.icSilang,
                    { tintColor: this.props.darkMode ? 'white' : '#5AAA0F' },
                  ]}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.viewCenter}>
              <FlatList
                data={this.state.arrayData}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.viewTextModal,
                        { backgroundColor: this.props.darkMode ? '#1C1C1E' : '#e9ebed' },
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
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const { title, desc, value, inputRef, textPlaceholder } = this.props;
    return (
      <KeyboardAvoidingView
        style={{
          paddingTop: toDp(24),
        }}
      >
        {this.renderModal()}

        <CustomText
          textType={'semibold'}
          style={[styles.textPukul, { color: this.props.darkMode ? 'white' : '#9B9F95' }]}
        >
          Pukul berapa layanan ini akan dikerjakan?
        </CustomText>
        <TouchableOpacity
          onPress={() => this.setState({ modalVisible: true })}
          style={[
            styles.viewValueForm,
            {
              backgroundColor: this.props.darkMode ? '#121212' : '#EEEEEE',
              borderColor: this.props.darkMode ? '#121212' : '#d8d8d8',
              borderWidth: 0,
              marginTop: toDp(20),
            },
          ]}
        >
          <CustomText style={[styles.textTime, { color: value === '0' ? '#9B9F95' : '#5E6157' }]}>
            {value === '0' ? '00.00' : value}
          </CustomText>
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
    fontFamily: Platform.OS === 'ios' ? 'Montserrat-Regular' : 'Montserrat-SemiBold',
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
  textInput: {
    flex: 1,
    fontSize: toDp(16),
    color: '#757575',
    // fontFamily: 'Montserrat-Medium',
    fontWeight: '300',
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
    fontSize: toDp(16),
    letterSpacing: toDp(2),
    color: '#9B9F95',
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
    fontSize: toDp(16),
    // fontFamily: 'Montserrat-Bold',
    letterSpacing: toDp(0.5),
  },
  viewForm: {
    marginTop: toDp(16),
    width: '100%',
    height: 'auto',
    padding: toDp(16),
    borderRadius: toDp(4),
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
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

export default CustomTime;
