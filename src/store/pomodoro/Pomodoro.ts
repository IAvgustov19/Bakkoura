import {makeAutoObservable, runInAction} from 'mobx';
import {secondsToHMS, secondsToMS} from '../../helper/helper';
import {PomodoroDataInitial, PomodoroDataType} from '../../types/alarm';
import {BreakData} from '../../utils/repeat';

export class PomodoroStore {
  constructor() {
    makeAutoObservable(this);
    this.calculateTime();
  }

  currentBreakTime = BreakData[0];

  newTaskState: PomodoroDataType = PomodoroDataInitial;
  taskList: PomodoroDataType[] = [];

  currentSecondInterval = null;
  currentSecond = 1500;
  currentTime = '25:00';
  isStartCurrent = false;
  isRunCurrent = false;
  isCurrentPomodoro = true;
  completedCycles: number = 0;
  totalCycles: number = 8;
  isLongBreakSet = false;
  estimatedPomodoros = 0;

  isUpdate = false;

  setNewTaskState = (key: keyof PomodoroDataType, value: any) => {
    this.newTaskState[key] = value as never;
  };

  setNewTotalCycles = (key: keyof PomodoroDataType, value: number) => {
    this.newTaskState[key] = value as never;
  };

  calculateTime = () => {
    const date = new Date();
    this.setNewTaskState('id', this.taskList.length + 1);
    this.setNewTaskState('second', this.newTaskState.minut * 60 * 30);
    let finishTime = secondsToHMS(
      date.getHours() * 60 * 60 +
        date.getMinutes() * 60 +
        600 +
        date.getSeconds() +
        this.newTaskState.second,
    );

    this.setNewTaskState('finishTime', finishTime);
    this.setNewTaskState(
      'hour',
      (this.newTaskState.minut / 60).toString().slice(0, 4),
    );
    this.setNewTaskState('time', secondsToMS(this.newTaskState.second));

    const estimatedHours = this.newTaskState.minut / 2;

    this.setNewTaskState('estimatedHours', estimatedHours);
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

  setCurrentBreakTime = (id: number) => {
    runInAction(() => {
      this.stopCurrentPomodoro();
      const selectedBreak = BreakData.find(i => i.id === id);
      if (selectedBreak) {
        this.currentBreakTime = selectedBreak;
        switch (id) {
          case 1:
            this.currentSecond = 1500;
            this.currentTime = '25:00';
            break;
          case 2:
            this.currentSecond = 300;
            this.currentTime = '05:00';
            break;
          case 3:
            this.currentSecond = 900;
            this.currentTime = '15:00';
            break;
          default:
            this.currentSecond = 1500;
            this.currentTime = '25:00';
            break;
        }
      }
    });
  };

  startCurrentPomodoro = () => {
    clearInterval(this.currentSecondInterval);
    if (this.isStartCurrent) {
      this.isStartCurrent = false;
    } else {
      this.isRunCurrent = true;
      if (this.currentSecond > 0) {
        this.currentSecondInterval = setInterval(() => {
          runInAction(() => {
            this.currentSecond--;
            this.currentTime = secondsToMS(this.currentSecond);
            if (this.currentSecond === 0) {
              this.stopCurrentPomodoro();
              if (this.currentBreakTime.id === 1) {
                if (this.completedCycles < this.newTaskState.minut - 1) {
                  // Switch between id1 and id2 until completedCycles === minut - 1
                  this.setCurrentBreakTime(
                    this.currentBreakTime.id === 1 ? 2 : 1,
                  );
                  this.completedCycles++;
                  // this.estimatedPomodoros++;
                  return;
                }
                if (this.estimatedPomodoros === this.newTaskState.minut - 1) {
                  // If completedCycles === minut - 1, switch to id3
                  this.estimatedPomodoros++;
                  this.setCurrentBreakTime(3);
                  return;
                }
              }
            }
            if (this.currentBreakTime.id === 2 && this.currentSecond === 0) {
              this.estimatedPomodoros++;
              this.setCurrentBreakTime(1);
            }
          });
        }, 1000);
        this.isStartCurrent = true;
      } else {
        this.stopCurrentPomodoro();
      }
    }
  };

  stopCurrentPomodoro = () => {
    clearInterval(this.currentSecondInterval);
    if (this.currentBreakTime.id === 1) {
      if (this.completedCycles >= this.newTaskState.minut) {
        this.estimatedPomodoros++;
        this.completedCycles = 0;
        if (!this.isLongBreakSet) {
          this.isLongBreakSet = true;
          this.currentTime = '15:00';
          this.currentSecond = 900;
          this.setCurrentBreakTime(3);
        }
      }
    } else {
      this.isLongBreakSet = false;
    }
    this.isStartCurrent = false;
    this.isRunCurrent = false;
  };
}
