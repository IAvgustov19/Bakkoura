/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {scheduleNotifications} from './src/helper/scheduleNotifiaction';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {observer} from 'mobx-react-lite';
import {AppState, PermissionsAndroid, Platform} from 'react-native';
import RN from './src/components/RN';
import AppNavigator from './src/navigation/AppNavigator';
// import { PermissionsAndroid, Platform } from 'react-native';
// import { scheduleNotifications } from './src/helper/scheduleNotifiaction';
// import { useEffect } from 'react';
// import auth from '@react-native-firebase/auth'
// import { syncUsersToFirestore } from './src/services/firestoreService';

import BackgroundTimer from 'react-native-background-timer';
import useRootStore from './src/hooks/useRootStore';
import 'react-native-reanimated';

const App = () => {
  const {alarmsListData, checkAlarms} = useRootStore().alarmStore;
  const {cloneAllEventsData, checkEvent} = useRootStore().calendarStore;

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      scheduleNotifications(currentUser.uid);
    }

    const onAuthStateChanged = user => {
      if (user) {
        scheduleNotifications(user.uid);
      }
    };

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const requestNotificationPermission = async () => {
    if (RN.Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notification Permission',
            message: 'Allow this app to send you notifications.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission granted');
        } else {
          console.log('Notification permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  useEffect(() => {
    const interval = BackgroundTimer.setInterval(() => {
      checkAlarms(alarmsListData);
      checkEvent(cloneAllEventsData);
    }, 30000);

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkAlarms(alarmsListData);
        checkEvent(cloneAllEventsData);
      }
    });

    return () => {
      BackgroundTimer.clearInterval(interval);
      subscription.remove();
    };
  }, [alarmsListData, cloneAllEventsData]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      PushNotificationIOS.setNotificationCategories([
        {
          id: 'userAction',
          actions: [
            {id: 'Stop', title: 'Stop', options: {foreground: true}},
            {id: 'Later', title: 'Later', options: {foreground: true}},
          ],
        },
      ]);
    }
  }, [alarmsListData]);

  useEffect(() => {
    requestNotificationPermission();
  }, []);
  // const onAuthStateChanged = (user) => {
  //   if (user) {
  //     scheduleNotifications(user.uid);
  //   }
  // };

  // useEffect(() => {
  //   syncUsersToFirestore();
  // }, [])

  useEffect(() => {
    const permission = async () => {
      if (Platform.OS === 'android') {
        try {
          const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);

          console.log('write external storage', grants);

          if (
            grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.RECORD_AUDIO'] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Permissions granted');
          } else {
            console.log('All required permissions not granted');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
    };
    permission();
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

export default observer(App);
