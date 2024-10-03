import {makeAutoObservable, runInAction} from 'mobx';
import {
  createRecurringEvents,
  formatDateType,
  formatDayAndMonth,
  formattedDate,
  generateYearsData,
  getCurrentTime,
  getDayOfYear,
} from '../../helper/helper';
import {
  NewEventStateInitial,
  NewEventStateType,
  RepeatDataType,
} from '../../types/calendar';
import {RepeatData} from '../../utils/repeat';
import {RootStore} from '../rootStore';
import {
  addEventToFirestore,
  deleteEventFromFirestore,
  getEventFromFirestore,
  getEventsFromFirestore,
  updateEventInFirestore,
} from '../../services/firestoreService';
import auth from '@react-native-firebase/auth';
import BackgroundTimer from 'react-native-background-timer';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import RN from '../../components/RN';

import {t} from '../../i18n'

export class CalendarStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
    this.updateCalendarCurrentTime();
    this.filterNearDay();
    this.generateCalendarMonths();
    this.fetchAllEvents();
    BackgroundTimer.setInterval(() => this.calculateRemainingTime(), 10000);
    BackgroundTimer.setInterval(() => this.updateAllEvents(), 300000);
  }

  date = new Date();

  totalTimeSecond = 0;

  allEventsData: NewEventStateType[] = [];
  cloneAllEventsData: NewEventStateType[] = [];

  newEventData: NewEventStateType = {...NewEventStateInitial};

  setNewEventState = (key: keyof NewEventStateType, value: any) => {
    this.newEventData[key] = value as never;
  };

  calendarCurrentTime = '';
  calendarCurrentTime30 = '';
  months = [];

  oneMonth: Date | string;

  nearDay: {day: string; name: string; date: any} = {
    name: `${t('No events yet')}`,
    day:`${t('Today')}`,
    date: '',
  };
  calendarData: any[];

  currentDate = new Date().toISOString().slice(0, 10);
  filterDate = null;

  isUpdate = false;

  switchCalendar = false;

  setSwitchCalendar = () => {
    this.switchCalendar = !this.switchCalendar;
  };

  getOneMonth = (month: string) => {
    runInAction(() => {
      this.oneMonth = month;
      this.filterDate = this.currentDate;
    });
  };

  generateCalendarMonths = () => {
    this.calendarData = generateYearsData();
  };

  filterNearDay = () => {
    const current = new Date().toISOString().slice(0, 10);
    const near = this.cloneAllEventsData.find(item => item.date[0] == current);
    if (near) {
      runInAction(() => {
        this.nearDay.name = near.name;
        this.nearDay.day = formatDayAndMonth(near.day, near.month, near.year);
        this.nearDay.date = formatDateType(near.date[0]);
      });
    } else {
    }
  };

  filterEvents = (date: string) => {
    runInAction(() => {
      this.filterDate = date;
      this.allEventsData = this.cloneAllEventsData.filter((event: any) =>
        event.date.includes(date),
      );
      this.updateAllEvents();
      this.currentDate = date;
    });
  };

  fetchAllEvents = async () => {
    const events = await getEventsFromFirestore();
    runInAction(() => {
      this.allEventsData = events;
      this.cloneAllEventsData = events;
      this.filterNearDay();
      this.updateAllEvents();
      this.calculateRemainingTime();
    });
    if (this.filterDate) {
      this.filterEvents(this.filterDate);
    }
  };

  setAllEvents = () => {
    runInAction(() => {
      this.allEventsData = this.cloneAllEventsData;
      this.filterDate = null;
    });
  };

  addEvents = async (calback?: () => void) => {
    if (!this.isUpdate) {
      const now = Date.now();
      const userId = auth().currentUser.uid;
      this.setNewEventState('uid', userId);
      this.setNewEventState('timeStamp', now as never);
      this.setNewEventState('id', (this.newEventData.name + now) as never);
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
        await addEventToFirestore(this.newEventData);
        runInAction(async () => {
          this.allEventsData = [...this.allEventsData, this.newEventData];
          this.cloneAllEventsData = [
            ...this.cloneAllEventsData,
            this.newEventData,
          ];
          this.newEventData = NewEventStateInitial;
          calback && calback();
          this.filterNearDay();
          this.clearState();
          this.updateAllEvents();
        });
      } else {
        await this.updateEventCalendar(this.newEventData.id);
        calback && calback();
        this.clearState();
      }
    } else {
      this.updateEventCalendar(this.newEventData.id);
      calback();
      this.clearState();
    }
    this.filterNearDay();
  };

  getOneEvent = async (id: string) => {
    const event = await getEventFromFirestore(id);
    if (event) {
      runInAction(() => {
        this.newEventData = event;
        this.isUpdate = true;
        this.selectedRepeat = RepeatData.find(i => i.title === event.repeat);
      });
    }
  };

  handleDeleteEvent = async (id: string) => {
    if (this.filterDate) {
      const event = await getEventFromFirestore(id);
      if (event) {
        runInAction(() => {
          this.newEventData = event;
          this.newEventData.date = this.newEventData.date.filter(
            item => item !== this.filterDate,
          );
        });
      }

      const list = this.cloneAllEventsData.map((item, i) => {
        return item.id === id
          ? {
              ...item,
              ...this.newEventData,
            }
          : item;
      });
      await updateEventInFirestore(id, this.newEventData);
      runInAction(() => {
        this.allEventsData = list;
        this.cloneAllEventsData = list;
      });
    } else {
      await deleteEventFromFirestore(id);
      setTimeout(() => {
        runInAction(() => {
          this.allEventsData = this.cloneAllEventsData.filter(
            item => item.id !== id,
          );
          this.cloneAllEventsData = this.cloneAllEventsData.filter(
            item => item.id !== id,
          );
        });
      }, 200);
    }
    this.filterEvents(this.filterDate);
  };

  updateEventCalendar = async (id: string) => {
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
    runInAction(() => {
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
    });
    const list = this.cloneAllEventsData.map((item, i) => {
      return item.id === id
        ? {
            ...item,
            item: this.newEventData,
          }
        : item;
    });
    await updateEventInFirestore(id, this.newEventData);
    runInAction(() => {
      this.allEventsData = list;
      this.cloneAllEventsData = list;
    });
  };

  clearState = () => {
    runInAction(() => {
      this.newEventData = NewEventStateInitial;
      this.selectedRepeat = RepeatData[2];
      this.isUpdate = false;
    });
  };

  calculateRemainingTime = () => {
    const currentDate = new Date();
    runInAction(() => {
      this.allEventsData.forEach(event => {
        const [year, month, day] = event.date[0].split('-');
        const eventDate = new Date(
          Number(year),
          Number(month) - 1,
          Number(day),
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
    });

    return {
      days: 0,
      hours: 0,
      minutes: 0,
    };
  };

  selectedRepeat: RepeatDataType = RepeatData[2];

  onRepeatItemPress = (index: number) => {
    runInAction(() => {
      this.selectedRepeat = RepeatData.find((e, i) => i === index);
    });
  };

  onSelectRepeat = () => {
    runInAction(() => {
      this.setNewEventState('repeat', this.selectedRepeat.title as never);
    });
  };

  onCancelRepeat = () => {
    runInAction(() => {
      this.selectedRepeat = RepeatData.find(
        e => e.title === this.newEventData.repeat,
      );
    });
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

  updateAllEvents = () => {
    const newDate = Date.now();
    const list = this.cloneAllEventsData.map((item: NewEventStateType) =>
      new Date(item.date[0]).getTime() <= newDate
        ? {
            ...item,
            already: true,
          }
        : item,
    );
    runInAction(() => {
      this.allEventsData = list;
    });
  };

  checkEvent = (eventList: NewEventStateType[]) => {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentDate = now.toISOString().slice(0, 10); // Assuming currentDate is in 'YYYY-MM-DD' format

    eventList.forEach(events => {
      // Check if it's an all-day event, it's 8 AM, and the date matches
      if (
        events.allDay &&
        currentHours === 8 &&
        currentMinutes === 0 &&
        events.date.includes(currentDate)
      ) {
        this.triggerNotification(events);
      }
      // Check for the specific time and date
      else if (
        events.hour === currentHours &&
        events.minut === currentMinutes &&
        events.date.includes(currentDate)
      ) {
        this.triggerNotification(events);
      }
    });
  };

  triggerNotification = async (event: NewEventStateType) => {
    PushNotification.createChannel(
      {
        channelId: event.id as never,
        channelName: 'event Channel',
        playSound: true,
        soundName: event.sound.url,
        importance: Importance.HIGH,
      },
      () => {},
    );

    if (RN.Platform.OS === 'ios') {
      PushNotificationIOS.addNotificationRequest({
        id: event.id,
        title: 'BTS',
        body: event.name,
        sound: event.sound.url,
        category: 'userAction',
      });
    } else {
      PushNotification.localNotification({
        channelId: event.id,
        title: 'BTS',
        message: event.name,
        playSound: true,
        soundName: event.sound.url,
      });
    }
  };
}
