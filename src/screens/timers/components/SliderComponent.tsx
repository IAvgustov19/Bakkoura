import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Slider} from '@rneui/themed';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import {observer} from 'mobx-react-lite';
import LinearRangeSlider from '../../../components/LinearRangeSlider/LinearRangeSlider';
import {COLORS} from '../../../utils/colors';
import useRootStore from '../../../hooks/useRootStore';

type Props = {
  minValue?: number;
  maxValue?: number;
  value?: number;
  onChangeValue?: (e: number) => void;
  label?: string;
};

const SliderComponent: React.FC<Props> = ({
  label,
  maxValue,
  minValue,
  onChangeValue,
  value,
}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <View style={styles.container}>
      <RN.View style={styles.hoursBox}>
        <RN.Text style={[styles.hour, {color: themeState.title}]}>
          {value ? value : '0'}
        </RN.Text>
        <TextView text={label} style={styles.label} />
      </RN.View>
      <LinearRangeSlider
        minValue={minValue}
        maxValue={maxValue}
        value={value}
        onChangeValue={onChangeValue}
        firstColor={COLORS.black}
        secondColor={COLORS.green}
        colors={themeState.timer}
        height={8}
      />
    </View>
  );
};

export default observer(SliderComponent);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  slider: {
    width: '100%',
    color: '#000',
  },
  hoursBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 5,
  },
  hour: {
    color: '#fff',
    fontSize: 32,
  },
  label: {
    paddingBottom: 4,
    position: 'absolute',
    left: '58%',
  },
});
