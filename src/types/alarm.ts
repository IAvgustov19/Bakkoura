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
