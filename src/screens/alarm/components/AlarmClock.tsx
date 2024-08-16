import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import LottieContent from '../../../components/LottieContent/LottieContent';
import RN from '../../../components/RN';
import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import {formattedTimeHourMinut} from '../../../helper/helper';
import useRootStore from '../../../hooks/useRootStore';
import {Lotties} from '../../../lotties/lottie';
import {COLORS} from '../../../utils/colors';
import {windowHeight, windowWidth} from '../../../utils/styles';
import AlarmClockFront24 from './AlarmClockFront24';
import AlarmClockFront30 from './AlarmClockFront30';

type Props = {
  is24h?: boolean;
};

const AlarmClock: React.FC<Props> = ({is24h}) => {
  const {homeCurrentTime} = useRootStore().homeClockStore;
  const {isRing, handleLaterAction, handleStopAction, activeAlarm} =
    useRootStore().alarmStore;

  const renderClock = useMemo(() => {
    if (is24h) {
      return <AlarmClockFront24 />;
    } else {
      return <AlarmClockFront30 />;
    }
  }, [is24h]);

  const renderLottieClock = React.useCallback(() => {
    return (
      <LottieContent
        width={windowWidth + 20}
        source={Lotties.clock}
        speed={isRing ? 1 : 0}
        loop={isRing ? true : false}
        autoPlay={isRing ? true : false}
      />
    );
  }, [isRing]);

  const renderTime = React.useCallback(() => {
    return (
      <RN.Text style={styles.time}>
        {is24h
          ? formattedTimeHourMinut(
              Number(activeAlarm?.laterHours),
              Number(activeAlarm?.laterMinutes),
            )
          : homeCurrentTime.time30.slice(0, 5)}
        {/* <RN.Text style={styles.pmAm}>pm</RN.Text> */}
      </RN.Text>
    );
  }, [is24h, activeAlarm]);

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.clockBox}>
        {renderLottieClock()}
        {renderClock}
      </RN.View>
      <RN.View style={styles.btnBox}>
        <StartBtn
          text="Later"
          onPress={() => handleLaterAction(activeAlarm as never)}
        />
        {renderTime()}
        <StartBtn
          text="Stop"
          primary
          onPress={() => handleStopAction(activeAlarm as never)}
        />
      </RN.View>
    </RN.View>
  );
};

export default observer(AlarmClock);

const styles = StyleSheet.create({
  container: {
    height: windowHeight - 130,
    justifyContent: 'space-between',
  },
  btnBox: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 130,
  },
  time: {
    color: COLORS.blue,
    fontSize: 36,
  },
  clockBox: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
});
