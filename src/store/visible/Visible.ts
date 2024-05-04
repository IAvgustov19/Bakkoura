import {makeAutoObservable} from 'mobx';
import {RootStore} from '../rootStore';

export class VisibleStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  visible = {
    todoTimerHistory: false,
    todoTimerTaskName: false,
    timeClinicThanks: false,
  };

  show = (key: keyof typeof this.visible) => {
    this.visible[key] = true;
  };
  hide = (key: keyof typeof this.visible) => {
    this.visible[key] = false;
  };
  toggle = (key: keyof typeof this.visible) => {
    this.visible[key] = !this.visible[key];
  };
}
