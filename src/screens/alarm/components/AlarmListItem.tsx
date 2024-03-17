import {observer} from 'mobx-react-lite';
import * as React from 'react';
import RN from '../../../components/RN';
import SimpleSwitch from '../../../components/SimpleSwitch/SimpleSwitch';
import TextView from '../../../components/Text/Text';
import {COLORS} from '../../../utils/colors';

type Props = {
  time?: string;
  description?: string;
  isActive?: boolean;
  handleActive?: () => void;
};

const AlarmListItem: React.FC<Props> = ({
  time,
  description,
  isActive,
  handleActive,
}) => {
  return (
    <RN.View style={styles.container}>
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
      <SimpleSwitch active={isActive} handlePress={handleActive} />
    </RN.View>
  );
};

export default observer(AlarmListItem);

const styles = RN.StyleSheet.create({
  container: {
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
