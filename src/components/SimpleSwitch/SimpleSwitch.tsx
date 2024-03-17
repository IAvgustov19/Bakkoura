import {observer} from 'mobx-react-lite';
import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import RN from '../RN';
type Props = {
  handlePress?: () => void;
  active?: boolean;
};

const SimpleSwitch: React.FC<Props> = ({handlePress, active}) => {
  const translateX = useSharedValue(20);

  const handlePresss = () => {
    if (!active) {
      translateX.value += 20;
    } else {
      translateX.value -= 20;
    }
    active = !active;
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: withSpring(translateX.value)}],
  }));

  return (
    <RN.TouchableOpacity
      style={styles.container}
      onPress={() => {
        handlePresss(), handlePress();
      }}>
      <RN.View style={[styles.box]}>
        <Animated.View style={[styles.animatedBox, animatedStyles]}>
          <LinearGradient
            colors={['#ECC271', '#7F642E']}
            style={styles.linear}></LinearGradient>
        </Animated.View>
      </RN.View>
    </RN.TouchableOpacity>
  );
};

export default observer(SimpleSwitch);

const styles = RN.StyleSheet.create({
  container: {
    width: 60,
  },
  box: {
    backgroundColor: '#121212',
    width: 50,
    height: 22,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  animatedBox: {
    position: 'absolute',
  },
  linear: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#7F642E',
    borderRadius: 30,
    borderColor: '#ECC271',
    borderWidth: 1,
    minHeight: 30,
    minWidth: 30,
    top: -5,
    alignItems: 'center',
  },
});
