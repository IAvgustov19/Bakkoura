import {makeAutoObservable, runInAction} from 'mobx';
import {Alert} from 'react-native';
import {genPos} from '../../helper/chart';
import {hoursSecondsToS} from '../../helper/helper';
import {SelectListDataInitial, SelectListDataType} from '../../types/alarm';
import {SelectColorData} from '../../utils/colors';
import {
  addSectorToFirestore,
  deleteSectorFromFirestore,
  getSectorFromFirestore,
  getSectorsFromFirestore,
  updateSectorInFirestore,
} from '../../services/firestoreService';
import auth from '@react-native-firebase/auth';

export class BakkouraWatchStore {
  constructor() {
    makeAutoObservable(this);
  }

  listSelects: SelectListDataType[] = [];
  newSelectState: SelectListDataType = SelectListDataInitial;
  isHas = false;

  onSelectSectorColor = (id: number | string) => {
    const selectSectorColor = SelectColorData.find(item => item.id === id);
    if (this.listSelects.some(item => item.color === selectSectorColor.color)) {
      Alert.alert('This color has already been selected');
    } else {
      this.setNewSelectState('color', selectSectorColor.color);
    }
  };

  // setNewSelectState = (key: keyof SelectListDataType, value: any) => {
  //   this.newSelectState[key] = value as never;
  // };

  setNewSelectState = (key: keyof SelectListDataType, value: any) => {
    runInAction(() => {
      this.newSelectState[key] = value as never;
    });
  };

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
    const startMins =
      this.newSelectState.fromHour * 60 + this.newSelectState.fromMin;
    const endMins = this.newSelectState.toHour * 60 + this.newSelectState.toMin;

    if (startMins < endMins) {
      if (
        !this.listSelects.some(
          item =>
            this.newSelectState.start >= item.start &&
            this.newSelectState.end <= item.end,
        )
      ) {
        this.listSelects = [...this.listSelects, this.newSelectState];
        // this.isHas = false;
        callback?.();
      } else {
        Alert.alert('This time has already been selected');
      }
    } else {
      Alert.alert('End time should be higher than start time');
    }
  };

  addNewSelect = async (callback?: () => void) => {
    const userId = auth().currentUser?.uid;
    if (!userId) {
      Alert.alert('User not authenticated');
      return;
    }
    if (this.isHas) {
      await this.updateSector(this.newSelectState.id);
      this.isHas = false;
      callback?.();
      this.clearState();
    } else {
      if (this.newSelectState.name && this.newSelectState.color) {
        this.setNewSelectState('uid', userId);
        await addSectorToFirestore(this.newSelectState);
        this.isHas = true;
        callback?.();
        this.clearState();
      } else {
        Alert.alert('Name or color is empty');
      }
    }
  };

  getOneSector = async (id: number | string) => {
    const sector = this.listSelects.find(item => item.id === id);
    if (sector) {
      this.isHas = true;
      this.newSelectState = sector;
      await getSectorFromFirestore(id);
    } else {
      Alert.alert('Sector not found');
    }
  };

  updateSector = async (id: number | string) => {
    const sectorToUpdate = this.listSelects.find(item => item.id === id);
    if (sectorToUpdate) {
      const updatedSector = {...sectorToUpdate, ...this.newSelectState};
      const updatedList = this.listSelects.map(item =>
        item.id === id ? updatedSector : item,
      );

      try {
        await updateSectorInFirestore(id, updatedSector);
        runInAction(() => {
          this.listSelects = updatedList;
          this.isHas = false;
          this.clearState();
        });
      } catch (error) {
        console.error('Error updating sector:', error);
      }
    } else {
      console.error('Sector not found');
    }
  };

  deleteSelect = async (id: number | string, callback?: () => void) => {
    try {
      await deleteSectorFromFirestore(id);
      runInAction(() => {
        this.listSelects = this.listSelects.filter(item => item.id !== id);
        this.clearState();
      });
      callback?.();
    } catch (error) {
      console.error('Error deleting sector:', error);
    }
  };

  getAllSectorsFromFirestore = async () => {
    try {
      const sectors = await getSectorsFromFirestore();
      runInAction(() => {
        this.listSelects = sectors;
      });
    } catch (error) {
      console.error('Error', error);
    }
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
        uid: '',
        id: '',
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
