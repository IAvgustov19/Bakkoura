import * as React from 'react';
import {
  StyleSheet,
  TextInput,
  DimensionValue,
  KeyboardTypeOptions,
} from 'react-native';
import {COLORS} from '../../utils/colors';
import {verticalScale} from '../../utils/dimensions';
import {HITSLOP} from '../../utils/styles';
import RN from '../RN';
import TextView from '../Text/Text';

type Props = {
  title?: string;
  placeholder: string;
  value?: any;
  black?: boolean;
  editable?: boolean;
  onChangeText?: (e) => void;
  icon?: React.ReactNode;
  height?: DimensionValue;
  width?: DimensionValue;
  multiLine?: boolean;
  numberOfLines?: number;
  paddingTop?: number;
  paddingHorizontal?: number;
  backColor?: string;
  secureTextEntry?: boolean;
  iconPress?: () => void;
  textAlignVertical?: any;
  onPressIn?: () => void;
  maxLenght?: number;
  keyBoardType?: KeyboardTypeOptions;
  err?: string;
  inputRef?: React.Ref<TextInput>;
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
  textAlignVertical,
  title,
  black = false,
  onPressIn,
  editable = true,
  secureTextEntry,
  maxLenght,
  keyBoardType,
  err,
  inputRef,
}) => {
  return (
    <RN.View style={styles.container}>
      {title ? <TextView style={styles.title} text={title} /> : null}
      <RN.TouchableWithoutFeedback
        onPress={onPressIn}
        onPressIn={() => inputRef?.current?.focus()}>
        <RN.View
          style={[
            styles.inputBox,
            black && styles.borderedInput,
            {
              paddingHorizontal: paddingHorizontal ? paddingHorizontal : 30,
              backgroundColor: backColor ? backColor : COLORS.black,
            },
          ]}>
          <TextInput
            ref={inputRef}
            editable={editable}
            secureTextEntry={secureTextEntry}
            multiline={multiLine}
            numberOfLines={numberOfLines}
            placeholderTextColor={COLORS.grey}
            textAlignVertical={textAlignVertical}
            maxLength={maxLenght}
            keyboardType={keyBoardType}
            style={[
              styles.input,
              {
                height: height,
                paddingTop: paddingTop,
                width: width ? width : '80%',
              },
            ]}
            onChangeText={onChangeText}
            onPressIn={onPressIn}
            value={value}
            autoCapitalize="none"
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
      </RN.TouchableWithoutFeedback>
      {err ? <RN.Text style={styles.err}>{err}</RN.Text> : null}
    </RN.View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'flex-start',
  },
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
    fontFamily: 'RedHatDisplay-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    width: '80%',
  },
  iconBox: {},
  title: {
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 10,
  },
  borderedInput: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#304A66',
  },
  err: {
    color: COLORS.red,
    position: 'absolute',
    bottom: -15,
    left: 15,
    fontSize: 12,
  },
});
