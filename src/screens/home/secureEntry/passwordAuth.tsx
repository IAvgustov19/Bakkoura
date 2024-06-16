import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
import * as Keychain from 'react-native-keychain';

const PasswordPrompt = ({ isVisible, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePasswordSubmit = async () => {
    if (password.trim() === '') {
      setErrorMessage('Please enter your password.');
    } else {
      try {
        await Keychain.setGenericPassword('user', password);
        onSubmit(password);
      } catch (error) {
        setErrorMessage('Error storing password');
      }
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enter your password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        <Button title="OK" onPress={handlePasswordSubmit} />
      </View>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: 'black',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default PasswordPrompt;
