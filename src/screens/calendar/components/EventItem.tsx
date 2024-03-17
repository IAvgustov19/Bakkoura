import {observer} from 'mobx-react-lite';
import React from 'react';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import {COLORS} from '../../../utils/colors';

type Props = {
  eventName?: string;
  date?: string;
  time?: string;
};

const EventItem: React.FC<Props> = ({eventName, date, time}) => {
  return (
    <RN.TouchableOpacity style={styles.container}>
      <RN.View style={styles.timeBox}>
        <RN.Text style={styles.name}>{eventName}</RN.Text>
        <RN.Text style={styles.date}>{date}</RN.Text>
        <RN.Text style={styles.time}>{time}</RN.Text>
      </RN.View>
      <RN.TouchableOpacity style={styles.arrowRight}>
        <Images.Svg.arrowRight />
      </RN.TouchableOpacity>
    </RN.TouchableOpacity>
  );
};

export default observer(EventItem);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: COLORS.black,
    borderRadius: 5,
  },
  timeBox: {
    gap: 5,
  },
  name: {
    fontSize: 16,
    color: COLORS.white,
  },
  date: {
    fontSize: 12,
    color: COLORS.white,
  },
  time: {
    fontSize: 14,
    color: COLORS.blue,
  },
  arrowRight: {},
});
