import {observer} from 'mobx-react-lite';
import React, {useEffect, useMemo} from 'react';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {COLORS} from '../../../utils/colors';
import LinearRange from '../../../components/LinearRangeSlider/LinearRangeSlider';

type Props = {
  countMinut?: number;
  addCount?: () => void;
  removeCount?: () => void;
  etap?: number;
};

const SecondMetronom: React.FC<Props> = ({
  addCount,
  countMinut,
  removeCount,
  etap,
}) => {
  const {setMetronomState, etapData, stopSound, playSound, metronomState} =
    useRootStore().metronomStore;
  const SetBpm = (value: number) => {
    setMetronomState('countMinut', Math.round(value));
    stopSound();
  };

  const BmpComplete = (value: number) => {
    playSound();
  };

  const renderEtapData = useMemo(() => {
    return etapData.map((item, index) => {
      return (
        <Images.Svg.ellipseDotLarge
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
    <RN.View style={styles.container}>
      <RN.Text style={styles.activeNumber}>{etap ? etap : 1}</RN.Text>
      <RN.View style={styles.dots}>{renderEtapData}</RN.View>
      <RN.View style={styles.sliderBox}>
        <RN.TouchableOpacity onPress={removeCount}>
          <Images.Svg.removeCount />
        </RN.TouchableOpacity>
        <RN.View style={styles.countBox}>
          <RN.Text style={styles.count}>{countMinut}</RN.Text>
          <RN.Text style={styles.countType}>BPM</RN.Text>
        </RN.View>
        <RN.View style={styles.slider}>
          <LinearRange
            onChangeValue={e => SetBpm(e)}
            onSlidingComplete={e => BmpComplete(e)}
            value={countMinut}
            minValue={1}
            maxValue={240}
          />
        </RN.View>
        <RN.TouchableOpacity onPress={addCount}>
          <Images.Svg.addCount />
        </RN.TouchableOpacity>
      </RN.View>
    </RN.View>
  );
};

export default observer(SecondMetronom);

const styles = RN.StyleSheet.create({
  container: {
    width: '100%',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginTop: 50,
  },
  activeNumber: {
    color: COLORS.white,
    fontSize: 40,
    textAlign: 'center',
  },
  sliderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    marginTop: 60,
  },
  slider: {
    width: '60%',
    alignItems: 'center',
  },
  countBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 40,
    gap: 2,
  },
  count: {
    fontSize: 20,
    color: COLORS.grey,
  },
  countType: {
    fontSize: 14,
    color: COLORS.grey,
    bottom: 2,
  },
});
