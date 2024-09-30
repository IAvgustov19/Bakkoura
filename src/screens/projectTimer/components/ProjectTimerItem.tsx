import React, {useCallback, useMemo} from 'react';
import RN from '../../../components/RN';
import {Images} from '../../../assets/index';
import {COLORS} from '../../../utils/colors';
import {observer} from 'mobx-react-lite';
import useRootStore from '../../../hooks/useRootStore';

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

const ProjectTimerItem: React.FC<Props> = ({
  name,
  day,
  time,
  description,
  workTime,
  play = false,
  onPlay,
  onEnter,
}) => {
  const {projectTimerList} = useRootStore().projectTimer;
  const {themeState} = useRootStore().personalAreaStore;
  const renderWorkTime = useCallback(() => {
    return (
      <RN.Text
        style={[
          styles.whiteText,
          {color: play ? COLORS.blue : themeState.title},
        ]}>
        {workTime}
      </RN.Text>
    );
  }, [projectTimerList]);

  return (
    <RN.Pressable
      onPress={onEnter}
      style={[styles.container, {backgroundColor: themeState.mainBack}]}>
      <RN.View
        style={[styles.header, {backgroundColor: themeState.inputBaack}]}>
        <RN.Text style={styles.darkGreyText}>{day}</RN.Text>
        <RN.Text style={styles.darkGreyText}>{time}</RN.Text>
      </RN.View>
      <RN.View style={styles.itemContent}>
        <RN.View style={styles.leftBox}>
          <themeState.dollar />
          <RN.View style={styles.timerInfo}>
            <RN.Text style={[styles.whiteText, {color: themeState.title}]}>
              {name}
            </RN.Text>
            <RN.Text style={[styles.description, {color: themeState.gray}]}>
              {description}
            </RN.Text>
          </RN.View>
        </RN.View>
        <RN.View style={styles.rightBox}>
          {renderWorkTime()}
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

export default observer(ProjectTimerItem);

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
    maxWidth: '55%',
  },
  timerInfo: {
    gap: 5,
    width: '90%',
  },
  description: {
    color: COLORS.darkGreyText,
    fontSize: 14,
    width: '100%',
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
