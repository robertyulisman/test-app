// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Dimensions, PixelRatio } from 'react-native';

const widthPercentageToDP = (widthPercent: any) => {
  const screenWidth = Dimensions.get('window').width;
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

const heightPercentageToDP = (heightPercent: any) => {
  const screenHeight = Dimensions.get('window').height;
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

const toDp = (size: any) => {
  const screenWidth = Dimensions.get('window').width;
  const elemSize = parseFloat(size);
  return PixelRatio.roundToNearestPixel((screenWidth * elemSize) / 100) / 3.6;
};

export { widthPercentageToDP, heightPercentageToDP, toDp };
