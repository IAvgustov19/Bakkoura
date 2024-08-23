import {APP_ROUTES} from '../navigation/routes';
import {ImageSourcePropType} from 'react-native';

export type TimeBioticListType = {
  id: number;
  title: string;
  info: string;
  navigate: string;
  isbtn: boolean;
};

export const TimeBioticList: TimeBioticListType[] = [
  {
    id: 1,
    title: 'Send Your Idea',
    info: 'If you have an idea, we can bring it to life...',
    navigate: APP_ROUTES.SEND_IDEA,
    isbtn: false,
  },
  {
    id: 2,
    title: 'BTS navigtion',
    info: 'Details about the concept...',
    navigate: APP_ROUTES.BTS_NAVIGATION,
    isbtn: false,
  },
  {
    id: 3,
    title: 'Assestment Watch',
    info: 'Details about the concept...',
    navigate: APP_ROUTES.WATCH_VALUATION,
    isbtn: false,
  },
  {
    id: 4,
    title: 'Watch Constructor',
    info: 'You can create a watch using the constructor...',
    navigate: APP_ROUTES.WATCH_VALUATION,
    isbtn: false,
  },
  {
    id: 5,
    title: 'Wallpapers',
    info: 'An updated list of wallpapers of brand watches',
    navigate: APP_ROUTES.WALLPAPERS,
    isbtn: false,
  },
  {
    id: 6,
    title: 'Contact Us',
    info: 'If you have an idea, we can bring it to life...',
    navigate: APP_ROUTES.CONTACT_US,
    isbtn: false,
  },
];
