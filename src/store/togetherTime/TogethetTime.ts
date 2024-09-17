import { makeAutoObservable, runInAction } from 'mobx';
import { TogetherDataInitial, TogetherDataType } from '../../types/alarm';
import { ControlData, RepeatData, StatusData } from '../../utils/repeat';
import { RootStore } from '../rootStore';
import { addEtapToFirestore, deleteEtapFromFirestore, getEtapsFromFirestore, updateEtapsInFirestore } from '../../services/firestoreService';
import auth from '@react-native-firebase/auth';
import { RepeatDataType } from '../../types/calendar';

export class TogetherTimeStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    makeAutoObservable(this);
    this.root = root;
  }

  addEtapState: TogetherDataType = TogetherDataInitial;
  etapList: TogetherDataType[] = [];
  selcetedEtap: TogetherDataType = TogetherDataInitial;
  selectedInterval: NodeJS.Timeout | null = null;
  is30hFormat: boolean = false;
  selectedRepeat: RepeatDataType = RepeatData[3];
  isUpdate = false;


  toggleTimeFormat = () => {
    runInAction(() => {
      this.is30hFormat = !this.is30hFormat;
    });
  };
  // Method to get the current time format
  getTimeFormat = (): string => {
    return this.is30hFormat ? '30h' : '24h';
  };

  setAddEtapState = (key: keyof TogetherDataType, value: any) => {
    this.addEtapState[key] = value as never;
  };

  getOneTask = (data: TogetherDataType) => {
    runInAction(() => {
      this.addEtapState = data;
      this.isUpdate = true;
    });
  };
  setData = (data: TogetherDataType) => {
    runInAction(() => {
      this.addEtapState = data;
      this.isUpdate = false;
    });
  };


  onRepeatItemPress = (index: number) => {
    runInAction(() => {
      this.selectedRepeat = RepeatData.find((e, i) => i === index);
      this.setAddEtapState('repeat', this.selectedRepeat.title);
    });
  };

  onSelectRepeat = () => {
    runInAction(() => {
      this.selectedRepeat = RepeatData.find((e) => e.title === this.addEtapState.repeat);
    });
  };

  onCancelRepeat = () => {
    runInAction(() => {
      this.selectedRepeat = RepeatData.find(
        e => e.title === this.addEtapState.repeat,
      );
    });
  };

  createNewEtap = async (synchronizedEmail:string, synchronized: boolean, callback: () => void) => {
    const userId = auth().currentUser?.uid;
    if (this.addEtapState.fromDate !== '0' && this.addEtapState.type) {
      this.setAddEtapState('id', this.etapList.length + 1);
      this.setAddEtapState('timeStamp', Date.now());
      this.setAddEtapState('uid', userId);
      this.setAddEtapState('synchronized', synchronized);
      this.setAddEtapState('synchronizedEmail', synchronizedEmail);
      await addEtapToFirestore(this.addEtapState);
      runInAction(() => {
        this.etapList = [...this.etapList, this.addEtapState];
      });
      this.SelectOneEtap(this.addEtapState.id);
      this.clearState();
      callback();
    }
  };

  clearState = () => {
    runInAction(() => {
      this.addEtapState = TogetherDataInitial;
      this.isUpdate = false;
    });
  };

  clearLoverName = () => {
    this.setAddEtapState('name', ' ');
  };

  // onDeleteOneEtap = () => {
  //   clearInterval(this.selectedInterval!);
  //   this.etapList = this.etapList.filter(item => item.id !== this.selcetedEtap.id);
  //   this.selcetedEtap = TogetherDataInitial;
  //   this.clearState();
  // };


  updateEtap = async (id: string | number) => {
    console.log('id', id);
    console.log(this.addEtapState);  // Check if this log prints the correct `reminder` value
    await updateEtapsInFirestore(id, this.addEtapState);  // Firestore update
    runInAction(() => {
      this.etapList = this.etapList.map(item => item.id === id ? this.addEtapState : item);
      this.isUpdate = false;
    });
  };
  

SelectOneEtap = (id: number | string) => {
  this.selcetedEtap = this.etapList.find(item => item.id === id) ?? TogetherDataInitial;
  if (this.selcetedEtap.timeStamp > 0) {
    if (this.selcetedEtap.control === 'Stopped') {
      this.stopTimer();
    } else {
      this.startTimer();
    }
  }
};

handleDeleteEtap = (id: number | string) => {
  setTimeout(() => {
    runInAction(async () => {
      this.etapList = this.etapList.filter(item => item.id !== id);
      this.clearState();
      await deleteEtapFromFirestore(id);
    });
  }, 200);
};

