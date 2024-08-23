import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import {useNavigation} from '@react-navigation/native';
import {windowHeight, windowWidth} from '../../../utils/styles';
import TextView from '../../../components/Text/Text';
import Input from '../../../components/Input/Input';
import React, {useRef, useState} from 'react';
import {Images} from '../../../assets';
import RN from '../../../components/RN';
import {observer} from 'mobx-react-lite';
import {db} from '../../../config/firebase';
import firestore from '@react-native-firebase/firestore';
import reactNativeBcrypt from 'react-native-bcrypt';
import {ActivityIndicator, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
import useRootStore from '../../../hooks/useRootStore';
import LoadingScreen from '../../auth/Loading/LoadingScreen';
import {COLORS} from '../../../utils/colors';
import ArrowLeftBack from '../../../components/ArrowLeftBack/ArrowLeftBack';

const LoginPassword = () => {
  const navigation = useNavigation();
  const {setNotAuthorized} = useRootStore().authStore;
  const [updateLoading, isUpdateLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const userEmail = auth().currentUser.email;

  const [userData, setUserData] = useState({login: userEmail, newPassword: ''});
  const [showHide, setShowHide] = useState({
    showPassword: false,
    showRepeatPassword: true,
  });

  const inputRefs = useRef<{[key: string]: any}>({
    login: null,
    password: null,
  });

  const focusInput = (refName: string) => {
    inputRefs.current[refName]?.focus();
  };

  const updateUser = async () => {
    try {
      setLoading(true);
      const snapshot = await db
        .collection('users')
        .where('email', '==', userData.login)
        .get();

      const updatePromises = snapshot.docs.map(async doc => {
        await doc.ref.update({
          password: reactNativeBcrypt.hashSync(userData.newPassword, 10),
          updatedAt: new Date(),
        });

        const user = auth().currentUser;
        await user.updatePassword(userData.newPassword);

        await AsyncStorage.setItem(
          'updatedAt',
          new Date().getTime().toString(),
        );
        await AsyncStorage.removeItem('token');
      });
      await Promise.all(updatePromises);

      Alert.alert(
        'Success',
        'User password updated',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ],
        {cancelable: false},
      );
    } catch (error) {
      if (error.code === 'auth/weak-password') {
        Alert.alert('Password should be at least 6 characters');
      } else if (error.code === 'auth/requires-recent-login') {
        Alert.alert('To update your password, you need to log in again.');
      } else {
        Alert.alert(error.code);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearContainer
      children={
        <>
          {loading && <RN.View style={styles.overlay} />}
          <RN.View
            style={styles.container}
            pointerEvents={updateLoading ? 'none' : 'auto'}>
            {/* <LoadingScreen loading={loading} setLoading={setLoading} /> */}
            {/* <RN.View style={styles.bgContainer}>
            <Images.Svg.bg style={styles.bg} />
        </RN.View> */}
            <HeaderContent
              leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
              title="Login & Password"
            />
            <RN.View style={styles.content}>
              <RN.View style={styles.inputBox}>
                <Input
                  placeholder="Login"
                  value={userData.login}
                  inputRef={ref => (inputRefs.current.login = ref)}
                  onPressIn={() => focusInput('login')}
                />
              </RN.View>
              <RN.View style={styles.inputBox}>
                <Input
                  secureTextEntry={showHide.showPassword}
                  placeholder="New Password"
                  value={userData.newPassword}
                  inputRef={ref => (inputRefs.current.password = ref)}
                  onPressIn={() => focusInput('password')}
                  onChangeText={text =>
                    setUserData(prevData => ({
                      ...prevData,
                      newPassword: text,
                    }))
                  }
                />
                <RN.TouchableOpacity
                  style={styles.deleteBox}
                  onPress={() =>
                    setShowHide(prevData => ({
                      ...prevData,
                      showPassword: !prevData.showPassword,
                    }))
                  }>
                  {showHide.showPassword ? (
                    <Images.Svg.hidePassword />
                  ) : (
                    <Images.Svg.showPassword />
                  )}
                </RN.TouchableOpacity>
              </RN.View>
              <RN.View style={styles.addBtn}>
                <StartBtn
                  text={
                    loading ? (
                      <ActivityIndicator
                        color={COLORS.black}
                        style={{marginTop: 3}}
                      />
                    ) : (
                      'Ok'
                    )
                  }
                  elWidth={55}
                  subWidth={70}
                  primary={true}
                  onPress={() => {
                    !loading && updateUser();
                  }}
                />
              </RN.View>
            </RN.View>
          </RN.View>
        </>
      }
    />
  );
};

export default observer(LoginPassword);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  bgContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  bg: {
    position: 'absolute',
  },
  scrollView: {},
  content: {
    gap: 15,
    paddingTop: 25,
    height: windowHeight - windowHeight / 6,
  },
  addBtn: {
    position: 'absolute',
    // alignItems: 'center',
    bottom: 20,
    width: '100%',
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  inputBox: {
    paddingHorizontal: 5,
  },
  deleteBox: {
    position: 'absolute',
    right: '7%',
    top: '30%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
});
