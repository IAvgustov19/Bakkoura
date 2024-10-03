import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { KeyboardAvoidingView } from '../../../components/KeyboardAvoidingView';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import { Images } from '../../../assets';
import TextView from '../../../components/Text/Text';
import ButtonComp from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import RN from '../../../components/RN';
import { useNavigation } from '@react-navigation/native';
import { t } from '../../../i18n';

const PasswordScreen = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [promptVisible, setPromptVisible] = useState(true);
    const inputRef = useRef(null);

    const handleSubmitPassword = useCallback(async () => {
        try {
            await Keychain.setGenericPassword('user', password);
            setIsAuthenticated(true);
            setPromptVisible(false);
        } catch (error) {
            console.error('Error updating password:', error);
            Alert.alert(`${t("Error")}`, `${t("There was an issue updating the password")}`);
        }
        navigation.goBack();
    }, [password]);

    useEffect(() => {
        const fetchStoredPassword = async () => {
            try {
                const credentials = await Keychain.getGenericPassword();
                if (credentials) {
                    console.log('Stored password:', credentials.password);
                }
            } catch (error) {
                console.error('Error fetching stored password:', error);
            }
        };

        fetchStoredPassword();
    }, []);

    return (
        <>
            <LinearContainer
                children={
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
                        <HeaderContent leftItem={<Images.Svg.btsRightLinear />} />
                        <RN.View style={styles.content}>
                            <TextView
                                title="Enter a new password"
                                textAlign="center"
                                style={{ marginBottom: 20 }}
                            />
                            <RN.View style={styles.formBox}>
                                <Input
                                    secureTextEntry
                                    value={password}
                                    placeholder="Password"
                                    onChangeText={setPassword}
                                    onPressIn={() => inputRef.current?.focus()}
                                    inputRef={ref => (inputRef.current = ref)}
                                />
                            </RN.View>
                            <RN.View style={styles.signUpBtn}>
                                <ButtonComp
                                    onPress={handleSubmitPassword}
                                    title={'Enter'}
                                />
                            </RN.View>
                        </RN.View>
                    </KeyboardAvoidingView>
                }
            />
        </>
    );
};

export default PasswordScreen;

const styles = StyleSheet.create({
    formBox: {
        gap: 8,
        paddingHorizontal: 10,
    },
    label: {
        marginLeft: 10,
    },
    content: {
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpBtn: {
        marginTop: 30,
        paddingHorizontal: 15,
    },
    needAcc: {
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        gap: 10,
        left: 15,
    },
    signUpText: {
        color: '#ECC271',
    },
});
