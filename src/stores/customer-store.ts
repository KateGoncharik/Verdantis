import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Customer } from '@/lib/axios/requests/schemas/customer.schema';

type CustomerState = {
  customer: Customer | null;
  resetStore: () => void;
  setCustomer: (customerInfo: Customer) => void;
};

export const useCustomerStore = create<CustomerState>()(
  devtools(
    persist(
      (set) => ({
        customer: null,
        resetStore: () => {
          set({ customer: null });
        },
        setCustomer: (customer) => set({ customer }),
      }),
      { name: 'verdantisCustomer' },
    ),
  ),
);
