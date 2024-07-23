import { FC } from 'react';
import Slider from 'react-slick';

import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, Paper, Stack, Typography } from '@mui/material';

import { Price, ProductImages } from '@/lib/axios/get-product-by-id-types';
import { MasterVariant, Product } from '@/lib/axios/schemas/product-schema';
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
import { PricesBlock } from '../prices-block/prices-block';

export type ProductInfo = {
  description: string;
  images: ProductImages;
  masterVariant?: MasterVariant;
  name: string;
  prices: Price[];
};

export const ProductPaper: FC<{
  data: Product | undefined;
  isDisabled: boolean;
  onButtonClick: () => void;
  onImageClick: (index: number) => void;
  onRemoveClick: () => void;
}> = ({ data, isDisabled, onButtonClick, onImageClick, onRemoveClick }) => {
  if (!data) {
    throw new Error('Data expected');
  }
  const {
    description: { 'en-US': enDescription },
    masterVariant,
    name: { 'en-US': enName },
  } = data;

  return (
    <Paper
      className="gap-3"
      sx={{
        alignItems: 'center',
        bgcolor: 'primary.contrastText',
        display: 'flex',
        flexDirection: 'column',
        padding: '4% 1%',
      }}
    >
      <Typography component={'h1'} sx={titleStyles}>
        {enName}
      </Typography>
      <Stack className="flex w-3/4 justify-center">
        <Slider {...sliderSettingsDefaultImage}>
          {masterVariant.images.map((image, index) => (
            <Box
              key={index}
              onClick={() => {
                onImageClick(index);
              }}
              sx={boxStyles}
            >
              <img alt={`${data.name['en-US']}${index + 1}`} src={image.url} style={imgStyles} />
            </Box>
          ))}
        </Slider>
      </Stack>
      <Typography component={'p'} sx={descStyles}>
        {enDescription}
      </Typography>

      <Box>
        <PricesBlock
          price={masterVariant.prices[firstPrice]}
          styleDiscount={discountPriceStyle}
          stylePrice={stylePrice}
        />
      </Box>
      <Stack className=" flex w-3/4 flex-row justify-between">
        <AddProductButton isDisabled={isDisabled} onclick={onButtonClick} />
        <Button className="mx-auto block " disabled={!isDisabled} onClick={onRemoveClick} variant="contained">
          <RemoveIcon />
        </Button>
      </Stack>
    </Paper>
  );
};
