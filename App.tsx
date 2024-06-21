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
import {AppState, Keyboard, PermissionsAndroid, Platform} from 'react-native';
import RN from './src/components/RN';
import useRootStore from './src/hooks/useRootStore';
import AppNavigator from './src/navigation/AppNavigator';
import {checkAlarms} from './src/notification/AlarmNot';
import BackgroundTimer from 'react-native-background-timer';

const App = () => {
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
  const {alarmsListData} = useRootStore().alarmStore;

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
  };
  // useEffect(() => {
  //   const interval = BackgroundTimer.setInterval(
  //     () => checkAlarms(alarmsListData),
  //     60000,
  //   );

  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (nextAppState === 'active') {
  //       checkAlarms(alarmsListData);
  //     }
  //   });

  //   return () => {
  //     clearInterval(interval);
  //     subscription.remove();
  //   };
  // }, [alarmsListData]);

  // useEffect(() => {
  //   if (Platform.OS === 'ios') {
  //     PushNotificationIOS.setNotificationCategories([
  //       {
  //         id: 'userAction',
  //         actions: [
  //           {id: 'Stop', title: 'Stop', options: {foreground: true}},
  //           {id: 'Later', title: 'Later', options: {foreground: true}},
  //         ],
  //       },
  //     ]);
  //   }
  // }, [alarmsListData]);

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

export default observer(App);
