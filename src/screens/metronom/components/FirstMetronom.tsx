import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useMemo} from 'react';
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

  const EtapHandle = useMemo(() => {
    let total = 0;

    switch (metronomState.etapLine % 2 == 0) {
      case false:
        total = -30;
        break;
      case true:
        total = 30;
        break;
    }

    return total;
  }, [metronomState.etapLine]);

  return (
    <RN.View style={styles.metronom}>
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
      <RN.View style={styles.metronomImage}>
        <Images.Svg.metronom />
      </RN.View>
      <RN.View
        style={[styles.metronomLine, {transform: `rotate(${EtapHandle}deg)`}]}>
        <Images.Svg.metronomLine />
      </RN.View>
      <RN.View style={styles.activity}>
        <RN.View style={styles.dots}>
          {etapData.map((item, index) => {
            return (
              <Images.Svg.ellipseDot
                key={index}
                fill={item === etap ? COLORS.yellow : COLORS.black}
              />
            );
          })}
        </RN.View>
        <TextView title={`${etap ? etap : 1}`} />
      </RN.View>
    </RN.View>
  );
};

export default observer(FirstMetronom);

const styles = RN.StyleSheet.create({
  metronom: {
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  metronomImage: {
    // zIndex: 1,
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
  },
  activity: {
    position: 'absolute',
    bottom: 30,
    gap: 5,
  },
  metronomLine: {
    position: 'absolute',
    bottom: 90,
    transformOrigin: 'bottom',
  },
  dots: {
    flexDirection: 'row',
    gap: 10,
  },
});
