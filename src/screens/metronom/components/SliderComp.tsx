import {Slider} from '@rneui/base';
import {observer} from 'mobx-react-lite';
import React from 'react';
import RN from '../../../components/RN';

type Props = {
  minValue?: number;
  maxValue?: number;
  step?: number;
  value?: number;
  onChangeValue?: (e: number) => void;
  label?: string;
};

const SliderComp: React.FC<Props> = ({
  label,
  maxValue,
  minValue,
  onChangeValue,
  step,
  value,
}) => {
  return (
    <RN.View style={styles.container}>
      <Slider
        thumbStyle={{
          height: 24,
          width: 24,
          backgroundColor: '#ECC271',
          borderWidth: 2,
          borderColor: '#7F642E',
        }}
        minimumTrackTintColor={'#1d4915'}
        maximumTrackTintColor="#0D0D0D"
        trackStyle={{height: 10, borderRadius: 20}}
        style={styles.slider}
        value={value}
        step={step}
        minimumValue={minValue}
        maximumValue={maxValue}
        onValueChange={onChangeValue}
      />
    </RN.View>
  );
};

export default observer(SliderComp);

const styles = RN.StyleSheet.create({
  container: {
    width: '100%',
  },
  slider: {
    width: '100%',
    color: '#000',
  },
});
