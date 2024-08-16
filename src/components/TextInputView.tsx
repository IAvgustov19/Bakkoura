import {StyleSheet, TextInput as TI, TextInputProps} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/colors';

const TextInput = (props: TextInputProps) => {
  return <TI {...props} style={[styles.input, props.style]} />;
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    backgroundColor: COLORS.transparent,
    borderRadius: 4,
    fontWeight: '400',
    color: COLORS.grey,
    overflow: 'hidden',
  },
});
