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
  is30h?: boolean;
  is48m?: boolean;
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
  {is24Hour = false, minuteInterval = 1, is30h = false, is48m = false}: Config,
): Array<ItemType> {
  if (index === 0) {
    return is24Hour ? hour24Data : hour12Data;
  } else if (index === 1) {
    let minuteLength = is48m ? 48 : 60;

    let _minuteInterval = 1;
    if (
      typeof minuteInterval === 'number' &&
      minuteInterval >= 1 &&
      minuteInterval <= minuteLength
    ) {
      _minuteInterval = Math.floor(minuteInterval);
      minuteLength = minuteLength / _minuteInterval;
    }

    return _addEmptySlots(
      Array.from({length: minuteLength}, (_, i) => ({
        value: i * _minuteInterval,
        text: ('0' + i * _minuteInterval).slice(-2),
        id: `#${i + 1}`,
      })),
    );
  } else if (index === 2) {
    return is30h ? hour30Data : hour24Data;
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

export const get30HourArray = (is24Hour: boolean, valueModifier: number = 0) =>
  _generateArray(is24Hour ? 24 : 30, valueModifier);

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
function PriceArray(): Array<ItemType> {
  const arr = [];
  for (let index = 0; index <= 100; index++) {
    const element = {value: index, text: `${index}`, id: `${index}`};
    arr.push(element);
  }
  return arr;
}

const getDateArray = () => _generateArray(31);

const hour12Data = _addEmptySlots(getHourArray(false, -1));
const hour24Data = _addEmptySlots(getHourArray(true, -1));
const hour30Data = _addEmptySlots(get30HourArray(false, -1));
const amPmData = _addEmptySlots(getAmPmArray());

export const priceData = _addEmptySlots(PriceArray());
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
export const secondsToHM = (seconds: number) => {
  if (seconds > 0) {
    const hours: number = Math.floor(seconds / 3600);
    const minutes: number = Math.floor((seconds % 3600) / 60);
    // const remainingSeconds: number = seconds % 60;
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }`;
  } else {
    return '00:00';
  }
};
export const getCurrentTime30and24 = (index: number) => {
  const now: Date = new Date();
  const hours: number = now.getHours();
  const minutes: number = now.getMinutes();
  const seconds: number = now.getSeconds();
  const totalSeconds = hours * 3600 + minutes + 60 + seconds;
  const totalSeconds30 = totalSeconds + totalSeconds / 4;

  if (index === 24) {
    return secondsToHM(totalSeconds);
  } else {
    return secondsToHM(totalSeconds30);
  }
};

export function formatDayVaMonth(day: number, month: number, year: number) {
  const monthData = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'oktober',
    'november',
    'december',
  ];

  const today = new Date().getDay();
  const Month = new Date().getMonth();

  if (day === today && Month + 1 === month) {
    return 'Today';
  } else {
    const today = day;
    const month = monthData[Month];
    return `${today}-${month}`;
  }
}

export const formatDate = (timestamp: number) => {
  var currentDate = new Date();
  var givenDate = new Date(timestamp);
  var oneDay = 24 * 60 * 60 * 1000;

  var currentDay = Date.UTC(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );
  var givenDay = Date.UTC(
    givenDate.getFullYear(),
    givenDate.getMonth(),
    givenDate.getDate(),
  );

  var dayDifference = Math.round((currentDay - givenDay) / oneDay);

  if (dayDifference === 0) {
    return 'Today';
  } else if (dayDifference === 1) {
    return 'Yesterday';
  } else if (dayDifference > 1) {
    var day: any = givenDate.getDate();
    var month: any = givenDate.getMonth() + 1;
    var year = givenDate.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return year + '-' + month + '-' + day;
  }
};

export const formatDateTime = (timestamp: number) => {
  if (timestamp > 0) {
    var givenDate = new Date(timestamp);
    var hours = givenDate.getHours().toString().padStart(2, '0');
    var minutes = givenDate.getMinutes().toString().padStart(2, '0');
    var seconds = givenDate.getSeconds().toString().padStart(2, '0');

    return hours + ':' + minutes + ':' + seconds;
  } else {
    return '00' + ':' + '00' + ':' + '00';
  }
};

export const secondsToHMS = (seconds: number) => {
  if (seconds > 0) {
    const hours: number = Math.floor(seconds / 3600);
    const minutes: number = Math.floor((seconds % 3600) / 60);
    const remainingSeconds: number = seconds % 60;
    return `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  } else {
    return '00:00:00';
  }
};
export const secondsToMS = (seconds: number) => {
  if (seconds > 0) {
    const minutes: number = Math.floor((seconds % 3600) / 60);
    const remainingSeconds: number = seconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds
    }`;
  } else {
    return '00:00';
  }
};

export const hoursSecondsToS = (hour: number, minut: number) => {
  let sekund = hour * 3600 + minut * 60;
  return sekund;
};

export const formattedTime = (
  hours: number,
  minutes: number,
  seconds?: number,
) => {
  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }${seconds ? `:${seconds < 10 ? `0${seconds}` : seconds}` : ''}`;
};

export const formattedDate = (
  day: number | Date,
  month: number | Date,
  year: number | Date,
  index?: number,
) => {
  let date = '';
  switch (index) {
    case 0:
      date = `${day < 10 ? `0${day}` : day}/${
        month < 10 ? `0${month}` : month
      }/${year}`;
      break;
    case 1:
      date = `${day < 10 ? `0${day}` : day}-${
        month < 10 ? `0${month}` : month
      }-${year}`;
      break;
    case 2:
      date = `${day < 10 ? `0${day}` : day}.${
        month < 10 ? `0${month}` : month
      }.${year}`;
    case 3:
      date = `${year}-${month < 10 ? `0${month}` : month}-${
        day < 10 ? `0${day}` : day
      }`;
      break;
    default:
      date = `${day < 10 ? `0${day}` : day}/${
        month < 10 ? `0${month}` : month
      }/${year}`;
      break;
  }
  return date;
};

export const diagonalTime = (startTime: string, endTime: string) => {
  // Parsing start and end times
  let startHours = parseInt(startTime.substring(0, 2));
  let startMinutes = parseInt(startTime.substring(3));
  let endHours = parseInt(endTime.substring(0, 2));
  let endMinutes = parseInt(endTime.substring(3));

  // Calculating the difference between start and end times
  let hourDifference = endHours - startHours;
  let minuteDifference = endMinutes - startMinutes;

  // Adjusting for cases where the end time is earlier than the start time
  if (hourDifference < 0) {
    hourDifference = 12 + hourDifference;
  }

  // Adjusting minutes
  if (minuteDifference < 0) {
    minuteDifference = 60 + minuteDifference;
    hourDifference--; // Reduce one hour
  }

  // Returning the result
  return {
    hours: Math.abs(hourDifference),
    minutes: Math.abs(minuteDifference),
  };
};

export const toMonthName = (dateString: string) => {
  let number = new Date(dateString).getMonth() + 1;
  switch (number) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
    default:
      return "Noma'lum";
  }
};

export const getCalendarArray = (year: any) => {
  const months = [];
  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthArray = [];
    for (let day = 1; day <= daysInMonth; day++) {
      monthArray.push(new Date(year, month, day));
    }
    months.push(monthArray);
  }
  return months;
};

export const generateYearsData = () => {
  const yearsData = [];
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year <= currentYear + 1; year++) {
    const monthsData = [];
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const lastDayOfMonth = new Date(year, month, daysInMonth);

      // Avtomatik joy vaqtini olish
      const offset = lastDayOfMonth.getTimezoneOffset();
      const offsetHours = Math.abs(Math.floor(offset / 60))
        .toString()
        .padStart(2, '0');
      const offsetMinutes = Math.abs(offset % 60)
        .toString()
        .padStart(2, '0');
      const sign = offset < 0 ? '+' : '-';
      const timeZoneString = `T00:00:00.000${sign}${offsetHours}:${offsetMinutes}`;

      const monthString = `${year}-${(month + 1)
        .toString()
        .padStart(2, '0')}-${daysInMonth
        .toString()
        .padStart(2, '0')}${timeZoneString}`;
      monthsData.push(monthString);
    }
    yearsData.push({year: year.toString(), months: monthsData});
  }
  return yearsData;
};
