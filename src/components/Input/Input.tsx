import * as React from 'react';
import {Text, View, StyleSheet, TextInput, DimensionValue} from 'react-native';
import {Images} from '../../assets';
import {COLORS} from '../../utils/colors';
import {verticalScale} from '../../utils/dimensions';
import {HITSLOP} from '../../utils/styles';
import RN from '../RN';

type Props = {
  placeholder: string;
  value?: any;
  onChangeText?: (e) => void;
  icon?: React.ReactNode;
  height?: DimensionValue;
  width?: DimensionValue;
  multiLine?: boolean;
  numberOfLines?: number;
  paddingTop?: number;
  paddingHorizontal?: number;
  backColor?: string;
  iconPress?: () => void;
  secureTextEntry?: boolean;
};

const Input: React.FC<Props> = ({
  placeholder,
  value,
  onChangeText,
  icon,
  height,
  width,
  multiLine,
  numberOfLines,
  paddingTop,
  backColor,
  iconPress,
  paddingHorizontal,
  secureTextEntry
}) => {
  return (
    <RN.View
      style={[
        styles.inputBox,
        {
          paddingHorizontal: paddingHorizontal ? paddingHorizontal : 30,
        },
      ]}>
      <TextInput
        multiline={multiLine}
        numberOfLines={numberOfLines}
        placeholderTextColor={COLORS.grey}
        style={[
          styles.input,
          {
            height: height,
            paddingTop: paddingTop,
            backgroundColor: backColor ? backColor : COLORS.black,
            width: width ? width : '80%',
          },
        ]}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}></TextInput>
      {icon ? (
        <RN.TouchableOpacity
          hitSlop={HITSLOP}
          onPress={iconPress}
          style={styles.iconBox}>
          {icon}
        </RN.TouchableOpacity>
      ) : null}
    </RN.View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.black,
    borderRadius: 30,
    paddingHorizontal: 30,
  },
  input: {
    paddingVertical: verticalScale(15),
    color: '#fff',
    width: '80%',
  },
  iconBox: {},
});
