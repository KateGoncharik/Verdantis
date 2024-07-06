import type { JSX } from 'react';

import { Box } from '@mui/material';

import { Footer } from '../footer';
import { Header } from '../header';
import { PageContent } from '../page-content';

export const RootLayout = (): JSX.Element => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <PageContent />
      <Footer />
    </Box>
  );
};
