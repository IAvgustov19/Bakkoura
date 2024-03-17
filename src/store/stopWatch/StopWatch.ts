import moment from 'moment';
import format from 'format-number-with-string';
import {makeAutoObservable, runInAction} from 'mobx';

export class StopWatchStore {
  constructor() {
    makeAutoObservable(this);
  }

  isRunning: boolean;
  start: boolean = false;
  stop: boolean = false;
  circle: boolean = true;
  startTime: moment.Moment;
  intervalId = null;
  laps: [{id: number; lap: string}] = [] as never;
  second = 0;

  milliseconds: number;
  savedMilliseconds: number;

  maindis = '00 : 00 : 00';

  startStopTimer = () => {
    if (this.start) {
      clearInterval(this.intervalId);
      this.start = false;
      this.stop = true;
      this.circle = false;
    } else {
      this.start = true;
      this.stop = false;
      this.circle = true;
      this.isRunning = true;
      this.startTime = moment() as never;
      this.intervalId = setInterval(() => {
        runInAction(() => {
          if (this.isRunning) {
            this.milliseconds = moment().diff(this.startTime);
            this.second = Math.round(this.milliseconds / 1000);
          }
          this.mainDisplay(this.milliseconds);
        });
      }, 10);
    }
  };

  circleResetTimer = (lap: string) => {
    runInAction(() => {
      if (this.circle) {
        this.laps = [
          {id: this.laps.length + 1, lap: lap},
          ...this.laps,
        ] as never;
        this.stop = true;
        clearInterval(this.intervalId);
        this.start = false;
        this.circle = false;
      } else {
        this.circle = true;
        this.start = false;
        this.stop = false;
        this.isRunning = false;
        this.maindis = '00 : 00 : 00';
        this.second = 0;
        this.startTime = this.startTime;
        this.laps = [] as never;
        clearInterval(this.intervalId);
      }
    });
  };

  mainDisplay = milliseconds => {
    runInAction(() => {
      const tenMilliseconds = parseInt(String(milliseconds / 10), 10);
      const seconds = parseInt(String(tenMilliseconds / 100), 10);
      const minutes = parseInt(String(seconds / 60), 10);
      return (this.maindis = `${format(minutes % 60, '00')} : ${format(
        seconds % 60,
        '00',
      )} : ${format(tenMilliseconds % 100, '00')}`);
    });
  };
}
