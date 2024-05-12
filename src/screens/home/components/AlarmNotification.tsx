import React from 'react';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import {COLORS} from '../../../utils/colors';

type Props = {
  onPress?: () => void;
  time24?: string;
  extraTime?: string;
  time30?: string;
};

const AlarmNotification: React.FC<Props> = ({
  onPress,
  time24,
  extraTime,
  time30,
}) => {
  return (
    <RN.TouchableOpacity style={styles.container} onPress={onPress}>
      <Images.Svg.alarmNotificatiion />
      <RN.View style={styles.info}>
        <RN.Text style={styles.time}>{time24}</RN.Text>
        <RN.Text style={styles.extraTime}>{extraTime}</RN.Text>
        <RN.Text style={styles.time}>{time30}</RN.Text>
      </RN.View>
    </RN.TouchableOpacity>
  );
};

export default AlarmNotification;

const styles = RN.StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    position: 'absolute',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    height: '100%',
  },
  extraTime: {
    color: COLORS.yellow,
    textAlign: 'center',
    fontSize: 12,
  },
  time: {
    color: COLORS.white,
    fontSize: 14,
    textAlign: 'center',
  },
});
