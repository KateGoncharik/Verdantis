import { FC } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

import { useTokenStore } from '@/stores/token-store';

import { buttonsLabels } from '../navigation.constants';

export const ManagedList: FC = () => {
  const navigate = useNavigate();
  const { resetStore, type } = useTokenStore();
  const isLoggedIn = type === 'password';
  const handleLogout = (): void => {
    void resetStore();
    navigate('/');
  };
  return isLoggedIn ? (
    <List>
      <ListItem disablePadding key={'LOGOUT'}>
        <ListItemButton onClick={handleLogout}>
          <ListItemText primary={'LOGOUT'} />
        </ListItemButton>
      </ListItem>
    </List>
  ) : (
    <List>
      {buttonsLabels.map((text) => (
        <ListItem disablePadding key={text}>
          <ListItemButton component={RouterLink} to={text}>
            <ListItemText primary={text.toUpperCase()} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
