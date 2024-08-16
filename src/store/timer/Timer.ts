import {makeAutoObservable, runInAction} from 'mobx';
import {secondsToHMS} from '../../helper/helper';
import {SoundsData} from '../../utils/sounds';
import {RootStore} from '../rootStore';
import Sound from 'react-native-sound';
import BackgroundTimer from 'react-native-background-timer';
import {TimerValueInitial, TimerValueType} from '../../types/alarm';
import PushNotification, {Importance} from 'react-native-push-notification';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

Sound.setCategory('Playback');

PushNotification.configure({
  onNotification: function (notification) {
    console.log('Notification received:', notification);
  },
  requestPermissions: Platform.OS === 'ios',
});

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

  firstTimerValue: TimerValueType = TimerValueInitial;

  firstTimerTime: TimerValueType = TimerValueInitial;

  secondTimerValue: TimerValueType = TimerValueInitial;
  secondTimerTime: TimerValueType = TimerValueInitial;

  soundState: Sound;

  timerChannelId: string;

  // setupNotifications = () => {
  //   // Request permission to display notifications
  //   PushNotificationIOS.requestPermissions();

  //   // Define notification categories
  //   PushNotificationIOS.setNotificationCategories([
  //     {
  //       id: 'userAction',
  //       actions: [
  //         {id: 'open', title: 'Open', options: {foreground: true}},
  //         {
  //           id: 'ignore',
  //           title: 'Disruptive',
  //           options: {foreground: true, destructive: true},
  //         },
  //         {
  //           id: 'text',
  //           title: 'Text Input',
  //           options: {foreground: true},
  //           textInput: {buttonTitle: 'Send'},
  //         },
  //       ],
  //     },
  //   ]);
  // };

  createTimerChannels = () => {
    this.timerChannelId = String(Date.now());
    PushNotification.createChannel(
      {
        channelId: this.timerChannelId,
        channelName: 'Timer Channel',
        playSound: true,
        soundName: this.selectedSound.url,
        importance: Importance.HIGH,
      },
      () => {},
    );
  };

  TimerNotification = () => {
    this.createTimerChannels();
    PushNotification.localNotification({
      channelId: this.timerChannelId,
      title: 'BTS',
      message: 'Timer',
      soundName: this.selectedSound.url,
      playSound: true,
      autoCancel: false,
    });
  };

  getFinishedTime = (timerValue: TimerValueType) => {
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
    this.soundState = new Sound(soundName, error => {
      if (error) {
        console.log('error', error);
        return;
      }
      this.soundState.play(success => {
        if (!success) {
          console.log('no work');
        }
        this.soundState.release();
      });
    });
  };

  updateCurrentTime = (time: string) => {
    runInAction(() => {
      this.currentTime = time;
    });
  };

  setFirstTimer = (key: keyof TimerValueType, value: any) => {
    this.firstTimerValue[key] = value as never;
  };

  setAllTime = () => {
    runInAction(() => {
      const firstimerValueSeconds =
        this.firstTimerValue.hours * 3600 +
        this.firstTimerValue.minut * 60 +
        this.firstTimerValue.second;
      //
      this.firstTimerValue.time = secondsToHMS(firstimerValueSeconds);
      this.firstTimerValue.totalSeconds = firstimerValueSeconds;
      //
      const firstimerTimeSeconds =
        this.firstTimerTime.hours * 3600 +
        this.firstTimerTime.minut * 60 +
        this.firstTimerTime.second;
      this.firstTimerTime.time = secondsToHMS(firstimerTimeSeconds);
      this.firstTimerTime.totalSeconds = firstimerTimeSeconds;
      //
      const secondTimerValueSeconds =
        this.secondTimerValue.hours * 3600 +
        this.secondTimerValue.minut * 60 +
        this.secondTimerValue.second;
      this.secondTimerValue.time = secondsToHMS(secondTimerValueSeconds);
      this.secondTimerValue.totalSeconds = secondTimerValueSeconds;
      //
      const secondTimerTimeSeconds =
        this.secondTimerTime.hours * 3600 +
        this.secondTimerTime.minut * 60 +
        this.secondTimerTime.second;
      this.secondTimerTime.time = secondsToHMS(secondTimerTimeSeconds);
      this.secondTimerTime.totalSeconds = secondTimerTimeSeconds;
    });
  };

  startFirstDecreaseTimer = () => {
    this.updateCurrentTime(this.getFinishedTime(this.firstTimerValue));
    this.firstDecreaseInterval = BackgroundTimer.setInterval(() => {
      runInAction(() => {
        if (this.firstTimerValue.totalSeconds > 0) {
          this.firstTimerValue.totalSeconds--;
        } else {
          BackgroundTimer.clearInterval(this.firstDecreaseInterval);
          this.active('finished');
          this.inActive('start');
          this.TimerNotification();
        }
        this.firstTimerValue.time = secondsToHMS(
          this.firstTimerValue.totalSeconds,
        );
      });
    }, 1000);
  };

  increaseFirstTimerValues = () => {
    this.updateCurrentTime(this.getFinishedTime(this.firstTimerValue));
    this.firstIncreaseInterval = BackgroundTimer.setInterval(() => {
      runInAction(() => {
        if (
          this.firstTimerTime.totalSeconds < this.firstTimerValue.totalSeconds
        ) {
          this.firstTimerTime.totalSeconds++;
        } else {
          BackgroundTimer.clearInterval(this.firstIncreaseInterval);
          this.active('finished');
          this.inActive('start');
          this.TimerNotification();
        }
        this.firstTimerTime.time = secondsToHMS(
          this.firstTimerTime.totalSeconds,
        );
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
    } else if (this.firstTimerValue.totalSeconds > 0) {
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

  setSecondTimer = (key: keyof TimerValueType, value: any) => {
    this.secondTimerValue[key] = value as never;
    this.setAllTime();
  };

  startSecondDecreaseTimer = () => {
    this.updateCurrentTime(this.getFinishedTime(this.secondTimerValue));
    this.secondDecreaseInterval = BackgroundTimer.setInterval(() => {
      this.calculatePercentage();
      runInAction(() => {
        if (this.secondTimerValue.totalSeconds > 0) {
          this.secondTimerValue.totalSeconds--;
        } else {
          BackgroundTimer.clearInterval(this.secondDecreaseInterval);
          this.active('finished');
          this.inActive('start');
          this.TimerNotification();
          this.totalDurationSeconds = 0;
          this.percentage = 100;
        }
        this.secondTimerValue.time = secondsToHMS(
          this.secondTimerValue.totalSeconds,
        );
      });
    }, 1000);
  };

  increaseSecondTimerValues = () => {
    this.updateCurrentTime(this.getFinishedTime(this.secondTimerValue));
    this.secondIncreaseInterval = BackgroundTimer.setInterval(() => {
      this.calculateIncreasePercentage();
      runInAction(() => {
        if (
          this.secondTimerTime.totalSeconds < this.secondTimerValue.totalSeconds
        ) {
          this.secondTimerTime.totalSeconds++;
        } else {
          BackgroundTimer.clearInterval(this.secondIncreaseInterval);
          this.active('finished');
          this.inActive('start');
          this.TimerNotification();
        }
        this.secondTimerTime.time = secondsToHMS(
          this.secondTimerTime.totalSeconds,
        );
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
      } else if (this.secondTimerValue.totalSeconds > 0) {
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
    const totalSeconds = this.secondTimerValue.totalSeconds;

    if (this.totalDurationSeconds === 0) {
      this.totalDurationSeconds = totalSeconds;
    }

    const remainingSeconds = totalSeconds - 1;
    const remainingPercentage =
      (remainingSeconds / this.totalDurationSeconds) * 100;
    this.percentage = remainingPercentage;
  };

  calculateIncreasePercentage() {
    const totalSeconds = this.secondTimerValue.totalSeconds;
    const increaseSecond = this.secondTimerTime.totalSeconds;

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

  selectedSound = SoundsData[2];
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
