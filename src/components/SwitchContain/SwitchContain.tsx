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
  title?: string;
  _title?: string;
  isSwitch?: boolean;
  handlePress?: () => void;
  back?: boolean;
};

const SwitchContain: React.FC<Props> = ({
  title,
  isSwitch,
  handlePress,
  back,
  _title,
}) => {
  const translateX = useSharedValue(0);

  const handlePresss = () => {
    if (back) {
      translateX.value += 20;
    } else {
      translateX.value -= 20;
    }
    back = !back;
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
          <LinearGradient colors={['#ECC271', '#7F642E']} style={styles.linear}>
            <RN.Text style={styles.title}>{back ? title : _title}</RN.Text>
          </LinearGradient>
        </Animated.View>
      </RN.View>
    </RN.TouchableOpacity>
  );
};

export default observer(SwitchContain);

const styles = RN.StyleSheet.create({
  container: {
    width: 95,
  },
  box: {
    backgroundColor: '#121212',
    width: 95,
    height: 22,
    borderRadius: 20,
  },
  animatedBox: {
    position: 'absolute',
  },
  title: {
    width: 'auto',
  },
  linear: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#7F642E',
    borderRadius: 30,
    borderColor: '#ECC271',
    borderWidth: 1,
    width: 75,
    top: -5,
    alignItems: 'center',
  },
});
