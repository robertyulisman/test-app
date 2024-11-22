/* eslint-disable react-native/no-inline-styles */
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text, StyleSheet } from 'react-native';

import { allLogo } from "../../Assets";
import { toDp } from "../../Helper/percentageToDP";

const CustomText = (props: any) => {
  let textStyle: {};
  switch (props.textType) {
    case 'regular':
      textStyle = styles.regular;
      break;
    case 'medium':
      textStyle = styles.medium;
      break;
    case 'semibold':
      textStyle = styles.semibold;
      break;
    case 'bold':
      textStyle = styles.bold;
      break;
    default:
      textStyle = styles.regular;
      break;
  }

  const passedStyles = Array.isArray(props.style) ? Object.assign({}, ...props.style) : props.style;

  return (
    <Text
      style={[textStyle, { ...passedStyles }]}
      onPress={props.onPress}
      numberOfLines={props.numberOfLines}
    >
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    color: '#273238',
  },
  medium: {
    fontFamily: 'Poppins-Medium',
    fontWeight: '500',
    color: '#273238',
  },
  semibold: {
    fontFamily: 'Poppins-SemiBold',
    fontWeight: '600',
    color: '#273238',
  },
  bold: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    color: '#273238',
  },
});

export default CustomText;
