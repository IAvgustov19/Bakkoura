/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import { Alert, PermissionsAndroid, SafeAreaView } from 'react-native';
import RN from './src/components/RN';
import auth from '@react-native-firebase/auth';
import AppNavigator from './src/navigation/AppNavigator';
import { scheduleNotifications } from './src/helper/scheduleNotifiaction';
import PasswordPrompt from './src/screens/home/secureEntry/passwordAuth';
import { db } from './src/config/firebase';
import * as Keychain from 'react-native-keychain';
import FingerprintAuth from './src/screens/home/secureEntry/fingerprintAuth';
import useRootStore from './src/hooks/useRootStore';



const App = () => {
  const currentUser = auth()?.currentUser;

  // useEffect(() => {
  //   const currentUser = auth().currentUser;
  //   if (currentUser) {
  //     scheduleNotifications(currentUser.uid);
  //   }

  //   const onAuthStateChanged = (user) => {
  //     if (user) {
  //       scheduleNotifications(user.uid);
  //     }
  //   };

  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  console.log('currentUsercurrentUser', currentUser);


  const requestNotificationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'Allow this app to send you notifications.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const { isAuthorized } = useRootStore().authStore;



  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isPromptVisible, setPromptVisible] = useState(false);
  const [authType, setAuthType] = useState('');
  const [storedPassword, setStoredPassword] = useState('');


  useEffect(() => {
    checkPasswordAuth();
    setPromptVisible(true);
  }, []);


  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const user = auth().currentUser;
        if (!user) {
          console.error('User not authenticated');
          return;
        }
        const userDoc = await db.collection('users').doc(user.uid).get();
        if (!userDoc.exists) {
          console.error('User document not found');
          return;
        }
        const userData = userDoc.data();
        if (!userData || !userData.secureEntry) {
          console.error('Secure entry data not found');
          return;
        }
        const authType = userData.secureEntry;

        if (authType === 'Password') {
          setAuthType('Password');
        } else if (authType === 'FingerPrint') {
          setAuthType('FingerPrint');
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        Alert.alert('Error', 'An error occurred while checking authentication.');
      }
    };

    checkAuthentication();
  }, []);

  const checkPasswordAuth = async () => {
    try {
      const storedCredentials = await Keychain.getGenericPassword();
      if (storedCredentials) {
        const password = storedCredentials.password;
        setStoredPassword(password);
      } else {
        setPromptVisible(true);
      }
    } catch (error) {
      console.error('Error retrieving stored password:', error);
    }
  };

  const handleSubmitPassword = useCallback(async (inputPassword) => {
    if (!storedPassword) {
      try {
        await Keychain.setGenericPassword('user', inputPassword);
        setStoredPassword(inputPassword);
        setIsAuthenticated(true);
        setPromptVisible(false);
      } catch (error) {
        console.error('Error storing password:', error);
      }
    } else if (inputPassword === storedPassword) {
      setIsAuthenticated(true);
      setPromptVisible(false);
    } else {
      console.log('Incorrect password');
      Alert.alert('Incorrect Password', 'Please enter the correct password.');
    }
  }, [storedPassword]);

  const handleAuthenticationSuccess = () => {
    setIsAuthenticated(true);
    setPromptVisible(false);
  };



  return (
    <>
      <RN.StatusBar
        translucent={true}
        backgroundColor={'transparent'}
      />
      <AppNavigator />
    </>
    // <SafeAreaView style={{ backgroundColor: 'red', flex: 1 }}>
    // <RN.StatusBar
    //   translucent={true}
    //   backgroundColor={'transparent'}
    // />
    //   {/* <AppNavigator /> */}

    //   {currentUser && !isAuthenticated && (
    //     <RN.View>
    //       {authType == 'Password' && (
    //         <PasswordPrompt
    //           isVisible={isPromptVisible}
    //           onSubmit={handleSubmitPassword}
    //         />
    //       )}
    //       {authType == 'FingerPrint' && <FingerprintAuth onAuthenticationSuccess={handleAuthenticationSuccess} />}
    //     </RN.View>
    //   )}
    //   {<>
    //     <RN.StatusBar
    //       translucent={true}
    //       backgroundColor={'transparent'}
    //       barStyle="light-content"
    //     />
    //     <AppNavigator />
    //   </>}


    // </SafeAreaView >
  );
};

export default App;
