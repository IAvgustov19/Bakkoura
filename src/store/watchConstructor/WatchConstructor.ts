import {makeAutoObservable, runInAction} from 'mobx';
import {
  ConstructorWatchInitial,
  ConstructorWatchType,
} from '../../types/worldTime';
import {RootStore} from '../rootStore';

export class WatchConstructor {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  currentWatch: ConstructorWatchType = ConstructorWatchInitial;
  currentPart: string = 'bodyTypes';

  setPart = (key: string) => {
    runInAction(() => {
      this.currentPart = key;
    });
  };

  setCurrentWatch = (
    key: keyof ConstructorWatchType,
    value: ConstructorWatchType,
  ) => {
    runInAction(() => {
      this.currentWatch[key] = value as never;
    });
  };
}
