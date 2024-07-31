import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Platform} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {windowHeight} from '../../../utils/styles';
import {KeyboardAvoidingView} from '../../../components/KeyboardAvoidingView';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import {Images} from '../../../assets';
import auth from '@react-native-firebase/auth';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import ButtonComp from '../../../components/Button/Button';
import {db} from '../../../config/firebase';
import Input from '../../../components/Input/Input';
import LoadingScreen from '../../auth/Loading/LoadingScreen';

const PasswordPrompt = ({isVisible, onSubmit}) => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState(null);
  const inputRef = useRef(null);

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

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const userId = auth().currentUser.uid;
        const userData = await db
          .collection('users')
          .where('id', '==', userId)
          .get();
        if (!userData.empty) {
          console.log(
            'useruseruseruserDatauserData',
            userData.docs[0].data().name,
          );
          setUserInfo(userData.docs[0].data());
        } else {
          console.log('No matching documents.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <>
      <LinearContainer
        children={
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
            <HeaderContent leftItem={<Images.Svg.btsRightLinear />} />
            <RN.ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <RN.View style={styles.content}>
                <LoadingScreen loading={loading} setLoading={setLoading} />
                <TextView
                  title="Write your password to enter"
                  textAlign="center"
                />
                <RN.View style={styles.formBox}>
                  <Input
                    editable={false}
                    title="Name"
                    placeholder="JB"
                    value={userInfo ? userInfo.name : ''}
                  />
                  <Input
                    editable={false}
                    title="Username"
                    placeholder="Username"
                    value={userInfo ? userInfo.username : ''}
                  />
                  <Input
                    editable={false}
                    title="Email"
                    placeholder="Email"
                    value={userInfo ? userInfo.email : ''}
                  />
                  <Input
                    editable={false}
                    title="Country"
                    placeholder="Country"
                    value={userInfo ? userInfo.country : ''}
                  />
                  <Input
                    secureTextEntry
                    value={password}
                    title="App password"
                    placeholder="Password"
                    onChangeText={setPassword}
                    onPressIn={() => inputRef.current?.focus()}
                    inputRef={ref => (inputRef.current = ref)}
                  />
                </RN.View>
                <RN.View style={styles.signUpBtn}>
                  <ButtonComp
                    onPress={handlePasswordSubmit}
                    title={'Enter your account'}
                  />
                </RN.View>
              </RN.View>
            </RN.ScrollView>
          </KeyboardAvoidingView>
        }
      />
    </>
  );
};

export default PasswordPrompt;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingVertical: 20,
    justifyContent: 'center',
    // height: '100%',
  },
  container: {
    // flex: 1,
    backgroundColor: 'transparent',
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
    height: windowHeight,
    paddingBottom: 110,
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
    bottom: 0,
    gap: 10,
    left: 15,
  },
  signUpText: {
    color: '#ECC271',
  },
});
