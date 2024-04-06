import React from 'react';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import {COLORS} from '../../../utils/colors';

type Props = {
  onPress?: () => void;
  day?: string;
  date?: string;
  info?: string;
};

const AlarmNotification: React.FC<Props> = ({onPress, date, day, info}) => {
  return (
    <RN.TouchableOpacity style={styles.container} onPress={onPress}>
      <Images.Svg.alarmNotificatiion />
      <RN.View style={styles.info}>
        <RN.Text style={styles.day}>{day}</RN.Text>
        <RN.Text style={styles.birthDay}>{info}</RN.Text>
        <RN.Text style={styles.date}>{date}</RN.Text>
      </RN.View>
    </RN.TouchableOpacity>
  );
};

export default AlarmNotification;

const styles = RN.StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  info: {
    position: 'absolute',
    zIndex: 1,
    paddingHorizontal: 25,
    alignItems: 'center',
    paddingTop: '35%',
    gap: 2,
  },
  day: {
    color: COLORS.white,
    fontSize: 11,
  },
  birthDay: {
    color: COLORS.yellow,
    textAlign: 'center',
    fontSize: 12,
  },
  date: {
    color: COLORS.white,
    fontSize: 11,
  },
});
