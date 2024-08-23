import {Dimensions, PixelRatio} from 'react-native';
import {isIOS} from '../constants/platform';
const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export {horizontalScale, verticalScale, moderateScale};

const SIZES = {
  width,
  height,
};

// size of Figma design layout
const BASE_WIDTH = 1170;
const BASE_HEIGHT = 2532;

const scaleWidth = SIZES.width / BASE_WIDTH;
const scaleHeight = SIZES.height / BASE_HEIGHT;

const normalizeWidth = (size: number) => {
  const newSize = size * scaleWidth;
  const normalizedSize = Math.round(PixelRatio.roundToNearestPixel(newSize));

  return isIOS ? normalizedSize : normalizedSize - 1;
};

const normalizeHeight = (size: number) => {
  const newSize = size * scaleHeight;
  const normalizedSize = Math.round(PixelRatio.roundToNearestPixel(newSize));

  return isIOS ? normalizedSize : normalizedSize - 1;
};

export {normalizeWidth, normalizeHeight, SIZES};
