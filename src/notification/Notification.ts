import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {Sounds} from '../assets';

// iOS uchun sozlash
if (Platform.OS === 'ios') {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
      if (notification.action === 'Stop') {
        PushNotification.cancelLocalNotifications({id: notification.id});
      }
      if (notification.action === 'Leter') {
        const newAlarmDate = new Date(Date.now() + 5 * 60 * 1000);
        PushNotification.localNotificationSchedule({
          id: notification.id,
          message: notification.message as never,
          date: newAlarmDate,
          playSound: true,
          soundName: notification.sound,
          repeatType: 'day',
          actions: ['Stop', 'Leter'],
        });
      }
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    requestPermissions: Platform.OS === 'ios',
  });
}

// Android uchun sozlash
if (Platform.OS === 'android') {
  PushNotification.configure({
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
      // stop tugmasi
      if (notification.action === 'Stop') {
        PushNotification.cancelLocalNotifications({id: notification.id});
      }
      // leter tugmasi
      else if (notification.action === 'Leter') {
        const newAlarmDate = new Date(Date.now() + 5 * 60 * 1000);
        PushNotification.localNotificationSchedule({
          id: notification.id,
          message: notification.message as string,
          date: newAlarmDate,
          playSound: true,
          soundName: notification.sound,
          repeatType: 'day',
          actions: ['Stop', 'Leter'],
        });
      }
    },
    requestPermissions: Platform.OS === ('android' as never),
  });
}

export const scheduleAlarm = alarm => {
  const {hours, minutes, sound, id, name} = alarm;

  const now = new Date();
  const alarmDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes,
    0,
    0,
  );

  if (alarmDate < now) {
    alarmDate.setDate(alarmDate.getDate() + 1);
  }

  PushNotification.localNotificationSchedule({
    id: id.toString(),
    message: name,
    date: alarmDate,
    playSound: true,
    soundName: Sounds.ringtone1,
    repeatType: 'time',
    actions: ['Stop', 'Leter'],
  });
};

export const TimerNotification = (
  title: string,
  message: string,
  soundName: string,
) => {
  PushNotification.localNotification({
    title: title,
    message: message,
    soundName: soundName,
  });
};

export const cancelAllAlarms = () => {
  PushNotification.cancelAllLocalNotifications();
};
