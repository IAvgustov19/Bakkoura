import * as React from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Images} from '../../assets';
import {COLORS} from '../../utils/colors';
import {verticalScale} from '../../utils/dimensions';
import RN from '../RN';

type Props = {
  placeholder: string;
  value?: any;
  onChangeText?: (e) => void;
  icon?: React.ReactNode;
};

const Input: React.FC<Props> = ({placeholder, value, onChangeText, icon}) => {
  return (
    <RN.View style={styles.inputBox}>
      <TextInput
        placeholderTextColor={COLORS.grey}
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        autoCapitalize="none"
        placeholder={placeholder}></TextInput>
      <RN.View style={styles.iconBox}>{icon ? icon : null}</RN.View>
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
    backgroundColor: '#0D0D0D',
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
