import {makeAutoObservable, runInAction} from 'mobx';
import {RootStore} from '../rootStore';

export class AuthStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  isAuthorized = true;

  setAuthorized = () => {
    runInAction(() => {
      this.isAuthorized = true;
    });
  };
}
