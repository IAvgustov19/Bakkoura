import { APP_ROUTES } from "../navigation/routes";
export type RootStackParamList = {
    [APP_ROUTES.DIALOG_SCREEN]: {
        id: string;
        name: string;
        avatar: string;
    };
    [APP_ROUTES.PROFILE_PAGE]: {
        lastSeen: string;
        avatar?: string;
        name: string;
    };
  };

  