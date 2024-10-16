/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useLayoutEffect} from 'react';
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

export const updateLastSeen = userId => {
  db.collection('users')
    .doc(userId)
    .update({
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch(error => {
      console.error('Error updating lastSeen field:', error);
    });
};
import {db, firebase} from './src/config/firebase';
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
            message:
              'To send notifications that the time on the clock is up, a certain event has occurred, or just to remind you of an anniversary',
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

  // const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  // return subscriber; // unsubscribe on unmount

  // const requestNotificationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  //       {
  //         title: 'Notification Permission',
  //         message: 'Allow this app to send you notifications.',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK',
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {

  //       console.log('Notification permission granted');
  //     } else {
  //       console.log('Notification permission denied');
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // useEffect(() => {
  //   syncUsersToFirestore();
  // }, [])

  useEffect(() => {
    const requestStoragePermissions = async () => {
      if (RN.Platform.OS === 'android') {
        try {
          const writeGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message:
                'Access is required to send photos and videos to the chat, upload avatars to your profile, and send materials to the support service',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );

          const readGranted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Read Storage Permission',
              message:
                'Access is required to send photos and videos to the chat, upload avatars to your profile, and send materials to the support service',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );

          if (
            writeGranted === PermissionsAndroid.RESULTS.GRANTED &&
            readGranted === PermissionsAndroid.RESULTS.GRANTED
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
    requestStoragePermissions();
  }, []);

  // useEffect(() => {
  //   let interval;

  //   const handleAppStateChange = (nextAppState) => {
  //     const currentUser = auth().currentUser;
  //     if (currentUser) {
  //       if (nextAppState === 'active') {
  //         // Start updating lastSeen every second
  //         interval = setInterval(() => {
  //           updateLastSeen(currentUser.uid);
  //         }, 1000);
  //       } else {
  //         // Stop updating lastSeen when the app goes to the background
  //         if (interval) {
  //           clearInterval(interval);
  //         }
  //         updateLastSeen(currentUser.uid);
  //       }
  //     }
  //   };

  //   AppState.addEventListener('change', handleAppStateChange);

  //   return () => {
  //     if (interval) {
  //       clearInterval(interval);
  //     }
  //    ((AppState as any)?.removeEventListener('change', handleAppStateChange))
  //   };
  // }, []);

  useLayoutEffect(() => {
    const currentUser = auth().currentUser;

    const interval = setInterval(() => {
      if (currentUser) {
        updateLastSeen(currentUser.uid);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [auth().currentUser]);

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
