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
import {lesSoundsData} from '../../utils/sounds';
import {RootStore} from '../rootStore';

export class AlarmStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.updateAlarmCurrentTime();
    this.fetchAlarmsData();
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
      console.log();
      const alarmToUpdate = this.alarmsListData.find(item => item.id === id);
      console.log(id);
      console.log(this.alarmsListData);
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
    });
  };

  selectedSound = lesSoundsData[2];
  soundData = lesSoundsData;

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
      this.setNewAlarmState('sound', this.selectedSound.title as never);
    });
  };

  onSoundItemPress = index => {
    const newData = this.soundData.map((item, i) => {
      this.onSelectRepeat(index);
      return {
        ...item,
        active: i === index ? !item.active : false,
      };
    });
    this.soundData = newData;
  };
}
