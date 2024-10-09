import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../../assets';
import LottieContent from '../../../components/LottieContent/LottieContent';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {Lotties} from '../../../lotties/lottie';
import {COLORS} from '../../../utils/colors';
import {windowHeight, windowWidth} from '../../../utils/styles';

type Props = {};

const AlarmClockFront24: React.FC<Props> = ({}) => {
  const {homeCurrentTime} = useRootStore().homeClockStore;
  const {themeState} = useRootStore().personalAreaStore;

  return (
    <RN.View
      style={[
        styles.alarmFront,
        {top: RN.Platform.OS == 'ios' ? windowHeight / 7.5 : windowHeight / 8},
      ]}>
      <RN.Image style={styles.alarm} source={themeState.alarmFront24} />
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
    bottom: RN.Platform.OS === 'ios' ? 58 : 43,
    paddingRight: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alarm: {
    width: windowWidth - 125,
    objectFit: 'contain',
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
