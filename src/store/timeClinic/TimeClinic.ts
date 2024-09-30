import {makeAutoObservable, runInAction} from 'mobx';
import {
  AboutTimeData,
  AboutTimeInitial,
  AboutTimeType,
} from '../../constants/timeClinic';
import { AboutTimeData_ar } from '../../constants/timeClinic_ar';

import l from '../../i18n'

export class TimeClinicStore {
  constructor() {
    makeAutoObservable(this);
  }

  aboutTimeInfo: AboutTimeType = AboutTimeInitial;

  setAboutTimeInfo = (id: number) => {
    runInAction(() => {
      if (l.locale === 'ar'){
        this.aboutTimeInfo = AboutTimeData_ar.find(item => item.id === id);
      }
      else{
        this.aboutTimeInfo = AboutTimeData.find(item => item.id === id);
      }
    });
  };
}
