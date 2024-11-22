import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Modal from 'react-native-modal';

import { allLogo } from '../../Assets';
import { toDp } from '../../Helper/percentageToDP';

import CustomText from '../CustomText';

let { width, height } = Dimensions.get('window');

class CustomFilterModal extends Component<any, any> {
  private searchInput: any = null;
  private scrollView: any = null;

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

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void {
    if (prevProps.arrayData !== this.props.arrayData) {
      this.setState({ arrayData: this.props.arrayData, arrayHolder: this.props.arrayData });
    }
  }

  onChangeTextSearch = (valueSearch: any) => {
    console.log('valueSearch', valueSearch);
    this.setState({ valueSearch }, () => {
      const newData = this.state.arrayHolder.filter((item: any) => {
        const itemData = item.name ? item.name.toUpperCase() : item.toUpperCase();
        const textData = valueSearch.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({ arrayData: newData }, () => {
        console.log('this.state 1', this.state);
      });
    });
  };

  renderSearch = () => {
    return (
      <View style={styles.viewSearchRoot}>
        <View
          style={[styles.viewSearch, this.state.valueSearch !== '' ? styles.viewCustomSearch : {}]}
        >
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
            maxLength={20}
            placeholder={'Cari ' + this.props.title.toLowerCase() + '...'}
            autoFocus={false}
            placeholderTextColor={'#9B9F95'}
          />
          {this.state.valueSearch !== '' && (
            <TouchableOpacity style={styles.touchAll} onPress={() => this.onChangeTextSearch('')}>
              <Image source={allLogo.icSearchClear} style={styles.icSilangClear} />
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
        <View style={[styles.viewRootModal, { height: false ? height * 0.75 : 'auto' }]}>
          <View
            style={[
              styles.modalBox,
              { backgroundColor: this.props.darkMode ? '#121212' : 'white', height: height * 0.6 },
            ]}
          >
            {/*<View style={styles.viewCenter}>
              <View style={styles.lineModal} />
            </View>*/}

            <View style={styles.viewModalTitle}>
              <CustomText
                textType="semibold"
                style={[styles.textTitleModal, { color: this.props.darkMode && 'white' }]}
              >
                {this.props.title.toUpperCase()}
              </CustomText>

              <TouchableOpacity
                style={styles.touchSilang}
                onPress={() => this.setState({ modalVisible: false })}
              >
                <Image source={allLogo.icSilang} style={styles.icSilang} />
              </TouchableOpacity>
            </View>

            {this.renderSearch()}
            <View style={{ height: toDp(16) }} />
            {this.state.arrayData.length === 0 ? (
              <View style={styles.centerEmpty}>
                <CustomText
                  textType="regular"
                  style={[styles.emptySearch, { color: this.props.darkMode && 'white' }]}
                >
                  Tidak ada {this.props.title} terkait.
                </CustomText>
              </View>
            ) : (
              <ScrollView ref={(ref: any) => (this.scrollView = ref)}>
                {this.state.arrayData.map((item: any, index: any) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.viewTextModal,
                        { borderBottomColor: this.props.darkMode ? '#1C1C1E' : '#DDE3E0' },
                      ]}
                      key={index}
                      onPress={() => {
                        this.props.onSelected(item, index);
                        this.setState({ modalVisible: false });
                      }}
                    >
                      <CustomText
                        textType="regular"
                        style={[styles.textWhiteTitle, { color: '#273238' }]}
                      >
                        {item.name ? item.name : item}
                      </CustomText>
                    </TouchableOpacity>
                  );
                })}
                {this.props.statusKeyboard && <View style={{ height: toDp(150) }} />}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const { title, desc, value, inputRef, textPlaceholder, style } = this.props;
    return (
      <KeyboardAvoidingView style={{ ...styles.viewForm, ...style }}>
        {this.renderModal()}
        <TouchableOpacity
          style={styles.viewText}
          onPress={() => this.setState({ modalVisible: true })}
        >
          <Image source={allLogo.icFilter} style={styles.icChevronDown} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  viewForm: {
    width: toDp(24),
    height: toDp(24),
  },

  textTitle: {
    fontSize: toDp(14),
    color: '#9B9F95',
    letterSpacing: toDp(0.6),
  },
  viewText: {
    marginTop: toDp(2),
    width: toDp(24),
    height: toDp(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: toDp(10),
  },
  icChevronDown: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#5E6157',
    marginRight: toDp(8),
  },
  textValue: {
    fontSize: toDp(14),
    marginLeft: toDp(10),
  },
  textInclude: {
    color: 'red',
    fontSize: toDp(14),
    fontWeight: '500',
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
    marginHorizontal: toDp(16),
    height: toDp(50),
    borderBottomWidth: toDp(1),
    borderBottomColor: '#e9ebed',
    justifyContent: 'center',
  },
  textWhiteTitle: {
    color: '#273238',
    fontSize: toDp(14),
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
    backgroundColor: '#F6F7F4',
    height: Platform.OS === 'ios' ? toDp(40) : toDp(50),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: toDp(10),
  },
  icSearch2: {
    width: toDp(20.3),
    height: toDp(20),
    tintColor: '#9B9F95',
    marginLeft: toDp(12),
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
    //marginHorizontal: toDp(24),
    marginLeft: toDp(24),
    marginRight: toDp(16),
    marginBottom: toDp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTitleModal: {
    fontSize: toDp(14),
    letterSpacing: toDp(2),
    color: '#263238',
  },
  touchSilang: {
    padding: toDp(4),
  },
  icSilang: {
    width: toDp(20),
    height: toDp(20),
    tintColor: '#263238',
  },
  icSilangClear: {
    width: toDp(20),
    height: toDp(20),
  },
  textInputSearch: {
    flex: 1,
    fontSize: toDp(14),
    color: '#273238',
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
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
  },
  viewCustomSearch: {
    borderWidth: toDp(1),
    borderColor: '#5AAA0F',
  },
});

export default CustomFilterModal;
