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
import {isValidEmail} from '../../../../helper/validation';
import useRootStore from '../../../../hooks/useRootStore';
import StorageApi, {
  pickImageFromDevice,
} from '../../../../store/personalArea/avatar';
import {COLORS} from '../../../../utils/colors';
import {HITSLOP, windowHeight, windowWidth} from '../../../../utils/styles';
import CustomDropdown from '../../../timeBiotic/components/CustomSelect';

import {t} from '../../../../i18n'

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
  const {setIsEmail} = useRootStore().timeBiotic;
  const [fileLoading, setFileLoading] = React.useState(false);
  const [emailErr, setEmailErr] = React.useState(null);

  const handleChange = React.useCallback(
    (email: string) => {
      if (email && isValidEmail(email)) {
        setEmailErr(null);
        setIsEmail(true);
      } else if (!email) {
        setEmailErr(null);
        setIsEmail(true);
      } else if (!isValidEmail(email)) {
        setEmailErr(`${t('Email is invalid')}`);
        setIsEmail(false);
      } else {
        setEmailErr(null);
        setIsEmail(true);
      }
      setOrderState('email', email);
    },
    [orderState.email],
  );

  const onUploadImage = async () => {
    try {
      setFileLoading(true);
      const result = await pickImageFromDevice({
        width: windowWidth * 2,
        height: windowHeight + windowHeight / 2,
        withCircleOverlay: false,
      });

      const url = await StorageApi.uploadImage({
        file: result,
      });

      if (url) {
        setOrderState('file', url as never);
        setFileLoading(false);
      }
    } catch (err) {
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
        title={`${t('name')}`}
        placeholder={`${t('name')}`}
        backColor={black ? COLORS.black : COLORS.c3}
        width="100%"
        onChangeText={e => setOrderState('name', e)}
      />
      <Input
        value={orderState.phone}
        black={black}
        title={`${t('Phone')}`}
        placeholder={`${t('Phone')}`}
        backColor={black ? COLORS.black : COLORS.c3}
        width="100%"
        onChangeText={e => setOrderState('phone', e)}
        onPressIn={bottomInputPress}
        keyBoardType="numeric"
      />
      <Input
        value={orderState.email}
        black={black}
        title={`${t('email')}`}
        placeholder={`${t('email')}`}
        backColor={black ? COLORS.black : COLORS.c3}
        width="100%"
        onChangeText={e => handleChange(e)}
        onPressIn={bottomInputPress}
        keyBoardType="email-address"
        err={emailErr}
      />
      {!withSelect ? (
        <Input
          value={orderState.message}
          black={black}
          title={`${t('Your ideas')}`}
          height={100}
          placeholder={`${t('Enter your idea')}`}
          width="100%"
          multiLine={true}
          textAlignVertical="top"
          backColor={black ? COLORS.black : COLORS.c3}
          onChangeText={e => setOrderState('message', e)}
          onPressIn={bottomInputPress}
        />
      ) : (
        <CustomDropdown options={options} onSelect={onSelect} black={true} />
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
    gap: 10,
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
