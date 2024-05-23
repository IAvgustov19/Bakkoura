export type PersonalAreaStateType = {
  secureEntry: string;
  language: string;
  name: string;
};

export const PersonalAreaStateInitial: PersonalAreaStateType = {
  secureEntry: 'Free',
  language: 'English',
  name: 'Jihad Bakkoura',
};

export type PersonalMenuType = {
  title: string;
  key: string;
};

export const PersonalMenuInitial: PersonalMenuType[] = [
  {
    title: '',
    key: '',
  },
];
