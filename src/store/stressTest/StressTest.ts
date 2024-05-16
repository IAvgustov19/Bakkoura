import {makeAutoObservable, runInAction} from 'mobx';
import {secondsToHMS} from '../../helper/helper';
import {RootStore} from '../rootStore';

type stressTestData = {
  seconds: 0;
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
    seconds: 0,
    time: '',
  };

  stressTimeInterval = null;

  setStressTestTime = () => {
    this.stressTimeInterval = setInterval(() => {
      runInAction(() => {
        this.stressTestData.seconds++;
        this.stressTestData.time = secondsToHMS(this.stressTestData.seconds);
      });
    }, 1000);
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
        seconds: 0,
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
