import {makeAutoObservable, runInAction} from 'mobx';
import {
  AboutTimeData,
  AboutTimeInitial,
  AboutTimeType,
  RecommendationsData,
  TimeWealthDataInitial,
  TimeWealthDataType,
} from '../../constants/timeClinic';

export class TimeClinicStore {
  constructor() {
    makeAutoObservable(this);
  }

  aboutTimeInfo: AboutTimeType = AboutTimeInitial;

  recommendationData: TimeWealthDataType = TimeWealthDataInitial;

  setAboutTimeInfo = (id: number) => {
    runInAction(() => {
      this.aboutTimeInfo = AboutTimeData.find(item => item.id === id);
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
