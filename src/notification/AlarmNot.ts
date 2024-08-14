// import PushNotification, {Importance} from 'react-native-push-notification';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import {AlarmListsItemType} from '../types/alarm';
// import RN from '../components/RN';

// const ALARM_RING_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
// const LATER_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// let timeout;
// let laterTimeout;
// export const activeAlarms = new Set();
// export let alarmState;

// export const checkAlarms = (alarmsListData: AlarmListsItemType[]) => {
//   alarmState = alarmsListData;
//   const now = new Date();
//   const currentDay = now.toLocaleString('en-US', {weekday: 'long'});
//   const currentHours = now.getHours();
//   const currentMinutes = now.getMinutes();

//   alarmsListData.forEach(alarm => {
//     if (
//       alarm.isActive &&
//       alarm.hours == currentHours &&
//       alarm.minutes == currentMinutes &&
//       (alarm.repeat.includes(currentDay) || alarm.repeat.includes('Never')) &&
//       !activeAlarms.has(alarm.id)
//     ) {
//       triggerNotification(alarm);
//     }
//   });
//   // console.log('alarmState', alarmState);
//   // console.log('activeAlarms', activeAlarms);
// };

// const triggerNotification = (alarm: AlarmListsItemType) => {
//   PushNotification.createChannel(
//     {
//       channelId: alarm.id as never,
//       channelName: 'Alarm Channel',
//       playSound: true,
//       soundName: alarm.sound.url,
//       importance: Importance.HIGH,
//     },
//     () => {},
//   );

//   if (RN.Platform.OS === 'ios') {
//     PushNotificationIOS.addNotificationRequest({
//       id: alarm.id,
//       title: alarm.name,
//       body: alarm.description || 'Alarm',
//       sound: alarm.sound.url,
//       category: 'userAction',
//     });
//   } else {
//     PushNotification.localNotification({
//       channelId: alarm.id,
//       title: alarm.name,
//       message: alarm.description || 'Alarm',
//       playSound: true,
//       soundName: alarm.sound.url,
//       actions: ['Stop', 'Later'],
//       userInfo: {id: alarm.id},
//       autoCancel: false,
//     });
//   }

//   activeAlarms.add(alarm.id);

//   // Set a timeout to keep the notification active for 15 minutes
//   timeout = setTimeout(() => {
//     handleLaterAction(alarm);
//   }, ALARM_RING_DURATION); // 15 minutes in milliseconds
// };

// const handleStopAction = alarmId => {
//   clearTimeout(timeout);
//   clearTimeout(laterTimeout);
//   PushNotification.cancelLocalNotifications({id: alarmId});
//   PushNotificationIOS.removePendingNotificationRequests([alarmId]);
//   activeAlarms.delete(alarmId);
// };

// const handleLaterAction = alarm => {
//   clearTimeout(timeout);
//   PushNotification.cancelLocalNotifications({id: alarm.id});
//   PushNotificationIOS.removePendingNotificationRequests([alarm.id]);

//   laterTimeout = setTimeout(() => {
//     triggerNotification(alarm);
//   }, LATER_DURATION); // 5 minutes in milliseconds
// };

// PushNotification.configure({
//   onNotification: function (notification) {
//     const alarmId = notification.userInfo.id;
//     const alarm = alarmState.find(a => a.id === alarmId);

//     if (notification.action === 'Stop') {
//       handleStopAction(alarmId);
//     } else if (notification.action === 'Later') {
//       handleLaterAction(alarm);
//     }
//   },
//   requestPermissions: RN.Platform.OS === 'ios',
// });
