import * as React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {Images} from '../../assets';
import {styles} from './SwitchBtnStyles';

type Props = {
  onPress?: () => void;
  isWork?: boolean;
};

const SwitchBtn: React.FC<Props> = ({onPress, isWork}) => {
  const translateTextX = useSharedValue(0);
  const translateIconX = useSharedValue(0);

  const handlePresss = () => {
    if (isWork) {
      translateIconX.value += 55;
      translateTextX.value -= 30;
    } else {
      translateIconX.value -= 55;
      translateTextX.value += 30;
    }
    isWork = !isWork;
  };

  const animatedTextStyles = useAnimatedStyle(() => ({
    transform: [{translateX: withDelay(300, withTiming(translateTextX.value))}],
  }));
  const animatedIconStyles = useAnimatedStyle(() => ({
    transform: [{translateX: withDelay(300, withTiming(translateIconX.value))}],
  }));

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        handlePresss(), onPress();
      }}>
      <LinearGradient style={styles.gradient} colors={['#ECC271', '#735315']}>
        <Animated.View style={[styles.icon, animatedIconStyles]}>
          <View style={styles.ellipse}>
            <Images.Svg.ellipseSmall height={30} />
          </View>
          {isWork ? <Images.Svg.sendIcon /> : <Images.Svg.sunIcon />}
        </Animated.View>
        <Animated.View style={[animatedTextStyles]}>
          <Text style={styles.title}>{isWork ? 'Work' : 'Rest'}</Text>
        </Animated.View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SwitchBtn;
