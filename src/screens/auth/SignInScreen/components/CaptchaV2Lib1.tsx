import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';

interface CaptchaV2Lib1Props {
  visible: boolean;
  onClose: () => void;
}

const CaptchaV2Lib1: React.FC<CaptchaV2Lib1Props> = ({ visible, onClose }) => {
  const captchaFormRef = useRef<ConfirmGoogleCaptcha>(null);
  const siteKey = '6LdyzisqAAAAAEJ6mDtTH4HKkH8TcYkkb1ae9lEx';

  const onMessage = (event: { nativeEvent: { data: string } }) => {

    if (event && event.nativeEvent.data) {
      if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
        onClose();
        return;
      } else {
        console.log('Verified code from Google', event.nativeEvent.data);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    }
  };

  useEffect(() => {
    if (visible) {
      captchaFormRef.current?.show();
    } else {
      captchaFormRef.current?.hide();
    }
  }, [visible]);

  return (
    <View style={styles.container}>
      <ConfirmGoogleCaptcha
        ref={captchaFormRef}
        baseUrl={'https://www.bakkoura.com'}
        languageCode="en"
        onMessage={onMessage}
        siteKey={siteKey}
        theme="dark"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CaptchaV2Lib1;
