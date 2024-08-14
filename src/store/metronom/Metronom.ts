import {makeAutoObservable, reaction, runInAction} from 'mobx';
import {MetronomDataInitial, MetronomDataType} from '../../types/alarm';
import Sound from 'react-native-sound';
import {Sounds} from '../../assets';

Sound.setCategory('Playback');

export class MetronomStore {
  constructor() {
    makeAutoObservable(this);
    this.metronom();
  }

  metronomState: MetronomDataType = MetronomDataInitial;

  isPlaying: boolean = false;
  sound: Sound | null = null;

  withoutSound = 0;

  soundIntervalState = null;

  etapData = [1, 2, 3, 4];

  setMetronomCountMinut = (key: string) => {
    if (key === 'add') {
      if (this.metronomState.beatCount < 240) {
        this.metronomState.countMinut++;
        this.metronomState.beatCount++;
      }
    }
    if (key === 'remove') {
      if (this.metronomState.beatCount > 1) {
        this.metronomState.countMinut--;
        this.metronomState.beatCount--;
      }
    }
  };
  setMetronomState = (key: keyof MetronomDataType, value: any) => {
    this.metronomState[key] = value as never;
  };

  metronom = () => {
    this.sound = new Sound(Sounds.sound3, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      } else {
        return;
      }
    });
  };

  newPlaySound = () => {};

  soundInterval = () => {
    this.soundIntervalState = setInterval(() => {
      if (this.sound && this.isPlaying) {
        if (
          this.metronomState.oneWithoutSound &&
          this.metronomState.etapLine % 2 === 0
        ) {
          runInAction(() => {
            if (this.metronomState.etapLine < 2) {
              this.metronomState.etapLine++;
            } else {
              this.metronomState.etapLine = 1;
            }
            if (this.metronomState.etap < this.metronomState.etapCount) {
              this.metronomState.etap++;
            } else {
              this.metronomState.etap = 1;
            }
          });
        } else {
          this.sound.play(success => {
            if (!success) {
              runInAction(() => {
                this.isPlaying = false;
              });
            } else {
              this.sound.stop();
            }
          });
          runInAction(() => {
            if (this.metronomState.etapLine < 2) {
              this.metronomState.etapLine++;
            } else {
              this.metronomState.etapLine = 1;
            }
            if (this.metronomState.etap < this.metronomState.etapCount) {
              this.metronomState.etap++;
            } else {
              this.metronomState.etap = 1;
            }
          });
        }
      } else {
        return;
      }
    }, Math.round(60000 / this.metronomState.countMinut));
  };

  setEtapCount = (num: number) => {
    let newData = [];
    for (let index = 1; index <= num; index++) {
      newData.push(index);
    }
    runInAction(() => {
      this.etapData = newData;
      this.metronomState.etapCount = num;
    });
  };

  playPause = () => {
    if (!this.sound) {
      return;
    }
    if (this.isPlaying) {
      this.sound.stop();
      clearInterval(this.soundIntervalState);
      this.isPlaying = false;
    } else {
      this.isPlaying = true;
      this.soundInterval();
    }
  };

  playSound = () => {
    if (this.isPlaying) {
      this.soundInterval();
    }
  };

  stopSound = () => {
    runInAction(() => {
      this.sound.stop();
      clearInterval(this.soundIntervalState);
    });
  };

  clearState = () => {
    clearInterval(this.soundIntervalState);
    this.sound.stop();
    this.isPlaying = false;
    this.metronomState = MetronomDataInitial;
    this.etapData = [1, 2, 3, 4];
  };
}
