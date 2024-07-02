import { FC } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionSummary, Link, Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Stack } from '@mui/system';

import githubLogo from '@/assets/icon/github-mark-white.svg';
import { gitLinkStyle, teamMembers } from '@/pages/about-page.constants';

import { FooterLogo } from './footer-logo';
import { SmallGetApp } from './get-app';

export const SmallFooter: FC = () => {
  return (
    <Stack
      component="footer"
      sx={{
        alignItems: 'center',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        justifyContent: 'center',
        minHeight: '5vh',
        padding: '2%',
        position: 'static',
      }}
    >
      <FooterLogo />
      <SmallGetApp />
      <Accordion component="div" sx={{ backgroundColor: 'primary.light' }}>
        <AccordionSummary aria-controls="panel1-content" expandIcon={<ExpandMoreIcon />} id="panel1-header">
          <Typography sx={{ color: 'primary.contrastText' }}>{'Contacts'.toUpperCase()}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack className="flex-column w-full justify-between gap-2">
            {teamMembers.map((member) => {
              return (
                <Stack key={member.name}>
                  <Link className={gitLinkStyle} href={member.github} variant="body1">
                    <img alt={member.github} src={githubLogo} width={28} />
                    <Typography sx={{ color: 'primary.contrastText' }} variant="h6">
                      {member.nickname}
                    </Typography>
                  </Link>
                </Stack>
              );
            })}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};
