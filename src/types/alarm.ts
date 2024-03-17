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
