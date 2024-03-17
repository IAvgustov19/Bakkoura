import {makeAutoObservable, runInAction} from 'mobx';
import {AlarmListsItemInitial, AlarmListsItemType} from '../../types/alarm';
import {WeekRepeatData} from '../../utils/repeat';
import {lesSoundsData, SoundsData} from '../../utils/sounds';
import {RootStore} from '../rootStore';

export class AlarmStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  alarmsListData: AlarmListsItemType[] = [];

  alarmItemData: AlarmListsItemType = AlarmListsItemInitial;

  setNewAlarmState = (key: keyof AlarmListsItemType, value: any) => {
    runInAction(() => {
      this.alarmItemData[key] = value as never;
    });
  };

  createAlarm = () => {
    if (this.alarmItemData.time) {
      this.alarmsListData = [...this.alarmsListData, this.alarmItemData];
      this.clearAlarmItemData();
    }
  };

  setTime = () => {
    const time = `${this.alarmItemData.hours}:${this.alarmItemData.minutes}`;
    this.setNewAlarmState('time', time);
    this.setNewAlarmState('id', this.alarmsListData.length + 1);
  };

  handleDeleteAlarm = id => {
    setTimeout(() => {
      runInAction(() => {
        this.alarmsListData = this.alarmsListData.filter(
          item => item.id !== id,
        );
      });
    }, 200);
  };

  handleInactiveAlarm = index => {
    runInAction(() => {
      this.alarmsListData = this.alarmsListData.map((item, i) => {
        return i === index
          ? {
              ...item,
              isActive: !item.isActive,
            }
          : item;
      });
    });
  };
  clearAlarmItemData = () => {
    runInAction(() => {
      this.alarmItemData = AlarmListsItemInitial;
    });
  };

  selectedSound = {title: AlarmListsItemInitial.sound};
  soundData = lesSoundsData;

  selectedRepeat = {title: AlarmListsItemInitial.repeat};
  weekRepeatData = WeekRepeatData;

  onSelectRepeat = (index: number) => {
    runInAction(() => {
      this.selectedRepeat = this.weekRepeatData.find((e, i) => i === index);
      this.setNewAlarmState('repeat', this.selectedRepeat.title as never);
    });
  };

  onRepeatItemPress = index => {
    runInAction(() => {
      this.weekRepeatData = this.weekRepeatData.map((item, i) => {
        return i === index
          ? {
              ...item,
              repeat: `${[...item.title, item.title].join(',')}`,
            }
          : item;
      });
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
