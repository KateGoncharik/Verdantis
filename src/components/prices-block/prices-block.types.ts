import { z } from 'zod';

import { type Price, discountedSchema } from '@/lib/axios/schemas/get-product-by-id.schema';
import { valueSchema } from '@/lib/axios/schemas/product-schema';

export type PriceBlockProps = {
  price?: Price;
  styleDiscount?: Record<number | string, string>;
  stylePrice?: string;
  totalPrice?: PriceValue;
};

export interface DiscountedPriceWithTotalProps extends PriceBlockProps {
  discounted: Discount;
  formatPrice: (amount: number, currencyCode: string, fractionDigits: number) => string;
  totalPrice: PriceValue;
  value: PriceValue;
}
export interface DiscountedPriceProps extends PriceBlockProps {
  discounted: Discount;
  formatPrice: (amount: number, currencyCode: string, fractionDigits: number) => string;
  value: PriceValue;
}

export interface GeneralPriceWithTotalProps extends GeneralPriceProps {
  totalPrice: PriceValue;
}

export interface GeneralPriceProps extends PriceBlockProps {
  formatPrice: (amount: number, currencyCode: string, fractionDigits: number) => string;
  value: PriceValue;
}

type PriceValue = z.infer<typeof valueSchema>;
type Discount = z.infer<typeof discountedSchema>;
