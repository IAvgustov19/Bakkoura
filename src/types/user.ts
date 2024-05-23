export type UserType = {
  id: '';
  name: string;
  username: string;
  email: string;
  password: string;
  country: string;
  language: string;
  avatar: string;
  secureEntry: string;
  organizeMenu: string;
  startScreen: string;
  emailVerified: boolean;
  isVerified: boolean;
  inActiveMenus: string[];
};

export const UserInitial: UserType = {
  id: '',
  name: '',
  username: '',
  email: '',
  password: '',
  country: '',
  language: 'EN',
  avatar: '',
  secureEntry: 'Free',
  organizeMenu: '',
  startScreen: '',
  emailVerified: false,
  isVerified: false,
  inActiveMenus: [],
};

export type LoginStateType = {
  email: string;
  password: string;
  repeatPassword: string;
};

export const LoginStateInitial = {
  email: '',
  password: '',
  repeatPassword: '',
};
