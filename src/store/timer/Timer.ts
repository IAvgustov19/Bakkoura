import {makeAutoObservable, runInAction} from 'mobx';
import {getCurrentTime, secondsToHMS} from '../../helper/helper';
import {SoundsData} from '../../utils/sounds';
import {RootStore} from '../rootStore';
import Sound from 'react-native-sound';
import {TimerNotification} from '../../notification/Notification';
import {Sounds} from '../../assets';
import BackgroundTimer from 'react-native-background-timer';

Sound.setCategory('Playback');

type firstTimerValueType = {
  hours: number;
  minut: number;
  second: number;
  time: string;
};

type secondTimerValueType = {
  hours: number;
  minut: number;
  second: number;
  time: string;
};

const TimerValueInitial = {
  hours: 0,
  minut: 0,
  second: 0,
  time: '00:00:00',
};

export class TimerStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  timerStatus = {
    isFirst: true,
    start: false,
    stop: false,
    pausa: false,
    reset: false,
    continue: false,
    back: true,
    forward: false,
    h30: false,
    h24: true,
    work: false,
    rest: false,
    finished: false,
    soundsVisible: false,
  };

  currentTime: string;

  firstIsRunning = false;

  secondIsRunning = false;

  firstDecreaseInterval = null;
  firstIncreaseInterval = null;

  secondDecreaseInterval = null;
  secondIncreaseInterval = null;

  percentage = 100;
  increasePercentage = 0;

  totalDurationSeconds = 0;

  firstTimerValue: secondTimerValueType = TimerValueInitial;

  firstTimerTime: secondTimerValueType = TimerValueInitial;

  secondTimerValue: secondTimerValueType = TimerValueInitial;
  secondTimerTime: secondTimerValueType = TimerValueInitial;

  getFinishedTime = (timerValue: firstTimerValueType) => {
    const now: Date = new Date();
    let hours: number = now.getHours();
    let minutes: number = now.getMinutes();
    let seconds: number = now.getSeconds();

    if (seconds + timerValue.second >= 60) {
      minutes += 1;
      seconds = seconds += timerValue.second - 60;
    } else {
      seconds += timerValue.second;
    }

    if (minutes + timerValue.minut >= 60) {
      hours += 1;
      minutes = minutes + timerValue.minut - 60;
    } else {
      minutes += timerValue.minut;
    }

    if (hours + timerValue.hours >= 24) {
      hours = hours += timerValue.hours - 24;
    } else {
      hours += timerValue.hours;
    }

    const formattedHours: string = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes: string =
      minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds: string =
      seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  playSound = (soundName: string) => {
    const sound = new Sound(soundName, error => {
      if (error) {
        console.log('error', error);
        return;
      }
      sound.play(success => {
        if (!success) {
          console.log('no work');
        }
        sound.release();
      });
    });
  };

  updateCurrentTime = (time: string) => {
    runInAction(() => {
      this.currentTime = time;
    });
  };

  setFirstTimer = (key: keyof firstTimerValueType, value: any) => {
    this.firstTimerValue[key] = value as never;
  };

  setAllTime = () => {
    this.firstTimerValue.time = secondsToHMS(
      this.firstTimerValue.hours * 3600 +
        this.firstTimerValue.minut * 60 +
        this.firstTimerValue.second,
    );
    this.firstTimerTime.time = secondsToHMS(
      this.firstTimerTime.hours * 3600 +
        this.firstTimerTime.minut * 60 +
        this.firstTimerTime.second,
    );
    this.secondTimerValue.time = secondsToHMS(
      this.secondTimerValue.hours * 3600 +
        this.secondTimerValue.minut * 60 +
        this.secondTimerValue.second,
    );
    this.secondTimerTime.time = secondsToHMS(
      this.secondTimerTime.hours * 3600 +
        this.secondTimerTime.minut * 60 +
        this.secondTimerTime.second,
    );
  };

  startFirstDecreaseTimer = () => {
    this.updateCurrentTime(this.getFinishedTime(this.firstTimerValue));
    this.firstDecreaseInterval = BackgroundTimer.setInterval(() => {
      runInAction(() => {
        if (this.firstTimerValue.second > 0) {
          this.firstTimerValue.second--;
        } else {
          if (this.firstTimerValue.minut > 0) {
            this.firstTimerValue.minut--;
            this.firstTimerValue.second = 59;
          } else {
            if (this.firstTimerValue.hours > 0) {
              this.firstTimerValue.hours--;
              this.firstTimerValue.minut = 59;
              this.firstTimerValue.second = 59;
            } else {
              BackgroundTimer.clearInterval(this.firstDecreaseInterval);
              this.active('finished');
              this.inActive('start');
              this.playSound(Sounds.ringtone1);
              TimerNotification('BTS', 'Timer', Sounds.ringtone1);
            }
          }
        }
        this.setAllTime();
      });
    }, 1000);
  };

  increaseFirstTimerValues = () => {
    this.updateCurrentTime(this.getFinishedTime(this.firstTimerValue));
    this.firstIncreaseInterval = BackgroundTimer.setInterval(() => {
      runInAction(() => {
        if (
          this.firstTimerTime.hours < this.firstTimerValue.hours ||
          (this.firstTimerTime.hours === this.firstTimerValue.hours &&
            this.firstTimerTime.minut < this.firstTimerValue.minut) ||
          (this.firstTimerTime.hours === this.firstTimerValue.hours &&
            this.firstTimerTime.minut === this.firstTimerValue.minut &&
            this.firstTimerTime.second < this.firstTimerValue.second)
        ) {
          this.firstTimerTime.second++;
          if (this.firstTimerTime.second >= 60) {
            this.firstTimerTime.second = 0;
            this.firstTimerTime.minut++;
            if (this.firstTimerTime.minut >= 60) {
              this.firstTimerTime.minut = 0;
              this.firstTimerTime.hours++;
              if (this.firstTimerTime.hours >= 24) {
                BackgroundTimer.clearInterval(this.firstIncreaseInterval);
                this.active('finished');
                this.inActive('start');
              }
            }
          }
        } else {
          BackgroundTimer.clearInterval(this.firstIncreaseInterval);
          this.active('finished');
          this.inActive('start');
        }
        this.setAllTime();
      });
      BackgroundTimer.clearInterval(this.firstDecreaseInterval);
    }, 1000);
  };

  StartStopFirstTimer = () => {
    if (this.timerStatus.start) {
      this.active('stop');
      BackgroundTimer.clearInterval(this.firstDecreaseInterval);
      BackgroundTimer.clearInterval(this.firstIncreaseInterval);
      this.firstIsRunning = false;
      this.inActive('start');
    } else if (
      this.firstTimerValue.hours ||
      this.firstTimerValue.minut ||
      this.firstTimerValue.second > 0
    ) {
      this.active('start');
      this.active('reset');
      this.inActive('stop');
      this.inActive('finished');
      if (this.timerStatus.back) {
        this.startFirstDecreaseTimer();
      } else {
        this.increaseFirstTimerValues();
      }
    } else return;
  };

  setSecondTimer = (key: keyof secondTimerValueType, value: any) => {
    this.secondTimerValue[key] = value as never;
    this.setAllTime();
  };

  startSecondDecreaseTimer = () => {
    this.updateCurrentTime(this.getFinishedTime(this.secondTimerValue));
    this.secondDecreaseInterval = BackgroundTimer.setInterval(() => {
      this.calculatePercentage();
      runInAction(() => {
        if (this.secondTimerValue.second > 0) {
          this.secondTimerValue.second--;
        } else {
          if (this.secondTimerValue.minut > 0) {
            this.secondTimerValue.minut--;
            this.secondTimerValue.second = 59;
          } else {
            if (this.secondTimerValue.hours > 0) {
              this.secondTimerValue.hours--;
              this.secondTimerValue.minut = 59;
              this.secondTimerValue.second = 59;
            } else {
              BackgroundTimer.clearInterval(this.secondDecreaseInterval);
              this.active('finished');
              this.inActive('start');
              this.totalDurationSeconds = 0;
              this.percentage = 100;
            }
          }
        }
        this.setAllTime();
      });
    }, 1000);
  };

  increaseSecondTimerValues = () => {
    this.updateCurrentTime(this.getFinishedTime(this.secondTimerValue));
    this.secondIncreaseInterval = BackgroundTimer.setInterval(() => {
      this.calculateIncreasePercentage();
      runInAction(() => {
        if (
          this.secondTimerTime.hours < this.secondTimerValue.hours ||
          (this.secondTimerTime.hours === this.secondTimerValue.hours &&
            this.secondTimerTime.minut < this.secondTimerValue.minut) ||
          (this.secondTimerTime.hours === this.secondTimerValue.hours &&
            this.secondTimerTime.minut === this.secondTimerValue.minut &&
            this.secondTimerTime.second < this.secondTimerValue.second)
        ) {
          this.secondTimerTime.second++;
          if (this.secondTimerTime.second >= 60) {
            this.secondTimerTime.second = 0;
            this.secondTimerTime.minut++;
            if (this.secondTimerTime.minut >= 60) {
              this.secondTimerTime.minut = 0;
              this.secondTimerTime.hours++;
              if (this.secondTimerTime.hours >= 24) {
                BackgroundTimer.clearInterval(this.secondIncreaseInterval);
                this.active('finished');
                this.inActive('start');
              }
            }
          }
        } else {
          BackgroundTimer.clearInterval(this.secondIncreaseInterval);
          this.active('finished');
          this.inActive('start');
        }
        this.setAllTime();
      });
      BackgroundTimer.clearInterval(this.secondDecreaseInterval);
    }, 1000);
  };

  startStopSecondTimer = () => {
    if (this.timerStatus.finished) {
      this.resetTimer();
    } else {
      if (this.timerStatus.start) {
        this.active('stop');
        BackgroundTimer.clearInterval(this.secondDecreaseInterval);
        BackgroundTimer.clearInterval(this.secondIncreaseInterval);
        this.secondIsRunning = false;
        this.inActive('start');
      } else if (
        this.secondTimerValue.hours ||
        this.secondTimerValue.minut ||
        this.secondTimerValue.second > 0
      ) {
        // this.calculateRemainingTime();
        this.active('start');
        this.active('reset');
        this.inActive('stop');
        this.inActive('finished');
        if (this.timerStatus.back) {
          this.startSecondDecreaseTimer();
          this.calculatePercentage();
        } else {
          this.calculateIncreasePercentage();
          this.increaseSecondTimerValues();
        }
      } else return;
    }
  };

  calculatePercentage = () => {
    const totalSeconds =
      this.secondTimerValue.hours * 3600 +
      this.secondTimerValue.minut * 60 +
      this.secondTimerValue.second;

    if (this.totalDurationSeconds === 0) {
      this.totalDurationSeconds = totalSeconds;
    }

    const remainingSeconds = totalSeconds - 1;
    const remainingPercentage =
      (remainingSeconds / this.totalDurationSeconds) * 100;
    this.percentage = remainingPercentage;
  };

  calculateIncreasePercentage() {
    const totalSeconds =
      this.secondTimerValue.hours * 3600 +
      this.secondTimerValue.minut * 60 +
      this.secondTimerValue.second;
    const increaseSecond =
      this.secondTimerTime.hours * 3600 +
      this.secondTimerTime.minut * 60 +
      this.secondTimerTime.second;

    const decreasePercentage = 100 / (totalSeconds / increaseSecond);

    this.increasePercentage = decreasePercentage;
  }

  secondsToHMS = (seconds: number) => {
    if (seconds > 0) {
      const hours: number = Math.floor(seconds / 3600);
      const minutes: number = Math.floor((seconds % 3600) / 60);
      const remainingSeconds: number = seconds % 60;
      return {hours, minutes, remainingSeconds};
    } else {
      // Handle case when seconds is zero or negative
      return {hours: 0, minutes: 0, remainingSeconds: 0};
    }
  };

  resetTimer = () => {
    runInAction(() => {
      this.secondTimerValue = TimerValueInitial;
      this.secondTimerTime = TimerValueInitial;
      this.firstTimerValue = TimerValueInitial;
      this.firstTimerTime = TimerValueInitial;
      this.inActive('reset');
      this.inActive('start');
      this.inActive('stop');
      this.totalDurationSeconds = 0;
      this.percentage = 100;
      this.active('back');
      this.active('h24');
      this.inActive('finished');
      BackgroundTimer.clearInterval(this.firstIncreaseInterval);
      BackgroundTimer.clearInterval(this.firstDecreaseInterval);
      BackgroundTimer.clearInterval(this.secondIncreaseInterval);
      BackgroundTimer.clearInterval(this.secondDecreaseInterval);
    });
  };
  resetTimerBack = () => {
    runInAction(() => {
      this.secondTimerValue = TimerValueInitial;
      this.secondTimerTime = TimerValueInitial;
      this.firstTimerValue = TimerValueInitial;
      this.firstTimerTime = TimerValueInitial;
      this.inActive('reset');
      this.inActive('start');
      this.inActive('stop');
      this.totalDurationSeconds = 0;
      this.percentage = 100;
      this.inActive('finished');
    });
  };

  selectedSound = {title: 'Ocean'};
  soundsData = SoundsData;

  onSelectSound = (index: number) => {
    runInAction(() => {
      this.selectedSound = SoundsData.find((e, i) => i === index);
      this.root.calendarStore.setNewEventState(
        'sound',
        this.selectedSound.title as never,
      );
    });
  };

  onSoundItemPress = index => {
    const newData = this.soundsData.map((item, i) => {
      this.onSelectSound(index);
      return {
        ...item,
        active: i === index ? !item.active : false,
      };
    });
    this.soundsData = newData;
  };

  active = (key: keyof typeof this.timerStatus) => {
    this.timerStatus[key] = true;
  };
  inActive = (key: keyof typeof this.timerStatus) => {
    this.timerStatus[key] = false;
  };
  toggle = (key: keyof typeof this.timerStatus) => {
    this.timerStatus[key] = !this.timerStatus[key];
  };
}
