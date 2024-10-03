import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Images} from '../../assets';
import {COLORS} from '../../utils/colors';
import RN from '../RN';

import {t} from '../../i18n'
import useRootStore from '../../hooks/useRootStore';
import {observer} from 'mobx-react-lite';

type Props = {
  black?: boolean;
  onPress?: () => void;
};

const UploadFileInput: React.FC<Props> = ({onPress, black}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <RN.Pressable style={styles.container}>
      <RN.Text style={styles.label}>{`${t('File')}`}</RN.Text>
      <RN.TouchableOpacity
        style={[
          styles.file,
          {
            backgroundColor: themeState.inputBaack,
            borderColor: themeState.inputBorder,
          },
        ]}
        onPress={onPress}>
        <themeState.uploadFile />
      </RN.TouchableOpacity>
    </RN.Pressable>
  );
};

export default observer(UploadFileInput);

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
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  label: {
    marginLeft: 15,
    marginBottom: 5,
    marginTop: 10,
    color: COLORS.grey,
  },
});
