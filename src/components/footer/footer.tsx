import { FC, ReactNode } from 'react';

import { Link, Typography, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Stack } from '@mui/system';

import githubLogo from '@/assets/icon/github-mark-white.svg';
import { gitLinkStyle, teamMembers } from '@/pages/about-page.constants';

import { FooterLogo } from './footer-logo';
import { BigGetApp } from './get-app';
import { SmallFooter } from './small-footer';

export const Footer: FC<{
  children?: ReactNode;
}> = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));

  return matches ? (
    <Stack
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        marginTop: 'auto',
        minHeight: '5vh',
        padding: 1,
      }}
    >
      <Stack
        sx={{
          alignItems: 'flex-start',
          flexDirection: matches ? 'row' : 'column',
          gap: 3,
          justifyContent: 'space-between',
          width: '90%',
        }}
      >
        <FooterLogo />

        <Stack alignItems="center" flexDirection="column">
          <Typography className="m-2" component="h5" variant="h4">
            Contacts
          </Typography>
          <Stack className="flex-column w-full justify-between gap-2">
            {teamMembers.map((member) => {
              return (
                <Stack key={member.name}>
                  <Link className={gitLinkStyle} href={member.github} variant="body1">
                    <img alt={member.github} src={githubLogo} width={28} />
                    <Typography sx={{ color: 'primary.contrastText', fontWeight: 300 }}>{member.nickname}</Typography>
                  </Link>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
        <BigGetApp />
      </Stack>
    </Stack>
  ) : (
    <SmallFooter />
  );
};
