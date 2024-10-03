import { makeAutoObservable, runInAction } from 'mobx';
import { secondsToHMS, secondsToMS } from '../../helper/helper';
import { PomodoroDataInitial, PomodoroDataType } from '../../types/alarm';
import { BreakData } from '../../utils/repeat';
import { addPomodoroTaskToFirestore, deletePomodoroTaskFromFirestore, getPomodoroTasksFromFirestore, updatePomodoroTaskInFirestore } from '../../services/firestoreService';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import PushNotification from 'react-native-push-notification';
import { channelId } from '../../../App';

import {t} from '../../i18n'

export class PomodoroStore {
  constructor() {
    makeAutoObservable(this);
    this.calculateTime();
  }

  currentBreakTime = BreakData[0];

  newTaskState: PomodoroDataType = { ...PomodoroDataInitial };
  taskList: PomodoroDataType[] = [];

  currentSecondInterval = null;
  currentSecond = 1500;
  currentTime = '25:00';
  isStartCurrent = false;
  isRunCurrent = false;
  isCurrentPomodoro = true;
  completedCycles: number = 0;
  totalCycles: number = 4;
  isLongBreakSet = false;
  estimatedPomodoros = 0;

  shortBreakCount = 0;
  maxShortBreaks = 5;


  isUpdate = false;

  setNewTaskState = (key: keyof PomodoroDataType, value: any) => {
    this.newTaskState[key] = value as never;
  };

  setNewTotalCycles = (key: keyof PomodoroDataType, value: number) => {
    this.newTaskState[key] = value as never;
  };

