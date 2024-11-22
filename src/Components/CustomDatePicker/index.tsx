import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';

import { allLogo } from "../../Assets";
import { toDp } from "../../Helper/percentageToDP";

let { width, height } = Dimensions.get('window');

class CustomDatePicker extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  renderDateTimePicker = () => {
    const { minimumDate, date } = this.props;
    return (
      <DateTimePicker
        // titleIOS={this.props.title}
        mode={'date'}
        isVisible={this.state.modalVisible}
        onConfirm={(response) => {
          this.props.onSelectedDate(response);
          this.setState({ modalVisible: false });
        }}
        onCancel={() => this.setState({ modalVisible: false })}
        minimumDate={minimumDate}
        date={date}
      />
    );
  };

  render() {
    const { title, desc, value, include, textPlaceholder } = this.props;
    return (
      <View style={styles.viewForm}>
        {this.renderDateTimePicker()}
        <Text style={styles.textTitle}>
          {include && <Text style={styles.textInclude}>{'* '}</Text>}
          {title}
        </Text>
        {desc !== '' && <Text style={styles.textDesc}>{'  ' + desc}</Text>}
        <TouchableOpacity
          style={styles.viewText}
          onPress={() => this.setState({ modalVisible: true })}
        >
          <Text style={[styles.textValue, { color: value === '' ? '#CDCDD1' : '#757575' }]}>
            {value === '' ? textPlaceholder : value}
          </Text>
          <Image source={allLogo.icCalendar} style={styles.icCalendar} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewForm: {},
  textTitle: {
    color: '#757575',
    fontSize: Platform.OS === 'ios' ? toDp(12) : toDp(14),
    fontWeight: Platform.OS === 'ios' ? '500' : '700',
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue-Medium' : 'HelveticaNeue-Bold',
  },
  viewText: {
    width: '100%',
    height: toDp(54),
    backgroundColor: '#FFFFFF',
    borderRadius: toDp(4),
    marginTop: toDp(8),
    borderWidth: toDp(1),
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    paddingHorizontal: Platform.OS === 'ios' ? toDp(16) : toDp(12),
  },
  textInclude: {
    color: 'red',
    fontSize: toDp(12),
    fontWeight: '500',
    fontFamily: 'HelveticaNeue-Medium',
  },
  textInput: {
    flex: 1,
    fontSize: toDp(14),
    fontFamily: 'HelveticaNeue-Light',
    fontWeight: '300',
    color: '#757575',
  },
  textValue: {
    fontSize: toDp(14),
    fontFamily: 'HelveticaNeue-Light',
    fontWeight: '300',
    color: '#757575',
  },
  textDesc: {
    marginTop: toDp(4),
    fontSize: toDp(12),
    fontFamily: 'HelveticaNeue-Light',
    fontWeight: '300',
    color: '#9B9B9B',
  },
  icCalendar: {
    width: toDp(24),
    height: toDp(24),
    tintColor: '#9B9B9B',
    position: 'absolute',
    right: Platform.OS === 'ios' ? toDp(16) : toDp(12),
  },
  viewCategoryMenu: {
    width,
    height: toDp(56),
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 'auto',
    paddingTop: toDp(12),
    paddingBottom: toDp(12),
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: toDp(16),
    borderTopLeftRadius: toDp(16),
  },
  viewTextModal: {
    padding: toDp(16),
    borderBottomWidth: toDp(1),
    borderBottomColor: '#ECECED',
  },
  textWhiteTitle: {
    color: '#1F2430',
    fontSize: toDp(16),
    fontFamily: 'HelveticaNeue-Medium',
    fontWeight: '500',
  },
});

export default CustomDatePicker;
