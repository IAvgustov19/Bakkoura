import AlarmScreen from '../../screens/alarm/AlarmScreen';
import BakkouraWatch from '../../screens/bakkouraWatch/BakkouraWatch';
import EventsScreen from '../../screens/calendar/EventsScreen';
import FamilyTree from '../../screens/familyTree/FamilyTree';
import H30Legend from '../../screens/h30Legend/h30Legend';
import HomeScreen from '../../screens/home/HomeScreen';
import JihadBakkoura from '../../screens/jihadBakkoura/JihadBakkoura';
import MarketScreen from '../../screens/market/MarketScreen';
import MessengerScreen from '../../screens/messenger/MessengerScreen';
import Metronom from '../../screens/metronom/Metronom';
import Podcasts from '../../screens/podcasts/Podcasts';
import Pomodoro from '../../screens/pomodoro/Pomodoro';
import ProjectTimer from '../../screens/projectTimer/ProjectTimer';
import StopWatch from '../../screens/stopWatch/StopWatch';
import StressTest from '../../screens/stressTest/StressTest';
import BtsNavigation from '../../screens/timeBiotic/BtsNavigation';
import ContactUs from '../../screens/timeBiotic/ContactUs';
import SendIdea from '../../screens/timeBiotic/SendIdea';
import TimeBiotic from '../../screens/timeBiotic/TimeBiotic';
import WatchValuation from '../../screens/timeBiotic/WatchValuation';
import AboutTime from '../../screens/timeClinic/AboutTime';
import FrancVila from '../../screens/timeClinic/FrancVila';
import TimeClinic from '../../screens/timeClinic/TimeClinic';
import TimeWealth from '../../screens/timeClinic/TimeWealth';
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
      key: 'home',
    },
    {
      index: 1,
      tabName: APP_ROUTES.MARKET,
      component: MarketScreen,
      buttonLabel: 'Market',
      key: 'market',
    },
    // {
    //   index: 2,
    //   tabName: APP_ROUTES.MESSENGER,
    //   component: MessengerScreen,
    //   buttonLabel: 'Messenger',
    //   key: "messenger"
    // },
    {
      index: 2,
      tabName: APP_ROUTES.TODOTIMER,
      component: ToDoTimer,
      buttonLabel: 'To do timer',
      key: 'todo_timer',
    },
    {
      index: 3,
      tabName: APP_ROUTES.TIMER,
      component: TimerScreen,
      buttonLabel: 'Timers',
      key: 'timers',
    },
    {
      index: 4,
      tabName: APP_ROUTES.PROJECT_TIMER,
      component: ProjectTimer,
      buttonLabel: 'Project timer',
      key: 'project_timer',
    },
    {
      index: 5,
      tabName: APP_ROUTES.WORLD_TIME,
      component: WorldTime,
      buttonLabel: 'World time',
      key: 'world_time',
    },
    {
      index: 6,
      tabName: APP_ROUTES.STOP_WATCH,
      component: StopWatch,
      buttonLabel: 'Stop watch',
      key: 'stop_watch',
    },
    {
      index: 7,
      tabName: APP_ROUTES.METRONOM,
      component: Metronom,
      buttonLabel: 'Metronom',
      key: 'metronome',
    },
    {
      index: 8,
      tabName: APP_ROUTES.STRESS_TEST,
      component: StressTest,
      buttonLabel: 'Stress Test',
      key: 'stress_test',
    },
    {
      index: 9,
      tabName: APP_ROUTES.POMODORO,
      component: Pomodoro,
      buttonLabel: 'Pomodoro',
      key: 'pomodoro',
    },
    {
      index: 10,
      tabName: APP_ROUTES.ALARM_SCREEN,
      component: AlarmScreen,
      buttonLabel: 'Alarm Clock',
      key: 'alarm_clock',
    },
    {
      index: 11,
      tabName: APP_ROUTES.EVENTS_SCREEN,
      component: EventsScreen,
      buttonLabel: 'Calendar',
      key: 'calendar',
    },
    {
      index: 12,
      tabName: APP_ROUTES.TIME_TOGETHER,
      component: TimeTogether,
      buttonLabel: 'Time Together',
      key: 'time_together',
    },
    {
      index: 13,
      tabName: APP_ROUTES.JIHAD_BAKKOURA,
      component: JihadBakkoura,
      buttonLabel: 'Jihad Bakkoura',
      key: 'jihad_bakkoura',
    },
    // {
    //   index: 15,
    //   tabName: APP_ROUTES.FAMILY_TREE,
    //   component: FamilyTree,
    //   buttonLabel: 'Family Tree',
    //   key: 'family_tree',
    // },
    {
      index: 14,
      tabName: APP_ROUTES.BAKKOURA_WATCH,
      component: BakkouraWatch,
      buttonLabel: 'Bakkoura Watch',
      key: 'bakkoura_watch',
    },
    {
      index: 15,
      tabName: APP_ROUTES.TIME_CLINIC,
      component: TimeClinic,
      buttonLabel: 'Time Clinic',
      key: 'time_clinic',
    },
    // {
    //   index: 17,
    //   tabName: APP_ROUTES.PODCASTS,
    //   component: Podcasts,
    //   buttonLabel: 'Podcasts',
    //   key: 'podcasts',
    // },
    {
      index: 16,
      tabName: APP_ROUTES.H30_LEGEND,
      component: H30Legend,
      buttonLabel: '30h Legend',
      key: '30h_legend',
    },
    {
      index: 17,
      tabName: APP_ROUTES.WATCH_VALUATION,
      component: WatchValuation,
      buttonLabel: 'Assessment Watch',
      key: 'assessment_watch',
    },
    {
      index: 18,
      tabName: APP_ROUTES.SEND_IDEA,
      component: SendIdea,
      buttonLabel: 'Send Your Idea',
      key: 'send_your_idea',
    },
    {
      index: 19,
      tabName: APP_ROUTES.TIME_BIOTIC,
      component: TimeBiotic,
      buttonLabel: 'Time Biotic',
      key: 'time_biotic',
    },
    {
      index: 20,
      tabName: APP_ROUTES.ABOUT_TIME,
      component: AboutTime,
      buttonLabel: 'About Time',
      key: 'about_time',
    },
    {
      index: 21,
      tabName: APP_ROUTES.FRANS_VILA,
      component: FrancVila,
      buttonLabel: 'Francvila Watch',
      key: 'frankvila_watch',
    },
    {
      index: 22,
      tabName: APP_ROUTES.CONTACT_US,
      component: ContactUs,
      buttonLabel: 'Contact Us',
      key: 'contact_us',
    },
    {
      index: 23,
      tabName: APP_ROUTES.BTS_NAVIGATION,
      component: BtsNavigation,
      buttonLabel: 'BTS Navigation',
      key: 'bts_navigation',
    },
    {
      index: 24,
      tabName: APP_ROUTES.TIME_WEALTH,
      component: TimeWealth,
      buttonLabel: 'Time Wealth',
      key: 'time_wealth',
    },
  ],
};
