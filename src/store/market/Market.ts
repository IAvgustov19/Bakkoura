import {makeAutoObservable, runInAction} from 'mobx';
import {OrderStateInitial, OrderStateType} from '../../types/market';

export class MarketStore {
  constructor() {
    makeAutoObservable(this);
  }

  webViewLink: string = '';

  orderState: OrderStateType = OrderStateInitial;

  onHandleWebVIew = (link: string) => {
    runInAction(() => {
      this.webViewLink = link;
    });
  };

  setOrderState = (key: keyof OrderStateType, value: any) => {
    this.orderState[key] = value as never;
  };

  deleteFile = () => {
    runInAction(() => {
      this.orderState.file = '';
    });
  };
  // sendEmail = async () => {
  //   try {
  //     let transporter = nodemailer.createTransport({
  //       service: 'Gmail', // Use your email service here
  //       auth: {
  //         user: 'nurulloh1809@gmail.com', // Your email address
  //         pass: 'n18092004!', // Your email password or app-specific password
  //       },
  //     });

  //     let info = await transporter.sendMail({
  //       from: '"Your Name" <nurulloh1809@gmail.com>', // Sender's name and email
  //       to: 'nurulloh1804@gmail.com', // List of recipients
  //       subject: 'Test Email', // Subject line
  //       text: 'This is a test email from Nodemailer.', // Plain text body
  //       html: '<b>This is a test email from <i>Nodemailer</i>.</b>', // HTML body
  //     });

  //     console.log('Email sent: ', info.response);
  //   } catch (error) {
  //     console.error('Error sending email: ', error);
  //   }
  // };
}
