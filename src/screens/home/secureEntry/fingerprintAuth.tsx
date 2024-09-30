import React, { useEffect, useState } from 'react';
import { View, Text, Button, Platform, Linking, Alert } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import RN from '../../../components/RN';
import LinearGradient from 'react-native-linear-gradient';
import { t } from '../../../i18n';

const FingerprintAuth = ({ onAuthenticationSuccess }) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [showWrongMessage, setShowWrongMessage] = useState<boolean>(false);

    useEffect(() => {
        authenticateWithFingerprint();
    }, []);

    const authenticateWithFingerprint = async () => {
        try {
            const isAvailable = await FingerprintScanner.isSensorAvailable();
            if (!isAvailable) {
                console.error('Fingerprint sensor is not available on this device.');
                return;
            }

            await FingerprintScanner.authenticate({
                description: 'Authenticate using your fingerprint',
                cancelButton: null,
            });
            setIsVisible(false);
            onAuthenticationSuccess();
            console.log('Fingerprint authentication successful.');
        } catch (error) {
            console.error('Error authenticating with fingerprint:', error);
            setShowWrongMessage(true);
            authenticateWithFingerprint();
        }
    };

    const handleFallbackPress = () => {
        setShowWrongMessage(false);
        FingerprintScanner.release();
        setIsVisible(false);
        authenticateWithFingerprint();
    };


    useEffect(() => {
        showWrongMessage && Platform.OS === 'android'
        Alert.alert(
            `${t("Biometry not set up")}`,
            `${t("You have not set up any biometric data. Please add your fingerprint in settings")}`,
            [
              {
                text: `${t("Go to Settings")}`,
                onPress: () => {
                  if (Platform.OS === 'android') {
                    Linking.openSettings();
                  } else {
                    Alert.alert(
                      `${t("Unsupported")}`,
                      `${t("This feature is only supported on Android")}`,
                    );
                  }
                },
              },
              {
                text: `${t("Cancel")}`,
                style: 'cancel',
              },
            ],
          );
    }, [])



    return (
        <>
            {isVisible && (
                <LinearGradient colors={['#485661', '#090A0A']} style={styles.container}>
                </LinearGradient>
            )}
        </>
    );
};

const styles = RN.StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    }
});

export default FingerprintAuth;
