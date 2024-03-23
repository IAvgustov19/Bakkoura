import AlarmScreen from '../../screens/alarm/AlarmScreen';
import BakkouraWatch from '../../screens/bakkouraWatch/BakkouraWatch';
import EventsScreen from '../../screens/calendar/EventsScreen';
import FamilyTree from '../../screens/familyTree/FamilyTree';
import H30Legend from '../../screens/h30Legend/h30Legend';
import HomeScreen from '../../screens/home/HomeScreen';
import JihadBakkoura from '../../screens/jihadBakkoura/JihadBakkoura';
import MarketScreen from '../../screens/market/MarketScreen';
import MessengerScreen from '../../screens/messenger/MessengerScreen';
import Metronome from '../../screens/metronome/Metronome';
import Podcasts from '../../screens/podcasts/Podcasts';
import Pomodoro from '../../screens/pomodoro/Pomodoro';
import ProjectTimer from '../../screens/projectTimer/ProjectTimer';
import StopWatch from '../../screens/stopWatch/StopWatch';
import StressTest from '../../screens/stressTest/StressTest';
import TimeClinic from '../../screens/timeClinic/TimeClinic';
import TimerScreen from '../../screens/timers/TimerScreen';
import TimeTogether from '../../screens/timeTogether/TimeTogether';
import ToDoTimer from '../../screens/todoTimer/ToDoTimer';
import WorldTime from '../../screens/worldTime/WorldTime';
import {APP_ROUTES} from '../routes';

export const bottomTabBarOptions = {
  options: {
    tabBarHideOnKeyboard: true,
    tabBarShowLabel: false,
    headerShown: false,
  },
  list: [
    {
      index: 0,
      tabName: APP_ROUTES.HOME_START,
      component: HomeScreen,
      buttonLabel: 'Home',
    },
    {
      index: 1,
      tabName: APP_ROUTES.MARKET,
      component: MarketScreen,
      buttonLabel: 'Market',
    },
    {
      index: 2,
      tabName: APP_ROUTES.MESSENGER,
      component: MessengerScreen,
      buttonLabel: 'Messenger',
    },
    {
      index: 3,
      tabName: APP_ROUTES.TODOTIMER,
      component: ToDoTimer,
      buttonLabel: 'To do timer',
    },
    {
      index: 4,
      tabName: APP_ROUTES.TIMER,
      component: TimerScreen,
      buttonLabel: 'Timers',
    },
    {
      index: 5,
      tabName: APP_ROUTES.PROJECT_TIMER,
      component: ProjectTimer,
      buttonLabel: 'Project timer',
    },
    {
      index: 6,
      tabName: APP_ROUTES.WORLD_TIME,
      component: WorldTime,
      buttonLabel: 'World time',
    },
    {
      index: 7,
      tabName: APP_ROUTES.STOP_WATCH,
      component: StopWatch,
      buttonLabel: 'Stop watch',
    },
    {
      index: 8,
      tabName: APP_ROUTES.METRONOME,
      component: Metronome,
      buttonLabel: 'Metronome',
    },
    {
      index: 9,
      tabName: APP_ROUTES.STRESS_TEST,
      component: StressTest,
      buttonLabel: 'Stress Test',
    },
    {
      index: 10,
      tabName: APP_ROUTES.POMODORO,
      component: Pomodoro,
      buttonLabel: 'Pomodoro',
    },
    {
      index: 11,
      tabName: APP_ROUTES.ALARM_SCREEN,
      component: AlarmScreen,
      buttonLabel: 'Alarm Clock',
    },
    {
      index: 12,
      tabName: APP_ROUTES.EVENTS_SCREEN,
      component: EventsScreen,
      buttonLabel: 'Calendar',
    },
    {
      index: 13,
      tabName: APP_ROUTES.TIME_TOGETHER,
      component: TimeTogether,
      buttonLabel: 'Time Together',
    },
    {
      index: 14,
      tabName: APP_ROUTES.JIHAD_BAKKOURA,
      component: JihadBakkoura,
      buttonLabel: 'Jihad Bakkoura',
    },
    {
      index: 15,
      tabName: APP_ROUTES.FAMILY_TREE,
      component: FamilyTree,
      buttonLabel: 'Family Tree',
    },
    {
      index: 16,
      tabName: APP_ROUTES.BAKKOURA_WATCH,
      component: BakkouraWatch,
      buttonLabel: 'Bakkoura Watch',
    },
    {
      index: 17,
      tabName: APP_ROUTES.TIME_CLINIC,
      component: TimeClinic,
      buttonLabel: 'Time Clinic',
    },
    {
      index: 18,
      tabName: APP_ROUTES.PODCASTS,
      component: Podcasts,
      buttonLabel: 'Podcasts',
    },
    {
      index: 19,
      tabName: APP_ROUTES.H30_LEGEND,
      component: H30Legend,
      buttonLabel: '30h Legend',
    },
  ],
};
