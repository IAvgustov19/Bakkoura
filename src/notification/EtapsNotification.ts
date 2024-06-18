// NotificationService.js

import PushNotification from 'react-native-push-notification';

class NotificationService {
  configure = () => {
    PushNotification.configure({
      // Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('Notification:', notification);
      },
      // Android only: GCM or FCM Sender ID
      senderID: 'YOUR_SENDER_ID',
      // iOS only: Should the initial notification be popped automatically
      popInitialNotification: true,
      // iOS only: Request permissions on iOS (defaults to true)
      requestPermissions: true,
    });
  };

  // Schedule a push notification
  scheduleNotification = (title, message, date) => {
    PushNotification.localNotificationSchedule({
      title: title,
      message: message,
      date: date, // Date object
    });
  };
}

const notificationService = new NotificationService();
export default notificationService;
