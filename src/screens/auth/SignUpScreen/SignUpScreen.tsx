import React, { useEffect, useState } from 'react';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../../assets';
import ButtonComp from '../../../components/Button/Button';
import GiveImage from '../../../components/GiveImage/GiveImage';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import Input from '../../../components/Input/Input';
import {KeyboardAvoidingView} from '../../../components/KeyboardAvoidingView';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import useRootStore from '../../../hooks/useRootStore';
import { APP_ROUTES } from '../../../navigation/routes';
import authh from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

// import bcrypt from 'bcrypt';
import ReactNativeBcrypt from 'react-native-bcrypt';
import { windowHeight } from '../../../utils/styles';

// import {sendEmailVerification } from 'firebase/auth';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { setAuthorized } = useRootStore().authStore;
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot((snapshot) => {
        const usersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      });

    return () => unsubscribe();
  }, []);


  console.log('usersusersusers:', users)

  // const saltRounds = 10;

  // const hashPassword = (password, salt) => {
  //   ReactNativeBcrypt.hash(password, salt, (error, hash) => {
  //     if (error) {
  //       console.error('Error hashing password:', error);
  //       // Handle the error as needed
  //     } else {
  //       console.log('Hashed password:', hash);
  //       // Use the hash for further processing
  //     }
  //   });
  // };
  
  // hashPassword(password, 'hhisjis');


  const signUp = async () => {
    try {

      const userCredential = await authh().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await user.updateProfile({
        displayName: name,
      });
      try {
        await authh().currentUser.sendEmailVerification();
      } catch (err) {
        Alert.alert(err)
      }
      await firestore().collection('users').add({
        name,
        username,
        email,
        password,
        country,
      });
      await AsyncStorage.setItem('userData', JSON.stringify(user));
      if (!user.emailVerified) {
        Alert.alert('verify your email', 'press ok to get sign in page', [
          { text: 'OK', onPress: () => navigation.navigate(APP_ROUTES.AUTH_SIGN_IN as never) },
        ])
      }

    } catch (error) {
      Alert.alert(error.message);
    }
  };



  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            rightItem={
              <RN.TouchableOpacity
                onPress={() => navigation.navigate(APP_ROUTES.LANGUAGE_SCREEN as never)}>
                <Images.Svg.en width={50} />
              </RN.TouchableOpacity>
            }
          />
          <TextView title="Sign up" textAlign="center" />
          <RN.View style={styles.formBox}>
            <TextView style={styles.label} text="Name" />
            <Input placeholder="JB" value={name} onChangeText={setName} />
            <TextView style={styles.label} text="Username" />
            <Input placeholder="77777" value={username} onChangeText={setUsername} />
            <TextView style={styles.label} text="Email" />
            <Input placeholder="77777" value={email} onChangeText={setEmail} />
            <TextView style={styles.label} text="Password" />
            <Input placeholder="77777" value={password} onChangeText={setPassword} secureTextEntry />
            <TextView style={styles.label} text="Country" />
            <Input placeholder="77777" value={country} onChangeText={setCountry} />
          </RN.View>
          <RN.View style={styles.signUpBtn}>
            <ButtonComp onPress={signUp} title="Sign Up" />
          </RN.View>
          <View style={styles.needAcc}>
            <TextView text="Already have an Account?" />
            <RN.TouchableOpacity onPress={() => navigation.navigate(APP_ROUTES.AUTH_SIGN_IN as never)}>
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
  scrollView: {
    paddingVertical: 20,
  },
  container: {
    paddingHorizontal: 10,
    height: WINDOW_HEIGHT - 40,
  },
  content: {
    height: windowHeight - windowHeight / 6,
    // backgroundColor: 'red',
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
