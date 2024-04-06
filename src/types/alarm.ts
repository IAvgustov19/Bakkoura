export type AlarmListsItemType = {
  id: number;
  name: string;
  description: string;
  time: string;
  hours: string | number;
  minutes: string | number;
  isActive: boolean;
  repeat: string;
  sound: string;
  leter: boolean;
};

export const AlarmListsItemInitial: AlarmListsItemType = {
  id: 0,
  name: 'Alarm',
  time: '',
  hours: '',
  minutes: '',
  description: 'No description',
  isActive: true,
  repeat: 'never',
  sound: 'Tik-Tak',
  leter: false,
};

export type ProjectTimerDataType = {
  id: number;
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
  id: number;
  name: string;
  description: string;
  finishTime: string;
  minut: number;
  second: number;
  time: string;
  hour: string;
  breackType: string;
};

export const PomodoroDataInitial: PomodoroDataType = {
  id: 0,
  name: '',
  description: '',
  finishTime: '00:00',
  second: 0,
  minut: 15,
  time: '00:00',
  hour: '0',
  breackType: '',
};

export type TogetherDataType = {
  id: number;
  name: string;
  type: string;
  fromDate: string;
  reminder: boolean;
  control: string;
  time: string;
  days: string;
  timeStamp: number;
};

export const TogetherDataInitial = {
  id: 0,
  name: '',
  type: 'Dating',
  fromDate: '0',
  reminder: false,
  control: 'Stopped',
  time: '0',
  days: '0',
  timeStamp: 0,
};

export type SelectListDataType = {
  id: number;
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
  id: 0,
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
};

export const MetronomDataInitial: MetronomDataType = {
  countMinut: 100,
  oneWithoutSound: false,
  beatCount: 100,
  etap: 1,
};

export type TodoTimerDataType = {
  id: number;
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
};
export const TodoTimerDataInitial: TodoTimerDataType = {
  id: 0,
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
};