startTimer = () => {
  if (this.selectedInterval) {
    clearInterval(this.selectedInterval);
  }
  this.selectedInterval = setInterval(() => {
    runInAction(() => {
      const currentTime = Date.now();
      const elapsed = currentTime - this.selcetedEtap.timeStamp;

      let days, hours, minutes, seconds;

      if (this.is30hFormat) {
        const totalMinutes = Math.floor(elapsed / (1000 * 60));
        days = Math.floor(totalMinutes / (48 * 30));
        const remainingMinutes = totalMinutes % (48 * 30);
        hours = Math.floor(remainingMinutes / 48);
        minutes = remainingMinutes % 48;
        seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
      } else {
        days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
        const remainingHours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        hours = remainingHours;
        const remainingMinutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        minutes = remainingMinutes;
        seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
      }

      this.selcetedEtap.days = days.toString() as never;
      this.selcetedEtap.time = this.formattedTime(hours, minutes, seconds, this.is30hFormat);
    });
  }, 1000);
};

stopTimer = () => {
  if (this.selectedInterval) {
    
    clearInterval(this.selectedInterval);
    this.selectedInterval = null;
  }
};


  calculateTimeDifferences = () => {
    const newData = this.etapList.map(item => {
      const nowTime = Math.floor(Date.now() / 1000);
      const timeStampSeconds = Math.floor(item.timeStamp / 1000);
      const between = nowTime - timeStampSeconds;

      let days, hours, minutes, seconds, remainingSeconds;

      if (this.is30hFormat) {
        days = Math.floor(between / (30 * 48 * 60));
        remainingSeconds = between % (30 * 48 * 60);
        hours = Math.floor(remainingSeconds / (48 * 60));
        remainingSeconds %= (48 * 60);
        minutes = Math.floor(remainingSeconds / 48);
      } else {
        days = Math.floor(between / (24 * 60 * 60));
        remainingSeconds = between % (24 * 60 * 60);
        hours = Math.floor(remainingSeconds / 3600);
        remainingSeconds %= 3600;
        minutes = Math.floor(remainingSeconds / 60);
      }
      seconds = remainingSeconds % 60;

      return {
        ...item,
        days: days.toString() as never,
        time: this.formattedTime(hours, minutes, seconds, this.is30hFormat),
      };
    });
    this.etapList = newData as never;
  };

  selectedStatus = { title: 'Dating' };
  statusData = StatusData;

  onSelectStatus = (index: number) => {
    runInAction(() => {
      this.selectedStatus = this.statusData.find((e, i) => i === index) ?? { title: 'Dating' };
      this.setAddEtapState('type', this.selectedStatus.title as never);
    });
  };

  onStatusItemPress = (index: number) => {
    const newData = this.statusData.map((item, i) => {
      this.onSelectStatus(index);
      return {
        ...item,
        active: i === index ? !item.active : false,
      };
    });
    this.statusData = newData;
  };

  selectedControl = { title: 'Stopped' };
  controlData = ControlData;

  onSelectControl = (index: number) => {
    runInAction(() => {
      this.selectedControl = this.controlData.find((e, i) => i === index) ?? { title: 'Stopped' };
      this.setAddEtapState('control', this.selectedControl.title as never);
    });
  };

  onControlItemPress = (index: number) => {
    const newData = this.controlData.map((item, i) => {
      this.onSelectControl(index);
      return {
        ...item,
        active: i === index ? !item.active : false,
      };
    });
    this.controlData = newData;
  };

  getAllEtapsFromFirestore = async () => {
    try {
      const etaps = await getEtapsFromFirestore();
      runInAction(() => {
        this.etapList = etaps;
      });
    } catch (error) {
      console.error('Error', error);
    }
  };

  calculateDaysDifference = (fromDate: string) => {
    if (!fromDate || fromDate === '0') return '0';
    const [day, month, year] = fromDate.split('/').map(Number);
    const parsedDate = new Date(year, month - 1, day);

    if (isNaN(parsedDate.getTime())) {
      console.error('Invalid date format:', fromDate);
      return 'Invalid Date';
    }
    const now = new Date();
    const differenceInTime = now.getTime() - parsedDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

    return differenceInDays.toString();
  };


  private formattedTime(hours: number, minutes: number, seconds: number, is30hFormat: boolean): string {
    let formattedHours = hours;
    let formattedMinutes = minutes;

    if (is30hFormat) {
        // Convert hours and minutes to total minutes
        const totalMinutes = hours * 48 + minutes;

        // Calculate equivalent hours and minutes in 30-hour format
        formattedHours = Math.floor(totalMinutes / 48);
        formattedMinutes = totalMinutes % 48;

        // Calculate seconds
        seconds = Math.floor((seconds * 48) / 60); // Adjust seconds for 48-minute scale
    }

    return `${formattedHours.toString().padStart(2, '0')}:${formattedMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}



}

