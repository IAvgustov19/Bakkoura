import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Images } from '../../assets';
import { COLORS } from '../../utils/colors';
import RN from '../RN';

import {t} from '../../i18n'

type Props = {
  black?: boolean;
  onPress?: () => void;
};

const UploadFileInput: React.FC<Props> = ({ onPress, black }) => {
  return (
    <RN.Pressable style={styles.container}>
      <RN.Text style={styles.label}>{`${t('File')}`}</RN.Text>
      <RN.TouchableOpacity style={[styles.file,  black && styles.bordered]} onPress={onPress}>
        {black ? <Images.Svg.darkUpArrow /> : <Images.Svg.uploadFile />}
      </RN.TouchableOpacity>
    </RN.Pressable>
  );
};

export default UploadFileInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  file: {
    width: '100%',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'flex-end',
    backgroundColor: COLORS.darkGrey,
  },
  label: {
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 10,
    color: COLORS.grey,
  },
  bordered: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#304A66',
    backgroundColor: COLORS.black
  }
});
