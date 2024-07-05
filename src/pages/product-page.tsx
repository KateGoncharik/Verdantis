import { ReactNode, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import { Box, Container, Dialog } from '@mui/material';

import { BackTo } from '@/components/back-to/back-to';
import { CloseButton } from '@/components/close-button/close-button';

import { iconStyles, sliderSettingsEnlargedImage } from './product-page.constants';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ProductPage(): ReactNode {
  const { id } = useParams<{ id: string }>();
  const [curImgIdx, setCurImgIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const handleModalClose = (): void => setOpen(false);

  if (!id) {
    throw new Error('No product ID');
  }

  return (
    <Container>
      <Container maxWidth="md">
        <Dialog maxWidth="lg" onClose={handleModalClose} open={open}>
          <CloseButton callback={handleModalClose} styles={iconStyles} />
          <Box sx={{ padding: '40px' }}>
            <Slider
              {...sliderSettingsEnlargedImage}
              afterChange={(i) => setCurImgIdx(i)}
              initialSlide={curImgIdx}
            ></Slider>
          </Box>
        </Dialog>
      </Container>

      <BackTo dest="catalog" path="/catalog" />
    </Container>
  );
}
