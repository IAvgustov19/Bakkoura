import React, {useEffect, useRef, useState} from 'react';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import reactNativeBcrypt from 'react-native-bcrypt';
import {Images} from '../../../assets';
import ButtonComp from '../../../components/Button/Button';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import Input from '../../../components/Input/Input';
import {KeyboardAvoidingView} from '../../../components/KeyboardAvoidingView';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import useRootStore from '../../../hooks/useRootStore';
import {APP_ROUTES} from '../../../navigation/routes';
import authh from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import CustomDropdown from '../../timeBiotic/components/CustomSelect';

import {windowHeight} from '../../../utils/styles';
import GiveImage from '../../../components/GiveImage/GiveImage';
import LoadingScreen from '../Loading/LoadingScreen';
import {observer} from 'mobx-react-lite';
import SignUpForm from './components/SignUpForm';
import {COLORS} from '../../../utils/colors';
import LanguageBtn from '../../../components/LanguageBtn/LanguageBtn';

type ISelect = {label: string; value: string};

const SignUpScreen = () => {
  const navigation = useNavigation();
  const {setAuthorized} = useRootStore().authStore;
  const {themeState} = useRootStore().personalAreaStore;
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState<ISelect>({label: '', value: ''});
  const inputRefs = useRef<{[key: string]: TextInput}>({
    name: null,
    username: null,
    email: null,
    password: null,
  });

  const {newUser, clearNewUserState, clearLoginUseState, setNewUser} =
    useRootStore().authStore;

  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState([]);
  const options = [
    {label: 'OAE', value: 'OAE'},
    {label: 'USA', value: 'USA'},
    {label: 'UK', value: 'UK'},
  ];

  const onSelect = (option: ISelect) => {
    setCountry({value: option.value, label: option.value});
  };

  useEffect(() => {
    // const unsubscribe = firestore()
    //   .collection('users')
    //   .onSnapshot((snapshot) => {
    //     const usersData = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //     setUsers(usersData);
    //   });
    // return () => unsubscribe();
  }, []);

  const signUp = async () => {
    if (newUser.email && newUser.password) {
      setLoading(true);
      try {
        const userCredential = await authh().createUserWithEmailAndPassword(
          newUser.email,
          newUser.password,
        );
        const user = userCredential.user;

        await user.updateProfile({
          displayName: newUser.name,
        });

        await firestore().collection('users').doc(user.uid).set({
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
          country: newUser.country,
          language: newUser.language,
          secureEntry: newUser.secureEntry,
          inActiveMenus: newUser.inActiveMenus,
          startScreen: newUser.initialRouteName,
          id: user.uid,
          theme: newUser.theme,
        });

        await AsyncStorage.setItem('userData', JSON.stringify(user));

        try {
          await authh().currentUser.sendEmailVerification();
        } catch (err) {
          Alert.alert('Error', 'Failed to send verification email.');
          setLoading(false);
          return;
        }

        if (!user.emailVerified) {
          Alert.alert(
            'Verify your email',
            'Press OK to go to the sign-in page',
            [
              {
                text: 'OK',
                onPress: () =>
                  navigation.navigate(APP_ROUTES.AUTH_SIGN_IN as never),
              },
            ],
          );
        } else {
          navigation.navigate(APP_ROUTES.AUTH_SIGN_IN as never);
        }

        clearNewUserState();
      } catch (error) {
        switch (error.code) {
          case 'auth/weak-password':
            Alert.alert(
              'Password is too weak.',
              'Please enter a stronger password.',
            );
            break;
          case 'auth/invalid-email':
            Alert.alert(
              'Email address is badly formatted',
              'Please enter a valid email.',
            );
            break;
          case 'auth/email-already-in-use':
            Alert.alert(
              'Email is busy',
              'The email address is already in use by another account.',
            );
            break;
          case 'auth/network-request-failed':
            Alert.alert('Check your internet connection');
            break;
          default:
            Alert.alert('Something went wrong', 'Please try again later');
        }
        //clearNewUserState();
        clearLoginUseState();
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Please fill out all fields');
    }
  };

  const scrollViewRef = useRef(null);

  const Scroll = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: windowHeight - windowHeight / 10,
        animated: true,
      });
    }
  };

  return (
    <>
      <LinearContainer
        children={
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
            <HeaderContent
              leftItem={<Images.Svg.btsRightLinear />}
              // rightItem={
              //   <LanguageBtn
              //     value={newUser?.language}
              //     onPress={() =>
              //       navigation.navigate(APP_ROUTES.LANGUAGE_SCREEN as never)
              //     }
              //   />
              // }
            />
            <RN.ScrollView
              ref={scrollViewRef}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <RN.View style={styles.content}>
                <LoadingScreen loading={loading} setLoading={setLoading} />
                <TextView title="Sign up" textAlign="center" />
                <SignUpForm
                  bottomInputPress={Scroll}
                  options={options}
                  onSelect={() => onSelect}
                />
                <RN.View style={styles.signUpBtn}>
                  <ButtonComp
                    onPress={signUp}
                    title={'Sign Up'}
                    icon={
                      loading ? (
                        <ActivityIndicator
                          color={COLORS.black}
                          style={{marginTop: 3}}
                        />
                      ) : (
                        <GiveImage source={Images.Img.eye} />
                      )
                    }
                  />
                </RN.View>
              </RN.View>
              <View style={styles.needAcc}>
                <TextView text="Already have an Account?" />
                <RN.TouchableOpacity
                  onPress={() =>
                    navigation.navigate(APP_ROUTES.AUTH_SIGN_IN as never)
                  }>
                  <TextView color={themeState.yellow} text="Sign In" />
                </RN.TouchableOpacity>
              </View>
              <View style={styles.terms}>
                <RN.TouchableOpacity
                  onPress={() =>
                    navigation.navigate(APP_ROUTES.PRIVACY_POLICY as never)
                  }>
                  <TextView style={styles.signUpText} text="Privacy policy" />
                </RN.TouchableOpacity>
                <RN.TouchableOpacity
                  onPress={() =>
                    navigation.navigate(APP_ROUTES.TERMS_OF_USE as never)
                  }>
                  <TextView style={styles.signUpText} text="Terms of use" />
                </RN.TouchableOpacity>
              </View>
            </RN.ScrollView>
          </KeyboardAvoidingView>
        }
      />
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
    height: windowHeight,
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
    height: windowHeight - 100,
    paddingBottom: 20,
  },
  signUpBtn: {
    marginTop: 30,
    paddingHorizontal: 15,
  },
  terms: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    paddingVertical: 10,
  },
  needAcc: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  signUpText: {
    color: '#ECC271',
  },
});
