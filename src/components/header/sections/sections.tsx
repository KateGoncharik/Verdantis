import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Button, Stack } from '@mui/material';

import { useCartStore } from '@/stores/cart-store';

import { headerButtonsStyles, sectionsLabels } from '../navigation.constants';

export const Sections: FC = () => {
  const cart = useCartStore((state) => state.cart);
  return (
    <Stack className="gap-2" direction={'row'} sx={{ color: 'primary.contrastText' }}>
      {sectionsLabels.map((label) =>
        label === 'cart' ? (
          <Button component={RouterLink} key={label} sx={headerButtonsStyles} to={label}>
            {label}
            <ShoppingCartOutlinedIcon data-testid="cart-icon" />
            <span data-testid="cart-items-count">
              {cart?.lineItems.reduce((sum, item) => item.quantity + sum, 0) ?? 0}
            </span>
          </Button>
        ) : (
          <Button component={RouterLink} key={label} sx={headerButtonsStyles} to={label}>
            {label}
          </Button>
        ),
      )}
    </Stack>
  );
};
