import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../assets';
import {COLORS} from '../../utils/colors';
import RN from '../RN';

type Props = {
  value?: string;
  onPress?: () => void;
};

const LanguageBtn: React.FC<Props> = ({value, onPress}) => {
  return (
    <RN.TouchableOpacity style={styles.container} onPress={onPress}>
      <RN.Text style={styles.language}>{value ? value : 'EN'}</RN.Text>
      <RN.View style={styles.iconBox}>
        <Images.Svg.en />
      </RN.View>
    </RN.TouchableOpacity>
  );
};

export default LanguageBtn;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    height: 50,
  },
  language: {
    position: 'absolute',
    zIndex: 2,
    fontWeight: '700',
    color: COLORS.yellow,
  },
});
