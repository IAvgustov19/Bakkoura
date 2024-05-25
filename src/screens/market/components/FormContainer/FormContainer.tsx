import {observer} from 'mobx-react-lite';
import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import {Images} from '../../../../assets';
import Input from '../../../../components/Input/Input';
import {KeyboardAvoidingView} from '../../../../components/KeyboardAvoidingView';
import RN from '../../../../components/RN';
import TextView from '../../../../components/Text/Text';
import UploadFileInput from '../../../../components/UploadFileInput/UploadFileInput';
import useRootStore from '../../../../hooks/useRootStore';
import StorageApi, {
  pickImageFromDevice,
} from '../../../../store/personalArea/avatar';
import {COLORS} from '../../../../utils/colors';
import {HITSLOP} from '../../../../utils/styles';
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
  const {setOrderState, orderState, deleteFile} = useRootStore().marketStore;
  const [fileLoading, setFileLoading] = React.useState(false);

  const onUploadImage = async () => {
    try {
      setFileLoading(true);
      const result = await pickImageFromDevice({
        width: 400,
        height: 400,
        withCircleOverlay: true,
      });

      const url = await StorageApi.uploadImage({
        file: result,
      });

      if (url) {
        setOrderState('file', url as never);
        setFileLoading(false);
      }
    } catch (err) {
      console.log(['[Error-onUploadImage]:', err]);
      setFileLoading(false);
    }
  };

  return (
    <RN.View style={styles.container}>
      {uploadAtTop ? (
        <>
          <UploadFileInput onPress={onUploadImage} black={black} />
          <RN.View style={styles.fileBox}>
            {fileLoading ? (
              <ActivityIndicator color={COLORS.white} style={{marginTop: 3}} />
            ) : null}
            {orderState.file ? (
              <>
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
              </>
            ) : null}
          </RN.View>
        </>
      ) : null}
      <Input
        value={orderState.name}
        black={black}
        title="Name"
        placeholder="Name"
        backColor={black ? COLORS.black : COLORS.c3}
        width="100%"
        onChangeText={e => setOrderState('name', e)}
      />
      <Input
        value={orderState.phone}
        black={black}
        title="Phone"
        placeholder="Phone"
        backColor={black ? COLORS.black : COLORS.c3}
        width="100%"
        onChangeText={e => setOrderState('phone', e)}
        onPressIn={bottomInputPress}
      />
      <Input
        value={orderState.email}
        black={black}
        title="E-mail"
        placeholder="E-mail"
        backColor={black ? COLORS.black : COLORS.c3}
        width="100%"
        onChangeText={e => setOrderState('email', e)}
        onPressIn={bottomInputPress}
      />
      {!withSelect ? (
        <Input
          value={orderState.message}
          black={black}
          title="Your ideas"
          height={100}
          placeholder="Text"
          width="100%"
          multiLine={true}
          textAlignVertical="top"
          backColor={black ? COLORS.black : COLORS.c3}
          onChangeText={e => setOrderState('message', e)}
          onPressIn={bottomInputPress}
        />
      ) : (
        <CustomDropdown options={options} onSelect={onSelect} />
      )}
      {!uploadAtTop ? (
        <>
          <UploadFileInput onPress={onUploadImage} black={black} />
          <RN.View style={styles.fileBox}>
            {fileLoading ? (
              <ActivityIndicator color={COLORS.white} style={{marginTop: 3}} />
            ) : null}
            {orderState.file ? (
              <>
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
              </>
            ) : null}
          </RN.View>
        </>
      ) : null}
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
