/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useLayoutEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {scheduleNotifications} from './src/helper/scheduleNotifiaction';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {observer} from 'mobx-react-lite';
import {
  AppState,
  NativeModules,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';
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

import SharedGroupPreferences from 'react-native-shared-group-preferences';
import AwesomeButton from 'react-native-really-awesome-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const group = 'group.streak';

const SharedStorage = NativeModules.SharedStorage;

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
import {Images} from './src/assets';
import {windowWidth} from './src/utils/styles';
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

  const [text, setText] = useState('');
  const widgetData = {
    text,
  };

  const handleSubmit = async () => {
    try {
      // iOS
      await SharedGroupPreferences.setItem('widgetKey', widgetData, group);
    } catch (error) {
      console.log({error});
    }
    const value = `${text} days`;
    // Android
    SharedStorage.set(JSON.stringify({text: value}));
    ToastAndroid.show('Change value successfully!', ToastAndroid.SHORT);
  };

  return (
    <>
      <RN.StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <AppNavigator />
      {/* <SafeAreaView style={styles.safeAreaContainer}>
        <KeyboardAwareScrollView
          enableOnAndroid
          extraScrollHeight={100}
          keyboardShouldPersistTaps="handled">
          <RN.View style={styles.container}>
            <RN.Text style={styles.heading}>Change Widget Value</RN.Text>
            <RN.View style={styles.bodyContainer}>
              <RN.View style={styles.instructionContainer}>
                <RN.View style={styles.thoughtContainer}>
                  <RN.Text style={styles.thoughtTitle}>
                    Enter the value that you want to display on your home widget
                  </RN.Text>
                </RN.View>
                <RN.View style={styles.thoughtPointer}></RN.View>
                <RN.Image
                  source={Images.Img.homeWatch24and30}
                  style={styles.avatarImg}
                />
              </RN.View>

              <RN.TextInput
                style={styles.input}
                onChangeText={newText => setText(newText)}
                value={text}
                keyboardType="decimal-pad"
                placeholder="Enter the text to display..."
              />

              <AwesomeButton
                backgroundColor={'#33b8f6'}
                height={50}
                width={windowWidth - 80}
                backgroundDarker={'#eeefef'}
                backgroundShadow={'#f1f1f0'}
                style={styles.actionButton}
                onPress={handleSubmit}>
                Submit
              </AwesomeButton>
            </RN.View>
          </RN.View>
        </KeyboardAwareScrollView>
      </SafeAreaView> */}
    </>
  );
};

export default observer(App);

const styles = RN.StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fafaf3',
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 12,
  },
  heading: {
    fontSize: 24,
    color: '#979995',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    // fontSize: 20,
    minHeight: 50,
    borderWidth: 1,
    borderColor: '#c6c6c6',
    borderRadius: 8,
    padding: 12,
  },
  bodyContainer: {
    flex: 1,
    margin: 18,
  },
  instructionContainer: {
    margin: 25,
    paddingHorizontal: 20,
    paddingTop: 30,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#ecedeb',
    borderColor: '#bebfbd',
    marginBottom: 35,
  },
  avatarImg: {
    height: 180,
    width: 180,
    resizeMode: 'contain',
    alignSelf: 'flex-end',
  },
  thoughtContainer: {
    minHeight: 50,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    backgroundColor: '#ffffff',
    borderColor: '#c6c6c6',
  },
  thoughtPointer: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    overflow: 'hidden',
    borderTopWidth: 12,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: 'blue',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    marginTop: -1,
    marginLeft: '50%',
  },
  thoughtTitle: {
    fontSize: 14,
  },
  actionButton: {
    marginTop: 40,
  },
});
