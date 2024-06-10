import {makeAutoObservable, runInAction} from 'mobx';
import {
  createRecurringEvents,
  formatDate,
  formatDayVaMonth,
  formattedDate,
  generateYearsData,
  getCalendarArray,
  getCurrentTime,
  getDayOfYear,
} from '../../helper/helper';
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
    this.filterNearDay();
    this.generateCalendarMonths();
    setInterval(() => this.updateAllEvents(), 300000);
  }

  date = new Date();

  totalTimeSecond = 0;

  allEventsData: NewEventStateType[] = [];
  cloneAllEventsData: NewEventStateType[] = [];

  newEventData: NewEventStateType = {...NewEventStateInitial};

  setNewEventState = (
    key: keyof NewEventStateType,
    value: NewEventStateType,
  ) => {
    this.newEventData[key] = value as never;
  };

  calendarCurrentTime = '';
  calendarCurrentTime30 = '';
  months = [];

  oneMonth: Date | string;

  nearDay: {day: string; name: string; date: string} = {
    name: 'No events yet',
    day: 'Today',
    date: '',
  };
  calendarData: any[];

  currentDate = new Date().toISOString().slice(0, 10);

  isUpdate = false;

  switchCalendar = false;

  setSwitchCalendar = () => {
    this.switchCalendar = !this.switchCalendar;
  };

  getOneMonth = (month: string) => {
    runInAction(() => {
      this.oneMonth = month;
    });
  };

  generateCalendarMonths = () => {
    this.calendarData = generateYearsData();
  };

  filterNearDay = () => {
    const day = new Date().getDay();
    const near = this.allEventsData.find(item => day <= item.day);
    if (near) {
      runInAction(() => {
        this.nearDay.name = near.name;
        this.nearDay.day = formatDayVaMonth(near.day, near.month, near.year);
        this.nearDay.date = near.date[0];
      });
    } else {
    }
  };

  filterEvents = (date: string) => {
    this.allEventsData = this.cloneAllEventsData.filter(event =>
      event.date.some(item => item === (date as never)),
    );
    this.updateAllEvents();
    this.currentDate = date;
  };

  setAllEvents = () => {
    runInAction(() => {
      this.allEventsData = this.cloneAllEventsData;
    });
  };

  addEvents = (calback?: () => void) => {
    if (!this.isUpdate) {
      const now = Date.now();
      this.setNewEventState('timeStamp', now as never);
      this.setNewEventState('id', (this.allEventsData.length + 1) as never);
      runInAction(() => {
        if (!this.newEventData.name) return;
        if (
          this.newEventData.day > 0 ||
          this.newEventData.month > 0 ||
          this.newEventData.year > 0
        ) {
          let occurrences = 1;
          if (this.newEventData.repeat.toLowerCase() === 'never') {
            occurrences = 1;
          } else if (this.newEventData.repeat.toLowerCase() === 'daily') {
            occurrences = 732 - getDayOfYear(this.newEventData.date[0]);
          } else if (this.newEventData.repeat.toLowerCase() === 'monthly') {
            occurrences = 25 - this.newEventData.month;
          } else if (this.newEventData.repeat.toLowerCase() === 'yearly') {
            occurrences = 2;
          }

          this.newEventData.date = createRecurringEvents(
            formattedDate(
              this.newEventData.day,
              this.newEventData.month,
              this.newEventData.year,
              3,
            ),
            this.newEventData.repeat.toLowerCase(),
            occurrences,
          );
          this.allEventsData = [...this.allEventsData, this.newEventData];
          this.cloneAllEventsData = this.allEventsData;
          this.newEventData = NewEventStateInitial;
          if (calback) calback();
          this.filterNearDay();
          this.clearState();
          this.updateAllEvents();
        } else {
          console.log('enter time');
        }
      });
    } else {
      this.updateEventCalendar(this.newEventData.id);
      calback();
      this.clearState();
    }
  };

  getOneEvent = (data: NewEventStateType) => {
    runInAction(() => {
      this.newEventData = data;
      this.isUpdate = true;
    });
  };

  handleDeleteEvent = (id: number) => {
    setTimeout(() => {
      runInAction(() => {
        this.allEventsData = this.allEventsData.filter(item => item.id !== id);
        this.cloneAllEventsData = this.cloneAllEventsData.filter(
          item => item.id !== id,
        );
      });
    }, 200);
  };

  updateEventCalendar = (id: number) => {
    let occurrences = 1;
    if (this.newEventData.repeat.toLowerCase() === 'never') {
      occurrences = 1;
    } else if (this.newEventData.repeat.toLowerCase() === 'daily') {
      occurrences = 732 - getDayOfYear(this.newEventData.date[0]);
    } else if (this.newEventData.repeat.toLowerCase() === 'monthly') {
      occurrences = 24 - this.newEventData.month;
    } else if (this.newEventData.repeat.toLowerCase() === 'yearly') {
      occurrences = 2;
    }

    this.newEventData.date = createRecurringEvents(
      formattedDate(
        this.newEventData.day,
        this.newEventData.month,
        this.newEventData.year,
        3,
      ),
      this.newEventData.repeat.toLowerCase(),
      occurrences,
    );
    const list = this.allEventsData.map((item, i) => {
      return i === id
        ? {
            ...item,
            item: this.newEventData,
          }
        : item;
    });
    runInAction(() => {
      this.allEventsData = list;
    });
  };

  clearState = () => {
    this.newEventData = NewEventStateInitial;
    this.isUpdate = false;
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

  updateAllEvents = () => {
    const newDate = Date.now();
    const list = this.allEventsData.map((item, i) => {
      return new Date(item.date[0]).getTime() <= newDate
        ? {
            ...item,
            already: true,
          }
        : item;
    });
    runInAction(() => {
      this.allEventsData = list;
    });
  };
}
