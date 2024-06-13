import React, {useEffect, useRef, useState} from 'react';
import {WINDOW_HEIGHT} from '@gorhom/bottom-sheet';
import {StyleSheet, View, Alert, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import reactNativeBcrypt from 'react-native-bcrypt';
import {Images} from '../../../assets';
import ButtonComp from '../../../components/Button/Button';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import Input from '../../../components/Input/Input';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import useRootStore from '../../../hooks/useRootStore';
import {APP_ROUTES} from '../../../navigation/routes';
import authh from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import {windowHeight} from '../../../utils/styles';
import {COLORS} from '../../../utils/colors';
import {observer} from 'mobx-react-lite';
import LanguageBtn from '../../../components/LanguageBtn/LanguageBtn';
import SignUpForm from './components/SignUpForm';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const {newUser, clearNewUserState, clearLoginUseState} =
    useRootStore().authStore;
  const [loading, isLoading] = useState(false);

  const signUp = async () => {
    if (newUser.email && newUser.password) {
      isLoading(true);
      try {
        const userCredential = await authh().createUserWithEmailAndPassword(
          newUser.email,
          newUser.password,
        );
        const user = userCredential.user;
        await user.updateProfile({
          displayName: newUser.name,
        });
        try {
          // await authh().currentUser.sendEmailVerification();
        } catch (err) {
          Alert.alert(err);
          isLoading(false);
        }
        await firestore().collection('users').doc(userCredential.user.uid).set({
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
          country: newUser.country,
          language: newUser.language,
          secureEntry: newUser.secureEntry,
          inActiveMenus: newUser.inActiveMenus,
          startScreen: newUser.initialRouteName,
          id: userCredential.user.uid,
        });
        await AsyncStorage.setItem('userData', JSON.stringify(user));
        isLoading(false);
        // if (!user.emailVerified) {
        //   Alert.alert('verify your email', 'press ok to get sign in page', [
        //     { text: 'OK', onPress: () => navigation.navigate(APP_ROUTES.AUTH_SIGN_IN as never) },
        //   ])
        // }
        navigation.navigate(APP_ROUTES.AUTH_SIGN_IN as never);
        clearNewUserState();
      } catch (error) {
        Alert.alert(error.message);
        isLoading(false);
        clearNewUserState();
        clearLoginUseState();
      } finally {
        isLoading(false);
      }
    }
  };

  const scrollViewRef = useRef(null);

  const Scroll = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: windowHeight - windowHeight / 4,
        animated: true,
      });
    }
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<Images.Svg.btsRightLinear />}
            rightItem={
              <LanguageBtn
                value={newUser?.language}
                onPress={() =>
                  navigation.navigate(APP_ROUTES.LANGUAGE_SCREEN as never)
                }
              />
            }
          />
          <RN.ScrollView
            ref={scrollViewRef}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <TextView title="Sign up" textAlign="center" />
              <SignUpForm bottomInputPress={Scroll} />
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
                    ) : null
                  }
                />
              </RN.View>
            </RN.View>
          </RN.ScrollView>
          <View style={styles.needAcc}>
            <TextView text="Already have an Account?" />
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

export default observer(SignUpScreen);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    height: WINDOW_HEIGHT - 50,
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
    bottom: 10,
    gap: 10,
    left: 15,
  },
  signUpText: {
    color: '#ECC271',
  },
});
