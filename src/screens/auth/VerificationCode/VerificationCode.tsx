import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {Images} from '../../../assets';
import ButtonComp from '../../../components/Button/Button';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import {HITSLOP} from '../../../utils/styles';
import {COLORS} from '../../../utils/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {APP_ROUTES} from '../../../navigation/routes';
import {StyleSheet, Text, View, TextInput, Pressable} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 4;

const VerificationCodeScreen = () => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const navigation = useNavigation();

  const onNext = () => {
    navigation.navigate(APP_ROUTES.NEW_PASSWORD_SCREEN as never);
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={
              <RN.TouchableOpacity
                hitSlop={HITSLOP}
                style={styles.backBtn}
                onPress={() => navigation.goBack()}>
                <Images.Svg.arrowLeft />
                <TextView text="Back" />
              </RN.TouchableOpacity>
            }
          />
          <RN.View style={styles.centerBox}>
            <RN.View style={styles.infoText}>
              <TextView
                style={{color: !value ? COLORS.white : COLORS.red}}
                title={!value ? 'OTP Code Verification' : 'Incorrect OTP Code'}
              />
              <TextView
                style={styles.further}
                text={
                  !value
                    ? 'We have sent the OTP code via Your Email. Please enter the code in the column below'
                    : 'Please enter the right code in the column below'
                }
              />
            </RN.View>
            <SafeAreaView style={styles.root}>
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            </SafeAreaView>
            <RN.View style={styles.sendBtn}>
              <ButtonComp title="Next" onPress={onNext} />
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default VerificationCodeScreen;

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  centerBox: {
    marginTop: '35%',
  },
  further: {
    marginTop: 10,
  },
  infoText: {
    height: 80,
  },
  label: {
    marginLeft: 20,
  },
  sendBtn: {
    marginTop: 30,
    paddingHorizontal: '15%',
  },
  root: {
    paddingVertical: 0,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
  codeFieldRoot: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cell: {
    width: 60,
    height: 60,
    paddingVertical: 13,
    fontSize: 24,
    borderRadius: 30,
    backgroundColor: COLORS.black,
    overflow: 'hidden',
    textAlign: 'center',
    color: COLORS.white,
  },
  focusCell: {
    borderWidth: 1,
    borderColor: COLORS.blue,
  },
});
