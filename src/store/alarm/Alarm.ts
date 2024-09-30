import {
  addAlarmToFirestore,
  deleteAlarmFromFirestore,
  getAlarmsFromFirestore,
  updateAlarmInFirestore,
} from '../../services/firestoreService';
import auth from '@react-native-firebase/auth';
import {makeAutoObservable, runInAction} from 'mobx';
import {getCurrentTime30and24} from '../../helper/helper';
import {AlarmListsItemInitial, AlarmListsItemType} from '../../types/alarm';
import {WeekRepeatData} from '../../utils/repeat';
import {SoundsData} from '../../utils/sounds';
import {RootStore} from '../rootStore';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import RN from '../../components/RN';
import {Platform} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from '../../i18n';

export class AlarmStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.updateAlarmCurrentTime();
    this.fetchAlarmsData();
    this.fetchActiveAlarm();

    PushNotification.configure({
      onAction: notification => {
        const alarmId = notification.userInfo.id;
        const alarm = this.alarmState.find(a => a.id === alarmId);

        if (notification.action === 'Stop') {
          this.handleStopAction(alarm);
          console.log('stop');
        } else if (notification.action === 'Later') {
          this.handleLaterAction(alarm);
          console.log('later');
        }
      },
      requestPermissions: Platform.OS === 'ios',
    });

    if (Platform.OS === 'ios') {
      PushNotificationIOS.setNotificationCategories([
        {
          id: 'userAction',
          actions: [
            {id: 'Stop', title: `${t("Stop")}`, options: {foreground: true}},
            {id: 'Later', title: `${t("Later")}`, options: {foreground: true}},
          ],
        },
      ]);
    }
  }

  alarmsListData: AlarmListsItemType[] = [];

  alarmItemData: AlarmListsItemType = AlarmListsItemInitial;

  alarmCurrentTime24 = '00:00';
  alarmCurrentTime30 = '00:00';

  updateAlarmCurrentTime = () => {
    setInterval(() => {
      const currentTime24 = getCurrentTime30and24(24);
      const currentTime30 = getCurrentTime30and24(30);
      runInAction(() => {
        this.alarmCurrentTime24 = currentTime24;
        this.alarmCurrentTime30 = currentTime30;
      });
    }, 10000);
  };

  setNewAlarmState = (key: keyof AlarmListsItemType, value: any) => {
    runInAction(() => {
      this.alarmItemData[key] = value as never;
    });
  };

  createAlarm = async () => {
    const userId = auth().currentUser.uid;
    this.setNewAlarmState('uid', userId);
    runInAction(() => {
      this.setNewAlarmState('id', this.alarmItemData.name + Date.now());
    });
    if (this.alarmItemData.time) {
      this.alarmsListData = [...this.alarmsListData, this.alarmItemData];
      await addAlarmToFirestore(this.alarmItemData);
      this.clearAlarmItemData();
    }
  };

  setTime = () => {
    const time = `${this.alarmItemData.hours}:${this.alarmItemData.minutes}`;
    this.setNewAlarmState('time', time);
    this.setNewAlarmState('id', this.alarmItemData.name + Date.now());
  };

  handleDeleteAlarm = async (id: number | string) => {
    try {
      await deleteAlarmFromFirestore(id);
      runInAction(() => {
        this.alarmsListData = this.alarmsListData.filter(
          item => item.id !== id,
        );
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchAlarmsData = async () => {
    try {
      const alarms = await getAlarmsFromFirestore();
      runInAction(() => {
        this.alarmsListData = alarms;
      });
    } catch (error) {
      console.error('Error loading alarms from Firestore:', error);
    }
  };

  handleInactiveAlarm = async (id: number | string) => {
    try {
      const alarmToUpdate = this.alarmsListData.find(item => item.id === id);
      if (!alarmToUpdate) {
        throw new Error('Alarm not found.');
      }

      const updatedAlarm = {
        ...alarmToUpdate,
        isActive: !alarmToUpdate.isActive,
      };
      await updateAlarmInFirestore(id, updatedAlarm); // Update the alarm in Firestore

      runInAction(() => {
        this.alarmsListData = this.alarmsListData.map(item =>
          item.id === id ? updatedAlarm : item,
        );
      });
    } catch (error) {
      console.error('Error updating alarm in Firestore:', error);
    }
  };

  clearAlarmItemData = () => {
    runInAction(() => {
      this.alarmItemData = AlarmListsItemInitial;
      this.selectedRepeat = [...this.alarmItemData.repeat];
    });
  };

  selectedSound = SoundsData[2];
  soundData = SoundsData;

  selectedRepeat = [...this.alarmItemData.repeat];
  weekRepeatData = WeekRepeatData;

  onSelectRepeat = (type: string) => {
    runInAction(() => {
      if (this.selectedRepeat.includes(type)) {
        this.selectedRepeat = this.selectedRepeat.filter(e => e !== type);
      } else {
        this.selectedRepeat = [...this.selectedRepeat, type];
      }
      if (this.selectedRepeat.length > 1) {
        this.selectedRepeat = this.selectedRepeat.filter(e => e !== 'Never');
      }
      if (type === 'Never') {
        this.selectedRepeat = ['Never'];
      }
      if (this.selectedRepeat.length === 0) {
        this.selectedRepeat = ['Never'];
      }
    });
  };
  onRepeatOkPress = () => {
    runInAction(() => {
      this.setNewAlarmState('repeat', this.selectedRepeat);
    });
  };

  onRepeatCancelPress = () => {
    runInAction(() => {
      this.setNewAlarmState('repeat', this.alarmItemData.repeat);
    });
  };

  onSelectSound = (index: number) => {
    runInAction(() => {
      this.selectedSound = this.soundData.find((e, i) => i === index);
      this.setNewAlarmState('sound', this.selectedSound);
    });
  };

  onSoundItemPress = index => {
    const newData = this.soundData.map((item, i) => {
      this.onSelectSound(index);
      return {
        ...item,
        active: i === index ? !item.active : false,
      };
    });
    this.soundData = newData;
  };

  ALARM_RING_DURATION = 15 * 60 * 1000;
  LATER_DURATION = 5 * 60 * 1000;

  timeout;
  laterTimeout;
  activeAlarm: AlarmListsItemType | null = null;
  alarmState;
  isRing = false;

  fetchActiveAlarm = async () => {
    try {
      const alarmJson = await AsyncStorage.getItem('activeAlarm');
      if (alarmJson !== null) {
        const alarm = JSON.parse(alarmJson);
        runInAction(() => {
          this.activeAlarm = alarm;
        });
      }
    } catch (error) {
      console.error('Error fetching activeAlarm from AsyncStorage:', error);
    }
  };

  checkAlarms = (alarmsListData: AlarmListsItemType[]) => {
    this.alarmState = alarmsListData;
    const now = new Date();
    const currentDay = now.toLocaleString('en-US', {weekday: 'long'});
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();

    alarmsListData.forEach(alarm => {
      if (
        alarm.isActive &&
        alarm.laterHours == currentHours &&
        alarm.laterMinutes == currentMinutes &&
        (alarm.repeat.includes(currentDay) || alarm.repeat.includes('Never')) &&
        (!this.activeAlarm || this.activeAlarm.id !== alarm.id)
      ) {
        this.triggerNotification(alarm);
      }
    });
  };

  triggerNotification = async (alarm: AlarmListsItemType) => {
    if (alarm.isActive) {
      runInAction(() => {
        this.activeAlarm = alarm;
      });

      // Save activeAlarm to AsyncStorage
      try {
        await AsyncStorage.setItem('activeAlarm', JSON.stringify(alarm));
      } catch (error) {
        console.error('Error saving activeAlarm to AsyncStorage:', error);
      }
      const alarmChannelid = String(Date.now());
      PushNotification.createChannel(
        {
          channelId: alarmChannelid,
          channelName: 'Alarm Channel',
          playSound: true,
          soundName: alarm.sound.url,
          importance: Importance.HIGH,
          vibrate: alarm.vibration,
        },
        () => {},
      );

      if (RN.Platform.OS === 'ios') {
        PushNotificationIOS.addNotificationRequest({
          id: alarmChannelid,
          title: 'BTS',
          body: alarm.name,
          sound: alarm.sound.url,
          category: 'userAction',
        });
      } else {
        PushNotification.localNotification({
          channelId: alarmChannelid,
          title: 'BTS',
          message: alarm.name,
          playSound: true,
          soundName: alarm.sound.url,
          actions: [`${t("Stop")}`, `${t("Later")}`],
          userInfo: {id: alarm.id},
          autoCancel: false,
          vibrate: alarm.vibration,
        });
      }

      if (alarm.repeat.includes('Never')) {
        this.handleInactiveAlarm(alarm.id);
      }
      runInAction(() => {
        this.isRing = true;
      });

      this.timeout = BackgroundTimer.setTimeout(() => {
        this.handleLaterAction(alarm);
      }, this.ALARM_RING_DURATION);
    }
  };

  handleStopAction = async (alarm: AlarmListsItemType) => {
    BackgroundTimer.clearTimeout(this.timeout);
    BackgroundTimer.clearTimeout(this.laterTimeout);
    runInAction(() => {
      this.isRing = false;
    });
    PushNotification.removeAllDeliveredNotifications();
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications();
    }
    if (alarm.repeat.includes('Never')) {
      this.handleInactiveAlarm(alarm.id);
    }
    const updatedAlarm = {
      ...alarm,
      laterHours: this.activeAlarm?.hours,
      laterMinutes: this.activeAlarm?.minutes,
    };

    await updateAlarmInFirestore(this.activeAlarm.id, updatedAlarm);
    runInAction(() => {
      this.activeAlarm = updatedAlarm;
    });
    runInAction(() => {
      this.activeAlarm = null;
    });
    try {
      await AsyncStorage.removeItem('activeAlarm');
    } catch (error) {
      console.error('Error removing activeAlarm from AsyncStorage:', error);
    }
  };

  handleLaterAction = async (alarm: AlarmListsItemType) => {
    BackgroundTimer.clearTimeout(this.timeout);
    runInAction(() => {
      this.isRing = false;
    });
    PushNotification.removeAllDeliveredNotifications();
    if (Platform.OS === 'ios') {
      PushNotificationIOS.removeAllDeliveredNotifications();
    }

    // Update alarm time in Firestore
    const newMinutes = Number(alarm.laterMinutes) + 5;
    const newHours = newMinutes >= 60 ? Number(alarm.hours) + 1 : alarm.hours;
    const updatedMinutes = newMinutes % 60;

    const updatedAlarm = {
      ...alarm,
      laterHours: newHours,
      laterMinutes: updatedMinutes,
    };

    await updateAlarmInFirestore(this.activeAlarm.id, updatedAlarm);
    runInAction(() => {
      this.activeAlarm = updatedAlarm;
    });
    // Update activeAlarm in AsyncStorage
    try {
      await AsyncStorage.setItem('activeAlarm', JSON.stringify(updatedAlarm));
    } catch (error) {
      console.error('Error updating activeAlarm in AsyncStorage:', error);
    }

    this.laterTimeout = BackgroundTimer.setTimeout(() => {
      this.triggerNotification(updatedAlarm);
    }, this.LATER_DURATION);
  };
}
