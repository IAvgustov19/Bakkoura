import {ItemType} from '../components/DataLists/DataLists';
import dayjs from 'dayjs';

export type Mode = 'date' | 'time' | 'datetime';
export type PossibleDaysInMonth = 31 | 30 | 29 | 28;

type Config = {
  numberOfDays?: PossibleDaysInMonth;
  is24Hour?: boolean;
  startYear?: number;
  endYear?: number;
  maximumDate?: Date;
  minimumDate?: Date;
  minuteInterval?: number;
};

export function numberOfDaysIn(
  month: number,
  year: number,
): PossibleDaysInMonth {
  const monthWith30Days = [4, 6, 9, 11];
  let days: PossibleDaysInMonth = 31;
  if (monthWith30Days.includes(month)) {
    days = 30;
  } else if (month === 2) {
    if (_isLeapYear(year)) {
      days = 29;
    } else {
      days = 28;
    }
  }
  return days;
}

export function getData(
  mode: Mode,
  index: -1 | 0 | 1 | 2,
  config: Config = {},
): Array<ItemType> {
  if (index === -1) {
    return _getDatetimeData(config);
  }
  if (mode === 'date') {
    return _getDateData(index, config);
  }
  return _getTimeData(index, config);
}

function _getDatetimeData({
  minimumDate = dayjs().subtract(10, 'day').toDate(),
  maximumDate = dayjs().add(10, 'day').toDate(),
}) {
  const diff = dayjs(maximumDate).diff(minimumDate, 'days') + 1;
  // only MM-DD-YYYY is allowed for parsing date in dayjs
  // https://day.js.org/docs/en/plugin/custom-parse-format
  let startDate = new Date(
    minimumDate.getFullYear(),
    minimumDate.getMonth(),
    minimumDate.getDate(),
  );
  const noOfMilliSecondsInADay = 24 * 60 * 60 * 1000;
  const arr = Array.from({length: diff}, (_, i) => {
    const currentDate = new Date(
      startDate.getTime() + i * noOfMilliSecondsInADay,
    );
    return {
      value: currentDate,
      text: dayjs(currentDate).format('ddd, D MMM'),
      id: `#${i + 1}`,
    };
  });
  return _addEmptySlots(arr);
}

export function _getDateData(
  index: 0 | 1 | 2,
  {
    numberOfDays = 31,
    startYear = 2024,
    endYear = new Date().getFullYear() + 10,
  }: Config,
): Array<ItemType> {
  if (index === 0) {
    switch (numberOfDays) {
      case 31:
        return date31Data;
      case 30:
        return date30Data;
      case 29:
        return date29Data;
      case 28:
        return date28Data;
    }
  } else if (index === 1) {
    return monthData;
  } else {
    return _addEmptySlots(getYearArray(startYear, endYear));
  }
}

export function _getTimeData(
  index: 0 | 1 | 2,
  {is24Hour = false, minuteInterval = 1}: Config,
): Array<ItemType> {
  if (index === 0) {
    return is24Hour ? hour24Data : hour12Data;
  } else if (index === 1) {
    let length = 60;
    let _minuteInterval = 1;
    if (
      typeof minuteInterval === 'number' &&
      minuteInterval >= 1 &&
      minuteInterval <= 60
    ) {
      _minuteInterval = Math.floor(minuteInterval);
      length = 60 / _minuteInterval;
    }

    return _addEmptySlots(
      Array.from({length}, (_, i) => ({
        value: i * _minuteInterval,
        text: ('0' + i * _minuteInterval).slice(-2),
        id: `#${i + 1}`,
      })),
    );
  } else {
    return amPmData;
  }
}

export const generateMinutesList = (minuteInterval: number): ItemType[] => {
  const minutesList: ItemType[] = [];
  for (let i = 0; i < 60; i += minuteInterval) {
    const minute = i < 10 ? `0${i}` : `${i}`;
    minutesList.push({label: 'minute', value: minute} as never);
  }
  return minutesList;
};

function _addEmptySlots(array: Array<ItemType>): Array<ItemType> {
  return [
    {value: -1, text: '', id: '#-1'},
    {value: -2, text: '', id: '#-2'},
    ...array,
    {value: -3, text: '', id: '#-3'},
    {value: -4, text: '', id: '#-4'},
  ];
}

