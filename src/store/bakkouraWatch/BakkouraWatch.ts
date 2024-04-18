import {makeAutoObservable, runInAction} from 'mobx';
import {Alert} from 'react-native';
import {genPos} from '../../helper/chart';
import {hoursSecondsToS} from '../../helper/helper';
import {SelectListDataInitial, SelectListDataType} from '../../types/alarm';
import {SelectColorData} from '../../utils/colors';

export class BakkouraWatchStore {
  constructor() {
    makeAutoObservable(this);
    this.isSameColor = this.listSelects.some(
      item => this.selectedSectorColor.color === item.color,
    );
    this.setNewSelectState('color', this.selectedSectorColor.color);
  }

  selectedSectorColor: {id?: number; color?: string} = SelectColorData[20];

  onSelectSectorColor = (id: number) => {
    this.selectedSectorColor = SelectColorData.find(item => item.id === id);
    if (
      this.listSelects.some(
        item => item.color !== this.selectedSectorColor.color,
      )
    ) {
      this.setNewSelectState('color', this.selectedSectorColor.color);
    } else {
      Alert.alert('This color has already selected');
    }
  };

  listSelects: SelectListDataType[] = [];
  newSelectState: SelectListDataType = SelectListDataInitial;

  isHas = false;

  setNewSelectState = (key: keyof SelectListDataType, value: any) => {
    this.newSelectState[key] = value as never;
  };

  isSameColor: boolean;

  setStartEnd = () => {
    this.setNewSelectState(
      'start',
      genPos({
        hour: this.newSelectState.fromHour,
        min: this.newSelectState.fromMin,
      }),
    );
    this.setNewSelectState(
      'end',
      genPos({
        hour: this.newSelectState.toHour,
        min: this.newSelectState.toMin,
      }),
    );
  };

  selectStartEndTime = (callback?: () => void) => {
    if (
      !this.listSelects.some(
        item => item.color === this.selectedSectorColor.color,
      )
    ) {
      const startMins =
        this.newSelectState.fromHour * 60 + this.newSelectState.fromMin;
      const endMins =
        this.newSelectState.toHour * 60 + this.newSelectState.toMin;
      if (startMins < endMins) {
        if (
          !this.listSelects.some(
            item =>
              this.newSelectState.start >= item.start &&
              this.newSelectState.end <= item.end,
          )
        ) {
          this.setNewSelectState('id', this.listSelects.length + 1);
          this.setNewSelectState('color', this.selectedSectorColor.color);
          this.listSelects = [...this.listSelects, this.newSelectState];
          callback();
          this.isHas = true;
        } else {
          Alert.alert('This time has already selected');
          return;
        }
      } else {
        Alert.alert('End time should be high than start time');
        return;
      }
    } else {
      Alert.alert('This color has already selected');
    }
  };

  addNewSelect = (calback?: () => void) => {
    if (this.isHas) {
      this.updateSector(this.newSelectState.id);
      this.isHas = false;
      calback();
      this.clearState();
    } else {
      if (this.newSelectState.start && this.newSelectState.name) {
        this.setNewSelectState('id', this.listSelects.length + 1);
        this.setNewSelectState('color', this.selectedSectorColor.color);
        this.listSelects = [...this.listSelects, this.newSelectState];
        this.isHas = true;
        calback();
        this.clearState();
      } else {
        Alert.alert('Name or time is empty');
      }
    }
  };

  getOneSector = (id: number) => {
    this.isHas = true;
    this.newSelectState = this.listSelects.find(item => item.id === id);
  };

  updateSector = (id: number) => {
    const list = this.listSelects.map((item, i) => {
      return i === id
        ? {
            ...item,
            item: this.newSelectState,
          }
        : item;
    });
    runInAction(() => {
      this.listSelects = list;
      this.clearState();
    });
  };

  deleteSelect = (id: number, calback?: () => void) => {
    runInAction(() => {
      this.listSelects = this.listSelects.filter(item => item.id !== id);
    });
    calback();
    this.clearState();
  };

  clearState = () => {
    runInAction(() => {
      this.newSelectState = SelectListDataInitial;
      this.isHas = false;
    });
  };
  clearName = () => {
    runInAction(() => {
      this.setNewSelectState('name', '');
    });
  };
  clearTime = () => {
    runInAction(() => {
      this.newSelectState = {
        id: 0,
        color: this.newSelectState.color,
        name: this.newSelectState.name,
        start: 0,
        end: 0,
        fromHour: 0,
        fromMin: 0,
        toHour: 0,
        toMin: 0,
      };
    });
  };
}
