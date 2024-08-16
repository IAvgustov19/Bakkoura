import {makeAutoObservable, runInAction} from 'mobx';
import {Alert, Platform, PermissionsAndroid} from 'react-native';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {
  OrderStateInitial,
  OrderStateType,
  WallpapersType,
} from '../../types/market';
import {EmailDataType} from '../../types/personalArea';
import {RootStore} from '../rootStore';
import storage from '@react-native-firebase/storage';
import {getQueryParamValue} from '../../helper/helper';
import RNFetchBlob from 'rn-fetch-blob';

export class TimeBioticStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
    this.getWallpapers();
  }
  emailJs = 'https://api.emailjs.com/api/v1.0/email/send';
  serviceId = 'service_63wgkmk';
  templateId = 'template_uc8db2m';
  publicKey = 'GK1xXRxQ4cjSlxpzi';
  formState: OrderStateType = OrderStateInitial;
  sendEmailLoading = false;
  responseText = null;
  isvalidEmail = false;

  allWallpapers = new Map<string, WallpapersType>();

  get getAllWallpapers() {
    return Array.from(this.allWallpapers.values());
  }

  selectedWallpapers = new Map<string, WallpapersType>();

  get getSelectedWallpapers() {
    return Array.from(this.selectedWallpapers.values());
  }

  setFormState = (key: keyof OrderStateType, value: OrderStateType) => {
    this.formState[key] = value as never;
  };

  setSelectedWallpapers = (item: WallpapersType) => {
    runInAction(() => {
      if (this.selectedWallpapers.has(item.id)) {
        this.selectedWallpapers.delete(item.id);
      } else {
        this.selectedWallpapers.set(item.id, item);
      }
    });
  };

  listRef = storage().ref('wallpapers/');

  getWallpapers = () => {
    storage()
      .ref('wallpapers')
      .listAll()
      .then(res => {
        res.items.forEach(itemRef => {
          itemRef
            .getDownloadURL()
            .then(url => {
              // console.log('url', url);
              this.allWallpapers.set(getQueryParamValue(url, 'token'), {
                id: getQueryParamValue(url, 'token'),
                imgUrl: url as never,
              });
            })
            .catch(error => {
              console.error('Error:', error);
            });
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  setIsEmail = (value: boolean) => {
    runInAction(() => {
      this.isvalidEmail = value;
    });
  };

  onSubmitEmail = async (
    data: OrderStateType,
    type: string,
    callBack?: () => void,
  ) => {
    runInAction(() => {
      this.sendEmailLoading = true;
    });

    const emailData: EmailDataType = {
      service_id: this.serviceId,
      template_id: this.templateId,
      user_id: this.publicKey,
      template_params: {
        type: type,
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: data.message,
        file: data.file,
        country: data.country,
      },
    };
    if ((data.isAccept === true && data.phone && type, this.isvalidEmail)) {
      try {
        const response = await fetch(this.emailJs, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData),
        });
        if (response) {
          runInAction(() => {
            this.responseText =
              'Successfully sended, we will contact with you soon';
            this.sendEmailLoading = false;
          });

          callBack();
          this.clearState();
        }
      } catch (err) {
        runInAction(() => {
          this.sendEmailLoading = false;
          this.responseText = 'Error, something went wrong';
        });
        Alert.alert(err);
        console.log('error', err);
      }
    } else {
      Alert.alert(
        'Something wrong please accept privacy policy and fill your form',
      );
      runInAction(() => {
        this.sendEmailLoading = false;
      });
    }
  };

  clearState = () => {
    runInAction(() => {
      this.root.marketStore.orderState = OrderStateInitial;
    });
  };

  requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Access is required to send photos and videos to the chat, upload avatars to your profile, and send materials to the support service',
            buttonPositive: '',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  saveImagesToGallery = async images => {
    const hasPermission = await this.requestStoragePermission();
    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'Storage permission is required to save photos',
      );
      return;
    }

    for (const image of images) {
      try {
        const response = await RNFetchBlob.fetch('GET', image.imgUrl);
        const filePath = `${
          RNFetchBlob.fs.dirs.DocumentDir
        }/image_${Date.now()}.jpg`;

        await RNFetchBlob.fs.writeFile(filePath, response.data, 'base64');
        const isSave = await CameraRoll.save(filePath);
        runInAction(() => {
          this.selectedWallpapers.clear();
        });
        console.log('isSave', isSave);
      } catch (error) {
        console.error('Error saving image:', error);
      }
    }
  };
}

const obj = {name: 'hello', id: 1};

console.log('obj', new Map(Object.entries(obj)));
