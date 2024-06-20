/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import RN from './src/components/RN';
import AppNavigator from './src/navigation/AppNavigator';
import auth from '@react-native-firebase/auth';
import { scheduleNotifications } from './src/helper/scheduleNotifiaction';
import { PermissionsAndroid } from 'react-native';



const App = () => {

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      scheduleNotifications(currentUser.uid);
    }

    const onAuthStateChanged = (user) => {
      if (user) {
        scheduleNotifications(user.uid);
      }
    };

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


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


  useEffect(() => {
    requestNotificationPermission();
  }, []);

  
  return (
    <>
      <RN.StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <AppNavigator />
    </>
  );
};

export default App;
