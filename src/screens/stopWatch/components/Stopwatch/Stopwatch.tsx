import {observer} from 'mobx-react-lite';
import React from 'react';
import {Images} from '../../../../assets';
import {COLORS} from '../../../../utils/colors';
import {windowHeight, windowWidth} from '../../../../utils/styles';
import RN from '../../../../components/RN';
import useRootStore from '../../../../hooks/useRootStore';

type Props = {
  time?: number;
  display: string;
};

const StopwatchComp: React.FC<Props> = ({time, display}) => {
  const {is24h} = useRootStore().stopWatchStore;
  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.stopwatch}>
        <RN.Image style={styles.watchBg} source={Images.Img.stopwatchBg} />
        {is24h ? (
          <RN.Image style={styles.watch24} source={Images.Img.stopwatch24} />
        ) : (
          <RN.Image style={styles.watch30} source={Images.Img.stopwatch30} />
        )}
        <RN.View
          style={[
            styles.timeLine,
            {transform: `rotate(${time * 6}deg)`},
          ]}></RN.View>
        <RN.Text style={styles.timeText}>{display}</RN.Text>
      </RN.View>
    </RN.View>
  );
};

export default observer(StopwatchComp);

const styles = RN.StyleSheet.create({
  container: {},
  stopwatch: {
    alignItems: 'center',
    height: 450,
  },
  watchBg: {
    top: 20,
    position: 'absolute',
    width: windowWidth - 20,
    objectFit: 'contain',
  },
  watch24: {
    marginTop: 82,
    width: windowWidth - 15,
    objectFit: 'contain',
    zIndex: 1,
  },
  watch30: {
    marginTop: 42,
    width: windowWidth + 20,
    objectFit: 'contain',
    zIndex: 1,
  },
  timeLine: {
    position: 'absolute',
    bottom: '40%',
    width: 2,
    height: 100,
    backgroundColor: COLORS.yellow,
    transformOrigin: 'bottom',
    zIndex: 2,
  },
  timeText: {
    position: 'absolute',
    bottom: '20%',
    color: COLORS.blue,
    fontSize: 18,
    left: '38%',
  },
});
