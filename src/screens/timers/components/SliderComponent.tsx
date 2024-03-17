import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Slider} from '@rneui/themed';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import {observer} from 'mobx-react-lite';

type Props = {
  minValue?: number;
  maxValue?: number;
  step?: number;
  value?: number;
  onChangeValue?: (e: number) => void;
  label?: string;
};

const SliderComponent: React.FC<Props> = ({
  label,
  maxValue,
  minValue,
  onChangeValue,
  step,
  value,
}) => {
  return (
    <View style={styles.container}>
      <RN.View style={styles.hoursBox}>
        <RN.Text style={styles.hour}>{value}</RN.Text>
        <TextView text={label} style={styles.label} />
      </RN.View>
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
