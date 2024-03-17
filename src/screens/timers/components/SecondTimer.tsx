import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import SliderComponent from './SliderComponent';
import useRootStore from '../../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';

type Props = {};

const SecondTimer: React.FC<Props> = ({}) => {
  const {setSecondTimer, secondTimerValue} = useRootStore().timerStore;

  return (
    <View style={styles.container}>
      <SliderComponent
        value={secondTimerValue.hours === 0 ? '0' : secondTimerValue.hours}
        minValue={0}
        maxValue={24}
        onChangeValue={e => setSecondTimer('hours', e)}
        step={1}
        label="H"
      />
      <SliderComponent
        value={secondTimerValue.minut === 0 ? '0' : secondTimerValue.minut}
        minValue={0}
        maxValue={60}
        onChangeValue={e => setSecondTimer('minut', e)}
        step={1}
        label="Min."
      />
      <SliderComponent
        value={secondTimerValue.second === 0 ? '0' : secondTimerValue.second}
        minValue={0}
        maxValue={60}
        onChangeValue={e => setSecondTimer('second', e)}
        step={1}
        label="Sec."
      />
    </View>
  );
};

export default observer(SecondTimer);

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
  },
  switchHours: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    width: '100%',
  },
});