  calculateTime = () => {
    const date = new Date();
    // this.setNewTaskState('id', this.taskList.length + 1);
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


  createTask = async (calback: () => void) => {
    const userId = auth().currentUser.uid;
    this.setNewTaskState('uid', userId);
    if (!this.newTaskState.name) {
      Alert.alert(`${t("Enter task name")}`);
      return;
    }
    this.calculateTime();
    if (this.newTaskState.minut) {
      this.taskList = [...this.taskList, this.newTaskState];
      await addPomodoroTaskToFirestore(this.newTaskState);
    }
    calback();
  };

  getOneTask = (data: PomodoroDataType) => {
    runInAction(() => {
      this.newTaskState = data;
      this.isUpdate = true;
    });
  };

  setData = (data: PomodoroDataType) => {
    runInAction(() => {
      this.newTaskState = data;
      this.isUpdate = false;
    });
  };

  handleDeleteTask = (id: number | string) => {
    setTimeout(() => {
      runInAction(async () => {
        this.taskList = this.taskList.filter(item => item.id !== id);
        this.clearState();
        await deletePomodoroTaskFromFirestore(id);
      });
    }, 200);
  };

  updateTask = async (id: string | number) => {
    console.log('id', id);
    console.log(this.newTaskState)
    await updatePomodoroTaskInFirestore(id, this.newTaskState);
    runInAction(() => {
      this.taskList = this.taskList.map(item => item.id === id ? this.newTaskState : item);
      this.isUpdate = false;
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
      this.stopCurrent(id);
      const selectedBreak = BreakData.find(i => i.id === id);
      if (selectedBreak) {
        this.currentBreakTime = selectedBreak;
        switch (id) {
          case 1:
            this.setNewTaskState('breackType', 'Pomodoro');
            this.currentSecond = 1500;
            this.currentTime = '25:00';
            break;
          case 2:
            this.setNewTaskState('breackType', 'ShortBreak');
            this.currentSecond = 300;
            this.currentTime = '05:00';
            break;
          case 3:
            this.setNewTaskState('breackType', 'LongBreak');
            this.currentSecond = 900;
            this.currentTime = '15:00';
            break;
          default:
            this.setNewTaskState('breackType', 'Pomodoro');
            this.currentSecond = 1500;
            this.currentTime = '25:00';
            break;
        }
      }
    });
  };

  startCurrentPomodoro = (id: number) => {
    if (this.isStartCurrent) {
      this.isRunCurrent = false;
      this.isStartCurrent = false;
      clearInterval(this.currentSecondInterval);
    } else {
      this.isRunCurrent = true;
      if (this.currentSecond > 0) {
        this.currentSecondInterval = setInterval(() => {
          runInAction(() => {
            this.currentSecond--;
            this.currentTime = secondsToMS(this.currentSecond);
            if (this.currentSecond === 0) {
              this.stopCurrentPomodoro(id);
              console.log(`Break Time ID: ${this.currentBreakTime.id}`);
              console.log(`Completed Cycles Before Transition: ${this.completedCycles}`);

              if (this.currentBreakTime.id === 1) { // Pomodoro period
                this.completedCycles++;
                console.log(`Pomodoro completed: Updated Completed Cycles to ${this.completedCycles}`);

                if (this.completedCycles >= 5) {
                  // After 4 Pomodoro periods, switch to long break
                  this.completedCycles = 0; // Reset completed cycles
                  this.setCurrentBreakTime(3); // Switch to long break
                } else {
                  this.setCurrentBreakTime(2); // Switch to short break
                }

              } else if (this.currentBreakTime.id === 2) { // Short Break
                this.shortBreakCount++;
                console.log(`Short Break completed: Updated Short Break Count to ${this.shortBreakCount}`);

                if (this.shortBreakCount >= 5) {
                  // After 4 short breaks, switch to Pomodoro period and reset
                  this.shortBreakCount = 0; // Reset short break count
                  this.completedCycles = 0; // Reset completed cycles
                  this.setCurrentBreakTime(1); // Switch back to Pomodoro period
                } else {
                  this.setCurrentBreakTime(1); // Switch back to Pomodoro period
                }

              } else if (this.currentBreakTime.id === 3) { // Long Break
                // After long break, reset the entire cycle
                this.setCurrentBreakTime(1); // Switch back to Pomodoro period
              }

              console.log(`New Break Time ID: ${this.currentBreakTime.id}`);
              console.log(`Updated Completed Cycles: ${this.completedCycles}`);
            }
          });
        }, 1000);
        this.isStartCurrent = true;
      } else {
        this.stopCurrentPomodoro(id);
      }
    }
  };


  stopCurrent = (id: number) => {

    clearInterval(this.currentSecondInterval);

    if (id === 0) {
      id = 1;
    }

    if (id == 1) {
      this.currentSecond = 1500; // 25 minutes
      this.currentTime = '25:00';
    }
    if (id == 2) {
      this.currentSecond = 300; // 5 minutes
      this.currentTime = '05:00';
    }
    if (id == 3) {
      this.currentSecond = 900; // 15 minutes
      this.currentTime = '15:00';
    }

    // this.isStartCurrent = false;
    this.isRunCurrent = false;
    this.isLongBreakSet = false;




  };
  stopCurrentPomodoro = (id: number) => {

    clearInterval(this.currentSecondInterval);

    if (id === 0) {
      id = 1;
    }

    if (id == 1) {
      this.currentSecond = 1500; // 25 minutes
      this.currentTime = '25:00';
    }
    if (id == 2) {
      this.currentSecond = 300; // 5 minutes
      this.currentTime = '05:00';
    }
    if (id == 3) {
      this.currentSecond = 900; // 15 minutes
      this.currentTime = '15:00';
    }

    this.isStartCurrent = false;
    this.isRunCurrent = false;
    this.isLongBreakSet = false;

    PushNotification.localNotification({
      channelId: channelId, // This is optional, and you may need to create a channel for Android
      title: `${t("Pomodoro Timer")}`,
      message: `${t("Pomodoro session has ended")} ${this.currentBreakTime.id === 3 && this.shortBreakCount < 4
        ? `${t("Back to Pomodoro!")}`
        : this.currentBreakTime.id === 2
          ? `${t("Back to Pomodoro!")}`
          : this.currentBreakTime.id === 1
            ? this.shortBreakCount < 3
              ? `${t("Take a short break!")}`
              : `${t("Time for a long break!")}`
            : `Unknown state: ID ${this.currentBreakTime.id}` // Print the actual ID for debugging
        }`,
      playSound: true,
      soundName: 'default',
      // Other notification options
    });

    // clearInterval(this.currentSecondInterval);
    // if (this.currentBreakTime.id === 1) {
    //   if (this.completedCycles >= this.newTaskState.minut) {
    //     this.estimatedPomodoros++;
    //     this.completedCycles = 0;
    //     if (!this.isLongBreakSet) {
    //       this.isLongBreakSet = true;
    //       this.currentTime = '15:00';
    //       this.currentSecond = 900;
    //       this.setCurrentBreakTime(3);
    //     }
    //   }
    // } else {
    //   this.isLongBreakSet = false;
    // }
    // this.isStartCurrent = false;
    // this.isRunCurrent = false;
  };

  getAllPomodorosFromFirestore = async () => {
    try {
      const pomodoros = await getPomodoroTasksFromFirestore();
      runInAction(() => {
        this.taskList = pomodoros;
      });
    } catch (error) {
      console.error('Error', error);
    }
  };
}
