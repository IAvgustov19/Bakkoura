import {makeAutoObservable, runInAction} from 'mobx';
import {getCurrentTime} from '../../helper/helper';
import {
  DateDataType,
  NewEventStateInitial,
  NewEventStateType,
} from '../../types/calendar';
import {RepeatData} from '../../utils/repeat';
import {RootStore} from '../rootStore';

export class CalendarStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.updateCalendarCurrentTime();
    this.calculateRemainingTime();
  }

  date = new Date();

  totalTimeSecond = 0;

  allEventsData: NewEventStateType[] = [];
  filteredAllEventsData: NewEventStateType[] = [];
  cloneAllEventsData = this.allEventsData;

  newEventData: NewEventStateType = {...NewEventStateInitial};

  setNewEventState = (
    key: keyof NewEventStateType,
    value: NewEventStateType,
  ) => {
    this.newEventData[key] = value as never;
  };

  calendarCurrentTime = '';

  filterEvents = (data: DateDataType) => {
    if (this.filteredAllEventsData.some(data => data === data)) {
      this.allEventsData = this.cloneAllEventsData;
      this.filteredAllEventsData = [];
    } else {
      this.allEventsData = this.cloneAllEventsData.filter(
        event =>
          event.year === data.year &&
          event.month === data.month &&
          event.day === data.day,
      );
      this.filteredAllEventsData = this.allEventsData;
    }
  };

  addEvents = (calback: () => void) => {
    runInAction(() => {
      if (!this.newEventData.name) return;
      if (
        this.newEventData.hour > 0 ||
        this.newEventData.minut > 0 ||
        (this.newEventData.second > 0 && this.newEventData.day > 0) ||
        this.newEventData.month > 0 ||
        this.newEventData.year > 0
      ) {
        this.allEventsData.push(this.newEventData);
        this.cloneAllEventsData = this.allEventsData;
        this.newEventData = {...NewEventStateInitial};
        calback();
      } else {
        console.log('enter time');
      }
    });
  };

  calculateRemainingTime = () => {
    const currentDate = new Date();

    this.allEventsData.forEach(event => {
      const eventDate = new Date(
        event.year,
        event.month - 1,
        event.day,
        event.hour,
        event.minut,
        event.second,
      );

      if (eventDate > currentDate) {
        const timeDifference = eventDate.getTime() - currentDate.getTime();
        const daysDifference = Math.floor(
          timeDifference / (1000 * 60 * 60 * 24),
        );
        const hoursDifference = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutesDifference = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
        );

        event.stayedDay = daysDifference;
        event.stayedHour = hoursDifference;
        event.stayedMinut = minutesDifference;

        event.stayedHour += Math.floor(event.stayedMinut / 60);
        event.stayedMinut %= 60;
        event.stayedDay += Math.floor(event.stayedHour / 24);
        event.stayedHour %= 24;
      } else {
        event.stayedDay = 0;
        event.stayedHour = 0;
        event.stayedMinut = 0;
      }
    });

    return {
      days: 0,
      hours: 0,
      minutes: 0,
    };
  };

  secondsToHMS = (seconds: number) => {
    if (seconds) {
      const hours: number = Math.floor(seconds / 3600);
      const minutes: number = Math.floor((seconds % 3600) / 60);
      const remainingSeconds: number = seconds % 60;
      return {hours, minutes, remainingSeconds};
    } else {
      return {hours: 0, minutes: 0, remainingSeconds: 0};
    }
  };

  updateCalendarCurrentTime = () => {
    setInterval(() => {
      const currentTime = getCurrentTime();
      runInAction(() => {
        this.calendarCurrentTime = currentTime;
      });
    }, 1000);
  };

  selectedRepeat = {title: 'Yearly'};
  repeatData = RepeatData;

  onSelectRepeat = (index: number) => {
    runInAction(() => {
      this.selectedRepeat = this.repeatData.find((e, i) => i === index);
      this.setNewEventState('repeat', this.selectedRepeat.title as never);
    });
  };

  onRepeatItemPress = index => {
    const newData = this.repeatData.map((item, i) => {
      this.onSelectRepeat(index);
      return {
        ...item,
        active: i === index ? !item.active : false,
      };
    });
    this.repeatData = newData;
  };
}
