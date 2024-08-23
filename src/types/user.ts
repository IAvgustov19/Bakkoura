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
  initialRouteName: string;
  emailVerified: boolean;
  isVerified: boolean;
  inActiveMenus: string[];
  theme: string;
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
  initialRouteName: 'HomeScreen',
  emailVerified: false,
  isVerified: false,
  inActiveMenus: [],
  theme: 'dark',
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

export type InitialRouteNameType = {
  title: string;
  key: string;
  routeName: string;
};
export const InitialRouteNameInitial = {
  title: 'Home',
  key: 'home',
  routeName: 'HomeScreen',
};
