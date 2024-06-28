import {observer} from 'mobx-react-lite';
import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import RN from '../../../../components/RN';
import useRootStore from '../../../../hooks/useRootStore';
import {COLORS} from '../../../../utils/colors';
type Props = {
  title?: string;
  handlePress?: () => void;
};

const WatchSwitch: React.FC<Props> = ({title, handlePress}) => {
  const translateX = useSharedValue(20);
  const {whichWatch, changeWatch} = useRootStore().homeClockStore;

  const handlePresss = () => {
    if (whichWatch === 1) {
      translateX.value += 20;
      changeWatch(2);
    }
    if (whichWatch === 2) {
      translateX.value -= 40;
      changeWatch(3);
    }
    if (whichWatch === 3) {
      translateX.value = 20;
      changeWatch(1);
    }
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: withSpring(translateX.value)}],
  }));

  return (
    <RN.TouchableOpacity onPress={handlePresss}>
      <RN.View style={[styles.box]}>
        <Animated.View style={[styles.animatedBox, animatedStyles]}>
          <LinearGradient colors={['#ECC271', '#7F642E']} style={styles.linear}>
            <RN.Text style={styles.title} fontFamily="RedHatDisplay-SemiBold">
              {whichWatch === 1 ? '24/30h' : whichWatch === 2 ? '24h' : '30h'}
            </RN.Text>
          </LinearGradient>
        </Animated.View>
      </RN.View>
    </RN.TouchableOpacity>
  );
};

export default observer(WatchSwitch);

const styles = RN.StyleSheet.create({
  box: {
    backgroundColor: '#000000',
    width: 110,
    height: 22,
    borderRadius: 20,
  },
  animatedBox: {
    position: 'absolute',
  },
  title: {
    width: 'auto',
    color: COLORS.black,
  },
  linear: {
    paddingHorizontal: 5,
    paddingVertical: 6,
    backgroundColor: '#7F642E',
    borderRadius: 30,
    borderColor: '#ECC271',
    borderWidth: 1,
    width: 70,
    top: -5,
    alignItems: 'center',
  },
});
