import React from 'react';
import {
  KeyboardAvoidingView as View,
  Platform,
  StyleSheet,
  KeyboardAvoidingViewProps,
} from 'react-native';
import {COLORS} from '../utils/colors';
import RN from './RN';

export const KeyboardAvoidingView = ({
  children,
  style,
  ...props
}: KeyboardAvoidingViewProps) => {
  return (
    <View
      behavior={RN.Platform.OS === 'ios' ? 'padding' : null}
      enabled
      keyboardVerticalOffset={Platform.OS === 'android' ? 110 : 90}
      style={[styles.container, style]}
      {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.transparent,
  },
});
