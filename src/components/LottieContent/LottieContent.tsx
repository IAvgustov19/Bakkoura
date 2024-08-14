import AnimatedLottieView from 'lottie-react-native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {DimensionValue} from 'react-native';
import RN from '../RN';

type Props = {
  source?: string;
  width?: DimensionValue;
  speed?: number;
  autoPlay?: boolean;
  loop?: boolean;
  ref?: any;
};

const LottieContent: React.FC<Props> = ({
  source,
  width = 320,
  autoPlay = true,
  loop = true,
  speed = 1,
  ref,
}) => {
  return (
    <LottieView
      ref={ref}
      source={source}
      autoPlay={autoPlay}
      loop={loop}
      speed={speed}
      style={{width: width}}
    />
  );
};

export default LottieContent;

const styles = RN.StyleSheet.create({
  container: {},
});
