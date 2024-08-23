import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import ButtonComp from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import TextView from '../../../components/Text/Text';
import {useNavigation} from '@react-navigation/native';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import {APP_ROUTES} from '../../../navigation/routes';
import CaptchaV2Lib1 from './components/CaptchaV2Lib1';
import useRootStore from '../../../hooks/useRootStore';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../Loading/LoadingScreen';
import GiveImage from '../../../components/GiveImage/GiveImage';
import {Images} from '../../../assets';

const SignInScreen = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthorized, setLoginUser, loginUser, newUser, isAuthorized} =
    useRootStore().authStore;
  const {themeState} = useRootStore().personalAreaStore;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const navigation = useNavigation();

  GoogleSignin.configure({
    webClientId:
      '669015865828-etrnvlung2lkfmndu9ccth6597hsjp7g.apps.googleusercontent.com',
  });

  const handleCloseCaptcha = () => {
    setShowCaptcha(false);
    setFailedAttempts(0);
  };

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

  const signIn = async (email, password) => {
    if (email && password) {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        const user = userCredential.user;
        const token = await user.getIdToken();

        if (user.emailVerified) {
          setFailedAttempts(0);
          setShowCaptcha(false);
          setAuthorized();
        } else {
          Alert.alert('Account not verified. Please verify your email.');
        }
      } catch (error) {
        setFailedAttempts(prev => prev + 1);

        if (failedAttempts >= 4) {
          setShowCaptcha(true);
        } else {
          switch (error.code) {
            case 'auth/invalid-email':
            case 'auth/wrong-password':
              Alert.alert('Incorrect email or password');
              break;
            case 'auth/network-request-failed':
              Alert.alert('Check your internet connection');
              break;
            case 'auth/too-many-requests':
              setShowCaptcha(true);
              Alert.alert('Too many requests. Please try again later.');
              break;
            default:
              Alert.alert('An error occurred. Please try again.');
              break;
          }
        }
      }
    } else {
      Alert.alert('Please enter both email and password');
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const has = await GoogleSignin.hasPlayServices();

      const {idToken} = await GoogleSignin.signIn();
      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      await AsyncStorage.setItem('token', idToken);

      const userCredential = await auth().signInWithCredential(
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
      <LinearContainer>
        <View style={styles.container}>
          <LoadingScreen loading={loading} setLoading={setLoading} />
          <HeaderContent />
          <View style={styles.content}>
            <View style={styles.titleBox}>
              <TextView title="Hello Friend!" />
              <TextView text="Start tracking and improving Your Life!" />
            </View>
            <View style={styles.formBox}>
              <TextView style={styles.label} text="Login" />
              <Input
                placeholder="Enter your email"
                onChangeText={text => setEmail(text)}
                value={email}
                bordered
              />
              <TextView style={styles.label} text="Password" />
              <Input
                placeholder="Enter your password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
                bordered
              />
            </View>
            <View style={styles.forgotBox}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(APP_ROUTES.RECOVER_PASSWORD as never)
                }>
                <TextView style={styles.forgot} text="Forgot Your Password?" />
              </TouchableOpacity>
            </View>
            <View style={styles.signUp}>
              <ButtonComp
                title="Sign In"
                onPress={() => signIn(email, password)}
                icon={<GiveImage source={Images.Img.eye} />}
              />
            </View>
            <View style={styles.needAcc}>
              <TextView text="Need an Account?" />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(APP_ROUTES.AUTH_SIGN_UP as never)
                }>
                <TextView color={themeState.yellow} text="Sign Up" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearContainer>
      {showCaptcha && (
        <CaptchaV2Lib1 visible={showCaptcha} onClose={handleCloseCaptcha} />
      )}
    </>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  content: {
    justifyContent: 'center',
    height: '80%',
  },
  titleBox: {
    marginTop: 50,
    gap: 10,
  },
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
  forgot: {
    color: '#ECC271',
  },
  signUp: {
    marginTop: 30,
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
});
