import React, { useEffect, useRef, useState } from 'react';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import { StyleSheet, View, TouchableOpacity, Alert, Platform, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import reactNativeBcrypt from 'react-native-bcrypt';
import {Images} from '../../../assets';
import ButtonComp from '../../../components/Button/Button';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import Input from '../../../components/Input/Input';
import { KeyboardAvoidingView } from '../../../components/KeyboardAvoidingView';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import useRootStore from '../../../hooks/useRootStore';
import {APP_ROUTES} from '../../../navigation/routes';
import authh from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import CustomDropdown from '../../timeBiotic/components/CustomSelect';

import { windowHeight } from '../../../utils/styles';
import GiveImage from '../../../components/GiveImage/GiveImage';
import LoadingScreen from '../Loading/LoadingScreen';
import { observer } from 'mobx-react-lite';

type ISelect = { label: string; value: string; };

const SignUpScreen = () => {
  const navigation = useNavigation();
  const { setAuthorized } = useRootStore().authStore;
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState<ISelect>({ label: '', value: '' });
  const inputRefs = useRef<{ [key: string]: TextInput }>({
    name: null,
    username: null,
    email: null,
    password: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState([]);
  const options = [
    { label: 'OAE', value: 'OAE' },
    { label: 'USA', value: 'USA' },
    { label: 'UK', value: 'UK' },
  ];

  const onSelect = (option: ISelect) => {
    setCountry({ value: option.value, label: option.value })
  }

  const focusInput = (refName: string) => {
    inputRefs.current[refName]?.focus();
  }


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


  const signUp = async () => {
    if (name === '' || username === '' || email === '' || password === '' || country.value === '') {
      Alert.alert('Please fill out all fields');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await authh().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      await user.updateProfile({
        displayName: name,
      });
  
      try {
        await authh().currentUser.sendEmailVerification();
      } catch (err) {
        Alert.alert(err.message);
      }
  
      await firestore().collection('users').add({
        name,
        username,
        email,
        uid: authh().currentUser.uid,
        password: reactNativeBcrypt.hashSync(password, 10),
        country: country.value,
      });
  
      await AsyncStorage.setItem('userData', JSON.stringify(user));
  
      if (!user.emailVerified) {
        Alert.alert('Verify your email', 'Press OK to go to the sign-in page', [
          { text: 'OK', onPress: () => navigation.navigate(APP_ROUTES.AUTH_SIGN_IN as never) },
        ]);
      } else {
        navigation.navigate(APP_ROUTES.AUTH_SIGN_IN as never);
      }
    } catch (error) {
      switch (error.code) {
        case 'auth/weak-password':
          Alert.alert("Password is too weak. Please enter a stronger password.");
          break;
        case 'auth/invalid-email':
          Alert.alert("Email address is badly formatted. Please enter a valid email.");
          break;
        case 'auth/email-already-in-use':
          Alert.alert("The email address is already in use by another account.");
          break;
        default:
          Alert.alert("Sign-up error:", error.message);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <LoadingScreen loading={loading} setLoading={setLoading} />
      <LinearContainer
        children={<KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <RN.ScrollView contentContainerStyle={styles.scrollView}>
            <HeaderContent
              leftItem={<Images.Svg.btsRightLinear />}
              rightItem={<RN.TouchableOpacity
                onPress={() => navigation.navigate(APP_ROUTES.LANGUAGE_SCREEN as never)}>
                <Images.Svg.en width={50} />
              </RN.TouchableOpacity>} />
            <TextView title="Sign up" textAlign="center" />
            <RN.View style={styles.formBox}>
              <TextView style={styles.label} text="Name" />
              <Input placeholder="" value={name} onChangeText={setName}
                inputRef={(ref) => (inputRefs.current.name = ref)}
                onPressIn={() => focusInput('name')} />
              <TextView style={styles.label} text="Username" />
              <Input placeholder="" value={username} onChangeText={setUsername}
                inputRef={(ref) => (inputRefs.current.username = ref)}
                onPressIn={() => focusInput('username')} />
              <TextView style={styles.label} text="Email" />
              <Input placeholder="" value={email} onChangeText={setEmail}
                inputRef={(ref) => (inputRefs.current.email = ref)}
                onPressIn={() => focusInput('email')} />
              <TextView style={styles.label} text="Password" />
              <Input placeholder="" value={password} onChangeText={setPassword} secureTextEntry
                inputRef={(ref) => (inputRefs.current.password = ref)}
                onPressIn={() => focusInput('password')} />
              <CustomDropdown
                black={false}
                options={options}
                onSelect={onSelect} />
              {/* <TextView style={styles.label} text="Country" />
        <Input placeholder="" value={country} onChangeText={setCountry} /> */}
            </RN.View>
            <RN.View style={styles.signUpBtn}>
              <ButtonComp
                onPress={signUp}
                title="Sign Up"
                icon={<GiveImage source={Images.Img.eye} />} />
            </RN.View>
            <View style={styles.needAcc}>
              <TextView text="Already have an Account?" />
              <RN.TouchableOpacity onPress={() => navigation.navigate(APP_ROUTES.AUTH_SIGN_IN as never)}>
                <TextView style={styles.signUpText} text="Sign In" />
              </RN.TouchableOpacity>
            </View>
          </RN.ScrollView>
        </KeyboardAvoidingView>} />
    </>
  );
};

export default observer(SignUpScreen);

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 5,
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
  content: {
    height: windowHeight,
    paddingBottom: 110,
  },
  signUpBtn: {
    marginTop: 10,
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
