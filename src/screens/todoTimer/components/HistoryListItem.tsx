import {observer} from 'mobx-react-lite';
import React from 'react';
import RN from '../../../components/RN';
import {COLORS} from '../../../utils/colors';

type Props = {
  name?: string;
  time?: string;
  onPress?: () => void;
};

const HistoryListItem: React.FC<Props> = ({name, time, onPress}) => {
  return (
    <RN.TouchableOpacity style={styles.container} onPress={onPress}>
      <RN.Text style={styles.name}>{name}</RN.Text>
      <RN.Text style={styles.time}>Total {time}</RN.Text>
    </RN.TouchableOpacity>
  );
};

export default observer(HistoryListItem);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: COLORS.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    color: COLORS.white,
  },
  time: {
    fontSize: 16,
    color: COLORS.white,
  },
});
