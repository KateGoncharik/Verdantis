import { FC } from 'react';

import { Box, Card, CardContent, CardMedia, Container, Grid, Link, Typography } from '@mui/material';

import githubLogo from '@/assets/icon/github-mark-white.svg';
import beliar13 from '@/assets/photo/beliar13.webp';
import kate from '@/assets/photo/kate.webp';
import mideli from '@/assets/photo/mideli.webp';

import { cardStyle, gitLinkStyle, teamMembers } from './about-page.constants';
import { Member } from './about-page.types';

const images = [kate, mideli, beliar13];

const AboutPage: FC = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Typography gutterBottom variant="h2">
          About Us
        </Typography>
        <Grid container maxWidth="xl" spacing={0.5} sx={{ backgroundColor: 'secondary.main', margin: '1%' }}>
          {teamMembers.map((member: Member, index: number) => (
            <Grid data-testid="member-card" item key={index} lg={4} md={6} sm={12} xl={4} xs={12}>
              <Card sx={{ backgroundColor: 'secondary.dark', color: 'primary.contrastText', padding: '1%' }}>
                <Box className="flex justify-center" sx={{ p: 1 }}>
                  <CardMedia alt={member.name} component="img" image={images[index]} sx={cardStyle} />
                </Box>
                <CardContent>
                  <Box alignItems="center" display="flex" mb={2}>
                    <Box ml={2}>
                      <Typography variant="h6">{member.name}</Typography>
                      <Typography sx={{ color: 'secondary.main' }} variant="body2">
                        {member.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body1">{member.bio}</Typography>
                  <Typography mb={2} mt={2} variant="body1">
                    <strong>Project collaboration:</strong> {member.collaboration}
                  </Typography>
                  <Typography mb={2} mt={2} variant="body1">
                    <strong>Project contributions:</strong> {member.contributions}
                  </Typography>
                  <Link className={gitLinkStyle} data-testid={member.github} href={member.github} variant="body1">
                    <img alt={member.github} src={githubLogo} width={28} />
                    {member.nickname}
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default AboutPage;
