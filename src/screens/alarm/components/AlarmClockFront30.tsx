import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {COLORS} from '../../../utils/colors';
import {windowWidth} from '../../../utils/styles';

type Props = {};

const AlarmClockFront30: React.FC<Props> = ({}) => {
  const {homeCurrentTime} = useRootStore().homeClockStore;
  const {themeState} = useRootStore().personalAreaStore;

  return (
    <RN.View style={[styles.alarmFront, {top: windowWidth / 4.2}]}>
      <RN.Image style={styles.alarm} source={themeState.alarmFront30} />
      <LinearGradient
        style={[
          styles.lineMinut,
          {transform: `rotate(${homeCurrentTime.second48 * 6}deg)`},
        ]}
        colors={['#007AFF', '#007AFF', '#E10000']}
      />
      <RN.View
        style={[
          styles.lineHour,
          {
            transform: `rotate(${homeCurrentTime.hour30 * 12}deg)`,
          },
        ]}></RN.View>
      <RN.View
        style={[
          styles.extraTimeLine,
          {transform: `rotate(${homeCurrentTime.extraTime}deg)`},
        ]}></RN.View>
      <RN.View
        style={[
          styles.second48Line,
          {transform: `rotate(${homeCurrentTime.minut30 * 7.5}deg)`},
        ]}></RN.View>
    </RN.View>
  );
};

export default observer(AlarmClockFront30);

const styles = StyleSheet.create({
  alarmFront: {
    position: 'absolute',
    bottom: 38,
    paddingRight: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alarm: {
    width: windowWidth - 90,
    objectFit: 'contain',
  },
  lineMinut: {
    width: 1,
    height: '35%',
    position: 'absolute',
    top: '16%',
    transformOrigin: 'bottom',
  },
  lineHour: {
    width: 2,
    height: '35%',
    position: 'absolute',
    top: '16%',
    transformOrigin: 'bottom',
    backgroundColor: COLORS.yellow,
  },
  extraTimeLine: {
    position: 'absolute',
    backgroundColor: COLORS.blue,
    height: 18,
    width: 1.5,
    bottom: '67.5%',
    transformOrigin: 'bottom',
  },
  second48Line: {
    position: 'absolute',
    backgroundColor: COLORS.yellow,
    height: 25,
    width: 1.5,
    bottom: '32%',
    transformOrigin: 'bottom',
  },
  minut60: {
    position: 'absolute',
    color: COLORS.red,
    fontSize: 9,
    bottom: '24%',
  },
});
