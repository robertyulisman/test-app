import { PixelRatio, Platform } from 'react-native';

const fontScale = PixelRatio.getFontScale();

const getFontSize = (size: number): number | undefined => {
  if (Platform.OS === 'android') {
    return size / fontScale;
  }
  if (Platform.OS === 'ios') {
    return (size + 2) / fontScale;
  }
};

export default getFontSize;
