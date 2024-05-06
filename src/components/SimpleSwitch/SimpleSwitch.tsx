import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {useMemo} from 'react';
import {DimensionValue} from 'react-native';
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
  icon?: React.ReactNode;
  width?: DimensionValue;
  topMenu?: DimensionValue;
  paddingVertical?: DimensionValue;
};

const SimpleSwitch: React.FC<Props> = ({
  handlePress,
  active,
  icon,
  width,
  paddingVertical,
  topMenu,
}) => {
  const translateX = useSharedValue(active ? 20 : 0);

  const handlePresss = React.useCallback(() => {
    if (!active) {
      translateX.value += 20;
    } else {
      translateX.value -= 20;
    }
    active = !active;
  }, [active]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: withSpring(translateX.value)}],
  }));

  return (
    <RN.TouchableOpacity
      style={styles.container}
      onPress={() => {
        handlePresss(), handlePress();
      }}>
      <RN.View style={[styles.box, {width: width ? width : 50}]}>
        <Animated.View style={[styles.animatedBox, animatedStyles]}>
          <LinearGradient
            colors={['#ECC271', '#7F642E']}
            style={[
              styles.linear,
              {
                top: topMenu ? topMenu : -5,
                paddingVertical: paddingVertical ? paddingVertical : 6,
              },
            ]}>
            {icon}
          </LinearGradient>
        </Animated.View>
      </RN.View>
    </RN.TouchableOpacity>
  );
};

export default observer(SimpleSwitch);

const styles = RN.StyleSheet.create({
  container: {
    // width: 60,
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
// import React from 'react';
// import RN from '../RN';

// const SimpleSwitch = () => {
//   return <RN.View></RN.View>;
// };

// export default SimpleSwitch;
