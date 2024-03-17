import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {BG, Images} from '../../../assets';
import RN from '../../../components/RN';
import SwitchContain from '../../../components/SwitchContain/SwitchContain';
import useRootStore from '../../../hooks/useRootStore';

type Props = {stop?: boolean; finished?: boolean};

const FirstTimerDuring: React.FC<Props> = ({stop, finished}) => {
  const {firstTimerValue, currentTime, firstTimerTime, timerStatus} =
    useRootStore().timerStore;

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.duringTimerContent}>
        <RN.Image style={styles.duringTimerBg} source={BG.duringTimerBg} />
        <RN.View style={styles.duringTimerBox}>
          {timerStatus.finished ? (
            <RN.Text style={styles.duringTimer}>{currentTime}</RN.Text>
          ) : timerStatus.back ? (
            <RN.Text style={styles.duringTimer}>
              {' '}
              {firstTimerValue.hours +
                ':' +
                firstTimerValue.minut +
                ':' +
                firstTimerValue.second}
            </RN.Text>
          ) : (
            <RN.Text style={styles.duringTimer}>
              {' '}
              {firstTimerTime.hours +
                ':' +
                firstTimerTime.minut +
                ':' +
                firstTimerTime.second}
            </RN.Text>
          )}
        </RN.View>
        <RN.View style={styles.currentTimeBox}>
          {finished ? (
            <Images.Svg.bellGreen />
          ) : (
            <>
              <Images.Svg.bellBlueLeft />
              <RN.Text style={styles.currentTime}>{currentTime}</RN.Text>
            </>
          )}
        </RN.View>
        {stop ? <RN.Text style={styles.pausa}>pausa</RN.Text> : null}
        {finished ? <RN.Text style={styles.pausa}>Time is over</RN.Text> : null}
      </RN.View>
    </RN.View>
  );
};

export default observer(FirstTimerDuring);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  duringTimerContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: '35%',
  },
  duringTimerBg: {
    width: '100%',
    objectFit: 'contain',
    position: 'absolute',
  },
  duringTimerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  duringTimer: {
    fontSize: 70,
    fontWeight: '300',
    color: '#fff',
    textAlign: 'center',
  },
  pausa: {
    color: '#4FE733',
    textAlign: 'center',
    marginTop: 10,
  },
  currentTimeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  currentTime: {
    color: '#979DA2',
  },
});
