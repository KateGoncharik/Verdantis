import { FC, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Box, Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import { useCartStore } from '@/stores/cart-store';

import { ManagedList } from '..';
import { sectionsLabels } from '../navigation.constants';

export const BurgerMenu: FC = () => {
  const [open, setOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <div>
      <Button className="mx-1" onClick={toggleDrawer(true)} sx={{ color: 'primary.contrastText', fontSize: '1em' }}>
        Menu
      </Button>
      <Drawer anchor="right" onClose={toggleDrawer(false)} open={open}>
        <Box onClick={toggleDrawer(false)} role="presentation" sx={{ backgroundColor: 'primary.light', width: 250 }}>
          <List sx={{ backgroundColor: 'primary.light' }}>
            {sectionsLabels.map((label) =>
              label === 'cart' ? (
                <ListItem disablePadding key={label}>
                  <ListItemButton component={RouterLink} to={label}>
                    <ListItemText primary={label.toUpperCase()} />
                    <ShoppingCartOutlinedIcon data-testid="cart-icon" />
                    <span data-testid="cart-items-count">{cart?.lineItems.length ?? 0}</span>
                  </ListItemButton>
                </ListItem>
              ) : (
                <ListItem disablePadding key={label}>
                  <ListItemButton component={RouterLink} to={label}>
                    <ListItemText primary={label.toUpperCase()} />
                  </ListItemButton>
                </ListItem>
              ),
            )}
          </List>
          <Divider />
          <ManagedList />
        </Box>
      </Drawer>
    </div>
  );
};
