import React from 'react';
import RN from '../../../components/RN';
import {Images} from '../../../assets/index';
import {COLORS} from '../../../utils/colors';
import {observer} from 'mobx-react-lite';

type Props = {
  name?: string;
  day?: string;
  time?: string;
  description?: string;
  workTime?: string;
  play?: boolean;
  onPlay?: () => void;
  onEnter?: () => void;
};

const ToDoTimerItem: React.FC<Props> = ({
  name,
  day,
  time,
  description,
  workTime,
  play = false,
  onPlay,
  onEnter,
}) => {
  return (
    <RN.Pressable onPress={onEnter} style={styles.container}>
      {/* <RN.View style={styles.header}>
        <RN.Text style={styles.darkGreyText}>{day}</RN.Text>
        <RN.Text style={styles.darkGreyText}>{time}</RN.Text>
      </RN.View> */}
      <RN.View style={styles.itemContent}>
        <RN.View style={styles.leftBox}>
          <RN.View style={styles.timerInfo}>
            <RN.Text style={styles.whiteText}>{name}</RN.Text>
            <RN.Text style={styles.darkGreyText}>{description}</RN.Text>
          </RN.View>
        </RN.View>
        <RN.View style={styles.rightBox}>
          <RN.Text
            style={[
              styles.whiteText,
              {color: play ? COLORS.green : COLORS.white},
            ]}>
            {workTime}
          </RN.Text>
          {play ? (
            <RN.TouchableOpacity onPress={onPlay}>
              <Images.Svg.play />
            </RN.TouchableOpacity>
          ) : (
            <RN.TouchableOpacity onPress={onPlay}>
              <Images.Svg.pausa />
            </RN.TouchableOpacity>
          )}
        </RN.View>
      </RN.View>
    </RN.Pressable>
  );
};

export default observer(ToDoTimerItem);

const styles = RN.StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    borderRadius: 5,
    marginBottom: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#0E1114',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  leftBox: {
    flexDirection: 'row',
    gap: 10,
  },
  timerInfo: {
    gap: 5,
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  darkGreyText: {
    color: COLORS.darkGreyText,
    fontSize: 14,
  },
  whiteText: {
    color: COLORS.white,
    fontSize: 16,
  },
});
