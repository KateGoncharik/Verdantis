import { FC } from 'react';
import Slider from 'react-slick';

import { Box, Button, Paper, Stack, Typography } from '@mui/material';

import { Price, ProductImages } from '@/lib/axios/get-product-by-id-types';
import {
  boxStyles,
  descStyles,
  discountPriceStyle,
  firstPrice,
  imgStyles,
  sliderSettingsDefaultImage,
  stylePrice,
  titleStyles,
} from '@/pages/product-page.constants';

import { AddProductButton } from '../add-product-button';
import { CustomTypography } from '../custom-typography/custom-typography';
import { PricesBlock } from '../prices-block/prices-block';

export type ProductInfo = { description: string; images: ProductImages; name: string; prices: Price[] };

export const ProductPaper: FC<{
  data: ProductInfo | undefined;
  onButtonClick: () => void;
  onImageClick: (index: number) => void;
  onRemoveClick: () => void;
}> = ({ data, onButtonClick, onImageClick, onRemoveClick }) => {
  return (
    <Paper
      elevation={24}
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: { lg: '2% 0', md: '1% 0', sm: '1% 0', xs: '0' },
      }}
    >
      <Typography component={'h1'} sx={titleStyles}>
        {data?.name}
      </Typography>
      <Stack className="flex w-3/4 justify-center">
        <Slider {...sliderSettingsDefaultImage}>
          {data?.images.map((image, index) => (
            <Box
              key={index}
              onClick={() => {
                onImageClick(index);
              }}
              sx={boxStyles}
            >
              <img alt={`${data.name}${index + 1}`} src={image.url} style={imgStyles} />
            </Box>
          ))}
        </Slider>
      </Stack>
      <CustomTypography styles={descStyles} tag="p" text={data?.description} variantField="body1" />
      <Box>
        <PricesBlock price={data?.prices[firstPrice]} styleDiscount={discountPriceStyle} stylePrice={stylePrice} />
      </Box>
      <AddProductButton onclick={onButtonClick} />
      <Button className="mx-auto my-2 block" onClick={onRemoveClick} variant="contained">
        Remove
      </Button>
    </Paper>
  );
};
