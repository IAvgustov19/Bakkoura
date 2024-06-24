import React, {useEffect} from 'react';
import {Platform, AppState} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import BackgroundTimer from 'react-native-background-timer';
import {AlarmListsItemType} from '../types/alarm';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('notification', notification);
  },
  onAction: action => {
    const alarmId = action?.userInfo.id;
    const alarm = alarmsData.find(a => a.id === alarmId);
    console.log('action', action);
    if (action.action === 'Stop') {
      handleStopAction(alarmId);
    } else if (action.action === 'Later') {
      handleLaterAction(alarm);
    }
  },

  requestPermissions: Platform.OS === 'ios',
});

const ALARM_RING_DURATION = 15 * 60 * 1000;
const LATER_DURATION = 5 * 60 * 1000;

let timeout;
let alarmsData;

export const checkAlarms = (alarms: AlarmListsItemType[]) => {
  alarmsData = alarms;
  const now = new Date();
  const currentDay = now.toLocaleString('en-US', {weekday: 'long'});
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  //   console.log('alarms', alarms);

  alarms.forEach(alarm => {
    if (
      alarm.isActive &&
      alarm.hours == currentHours &&
      alarm.minutes == currentMinutes &&
      alarm.repeat.includes(currentDay)
    ) {
      triggerNotification(alarm);
    }
  });
};

export const triggerNotification = (alarm: AlarmListsItemType) => {
  PushNotification.createChannel(
    {
      channelId: alarm.id as never,
      channelName: 'Alarm Channel',
      playSound: true,
      soundName: alarm.sound.url,
      importance: Importance.HIGH,
    },
    () => {},
  );

  if (Platform.OS === 'ios') {
    PushNotificationIOS.addNotificationRequest({
      id: alarm.id,
      title: alarm.name,
      body: alarm.description || 'Alarm',
      sound: alarm.sound.url,
      category: 'userAction',
    });
  } else {
    PushNotification.localNotification({
      channelId: alarm.id,
      title: alarm.name,
      message: alarm.name,
      playSound: true,
      soundName: alarm.sound.url,
      actions: ['Stop', 'Later'],
      userInfo: {id: alarm.id},
      autoCancel: false,
    });
  }

  timeout = BackgroundTimer.setTimeout(() => {
    handleLaterAction(alarm);
  }, ALARM_RING_DURATION);
};

const handleStopAction = (alarmId: string) => {
  BackgroundTimer.clearTimeout(timeout);
  PushNotification.cancelLocalNotifications({id: alarmId});
  PushNotificationIOS.removePendingNotificationRequests([alarmId]);
};

const handleLaterAction = (alarm: AlarmListsItemType) => {
  BackgroundTimer.clearTimeout(timeout);
  PushNotification.cancelLocalNotifications({id: alarm.id});
  PushNotificationIOS.removePendingNotificationRequests([alarm.id]);

  setTimeout(() => {
    triggerNotification(alarm);
  }, LATER_DURATION);
};
