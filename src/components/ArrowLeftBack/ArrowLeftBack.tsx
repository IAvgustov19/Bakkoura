import * as React from 'react';
import {Text, View, StyleSheet, DimensionValue} from 'react-native';
import {Images} from '../../assets';
import {COLORS} from '../../utils/colors';
import {HITSLOP} from '../../utils/styles';
import RN from '../RN';
import TextView from '../Text/Text';

import {t} from '../../i18n'

type Props = {
  onPress?: () => void;
  title?: string;
  icon?: React.ReactNode;
  titleColor?: string;
};

const ArrowLeftBack: React.FC<Props> = ({
  onPress,
  title,
  icon,
  titleColor = COLORS.grey,
}) => {
  return (
    <RN.TouchableOpacity
      style={styles.container}
      onPress={onPress}
      hitSlop={HITSLOP}>
      {icon ? icon : <Images.Svg.arrowLeft />}
      <TextView text={title ? title : `${t('back')}`} style={{color: titleColor}} />
    </RN.TouchableOpacity>
  );
};

export default ArrowLeftBack;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
});
