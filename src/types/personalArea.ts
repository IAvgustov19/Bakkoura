import {OrderStateInitial, OrderStateType} from './market';

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

export type EmailDataType = {
  service_id: string;
  template_id: string;
  user_id: string;
  template_params: OrderStateType;
};

export const EmailDataTypeInitial = {
  service_id: '',
  template_id: '',
  user_id: '',
  template_params: OrderStateInitial,
};
