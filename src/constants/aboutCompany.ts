import {APP_ROUTES} from '../navigation/routes';
import {ImageSourcePropType} from 'react-native';

import {t} from '../i18n'

export type AboutListType = {
  id: number;
  title: string;
  navigate: string;
  isbtn: boolean;
};

export const AboutList: AboutListType[] = [
  {
    id: 1,
    title: `${t("About Jihad Bakkoura")}`,
    navigate: APP_ROUTES.JIHAD_BAKKOURA_TIME_CLINIC,
    isbtn: false,
  },
  {
    id: 2,
    title: 'Franc Villa',
    navigate: APP_ROUTES.FRANS_VILA,
    isbtn: false,
  },
  {
    id: 3,
    title: 'Time Wealth',
    navigate: APP_ROUTES.TIME_WEALTH,
    isbtn: false,
  },
];
