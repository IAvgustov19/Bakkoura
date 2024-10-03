import {observer} from 'mobx-react-lite';
import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import RN from '../../../components/RN';
import SimpleSwitch from '../../../components/SimpleSwitch/SimpleSwitch';
import TextView from '../../../components/Text/Text';
import {COLORS} from '../../../utils/colors';
import {normalizeHeight} from '../../../utils/dimensions';
import useRootStore from '../../../hooks/useRootStore';

type Props = {
  time?: string;
  name?: string;
  isActive?: boolean;
  handleInactiveAlarm?: (e?: any) => void;
};

const AlarmListItem: React.FC<Props> = ({
  time,
  name,
  isActive,
  handleInactiveAlarm,
}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <LinearGradient
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      colors={isActive ? themeState.alarmActiveList : themeState.alarmList}
      style={styles.itemContainer}>
      <RN.View style={styles.timeBox}>
        <RN.Text
          style={[
            styles.time,
            {color: isActive ? COLORS.green : themeState.alarmText},
          ]}>
          {time}
        </RN.Text>
        <RN.Text
          style={[styles.name, {color: isActive ? COLORS.green : COLORS.grey}]}>
          {name}
        </RN.Text>
      </RN.View>
      <SimpleSwitch active={isActive} handlePress={handleInactiveAlarm} />
    </LinearGradient>
  );
};

export default observer(AlarmListItem);

const styles = RN.StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5,
    marginVertical: 3,
  },
  timeBox: {
    gap: 5,
  },
  time: {
    fontSize: normalizeHeight(126),
    color: COLORS.white,
    fontWeight: '200',
  },
  name: {
    textAlign: 'left',
    fontSize: normalizeHeight(46),
  },
});
