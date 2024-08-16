import * as React from 'react';
import {Text, View, StyleSheet, DimensionValue} from 'react-native';
import {COLORS} from '../../utils/colors';
import RN from '../RN';

type Props = {
  title?: string;
  onPress?: () => void;
  backColor?: string;
  titleColor?: string;
  width?: DimensionValue;
  icon?: React.ReactNode;
};

const SimpleBtn: React.FC<Props> = ({
  title,
  backColor,
  onPress,
  titleColor,
  width,
  icon,
}) => {
  return (
    <RN.TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: backColor ? backColor : COLORS.c,
          width: width ? width : '100%',
        },
      ]}
      onPress={onPress}>
      <Text
        style={[styles.title, {color: titleColor ? titleColor : COLORS.black}]}>
        {title}
      </Text>
      {icon ? <RN.View style={styles.iconBox}>{icon}</RN.View> : null}
    </RN.TouchableOpacity>
  );
};

export default SimpleBtn;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: COLORS.c,
    borderRadius: 50,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.black,
  },
  iconBox: {
    position: 'absolute',
    right: 15,
    top: 10,
    zIndex: 1,
  },
});
