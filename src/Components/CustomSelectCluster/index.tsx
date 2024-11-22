import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { KeyboardAvoidingView, TextInput, Dimensions, StyleSheet, Text, View, Image, Platform, TouchableOpacity, ScrollView } from 'react-native';

import Modal from 'react-native-modal';

import { allLogo } from "../../Assets";
import { toDp } from "../../Helper/percentageToDP";

import LinearGradient from 'react-native-linear-gradient';
import CustomTextInput from "../CustomTextInput";
import CustomText from "../CustomText";

let { width, height } = Dimensions.get('window');

class CustomSelectCluster extends Component<any, any> {

  private searchInput : any = null;
  private scrollView : any = null;

  constructor(props: any) {
    super(props);
    this.state = {
      modalVisible: false,
      text: '',
      lainnya: '',
      valueSearch: '',
      statusAll: false,
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
            maxLength={20}
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
              { backgroundColor: this.props.darkMode ? '#121212' : 'white', height: height * 0.85 },
            ]}
          >
            {/*
              <View style={styles.viewCenter}>
                <View style={styles.lineModal} />
              </View>
            */}
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
              <ScrollView ref={(ref: any) => this.scrollView = ref}>
                {this.state.arrayData.map((item: any, index : any) => {
                  return (
                    <TouchableOpacity
                      style={[
                        styles.viewTextModal,
                        { borderBottomColor: this.props.darkMode ? '#1C1C1E' : '#e9ebed' },
                      ]}
                      key={index}
                      onPress={() => {
                        this.setState(
                          {
                            statusAll: !this.state.statusAll,
                            arrayData: this.state.arrayData.map((data: any, i: number) => {
                              if (index == 0) {
                                return {
                                  ...data,
                                  status: !this.state.statusAll,
                                };
                              }
                              return {
                                ...data,
                                status: data.name === item.name ? !data.status : data.status,
                              };
                            }),
                          },
                          () => {
                            // nanti next
                          },
                        );
                      }}
                    >
                      <Image
                        source={item.status ? allLogo.icNewsCheck : allLogo.icCheckboxUnChecked}
                        style={styles.icCheckbox}
                      />
                      <CustomText
                        textType="regular"
                        allowFontScaling={false}
                        style={[
                          styles.textWhiteTitle,
                          { color: this.props.darkMode ? 'white' : '#273238' },
                        ]}
                      >
                        {item.name ? item.name : item}
                      </CustomText>
                    </TouchableOpacity>
                  );
                })}
                {
                  //this.props.statusKeyboard &&
                  <View style={{ height: toDp(48) }} />
                }
              </ScrollView>
            )}
            <View style={styles.viewCenterButton}>
              <TouchableOpacity
                style={styles.touchKirim}
                onPress={() => {
                  let selected: Array<any> = [];
                  this.state.arrayData.map((data: any, index: number) => {
                    if (data.status) {
                      //selected.push({name: data.name})
                      selected.push(data.id);
                    }
                  });

                  if (this.state.arrayData.length !== 0) {
                    if (this.state.arrayData[0].status) {
                      selected.shift();
                    }
                  }

                  this.props.onSelected(selected);
                  this.setState({ modalVisible: false });
                }}
              >
                <CustomText textType="semibold" style={styles.textKirim}>
                  PILIH
                </CustomText>
              </TouchableOpacity>
            </View>
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
          <CustomText
            textType="regular"
            style={[
              styles.textValue,
              { color: value === '' ? '#CCCFC9' : this.props.darkMode ? 'white' : '#383B34' },
            ]}
          >
            {value === '' ? textPlaceholder : value}
          </CustomText>
          <Image source={allLogo.icArrowBottom} style={styles.icChevronDown} />
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
    fontSize: toDp(14),
    color: '#9B9F95',
    letterSpacing: toDp(0.6),
  },
  viewText: {
    marginTop: toDp(2),
    width: '100%',
    height: toDp(40),
    backgroundColor: '#F6F7F4',
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
    alignItems: 'center',
    flexDirection: 'row',
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
    height: toDp(40),
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
  },
  lineModal: {
    width: toDp(64),
    height: toDp(4),
    backgroundColor: '#d3d6db',
    borderRadius: toDp(7),
    marginTop: toDp(15),
  },
  centerEmpty: {
    flex: 1,
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

  icCheckbox: {
    width: toDp(18),
    height: toDp(18),
    marginRight: toDp(10),
  },
  viewCenterButton: {
    alignItems: 'center',
  },
  touchKirim: {
    width: '90%',
    height: toDp(40),
    borderRadius: toDp(10),
    backgroundColor: '#5AAA0F',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: toDp(24),
  },
  textKirim: {
    fontSize: toDp(14),
    //fontFamily: 'Montserrat-SemiBold',
    color: 'white',
    fontStyle: 'normal',
    letterSpacing: toDp(0.7),
  },
});

export default CustomSelectCluster;
