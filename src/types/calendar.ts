export type NewEventStateType = {
  name: string;
  date: string;
  time: string;
  timeStamp: number;
  allDay: boolean;
  repeat: string;
  reminder: boolean;
  sound: string;
  comment: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minut: number;
  second: number;
  amPM: string;
  stayedDay: number;
  stayedHour: number;
  stayedMinut: number;
  stayedSecond: number;
};

export const NewEventStateInitial: NewEventStateType = {
  name: '',
  date: '',
  time: '',
  timeStamp: 0,
  allDay: false,
  repeat: 'Yearly',
  reminder: false,
  sound: 'Ocean',
  comment: '',
  year: 0,
  month: 0,
  day: 0,
  hour: 0,
  minut: 0,
  second: 0,
  amPM: 'am',
  stayedDay: 0,
  stayedHour: 0,
  stayedMinut: 0,
  stayedSecond: 0,
};

export type DateDataType = {
  year: number;
  month: number;
  day: number;
  timestamp: number;
  dateString: string;
};
