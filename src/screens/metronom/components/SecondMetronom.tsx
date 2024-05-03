import {observer} from 'mobx-react-lite';
import React, {useEffect, useMemo} from 'react';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import useRootStore from '../../../hooks/useRootStore';
import {COLORS} from '../../../utils/colors';
import SliderComp from './SliderComp';

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
  const {setMetronomState, etapData, metronomState} =
    useRootStore().metronomStore;

  return (
    <RN.View style={styles.container}>
      <RN.Text style={styles.activeNumber}>{etap ? etap : 1}</RN.Text>
      <RN.View style={styles.dots}>
        {etapData.map((item, index) => {
          return (
            <Images.Svg.ellipseDotLarge
              key={index}
              fill={item === etap ? COLORS.yellow : COLORS.black}
            />
          );
        })}
      </RN.View>
      <RN.View style={styles.sliderBox}>
        <RN.TouchableOpacity onPress={removeCount}>
          <Images.Svg.removeCount />
        </RN.TouchableOpacity>
        <RN.View style={styles.countBox}>
          <RN.Text style={styles.count}>{countMinut}</RN.Text>
          <RN.Text style={styles.countType}>BPM</RN.Text>
        </RN.View>
        <RN.View style={styles.slider}>
          <SliderComp
            value={countMinut}
            minValue={1}
            maxValue={220}
            onChangeValue={e => setMetronomState('countMinut', Math.round(e))}
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
