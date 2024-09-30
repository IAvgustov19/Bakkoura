import {APP_ROUTES} from '../navigation/routes';
import {t} from '../i18n'

export type OtherListType = {
  id: number;
  title: string;
  info: string;
  navigate: string;
  isbtn: boolean;
};

export const OtherList: OtherListType[] = [
  {
    id: 1,
    title: `${t('Time Clinic')}`,
    info: `${t('time_clinic_desc')}`,
    navigate: APP_ROUTES.TIME_CLINIC,
    isbtn: false,
  },
  {
    id: 2,
    title: `${t('Watch Constructor')}`,
    info: `${t('Constructor_desc')}`,
    navigate: APP_ROUTES.WATCH_CONSTRUCTOR,
    isbtn: false,
  },
  {
    id: 3,
    title: `${t('Wallpapers')}`,
    info: `${t('wallpaper_desc')}`,
    navigate: APP_ROUTES.WALLPAPERS,
    isbtn: false,
  },
  {
    id: 4,
    title: `${t('BTS navigation')}`,
    info: `${t('Description of each section of the application')}`,
    navigate: APP_ROUTES.BTS_NAVIGATION,
    isbtn: false,
  },
  {
    id: 5,
    title: `${t('30H Concept')}`,
    info: `${t('details_about')}`,
    navigate: APP_ROUTES.CONCEPT_30H,
    isbtn: false,
  },
  {
    id: 6,
    title: `${t('About Company')}`,
    info: `${t('Learn more about the company, the founder')}`,
    navigate: APP_ROUTES.JIHAD_BAKKOURA,
    isbtn: false,
  },
  {
    id: 7,
    title: `${t('Contact Us')}`,
    info: `${t('Here you can contact technical support, send your idea and more')}`,
    navigate: APP_ROUTES.CONTACT_STACK,
    isbtn: false,
  },
];
