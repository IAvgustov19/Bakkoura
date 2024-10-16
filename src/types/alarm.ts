import {SoundsData} from '../utils/sounds';

export type AlarmListsItemType = {
  uid: string;
  id: string;
  name: string;
  description: string;
  time: string;
  hours: string | number;
  minutes: string | number;
  isActive: boolean;
  repeat: string[];
  sound: {id: number; title: string; url: string; active: boolean};
  leter: boolean;
  vibration: boolean;
  dateTime: Date;
  isRing: boolean;
  laterHours: string | number;
  laterMinutes: string | number;
};

export const AlarmListsItemInitial: AlarmListsItemType = {
  uid: '',
  id: '',
  name: 'Alarm',
  time: '',
  hours: '',
  minutes: '',
  description: 'No description',
  isActive: true,
  repeat: ['Never'],
  sound: SoundsData[2],
  leter: false,
  vibration: true,
  dateTime: new Date(),
  isRing: false,
  laterHours: '',
  laterMinutes: '',
};

export type ProjectTimerDataType = {
  uid: string;
  id: number | string;
  title: string;
  description: string;
  date: string;
  time: string;
  workTime: string;
  price: string;
  paid: boolean;
  second: number;
  play: boolean;
  active: boolean;
  totalPrice: string;
  totalTime: string;
  secondInterval: any;
  timestamp: number;
};

export const ProjectTimerDataInitial: ProjectTimerDataType = {
  id: 0,
  uid: '',
  title: '',
  description: '',
  date: '',
  time: '00:00:00',
  workTime: '00:00:00',
  price: '0',
  paid: false,
  second: 0,
  play: false,
  active: false,
  totalPrice: '0',
  totalTime: '00:00:00',
  secondInterval: null,
  timestamp: 0,
};

export type PomodoroDataType = {
  uid: string;
  id: number | string;
  name: string;
  description: string;
  finishTime: string;
  minut: number;
  second: number;
  time: string;
  hour: string;
  breackType: string;
  estimatedPomodoros: number;
  estimatedHours: number;
  totalCycle: number;
};

export const PomodoroDataInitial: PomodoroDataType = {
  uid: '',
  id: 0,
  name: '',
  description: '',
  finishTime: '00:00',
  second: 0,
  minut: 1,
  time: '00:00',
  hour: '0',
  breackType: '',
  estimatedPomodoros: 0,
  estimatedHours: 0,
  totalCycle: 1,
};

export type TogetherDataType = {
  uid: string;
  id: string;
  name: string;
  type: string;
  fromDate: string;
  fromDateFormat: string;
  reminder: boolean;
  control: string;
  time: string;
  synchronized: boolean;
  synchronizedEmail: string;
  repeat: string;
  days: string;
  timeStamp: number;
};

export const TogetherDataInitial = {
  uid: '',
  id: '',
  name: '',
  type: 'Dating',
  fromDate: '0',
  fromDateFormat: '0',
  reminder: false,
  control: 'Start',
  repeat: 'never',
  synchronized: false,
  synchronizedEmail: '',
  time: '0',
  days: '0',
  timeStamp: 0,
};

export type SelectListDataType = {
  uid: string;
  id: string;
  name: string;
  color: string;
  fromHour: number;
  fromMin: number;
  toHour: number;
  toMin: number;
  start: number;
  end: number;
};

export const SelectListDataInitial: SelectListDataType = {
  uid: '',
  id: '',
  name: '',
  color: '',
  fromHour: 0,
  fromMin: 0,
  toHour: 0,
  toMin: 0,
  start: 0,
  end: 0,
};

export type MetronomDataType = {
  countMinut: number;
  oneWithoutSound: boolean;
  beatCount: number;
  etap: number;
  etapCount: number;
  etapLine: number;
};

export const MetronomDataInitial: MetronomDataType = {
  countMinut: 100,
  oneWithoutSound: false,
  beatCount: 100,
  etap: 1,
  etapCount: 4,
  etapLine: 1,
};
type DailyUsageType = {
  date: string; // ISO formatidagi sana
  hours: number; // Soatlar
  minutes: number; // Daqiqalar
  seconds: number; // Soniyalar
  timestamp: number; // Umumiy ishlatilgan vaqt (soniyalarda)
};

export type TodoTimerDataType = {
  uid: string;
  id: string;
  key: string;
  name: string;
  goal: string;
  time: string;
  seconds: number;
  startTime: number;
  endTime: number;
  hours: number;
  minutes: number;
  totalTime: string;
  secondInterval: any;
  timestamp: number;
  play: boolean;
  date: number;
  dailyUsage: DailyUsageType[];
};
export const TodoTimerDataInitial: TodoTimerDataType = {
  uid: '',
  id: '',
  key: '',
  name: '',
  goal: '',
  time: '',
  seconds: 0,
  startTime: 0,
  endTime: 0,
  hours: 0,
  minutes: 0,
  totalTime: '00:00:00',
  secondInterval: null,
  timestamp: 0,
  play: false,
  date: 0,
  dailyUsage: [],
};

export type ToDoTaskNameDataType = {
  id: number;
  title: string;
  key: string;
};

export type TimerValueType = {
  hours: number;
  minut: number;
  second: number;
  time: string;
  totalSeconds: number;
  sound: object;
};

export const TimerValueInitial: TimerValueType = {
  hours: 0,
  minut: 0,
  second: 0,
  time: '00:00:00',
  totalSeconds: 0,
  sound: {name: '', url: ''},
};
