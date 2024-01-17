export type User = {
  id: number;
  name: string;
  email: string;
};

export type Payment = {
  cardNumber: string;
  cardExpiry: string;
  birth: string;
  cardPwd2digit: string;
  cardCvc: string;
  subscription: boolean;
};
