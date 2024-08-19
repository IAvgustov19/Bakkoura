import Notifications from '../notification/localPush';
import { db } from '../config/firebase';

export const scheduleNotifications = async (uid) => {
  try {
    const userDoc = await db.collection('etaps').where('uid', '==', uid).get();
    if (userDoc) {
      const userData = userDoc.docs
        .map(doc => doc.data())
        .filter(item => item.control !== 'Stopped' && item.reminder === true);
      userData.forEach(item => {
        const currentDate: any = new Date();
        const fromDate: any = new Date(item.fromDateFormat);
        const timeZoneOffsetInMinutes = currentDate.getTimezoneOffset();
        const timeZoneOffsetInHours = -timeZoneOffsetInMinutes / 60;

        console.log("User's Timezone Offset in Hours:", timeZoneOffsetInHours);

        const targetTime = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          9 + timeZoneOffsetInHours, 6, 0
        );

        let notificationMessage = '';
        const repeatLower = item.repeat.toLowerCase();
        const daysDating = Math.floor((currentDate - fromDate) / (1000 * 60 * 60 * 24));

        switch (repeatLower) {
          case 'daily':
            notificationMessage = `${item.type} with ${item.name}. ${daysDating} days.`;
            Notifications.scheduleNotification(targetTime, notificationMessage, 'day', 24 * 60 * 60 * 1000);
            break;
          case 'monthly':
            notificationMessage = `${item.type} with ${item.name}. ${daysDating} days.`;
            Notifications.scheduleNotification(targetTime, notificationMessage, 'month', 30 * 24 * 60 * 60 * 1000);
            break;
          case 'yearly':
            notificationMessage = `${item.type} with ${item.name}. ${daysDating} days.`;
            Notifications.scheduleNotification(targetTime, notificationMessage, 'year', 365 * 24 * 60 * 60 * 1000);
            break;
          default:
            console.log(`Invalid repeat type for ${item.name}`);
            break;
        }
      });
    } else {
      console.log('User document does not exist');
    }
  } catch (error) {
    console.log('Error fetching user data:', error);
  }
};