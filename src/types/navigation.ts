import { APP_ROUTES } from "../navigation/routes";
export type RootStackParamList = {
    [APP_ROUTES.DIALOG_SCREEN]: {
        uid: string;
        name: string;
        avatar: string;
    };
  };