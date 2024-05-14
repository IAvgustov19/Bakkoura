import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { Images } from '../../../../assets';
import Input from '../../../../components/Input/Input';
import { KeyboardAvoidingView } from '../../../../components/KeyboardAvoidingView';
import RN from '../../../../components/RN';
import TextView from '../../../../components/Text/Text';
import UploadFileInput from '../../../../components/UploadFileInput/UploadFileInput';
import useRootStore from '../../../../hooks/useRootStore';
import { COLORS } from '../../../../utils/colors';
import { HITSLOP } from '../../../../utils/styles';
import CustomDropdown from '../../../timeBiotic/components/CustomSelect';

type Props = {
  black?: boolean;
  options?: any[];
  withSelect?: boolean;
  uploadAtTop?: boolean;
  bottomInputPress?: () => void;
  onSelect?: (option: string) => void;
};

const FormContainer: React.FC<Props> = ({
  options,
  onSelect,
  uploadAtTop,
  black = false,
  bottomInputPress,
  withSelect = false,
}) => {
  const { setOrderState, orderState, deleteFile } = useRootStore().marketStore;

  const openImagePicker = () => {
    let options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    ImagePicker.launchImageLibrary(options as never, response => {
      if (response.assets) {
        setOrderState('file', response.assets[0].fileName);
      }
    });
  };

  return (
    <RN.View style={styles.container}>
      {uploadAtTop ?
        <>
          <UploadFileInput onPress={openImagePicker} black={black} />
          {orderState.file ? (
            <RN.View style={styles.fileBox}>
              <Images.Svg.fileAttachIcon />
              <RN.View style={styles.fileBoxBox}>
                <TextView
                  text={
                    orderState.file.length > 30
                      ? orderState.file.slice(0, 27) + '...'
                      : orderState.file
                  }
                />
              </RN.View>
              <RN.TouchableOpacity hitSlop={HITSLOP} onPress={deleteFile}>
                <Images.Svg.cancelGrey />
              </RN.TouchableOpacity>
            </RN.View>
          ) : null}
        </> : null}
      <Input
        black={black}
        title="Name"
        placeholder="Name"
        backColor={black ? COLORS.black : COLORS.c3}
        width="100%"
        onChangeText={e => setOrderState('name', e)}
      />
      <Input
        black={black}
        title="Phone"
        placeholder="Phone"
        backColor={black ? COLORS.black : COLORS.c3}
        width="100%"
        onChangeText={e => setOrderState('phone', e)}
        onPressIn={bottomInputPress}
      />
      <Input
        black={black}
        title="E-mail"
        placeholder="E-mail"
        backColor={black ? COLORS.black : COLORS.c3}
        width="100%"
        onChangeText={e => setOrderState('email', e)}
        onPressIn={bottomInputPress}
      />
      {
        !withSelect ?
          <Input
            black={black}
            title="Your ideas"
            height={100}
            placeholder="Text"
            width="100%"
            multiLine={true}
            textAlignVertical="top"
            backColor={black ? COLORS.black : COLORS.c3}
            onChangeText={e => setOrderState('comment', e)}
            onPressIn={bottomInputPress}
          /> :
          <CustomDropdown
            options={options}
            onSelect={onSelect}
          />
      }
      {!uploadAtTop ?
        <>
          <UploadFileInput onPress={openImagePicker} black />
          {orderState.file ? (
            <RN.View style={styles.fileBox}>
              <Images.Svg.fileAttachIcon />
              <RN.View style={styles.fileBoxBox}>
                <TextView
                  text={
                    orderState.file.length > 30
                      ? orderState.file.slice(0, 27) + '...'
                      : orderState.file
                  }
                />
              </RN.View>
              <RN.TouchableOpacity hitSlop={HITSLOP} onPress={deleteFile}>
                <Images.Svg.cancelGrey />
              </RN.TouchableOpacity>
            </RN.View>
          ) : null}
        </> : null}
    </RN.View>
  );
};

export default observer(FormContainer);

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  fileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    gap: 10,
  },
  fileBoxBox: {
    maxWidth: '80%',
  },
});
