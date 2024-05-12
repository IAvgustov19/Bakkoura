import {makeAutoObservable, runInAction} from 'mobx';
import {secondsToHMS, secondsToMS} from '../../helper/helper';
import {PomodoroDataInitial, PomodoroDataType} from '../../types/alarm';
import {BreakData} from '../../utils/repeat';

export class PomodoroStore {
  constructor() {
    makeAutoObservable(this);
    this.calculateTime();
  }

  currentBreakTime = BreakData[2];

  newTaskState: PomodoroDataType = PomodoroDataInitial;
  taskList: PomodoroDataType[] = [];

  setCurrentBreakTime = (id: number) => {
    runInAction(() => {
      this.currentBreakTime = BreakData.find(i => i.id === id);
    });
  };

  currentSecondInterval = null;
  currentSecond = 900;
  currentTime = '15:00';
  isStartCurrent = false;
  isRunCurrent = false;
  isCurrentPomodoro = true;

  isUpdate = false;

  startCurrentPomodoro = () => {
    if (this.isStartCurrent) {
      clearInterval(this.currentSecondInterval);
      this.isStartCurrent = false;
    } else {
      this.isRunCurrent = true;
      if (this.currentSecond > 0) {
        this.currentSecondInterval = setInterval(() => {
          runInAction(() => {
            this.currentSecond--;
            this.currentTime = secondsToMS(this.currentSecond);
          });
        }, 1000);
      } else {
        this.stopCurrentPomodoro();
      }
      this.isStartCurrent = true;
    }
  };

  stopCurrentPomodoro = () => {
    clearInterval(this.currentSecondInterval);
    this.currentSecond = 900;
    this.currentTime = '15:00';
    this.isStartCurrent = false;
    this.isRunCurrent = false;
  };

  setNewTaskState = (key: keyof PomodoroDataType, value: any) => {
    this.newTaskState[key] = value as never;
  };

  calculateTime = () => {
    const date = new Date();
    this.setNewTaskState('id', this.taskList.length + 1);
    this.setNewTaskState('second', this.newTaskState.minut * 60);
    let finishTime = secondsToHMS(
      date.getHours() * 60 * 60 +
        date.getMinutes() * 60 +
        date.getSeconds() +
        this.newTaskState.second,
    );
    this.setNewTaskState('finishTime', finishTime);
    this.setNewTaskState(
      'hour',
      (this.newTaskState.minut / 60).toString().slice(0, 4),
    );
    this.setNewTaskState('time', secondsToMS(this.newTaskState.second));
  };

  createTask = (calback: () => void) => {
    this.calculateTime();
    if (this.newTaskState.minut) {
      this.taskList = [...this.taskList, this.newTaskState];
    }
    calback();
  };

  getOneTask = (data: PomodoroDataType) => {
    runInAction(() => {
      this.newTaskState = data;
      this.isUpdate = true;
    });
  };

  handleDeleteTask = (id: number) => {
    setTimeout(() => {
      runInAction(() => {
        this.taskList = this.taskList.filter(item => item.id !== id);
        this.clearState();
      });
    }, 200);
  };

  updateTask = (id: number) => {
    const list = this.taskList.map((item, i) => {
      return i === id
        ? {
            ...item,
            item: this.newTaskState,
          }
        : item;
    });
    runInAction(() => {
      this.taskList = list;
    });
  };

  clearState = () => {
    runInAction(() => {
      this.newTaskState = PomodoroDataInitial;
      this.isUpdate = false;
    });
  };
}
