import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../assets';
import {COLORS} from '../../utils/colors';
import RN from '../RN';

type Props = {
  onPress?: () => void;
};

const UploadFileInput: React.FC<Props> = ({onPress}) => {
  return (
    <RN.Pressable style={styles.container}>
      <RN.Text style={styles.label}>File</RN.Text>
      <RN.TouchableOpacity style={styles.file} onPress={onPress}>
        <Images.Svg.uploadFile />
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
    backgroundColor: COLORS.darkGrey,
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    borderRadius: 50,
    alignItems: 'flex-end',
  },
  label: {
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 10,
    color: COLORS.grey,
  },
});
