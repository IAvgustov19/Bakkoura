import {makeAutoObservable, runInAction} from 'mobx';
import {ProjectTimerDataInitial, ProjectTimerDataType} from '../../types/alarm';
import {RootStore} from '../rootStore';
import {useEffect} from 'react';
import {formatDate, formatDateTime, secondsToHMS} from '../../helper/helper';

export class ProjectTimer {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.date = new Date();
    this.root = root;
  }

  newProjectTimerState: ProjectTimerDataType = ProjectTimerDataInitial;

  projectTimerList: ProjectTimerDataType[] = [];

  secondInterval = null;
  calculatedTotalTime = '00:00:00';
  initialCalculatedSecond = 0;

  setNewProjectTimeState = (key: keyof ProjectTimerDataType, value: any) => {
    this.newProjectTimerState[key] = value as never;
  };

  date = new Date();

  isUpdate = false;

  createNewProjectTimer = (calback?: () => void) => {
    if (!this.isUpdate) {
      runInAction(() => {
        this.setNewProjectTimeState(
          'id',
          this.newProjectTimerState.title + Date.now(),
        );
        this.setNewProjectTimeState('timestamp', this.date.getTime());
        this.setNewProjectTimeState('date', formatDate(this.date.getTime()));
        this.setNewProjectTimeState(
          'time',
          formatDateTime(this.date.getTime()),
        );
        if (
          this.newProjectTimerState.price &&
          this.newProjectTimerState.title
        ) {
          this.projectTimerList = [
            ...this.projectTimerList,
            this.newProjectTimerState,
          ];
          calback();
          this.clearState();
        }
      });
    } else {
      this.updateProjectTimer(this.newProjectTimerState.id);
      calback();
      this.clearState();
    }
  };

  clearState = () => {
    runInAction(() => {
      this.newProjectTimerState = ProjectTimerDataInitial;
      this.isUpdate = false;
    });
  };

  calculateTotalTime = () => {
    const calculated = this.projectTimerList.reduce(
      (acc, cur) => acc + cur.second,
      0,
    );
    this.initialCalculatedSecond = calculated;
    this.calculatedTotalTime = secondsToHMS(calculated);
  };

  increaseSeconds() {
    const data = this.projectTimerList;
    for (let item of data) {
      if (item.play === true) {
        if (!item.secondInterval) {
          item.secondInterval = setInterval(() => {
            runInAction(() => {
              item.second += 1;
              item.workTime = secondsToHMS(item.second);
              item.totalPrice = ((item.second * Number(item.price)) / 3600)
                .toString()
                .slice(0, 5);
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
      this.projectTimerList = data;
    });
  }

  playProject = index => {
    const list = this.projectTimerList.map((item, i) => {
      return i === index
        ? {
            ...item,
            play: !item.play,
          }
        : item;
    });
    runInAction(() => {
      this.projectTimerList = list;
    });
    this.increaseSeconds();
    this.calculateTotalTime();
  };

  handleDeleteProjectTimer = (id: number) => {
    setTimeout(() => {
      runInAction(() => {
        this.projectTimerList = this.projectTimerList.filter(
          item => item.id !== id,
        );
        this.calculateTotalTime();
      });
    }, 200);
  };

  getOneProjectTimer = (data: ProjectTimerDataType) => {
    runInAction(() => {
      this.newProjectTimerState = data;
      this.isUpdate = true;
    });
  };

  updateProjectTimer = (id: number) => {
    const list = this.projectTimerList.map((item, i) => {
      return i === id
        ? {
            ...item,
            item: this.newProjectTimerState,
          }
        : item;
    });
    runInAction(() => {
      this.projectTimerList = list;
    });
  };

  deleteRecentlyCalculated = () => {
    this.recentlyCalculated = {} as never;
  };

  selectedProject = ProjectTimerDataInitial;
  recentlyCalculated: ProjectTimerDataType = {} as never;

  clearSelectedProject = () => {
    runInAction(() => {
      this.selectedProject = ProjectTimerDataInitial;
      this.recentlyCalculated = {} as never;
    });
  };

  onSelectProject = (index: number) => {
    runInAction(() => {
      this.recentlyCalculated = this.selectedProject;
      this.selectedProject = this.projectTimerList.find((e, i) => i === index);
    });
  };

  onProjectsItemPress = (index: number) => {
    this.onSelectProject(index);
  };
}
