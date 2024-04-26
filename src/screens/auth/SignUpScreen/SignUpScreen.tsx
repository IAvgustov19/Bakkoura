import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import React, {Component, useEffect, useState} from 'react';
import {Text, StyleSheet, View, Alert, TextInput} from 'react-native';
import {Images} from '../../../assets';
import ButtonComp from '../../../components/Button/Button';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import Input from '../../../components/Input/Input';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import useRootStore from '../../../hooks/useRootStore';
import {APP_ROUTES} from '../../../navigation/routes';
import auth from '@react-native-firebase/auth';
import { Button } from 'react-native';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const {setAuthorized} = useRootStore().authStore;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null); // To store user information

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(userAuth => {
      setUser(userAuth); 
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid!');
        } else {
          Alert.alert('Error', error.message);
        }
        console.error(error);
      });
  };
  const handleSignOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out successfully');
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  };
  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            rightItem={
              <RN.TouchableOpacity
                onPress={() =>
                  navigation.navigate(APP_ROUTES.LANGUAGE_SCREEN as never)
                }>
                <Images.Svg.en width={50} />
              </RN.TouchableOpacity>
            }
          />
          <TextView title="Sign up" textAlign="center" />
          <RN.View style={styles.formBox}>
            <TextView style={styles.label} text="Name" />
            <Input placeholder="JB" />
            <TextView style={styles.label} text="Username" />
            <Input placeholder="77777" />
            <TextView style={styles.label} text="Email" />
            <Input placeholder="77777" />
            <TextView style={styles.label} text="Password" />
            <Input placeholder="77777" />
            <TextView style={styles.label} text="Country" />
            <Input placeholder="77777" />
          </RN.View>
          {user ? (
        <View>
          <Text>Welcome, {user.email}</Text>
          <Button title="Sign Out" onPress={handleSignOut} />
        </View>
      ) : (
        <View>
          <TextInput
            style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
            onChangeText={text => setPassword(text)}
            value={password}
            placeholder="Password"
            secureTextEntry
          />
          <Button title="Sign Up" onPress={handleSignUp} />
        </View>
      )}
          <RN.View style={styles.signUpBtn}>
            <ButtonComp
              onPress={setAuthorized}
              // icon={<Images.Svg.eye />}
              title="Sign Up"
            />
          </RN.View>
          <View style={styles.needAcc}>
            <TextView text="Already have un Account?" />
            <RN.TouchableOpacity
              onPress={() =>
                navigation.navigate(APP_ROUTES.AUTH_SIGN_IN as never)
              }>
              <TextView style={styles.signUpText} text="Sign In" />
            </RN.TouchableOpacity>
          </View>
        </RN.View>
      }
    />
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  // scrollView: {
  //   paddingVertical: 20,
  // },
  container: {
    paddingHorizontal: 10,
    height: WINDOW_HEIGHT - 40,
  },
  formBox: {
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  label: {
    marginLeft: 10,
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
    bottom: 10,
    gap: 10,
    left: 15,
  },
  signUpText: {
    color: '#ECC271',
  },
});
