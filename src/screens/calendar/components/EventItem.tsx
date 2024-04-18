import {observer} from 'mobx-react-lite';
import React from 'react';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import {COLORS} from '../../../utils/colors';

type Props = {
  eventName?: string;
  date?: string;
  time?: string;
  onPress?: () => void;
  isShowDate?: boolean;
  leftLine?: boolean;
  borderRadius?: number;
};

const EventItem: React.FC<Props> = ({
  eventName,
  date,
  time,
  onPress,
  isShowDate,
  borderRadius,
  leftLine,
}) => {
  return (
    <RN.Pressable
      style={[
        styles.container,
        {
          borderLeftWidth: leftLine ? 1 : 0,
          borderLeftColor: COLORS.red,
          borderRadius: borderRadius,
        },
      ]}
      onPress={onPress}>
      <RN.View style={styles.timeBox}>
        <RN.Text style={styles.name}>{eventName}</RN.Text>
        {isShowDate ? <RN.Text style={styles.date}>{date}</RN.Text> : null}
        <RN.Text style={styles.time}>{time}</RN.Text>
      </RN.View>
      <RN.TouchableOpacity style={styles.arrowRight}>
        <Images.Svg.arrowRight />
      </RN.TouchableOpacity>
    </RN.Pressable>
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
    marginBottom: 10,
    backgroundColor: COLORS.black,
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
