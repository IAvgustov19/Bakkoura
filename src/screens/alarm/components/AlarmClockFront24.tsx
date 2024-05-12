import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {COLORS} from '../../../utils/colors';

type Props = {};

const AlarmClockFront24: React.FC<Props> = ({}) => {
  const {homeCurrentTime} = useRootStore().homeClockStore;

  return (
    <RN.View style={[styles.alarmFront]}>
      <Images.Svg.alarmClockFront24 />
      <LinearGradient
        style={[
          styles.lineMinut,
          {transform: `rotate(${homeCurrentTime.second * 6}deg)`},
        ]}
        colors={['#E10000', '#E10000', '#007AFF']}
      />
      <RN.View
        style={[
          styles.lineHour,
          {
            transform: `rotate(${homeCurrentTime.hour}deg)`,
          },
        ]}></RN.View>
      <RN.View
        style={[
          styles.second60Line,
          {transform: `rotate(${homeCurrentTime.minut}deg)`},
        ]}></RN.View>
    </RN.View>
  );
};

export default observer(AlarmClockFront24);

const styles = StyleSheet.create({
  alarmFront: {
    position: 'absolute',
    bottom: 33,
    paddingRight: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineMinut: {
    width: 1,
    height: '35%',
    position: 'absolute',
    top: '18%',
    transformOrigin: 'bottom',
  },
  lineHour: {
    width: 2,
    height: '35%',
    position: 'absolute',
    top: '18%',
    transformOrigin: 'bottom',
    backgroundColor: COLORS.yellow,
  },
  second60Line: {
    position: 'absolute',
    backgroundColor: COLORS.blue,
    height: 25,
    width: 1.5,
    bottom: '67.5%',
    transformOrigin: 'bottom',
  },
});
