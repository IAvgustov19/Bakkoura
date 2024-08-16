import React from 'react';
import {ImageSourcePropType} from 'react-native';
import {DimensionValue} from 'react-native';
import RN from '../RN';

type Props = {
  source: ImageSourcePropType;
  width?: number;
  height?: number;
  type?: any;
};

const GiveImage: React.FC<Props> = ({source, height, type, width}) => {
  return (
    <RN.Image
      source={source}
      style={[styles.image, {objectFit: type}]}
      height={height}
      width={width}
    />
  );
};

export default GiveImage;

const styles = RN.StyleSheet.create({
  image: {
    width: 40,
    height: 30,
    objectFit: 'contain',
  },
});
