import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../assets';
import {COLORS} from '../../utils/colors';
import RN from '../RN';

type Props = {
  title?: string;
  value?: string;
  onPress?: () => void;
  backBlack?: boolean;
};

const ListItemCont: React.FC<Props> = ({title, value, onPress, backBlack}) => {
  return (
    <RN.TouchableOpacity
      style={[
        styles.listItem,
        {backgroundColor: backBlack ? COLORS.black : COLORS.transparent},
      ]}
      onPress={onPress}>
      <RN.Text style={styles.listItemText}>{title}</RN.Text>
      <RN.TouchableOpacity style={styles.listItemRight} onPress={onPress}>
        <RN.Text style={styles.listItemRightText}>{value}</RN.Text>
        <Images.Svg.arrowRight />
      </RN.TouchableOpacity>
    </RN.TouchableOpacity>
  );
};

export default ListItemCont;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    borderRadius: 5,
  },
  listItemText: {
    color: '#7D7D7D',
    fontSize: 16,
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  listItemRightText: {
    color: '#7D7D7D',
  },
});
