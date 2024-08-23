import {APP_ROUTES} from '../navigation/routes';

export type OtherListType = {
  id: number;
  title: string;
  info: string;
  navigate: string;
  isbtn: boolean;
  key?: string;
};

export const OtherList: OtherListType[] = [
  {
    id: 1,
    title: 'Time Clinic',
    info: 'If you have an idea, we can bring it to life...',
    navigate: APP_ROUTES.TIME_CLINIC,
    isbtn: false,
    key: 'timeClinic',
  },
  {
    id: 2,
    title: 'Watch Constructor',
    info: 'Details about the concept...',
    navigate: APP_ROUTES.WATCH_CONSTRUCTOR,
    isbtn: false,
    key: 'watchConstructor',
  },
  {
    id: 3,
    title: 'Wallpapers',
    info: 'Details about the concept...',
    navigate: APP_ROUTES.WALLPAPERS,
    isbtn: false,
    key: 'wallpapers',
  },
  {
    id: 4,
    title: 'BTS Navigation',
    info: 'You can create a watch using the constructor...',
    navigate: APP_ROUTES.BTS_NAVIGATION,
    isbtn: false,
    key: 'btsNav',
  },
  {
    id: 5,
    title: 'Concepts 30h',
    info: 'An updated list of wallpapers of brand watches',
    navigate: APP_ROUTES.CONCEPT_30H,
    isbtn: false,
    key: 'concepts30h',
  },
  {
    id: 6,
    title: 'About',
    info: 'You can create a watch using the constructor...',
    navigate: APP_ROUTES.JIHAD_BAKKOURA,
    isbtn: false,
    key: 'about',
  },
  {
    id: 7,
    title: 'Contact',
    info: 'An updated list of wallpapers of brand watches',
    navigate: APP_ROUTES.CONTACT_STACK,
    isbtn: false,
    key: 'contact',
  },
];
