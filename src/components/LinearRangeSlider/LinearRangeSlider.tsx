import {Slider} from '@rneui/base';
import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {useMemo} from 'react';
import {View, StyleSheet, DimensionValue} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RN from '../RN';
import {COLORS} from '../../utils/colors';
import useRootStore from '../../hooks/useRootStore';

type Props = {
  onChangeValue?: (e: number) => void;
  onSlidingComplete?: (e: number) => void;
  value?: number;
  minValue?: number;
  maxValue?: number;
  firstColor?: string | number;
  secondColor?: string | number;
  thirdolor?: string | number;
  colors?: (string | number)[];
  step?: number;
  height?: DimensionValue;
};

const LinearRange: React.FC<Props> = ({
  onChangeValue,
  onSlidingComplete,
  value,
  maxValue,
  minValue,
  colors = [COLORS.darkBlue, COLORS.darkRed],
  step = 1,
  height = 5,
}) => {
  const gradientWidth = useMemo(() => {
    return ((value - minValue) / (maxValue - minValue)) * 100;
  }, [value]);
  const {themeState} = useRootStore().personalAreaStore;

  return (
    <RN.View
      style={[
        styles.container,
        {
          height: height,
          backgroundColor: themeState.inputBaack,
          borderColor: themeState.inputBorder,
        },
      ]}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={colors}
        style={[
          styles.linearGradient,
          {width: `${gradientWidth}%`},
        ]}></LinearGradient>
      <Slider
        minimumTrackTintColor={'transparent'}
        maximumTrackTintColor={'transparent'}
        thumbStyle={styles.brightThumb}
        minimumValue={minValue}
        maximumValue={maxValue}
        value={value}
        onValueChange={onChangeValue}
        onSlidingComplete={onSlidingComplete}
        step={step}
      />
    </RN.View>
  );
};

export default observer(LinearRange);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    borderWidth: 0.5,
    borderBottomWidth: 0,
  },
  linearGradient: {
    borderRadius: 20,
    height: '100%',
    position: 'absolute',
  },
  brightThumb: {
    backgroundColor: COLORS.inActiveYellow,
    borderColor: COLORS.yellow,
    borderRadius: 11,
    borderWidth: 2,
    height: 22,
    width: 22,
  },
});
