import { useState } from 'react';
import { Button, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ReactNativeBiometrics from 'react-native-biometrics';
import RN from '../../../components/RN';

const rnBiometrics = new ReactNativeBiometrics();

const PasswordPrompt = ({ isVisible, onSubmit, onCancel, hasBiometrics }) => {
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handlePasswordSubmit = () => {
      if (password.trim() === '') {
        setErrorMessage('Please enter your password.');
      } else {
        onSubmit(password);
      }
    };
  
    const handleBiometricSubmit = async () => {
      try {
        const { available } = await rnBiometrics.isSensorAvailable();
        if (available) {
          const result = await rnBiometrics.simplePrompt({ promptMessage: 'Authenticate with biometrics' });
          if (result.success) {
            onSubmit('biometrics'); // You can use any string to denote biometric authentication
          } else {
            setErrorMessage('Biometric authentication failed.');
          }
        } else {
          setErrorMessage('Biometric authentication is not available on this device.');
        }
      } catch (error) {
        setErrorMessage('Biometric authentication error.');
        console.log(error);
      }
    };
  
    const handleCancel = () => {
      setErrorMessage('');
      onCancel();
    };
  
    return (
      <Modal visible={isVisible} transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Enter your password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            {hasBiometrics && (
              <TouchableOpacity onPress={handleBiometricSubmit}>
                <Text style={styles.biometricsText}>Use Biometrics</Text>
              </TouchableOpacity>
            )}
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={handleCancel} />
              <Button title="OK" onPress={handlePasswordSubmit} />
            </View>
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          </View>
        </View>
      </Modal>
    );
  };
  

  const styles = RN.StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        alignItems: 'center',
      },
      modalText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
      },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      errorMessage: {
        color: 'red',
        marginBottom: 10,
      },
      input: {
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around', // Change 'space-between' to 'space-around'
        width: '100%',
        marginTop: 20, // Add margin-top for spacing
      },
      errorText: {
        color: 'red',
        marginTop: 10,
      },
      biometricsText: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 10,
      },
  });


  export default PasswordPrompt;