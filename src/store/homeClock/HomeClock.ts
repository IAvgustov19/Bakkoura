import {makeAutoObservable, runInAction} from 'mobx';
import {
  formatDateTime,
  secondsToHM,
  secondsToHMS,
  secondsToMS,
} from '../../helper/helper';

export class HomeClockStore {
  constructor() {
    makeAutoObservable(this);
    this.getCurrentTime();
  }

  whichWatch = 1;

  newDate = new Date();
  month = this.newDate.getMonth() + 1;
  today = {
    day: `${this.newDate.getDay() === 0 ? '7' : this.newDate.getDate()}`,
    monthYear:
      this.month < 10
        ? `0${this.month}.${this.newDate.getFullYear()}`
        : `${this.month}.${this.newDate.getFullYear()}`,
  };

  homeCurrentTime = {
    hour: 0,
    minut: 0,
    second: 0,
    extraTime: 0,
    hour30: 0,
    second48: 0,
    minut24: 0,
    minut30: 0,
    time24: '00:00:00',
    time30: '00:00:00',
    timeExtra: '00:00',
  };

  changeWatch = (num: number) => {
    this.whichWatch = num;
  };

  getCurrentTime = () => {
    setInterval(() => {
      const newDate = new Date();
      const hour = newDate.getHours();
      const minut = newDate.getMinutes();
      const second = newDate.getSeconds();
      const minutes = hour * 60 + minut;
      const totalSeconds = hour * 3600 + minut * 60 + second;
      const total30 = Math.round(totalSeconds + totalSeconds / 4);
      const timeExtra = Math.round(total30 - totalSeconds);
      runInAction(() => {
        this.homeCurrentTime.hour = (hour * 60 + minut) / 2;
        this.homeCurrentTime.minut = minut * 6;
        this.homeCurrentTime.second = second;
        this.homeCurrentTime.hour30 = (minutes + minutes / 4) / 60;
        this.homeCurrentTime.extraTime = ((hour * 60 + minut) / 4 / 60) * 30;
        this.homeCurrentTime.minut24 = minut;
        this.homeCurrentTime.minut30 = secondsToHMS(total30).slice(
          3,
          5,
        ) as never;
        this.homeCurrentTime.time24 = secondsToHMS(totalSeconds);
        this.homeCurrentTime.time30 = secondsToHMS(total30);
        this.homeCurrentTime.timeExtra = secondsToHM(timeExtra);
        if (this.homeCurrentTime.second48 === 60) {
          this.homeCurrentTime.second48 = 1.25;
        } else {
          this.homeCurrentTime.second48 += 1.25;
        }
      });
    }, 1000);
  };
}
