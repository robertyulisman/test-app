import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { TextInput, Dimensions, StyleSheet, Text, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';

import { allLogo } from "../../Assets";
import { toDp } from "../../Helper/percentageToDP";

let { width, height } = Dimensions.get('window');
import CustomText from "../CustomText";

class CustomTextInput extends Component<any, any> {
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
      editable,
      rootStyles,
    } = this.props;
    let isEditable = editable;
    if (isEditable == undefined) {
      isEditable = true;
    }
    return (
      <View style={styles.viewForm}>
        {title !== '' && (
          <CustomText textType="regular" style={styles.textTitle}>
            {title}
          </CustomText>
        )}
        <View style={[styles.viewText, error !== '' && styles.viewError, rootStyles]}>
          <TextInput
            ref={inputRef}
            onChangeText={(text: any) => onChangeText(text)}
            onSubmitEditing={() => onSubmitEditing && onSubmitEditing()}
            maxLength={maxLength}
            autoCapitalize={'none'}
            underlineColorAndroid={'transparent'}
            value={value}
            editable={editable}
            secureTextEntry={secureTextEntry}
            style={[styles.textInput, { color: isEditable ? '#383B34' : '#CCCFC9' }]}
            placeholder={placeholder}
            placeholderTextColor={'#CCCFC9'}
            {...this.props}
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
  },
  viewText: {
    width: '100%',
    height: toDp(44),
    borderColor: '#788F9C',
    backgroundColor: '#F6F7F4',
    borderRadius: toDp(10),
    marginTop: toDp(2),
  },
  textInput: {
    flex: 1,
    fontSize: toDp(14),
    color: '#273238',
    marginLeft: toDp(10),
    fontWeight: '400',
  },
  textError: {
    marginTop: toDp(2),

    fontSize: toDp(12),
    color: '#EE4040',
  },
  viewError: {
    borderColor: '#EE4040',
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
    bottom: toDp(12),
  },
  icEye: {
    width: toDp(20.3),
    height: toDp(20),
    tintColor: '#5E6157',
    resizeMode: 'contain',
  },
});

export default CustomTextInput;
