import {makeAutoObservable, runInAction} from 'mobx';
import {
  AboutTimeData,
  AboutTimeInitial,
  AboutTimeType,
} from '../../constants/timeClinic';

export class TimeClinicStore {
  constructor() {
    makeAutoObservable(this);
  }

  aboutTimeInfo: AboutTimeType = AboutTimeInitial;

  setAboutTimeInfo = (id: number) => {
    runInAction(() => {
      this.aboutTimeInfo = AboutTimeData.find(item => item.id === id);
    });
  };
}
