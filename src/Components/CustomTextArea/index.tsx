import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { allLogo } from '../../Assets';
import CustomText from '../../Components/CustomText';
import { toDp } from '../../Helper/percentageToDP';

let { width, height } = Dimensions.get('window');

class CustomTextArea extends Component<any, any> {
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
    const {
      title,
      error,
      maxLength,
      value,
      inputRef,
      onChangeText,
      onSubmitEditing,
      placeholder,
      secureTextEntry,
      onChangeSecure,
      type,
    } = this.props;
    return (
      <View style={styles.viewForm}>
        {title !== '' && (
          <CustomText textType="regular" style={styles.textTitle}>
            {title}
          </CustomText>
        )}
        <View
          style={[
            styles.viewText,
            error !== '' && styles.viewError,
            {
              height:
                Platform.OS === 'android'
                  ? title === 'Info Unit'
                    ? toDp(66)
                    : toDp(80)
                  : title === 'Info Unit'
                  ? toDp(60)
                  : toDp(70),
            },
          ]}
        >
          <TextInput
            ref={(r: any) => inputRef && inputRef(r)}
            onChangeText={(text: any) => onChangeText(text)}
            onSubmitEditing={() => onSubmitEditing && onSubmitEditing()}
            maxLength={maxLength}
            autoCapitalize={'none'}
            underlineColorAndroid={'transparent'}
            value={value}
            secureTextEntry={secureTextEntry}
            style={[styles.textInput, { color: this.state.darkMode ? 'white' : '#383B34' }]}
            placeholder={placeholder}
            placeholderTextColor={'#CCCFC9'}
            {...this.props}
            multiline
            numberOfLines={3}
            textAlignVertical={'top'}
          />
          {type === 'password' && (
            <TouchableOpacity style={styles.touchEye} onPress={() => onChangeSecure()}>
              <Image
                source={secureTextEntry ? allLogo.icEyeNonActive : allLogo.icEyeActive}
                style={styles.icEye}
              />
            </TouchableOpacity>
          )}
        </View>
        {error !== '' && <Text style={styles.textError}>{error}</Text>}
      </View>
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
    height: toDp(24),
    marginBottom: toDp(2),
  },
  viewText: {
    width: '100%',
    borderRadius: toDp(10),
    backgroundColor: '#F6F7F4',
    paddingHorizontal: toDp(10),
  },
  textInput: {
    flex: 1,
    fontSize: toDp(14),
    color: '#273238',
    marginHorizontal: Platform.OS === 'android' ? toDp(-4) : 0,
    marginTop: toDp(8),
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
  },
  textError: {
    marginTop: toDp(2),
    fontSize: toDp(12),
    color: '#F5493C',
    letterSpacing: toDp(0.05),
  },
  viewError: {
    marginTop: toDp(4),
    borderColor: '#F5493C',
    borderWidth: toDp(1),
  },
  customRow: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'red',
  },
  touchEye: {
    position: 'absolute',
    right: toDp(8),
    bottom: toDp(8),
  },
  icEye: {
    width: toDp(20.3),
    height: toDp(20),
    tintColor: '#B0BEC5',
    resizeMode: 'contain',
  },
});

export default CustomTextArea;
