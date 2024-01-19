export type Card = {
  cardNumber: string;
  cardExpiry: string;
  birth: string;
  cardPwd2digit: string;
  cardCvc: string;
  subscription: boolean;
};

export type Payment = {
  id: number;
  merchantUid: string;
  amount: number | string;
  paidAt: string | null;
};

export type PaymentList = {
  items: Payment[];
  totalCount: number;
};
