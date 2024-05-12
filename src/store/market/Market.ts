import {makeAutoObservable, runInAction} from 'mobx';
import {OrderStateInitial, OrderStateType} from '../../types/market';

export class MarketStore {
  constructor() {
    makeAutoObservable(this);
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
