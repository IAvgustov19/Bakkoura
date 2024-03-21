import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {COLORS} from '../../utils/colors';
import RN from '../RN';

type Props = {
  borderColor?: string;
  textColor?: string;
  text?: string;
};

const OutlineBtn: React.FC<Props> = ({borderColor, textColor, text}) => {
  return (
    <RN.TouchableOpacity
      style={[
        styles.container,
        {borderColor: borderColor ? borderColor : COLORS.darkGreyText},
      ]}>
      <RN.Text style={{color: textColor ? textColor : COLORS.grey}}>
        {text}
      </RN.Text>
    </RN.TouchableOpacity>
  );
};

export default OutlineBtn;

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 35,
    borderWidth: 1.5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
