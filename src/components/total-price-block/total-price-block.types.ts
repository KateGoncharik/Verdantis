import { DiscountOnTotalPrice } from '@/lib/axios/requests/schemas/cart-schema';

export type TotalPriceProps = {
  discountOnTotalPrice?: DiscountOnTotalPrice;
  totalPrice?: TotalPrice;
};

type TotalPrice = {
  centAmount: number;
  currencyCode: string;
  fractionDigits: number;
  type: string;
};
