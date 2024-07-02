import { FC } from 'react';
import Slider from 'react-slick';

import { Box, Button, Paper } from '@mui/material';

import { Price, ProductImages } from '@/lib/axios/requests/get-product-by-id.types';
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

type ProductInfo = { description: string; images: ProductImages; name: string; prices: Price[] };

export const ProductPaper: FC<{
  data: ProductInfo | undefined;
  isDisabled: boolean;
  onButtonClick: () => void;
  onImageClick: (index: number) => void;
  onRemoveClick: () => void;
}> = ({ data, isDisabled, onButtonClick, onImageClick, onRemoveClick }) => {
  return (
    <Paper elevation={24} sx={{ marginTop: 4, padding: 5 }}>
      <CustomTypography styles={titleStyles} tag="h1" text={data?.name} variantField="h4" />
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
      <CustomTypography styles={descStyles} tag="p" text={data?.description} variantField="body1" />
      <Box>
        <PricesBlock price={data?.prices[firstPrice]} styleDiscount={discountPriceStyle} stylePrice={stylePrice} />
      </Box>
      <AddProductButton isDisabled={isDisabled} onclick={onButtonClick} />
      <Button className="mx-auto my-2 block" disabled={!isDisabled} onClick={onRemoveClick} variant="contained">
        Remove
      </Button>
    </Paper>
  );
};
