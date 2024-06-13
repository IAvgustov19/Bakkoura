import React, {FC} from 'react';
import {ImageSourcePropType} from 'react-native';
import {SvgProps} from 'react-native-svg';
import {ConstructorSvgs} from '../assets/constructor/index';

export type SelectedCountriesType = {
  id: string;
  capital: string;
  name: {common: string};
  time: string;
  date: string;
  hour: number;
  minut: number;
  hour30: number;
  minut30: string;
  timezones: string;
};

export const SelectedCountriesInitial: SelectedCountriesType = {
  id: '',
  capital: '',
  name: {common: ''},
  time: '',
  date: '',
  hour: 0,
  minut: 0,
  timezones: '',
  hour30: 0,
  minut30: '',
};

export type StopWatchType = {
  ms: number;
  time: string;
};

export const StopWatchInitial = {
  ms: 0,
  time: '',
};

export type ConstructorWatchType = {
  bodyTypes: React.FC<SvgProps>;
  faceTypes: React.FC<SvgProps>;
  backStyles: React.FC<SvgProps>;
  numbers: React.FC<SvgProps>;
  options: React.FC<SvgProps> | ImageSourcePropType | string;
  arrows: React.FC<SvgProps>;
};

export const ConstructorWatchInitial: ConstructorWatchType = {
  bodyTypes: ConstructorSvgs.bodyType1,
  faceTypes: null,
  backStyles: null,
  numbers: null,
  options: null,
  arrows: null,
};
