import { ReactNode, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import { Box, Container, Dialog } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { BackTo } from '@/components/back-to/back-to';
import { LoadingBackdrop } from '@/components/backdrop/backdrop';
import { CloseButton } from '@/components/close-button/close-button';
import { ProductPaper } from '@/components/product-paper/product-paper';
import { getProductById } from '@/lib/axios/get-product-by-id';

import {
  iconStyles,
  imgStyles,
  productPaperWrapperStyles,
  sliderSettingsEnlargedImage,
} from './product-page.constants';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ProductPage(): ReactNode {
  const { id } = useParams<{ id: string }>();
  const [curImgIdx, setCurImgIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const handleModalClose = (): void => setOpen(false);
  const handleImageClick = (index: number): void => {
    setCurImgIdx(index);
    setOpen(true);
  };
  if (!id) {
    throw new Error('No product ID');
  }

  const { data, isPending } = useQuery({
    queryFn: () => getProductById(id),
    queryKey: ['product', id],
    throwOnError: true,
  });
  return isPending ? (
    <LoadingBackdrop open={isPending} />
  ) : (
    <Container sx={productPaperWrapperStyles}>
      <BackTo dest="catalog" path="/catalog" />

      <Container
        sx={{
          padding: '0',
          width: { lg: '80%', md: '85%', sm: '90%', xs: '100%' },
        }}
      >
        <ProductPaper
          {...{
            data,
            isDisabled: false,
            onButtonClick: () => {},
            onImageClick: handleImageClick,
            onRemoveClick: () => {},
          }}
        />
        <Dialog maxWidth="lg" onClose={handleModalClose} open={open}>
          <CloseButton callback={handleModalClose} styles={iconStyles} />
          <Box sx={{ padding: '40px' }}>
            <Slider {...sliderSettingsEnlargedImage} afterChange={(i) => setCurImgIdx(i)} initialSlide={curImgIdx}>
              {data?.images.map((image, index) => (
                <Box key={index}>
                  <img alt={`big${index}`} src={image.url} style={imgStyles} />
                </Box>
              ))}
            </Slider>
          </Box>
        </Dialog>
      </Container>
    </Container>
  );
}
