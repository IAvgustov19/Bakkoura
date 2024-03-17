import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../assets';
import RN from '../RN';

type Props = {
  active?: boolean;
  onPress?: () => void;
};

const RadioBtn: React.FC<Props> = ({active = false, onPress}) => {
  return (
    <RN.TouchableOpacity style={styles.container} onPress={onPress}>
      {active ? (
        <Images.Svg.ellipseSmall
          style={styles.activeRadio}
          width={15}
          height={15}
        />
      ) : null}
    </RN.TouchableOpacity>
  );
};

export default RadioBtn;

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeRadio: {},
});
