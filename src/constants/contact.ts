import {APP_ROUTES} from '../navigation/routes';
import {t} from '../i18n'

export type ContactListType = {
  id: number;
  title: string;
  navigate: string;
  isbtn: boolean;
};

export const ContactList: ContactListType[] = [
  {
    id: 1,
    title: `${t("Contact Us")}`,
    navigate: APP_ROUTES.CONTACT_US,
    isbtn: false,
  },
  {
    id: 2,
    title: `${t("Send idea")}`,
    navigate: APP_ROUTES.SEND_IDEA,
    isbtn: false,
  },
  {
    id: 3,
    title: `${t("Assestment Watch")}`,
    navigate: APP_ROUTES.WATCH_VALUATION,
    isbtn: false,
  },
];
