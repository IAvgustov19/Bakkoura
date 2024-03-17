import {observer} from 'mobx-react-lite';
import React from 'react';
import {Images} from '../../assets';
import {COLORS} from '../../utils/colors';
import {windowWidth} from '../../utils/styles';
import RN from '../RN';

type Props = {
  time?: number;
  display: string;
};

const StopwatchComp: React.FC<Props> = ({time, display}) => {
  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.stopwatch}>
        <RN.Image style={styles.watch} source={Images.Img.stopwatch} />
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
  container: {
    marginTop: 50,
    // backgroundColor: 'red',
  },
  stopwatch: {
    alignItems: 'center',
  },
  watch: {
    marginTop: 20,
    width: windowWidth - 40,
    objectFit: 'contain',
  },
  timeLine: {
    position: 'absolute',
    bottom: '45%',
    width: 2,
    height: 100,
    backgroundColor: COLORS.yellow,
    transformOrigin: 'bottom',
  },
  timeText: {
    position: 'absolute',
    bottom: '28%',
    color: COLORS.blue,
    fontSize: 20,
    width: '30%',
  },
});
