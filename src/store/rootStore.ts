import {makeAutoObservable} from 'mobx';
import {createContext} from 'react';
import {AlarmStore} from './alarm/Alarm';
import {AuthStore} from './auth/authStore';
import {CalendarStore} from './calendar/Calendar';
import {StopWatchStore} from './stopWatch/StopWatch';
import {StressTestStore} from './stressTest/StressTest';
import {TimerStore} from './timer/Timer';
import {WorldTimeStore} from './worldTime/WorldTime';

export class RootStore {
  timerStore: TimerStore;
  calendarStore: CalendarStore;
  authStore: AuthStore;
  stressTestStore: StressTestStore;
  alarmStore: AlarmStore;
  worldTimeStore: WorldTimeStore;
  stopWatchStore: StopWatchStore;

  constructor() {
    makeAutoObservable(this);
    this.timerStore = new TimerStore(this);
    this.calendarStore = new CalendarStore(this);
    this.authStore = new AuthStore(this);
    this.stressTestStore = new StressTestStore(this);
    this.alarmStore = new AlarmStore(this);
    this.worldTimeStore = new WorldTimeStore(this);
    this.stopWatchStore = new StopWatchStore();
  }
}
const rootStore = new RootStore();

export default createContext(rootStore);
