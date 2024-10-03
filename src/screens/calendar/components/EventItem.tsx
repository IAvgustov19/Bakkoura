import {observer} from 'mobx-react-lite';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import {COLORS} from '../../../utils/colors';
import useRootStore from '../../../hooks/useRootStore';
import { t } from '../../../i18n';

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
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <LinearGradient
      style={styles.linearBox}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={already ? themeState.eventItem : themeState.eventActiveItem}>
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
          <RN.Text
            style={[
              styles.name,
              {color: already ? COLORS.white : themeState.title},
            ]}>
            {eventName}
          </RN.Text>
          {isShowDate ? (
            <RN.Text
              style={[
                styles.date,
                {color: already ? COLORS.white : themeState.title},
              ]}>
              {date}
            </RN.Text>
          ) : null}
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
              <RN.Text style={[styles.alreadyText, {color: themeState.green}]}>
                Already
              </RN.Text>
              <Images.Svg.bellGreen width={24} />
              <RN.Text style={styles.alreadyText}>{t("already")}</RN.Text>
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
    gap: 5,
  },
  alreadyText: {
    color: COLORS.green,
  },
});
