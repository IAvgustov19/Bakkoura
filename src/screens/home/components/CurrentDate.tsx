import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import {COLORS} from '../../../utils/colors';

type Props = {
  day?: string;
  month?: string;
};

const CurrentDate: React.FC<Props> = ({day, month}) => {
  return (
    <RN.View style={styles.todayBox}>
      <RN.Text style={styles.day}>{day}</RN.Text>
      <RN.Text style={styles.monthYear}>{month}</RN.Text>
      <RN.View style={styles.dateLine}>
        <Images.Svg.dateBottomLine />
      </RN.View>
    </RN.View>
  );
};

export default CurrentDate;

const styles = StyleSheet.create({
  todayBox: {
    alignItems: 'center',
  },
  day: {
    fontSize: 26,
    color: COLORS.yellow,
    textAlign: 'center',
  },
  monthYear: {
    fontSize: 12,
    color: COLORS.yellow,
  },
  dateLine: {
    marginTop: 5,
  },
});
