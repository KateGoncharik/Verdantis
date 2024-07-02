import { Dispatch, SetStateAction, useState } from 'react';
import { type FC, MutableRefObject } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { createCart } from '@/lib/axios/requests/create-cart';
import { deleteCart } from '@/lib/axios/requests/delete-cart';
import { CartResponse } from '@/lib/axios/requests/schemas/cart-schema';
import { useCartStore } from '@/stores/cart-store';
import { useTokenStore } from '@/stores/token-store';

type ClearCartData = {
  cart: CartResponse;
  setterForCartRef: SetterForCartRef;
  setterForDialog: Dispatch<SetStateAction<boolean>>;
  token: string;
};

export type SetterForCartRef = MutableRefObject<(cart: CartResponse) => void>;

const handleClearCart = ({ cart, setterForCartRef, setterForDialog, token }: ClearCartData): void => {
  if (!token || !cart) {
    throw new Error('Token and cart expected');
  }
  deleteCart(token, cart.id, cart.version).then(
    () => {
      createCart(token).then(
        (cart) => {
          setterForCartRef.current(cart);
        },
        () => {},
      );
    },
    (err) => console.error(err),
  );
  setterForDialog(false);
};

export const ClearCart: FC<{ setterForCartRef: SetterForCartRef }> = ({ setterForCartRef }) => {
  const { cart } = useCartStore();
  const { token } = useTokenStore();

  const [open, setOpen] = useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleCancel = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} variant="contained">
        Clear cart
      </Button>
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        onClose={handleCancel}
        open={open}
      >
        <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: 'primary.light' }}>
          Clear cart
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: 'primary.light' }}>
          <DialogContentText id="alert-dialog-description">Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: 'primary.main' }}>
          <Button onClick={handleCancel} sx={{ color: 'primary.contrastText' }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!token || !cart) {
                throw new Error('Token and cart expected');
              }
              handleClearCart({ cart, setterForCartRef, setterForDialog: setOpen, token });
            }}
            sx={{ color: 'primary.contrastText' }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
