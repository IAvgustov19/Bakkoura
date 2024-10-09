import * as React from 'react';
import {Text, View, StyleSheet, DimensionValue, Pressable} from 'react-native';
import {Images} from '../../assets';
import {COLORS} from '../../utils/colors';
import RN from '../RN';
import useRootStore from '../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';
import {normalizeHeight} from '../../utils/dimensions';

type Props = {
  title?: string | any;
  value?: string | React.ReactNode;
  onPress?: () => void;
  backBlack?: boolean;
  rightItem?: React.ReactNode;
  rightVertical?: DimensionValue;
};

const ListItemCont: React.FC<Props> = ({
  title,
  value,
  onPress,
  backBlack,
  rightItem,
  rightVertical,
}) => {
  const {themeState} = useRootStore().personalAreaStore;

  return (
    <RN.Pressable
      style={[
        styles.listItem,
        {backgroundColor: backBlack ? themeState.mainBack : COLORS.transparent},
      ]}
      onPress={onPress}>
      <RN.Text style={[styles.listItemText, {color: themeState.darkGrayText}]}>
        {title}
      </RN.Text>
      {rightItem ? (
        <RN.TouchableOpacity style={styles.listItemRight} onPress={onPress}>
          <RN.Text style={styles.listItemRightText}>{value}</RN.Text>
          <RN.View style={{paddingVertical: rightVertical ? rightVertical : 0}}>
            {rightItem}
          </RN.View>
        </RN.TouchableOpacity>
      ) : (
        <RN.TouchableOpacity style={styles.listItemRight} onPress={onPress}>
          <RN.Text style={styles.listItemRightText}>{value}</RN.Text>
          <themeState.arrowRight />
        </RN.TouchableOpacity>
      )}
    </RN.Pressable>
  );
};

export default observer(ListItemCont);

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    borderRadius: 5,
    height:60
  },
  listItemText: {
    fontSize: 16,
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  listItemRightText: {
    color: COLORS.grey,
  },
});
