import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Button } from 'react-native';
import ButtonComp from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import TextView from '../../../components/Text/Text';
import { BG, Images } from '../../../assets';
import { useNavigation } from '@react-navigation/native';
import { APP_ROUTES } from '../../../navigation/routes';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import RN from '../../../components/RN';
import { windowHeight } from '../../../utils/styles';
import useRootStore from '../../../hooks/useRootStore';
import RadioBtn from '../../../components/RadioBtn/RadioBtn';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth, { Auth, GoogleAuthProvider, signInWithCredential, createUserWithEmailAndPassword } from '@firebase/auth';
import * as firebase from '@firebase/app';

import AsyncStorage from '@react-native-async-storage/async-storage';


const SignInScreen = () => {
  const navigation = useNavigation();
  const { setAuthorized } = useRootStore().authStore;
  const [remember, setRemember] = useState(false);

  const RememberMe = () => {
    setRemember(e => !e);
  };


  // import statusCodes along with GoogleSignin

  GoogleSignin.configure({
    webClientId: '825580714539-79fjuisrr0k5povubd4qi7rv3oop6d6o.apps.googleusercontent.com',
  });

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      // const { idToken} = await GoogleSignin.signIn();
      // const aaa = GoogleAut
      // // this.setState({ userInfo });
      const { idToken } = await GoogleSignin.signIn();
      console.log('idToken:', idToken);
      const googleCredentials = GoogleAuthProvider.credential(idToken);
      await AsyncStorage.setItem('token', idToken);
      setAuthorized()
      // navigation.navigate(APP_ROUTES.MESSENGER as never);
      return signInWithCredential(firebase, googleCredentials);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const signinByEmailPassword = async () => {
    try {
      auth()
        .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });      // User signed in successfully
      // console.log('User signed in:', userCredential.user);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  }

  // useEffect(() => {
  //   const check = async () => {
  //     const token = await AsyncStorage.getItem('token');
  //     if (token) {
  //       navigation.navigate(APP_ROUTES.FIRST as never);
  //     }
  //     console.log(token);
  //   }
  //   check();
  // }, [])



  return (
    <LinearContainer
      children={
        <RN.ScrollView>
          <View style={styles.container}>
            {/* <View style={styles.light}>
              <Image source={BG.light} />
            </View> */}
            <HeaderContent
              leftItem={
                <View style={styles.logo}>
                  <Images.Svg.btsRightLinear width={80} />
                </View>
              }
              rightItem={
                <TouchableOpacity
                  style={styles.localize}
                  onPress={() =>
                    navigation.navigate(APP_ROUTES.LANGUAGE_SCREEN as never)
                  }>
                  <Images.Svg.en width={50} />
                </TouchableOpacity>
              }
            />
            <View style={styles.titleBox}>
              <TextView title="Hello Friend!" />
              <TextView text="Start tracking and improving Your Live!" />
            </View>
            <View style={styles.formBox}>
              <TextView style={styles.label} text="Login" />
              <Input placeholder="JB" />
              <TextView style={styles.label} text="Password" />
              <Input placeholder="77777" />
            </View>
            <View style={styles.forgotBox}>
              <TouchableOpacity style={styles.rememberMe} onPress={RememberMe}>
                <RadioBtn active={remember} onPress={RememberMe} />
                <TextView text="Remember me" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(APP_ROUTES.RECOVER_PASSWORD as never)
                }>
                <TextView style={styles.forgot} text="Forgot Your Password?" />
              </TouchableOpacity>
            </View>
            <View style={styles.signUp}>
              <ButtonComp
                title="Sign in"
                // icon={<Images.Svg.eye />}
                // onPress={setAuthorized}
                onPress={() => signIn()}
              />
            </View>
            <View style={styles.orWithSocial}>
              <TextView text="Or Sign Up using" />
              <View style={styles.socialBox}>
                <TouchableOpacity>
                  <Images.Svg.f />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Images.Svg.x />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Images.Svg.g />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.needAcc}>
              <TextView text="Need un Account?" />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(APP_ROUTES.AUTH_SIGN_UP as never)
                }>
                <TextView style={styles.signUpText} text="Sign Up" />
              </TouchableOpacity>
            </View>
          </View>
        </RN.ScrollView>
      }
    />
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  Russs: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    height: windowHeight - 40,
    paddingHorizontal: 15,
    // paddingTop: 30,
  },
  logo: {},
  localize: {
    marginTop: -5,
  },
  titleBox: {
    marginTop: 50,
    gap: 10,
  },
  // light: {
  //   position: 'absolute',
  //   top: -30,
  //   left: 100,
  //   transform: [{translateX: -75}],
  // },
  formBox: {
    alignItems: 'flex-start',
    gap: 8,
    marginTop: 40,
  },
  label: {
    marginLeft: 20,
  },
  forgotBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  forgot: {
    color: '#ECC271',
  },
  signUp: {
    marginTop: 30,
  },
  orWithSocial: {
    marginTop: 25,
    gap: 15,
  },
  socialBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
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
