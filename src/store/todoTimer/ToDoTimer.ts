import { makeAutoObservable, runInAction } from 'mobx';
import { formattedTime, hoursSecondsToS } from '../../helper/helper';
import { TodoTimerDataInitial, TodoTimerDataType } from '../../types/alarm';
import { addTaskToFirestore, fetchTasksFromFirestore, updateTaskInFirestore } from '../../services/firestoreService';

import auth from '@react-native-firebase/auth';


export class TodoTimerStore {
  constructor() {
    makeAutoObservable(this);
  }

  taskState: TodoTimerDataType = TodoTimerDataInitial;
  tasksList: TodoTimerDataType[] = [];
  tasksListClone: TodoTimerDataType[] = [];

  isHas = false;

  setNewTaskState = (key: keyof TodoTimerDataType, value: any) => {
    this.taskState[key] = value as never;
  };

  getOneTask = (data: TodoTimerDataType, callback?: () => void) => {
    runInAction(() => {
      this.taskState = data;
      callback();
      this.isHas = true;
    });
  };

  setTime = () => {
    runInAction(() => {
      this.setNewTaskState(
        'time',
        formattedTime(this.taskState.hours, this.taskState.minutes),
      );
      this.setNewTaskState(
        'seconds',
        hoursSecondsToS(this.taskState.hours, this.taskState.minutes),
      );
    });
  };
  
  createNewTask = async (callback) => {
    if (!this.isHas) {
      const date = Date.now();
      const userId = auth().currentUser.uid;
      this.setNewTaskState('uid', userId);
      this.setNewTaskState('date', date);
      this.setNewTaskState('date', date);
      if (this.taskState.name) {
        await addTaskToFirestore(this.taskState);
        this.tasksList.push(this.taskState);
        this.tasksListClone = [...this.tasksList];
        callback();
        this.clearState();
      }
    } else {
      this.updateTodoTimer(this.taskState.id);
      callback();
      this.clearState();
    }
  };

  filterType: string;

  filterItemsByTime = (timeFilter: string) => {
    let today = new Date();
    let filterDate;

    // Filter vaqtini aniqlash
    if (timeFilter) {
      switch (timeFilter) {
        case 'lastMonth':
          filterDate = new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            today.getDate(),
          );
          this.filterType = 'lastMonth';
          break;
        case 'lastWeek':
          filterDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          this.filterType = 'lastWeek';
          break;
        case 'lastDay':
          filterDate = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
          );
          this.filterType = 'lastDay';
          break;
        default:
          filterDate = new Date(0);
          break;
      }

      function filterFunction(item) {
        let itemDate = new Date(item.timeStamp);
        return itemDate >= filterDate && itemDate <= today;
      }

      this.tasksListClone = this.tasksList.filter(filterFunction);
    }
  };

  increaseSeconds() {
    const data = this.tasksList;
    for (let item of data) {
      if (item.play === true) {
        if (!item.secondInterval) {
          item.secondInterval = setInterval(() => {
            runInAction(() => {
              item.timestamp += 1;
              updateTaskInFirestore(item.id, { timestamp: item.timestamp, startTime: item.startTime, endTime: item.endTime });
            });
          }, 1000);
        }
      } else {
        if (item.secondInterval) {
          clearInterval(item.secondInterval);
          item.secondInterval = null;
        }
      }
    }
    runInAction(() => {
      this.tasksList = data;
      this.tasksListClone = data;
    });
  }


  updateTodoTimer = async (id: string) => {
    const updatedTask = this.taskState;
    try {
      await updateTaskInFirestore(id, updatedTask);
      const list = this.tasksList.map((item, i) => (item.id === id ? updatedTask : item));
      runInAction(() => {
        this.tasksList = list;
        this.tasksListClone = list;
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  handleDeleteTask = (id: string) => {
    setTimeout(() => {
      runInAction(() => {
        this.tasksList = this.tasksList.filter(item => item.id !== id);
      });
    }, 200);
  };

  playProject = (index: number) => {
    const date = Date.now();
    const list = this.tasksList.map((item, i) => {
      return i === index
        ? {
          ...item,
          play: !item.play,
          startTime: item.startTime > 0 ? item.startTime : date,
          endTime: item.startTime > 0 ? item.startTime + item.timestamp * 1000: date,
        }
        : item;
    });
    runInAction(() => {
      this.tasksList = list;
      this.tasksListClone = list;
    });
    this.increaseSeconds();
  };

  fetchTasks = async () => {
    const tasks = await fetchTasksFromFirestore();
    runInAction(() => {
      this.tasksList = tasks;
      this.tasksListClone = [...tasks];
    });
  };

  clearState = () => {
    setTimeout(() => {
      this.taskState = TodoTimerDataInitial;
      this.isHas = false;
    }, 1000);
  };
}
