import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useMemo} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import useRootStore from '../../../hooks/useRootStore';
import {COLORS} from '../../../utils/colors';

type Props = {
  countMinut?: number;
  addCount?: () => void;
  removeCount?: () => void;
  etap?: number;
};

const FirstMetronom: React.FC<Props> = ({
  addCount,
  countMinut,
  removeCount,
  etap,
}) => {
  const {etapData, metronomState} = useRootStore().metronomStore;

  const translateX = useSharedValue(0);

  const EtapHandle = useMemo(() => {
    switch (metronomState.etapLine % 2 == 0) {
      case false:
        translateX.value = -30;
        break;
      case true:
        translateX.value = 30;
        break;
    }
  }, [metronomState.etapLine]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{rotate: withTiming(`${translateX.value}deg`)}],
  }));

  const renderEtapData = useMemo(() => {
    return etapData.map((item, index) => {
      return (
        <Images.Svg.ellipseDot
          key={index}
          fill={
            metronomState.etapCount === 1
              ? metronomState.etapLine === 1
                ? COLORS.yellow
                : COLORS.black
              : item === etap
              ? COLORS.yellow
              : COLORS.black
          }
        />
      );
    });
  }, [metronomState.etapCount, etap, metronomState.etapLine]);

  return (
    <RN.View style={styles.metronom}>
      <RN.View style={styles.metronomImage}>
        <Images.Svg.metronom />
      </RN.View>
      <RN.View style={styles.plusMinus}>
        <RN.TouchableOpacity onPress={removeCount}>
          <Images.Svg.removeCount />
        </RN.TouchableOpacity>
        <RN.View style={styles.minCountBox}>
          <TextView text={'BPM'} />
          <RN.Text style={styles.minCount}>{countMinut}</RN.Text>
        </RN.View>
        <RN.TouchableOpacity onPress={addCount}>
          <Images.Svg.addCount />
        </RN.TouchableOpacity>
      </RN.View>
      <Animated.View style={[styles.metronomLine, animatedStyles]}>
        <Images.Svg.metronomLine />
      </Animated.View>
      <RN.View style={styles.activity}>
        <RN.View style={styles.dots}>{renderEtapData}</RN.View>
        <TextView title={`${etap ? etap : 1}`} />
      </RN.View>
    </RN.View>
  );
};

export default observer(FirstMetronom);

const styles = RN.StyleSheet.create({
  metronom: {
    alignItems: 'center',
  },
  metronomImage: {
    zIndex: 1,
    // backgroundColor: 'red',
  },
  plusMinus: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 30,
    paddingVertical: 15,
    zIndex: 3,
  },
  minCountBox: {
    width: 60,
    textAlign: 'center',
  },
  minCount: {
    fontSize: 24,
    color: COLORS.white,
    textAlign: 'center',
    zIndex: 3,
  },
  activity: {
    position: 'absolute',
    bottom: 30,
    gap: 5,
    zIndex: 3,
  },
  metronomLine: {
    position: 'absolute',
    bottom: 90,
    transformOrigin: 'bottom',
    zIndex: 2,
  },
  dots: {
    flexDirection: 'row',
    gap: 10,
  },
});
