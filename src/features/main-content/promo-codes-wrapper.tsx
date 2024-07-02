import { FC } from 'react';

import { CircularProgress, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getProductById } from '@/lib/axios/requests/get-product-by-id';
import { useTokenStore } from '@/stores/token-store';

import { PromoCode } from './promo-code';

const promoCodes = {
  bouquets: {
    description: '- 20% discount on bouquets',
    name: 'BLOOMING20',
    productId: '85e1f1ea-d573-4c2a-881e-21529403f62d',
  },
  everything: {
    description: '- 10% discount for everyone and everything',
    name: 'PLANTJOY10',
    productId: '2848d327-31bf-4ce0-86d7-a5259d464e5a',
  },
} as const;

export const PromoCodesWrapper: FC = () => {
  const { token } = useTokenStore();

  const { data: bouquet } = useQuery({
    queryFn: () => getProductById(promoCodes.bouquets.productId, token),
    queryKey: ['bouquet', promoCodes.bouquets.productId, token],
    throwOnError: true,
  });
  const { data: forEverything, isLoading } = useQuery({
    queryFn: () => getProductById(promoCodes.everything.productId, token),
    queryKey: ['everything', promoCodes.everything.productId, token],
    throwOnError: true,
  });

  return isLoading ? (
    <Stack>
      <Typography className="text-center" sx={{ fontSize: { lg: '55px', md: '45px', xs: '35px' } }}>
        Promo codes
      </Typography>

      <CircularProgress />
    </Stack>
  ) : (
    <Stack>
      <Typography className="text-center" sx={{ fontSize: { lg: '55px', md: '45px', xs: '35px' } }}>
        Promo codes
      </Typography>

      <Stack className="flex flex-row flex-wrap justify-center gap-4 p-5">
        <PromoCode description={promoCodes.bouquets.description} product={bouquet} text={promoCodes.bouquets.name} />
        <PromoCode
          description={promoCodes.everything.description}
          product={forEverything}
          text={promoCodes.everything.name}
        />
      </Stack>
    </Stack>
  );
};
