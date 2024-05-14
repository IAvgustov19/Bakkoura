import {makeAutoObservable} from 'mobx';
import {createContext} from 'react';
import {AlarmStore} from './alarm/Alarm';
import {AuthStore} from './auth/authStore';
import {BakkouraWatchStore} from './bakkouraWatch/BakkouraWatch';
import {CalendarStore} from './calendar/Calendar';
import {HomeClockStore} from './homeClock/HomeClock';
import {MarketStore} from './market/Market';
import {MetronomStore} from './metronom/Metronom';
import {PomodoroStore} from './pomodoro/Pomodoro';
import {ProjectTimer} from './projectTimer/ProjectTimer';
import {StopWatchStore} from './stopWatch/StopWatch';
import {StressTestStore} from './stressTest/StressTest';
import {TimerStore} from './timer/Timer';
import {TodoTimerStore} from './todoTimer/ToDoTimer';
import {TogetherTimeStore} from './togetherTime/TogethetTime';
import {VisibleStore} from './visible/Visible';
import {WorldTimeStore} from './worldTime/WorldTime';
import { PersonalAreaStore } from './personalArea/PersonalArea';

export class RootStore {
  timerStore: TimerStore;
  calendarStore: CalendarStore;
  authStore: AuthStore;
  stressTestStore: StressTestStore;
  alarmStore: AlarmStore;
  worldTimeStore: WorldTimeStore;
  stopWatchStore: StopWatchStore;
  projectTimer: ProjectTimer;
  pomodoroStore: PomodoroStore;
  togetherTimeStore: TogetherTimeStore;
  bakkouraWatchStore: BakkouraWatchStore;
  metronomStore: MetronomStore;
  visibleStore: VisibleStore;
  todoTimer: TodoTimerStore;
  homeClockStore: HomeClockStore;
  marketStore: MarketStore;
  personalAreaStore: PersonalAreaStore;

  constructor() {
    makeAutoObservable(this);
    this.timerStore = new TimerStore(this);
    this.calendarStore = new CalendarStore(this);
    this.authStore = new AuthStore(this);
    this.stressTestStore = new StressTestStore(this);
    this.alarmStore = new AlarmStore(this);
    this.worldTimeStore = new WorldTimeStore(this);
    this.stopWatchStore = new StopWatchStore();
    this.projectTimer = new ProjectTimer(this);
    this.pomodoroStore = new PomodoroStore();
    this.togetherTimeStore = new TogetherTimeStore(this);
    this.bakkouraWatchStore = new BakkouraWatchStore();
    this.metronomStore = new MetronomStore();
    this.visibleStore = new VisibleStore(this);
    this.todoTimer = new TodoTimerStore();
    this.homeClockStore = new HomeClockStore();
    this.marketStore = new MarketStore();
    this.personalAreaStore = new PersonalAreaStore();
  }
}
const rootStore = new RootStore();

export default createContext(rootStore);
