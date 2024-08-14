import {observer} from 'mobx-react-lite';
import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import RN from '../../../components/RN';
import SimpleSwitch from '../../../components/SimpleSwitch/SimpleSwitch';
import TextView from '../../../components/Text/Text';
import {COLORS} from '../../../utils/colors';

type Props = {
  time?: string;
  description?: string;
  isActive?: boolean;
  handleInactiveAlarm?: (e?: any) => void;
};

const AlarmListItem: React.FC<Props> = ({
  time,
  description,
  isActive,
  handleInactiveAlarm,
}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0.5}}
      end={{x: 1, y: 0.5}}
      colors={
        isActive
          ? ['#0D0D0D', '#051222', '#00448E']
          : [COLORS.black, COLORS.black]
      }
      style={styles.itemContainer}>
      <RN.View style={styles.timeBox}>
        <RN.Text
          style={[
            styles.time,
            {color: isActive ? COLORS.green : COLORS.white},
          ]}>
          {time}
        </RN.Text>
        <TextView style={styles.desc} text={description} />
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
    backgroundColor: COLORS.black,
    borderRadius: 5,
    marginVertical: 3,
  },
  timeBox: {
    gap: 5,
  },
  time: {
    fontSize: 36,
    color: COLORS.white,
    fontWeight: '200',
  },
  desc: {
    textAlign: 'left',
  },
});
