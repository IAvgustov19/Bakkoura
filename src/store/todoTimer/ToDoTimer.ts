import {makeAutoObservable, runInAction} from 'mobx';
import {formattedTime, hoursSecondsToS} from '../../helper/helper';
import {TodoTimerDataInitial, TodoTimerDataType} from '../../types/alarm';
import {
  addTaskToFirestore,
  fetchTasksFromFirestore,
  updateTaskInFirestore,
} from '../../services/firestoreService';

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
      callback && callback();
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

  createNewTask = async (callback: () => void) => {
    if (!this.isHas) {
      const date = Date.now();
      const userId = auth().currentUser?.uid;
      this.setNewTaskState('uid', userId);
      this.setNewTaskState('date', date);
      this.setNewTaskState('dailyUsage', []); 
      if (this.taskState.name) {
        await addTaskToFirestore(this.taskState);
        runInAction(() => {
          this.tasksList = [...this.tasksList, this.taskState];
          this.tasksListClone = [...this.tasksList];
        });
        callback();
        this.clearState();
      }
    } else {
      await this.updateTodoTimer(this.taskState.id);
      callback();
      this.clearState();
    }
  };

  filterType: string;

  clearFilterType = () => {
    runInAction(() => {
      this.filterType = null;
    });
  };

  filterItemsByTime = (timeFilter: string) => {
    console.log('timeFilter', timeFilter);
  
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let filterDateStart;
    let filterDateEnd = today;
  

    switch (timeFilter) {
      case 'lastMonth':
        filterDateStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        filterDateEnd = new Date(today.getFullYear(), today.getMonth(), 0); 
        break;
      case 'lastWeek':
        filterDateStart = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        this.filterType = 'lastWeek';
        break;
      case 'lastDay':
        filterDateStart = todayStart;
        this.filterType = 'lastDay';
        break;
      default:
        filterDateStart = new Date(0); 
        filterDateEnd = today;
        this.filterType = 'all'; 
        break;
    }
  
    runInAction(() => {
      this.tasksList = this.tasksListClone.filter(item => {
        const hasTodayUsage = item.dailyUsage?.some(usage => {
          const usageDate = new Date(usage.date);
          return usageDate.toDateString() === todayStart.toDateString();
        });
  
        return item.dailyUsage?.some(usage => {
          const usageDate = new Date(usage.date);
          if (this.filterType === 'lastWeek' && hasTodayUsage) {
            return usageDate >= filterDateStart && usageDate < todayStart;
          } else if (this.filterType === 'lastMonth' && hasTodayUsage) {
            return usageDate >= filterDateStart && usageDate <= filterDateEnd && usageDate.toDateString() !== todayStart.toDateString();
          } else {
            return usageDate >= filterDateStart && usageDate <= filterDateEnd;
          }
        });
      });
    });
  };
  

  // filterItemsByTime = (timeFilter: string) => {
  //   console.log('timeFiltertimeFilter', timeFilter);
    
  //   let today = new Date();
  //   let filterDateStart;
  //   let filterDateEnd = today;

  //   if (timeFilter) {
  //     switch (timeFilter) {
  //       case 'lastMonth':
  //         filterDateStart = new Date(today.getFullYear(), today.getMonth(), 1);
  //         this.filterType = 'lastMonth';
  //         break;
  //       case 'lastWeek':
  //         filterDateStart = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  //         this.filterType = 'lastWeek';
  //         break;
  //       case 'lastDay':
  //         filterDateStart = new Date(
  //           today.getFullYear(),
  //           today.getMonth(),
  //           today.getDate(),
  //         );
  //         this.filterType = 'lastDay';
  //         break;
  //       default:
  //         filterDateStart = new Date(0);
  //         break;
  //     }
  //   }

  //   runInAction(() => {
  //     this.tasksList = this.tasksListClone.filter(item =>
  //       item.dailyUsage?.some(usage => {
  //         let usageDate = new Date(usage.date);
  //         return usageDate >= filterDateStart && usageDate <= filterDateEnd;
  //       }),
  //     );
  //   });
  // };

  increaseSeconds() {
    const data = this.tasksList;
    for (let item of data) {
      if (item.play === true) {
        if (!item.secondInterval) {
          item.secondInterval = setInterval(() => {
            runInAction(() => {
              item.timestamp += 1;
              this.updateTaskUsage(item);
              updateTaskInFirestore(item.id, {
                timestamp: item.timestamp,
                startTime: item.startTime,
                endTime: item.endTime,
                dailyUsage: item.dailyUsage,
              });
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

  updateTaskUsage(task: TodoTimerDataType) {
    const now = new Date();
    const currentDateString = now.toISOString().split('T')[0];

    if (!task.dailyUsage) {
      task.dailyUsage = []; // Ensure dailyUsage is initialized
    }

    let timeSpent = {
      date: currentDateString,
      hours: Math.floor(task.timestamp / 3600),
      minutes: Math.floor((task.timestamp % 3600) / 60),
      seconds: task.timestamp % 60,
      timestamp: task.timestamp,
    };

    // Check if there is already an entry for the current day
    const existingEntryIndex = task.dailyUsage.findIndex(
      entry => entry.date === currentDateString,
    );

    if (existingEntryIndex !== -1) {
      // Update the existing entry with the new total time
      task.dailyUsage[existingEntryIndex] = timeSpent;
    } else {
      // Add a new entry for the current day
      task.dailyUsage.push(timeSpent);
    }
  }

  updateTodoTimer = async (id: string) => {
    const updatedTask = this.taskState;
    try {
      await updateTaskInFirestore(id, updatedTask);
      const list = this.tasksList.map(item =>
        item.id === id ? updatedTask : item,
      );
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
      if (i === index) {
        return {
          ...item,
          play: !item.play,
          startTime: item.startTime > 0 ? item.startTime : date,
          endTime:
            item.startTime > 0 ? item.startTime + item.timestamp * 1000 : date,
        };
      } else {
        return {
          ...item,
          play: false,
          secondInterval: item.secondInterval
            ? clearInterval(item.secondInterval)
            : null,
        };
      }
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

function getWeekNumber(date: Date) {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}
