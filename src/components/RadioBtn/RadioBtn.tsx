import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../assets';
import {COLORS} from '../../utils/colors';
import RN from '../RN';

type Props = {
  white?: boolean;
  active?: boolean;
  onPress?: () => void;
};

const RadioBtn: React.FC<Props> = ({
  active = false,
  onPress,
  white = false,
}) => {
  return (
    <RN.TouchableOpacity style={styles.container} onPress={onPress}>
      {active ? (
        <>
          {white ? (
            <Images.Svg.ellipseSmallWhite
              width={15}
              height={15}
              onPress={onPress}
              style={styles.activeRadio}
            />
          ) : (
            <Images.Svg.ellipseSmall
              width={15}
              height={15}
              onPress={onPress}
              style={styles.activeRadio}
            />
          )}
        </>
      ) : null}
    </RN.TouchableOpacity>
  );
};

export default observer(RadioBtn);

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#141414',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.white,
    shadowOffset: {width: -1, height: 0.9},
    shadowRadius: 10,
  },
  activeRadio: {},
});
