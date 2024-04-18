import React from 'react';
import {DimensionValue} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RN from '../RN';

type Props = {
  top?: DimensionValue;
};

const DataListLinearBack: React.FC<Props> = ({top}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      style={[styles.linear, {top: top ? top : 110}]}
      colors={[
        'transparent',
        'rgba(13,13,13,.3)',
        '#0D0D0D',
        'rgba(13,13,13,.3)',
        'transparent',
      ]}></LinearGradient>
  );
};

export default DataListLinearBack;

const styles = RN.StyleSheet.create({
  linear: {
    position: 'absolute',
    width: '100%',
    height: 55,
    top: 110,
    zIndex: 0,
  },
});
