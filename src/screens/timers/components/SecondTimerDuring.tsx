import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {BG, Images} from '../../../assets';
import RN from '../../../components/RN';
import SwitchContain from '../../../components/SwitchContain/SwitchContain';
import useRootStore from '../../../hooks/useRootStore';

type Props = {
  stop?: boolean;
  finished?: boolean;
};

const SecondTimerDuring: React.FC<Props> = ({stop, finished}) => {
  const {
    secondTimerValue,
    percentage,
    currentTime,
    secondTimerTime,
    timerStatus,
    increasePercentage,
  } = useRootStore().timerStore;
  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.duringTimerContent}>
        {stop ? <RN.Text style={styles.pausa}>pausa</RN.Text> : null}
        <RN.View style={styles.timerPercentBox}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              width: `${timerStatus.back ? percentage : increasePercentage}%`,
              height: '100%',
            }}
            colors={['#0a0909', '#0f3c07', '#21C004']}></LinearGradient>
        </RN.View>
        <RN.View style={styles.timerTimeBox}>
          {timerStatus.finished ? (
            <RN.Text style={styles.finished}>{currentTime}</RN.Text>
          ) : timerStatus.back ? (
            <RN.Text style={styles.timerTime}>
              {secondTimerValue.hours +
                ':' +
                secondTimerValue.minut +
                ':' +
                secondTimerValue.second}
            </RN.Text>
          ) : (
            <RN.Text style={styles.timerTime}>
              {secondTimerTime.hours +
                ':' +
                secondTimerTime.minut +
                ':' +
                secondTimerTime.second}
            </RN.Text>
          )}
          {finished ? (
            <RN.View style={styles.finishedStatus}>
              <RN.Text style={styles.timeOver}>Time is over</RN.Text>
              <Images.Svg.bellGreen width={35} />
            </RN.View>
          ) : (
            <RN.View style={styles.finishedTime}>
              <Images.Svg.bellBlueLeft />
              <RN.Text style={styles.currentTime}>{currentTime}</RN.Text>
            </RN.View>
          )}
        </RN.View>
      </RN.View>
    </RN.View>
  );
};

export default observer(SecondTimerDuring);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  duringTimerContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  pausa: {
    color: '#007AFF',
    textAlign: 'center',
    top: 20,
    position: 'absolute',
    left: '45%',
  },
  timerPercentBox: {
    width: '100%',
    height: 90,
    backgroundColor: '#000',
    borderRadius: 80,
    overflow: 'hidden',
    marginTop: 20,
  },
  timerTimeBox: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  timerTime: {
    fontSize: 60,
    color: '#fff',
    fontWeight: '200',
  },
  currentTime: {
    fontSize: 14,
    color: '#979DA2',
  },
  finishedStatus: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    gap: 5,
    right: 0,
  },
  finishedTime: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'flex-end',
    paddingBottom: 10,
    position: 'absolute',
    right: 0,
  },
  finished: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '200',
  },
  timeOver: {
    color: '#4FE733',
  },
});
