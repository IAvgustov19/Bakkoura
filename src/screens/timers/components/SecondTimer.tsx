import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import SliderComponent from './SliderComponent';
import useRootStore from '../../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';

type Props = {};

const SecondTimer: React.FC<Props> = ({}) => {
  const {setSecondTimer, secondTimerValue, timerStatus} =
    useRootStore().timerStore;

  return (
    <View style={styles.container}>
      <SliderComponent
        value={secondTimerValue.hours}
        minValue={0}
        maxValue={timerStatus.h24 ? 23 : 29}
        onChangeValue={e => setSecondTimer('hours', e)}
        label="H"
      />
      <SliderComponent
        value={secondTimerValue.minut}
        minValue={0}
        maxValue={60}
        onChangeValue={e => setSecondTimer('minut', e)}
        label="Min."
      />
      <SliderComponent
        value={secondTimerValue.second}
        minValue={0}
        maxValue={timerStatus.h24 ? 59 : 47}
        onChangeValue={e => setSecondTimer('second', e)}
        label="Sec."
      />
    </View>
  );
};

export default observer(SecondTimer);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 20,
  },
});
