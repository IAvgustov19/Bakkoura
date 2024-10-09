import {makeAutoObservable, runInAction} from 'mobx';
import {
  AboutTimeData,
  AboutTimeInitial,
  AboutTimeType,
  RecommendationsData,
  TimeWealthDataInitial,
  TimeWealthDataType,
} from '../../constants/timeClinic';
import { AboutTimeData_ar } from '../../constants/timeClinic_ar';

import l from '../../i18n'

export class TimeClinicStore {
  constructor() {
    makeAutoObservable(this);
  }

  aboutTimeInfo: AboutTimeType = AboutTimeInitial;

  recommendationData: TimeWealthDataType = TimeWealthDataInitial;

  setAboutTimeInfo = (id: number) => {
    runInAction(() => {
      if (l.locale != 'English'){
        this.aboutTimeInfo = AboutTimeData_ar.find(item => item.id === id);
      }
      else{
        this.aboutTimeInfo = AboutTimeData.find(item => item.id === id);
      }
    });
  };

  setRecommendation = (id: number) => {
    runInAction(() => {
      this.recommendationData = RecommendationsData.find(
        item => item.id === id,
      );
    });
  };
}
