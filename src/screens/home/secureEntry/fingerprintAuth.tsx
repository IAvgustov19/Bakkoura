import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

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

    return (
        <>
            {isVisible && (
                <View style={{ backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                    {showWrongMessage ? <Text>Wrong</Text> : null}
                    {showWrongMessage ? <Button title="Retry" onPress={handleFallbackPress} /> : null}
                </View>
            )}
        </>
    );
};

export default FingerprintAuth;
