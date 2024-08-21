import {APP_ROUTES} from '../navigation/routes';

export type ContactListType = {
  id: number;
  title: string;
  navigate: string;
  isbtn: boolean;
};

export const ContactList: ContactListType[] = [
  {
    id: 1,
    title: 'Contact Us',
    navigate: APP_ROUTES.CONTACT_US,
    isbtn: false,
  },
  {
    id: 2,
    title: 'Send Idea',
    navigate: APP_ROUTES.SEND_IDEA,
    isbtn: false,
  },
  {
    id: 3,
    title: 'Assestment Watch',
    navigate: APP_ROUTES.WATCH_VALUATION,
    isbtn: false,
  },
];
