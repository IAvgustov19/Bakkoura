import {observer} from 'mobx-react-lite';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
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
  already?: boolean;
  allDay?: boolean;
};

const EventItem: React.FC<Props> = ({
  eventName,
  date,
  time,
  onPress,
  isShowDate,
  borderRadius,
  leftLine,
  already,
  allDay,
}) => {
  return (
    <LinearGradient
      style={styles.linearBox}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={
        already
          ? [
              COLORS.green,
              COLORS.listGreen,
              COLORS.listCenterGreen,
              COLORS.listDarkGreen,
              COLORS.black2,
            ]
          : [COLORS.black, COLORS.black]
      }>
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
          <RN.Text
            style={[
              styles.time,
              {color: already ? COLORS.white : COLORS.blue},
            ]}>
            {time}
          </RN.Text>
        </RN.View>
        <RN.TouchableOpacity style={styles.arrowRight}>
          {already ? (
            <RN.View style={styles.already}>
              <Images.Svg.bellGreen width={24} />
              <RN.Text style={styles.alreadyText}>Already</RN.Text>
            </RN.View>
          ) : null}
          <Images.Svg.arrowRight />
        </RN.TouchableOpacity>
      </RN.Pressable>
    </LinearGradient>
  );
};

export default observer(EventItem);

const styles = RN.StyleSheet.create({
  linearBox: {
    marginBottom: 10,
    borderRadius: 3,
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: COLORS.black,
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
  },
  arrowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  already: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyText: {
    color: COLORS.green,
  },
});
