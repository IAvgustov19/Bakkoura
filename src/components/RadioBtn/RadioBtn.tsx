import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Images } from '../../assets';
import RN from '../RN';

type Props = {
  white?: boolean;
  active?: boolean;
  onPress?: () => void;
};

const RadioBtn: React.FC<Props> = ({ active = false, onPress, white = false }) => {
  return (
    <RN.TouchableOpacity style={styles.container} onPress={onPress}>
      {active ? (
        <>
          {white ? < Images.Svg.ellipseSmallWhite
            style={styles.activeRadio}
            width={15}
            height={15}
          /> :
            <Images.Svg.ellipseSmall
              style={styles.activeRadio}
              width={15}
              height={15}
            />
          }
        </>
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
