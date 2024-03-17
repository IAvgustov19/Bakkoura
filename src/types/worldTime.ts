export type SelectedCountriesType = {
  id: number;
  capital: string;
  name: {common: string};
  time: string;
  date: string;
  hour: number;
  minut: number;
  timezones: string;
};

export const SelectedCountriesInitial: SelectedCountriesType = {
  id: 0,
  capital: '',
  name: {common: ''},
  time: '',
  date: '',
  hour: 0,
  minut: 0,
  timezones: '',
};

export type StopWatchType = {
  ms: number;
  time: string;
};

export const StopWatchInitial = {
  ms: 0,
  time: '',
};
