import {makeAutoObservable, runInAction} from 'mobx';
import {
  ConstructorWatchInitial,
  ConstructorWatchType,
} from '../../types/worldTime';

export class WatchConstructor {
  constructor() {
    makeAutoObservable(this);
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
