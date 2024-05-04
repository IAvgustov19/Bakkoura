export type OrderStateType = {
  name: string;
  phone: string;
  email: string;
  comment: string;
  file: string;
  isAccept: boolean;
};

export const OrderStateInitial: OrderStateType = {
  name: '',
  phone: '',
  email: '',
  comment: '',
  file: '',
  isAccept: false,
};
