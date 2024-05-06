import * as React from 'react';
import {Text, View, StyleSheet, DimensionValue, ViewStyle} from 'react-native';
import {DefinitionProps} from 'react-native-svg';
import {COLORS} from '../../utils/colors';
import RN from '../RN';

type Props = {
  borderColor?: string;
  textColor?: string;
  text?: string;
  onPress?: () => void;
  Width?: DimensionValue;
  Height?: DimensionValue;
  
};

const OutlineBtn: React.FC<Props> = ({
  borderColor,
  textColor,
  text,
  onPress,
  Width,
  Height,
}) => {
  return (
    <RN.TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          borderColor: borderColor ? borderColor : COLORS.darkGreyText,
          width: Width ? Width : 110,
          height: Height? Height : 35,
        },
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
