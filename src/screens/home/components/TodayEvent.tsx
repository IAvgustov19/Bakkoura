import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import useRootStore from '../../../hooks/useRootStore';
import {COLORS} from '../../../utils/colors';

type Props = {
  day?: string;
  title?: string;
  date?: string;
};

const TodayEvent: React.FC<Props> = ({day, date, title}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <RN.View style={styles.todayBox}>
      <RN.Text style={[styles.day, {color: themeState.title}]}>{day}</RN.Text>
      <RN.Text style={[styles.title, {color: themeState.yellow}]}>
        {title}
      </RN.Text>
      <RN.Text style={[styles.date, {color: themeState.title}]}>{date}</RN.Text>
      <RN.View style={styles.dateLine}>
        <Images.Svg.dateBottomLine />
      </RN.View>
    </RN.View>
  );
};

export default TodayEvent;

const styles = StyleSheet.create({
  todayBox: {
    alignItems: 'center',
    gap: 3,
    maxWidth: 90,
  },
  day: {
    fontSize: 12,
    color: COLORS.white,
  },
  title: {
    fontSize: 12,
    textAlign: 'center',
  },
  date: {
    fontSize: 13,
    color: COLORS.white,
  },
  dateLine: {
    marginTop: 5,
  },
});
