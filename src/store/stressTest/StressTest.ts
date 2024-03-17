import {makeAutoObservable, runInAction} from 'mobx';
import {RootStore} from '../rootStore';

type stressTestData = {
  timeStamp: 0;
  time: string;
};

export class StressTestStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  stressTestStatus = {
    start: false,
    reset: false,
    stop: false,
    finished: false,
  };

  stressTestData: stressTestData = {
    timeStamp: 0,
    time: '',
  };

  stressTimeInterval = null;

  setStressTestTime = () => {
    this.stressTimeInterval = setInterval(() => {
      this.setTime();
      runInAction(() => {
        this.stressTestData.timeStamp++;
      });
    }, 1000);
  };

  setTime = () => {
    const hours = Math.floor(this.stressTestData.timeStamp / 3600);
    const minutes = Math.floor((this.stressTestData.timeStamp % 3600) / 60);
    const seconds = this.stressTestData.timeStamp % 60;
    this.stressTestData.time = `${hours < 10 ? `0${hours}` : hours}:${
      minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  stopStressTestTime = () => {
    runInAction(() => {
      clearInterval(this.stressTimeInterval);
    });
  };

  resetStressTimer = () => {
    runInAction(() => {
      this.inActive('reset');
      this.inActive('stop');
      this.inActive('start');
      this.inActive('finished');
      clearInterval(this.stressTimeInterval);
      this.clearStressTimerData();
    });
  };

  clearStressTimerData = () => {
    runInAction(() => {
      this.stressTestData = {
        timeStamp: 0,
        time: '',
      };
    });
  };

  finishStressTest = () => {
    this.inActive('stop');
    this.inActive('start');
    this.active('finished');
    clearInterval(this.stressTimeInterval);
  };

  startStopStressTest = () => {
    if (this.stressTestStatus.start) {
      this.active('stop');
      this.stopStressTestTime();
      this.inActive('start');
    } else {
      this.active('start');
      this.inActive('stop');
      this.setStressTestTime();
      this.active('reset');
    }
  };

  active = (key: keyof typeof this.stressTestStatus) => {
    this.stressTestStatus[key] = true;
  };
  inActive = (key: keyof typeof this.stressTestStatus) => {
    this.stressTestStatus[key] = false;
  };
  toggle = (key: keyof typeof this.stressTestStatus) => {
    this.stressTestStatus[key] = !this.stressTestStatus[key];
  };
}
