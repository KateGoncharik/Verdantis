import { FC } from 'react';

import { Alert, Button, Collapse, Stack, Typography } from '@mui/material';
import { ReactJSXElement } from 'node_modules/@emotion/react/types/jsx-namespace';

export const RegistrationForm: FC = () => {
  return (
    <form className="ml-auto mr-auto mt-0 flex max-w-80  flex-col gap-2 " onSubmit={(e) => console.log(e)}>
      <Stack sx={{ flexDirection: 'column' }} width={'100%'}>
        <AddressesTitle />
        <Stack sx={{ flexDirection: 'row' }} width={'100%'}></Stack>
      </Stack>
      {
        <Collapse in={!!true}>
          <Alert severity="warning">{'error'}</Alert>
        </Collapse>
      }
      <Button type="submit" variant="contained">
        Register
      </Button>
    </form>
  );
};

const AddressesTitle = (): ReactJSXElement => (
  <Typography component={'h3'} sx={{ fontSize: { lg: 40, md: 32, sm: 24 } }} textAlign={'center'}>
    Addresses
  </Typography>
);
