import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../assets';
import {HITSLOP} from '../../utils/styles';
import RN from '../RN';
import TextView from '../Text/Text';

type Props = {
  onPress?: () => void;
  title?: string;
  icon?: React.ReactNode;
};

const ArrowLeftBack: React.FC<Props> = ({onPress, title, icon}) => {
  return (
    <RN.TouchableOpacity
      style={styles.container}
      onPress={onPress}
      hitSlop={HITSLOP}>
      {icon ? icon : <Images.Svg.arrowLeft />}
      <TextView text={title ? title : 'Back'} />
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
