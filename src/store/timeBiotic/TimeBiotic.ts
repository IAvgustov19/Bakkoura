import {makeAutoObservable, runInAction} from 'mobx';
import {Alert} from 'react-native';
import {OrderStateInitial, OrderStateType} from '../../types/market';
import {EmailDataType} from '../../types/personalArea';
import {RootStore} from '../rootStore';

export class TimeBioticStore {
  private readonly root: RootStore;
  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  serviceId = 'service_63wgkmk';
  templateId = 'template_uc8db2m';
  publicKey = 'GK1xXRxQ4cjSlxpzi';
  formState: OrderStateType = OrderStateInitial;
  sendEmailLoading = false;
  responseText = null;
  isvalidEmail = false;

  setFormState = (key: keyof OrderStateType, value: OrderStateType) => {
    this.formState[key] = value as never;
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
        const response = await fetch(
          'https://api.emailjs.com/api/v1.0/email/send',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData),
          },
        );
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
        // Alert.alert(err);
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
}
