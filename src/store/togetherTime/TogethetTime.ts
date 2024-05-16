import {makeAutoObservable, runInAction} from 'mobx';
import {formatDateTime, formattedTime} from '../../helper/helper';
import {TogetherDataInitial, TogetherDataType} from '../../types/alarm';
import {ControlData, RepeatData, StatusData} from '../../utils/repeat';
import {RootStore} from '../rootStore';
import format from 'format-number-with-string';

export class TogetherTimeStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  addEtapState: TogetherDataType = TogetherDataInitial;
  etapList: TogetherDataType[] = [];

  selcetedEtap: TogetherDataType = TogetherDataInitial;

  selectedInterval = null;

  setAddEtapState = (key: keyof TogetherDataType, value: any) => {
    this.addEtapState[key] = value as never;
  };

  createNewEtap = (calback: () => void) => {
    if (this.addEtapState.fromDate != '0' && this.addEtapState.type) {
      this.setAddEtapState('id', this.etapList.length + 1);
      this.setAddEtapState('timeStamp', Date.now());
      runInAction(() => {
        this.etapList = [...this.etapList, this.addEtapState];
      });
      this.SelectOneEtap(this.addEtapState.id);
      this.clearState();
      calback();
    }
  };
  clearState = () => {
    runInAction(() => {
      this.addEtapState = TogetherDataInitial;
    });
  };

  clearLoverName = () => {
    this.setAddEtapState('name', '');
  };

  onDeleteOneEtap = () => {
    clearInterval(this.selectedInterval);
    this.etapList = this.etapList.filter(
      item => item.id !== this.selcetedEtap.id,
    );
    this.selcetedEtap = TogetherDataInitial;
    this.clearState();
  };

  SelectOneEtap = (id: number) => {
    this.selcetedEtap = this.etapList.find(item => item.id === id);
    if (this.selectedInterval) {
      clearInterval(this.selectedInterval);
    }
    if (this.selcetedEtap.timeStamp > 0) {
      this.selectedInterval = setInterval(() => {
        runInAction(() => {
          const today = new Date();
          const givenDate = new Date(this.selcetedEtap.fromDateFormat);
          const timeDiff = today.getTime() - givenDate.getTime();

          // Kunlarni hisoblash va 0 dan kichik bo'lsa 0 ga tenglash
          const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // Farqni kunlarda olish uchun floor ishlatiladi
          const days = daysDiff >= 0 ? daysDiff : 0;

          if (days === 0) {
            this.selcetedEtap.time = '00:00:00';
            this.selcetedEtap.days = days as never;
          } else {
            this.selcetedEtap.days = days as never;
            this.selcetedEtap.time = `${format(
              today.getHours(),
              '00',
            )}:${format(today.getMinutes(), '00')}:${format(
              today.getSeconds(),
              '00',
            )}`;
          }
        });
      }, 1000);
    }
  };

  calculateTimeDifferences = () => {
    const newData = this.etapList.map(item => {
      const nowTime = Math.floor(Date.now() / 1000);
      const timeStampSeconds = Math.floor(item.timeStamp / 1000);
      const between = nowTime - timeStampSeconds;

      let days = Math.floor(between / (24 * 60 * 60));
      let remainingSeconds = between % (24 * 60 * 60);
      let hours = Math.floor(remainingSeconds / (60 * 60));
      remainingSeconds %= 60 * 60;
      let minutes = Math.floor(remainingSeconds / 60);
      let seconds = remainingSeconds % 60;

      if (days < 0) {
        days = 0;
      }
      if (hours < 0) {
        hours = 0;
      }
      if (minutes < 0) {
        minutes = 0;
      }
      if (seconds < 0) {
        seconds = 0;
      }

      const formattedDays = days;

      return {
        ...item,
        days: formattedDays,
        time: (this.selcetedEtap.time = formattedTime(hours, minutes, seconds)),
      };
    });
    this.etapList = newData as never;
  };

  selectedStatus = {title: 'Dating'};
  statusData = StatusData;

  onSelectStatus = (index: number) => {
    runInAction(() => {
      this.selectedStatus = this.statusData.find((e, i) => i === index);
      this.setAddEtapState('type', this.selectedStatus.title as never);
    });
  };

  onStatusItemPress = index => {
    const newData = this.statusData.map((item, i) => {
      this.onSelectStatus(index);
      return {
        ...item,
        active: i === index ? !item.active : false,
      };
    });
    this.statusData = newData;
  };

  selectedControl = {title: 'Stopped'};
  controlData = ControlData;

  onSelectControl = (index: number) => {
    runInAction(() => {
      this.selectedControl = this.controlData.find((e, i) => i === index);
      this.setAddEtapState('control', this.selectedControl.title as never);
    });
  };

  onControlItemPress = index => {
    const newData = this.controlData.map((item, i) => {
      this.onSelectStatus(index);
      return {
        ...item,
        active: i === index ? !item.active : false,
      };
    });
    this.controlData = newData;
  };
}
