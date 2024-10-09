import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../../assets';
import GradientText from '../../../components/GradientText';
import RN from '../../../components/RN';
import {COLORS} from '../../../utils/colors';
import {normalizeHeight} from '../../../utils/dimensions';

type Props = {
  day?: string;
  month?: string;
};

const CurrentDate: React.FC<Props> = ({day, month}) => {
  return (
    <RN.View style={styles.todayBox}>
      <GradientText style={styles.day} colors={['#ECC271', '#7F642E']}>
        {day}
      </GradientText>
      <RN.Text style={styles.monthYear} fontFamily="RedHatDisplay-SemiBold">
        {month}
      </RN.Text>
    </RN.View>
  );
};

export default CurrentDate;

const styles = StyleSheet.create({
  todayBox: {
    alignItems: 'center',
  },
  day: {
    fontSize: normalizeHeight(130),
    color: COLORS.yellow,
    textAlign: 'center',
  },
  monthYear: {
    fontSize: normalizeHeight(43),
    color: COLORS.inActiveYellow,
    marginTop: -5,
    fontFamily: 'RedHatDisplay-SemiBold',
  },
});
