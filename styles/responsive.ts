import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

export const rS = (size: number) => {
  return scale(size);
};

export const rV = (size: number) => {
  return verticalScale(size);
};

export const rMS = (size: number, factor?: number) => {
  return moderateScale(size);
};
