import { Dimensions } from 'react-native';
import { createFontStyle, createTransparencyObject, opacities } from './helper';

const { width, height } = Dimensions.get('screen');

export const SIZE = {
  width,
  height,
};

export const COLORS = {
  primary: {
    500: '#E31320',
    400: '#EE3440',
    300: '#F15D66',
    200: '#F5858C',
    100: '#F8AEB2',
    50: '#FCD6D9',
  },

  secondary: {
    500: '#2C76CE',
    400: '#4C8DD9',
    300: '#70A3E0',
    200: '#94BAE8',
    100: '#B8D1F0',
    50: '#DBE8F7',
  },

  purple: {
    500: '#682DE5',
    400: '#8150E9',
    300: '#9A73EE',
    200: '#B396F2',
    100: '#CDB9F6',
    50: '#E6DCFB',
  },

  yellow: {
    500: '#FFE600',
    400: '#FFEA29',
    300: '#FFED53',
    200: '#FFF17C',
    100: '#FFF4A6',
    50: '#FFF8CF',
  },

  warning: {
    500: '#FCA311',
    400: '#FDB239',
    300: '#FDC260',
    200: '#FED188',
    100: '#FEE0B0',
    50: '#FFF0D7',
  },

  success: {
    500: '#42A444',
    400: '#5AB55C',
    300: '#84C886',
    200: '#B2DCB2',
    100: '#D5ECD5',
    50: '#F4FAF5',
  },

  error: {
    500: '#E31320',
    400: '#EE3440',
    300: '#F15D66',
    200: '#F5858C',
    100: '#F8AEB2',
    50: '#FCD6D9',
  },

  additional: {
    100: '#17AAA5',
    200: '#FCA311',
    300: '#F15679',
    400: '#682DE5',
    500: '#17A1FA',
    600: '#FCA311',
    700: '#5AB55C',
    800: '#458039',
  },

  dark: {
    500: '#16191D',
    400: '#5C6470',
    300: '#808893',
    200: '#A4AAB2',
    100: '#C0C4C9',
    50: '#D2D6DA',
  },
  light: {
    500: '#DEE4E7',
    400: '#E4E9EC',
    300: '#EAEEF1',
    200: '#EFF3F5',
    100: '#F8FAFB',
    50: '#FFFFFF',
  },
  blackTransparent: createTransparencyObject('0, 0, 0', opacities),
  whiteTransparent: createTransparencyObject('255, 255, 255', opacities),
};

export const FONTS = {
  heading1: createFontStyle('Poppins-ExtraBold', 22, 32),
  heading1Medium: createFontStyle('Poppins-Medium', 22, 32),
  heading2: createFontStyle('Poppins-Bold', 18, 28),
  heading2ExtraBold: createFontStyle('Poppins-ExtraBold', 18, 20),
  heading3: createFontStyle('Poppins-Bold', 16, 24),

  label1: createFontStyle('Poppins-Bold', 14, 22),
  label2: createFontStyle('Poppins-Bold', 12, 18),
  label2Medium: createFontStyle('Poppins-Medium', 12, 18),
  label3: createFontStyle('Poppins-Bold', 10, 16),
  label3Medium: createFontStyle('Poppins-Medium', 10, 16),

  body1: createFontStyle('Poppins-Regular', 14, 22),
  body2: createFontStyle('Poppins-Regular', 12, 18),
  body3: createFontStyle('Poppins-Regular', 10, 16),
};

export const SIGNATURE_STYLE = '.m-signature-pad--footer {display: none; margin: 0px;}';
