import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  NativeModules,
  Linking,
} from 'react-native';
import ButtonComp from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import TextView from '../../../components/Text/Text';
import {BG, Images} from '../../../assets';
import {useNavigation} from '@react-navigation/native';
import {APP_ROUTES} from '../../../navigation/routes';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import RN from '../../../components/RN';
import {windowHeight, windowWidth} from '../../../utils/styles';
import useRootStore from '../../../hooks/useRootStore';
import RadioBtn from '../../../components/RadioBtn/RadioBtn';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  signInWithCredential,
  AuthCredential,
  getAdditionalUserInfo,
  signInWithRedirect,
} from '@firebase/auth';
import * as firebase from '@firebase/app';
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from '@firebase/auth';

import authh from '@react-native-firebase/auth';

import auth from '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {observer} from 'mobx-react-lite';
import {COLORS} from '../../../utils/colors';
import LanguageBtn from '../../../components/LanguageBtn/LanguageBtn';
import GiveImage from '../../../components/GiveImage/GiveImage';
import LoadingScreen from '../Loading/LoadingScreen';

const SignInScreen = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthorized, setLoginUser, loginUser, newUser, isAuthorized} =
    useRootStore().authStore;
  const {getPersonalState} = useRootStore().personalAreaStore;

  // old pass nifS4TT9Jvb9tH9
  // new pass nifS4TT9Jvb9tH1

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      });

    return () => unsubscribe();
  }, []);

  console.log('usersusersusers:', users);

  const navigation = useNavigation();
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const RememberMe = () => {
    setRemember(e => !e);
  };
  // passs nifS4TT9Jvb9tH9

  useEffect(() => {
    // const checkUserLoggedIn = async () => {
    //   setLoading(true);
    //   try {
    //     const token = await AsyncStorage.getItem('token');
    //     if (token) {
    //       setAuthorized();
    //     }
    //   } catch (error) {
    //     console.error('Failed to check login status:', error);
    //   }
    //   setLoading(false);
    // };
    // checkUserLoggedIn();
  }, []);

  GoogleSignin.configure({
    webClientId:
      '669015865828-etrnvlung2lkfmndu9ccth6597hsjp7g.apps.googleusercontent.com',
  });

  const signIn = async (email, password) => {
    try {
      const userCredential = await authh().signInWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      const token = await user.getIdToken();
      console.log(
        'user.emailVerifieduser.emailVerifieduser.emailVerified',
        user.emailVerified,
      );
      if (user.emailVerified) {
        setAuthorized();
      } else {
        Alert.alert('email doesnt exist');
      }
      console.log(token, 77);
      // You can use the token or user object as needed
    } catch (error) {
      console.error('Error signing in:', error.message);
      // Handle the error here, such as displaying a message to the user
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const has = await GoogleSignin.hasPlayServices();

      const {idToken} = await GoogleSignin.signIn();
      const googleCredentials = authh.GoogleAuthProvider.credential(idToken);
      await AsyncStorage.setItem('token', idToken);

      const userCredential = await authh().signInWithCredential(
        googleCredentials,
      );

      const user = userCredential.user;
      console.log('Signed in user:', user);

      setAuthorized();
      return user;
    } catch (error) {
      console.log(error, 11111111);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        //
      }
    }
    setLoading(false);
  };

  return (
    <>
      <LinearContainer
        children={
          <RN.ScrollView>
            <View style={styles.container}>
              <LoadingScreen loading={loading} setLoading={setLoading} />
              {/* <View style={styles.light}>
          <Image source={BG.light} />
        </View> */}
              <HeaderContent
                leftItem={
                  <View style={styles.logo}>
                    <Images.Svg.btsRightLinear width={80} />
                  </View>
                }
                // rightItem={
                //   <LanguageBtn
                //     value={newUser.language}
                //     onPress={() =>
                //       navigation.navigate(APP_ROUTES.LANGUAGE_SCREEN as never)
                //     }
                //   />
                // }
              />
              <RN.View style={styles.content}>
                <View style={styles.titleBox}>
                  {/* <TextView title="Hello Friend!" />
                <TextView text="Start tracking and improving Your Live!" /> */}
                </View>
                <View style={styles.formBox}>
                  <TextView style={styles.label} text="Login" />
                  <Input
                    placeholder="JB"
                    onChangeText={text => setEmail(text)}
                    value={email}
                  />
                  <TextView style={styles.label} text="Password" />
                  <Input
                    placeholder="77777"
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry
                  />
                </View>
                <View style={styles.forgotBox}>
                  {/* <TouchableOpacity style={styles.rememberMe} onPress={RememberMe}>
          <RadioBtn active={remember} onPress={RememberMe} />
          <TextView text="Remember me" />
        </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(APP_ROUTES.RECOVER_PASSWORD as never)
                    }>
                    <TextView
                      style={styles.forgot}
                      text="Forgot Your Password?"
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.signUp}>
                  <ButtonComp
                    title="Sign In"
                    icon={<GiveImage source={Images.Img.eye} />}
                    onPress={() => signIn(email, password)}
                  />
                </View>
                {/* <View style={styles.orWithSocial}>
                <TextView text="Or Sign Up using" />
                <View style={styles.socialBox}>
                  <TouchableOpacity onPress={() => {}}>
                    <Images.Svg.f />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {}}>
                    <Images.Svg.x />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => signInWithGoogle()}>
                    <Images.Svg.g />
                  </TouchableOpacity>
                </View>
              </View> */}
              </RN.View>
              <View style={styles.needAcc}>
                <TextView text="Need an Account?" />
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
    </>
  );
};
export default observer(SignInScreen);

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    height: '80%',
  },
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
    justifyContent: 'flex-end',
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
