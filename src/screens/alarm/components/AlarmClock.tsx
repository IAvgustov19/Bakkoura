import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import useRootStore from '../../../hooks/useRootStore';
import {COLORS} from '../../../utils/colors';
import {windowHeight} from '../../../utils/styles';
import AlarmClockFront24 from './AlarmClockFront24';
import AlarmClockFront30 from './AlarmClockFront30';

type Props = {
  is24h?: boolean;
};

const AlarmClock: React.FC<Props> = ({is24h}) => {
  const {homeCurrentTime} = useRootStore().homeClockStore;

  const translateX = useSharedValue(0);

  const EtapHandle = useMemo(() => {
    switch (homeCurrentTime.second % 2 == 0) {
      case false:
        translateX.value = -15;
        break;
      case true:
        translateX.value = 15;
        break;
    }
  }, [homeCurrentTime.second]);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{rotate: withTiming(`${translateX.value}deg`)}],
  }));

  const renderClock = useMemo(() => {
    if (is24h) {
      return <AlarmClockFront24 />;
    } else {
      return <AlarmClockFront30 />;
    }
  }, [is24h]);

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.clockBox}>
        <Animated.View style={[styles.clockBang, animatedStyles]}>
          <Images.Svg.alarmClockBang />
        </Animated.View>
        <Images.Svg.alarmClock />
        {renderClock}
      </RN.View>
      <RN.View style={styles.btnBox}>
        <StartBtn text="Later" />
        <RN.Text style={styles.time}>
          02:30
          <RN.Text style={styles.pmAm}>pm</RN.Text>
        </RN.Text>
        <StartBtn text="Stop" primary />
      </RN.View>
    </RN.View>
  );
};

export default observer(AlarmClock);

const styles = StyleSheet.create({
  container: {
    height: windowHeight - 110,
    justifyContent: 'space-between',
  },
  btnBox: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 130,
  },
  clockBang: {
    position: 'absolute',
    top: 50,
    transformOrigin: 'bottom',
  },
  time: {
    color: COLORS.blue,
    fontSize: 36,
  },
  pmAm: {
    fontSize: 16,
  },
  clockBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
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
