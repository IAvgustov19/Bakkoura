export type OrderStateType = {
  type: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  file: string;
  isAccept?: boolean;
  country: string;
};

export const OrderStateInitial: OrderStateType = {
  type: '',
  name: '',
  phone: '',
  email: '',
  message: '',
  file: '',
  isAccept: false,
  country: '',
};
