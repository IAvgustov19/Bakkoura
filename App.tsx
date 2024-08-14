/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useLayoutEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { scheduleNotifications } from './src/helper/scheduleNotifiaction';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { observer } from 'mobx-react-lite';
import { AppState, NativeModules, PermissionsAndroid, Platform } from 'react-native';
import RN from './src/components/RN';
import AppNavigator from './src/navigation/AppNavigator';
import BackgroundTimer from 'react-native-background-timer';
import useRootStore from './src/hooks/useRootStore';
import messaging from '@react-native-firebase/messaging';
import 'react-native-reanimated';


export const updateLastSeen = (userId) => {
  db.collection('users').doc(userId).update({
    lastSeen: firebase.firestore.FieldValue.serverTimestamp()
  }).catch(error => {
    console.error('Error updating lastSeen field:', error);
  });
};
import { db, firebase } from './src/config/firebase';
import PushNotification from 'react-native-push-notification';


export const channelId = 'bts';

PushNotification.createChannel(
  {
    channelId: channelId,
    channelName: 'Default Channel',
    channelDescription: 'A default channel for notifications',
    soundName: 'default',
    importance: 4,
    vibrate: true,
  },
  (created) => console.log(`createChannel returned '${created}'`)
);

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage);
});

messaging().onMessage(async remoteMessage => {
  const { title, body } = remoteMessage.notification;
  const { senderId, chatId } = remoteMessage.data;
  const uid = auth().currentUser.uid;
  const openChatWith = await db.collection('users').doc(uid).get();
  console.log(openChatWith.data().openChatWith);
  let openWith = openChatWith.data().openChatWith;

  console.log(senderId,"senderIdsenderIdsenderId",openWith);
  

  if (senderId !== openWith) {
    console.log('Message received from a different user in the foreground!', remoteMessage);

    // Show local notification
    PushNotification.localNotification({
      channelId: channelId,
      title: title,
      message: body,
    });
  } else {
    console.log('Message received from the currently active chat user');
    // Optionally, update the chat UI here without changing the screen
    // You might want to update the chat view with the new message.
  }
});




const App = () => {
  const { alarmsListData, checkAlarms } = useRootStore().alarmStore;
  const { cloneAllEventsData, checkEvent } = useRootStore().calendarStore;

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
            { id: 'Stop', title: 'Stop', options: { foreground: true } },
            { id: 'Later', title: 'Later', options: { foreground: true } },
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




const { ForegroundService } = NativeModules;
  

const startService = () => {
  ForegroundService.startService();
};


useEffect(() => {
  console.log('ForegroundService', ForegroundService)
}, [])


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
