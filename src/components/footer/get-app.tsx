import { FC } from 'react';

import GetAppIcon from '@mui/icons-material/GetApp';
import { Icon, Stack, Typography } from '@mui/material';

export const BigGetApp: FC = () => {
  return (
    <Stack
      className="align-center flex  flex-col justify-between"
      sx={{
        border: '1px solid white',
        padding: '2%',
        width: { lg: '15%', md: '30%', sm: '40%', xs: '40%' },
      }}
    >
      <Typography sx={{ fontSize: { lg: '22px', md: '20px', xs: '16px' }, fontWeight: '600' }} textAlign="center">
        Verdantis application
      </Typography>
      <a href="https://verdantis.netlify.app/about" rel="noreferrer" target="_blank">
        <Icon
          alt="qr"
          className="h-full w-full"
          component="img"
          src={'http://qrcoder.ru/code/?https%3A%2F%2Fverdantis.netlify.app%2Fabout&4&0'}
        />
      </a>
      <Typography sx={{ fontSize: { lg: '16px', md: '16px', xs: '14px' } }} textAlign="center">
        Scan it with your camera to download the application
      </Typography>
    </Stack>
  );
};

export const SmallGetApp: FC = () => {
  return (
    <>
      <Typography sx={{ fontSize: { lg: '22px', md: '20px', xs: '16px' } }} textAlign="center">
        Get the application
      </Typography>
      <a className="no-underline" href="https://verdantis.netlify.app/about" rel="noreferrer" target="_blank">
        <GetAppIcon sx={{ color: 'primary.contrastText', margin: '2%' }} />
      </a>
    </>
  );
};
