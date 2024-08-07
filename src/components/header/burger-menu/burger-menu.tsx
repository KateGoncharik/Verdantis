import { FC, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Button, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import { sectionsLabels } from '../navigation.constants';

export const BurgerMenu: FC = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <div>
      <Button className="mx-1" onClick={toggleDrawer(true)} sx={{ color: 'primary.contrastText', fontSize: '1em' }}>
        Menu
      </Button>
      <Drawer anchor="right" onClose={toggleDrawer(false)} open={open}>
        <Box onClick={toggleDrawer(false)} role="presentation" sx={{ bgcolor: 'primary.light', width: 250 }}>
          <List sx={{ bgcolor: 'primary.light' }}>
            {sectionsLabels.map((label) => (
              <ListItem disablePadding key={label}>
                <ListItemButton component={RouterLink} to={label}>
                  <ListItemText primary={label.toUpperCase()} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
};