function _isLeapYear(year: number): boolean {
  // If a year is multiple of 400,
  // then it is a leap year
  if (year % 400 === 0) return true;

  // Else If a year is multiple of 100,
  // then it is not a leap year
  if (year % 100 === 0) return false;

  // Else If a year is multiple of 4,
  // then it is a leap year
  if (year % 4 === 0) return true;
  return false;
}

export function _generateArray(limit: number, valueModifier = 0) {
  return Array.from({length: limit}, (_, i) => ({
    value: i + 1 + valueModifier,
    text: ('0' + (i + 1 + valueModifier)).slice(-2),
    id: `#${i + 1}`,
  }));
}

export const getHourArray = (is24Hour: boolean, valueModifier: number = 0) =>
  _generateArray(is24Hour ? 24 : 12, valueModifier);

function getAmPmArray() {
  return ['AM', 'PM'].map((item, index) => ({
    value: index + 1,
    text: item,
    id: item,
  }));
}

function getYearArray(startYear: number, endYear: number) {
  const array = [];
  for (let i = startYear; i <= endYear; i++) {
    array.push({value: i, text: `${i}`, id: `#${i}`});
  }
  return array;
}

function getMonthArray(): Array<ItemType> {
  return [
    {value: 1, text: '01', id: 'January'},
    {value: 2, text: '02', id: 'February'},
    {value: 3, text: '03', id: 'March'},
    {value: 4, text: '04', id: 'April'},
    {value: 5, text: '05', id: 'May'},
    {value: 6, text: '06', id: 'June'},
    {value: 7, text: '07', id: 'July'},
    {value: 8, text: '08', id: 'August'},
    {value: 9, text: '09', id: 'September'},
    {value: 10, text: '10', id: 'October'},
    {value: 11, text: '11', id: 'November'},
    {value: 12, text: '12', id: 'December'},
  ];
}

const getDateArray = () => _generateArray(31);

const hour12Data = _addEmptySlots(getHourArray(false, -1));
const hour24Data = _addEmptySlots(getHourArray(true, -1));
const amPmData = _addEmptySlots(getAmPmArray());

const monthData = _addEmptySlots(getMonthArray());
const tempDateData = getDateArray();
const date31Data = _addEmptySlots(tempDateData);
const date30Data = _addEmptySlots(tempDateData.slice(0, 30));
const date29Data = _addEmptySlots(tempDateData.slice(0, 29));
const date28Data = _addEmptySlots(tempDateData.slice(0, 28));

export function debounce(func: any, wait: number = 500, immediate?: boolean) {
  // 'private' variable for instance
  // The returned function will be able to reference this due to closure.
  // Each call to the returned function will share this common timer.
  let timeout: any;

  // Calling debounce returns a new anonymous function
  return (...args: any) => {
    // reference the context and args for the setTimeout function
    // const context: any = this;
    // args = arguments;

    // Should the function be called now? If immediate is true
    //   and not already in a timeout then the answer is: Yes
    const callNow = immediate && !timeout;

    // This is the basic debounce behaviour where you can call this
    //   function several times, but it will only execute once
    //   [before or after imposing a delay].
    //   Each time the returned function is called, the timer starts over.
    clearTimeout(timeout);

    // Set the new timeout
    timeout = setTimeout(function () {
      // Inside the timeout function, clear the timeout variable
      // which will let the next execution run when in 'immediate' mode
      timeout = null;

      // Check if the function already ran with the immediate flag
      if (!immediate) {
        // Call the original function with apply
        // apply lets you define the 'this' object as well as the arguments
        //    (both captured before setTimeout)
        func(args);
      }
    }, wait);

    // Immediate mode and no wait timer? Execute the function..
    if (callNow) func(args);
  };
}

export function validateDate(date: string, format: string) {
  return dayjs(date, format).format(format) === date;
}
export const matchRegex = (value: string, regex: RegExp) => regex.test(value);
export function validateTime(
  time: string,
  regex = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/,
) {
  return matchRegex(time, regex);
}

export const convertTimeTo24hr = (timeStr: string) => {
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = String(parseInt(hours, 10) + 12);
  }
  return `${hours}:${minutes}`;
};

export const getCurrentTime = () => {
  const now: Date = new Date();
  const hours: number = now.getHours();
  const minutes: number = now.getMinutes();
  const seconds: number = now.getSeconds();
  const formattedHours: string = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
