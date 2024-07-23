import { Dispatch, SetStateAction, useState } from 'react';
import { type FC, MutableRefObject } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { createCart } from '@/lib/axios/create-cart';
import { Cart, useCartStore } from '@/stores/cart-store';

import { dialogButtonStyles } from './cart-constants';

type ClearCartData = {
  cart: Cart;
  resetStore: () => void;
  setterForCartRef: SetterForCartRef;
  setterForDialog: Dispatch<SetStateAction<boolean>>;
};

export type SetterForCartRef = MutableRefObject<(cart: Cart) => void>;

const handleClearCart = ({ cart, resetStore, setterForCartRef, setterForDialog }: ClearCartData): void => {
  if (!cart) {
    throw new Error('Token and cart expected');
  }
  resetStore();
  setterForCartRef.current(createCart());

  setterForDialog(false);
};

export const ClearCart: FC<{ setterForCartRef: SetterForCartRef }> = ({ setterForCartRef }) => {
  const { cart, resetStore } = useCartStore();
  if (!cart) {
    throw new Error('Cart expected');
  }
  const [open, setOpen] = useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleCancel = (): void => {
    setOpen(false);
  };
  const isDisabled = cart?.products.length === 0;
  return (
    <>
      <Button disabled={isDisabled} onClick={handleClickOpen} variant="contained">
        <DeleteIcon />
      </Button>
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        onClose={handleCancel}
        open={open}
      >
        <DialogTitle id="alert-dialog-title" sx={{ bgcolor: 'primary.contrastText', textAlign: 'center' }}>
          Clear cart
        </DialogTitle>
        <DialogContent sx={{ bgcolor: 'primary.contrastText' }}>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: '2em', padding: '20%' }}>
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            bgcolor: 'primary.contrastText',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10%',
          }}
        >
          <Button onClick={handleCancel} sx={{ ...dialogButtonStyles }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!cart) {
                throw new Error('Token and cart expected');
              }
              handleClearCart({ cart, resetStore, setterForCartRef, setterForDialog: setOpen });
            }}
            sx={dialogButtonStyles}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
