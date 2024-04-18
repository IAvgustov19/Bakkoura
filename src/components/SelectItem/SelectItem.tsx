import React from 'react';
import {COLORS} from '../../utils/colors';
import RadioBtn from '../RadioBtn/RadioBtn';
import RN from '../RN';

type Props = {
  isActive?: boolean;
  title?: string;
  onPress?: () => void;
};

const SelectItem: React.FC<Props> = ({isActive, title, onPress}) => {
  return (
    <RN.Pressable onPress={onPress} style={styles.container}>
      <RN.Text
        style={[styles.title, {color: isActive ? COLORS.white : COLORS.grey}]}>
        {title}
      </RN.Text>
      <RadioBtn active={isActive} onPress={onPress} />
    </RN.Pressable>
  );
};

export default SelectItem;

const styles = RN.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  title: {
    fontSize: 16,
  },
});
