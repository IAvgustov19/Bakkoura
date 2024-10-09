import React from 'react';
import {COLORS} from '../../utils/colors';
import RadioBtn from '../RadioBtn/RadioBtn';
import RN from '../RN';
import { ColorValue } from 'react-native';

type Props = {
  isActive?: boolean;
  title?: string;
  onPress?: () => void;
  color?: ColorValue
};

const SelectItem: React.FC<Props> = ({isActive, title, color, onPress}) => {
  return (
    <RN.Pressable onPress={onPress} style={styles.container}>
      <RN.Text 
        style={[styles.title, {color: isActive ? color : COLORS.grey}]}>
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
    width:230
  },
});
