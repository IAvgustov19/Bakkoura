import {makeAutoObservable, runInAction} from 'mobx';
import {MetronomDataInitial, MetronomDataType} from '../../types/alarm';
import Sound from 'react-native-sound';
import {Sounds} from '../../assets';

Sound.setCategory('Playback');

export class MetronomStore {
  constructor() {
    makeAutoObservable(this);
    this.soundInterval();
    this.metronom();
    this.sound.setSpeed(
      Math.round(Math.abs(this.metronomState.countMinut / 60)),
    );
  }

  metronomState: MetronomDataType = MetronomDataInitial;

  isPlaying: boolean = false;
  sound: Sound | null = null;

  withoutSound = 0;

  soundIntervalState = null;

  setMetronomCountMinut = (key: string) => {
    if (key === 'add') {
      this.metronomState.countMinut++;
    }
    if (key === 'remove') {
      this.metronomState.countMinut--;
    }
  };
  setMetronomState = (key: keyof MetronomDataType, value: any) => {
    this.metronomState[key] = value as never;
  };

  metronom = () => {
    this.sound = new Sound(Sounds.metronom, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      } else {
        return;
      }
    });
  };

  soundInterval = () => {
    this.soundIntervalState = setInterval(() => {
      if (this.sound && this.isPlaying) {
        this.sound.play(success => {
          if (!success) {
            runInAction(() => {
              this.isPlaying = false;
            });
          }
          runInAction(() => {
            this.metronomState.beatCount--;

            if (this.metronomState.etap < 4) {
              this.metronomState.etap++;
            } else {
              this.metronomState.etap = 1;
            }
            if (
              this.metronomState.oneWithoutSound &&
              this.metronomState.etap % 2 === 0
            ) {
              this.sound.setVolume(0);
            } else {
              this.sound.setVolume(1);
            }
          });
        });
        if (this.metronomState.beatCount === 0) {
          runInAction(() => {
            this.clearState();
          });
        }
      }
    }, Math.round(60000 / this.metronomState.countMinut));
  };

  playPause = () => {
    this.soundInterval();
    if (!this.sound) {
      return;
    }
    if (this.isPlaying) {
      runInAction(() => {
        this.sound.pause();
        this.isPlaying = false;
      });
    } else {
      this.isPlaying = true;
      // this.soundInterval();

      // this.sound.play(success => {
      //   if (success) {
      //     this.sound.play(secondSuccess => {
      //       if (secondSuccess) {
      //         runInAction(() => {
      //           this.isPlaying = false;
      //         });
      //       } else {
      //       }
      //     });
      //   } else {
      //   }
      // });
    }
  };

  clearState = () => {
    clearInterval(this.soundIntervalState);
    this.sound.stop();
    this.isPlaying = false;
    this.metronomState = MetronomDataInitial;
  };
}
