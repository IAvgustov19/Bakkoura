import {makeAutoObservable, runInAction} from 'mobx';
import {OrderStateInitial, OrderStateType} from '../../types/market';
import {RootStore} from '../rootStore';

export class MarketStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  webViewLink: string = '';

  orderState: OrderStateType = OrderStateInitial;

  onHandleWebVIew = (link: string) => {
    runInAction(() => {
      this.webViewLink = link;
    });
  };

  setOrderState = (key: keyof OrderStateType, value: any) => {
    this.orderState[key] = value as never;
  };

  deleteFile = () => {
    runInAction(() => {
      this.orderState.file = '';
    });
  };
}
