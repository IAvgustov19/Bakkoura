import PushNotification from 'react-native-push-notification';

class Notifications {
  constructor() {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        // console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      popInitialNotification: true,
      requestPermissions: false,
    });

    PushNotification.createChannel(
      {
        channelId: 'reminders', // (required)
        channelName: 'Task reminder notifications', // (required)
        channelDescription: 'Reminder for any tasks',
      },
      () => {},
    );

    PushNotification.getScheduledLocalNotifications(rn => {
    //   console.log('SN --- ', rn);
    });
  }

  scheduleNotification(date, message, repeatType, repeatTime) {
    PushNotification.localNotificationSchedule({
      channelId: 'reminders',
      title: '🔔 Reminder!',
      message,
      date,
      repeatType,
      repeatTime,
    });
  }
}

export default new Notifications();
