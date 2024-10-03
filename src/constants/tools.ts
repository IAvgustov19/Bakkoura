import {Images} from '../assets';
import {APP_ROUTES} from '../navigation/routes';
import {ImageSourcePropType} from 'react-native';

import {t} from '../i18n'

export type ToolsListType = {
  id: number;
  image: any;
  title: string;
  navigate: string;
  isbtn: boolean;
  key: string;
};

export const ToolsList: ToolsListType[] = [
  {
    id: 1,
    image: Images.Svg.pomodoroIcon,
    title: `${t('Pomodoro')}`,
    navigate: APP_ROUTES.POMODORO,
    isbtn: false,
    key: 'pomodoro',
  },
  {
    id: 2,
    image: Images.Svg.alarmIcon,
    title: `${t('Alarm Clock')}`,
    navigate: APP_ROUTES.ALARM_SCREEN,
    isbtn: false,
    key: 'alarm',
  },
  {
    id: 3,
    image: Images.Svg.metronomIcon,
    title:`${t('Metronom')}`,
    navigate: APP_ROUTES.METRONOM,
    isbtn: false,
    key: 'metronom',
  },
  {
    id: 4,
    image: Images.Svg.timeTogetherIcon,
    title: `${t('Time Together')}`,
    navigate: APP_ROUTES.TIME_TOGETHER,
    isbtn: false,
    key: 'timeTogether',
  },
  {
    id: 5,
    image: Images.Svg.todoIcon,
    title: `${t('To-do Timer')}`,
    navigate: APP_ROUTES.TODOTIMER,
    isbtn: false,
    key: 'todoTimer',
  },
  {
    id: 6,
    image: Images.Svg.timerIcon,
    title: `${t('Timer')}`,
    navigate: APP_ROUTES.TIMER,
    isbtn: false,
    key: 'timers',
  },
  {
    id: 7,
    image: Images.Svg.projectTimerIcon,
    title: `${t('Project Timer')}`,
    navigate: APP_ROUTES.PROJECT_TIMER,
    isbtn: false,
    key: 'prTimer',
  },
  {
    id: 8,
    image: Images.Svg.worldTimeIcon,
    title: `${t('World Time')}`,
    navigate: APP_ROUTES.WORLD_TIME,
    isbtn: false,
    key: 'wrTime',
  },
  {
    id: 9,
    image: Images.Svg.stopWatchIcon,
    title: `${t('Stopwatch')}`,
    navigate: APP_ROUTES.STOP_WATCH,
    isbtn: false,
    key: 'stWatch',
  },
  {
    id: 10,
    image: Images.Svg.stressTest,
    title: `${t('Stress Test')}`,
    navigate: APP_ROUTES.STRESS_TEST,
    isbtn: false,
    key: 'stressTest',
  },
  {
    id: 11,
    image: Images.Svg.calendarIcon,
    title: `${t('Calendar')}`,
    navigate: APP_ROUTES.EVENTS_SCREEN,
    isbtn: false,
    key: 'calendar',
  },
  {
    id: 12,
    image: Images.Svg.bakkuraWatchIcon,
    title: `${t('Bakkoura Watch')}`,
    navigate: APP_ROUTES.BAKKOURA_WATCH,
    isbtn: false,
    key: 'bakkouraWatch',
  },
];
