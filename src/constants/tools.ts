import { Images } from '../assets';
import {APP_ROUTES} from '../navigation/routes';
import {ImageSourcePropType} from 'react-native';

export type ToolsListType = {
  id: number;
  image: any;
  title: string;
  navigate: string;
  isbtn: boolean;
};

export const ToolsList: ToolsListType[] = [
  {
    id: 1,
    image: Images.Svg.pomodoroIcon,
    title: 'Pomodoro',
    navigate: APP_ROUTES.POMODORO,
    isbtn: false,
  },
  {
    id: 2,
    image: Images.Svg.alarmIcon,
    title: 'Alarm Clock',
    navigate: APP_ROUTES.ALARM_SCREEN,
    isbtn: false,
  },
  {
    id: 3,
    image: Images.Svg.metronomIcon,
    title: 'Metronom',
    navigate: APP_ROUTES.METRONOM,
    isbtn: false,
  },
  {
    id: 4,
    image: Images.Svg.timeTogetherIcon,
    title: 'Time Together',
    navigate: APP_ROUTES.TIME_TOGETHER,
    isbtn: false,
  },
  {
    id: 5,
    image: Images.Svg.todoIcon,
    title: 'To-do timer',
    navigate: APP_ROUTES.TODOTIMER,
    isbtn: false,
  },
  {
    id: 6,
    image: Images.Svg.timerIcon,
    title: 'Timers',
    navigate: APP_ROUTES.TIMER,
    isbtn: false,
  },
  {
    id: 7,
    image: Images.Svg.projectTimerIcon,
    title: 'Project Timer',
    navigate: APP_ROUTES.PROJECT_TIMER,
    isbtn: false,
  },
  {
    id: 8,
    image: Images.Svg.worldTimeIcon,
    title: 'World Time',
    navigate: APP_ROUTES.WORLD_TIME,
    isbtn: false,
  },
  {
    id: 9,
    image: Images.Svg.stopWatchIcon,
    title: 'Stop Watch',
    navigate: APP_ROUTES.STOP_WATCH,
    isbtn: false,
  },
  {
    id: 10,
    image: Images.Svg.stressTest,
    title: 'Stress Test',
    navigate: APP_ROUTES.STRESS_TEST,
    isbtn: false,
  },
  {
    id: 11,
    image: Images.Svg.calendarIcon,
    title: 'Calendar',
    navigate: APP_ROUTES.EVENTS_SCREEN,
    isbtn: false,
  },
  {
    id: 12,
    image: Images.Svg.bakkuraWatchIcon,
    title: 'Bakkoura Watch',
    navigate: APP_ROUTES.BAKKOURA_WATCH,
    isbtn: false,
  },
];
