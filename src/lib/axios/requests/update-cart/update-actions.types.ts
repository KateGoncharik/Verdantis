export type AddItem = {
  action: 'addLineItem';
  addedAt?: string;
  productId: string;
  quantity?: number;
  sku?: string;
  variantId?: number;
};

export type RemoveItem = {
  action: 'removeLineItem';
  lineItemId?: string;
  lineItemKey?: string;
  quantity?: number;
};

export type ChangeItemQuantity = {
  action: 'changeLineItemQuantity';
  lineItemId?: string;
  lineItemKey?: string;
  quantity: number;
};

export type AddPromocode = {
  action: 'addDiscountCode';
  code: string;
};

export type CartUpdateAction = AddItem | AddPromocode | ChangeItemQuantity | RemoveItem;
